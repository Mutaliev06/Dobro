import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import 'date-fns';
import {
  Card, CardActions, CardContent, CardMedia,
  FormControl,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { NavLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadUserById } from "../../redux/features/users";
import { loadCategories } from "../../redux/features/categories";
import { Avatar } from "@material-ui/core";
import { addImage, addNote,  loadUserNotes } from "../../redux/features/notes";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    marginBottom: 45,
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
    paddingBottom: theme.spacing(4),
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
    height: 240,
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
    width: 200,
    height: 200,
  },
  uploadMargin: {
    marginTop: 20,
  },
  btnUpload: {
    margin: "auto",
    marginLeft: 100,
    marginBottom: 5
  },
  btnAdd: {
    marginTop: 15,
    marginLeft: 615
  },
  inputStyle: {
    marginBottom: 7
  }
}));

export default function Admin() {
  const token = useSelector((state) => state.application.token);
  const { id } = useParams();
  const dispatch = useDispatch();
  const classes = useStyles();
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const categories = useSelector((state) => state.categories.items);

  const user = useSelector((state) => {
    return state.users.currentUser;
  });

  const notes = useSelector((state) => {
    return state.notes.userNotes
  });


  const handleChangeCategory = (e) => {
    setCategory(e.target.value);
  };
  const handleChangeNote = (e) => {
    setText(e.target.value);
  };
  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
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

  const handleAddImage = async (e) => {
    await dispatch(addImage(e));
  };

  const handleAddNote = async () => {
    await dispatch(addNote({ text, category, title }));
  };

  // const [selectedDate, setSelectedDate] = useState("");
  //
  // const handleDateChange = (date) => {
  //   setSelectedDate(date);
  // };

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  if (token) {
    return (
      <div className={classes.root}>
        {/*{note.length}*/}
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {/* Фото юзера */}
            <Grid item xs={8} md={8} lg={5}>
              <Paper align="center" className={fixedHeightPaper}>
                <Avatar
                  className={classes.imgMargin}
                  size="400"
                  src={`http://localhost:5500/${user.pathToImage}`}
                />
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
                  Количество постов: {"  "}{" "}
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
                      <Button
                        className={classes.btnAdd}
                        onClick={handleAddNote}
                        variant="contained"
                        color="primary"
                      >
                        Добавить
                      </Button>
               </Grid>
              </Paper>
            </Grid>
            <Grid item xs={8} md={8} lg={4}>
              <Paper className={fixedHeightPaper}>

                {/*<KeyboardTimePicker*/}
                {/*  margin="normal"*/}
                {/*  id="time-picker"*/}
                {/*  label="Time picker"*/}
                {/*  value={selectedDate}*/}
                {/*  onChange={handleDateChange}*/}
                {/*  KeyboardButtonProps={{*/}
                {/*    'aria-label': 'change time',*/}
                {/*  }}*/}
                {/*/>*/}
                {/*  */}
                <Paper>
                  <Grid item xs={8} md={8} lg={12}>
                    <Paper>
                      <Typography align="center">
                        Выберите категорию*{" "}
                      </Typography>
                      {/*{'Добавление постов'}*/}
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
                </Paper>
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
                          <label htmlFor="contained-button-file">
                          Выбрать
                          </label>
                        </Button>

                    </div>
                  </Paper>
                </Grid>
              </Paper>
            </Grid>
            {/* Посты */}
            <Grid container spacing={4}>
              {notes.map((item) => (
                <Grid item key={item} xs={12} sm={6} md={4}>
                  <Card className={classes.card}>
                    <CardMedia
                      className={classes.cardMedia}
                      title="Image title"
                      image = {`http://localhost:5500/${item.pathToImage}`}
                    />
                    <CardContent className={classes.cardContent}>
                      <Typography gutterBottom variant="h6" component="h5" >
                        <div>{item.title}</div>
                      </Typography>

                      <Typography gutterBottom variant="h7" component="h5">

                        <div>{item.user.name}</div>
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <NavLink to={`/notes/${item._id}`}>
                        <Button size="small" color="primary">
                          Подробнее
                        </Button>
                      </NavLink>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Container>
      </div>
    );
  } else {
    alert("Авторизуйтесь please");
  }
}
