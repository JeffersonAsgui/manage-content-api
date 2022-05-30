import { CreateUserInput } from "../dto/create-user.input";
import { UpdateUserInput } from "../dto/update-user.input";
import { User } from "../entities/user.entity";


export default class TestUtil {

    static giveMeAValidUser(): User {
        const user = new User();
        user.id = 1;
        user.name = 'User Name';
        user.type = 'ADMIN';
        return user;
    }

    static giveMeAInputUser(): CreateUserInput {

        const userInput: CreateUserInput = {
            name: 'User Name',
        }
        return userInput;
    }

    static giveMeAUpdateUser(): UpdateUserInput {

        const userUpdate: UpdateUserInput = {
            id: 1,
            name: 'User Name Update',
        }
        return userUpdate;
    }

}