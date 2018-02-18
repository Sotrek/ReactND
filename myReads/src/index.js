import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.render(
	//using BrowserRouter from react-router-dom to wrap around the SPA app
	<BrowserRouter><App /></BrowserRouter>,
	document.getElementById('root')
)
