import React, {useState} from "react";
import Button from "../../Button";
import "./Form.css";
import {TextField} from "@material-ui/core";
import {createPost} from "../../../services/firestore";
import {useAuth} from "../../../context/AuthProvider";

export default function Form() {
  const {functions} = useAuth();

  const [info, setInfo] = useState({
    title: "",
    body: "",
  });

  const handleInfoChange = (data, type) => {
    setInfo({
      ...info,
      [type]: data,
    });
  };

  const handleSaveForm = async () => {
    functions.setLoading(true);
    const res = await createPost(info);

    if (res) {
      functions.setLoading(false);
      alert("Document is on the way!");
    } else {
      functions.setLoading(false);
      alert("Something went wrong");
    }
  };

  return (
    <div className="form_wrap">
      <div className="from__inputs">
        <h2>General data</h2>
        <form noValidate autoComplete="off" className="form">
          <TextField
            id="filled-basic"
            label="Title"
            variant="outlined"
            onChange={(e) => handleInfoChange(e.target.value, "title")}
          />
          <TextField
            id="standard-basic"
            label="Body"
            variant="outlined"
            multiline
            rows={6}
            onChange={(e) => handleInfoChange(e.target.value, "body")}
          />
        </form>
      </div>

      <Button text={"Save data"} action={handleSaveForm} />
    </div>
  );
}
