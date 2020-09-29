import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  allAlbumList: [],
  allUserList:[],
  totalPages: 1,
  currentPageNumber: 1,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_ALL_ALBUM_LIST:
      return updateObject(state, { allAlbumList: action.value });
    case actionTypes.SET_ALL_USER_LIST:
      return updateObject(state, { allUserList: action.value });
    case actionTypes.SET_ALBUM_LIST_TOTAL_PAGES:
      return updateObject(state, { totalPages: action.value });
    case actionTypes.SET_ALBUM_LIST_CURRENT_PAGE:
      return updateObject(state, { currentPageNumber: action.value });
    default:
      return state;
  }
};

export default reducer;
