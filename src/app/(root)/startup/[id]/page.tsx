import { client } from "@/sanity/lib/client";
import { STARTUP_QUERY_BY_ID } from "@/sanity/schemaTypes/queries";
import { notFound } from "next/navigation";
import { formatDate } from "@/lib/utils";
import Link from "next/link";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;

  const post = await client.fetch(STARTUP_QUERY_BY_ID, { id });
  const date = formatDate(post._createdAt);

  console.log(post);

  if (!post) notFound();

  console.log(post);
  return (
    <>
      <section className="pink_container !min-h-[320px]">
        <p className="tag">{date}</p>
        <h3 className="heading">{post.title}</h3>
        <p className="sub-heading !max-w-5xl">{post.description}</p>
      </section>

      <section className="section_container">
        <img
          src={post.image}
          alt={post.description}
          className="w-full h-auto rounded-xl"
        />

        <div className="mt-10 max-w-4xl mx-auto space-y-5">
          <div className="flex-between">
            <Link
              href={`/users/${post?.author?._id}`}
              className="flex gap-4 items-center"
            >
              <img
                src={post?.author?.image}
                alt={post?.author?.bio}
                className="w-20 h-20 rounded-full"
              />
              <div>
                <p className="text-20-medium">
                  {post?.author?.name} - {post?.title}
                </p>
                <p className="text-16-medium !text-black-300">
                  @{post?.author?.name}
                </p>
              </div>
            </Link>
            <p className="category-tag">{post?.category}</p>
          </div>
        </div>

        <div className="mt-10 max-w-4xl mx-auto space-y-5">
          <h1 className="text-30-bold">Pitch details</h1>
          <p>{post?.pitch}</p>
        </div>
      </section>
    </>
  );
};

export default page;
