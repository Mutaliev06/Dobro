import React from 'react';
import Notes from '../Notes/Notes';
import SlideComponent from '../Notes/SlideComponent';

function Main(props) {
  return (
    <div>
      <SlideComponent/>
      <Notes/>
    </div>
  );
}

export default Main;