import bcrypt from 'bcryptjs';
import prisma from '../config/prisma.js';

const signup = async (username, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: { 
            username,
            password: hashedPassword
        }
    });
    console.log('Sign up successful');
    console.log(user);
    return user;
};

const login = async (username, password) => {
    const user = await prisma.user.findUnique({
        where: { username }
    });

    if (!user) {
        throw new Error('Invalid username');
    };

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
        throw new Error('Invalid password');
    };
    console.log('Log in successful');
    console.log(user);
    return user;
};

export default { signup, login };