import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import CreateOutlinedIcon from "@material-ui/icons/CreateOutlined";
import { MdEdit } from "react-icons/all";
import Button from "@material-ui/core/Button";
import { NavLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  AppBar,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent, FormControl,
  IconButton,
  ListItem,
  ListItemText, MenuItem, Paper, Select,
  TextField,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { addImage, changeImage, editNote } from "../../redux/features/notes";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import clsx from 'clsx';
import Grid from '@material-ui/core/Grid';
import Preloader from '../Preloader';
import { PhotoCamera } from '@material-ui/icons';
import { addAvatar } from '../../redux/features/users';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[9],
    padding: theme.spacing(2, 4, 3),
  },
  BtnNote: {
    transition: "all .3s",
    color: "#fff",
    "&:hover": {
      color: "#000841",
    },
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
  BtnNoteIdEdit: {
    textDecoration: "none",
    position: "relative",
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
    marginLeft: 80,
    padding: 10,
  },
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  cardMedia: {
    width: 550,
    objectFit: 'cover',
  },
  cardContent: {
    flexGrow: 1,
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    marginLeft: 10,
    width: "95%",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 900,
    height: 65,
    marginTop: 20,
  },
  textFieldModal: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 810,
    height: 65,
    marginTop: 20,
  },
  textFieldData: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 400,
    height: 45,
    marginTop: 60,
  },
  inputStyle: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 810,
    marginTop: 10,
  },
  mediaContainer: {
    display: 'flex',
    marginTop: 30,
    justifyContent: 'space-evenly',
  },
  editText: {
    display: 'flex',
    flexDirection: 'column',

  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 300,
    textAlign: "center",
    marginTop: 30,
  },
  selectEmpty: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginBottom: 5,
    marginTop: 30
  },
  selectEmptyCategory: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 400,
    height: 45,
    marginTop: 60,
  },
  AddressInput: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 810,
    height: 15,
    marginTop: 50
  },
  fixedHeight: {
    height: 300,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function EditNotes({ notes }) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [text, setText] = React.useState(notes.text);
  const [title, setTitle] = React.useState(notes.title);
  const [category, setCategory] = useState("");
  const categories = useSelector((state) => state.categories.items);
  const [timeOfTheEvent, setTimeOfTheEvent] = React.useState(
    notes.timeOfTheEvent
  );
  const [placeOfEvent, setPlaceOfEvent] = React.useState(notes.placeOfEvent);

  const handleEdit = async () => {
    await dispatch(
      editNote(notes._id, { text, title, timeOfTheEvent, placeOfEvent })
    ).then(() => {
      handleClose();
    });
  };

  const handleChangeImage = async (e) => {
    await dispatch(changeImage(e));
  };

  const handleChangeCategory = (e) => {
    setCategory(e.target.value);
  };

  const handleChangeText = (even) => {
    setText(even.target.value);
  };

  const handleChangeTitle = (even) => {
    setTitle(even.target.value);
  };

  const handleChangeTimeOfTheEvent = (even) => {
    setTimeOfTheEvent(even.target.value);
  };

  const handleChangePlaceOfEvent = (even) => {
    setPlaceOfEvent(even.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <div>

      <Button
        variant="outlined"
        color="primary"
        className={classes.BtnNoteIdEdit}
        onClick={handleClickOpen}
      >
        <MdEdit />
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Редактировать пост
            </Typography>
            <Button autoFocus color="inherit" onClick={handleEdit}>
              Сохранить
            </Button>
          </Toolbar>
        </AppBar>
        <div className={classes.mediaContainer}>
          <CardMedia
            className={classes.cardMedia}
            title="Image title"
            image={`/${notes.pathToImage}`}
          />

          <Grid item xs={8} md={8} lg={7}>
            <Paper elevation={3}>
          <div className={classes.editText}>
            <TextField
              id="outlined-multiline-static"
              className={classes.inputStyle}
              label="Введите заголовок*"
              multiline
              rows={1}
              variant="outlined"
              value={title}
              onChange={handleChangeTitle}
            />
            <TextField
              className={classes.textFieldModal}
              id="outlined-multiline-static"
              label="Введите текст*"
              multiline
              rows={3}
              value={text}
              onChange={handleChangeText}
              variant="outlined"
            />

              <TextField
                className={classes.AddressInput}
                id="standard-basic"
                variant="outlined"
                label="Введите адрес*"
                value={placeOfEvent}
                onChange={handleChangePlaceOfEvent}
              />
              <TextField
                id="datetime-local"
                label="Выбрать дату*"
                type="datetime-local"
                className={classes.textFieldData}
                InputLabelProps={{
                  shrink: true,
                }}
                value={timeOfTheEvent}
                onChange={handleChangeTimeOfTheEvent}
              />

            <FormControl className={classes.formControl}>
              <Select
                displayEmpty
                className={classes.selectEmptyCategory}
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
            <Button
              variant="contained"
              color="primary"
            >
              <input
                accept="image/*"
                className={classes.input}
                id="contained-button-file1"
                multiple
                type="file"
                onChange={handleChangeImage}
              />
            </Button>
          </div>
            </Paper>
          </Grid>
        </div>
      </Dialog>
    </div>
  );
}
