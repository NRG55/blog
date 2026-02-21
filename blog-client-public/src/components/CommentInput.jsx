import { useState } from 'react';
import commentService from '../services/comment';

const CommentInput = ({ postId, updateComments }) => {
    const [comment, setComment] = useState('');
    const [showNotice, setShowNotice] = useState(false);
    const [isFading, setIsFading] = useState(false);

    const addComment = async () => {
        const user = JSON.parse(localStorage.getItem('user'));
        const token = user?.token;
        const userId = user?.id;

        if (!token) {
            setShowNotice(true);
            setIsFading(false);

            setTimeout(() => setIsFading(true), 2500);
            setTimeout(() => setShowNotice(false), 3000);

            return;
        };

        if (!comment.trim()) { 
            return;
        };

        try {
            await commentService.create(userId, token, postId, comment);
            
            setComment('');
            updateComments(1);
                
        } catch (error) {
            console.error(error);
        };
    };

    return (
        <div className="w-full md:w-120">           
            <textarea 
                value={comment}
                onChange={(event) => setComment(event.target.value)} 
                placeholder="Leave a comment..."
                className="w-full h-25 p-4 mb-5 border border-gray-200 bg-gray-100 rounded-xs resize-none overflow-auto
                           focus:bg-transparent placeholder:text-gray-400"
            />

            <div className="relative inline-block">
                {showNotice && (
                    <div className={`absolute bottom-full left-0 mb-3 px-4 py-2 bg-white border border-gray-100 text-gray-600 text-sm rounded-xs shadow-xl whitespace-nowrap transition-opacity duration-500 
                                    ${isFading ? 'opacity-0' : 'opacity-100'}`}>
                        Please log in to leave a comment                        
                    </div>
                )}

                <button
                    onClick={addComment}
                    className="cursor-pointer bg-black text-white rounded-xs py-2 px-6 hover:opacity-80 transition"
                >
                    Comment
                </button>
            </div>
        </div>
    );
};

export default CommentInput;