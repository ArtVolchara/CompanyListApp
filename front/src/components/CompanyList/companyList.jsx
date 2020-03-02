import React from 'react';
import { connect } from 'react-redux';
import { getCompaniesFetchAC, setActivePageAC } from '../../redux/actions/actions'

import MyPagination from '../Pagination/pagination'
import CompanyAccordion from './CompanyAccordion/CompanyAccordion'

class CompanyList extends React.PureComponent {
  async componentDidMount() {
    console.log("mount");
    await this.props.getCompaniesFetch(this.props.activePage)
  }
  componentDidUpdate(prevProps) {
    if (prevProps.activePage !== this.props.activePage) {
      this.props.getCompaniesFetch(this.props.activePage, this.props.allCompaniesCount)
    }
  };
  handlePageChange = (pageNumber) => {
    this.props.setActivePage(pageNumber)
  };
  render() {
    console.log("render");
    return (
      <>
        <CompanyAccordion companies={this.props.companies} />
        <MyPagination handlePageChange={this.handlePageChange} />
      </>
    )
  }
}

function mapStateToProps(store) {
  return {
    activePage: store.activePage,
    companies: store.companies,
    allCompaniesCount: store.allCompaniesCount,
    getCompaniesLoadingFetch: store.getCompaniesLoadingFetch,
    getCompaniesError: store.getCompaniesError,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setActivePage: (activePage) => dispatch(setActivePageAC(activePage)),
    getCompaniesFetch: data => dispatch(getCompaniesFetchAC(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CompanyList)