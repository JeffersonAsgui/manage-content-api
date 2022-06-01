import { CreateUserInput } from "../dto/create-user.input";
import { UpdateUserInput } from "../dto/update-user.input";
import { UserDTO } from "../dto/user.dto";
import { User } from "../entities/user.entity";
import { UserType } from "../enum/user.enum";


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

    static giveMeAInputUserForCreate(): CreateUserInput {

        const userInput: CreateUserInput = {
            name: 'User Name',
            type: UserType.STUDENTS
        }
        return userInput;
    }

    static giveMeAUserDTO(): User {

        const userDTO: UserDTO = {
            id: 1,
            name: 'User Name',
            type: UserType.STUDENTS
        }
        return userDTO;
    }

    static giveMeAUserDTOUpdated(): User {

        const userDTO: UserDTO = {
            id: 1,
            name: 'User Name Update',
            type: UserType.STUDENTS
        }
        return userDTO;
    }

    static giveMeAValidUserStudant(): User {
        const user = new User();
        user.id = 1;
        user.name = 'User Name';
        user.type = UserType.STUDENTS;
        return user;
    }

}