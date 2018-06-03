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
            selectedBook: 'James',
            selectedChapter: `1 James, a servant of God and of the Lord Jesus Christ, To the twelve tribes scattered among the nations: Greetings. 2 Consider it pure joy, my brothers, whenever you face trials of many kinds, 3 because you know that the testing of your faith develops perseverance. 4 Perseverance must finish its work so that you may be mature and complete, not lacking anything. 5 If any of you lacks wisdom, he should ask God, who gives generously to all without finding fault, and it will be given to him. 6 But when he asks, he must believe and not doubt because he who doubts is like a wave of the sea, blown and tossed by the wind. 7 That man should not think he will receive anything from the Lord; 8 he is a double-minded man, unstable in all he does. 9 The brother in humble circumstances ought to take pride in his high position. 10 But the one who is rich should take pride in his low position, because he will pass away like a wild flower. 11 For the sun rises with scorching heat and withers the plant; its blossom falls and its beauty is destroyed. In the same way, the rich man will fade away even while he goes about his business. 12 Blessed is the man who perseveres under trial, because when he has stood the test, he will receive the crown of life that God has promised to those who love him. 13 When tempted, no one should say, \"God is tempting me.\" For God cannot be tempted by evil, nor does he tempt anyone; 14 but each one is tempted when, by his own evil desire, he is dragged away and enticed. 15 Then, after desire has conceived, it gives birth to sin; and sin, when it is fullgrown, gives birth to death. 16 Don't be deceived, my dear brothers. 17 Every good and perfect gift is from above, coming down from the Father of the heavenly lights, who does not change like shifting shadows. 18 He chose to give us birth through the word of truth, that we might be a kind of firstfruits of all he created. 19 My dear brothers, take note of this: Everyone should be quick to listen, slow to speak and slow to become angry,  20 for man's anger does not bring about the righteous life that God desires. 21 Therefore, get rid of all moral filth and the evil that is so prevalent and humbly accept the word planted in you, which can save you. 22 Do not merely listen to the word, and so deceive yourselves. Do what it says. 23 Anyone who listens to the word but does not do what it says is like a man who looks at his face in a mirror 24 and, after looking at himself, goes away and immediately forgets what he looks like. 25 But the man who looks intently into the perfect law that gives freedom, and continues to do this, not forgetting what he has heard, but doing it--he will be blessed in what he does. 26 If anyone considers himself religious and yet does not keep a tight rein on his tongue, he deceives himself and his religion is worthless. 27 Religion that God our Father accepts as pure and faultless is this: to look after orphans and widows in their distress and to keep oneself from being polluted by the world.`
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