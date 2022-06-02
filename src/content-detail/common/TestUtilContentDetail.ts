import { ContentDetailDTO } from "src/content-detail/dto/content-detail.dto";
import { ContentDetail } from "src/content-detail/entities/content-detail.entity";
import { ContentViewsDTO } from "src/content-views/dto/content-views.dto";
import { ContentType } from "src/content/enum/content-type.enum";
import { UserDTO } from "src/user/dto/user.dto";
import { UserType } from "src/user/enum/user.enum";
import { CreateContentDetailInput } from "../dto/create-content-detail.input";
import { UpdateContentDetailInput } from "../dto/update-content-detail.input";


export default class TestUtil {



    static giveMeAInputContentDetailForCreate(): CreateContentDetailInput {
        const inputContent = new CreateContentDetailInput();
        inputContent.detailDescription = 'Description'
        return inputContent;
    }

    static giveMeAUpdateContentDetailInput(): UpdateContentDetailInput {
        const content = new UpdateContentDetailInput();
        content.id = 1
        content.detailDescription = 'Description Update'
        return content;
    }

    static giveMeAContentDetail(): ContentDetail {
        const content = new ContentDetail();
        content.id = 1;
        content.detailDescription = 'Description'
        return content;
    }

    static giveMeAContentDetailDTO(): ContentDetailDTO {
        const content = new ContentDetailDTO();
        content.id = 1;
        content.detailDescription = 'Description'
        return content;
    }

    static giveMeAContentViewsDTO(): ContentViewsDTO {
        const content = new ContentViewsDTO();
        content.userId = 1
        content.contentDetailId = 1
        return content;
    }


    static giveMeAUserDTO(type: UserType): UserDTO {

        const userDTO: UserDTO = {
            id: 1,
            name: 'User Name',
            type: type
        }
        return userDTO;
    }

}