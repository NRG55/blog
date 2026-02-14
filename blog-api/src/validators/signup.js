import { body } from 'express-validator';
import prisma from '../config/prisma.js';

const emptyError = 'cannot be empty.';
const usernameLengthError = 'must be between 1 and 16 characters.';
const passwordLengthError = 'must be between 5 and 16 characters.';

const validateSignup = [    
    body('username')
        .trim()
        .notEmpty().withMessage(`Username ${emptyError}`)
        .bail()
        .isLength({ min: 1, max: 16 }).withMessage(`Username ${usernameLengthError}`)
        .bail()
        .custom(async (username) => {
            const user = await prisma.user.findUnique({
                where: { username },
            });

            if (user) {
                throw new Error('Username already exists');
            };

            return true;
        }),

    body('password')
        .trim()
        .notEmpty().withMessage(`Password ${emptyError}`)
        .bail()
        .isLength({ min: 5, max: 16 }).withMessage(`Password ${passwordLengthError}`),
        
    body('passwordConfirmation')
        .custom((value, { req }) => {
                    return value === req.body.password;          
                }).withMessage('Passwords do not match.'),
];

export default validateSignup;