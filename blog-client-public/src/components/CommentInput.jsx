import { useState } from 'react';
import commentApiService from '../api/comment';
import { useAuth } from '../context/AuthContext';
import { Link, useLocation } from 'react-router';

const CommentInput = ({ postId, onCommentAdded }) => {
    const { user, token } = useAuth();
    const [ comment, setComment ] = useState('');
    const [ showNotice, setShowNotice ] = useState(false);
    const [ isFading, setIsFading ] = useState(false);
    const location = useLocation();

    const addComment = async () => {
        if (!user) {
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
            const data = await commentApiService.create(user.id, token, postId, comment);

            setComment('');
            onCommentAdded(data.comment);
                
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
                        Please <Link to="/auth/login" state={{ from: location }} className="font-bold underline">log in</Link> to leave a comment                        
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