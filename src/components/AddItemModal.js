import React from 'react';
import {v4 as uuid} from "uuid"; 
import { 
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle
} from '@material-ui/core';

class AddItemModal extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isModalOpen: false,
            addItemTitle: "",
            addItemDesc: "",
            titleError: false,
            titleErrorMessage: ""
        }
    }

    submitForm = async () => {
        if(this.state.addItemTitle !== undefined && this.state.addItemTitle.length > 0){
            const newItemId = await uuid();
            var newItem = {
                id: newItemId,
                title: this.state.addItemTitle,
                desc: this.state.addItemDesc,
                isCompleted: false
            }
            this.props.addItem(newItem);
            this.setState({
                addItemTitle: "",
                addItemDesc: ""
            });
            this.props.handleClose();
        }else{
            this.setState({
                titleError: true,
                titleErrorMessage: "Bu alan boş bırakılmamalıdır."
            });
        }
    }

    render(){
        return (
            <Dialog open={this.props.open} onClose={this.props.handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add To Do</DialogTitle>
                <DialogContent>
                    <TextField
                        onChange={(e)=> {this.setState({addItemTitle: e.target.value})}}
                        autoFocus
                        variant="outlined"
                        margin="dense"
                        id="title"
                        label="Title"
                        type="text"
                        fullWidth
                        error={this.state.titleError}
                        helperText={this.state.titleErrorMessage}
                    />
                    
                    <TextField
                        onChange={(e) => {this.setState({addItemDesc: e.target.value})}}
                        variant="outlined"
                        margin="dense"
                        id="desc"
                        label="Description"
                        type="text"
                        fullWidth
                        multiline
                        minRows={6}
                        maxRows={10}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.submitForm} color="primary">
                        Add
                    </Button>
                    <Button onClick={this.props.handleClose} color="primary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        );
        }
}

export default AddItemModal;