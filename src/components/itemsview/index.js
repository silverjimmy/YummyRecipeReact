
import React, {Component} from 'react';
import "./card.css";
import { Link } from "react-router";
import {
  Table,
  TableBody,
  TableHeader,
  th,
  TableRow,
  tr,
} from 'material-ui/Table';
import EditRecipe from '../editRecipe';
import DeleteItem from "../deleteitem";
import injectTapEventPlugin from 'react-tap-event-plugin';


const RecipeView = (props) => (

  <div>
      <table className="recipes">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
          {
            props.items.map((category, index) => (
              <tr key={category.recipe_id}>
                  <td>{ category.recipe_name }</td>
                  <td>{ category.recipe_description }</td>
                  <td>
                    <Link to={"/category/" + props.category_id +"/recipe/"+ category.id }>
                      <DeleteItem item_id={category.recipe_id} category_id={props.category_id} fetchRecipes={props.fetchRecipes}/>
                    </Link>
                  </td>
                  <td>
                    <Link to={"/category/" + props.category_id +"/recipe/"+ category.id }>
                      <EditRecipe item_id={category.recipe_id} category_id={props.category_id} fetchRecipes={props.fetchRecipes} />
  
                    </Link>
                  </td>
  
                </tr>
            ))
          }
          </tbody>
      </table>
    </div>

);

RecipeView.defaultProps = {
  items: [],
}

export default RecipeView;
