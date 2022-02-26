import authHeader from "./auth-header";

class ItemService{

    getItems = async (todolistId) => {
        try{
            let res = await fetch(`${process.env.REACT_APP_HTTP}/todolist/items/${todolistId}`,
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
            console.log(e)
            return null;
        }
    }

    add = async (todolistId, item) => {
        try{
            let res = await fetch(`${process.env.REACT_APP_HTTP}/todolist/items/${todolistId}`,
            {
                method: 'POST',
                headers: {
                    ...authHeader(),
                    "Accept": "*/*",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({item})
            });
            if(res.status !== 201){
                throw new Error('Wrong status')
            }
            return true;
        }catch(e){
            return null;
        }
    }

}

export default new ItemService();