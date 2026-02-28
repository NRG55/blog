import { useState, useEffect } from "react";
import postApiService from "../api/post";
import PostRow from "../components/PostRow";
import DeleteModal from "../components/DeleteModal";

const PostList = () => {
    const [ loading, setLoading ] = useState(false);
    const [ isModalOpen, setModalOpen ] = useState(false);
    const [ selectedPost, setSelectedPost ] = useState(null);
    const [ postsData, setPostsData ] = useState({
                                                    posts: [],
                                                    totalPosts: 0,
                                                    page: 1
                                                });

    const { posts, totalPosts, page } = postsData;

    const loadPosts = async (pageNumber) => {
        setLoading(true);

        try {            
            const data = await postApiService.getAll(pageNumber);
            setPostsData(prev => ({
                posts: pageNumber === 1 ? data.posts : [...prev.posts, ...data.posts],
                totalPosts: data.totalPosts,
                page: pageNumber
            }));

        } catch (error) {
            console.log("Load posts failed: ", error);

        } finally {
            setLoading(false);
        };
    };
    
    const handleDeleteClick = (post) => {
        setSelectedPost(post);
        setModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        try {
            // TODO: await postApiService.deletePost(selectedPost.id);
            
            setPostsData(prev => ({
                ...prev,
                posts: prev.posts.filter(post => post.id !== selectedPost.id),
                totalPosts: prev.totalPosts - 1
            }));

            setModalOpen(false);

        } catch (error) {
            console.log("Delete post failed: ", error);
        };
    };

    useEffect(() => { 
        loadPosts(1); 
    }, []);    

    return (
        <div className="grow w-full max-w-200 px-4 mt-10 md:mt-20 md:mx-auto">
            {
                posts.length === 0 && loading 
                ?
                    <p>Loading ...</p>
                :
                <>
                    <div className="">
                        {posts.map((post) => (
                            <PostRow 
                                key={post.id} 
                                post={post} 
                                onDelete={() => handleDeleteClick(post)} 
                            />
                        ))}
                    </div>

                    {
                        posts.length < totalPosts 
                        &&
                        <button 
                            onClick={() => loadPosts(page + 1)}
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
                title={selectedPost?.title}
            />
        </div>
    );
};

export default PostList;