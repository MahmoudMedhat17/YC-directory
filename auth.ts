import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import { client } from "@/sanity/lib/client";
import { writeClient } from "@/sanity/lib/writeClient";
import { AUTHOR_QUERY_BY_ID } from "@/sanity/schemaTypes/queries";


export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [GitHub],
    callbacks: {
        // To check if a user exists first in sanity DB and if not then create one with the Oauth authentication
        async signIn({ user: { name, email, image }, profile }) {

            if (!profile) throw new Error("Profile not defined!");

            const { id, login, bio } = profile;

            const existingUser = await client.withConfig({ useCdn: false }).fetch(AUTHOR_QUERY_BY_ID, {
                id: id
            });

            // If user doesn't exist
            if (!existingUser) {
                await writeClient.create({
                    _type: "author",
                    id,
                    name,
                    userName: login,
                    email,
                    image,
                    bio: bio || ""
                })
            };

            return true;
        },
        // Persist the OAuth access_token and or the user id to the token right after signin
        async jwt({ token, account, profile }) {
            if (account && profile) {
                const user = await client.withConfig({ useCdn: false }).fetch(AUTHOR_QUERY_BY_ID, {
                    id: profile?.id
                });

                token.id = user?._id;
            }

            return token;
        },

        // send the properties like token id to the client
        async session({ session, token }) {
            Object.assign(session, { id: token.id });
            return session;
        }
    }
});