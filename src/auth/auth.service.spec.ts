import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { NotFoundException } from '@nestjs/common';
import TestUtil from './common/TestUtilAuth';

describe('UserService', () => {
    let authService: AuthService;
    let jwtService: JwtService;

    const mockUserService = {
        findById: jest.fn(),
    };

    const mockJwtService = {
        signAsync: jest.fn(),
    };



    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthService,
                {
                    provide: JwtService,
                    useValue: mockJwtService,
                },
                {
                    provide: UserService,
                    useValue: mockUserService
                }
            ],
        }).compile();

        authService = module.get<AuthService>(AuthService);
        jwtService = module.get<JwtService>(JwtService);
    });

    beforeEach(() => {

    });

    it('should be defined', () => {
        expect(authService).toBeDefined();
        expect(jwtService).toBeDefined();
    });


    describe('When validate Users', () => {

        it('should return valid userDTO', async () => {

            const authInput = TestUtil.giveMeAAuthInput();
            const userDto = TestUtil.giveMeAUserAdmin();
            mockUserService.findById.mockReturnValue(userDto);

            const authDto = await authService.validateUser(authInput);

            expect(authDto.user).toEqual(authDto.user)
            expect(mockUserService.findById).toHaveBeenCalledTimes(1);

        });

        it('should return NotfoundException', async () => {

            const authInput = TestUtil.giveMeAAuthInput();
            mockUserService.findById.mockReturnValue(null);

            expect(authService.validateUser(authInput)).rejects.toBeInstanceOf(
                NotFoundException,
            );
            expect(mockUserService.findById).toHaveBeenCalledTimes(2);

        });


    });

    describe('When get token', () => {

        it('should return valid token', async () => {

            const authInput = TestUtil.giveMeAAuthInput();
            const fakeToken = TestUtil.FAKE_TOKEN
            const userDto = TestUtil.giveMeAUserAdmin();

            mockUserService.findById.mockReturnValue(userDto);
            mockJwtService.signAsync.mockReturnValue(fakeToken);

            const authDto = await authService.validateUser(authInput);

            expect(authDto.user).toEqual(userDto)
            expect(authDto.token).toEqual(fakeToken)
            expect(mockJwtService.signAsync).toHaveBeenCalledTimes(2);
            expect(mockUserService.findById).toHaveBeenCalledTimes(3);

        });


    });


});
