const SERVER_DOMAIN = import.meta.env.VITE_SERVER_DOMAIN;

const postService = {
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
};

export default postService;