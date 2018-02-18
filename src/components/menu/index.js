import React, { Component } from 'react';
import { Link, browserHistory } from "react-router";
import RaisedButton from 'material-ui/RaisedButton';
import "./menu.css";
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import injectTapEventPlugin from 'react-tap-event-plugin';



class Menu extends Component {

  constructor(props) {
    super(props);
    this.state = {open: false};

    this.LogOut = this.LogOut.bind(this);
  }

  handleToggle = () => this.setState({open: !this.state.open});

  LogOut(){

    localStorage.removeItem("yummy_token");
    browserHistory.push({
                       pathname: "/login"
                   });
  }
  render() {
    const style = {
      margin: 12,
      cursor: 'pointer',
    };

    return (
      <div className="inner">
        <AppBar
        title={<span style={style.title}><Link to="/dashboard">YummyRecipes</Link></span>}
        iconElementRight={
          <div>
          <Link to="/register" activeClassName="active"><RaisedButton label="Register" primary={true} style={style} /></Link>
          <RaisedButton label="LogOut" secondary={true} onClick={this.LogOut} style={style} />
          </div>
        }
      />
      </div>
    );
  }
}

export default Menu;
