import { Link } from "react-router";
import logo from '../assets/logo.png';

const PostCard = ({ content, author }) => {
    const { title, body, createdAt, slug } = content;

    return (
        <Link to={`/posts/slug/${slug}`} className="flex items-center gap-8 border-b border-gray-100">
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

                <div className="flex gap-2 items-center">
                    <p>{author}</p>
                    <p>{ createdAt }</p>
                </div>
            </div>
        </Link>
    )
};

export default PostCard;