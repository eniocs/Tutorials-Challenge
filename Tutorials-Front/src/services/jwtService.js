import jwt from 'jsonwebtoken';

class jwtService {

    create(){              
            console.log(" now : " + Date.now())
            return  jwt.sign({
            //Date.now() returns the number of milliseconds since January 1, 1970 00:00:00
            exp: Date.now() + (1000*60),// +5 min expiration
            data: 'foobar'
        }, 'secret');
    }
}
export default new jwtService();
