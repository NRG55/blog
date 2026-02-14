import authService from '../services/auth.js'

const signup = async (req, res) => {
    try {
        const userData = await authService.signup(req.body);
        
        res.status(200).json({
            message: "User created successfully",
            ...userData // { user: {}, token: "" }           
        });

    } catch (error) {
        res.status(400).json({ errors: [{ msg: error.message }] });
    };  
};

const login = async (req, res) => {
    try {
        const userData = await authService.login(req.body);
        
        res.json({
            message: "Login successful",
            ...userData  // { user: {}, token: "" }
        });

    } catch (error) {
        res.status(400).json({ errors: [{ msg: error.message }] });
    };   
};

export default { signup, login };