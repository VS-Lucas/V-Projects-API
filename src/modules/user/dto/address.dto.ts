import { ApiProperty } from "@nestjs/swagger";

export class Address {
    @ApiProperty()
    street: string;

    @ApiProperty()
    district: string;

    @ApiProperty()
    city: string;

    @ApiProperty()
    state: string;

    @ApiProperty()
    country: string;

    @ApiProperty()
    number: number;
}