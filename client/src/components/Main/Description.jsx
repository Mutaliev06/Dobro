import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { loadNotes } from '../../redux/features/notes';
import Header from '../App/Header';
import Footer from '../App/Footer';

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
      <Header />
       <div>
         <div>
           <img src={`http://localhost:5500/${notes.pathToImage}`}/>
           <p>
             {notes.text}
           </p>

         </div>
         <div>
         </div>
       </div>

      <Footer />
    </div>
  );
}

export default Description;