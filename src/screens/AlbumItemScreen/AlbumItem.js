import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { ITEMS_PER_PAGE } from "../../utils/constants";
import {
  handleAlbumItemList,
  handleAlbumPhotosList,
  handleUserList,
} from "../../utils/public.api.helper";
import * as actions from "../../store/actions";
import loadingGIF from "../../assets/loadingGIF.gif";
import "./style.css";

const getAlbumId = () => {
  const location = window.location.pathname.split("/");
  return location[location.length - 1];
};

const AlbumItem = (props) => {
  const {
    albumItem,
    albumPhotos,
    allUserList,
    totalPages,
    currentPageNumber,
    setAlbumItem,
    setAlbumPhotos,
    setAllUserList,
    setAlbumItemTotalPages,
    setAlbumItemCurrentPage,
  } = props;

  const [loadingState, setLoadingState] = useState(false); // Loadingstate Initial set empty
  const [currentAlbumPhotos, setCurrentAlbumPhotos] = useState([]);

  console.log(currentAlbumPhotos);

  useEffect(() => {
    async function getAlbumListing() {
      const albumId = getAlbumId();
      setLoadingState(true);
      const albumData = await handleAlbumItemList(albumId);
      const photosList = await handleAlbumPhotosList(albumId);
      const userList = await handleUserList();
      setAlbumItem(albumData);
      setAlbumPhotos(photosList);
      setAllUserList(userList);
      setAlbumItemTotalPages(Math.ceil(photosList.length / ITEMS_PER_PAGE));
      setAlbumItemCurrentPage(currentPageNumber);
      setCurrentAlbumPhotos(photosList.slice(0, ITEMS_PER_PAGE));
      setLoadingState(false);
    }
    getAlbumListing();
    return () => {
      // resetState();
    };
  }, []);

  const getSelectedPageData = (pageNumber = 1) => {
    setAlbumItemCurrentPage(pageNumber);
    setCurrentAlbumPhotos(
      albumPhotos.slice(
        (pageNumber - 1) * ITEMS_PER_PAGE,
        pageNumber * ITEMS_PER_PAGE
      )
    );
  };

  const getUserName = (userId) => {
    if (userId === null || userId === undefined) {
      return "";
    }
    const user = allUserList.find((userObj) => userObj.id === userId);
    return !!user.name ? user.name : "";
  };

  const getPageList = () => {
    if (currentPageNumber === 1) {
      return [1, 2, 3];
    }
    if (currentPageNumber === totalPages) {
      return [currentPageNumber - 2, currentPageNumber - 1, currentPageNumber];
    }
    return [currentPageNumber - 1, currentPageNumber, currentPageNumber + 1];
  };

  const renderPagination = () => {
    return (
      <div>
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            <li
              className={
                "page-item " + currentPageNumber === 1 ? "disabled" : ""
              }
            >
              <button
                className={"page-link"}
                disabled={currentPageNumber === 1}
                style={{
                  cursor: currentPageNumber === 1 ? "not-allowed" : "pointer",
                }}
                onClick={() => getSelectedPageData(currentPageNumber - 1)}
              >
                Previous
              </button>
            </li>
            {getPageList().map((pageNumber) => (
              <li
                className={
                  "page-item " + (currentPageNumber === pageNumber)
                    ? "disabled"
                    : ""
                }
                key={pageNumber}
              >
                <button
                  className="page-link"
                  disabled={currentPageNumber === pageNumber}
                  style={{
                    cursor:
                      currentPageNumber === pageNumber
                        ? "not-allowed"
                        : "pointer",
                  }}
                  onClick={() => getSelectedPageData(pageNumber)}
                >
                  {pageNumber}
                </button>
              </li>
            ))}
            <li
              className={
                "page-item " + (currentPageNumber === totalPages)
                  ? "disabled"
                  : ""
              }
            >
              <button
                className="page-link"
                disabled={currentPageNumber === totalPages}
                style={{
                  cursor:
                    currentPageNumber === totalPages
                      ? "not-allowed"
                      : "pointer",
                }}
                onClick={() => getSelectedPageData(currentPageNumber - 1)}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    );
  };

  const renderPhotosList = () => {
    console.log(albumItem);
    if (Boolean(currentAlbumPhotos.length)) {
      return (
        <div className="photos-list">
          {currentAlbumPhotos.map((data) => (
            <div
              key={`${data.userId} ${data.id}`}
              style={{ height: "150px", width: "150px" }}
            >
              <img src={`${data.thumbnailUrl}.png`} alt="thumbnail" />
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  const checkNullOrUndefined = (value) => {
    if (value === null || value === undefined) {
      return "";
    }
    return value;
  };

  return (
    <div className="container-fluid">
      {!loadingState ? (
        <React.Fragment>
          <div>
            <h1>Album Title {checkNullOrUndefined(albumItem.title)}</h1>
            <p>
              Uploaded By :{" "}
              {checkNullOrUndefined(getUserName(albumItem.userId))}
            </p>
          </div>
          {renderPhotosList()}
          {renderPagination()}
        </React.Fragment>
      ) : (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
          }}
        >
          <img src={loadingGIF} alt={"loading"} />
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    albumItem: state.albumItem.albumItem,
    albumPhotos: state.albumItem.albumPhotos,
    allUserList: state.albumList.allUserList,
    totalPages: state.albumItem.totalPages,
    currentPageNumber: state.albumItem.currentPageNumber,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setAlbumItem: (value) => dispatch(actions.setAlbumItem(value)),
    setAlbumPhotos: (value) => dispatch(actions.setAlbumPhotos(value)),
    setAllUserList: (value) => dispatch(actions.setAllUserList(value)),
    setAlbumItemTotalPages: (value) =>
      dispatch(actions.setAlbumItemTotalPages(value)),
    setAlbumItemCurrentPage: (value) =>
      dispatch(actions.setAlbumItemCurrentPage(value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AlbumItem);
