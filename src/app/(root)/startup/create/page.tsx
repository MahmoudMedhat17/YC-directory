import Startform from "@/components/Startform";
import { auth } from "../../../../../auth";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await auth();

  if (!session) redirect("/");

  return (
    <>
      <section className="pink_container !min-h-[320px]">
        <h3 className="heading">Submit Your Startup Pitch</h3>
      </section>

      <Startform />
    </>
  );
};

export default page;
