const postService = {
    getPosts: async function(page) {
                    const SERVER_DOMAIN = import.meta.env.VITE_SERVER_DOMAIN;
                    
                    const response = await fetch(`${SERVER_DOMAIN}/posts?page=${page}`);                    

                    if (!response.ok) {                    
                        throw new Error('Failed to fetch posts', { cause: data.errors || ['Posts not found'] });
                    };
                    
                    return await response.json();                                  
                },

    getPopularPosts: async function() {
                        const SERVER_DOMAIN = import.meta.env.VITE_SERVER_DOMAIN;
                        
                        const response = await fetch(`${SERVER_DOMAIN}/posts`);                       

                        if (!response.ok) {
                        
                            throw new Error('Failed to fetch popular posts', { cause: data.errors || ['Popular posts not found'] });
                        };
                        
                        return await response.json();
                    }
};

export default postService;