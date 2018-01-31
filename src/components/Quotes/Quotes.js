import React from 'react'
import { connect } from 'react-redux'
import './Quotes.css'
// import { Link } from 'react-router-dom'
// import { getQuotes } from '../../ducks/quotesReducer'

const Quotes = ({ quotes }) => {
    console.log(quotes)
    const quoteDiv = quotes && quotes.map((e, i) => (
            <div className='quoteDiv' key={e.id}>
                <h3>{e.info} quote</h3>
                <p>{e.source} author </p>
                <p>{e.id} id </p>
        </div>
    ))
console.log(quoteDiv)
    return (

        <div>
            {quotes.length > 0 ?
                <div>
                    show quotes here
                    {quoteDiv}
                </div> : <div> nothing </div>} </div>
    )
}
    

const mapStateToProps = state => ({
    quotes: state.quotes
})

export default connect(mapStateToProps)(Quotes)