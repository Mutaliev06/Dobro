import React, { useEffect, useState } from "react";
import {
  AppBar,
  Button,
  FormControl,
  IconButton,
  MenuItem,
  Select,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import logo from "./logo-white.svg";
import { useDispatch, useSelector } from "react-redux";
import { loadCategories } from "../../redux/features/categories";
import { NavLink, useParams, useLocation } from "react-router-dom";
import { logout } from "../../redux/features/application";
import classnames from 'classnames'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 6,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  appbar: {
    backgroundColor: "#000841",
    borderRadius: 4,
    width: "97%",
    margin: "auto",
    color: "white",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    color: "white",
    marginTop: theme.spacing(2),
  },
  btnLogIn: {
    textDecoration: "none",
    color: "white",
    marginLeft: 10,
    backgroundColor: "#000841",
  },
  btnLogUp: {
    textDecoration: "none",
    color: "white",
    backgroundColor: "#000841",
  },
  selectTitle: {
    textDecoration: "none",
    color: "#000",
  },
  menuItemLink: {
    color: "#fff",
    textDecoration: "none",
    fontSize: '22px'
  },
  linkActive: {
    color: 'red'
  },
  textDecoration: "none",
  color: "white",
  backgroundColor: "#000841",
}));

function Header() {
  const token = useSelector((state) => state.application.token);
  const { id } = useParams();
  const [category, setCategory] = useState('');
  const [isLoggedOut, setIsLoggedOut] = useState(true);
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.items);
  const [selectTitle, setSelectTitle] = useState('Мероприятия');
  const { pathname } = useLocation();
  const handleChangeCategory = (e) => {
    setCategory(e.target.value);
  };

  useEffect(() => {
    dispatch(loadCategories());
  }, [dispatch]);

  // useEffect(() => {
  //   dispatch(logout());
  // }, [dispatch]);

  const handleLogout = (e) => {
    e.preventDefault();
    setIsLoggedOut(false);
    dispatch(logout());
  };

  const classes = useStyles();

  const isActive = (pn) => {
    if (pn === pathname) return 'linkActive';
  };


  const activeDpop = (title) => {
    setSelectTitle(title);
  };

  const cls = classes.btnLogUp + ' ' + classes.linkActive


  if (!token) {
    return (
      <div>
        <AppBar
          color='transparent'
          position='sticky'
          className={classes.appbar}
        >
          <Toolbar>
            <NavLink color='inherit' to={`/`}>
              <IconButton
                edge='start'
                className={classes.menuButton}
                color='inherit'
                aria-label='menu'
              >
                <img src={logo} />
              </IconButton>
            </NavLink>
            <Typography variant='h6' className={classes.title}>
              <FormControl className={classes.formControl}>
                <Select
                  displayEmpty
                  className={classes.selectEmpty}
                  value={category}
                  onChange={handleChangeCategory}
                  inputProps={{ 'aria-label': 'Without label' }}
                >
                  <MenuItem className={classes.menuItemLink} value='' disabled>
                    {selectTitle}
                  </MenuItem>
                  {categories.map((item) => (
                    <MenuItem key={item.value} value={item._id}>
                      <NavLink
                        onClick={() => activeDpop(item.title)}
                        className={classes.selectTitle}
                        to={`/notes/category/${item._id}`}
                      >
                        {item.title}
                      </NavLink>
                    </MenuItem>
                  ))}
                  }
                </Select>
              </FormControl>
            </Typography>
            <Button color='inherit'>
              <NavLink className={classnames(classes.btnLogUp, pathname ==='/registration' && classes.linkActive)} to={`/registration`}>
                Регистрация
              </NavLink>
            </Button>
            <Button color='inherit' >
              <NavLink className={ classnames(classes.btnLogIn, pathname === '/login' && classes.linkActive)} to={`/login`}>
                {' '}
                Войти
              </NavLink>
            </Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }

  return (
    <div>
      <AppBar color='transparent' position='sticky' className={classes.appbar}>
        <Toolbar>
          <NavLink color='inherit' to={`/`}>
            <IconButton
              edge='start'
              className={classes.menuButton}
              color='inherit'
              aria-label='menu'
            >
              <img src={logo} />
            </IconButton>
          </NavLink>
          <Typography variant='h6' className={classes.title}>
            <FormControl className={classes.formControl}>
              <Select
                displayEmpty
                className={classes.selectEmpty}
                value={category}
                onChange={handleChangeCategory}
                inputProps={{ 'aria-label': 'Without label' }}
              >
                <MenuItem className={classes.menuItemLink} value='' disabled>
                  {selectTitle}
                </MenuItem>
                {categories.map((item) => (
                  <MenuItem key={item.value} value={item._id}>
                    <NavLink
                      onClick={() => activeDpop(item.title)}
                      className={classes.selectTitle}
                      to={`/notes/category/${item._id}`}
                    >
                      {item.title}
                    </NavLink>
                  </MenuItem>
                ))}
                }
              </Select>
            </FormControl>
          </Typography>

          <Button color='inherit' disableElevation>
            <NavLink className={classnames(classes.btnLogUp, pathname ==='/admin' && classes.linkActive)} to={`/admin`}>
              Личный кабинет
            </NavLink>
          </Button>

          <Button color='inherit' value={isLoggedOut} onClick={handleLogout}>
            <NavLink className={ classnames(classes.btnLogIn, pathname === '/login' && classes.linkActive)} to={`/`}>
              {' '}
              Выйти
            </NavLink>
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;
