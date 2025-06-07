import { Col, Container, Row, Button } from "react-bootstrap";
import AdminSidebar from "../components/AdminSidebar";
import AdminNav from "../components/AdminNav";
import { useEffect, useState } from "react";
import productApi from "../api/productApi";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import PaginationCom from "../components/PaginationCom";

const ProductManagement = () => {
    const [productList, setProductList] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const itemPerPage = 10;
    const totalPages = Math.ceil(productList.length / itemPerPage);
    const indexOfLast = currentPage * itemPerPage;
    const indexOfFirst = indexOfLast - itemPerPage;
    const currentProductList = productList.slice(indexOfFirst, indexOfLast);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };


    useEffect(() => {
        const fetchProduct = async () => {
            const response = await productApi.getAllProduct()
            const data = response.data
            console.log(data)
            setProductList(data)
        }
        fetchProduct()
    }, [])

    const ProductRender = ({ data }) => {
        return (
            <div className="container mt-3">
                <div className="table-responsive rounded border bg-white shadow-sm">
                    <table className="table table-hover align-middle mb-0 text-center">
                        <thead className="table-light">
                            <tr>
                                <th>NAME</th>
                                <th>PRICE</th>
                                <th>CATEGORY</th>
                                <th>IMAGE</th>
                                <th>DESCRIPTION</th>
                                <th>RATING</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((row, index) => (
                                <tr key={index}>
                                    <td className="fw-semibold">{row.name}</td>
                                    <td>${row.price}</td>
                                    <td>{row.category.name}</td>
                                    <td>
                                        <img src={row.image} alt="product" style={{ height: "50px", objectFit: "cover" }} />
                                    </td>
                                    <td>{row.description}</td>
                                    <td>{row.rating}</td>
                                    <td>
                                        <td>
                                            <Button className="me-2"><FaEdit /></Button>
                                            <Button><MdDelete /></Button>
                                        </td>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }

    return (
        <div style={{ backgroundColor: '#F5F6FA', minHeight: "100vh" }}>
            <Container fluid>
                <Row>
                    <Col md={2} className='p-0' style={{ minHeight: "100vh" }}>
                        <AdminSidebar></AdminSidebar>
                    </Col>
                    <Col md={10} style={{ minHeight: "100vh" }}>
                        <AdminNav title={"Product Management"}></AdminNav>
                        <ProductRender data={currentProductList}></ProductRender>
                        <PaginationCom currentPage={currentPage} onPageChange={handlePageChange} totalPages={totalPages}></PaginationCom>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
export default ProductManagement;