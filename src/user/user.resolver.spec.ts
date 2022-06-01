import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import TestUtil from './common/TestUtil';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

describe('UserResolver', () => {
    let userResolver: UserResolver;
    let userServiceMock: UserService;


    const mockService = {
        create: jest.fn(),
        findAll: jest.fn(),
        findById: jest.fn(),
        findOne: jest.fn(),
        update: jest.fn(),
        remove: jest.fn(),


    }

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({

            providers: [
                UserResolver,
                {
                    provide: UserService,
                    useValue: mockService
                }
            ],
        }).compile();

        userResolver = module.get<UserResolver>(UserResolver);
        userServiceMock = module.get<UserService>(UserService);
    });

    it('should be defined', () => {
        expect(userResolver).toBeDefined();
        expect(userServiceMock).toBeDefined();
    });


    it('should have create function', () => {
        expect(userResolver.createUser).toBeDefined();
    })

    describe('When serch User By Id', () => {

        it('should return a existing user', async () => {
            const user = TestUtil.giveMeAValidUser();
            jest.spyOn(userServiceMock, 'findById').mockResolvedValueOnce(user);
            const userFound = await userResolver.findById(1);
            expect(userFound).toMatchObject({ name: user.name });
            expect(userServiceMock.findById).toHaveBeenCalledTimes(1);
        });

        it('should return a exception when does not to find a user', async () => {
            jest.spyOn(userServiceMock, 'findById').mockReturnValue(null);
            const error = userResolver.findById(3)
            expect(error).rejects.toBeInstanceOf(
                NotFoundException,
            );
            expect(userServiceMock.findById).toHaveBeenCalledTimes(2);
        });



    });

    describe('When search All Users', () => {
        it('should return list all users', async () => {
            jest.spyOn(userServiceMock, 'findAll').mockResolvedValue(
                [TestUtil.giveMeAValidUserStudant(), TestUtil.giveMeAValidUser()]
            );
            const users = await userResolver.findAll();
            expect(users).toHaveLength(2);
            expect(userServiceMock.findAll).toHaveBeenCalledTimes(1);
        });
    });

    describe('When create Users', () => {

        it(' should create user and return UserDTO', async () => {
            //Arrange
            const userResult = TestUtil.giveMeAValidUserStudant();
            jest.spyOn(userServiceMock, 'create').mockResolvedValueOnce(userResult);

            const userInput = TestUtil.giveMeAInputUserForCreate();
            const userDTO = TestUtil.giveMeAUserDTO();
            //Act
            const result = await userResolver.createUser(userInput);
            //Assert        
            expect(result).toBeDefined();
            expect(result).toEqual(userDTO)
            expect(userServiceMock.create).toBeCalledTimes(1);
        })
    });


    describe('When update User', () => {

        it(' should update user and return UserDTO', async () => {
            //Arrange
            const userUpdated = TestUtil.giveMeAUserDTOUpdated();
            jest.spyOn(userServiceMock, 'update').mockResolvedValueOnce(userUpdated);

            const updateUserInput = TestUtil.giveMeAUpdateUser();
            const userDTO = TestUtil.giveMeAUserDTOUpdated();
            //Act
            const result = await userResolver.updateUser(updateUserInput);
            //Assert        
            expect(result).toBeDefined();
            expect(result).toEqual(userDTO)
            expect(userServiceMock.update).toBeCalledTimes(1);
            expect(userServiceMock.create).toBeCalledTimes(1);
        })
    });

    describe('When delete User', () => {

        it('Should delete a existing user', async () => {
            const user = TestUtil.giveMeAValidUser();
            jest.spyOn(userServiceMock, 'remove').mockResolvedValueOnce(true);

            const deletedUser = await userResolver.removeUser(user.id);

            expect(deletedUser).toBe(true);
            expect(userServiceMock.remove).toBeCalledTimes(1);
        });

    });

});