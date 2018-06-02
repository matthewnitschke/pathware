import React, { Component } from 'react';

export default class PathViewerTabs extends Component {
    constructor(props) {
        super(props)

        this.state = {
            tabs: ["Review", "Acronym", "Text"]
        }
    }

    handleTabClick = (tab) => {
        this.props.onTabChange(tab)
    }

    render() {
        let tabDom = this.state.tabs.map((el, i) => {
            let tabClasses = `path-viewer-tab${this.props.selectedTab == el ? ' active' : ''}`
            return (
                <div key={i} className={tabClasses} onClick={() => {this.handleTabClick(el)}}>
                    {el}
                </div>
            )
        })
        return (
            <div className="df">
                {tabDom}
            </div>
        );
    }
}