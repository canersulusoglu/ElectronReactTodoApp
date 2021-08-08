const { ipcRenderer, contextBridge } = require('electron');
const DataStorage = require('./DataStorage');

export const ToDoListDataStorage = new DataStorage({name: 'ToDoList'});

window.electron = {
    Notifications: {
        sendNotification(notification) {
            ipcRenderer.send('notification', notification);
        }
    },
    DataStorage: ToDoListDataStorage
}