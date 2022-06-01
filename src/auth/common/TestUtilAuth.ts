import { UserDTO } from "src/user/dto/user.dto";
import { AuthDTO } from "../dto/auth.dto";
import { AuthInput } from "../dto/auth.input";


export default class TestUtil {

    static FAKE_TOKEN = "123asdf";

    static giveMeAAuthAdmin(): AuthDTO {
        const auth = new AuthDTO();
        auth.user = this.giveMeAUserAdmin();
        auth.token = this.FAKE_TOKEN
        return auth;
    }

    static giveMeAUserAdmin(): UserDTO {
        const user = new UserDTO();
        user.id = 1;
        user.name = 'Name';
        user.type = 'ADMIN';
        return user;
    }

    static giveMeAAuthInput(): AuthInput {
        const authInput = new AuthInput();
        authInput.id = 1;
        return authInput;
    }

}