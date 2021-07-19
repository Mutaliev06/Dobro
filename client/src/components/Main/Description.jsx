import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadNotes } from "../../redux/features/notes";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import PlaceIcon from "@material-ui/icons/Place";
import { loadComments } from '../../redux/features/comments';
const useStyles = makeStyles((theme) => ({

  container: {
    marginTop: 15,
  },
  divFoto: {
    display: "flex",
    justifyContent: 'space-around'
  },
  divDescription: {
    display: "flex",
  },
  divPlaceTime: {
    width: 300,
    padding: 15,
  },
  img: {
    width: 600,
    height: 300,
  },
  divComments: {
    // border: ('3px' , 'solid', 'yellow')
    borderWidth: 3,
borderColor: 'rgb(190,190,190)',
borderStyle: 'inset',
    borderRadius: 4,
    marginBottom: 10
  }
}));

function Description(props) {
  const classes = useStyles();

  const { id } = useParams();
  console.log(id)

  const dispatch = useDispatch();
  const notes = useSelector((state) => {
    return state.notes.items.find((item) => item._id === id);
  });
  const comments = useSelector((state => state.comments.items))

  useEffect(() => {
    dispatch(loadNotes());
  }, [dispatch]);

  useEffect(() => {
    dispatch(loadComments(id))
  }, [dispatch])

  return (
    <div className={classes.container}>
      <div className={classes.divFoto}>
        <div>
          <img src={`http://localhost:5500/${notes?.pathToImage}`} className={classes.img} />
        </div>
        <div>
          <h1>{notes?.title}</h1>

          <h3> Автор поста: {notes?.user.name}</h3>
          <Button variant="outlined">Принять участие</Button>
        </div>
      </div>
      <div className={classes.divDescription}>
        <div>
          <h1>Описание</h1>
          <p>{notes?.text}</p>
        </div>
        <div>
          <div className={classes.divPlaceTime}>
            <h3>Дата проведения:</h3>
            {notes?.timeOfTheEvent}
            <p>
              <h3>Место проведения:</h3>
              <PlaceIcon fontSize={"large"} color="secondary" />
              {notes?.placeOfEvent}
            </p>
          </div>
        </div>
      </div>
      <div>
        <h1>
          Лента записей
        </h1>
        <div className={classes.divComments}>
          {comments.map(item => {
            return (
              <div>
                <h4>{item.user.name}</h4>
                {item.text}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
}

export default Description;
