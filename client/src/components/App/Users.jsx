import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Typography,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import Grid from "@material-ui/core/Grid";
import { NavLink, useParams } from "react-router-dom";
import Box from '@material-ui/core/Box';
import Preloader from '../Preloader';
import {  loadUserNotes, loadUsers } from '../../redux/features/users';
import Rating from '@material-ui/lab/Rating';

const useStyles = makeStyles((theme) => ({
  control: {
    padding: theme.spacing(2),
  },
  paperCard: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  grid: {
    display: 'flex',
    justifyContent: 'center'
  },
  card: {
    padding: "5px",
    width: "300px",
    height: "350px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    borderRadius: "5px",
  },
  cardMedia: {
    paddingTop: "56.25%",
    borderRadius: "3px",
  },
  cardContent: {
    padding: "5px",
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
  BtnNote: {
    transition: "all .3s",
    color: "#fff",
    "&:hover": {
      color: "#000841",
    },
  },
  rootRating: {
    display: 'flex',
    flexDirection: 'column',
    '& > * + *': {
      marginTop: theme.spacing(1),
    },
  },
}));

function Users() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const classes = useStyles();
  const loading = useSelector((state) => state.notes.loading);
  const users = useSelector((state) => {
    return state.users.items;
  });
  const notes = useSelector((state) => {
    return state.users.userNotes;
  });
  const user = useSelector((state) => {
    return state.users.currentUser;
  });

  useEffect(() => {
    dispatch(loadUsers());
  }, [dispatch]);

  useEffect(() => {
    document.title = "Волонтеры";
  });
  useEffect(() => {
    dispatch(loadUserNotes());
  }, [dispatch]);

  if (loading) {
    return <Preloader />;
  }
  return (
    <Container className={classes.cardGrid} maxWidth="1440px">
      <Grid container spacing={4} className={classes.grid}>
        {users.map((item) => (
          <Grid item key={item} xs={3}>
            <Card className={classes.card}>
              <CardMedia
                className={classes.cardMedia}
                title="Image title"
                image={`http://localhost:5500/${item.pathToImage}`}
              />
              <CardContent className={classes.cardContent}>
                <Box>
                  <Typography gutterBottom variant="h6" component="h5">
                    <div>{item.name}</div>
                  </Typography>
                  <Typography gutterBottom variant="h7" component="h5">
                    <div>Количество постов: {notes.length}</div>
                  </Typography>
                </Box>
              </CardContent>
              <CardActions>

                <NavLink
                  className={classes.BtnNoteId}
                  to={`/users/${item._id}`}
                >
                </NavLink>
                <Rating name="size-small" defaultValue={1} size="small" />
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Users;