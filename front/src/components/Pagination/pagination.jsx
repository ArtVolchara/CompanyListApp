import React /*, { useState, useEffect }*/ from 'react';
import Pagination from "react-js-pagination";

import './pagination.css';
import { connect } from 'react-redux';

class MyPagination extends React.Component {
    render() {
        let pageRangeDisplayed = 5;
        return (
            this.props.allPeopleCount <= pageRangeDisplayed
                ? <></>
                : <Pagination
                    hideDisabled
                    hideFirstLastPages={false}
                    hideNavigation={false}
                    activePage={this.props.activePage}
                    itemsCountPerPage={this.props.limit}
                    totalItemsCount={this.props.allCompaniesCount}
                    pageRangeDisplayed={pageRangeDisplayed}
                    onChange={(pageNumber) => this.props.handlePageChange(pageNumber)}
                    prevPageText="Prev"
                    firstPageText="First"
                    nextPageText="Next"
                    lastPageText="Last"
                    innerClass='paginationBar'
                    itemClass='page-item'
                    activeLinkClass='active page-item'
                />
        )
    }
}

function mapStateToProps(store) {
    // console.log("mapStateToProps", props);
    return {
        activePage: store.activePage,
        allCompaniesCount: store.allCompaniesCount,
        limit: store.limit,
    }
}

export default connect(mapStateToProps, null)(MyPagination)