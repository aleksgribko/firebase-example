import React, {useState, useEffect} from "react";
import {getAllPosts} from "../../../services/firestore";
import {useAuth} from "../../../context/AuthProvider";
import "./AllPosts.css";
import {useHistory} from "react-router-dom";

export default function AllPosts() {
  const {functions} = useAuth();

  const [allPosts, setAllPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await getAllPosts();

      if (res) {
        functions.setLoading(false);
        setAllPosts(res);
      } else {
        functions.setLoading(false);
        alert("Something went wrong");
      }
    };

    fetchPosts();
  }, []);

  console.log(allPosts);

  return (
    <div className="posts">
      <h2>All posts so far:</h2>
      <div className="posts_wrap">
        {allPosts?.map((post, ind) => {
          return (
            <div
              className="post_card"
              key={ind}
            >
              <h3>{post.title}</h3>
              <p>{post.body}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
