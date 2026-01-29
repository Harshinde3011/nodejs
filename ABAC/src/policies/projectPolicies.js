export const canViewPorject = (user, project) => {
    return (
        user.role === "admin" || 
        user.department === project.department ||
        (user.accessLevel >= project.accessLevel && project.team.includes(user.id))
    )
}

export const canUpdateProject = () => {
    return (
        user.role === "admin" || 
        (user.role === "manager" && user.department === project.department) ||
        project.team.includes(user.id)
    )
}