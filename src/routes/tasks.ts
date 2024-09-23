import { Router, Request, Response } from "express";

const router = Router();

// Modelos
import Task from "../models/Task";

router.route('/create')
    .get((req: Request, res: Response) => {
        res.render('tasks/create')
    })
    .post(async (req: Request, res: Response) => {
        const { title, description } = req.body
        const newTask = new Task({ title, description })
        await newTask.save()
        res.redirect('/tasks/list')
    })

router.route('/list')
    .get(async (req: Request, res: Response) => {
        const tasks = await Task.find();
        const plainTasks = tasks.map(task => task.toObject());  // Convierte a objetos planos
        res.render('tasks/list', { tasks: plainTasks });
    });

router.route('/delete/:id')
    .get(async (req: Request, res: Response) => {
        const { id } = req.params
        await Task.findByIdAndDelete(id)
        res.redirect('/tasks/list')
    })

router.route('/edit/:id')
    .get(async (req: Request, res: Response) => {
        const { id } = req.params;
        const task = await Task.findById(id).lean();  // Convierte el documento en un objeto plano
        res.render('tasks/edit', { task });
    })
    .post(async (req: Request, res: Response) => {
        const { id } = req.params;
        const { title, description } = req.body;
        await Task.findByIdAndUpdate(id, { title, description });
        res.redirect('/tasks/list');
    });


export default router;