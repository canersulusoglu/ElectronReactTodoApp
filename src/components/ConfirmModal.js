import React from 'react';
import { 
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Slide
 } from '@material-ui/core';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ConfirmModal(props) {
  return (
    <Dialog
        open={props.open}
        TransitionComponent={Transition}
        keepMounted
        onClose={props.handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        >
        <DialogTitle id="alert-dialog-slide-title">{props.header}</DialogTitle>
        <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
                {props.message}
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={props.handleClose} color="primary">
            Disagree
            </Button>
            <Button onClick={props.handleAgree} color="secondary">
            Agree
            </Button>
        </DialogActions>
    </Dialog>
  );
}