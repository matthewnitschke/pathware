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
        debugger
        this.setState({
            selectedBook: book
        })
    }

    handleChapterChange = (chapter) => {
        debugger
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
                        this.state.selectedBook && this.state.selectedChapter &&
                        <ChapterViewer chapterText={this.state.selectedChapter} bookName={this.state.selectedBook}/>
                    }
                </div>

                <footer className="footer">
                    Made with <i class="fas fa-heart"></i> by <a href="https://github.com/matthewnitschke">Matthew</a> and <a href="https://www.linkedin.com/in/sarah-nitschke-4330a236">Sarah</a>
                </footer>
            </div>
        );
    }
}