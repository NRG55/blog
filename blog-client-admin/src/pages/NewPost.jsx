import { useState, useRef } from 'react';
import Editor from '../components/Editor';

const NewPost = () => {
    const [ formData, setFormData ] = useState({
        title: '',
        published: false
    });

    const editorRef = useRef(null);

    const handleInputChange = (event) => {
        const { name, value, type, checked } = event.target;

        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        const postData = {
            ...formData,
            body: editorRef.current ? editorRef.current.getContent() : ''
        };

        console.log(postData);
        //TODO: post service create method
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl mb-6">Create New Post</h1>
            
            <form onSubmit={ handleSubmit } className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Title
                    </label>

                    <input
                        type="text"
                        name="title"
                        required
                        className="mt-1 block w-full border border-gray-100 rounded-xs p-2"
                        onChange={ handleInputChange }
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Content
                    </label>

                    <Editor onInit={(evt, editor) => editorRef.current = editor} />
                </div>

                <div className="flex items-center">
                    <input
                        id="publish-checkbox"
                        type="checkbox"
                        name="published"
                        className="h-4 w-4"
                        onChange={ handleInputChange }
                    />
                    <label 
                        htmlFor="publish-checkbox"
                        className="ml-2 block text-sm"
                    >
                        Publish
                    </label>
                </div>

                <button
                    type="submit"
                    className="block ml-auto bg-black text-white py-2 px-4 rounded-xs hover:opacity-80 transition"
                >
                    Create Post
                </button>
            </form>
        </div>
    );
};

export default NewPost;