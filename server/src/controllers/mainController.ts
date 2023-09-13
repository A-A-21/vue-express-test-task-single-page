import e, {Request, Response, NextFunction} from 'express';
import {mainService} from "../services/mainService";


let currentRequest: NodeJS.Timeout | null;

class MainController {
    async main(req: Request, res: Response, next: NextFunction): Promise<e.Response> {
        try {
            const {email, number} = req.query;
            if (typeof email !== 'string') return res.status(500).json({message: 'Ошибка при заполнении'});

            const stringNumber = typeof number === 'string' ? number : '';
            const curUsers = await mainService.getUsersBySearch(email, stringNumber);

            if (currentRequest) {
                clearTimeout(currentRequest);
            }

            currentRequest = setTimeout(() => {
                res.json(curUsers);
                currentRequest = null;
            }, 5000);
        } catch (e) {
            console.log(e);
            next(e);
        }
    }
}


export const mainController = new MainController();
