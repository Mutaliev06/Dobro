import React, { useEffect } from 'react';
import {  useSelector } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia, Container, Paper,
  Typography
} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { loadNotes } from '../../redux/features/notes';
import Grid from '@material-ui/core/Grid';
import { loadUsers } from '../../redux/features/users';
import { useParams } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({

  control: {
    padding: theme.spacing(2),
  },
  paperCard: {
    display: 'flex',
    justifyContent: "space-between",
    alignItems: 'center'
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
}));

function Notes() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.notes.items);
  //const [spacing, setSpacing] = React.useState(2);
  const classes = useStyles();



  useEffect(() => {
    dispatch(loadNotes());
  }, [dispatch]);


  const users = useSelector((state) => state.users.items)
  useEffect(() => {
    dispatch(loadUsers(id));
  }, [dispatch]);

  return (
    <Container className={classes.cardGrid} maxWidth="md">
      {/* End hero unit */}
      <Grid container spacing={4}>
        {notes.map((item) => (
          <Grid item key={item} xs={12} sm={6} md={4}>
            <Card className={classes.card}>
              <img src={`http://localhost:5500/${item.pathToImage}`}/>
              <CardMedia
                className={classes.cardMedia}
                title="Image title"
                image = {`http://localhost:5500/${item.pathToImage}`}
              />
              <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="h5" component="h2">
                  {item.text}
                </Typography>
                <Typography gutterBottom variant="h8" component="h6">
                  {item.user.name}
                  </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary">
                  Открыть
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Notes;

