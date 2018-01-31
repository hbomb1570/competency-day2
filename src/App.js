import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux'
import { getQuotes } from './ducks/quotesReducer'
import { withRouter } from 'react-router-dom'
import router from './router'
// import PropTypes from 'prop-types'

class App extends Component {
  
componentDidMount() {
  // axios.get(/api/quotes).then(res => {
  //   res.status(200).send(res)
  // })
  this.props.getQuotes(this.props.quotes)
}
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Competency Day 2</h1>
        </header>

        {router}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  quotes: state.quotes
})

// const mapDispatchToProps = (dispatch) => {
//   return ({
//     sendQuotes: (quotes) =>{dispatch('GET_QUOTES')} }
//   )
// }

export default withRouter(connect(mapStateToProps, {getQuotes })(App));
