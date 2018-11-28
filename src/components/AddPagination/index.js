import React, { Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';

export class AddPagination extends Component {

  static defaultProps = {
    defaultPageNumber: 1,
    total: 0,
    defaultRecordsPerPage: 2
  };


  calculateTotalPageCount = (pageSize) => {
    if (typeof pageSize === 'undefined') { 
      pageSize = this.pageSize; 
    }
    return Math.floor((this.props.total - 1) / pageSize) + 1;
  }

  validatePageNumber = (pageNumber) => {
    function isInteger(value) {
      return typeof value === 'number' && isFinite(value) && Math.floor(value) === value;
    }
    return isInteger(pageNumber) && pageNumber >= 1 && pageNumber !== this.props.currentPageNumber;
  }

  changePage = (pageNumber) => {

    if (this.validatePageNumber(pageNumber)) {
      
      let pageCount = this.calculateTotalPageCount();
      pageNumber = (pageNumber > pageCount) ?  pageCount : pageNumber;
      this.props.onChange(pageNumber, this.pageSize);
      return pageNumber;

    }
    return this.current;

  }

  render () {
    

    let { total, currentPageNumber, defaultPageNumber, recordsPerPage, defaultRecordsPerPage } = this.props;
    
    this.current = currentPageNumber ? currentPageNumber : defaultPageNumber;
    this.pageSize = recordsPerPage ? recordsPerPage : defaultRecordsPerPage;
    

    if ( total <= 2 ) { return null }

    let pageCount = this.calculateTotalPageCount();
    
    let start = 1;
    let end = pageCount;

    let pageList = []
    for (let i = start; i <= end; i++) {
      const active = this.current === i;
      pageList.push(
        <li className={classnames({active})} key={i} 
        onClick={()=> { this.changePage(i); }} >
          <a >{i}</a>
        </li>
      );
    }
    return (
      <nav className="nav-justified text-center navbar-default">
      <ul className="pagination ">
        {pageList}
      </ul>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return state
}

AddPagination.propTypes = {
  currentPageNumber: PropTypes.number,
  defaultPageNumber: PropTypes.number,
  total: PropTypes.number,
  recordsPerPage: PropTypes.number,
  defaultRecordsPerPage: PropTypes.number
}

export default connect(mapStateToProps, { })(AddPagination)


