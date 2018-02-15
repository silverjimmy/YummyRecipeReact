import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import { browserHistory } from "react-router";
import swal from 'sweetalert';

/**
 * Dialog with action buttons. The actions are passed in as an array of React objects,
 * in this example [FlatButtons](/#/components/flat-button).
 *
 * You can also close this dialog by clicking outside the dialog, or with the 'Esc' key.
 */
class DeleteItem extends Component {
  constructor(props){
    super(props);
    // default state
    this.state = {
      "open": false,
      "erroropen": false,
      "token": "",
      "dialog_msg": "Are you sure you want to delete this Recipe?",
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
  };

  handleSubmit=(event, category_id, item_id) => {
    // prevent the default browser action
    event.preventDefault();

    if (this.state.name === "" || this.state.description === "") {
        // error empty inputs
    }

    this.deletecategory(category_id, item_id);
    this.setState({open: false});
  }
  componentDidMount(){
    if(typeof(localStorage) !==  undefined){
        const token = localStorage.getItem("yummy_token");
        if (token === null) {
          swal("Token not found, please login again","", "error");
        }
        else {
          this.setState({
              token: token,
          });
        }
      }
    }

    // make request to the api
    deletecategory = (category_id, item_id) => {
      console.log("deletiing");
      const _this = this;
      const url = `http://127.0.0.1:5000/category/${category_id}/recipe/${item_id}`;
      fetch(url, {
          method: "DELETE",
          mode: 'cors',
          headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': this.state.token
          })
       })
      .then((resp) => resp.json()) // Transform the data into json
      .then((data) => {
        console.log(data);
          if(data.status === "success"){
            swal("Recipe Deleted","", "info");
            console.log(this.props,"These are props");
            this.props.fetchRecipes();
            _this.setState({
              dialog_msg: data.message,
              open: true
            })
          }
          else{
            _this.setState({
              error: data.message,
              open: true
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
        onClick={(event) => this.handleSubmit(event, this.props.category_id, this.props.item_id)} />

    ];

    return (
      <div>
        <span className="symbol"><img src={process.env.PUBLIC_URL + "/images/delete.svg"} onClick={(event) => this.handleOpen(event)}  /></span>

        <Dialog
          title="Delete Recipe"
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

export default DeleteItem
