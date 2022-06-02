import {
    NotFoundException,
    InternalServerErrorException,
} from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { ContentDetailService } from 'src/content-detail/content-detail.service';
import { ContentService } from '../content.service';
import { Content } from '../entities/content.entity';
import TestUtil from '../common/TestUtilContent';

describe('ContentService', () => {
    let service: ContentService;
    let contentRepository: Repository<Content>;
    let contentDetailService: ContentDetailService;

    const mockRepository = {
        findAllContent: jest.fn(),
        createQueryBuilder: jest.fn(),
        findOne: jest.fn(),
        create: jest.fn(),
        save: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
        findAllContentById: jest.fn(),
    };

    const mockContentDetailService = {
        deleteDetail: jest.fn(),
        findOne: jest.fn(),
        createDetail: jest.fn(),
        updateDetail: jest.fn(),
    };

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ContentService,
                {
                    provide: getRepositoryToken(Content),
                    useValue: mockRepository,
                },
                {
                    provide: ContentDetailService,
                    useValue: mockContentDetailService,
                },
            ],
        }).compile();

        service = module.get<ContentService>(ContentService);
        contentRepository = module.get<Repository<Content>>(getRepositoryToken(Content));
        contentDetailService = module.get<ContentDetailService>(ContentDetailService);
    });

    beforeEach(() => {
        mockRepository.findAllContent.mockReset();
        mockRepository.findOne.mockReset();
        mockRepository.create.mockReset();
        mockRepository.save.mockReset();
        mockRepository.createQueryBuilder.mockReset();
        mockRepository.findAllContentById.mockReset();
        mockRepository.update.mockReset();
        mockRepository.delete.mockReset();

        mockContentDetailService.deleteDetail.mockReset();
        mockContentDetailService.createDetail.mockReset();
        mockContentDetailService.updateDetail.mockReset();
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
        expect(contentRepository).toBeDefined();
        expect(contentDetailService).toBeDefined();
    });

    describe('When search All Contents', () => {
        it('should be list all content', async () => {
            const contentList = TestUtil.giveMeAListContent();

            jest.spyOn(mockRepository, 'findAllContent').mockResolvedValueOnce(contentList);
            jest.spyOn(mockRepository, 'createQueryBuilder').mockImplementation(() => ({
                leftJoinAndSelect: jest.fn().mockReturnThis(),
                orderBy: jest.fn().mockReturnThis(),
                getMany: jest.fn().mockResolvedValue(contentList),
            }));
            jest.spyOn(mockRepository, 'findAllContent').mockResolvedValueOnce(contentList);

            const contents = await service.findAllContent();

            expect(contents).toHaveLength(2);
            expect(mockRepository.createQueryBuilder).toHaveBeenCalledTimes(1);
        });
    });

    describe('When serch Content By Id', () => {

        it('should find a existing content', async () => {
            const content = TestUtil.giveMeAValidContent();
            mockRepository.findOne.mockReturnValue(content);

            const contentFound = await service.findContentById(1);

            expect(contentFound).toMatchObject({ description: contentFound.description });
            expect(mockRepository.findOne).toHaveBeenCalledTimes(1);
        });

        it('should return a exception when does not to find a content', async () => {
            mockRepository.findOne.mockReturnValue(null);
            expect(service.findContentById(3)).rejects.toBeInstanceOf(
                NotFoundException,
            );
            expect(mockRepository.findOne).toHaveBeenCalledTimes(1);
        });
    });

    describe('When create content', () => {
        it('should create a content', async () => {
            const content = TestUtil.giveMeAValidContent();
            mockRepository.save.mockReturnValue(content);
            mockRepository.create.mockReturnValue(content);

            const contentInput = TestUtil.giveMeAInputContentForCreate();
            const savedContent = await service.createContent(contentInput);
            expect(savedContent).toMatchObject(content);
            expect(mockRepository.create).toBeCalledTimes(1);
            expect(mockRepository.save).toBeCalledTimes(1);
        });

        it('should create a content with Content Detail', async () => {
            const content = TestUtil.giveMeAValidContentWithDetail();

            const contentDetail = TestUtil.giveMeAContentDetail();

            mockContentDetailService.createDetail.mockReturnValue(contentDetail)
            mockRepository.save.mockReturnValue(content);
            mockRepository.create.mockReturnValue(content);

            const contentInput = TestUtil.giveMeAInputContentWithDetail();
            const savedContent = await service.createContent(contentInput);

            expect(savedContent).toMatchObject(content);
            expect(mockRepository.create).toBeCalledTimes(1);
            expect(mockRepository.save).toBeCalledTimes(1);
            expect(mockContentDetailService.createDetail).toBeCalledTimes(1);
        });

        it('should return a exception when doesnt create a content', async () => {
            const content = TestUtil.giveMeAValidContent();
            mockRepository.save.mockReturnValue(null);
            mockRepository.create.mockReturnValue(content);

            const contentInput = TestUtil.giveMeAInputContentForCreate();
            await service.createContent(contentInput).catch(e => {
                expect(e).toBeInstanceOf(InternalServerErrorException);
            });

            expect(mockRepository.create).toBeCalledTimes(1);
            expect(mockRepository.save).toBeCalledTimes(1);
        });
    });

    describe('When update content', () => {

        it('Should update a content', async () => {
            const content = TestUtil.giveMeAValidContent();
            const updatedcontent = TestUtil.giveMeAUpdateContentInput();
            mockRepository.findOne.mockReturnValue(content);
            mockRepository.update.mockReturnValue({
                ...content,
                ...updatedcontent,
            });
            mockRepository.create.mockReturnValue({
                ...content,
                ...updatedcontent,
            });

            const updatecontent = TestUtil.giveMeAUpdateContentInput();
            const resultcontent = await service.updateContent(1, updatecontent);

            expect(resultcontent).toMatchObject(updatedcontent);
            expect(mockRepository.create).toBeCalledTimes(1);
            expect(mockRepository.findOne).toBeCalledTimes(1);
            expect(mockRepository.update).toBeCalledTimes(1);
        });

        it('Should update a content with detail', async () => {

            const content = TestUtil.giveMeAValidContentWithDetail();
            const updatedcontent = TestUtil.giveMeAUpdateContentWithDetail();

            mockRepository.findAllContentById.mockReturnValue(content);

            const detailDTO = TestUtil.giveMeAContentDetailDTO()
            mockContentDetailService.updateDetail.mockReturnValue(detailDTO);

            mockRepository.findOne.mockReturnValue(content);
            mockRepository.update.mockReturnValue({
                ...content,
                ...updatedcontent,
            });
            mockRepository.create.mockReturnValue({
                ...content,
                ...updatedcontent,
            });

            const updatecontent = TestUtil.giveMeAUpdateContentWithDetail();
            const resultcontent = await service.updateContent(1, updatecontent);

            expect(resultcontent).toMatchObject(updatedcontent);
            expect(mockRepository.create).toBeCalledTimes(1);
            expect(mockRepository.findOne).toBeCalledTimes(1);
            expect(mockRepository.update).toBeCalledTimes(1);
            expect(mockContentDetailService.updateDetail).toBeCalledTimes(1);
        });
    });

    describe('When delete content', () => {
        it('Should delete a existing content', async () => {
            const content = TestUtil.giveMeAValidContent();
            mockRepository.delete.mockReturnValue(content);
            mockRepository.findOne.mockReturnValue(content);

            mockContentDetailService.deleteDetail.mockReturnValue(true);

            const deletedcontent = await service.deleteContent(1);

            expect(deletedcontent).toBe(true);
            expect(mockRepository.findOne).toBeCalledTimes(1);
            expect(mockRepository.delete).toBeCalledTimes(1);
            expect(mockContentDetailService.deleteDetail).toBeCalledTimes(1);
        });

        it('Should not delete a inexisting content', async () => {
            const content = TestUtil.giveMeAValidContent();
            mockRepository.delete.mockReturnValue(null);
            mockRepository.findOne.mockReturnValue(content);

            const deletedcontent = await service.deleteContent(9);

            expect(deletedcontent).toBe(false);
            expect(mockRepository.findOne).toBeCalledTimes(1);
            expect(mockRepository.delete).toBeCalledTimes(1);
        });

        it('Should delete a content with content Detail', async () => {
            const content = TestUtil.giveMeAValidContentWithDetail();

            mockRepository.delete.mockReturnValue(content);
            mockRepository.findOne.mockReturnValue(content);
            mockContentDetailService.deleteDetail.mockReturnValue(true);

            const deletedcontent = await service.deleteContent(1);

            expect(deletedcontent).toBe(true);
            expect(mockRepository.findOne).toBeCalledTimes(1);
            expect(mockRepository.delete).toBeCalledTimes(1);
            expect(mockContentDetailService.deleteDetail).toBeCalledTimes(1);
        });
    });
});
