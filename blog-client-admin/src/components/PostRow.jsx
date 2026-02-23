import { Link } from "react-router";

const PostRow = ({ post }) => {
    return (
        <div className="flex w-full justify-between">
            <p>{ post.title }</p>

            <div>
                <Link to={`${post.id}/comments`}>Comments</Link>

                <Link to={`${post.id}/edit`}>Edit</Link>

                <button>Delete</button>
            </div>            
        </div>
    );
};

export default PostRow;