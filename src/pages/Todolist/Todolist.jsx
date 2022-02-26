import {useEffect, useState } from 'react';
import TodolistService from '../../services/Todolist.service';
import ItemService from '../../services/Item.service';

import './Todolist.scss';
import Modal from 'react-modal';
import { NotificationManager } from 'react-notifications';
import {useParams} from 'react-router-dom';

function Item({data}){
    return(
        <div className='list-item'>
            <h3>{data?.name}</h3>
            <p>{data.content}</p>
            <p><i>Added on {data.creationDate}</i></p>
        </div>
    );
};

export default function Todolist(){
    const { listId } = useParams();
    const [ list, setList ] = useState(null);
    const [ items, setItems ] = useState([]);

    const [ deleteListModal, setDeleteListModal ] = useState(false);


    const [ addItemModal, setAddItemModal ] = useState(false);
    const [ modalEntries, setModalEntries ] = useState({});
    const [ modalLoading, setModalLoading ] = useState(false);

    const addItem = async () =>{
        setModalLoading(true);
        let res = await ItemService.add(listId, modalEntries);
        if(res){
            setAddItemModal(false);
            setModalLoading(false);
            await getItems();
        }else{
            NotificationManager.error('Could not add your item', 'Error');
            setModalLoading(false);
        }
    };
    
    const getItems = async () => {
        let res = await ItemService.getItems(listId);
        if(res){
            setItems(res.items);
        }
    };

    const getList = async () => {
        let res = await TodolistService.getList(listId);
        if(res){
            setList(res);
            await getItems();
        }
    };

    useEffect(()=>{
        getList();
    }, []);

    return(
        <div className='todolist'>
            <div className='header container'>
                <h2>Todolist</h2>
                <button onClick={() => setAddItemModal(true)}>Add Item</button>
            </div>
            <div className='container'>
                <p>{list?.name}</p>
            </div>
            {items.length > 0 ?
            <div className='list container'>
                {items.map( i => <Item data={i} />)}
            </div>
            :
            <div className='no-list container'>
                <h3>It looks like you have no list yet</h3>
                <button onClick={() => setAddItemModal(true)}>Add Item</button>
            </div>
            }

            <div className='container'>
                <button onClick={() => setDeleteListModal(true)}>DELETE TODOLIST</button>
            </div>

            <Modal 
                isOpen={addItemModal}
                onRequestClose={() => setAddItemModal(false)}
                className="create-todolist-modal"
                disableAutoFocus={true}
                style={{ overlay: { zIndex: 1000, background: 'rgba(0,0,0,0.7)'}}}
            >
                <div className='create-modal-header'>
                    <h2>Add a new item</h2>
                </div>
                <div className='create-modal-content'>
                    <input 
                        value={modalEntries.name}
                        onChange={e => setModalEntries({...modalEntries, name: e.target.value})}
                        type="text" 
                        placeholder='Name'/>
                    <textarea 
                        value={modalEntries.content}
                        onChange={e => setModalEntries({...modalEntries, content: e.target.value})}
                        type="text" 
                        placeholder='Content'/>
                    <button 
                        disabled={modalLoading}
                        onClick={addItem}>Add</button>
                </div>
            </Modal>

            <Modal 
                isOpen={deleteListModal}
                onRequestClose={() => setDeleteListModal(false)}
                className="create-todolist-modal"
                disableAutoFocus={true}
                style={{ overlay: { zIndex: 1000, background: 'rgba(0,0,0,0.7)'}}}
            >
                <div className='create-modal-header'>
                    <h2>Are you sure to delete this item</h2>
                </div>
                <div className='create-modal-content'>
                    <button 
                        onClick={null}>DELETE!</button>
                </div>
            </Modal>
        </div>
    )
}