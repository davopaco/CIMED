import bcrypt from 'bcrypt';

export const salt =async()=>{
    const salt = await bcrypt.genSalt(10);
    return salt;
}

export const hashing = async(password, salt)=>{
    let newPassword= password.toString();
    const hash = await bcrypt.hash(newPassword, parseInt(salt));
    return hash;
}
