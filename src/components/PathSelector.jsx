import React, { Component } from 'react';

export default class PathSelector extends Component {
    constructor(props){
        super(props)

        this.state = {
            selectedPath: 'James 1',
            paths: ['James 1', 'James 2']
        }
    }

    render() {
        let pathsDom = this.state.paths.map(el => {
            let classes = `path-selector-item${el == this.state.selectedPath ? ' selected' : ''}`
            return <div className={classes}>{el}</div>
        })
        
        return (
            <div className="ml3 mt4" style={{ width: '15rem' }}>
                <div className="path-selector-header">Saved Paths</div>
                {pathsDom}
            </div>
        );
    }
}