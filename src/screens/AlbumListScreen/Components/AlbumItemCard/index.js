import React from "react";
import { Link } from "react-router-dom";

import "./style.css";

const AlbumItemCard = (props) => {
  const { albumItemData, allUserList } = props;

  const getUserName = (userId) => {
    const user = allUserList.find((userObj) => userObj.id === userId);
    return !!user.name ? user.name : "";
  };

  return (
    <div className="card">
      <h3>Album Title : {albumItemData.title}</h3>
      <div className="d-flex justify-content-between">
        <p>User : {getUserName(albumItemData.userId)}</p>
        <Link className="link" to={`albums/${albumItemData.id}`}>
          View More
        </Link>
      </div>
    </div>
  );
};

export default AlbumItemCard;
