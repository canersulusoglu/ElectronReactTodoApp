import React, { useReducer } from 'react';
import { useTranslation } from 'react-i18next';
import isElectron from 'is-electron';
import moment from 'moment';
import {v4 as uuid} from "uuid"; 
import { 
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle
} from '@material-ui/core';
import DateTimePicker from './DateTimePicker';

function AddItemModal (props){
    const { t } = useTranslation();
    const initialState = {
        isModalOpen: false,
        itemTitle: "",
        itemDesc: "",
        itemDateTime: new Date(),
        titleError: false,
        titleErrorMessage: ""
    };
    function reducer(state, action) {
        switch (action.type) {
        case 'itemTitle':
            return { ...state, itemTitle: action.payload };
        case 'itemDesc':
            return { ...state, itemDesc: action.payload };
        case 'itemDateTime':
            return { ...state, itemDateTime: action.payload };
        case 'formError':
            return{ ...state, titleError: true, titleErrorMessage: t('Form.inputTitleError')};
        case 'resetForm':
            return initialState;
        default:
            throw new Error();
        }
    }
    const [state, dispatch] = useReducer(reducer, initialState);

    const submitForm = async () => {
        if(state.itemTitle !== undefined && state.itemTitle.length > 0){
            const newItemId = await uuid();
            var newItem = {
                id: newItemId,
                title: state.itemTitle,
                desc: state.itemDesc,
                dateTime: state.itemDateTime,
                isCompleted: false
            }
            props.addItem(newItem);
            dispatch({
                type: 'resetForm'
            })
            props.handleClose();
        }else{
            dispatch({
                type: 'formError',
            })
        }
    }

    const Notification = async () => {
        if(isElectron()){
            const NotificationOptions = {
                title: 'Custom Notification',
                subtitle: 'Subtitle of the Notification',
                body: 'Body of Custom Notification',
                silent: false,
                //icon: path.join(__dirname, '../assets/image.png'),
                hasReply: true,  
                timeoutType: 'never', 
                replyPlaceholder: 'Reply Here',
                //sound: path.join(__dirname, '../assets/sound.mp3'),
                urgency: 'critical',
                closeButtonText: 'Close Button',
                actions: [ {
                    type: 'button',
                    text: 'Show Button'
                }]
            };
            window.electron.Notifications.sendNotification(NotificationOptions);
        }
    }

    return(
        <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">{t('Form.title')}</DialogTitle>
            <DialogContent>
                <TextField
                    onChange={(event) => {
                        dispatch({
                            type: 'itemTitle',
                            payload: event.target.value
                        })
                    }}
                    value={state.itemTitle}
                    autoFocus
                    variant="outlined"
                    margin="dense"
                    id="title"
                    label={t('Form.inputTitle')}
                    type="text"
                    fullWidth
                    error={state.titleError}
                    helperText={state.titleErrorMessage}
                />
                
                <TextField
                    value={state.itemDesc}
                    onChange={(event) => {
                        dispatch({
                            type: 'itemDesc',
                            payload: event.target.value
                        })
                    }}
                    variant="outlined"
                    margin="dense"
                    id="desc"
                    label={t('Form.inputDesc')}
                    type="text"
                    fullWidth
                    multiline
                    minRows={6}
                    maxRows={10}
                />

                <DateTimePicker
                    value={state.itemDateTime}
                    onChange={(newDate) => {
                        dispatch({
                            type: 'itemDateTime',
                            payload: newDate.toDate()
                        })
                    }}
                    label={t('Form.inputDateTime')}
                />

            </DialogContent>
            <DialogActions>
                <Button onClick={submitForm} color="primary">
                    {t('Form.submit')}
                </Button>
                <Button onClick={props.handleClose} color="primary">
                    {t('Form.cancel')}
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default AddItemModal;