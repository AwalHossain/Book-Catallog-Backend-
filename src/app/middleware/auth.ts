import { NextFunction, Request, Response } from "express";
import ApiError from "../../error/ApiError";
import { JwtHelpers } from "../../helpers/jwtHelpets";


const auth = (...RequiredRoles: string[]) => async (
    req: Request,
    res: Response,
    next: NextFunction
)=>{
    try{
        
    const token = req.headers.authorization;
    if(!token){
        throw new ApiError(401,'Token not found' );
    }

    let verifiedUser = null;

    verifiedUser = JwtHelpers.verifyToken(token, process.env.JWT_SECRET as string);

    (req as any).user = verifiedUser;

    if(RequiredRoles.length && !RequiredRoles.includes(verifiedUser.role) ){
        throw new ApiError(401,'Forbidden' );
    }
    
    next();

    }catch(err){
        next(err);
    }


}


export default auth;