import React from "react";
import { Link } from "react-router-dom";

const item = ({ data }) => {
  return data?.map((item, index) => {
    return (
      <article key={index}>
        <Link to="#">
          <div>
            <img src={item.img} alt={item.imgTitle} />
          </div>
          <p>{item.title}</p>
        </Link>
      </article>
    );
  });
};

export default item;
