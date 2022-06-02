import {
    NotFoundException,
    InternalServerErrorException,
} from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { ContentDetailService } from 'src/content-detail/content-detail.service';
import { ContentDetail } from './entities/content-detail.entity';
import TestUtil from './common/TestUtilContentDetail';

describe('ContentDetatilService', () => {
    let service: ContentDetailService;
    let contentDetailRepository: Repository<ContentDetail>;

    const mockRepository = {
        findOne: jest.fn(),
        create: jest.fn(),
        save: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
    };

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ContentDetailService,
                {
                    provide: getRepositoryToken(ContentDetail),
                    useValue: mockRepository,
                },
            ],
        }).compile();

        service = module.get<ContentDetailService>(ContentDetailService);
        contentDetailRepository = module.get<Repository<ContentDetail>>(getRepositoryToken(ContentDetail));
    });

    beforeEach(() => {
        mockRepository.findOne.mockReset();
        mockRepository.create.mockReset();
        mockRepository.save.mockReset();
        mockRepository.update.mockReset();
        mockRepository.delete.mockReset();
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
        expect(contentDetailRepository).toBeDefined();
    });

    describe('When serch Content Detail By Id', () => {

        it('should find a existing content detail', async () => {
            const contentDTO = TestUtil.giveMeAContentDetailDTO();
            mockRepository.findOne.mockReturnValue(contentDTO);

            const contentFound = await service.findDetailById(1);

            expect(contentFound).toMatchObject({ detailDescription: contentDTO.detailDescription });
            expect(mockRepository.findOne).toHaveBeenCalledTimes(1);
        });

        it('should return a exception when does not to find a content', async () => {
            mockRepository.findOne.mockReturnValue(null);
            expect(service.findDetailById(3)).rejects.toBeInstanceOf(
                NotFoundException,
            );
            expect(mockRepository.findOne).toHaveBeenCalledTimes(1);
        });
    });

    describe('When create content detail', () => {
        it('should create a content detail', async () => {
            const contentDTO = TestUtil.giveMeAContentDetailDTO();
            mockRepository.save.mockReturnValue(contentDTO);
            mockRepository.create.mockReturnValue(contentDTO);

            const contentInput = TestUtil.giveMeAInputContentDetailForCreate();
            const savedContent = await service.createDetail(contentInput);
            expect(savedContent).toMatchObject(contentDTO);
            expect(mockRepository.create).toBeCalledTimes(1);
            expect(mockRepository.save).toBeCalledTimes(1);
        });

        it('should return a exception when doesnt create a content', async () => {
            const contentDTO = TestUtil.giveMeAContentDetailDTO();
            mockRepository.save.mockReturnValue(null);
            mockRepository.create.mockReturnValue(contentDTO);

            const contentInput = TestUtil.giveMeAInputContentDetailForCreate();
            await service.createDetail(contentInput).catch(e => {
                expect(e).toBeInstanceOf(InternalServerErrorException);
            });

            expect(mockRepository.create).toBeCalledTimes(1);
            expect(mockRepository.save).toBeCalledTimes(1);
        });
    });

    describe('When update content detail', () => {

        it('Should update a content', async () => {
            const contentDTO = TestUtil.giveMeAContentDetailDTO();
            const updatedcontent = TestUtil.giveMeAUpdateContentDetailInput();
            mockRepository.findOne.mockReturnValue(contentDTO);
            mockRepository.update.mockReturnValue({
                ...contentDTO,
                ...updatedcontent,
            });
            mockRepository.create.mockReturnValue({
                ...contentDTO,
                ...updatedcontent,
            });

            const updatecontent = TestUtil.giveMeAUpdateContentDetailInput();
            const resultcontent = await service.updateDetail(1, updatecontent);

            expect(resultcontent).toMatchObject(updatedcontent);
            expect(mockRepository.create).toBeCalledTimes(1);
            expect(mockRepository.findOne).toBeCalledTimes(1);
            expect(mockRepository.update).toBeCalledTimes(1);
        });


    });

    describe('When delete content detail', () => {

        it('Should delete a existing content detail', async () => {
            const contentDTO = TestUtil.giveMeAContentDetailDTO();
            mockRepository.delete.mockReturnValue(contentDTO);
            mockRepository.findOne.mockReturnValue(contentDTO);

            const deletedcontent = await service.deleteDetail(1);

            expect(deletedcontent).toBe(true);
            expect(mockRepository.findOne).toBeCalledTimes(1);
            expect(mockRepository.delete).toBeCalledTimes(1);
        });

        it('Should not delete a inexisting content detail', async () => {
            const contentDTO = TestUtil.giveMeAContentDetailDTO();
            mockRepository.delete.mockReturnValue(null);
            mockRepository.findOne.mockReturnValue(contentDTO);

            const deletedcontent = await service.deleteDetail(9);

            expect(deletedcontent).toBe(false);
            expect(mockRepository.findOne).toBeCalledTimes(1);
            expect(mockRepository.delete).toBeCalledTimes(1);
        });

    });
});
