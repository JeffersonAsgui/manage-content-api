import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { AuthDTO } from './dto/auth.dto';
import { AuthInput } from './dto/auth.input';
import { JwtService } from '@nestjs/jwt'
import { UserDTO } from 'src/user/dto/user.dto';

@Injectable()
export class AuthService {

    private readonly logger = new Logger(AuthService.name);

    constructor(
        private userService: UserService,
        private jwtService: JwtService,

    ) { }

    async validateUser(data: AuthInput): Promise<AuthDTO> {

        this.logger.log('validate User id : ' + data.id);
        const user = await this.userService.findById(data.id);

        if (!user) {
            this.logger.error('User not found for id :' + data.id);
            throw new NotFoundException('User not found for id:' + data.id)
        }

        const token = await this.jwtToken(user);

        return { user, token };

    }

    private async jwtToken(user: UserDTO): Promise<string> {
        const payload = { usertype: user.type, sub: user.id }
        return this.jwtService.signAsync(payload);
    }

}
