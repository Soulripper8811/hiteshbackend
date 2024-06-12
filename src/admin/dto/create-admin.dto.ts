import { IsEmail, IsNotEmpty, registerDecorator, ValidationArguments, ValidationOptions } from "class-validator";


export class CreateAdminDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    @IsStrongPassword({ message: 'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.' })
    password: string;
}


function IsStrongPassword(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'isStrongPassword',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
                    return typeof value === 'string' && passwordRegex.test(value);
                },
                defaultMessage(args: ValidationArguments) {
                    return 'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.';
                },
            },
        });
    };
}