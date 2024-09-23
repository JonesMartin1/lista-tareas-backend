import { Router, Request, Response } from "express";
// Modelos
import Task from "../models/Task";


const obtenerTarea = async (req: Request, res: Response) => {
    const tasks = await Task.find();
    const plainTasks = tasks.map(task => task.toObject());
    res.render('tasks/list', { tasks: plainTasks });
}

const crearTarea = async (req: Request, res: Response) => {
    const { title, description } = req.body
    const newTask = new Task({ title, description })
    await newTask.save()
    res.redirect('/tasks/list')
}

const eliminarTarea = async (req: Request, res: Response) => {
    const { id } = req.params
    await Task.findByIdAndDelete(id)
    res.redirect('/tasks/list')
}

const obtenerTareaId = async (req: Request, res: Response) => {
    const { id } = req.params;
    const task = await Task.findById(id).lean();
    res.render('tasks/edit', { task });
}

const editarTarea = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, description } = req.body;
    await Task.findByIdAndUpdate(id, { title, description });
    res.redirect('/tasks/list');
}

export {crearTarea, obtenerTarea, eliminarTarea, obtenerTareaId, editarTarea}