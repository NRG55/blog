const authService = {
    login: async function(userData) {
                    const SERVER_DOMAIN = import.meta.env.VITE_SERVER_DOMAIN;

                    const response = await fetch(`${SERVER_DOMAIN}/auth/login`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(userData),
                    });
                    
                    const data = await response.json();

                    if (!response.ok) {                    
                        throw new Error('Validation Error', { cause: data.errors || ['Signup failed'] });
                    };                    
                    
                    return data;                
                }
};

export default authService;



