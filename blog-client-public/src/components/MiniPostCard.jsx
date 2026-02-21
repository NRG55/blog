import { Link } from "react-router";
import formatDate from "../utils/formatDate";

const MiniPostCard = ({ post }) => {
    const { 
        title, 
        createdAt, 
        slug,
        author: { username }
    } = post;

    return (        
        <Link to={`/posts/${slug}`} className="flex items-center gap-5">            
            <div className="w-full py-2">
                <h3 className="mb-2 text-xl font-medium line-clamp-3 sm:line-clamp-2">
                    {title}
                </h3>

                <div className="flex gap-2 items-center text-sm text-gray-600">
                    <p className="capitalize">{username}</p>

                    <div className="w-px h-4 bg-gray-300"></div>

                    <p>{ formatDate(createdAt) }</p>
                </div>
            </div>
        </Link>
    )
};

export default MiniPostCard;