
import { ContentDetail } from "src/content-detail/entities/content-detail.entity";
import { ContentViewsDTO } from "src/content-views/dto/content-views.dto";
import { CreateContentViewsInput } from "../dto/create-content-views.input";


export default class TestUtil {



    static giveMeAInputContentViewsForCreate(userId: number, contentDetailId: number): CreateContentViewsInput {
        const inputContent = new CreateContentViewsInput(userId, contentDetailId);
        return inputContent;
    }

    /* static giveMeAUpdateContentDetailInput(): UpdateContentDetailInput {
         const content = new UpdateContentDetailInput();
         content.id = 1
         content.detailDescription = 'Description Update'
         return content;
     } */

    static giveMeAContentDetail(): ContentDetail {
        const content = new ContentDetail();
        content.id = 1;
        content.detailDescription = 'Description'
        return content;
    }

    static giveMeAContentViewsDTO(): ContentViewsDTO {
        const content = new ContentViewsDTO();
        content.contentDetailId = 1
        content.userId = 1
        return content;
    }

}