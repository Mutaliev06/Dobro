const initialState = {
  items: [],
  loading: false,
};

export default function notesReducer(state = initialState, action) {
  switch (action.type) {
    case "notes/load/pending":
      return {
        ...state,
        loading: true,
      };

    case "notes/load/fulfilled":
      return {
        ...state,
        items: action.payload,
        loading: false,
      };
    case "note/post/pending":
      return {
        ...state,
        loading: true,
      };
    case "note/post/fulfilled":
      return {
        ...state,
        loading: false,
        items: [...state.items, action.payload],
      };
    default:
      return state;
  }
}

export const loadNotes = () => {
  return async (dispatch, getState) => {
    const state = getState();
    dispatch({
      type: "notes/load/pending",
    });
    const response = await fetch("http://localhost:5500/notes", {
      headers: {
        Authorization: `Bearer ${state.application.token}`
      }
    })
    const json = await response.json();
    dispatch({
      type: "notes/load/fulfilled",
      payload: json,
    });
}
};

export const addNote = (note, category) => {
  return async (dispatch) => {
    dispatch({ type: "note/post/pending" });
    const response = await fetch('http://localhost:5500/notes/', {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify(note, category),
    });
    const json = await response.json();
    dispatch({
      type: "note/post/fulfilled",
      payload: json,
    });
  };
};

export const addImage = (id, pathToImage) => {
  return async (dispatch) => {
    dispatch({ type: "note/post/pending" });
    const response = await fetch(`http://localhost:5500/upload/notes/${id}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify( pathToImage),
    });
    const json = await response.json();
    dispatch({
      type: "note/post/fulfilled",
      payload: json,
    });
  };
};

// export const loadNotes = () => {
//   return async (dispatch) => {
//     dispatch({
//       type: "notes/load/pending",
//     });
//     const response = await fetch("http://localhost:5500/notes");
//     const json = await response.json();
//     dispatch({
//       type: "notes/load/fulfilled",
//       payload: json,
//     });
//   };
// };