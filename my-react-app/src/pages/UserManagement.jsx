import { Col, Container, Row } from "react-bootstrap";
import AdminSidebar from "../components/AdminSidebar";
import AdminNav from "../components/AdminNav";
const UserManagement = () => {


    const UserRender = ({data}) => {
        <div className="container mt-3">
            <div className="table-responsive rounded border bg-white shadow-sm">
                <table className="table table-hover align-middle mb-0 text-center">
                    <thead className="table-light">
                        <tr>
                            <th>NAME</th>
                            <th>TOTAL VALUE</th>
                            <th>DATE</th>
                            <th>QUANTITY</th>
                            <th>PAYMENT</th>
                            <th>STATUS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row, index) => (
                            <tr key={index}>
                                <td className="fw-semibold">{row.name}</td>
                                <td>${row.value}</td>
                                <td>{row.date}</td>
                                <td>{row.quantity}</td>
                                <td>{row.method}</td>
                                <td>
                                    <span
                                        className={`badge rounded-pill px-3 py-2 ${row.status === "Complete"
                                                ? "bg-success-subtle text-success"
                                                : row.status === "Processing"
                                                    ? "bg-primary-subtle text-primary"
                                                    : "bg-secondary-subtle text-secondary"
                                            }`}
                                    >
                                        {row.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    }

    return (
        <div style={{ backgroundColor: '#F5F6FA' }}>
            <Container fluid>
                <Row>
                    <Col md={2} className='ps-0'>
                        <AdminSidebar></AdminSidebar>
                    </Col>
                    <Col md ={10}>
                        <AdminNav></AdminNav>
                        <UserRender></UserRender>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
export default UserManagement;