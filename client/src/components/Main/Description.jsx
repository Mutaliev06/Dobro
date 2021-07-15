import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { loadNotes } from '../../redux/features/notes';

function Description(props) {

  const { id } = useParams()

  const dispatch = useDispatch();
  const notes =  useSelector(state => {
    return state.notes.items.find(item => item._id === id)
  })

  useEffect(() => {
    dispatch(loadNotes())
  },[dispatch])



  return (
    <div>
       <div>
         <div>
           <p>
             {notes.text}
             {notes.category}
           </p>
           <img src={`http://localhost:5500/${notes.pathToImage}`}/>
         </div>
         <div>
           <h1>
             Заголовок
           </h1>
         </div>
       </div>


    </div>
  );
}

export default Description;