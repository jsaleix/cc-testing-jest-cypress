import authHeader from "./auth-header";

class TodolistService{

    getLists = async () => {
        try{
            let res = await fetch(`${process.env.REACT_APP_HTTP}/todolist`,
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

    getList = async (id) => {
        try{
            let res = await fetch(`${process.env.REACT_APP_HTTP}/todolist/${id}`,
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
    };

    create = async (name) => {
        try{
            let res = await fetch(`${process.env.REACT_APP_HTTP}/todolist`,
            {
                method: 'POST',
                headers: {
                    ...authHeader(),
                    "Accept": "*/*",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name })
            });
            if(res.status !== 201){
                throw new Error('Wrong status')
            }
            return true;
        }catch(e){
            return null;
        }
    }
    create = async (name) => {
        try{
            let res = await fetch(`${process.env.REACT_APP_HTTP}/todolist`,
            {
                method: 'POST',
                headers: {
                    ...authHeader(),
                    "Accept": "*/*",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name })
            });
            if(res.status !== 201){
                throw new Error('Wrong status')
            }
            return true;
        }catch(e){
            return null;
        }
    };

    deleteList = async (id) => {
        try{
            let res = await fetch(`${process.env.REACT_APP_HTTP}/todolist/${id}`,
            {
                method: 'DELETE',
                headers: {
                    ...authHeader(),
                    "Accept": "*/*",
                    "Content-Type": "application/json"
                }
            });
            if(res.status !== 204){
                throw new Error('Wrong status')
            }
            return true
        }catch(e){
            return null;
        }
    };

    create = async (name) => {
        try{
            let res = await fetch(`${process.env.REACT_APP_HTTP}/todolist`,
            {
                method: 'POST',
                headers: {
                    ...authHeader(),
                    "Accept": "*/*",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name })
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

export default new TodolistService();