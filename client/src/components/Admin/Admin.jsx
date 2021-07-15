import React from 'react';
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
  FormHelperText,

  NativeSelect,
  TextField
} from '@material-ui/core';
import Button from '@material-ui/core/Button';

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

const drawerWidth = 240;

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
}));

export default function Dashboard() {
  const classes = useStyles();


  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return ( <> <Header/>
    <div className={classes.root}>

      <CssBaseline />



      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {/* Фото юзера */}
            <Grid item xs={8} md={8} lg={5}>
              <Paper className={fixedHeightPaper}>
                Фото юзера
              </Paper>
            </Grid>
            <Grid item xs={8} md={8} lg={7}>
              <Paper className={fixedHeightPaper}>
                Фио
              </Paper>
            </Grid>
            {/* ФИО юзера */}
          </Grid>
          <Grid container spacing={3}>
            {/* Фото юзера */}
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
                <Typography align='center'>Выберите категорию </Typography>
                <Paper>
                  {/*{'Добавление постов'}*/}
                  <FormControl className={classes.formControl}>
                    <NativeSelect
                      className={classes.selectEmpty}
                      // value={state.age}
                      // onChange={handleChange}
                    >
                      <option value="" disabled>
                        Мероприятия
                      </option>
                      <option value={10}>Ten</option>

                    </NativeSelect>
                    <FormHelperText>Выберите категорию</FormHelperText>
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