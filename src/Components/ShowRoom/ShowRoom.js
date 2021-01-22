import React, { useState, useEffect } from "react";
import { getOneOffer } from "../../services/firestore";
import { useAuth } from "../../context/AuthProvider";
import Loader from "../Loader";
import "./ShowRoom.css";
import { BrowserRouter as Route, Switch, useLocation } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from "../Button";
import { editOffer } from "../../services/firestore";
import { useHistory } from "react-router-dom";

export default function ShowRoom() {
  // const [offer, setOffer] = useState(null);
  let history = useHistory();

  const [ofId, setOfId] = useState(null);

  const [generalInfo, setGeneralInfo] = useState(null);

  const [milestonesInfo, setMilestonesInfo] = useState(null);

  const { isAuthorized, functions } = useAuth();
  let loc = useLocation();

  useEffect(() => {
    let id = loc?.search?.replace("?id=", "");
    const fetchOffer = async () => {
      const res = await getOneOffer(id);
      console.log(res);

      if (res) {
        functions.setLoading(false);
        setGeneralInfo(res.generalInfo);
        setMilestonesInfo(res.milestonesInfo);
        setOfId(res.id);
      } else {
        functions.setLoading(false);
        alert("Something went wrong");
      }
    };

    id?.length && fetchOffer();
  }, []);

  const handleEditForm = async () => {
    functions.setLoading(true);
    const res = await editOffer({ generalInfo, milestonesInfo }, ofId);
    if (res) {
      functions.setLoading(false);
      alert("Document is on the way!");
    } else {
      functions.setLoading(false);
      alert("Something went wrong");
    }
  };

  // const makeChanges = () => {

  // }

  if (!generalInfo || !milestonesInfo) return <Loader />;

  return (
    <div className="showroom_wrap">
      {isAuthorized ? (
        <Button text={"Go back"} action={() => history.push(`/`)} />
      ) : null}

      <h2>Offer:</h2>
      <div className="showroom_general_wrap">
        <h2>General data</h2>
        <form noValidate autoComplete="off" className="showroom_popup_form">
          <div className="showroom_row">
            <span>Project Code</span>
            <TextField
              id="filled-basic"
              variant="outlined"
              disabled={isAuthorized ? false : true}
              value={generalInfo?.projectCode}
            />
          </div>
          <div className="showroom_row">
            <span>Project Name</span>
            <TextField
              id="standard-basic"
              variant="outlined"
              disabled={isAuthorized ? false : true}
              value={generalInfo?.projectName}
            />
          </div>
          <div className="showroom_row">
            <span>Project Description</span>

            <TextField
              id="standard-basic"
              variant="outlined"
              disabled={isAuthorized ? false : true}
              value={generalInfo?.projectDescription}
            />
          </div>
        </form>
      </div>
      <div className="showroom_milestone_wrap">
        <div className="from_milestone_title_wrap">
          <h2 style={{ marginRight: 10 }}>Milestone info</h2>{" "}
        </div>
        {milestonesInfo.map((oneMilestone, ind) => {
          return (
            <form
              key={ind}
              noValidate
              autoComplete="off"
              className="whowroom_popup_form"
            >
              <div className="from_milestone_title_wrap">
                <span style={{ marginRight: 10 }}>Milestone {ind + 1}</span>{" "}
              </div>
              <div className="showroom_row">
                <span>Content</span>
                <TextField
                  disabled={isAuthorized ? false : true}
                  id="filled-basic"
                  variant="outlined"
                  value={oneMilestone.content}
                />
              </div>
              <div className="showroom_row">
                <span>Deliverables</span>
                <TextField
                  id="standard-basic"
                  value={oneMilestone.deliverables}
                  variant="outlined"
                  disabled={isAuthorized ? false : true}
                />
              </div>
              <div className="showroom_row">
                <span>Team</span>
                <TextField
                  disabled={isAuthorized ? false : true}
                  id="standard-basic"
                  variant="outlined"
                  value={oneMilestone.team}
                />
              </div>
              <div className="showroom_row">
                <span>Price</span>
                <TextField
                  disabled={isAuthorized ? false : true}
                  id="standard-basic"
                  variant="outlined"
                  value={oneMilestone.price}
                />
              </div>
            </form>
          );
        })}
      </div>
      {isAuthorized ? (
        <Button text={"Change data"} action={handleEditForm} />
      ) : null}
    </div>
  );
}
