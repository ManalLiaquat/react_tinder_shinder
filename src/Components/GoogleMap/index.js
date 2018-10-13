import React from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";

const MyMapComponent = withScriptjs(
  withGoogleMap(props => (
    <GoogleMap
      defaultZoom={18}
      center={{ lat: props.coords.latitude, lng: props.coords.longitude }}
    >
      {props.isMarkerShown &&
        props.coords && (
          <Marker
            draggable={true}
            onDragEnd={res => {
              props.updateCoords(res.latLng.lat(), res.latLng.lng());
            }}
            position={{
              lat: props.coords.latitude,
              lng: props.coords.longitude
            }}
          />
        )}
    </GoogleMap>
  ))
);

export default MyMapComponent;
