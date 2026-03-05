import { Link } from "react-router";

const CommentRow = ({ comment, onDelete }) => {
    return (
        <div className="flex w-full justify-between items-center py-4 px-2 border-b border-gray-100">
            <p className="text-gray-800 line-clamp-1">
                {comment.message}
            </p>

            <div className="flex gap-6 items-center">                

                <Link 
                    to={`/comments/details/${comment.id}`} 
                    className="flex items-center text-gray-400 hover:text-black transition"
                    title="Show comment"
                >
                    <i className="fi fi-rr-eye"></i>
                </Link>

                <button 
                    onClick={onDelete}
                    className="cursor-pointer flex items-center text-gray-400 hover:text-red-600 transition"
                    title="Delete comment"
                >
                    <i className="fi fi-rr-trash"></i>
                </button>
            </div>            
        </div>
    );
};

export default CommentRow;