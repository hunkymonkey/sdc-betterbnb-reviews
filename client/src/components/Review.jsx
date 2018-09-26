import React from 'react';
import styles from '../styles/index.css';

var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

var Review = ({comment}) => {
  return (
    <div className = {styles.review}>
      <div className = {styles.commentHeader}>
        <div className = {styles.commentImage}><img src = {comment.ImageUrl} ></img></div>
        <div className = {styles.commentMeta}>
          <p className = {styles.reviewName}>{comment.Name}</p>
          <p className = {styles.reviewDate}>{monthNames[Number(comment.Date.slice(5,7) - 1)] + ' ' + comment.Date.slice(0,4)}</p>
        </div>
      </div>
      <p>{comment.Text}</p>
    </div>
  )
}

module.exports.Review = Review;