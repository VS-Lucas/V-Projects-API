import { ApiProperty } from '@nestjs/swagger';

export class CreatedUserDto {
    @ApiProperty()
    email: string;
    
    @ApiProperty()
    name: string;

    @ApiProperty()
    role: string;

    @ApiProperty()
    sector?:string

    @ApiProperty()
    position?:string

    @ApiProperty()
    profilePhoto:string
}