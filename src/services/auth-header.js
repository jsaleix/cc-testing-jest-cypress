export default function authHeader(){
    let user = localStorage.getItem('token');
    if(user){
        user = JSON.parse(user);
        return { Authorization: `Bearer ${user.token}` };
    }else{
        return {};
    }
}