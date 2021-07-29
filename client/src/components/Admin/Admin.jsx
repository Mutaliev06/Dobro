import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import "date-fns";

import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CssBaseline,
  FormControl,
  IconButton,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addAvatar,
  loadUserById,
  loadUserNotes,
} from "../../redux/features/users";
import { loadCategories } from "../../redux/features/categories";
import { Avatar } from "@material-ui/core";
import { addImage, addNote } from "../../redux/features/notes";
import { PhotoCamera } from "@material-ui/icons";
import EditNotes from "./EditNotes";

import CompletedNote from './CompletedNote';

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    width: "100%",
    marginTop: 20,
  },
  menuButton: {
    marginRight: 36,
  },
  title: {
    flexGrow: 1,
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
    marginTop: 20,
  },
  container: {
    paddingBottom: theme.spacing(8),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  paperMarginTop: {
    padding: theme.spacing(),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    marginTop: 20,
    marginBottom: 20,
  },
  fixedHeight: {
    height: 290,
  },
  fixedHeightPaperMargin: {
    marginBottom: 20,
  },
  input: {
    display: "none",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 300,
    textAlign: "center",
    marginTop: 10,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
    marginBottom: 5,
  },
  imgMargin: {
    margin: "auto",
    width: 225,
    height: 225,
  },
  uploadMargin: {
    marginTop: 20,
  },
  btnUpload: {
    margin: "auto",
    marginLeft: 100,
    marginBottom: 5,
    backgroundColor: "#000841",
  },
  btnAdd: {
    marginTop: 10,
    backgroundColor: "#000841",
    textDecoration: "none",
  },
  inputStyle: {
    marginBottom: 7,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 320,
    marginTop: 10,
  },
  containerData: {
    width: 727,
    display: "flex",
    justifyContent: "space-between",
    marginTop: 4,
  },
  paperCard: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardGrid: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    marginLeft: 10,
    width: "95%",
  },
  cardComment: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    marginLeft: 10,
    width: "95%",
    border: "5px solid green"
  },
  cardMedia: {
    paddingTop: "56.25%",
  },
  cardContent: {
    flexGrow: 1,
  },
  AddressInput: {
    width: 600,
    height: 15,
  },
  btnAvatar: {
    position: "absolute",
    top: 175,
    left: 290,
  },
  BtnNote: {
    transition: "all .3s",
    color: "#fff",
    "&:hover": {
      color: "#000841",
    },
  },
  BtnDone: {


  },
  BtnNoteId: {
    textDecoration: "none",
    position: "relative",
    padding: "0",
    background: "#000841",
    color: "#fff",
    borderRadius: "5px",
    transition: "all .3s",
    "&:hover": {
      background: "transparent",
      border: "2px solid #000841",
      color: "#000841",
      transform: "scale(1.02)",
    },
  },
  BtnEdit: {
    textDecoration: "none",
    position: "relative",
    padding: "0",
    background: "#000841",
    color: "#fff",
    width: 30,
    borderRadius: "5px",
    transition: "all .3s",
    "&:hover": {
      background: "transparent",
      border: "2px solid #000841",
      color: "#000841",
      transform: "scale(1.02)",
    },
  },
  authCont: {
    height: 600,
  },
}));

