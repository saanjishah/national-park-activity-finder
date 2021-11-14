import React, { Component, useState } from "react";
import { default as ReactSelect } from "react-select";
import { components } from "react-select";
import './Form.css';
import { Link } from "react-router-dom";

import axios from 'axios';

const Option = (props) => {
    return (
        <div className="options">
            <components.Option {...props}>
                <input
                    type="checkbox"
                    checked={props.isSelected}
                    onChange={() => null}
                />{" "}
                <label>{props.label}</label>
            </components.Option>
        </div>
    );
};
export default class Form extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allActivities: [],
            optionSelected: [],
            parkKey: "acad"
        };
    }

    componentDidMount() {
        axios.get(`https://developer.nps.gov/api/v1/activities?api_key=5jlLN2KHagMnCMgIsGd7R1bqv08XJowk4eIGRMxq`)
            .then(res => {
                console.log(res.data);
                let activities = res.data.data;
                console.log(activities[0]);
                let test = [];
                activities.map(function (item) {
                    test.push({ label: item.name, value: item.id });
                })
                console.log(test);
                this.setState({ allActivities: test });
                console.log("line 53 " + this.state.allActivities[12].label);
            })
    }

    handleChange = (event) => {
        this.setState({
            optionSelected: event
        });
        console.log(event);
    };

    render() {
        console.log("line 121 " + this.state.allActivities[12]);
        return (
            <div>
                <div >
                    <div className="form">
                        <span>
                            <ReactSelect
                                options={this.state.allActivities}
                                isMulti
                                menuIsOpen={true}
                                hideSelectedOptions={true}
                                components={{
                                    Option
                                }}
                                onChange={this.handleChange}
                                allowSelectAll={true}
                                value={this.state.optionSelected}
                            />
                        </span>
                    </div>
                    <div>
                        <Link to={{
                            pathname: "/Parks",
                            state: this.state.optionSelected
                        }}>
                            <button className="b1">See National Parks</button>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}