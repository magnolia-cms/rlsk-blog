import React from "react";


const Pagination = ({ pageInfo, onPageChange }) => {


    return (
        <div className="pagination">
            <button disabled={!pageInfo.hasPreviousPage} className="button"
                onClick={() => {
                    if (pageInfo.hasPreviousPage) onPageChange("previous");
                }}
            >&#8592;</button>

            <button disabled={!pageInfo.hasNextPage} className="button"
                onClick={() => {
                    if (pageInfo.hasNextPage) onPageChange("next");
                }}
            >&#8594;</button>

        </div>
    )

}

export default Pagination;