import App from './app'
import connect from './dataBase'
import dotenv from 'dotenv'

dotenv.config()

connect();
const app = new App();
app.start();