import SearchForm from "@/components/SearchForm";
import StartupCard from "@/components/StartupCard";

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) => {
  const query = (await searchParams).query;

  const posts = [
    {
      _createdAt: "Yesterday",
      views: 66,
      author: {
        _id: 1,
        name: "LOL",
      },
      _id: 1,
      description: "This is a description",
      image:
        "https://gratisography.com/wp-content/uploads/2024/03/gratisography-funflower-800x525.jpg",
      category: "lol",
      title: "Title",
    },
  ];

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

        <ul className="mt-7 grid-card">
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
