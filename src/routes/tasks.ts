import { Router, Request, Response } from "express";
import { crearTarea, editarTarea, eliminarTarea, obtenerTarea, obtenerTareaId } from "../controllers/taskControlers";


const router = Router();

router.route('/create')
    .get((req: Request, res: Response) => {
        res.render('tasks/create')
    })
    .post(crearTarea)

router.route('/list')
    .get(obtenerTarea);

router.route('/delete/:id')
    .get(eliminarTarea)

router.route('/edit/:id')
    .get(obtenerTareaId)
    .post(editarTarea);

export default router;