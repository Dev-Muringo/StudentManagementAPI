const argon2=require('argon2');

//hash password
async function hashPassword(password){
    const hashedPassword=await argon2.hash(password,{
        type:argon2.argon2id
    });
    return hashedPassword;
}

//verify password
async function verifyPassword(hashedPassword,password){
    return await argon2.verify(hashedPassword,password);
}

module.exports={hashPassword,verifyPassword}