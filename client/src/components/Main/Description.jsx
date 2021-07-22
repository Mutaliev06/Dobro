import React, { useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadNotes } from "../../redux/features/notes";
import { makeStyles } from "@material-ui/core/styles";
import dayjs from "dayjs";
import moment from "moment";
import Button from "@material-ui/core/Button";
import PlaceIcon from "@material-ui/icons/Place";
import { loadComments } from "../../redux/features/comments";
import Container from "@material-ui/core/Container";
import { Paper } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: 15,
    margin: "auto",
  },
  divFoto: {
    display: "flex",
    justifyContent: "space-around",
    padding: 10,
    boxShadow: "10px 12px 12px 0px rgb(122 122 123)",
  },
  divDescription: {
    display: "flex",
    marginTop: 20,
    boxShadow: "10px 12px 12px 0px rgb(122 122 123)",
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
  divNotesText: {
    padding: 20,
  },
  btnParticipate: {
    textDecoration: "none",
    color: "grey",
  },
  divTape: {
    boxShadow: "10px 12px 12px 0px rgb(122 122 123)"
  },
  text: {
    fontSize: 20,
    fontFamily: 'cursive',

  },
  data: {
    fontSize: 17,
    fontFamily: 'roboto'
  },
  userComment: {
    fontSize: 18,
    fontFamily: 'roboto',
    marginLeft: 10,
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
          <Button variant="outlined">
            {" "}
            <NavLink className={classes.btnParticipate} to='/login'>Принять участие</NavLink>
          </Button>
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
      <h1>Лента записей</h1>
      <div className={classes.divTape}>
        <Paper>
          {comments.map((item) => {
            return (
              <Paper>
                <div className={classes.text}>{item.user.name}</div>
                <div className={classes.data}>{dayjs(item.createdAt).format("DD MMMM YYYY HH:mm")}</div>
                <div>
                  {" "}
                  <p className={classes.userComment}>{item.text}</p>
                </div>
              </Paper>
            );
          })}
        </Paper>
      </div>
    </Container>
  );
}

export default Description;
