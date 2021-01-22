import React, { useState } from "react";
import Button from "../../Button";
import "./Form.css";
import TextField from "@material-ui/core/TextField";
import { createOffer } from "../../../services/firestore";
import { useAuth } from "../../../context/AuthProvider";

export default function Form() {
  const { functions } = useAuth();

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

  const handleMilestoneInfoChange = (ind, data, type) => {
    const newOneMilestoneInfo = Object.assign({}, milestonesInfo[ind], {
      ...milestonesInfo[ind],
      [type]: data,
    });

    let newArr = milestonesInfo;
    newArr.splice(ind, 1, newOneMilestoneInfo);
    setMilestonesInfo([...newArr]);
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
    if (milestonesInfo.length === 1) return;
    let newArr = milestonesInfo;
    newArr.splice(ind, 1);
    setMilestonesInfo([...newArr]);
  };

  const handleSaveForm = async () => {
    functions.setLoading(true);
    const res = await createOffer({
      generalInfo: general,
      milestonesInfo,
    });

    if (res) {
      functions.setLoading(false);
      alert("Document is on the way!");
    } else {
      functions.setLoading(false);
      alert("Something went wrong");
    }
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
            <form
              key={ind}
              noValidate
              autoComplete="off"
              className="popup_form"
            >
              <div className="from_milestone_title_wrap">
                <span style={{ marginRight: 10 }}>Milestone {ind + 1}</span>{" "}
                <Button text={"🗑"} action={() => handleDeleteMilestone(ind)} />
              </div>
              <TextField
                id="filled-basic"
                label="Content"
                variant="outlined"
                onChange={(e) =>
                  handleMilestoneInfoChange(ind, e.target.value, "content")
                }
              />
              <TextField
                id="standard-basic"
                label="Deliverables"
                variant="outlined"
                onChange={(e) =>
                  handleMilestoneInfoChange(ind, e.target.value, "deliverables")
                }
              />
              <TextField
                id="standard-basic"
                label="Team"
                variant="outlined"
                onChange={(e) =>
                  handleMilestoneInfoChange(ind, e.target.value, "team")
                }
              />
              <TextField
                id="standard-basic"
                label="Price"
                variant="outlined"
                onChange={(e) =>
                  handleMilestoneInfoChange(ind, e.target.value, "price")
                }
              />
            </form>
          );
        })}
      </div>
      <Button text={"Save data"} action={handleSaveForm} />
      {/* add milestone */}
    </div>
  );
}
