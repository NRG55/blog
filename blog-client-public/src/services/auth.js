const authService = {
    authenticate: async function(userData, setUser, authMode ) {
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

                    if (data) {
                        setUser(data);
                        localStorage.setItem('user', JSON.stringify(data));
                    };
                    
                    return data;                
                },                
    logout: function(setUser) {
                setUser(null);                

                localStorage.removeItem('user');                
            }
};

export default authService;



