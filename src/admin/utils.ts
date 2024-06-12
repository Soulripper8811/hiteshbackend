// src/utils/hashPassword.ts
import * as bcrypt from 'bcrypt';

export async function generateSalt() {
    const saltRounds = 10; // You can adjust the number of rounds for more or less security
    const salt = await bcrypt.genSalt(saltRounds);
    return salt
}

export async function authentication(salt: string, password: string): Promise<string> {
    return bcrypt.hash(password, salt);
}

export async function hash_refresh_token(password: string, saltRounds = 10): Promise<string> {
    return bcrypt.hash(password, saltRounds);
}