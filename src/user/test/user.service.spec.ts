import {
    NotFoundException,
    InternalServerErrorException,
} from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user.service';
import { User } from '../entities/user.entity';
import TestUtil from '../common/TestUtil';
import { Repository } from 'typeorm';

describe('UserService', () => {
    let service: UserService;
    let userRepository: Repository<User>;

    const mockRepository = {
        find: jest.fn(),
        findOne: jest.fn(),
        create: jest.fn(),
        save: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
    };

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserService,
                {
                    provide: getRepositoryToken(User),
                    useValue: mockRepository,
                },
            ],
        }).compile();

        service = module.get<UserService>(UserService);
        userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    });

    beforeEach(() => {
        mockRepository.find.mockReset();
        mockRepository.findOne.mockReset();
        mockRepository.create.mockReset();
        mockRepository.save.mockReset();
        mockRepository.update.mockReset();
        mockRepository.delete.mockReset();
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
        expect(userRepository).toBeDefined();
    });

    describe('When search All Users', () => {
        it('should be list all users', async () => {
            const user = TestUtil.giveMeAValidUser();
            mockRepository.find.mockReturnValue([user, user]);
            const users = await service.findAll();
            expect(users).toHaveLength(2);
            expect(mockRepository.find).toHaveBeenCalledTimes(1);
        });
    });

    describe('When serch User By Id', () => {
        it('should find a existing user', async () => {
            const user = TestUtil.giveMeAValidUser();
            mockRepository.findOne.mockReturnValue(user);
            const userFound = await service.findById(1);
            expect(userFound).toMatchObject({ name: user.name });
            expect(mockRepository.findOne).toHaveBeenCalledTimes(1);
        });
        it('should return a exception when does not to find a user', async () => {
            mockRepository.findOne.mockReturnValue(null);
            expect(service.findById(3)).rejects.toBeInstanceOf(
                NotFoundException,
            );
            expect(mockRepository.findOne).toHaveBeenCalledTimes(1);
        });
    });

    describe('When create user', () => {
        it('should create a user', async () => {
            const user = TestUtil.giveMeAValidUserStudant();
            mockRepository.save.mockReturnValue(user);
            mockRepository.create.mockReturnValue(user);

            const userInput = TestUtil.giveMeAInputUserForCreate();
            const savedUser = await service.create(userInput);
            expect(savedUser).toMatchObject(user);
            expect(mockRepository.create).toBeCalledTimes(1);
            expect(mockRepository.save).toBeCalledTimes(1);
        });

        it('should return a exception when doesnt create a user', async () => {
            const user = TestUtil.giveMeAValidUser();
            mockRepository.save.mockReturnValue(null);
            mockRepository.create.mockReturnValue(user);

            const userInput = TestUtil.giveMeAInputUser();
            await service.create(userInput).catch(e => {
                expect(e).toBeInstanceOf(InternalServerErrorException);
                expect(e).toMatchObject({
                    message: 'Error in create User!',
                });
            });

            expect(mockRepository.create).toBeCalledTimes(1);
            expect(mockRepository.save).toBeCalledTimes(1);
        });
    });

    describe('When update User', () => {
        it('Should update a user', async () => {
            const user = TestUtil.giveMeAValidUser();
            const updatedUser = { name: 'User Name Update' };
            mockRepository.findOne.mockReturnValue(user);
            mockRepository.update.mockReturnValue({
                ...user,
                ...updatedUser,
            });
            mockRepository.create.mockReturnValue({
                ...user,
                ...updatedUser,
            });

            const updateUser = TestUtil.giveMeAUpdateUser();
            const resultUser = await service.update(1, updateUser);

            expect(resultUser).toMatchObject(updatedUser);
            expect(mockRepository.create).toBeCalledTimes(1);
            expect(mockRepository.findOne).toBeCalledTimes(1);
            expect(mockRepository.update).toBeCalledTimes(1);
        });
    });

    describe('When delete User', () => {
        it('Should delete a existing user', async () => {
            const user = TestUtil.giveMeAValidUser();
            mockRepository.delete.mockReturnValue(user);
            mockRepository.findOne.mockReturnValue(user);

            const deletedUser = await service.remove(1);

            expect(deletedUser).toBe(true);
            expect(mockRepository.findOne).toBeCalledTimes(1);
            expect(mockRepository.delete).toBeCalledTimes(1);
        });

        it('Should not delete a inexisting user', async () => {
            const user = TestUtil.giveMeAValidUser();
            mockRepository.delete.mockReturnValue(null);
            mockRepository.findOne.mockReturnValue(user);

            const deletedUser = await service.remove(9);

            expect(deletedUser).toBe(false);
            expect(mockRepository.findOne).toBeCalledTimes(1);
            expect(mockRepository.delete).toBeCalledTimes(1);
        });
    });
});
