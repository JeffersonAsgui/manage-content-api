import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { InternalServerErrorException } from '@nestjs/common';
import { ContentViewsService } from '../content-views.service';
import { ContentViews } from '../entities/content-views.entity';
import TestUtil from '../common/TestUtilContentViews';

describe('ContentViewsService', () => {
    let service: ContentViewsService;
    let viewsRepository: Repository<ContentViews>;

    const mockRepository = {
        create: jest.fn(),
        count: jest.fn(),
        save: jest.fn(),
    };

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ContentViewsService,
                {
                    provide: getRepositoryToken(ContentViews),
                    useValue: mockRepository,
                },
            ],
        }).compile();

        service = module.get<ContentViewsService>(ContentViewsService);
        viewsRepository = module.get<Repository<ContentViews>>(getRepositoryToken(ContentViews));
    });

    beforeEach(() => {
        mockRepository.create.mockReset();
        mockRepository.save.mockReset();
        mockRepository.count.mockReset();
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
        expect(viewsRepository).toBeDefined();
    });


    describe('When create content views', () => {

        it('should create a content view', async () => {
            const contentDTO = TestUtil.giveMeAContentViewsDTO();
            mockRepository.save.mockReturnValue(contentDTO);
            mockRepository.create.mockReturnValue(contentDTO);

            const contentInput = TestUtil.giveMeAInputContentViewsForCreate(
                contentDTO.userId, contentDTO.contentDetailId);

            const savedContent = await service.createViews(contentInput);

            expect(savedContent).toMatchObject(contentDTO);
            expect(mockRepository.create).toBeCalledTimes(1);
            expect(mockRepository.save).toBeCalledTimes(1);
        });

        it('should return a exception when doesnt create a content', async () => {
            const contentDTO = TestUtil.giveMeAContentViewsDTO();
            mockRepository.save.mockReturnValue(null);
            mockRepository.create.mockReturnValue(contentDTO);

            const contentInput = TestUtil.giveMeAInputContentViewsForCreate(
                contentDTO.userId, contentDTO.contentDetailId);

            await service.createViews(contentInput).catch(e => {
                expect(e).toBeInstanceOf(InternalServerErrorException);
            });

            expect(mockRepository.create).toBeCalledTimes(1);
            expect(mockRepository.save).toBeCalledTimes(1);
        });
    });

    describe('When find Single View By Content', () => {

        it('should return a number', async () => {

            mockRepository.count.mockReturnValue(2)

            const result = await service.findSingleViewByContent(1);

            expect(result).toEqual(2);
            expect(mockRepository.count).toBeCalledTimes(1);

        });

    });



});
