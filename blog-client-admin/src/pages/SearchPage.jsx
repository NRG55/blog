import { useSearchParams } from "react-router";
import { useEffect, useState } from "react";
import postApiService from "../api/post";
import PostRow from "../components/PostRow";
import { useAuth } from "../context/AuthContext";

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
    const { token } = useAuth();

    const searchPosts = async (pageNumber) => {
        setLoading(true);

        try {            
            const data = await postApiService.searchPosts(query, pageNumber, token);

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
            setPostsData({ posts: [], totalPosts: 0, page: 1 });
            searchPosts(1);
        };
        
    }, [query]);

    const loadMorePosts = () => {
        searchPosts(page + 1);
    };

    return (
        <div className="grow flex-col justify-center px-8">
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
                            posts.map((post, i) =>                        
                                <PostRow key={`post-${i}`} post={post} author={'author'} />
                            )
                        }                        
                    
                        {
                            posts.length < totalPosts
                            && 
                            <button 
                                onClick={loadMorePosts}
                                disabled={loading}
                                className="relative my-8 block mx-auto underline underline-offset-6 text-sm tracking-widest font-medium hover:opacity-60 disabled:opacity-30"
                            >
                                { loading ? "Loading..." : "LOAD MORE" }                                   
                            </button>
                        }
                    </div>
                </div>                
            }            
        </div>
    )
};

export default SearchPage;