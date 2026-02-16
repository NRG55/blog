import { Link } from "react-router";
import getDate from "../utils/date";

const MiniPostCard = ({ content, author }) => {
    const { title, createdAt, slug } = content;

    return (        
        <Link to={`/posts/slug/${slug}`} className="flex items-center gap-5">            
            <div className="w-full py-2">
                <h1 className="text-2xl font-medium line-clamp-3 sm:line-clamp-2">
                    {title}
                </h1>

                <div className="flex gap-2 items-center text-sm text-gray-600">
                    <p>{author}</p>
                    <p>{ getDate(createdAt) }</p>
                </div>
            </div>
        </Link>
    )
};

export default MiniPostCard;