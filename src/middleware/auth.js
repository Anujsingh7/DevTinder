
const adminAuth=(req,res,next)=>{
    console.log("admin is valid");
    const token="xyz";
    const isAdminAuthorized = token==="xyz";
    if(isAdminAuthorized){
        next();
    }else{
        res.status(403).send("Access denied");
    }
}

module.exports={adminAuth,};

