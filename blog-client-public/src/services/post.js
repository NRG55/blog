const SERVER_DOMAIN = import.meta.env.VITE_SERVER_DOMAIN;

const postService = {
    getPosts: async function(pageNumber) {
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

    getPopularPosts: async function() {                       
                        const response = await fetch(`${SERVER_DOMAIN}/posts`);                       

                        if (!response.ok) {
                        
                            throw new Error('Failed to fetch popular posts');
                        };
                        
                        return await response.json();
                    },

    searchPosts: async function(query, pageNumber) {
                    const params = new URLSearchParams({
                        query, 
                        page: pageNumber.toString(),
                        limit: '5'
                    });
                    
                    const response = await fetch(`${SERVER_DOMAIN}/posts/search?${params}`);                    

                    if (!response.ok) {                    
                        throw new Error('Failed to fetch search posts');
                    };
                    
                    return await response.json();                                  
                },

    getPostBySlug: async function(slug) {                       
                        const response = await fetch(`${SERVER_DOMAIN}/posts/slug/${slug}`);                       

                        if (!response.ok) {
                        
                            throw new Error('Failed to fetch popular posts');
                        };
                        
                        return await response.json();
                    },
};

export default postService;