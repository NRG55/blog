import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useParams, useNavigate } from "react-router";
import { useEffect } from "react";
import commentApiService from "../api/comment";
import formatDate from "../../../blog-client-public/src/utils/formatDate";
import DeleteModal from "../components/DeleteModal";

const CommentDetails = () => {    
    const [ comment, setComment ] = useState(null);
    const [ loading, setLoading ] = useState(true);
    const [ isModalOpen, setModalOpen ] = useState(false);
    const { commentId } = useParams();
    const { token } = useAuth();
    const navigate = useNavigate();

    const handleConfirmDelete = async () => {
        try {
            await commentApiService.delete(commentId, token);

            setModalOpen(false);
            navigate('/comments');

        } catch (error) {
            console.log("Delete comment failed: ", error);
        };
    };

    useEffect(() => {
        const fetchComment = async () => {
            try {
                const data = await commentApiService.getById(commentId, token);

                setComment(data);

            } catch (error) {
                console.log("Error fetching comment:", error);
                navigate('/comments');

            } finally {
                setLoading(false);
            }
        };

        fetchComment();
    }, []);

    if (loading) {
        return (
            <div className="p-20 text-center animate-pulse">
                Loading comment details...
            </div>
        );
    }
    if (!comment) {
        return (
            <div className="p-20 text-center text-gray-900">
                Comment not found.
            </div>
        );
    };

    return (
            <div className="grow w-full max-w-3xl px-6 mt-10 md:mt-20 mx-auto">                
                <div className="border border-gray-100 p-8 rounded-xs">
                    <div className="flex items-center gap-3 mb-6 text-xs text-gray-400">                      
                            <p className="w-fit py-1 px-2 text-sm text-gray-600 bg-gray-100 capitalize">
                                { comment.user.username }
                            </p>

                            <p className="text-xs text-gray-400">
                                { formatDate(comment.createdAt) }
                            </p>                        
                    </div>

                    <p className="text-xl mb-6 text-gray-800">
                        "{ comment.message }"
                    </p>

                    <div className="pt-6 border-t border-gray-100">
                        <p className="text-xs text-gray-400 mb-2">
                            Original post
                        </p>

                        <p className="text-xl font-medium line-clamp-1 text-gray-500">
                            { comment.post.title }
                        </p>
                    </div>
                </div>

                <div className="mt-10 flex justify-end gap-4">
                    <button 
                        onClick={() => navigate(-1)}
                        className="cursor-pointer bg-gray-100 text-black py-2 px-6 rounded-xs hover:bg-gray-100/60 transition"
                    >
                        Close
                    </button>
                    <button
                        onClick={() => setModalOpen(true)}
                        className="cursor-pointer bg-black text-white py-2 px-6 rounded-xs hover:opacity-80 transition"
                    >
                        Delete
                    </button>
                </div>

                <DeleteModal 
                    isOpen={isModalOpen} 
                    onClose={() => setModalOpen(false)} 
                    onConfirm={handleConfirmDelete}
                    title={comment?.message}
                />
            </div>
    );
};

export default CommentDetails;