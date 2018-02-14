import React, {Component} from "react";
import {browserHistory} from "react-router";
import Search from 'react-search'
import Pagination from 'material-ui-pagination';
import YummyRecipeCard from "../card/YummyRecipeCard";
import "./search.css";
import "./dashboard.css";
import NewCategory from '../newcategory';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import swal from 'sweetalert';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      token: "",
      error: "",
      open: false,
      total: 5,
      display: 2,
      page: 1
    }

    this.handlePageChange = this.handlePageChange.bind(this);
  }
  componentDidMount() {
    if (typeof(localStorage) !== undefined) {
      const token = localStorage.getItem("yummy_token");
      if (token === null) {
          swal("Token not found, please login again","", "error");
      } else {
        this.setState({
          token: token
        }, () => {
          this.fetchCategory();
        });
      }
    }
  }
  handleClose = () => {
    this.setState({open: false});
  };

  redirectTo(event, category_id, category_name) {
    browserHistory.push({
      pathname: "/category/" + category_id,
      state: {
        title: category_name
      }
    });
  }

  HiItems(items) {
    console.log(items)
  }

  handlePageChange(number) {
    const _this = this;
    _this.setState({page: number}
      , () => {
        this.fetchCategory();
      });
  }

  getItemsAsync(searchValue, cb) {
    const _this = this;
    if (searchValue === '') {
      searchValue = ' '
    }
    let url = `http://127.0.0.1:5000/category/?q=${searchValue}`
    fetch(url, {
      method: "GET",
      mode: 'cors',
      headers: new Headers({'Content-Type': 'application/json', 'Authorization': this.state.token})
    }).then((resp) => resp.json()).then(function(results) {

      if (results !== undefined) {
        console.log("res", results);
        let items = results.map((res) => {
          return {
            id: res.id, 
            title: res.title, 
            description: res.description
          }
        })
        _this.setState({"categories": items})
      }
    });
  }
  

  fetchCategory() {
    const _this = this;

    const url = `http://127.0.0.1:5000/category/?limit=3&page=${_this.state.page}`
    fetch(url, {
      method: "GET",
      mode: 'cors',
      headers: new Headers({'Content-Type': 'application/json', 'Authorization': this.state.token})
    }).then((resp) => resp.json()) // Transform the data into json
    .then(function(data) {
      console.log(data);
      _this.setState(
        {
          "categories": data.categories,
          "total": data.total
        }
      );
    }).catch((err) => {
      console.error(err)
    })
  }

  render() {
    const actions = [
      < FlatButton label = "Discard" 
      primary = {
        true
      }
      onTouchTap = {
        this.handleClose
      }
       />];

    return (

      <div id="main">
        <Search items={this.state.repos} multiple={true} getItemsAsync={this.getItemsAsync.bind(this)} placeholder='Search your categories'/>
        <div className="inner">
          <header id="header">
            <h1 >Yummy Recipes</h1>
            <h4>Categories</h4>
          </header>
          <br/>
          <Dialog actions={actions} modal={false} open={this.state.open} onRequestClose={this.handleClose}>
            {this.state.error !== "" && this.state.error}
          </Dialog>
          <div>
            <NewCategory/>
            <br/>
            <YummyRecipeCard redirect={this.redirectTo} categories={this.state.categories}/>
            <br/>
            <br/>
            <Pagination
          total = { this.state.total }
          current = { this.state.number }
          display = { this.state.display }
          onChange = { this.handlePageChange }
        />
          </div>
        </div>
      </div>

    )
  }
}

export default Dashboard;
