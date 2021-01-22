import React, { useState, useEffect } from "react";
import { getOneOffer } from "../../services/firestore";
import { useAuth } from "../../context/AuthProvider";
import Loader from "../Loader";
import "./ShowRoom.css";
import { BrowserRouter as Route, Switch, useLocation } from "react-router-dom";
import TextField from "@material-ui/core/TextField";

export default function ShowRoom() {
  const [offer, setOffer] = useState(null);
  const { functions } = useAuth();
  let loc = useLocation();

  useEffect(() => {
    let id = loc?.search?.replace("?id=", "");
    const fetchOffer = async () => {
      const res = await getOneOffer(id);
      console.log(res);

      if (res) {
        functions.setLoading(false);
        setOffer(res);
      } else {
        functions.setLoading(false);
        alert("Something went wrong");
      }
    };

    id?.length && fetchOffer();
  }, []);

  console.log(offer);

  if (!offer) return <Loader />;

  return (
    <div className="showroom_wrap">
      <h2>Offer:</h2>
      <div className="from_general_wrap">
        <h2>General data</h2>
        <form noValidate autoComplete="off" className="popup_form">
          <TextField
            id="filled-basic"
            label="Project Code"
            variant="outlined"
          />
          <TextField
            id="standard-basic"
            label="Project Name"
            variant="outlined"
          />
          <TextField
            id="standard-basic"
            label="Project Description"
            variant="outlined"
          />
        </form>
      </div>
      <div className="from_milestone_wrap">
        <div className="from_milestone_title_wrap">
          <h2 style={{ marginRight: 10 }}>Milestone info</h2>{" "}
        </div>
        {offer.milestonesInfo.map((oneMilestone, ind) => {
          return (
            <form
              key={ind}
              noValidate
              autoComplete="off"
              className="popup_form"
            >
              <div className="from_milestone_title_wrap">
                <span style={{ marginRight: 10 }}>Milestone {ind + 1}</span>{" "}
              </div>
              <TextField id="filled-basic" label="Content" variant="outlined" />
              <TextField
                id="standard-basic"
                label="Deliverables"
                variant="outlined"
              />
              <TextField id="standard-basic" label="Team" variant="outlined" />
              <TextField id="standard-basic" label="Price" variant="outlined" />
            </form>
          );
        })}
      </div>
    </div>
  );
}
