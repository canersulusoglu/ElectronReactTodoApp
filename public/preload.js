const { ipcRenderer, contextBridge } = require('electron');
const DataStorage = require('./DataStorage');

const ToDoListDataStorage = new DataStorage({name: 'ToDoList'});

window.electron = {
    Notifications: {
        sendAlarmNotification(notification) {
            ipcRenderer.send('alarmNotification', notification);
        }
    },
    DataStorage: ToDoListDataStorage
}