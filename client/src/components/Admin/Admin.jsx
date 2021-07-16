import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';

import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';

import Header from '../App/Header';
import {
  FormControl,
  FormHelperText, MenuItem,

  NativeSelect, Select,
  TextField
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { NavLink, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { loadUserById, loadUsers } from '../../redux/features/users';
import { loadCategories } from '../../redux/features/categories';
import { Avatar } from '@material-ui/core';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="/">
        На главную
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
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
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
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
  const categories = useSelector((state) => state.categories.items);

  useEffect(() => {
    dispatch(loadUserById());
  }, [dispatch]);

  const handleChangeCategory = (e) => {
    setCategory(e.target.value);
  };

  useEffect(() => {
    dispatch(loadCategories());
  }, [dispatch]);

  const user = useSelector((state) => {
    return state.users.currentUser
  });

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  console.log(user.name)

  return ( <> <Header/>
    <div className={classes.root}>
      <CssBaseline />

      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {/* Фото юзера */}
            <Grid item xs={8} md={8} lg={5}>
              <Paper align='center' className={fixedHeightPaper}>
                <Avatar className={classes.imgMargin} size='400' src={`http://localhost:5500/${user.pathToImage}`}/>
                {/*<img className={classes.imgMargin} width='200' src={`http://localhost:5500/${user.pathToImage}`}/>*/}
              </Paper>
            </Grid>
            {/* ФИО юзера */}
            {/*{Активность юзера}*/}
            <Grid  item xs={8} md={8} lg={7}>
              <Paper className={fixedHeightPaper}>
               <Typography variant="h6" > Фамилия имя: {'  '} {user.name}  </Typography>
               <Typography variant="h6" > Количество постов:  {'  '}       </Typography>
               <Typography variant="h6" > Информация о вас:  {'  '}        </Typography>
               <Typography variant="h6" >  Ваш эмайл: {'  '} {user.email}   </Typography>
               <Typography variant="h6" > Ваш Телефон:  {'  '}  {user.tel} </Typography>
               <Typography variant="h6" > Ваш Логин:   {'  '} {user.login} </Typography>
              </Paper>
            </Grid>
          </Grid>
          <Grid container spacing={3}>

            <Grid item xs={8} md={8} lg={8}>
              <Paper className={fixedHeightPaper}>
                <Typography align='center'  variant="h5" component="h4"> Заполните все поля </Typography>
                <TextField
                  id="outlined-multiline-static"
                  label="Введите текст"
                  multiline
                  rows={3}
                  variant="outlined"
                />
                <Grid  lg={4}>

                </Grid>
              </Paper>
            </Grid>
            <Grid item xs={8} md={8} lg={4}>
              <Paper className={fixedHeightPaper}>

                <Paper>
                  <Typography align='center'>Выберите категорию </Typography>
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
                        <MenuItem key={item.value} value={item._id} >
                            {item.title}
                        </MenuItem>
                      ))}
                      }
                    </Select>
                  </FormControl>
                </Paper>
                <input
                  accept="image/*"
                  className={classes.input}
                  id="contained-button-file"
                  multiple
                  type="file"
                />
                <label htmlFor="contained-button-file">
                  <Button variant="contained" color="primary" component="span">
                    Upload
                  </Button>
                </label>
                <input accept="image/*" className={classes.input} id="icon-button-file" type="file" />

              </Paper>
            </Grid>

            {/* Посты */}

            <Grid item xs={12}>
              <Paper className={classes.paper}>
                Order
              </Paper>
            </Grid>
          </Grid>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  </>);
}