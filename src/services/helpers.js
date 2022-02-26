import jwt_decode from 'jwt-decode';

class Helpers{

    getToken = () => {
        try{            
            let token = JSON.parse(localStorage.getItem('token') || '{}' );
            if(!token.token) throw new Error('Missing token');
            //token = jwt_decode(token.token);
            return token;

        }catch(e){
            //console.log(e)
            return false;
        }
    }

}

export default new Helpers();