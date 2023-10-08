import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class SignInDto {
    @IsNotEmpty()
    @IsNumber()
    contact: number;

    @IsNotEmpty()
    @IsString()
    password: string;
}
