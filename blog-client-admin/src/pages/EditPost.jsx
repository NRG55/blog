import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import postApiService from "../api/post";
import Editor from "../components/Editor";

const EditPost = () => {
    const [ loading, setLoading ] = useState(true);
    const [ isUploading, setIsUploading ] = useState(false);
    const [ formData, setFormData ] = useState({
                                                    title: '',
                                                    imageUrl: '',
                                                    imagePublicId: '',
                                                    published: false,
                                                    body: ''
                                                });
    const { postId } = useParams();    
    const { token } = useAuth();
    const editorRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const data = await postApiService.getById(postId);

                setFormData({
                    title: data.title,
                    imageUrl: data.imageUrl || '',
                    imagePublicId: data.imagePublicId || '',
                    published: data.published,
                    body: data.body
                });

            } catch (error) {
                console.log(error);
                navigate('/posts');

            } finally {
                setLoading(false);
            };
        };

        fetchPost();
    }, []);

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
            body: editorRef.current ? editorRef.current.getContent() : formData.body
        };

        try {
            setIsUploading(true);

            await postApiService.update(postId, postData, token);

            navigate('/posts');

        } catch (error) {
            console.log(error);

        } finally {
            setIsUploading(false);
        };
    };

    const handleImageUpload = async (event) => {
        const file = event.target.files[0];

        if (!file) {
            return;
        };

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

        setFormData(prev => ({ ...prev, imageUrl: '', imagePublicId: '' }));
    };

    if (loading) {
        return <div className="p-20 text-center">Loading post data...</div>;
    };

    return (
        <div className="w-full max-w-4xl mt-10 mx-auto p-6">
            <h1 className="text-2xl mb-6">Edit Post</h1>
            
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Main Image
                    </label>

                    {
                        formData.imageUrl 
                        &&
                        <div className="relative w-full h-64 mb-2 bg-gray-100 rounded-xs overflow-hidden border border-gray-100">
                            <img src={formData.imageUrl} className="w-full h-full object-cover" alt="preview" />

                            <button 
                                type="button" 
                                onClick={handleDeleteImage} 
                                className="absolute top-2 right-2 px-2 py-1 bg-white border border-gray-600 rounded-xs font-bold hover:opacity-80 transition"
                            >
                                ✕
                            </button>
                        </div>
                    }

                    <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleImageUpload} 
                        className="block w-full text-sm text-gray-400 file:mr-4 file:py-1 file:px-2 file:rounded-xs file:border file:border-gray-400 hover:file:opacity-80"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Title
                    </label>

                    <input 
                        type="text" 
                        name="title" 
                        value={formData.title}
                        onChange={handleInputChange} 
                        required 
                        className="mt-1 block w-full border border-gray-200 rounded-xs p-2"                         
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Content
                    </label>
                    
                    <Editor 
                        initialValue={formData.body} 
                        onInit={(evt, editor) => editorRef.current = editor} 
                    />                    
                </div>

                <div className="flex items-center">
                    <input 
                        id="publish-checkbox" 
                        type="checkbox" 
                        name="published"
                        onChange={handleInputChange} 
                        checked={formData.published} 
                        className="h-4 w-4"                         
                    />

                    <label htmlFor="publish-checkbox" className="ml-2 block text-sm font-medium text-gray-700">
                        Publish
                    </label>
                </div>

                <button 
                    type="submit" 
                    disabled={isUploading} 
                    className="block ml-auto bg-black text-white py-2 px-6 rounded-xs hover:opacity-80 transition disabled:opacity-50"
                >
                    { isUploading ? "Updating..." : "Update Post" }
                </button>
            </form>
        </div>
    );
};

export default EditPost;