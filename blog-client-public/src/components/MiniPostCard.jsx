import { Link } from "react-router";

const MiniPostCard = ({ content, author }) => {
    const { title, createdAt, slug } = content;

    return (        
        <Link to={`/posts/slug/${slug}`} className="flex items-center gap-5">            
            <div className="w-full py-2">
                <h1 className="text-2xl font-medium line-clamp-3 sm:line-clamp-2">
                    {title}
                </h1>

                <div className="flex gap-2 items-center">
                    <p>{author}</p>
                    <p>{ createdAt }</p>
                </div>
            </div>
        </Link>
    )
};

export default MiniPostCard;