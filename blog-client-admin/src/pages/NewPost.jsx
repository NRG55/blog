import { useState, useRef } from 'react';
import Editor from '../components/Editor';
import postApiService from '../api/post';
import { useAuth } from '../context/AuthContext';

const NewPost = () => {
    const [ isUploading, setIsUploading ] = useState(false);
    const [ formData, setFormData ] = useState({
        title: '',
        imageUrl: '',
        imagePublicId: '',
        published: false
    });

    const { token } = useAuth();
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

    const handleImageUpload = async (event) => {
        const file = event.target.files[0];

        if (!file) return;

        setIsUploading(true);

        const data = new FormData();

        data.append('file', file);

        try {            
            const result = await postApiService.uploadImage(data, token);
   
            setFormData(prev => ({ 
                ...prev, 
                imageUrl: result.location,
                imagePublicId: result.public_id
            }));

        } catch (error) {
            console.log(error);

        } finally {
            setIsUploading(false);
        };
    };

    const handleDeleteImage = async () => {
        if (formData.imagePublicId) {
            try {
                await postApiService.deleteImage(formData.imagePublicId, token);

            } catch (error) {
                console.log(error);
            };
        };

        setFormData(prev => ({ 
            ...prev, 
            imageUrl: '', 
            imagePublicId: '' 
        }));
 
        const fileInput = document.getElementById('mainImageInput');

        if (fileInput) {
            fileInput.value = '';
        };
    };

    return (
        <div className="w-full max-w-4xl mt-10 mx-auto p-6">
            <h1 className="text-2xl mb-6">Create New Post</h1>
            
            <form onSubmit={ handleSubmit } className="space-y-4">
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Main Image
                    </label>
                    
                    {
                        formData.imageUrl 
                        &&
                        <div className="relative w-full h-64 mb-2 bg-gray-100 rounded-xs overflow-hidden border border-gray-100">
                            <img 
                                src={ formData.imageUrl } 
                                alt="Featured preview" 
                                className="w-full h-full object-cover" 
                            />
                            
                            <button
                                type="button"
                                onClick={ handleDeleteImage }
                                className="absolute top-2 right-2 px-2 py-1 text-gray-600 border border-gray-600 bg-white rounded-xs font-bold hover:opacity-80 transition"
                            >
                               &#x2715;
                            </button>
                        </div>
                    }

                    <input
                        id="mainImageInput"
                        type="file"
                        accept="image/*"
                        onChange={ handleImageUpload }
                        className="block w-full text-sm text-gray-400 file:text-gray-800 file:mr-4 file:py-1 file:px-2 file:rounded-xs file:border file:border-gray-400 hover:file:opacity-80"
                    />

                    {
                        isUploading 
                        && 
                        <p className="text-xs text-gray-500 mt-1">
                            Uploading to Cloudinary...
                        </p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Title
                    </label>

                    <input
                        type="text"
                        name="title"
                        required
                        className="mt-1 block w-full border border-gray-200 rounded-xs p-2"
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
                        className="ml-2 block text-sm font-medium text-gray-700"
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