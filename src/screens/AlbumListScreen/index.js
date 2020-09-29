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

  const [loadingState, setLoadingState] = useState(false); // Loadingstate Initial set empty
  const [currentAllAlbumList, setCurrentAllAlbumList] = useState([]); // CurrentAlbumList

  useEffect(() => {
    const getAlbumListing = async () => {
      setLoadingState(true);
      const albumList = await handleAlbumList();
      const userList = await handleUserList();
      setAllAlbumList(albumList);
      setAllUserList(userList);
      setAlbumListTotalPages(Math.ceil(albumList.length / ITEMS_PER_PAGE));
      setAlbumListCurrentPageNumber(currentPageNumber);
      setCurrentAllAlbumList(
        albumList.slice(
          (currentPageNumber - 1) * ITEMS_PER_PAGE,
          currentPageNumber * ITEMS_PER_PAGE
        )
      );
      setLoadingState(false);
    };
    getAlbumListing();
  }, []);

  const getSelectedPageData = (pageNumber = 1) => {
    setAlbumListCurrentPageNumber(pageNumber);
    setCurrentAllAlbumList(
      allAlbumList.slice(
        (pageNumber - 1) * ITEMS_PER_PAGE,
        pageNumber * ITEMS_PER_PAGE
      )
    );
  };

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
