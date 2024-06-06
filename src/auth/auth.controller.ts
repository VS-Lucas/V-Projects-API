import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthDto } from './dto/auth.dto';
import { AuthPayloadDto } from './dto/auth.payload.dto';

@Controller('api/auth')
@ApiTags('Auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    @ApiOkResponse({ type: AuthDto })
    login(@Body() authPayloadDto: AuthPayloadDto): Promise<AuthDto> {
        return this.authService.login(authPayloadDto);
    }
}