export default function Admin() {
  const token = useSelector((state) => state.application.token);
  const dispatch = useDispatch();
  const classes = useStyles();
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [timeOfTheEvent, setTimeOfTheEvent] = React.useState("");
  const [placeOfEvent, setPlaceOfEvent] = React.useState("");
  const categories = useSelector((state) => state.categories.items);
  const loading = useSelector((state) => state.notes.loading);


  const notes = useSelector((state) => {
    return state.users.userNotes;
  });
  console.log(notes)

  const user = useSelector((state) => {
    return state.users.currentUser;
  });

  const handleChangeCategory = (e) => {
    setCategory(e.target.value);
  };
  const handlePlaceChange = (e) => {
    return setPlaceOfEvent(e.target.value);
  };
  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleDateChange = (e) => {
    return setTimeOfTheEvent(e.target.value);
  };
  const handleChangeNote = (e) => {
    setText(e.target.value);
  };
  const handleAddAvatar = (e) => {
    dispatch(addAvatar(e));
  };
  const handleAddImage = async (e) => {
    await dispatch(addImage(e));
  };
  const handleAddNote = async () => {
    await dispatch(
      addNote({ text, category, title, timeOfTheEvent, placeOfEvent })
    );
  };

  useEffect(() => {
    dispatch(loadUserById());
  }, [dispatch]);

  useEffect(() => {
    dispatch(loadCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(loadUserNotes());
  }, [dispatch]);

  useEffect(() => {
    document.title = "Личный кабинет";
  });

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  if (loading) {
    return <Preloader />;
  }

  if (token) {
    return (
      <div className={classes.root}>
        <Container maxWidth="lg" className={classes.c}>
          <Grid container spacing={3}>
            {/* Фото юзера */}
            <Grid item xs={8} md={8} lg={5}>
              <Paper align="center" className={fixedHeightPaper}>
                <input
                  accept="image/*"
                  className={classes.input}
                  id="icon-button-file"
                  type="file"
                  onChange={handleAddAvatar}
                />
                <label htmlFor="icon-button-file">
                  <div style={{ position: "relative" }}>
                    <Avatar
                      className={classes.imgMargin}
                      src={`/${user.pathToImage}`}
                    />
                    <IconButton
                      color="primary"
                      aria-label="upload picture"
                      className={classes.btnAvatar}
                      component="span"
                    >
                      <PhotoCamera />
                    </IconButton>
                  </div>
                </label>
              </Paper>
            </Grid>
            {/* ФИО юзера */}
            {/*{Активность юзера}*/}
            <Grid item xs={8} md={8} lg={7}>
              <Paper className={fixedHeightPaper}>
                <Typography variant="h6">
                  {" "}
                  ФИО: {"  "} {user.name}{" "}
                </Typography>
                <Typography variant="h6">
                  {" "}
                  Количество постов: {"  "}{" "} {notes.length}
                </Typography>
                <Typography variant="h6">
                  {" "}
                  Ваш эмайл: {"  "} {user.email}{" "}
                </Typography>
                <Typography variant="h6">
                  {" "}
                  Ваш Телефон: {"  "} {user.tel}{" "}
                </Typography>
                <Typography variant="h6">
                  {" "}
                  Ваш Логин: {"  "} {user.login}{" "}
                </Typography>
              </Paper>
            </Grid>
          </Grid>
          <Grid item xs={8} md={8} lg={12}>
            <Paper className={classes.paperMarginTop}>
              <Typography align="center" variant="h5" component="h4">
                Создать заявку на помощь
              </Typography>
            </Paper>
          </Grid>
          <Grid
            className={classes.fixedHeightPaperMargin}
            container
            spacing={3}
          >
            {/*{Добавление записей}*/}
            <Grid item xs={8} md={8} lg={8}>
              <Paper className={fixedHeightPaper}>
                <Typography align="center" variant="h6" component="h6">
                  {" "}
                  Заполните все обязательные поля*{" "}

                </Typography>
                <TextField
                  id="outlined-multiline-static"
                  className={classes.inputStyle}
                  label="Введите заголовок*"
                  multiline
                  rows={1}
                  value={title}
                  onChange={handleChangeTitle}
                  variant="outlined"
                />
                <TextField
                  id="outlined-multiline-static"
                  label="Введите текст*"
                  multiline
                  rows={3}
                  value={text}
                  onChange={handleChangeNote}
                  variant="outlined"
                />
                <Grid lg={4}>
                  <form className={classes.containerData} noValidate>
                    <TextField
                      className={classes.AddressInput}
                      id="standard-basic"
                      variant="outlined"
                      label="Введите адрес*"
                      value={placeOfEvent}
                      onChange={handlePlaceChange}
                    />

                    <Button
                      onClick={handleAddNote}
                      variant="contained"
                      color="primary"
                      className={classes.btnAdd}
                    >
                      Добавить
                    </Button>
                  </form>
                </Grid>
              </Paper>
            </Grid>
            <Grid item xs={8} md={8} lg={4}>
              <Paper className={fixedHeightPaper}>
                <Grid item xs={8} md={8} lg={12}>
                  <Paper>
                    <Typography align="center">Выберите категорию* </Typography>

                    <FormControl className={classes.formControl}>
                      <Select
                        displayEmpty
                        className={classes.selectEmpty}
                        value={category}
                        onChange={handleChangeCategory}
                        inputProps={{ "aria-label": "Without label" }}
                      >
                        <MenuItem value="" disabled>
                          Мероприятия
                        </MenuItem>
                        {categories.map((item) => (
                          <MenuItem key={item.value} value={item._id}>
                            {item.title}
                          </MenuItem>
                        ))}
                        }
                      </Select>
                    </FormControl>
                  </Paper>
                </Grid>
                <Grid
                  item
                  xs={8}
                  md={8}
                  className={classes.uploadMargin}
                  lg={12}
                >
                  <Paper>
                    <Typography align="center" component="h4">
                      Загрузить изображение{" "}
                    </Typography>
                    <div className={classes.root}>
                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.btnUpload}
                        onChange={handleAddImage}
                      >
                        <input
                          accept="image/*"
                          className={classes.input}
                          id="contained-button-file"
                          multiple
                          type="file"
                          onChange={handleAddImage}
                        />
                        <label htmlFor="contained-button-file">Выбрать</label>
                      </Button>
                    </div>
                  </Paper>
                  <TextField
                    id="datetime-local"
                    label="Выбрать дату*"
                    type="datetime-local"
                    value={timeOfTheEvent}
                    onChange={handleDateChange}
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
              </Paper>
            </Grid>
            {/* Посты */}
            <Grid item xs={8} md={8} lg={12}>
              <Paper className={classes.paperMarginTop}>
                <Typography align="center" variant="h5" component="h4">
                  Ваши записи
                </Typography>
              </Paper>
            </Grid>
            <Grid container spacing={10}>
              {notes.map(item => {
                return item.lastComment !== undefined ? (
                  <Grid item key={item} xs={12} sm={6} md={4}>
                    <Card className={classes.cardComment}>
                      <CardMedia
                        className={classes.cardMedia}
                        title="Image title"
                        image={`/${item.pathToImage}`}
                      />
                      <CardContent className={classes.cardContent}>
                        <Typography gutterBottom variant="h6" component="h5">
                          <div>{item.title}</div>
                        </Typography>
                        <Typography gutterBottom variant="h7" component="h5">
                          <div>{item.user.name}</div>
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <NavLink
                          className={classes.BtnNoteId}
                          to={`/notes/${item._id}`}
                        >
                          <Button className={classes.BtnNote}>Подробнее</Button>
                        </NavLink>
                        <EditNotes notes={item} />
                        <CompletedNote notes={item} />
                      </CardActions>
                    </Card>
                  </Grid>
                ) : (
                  <Grid item key={item} xs={12} sm={6} md={4}>
                    <Card className={classes.card}>
                      <CardMedia
                        className={classes.cardMedia}
                        title="Image title"
                        image={`/${item.pathToImage}`}
                      />
                      <CardContent className={classes.cardContent}>
                        <Typography gutterBottom variant="h6" component="h5">
                          <div>{item.title}</div>
                        </Typography>
                        <Typography gutterBottom variant="h7" component="h5">
                          <div>{item.user.name}</div>
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <NavLink
                          className={classes.BtnNoteId}
                          to={`/notes/${item._id}`}
                        >
                          <Button className={classes.BtnNote}>Подробнее</Button>
                        </NavLink>
                        <EditNotes notes={item} />
                        <CompletedNote notes={item} />
                      </CardActions>
                    </Card>
                  </Grid>
                )
              }
              )}
            </Grid>
          </Grid>
        </Container>
      </div>
    );
  } else {
    return (
      <React.Fragment>
        <Paper elevation={3} className={classes.authCont}>
          <CssBaseline />
          <Container maxWidth="sm">
            <Typography align="center" variant="h4" component="h2">
              Страница не доступна
              <NavLink to={"/login"}> Авторизуйтесь </NavLink>
            </Typography>
          </Container>
        </Paper>
      </React.Fragment>
    );
  }
}
