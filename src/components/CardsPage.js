import React, { Component } from "react";
import Card from './Card';
import '../App.css';
import './CardsPage.css';

import axios from 'axios';

export default class CardsPage extends Component {

    constructor(props) {

        super(props);
        console.log(props.props);
        this.state = {
            nationalParksList: [],
            activityName: "",
            activityList: props.props,
        };
    }

    getParkCodes = (props) => {
        console.log("running")
        console.log(props);
        if (props != "Select an Activity") {
            axios.get('https://developer.nps.gov/api/v1/activities/parks?q=' + props +
                '&api_key=5jlLN2KHagMnCMgIsGd7R1bqv08XJowk4eIGRMxq')
                .then(res => {
                    const results = res.data.data;
                    results.map((nationalParks) => {
                        const allParks = nationalParks.parks;
                        allParks.map((park) => {
                            if (!this.state.nationalParksList.includes(park.parkCode)) {
                                this.handleChange(park.parkCode);
                            }
                        })

                    })

                })
        }

    }

    handleChange = (code) => {
        this.setState({
            nationalParksList: [...this.state.nationalParksList, code],
        });
    };

    handleActivityChange = (e) => {
        this.setState({
            nationalParksList: [],
        })
        this.setState({
            activityName: e.target.value, 
        })
    };

    render() {
        console.log("In render");
        console.log(this.state.activityList);
        this.getParkCodes(this.state.activityName);
        const uniqueParks = Array.from(new Set(this.state.nationalParksList));
        return (
            <div className="Parks">
                <header className="bg-image">
                    <h1 className="title">National Park Activity Finder</h1>
                </header>
                <div className = "dropdown-container">
                    <select className="dropdown" onChange = {this.handleActivityChange}>
                        <option value="Select an Activity"> -- Select an Activity -- </option>
                        {this.state.activityList.map((activity) => <option value={activity.label}>{activity.label}</option>)}
                    </select>
                </div>
                <p className = "caution"> <b>Caution:</b> May take a few seconds for data to load after selecting</p>
                <div className="grid-container">
                    {
                        uniqueParks.map((parkKey) => {
                            return (
                                <Card className="grid-item" parkKey={parkKey} />
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}