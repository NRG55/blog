import 'dotenv/config';
import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import prisma from './prisma.js';

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
};

const strategy = new JwtStrategy(options, async (payload, done) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: payload.sub },
            select: { 
                id: true, 
                username: true, 
                role: true 
            }
        });

        if (!user) {
            return done(null, false);
        };

        return done(null, user);

    } catch (error) {
        done(error, false);
    };
});

passport.use(strategy);

export default passport;