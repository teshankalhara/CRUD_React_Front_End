import VehicleType from "../types/VehicleType";

function Vehicle(props:VehicleType) {
    return (
        <div>
            <h3>Brand : {props.title}</h3>
            <p>Model : {props.description}</p>
        </div>
    )
}

export default Vehicle;