import authService from '../services/auth.js'

const signup = async (req, res) => {
    try {
        const userData = await authService.signup(req.body);        
        console.log(userData)
        res.status(200).json({
            message: "User created successfully",            
        });

    } catch (error) {
        res.status(400).json({ error: error.message });
    };  
};

const login = async (req, res) => {
    try {
        const userData = await authService.login(req.body);
        console.log(userData)
        res.json({
            message: "Login successful",            
        });

    } catch (error) {
        res.status(400).json({ error: error.message });
    };   
};

export default { signup, login };