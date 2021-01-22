import React, { useState } from "react";
import Button from "../../Button";
import "./Form.css";
import TextField from "@material-ui/core/TextField";

export default function Form() {
  const [general, setGeneral] = useState({
    projectName: "",
    projectCode: "",
    projectDescription: "",
  });

  const [milestonesInfo, setMilestonesInfo] = useState([
    {
      content: "",
      deliverables: "",
      team: "",
      price: "",
    },
  ]);

  const handleGeneralInfoChange = (data, type) => {
    setGeneral({
      ...general,
      [type]: data,
    });
  };

  const handleMilestoneInfoChange = (data, type) => {
    const oneMilestone = {};
    setGeneral({
      ...general,
      [type]: data,
    });
  };

  const handleAddMilestone = () => {
    setMilestonesInfo([
      ...milestonesInfo,
      {
        content: "",
        deliverables: "",
        team: "",
        price: "",
      },
    ]);
  };

  const handleDeleteMilestone = (ind) => {
    let newArra = milestonesInfo;
    newArra.splice(ind, 1);
    console.log(newArra);
    setMilestonesInfo([...newArra]);
  };

  return (
    <div className="from_wrap">
      <div className="from_general_wrap">
        <h2>General data</h2>
        <form noValidate autoComplete="off" className="popup_form">
          <TextField
            id="filled-basic"
            label="Project Code"
            variant="outlined"
            onChange={(e) =>
              handleGeneralInfoChange(e.target.value, "projectCode")
            }
          />
          <TextField
            id="standard-basic"
            label="Project Name"
            variant="outlined"
            onChange={(e) =>
              handleGeneralInfoChange(e.target.value, "projectName")
            }
          />
          <TextField
            id="standard-basic"
            label="Project Description"
            variant="outlined"
            onChange={(e) =>
              handleGeneralInfoChange(e.target.value, "projectDescription")
            }
          />
        </form>
      </div>
      <div className="from_milestone_wrap">
        <div className="from_milestone_title_wrap">
          <h2 style={{ marginRight: 10 }}>Milestone info</h2>{" "}
          <Button text={"+"} action={() => handleAddMilestone()} />
        </div>
        {milestonesInfo.map((oneMilestone, ind) => {
          return (
            <form noValidate autoComplete="off" className="popup_form">
              <div className="from_milestone_title_wrap">
                <span style={{ marginRight: 10 }}>Milestone {ind + 1}</span>{" "}
                <Button text={"🗑"} action={() => handleDeleteMilestone(ind)} />
              </div>
              <TextField
                id="filled-basic"
                label="Content"
                variant="outlined"
                onChange={(e) => handleMilestoneInfoChange(e.target.value)}
              />
              <TextField
                id="standard-basic"
                label="Deliverables"
                variant="outlined"
                onChange={(e) => handleMilestoneInfoChange(e.target.value)}
              />
              <TextField
                id="standard-basic"
                label="Team"
                variant="outlined"
                onChange={(e) => handleMilestoneInfoChange(e.target.value)}
              />
              <TextField
                id="standard-basic"
                label="Price"
                variant="outlined"
                onChange={(e) => handleMilestoneInfoChange(e.target.value)}
              />
            </form>
          );
        })}
      </div>
      <Button text={"Save data"} />
      {/* add milestone */}
    </div>
  );
}
