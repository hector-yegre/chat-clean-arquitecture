import bcrypt from 'bcrypt';

const SALT_ROUNF = 10;

export const hasPassword = async (password:string): Promise<string> =>{
    return await bcrypt.hash(password,SALT_ROUNF);
}

export const comparePassword = async (
    password:string,
    hash:string
 ): Promise <boolean> =>{
    return bcrypt.compare(password,hash);
 }