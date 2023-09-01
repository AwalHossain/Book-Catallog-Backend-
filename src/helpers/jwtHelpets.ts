import jwt, { JwtPayload, Secret } from 'jsonwebtoken';

const createToken = (
    payload: Record<string, unknown>,
    secret: Secret,
    expiresIn: string
) => {


    return jwt.sign(payload, secret as string, 
       {
         expiresIn : expiresIn
       }
    );
}


const verifyToken = (token: string, secret: Secret): JwtPayload => {

    return jwt.verify(token, secret) as JwtPayload;
}


export const JwtHelpers = {
    createToken,
    verifyToken
}
