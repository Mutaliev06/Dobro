import { useState } from 'react';

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
    case "imageChange/upload/pending":
      return {
        ...state,
        loading: true,
      };
    case "imageChange/upload/fulfilled":
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

    case "add/user/participate/pending":
      return {
        ...state,
        loading: true,
      };
    case "add/user/participate/fulfilled":
      return {
        ...state,
        loading: false,
        items: {...state.items, user: action.payload.u },
      }


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
    const response = await fetch("/notes", {
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

    const response = await fetch(`/notes/category/${id}`);
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
    const response = await fetch("/notes", {
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

export const addUserParticipate = (id) => {
  return async (dispatch, getState) => {
    const state = getState();
    dispatch({type: "add/user/participate/pending" })
    try{
    const response = await fetch(`/notes/${id}/participate`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${state.application.token}`,
        "Content-type": "application/json",
      }})
      const json = await response.json()
      dispatch({type: 'add/user/participate/fulfilled', payload: json })
    }
    catch (e) {
      console.log(e.message)
    };
  };
}





export const addImage = (e) => {
  return async (dispatch) => {
    dispatch({ type: "note/upload/pending" });

    const { files } = e.target;
    const data = new FormData();
    data.append("image", files[0]);

    const response = await fetch(`/upload/notes`, {
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
export const changeImage = (e) => {
  return async (dispatch, getState) => {
    dispatch({ type: "imageChange/upload/pending" });

    const { files } = e.target;
    const data = new FormData();
    data.append("image", files[0]);
    const state = getState();

    const response = await fetch(`/upload/notes/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${state.application.token}`,
      },
      body: data,
    });

    const json = await response.json();
    dispatch({
      type: "imageChange/upload/fulfilled",
      payload: json,
    });
  };
};


export const editNote = (id, data) => {
  return async (dispatch, getState) => {
    dispatch({ type: "note/edit/pending" });

    const state = getState();
    await fetch(`/notes/${id}`, {
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
  };
};

export const addLastComment = (id, data) => {
  return async (dispatch, getState) => {
    dispatch({ type: "note/edit/pending" });

    const state = getState();
    await fetch(`/notes/${id}`, {
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