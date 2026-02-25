const SERVER_DOMAIN = import.meta.env.VITE_SERVER_DOMAIN;

const commentApiService = {
    create: async function(userId, token, postId, comment) {                       
                    const commentData = { 
                        userId,
                        postId,
                        message: comment 
                    };

                    const response = await fetch(`${SERVER_DOMAIN}/posts/${postId}/comments`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}` 
                        },
                        body: JSON.stringify(commentData),

                    });                       

                    if (!response.ok) {
                        throw new Error('POST: Failed to fetch comment');
                    };
                    
                    return await response.json();

                },
    
    getByPostId: async function(postId, pageNumber = 1) {
                    const params = new URLSearchParams({                        
                        page: pageNumber.toString(),
                        limit: '5'
                    });       

                    const response = await fetch(`${SERVER_DOMAIN}/posts/${postId}/comments?${params}`);                    

                    if (!response.ok) {                    
                        throw new Error('Failed to fetch comments');
                    };
                    
                    return await response.json();                                  
                },

    delete: async function(commentId, postId, token) {
                const response = await fetch(`${SERVER_DOMAIN}/posts/${postId}/comments/${commentId}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('DELETE: Failed to delete comment');
                };

                return true;
            },

    update: async function(commentId, newMessage, postId, token) {
                const response = await fetch(`${SERVER_DOMAIN}/posts/${postId}/comments/${commentId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ message: newMessage })
                });

                if (!response.ok) {
                    throw new Error('PUT: Failed to update comment');
                };

                return;
            }
};

export default commentApiService;