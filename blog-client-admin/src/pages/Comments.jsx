import { useState, useEffect } from "react";
import { useParams } from 'react-router';
import DeleteModal from "../components/DeleteModal";
import { useAuth } from "../context/AuthContext";
import commentApiService from "../api/comment";
import CommentRow from "../components/CommentRow";

const Comments = () => {
    const [ loading, setLoading ] = useState(false);
    const [ isModalOpen, setModalOpen ] = useState(false);
    const [ selectedComment, setSelectedComment ] = useState(null);
    const [ commentsData, setCommentsData ] = useState({
                                                    comments: [],
                                                    totalComments: 0,
                                                    page: 1
                                                });

    const { postId } = useParams();
    const { token } = useAuth();                                            
    const { comments, totalComments, page } = commentsData;

    const loadComments = async (pageNumber) => {
        setLoading(true);

        try {            
            const data = await commentApiService.getAll(pageNumber, token, postId);

            setCommentsData(prev => ({
                comments: pageNumber === 1 ? data.comments : [...prev.comments, ...data.comments],
                totalComments: data.totalComments,
                page: pageNumber
            }));

        } catch (error) {
            console.log("Load comments failed: ", error);

        } finally {
            setLoading(false);
        };
    };
    
    const handleDeleteClick = (comment) => {
        setSelectedComment(comment);
        setModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        try {           
            await commentApiService.delete(selectedComment.id, token);

            setCommentsData(prev => ({
                ...prev,
                comments: prev.comments.filter(comment => comment.id !== selectedComment.id),
                totalComments: prev.totalComments - 1
            }));

            setModalOpen(false);

        } catch (error) {
            console.log("Delete comment failed: ", error);
        };
    };

    useEffect(() => { 
        loadComments(1); 
    }, [postId]);    

    return (
        <div className="grow w-full max-w-200 px-4 mt-10 md:mt-20 md:mx-auto">
            {
                comments.length === 0 && loading 
                ?
                    <p>Loading ...</p>
                :
                <>
                    {
                        postId && comments.length > 0 
                        && 
                        <h1 className="mb-6 text-sm text-gray-400">
                            Comments for post &nbsp; 
                            <span className="text-black">
                                "{ comments[0]?.post?.title }"
                            </span>
                        </h1>
                    }
                    
                    {
                        comments.length === 0 
                        &&
                        <div className="md:col-span-12 py-20 text-center">
                            <p className="text-xl font-medium text-gray-500">
                                No comments found
                            </p>                            
                        </div>
                    }                    

                    <div className="">
                        {comments.map((comment) => (
                            <CommentRow 
                                key={comment.id} 
                                comment={comment} 
                                onDelete={() => handleDeleteClick(comment)} 
                            />
                        ))}
                    </div>

                    {
                        comments.length < totalComments
                        &&
                        <button 
                            onClick={() => loadComments(page + 1)}
                            disabled={loading}
                            className="my-8 block mx-auto underline underline-offset-6 text-sm tracking-widest font-medium hover:opacity-60 disabled:opacity-30"
                        >
                            { loading ? "Loading..." : "LOAD MORE" }
                        </button>
                    }
                </>
            }

            <DeleteModal 
                isOpen={isModalOpen} 
                onClose={() => setModalOpen(false)} 
                onConfirm={handleConfirmDelete}
                title={selectedComment?.message}
            />
        </div>
    );
};

export default Comments;