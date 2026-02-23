import { Editor as TinyMCE } from '@tinymce/tinymce-react';

const SERVER_DOMAIN = import.meta.env.VITE_SERVER_DOMAIN;

const Editor = ({ onInit }) => {
    
    return (
        <TinyMCE
            tinymceScriptSrc="/tinymce/tinymce.min.js"
            onInit={ onInit }
            init={{
                license_key: 'gpl',
                plugins: ['anchor', 'autolink', 'charmap', 'codesample', 'emoticons', 'link', 'lists', 'media', 'searchreplace', 'table', 'visualblocks', 'wordcount', 'image'],
                toolbar: 'undo redo | image | blocks fontfamily fontsize | bold italic underline strikethrough | link media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography uploadcare | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                images_upload_url: `${SERVER_DOMAIN}/posts/upload-image`, 
                automatic_uploads: true,
                images_reuse_filename: true,                
            }}
        />
    );
};

export default Editor;