import React, { Component } from 'react';

const paths = require('../pathes.json')

export default class PathSelector extends Component {
    constructor(props) {
        super(props)

        this.state = {
            selectedPath: 'James',
            paths: paths
        }
    }

    render() {
        let pathsDom = this.state.paths.map(el => {
            let selected = el.name == this.props.selectedPath
            return (
                <div 
                    onClick={() => {this.props.onChange(el.name)}} 
                    className={`path-selector-item${selected ? ' selected' : ''}`}>
                    {el.name}
                </div>
            )
        })

        return (
            <div className="ml3 mt4" style={{ width: '15rem' }}>
                <div className="path-selector-header">Saved Paths</div>
                {pathsDom}
            </div>
        );
    }
}