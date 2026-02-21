import { useSearchParams } from "react-router";
import { useEffect, useState } from "react";
import AnimationWrapper from "../components/AnimationWrapper";
import postService from "../services/post";
import PostCard from "../components/PostCard";

const SearchPage = () => {
    const [ searchParams ] = useSearchParams();
    const [ loading, setLoading ] = useState(false);
    const [ postsData, setPostsData ] = useState({
                                                    posts: [],
                                                    totalPosts: 0,
                                                    page: 1
                                                });

    const { posts, totalPosts, page } = postsData;

    const query = searchParams.get('query');

    const searchPosts = async (pageNumber) => {
        setLoading(true);

        try {            
            const data = await postService.searchPosts(query, pageNumber);

            setPostsData(prev => ({
                                    ...prev,                                    
                                    posts: pageNumber === 1 ? data.posts : [...prev.posts, ...data.posts],
                                    totalPosts: data.totalPosts,
                                    page: pageNumber
                                }));

        } catch (error) {
            console.error('Failed to load posts: ', error);
        } finally {
            setLoading(false);
        };
    };

    useEffect(() => {
        if (query) {
            searchPosts(1);
        };
        
    }, [query]);

    const loadMorePosts = () => {
        searchPosts(page + 1);
    };

    return (
        <div className="flex-1 flex-col justify-center px-8">
            {
                posts.length === 0 && loading 
                ?
                <p>Loading ...</p>
                :
                posts.length === 0 
                ?                    
                <p className="my-4">No results found for '{query}'. Please try a different keyword.</p>
                :            
                <div>
                    <p className="my-4">Search results for "{query}":</p>                  
                    <div className="md:col-span-2">                        
                        {                            
                            posts.map((post, i) => {                        
                                    return <AnimationWrapper key={`post-wrapper-${i}`} transition={{ delay: i * .1 }}>
                                                <PostCard key={`post-${i}`} post={post} author={'author'} />
                                            </AnimationWrapper>
                            })
                        }                        
                    
                        {
                            posts.length < totalPosts
                            && 
                            <button 
                                onClick={loadMorePosts}
                                disabled={loading}
                                className="relative my-8 block mx-auto underline underline-offset-6 text-sm tracking-widest font-medium hover:opacity-60 disabled:opacity-30"
                            >
                                {loading ? "Loading..." : "LOAD MORE"}                                   
                            </button>
                        }
                    </div>
                </div>                
            }            
        </div>
    )
};

export default SearchPage;