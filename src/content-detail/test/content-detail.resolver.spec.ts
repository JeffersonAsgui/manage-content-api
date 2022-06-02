import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ContentViewsService } from 'src/content-views/content-views.service';
import { UserType } from 'src/user/enum/user.enum';
import { UserService } from 'src/user/user.service';
import TestUtil from '../common/TestUtilContentDetail';
import { ContentDetailResolver } from '../content-detail.resolver';
import { ContentDetailService } from '../content-detail.service';

describe('ContentResolver', () => {
    let contentResolver: ContentDetailResolver;
    let contentServiceMock: ContentDetailService;
    let userServiceMock: UserService;
    let viewsServiceMock: ContentViewsService;


    const mockService = {
        findAllContent: jest.fn(),
        findDetailById: jest.fn(),
        createDetail: jest.fn(),
        updateDetail: jest.fn(),
        deleteDetail: jest.fn(),
    }

    const userMockService = {
        findById: jest.fn(),
    }

    const viewsMockService = {
        createViews: jest.fn(),
    }

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({

            providers: [
                ContentDetailResolver,
                {
                    provide: ContentDetailService,
                    useValue: mockService
                },
                {
                    provide: UserService,
                    useValue: userMockService
                },
                {
                    provide: ContentViewsService,
                    useValue: viewsMockService
                },
            ],
        }).compile();

        contentResolver = module.get<ContentDetailResolver>(ContentDetailResolver);
        contentServiceMock = module.get<ContentDetailService>(ContentDetailService);
        userServiceMock = module.get<UserService>(UserService);
        viewsServiceMock = module.get<ContentViewsService>(ContentViewsService);
    });

    beforeEach(() => {
        mockService.findAllContent.mockReset();
        mockService.createDetail.mockReset();
        mockService.findDetailById.mockReset();
        mockService.updateDetail.mockReset();
        mockService.deleteDetail.mockReset();
    });

    it('should be defined', () => {
        expect(contentResolver).toBeDefined();
        expect(contentServiceMock).toBeDefined();
        expect(userServiceMock).toBeDefined();
        expect(viewsServiceMock).toBeDefined();
    });


    it('should have create function', () => {
        expect(contentResolver.contentDetailById).toBeDefined();
    })

    describe('When serch Content Detail By Id', () => {

        it('should return a existing content detail', async () => {
            const contentDTO = TestUtil.giveMeAContentDetailDTO();
            jest.spyOn(contentServiceMock, 'findDetailById').mockResolvedValueOnce(contentDTO);

            const userDTO = TestUtil.giveMeAUserDTO(UserType.STUDENTS)
            jest.spyOn(userServiceMock, 'findById').mockResolvedValueOnce(userDTO);

            const contentViewsDTO = TestUtil.giveMeAContentViewsDTO()
            jest.spyOn(viewsServiceMock, 'createViews').mockResolvedValueOnce(contentViewsDTO);

            const contentFound = await contentResolver.contentDetailById(1, userDTO.id)

            expect(contentFound).toMatchObject({ detailDescription: contentDTO.detailDescription });
            expect(contentServiceMock.findDetailById).toHaveBeenCalledTimes(1);
        });

        it('should return a exception when does not to find a content detail', () => {
            jest.spyOn(contentServiceMock, 'findDetailById').mockRejectedValueOnce(new NotFoundException());
            const error = contentResolver.contentDetailById(3, 1)
            expect(error).rejects.toBeInstanceOf(
                NotFoundException,
            );
            expect(contentServiceMock.findDetailById).toHaveBeenCalledTimes(1);
        });

    });

    describe('When create Content Detail', () => {

        it(' should create content and return Content Detail DTO', async () => {

            const contentResult = TestUtil.giveMeAContentDetailDTO();
            jest.spyOn(contentServiceMock, 'createDetail').mockResolvedValueOnce(contentResult);

            const contetInput = TestUtil.giveMeAInputContentDetailForCreate()

            const result = await contentResolver.createDetail(contetInput);

            expect(result).toBeDefined();
            expect(result).toMatchObject({ detailDescription: contentResult.detailDescription });
            expect(result).toMatchObject({ id: contentResult.id });
            expect(contentServiceMock.createDetail).toBeCalledTimes(1);
        })
    });


    describe('When update Content Detail', () => {

        it(' should update content detail and return ContentDetailDTO', async () => {
            //Arrange
            const contenDTO = TestUtil.giveMeAContentDetailDTO();

            jest.spyOn(contentServiceMock, 'updateDetail').mockResolvedValueOnce(contenDTO);

            const updateContentInput = TestUtil.giveMeAUpdateContentDetailInput();

            //Act
            const result = await contentResolver.updateDetail(1, updateContentInput);
            //Assert        
            expect(result).toBeDefined();
            expect(result).toEqual(contenDTO)
            expect(contentServiceMock.updateDetail).toBeCalledTimes(1);
        })
    });

    describe('When delete Content Detail', () => {

        it('Should delete a existing content detail', async () => {
            const content = TestUtil.giveMeAContentDetailDTO();
            jest.spyOn(contentServiceMock, 'deleteDetail').mockResolvedValueOnce(true);

            const deletedUser = await contentResolver.deleteDetail(content.id);

            expect(deletedUser).toBe(true);
            expect(contentServiceMock.deleteDetail).toBeCalledTimes(1);
        });

    });

});