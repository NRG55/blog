import { useState, useEffect, createContext } from 'react';

export const UserContext = createContext({});

const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState(null); // { id: '', username: '', role: '', token: '' } }  

    useEffect(() => {
        const user = localStorage.getItem('user');        
        const parsedUser = JSON.parse(user);

        if (parsedUser) {            
            const payload = JSON.parse(atob(parsedUser.token.split('.')[1]));
            const isExpired = payload.exp < Date.now() / 1000;
            
            if (isExpired) {
                setUser(null);
                localStorage.removeItem('user');
            } else {
                setUser(JSON.parse(user));                
            };            
        };
        
    }, []);    

    return (
            <UserContext.Provider value={{ user, setUser }}>
                {children}
            </UserContext.Provider>
        );
};

export default UserContextProvider;