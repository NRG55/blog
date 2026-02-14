import bcrypt from 'bcryptjs';
import prisma from '../config/prisma.js';
import generateToken from '../utils/generateToken.js';

const signup = async ({ username, password }) => {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: { 
            username,
            password: hashedPassword
        }
    });

    const token = generateToken(user);

    return { user, token };
};

const login = async ({ username, password }) => {
    const userData = await prisma.user.findUnique({
        where: { username }
    });

    if (!userData) {
        throw new Error('Invalid username');
    };

    const isPasswordMatch = await bcrypt.compare(password, userData.password);

    if (!isPasswordMatch) {
        throw new Error('Invalid password');
    };

    const { password: _, ...user } = userData;

    const token = generateToken(user);

    return { user, token };
};

export default { signup, login };