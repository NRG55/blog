import { useEffect, useState } from "react";
import AnimationWrapper from "../components/AnimationWrapper";
import postApiService from "../api/post";
import PostCard from "../components/PostCard";
import PopularPostCard from "../components/PopularPostCard";
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
                    postApiService.getAll(1, 'true'),
                    postApiService.getPopular()
                ]);

                setPostsData({
                    featuredPost: postsResult.featuredPost,
                    posts: postsResult.posts,
                    totalPosts: postsResult.totalPosts,
                    page: 1
                });

                setPopularPosts(popularPostsResult);

            } catch (error) {
                console.log(error);

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
            const postsResult = await postApiService.getAll(nextPage, 'true'); // true - only published

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
            <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-12 gap-x-12 gap-y-10">
                {
                    !featuredPost && posts.length === 0 
                    &&
                    <div className="md:col-span-12 py-20 text-center">
                        <h2 className="text-xl font-medium text-gray-900">No posts found</h2>
                        <p className="text-gray-500 mt-2">Please, check back later for new content!</p>
                    </div>
                }
                
                {
                    featuredPost 
                    &&
                    <div className="md:col-span-12 mb-4">
                        <FeaturedPostCard post={featuredPost} />
                    </div>
                }

                <div className="md:col-span-8">
                    {
                        (posts.length > 0 || popularPosts.length > 0) 
                        &&
                        <TableOfContents 
                            routes={["All posts", "Popular posts"]} 
                            defaultHidden={["Popular posts"]}
                        >
                            <div className="flex flex-col">                        
                                {
                                    posts.map((post, i) =>
                                        <AnimationWrapper key={`post-${i}`} transition={{ delay: i * .1 }}>
                                            <PostCard post={post} />
                                        </AnimationWrapper>)
                                }                        
                            
                                {
                                    posts.length < totalPosts 
                                    &&
                                    <button 
                                        onClick={loadMorePosts}
                                        disabled={isMoreLoading}
                                        className="my-8 block mx-auto underline underline-offset-6 text-sm tracking-widest font-medium hover:opacity-60 disabled:opacity-30"
                                    >
                                        { isMoreLoading ? "LOADING..." : "LOAD MORE" }                                   
                                    </button>
                                }
                            </div>

                            <div className="flex flex-col gap-6">
                                {
                                    popularPosts.map((post, i) =>
                                        <AnimationWrapper key={`popular-tab-${i}`} transition={{ delay: i * .1 }}>
                                            <PopularPostCard post={post} />
                                        </AnimationWrapper>)
                                }
                            </div>
                        </TableOfContents>
                    }
                </div>

                {
                    popularPosts.length > 0 
                    &&
                    <aside className="hidden md:block md:col-span-4 sticky top-24 h-fit">
                        <div className="pl-8 border-l border-gray-100">
                            <div className="flex items-center gap-2 mb-8">                        
                                <h3 className="">
                                    Popular posts
                                </h3>
                            </div>

                            <div className="flex flex-col gap-4">
                                {
                                    popularPosts.map((post, i) =>
                                        <AnimationWrapper key={`side-popular-${i}`} transition={{ delay: i * .1 }}>
                                            <PopularPostCard post={post} />
                                        </AnimationWrapper>)
                                }
                            </div>                   
                        </div>
                    </aside>
                }
            </div>
        </AnimationWrapper>
    );
};

export default HomePage;