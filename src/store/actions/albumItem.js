import * as actionTypes from "./actionTypes";

export const setAlbumItem = (albumItemObj) => {
  return {
    type: actionTypes.SET_ALBUM_ITEM,
    value: albumItemObj,
  };
};

export const setAlbumPhotos = (photosList) => {
  return {
    type: actionTypes.SET_ALBUM_PHOTOS,
    value: photosList,
  };
};

export const setAlbumItemTotalPages = (totalPages) => {
  return {
    type: actionTypes.SET_ALBUM_ITEM_TOTAL_PAGES,
    value: totalPages,
  };
};

export const setAlbumItemCurrentPageNumber = (pageNumber) => {
  return {
    type: actionTypes.SET_ALBUM_ITEM_CURRENT_PAGE,
    value: pageNumber,
  };
};
