import authHeader from "./auth-header";

class TodolistService{

    getLists = async () => {
        try{
            let res = await fetch(`${process.env.REACT_APP_API}/todolist`,
            {
                method: 'GET',
                headers: {
                    ...authHeader(),
                    "Accept": "*/*",
                    "Content-Type": "application/json"
                }
            });
            if(res.status !== 200){
                throw new Error('Wrong status')
            }
            return res.json();
        }catch(e){
            return null;
        }
    }

}

export default new TodolistService();