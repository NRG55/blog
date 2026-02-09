import passport from '../config/passport.js';

const requireAuth = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (error, user, info) => {
        if (error) {
            return next(error);
        };

        if (!user) {
            return res.status(401).json({
                message: info ? info.message : 'Unauthorized'
            });
        };

        req.user = user;

        next();
    })(req, res, next);
};

export default requireAuth;