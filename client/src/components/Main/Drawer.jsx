import React from "react";
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
    marginTop: "20px",
    marginBottom: "20px"
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
  drawerText: {
    textDecoration: "none",
    fontWeight: "bold",
    fontSize: "20px",
    margin: 0
  },
  number: {
    fontWeight: "bold",
    fontSize: "20px",
  },
  drawerList: {
    marginTop: "15px"
  },
  drawerP: {
    margin: 0
  }
});

export default function TemporaryDrawer() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    setState({ ...state, [anchor]: open });
  };

  const list = () => (
    <div>
      <List>
        <h3>3 шага, чтобы стать волонтером</h3>
      </List>
      <Divider />
      <List>
        <ListItem className={classes.drawerList}>
          <ListItemIcon>
            <circle>
              <span className={classes.number}>1</span>
            </circle>
          </ListItemIcon>
          <ListItemText>
            <NavLink
              className={classes.drawerText}
              to="/registration"
            >
              Зарегистрируйся
            </NavLink>
          </ListItemText>
        </ListItem>
        <ListItem className={classes.drawerList}>
          <ListItemIcon>
            <circle>
              <span className={classes.number}>2</span>
            </circle>
          </ListItemIcon>
          <ListItemText>
            <NavLink className={classes.drawerText} to="/notes/all">
              Выбери мероприятие
            </NavLink>
          </ListItemText>
        </ListItem>
        <ListItem className={classes.drawerList}>
          <ListItemIcon>
            <circle>
              <span className={classes.number}>3</span>
            </circle>
          </ListItemIcon>
          <ListItemText>
            <p className={classes.drawerText}>
              Нажми <span>"Принять участие"</span>
            </p>
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
          <p className={classes.drawerP}>Кофи Анан, генеральный секретарь ООН</p>
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
