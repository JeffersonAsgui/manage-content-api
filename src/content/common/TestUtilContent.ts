import { ContentDetailDTO } from "src/content-detail/dto/content-detail.dto";
import { ContentDetail } from "src/content-detail/entities/content-detail.entity";
import { ContentDTO } from "../dto/content.dto";
import { CreateContentInput } from "../dto/create-content.input";
import { UpdateContentInput } from "../dto/update-content.input";
import { Content } from "../entities/content.entity";
import { ContentType } from "../enum/content-type.enum";


export default class TestUtil {



    static giveMeAInputContentForCreate(): CreateContentInput {
        const inputContent = new CreateContentInput();
        inputContent.name = 'Content'
        inputContent.description = 'Description'
        inputContent.type = ContentType.PDF;
        return inputContent;
    }

    static giveMeAInputContentWithDetail(): CreateContentInput {
        const inputContent = new CreateContentInput();
        inputContent.name = 'Content'
        inputContent.description = 'Description'
        inputContent.type = ContentType.PDF;
        inputContent.contentDetail = this.giveMeAContentDetail()
        return inputContent;
    }

    static giveMeAUpdateContentInput(): UpdateContentInput {
        const updateContent = new UpdateContentInput();
        updateContent.name = 'Content Update'
        updateContent.description = 'Description Update'
        updateContent.type = ContentType.VIDEO;
        return updateContent;
    }

    static giveMeAUpdateContentWithDetail(): UpdateContentInput {
        const updateContent = new UpdateContentInput();
        updateContent.name = 'Content Update'
        updateContent.description = 'Description Update'
        updateContent.type = ContentType.VIDEO;
        updateContent.contentDetail = this.giveMeAContentDetail();
        updateContent.contentDetailId = 1
        return updateContent;
    }

    static giveMeAValidContent(): Content {
        const content = new Content();
        content.id = 1;
        content.name = 'Content';
        content.description = 'Description'
        content.type = 'ADMIN';
        return content;
    }

    static giveMeAValidContentWithDetail(): Content {
        const content = new Content();
        content.id = 1;
        content.name = 'Content';
        content.description = 'Description'
        content.type = 'ADMIN';
        content.contentDetail = this.giveMeAContentDetail();
        content.contentDetailId = 1
        return content;
    }

    static giveMeAValidContentDTO(): ContentDTO {
        const content = new ContentDTO();
        content.id = 1;
        content.name = 'Content';
        content.description = 'Description'
        content.type = 'ADMIN';
        content.contentDetailId = 1
        return content;
    }

    static giveMeAContentDetail(): ContentDetail {
        const detailCreate = new ContentDetail();
        detailCreate.detailDescription = 'Description Detail'
        detailCreate.id = 1;
        return detailCreate;
    }

    static giveMeAContentDetailDTO(): ContentDetailDTO {
        const detailDto = new ContentDetailDTO();
        detailDto.detailDescription = 'Description Detail DTO'
        detailDto.id = 1;
        return detailDto;
    }

    static giveMeAListContent(): Content[] {
        const content = this.giveMeAValidContent();
        const list = [content, content]
        return list;
    }

}