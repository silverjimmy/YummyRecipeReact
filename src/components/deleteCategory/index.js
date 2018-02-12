import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import { browserHistory } from "react-router";


class DeleteCategory extends Component {
  constructor(props){
    super(props);
    this.state = {
      "open": false,
      "_open": false,
      "token": "",
      "dialog_msg": "Are you sure you want to delete this Item?",
      "items": []
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.deletecategory = this.deletecategory.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
  }

  handleOpen = (event) => {
    event.preventDefault()
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
    this.setState({_open: false});
  };

  handleSubmit(event, category_id){
    event.preventDefault();

    if (this.state.name === "" || this.state.description === "") {
    }
    browserHistory.push({
      pathname: "/dashboard"
  });
    this.deletecategory(category_id);
    this.setState({open: false});
  }
  componentDidMount(){
    if(typeof(localStorage) !==  undefined){
        const token = localStorage.getItem("yummy_token");
        if (token === null) {
          alert("token not found, please login again");
        }
        else {
          this.setState({
              token: token,
          });
        }
      }
    }

    // make request to the api
    deletecategory(category_id){

      const _this = this;
      const url = `http://127.0.0.1:5000/category/${category_id}`;
      fetch(url, {
          method: "DELETE",
          mode: 'cors',
          headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': this.state.token
          })
       })
      .then((resp) => resp.json()) // Transform the data into json
      .then(function(data) {
          if(data.status === "success"){
            console.log(data);
            _this.setState({
              dialog_msg: data.message,
              _open: true
            })
          }
          else{
            _this.setState({
              dialog_msg: data.message,
              _open: true
            })
          }
          
      }).catch((err) =>{
          console.error(err)
      })
    }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        label="OK"
        primary={true}
        keyboardFocused={true}
        onClick={(event) => this.handleSubmit(event, this.props.category_id)} />

    ];

    const action = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />,
    ];

    return (
      <div>
        <span className="symbol"><img src={process.env.PUBLIC_URL + "/images/delete.svg"} onClick={(event) => this.handleOpen(event)}  /></span>

        <Dialog
          title="Success"
          actions={action}
          modal={false}
          open={this.state._open}
          onRequestClose={this.handleClose}
        >
        <p> {this.state.dialog_msg}  </p>
        </Dialog>

        <Dialog
          title="Delete Category"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >


        <p> {this.state.dialog_msg}  </p>


        </Dialog>

      </div>
    );
  }
}

export default DeleteCategory;
