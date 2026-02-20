import { useEffect, useState } from "react";
import AnimationWrapper from "../components/AnimationWrapper";
import postService from "../services/post";
import PostCard from "../components/PostCard";
import MiniPostCard from "../components/MiniPostCard";
import FeaturedPostCard from "../components/FeaturedPostCard";
import TableOfContents from "../components/TableOfContents";

const HomePage = () => {
    const [ loading, setLoading ] = useState(false);
    const [ popularPosts, setPopularPosts ] = useState([]);
    const [ postsData, setPostsData ] = useState({
                                                    featuredPost: null,
                                                    posts: [],
                                                    totalPosts: 0,
                                                    page: 1
                                                });

    const { featuredPost, posts, totalPosts, page } = postsData;

    const loadPosts = async (pageNumber) => {
        setLoading(true);

        try {            
            const data = await postService.getPosts(pageNumber);

            setPostsData(prev => ({
                                    ...prev,
                                    featuredPost: pageNumber === 1 ? data.featuredPost : prev.featuredPost,
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

    const loadPopularPosts = async () => {
        setLoading(true);

        try {
            const data = await postService.getPopularPosts();

            setPopularPosts(data.posts);

        } catch (error) {
            console.error('Failed to load popular posts: ',error);
        }finally {
            setLoading(false);
        };
    };

    useEffect(() => {
        loadPosts(1);
        loadPopularPosts();
    }, []);

    const loadMorePosts = () => {
        const nextPage = page + 1;

        loadPosts(nextPage);
    };

    return (
        <AnimationWrapper>
            <div className="grid md:grid-cols-3 px-8 gap-8">

                {
                    !featuredPost && loading 
                    ?
                    <p>Loading ...</p>
                    :
                    featuredPost && <FeaturedPostCard key={`featured-post`} content={featuredPost} author={'author'}/>
                }

                {
                    posts.length === 0 && loading 
                    ?
                    <p>Loading ...</p>
                    :
                    <TableOfContents 
                        routes={["All posts", "Popular posts"]} 
                        defaultHidden={["Popular posts"]}
                        className="md:col-span-2"
                    >    
                        <div className="md:col-span-2">                        
                            {                            
                                posts.map((post, i) => {                        
                                    return <AnimationWrapper key={`post-wrapper-${i}`} transition={{ delay: i * .1 }}>
                                                <PostCard key={`post-${i}`} content={post} author={'author'} />
                                            </AnimationWrapper>
                                })
                            }                        
                        
                            {
                                posts.length < totalPosts
                                && 
                                <button 
                                    onClick={loadMorePosts}
                                    disabled={loading}
                                    className="my-8 block mx-auto underline underline-offset-6 text-sm tracking-widest font-medium hover:opacity-60 disabled:opacity-30"
                                >
                                    {loading ? "Loading..." : "LOAD MORE"}                                   
                                </button>
                            }
                        </div>                   

                        {
                            popularPosts.length === 0 && loading 
                            ?
                            <p>Loading ...</p>
                            :
                            popularPosts.map((post, i) => {
                                
                                return <AnimationWrapper key={`popular-post-wrapper-${i}`} transition={{ delay: i * .1 }}>
                                            <MiniPostCard key={`popular-post-${i}`} content={post} author={'author'} />
                                        </AnimationWrapper>
                            })
                        }

                    </TableOfContents>
                }

                <aside className="hidden md:block md:col-start-3 md:row-start-2 md:row-end-4 sticky top-20 h-fit pr-8">
                    <div className="border border-gray-100 p-4">
                        <h3 className="font-medium text-xl mb-6">Popular Posts</h3>

                        {
                            popularPosts.length === 0 && loading 
                            ?
                            <p>Loading ...</p>
                            :
                            popularPosts.map((post, i) => {
                                
                                return <AnimationWrapper key={`popular-post-wrapper-${i}`} transition={{ delay: i * .1 }}>
                                            <MiniPostCard key={`popular-post-${i}`} content={post} author={'author'} />
                                        </AnimationWrapper>
                            }) 
                        }

                    </div>
                </aside>

            </div>
        </AnimationWrapper>
    );
};

export default HomePage;