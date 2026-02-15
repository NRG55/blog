import { useEffect, useState } from "react";
import AnimationWrapper from "../common/AnimationWrapper";
import postService from "../services/post";
import PostCard from "../components/PostCard";

const HomePage = () => {
    const [ posts, setPosts ] = useState(null);

    const getPosts = async () => {
        try {
            await postService.getPosts(setPosts);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getPosts()
    }, []);

    return (
        <AnimationWrapper>
            <section className="flex-col">
                {
                    posts === null 
                    ?
                    <p>Loading ...</p>
                    :
                    posts.map((post, i) => {
                        
                        return <PostCard key={`post-${i}`} content={post} author={'author'} />
                    }) 
                }
            </section>
        </AnimationWrapper>

    )
};

export default HomePage;