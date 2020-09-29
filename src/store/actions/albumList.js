import * as actionTypes from "./actionTypes";

export const setAllAlbumList = (albumList) => {
  return {
    type: actionTypes.SET_ALL_ALBUM_LIST,
    value: albumList,
  };
};

export const setAllUserList = (userList) => {
  return {
    type: actionTypes.SET_ALL_USER_LIST,
    value: userList,
  };
};

export const setAlbumListTotalPages = (totalPages) => {
  return {
    type: actionTypes.SET_ALBUM_LIST_TOTAL_PAGES,
    value: totalPages,
  };
};

export const setAlbumListCurrentPageNumber = (pageNumber) => {
  return {
    type: actionTypes.SET_ALBUM_LIST_CURRENT_PAGE,
    value: pageNumber,
  };
};
