import express, {Express} from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cors from 'cors';
import mainRouter from "./routes/mainRouter";

dotenv.config();

const app: Express = express();
const PORT: number = parseInt(process.env.PORT as string, 10) || 3001;


app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(
    cors({
        origin: true,
        credentials: true,
        optionsSuccessStatus: 200,
    })
);

app.use('/api', mainRouter);

const start = async (): Promise<void> => {
    try {
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    } catch (e) {
        console.error(e);
    }
};

start();
