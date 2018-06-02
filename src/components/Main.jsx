import React, { Component } from 'react';

import PathViewer from './PathViewer.jsx'
import PathSelector from './PathSelector.jsx'

import '../css/site.css'
import '../css/gravitons.css'

import backgroundImageUrl from '../images/BackgroundImage.png';

export default class Main extends Component {
    render() {
        return (
            <div className="main-content" style={{backgroundImage: `url('${backgroundImageUrl}')`}}>
                <header>
                    <div className="container">
                        Pathware
                    </div>
                </header>

                <div className="container df mt3">
                    <PathViewer />
                    <PathSelector />
                </div>

                
            </div>
        );
    }
}