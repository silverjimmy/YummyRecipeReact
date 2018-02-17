
import React, {Component} from 'react';
import "./card.css";
import { Link } from "react-router";
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import EditRecipe from '../editRecipe';
import DeleteItem from "../deleteitem";
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();


const RecipeView = (props) => (

  <div>
      <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn>Name</TableHeaderColumn>
              <TableHeaderColumn>Description</TableHeaderColumn>
              <TableHeaderColumn></TableHeaderColumn>
              <TableHeaderColumn></TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
        {
          props.items.map((category, index) => (
            <TableRow key={category.recipe_id}>
                <TableRowColumn>{ category.recipe_name }</TableRowColumn>
                <TableRowColumn>{ category.recipe_description }</TableRowColumn>
                <TableRowColumn>
                  <Link to={"/category/" + props.category_id +"/recipe/"+ category.id }>
                    <DeleteItem item_id={category.recipe_id} category_id={props.category_id} fetchRecipes={props.fetchRecipes}/>
                  </Link>
                </TableRowColumn>
                <TableRowColumn>
                  <Link to={"/category/" + props.category_id +"/recipe/"+ category.id }>
                    <EditRecipe item_id={category.recipe_id} category_id={props.category_id} fetchRecipes={props.fetchRecipes} />

                  </Link>
                </TableRowColumn>

              </TableRow>
          ))
        }
          </TableBody>
      </Table>
    </div>

);

export default RecipeView;
