import { Test, TestingModule } from '@nestjs/testing';
import { ContentViewsService } from 'src/content-views/content-views.service';
import TestUtil from '../common/TestUtilContentViews';
import { ContentViewsResolver } from '../content-views.resolver';

describe('ViewsResolver', () => {
    let viewsResolver: ContentViewsResolver;
    let viewsServiceMock: ContentViewsService;


    const mockService = {
        createViews: jest.fn(),
        findSingleViewByContent: jest.fn(),
    }


    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({

            providers: [
                ContentViewsResolver,
                {
                    provide: ContentViewsService,
                    useValue: mockService
                },
            ],
        }).compile();

        viewsResolver = module.get<ContentViewsResolver>(ContentViewsResolver);
        viewsServiceMock = module.get<ContentViewsService>(ContentViewsService);
    });

    beforeEach(() => {
        mockService.createViews.mockReset();
        mockService.findSingleViewByContent.mockReset();
    });

    it('should be defined', () => {
        expect(viewsResolver).toBeDefined();
        expect(viewsServiceMock).toBeDefined();
    });


    it('should have create function', () => {
        expect(viewsResolver.createContentView).toBeDefined();
    })

    describe('When create Content Views', () => {

        it(' should create content views and return Content Views DTO', async () => {

            const contentDTO = TestUtil.giveMeAContentViewsDTO();
            mockService.createViews.mockReturnValue(contentDTO);

            const contetInput = TestUtil.giveMeAInputContentViewsForCreate(
                contentDTO.userId, contentDTO.contentDetailId);

            const result = await viewsResolver.createContentView(contetInput);

            expect(result).toBeDefined();
            expect(result).toMatchObject({ contentDetailId: contentDTO.contentDetailId });
            expect(result).toMatchObject({ userId: contentDTO.userId });
            expect(viewsServiceMock.createViews).toBeCalledTimes(1);
        })
    });


    describe('When called method countSingleViews', () => {

        it(' should return a number', async () => {

            mockService.findSingleViewByContent.mockReturnValue(8);

            const result = await viewsResolver.countSingleViews(1);

            expect(result).toBeDefined();
            expect(result).toEqual(8);
            expect(viewsServiceMock.findSingleViewByContent).toBeCalledTimes(1);
        })
    });



});