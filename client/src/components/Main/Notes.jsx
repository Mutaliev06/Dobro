import React, { useEffect } from 'react';
import {  useSelector } from "react-redux";
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography
} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { loadNotes } from '../../redux/features/notes';

function Notes(props) {
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.notes.items);

  useEffect(() => {
    dispatch(loadNotes());
  }, [dispatch]);


  return (
    <div>
      {notes.map(item => (
        <Card>
          <CardActionArea>
            <CardMedia
              component="img"
              alt="Contemplative Reptile"
              height="140"
              image={item.pathToImage}

            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {item.user}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {item.text}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary">
              Подробнее
            </Button>
          </CardActions>
        </Card>
      ))}
    </div>
  );
}

export default Notes;

