import { useEffect, useState } from 'react';
import commentService from '../services/comment';
import CommentInput from './CommentInput';
import CommentCard from './CommentCard';

const CommentSection = ({ postId }) => {
    const [ loading, setLoading ] = useState(false);
    const [ commentsData, setCommentsData ] = useState({                                                    
                                                    comments: [],
                                                    totalComments: 0,
                                                    page: 1
                                                });

    const { comments, totalComments, page } = commentsData;

    const loadComments = async (pageNumber = 1) => {
        setLoading(true);

        try {
            const data = await commentService.getByPostId(postId, pageNumber);

            setCommentsData(prev => ({
                                    ...prev,
                                    comments: pageNumber === 1 ? data.comments : [...prev.comments, ...data.comments],
                                    totalComments: data.totalComments,
                                    page: pageNumber
                                }));

        } catch (error) {
            console.log(error);
            
        } finally {
            setLoading(false);
        };
    };

    const loadMoreComments = () => {
        const nextPage = page + 1;

        loadComments(nextPage);
    };

    const handleDelete = async (commentId, token) => {
        try {
            await commentService.delete(commentId, postId, token);

            loadComments(1);
            
        } catch (error) { 
            console.log(error); 
        };
    };

    const handleUpdate = async (commentId, newMessage, token) => {
        try {
            await commentService.update(commentId, newMessage, postId, token);

            loadComments(1);

        } catch (error) { 
            console.error(error); 
        };
    };

    useEffect(() => {
        if (postId) {
            loadComments(1);            
        };

    }, [postId]);

    return (
        <div className="mt-12">
            <h3 className="mb-2 text-xl text-gray-500">Comments ({totalComments})</h3>

            <hr className="mb-6 text-gray-100"/>            

            <div className="my-8">
                {comments.map(comment => 
                    <CommentCard 
                        key={ comment.id } 
                        comment={ comment }
                        onDelete={handleDelete} 
                        onUpdate={handleUpdate} 
                    />
                )}
            </div>

            {
                comments.length < totalComments
                && 
                <button 
                    onClick={loadMoreComments}
                    disabled={loading}
                    className="mb-12 block underline underline-offset-6 text-sm tracking-widest font-medium hover:opacity-60 disabled:opacity-30"
                >
                    {loading ? "Loading..." : "Load more"}                                   
                </button>
            }

            <CommentInput postId={ postId } updateComments={ loadComments } />
        </div>        
    );
};

export default CommentSection;