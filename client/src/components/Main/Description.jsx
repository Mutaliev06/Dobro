import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadNotes } from "../../redux/features/notes";
import Header from "../App/Header";
import Footer from "../App/Footer";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  divFoto: {
    display: "flex",
  },
}));

function Description(props) {
  const classes = useStyles();

  const { id } = useParams();

  const dispatch = useDispatch();
  const notes = useSelector((state) => {
    return state.notes.items.find((item) => item._id === id);
  });

  useEffect(() => {
    dispatch(loadNotes());
  }, [dispatch]);

  return (
    <div>
        <div className={classes.divFoto}>
          <div>
            <img src={`http://localhost:5500/${notes.pathToImage}`} />
          </div>
          <div>
            <h1>{notes.title}</h1>

            <h3> Автор поста: {notes.user.name}</h3>
            <Button variant="outlined">Принять участие</Button>
          </div>
        </div>
        <div>
          <h1>Описание</h1>
          <p>
            {notes.text}
          </p>
        </div>
    </div>
  );
}

export default Description;
