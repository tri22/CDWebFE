import { Button, Col, Container, Row } from "react-bootstrap";
import AdminSidebar from "../components/AdminSidebar";
import AdminNav from "../components/AdminNav";
import userApi from "../api/userApi";
import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import PaginationCom from "../components/PaginationCom";

const UserManagement = () => {
    const [UserList, SetUserList] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const itemPerPage = 10;
    const totalPages = Math.ceil(UserList.length / itemPerPage);
    const indexOfLast = currentPage * itemPerPage;
    const indexOfFirst = indexOfLast - itemPerPage;
    const currentUserList = UserList.slice(indexOfFirst, indexOfLast);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await userApi.getAllUser();
                const data = response.data.result
                console.log("API response:", response.data);
                console.log("API response:", data);
                SetUserList(data)
            } catch (error) {
                console.error("Failed to fetch users:", error);
            }

        }

        fetchUser();
    }, []); // chạy một lần khi component mount

    const UserRender = ({ data }) => {
        return (
            <div className="container mt-3">
                <div className="table-responsive rounded border bg-white shadow-sm">
                    <table className="table table-hover align-middle mb-0 text-center">
                        <thead className="table-light">
                            <tr>
                                <th>NAME</th>
                                <th>EMAIL</th>
                                <th>PHONE</th>
                                <th>BIRTHDAY</th>
                                <th>ROLE</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((row, index) => (
                                <tr key={index}>
                                    <td className="fw-semibold">{row.fullName}</td>
                                    <td>{row.email}</td>
                                    <td>{row.phone}</td>
                                    <td>{row.birthday}</td>
                                    <td>{row.role}</td>
                                    <td>
                                        <Button className="me-2"><FaEdit /></Button>
                                        <Button><MdDelete /></Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    };


    return (
        <div style={{ backgroundColor: '#F5F6FA', minHeight: "100vh" }}>
            <Container fluid>
                <Row>
                    <Col md={2} className='p-0' style={{ minHeight: "100vh" }}>
                        <AdminSidebar></AdminSidebar>
                    </Col>
                    <Col md={10} style={{ minHeight: "100vh" }}>
                        <AdminNav title={'User Management'}></AdminNav>
                        <UserRender data={currentUserList}></UserRender>
                        <PaginationCom currentPage={currentPage} onPageChange={handlePageChange} totalPages={totalPages}></PaginationCom>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
export default UserManagement;