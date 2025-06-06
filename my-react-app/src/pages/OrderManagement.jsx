import { Col, Container, Row, Card } from "react-bootstrap";
import AdminSidebar from "../components/AdminSidebar";
import AdminNav from "../components/AdminNav";
import { CiFilter } from "react-icons/ci";
import { GrPowerReset } from "react-icons/gr";
import { FaArrowDown } from "react-icons/fa";

const OrderManagement = () => {
  const orderData = [
    {
      date: "22/4/2003",
      value: "40,689",
      quantity: 10,
      name: "Tom",
      method: "Cash",
      status: "Complete",
    },
    {
      date: "22/4/2003",
      value: "40,689",
      quantity: 10,
      name: "Tom",
      method: "Cash",
      status: "Complete",
    },
    {
      date: "22/4/2003",
      value: "40,689",
      quantity: 10,
      name: "Tom",
      method: "Cash",
      status: "Complete",
    },
    {
      date: "22/4/2003",
      value: "40,689",
      quantity: 10,
      name: "Tom",
      method: "Cash",
      status: "Complete",
    },
    {
      date: "22/4/2003",
      value: "40,689",
      quantity: 10,
      name: "Tom",
      method: "Cash",
      status: "Complete",
    },
    {
      date: "22/4/2003",
      value: "40,689",
      quantity: 10,
      name: "Tom",
      method: "Cash",
      status: "Complete",
    },
    {
      date: "22/4/2003",
      value: "40,689",
      quantity: 10,
      name: "Tom",
      method: "Cash",
      status: "Complete",
    },
    {
      date: "22/4/2003",
      value: "40,689",
      quantity: 10,
      name: "Tom",
      method: "Cash",
      status: "Complete",
    },
    {
      date: "22/4/2003",
      value: "40,689",
      quantity: 10,
      name: "Tom",
      method: "Cash",
      status: "Complete",
    },
    
  ];

  const filterData = [
    { value: "Date" },
    { value: "Method" },
    { value: "Status" },
  ];

  const Filter = ({ filterData }) => (
    <Row className="g-3 my-4 mx-2 px-1">
      <Col md="1" className="p-0 me-1">
        <Card className="shadow-sm border-0 bg-white text-center p-2">
          <div className="d-flex flex-row align-items-center gap-2">
            <CiFilter size={20} />
            <span className="fw-semibold">Filter</span>
          </div>
        </Card>
      </Col>
      {filterData.map((item, idx) => (
        <Col key={idx} md="1" className="p-0 me-1">
          <Card className="shadow-sm border-0 bg-white text-center p-2">
            <div className="d-flex flex-row align-items-center gap-2">
              <span className="fw-semibold">{item.value}</span>
              <FaArrowDown className="text-danger" size={14} />
            </div>
          </Card>
        </Col>
      ))}
      <Col md="1"className="p-0 me-1">
        <Card className="shadow-sm border-0 bg-white text-center p-2">
          <div className="d-flex flex-row align-items-center gap-2">
            <GrPowerReset size={18} />
            <span className="fw-semibold">Reset</span>
          </div>
        </Card>
      </Col>
    </Row>
  );

  const OrderRender = ({orderData}) => (
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
            {orderData.map((row, index) => (
              <tr key={index}>
                <td className="fw-semibold">{row.name}</td>
                <td>${row.value}</td>
                <td>{row.date}</td>
                <td>{row.quantity}</td>
                <td>{row.method}</td>
                <td>
                  <span
                    className={`badge rounded-pill px-3 py-2 ${
                      row.status === "Complete"
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
  );

  return (
    <div style={{ backgroundColor: "#F5F6FA", minHeight: "100vh" }}>
      <Container fluid>
        <Row>
          <Col md={2} className="ps-0" style={{ minHeight: "100vh" }}>
            <AdminSidebar />
          </Col>
          <Col md={10} style={{ minHeight: "100vh" }}>
            <AdminNav title="Order Management" />
            <Filter filterData={filterData} />
            <OrderRender orderData={orderData} />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default OrderManagement;
