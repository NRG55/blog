const authApiService = {
    authenticate: async function(userData, authMode ) {
                    const SERVER_DOMAIN = import.meta.env.VITE_SERVER_DOMAIN;
                    // authMode: 'signup' or 'login'
                    const response = await fetch(`${SERVER_DOMAIN}/auth/${authMode}`, {
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

export default authApiService;



