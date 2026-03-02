const SERVER_DOMAIN = import.meta.env.VITE_SERVER_DOMAIN;

const commentApiService = {
    getAll: async function(pageNumber, token) {
                    const params = new URLSearchParams({                         
                        page: pageNumber.toString(),
                        limit: '5'
                    });       
                    
                    const response = await fetch(`${SERVER_DOMAIN}/admin/comments?${params}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        }
                    });                    

                    if (!response.ok) {                    
                        throw new Error('Failed to fetch comments');
                    };
                    
                    return await response.json();                                  
                },

    getById: async function(postId, commentId) {
                const response = await fetch(`${SERVER_DOMAIN}/posts/${postId}/comments/${commentId}`);

                if (!response.ok) {
                    throw new Error('Comment not found');
                };

                return await response.json();
            },    

    delete: async function(commentId, token) {
                    const response = await fetch(`${SERVER_DOMAIN}/admin/comments/${commentId}`, {
                        method: 'DELETE',
                        headers: { 
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}` 
                        },
                    });

                    return await response.json();
                },
};

export default commentApiService;