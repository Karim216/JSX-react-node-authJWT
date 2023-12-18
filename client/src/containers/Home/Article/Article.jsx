import axios from "axios";
import React, { Fragment, useEffect, useState, lazy } from "react";

const Items = lazy(() => import("../../../components/Items/Items.jsx"));

const Article = () => {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts"
        );
        const photos = await axios.get(
          "https://jsonplaceholder.typicode.com/photos"
        );

        let postData = [];

        response.data.map((item) => {
          const object = {
            ...item,
            img: photos.data[item.id].url,
            imgTitle: photos.data[item.id].title,
          };

          postData.push(object);
        });

        setPosts(postData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <Fragment>
      <main className="container m-auto mt-5 mb-5">
        <h2 className="text-2xl text-center text-blue-900 font-bold">
          Latest articles
        </h2>
        <section className="mt-5 grid grid-cols-4 gap-10">
          <Items data={posts} />
        </section>
      </main>
    </Fragment>
  );
};

export default Article;
