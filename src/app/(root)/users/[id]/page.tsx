import { client } from "@/sanity/lib/client";
import { auth } from "../../../../../auth";
import { AUTHOR_QUERY_ID } from "@/sanity/schemaTypes/queries";
import { notFound } from "next/navigation";
import UserStartUps from "@/components/UserStartUps";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;

  const session = await auth();

  const user = await client.fetch(AUTHOR_QUERY_ID, { id });

  if (!user) return notFound();

  return (
    <>
      <section className="profile_container">
        <div className="profile_card">
          <div className="profile_title">
            <h3 className="text-24-black text-center uppercase line-clamp-1">
              {user.name}
            </h3>
          </div>
          <img
            src={user.image}
            alt="userProfilePic"
            width={240}
            height={240}
            className="profile_image"
          />

          <p className="mt-7 text-30-extrabold text-center">@{user.userName}</p>
          <p className="mt-1 text-center text-14-normal">{user?.bio}</p>
        </div>

        <div className="flex flex-1 flex-col lg:mt-5 gap-5">
          <p className="text-30-bold">
            {session?.user?.id ? "Your" : "All"}
            Startups
          </p>

          <ul className="card_grid-sm">
            <Suspense fallback={<Skeleton />}>
              <UserStartUps id={id} />
            </Suspense>
          </ul>
        </div>
      </section>
    </>
  );
};

export default page;
