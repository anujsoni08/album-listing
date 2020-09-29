import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { ITEMS_PER_PAGE } from "../../utils/constants";
import {
  handleAlbumItemList,
  handleAlbumPhotosList,
  handleUserList,
} from "../../utils/public.api.helper";
import * as actions from "../../store/actions";
import "./style.css";
import Loading from "../../components/common/Loading";
import Pagination from "../../components/common/Pagination";

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
    setAlbumItemCurrentPageNumber,
  } = props; // getting current state and reducer functions from store

  const [loadingState, setLoadingState] = useState(false); // loadingstate Initial set false
  const [currentAlbumPhotos, setCurrentAlbumPhotos] = useState([]); // currentAlbumPhotos initially empty array

  useEffect(() => {
    const getAlbumListing = async () => {
      setLoadingState(true); // loading set true
      const albumId = getAlbumId(); // getting albumId from url
      const albumItemObj = await handleAlbumItemList(albumId); // fetching albumItemObj using albumId
      const photosList = await handleAlbumPhotosList(albumId); // fetching photosList using albumId
      const userList = await handleUserList(); // fetching userList
      setAlbumItem(albumItemObj); // updating albumItemObj in store
      setAlbumPhotos(photosList); // updating photosList in store
      setAllUserList(userList); // updating userList in store
      setAlbumItemTotalPages(Math.ceil(photosList.length / ITEMS_PER_PAGE)); // updating total pages in store
      setAlbumItemCurrentPageNumber(currentPageNumber); // updating current pages in store
      setCurrentAlbumPhotos(
        // setting currentPageData
        photosList.slice(
          (currentPageNumber - 1) * ITEMS_PER_PAGE,
          currentPageNumber * ITEMS_PER_PAGE
        )
      );
      setLoadingState(false); // loading set false
    };
    getAlbumListing();
  }, []);

  // getting pageWiseData
  const getSelectedPageData = (pageNumber = 1) => {
    setAlbumItemCurrentPageNumber(pageNumber);
    setCurrentAlbumPhotos(
      albumPhotos.slice(
        (pageNumber - 1) * ITEMS_PER_PAGE,
        pageNumber * ITEMS_PER_PAGE
      )
    );
  };

  // getting userName from userList by matching userId
  const getUserName = (userId) => {
    if (userId === null || userId === undefined) {
      return "";
    }
    const user = allUserList.find((userObj) => userObj.id === userId);
    return !!user.name ? user.name : "";
  };

  // rendering pagination
  const renderPagination = () => {
    return (
      <div className="pagination-div">
        <Pagination
          currentPageNumber={currentPageNumber}
          totalPages={totalPages}
          getSelectedPageData={getSelectedPageData}
        />
      </div>
    );
  };

  // rendering photos list
  const renderPhotosList = () => {
    if (Boolean(currentAlbumPhotos.length)) {
      return (
        <div className="photos-list">
          {currentAlbumPhotos.map((data) => (
            <div key={`${data.userId} ${data.id}`}>
              <img
                className="image"
                src={`${data.thumbnailUrl}.png`}
                alt="thumbnail"
              />
              <p>{data.title}</p>
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
    <div className="container-fluid text-center">
      {!loadingState ? (
        <React.Fragment>
          <div>
            <h1>{checkNullOrUndefined(albumItem.title)}</h1>
            <p>
              Uploaded By :{" "}
              {checkNullOrUndefined(getUserName(albumItem.userId))}
            </p>
          </div>
          {renderPhotosList()}
          {renderPagination()}
        </React.Fragment>
      ) : (
        <Loading />
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
    setAlbumItem: (albumItemObj) =>
      dispatch(actions.setAlbumItem(albumItemObj)),
    setAlbumPhotos: (photosList) =>
      dispatch(actions.setAlbumPhotos(photosList)),
    setAllUserList: (userList) => dispatch(actions.setAllUserList(userList)),
    setAlbumItemTotalPages: (totalPages) =>
      dispatch(actions.setAlbumItemTotalPages(totalPages)),
    setAlbumItemCurrentPageNumber: (pageNumber) =>
      dispatch(actions.setAlbumItemCurrentPageNumber(pageNumber)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AlbumItem);
