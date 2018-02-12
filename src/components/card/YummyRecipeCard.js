import React from 'react';
import { Link } from "react-router";
import "./card.css";


const YummyRecipeCard = (props) => (
  <section className="tiles">
    {
      props.categories.map((category, index) => (
        <div key={index} >
            <article className="style10">
              <span className="image">
                <img src={ process.env.PUBLIC_URL + "/images/pic02.jpg"} alt="" />
              </span>
              <Link onClick={(event) => props.redirect(event, category.id, category.title)}>
                <h2>{ category.title }</h2>
                <div className="content">
                  <p>{ category.description }</p>

                </div>
              </Link>
            </article>
          </div>
      ))
    }
  </section>
);

export default YummyRecipeCard;
