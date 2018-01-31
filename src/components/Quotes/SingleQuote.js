import React from 'react'
import { connect } from 'react-redux'

const SingleQuote = ({quotes,match}) => {
    const whichQuote = quotes.filter((e) => {
        if (e.id === (match.params.id *1)) {
            return e
        }
    })
    return (
        <div>
            {whichQuote.length > 0 ?
            <div>
                <h3>{whichQuote[0].info}</h3>
                <p>{whichQuote[0].source}</p>
            </div>:
        <p>no quote</p>}
        </div>
    )
}

const mapStateToProps = state => ({
    quotes: state.quotes
})

export default connect(mapStateToProps)(SingleQuote)