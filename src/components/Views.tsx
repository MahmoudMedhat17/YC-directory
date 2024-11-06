import Ping from "./Ping";
import { client } from "@/sanity/lib/client";
import { START_QUERY_VIEWS_BY_ID } from "@/sanity/schemaTypes/queries";

const Views = async ({ id }: { id: string }) => {
  const { views: totalViews } = await client
    .withConfig({ useCdn: true })
    .fetch(START_QUERY_VIEWS_BY_ID, {
      id,
    });

  return (
    <div className="view-container">
      <div className="absolute -top-2 -right-2">
        <Ping />
      </div>

      <div className="view-text">
        <p>Views: {totalViews}</p>
      </div>
    </div>
  );
};

export default Views;
