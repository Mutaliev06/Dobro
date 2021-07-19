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

export const addNote = (data) => {
  return async (dispatch) => {
    dispatch({ type: "note/post/pending" });
    console.log(data);
    const response = await fetch('http://localhost:5500/notes/', {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        text: data.note,
        category: data.category,
      }),
    });
    const json = await response.json();
    dispatch({
      type: "note/post/fulfilled",
      payload: json,
    });
  };
};

export const addImage = (id, data) => {
  return async (dispatch) => {
    dispatch({ type: "note/post/pending" });
    const response = await fetch(`http://localhost:5500/upload/notes/${id}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ pathToImage: data.pathToImage }),
    });
    const json = await response.json();
    dispatch({
      type: "note/post/fulfilled",
      payload: json,
    });
  };
};

