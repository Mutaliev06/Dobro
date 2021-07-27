const initialState = {
  items: [],
  loading: false,
};
export default function categoriesReducer(state = initialState, action) {
  switch (action.type) {
    case "categories/load/pending":
      return {
        ...state,
        loading: true,
      };
    case "categories/load/fulfilled":
      return {
        ...state,
        items: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}

export const loadCategories = () => {
  return async (dispatch) => {
    dispatch({ type: "categories/load/pending" });

    const res = await fetch("/categories");
    const json = await res.json();

    dispatch({ type: "categories/load/fulfilled", payload: json });
  };
};
