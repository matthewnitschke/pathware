import React, { Component } from 'react';

import PathViewerTabs from './PathViewerTabs.jsx'
import Checkbox from './Checkbox.jsx'

export default class ChapterViewer extends Component {
    constructor(props) {
        super(props)

        this.state = {
            selectedTab: 'Review',

            guessText: '',

            capitialization: false,
            punctuation: false,
            numbers: false,

            punctuationSymbols: `.,?!"';:()\\[\\]-`

        }
    }

    onTabChange = (newTab) => {
        this.setState({
            selectedTab: newTab
        })
    }

    handleChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    getLetters = (words) => {
        let puncRegex = this.state.punctuation ? `|[.,!"';:()?]` : ''
        let regex = `[\\d]+|(\\b(\\w)${puncRegex})`

        var letters = words.match(new RegExp(regex, "g"));
        if (letters) {
            let joinedLetters = letters.join(' ');
            if (!this.state.capitialization) {
                joinedLetters = joinedLetters.toLowerCase()
            }
            if (!this.state.numbers){
                joinedLetters = joinedLetters.replace(/\d/g, "")
            }
            joinedLetters = joinedLetters.replace(/ +/, " ").trim()

            return joinedLetters
        } else {
            return "";
        }
    }

    guessTextMatchText = () => {
        let guessText = this.state.guessText
        let text = this.props.chapterText

        if (!this.state.punctuation) {
            text = text.replace(new RegExp(`[${this.state.punctuationSymbols}]`, "gm"), "")
        }

        if (!this.state.numbers) {
            text = text.replace(/\d/g, "")
        }

        text = text.replace(/ +/, " ").trim()

        let flags = "gm"
        if (!this.state.capitialization) {
            flags += "i"
        }

        let rgx = new RegExp("^" + guessText, flags)

        return rgx.test(text)
    }

    render() {
        return (
            <div style={{ width: '100%' }}>
                <PathViewerTabs selectedTab={this.state.selectedTab} onTabChange={this.onTabChange} />
                <div className="path-viewer-container">
                    <div className="p3">
                        <h1 className="mb1">{this.props.bookName}</h1>
                        <div className="mb1">
                            <Checkbox 
                                label="Capitalization"
                                name="capitialization"
                                isChecked={this.state.capitialization}
                                onChange={this.handleChange} />

                            <Checkbox 
                                label="Punctuation"
                                name="punctuation"
                                isChecked={this.state.punctuation}
                                onChange={this.handleChange} />
                            
                            <Checkbox 
                                label="Numbers"
                                name="numbers"
                                isChecked={this.state.numbers}
                                onChange={this.handleChange} />
                        </div>
                        {
                            this.state.selectedTab == 'Review' &&
                            <div>
                                <textarea
                                    className={this.guessTextMatchText() ? '' : 'invalid'}
                                    name="guessText"
                                    value={this.state.guessText}
                                    onChange={this.handleChange}></textarea>
                            </div>
                        }

                        {
                            this.state.selectedTab == 'Acronym' &&
                            <div>
                                <textarea value={this.getLetters(this.props.chapterText)} disabled></textarea>
                            </div>
                        }

                        {
                            this.state.selectedTab == 'Text' &&
                            <div>
                                <textarea name="chapterText" value={this.props.chapterText} onChange={this.handleChange}></textarea>
                            </div>
                        }
                    </div>
                </div>
            </div>
        );
    }
}