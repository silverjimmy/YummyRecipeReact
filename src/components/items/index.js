import React, { Component } from "react";
import RaisedButton from 'material-ui/RaisedButton';
import "./dashboard.css";
import Pagination from 'material-ui-pagination';
import RecipeView from '../itemsview';
import NewRecipe from '../newRecipe';
import DeleteCategory from '../deleteCategory'
import Editcategory from "../editcategory";
import swal from 'sweetalert';

class Items extends Component{
  constructor(props){
    super(props);
    this.state = {
      items: [],
      token: "",
      name: "",
      total: 5,
      display: 2,
      page: 1
    }
  }
  componentDidMount(){
    if(typeof(localStorage) !==  undefined){
      // store the token
      const token = localStorage.getItem("yummy_token");
      if (token === null) {
        swal("Token not found, please login again","", "error");
        // redirect to login
      }
      else {
        this.setState({
            token: token,
        },() => {
          //console.log(this.props);
          this.fetchRecipes();
        });
      }
    }
  }

  fetchRecipes = ()=>{
    console.log("I'm called");
    const _this = this;
    const category_id = this.props.params.id;
    const url = `http://127.0.0.1:5000/category/${category_id}`
    fetch(url, {
      method: "GET",
      mode: 'cors',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': this.state.token
      })
    })
    .then((resp) => resp.json()) // Transform the data into json
    .then((data) => {
        // Create and append the li's to the ul\
        _this.setState({
            "items": data.category.recipes
        });
      }).catch((err) => {
        console.error(err)
      })
  }

  render(){
    const style = {
      margin: 12,
    };
      return(
        <div id="main">
          <div className="inner">
            <header id="header">
                <h1 >{this.props.location.state.title} Recipes</h1>
            </header>
            <div>
                <NewRecipe category_id={this.props.params.id} fetchRecipes={this.fetchRecipes}/>
                 <RaisedButton  label="Add Recipe" primary={true} style={style} />
                 <RaisedButton label="Delete Category" primary={true} style={style} />
                 <RaisedButton label="Edit Category" primary={true} style={style} />
                <Editcategory category_id={this.props.params.id} />
                <DeleteCategory category_id={this.props.params.id}/>
                <br/>
                <RecipeView items={this.state.items} category_id={this.props.params.id} fetchRecipes={this.fetchRecipes} />
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

export default Items;
