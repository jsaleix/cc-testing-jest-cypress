import authHeader from "./auth-header";

class AuthService{

    login = async (email , password) => {
        try{
            let res = await fetch(`${process.env.REACT_APP_HTTP}/auth/login`,
            {
                method: 'POST',
                headers: {
                    "Accept": "*/*",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });
            if(res.status !== 200){
                throw new Error('Wrong status')
            }
            return res.json();
        }catch(e){
            return null;
        }
    }

    signup = async (userObj) => {
        try{
            let res = await fetch(`${process.env.REACT_APP_HTTP}/auth/signup`,
            {
                method: 'POST',
                headers: {
                    "Accept": "*/*",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ user: userObj })
            });
            if(res.status !== 201){
                return res.json();
            }
            return true;
        }catch(e){
            return false;
        }
    }

}

export default new AuthService();