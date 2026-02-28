import { Link } from "react-router";

const PostRow = ({ post, onDelete }) => {
    return (
        <div className="flex w-full justify-between items-center py-4 px-2 border-b border-gray-100">
            <p className="text-gray-800">{post.title}</p>

            <div className="flex gap-6 items-center">
                <Link 
                    to={`${post.id}/comments`} 
                    className="flex items-center text-gray-400 hover:text-black transition"
                    title="Comments"
                >
                    <i className="fi fi-rr-comment-dots"></i>
                </Link>

                <Link 
                    to={`${post.id}/edit`} 
                    className="flex items-center text-gray-400 hover:text-black transition"
                    title="Edit post"
                >
                    <i className="fi fi-rr-edit"></i>
                </Link>

                <button 
                    onClick={onDelete}
                    className="cursor-pointer flex items-center text-gray-400 hover:text-red-600 transition"
                    title="Delete post"
                >
                    <i className="fi fi-rr-trash"></i>
                </button>
            </div>            
        </div>
    );
};

export default PostRow;