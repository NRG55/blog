import { Link } from "react-router";
import formatDate from "../utils/formatDate";

const MiniPostCard = ({ content, author }) => {
    const { title, createdAt, slug } = content;

    return (        
        <Link to={`/posts/${slug}`} className="flex items-center gap-5">            
            <div className="w-full py-2">
                <h3 className="text-xl font-medium line-clamp-3 sm:line-clamp-2">
                    {title}
                </h3>

                <div className="flex gap-2 items-center text-sm text-gray-600">
                    <p className="capitalize">{author}</p>
                    <p>{ formatDate(createdAt) }</p>
                </div>
            </div>
        </Link>
    )
};

export default MiniPostCard;