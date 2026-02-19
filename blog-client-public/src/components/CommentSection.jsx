import { useEffect, useState } from 'react';
import commentService from '../services/comment';
import CommentInput from './CommentInput';

const CommentSection = ({ postId }) => {
    const [comments, setComments] = useState([]);

    const loadComments = async () => {
        try {
            const data = await commentService.getByPostId(postId, 1);

            setComments(data.comments);

        } catch (error) {
            console.log(error)
        };
    };

    useEffect(() => {
        if (postId) {
            loadComments();
        };

    }, [postId]);

    return (
        <div className="mt-12">
            <h3 className="mb-2 text-xl text-gray-500">Comments</h3>

            <hr className="mb-6 text-gray-100"/>            

            <div className="my-8">
                {comments.map(comment => (
                    <div key={comment.id} className="p-4 mb-4 border border-gray-100">
                        <p className="w-fit py-1 px-2 mb-4 text-sm bg-gray-100">
                            Username
                        </p>
                        <p>{comment.message}</p>
                    </div>
                ))}
            </div>

            <CommentInput postId={ postId } refreshComments={ loadComments } />
        </div>        
    );
};

export default CommentSection;