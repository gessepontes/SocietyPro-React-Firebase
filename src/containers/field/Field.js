import React, { Component, Fragment } from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { showDetails } from '../../actions/field'
import imageUrl from '../../img/ball.png'

import NavigationIcon from '@material-ui/icons/Navigation';
import { Button } from '@material-ui/core';

class Field extends Component {

    constructor(props) {
        super(props);

        this.state = {
            endereco: props.field.endereco || "Avenida Aguanambi,Fortaleza-ce",
            posicao: ""
        }
    }

    componentDidMount() {
        this.renderMap();
    }

    renderMap = () => {
        loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyA1fqsuRfOQmU9oxnoCy1kIuCjBNVm4bOo&callback=initMap")
        window.initMap = this.initMap
    }

    geocodeAddress(geocoder, resultsMap) {
        var markerImage = new window.google.maps.MarkerImage(imageUrl);

        var address = this.state.endereco;
        geocoder.geocode({ 'address': address }, function (results, status) {
            if (status === 'OK') {
                resultsMap.setCenter(results[0].geometry.location);
                new window.google.maps.Marker({
                    map: resultsMap,
                    position: results[0].geometry.location,
                    icon: markerImage
                });
            } else {
                alert('Geocode was not successful for the following reason: ' + status);
            }
        });
    }


    initMap = () => {

        // Create A Map
        var map = new window.google.maps.Map(document.getElementById('map'), {
            center: { lat: -34.397, lng: 150.644 },
            zoom: 17,
            zoomControl: false,
            scaleControl: false,
            streetViewControl: false,
            fullscreenControl: false,
            mapTypeControl: false
        })

        var geocoder = new window.google.maps.Geocoder();
        this.geocodeAddress(geocoder, map);

    }

    direction = () => {

        var directionsDisplay = new window.google.maps.DirectionsRenderer();
        var directionsService = new window.google.maps.DirectionsService();
        var map = new window.google.maps.Map(document.getElementById('map'), {
            zoom: 14,
            center: { lat: -34.397, lng: 150.644 },
            zoomControl: false,
            scaleControl: false,
            streetViewControl: false,
            fullscreenControl: false,
            mapTypeControl: false
        });
        directionsDisplay.setMap(map);

        var geocoder = new window.google.maps.Geocoder();

        var address = this.state.endereco;
        geocoder.geocode({ 'address': address }, function (results, status) {
            if (status === 'OK') {

                navigator.geolocation.getCurrentPosition(function (position) {

                    directionsService.route({
                        origin: { lat: position.coords.latitude, lng: position.coords.longitude },
                        destination: results[0].geometry.location,
                        travelMode: window.google.maps.TravelMode['DRIVING'],
                    }, function (response, status) {
                        if (status === 'OK') {
                            directionsDisplay.setDirections(response);
                        } else {
                            window.alert('Directions request failed due to ' + status);
                        }
                    });
                });

            } else {
                alert('Geocode was not successful for the following reason: ' + status);
            }
        });
    }

    handleClick = () => {
        loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyA1fqsuRfOQmU9oxnoCy1kIuCjBNVm4bOo&callback=initMap")
        window.initMap = this.direction
    };

    render() {

        const style = {
            position: 'fixed',
            zIndex: 3,
            right: 30,
            bottom: 35,
        }

        return (
            <Fragment>
                <div style={{ height: '90vh', width: '100%' }} id="map"></div>

                <Button
                    onClick={() => { this.handleClick() }}
                    color='primary'
                    variant='fab'
                    style={style}
                    mini
                >
                    
                    < NavigationIcon />
                </Button>
            </Fragment>
        )
    }
}

function loadScript(url) {
    var index = window.document.getElementsByTagName("script")[0]
    var script = window.document.createElement("script")
    script.src = url
    script.async = true
    script.defer = true
    index.parentNode.insertBefore(script, index)
}

const mapStateToProps = state => ({ field: state.field.field })
const mapDispatchToProps = dispatch => bindActionCreators({ showDetails }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Field);