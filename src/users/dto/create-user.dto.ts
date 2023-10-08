export class CreateUserDto {
    contact!: number;
    password!: string;
    name?: string;
    address?: string;
    gender?: string;
    photo?: string;
}
