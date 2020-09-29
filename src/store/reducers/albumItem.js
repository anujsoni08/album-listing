import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  albumItem: {},
  albumPhotos: [],
  currentPageNumber: 1,
  totalPages: 1,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_ALBUM_ITEM:
      return updateObject(state, { albumItem: action.value });
    case actionTypes.SET_ALBUM_PHOTOS:
      return updateObject(state, { albumPhotos: action.value });
    case actionTypes.SET_ALBUM_ITEM_TOTAL_PAGES:
      return updateObject(state, { totalPages: action.value });
    case actionTypes.SET_ALBUM_ITEM_CURRENT_PAGE:
      return updateObject(state, { currentPageNumber: action.value });
    default:
      return state;
  }
};

export default reducer;
