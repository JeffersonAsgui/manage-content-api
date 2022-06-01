import { NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import TestUtil from './common/TestUtilAuth';

describe('AuthResolver', () => {
    let authResolver: AuthResolver;
    let authServiceMock: AuthService;

    const mockService = {
        validateUser: jest.fn(),
    }

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({

            providers: [
                AuthResolver,
                {
                    provide: AuthService,
                    useValue: mockService
                },
            ],
        }).compile();

        authResolver = module.get<AuthResolver>(AuthResolver);
        authServiceMock = module.get<AuthService>(AuthService);
    });

    beforeEach(() => {
        mockService.validateUser.mockReset();
    });

    it('should be defined', () => {
        expect(authResolver).toBeDefined();
        expect(authServiceMock).toBeDefined();
    });


    it('should have getToken function', () => {
        expect(authResolver.getToken).toBeDefined();
    })


    it('should return a UserDto with token', async () => {
        const authInput = TestUtil.giveMeAAuthInput();
        const authDto = TestUtil.giveMeAAuthAdmin();
        const fakeToken = TestUtil.FAKE_TOKEN;

        jest.spyOn(authServiceMock, 'validateUser').mockResolvedValueOnce(authDto);

        const userFound = await authResolver.getToken(authInput);

        expect(userFound.user).toEqual(authDto.user);
        expect(userFound.token).toEqual(fakeToken);
        expect(authServiceMock.validateUser).toHaveBeenCalledTimes(1);
    });


});