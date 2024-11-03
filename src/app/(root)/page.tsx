import SearchForm from "@/components/SearchForm";
import StartupCard from "@/components/StartupCard";
import { STARTUPQUERY } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) => {
  const query = (await searchParams).query;

  const posts = await client.fetch(STARTUPQUERY);
  console.log(JSON.stringify(STARTUPQUERY));

  return (
    <>
      <section className="pink_container">
        <p className="tag">Pitch, Vote, and Grow</p>
        <h3 className="heading">
          Pitch Your Startup, Connect with Entrepreneurs
        </h3>
        <p className="sub-heading !max-w-3xl">
          Submit Ideas, Vote on Pitches, and Get Noticed in Virtual Competitions
        </p>
        <SearchForm query={query} />
      </section>

      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Search results for ${query}` : "All Startups"}
        </p>

        <ul className="mt-7 card_grid">
          {posts.length > 0 ? (
            posts.map((post) => <StartupCard post={post} key={post._id} />)
          ) : (
            <p className="no-result">No startups found</p>
          )}
        </ul>
      </section>
    </>
  );
};

export default page;
