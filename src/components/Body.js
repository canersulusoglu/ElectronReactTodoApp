import React from 'react';
import { 
    IconButton
 } from '@material-ui/core';
import ToDoCard from './ToDoCard';
import AddItemModal from './AddItemModal';
import PlusIcon from '../icons/plus.svg';
import DeleteIcon from '../icons/delete.svg';

class Body extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isModalOpen: false,
            ToDoList: window.electron.DataStorage.ToDoList
        }
    }
    
    addItem = async (newItem) => {
        await window.electron.DataStorage.addToDo(newItem);
        this.setState({
            ToDoList: await window.electron.DataStorage.ToDoList
        });
        /*
        var joined = this.state.ToDoList.concat(newItem);
        this.setState({
            ToDoList: joined,
        });
        this.closeAddItemModal();
        */
    }

    deleteItem = async (itemId) => {
        await window.electron.DataStorage.deleteToDo(itemId);
        this.setState({
            ToDoList: await window.electron.DataStorage.ToDoList
        });
        /*
        var index = this.state.ToDoList.findIndex((x) => x.id === itemId);
        if(index !== -1){
            let tempItems = [...this.state.ToDoList];
            tempItems.splice(index, 1);
            this.setState({ ToDoList: tempItems });
        }
        */
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
        /*
        var tempList = this.state.ToDoList.map(item => {
            if(item.id === itemId){
                return{
                    id: itemId,
                    title: item.title,
                    desc: item.desc,
                    dateTime: item.dateTime,
                    isCompleted: true
                }
            }else{
                return item;
            }
        });
        this.setState({ ToDoList: tempList });
        */
    }

    setUncompleted = async (itemId) =>{
        await window.electron.DataStorage.setUnCompleted(itemId);
        this.setState({
            ToDoList: await window.electron.DataStorage.ToDoList
        });
        /*
        var tempList = this.state.ToDoList.map(item => {
            if(item.id === itemId){
                return{
                    id: itemId,
                    title: item.title,
                    desc: item.desc,
                    dateTime: item.dateTime,
                    isCompleted: false
                }
            }else{
                return item;
            }
        });
        this.setState({ ToDoList: tempList });
        */
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
                <div className="clearButton">
                    <IconButton color="secondary" aria-label="deleteAll" onClick={this.deleteAllItems}>
                        <img className="deleteAllIcon" src={DeleteIcon} alt="deleteAll"/>
                    </IconButton>
                </div>

                <AddItemModal
                    open={this.state.isModalOpen}
                    handleClose={this.closeAddItemModal}
                    addItem={this.addItem}
                />

            </div>
        )
    }
}

export default Body;