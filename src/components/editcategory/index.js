import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import { browserHistory } from "react-router";


/**
 * Dialog with action buttons. The actions are passed in as an array of React objects,
 * in this example [FlatButtons](/#/components/flat-button).
 *
 * You can also close this dialog by clicking outside the dialog, or with the 'Esc' key.
 */
class Editcategory extends Component {
  constructor(props){
    super(props);
    // default state
    this.state = {
      "open": false,
      "erroropen": false,
      "token": "",
      "items": []
    }
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updatecategory = this.updatecategory.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
  }

  handleOpen = (event) => {
    event.preventDefault()
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  handleNameChange(event){
    // update the state with new value from input
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event, category_id){
    // prevent the default browser action
    event.preventDefault();

    if (this.state.name === "" || this.state.description === "") {
        // error empty inputs
    }
    window.location.reload();
    this.updatecategory(category_id);
    this.setState({open: false});

  }
  componentDidMount(){
    if(typeof(localStorage) !==  undefined){
      // store the token
        const token = localStorage.getItem("yummy_token");
        if (token === null) {
          alert("token not found, please login again");
        }
        else {
          //console.log("token", token);
          this.setState({
              token: token,
          });
        }
      }
    }

    // make request to the api
    updatecategory(category_id){

      const _this = this;
      const url = `http://127.0.0.1:5000/category/${category_id}`;
      fetch(url, {
          method: "PUT",
          body: JSON.stringify(this.state),
          mode: 'cors',
          headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': this.state.token
          })
       })
      .then((resp) => resp.json()) // Transform the data into json
      .then(function(data) {
        // Create and append the li's to the ul
        console.log(data);
          if(data.status === "success"){
            // login was successful
              _this.setState({
                item: data.items
              })

              // browserHistory.push("/items");
          }
          else{
            _this.setState({
              error: data.message,
              // open: true
            })
            window.location.reload();
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
        label="Save"
        primary={true}
        keyboardFocused={true}
        onClick={(event) => this.handleSubmit(event, this.props.category_id)}
      />,
    ];

    return (
      <div>
        <Dialog
          title="Edit Recipe"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >

          <form method="POST" action="">
            <div>
              <TextField
                  name="name"
                  hintText="name"
                  onChange={this.handleNameChange}/>
            </div>
            <div>
              <TextField
                  type="Description"
                  name="description"
                  hintText="Description"
                  onChange={this.handleNameChange} />
            </div>
          </form>


        </Dialog>
        <span className="symbol"><img src={process.env.PUBLIC_URL + "/images/edit.svg"} onClick={(event) => this.handleOpen(event)}  /></span>
      </div>
    );
  }
}

export default Editcategory
