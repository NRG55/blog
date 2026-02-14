import { body } from 'express-validator';

const emptyError = 'cannot be empty.';
const usernameLengthError = 'must be between 1 and 16 characters.';
const passwordLengthError = 'must be between 5 and 16 characters.';

const validateLogin = [    
     body('username')
        .trim()
        .notEmpty().withMessage(`Username ${emptyError}`)
        .bail()
        .isLength({ min: 1, max: 16 }).withMessage(`Last name ${usernameLengthError}`),
    body('password')
        .trim()
        .notEmpty().withMessage(`Password ${emptyError}`)
        .bail()
        .isLength({ min: 5, max: 16 }).withMessage(`Password ${passwordLengthError}`), 
];

export default validateLogin;