"use server";


import { writeClient } from "@/sanity/lib/writeClient";
import { auth } from "../../auth";
import { parseServerAction } from "./utils";
import slugify from "slugify";


export const createPitch = async (states: any, form: FormData, pitch: string) => {

    try {
        // Get the session
        const session = await auth();

        //Check if it's the author or not 
        if (!session) {
            return parseServerAction({
                error: "Author is not sign in",
                status: "ERROR"
            });
        };

        //get all props from formData except the pitch cuz we getting it as an argument of type string
        const { title, description, category, link } = Object.fromEntries(
            Array.from(form).filter(([key]) => key !== "pitch")
        );

        // Using slugify lib to act as a unique identifier for the startup
        const slug = slugify(title as string, { lower: true, strict: true });

        // This is the startup content
        const startUp = {
            title,
            description,
            category,
            image: link,
            slug: {
                _type: "slug", current: "slug"
            },
            author: {
                _type: "reference",
                _ref: session?.user?.id
            },
            pitch
        };

        // Result is to create a new startup with type "startup" from the contents we defined for startup
        const result = await writeClient.create({ _type: "startup", ...startUp });
        // Return the result with no error msg and status = "Success"

        return parseServerAction({
            ...result,
            error: "",
            status: "SUCCESS"
        });

    } catch (error) {
        console.log(error);


        return parseServerAction({
            error: JSON.stringify(error),
            status: "ERROR"
        });
    }
};