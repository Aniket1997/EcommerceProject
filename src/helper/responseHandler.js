const errResponseHandler =(res,{status = 500 ,message = 'Internal Server Error'})=>{

    return res.status(status).send({
        status: status,
        message: message,
    });
}

const successResponseHandler =(res,{status = 200 ,message = 'Success',payload={}})=>{

    return res.status(status).send({
        success: true,
        message: message,
        payload,
    });
    
}

module.exports = {errResponseHandler,successResponseHandler};