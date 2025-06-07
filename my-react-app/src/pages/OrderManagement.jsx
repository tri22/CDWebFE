import { Col, Container, Row, Card } from "react-bootstrap";
import AdminSidebar from "../components/AdminSidebar";
import AdminNav from "../components/AdminNav";
import { CiFilter } from "react-icons/ci";
import { GrPowerReset } from "react-icons/gr";
import { FaArrowDown } from "react-icons/fa";
import { useEffect, useState } from "react";
import orderApi from "../api/orderApi";
import PaginationCom from "../components/PaginationCom";

const OrderManagement = () => {
  const [orderList, setOrderList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemPerPage = 10;
  const totalPages = Math.ceil(orderList.length / itemPerPage);
  const indexOfLast= currentPage * itemPerPage;
  const indexOfFirst = indexOfLast - itemPerPage;
  const currentOrderList = orderList.slice(indexOfFirst, indexOfLast);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };



  useEffect(() => {
    const fetchOrder = async () => {
      const response = await orderApi.getAllOrder();
      const data = response.data.result;
      console.log(data)
      setOrderList(data)
    }
    fetchOrder()
  }, [])


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
      <Col md="1" className="p-0 me-1">
        <Card className="shadow-sm border-0 bg-white text-center p-2">
          <div className="d-flex flex-row align-items-center gap-2">
            <GrPowerReset size={18} />
            <span className="fw-semibold">Reset</span>
          </div>
        </Card>
      </Col>
    </Row>
  );

  const OrderRender = ({ orderData }) => (
    <div className="container mt-3">
      <div className="table-responsive rounded border bg-white shadow-sm">
        <table className="table table-hover align-middle mb-0 text-center">
          <thead className="table-light">
            <tr>
              <th>USERNAME</th>
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
                <td className="fw-semibold">{row.username}</td>
                <td>${row.totalPrice}</td>
                <td>{row.orderDate}</td>
                <td>{row.totalQuantity}</td>
                <td>{row.paymentMethod}</td>
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
  );

  return (
    <div style={{ backgroundColor: "#F5F6FA", minHeight: "100vh" }}>
      <Container fluid>
        <Row>
          <Col md={2} className="p-0" style={{ minHeight: "100vh" }}>
            <AdminSidebar />
          </Col>
          <Col md={10} style={{ minHeight: "100vh" }}>
            <AdminNav title="Order Management" />
            <Filter filterData={filterData} />
            <OrderRender orderData={currentOrderList} />
            <PaginationCom currentPage={currentPage} onPageChange={handlePageChange} totalPages={totalPages}></PaginationCom>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default OrderManagement;
