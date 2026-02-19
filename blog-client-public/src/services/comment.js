const SERVER_DOMAIN = import.meta.env.VITE_SERVER_DOMAIN;

const commentService = {
    postComment: async function(userId, token, postId, comment) {                       
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
};

export default commentService;