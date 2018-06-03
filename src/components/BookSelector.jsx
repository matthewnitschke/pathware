import React, { Component } from 'react';

const books = require('../books.json')

export default class PathSelector extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        let bookDom = Object.keys(books).map(book => {
            let selected = book == this.props.book
            return (
                <div 
                    onClick={() => {
                        this.props.onBookChange(book)
                        this.props.onChapterChange('')
                    }} 
                    className={`book-selector-item${selected ? ' selected' : ''}`}>
                    {book}
                </div>
            )
        })

        let chapterDom = []
        if (this.props.book != ''){
            chapterDom = books[this.props.book].map((chapter, i) => {
                let selected = chapter == this.props.chapter
                return (
                    <div
                        onClick={() => {this.props.onChapterChange(chapter)}}
                        className={`chapter-selector-item${selected ? ' selected' : ''}`}>
                        Chapter {i+1}
                    </div>
                )
            })
        }

        return (
            <div className="mt4 df">
                <div className="mr2">
                    <div className="path-selector-header">Books</div>
                    {bookDom}
                </div>

                {
                    chapterDom.length > 0 &&
                    <div className="mr2">
                        {chapterDom}
                    </div>
                }
                
            </div>
        );
    }
}