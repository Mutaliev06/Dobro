const initialState = {
  items: [],
  loading: false,
};

export default function commentsReducer(state = initialState, action) {
  switch (action.type) {
    case "comments/load/pending":
      return {
        ...state,
        loading: true,
      };

    case "comments/load/fulfilled":
      return {
        ...state,
        items: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}


export const loadComments = (id) => {
  return async (dispatch, getState) => {
    const state = getState();
    dispatch({
      type: "comments/load/pending",
    });
    const response = await fetch(`http://localhost:5500/comments/note/${id}`)
    const json = await response.json();
    dispatch({
      type: "comments/load/fulfilled",
      payload: json,
    });
  }
}