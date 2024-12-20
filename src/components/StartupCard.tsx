import { Eye } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { Author, Startup } from "../../sanity.types";

export type StartUpCardType = Omit<Startup, "author"> & { author?: Author };

const StartupCard = ({ post }: { post: StartUpCardType }) => {
  const {
    _createdAt,
    views,
    author,
    _id,
    description,
    title,
    category,
    image,
  } = post;

  return (
    <div className="startup-card group">
      <div className="flex-between">
        <p className="startup-card_date">{formatDate(_createdAt)}</p>
        <div className="flex gap-1.5">
          <Eye className="text-primary size-6" />
          <p className="text-16-medium">{views}</p>
        </div>
      </div>
      <div className="flex-between mt-5 gap-5">
        <div className="flex-1">
          <Link href={`/user/${author?._id}`}>
            <p className="text-16-medium line-clamp-1">{author?.name}</p>
          </Link>
          <Link href={`/startup/${_id}`}>
            <h3 className="text-26-semibold line-clamp-1">{title}</h3>
          </Link>
        </div>
        <img
          src={author?.image}
          className="rounded-full w-16 h-16 cursor-pointer"
          alt="userImage"
        />
      </div>
      <Link href={`/startup/${_id}`}>
        <p className="startup-card_desc">{description}</p>
        <img src={image} alt="placeholder" className="startup-card_img" />
      </Link>

      <div className="flex-between mt-5 gap-3">
        <Link href={`/?query=${category?.toLowerCase()}`}>
          <p className="text-16-medium">{category}</p>
        </Link>
        <Button className="startup-card_btn" asChild>
          <Link href={`/startup/${_id}`}>Details</Link>
        </Button>
      </div>
    </div>
  );
};

export default StartupCard;
