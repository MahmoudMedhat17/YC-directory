import { client } from "@/sanity/lib/client";
import { STARTUPS_QUERY_BY_USER } from "@/sanity/schemaTypes/queries";
import StartupCard from "./StartupCard";
import { StartUpCardType } from "./StartupCard";

export const experimental_ppr = true;

const UserStartUps = async ({ id }: { id: string }) => {
  const startUps = await client.fetch(STARTUPS_QUERY_BY_USER, { id });

  return (
    <>
      {startUps.length > 0 ? (
        startUps.map((startUp: StartUpCardType) => (
          <StartupCard key={startUp._id} post={startUp} />
        ))
      ) : (
        <p className="no-result">No Posts yet</p>
      )}
    </>
  );
};

export default UserStartUps;
