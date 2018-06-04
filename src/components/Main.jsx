import React, { Component } from 'react';

import ChapterViewer from './ChapterViewer.jsx'
import BookSelector from './BookSelector.jsx'

import '../css/site.css'
import '../css/gravitons.css'
import '../css/animate.css'

import backgroundImageUrl from '../images/BackgroundImage.png';

export default class Main extends Component {
    constructor(props) {
        super(props)

        this.state = {
            selectedBook: '',
            selectedChapter: ''
        }
    }

    handleBookChange = (book) => {
        this.setState({
            selectedBook: book
        })
    }

    handleChapterChange = (chapter) => {
        this.setState({
            selectedChapter: chapter
        })
    }

    render() {
        return (
            <div className="main-content" style={{ backgroundImage: `url('${backgroundImageUrl}')` }}>
                <header>
                    <div className="container">
                        Pathware
                    </div>
                </header>

                <div className="container df mt3">
                    <BookSelector 
                        book={this.state.selectedBook} 
                        chapter={this.state.selectedChapter} 
                        onBookChange={this.handleBookChange} 
                        onChapterChange={this.handleChapterChange}/>
                    {
                        this.state.selectedBook != '' && this.state.selectedChapter != '' &&
                        <ChapterViewer chapterText={this.state.selectedChapter} bookName={this.state.selectedBook}/>
                    }
                </div>


            </div>
        );
    }
}