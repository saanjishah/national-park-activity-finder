import React, { Component } from "react";
import "./Card.css";
import Popup from 'reactjs-popup';
import "./PopUp.css";
import { Carousel } from 'react-carousel-minimal';
import axios from 'axios';

export default class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {
            parkKey: props.parkKey,
            parkName: "API Call Not Complete",
            parkLocation: "More Information Not Available",
            parkDescription: "Information Not Available",
            parkFees: [],
            parkDirections: "",
            parkUrl: "",
            parkImages: []
        }
    }

    componentDidMount() {
        this.getParkInfo(this.state.parkKey);
    }

    getParkInfo = (props) => {
        console.log("running")
        console.log(props);
        axios.get('https://developer.nps.gov/api/v1/parks?parkCode=' + { props } + '&api_key=5jlLN2KHagMnCMgIsGd7R1bqv08XJowk4eIGRMxq')
            .then(res => {
                const results = res.data.data;
                console.log(results);
                results.map((nationalParks) => {
                    if (nationalParks.parkCode == props) {
                        this.setState({
                            parkName: nationalParks.fullName,
                            parkLocation: nationalParks.addresses[0].city + ", " + nationalParks.addresses[0].stateCode,
                            parkDescription: nationalParks.description,
                            parkImgUrl: nationalParks.images[0].url,
                            // parkImages: nationalParks.images,
                            parkDirections: nationalParks.directionsInfo,
                            parkUrl: nationalParks.url,
                            
                        })
                        nationalParks.images.map(image => {
                            // this.setState(...this.state.parkImages, {image: image.url, caption: image.caption})
                            this.state.parkImages.push({image: image.url, caption: image.caption});
                        })
                        console.log(this.state.parkImages);
                    }
                })

            })
    }
    
    render() {
        return (
            <div >
                <div className="Card">
                    <h2>{this.state.parkName}</h2>
                    <p>{this.state.parkKey}</p>
                    <p>{this.state.parkLocation}</p>
                    <div className="PopUpBackground">
                        <Popup
                            trigger={<button className="button"> Click for More Info </button>}
                            modal
                            nested
                            className="popup"
                        >
                            {close => (
                                <div className="modal">
                                    <button className="close" onClick={close}>
                                        &times;
                                    </button>
                                    <div className="header"> {this.state.parkName} </div>
                                    <div className="content">
                                        {this.state.parkDescription}
                                    </div>
                                    <div>
                                        <Carousel
                                            data={this.state.parkImages}
                                            time={2000}
                                            width="350px"
                                            height="200px"
                                            captionStyle={captionStyle}
                                            radius="10px"
                                            slideNumber={true}
                                            slideNumberStyle={slideNumberStyle}
                                            captionPosition="bottom"
                                            automatic={true}
                                            dots={true}
                                            pauseIconColor="white"
                                            pauseIconSize="40px"
                                            slideBackgroundColor="darkgrey"
                                            slideImageFit="cover"
                                            thumbnails={true}
                                            thumbnailWidth="100px"
                                            style={{
                                                textAlign: "center",
                                                maxWidth: "850px",
                                                maxHeight: "500px",
                                                margin: "20px",
                                            }}
                                        />
                                        <div className="directions">
                                            <b>Directions: </b>{this.state.parkDirections}
                                        </div>
                                        <div className="url">
                                            <a href={this.state.parkUrl}>Navigate to {this.state.parkName} Website</a>
                                        </div>

                                    </div>
                                    <div className="actions">
                                    </div>
                                </div>
                            )}
                        </Popup>
                    </div>
                </div>
            </div>
        );
    }
}
const captionStyle = {
    fontSize: '14px',
    fontWeight: 'bold',
  }
const slideNumberStyle = {
    fontSize: '10px',
    fontWeight: 'bold',
  }