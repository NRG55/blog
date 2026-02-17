import { Link } from "react-router";
import logo from '../assets/logo.png';
import formatDate from "../utils/formatDate";

const PostCard = ({ content, author, totalComments = 1 }) => {
    const { title, body, createdAt, slug } = content;

    return (
        <Link to={`/posts/${slug}`} className="flex items-center gap-8 border-b border-gray-100">
            <div className="h-30 aspect-square bg-gray-100">
                <img src={logo} className="w-full h-full"/>
            </div>

            <div className="w-full py-4">
                <h1 className="text-2xl font-medium line-clamp-3 sm:line-clamp-2">
                    {title}
                </h1>

                <p className="my-3 text-xl line-clamp-2">
                    {body}
                </p>

                <div className="flex gap-2 items-center text-sm text-gray-600">
                    <p className="capitalize">{author}</p>
                    <p>{ formatDate(createdAt) }</p>
                    <button className="cursor-pointer w-8 h-8 rounded-full flex items-center justify-center ml-auto bg-gray-100">
                        <i className="fi fi-rr-comment-dots h-4"></i>                        
                    </button>
                    <span>{ totalComments }</span>                    
                </div>
            </div>
        </Link>
    )
};

export default PostCard;