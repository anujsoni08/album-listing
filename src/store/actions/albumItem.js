import * as actionTypes from "./actionTypes";

export const setAlbumItem = (value) => {
  return {
    type: actionTypes.SET_ALBUM_ITEM,
    value,
  };
};

export const setAlbumPhotos = (value) => {
  return {
    type: actionTypes.SET_ALBUM_PHOTOS,
    value,
  };
};

export const setAlbumItemTotalPages = (value) => {
  return {
    type: actionTypes.SET_ALBUM_ITEM_TOTAL_PAGES,
    value,
  };
};

export const setAlbumItemCurrentPage = (value) => {
  return {
    type: actionTypes.SET_ALBUM_ITEM_CURRENT_PAGE,
    value,
  };
};
