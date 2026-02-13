const authService = {
    signup: async function(userData) {               
                const response = await fetch('http://localhost:3000/auth/signup', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(userData),
                });

                const data = await response.json();

                if (!response.ok) { 
                 
                    throw new Error('Validation Error', { cause: data.errors || ['Signup failed'] });
                };                    

                if (data.token) {
                    localStorage.setItem('userToken', data.token);
                };
                
                return data;                
            },
};

export default authService;



