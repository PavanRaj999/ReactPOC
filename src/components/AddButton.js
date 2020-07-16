import React from "react";
import MtrlIcon from "@material-ui/core/Icon";
import MtrlTextareaAutosize from '@material-ui/core/TextareaAutosize';
import MtrlButton from '@material-ui/core/Button';
import { connect } from "react-redux";
import { addList, addCard } from "../actions";

class AddButton extends React.Component {

    state = {
        formOpen: false
    };

    openForm = () => {
        this.setState(
            { formOpen: true }
        )
    }
    closeForm = (e) => {
        this.setState(
            { formOpen: false }
        )
    }

    handleInputChange = e => {
        this.setState({
            text: e.target.value
        })
    }

    handleAddList = () => {
        const { dispatch } = this.props;
        const { text } = this.state;
        if (text) {
            dispatch(addList(text));
        }
        return;
    }

    handleAddCard=()=>{
        const { dispatch, listID } = this.props;
        const { text } = this.state;
        if (text) {
            dispatch(addCard(listID,text));
        }
    }

    renderAddButton = () => {
        const { list } = this.props;
        const btnText = list ? "list" : "card";
        return (
            <div
                onClick={this.openForm}
                style={styles.btnGroup}>
                <MtrlIcon>add</MtrlIcon>
                <p>Add a {btnText} </p>
            </div>
        )
    }

    renderForm = () => {
        const { list } = this.props;
        const txtAreaPlaceholder = list ? "Add a list title..." : "Add a card title...";
        return <div>
                <div>
                    <MtrlTextareaAutosize 
                    value={this.state.text} 
                    onChange={this.handleInputChange} 
                    autoFocus 
                    placeholder={txtAreaPlaceholder} 
                    style={styles.txtArea} 
                    onBlur={this.closeForm} 
                    rowsMin={3} />
                </div>
                <div style={styles.btnAdd}>
                    <MtrlButton 
                    onMouseDown={list ? this.handleAddList: this.handleAddCard} 
                    variant={styles.btnAdd.variant} 
                    color={styles.btnAdd.color}>Add</MtrlButton>
                    <MtrlIcon>
                        close
                    </MtrlIcon>
                </div>
            </div>
    }

    render() {
        return this.state.formOpen ? this.renderForm() : this.renderAddButton();
    }
}

const styles = {
    btnGroup: {
        display: "flex",
        alignItems: "center",
        //verticalAlign: "top",
        cursor: "pointer",
        color: "#21059e",
    },
    btnAdd: {
        variant: "contained",
        display: "flex",
        alignItems: "center"
    },
    txtArea: {
        resize: "none",
        width: "98%",
        outline: "none",
        //  border: "none",
        borderRadius: 3
    }
}
export default connect()(AddButton);