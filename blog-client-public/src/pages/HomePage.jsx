import { useEffect, useState } from "react";
import AnimationWrapper from "../components/AnimationWrapper";
import postApiService from "../api/post";
import PostCard from "../components/PostCard";
import MiniPostCard from "../components/MiniPostCard";
import FeaturedPostCard from "../components/FeaturedPostCard";
import TableOfContents from "../components/TableOfContents";

const HomePage = () => {
    const [ isInitialLoading, setIsInitialLoading ] = useState(true);
    const [ isMoreLoading, setIsMoreLoading ] = useState(false);
    const [ popularPosts, setPopularPosts ] = useState([]);
    const [ postsData, setPostsData ] = useState({
                                                    featuredPost: null,
                                                    posts: [],
                                                    totalPosts: 0,
                                                    page: 1
                                                });

    const { featuredPost, posts, totalPosts, page } = postsData;

    useEffect(() => {
        const fetchInitialData = async () => {
            setIsInitialLoading(true);

            try {
                const [ postsResult, popularPostsResult ] = await Promise.all([
                    postApiService.getAll(1),
                    postApiService.getPopularPosts()
                ]);

                setPostsData({
                    featuredPost: postsResult.featuredPost,
                    posts: postsResult.posts,
                    totalPosts: postsResult.totalPosts,
                    page: 1
                });

                setPopularPosts(popularPostsResult.posts);

            } catch (error) {
                console.error(error);

            } finally {
                setIsInitialLoading(false);
            };
        };

        fetchInitialData();
    }, []);

    const loadMorePosts = async () => {
        const nextPage = page + 1;

        setIsMoreLoading(true);

        try {
            const postsResult = await postApiService.getAll(nextPage);

            setPostsData(prev => ({
                ...prev,
                posts: [...prev.posts, ...postsResult.posts],
                page: nextPage
            }));

        } catch (error) {
            console.log(error);

        } finally {
            setIsMoreLoading(false);
        };
    };

    if (isInitialLoading) {
        return (
            <div className="grow flex items-center justify-center min-h-[50vh]">
                <p className="animate-pulse font-medium">Loading Page...</p>
            </div>
        );
    };

    return (
        <AnimationWrapper>
            <div className="grow grid md:grid-cols-3 px-8 gap-8">
                { 
                    !featuredPost && posts.length === 0 && popularPosts.length === 0 
                    &&
                    <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
                        <h2 className="text-xl font-medium text-gray-900">No posts found</h2>
                        <p className="text-gray-500 mt-2">Check back later for new content!</p>
                    </div>
                }

                { featuredPost && <FeaturedPostCard key={`featured-post`} post={featuredPost} /> }
                                  
                {
                    (posts.length > 0 || popularPosts.length > 0) 
                    && 
                    <TableOfContents 
                        routes={["All posts", "Popular posts"]} 
                        defaultHidden={["Popular posts"]}
                        className="md:col-span-2"
                    >    
                        <div className="h-full md:col-span-2">                        
                            {
                                posts.map((post, i) =>
                                    <AnimationWrapper key={`post-wrapper-${i}`} transition={{ delay: i * .1 }}>
                                        <PostCard key={`post-${i}`} post={post} />
                                    </AnimationWrapper>
                            )}                        
                        
                            {
                                posts.length < totalPosts 
                                &&
                                <button 
                                    onClick={loadMorePosts}
                                    disabled={isMoreLoading}
                                    className="my-8 block mx-auto underline text-sm tracking-widest font-medium hover:opacity-60 disabled:opacity-30"
                                >
                                    { isMoreLoading ? "Loading..." : "LOAD MORE" }                                   
                                </button>
                            }
                        </div>                   

                        {
                            popularPosts.map((post, i) =>
                                <AnimationWrapper key={`popular-post-wrapper-${i}`} transition={{ delay: i * .1 }}>
                                    <MiniPostCard key={`popular-post-${i}`} post={post} />
                                </AnimationWrapper>
                        )}
                    </TableOfContents>
                }

                {
                    popularPosts.length > 0 
                    &&
                    <aside className="hidden md:block md:col-start-3 md:row-start-2 md:row-end-4 sticky top-20 h-fit pr-8">
                        <div className="border border-gray-100 p-4">
                            <h3 className="font-medium mb-6">Popular Posts</h3>

                            {popularPosts.map((post, i) =>
                                <AnimationWrapper key={`popular-post-wrapper-${i}`} transition={{ delay: i * .1 }}>
                                    <MiniPostCard key={`popular-post-${i}`} post={post} />
                                </AnimationWrapper>
                            )}
                        </div>
                    </aside>
                }
            </div>
        </AnimationWrapper>
    );
};

export default HomePage;