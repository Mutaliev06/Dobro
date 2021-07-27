const initialState = {
  items: [],
  loading: false,
  editing: false,
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
    case "note/upload/pending":
      return {
        ...state,
        loading: true,
      };
    case "note/upload/fulfilled":
      return {
        ...state,
        loading: false,
        image: action.payload.image,
      };
    case "note/edit/pending":
      return {
        ...state,
        editing: true,
      };

    case "note/edit/fulfilled":
      return {
        ...state,
        editing: false,
        items: state.items.map((item) => {
          if (item.id === action.payload.id) {
            return {
              ...item,
              ...action.payload.data,
            }
          }
          return item;
        }),
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
        Authorization: `Bearer ${state.application.token}`,
      },
    });
    const json = await response.json();
    dispatch({
      type: "notes/load/fulfilled",
      payload: json,
    });
  };
};

export const loadCategoryNotes = (id) => {
  return async (dispatch) => {
    dispatch({
      type: "notes/load/pending",
    });

    const response = await fetch(`http://localhost:5500/notes/category/${id}`);
    const json = await response.json();

    dispatch({
      type: "notes/load/fulfilled",
      payload: json,
    });
  };
};

export const addNote = (data) => {
  return async (dispatch, getState) => {
    dispatch({ type: "note/post/pending" });

    const state = getState();
    const response = await fetch("http://localhost:5500/notes", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${state.application.token}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        text: data.text,
        category: data.category,
        title: data.title,
        image: state.notes.image,
        timeOfTheEvent: data.timeOfTheEvent,
        placeOfEvent: data.placeOfEvent,
      }),
    });
    const json = await response.json();
    dispatch({
      type: "note/post/fulfilled",
      payload: json,
    });
    window.location.reload();
  };
};

export const addImage = (e) => {
  return async (dispatch) => {
    dispatch({ type: "note/upload/pending" });

    const { files } = e.target;
    const data = new FormData();
    data.append("image", files[0]);

    const response = await fetch(`http://localhost:5500/upload/notes`, {
      method: "POST",
      body: data,
    });

    const json = await response.json();

    dispatch({
      type: "note/upload/fulfilled",
      payload: json,
    });
  };
};

export const editNote = (id, data) => {
  return async (dispatch, getState) => {
    dispatch({ type: "note/edit/pending" });

    const state = getState();
    await fetch(`http://localhost:5500/notes/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${state.application.token}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        title: data.title,
        text: data.text,
        timeOfTheEvent: data.timeOfTheEvent,
        placeOfEvent: data.placeOfEvent,
      }),

    });
    dispatch({ type: "note/edit/fulfilled", payload: { id, data } });
    window.location.reload()
  };
};

export const addLastComment = (id, data) => {
  return async (dispatch, getState) => {
    dispatch({ type: "note/edit/pending" });

    const state = getState();
    await fetch(`http://localhost:5500/notes/${id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${state.application.token}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        lastComment: data.lastComment
      }),

    });
    dispatch({ type: "note/edit/fulfilled", payload: { id, data } });
    window.location.reload()
  };
}