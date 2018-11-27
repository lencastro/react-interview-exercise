import React, { Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';



class AddPagination extends Component {

  static defaultProps = {
    defaultPageNumber: 1,
    total: 0,
    defaultRecordsPerPage: 2
  };

  constructor(props) {
    super(props);

    let { currentPageNumber , defaultPageNumber ,recordsPerPage, defaultRecordsPerPage } = this.props;
    let current = currentPageNumber ? currentPageNumber : defaultPageNumber;
    let pageSize = recordsPerPage ? recordsPerPage : defaultRecordsPerPage;

    this.state = {
      current,
      pageSize
    };

    
  }

  calculateTotalPageCount = (pageSize) => {
    
    if (typeof pageSize === 'undefined') { 
      pageSize = this.state.pageSize; 
    }
    
    return Math.floor((this.props.total - 1) / pageSize) + 1;
  }

  validatePageNumber = (pageNumber) => {
    function isInteger(value) {
      return typeof value === 'number' && isFinite(value) && Math.floor(value) === value;
    }
    return isInteger(pageNumber) && pageNumber >= 1 && pageNumber !== this.state.current;
  }

  changePage = (pageNumber) => {

    if (this.validatePageNumber(pageNumber)) {

      let pageCount = this.calculateTotalPageCount();
      pageNumber = (pageNumber > pageCount) ?  pageCount : pageNumber;

      this.setState({ current: pageNumber });

      this.props.onChange(pageNumber, this.state.pageSize);

      return pageNumber

    }
    return this.state.current

  }

  render () {
    let { total } = this.props;
    let { current } = this.state

    if ( total <= 2 ) { return null }

    let pageCount = this.calculateTotalPageCount();
    
    const prevPage = current - 1 > 1 ? current - 1 : 1;
    const nextPage = current + 1 < pageCount ? current + 1 : pageCount;
    
    let start = 1;
    let end = pageCount;

    let pageList = []
    for (let i = start; i <= end; i++) {
      const active = current === i;
      pageList.push(
        <li className={classnames({active})} key={i} 
        onClick={()=> { this.changePage(i)}} >
          <a href="#">{i}</a>
        </li>
      );
    }
    return (
      <nav className="nav-justified text-center">
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


