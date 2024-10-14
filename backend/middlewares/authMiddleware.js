import JWT from 'jsonwebtoken'

//protect routes token base 
export const requireSignIn  = async(req, res, next) =>{
    try {
        const decode =JWT.verify(req.headers.authorization,process.env.JWT_SECTRET);
        next(); 
    } catch (error) {
        console.log(error);
    }
}

