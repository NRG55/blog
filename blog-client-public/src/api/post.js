const SERVER_DOMAIN = import.meta.env.VITE_SERVER_DOMAIN;

const postApiService = {
    getAll: async function(pageNumber) {
                    const params = new URLSearchParams({
                        limit: pageNumber === 1 ? '6' : '5',
                        page: pageNumber.toString()
                    });       
                    
                    const response = await fetch(`${SERVER_DOMAIN}/posts?${params}`);                    

                    if (!response.ok) {                    
                        throw new Error('Failed to fetch posts');
                    };

                    const data = await response.json();

                    const [featuredPost, ...posts] = data.posts;
                    const totalPosts = data.totalPosts - 1; // minus featuredPost - total available for "Load more" button
                   
                    return { featuredPost, posts, totalPosts };                                  
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

export default postApiService;