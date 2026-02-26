export const requireAdmin = (req, res, next) => {
    if (!req.user || req.user.role !== 'ADMIN') {
        return res.status(403).json({ 
            message: "Not allowed: Admin access required" 
        });
    };

    next();
};

export default requireAdmin;