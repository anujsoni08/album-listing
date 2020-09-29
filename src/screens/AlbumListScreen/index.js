import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { ITEMS_PER_PAGE } from "../../utils/constants";
import { handleAlbumList, handleUserList } from "../../utils/public.api.helper"; // import API call methods
import * as actions from "../../store/actions"; // importing actions
import AlbumItemCard from "./Components/AlbumItemCard"; // importing common component for AlbumItem
import Loading from "../../components/common/Loading"; // Display Loading spinner while data is being fetched.
import Pagination from "../../components/common/Pagination";
import "./style.css";

const AlbumList = (props) => {
  const {
    allAlbumList,
    allUserList,
    totalPages,
    currentPageNumber,
    setAllAlbumList,
    setAllUserList,
    setAlbumListTotalPages,
    setAlbumListCurrentPageNumber,
  } = props; // imported props from redux store

  const [loadingState, setLoadingState] = useState(false); // loadingstate Initial set false
  const [currentAllAlbumList, setCurrentAllAlbumList] = useState([]); //  currentAlbumList Initial set empty array

  useEffect(() => {
    const getAlbumListing = async () => {
      setLoadingState(true); // loading set true
      const albumList = await handleAlbumList(); // fetching albumList
      const userList = await handleUserList(); // fetching userList
      setAllAlbumList(albumList); // updating albumList in store
      setAllUserList(userList); // updating userList in store
      setAlbumListTotalPages(Math.ceil(albumList.length / ITEMS_PER_PAGE)); // updating totalPages in store
      setAlbumListCurrentPageNumber(currentPageNumber); // updating currentPageNumber in store
      setCurrentAllAlbumList(
        // setting currentPageData
        albumList.slice(
          (currentPageNumber - 1) * ITEMS_PER_PAGE,
          currentPageNumber * ITEMS_PER_PAGE
        )
      );
      setLoadingState(false); // loading set false
    };
    getAlbumListing();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // getting pageWiseData
  const getSelectedPageData = (pageNumber = 1) => {
    setAlbumListCurrentPageNumber(pageNumber);
    setCurrentAllAlbumList(
      allAlbumList.slice(
        (pageNumber - 1) * ITEMS_PER_PAGE,
        pageNumber * ITEMS_PER_PAGE
      )
    );
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

  // rendering albumList
  const renderAlbumList = () => {
    if (Boolean(currentAllAlbumList.length)) {
      return (
        <div>
          {currentAllAlbumList.map((data) => (
            <div
              key={`${data.userId} ${data.id}`}
              style={{ minHeight: "100px" }}
            >
              <AlbumItemCard albumItemData={data} allUserList={allUserList} />
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="container-fluid">
      {!loadingState ? (
        <React.Fragment>
          <h1 className="text-center">List of Albums</h1>
          {renderAlbumList()}
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
    allAlbumList: state.albumList.allAlbumList,
    allUserList: state.albumList.allUserList,
    totalPages: state.albumList.totalPages,
    currentPageNumber: state.albumList.currentPageNumber,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setAllAlbumList: (albumList) =>
      dispatch(actions.setAllAlbumList(albumList)),
    setAllUserList: (userList) => dispatch(actions.setAllUserList(userList)),
    setAlbumListTotalPages: (totalPages) =>
      dispatch(actions.setAlbumListTotalPages(totalPages)),
    setAlbumListCurrentPageNumber: (pageNumber) =>
      dispatch(actions.setAlbumListCurrentPageNumber(pageNumber)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AlbumList);
