import React, { useState, useEffect } from "react";
import { getAllOffers } from "../../../services/firestore";
import { useAuth } from "../../../context/AuthProvider";
import "./AllOffers.css";
import { useHistory } from "react-router-dom";

export default function AllOffers() {
  const { functions } = useAuth();

  let history = useHistory();
  const [allOffers, setAllOffers] = useState([]);

  useEffect(() => {
    const fetchOffers = async () => {
      const res = await getAllOffers();

      if (res) {
        functions.setLoading(false);
        setAllOffers(res);
      } else {
        functions.setLoading(false);
        alert("Something went wrong");
      }
    };

    fetchOffers();
  }, []);

  console.log(allOffers);

  return (
    <div className="offers_wrap">
      <h2>All offers so far:</h2>
      <ul>
        {allOffers?.map((offer, ind) => {
          return (
            <li
              className="offers_one"
              key={ind}
              onClick={() => history.push(`/offer?id=${offer.id}`)}
            >
              {offer?.generalInfo?.projectCode}:{" "}
              {offer?.generalInfo?.projectName}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
