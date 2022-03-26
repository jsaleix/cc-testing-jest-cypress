import {useEffect, useState } from 'react';
import TodolistService from '../../services/Todolist.service';
import ItemService from '../../services/Item.service';

import './Todolist.scss';
import Modal from 'react-modal';
import { NotificationManager } from 'react-notifications';
import {useParams} from 'react-router-dom';
import moment from 'moment';

function Item({data, updateAction, checkAction}){

    const checkItem = (e) => {
        e.stopPropagation();
        checkAction(data._id);
    };

    return(
        <div className='list-item'>
            <div onClick={updateAction} style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', alignContent: 'center'}}>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <h3>{data?.name}</h3>
                    <p>{data.content}</p>
                </div>
                <div style={{display: 'flex', height: '100%', alignItems: 'center'}}>
                    <svg onClick={updateAction} width="40" height="40" viewBox="0 0 566 566" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M416.207 267.602L465.531 218.278L347.718 100.465L298.394 149.789L168.329 20.0384C143.824 -4.46657 103.925 -4.46657 79.42 20.0384L19.7283 79.7301C-4.77667 104.235 -4.77667 144.134 19.7283 168.639L149.479 298.39L0.25 447.933V565.746H118.063L267.606 416.203L397.357 545.953C427.203 575.799 467.416 564.803 486.266 545.953L545.958 486.262C570.463 461.757 570.463 421.858 545.958 397.353L416.207 267.602ZM194.405 253.778L64.34 124.028L123.717 64.3359L163.617 104.235L126.545 141.621L170.843 185.918L208.228 148.533L253.783 194.087L194.405 253.778ZM441.968 501.656L312.218 371.905L371.909 312.213L417.463 357.768L380.078 395.153L424.375 439.451L461.761 402.065L501.66 441.964L441.968 501.656ZM556.639 127.169C559.552 124.263 561.862 120.81 563.439 117.01C565.015 113.209 565.827 109.135 565.827 105.021C565.827 100.906 565.015 96.8317 563.439 93.0311C561.862 89.2306 559.552 85.7782 556.639 82.8718L483.124 9.35676C468.358 -5.40907 447.938 0.245925 438.827 9.35676L381.334 66.8493L499.147 184.662L556.639 127.169Z" 
                        fill="white"/>
                    </svg>
                    <input style={{height: '40px', marginLeft: '10px'}} checked={data.done} onClick={checkItem} type="checkbox"/>
                </div>
            </div>
            <p className='date'><i>Added on {moment(data.creationDate).format('DD-MM-YYYY')}</i></p>
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
    const [ addModalLoading, setAddModalLoading ] = useState(false);

    const [ toUpdate, setToUpdate ]                   = useState({});
    const [ updateModal, setUpdateModal ]             = useState(false);
    const [updateModalLoading, setUpdateModalLoading ] = useState(false);

    const addItem = async () =>{
        setAddModalLoading(true);
        let res = await ItemService.add(listId, modalEntries);
        if(res){
            setAddItemModal(false);
            setAddModalLoading(false);
            await getItems();
        }else{
            NotificationManager.error('Could not add your item', 'Error');
            setAddModalLoading(false);
        }
    };

    const updateItem = async () => {
        setUpdateModalLoading(true);
        let res = await ItemService.update(listId, toUpdate);
        if(res){
            setToUpdate({});
            setUpdateModal(false);
            setUpdateModalLoading(false);
            await getItems();
        }else{
            NotificationManager.error('Could not update your item', 'Error');
            setUpdateModalLoading(false);
        }
    }

    const checkItem = async (id) => {
        let res = await ItemService.toggleCheck(listId, id);
        if(!res){
            NotificationManager.error('Could not check this item', 'Error');
        }else{
            let tmpItems = [...items];
            let toChange = tmpItems.find( it => it._id === id);
            toChange.done = !toChange.done;
            setItems(tmpItems);
        }
    };
    
    const getItems = async () => {
        let res = await ItemService.getItems(listId);
        if(res){
            setItems(res.items);
        }
    };

    const deleteList = async () => {
        let res = await TodolistService.deleteList(listId);
        if(res){
            setDeleteListModal(false);
            NotificationManager.success('The list has been succesfully deleted', 'Success');
            setTimeout(()=>{
                window.location.href = '/';
            }, 5000);
        }else{
            NotificationManager.error('Could not delete the list', 'Error');
        }
    };

    const getList = async () => {
        let res = await TodolistService.getList(listId);
        if(res){
            setList(res);
            await getItems();
        }else{
            window.location.href = '/';
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
                {items.map( i => <Item 
                                    data={i} 
                                    checkAction={checkItem}
                                    updateAction={() => {setToUpdate(i); setUpdateModal(true)}} />)}
            </div>
            :
            <div className='no-list container'>
                <h3>It looks like you have no list yet</h3>
                <button onClick={() => setAddItemModal(true)}>Add Item</button>
            </div>
            }

            {list &&<div className='container'>
                <button onClick={() => setDeleteListModal(true)}>DELETE TODOLIST</button>
            </div>}

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
                        data-testid="create-name"
                        value={modalEntries.name}
                        onChange={e => setModalEntries({...modalEntries, name: e.target.value})}
                        type="text" 
                        placeholder='Name'/>
                    <textarea 
                        data-testid="create-content"
                        value={modalEntries.content}
                        onChange={e => setModalEntries({...modalEntries, content: e.target.value})}
                        type="text" 
                        placeholder='Content'/>
                    <button 
                        disabled={addModalLoading}
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
                        onClick={deleteList}>DELETE!</button>
                </div>
            </Modal>

            <Modal 
                isOpen={updateModal}
                onRequestClose={() => setUpdateModal(false)}
                className="create-todolist-modal"
                disableAutoFocus={true}
                style={{ overlay: { zIndex: 1000, background: 'rgba(0,0,0,0.7)'}}}
            >
                <div className='create-modal-header'>
                    <h2>Update</h2>
                </div>
                <div className='create-modal-content'>
                    <input
                        data-testid="update-name"
                        value={toUpdate.name}
                        onChange={e => setToUpdate({...toUpdate, name: e.target.value})}
                        type="text" 
                        placeholder='Name'/>
                    <textarea
                        data-testid="update-content"
                        value={toUpdate.content}
                        onChange={e => setToUpdate({...toUpdate, content: e.target.value})}
                        type="text" 
                        placeholder='Content'/>
                    <button 
                        disabled={updateModalLoading}
                        onClick={updateItem}>Save</button>
                </div>
            </Modal>
        </div>
    )
}