import { Spinner } from "react-bootstrap";

export default function LoadingSpinner() {
    return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
            <Spinner animation="border" variant="primary" style={{ width: "10rem", height: "10rem" }} />
        </div>
    );
}