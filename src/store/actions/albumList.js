import * as actionTypes from "./actionTypes";

export const setAllAlbumList = (value) => {
  return {
    type: actionTypes.SET_ALL_ALBUM_LIST,
    value,
  };
};

export const setAllUserList = (value) => {
  return {
    type: actionTypes.SET_ALL_USER_LIST,
    value,
  };
};

export const setAlbumListTotalPages = (value) => {
  return {
    type: actionTypes.SET_ALBUM_LIST_TOTAL_PAGES,
    value,
  };
};

export const setAlbumListCurrentPage = (value) => {
  return {
    type: actionTypes.SET_ALBUM_LIST_CURRENT_PAGE,
    value,
  };
};
