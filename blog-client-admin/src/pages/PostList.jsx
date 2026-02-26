import { useState } from "react"
import postService from "../api/post";
import { useEffect } from "react";
import PostRow from "../components/PostRow";

const PostList = () => {
    const [ loading, setLoading ] = useState(false);
    const [ postsData, setPostsData ] = useState({
                                                    posts: [],
                                                    totalPosts: 0,
                                                    page: 1
                                                });

    const { posts, totalPosts, page } = postsData;

    const loadPosts = async (pageNumber) => {
        setLoading(true);

        try {            
            const data = await postService.getAll(pageNumber);

            setPostsData(prev => ({
                                    ...prev,                                    
                                    posts: pageNumber === 1 ? data.posts : [...prev.posts, ...data.posts],
                                    totalPosts: data.totalPosts,
                                    page: pageNumber
                                }));

        } catch (error) {
            console.error(error);

        } finally {
            setLoading(false);
        };
    };
    

    useEffect(() => {
        loadPosts(1);
    }, []);

    const loadMorePosts = () => {
        const nextPage = page + 1;

        loadPosts(nextPage);
    };

    return (
            posts.length === 0 && loading 
            ?
            <p>Loading ...</p>
            :                      
            <div className="w-full">                        
                {                            
                    posts.map((post) =>                         
                        <PostRow key={ post.id } post={ post } />
                    )
                }                        
            
                {
                    posts.length < totalPosts
                    && 
                    <button 
                        onClick={ loadMorePosts }
                        disabled={ loading }
                        className="my-8 block mx-auto underline underline-offset-6 text-sm tracking-widest font-medium hover:opacity-60 disabled:opacity-30"
                    >
                        { loading ? "Loading..." : "LOAD MORE" }                                   
                    </button>
                }
            </div> 
    );
};

export default PostList;