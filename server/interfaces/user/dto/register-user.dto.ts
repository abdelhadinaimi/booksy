export class RegisterUserDto {
  familyName?: string;
  givenName?: string;
  picture?: string;
  email!: string;
  userId!: string;
}
