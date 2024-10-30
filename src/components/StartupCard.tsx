import { Eye } from "lucide-react";
import { Button } from "./ui/button";

const StartupCard = ({ post }) => {
  return (
    <div className="startup-card">
      <div className="flex-between">
        <p className="startup-card_date">{post._createdAt}</p>
        <div className="flex gap-1.5">
          <Eye className="text-primary size-6" />
          <p className="text-16-medium">{post.views}</p>
        </div>
      </div>
      <div className="flex-between mt-5 gap-5">
        <div className="flex-1">
          <p className="text-16-medium line-clamp-1">{post.author?.name}</p>
          <h3 className="text-26-semibold line-clamp-1">{post.category}</h3>
        </div>
        <img src={post.image} className="w-14 h-14 rounded-full" />
      </div>

      <p className="startup-card_desc">{post.description}</p>
      <img src={post.image} className="startup-card_img" />

      <div className="flex-between mt-7">
        <p className="text-16-medium">{post.category}</p>
        <Button className="startup-card_btn">Details</Button>
      </div>
    </div>
  );
};

export default StartupCard;
