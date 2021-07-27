import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUserParticipate, addUserParticirate, loadNotes } from "../../redux/features/notes";
import { makeStyles } from "@material-ui/core/styles";
import dayjs from "dayjs";
import Button from "@material-ui/core/Button";
import PlaceIcon from "@material-ui/icons/Place";
import { loadComments, postComment } from "../../redux/features/comments";
import Container from "@material-ui/core/Container";
import { Input, Paper, TextField } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Preloader from "../Preloader";
import Typography from "@material-ui/core/Typography";
import { Nav } from "react-bootstrap";
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
    marginBottom: 10,
    boxShadow: "10px 12px 12px 0px rgb(122 122 123)",
  },
  divPlaceTime: {
    padding: 15,
  },
  img: {
    width: 600,
    height: 300,
    borderRadius: 5,
    objectFit: "cover",
  },
  divNotesText: {
    width: "70%",
    padding: 20,
  },
  btnParticipate: {
    textDecoration: "none",
    color: "grey",
  },
  divTape: {
    boxShadow: "10px 12px 12px 0px rgb(122 122 123)",
  },
  text: {
    fontSize: 20,
    fontFamily: "cursive",
    marginLeft: 10,
  },
  data: {
    fontSize: 17,
    fontFamily: "roboto",
    marginLeft: 10,
  },
  userComment: {
    fontSize: 18,
    fontFamily: "roboto",
    marginLeft: 20,
  },
  inputComment: {
    width: "70%",
  },
  paperComment: {
    marginBottom: 20,
    marginTop: 20,
    boxShadow: "10px 12px 12px 0px rgb(122 122 123)",
  },
  buttonAdd: {
    marginLeft: 20,
    marginTop: 10,
  },
  PaperUserComment: {
    display: "flex",
  },
  avatar: {
    marginLeft: 10,
    marginTop: 5,
  },
  parerPlaceAndTimeDecsription: {
    width: "30%",
  },
  hr: {
    marginTop: 30,
  },
  descripMargin: {
    marginLeft: 50,
  },
  paperLastComment: {
    height: "80px",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "green",
    fontSize: "20px",
    fontWeight: "bold",
  },
  paperLastCommentP: {
    margin: 0,
  },
}));

function Description(props) {
  const token = useSelector((state) => state.application.token);
  const classes = useStyles();

  const { id } = useParams();

  const dispatch = useDispatch();
  const notes = useSelector((state) => {
    return state.notes.items.find((item) => item._id === id);
  });

  const comments = useSelector((state) =>
    state.comments.items.sort(function (a, b) {
      return new Date(b.createdAt) - new Date(a.createdAt);
    })
  );
  const [text, setText] = useState(" ");
  const loading = useSelector((state) => state.notes.loading);

  useEffect(() => {
    dispatch(loadNotes());
  }, [dispatch]);

  useEffect(() => {
    dispatch(loadComments(id));
  }, [dispatch]);

  useEffect(() => {
    document.title = "ВЦ 'Добро'";
  });


  function handleUserParticipate(id) {
    dispatch(addUserParticipate(id))
  }

  function handleComment(e) {
    setText(e.target.value);
  }

  function handlePostComment(id) {
    return dispatch(postComment(id, { text: text }));
  }

  if (loading) {
    return <Preloader />;
  }
  return (
    <Container className={classes.container}>
      <Paper className={classes.divFoto}>
        <div>
          <img
            src={`http://localhost:5500/${notes?.pathToImage}`}
            className={classes.img}
          />
        </div>
        <div className={classes.descripMargin}>
          <h1>{notes?.title}</h1>
          <h3> Автор поста: {notes?.user.name}</h3>
          <NavLink to="/login">
            <Button variant="outlined"> Принять участие</Button>
          </NavLink>
        </div>
      </Paper>
      <Paper className={classes.divDescription}>
        <Paper className={classes.divNotesText}>
          <h1>Описание</h1>
          <Typography variant="h5" component="h7">
            {notes?.text}
          </Typography>
        </Paper>
        <Paper className={classes.parerPlaceAndTimeDecsription}>
          <div className={classes.divPlaceTime}>
            <h3>Дата проведения:</h3>
            <Typography variant="h8" component="h5">
              {notes?.timeOfTheEvent}
            </Typography>
            <p>
              <h3>Место проведения:</h3>
              <PlaceIcon fontSize={"large"} color="secondary" />
            </p>
            <Typography variant="h9" component="h5">
              {notes?.placeOfEvent}
            </Typography>
          </div>
        </Paper>
      </Paper>
      {notes?.lastComment !== undefined ? (
        <Paper className={classes.paperLastComment}>
          <div>
            <p className={classes.paperLastCommentP}>{notes?.lastComment}</p>
          </div>
        </Paper>
      ) : null}
      <hr className={classes.hr} />
      <h1>Лента записей</h1>
      <Paper className={classes.paperComment}>
        <TextField
          className={classes.inputComment}
          value={text}
          onChange={handleComment}
          id="outlined-basic"
          label="Ведите комментарий"
          variant="outlined"
        />

        <Button
          onClick={() => handlePostComment(notes._id)}
          className={classes.buttonAdd}
          variant="contained"
          color="primary"
          type="submit"
        >
          Добавить
        </Button>
      </Paper>
      <div className={classes.divTape}>
        <Paper>
          {comments.map((item) => {
            return (
              <Paper className={classes.PaperUserComment}>
                <div>
                  <Avatar
                    src={`/${item.user?.pathToImage}`}
                    className={classes.avatar}
                  />
                </div>
                <div>
                  <div className={classes.text}>
                    {item.user?.name ? item.user?.name : "Гость"}
                  </div>

                  <div className={classes.data}>
                    {dayjs(item.createdAt).format("DD MMMM YYYY HH:mm")}
                  </div>
                  <div>
                    {" "}
                    <p className={classes.userComment}>{item.text}</p>
                  </div>
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
