import {useEffect, useState } from 'react';
import TodolistService from '../../services/Todolist.service';
import './Todolists.scss';
import Modal from 'react-modal';
import { NotificationManager } from 'react-notifications';

function ListItem({data}){
    return(
        <div 
            onClick={() => window.location.href = `/todolist/${data.id}`}
            className='list-item'>
            <h3>{data?.name}</h3>
            <p>{data.creationDate}</p>
        </div>
    );
};

export default function Todolists(){
    const [ createModal, setCreateModal ]   = useState(false);
    const [ lists, setLists ]               = useState([]);
    const [ modalEntries, setModalEntries ] = useState({});
    const [ modalLoading, setModalLoading ] = useState(false);

    const createList = async () =>{
        if(modalEntries.name.length < 1) return;
        setModalLoading(true);
        let res = await TodolistService.create(modalEntries.name);
        if(res){
            setCreateModal(false);
            setModalLoading(false);
            await getLists();
        }else{
            NotificationManager.error('Could not create your Todo list', 'Error');
            setModalLoading(false);
        }
    };

    const getLists = async () => {
        let res = await TodolistService.getLists();
        if(res){
            setLists(res);
        }
    };

    useEffect(()=>{
        getLists();
    }, []);

    return(
        <div className='todolists'>
            <div className='header container'>
                <h2>Your Todolists</h2>
                <button onClick={() => setCreateModal(true )}>CREATE A NEW TODOLIST</button>
            </div>
            {(lists.length > 0) ?
            <div className='list container'>
                {lists.map( l => <ListItem data={l}/> )}
            </div>
            :
            <div className='no-list container'>
                <h3>It looks like you have no list yet</h3>
            </div>
            }

            <Modal 
                isOpen={createModal}
                onRequestClose={() => setCreateModal(false)}
                className="create-todolist-modal"
                disableAutoFocus={true}
                style={{ overlay: { zIndex: 1000, background: 'rgba(0,0,0,0.7)'}}}
            >
                <div className='create-modal-header'>
                    <h2>Create a new todo-list</h2>
                </div>
                <div className='create-modal-content'>
                    <input 
                        value={modalEntries.name}
                        onChange={e => setModalEntries({...modalEntries, name: e.target.value})}
                        type="text" 
                        placeholder='Todolist name'/>
                    <button 
                        disabled={modalLoading}
                        onClick={createList}>Create</button>
                </div>
            </Modal>
        </div>
    )
}