import formatDate from "../utils/formatDate";

const CommentCard = ({ comment }) => {
    return (
        <div className="p-4 mb-4 border border-gray-100">
            <div className="flex mb-4">
                <p className="w-fit py-1 px-2 text-sm text-gray-600 bg-gray-100">
                    {comment.user.username}
                </p>
                <p className="w-fit py-1 px-2 text-sm text-gray-400">
                    {formatDate(comment.createdAt)}
                </p>
            </div>
            <p>{comment.message}</p>
        </div>
    );
};

export default CommentCard;