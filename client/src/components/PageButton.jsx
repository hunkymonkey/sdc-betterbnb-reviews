import React from 'react';
import styles from '../styles/index.css';

var PageButton = (props) => {
  return (
    <li className = {props.page === props.currentPage ? styles.currentPage : styles.pageButton}>
      <button onClick = {() => props.setPage(props.page)}><div>{props.page}</div></button>
    </li>
  )
}

module.exports.PageButton = PageButton;