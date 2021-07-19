import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {
  FormControl,
  MenuItem,
  Select,
  TextField
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { loadUserById } from '../../redux/features/users';
import { loadCategories } from '../../redux/features/categories';
import { Avatar } from '@material-ui/core';
import { addImage, addNote, loadNotes } from '../../redux/features/notes';



const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    marginBottom: 45
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
    height: '100vh',
    overflow: 'auto',
    marginTop: 20
  },
  container: {
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  paperMarginTop: {
    padding: theme.spacing(),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    marginTop: 20,
    marginBottom: 20
  },
  fixedHeight: {
    height: 240,
  },
  fixedHeightPaperMargin: {
    marginBottom: 20
  },
  input: {
    display: 'none',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 335,
  },
  selectEmpty: {
    marginTop: theme.spacing(4),
  },
  imgMargin: {
    margin: 'auto',
    width: 200,
    height: 200
  }
}));

export default function Dashboard() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const classes = useStyles();
  const [category, setCategory] = useState("");
  const [text, setText] = useState("");
  const [pathToImage, setPathToImage] = useState("");
  const categories = useSelector((state) => state.categories.items);


    const user = useSelector((state) => {
    return state.users.currentUser
  });

  useEffect(() => {
    dispatch(loadNotes(id));
  }, [dispatch]);

  const note = useSelector((state) => {
    return state.notes.items.find((item) => item._id === id);
  });


  const handleChangeCategory = (e) => {
    setCategory(e.target.value);
  };

  const handleChangeNote = (e) => {
    setText(e.target.value);
  };

  const handleUploadImage = (e) => {
    setPathToImage(e.target.value);
  };

  useEffect(() => {
    dispatch(loadUserById());
  }, [dispatch]);

  useEffect(() => {
    dispatch(loadCategories());
  }, [dispatch]);



  const handleAddImage = async (id) => {
    await dispatch(addImage(id, { pathToImage }));
  };

  const handleAddNote = async () => {
    await dispatch(addNote({ text, category }));
  };

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);


  return (
    <div className={classes.root}>
      <main className={classes.content}>
        {/*{note.length}*/}
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {/* Фото юзера */}
            <Grid item xs={8} md={8} lg={5}>
              <Paper align='center' className={fixedHeightPaper}>
                <Avatar className={classes.imgMargin} size='400'
                        src={`http://localhost:5500/${user.pathToImage}`}/>
              </Paper>
            </Grid>
            {/* ФИО юзера */}
            {/*{Активность юзера}*/}
            <Grid item xs={8} md={8} lg={7}>
              <Paper className={fixedHeightPaper}>
                <Typography variant="h6"> ФИО: {'  '} {user.name}  </Typography>
                <Typography variant="h6"> Количество постов: {'  '}       </Typography>
                <Typography variant="h6"> Информация о вас: {'  '}        </Typography>
                <Typography variant="h6"> Ваш эмайл: {'  '} {user.email}   </Typography>
                <Typography variant="h6"> Ваш Телефон: {'  '} {user.tel} </Typography>
                <Typography variant="h6"> Ваш Логин: {'  '} {user.login} </Typography>
              </Paper>
            </Grid>
          </Grid>
          <Grid item xs={8} md={8} lg={12}>
            <Paper className={classes.paperMarginTop}>
              <Typography align='center' variant="h5" component="h4">
                Создать заявку на помощь
              </Typography>
            </Paper>
          </Grid>
          <Grid className={classes.fixedHeightPaperMargin} container spacing={3}>

            <Grid item xs={8} md={8} lg={8}>
              <Paper className={fixedHeightPaper}>
                <Typography align='center' variant="h6" component="h6"> Заполните все обязательные
                  поля* </Typography>
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

                </Grid>
              </Paper>
            </Grid>
            <Grid item xs={8} md={8} lg={4}>
              <Paper className={fixedHeightPaper}>

                <Paper>
                  <Typography align='center'>Выберите категорию* </Typography>
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
                <input

                  className={classes.input}
                  id="contained-button-file"
                  multiple
                  value={pathToImage}
                  onChange={handleUploadImage}
                  type="file"
                />
                <label htmlFor="contained-button-file">
                  <Button onClick={handleAddImage}
                          variant="contained" color="primary" component="span">
                    Upload
                  </Button>
                  <input type='file' onChange={handleAddImage}/>
                </label>
                <input accept="image/*" className={classes.input} id="icon-button-file"
                       type="file"/>
                <Button
                 onClick={handleAddNote} variant="contained" color="primary">
                  Добавить
                </Button>
              </Paper>
            </Grid>
            {/* Посты */}
            <Grid item xs={12}>
                <Paper className={classes.paper}>

                </Paper>
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
 );
}