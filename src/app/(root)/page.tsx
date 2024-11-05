import SearchForm from "@/components/SearchForm";
import StartupCard, { StartUpCardType } from "@/components/StartupCard";
import { STARTUPQUERY } from "@/sanity/schemaTypes/queries";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) => {
  const query = (await searchParams).query;

  // const posts = await client.fetch(STARTUPQUERY);
  const { data: posts } = await sanityFetch({
    query: STARTUPQUERY,
    params: { search: query || null },
  });
  console.log(posts);

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
          {posts?.length > 0 ? (
            posts.map((post: StartUpCardType) => (
              <StartupCard post={post} key={post?._id} />
            ))
          ) : (
            <p className="no-result">No startups found</p>
          )}
        </ul>
      </section>
      <SanityLive />
    </>
  );
};

export default page;
