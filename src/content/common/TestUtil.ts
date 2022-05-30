import { Content } from "../entities/content.entity";


export default class TestUtil {

    static giveMeAValidContent(): Content {
        const user = new Content();
        user.id = 1;
        user.name = 'Content';
        user.type = 'ADMIN';
        return user;
    }

}