import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadNotes } from "../../redux/features/notes";
import { makeStyles } from "@material-ui/core/styles";
import dayjs from "dayjs";
import moment from "moment"
import Button from "@material-ui/core/Button";
import PlaceIcon from "@material-ui/icons/Place";
import { loadComments } from "../../redux/features/comments";
import Container from "@material-ui/core/Container";
import { Paper } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: 15,
    margin: "auto",
  },
  divFoto: {
    display: "flex",
    justifyContent: "space-around",
    padding: 10,
    boxShadow: '10px 12px 12px 0px rgb(122 122 123)'
  },
  divDescription: {
    display: "flex",
    marginTop: 20,
    boxShadow: '10px 12px 12px 0px rgb(122 122 123)'
  },
  divPlaceTime: {
    width: 300,
    padding: 15,
  },
  img: {
    width: 600,
    height: 300,
    borderRadius: 5,
  },
  divComments: {
    // border: ('3px' , 'solid', 'yellow')
    borderWidth: 3,
    borderColor: "rgb(190,190,190)",
    borderStyle: "inset",
    borderRadius: 4,
    marginBottom: 10,
  },
  divNotesText: {
    padding: 20,
  }
}));

function Description(props) {
  const classes = useStyles();

  const { id } = useParams();
  console.log(id);

  const dispatch = useDispatch();
  const notes = useSelector((state) => {
    return state.notes.items.find((item) => item._id === id);
  });
  const comments = useSelector((state) => state.comments.items);

  useEffect(() => {
    dispatch(loadNotes());
  }, [dispatch]);

  useEffect(() => {
    dispatch(loadComments(id));
  }, [dispatch]);

  useEffect(() => {
    document.title = "ВЦ 'Добро'";
  });

  return (
    <Container className={classes.container}>
      <Paper className={classes.divFoto}>
        <div>
          <img
            src={`http://localhost:5500/${notes?.pathToImage}`}
            className={classes.img}
          />
        </div>
        <div>
          <h1>{notes?.title}</h1>

          <h3> Автор поста: {notes?.user.name}</h3>
          <Button variant="outlined">Принять участие</Button>
        </div>
      </Paper>
      <Paper className={classes.divDescription}>
        <Paper className={classes.divNotesText}>
          <h1>Описание</h1>
          <p>{notes?.text}</p>
        </Paper>
        <Paper>
          <div className={classes.divPlaceTime}>
            <h3>Дата проведения:</h3>
            {notes?.timeOfTheEvent}
            <p>
              <h3>Место проведения:</h3>
              <PlaceIcon fontSize={"large"} color="secondary" />
              {notes?.placeOfEvent}
            </p>
          </div>
        </Paper>
      </Paper>
      <div>
        <h1>Лента записей</h1>
        <Paper>
          {comments.map((item) => {
            return (
              <Paper>
                <Paper><h3>{item.user.name}</h3></Paper>
                <Paper> <h3>{dayjs(item.createdAt).format("DD MMMM YYYY HH:mm")}</h3></Paper>
                <Paper> <h3>{item.text}</h3></Paper>
              </Paper>
            );
          })}
        </Paper>
      </div>
    </Container>
  );
}

export default Description;
