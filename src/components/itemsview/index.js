
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


const RecipeView = (props) => (

  <div>
      <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn>Name</TableHeaderColumn>
              <TableHeaderColumn>Description</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
        {
          props.items.map((category, index) => (

              <TableRow key={category.id}>
                <TableRowColumn>{ category.title }</TableRowColumn>
                <TableRowColumn>{ category.description }</TableRowColumn>
                <TableRowColumn>
                  <Link to={"/category/" + props.category_id +"/recipe/"+ category.id }>
                    <DeleteItem item_id={category.id} category_id={props.category_id} />
                  </Link>
                </TableRowColumn>
                <TableRowColumn>
                  <Link to={"/category/" + props.category_id +"/recipe/"+ category.id }>
                    <EditRecipe item_id={category.id} category_id={props.category_id} />

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
