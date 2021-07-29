import React from 'react';
import { withTranslation } from 'react-i18next';
import { 
    IconButton
 } from '@material-ui/core';
import ToDoCard from './ToDoCard';
import AddItemModal from './AddItemModal';
import ConfirmModal from './ConfirmModal';
import PlusIcon from '../icons/plus.svg';
import DeleteIcon from '../icons/delete.svg';

class Body extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isModalOpen: false,
            isConfirmDeleteAllItemsModalOpen: false,
            ToDoList: window.electron.DataStorage.ToDoList
        }
    }
    
    addItem = async (newItem) => {
        await window.electron.DataStorage.addToDo(newItem);
        this.setState({
            ToDoList: await window.electron.DataStorage.ToDoList
        });
    }

    deleteItem = async (itemId) => {
        await window.electron.DataStorage.deleteToDo(itemId);
        this.setState({
            ToDoList: await window.electron.DataStorage.ToDoList
        });
    }

    deleteAllItems = async () => {
        await window.electron.DataStorage.clearToDoList();
        this.setState({
            ToDoList: await window.electron.DataStorage.ToDoList
        });
    }

    setCompleted = async (itemId) =>{
        await window.electron.DataStorage.setCompleted(itemId);
        this.setState({
            ToDoList: await window.electron.DataStorage.ToDoList
        });
    }

    setUncompleted = async (itemId) =>{
        await window.electron.DataStorage.setUnCompleted(itemId);
        this.setState({
            ToDoList: await window.electron.DataStorage.ToDoList
        });
    }

    openAddItemModal = () =>{
        this.setState({
            isModalOpen: true
        })
    }

    closeAddItemModal = () =>{
        this.setState({
            isModalOpen: false
        })
    }

    openConfirmDeleteAllItemsModal = () =>{
        this.setState({
            isConfirmDeleteAllItemsModalOpen: true
        })
    }

    closeConfirmDeleteAllItemsModal = () =>{
        this.setState({
            isConfirmDeleteAllItemsModalOpen: false
        })
    }

    confirmDeleteAllItemsHandleAgree = () =>{
        this.deleteAllItems();
        this.closeConfirmDeleteAllItemsModal();
    }

    render(){
        return(
            <div className="Body">
                <div className="list">
                {
                    this.state.ToDoList.map((item, index) => {
                        return(
                            <ToDoCard key={index}
                                deleteItem={this.deleteItem} 
                                setCompleted={this.setCompleted}
                                setUncompleted={this.setUncompleted}
                                item={item} 
                            />
                        )
                    })
                }
                </div>
                <div className="addButton">
                    <IconButton color="primary" aria-label="add" onClick={this.openAddItemModal}>
                        <img className="plusIcon" src={PlusIcon} alt="add"/>
                    </IconButton>
                </div>
                {
                    (this.state.ToDoList.length > 0) 
                    ?
                    <div className="clearButton">
                        <IconButton color="secondary" aria-label="deleteAll" onClick={this.openConfirmDeleteAllItemsModal}>
                            <img className="deleteAllIcon" src={DeleteIcon} alt="deleteAll"/>
                        </IconButton>
                    </div>
                    : null
                }

                <AddItemModal
                    open={this.state.isModalOpen}
                    handleClose={this.closeAddItemModal}
                    addItem={this.addItem}
                />

                <ConfirmModal
                    header={this.props.t('ConfirmDeleteAllItemsModal.header')}
                    message={this.props.t('ConfirmDeleteAllItemsModal.message')}
                    open={this.state.isConfirmDeleteAllItemsModalOpen} 
                    handleClose={this.closeConfirmDeleteAllItemsModal}
                    handleAgree={this.confirmDeleteAllItemsHandleAgree}
                />

            </div>
        )
    }
}

export default withTranslation()(Body);