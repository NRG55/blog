import { UserContext } from "../context/UserContextProvider";
import { useContext, useState } from 'react';
import formatDate from "../utils/formatDate";

const CommentCard = ({ comment, onDelete, onUpdate }) => {
    const [ isEditing, setIsEditing ] = useState(false);
    const [ editedMessage, setEditedMessage ] = useState(comment.message);

    const { user } = useContext(UserContext);
    const isOwner = user?.id === comment.userId;
    const token = user?.token;

    const handleSave = async () => {
        if (!token) {
            return;
        };
        
        await onUpdate(comment.id, editedMessage, token);

        setIsEditing(false);
    };

    return (
        <div className="p-4 mb-4 border border-gray-100 group">
            <div className="flex items-center justify-between mb-4">
                <div className="flex gap-2 items-center">
                    <p className="w-fit py-1 px-2 text-sm text-gray-600 bg-gray-100">
                        { comment.user.username }
                    </p>

                    <p className="text-xs text-gray-400">
                        { formatDate(comment.createdAt) }
                    </p>
                </div>

                {
                    isOwner 
                    && 
                    !isEditing 
                    && 
                    <div className="flex gap-3 text-xs text-gray-400 md:opacity-0 md:group-hover:opacity-100 transition">
                        <button 
                            onClick={() => setIsEditing(true)} 
                            className="cursor-pointer hover:text-black"
                        >
                            Edit
                        </button>

                        <button 
                            onClick={() => onDelete(comment.id, token)} 
                            className="cursor-pointer hover:text-red-500"
                        >
                            Delete
                        </button>
                    </div>
                }
            </div>

            {
                isEditing 
                ? 
                <div className="flex flex-col gap-2">
                    <textarea 
                        className="w-full p-2 border border-gray-200 text-sm focus:outline-none"
                        value={ editedMessage }
                        onChange={(e) => setEditedMessage(e.target.value)}
                    />
                    <div className="flex gap-2">
                        <button 
                            onClick={handleSave} 
                            className="text-xs bg-black text-white px-3 py-1"
                        >
                            Save
                        </button>
                        <button 
                            onClick={() => setIsEditing(false)} 
                            className="text-xs border px-3 py-1"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
                : 
                <p className="text-gray-800">{ comment.message }</p>
            }
        </div>
    );
};

export default CommentCard;