import React, { Component } from 'react';

export default class Checkbox extends Component {
    render() {
        return (
            <span className="dif jcc aic mr2">
                <input 
                    className="checkbox-input"
                    type="checkbox"
                    name={this.props.name}
                    checked={this.props.isChecked}
                    onChange={this.props.onChange}
                    id={this.props.label} />
                <label htmlFor={this.props.label} className="checkbox-span">
                    <span className="checkbox-input-inside"></span>
                </label>
                <label htmlFor={this.props.label} className="ml1 checkbox-label">{this.props.label}</label>
            </span>
        );
    }
}