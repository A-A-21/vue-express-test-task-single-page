import {readFile} from "fs/promises";
import {UserData} from "../types";


class MainService {
    async getUsers(): Promise<UserData[]> {
        const dataPath: string = './db/data.json';
        const users: UserData[] = JSON.parse(await readFile(dataPath, 'utf-8'));
        return users;
    }

    async getUsersBySearch(email: string, number: string | undefined): Promise<UserData[]> {
        const users = await this.getUsers();
        const curUsers = users.filter((user) => {
            const isSuitableEmail: boolean = email === user.email;
            if (number) {
                const validNumber: string = String(number).replace(/-/g, '');
                return validNumber === user.number && isSuitableEmail;
            }
            return isSuitableEmail;
        });
        return curUsers;
    }

}

export const mainService = new MainService();
