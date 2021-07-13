import React, { useEffect } from 'react';
import {  useSelector } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia, Paper,
  Typography
} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { loadNotes } from '../../redux/features/notes';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 240,
    width: 200,
  },
  control: {
    padding: theme.spacing(2),
  },
}));

function Notes(props) {
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.notes.items);
  const [spacing, setSpacing] = React.useState(2);
  const classes = useStyles();
  const handleChange = (event) => {
    setSpacing(Number(event.target.value));
  };
  useEffect(() => {
    dispatch(loadNotes());
  }, [dispatch]);


  return (
    <div >
      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={12}>
          <Grid container justifyContent="center" spacing={spacing}>
            {notes.map((item) => (
              <Grid >
                <Paper className={classes.paper}>
                  {item.text}
                </Paper>
              </Grid>
            ))}
          </Grid>
          </Grid>
        </Grid>
    </div>
  );
}

export default Notes;

