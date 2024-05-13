const jwt = require('jsonwebtoken');

const jsonWebToken = (payload, activationKey, expiresIn) => {
    console.log(typeof payload);
    if(typeof payload !== 'object' || !payload)
    {
        throw new Error('Payload must be a non-empty object');
    }

    if(typeof activationKey !== 'string' || activationKey === '')
    {
        throw new Error('Activation key must be a non-empty string');
    }
    if(typeof expiresIn !== 'string' || expiresIn === '')
    {
        throw new Error('Expiration duration must be a non-empty string');
    }
    try{
        const token =  jwt.sign(payload, activationKey, { expiresIn });
        return token;
    }
    catch(err)
    {
        throw new Error(err.message);
    }
}


module.exports = {
    jsonWebToken
}