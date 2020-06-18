import React, { Component } from "react";
import styled from "styled-components";
import { Map, TileLayer, Marker, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { above } from "../utilities";
import L from "leaflet";
delete L.Icon.Default.prototype._getIconUrl;


L.Icon.Default.mergeOptions({
  //iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  //iconUrl: require("leaflet/dist/images/marker-icon.png"),
  //iconUrl: require("leaflet/dist/images/marker-icon.png"),
  //shadowUrl: require("leaflet/dist/images/marker-shadow.png")
  iconUrl:      process.env.PUBLIC_URL + '/cvmfs-marker.png',
  iconSize:     [32, 32], // size of the icon
  shadowSize:   [0, 0], // size of the shadow
  iconAnchor:   [18, 18], // point of the icon which will correspond to marker's location
  popupAnchor:  [18, 0] // point from which the popup should open relative to the iconAnchor
});

const MapBox = styled.div`
  margin: 20px 0px;
  .map{
    height: 340px;
    width: 100%;
    ${above.smallPhone`
      height: 380px;
    `}
    ${above.phone`
      height: 480px
    `}
  }
`;

class MapComponent extends Component {
  render() {
    return (
      <MapBox>
        <Map
          className="map"
          zoom={1.5}
          center={[20, 0]}
        >
          <TileLayer url="https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg" />
          {this.props.repositoryData.recommendedStratum1s.map(stratumOneMap => (
            <div key={stratumOneMap.id}>
              <Marker position={stratumOneMap.location.ll}>
                <Tooltip>{stratumOneMap.name}</Tooltip>
              </Marker>
            </div>
          ))}
        </Map>
        <small>Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>.</small>
      </MapBox>
    );
  }
}

export default MapComponent;
