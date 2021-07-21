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
}

export const loadCategoryNotes = (id) =>{
  return async (dispatch) =>{
    dispatch({
      type: 'notes/load/pending'
    })

    const response = await fetch(`http://localhost:5500/notes/category/${id}`)
    const json = await response.json()

    dispatch({
      type: 'notes/load/fulfilled',
      payload: json
    })
  }
}