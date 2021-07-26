import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { NavLink } from "react-router-dom";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
  drawer: {
    display: "flex",
    marginTop: "10px",
  },
  quote: {
    width: "100%",
    display: "flex",
  },
  quoteH3: {
    width: "95%",
    fontSize: "20px",
    borderRadius: "5px",
    backgroundColor: "#d0c0c0",
    textAlign: "center",
    padding: "20px 10px",
    margin: "0",
  },
  text: {
    fontStyle: "italic",
  },
  button: {
    backgroundColor: "#e5266e",
    padding: "10px 20px",
    width: "205px",
    height: "100px",
  },
  btnDiv: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
});

export default function TemporaryDrawer() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    setState({ ...state, [anchor]: open });
  };

  const btn = [
    "Зарегистрируйся",
    "Выбери мероприятие",
    "Оставь заявку на участие",
  ];

  const list = () => (
    <div>
      <List>
        <h3>3 шага, чтобы стать волонтером</h3>
      </List>
      <Divider />
      <List>
        <ListItem>
          <ListItemIcon>
            <circle>
              <span>1</span>
            </circle>
          </ListItemIcon>
          <ListItemText>
            <NavLink to="/registration">Зарегистрируйся</NavLink>
          </ListItemText>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <circle>
              <span>2</span>
            </circle>
          </ListItemIcon>
          <ListItemText>
            <NavLink to="/registration">Зарегистрируйся</NavLink>
          </ListItemText>
        </ListItem>
      </List>
    </div>
  );

  return (
    <div className={classes.drawer}>
      <div className={classes.quote}>
        <h3 className={classes.quoteH3}>
          <p className={classes.text}>
            «В сердце добровольчества (волонтерства) собраны идеалы служения и
            солидарности и вера в то, что вместе мы можем сделать этот мир
            лучше.
          </p>
          <p>Кофи Анан, генеральный секретарь ООН</p>
        </h3>
      </div>
      <div className={classes.btnDiv}>
        {["Стать волонтером"].map((anchor) => (
          <React.Fragment key={anchor}>
            <Button
              className={classes.button}
              onClick={toggleDrawer(anchor, true)}
            >
              {anchor}
            </Button>
            <Drawer
              anchor={anchor}
              open={state[anchor]}
              onClose={toggleDrawer(anchor, false)}
            >
              {list(anchor)}
            </Drawer>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
