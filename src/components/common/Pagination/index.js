import React from "react";
import { getPageList } from "../../../utils/constants";

const Pagination = (props) => {
  const { currentPageNumber, totalPages, getSelectedPageData } = props;

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
          {getPageList(currentPageNumber, totalPages).map((pageNumber) => (
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
                  currentPageNumber === totalPages ? "not-allowed" : "pointer",
              }}
              onClick={() => getSelectedPageData(currentPageNumber + 1)}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
