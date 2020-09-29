import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { ITEMS_PER_PAGE } from "../../utils/constants";
import { handleAlbumList, handleUserList } from "../../utils/public.api.helper";
import * as actions from "../../store/actions";
import loadingGIF from "../../assets/loadingGIF.gif";
import { Link } from "react-router-dom";

const AlbumList = (props) => {
  const {
    allAlbumList,
    allUserList,
    totalPages,
    currentPageNumber,
    setAllAlbumList,
    setAllUserList,
    setAlbumListTotalPages,
    setAlbumListCurrentPage,
  } = props;

  const [loadingState, setLoadingState] = useState(false); // Loadingstate Initial set empty
  const [currentAllAlbumList, setCurrentAllAlbumList] = useState([]);

  useEffect(() => {
    async function getAlbumListing() {
      setLoadingState(true);
      const albumList = await handleAlbumList();
      const userList = await handleUserList();
      setAllAlbumList(albumList);
      setAllUserList(userList);
      setAlbumListTotalPages(Math.ceil(albumList.length / ITEMS_PER_PAGE));
      setAlbumListCurrentPage(currentPageNumber);
      setCurrentAllAlbumList(
        albumList.slice(
          (currentPageNumber - 1) * ITEMS_PER_PAGE,
          currentPageNumber * ITEMS_PER_PAGE
        )
      );
      setLoadingState(false);
    }
    getAlbumListing();
  }, []);

  const getSelectedPageData = (pageNumber = 1) => {
    setAlbumListCurrentPage(pageNumber);
    setCurrentAllAlbumList(
      allAlbumList.slice(
        (pageNumber - 1) * ITEMS_PER_PAGE,
        pageNumber * ITEMS_PER_PAGE
      )
    );
  };

  const getUserName = (userId) => {
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
                "page-item " + (currentPageNumber === 1 ? "disabled" : "")
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
                  "page-item " +
                  (currentPageNumber === pageNumber ? "active disabled" : "")
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

  const renderAlbumList = () => {
    if (Boolean(currentAllAlbumList.length)) {
      return (
        <div>
          {currentAllAlbumList.map((data) => (
            <div
              key={`${data.userId} ${data.id}`}
              style={{ minHeight: "100px" }}
            >
              <h1>Album Title {data.title}</h1>
              <div style={{ display: "flex" }}>
                <p>User {getUserName(data.userId)}</p>
                <Link to={`albums/${data.id}`}>View More</Link>
              </div>
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
            <h1>List of Albums</h1>
          </div>
          {renderAlbumList()}
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
    allAlbumList: state.albumList.allAlbumList,
    allUserList: state.albumList.allUserList,
    totalPages: state.albumList.totalPages,
    currentPageNumber: state.albumList.currentPageNumber,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setAllAlbumList: (value) => dispatch(actions.setAllAlbumList(value)),
    setAllUserList: (value) => dispatch(actions.setAllUserList(value)),
    setAlbumListTotalPages: (value) =>
      dispatch(actions.setAlbumListTotalPages(value)),
    setAlbumListCurrentPage: (value) =>
      dispatch(actions.setAlbumListCurrentPage(value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AlbumList);
