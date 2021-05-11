import React from "react";
import GoogleMapReact from "google-map-react";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default function TestMap({ location }) {
  return (
    // Important! Always set the container height explicitly
    <div style={{ height: "100vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyBLRqOelO2dFOKE_Kx2vVYUePwHzL2UVv4" }}
        defaultCenter={location.center}
        defaultZoom={location.zoom}
      >
        <AnyReactComponent lat={location.center.lat} lng={location.center.lng} text="My Marker" />
      </GoogleMapReact>
    </div>
  );
}
