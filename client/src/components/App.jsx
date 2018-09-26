import React from 'react';
import axios from 'axios'
import { Review } from './Review.jsx';
import { Scroller } from './Scroller.jsx';
import styles from '../styles/index.css';
import StarRatings from 'react-star-ratings';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      comments: [],
      displayedComments: [],
      pages: null,
      searchVal: '',
      overallRev: null,
      accuracyRev: null,
      communicationRev: null,
      cleanlinessRev: null,
      locationRev: null,
      checkinRev: null,
      valueRev: null,
      searchSelected: false,
    }
    
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fetch = this.fetch.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.setAccRev = this.setAccRev.bind(this);
    this.setCommRev = this.setCommRev.bind(this);
    this.setCheckinRev = this.setCheckinRev.bind(this);
    this.setCleanRev = this.setCleanRev.bind(this);
    this.setValueRev = this.setValueRev.bind(this);
    this.setLocatRev = this.setLocatRev.bind(this);
    this.setOverallRev = this.setOverallRev.bind(this);
    this.setInitialComments = this.setInitialComments.bind(this);
    this.setPages = this.setPages.bind(this);
    this.setNewComments = this.setNewComments.bind(this);
    this.handleSearchSelector = this.handleSearchSelector.bind(this);
  }

  componentDidMount() {
    this.fetch();
  }

  setInitialComments() {
    var setComments = [];
    for (let i = 0; i < 7; i++) {
      if (this.state.comments[i]) {
        setComments.push(this.state.comments[i]);
      };
    };
    this.setState({
      displayedComments: setComments,
    });
  }

  setNewComments(num) {
    var set = num - 1;
    var setComments = [];
    for (let i = (set * 7); i < ((set * 7) + 7); i++) {
      if (this.state.comments[i]) {
        setComments.push(this.state.comments[i]);
      };
    };
    this.setState({
      displayedComments: setComments,
    });
  }

  setPages() {
    var num = Math.ceil(this.state.comments.length / 7);
    var arr = [];
    for (let i = 1; i <= num; i++) {
      arr.push([i, i]);
    }
    this.setState({
      pages: arr,
    })
  }

  setAccRev() {
    var sum = 0;
    this.state.comments.forEach((comment) => {
      sum += comment.AccuracyRating
    })
    sum = sum / this.state.comments.length;
    this.setState({
      accuracyRev: sum,
    })
  }

  setCommRev() {
    var sum = 0;
    this.state.comments.forEach((comment) => {
      sum += comment.CommunicationRating
    })
    sum = sum / this.state.comments.length;
    this.setState({
      communicationRev: sum,
    })
  }

  setCheckinRev() {
    var sum = 0;
    this.state.comments.forEach((comment) => {
      sum += comment.CheckInRating
    })
    sum = sum / this.state.comments.length;
    this.setState({
      checkinRev: sum,
    })
  }

  setCleanRev() {
    var sum = 0;
    this.state.comments.forEach((comment) => {
      sum += comment.CleanlinessRating
    })
    sum = sum / this.state.comments.length;
    this.setState({
      cleanlinessRev: sum,
    })
  }

  setValueRev() {
    var sum = 0;
    this.state.comments.forEach((comment) => {
      sum += comment.ValueRating
    })
    sum = sum / this.state.comments.length;
    this.setState({
      valueRev: sum,
    })
  }

  setLocatRev() {
    var sum = 0;
    this.state.comments.forEach((comment) => {
      sum += comment.LocationRating
    })
    sum = sum / this.state.comments.length;
    this.setState({
      locationRev: sum,
    })
  }

  setOverallRev() {
    var sum = 0;
    this.state.comments.forEach((comment) => {
      sum += comment.AccuracyRating + comment.CheckInRating + comment.CleanlinessRating + comment.CommunicationRating + comment.LocationRating + comment.ValueRating;
    })
    sum = sum / this.state.comments.length / 6
    this.setState({
      overallRev: sum,
    })
  }

  fetch () {
    axios.get('http://localhost:3000/betterBnB/comments')
      .then((response) => {
        console.log(response);
        this.setState({
          comments: response.data,
        })
        this.setAccRev();
        this.setCheckinRev();
        this.setCleanRev();
        this.setCommRev();
        this.setLocatRev();
        this.setValueRev();
        this.setOverallRev();
        this.setInitialComments();
        this.setPages();
      })
      .catch((error) => {
        console.log(error);
      })
  }

  handleSearchChange(e) {
    this.setState({
      searchVal: e.target.value
    })
  };

  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state.searchVal);
    axios.post('http://localhost:3000/betterBnB/comments', {Text: this.state.searchVal, House: this.state.comments[0].House})
      .then((response) => {
        this.setState({
          comments: response.data,
        })
        this.setInitialComments();
        this.setPages();
      })
      .catch((error) => {
        console.log(error);
      });
    this.setState({
      searchVal: ''
    });
  };

  handleSearchSelector() {
    this.setState({
      searchSelected: !this.state.searchSelected,
    })
  }

  render() {
    return (
      <div className = {styles.app}>
        <div className = {styles.header}>
          <h2 className = {styles.title}>{this.state.comments.length} Reviews <nbsp/>
            <StarRatings
              rating={this.state.overallRev ? this.state.overallRev : 0}
              starRatedColor="rgb(0, 132, 137)"
              starEmptyColor='rgb(216, 216, 216)'
              numberOfStars={5}
              name='rating'
              starDimension = '17px'
              starSpacing = '2px'
            /> 
          </h2>
          <form className = {this.state.searchSelected ? styles.selectedSearch : styles.search} onSubmit = {this.handleSubmit}>
            <img className = {styles.magGlass} src = 'https://d2v9y0dukr6mq2.cloudfront.net/video/thumbnail/mCz7hqj/videoblocks-magnifying-glass-search-icon-in-and-out-animation-loop-black_hovv31ukf_thumbnail-full04.png' />
            <input className = {styles.searchBar} type = 'text' placeholder = 'Search reviews' value = {this.state.searchVal} onChange = {this.handleSearchChange} onFocus = {this.handleSearchSelector} onBlur = {this.handleSearchSelector}/>
          </form>
        </div>
        <div className = {styles.ratings}>
          <div className = {styles.leftRatings}>
            <div><div>Accuracy</div> <div>
              <StarRatings
                rating={this.state.accuracyRev ? this.state.accuracyRev : 0}
                starRatedColor="rgb(0, 132, 137)"
                starEmptyColor='rgb(216, 216, 216)'
                numberOfStars={5}
                name='rating'
                starDimension = '15px'
                starSpacing = '2px'
              />
            </div></div>
            <div><div>Communication</div> 
            <div>
              <StarRatings
                  rating={this.state.communicationRev ? this.state.communicationRev : 0}
                  starRatedColor="rgb(0, 132, 137)"
                  starEmptyColor='rgb(216, 216, 216)'
                  numberOfStars={5}
                  name='rating'
                  starDimension = '15px'
                  starSpacing = '2px'
                />
            </div>
            </div>
            <div><div>Cleanliness</div> 
            <div>
              <StarRatings
                rating={this.state.cleanlinessRev ? this.state.cleanlinessRev : 0}
                starRatedColor="rgb(0, 132, 137)"
                starEmptyColor='rgb(216, 216, 216)'
                numberOfStars={5}
                name='rating'
                starDimension = '15px'
                starSpacing = '2px'
              />
            </div>
            </div>
          </div>
          <div className = {styles.rightRatings}>
            <div><div>Location</div> 
            <div>
              <StarRatings
                  rating={this.state.locationRev ? this.state.locationRev : 0}
                  starRatedColor="rgb(0, 132, 137)"
                  starEmptyColor='rgb(216, 216, 216)'
                  numberOfStars={5}
                  name='rating'
                  starDimension = '15px'
                  starSpacing = '2px'
                />
              </div>
              </div>
            <div><div>Check-in</div> 
              <div>
                <StarRatings
                  rating={this.state.checkinRev ? this.state.checkinRev : 0}
                  starRatedColor="rgb(0, 132, 137)"
                  starEmptyColor='rgb(216, 216, 216)'
                  numberOfStars={5}
                  name='rating'
                  starDimension = '15px'
                  starSpacing = '2px'
                />
              </div></div>
            <div><div>Value</div> <div>
              <StarRatings
                rating={this.state.valueRev ? this.state.valueRev : 0}
                starRatedColor="rgb(0, 132, 137)"
                starEmptyColor='rgb(216, 216, 216)'
                numberOfStars={5}
                name='rating'
                starDimension = '15px'
                starSpacing = '2px'
              />
            </div></div>
          </div>
        </div>
        {this.state.displayedComments.map((comment) => {
          return <Review key = {comment._id} comment = {comment}/>
        })}
        <Scroller pages = {this.state.pages} setNewComments = {this.setNewComments}/>
      </div>
    )
  }
}

module.exports.App = App;