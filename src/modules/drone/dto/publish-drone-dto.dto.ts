import { ApiProperty } from "@nestjs/swagger";
export class MessageDroneDto {
    @ApiProperty()
    topic: string

    @ApiProperty()
    message: string
}
