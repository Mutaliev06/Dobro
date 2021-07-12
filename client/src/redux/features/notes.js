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
  return async (dispatch) => {
    dispatch({
      type: "notes/load/pending",
    });
    const response = await fetch("http://localhost:5500/notes");
    const json = await response.json();
    dispatch({
      type: "notes/load/fulfilled",
      payload: json,
    });
  };
};
