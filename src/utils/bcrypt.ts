import * as bcrypt from 'bcrypt';

// Bcrypt docs: https://github.com/kelektiv/node.bcrypt.js#readme
const saltRounds = 10;

export async function hashPassword(
    rawPassword: string
): Promise<string> {
    const salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(rawPassword, salt);
}

export async function comparePasswords(
    rawPass: string, 
    hashedPass: string
): Promise<boolean> {
    return await bcrypt.compare(rawPass, hashedPass)
}
