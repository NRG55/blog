const signup = async (req, res) => {
    return res.send('sign up');
};

const login = async (req, res) => {
    return res.send('log in');
};

export default { signup, login };