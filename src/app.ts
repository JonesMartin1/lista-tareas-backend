import express from 'express';
import morgan from 'morgan';
import { engine } from 'express-handlebars';
import path from 'path';


// Routes
import indexRoutes from './routes';
import tasksRoutes from './routes/tasks';


class Application {

    app: express.Application;

    constructor() {
        this.app = express();
        this.settings();
        this.middlewares();
        this.routes();
    }

    settings() {
        this.app.set('port', 3000);
        this.app.set('views', path.join(__dirname, 'views'));
        this.app.engine('.hbs', engine({
            layoutsDir: path.join(this.app.get('views'), 'layouts'),
            partialsDir: path.join(this.app.get('views'), 'partials'),
            defaultLayout: 'main',
            extname: '.hbs'
        }));
        this.app.set('view engine', '.hbs')
    }

    middlewares() {
        this.app.use(morgan('dev'));
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: false }))
    }

    routes() {
        this.app.use(indexRoutes);
        this.app.use('/tasks', tasksRoutes);
        this.app.use(express.static(path.join(__dirname, 'public')))
    }

    start() {
        const PORT = process.env.PORT || 3000;
        this.app.listen(PORT, () => {
            console.log(`Servidor en funcionamiento en el puerto ${PORT}`);
        });
    }
}

export default Application