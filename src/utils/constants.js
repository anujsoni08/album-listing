export const ITEMS_PER_PAGE = 5;

export const getPageList = (currentPageNumber, totalPages) => {
  if (currentPageNumber === 1) {
    return [1, 2, 3];
  }
  if (currentPageNumber === totalPages) {
    return [currentPageNumber - 2, currentPageNumber - 1, currentPageNumber];
  }
  return [currentPageNumber - 1, currentPageNumber, currentPageNumber + 1];
};
