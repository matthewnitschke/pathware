import React, { Component } from 'react';

const books = require('../books.json')

export default class PathSelector extends Component {
    constructor(props) {
        super(props)
    }

    bookClicked = (newBook) => {
        if (newBook == this.props.book) {
            // toggle book if it is the one that is clicked
            this.props.onBookChange('')
        } else {
            this.props.onBookChange(newBook)
            this.props.onChapterChange(books[newBook][0])
        }
       
        
    }

    render() {

        let bookDom = Object.keys(books).map((book, i) => {
            let selected = book == this.props.book

            let chapterDom = Object.keys(books[book]).map((chapterKey, j) => {
                let chapter = books[book][chapterKey]
                let selected = chapter == this.props.chapter
                return (
                    <div
                        key={j}
                        onClick={() => {
                            this.props.onChapterChange(chapter)}}
                        className={`chapter-selector-item${selected ? ' selected' : ''}`}>
                        {chapterKey}
                    </div>
                )
            })

            return (
                <div
                    key={i}
                    className={`book-selector-item${selected ? ' selected' : ''}`}>
                    <span onClick={() => this.bookClicked(book)}>{book}</span>
                    {
                        selected &&
                        <div className={`mr2`}>
                            {chapterDom}
                        </div>
                    } 
                </div>
            )
        })


        return (
            <div className="mt4 df mr3 animated fadeInLeft">
                <div className="mr2">
                    <div className="path-selector-header">Books</div>
                    {bookDom}
                </div>
            </div>
        );
    }
}