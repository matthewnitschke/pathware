import React, { Component } from 'react';

import PathViewer from './PathViewer.jsx'
import BookSelector from './BookSelector.jsx'

import '../css/site.css'
import '../css/gravitons.css'

import backgroundImageUrl from '../images/BackgroundImage.png';

export default class Main extends Component {
    constructor(props) {
        super(props)

        this.state = {
            selectedBook: '',
            selectedChapter: ''
        }
    }

    handlePathChange = (pathName) => {
        this.setState({
            'selectedPath': pathName
        })
    }

    render() {
        return (
            <div className="main-content" style={{backgroundImage: `url('${backgroundImageUrl}')`}}>
                <header>
                    <div className="container">
                        Pathware
                    </div>
                </header>

                <div className="container df mt3">
                    <BookSelector book={this.state.selectedBook} chapter={this.state.selectedChapter} onChange={this.handleChange} />
                    <PathViewer selectedPath={this.state.selectedPath}/>
                </div>

                
            </div>
        );
    }
}