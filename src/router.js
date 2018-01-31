import React from 'react'
import { Switch, Route } from 'react-router-dom'
import  Home  from './components/Home/Home'
import  Quotes  from './components/Quotes/Quotes'
import SingleQuote  from './components/Quotes/SingleQuote'

export default (
    <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path = '/quotes' component={Quotes} />
        <Route path= '/quotes/:id' component={SingleQuote} />
    </Switch>
)