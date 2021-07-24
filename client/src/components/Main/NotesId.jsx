import React, { useEffect, useState } from 'react';
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
import { loadCategoryNotes, loadNotes } from '../../redux/features/notes';
import Grid from "@material-ui/core/Grid";
import { NavLink, useParams } from "react-router-dom";
import { GoChevronRight, HiArrowNarrowRight } from 'react-icons/all';


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
  card: {
    padding: '5px',
    width: '300px',
    height: '350px',
    display: "flex",
    flexDirection: "column",
    borderRadius: '5px',
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
    borderRadius: '3px',
  },
  cardContent: {
    padding: '5px'
  },
  BtnNoteId: {
    textDecoration: 'none',
    position: 'relative',
    padding: '0',
    background: '#000841',
    color: '#fff',
    borderRadius: '5px',
    transition: 'all .3s',
    '&:hover':{
      background: 'transparent',
      border: "2px solid #000841",
      color: '#000841',
      transform: 'scale(1.02)'
    }
  },
  BtnNote: {
    transition: 'all .3s',
    color: '#fff',
    '&:hover':{
      color: '#000841'
    }
  },

}));

function NotesId() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.notes.items);
  const classes = useStyles();
  const [hover, setHover] = useState(false)

  useEffect(() => {
    dispatch(loadCategoryNotes(id));
  }, [dispatch, id]);

  useEffect(() => {
    document.title = "ВЦ 'Добро'";
  });



  return (
    <Container className={classes.cardGrid} maxWidth="md">
      {/* End hero unit */}
      <Grid container spacing={4}>
        {notes.map((item) => (
          <Grid item key={item} xs={12} sm={6} md={4}>
            <Card className={classes.card}>
              <CardMedia
                className={classes.cardMedia}
                title="Image title"
                image={`http://localhost:5500/${item.pathToImage}`}
              />
              <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="h6" component="h5">
                  <div>{item.title}</div>
                </Typography>
                <Typography gutterBottom variant="h7" component="h5">
                  <div>Автор поста: {item.user.name}</div>
                </Typography>
              </CardContent>
              <CardActions>
                <NavLink className={classes.BtnNoteId} to={`/notes/${item._id}`}>
                  <Button className={classes.BtnNote}>
                    Подробнее


                  </Button>
                </NavLink>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default NotesId;
