import { Link } from 'react-router';
import logo from '../assets/logo.png';
import getDate from '../utils/date';

const FeaturedPostCard = ({ content, author }) => {
    const { title, body, createdAt, slug } = content;

    return (
        <article className="md:flex md:col-span-3 md:p-8 gap-8">
            <div className="w-full md:max-w-80 aspect-square">
                <img src={logo} className="w-full h-full"/>
            </div>

            <div className="w-full">
                <h1 className="mb-6 text-4xl font-medium line-clamp-3">
                    {title}
                </h1>

                <p className="mb-4 text-xl line-clamp-5">
                    {body}
                </p>

                <Link className="relative group inline-block mb-12 font-medium tracking-widest">
                    READ FULL STORY
                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-current transition-all duration-300 group-hover:w-full"></span>
                </Link>

                <div className="flex gap-2 items-center text-sm text-gray-600">
                    <p>{author}</p>
                    <p>{ getDate(createdAt) }</p>
                </div>
            </div>
        </article>
    )
};

export default FeaturedPostCard;