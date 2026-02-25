import { useParams } from "react-router";
import postApiService from "../api/post";
import { useEffect, useState } from "react";
import AnimationWrapper from "../components/AnimationWrapper";
import logo from '../assets/logo.png';
import formatDate from "../utils/formatDate";
import CommentSection from "../components/CommentSection";

const PostPage = () => {
    const [ loading, setLoading ] = useState(false);
    const [ post, setPost ] = useState({
                                            id: '',
                                            title: '',
                                            body: '',
                                            createdAt: '',
                                            author: { username: '' },
                                        });

    const { id, title, body, createdAt, author: { username } } = post;

    const { slug } = useParams();

    const getPost = async () => {
        setLoading(true);

        try {
            const data = await postApiService.getPostBySlug(slug);

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
                <div className="grow flex-col max-w-225 block mx-auto py-10 max-lg:px-[5vw]">
                    <div className="">
                        <img src={ logo } className="aspect-video"/>

                        <div className="mt-12">
                            <h2 className="text-3xl font-medium">{ title }</h2>
                        </div>

                        <div className="flex items-center my-8 text-gray-600">
                            <p className="capitalize mr-4">{ username }</p>

                            <p className="mr-8">{ formatDate(createdAt) }</p> 
                        </div>

                        <p>{ body }</p>
                    </div>

                    <CommentSection postId={ id } />
                </div>
            }

        </AnimationWrapper>

        
    );
};

export default PostPage;