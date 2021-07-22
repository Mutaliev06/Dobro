import React, { useEffect, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useDispatch, useSelector } from 'react-redux';
import { createUser } from '../../redux/features/application';



const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    textDecoration: 'none'
  },
}));

export default function SignUp() {
  const dispatch = useDispatch()
  const [ login, setLoginUp ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ email, setEmailUp ] = useState('')
  const [ name, setNameUp ] = useState('')

  const signUp = useSelector(state => state.application.signingUp);
  const error = useSelector(state => state.application.error)

  const handleChangeLogin = (e) => {
    setLoginUp(e.target.value)
  };
  const handleChangeEmail = (e) => {
    setEmailUp(e.target.value)
  };
  const handleChangeName = (e) => {
    setNameUp(e.target.value)
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value)
  };

  const handleSubmit = () => {
    dispatch(createUser(login, password, name, email))
  };

  const classes = useStyles();

  useEffect(() => {
    document.title = "Регистрация";
  });

  return (
    <>
    <Container component="main" maxWidth="xs">
      {error}
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Регистрация
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} >
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                value={name}
                onChange={handleChangeName}
                id="firstName"
                label="Имя"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} >
              <TextField
                variant="outlined"
                required
                fullWidth
                value={email}
                onChange={handleChangeEmail}
                id="email"
                label="Адрес электронной почты"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="login"
                name="login"
                variant="outlined"
                value={login}
                onChange={handleChangeLogin}
                required
                fullWidth
                id="login"
                label="Логин"
                autoFocus
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                value={password}
                onChange={handleChangePassword}
                name="password"
                label="Пароль"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="Я хочу получать по почте информацию о новых волонтерских программах"
              />
            </Grid>
          </Grid>
          <Link className={classes.submit} href='/login'>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
            disabled={signUp}
          >
            Зарегестрироваться
          </Button>
          </Link>
          <Grid container justifyContent="flex-end">
            <Grid item>
              У вас уже есть аккаунт? {'  '}
              <Link href="/login" variant="body2">
                Войти
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>

    </Container>
    </>
      );
}