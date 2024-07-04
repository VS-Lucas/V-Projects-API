import { ApiProperty } from '@nestjs/swagger';

export class CreatedUserDto {
    @ApiProperty()
    email: string;
    
    @ApiProperty()
    name: string;

    @ApiProperty()
    role: string;
}