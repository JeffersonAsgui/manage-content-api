import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import TestUtil from './common/TestUtilContent';
import { ContentResolver } from './content.resolver';
import { ContentService } from './content.service';

describe('ContentResolver', () => {
    let contentResolver: ContentResolver;
    let contentServiceMock: ContentService;


    const mockService = {
        findAllContent: jest.fn(),
        findContentById: jest.fn(),
        createContent: jest.fn(),
        updateContent: jest.fn(),
        deleteContent: jest.fn(),
    }

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({

            providers: [
                ContentResolver,
                {
                    provide: ContentService,
                    useValue: mockService
                }
            ],
        }).compile();

        contentResolver = module.get<ContentResolver>(ContentResolver);
        contentServiceMock = module.get<ContentService>(ContentService);
    });

    beforeEach(() => {
        mockService.findAllContent.mockReset();
        mockService.createContent.mockReset();
        mockService.findContentById.mockReset();
        mockService.updateContent.mockReset();
        mockService.deleteContent.mockReset();
    });

    it('should be defined', () => {
        expect(contentResolver).toBeDefined();
        expect(contentServiceMock).toBeDefined();
    });


    it('should have create function', () => {
        expect(contentResolver.content).toBeDefined();
    })

    describe('When serch Content By Id', () => {

        it('should return a existing content', async () => {
            const content = TestUtil.giveMeAValidContent();
            jest.spyOn(contentServiceMock, 'findContentById').mockResolvedValueOnce(content);

            const contentFound = await contentResolver.content(1);

            expect(contentFound).toMatchObject({ description: content.description });
            expect(contentServiceMock.findContentById).toHaveBeenCalledTimes(1);
        });

        it('should return a exception when does not to find a user', () => {
            jest.spyOn(contentServiceMock, 'findContentById').mockRejectedValueOnce(new NotFoundException());
            const error = contentResolver.content(3)
            expect(error).rejects.toBeInstanceOf(
                NotFoundException,
            );
            expect(contentServiceMock.findContentById).toHaveBeenCalledTimes(1);
        });

    });

    describe('When search All Content', () => {

        it('should return list all contens', async () => {
            const contentList = TestUtil.giveMeAListContent();
            jest.spyOn(contentServiceMock, 'findAllContent').mockResolvedValue(contentList);

            const users = await contentResolver.contents();

            expect(users).toHaveLength(2);
            expect(contentServiceMock.findAllContent).toHaveBeenCalledTimes(1);
        });
    });

    describe('When create Conten', () => {

        it(' should create content and return Content DTO', async () => {

            const contentResult = TestUtil.giveMeAValidContentWithDetail();
            jest.spyOn(contentServiceMock, 'createContent').mockResolvedValueOnce(contentResult);

            const contetInput = TestUtil.giveMeAInputContentForCreate();
            const contentDTO = TestUtil.giveMeAValidContentDTO();

            const result = await contentResolver.createContent(contetInput);

            expect(result).toBeDefined();
            expect(result).toMatchObject({ description: contentDTO.description });
            expect(result).toMatchObject({ name: contentDTO.name });
            expect(contentServiceMock.createContent).toBeCalledTimes(1);
        })
    });


    describe('When update Content', () => {

        it(' should update user and return ContentDTO', async () => {
            //Arrange
            const contenDTO = TestUtil.giveMeAValidContentDTO();

            jest.spyOn(contentServiceMock, 'updateContent').mockResolvedValueOnce(contenDTO);

            const updateContentInput = TestUtil.giveMeAUpdateContentInput();

            //Act
            const result = await contentResolver.updateContent(1, updateContentInput);
            //Assert        
            expect(result).toBeDefined();
            expect(result).toEqual(contenDTO)
            expect(contentServiceMock.updateContent).toBeCalledTimes(1);
        })
    });

    describe('When delete Content', () => {

        it('Should delete a existing content', async () => {
            const content = TestUtil.giveMeAValidContent();
            jest.spyOn(contentServiceMock, 'deleteContent').mockResolvedValueOnce(true);

            const deletedUser = await contentResolver.deleteContent(content.id);

            expect(deletedUser).toBe(true);
            expect(contentServiceMock.deleteContent).toBeCalledTimes(1);
        });

    });

});