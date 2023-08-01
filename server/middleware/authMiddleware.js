const authenticateUser = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.session.userId);

        if (!user) {
            return res.status(401).json({
                message: "You must be logged in to view this page.",
            });
        }
        req.user = user;

        next();
    } catch (err) {
        return res.status(500).json({
            message: "Internal server error.",
        });
    }
};

module.exports = authenticateUser;