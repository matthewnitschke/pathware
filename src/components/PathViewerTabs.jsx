import React, { Component } from 'react';

export default class PathViewerTabs extends Component {
    render() {
        return (
            <div className="df">
                <div className="path-viewer-tab active">
                   Review
                </div>
                <div className="path-viewer-tab">
                   Acronym
                </div>
                <div className="path-viewer-tab">
                   Text
                </div>
            </div>
        );
    }
}