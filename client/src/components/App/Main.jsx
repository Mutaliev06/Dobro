import React from 'react';
import Notes from '../Main/Notes';
import SlideComponent from '../Main/SlideComponent';

function Main(props) {
  return (
    <div>
      <SlideComponent/>
      <Notes/>
    </div>
  );
}

export default Main;