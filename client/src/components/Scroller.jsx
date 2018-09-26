import React from 'react';
import styles from '../styles/index.css';
import { PageButton } from './PageButton.jsx';

class Scroller extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      page: 1,
    }

    this.setCurrentPage = this.setCurrentPage.bind(this);
    this.previousButton = this.previousButton.bind(this);
    this.nextButton = this.nextButton.bind(this);

  }
  
  setCurrentPage(num) {
    this.setState({page: num,}, () => {
      this.render();
    });
    this.props.setNewComments(num);
  }

  previousButton() {
    let pageNum = this.state.page - 1;
    this.setState({page: pageNum} , () => {
      this.render();
    })
    this.props.setNewComments(pageNum);
  }

  nextButton() {
    let pageNum = this.state.page + 1;
    this.setState({page: pageNum} , () => {
      this.render();
    })
    this.props.setNewComments(pageNum);
  }

  render() {
    if (this.props.pages) {
      return (
        <div className = {styles.scroller}>
          <ul className = {styles.scrollerList}>
            {this.state.page !== 1 ? <li className = {styles.lastButton}><button onClick = {this.previousButton}><div><div className = {styles.buttonInterior}><svg viewBox="0 0 18 18" role="img" aria-label="Previous" focusable="false"><path d="m13.7 16.29a1 1 0 1 1 -1.42 1.41l-8-8a1 1 0 0 1 0-1.41l8-8a1 1 0 1 1 1.42 1.41l-7.29 7.29z" fillRule="evenodd"></path></svg></div></div></button></li> : null}
            {this.props.pages.map((page) => {
              if ((this.state.page === 1 && page[0] === 3) || page[0] === 1 || (page[0] > this.state.page - 2 && page[0] < this.state.page + 2) || page[0] === this.props.pages.length || (this.state.page === this.props.pages.length && page[0] === this.props.pages.length - 2)) {
                return <PageButton key = {page[0]} page = {page[1]} setPage = {this.setCurrentPage} currentPage = {this.state.page}/>
              }
            })}
            {this.state.page !== this.props.pages.length ? <li className = {styles.nextButton}><button onClick = {this.nextButton}><div><div className = {styles.buttonInterior}><svg viewBox="0 0 18 18" role="img" aria-label="Next" focusable="false"><path d="m4.29 1.71a1 1 0 1 1 1.42-1.41l8 8a1 1 0 0 1 0 1.41l-8 8a1 1 0 1 1 -1.42-1.41l7.29-7.29z" fillRule="evenodd"></path></svg></div></div></button></li> : null}
          </ul>
        </div>
      )
    } else {
      return (
        <div>loading...</div>
      )
    }
  }
}

module.exports.Scroller = Scroller;