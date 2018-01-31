import axios from 'axios'

const initialState = {
    quotes: [],
    searchQuotes: [],
    singleQuote: [],
}

const GET_QUOTES = 'GET_QUOTES'
const GET_SEARCH_RESULTS = 'GET_SEARCH_RESULTS'
const SINGLE_QUOTE = 'GET_SINGLE_QUOTE'

export const getQuotes = () => {
    let results
    // console.log(results)
    
        results = axios.get('/api/quotes').then(res => res.data).catch(console.log)
        console.log(results)
      return {
        type: GET_QUOTES,
        payload: results,
    }
    }

    

export const searchQuotes = (quotes, query) => {
    let searchResults;
    if (quotes.length > 0) {
        searchResults = quotes.filter((e) => {
            if (e.source) {
                return e.source.toLowerCase().indexOf(query.toLowerCase()) > -1
            }
        })
    }
    return {
        type: GET_SEARCH_RESULTS,
        payload: searchResults,
    }
}

export const getSingleQuote = (id, quotes) => {
    let quote = quotes.filter((e) => {
        if (e.id === id) {
            return e
        }
    })
    return {
        type: SINGLE_QUOTE,
        payload: quote,
    }
}

export default function reducer(state = initialState, action) {
    const { payload, type } = action
    switch (type) {
        case `${GET_QUOTES}_FULFILLED`:
            return { ...state, quotes: payload }
        case `${GET_SEARCH_RESULTS}`:
            return { ...state, searchQuotes: payload }
        case `${SINGLE_QUOTE}`:
            return { ...state, singleQuote: payload }
        default:
            return state
    }
}