import { Link } from 'react-router';
import logo from '../assets/logo.png';
import formatDate from '../utils/formatDate';

const FeaturedPostCard = ({ content, author }) => {
    const { title, body, createdAt, slug, _count: { comments: commentCount = 0 } } = content;

    return (
        <article className="md:flex md:col-span-3 md:p-8 gap-8">
            <div className="w-full md:max-w-80 aspect-video md:aspect-square my-8 md:my-0">
                <img src={logo} className="w-full h-full"/>
            </div>

            <div className="w-full">
                <h1 className="mb-6 text-4xl font-medium line-clamp-3">
                    {title}
                </h1>

                <p className="mb-4 text-xl line-clamp-5">
                    {body}
                </p>

                <Link to={`/posts/${slug}`} className="relative group inline-block mb-12 font-medium tracking-widest">
                    READ FULL STORY
                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-current transition-all duration-300 group-hover:w-full"></span>
                </Link>

                <div className="flex items-center text-sm text-gray-600">
                    <p className="capitalize mr-4">{author}</p>

                    <p className="mr-8">{ formatDate(createdAt) }</p>

                    <div className="w-8 h-8 flex items-center justify-center">
                        <i className="fi fi-rr-comment-dots h-4"></i>                        
                    </div>

                    <span>{ commentCount }</span>
                </div>
            </div>
        </article>
    )
};

export default FeaturedPostCard;