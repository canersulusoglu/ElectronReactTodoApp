const fs = require('fs');
const path = require('path');
const Store = require('electron-store');

class DataStorage extends Store{
	constructor(settings){
		super(settings);
		
		this.ToDoList = this.get('todolist') || [];
	}

	saveToDoList(){
		this.set('todolist', this.ToDoList);
		return this;
	}

	getToDoList(){
		this.ToDoList = this.get('todolist') || [];
		return this;
	}

	addToDo(todo){
		this.ToDoList = [...this.ToDoList, todo];
		return this.saveToDoList();
	}

	deleteToDo(id){
		this.ToDoList = this.ToDoList.filter((x)=> x.id !== id);
		return this.saveToDoList();
	}

	setCompleted(todo_id){
		this.ToDoList = this.ToDoList.map(item => {
            if(item.id === todo_id){
                return{
                    id: item.id,
                    title: item.title,
                    desc: item.desc,
                    dateTime: item.dateTime,
                    isCompleted: true
                }
            }else{
                return item;
            }
        });
		return this.saveToDoList();
	}

	setUnCompleted(todo_id){
		this.ToDoList = this.ToDoList.map(item => {
            if(item.id === todo_id){
                return{
                    id: item.id,
                    title: item.title,
                    desc: item.desc,
                    dateTime: item.dateTime,
                    isCompleted: false
                }
            }else{
                return item;
            }
        });
		return this.saveToDoList();
	}

	clearToDoList(){
		this.ToDoList = [];
		return this.saveToDoList();
	}
}

module.exports = DataStorage;