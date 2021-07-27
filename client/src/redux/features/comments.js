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

    case "comment/post/pending":
      return {
        ...state,
        loading: true,
      };
    case "comment/post/fulfilled":
      return {
        ...state,
        loading: false,
        items: [...state.items, action.payload],
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
    const response = await fetch(`/comments/note/${id}`);
    const json = await response.json();
    dispatch({
      type: "comments/load/fulfilled",
      payload: json,
    });
  };
};

export const postComment = (id, data) => {
  return async (dispatch, getState) => {
    dispatch({ type: "comment/post/pending" });
    const state = getState();

    const response = await fetch(`/comments/note/${id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${state.application.token}`,
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        text: data.text,
      }),
    });

    const json = await response.json();
    dispatch({
      type: "comment/post/fulfilled",
      payload: json,
    });
    window.location.reload()
  };
};
