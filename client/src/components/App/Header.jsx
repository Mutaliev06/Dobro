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
import { NavLink, useParams } from "react-router-dom";
import { logout } from "../../redux/features/application";

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
    borderRadius: 6,
    width: "96%",
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

  textDecoration: "none",
  color: "white",
  backgroundColor: "#000841",
}));

function Header() {
  const token = useSelector((state) => state.application.token);
  const { id } = useParams();
  const [category, setCategory] = useState("");
  const [isLoggedOut, setIsLoggedOut] = useState(true);
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.items);

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

  if (!token) {
    return (
      <div>
        <AppBar
          color="transparent"
          position="sticky"
          className={classes.appbar}
        >
          <Toolbar>
            <NavLink color="inherit" to={`/`}>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
              >
                <img src={logo} />
              </IconButton>
            </NavLink>
            <Typography variant="h6" className={classes.title}>
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
                      <NavLink
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
            <Button color="inherit">
              <NavLink className={classes.btnLogUp} to={`/registration`}>
                Регистрация
              </NavLink>

              <NavLink className={classes.btnLogIn} to={`/login/`}>
                {" "}
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
      <AppBar color="transparent" position="sticky" className={classes.appbar}>
        <Toolbar>
          <NavLink color="inherit" to={`/`}>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <img src={logo} />
            </IconButton>
          </NavLink>
          <Typography variant="h6" className={classes.title}>
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
                    <NavLink
                      className={classes.btnLogIn}
                      to={`/notes/${item._id}`}
                    >
                      {item.title}
                    </NavLink>
                  </MenuItem>
                ))}
                }
              </Select>
            </FormControl>
          </Typography>
          <Button color="inherit" disableElevation>
            <NavLink className={classes.btnLogIn} to={`/admin/`}>
              Личный кабинет
            </NavLink>
          </Button>
          <Button value={isLoggedOut} onClick={handleLogout} color="inherit">
            <NavLink className={classes.btnLogIn} to={`/`}>
              Выйти
            </NavLink>
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;
