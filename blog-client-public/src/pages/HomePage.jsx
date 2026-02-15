import { useEffect, useState } from "react";
import AnimationWrapper from "../common/AnimationWrapper";
import postService from "../services/post";
import PostCard from "../components/PostCard";
import MiniPostCard from "../components/MiniPostCard";
import FeaturedPostCard from "../components/FeaturedPostCard";
import TableOfContents from "../components/TableOfContents";

const HomePage = () => {
    const [ posts, setPosts ] = useState(null);
    const [ popularPosts, setPopularPosts ] = useState(null);

    const [featuredPost, ...remainingPosts] = posts || [];

    const getPosts = async () => {
        try {
            await postService.getPosts(setPosts);
        } catch (error) {
            console.log(error);
        };
    };

    const getPopularPosts = async () => {
        try {
            await postService.getPopularPosts(setPopularPosts);
        } catch (error) {
            console.log(error);
        };
    };

    useEffect(() => {
        getPosts();
        getPopularPosts();
    }, []);

    return (
        <AnimationWrapper>
            <div className="grid md:grid-cols-3 px-8 gap-8">

                {
                    posts === null 
                    ?
                    <p>Loading ...</p>
                    :
                    <FeaturedPostCard key={`featured-post`} content={featuredPost} author={'author'}/>
                }               

                <TableOfContents 
                    routes={["All posts", "Popular posts"]} 
                    defaultHidden={["Popular posts"]}
                    className="md:col-span-2"
                >    
                    <div className="md:col-span-2">                        
                        {
                            posts === null 
                            ?
                            <p>Loading ...</p>
                            :
                            remainingPosts.map((post, i) => {                        
                                    return <AnimationWrapper key={`post-wrapper-${i}`} transition={{ delay: i * .1 }}>
                                                <PostCard key={`post-${i}`} content={post} author={'author'} />
                                            </AnimationWrapper>
                            })
                        }
                    </div>

                    {
                        popularPosts === null 
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

                <aside className="hidden md:block md:col-start-3 md:row-start-2 md:row-end-4 sticky top-20 h-fit pr-8">
                    <div className="border border-gray-100 p-4">
                        <h3 className="font-medium text-xl mb-6">Popular Posts</h3>

                        {
                            popularPosts === null 
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