import { ApiProperty } from '@nestjs/swagger';
import { Address } from './address.dto';

export class CreatedUserDto {
    @ApiProperty()
    email: string;
    
    @ApiProperty()
    name: string;

    @ApiProperty()
    role: string;
    
    // @ApiProperty()
    // address: Address
}