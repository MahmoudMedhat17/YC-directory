import Ping from "./Ping";
import { client } from "@/sanity/lib/client";
import { START_QUERY_VIEWS_BY_ID } from "@/sanity/schemaTypes/queries";
import { writeClient } from "@/sanity/lib/writeClient";
import { unstable_after as after } from "next/server";

const Views = async ({ id }: { id: string }) => {
  const { views: totalViews } = await client
    .withConfig({ useCdn: false })
    .fetch(START_QUERY_VIEWS_BY_ID, {
      id,
    });

  after(async () => {
    await writeClient
      .patch(id)
      .set({ views: totalViews + 1 })
      .commit();
  });

  return (
    <div className="view-container">
      <div className="absolute -top-2 -right-2">
        <Ping />
      </div>

      <div className="view-text">
        <span className="font-black">Views: {totalViews}</span>
      </div>
    </div>
  );
};

export default Views;
