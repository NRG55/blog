import { Editor as TinyMCE } from '@tinymce/tinymce-react';
import { useAuth } from '../context/AuthContext';
import postApiService from '../api/post';
import { useRef } from 'react';

const SERVER_DOMAIN = import.meta.env.VITE_SERVER_DOMAIN;

const Editor = ({ onInit }) => {
    const { token } = useAuth();
    const currentImageRef = useRef(null);

    const handleImageUpload = (blobInfo, progress) => new Promise((resolve, reject) => {
        const formData = new FormData();

        formData.append('file', blobInfo.blob(), blobInfo.filename());

        fetch(`${SERVER_DOMAIN}/admin/posts/upload-image`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('HTTP Error: ' + response.status);
            };

            return response.json();
        })
        .then(result => {
            if (result && result.location) {                
                resolve(result.location);

                const editor = window.tinymce.activeEditor;                        
               
                editor.once('SetContent', () => {
                    const img = editor.dom.select(`img[src*="${result.location.split('/').pop()}"]`)[0];

                    if (img && result.public_id) {
                        editor.dom.setAttrib(img, 'data-public-id', result.public_id);
                    };
                });
            }
        })
        .catch(error => {
            reject('Upload failed');
            console.log(error)            
        });
    });
    
    return (
        <TinyMCE
            tinymceScriptSrc="/tinymce/tinymce.min.js"
            onInit={ onInit }
            init={{
                license_key: 'gpl',
                plugins: ['anchor', 'autolink', 'charmap', 'codesample', 'emoticons', 'link', 'lists', 'media', 'searchreplace', 'table', 'visualblocks', 'wordcount', 'image'],
                toolbar: 'undo redo | image | blocks fontfamily fontsize | bold italic underline strikethrough | link media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography uploadcare | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                extended_valid_elements: 'img[class|src|border=0|alt|title|hspace|vspace|width|height|align|onmouseover|onmouseout|name|data-public-id]',
                images_upload_handler: handleImageUpload,
                automatic_uploads: true,
                images_reuse_filename: true,
                setup: (editor) => {
                    editor.ui.registry.addButton('deleteimage', {
                        icon: 'remove',
                        tooltip: 'Delete from Cloudinary',
                        onAction: async () => {
                            const node = currentImageRef.current;
                            
                            if (node) {
                                const publicId = node.getAttribute('data-public-id');                               

                                if (!publicId) {
                                    console.log("No public_id found on this image.");

                                    return;
                                };

                                try {
                                    await postApiService.deleteImage(publicId, token);
                                    
                                    node.remove();
                                    editor.nodeChanged();
                                    currentImageRef.current = null;

                                } catch (error) {
                                    console.log("Cloudinary delete image failed:", error);
                                }
                            }
                        }
                    });

                    editor.ui.registry.addContextToolbar('imagealignment', {
                        predicate: (node) => {
                                        if (node.nodeName === 'IMG') {
                                            currentImageRef.current = node;

                                            return true;
                                        };

                                        return false;
                                    },
                        items: 'deleteimage',
                        position: 'node',
                        scope: 'node'
                    });
                }                                  
            }}
        />
    );
};

export default Editor;