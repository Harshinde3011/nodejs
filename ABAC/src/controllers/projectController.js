import {projects} from "../data/projectData.js";
import { authorize } from "../middleware/authorize.js";
import { canViewPorject, canUpdateProject } from "../policies/projectPolicies.js";

export const viewProject = (req, res) => {
    console.log("Authenticated");
    const projectId = parseInt(req.params.id);
    const project = getProjectById(projectId);

    console.log("project is :", project);
    authorize(canViewPorject, project)(req, res, () => {
        res.status(200).json({
            status: 200,
            message: "Project retrieved successfully",
            data: project
        })
    })
};

export const updateProject = (req, res) => {
    const projectId = parseInt(req.params.id);
    const project = getProjectById(projectId);

    console.log("project is :", project);
    authorize(canUpdateProject, project)(req, res, () => {
        res.status(200).json({
            status: 200,
            message: "Project updated successfully",
            data: project
        })
    })
};

function getProjectById(projectId) {
    const project = projects.find((project) => project.id === projectId);

    if (!project) {
        return res.status(401).json({
            status: 401,
            message: "Project with given id not avaiable"
        })
    }else{
        return project;
    }
}