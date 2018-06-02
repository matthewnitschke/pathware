import React, { Component } from 'react';

import PathViewerTabs from './PathViewerTabs.jsx'

export default class PathViewer extends Component {
    render() {
        return (
            <div style={{width: '100%'}}>
                <PathViewerTabs />
                <div className="path-viewer-container">
                    <div className="p3">
                        <h1 className="mb2">James 1</h1>
                        <textarea>
                            asdf
                        </textarea>
                    </div>
                </div>
            </div>
        );
    }
}