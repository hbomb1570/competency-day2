import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

class Home extends Component {
    constructor(props) {
        super(props)
        this.infoHandler = this.infoHandler.bind(this)
        this.sourceHandler = this.sourceHandler.bind(this)
        this.searchHandler = this.searchHandler.bind(this)
        this.deleteHandler = this.deleteHandler.bind(this)
        this.state = {
            quote_info: '',
            quote_source: '',
            search_input: '',
            delete_input: '',
            search_result: [],
        }
    }

    infoHandler(e) {
        this.setState({ quote_info: e.target.value })
    }

    sourceHandler(e) {
        this.setState({ quote_source: e.target.value })
    }

    searchHandler(e) {
        this.setState({ search_input: e.target.value })
    }

    deleteHandler(e) {
        this.setState({ delete_input: e.target.value })
    }


    addQuote(event) {
        event.preventDefault()
        axios.post('/api/quotes', { info: this.state.quote_info, source: this.state.quote_source }).then(res => {
            this.setState({
                quote_info: '',
                quote_source: '',
            })
        })
    }

    getQuote(event) {
        event.preventDefault()
        axios.post('/api/search', { search_input: this.state.search_input }).then(res => {
            this.setState({
                search_input: ''
            })
        })
    }

    deleteQuote(event) {
        event.preventDefault()
        axios.delete(`/api/quotes/${this.state.delete_input}`, { id: this.state.delete_input }).then(res => {
            this.setState({
                delete_input: '',
            })
        })
    }
    // componentDidMount() {
    //     axios.get
    // }

    render() {

        let homeDisplay = this.state.search_result.length > 0 ? (<div>
            <div>
                <form className='addForm' onSubmit={(event) => { this.addQuote(event) }}>
                    <input className='infoInput' type='text' onChange={this.infoHandler} value={this.state.quote_info} />
                    <input className='quoteSource' type='text' onChange={this.sourceHandler} value={this.state.quote_source} />
                    <button className='addButton'> Add Quote </button>
                </form>
            </div>
            <div> find a specific quote </div>
            <div>
                <form className='searchForm' onSubmit={(event) => { this.getQuote(event) }}>
                    <input className='searchInput' type='text' onChange={this.searchHandler} value={this.state.search_input} />
                    <button className='searchButton'> Search By Author </button>

                </form>
                <div>
                {this.state.search_result.map((e,i)=>{
                    <div key={e.id}> <h3>{e.info}</h3> <p>{e.source}</p> </div>
                })}
                </div>
            </div>
            <div> delete a quote </div>
            <div><input className='delete' type='text' onChange={this.deleteHandler} value={this.state.delete_input} /> <button className='deleteButton' onClick={(event) => { this.deleteQuote(event) }}> Delete by Id </button></div>
        </div>) : <div>
                <div>
                    <form className='addForm' onSubmit={(event) => { this.addQuote(event) }}>
                        <input className='infoInput' type='text' onChange={this.infoHandler} value={this.state.quote_info} />
                        <input className='quoteSource' type='text' onChange={this.sourceHandler} value={this.state.quote_source} />
                        <button className='addButton'> Add Quote </button>
                    </form>
                </div>
                <div> find a specific quote </div>
                <div>
                    <form className='searchForm' onSubmit={(event) => { this.getQuote(event) }}>
                        <input className='searchInput' type='text' onChange={this.searchHandler} value={this.state.search_input} />
                        <button className='searchButton'> Search By Author </button>

                    </form>
                </div>
                <div> delete a quote </div>
                <div><input className='delete' type='text' onChange={this.deleteHandler} value={this.state.delete_input} /> <button className='deleteButton' onClick={(event) => { this.deleteQuote(event) }}> Delete by Id </button></div>
            </div>


        return (<div>
            {homeDisplay}
        </div>)
    }
}

const mapStateToProps = state => ({
    quotes: state.quotes
})

export default connect(mapStateToProps)(Home)