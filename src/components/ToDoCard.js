import React from 'react';
import { withTranslation } from 'react-i18next';
import moment from 'moment';
import classNames from 'classnames';
import IconButton from '@material-ui/core/IconButton';
import ConfirmModal from './ConfirmModal';

import CheckedIcon from '../icons/checked.svg';
import UnCheckedIcon from '../icons/cancel.svg';
import TrashIcon from '../icons/trash.svg';

class ToDoCard extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isConfirmModalOpen: false
        }
    }

    openConfirmModal = () =>{
        this.setState({
            isConfirmModalOpen: true
        })
    }

    closeConfirmModal = () =>{
        this.setState({
            isConfirmModalOpen: false
        })
    }

    confirmModalHandleAgree = () =>{
        this.props.deleteItem(this.props.item.id);
        this.closeConfirmModal();
    }

    render(){
        return(
            <div className={classNames({
                'ToDoCard': true,
                'completed': this.props.item.isCompleted
            })}>
                <div className="header">
                    <div className="title">{this.props.item.title}</div>
                    <div>{moment(this.props.item.dateTime).format('Do MMMM YYYY, HH:mm')}</div>
                </div>
                <div className="body">
                    {this.props.item.desc 
                        ?
                        <div className="desc">
                            {this.props.item.desc}
                        </div>
                        : null
                    }
                </div>
                <div className="footer">
                {
                    (this.props.item.isCompleted) 
                    ? 
                    <IconButton color="primary" aria-label="complete" onClick={() => this.props.setUncompleted(this.props.item.id)}>
                        <img className="uncheckIcon" src={UnCheckedIcon} alt="uncomplete"/>
                    </IconButton>
                    :
                    <IconButton color="primary" aria-label="complete" onClick={() => this.props.setCompleted(this.props.item.id)}>
                        <img className="checkIcon" src={CheckedIcon} alt="complete"/>
                    </IconButton>
                }
                    
                    <IconButton className="deleteButton" color="secondary" aria-label="delete" onClick={this.openConfirmModal}>
                        <img className="trashIcon" src={TrashIcon} alt="delete"/>
                    </IconButton>
                </div>

                <ConfirmModal
                    header={this.props.t('ConfirmDeleteItemModal.header')}
                    message={this.props.t('ConfirmDeleteItemModal.message')}
                    open={this.state.isConfirmModalOpen} 
                    handleClose={this.closeConfirmModal}
                    handleAgree={this.confirmModalHandleAgree}
                />
            </div>
            )
    }
}

export default withTranslation()(ToDoCard);