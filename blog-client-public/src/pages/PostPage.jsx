import { useParams } from "react-router";
import postService from "../services/post";
import { useEffect, useState } from "react";
import AnimationWrapper from "../components/AnimationWrapper";
import logo from '../assets/logo.png';
import formatDate from "../utils/formatDate";

const PostPage = () => {
    const [ loading, setLoading ] = useState(false);
    const [ post, setPost ] = useState({
                                            title: '',
                                            body: '',
                                            createdAt: '',
                                            totalComments: 0                                            
                                        });

    const { title, body, createdAt, totalComments = 0 } = post;

    const { slug } = useParams();

    const getPost = async () => {
        setLoading(true);

        try {
            const data = await postService.getPostBySlug(slug);

            setPost(data.post);

        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false);
        };
    };

    useEffect(() => {
        getPost();
    }, []);

    return (
        <AnimationWrapper>
            {
                loading
                ?
                <p>Loading...</p>
                :
                <div className="max-w-225 block mx-auto py-10 max-lg:px-[5vw]">
                    <img src={logo} className="aspect-video"/>

                    <div className="mt-12">
                        <h2 className="text-3xl font-medium">{ title }</h2>
                    </div>

                    <div className="flex items-center my-8 text-gray-600">
                        <p className="capitalize mr-4">author</p>

                        <p className="mr-8">{ formatDate(createdAt) }</p>

                        <button className="cursor-pointer w-8 h-8 rounded-full flex items-center justify-center mr-2 bg-gray-100">
                            <i className="fi fi-rr-comment-dots h-5"></i>                        
                        </button
                        >
                        <span>{ totalComments }</span> 
                    </div>
                    <p>{ body }</p>

                </div>
            }

        </AnimationWrapper>

        
    );
};

export default PostPage;