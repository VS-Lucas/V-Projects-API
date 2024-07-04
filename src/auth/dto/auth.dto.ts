import { ApiProperty } from "@nestjs/swagger";
import { Address } from "src/modules/user/dto/address.dto";

class UserDto {
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
    profilePhoto: string;

    @ApiProperty()
    phoneNumber: string;

    @ApiProperty()
    birthDate: Date;

    @ApiProperty()
    sector: string;

    @ApiProperty({ type: Address })
    address: Address;
}

export class AuthDto {
    @ApiProperty()
    accessToken: string;

    @ApiProperty({ type: UserDto })
    user: UserDto;
}
