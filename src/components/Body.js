import React from 'react';
import { 
    IconButton
 } from '@material-ui/core';
import ToDoCard from './ToDoCard';
import AddItemModal from './AddItemModal';
import PlusIcon from '../icons/plus.svg';

class Body extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            ToDoList: []
        }
    }

    deleteItem = (itemId) => {
        var index = this.state.ToDoList.findIndex((x) => x.id === itemId);
        if(index !== -1){
            let tempItems = [...this.state.ToDoList];
            tempItems.splice(index, 1);
            this.setState({ ToDoList: tempItems });
        }
    }
    
    addItem = (newItem) => {
        var joined = this.state.ToDoList.concat(newItem);
        this.setState({
            ToDoList: joined,
            addItemTitle: "",
            addItemDesc: "",
            titleError: false,
            titleErrorMessage: ""
        });
        this.closeAddItemModal();
    }

    setCompleted = (itemId) =>{
        var tempList = this.state.ToDoList.map(item => {
            if(item.id === itemId){
                return{
                    id: itemId,
                    title: item.title,
                    desc: item.desc,
                    isCompleted: true
                }
            }else{
                return item;
            }
        });
        this.setState({ ToDoList: tempList });
    }

    setUncompleted = (itemId) =>{
        var tempList = this.state.ToDoList.map(item => {
            if(item.id === itemId){
                return{
                    id: itemId,
                    title: item.title,
                    desc: item.desc,
                    isCompleted: false
                }
            }else{
                return item;
            }
        });
        this.setState({ ToDoList: tempList });
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
                    <IconButton color="secondary" aria-label="add" onClick={this.openAddItemModal}>
                        <img className="plusIcon" src={PlusIcon} alt="add"/>
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