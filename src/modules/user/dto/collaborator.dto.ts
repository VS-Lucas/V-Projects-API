import { ApiProperty } from '@nestjs/swagger';

export class Collaborator {
    @ApiProperty()
    id: number;

    @ApiProperty()
    email: string;
    
    @ApiProperty()
    name: string;

    @ApiProperty()
    role: string;

    @ApiProperty()
    position: string;

    @ApiProperty()
    profilePhoto: string
}