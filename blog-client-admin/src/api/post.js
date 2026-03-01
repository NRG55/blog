const SERVER_DOMAIN = import.meta.env.VITE_SERVER_DOMAIN;

const postApiService = {
    create: async function(postData, token) {
                const response = await fetch(`${SERVER_DOMAIN}/admin/posts`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(postData)
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Failed to create post');
                }

                return await response.json();
            },

    getAll: async function(pageNumber) {
                    const params = new URLSearchParams({                         
                        page: pageNumber.toString(),
                        limit: '5'
                    });       
                    
                    const response = await fetch(`${SERVER_DOMAIN}/posts?${params}`);                    

                    if (!response.ok) {                    
                        throw new Error('Failed to fetch posts');
                    };
                    
                    return await response.json();                                  
                },

    getById: async function(postId) {
                const response = await fetch(`${SERVER_DOMAIN}/posts/${postId}`);

                if (!response.ok) {
                    throw new Error('Post not found');
                };

                return await response.json();
            },

    update: async function(postId, postData, token) {
                const response = await fetch(`${SERVER_DOMAIN}/admin/posts/${postId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(postData)
                });

                if (!response.ok) {
                    throw new Error('Update failed');
                };
                
                return await response.json();
            },

    uploadImage: async function(data, token) {                     
                        const response = await fetch(`${SERVER_DOMAIN}/admin/posts/upload-image`, {
                            method: 'POST',
                            headers: {
                                'Authorization': `Bearer ${token}`
                            },
                            body: data
                        });

                        if (!response.ok) {                        
                            throw new Error('Failed to upload image');
                        };
                        
                        return await response.json();
                    },

    deleteImage: async function(imagePublicId, token) {
                    const response = await fetch(`${SERVER_DOMAIN}/admin/posts/delete-image`, {
                        method: 'DELETE',
                        headers: { 
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}` 
                        },
                        body: JSON.stringify({ imagePublicId })
                    });

                    return await response.json();
                },
};

export default postApiService;