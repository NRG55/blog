const postService = {
    getPosts: async function(setPosts) {
                    const SERVER_DOMAIN = import.meta.env.VITE_SERVER_DOMAIN;
                    
                    const response = await fetch(`${SERVER_DOMAIN}/posts`);

                    const data = await response.json();

                    if (!response.ok) { 
                    
                        throw new Error('GET posts failed', { cause: data.errors || ['Signup failed'] });
                    };
                    
                    return setPosts(data.posts);                                  
                }
};

export default postService;