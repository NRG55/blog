import { useContext, useState } from 'react';
import { UserContext } from '../context/UserContextProvider';

const Comments = () => {
    const { user } = useContext(UserContext);

    const [ comment, setComment ] = useState('');
    const [ showNotice, setShowNotice ] = useState(false);
    const [ isFading, setIsFading ] = useState(false);

    const handleComment = () => {
        if (!user) {
            setShowNotice(true);
            setIsFading(false);

            setTimeout(() => setIsFading(true), 2000);           
            setTimeout(() => setShowNotice(false), 2500);

            return;
        };

        //TODO: comments logic
    };

    return (
        <div className="mt-12">
            <h3 className="mb-2 text-xl text-gray-500">Comments</h3>
            <hr className="mb-6 text-gray-100"/>
            <textarea 
                value={ comment }
                onChange={(event) => setComment(event.target.value) } 
                placeholder="Leave a comment..."
                className="w-full h-37 p-4 mb-5 border border-gray-200 bg-gray-100 rounded-xs resize-none overflow-auto
                           focus:bg-transparent 
                           placeholder:text-gray-400"
            ></textarea>

            <div className="relative inline-block">
                {showNotice && (
                    <div className={`absolute bottom-full left-0 mb-3 px-4 py-2 bg-white border border-gray-100 text-gray-600 text-sm rounded-xs shadow-xl whitespace-nowrap transition-opacity duration-500 
                                    ${isFading ? 'opacity-0' : 'opacity-100'}`}>
                        Please log in to leave a comment                        
                    </div>
                )}

                <button
                    onClick={handleComment}
                    className="cursor-pointer bg-black text-white rounded-xs py-2 px-6 hover:opacity-80 transition"
                >
                    Comment
                </button>
            </div>
        </div>
    );
};

export default Comments;