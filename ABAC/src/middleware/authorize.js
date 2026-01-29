export const authorize = (policy, resource) => (req, res, next) => {  // policy: canViewProject, canEditProject
    const user = req.user;
    if (policy(user, resource)) {
        next()
    }else{
        return res.status(402).json({
            status: 402,
            message: "Access denied"
        })
    }
}