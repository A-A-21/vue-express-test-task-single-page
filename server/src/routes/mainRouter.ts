import {Router} from 'express';
import {mainController} from '../controllers/mainController';

const router: Router = Router();

router.get('/', mainController.main);

export default router;
