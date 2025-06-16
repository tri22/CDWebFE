import { Col, Container, Row, Button, Card, Dropdown } from "react-bootstrap";
import AdminSidebar from "../components/AdminSidebar";
import AdminNav from "../components/AdminNav";
import { useEffect, useState } from "react";
import adminApi from "../api/adminApi";
import { IoMdAdd, IoIosListBox } from "react-icons/io";
import PaginationCom from "../components/PaginationCom";
import { FaArrowDown } from "react-icons/fa";
import { GrPowerReset } from "react-icons/gr";
import { MdInventory } from "react-icons/md";
import { useTranslation } from "react-i18next";

const ProductStock = () => {
    const { t } = useTranslation();

    const [record, setRecord] = useState([]);
    const [showRemainTable, setShowRemainTable] = useState(false);
    const [remainData, setRemainData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemPerPage, setItemPerPage] = useState(5);

    const activeData = showRemainTable ? Object.values(remainData) : record;
    const totalPages = Math.ceil(activeData.length / itemPerPage);
    const indexOfLast = currentPage * itemPerPage;
    const indexOfFirst = indexOfLast - itemPerPage;
    const currentList = activeData.slice(indexOfFirst, indexOfLast);

    useEffect(() => {
        fetchRecord();
        fetchRemain();
    }, []);

    const fetchRecord = async () => {
        try {
            const response = await adminApi.getAllStockInRecord();
            setRecord(response.data.result);
        } catch (err) {
            console.error("Error loading data", err);
        }
    };

    const fetchRemain = async () => {
        try {
            const response = await adminApi.getRemain();
            setRemainData(response.data.result);
        } catch (err) {
            console.error("Error loading data", err);
        }
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const Filter = ({ setItemsPerPage }) => {
        const options = [5, 10, 15, 20];

        return (
            <Row className="g-3 my-4 mx-2 px-1">
                <Col md="1" className="p-0 me-1">
                    <Card className="shadow-sm border-0 bg-white p-2">
                        <Dropdown>
                            <Dropdown.Toggle variant="light" size="sm" className="fw-semibold border-0 p-0">
                                {t("stock.itemsPerPage")}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {options.map((val) => (
                                    <Dropdown.Item key={val} onClick={() => setItemsPerPage(val)}>
                                        {val}
                                    </Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>
                    </Card>
                </Col>

                <Col md="1" className="p-0 me-1">
                    <Card className="shadow-sm border-0 bg-white text-center p-2">
                        <div className="d-flex flex-row align-items-center gap-2">
                            <span className="fw-semibold">{t("stock.date")}</span>
                            <FaArrowDown className="text-danger" size={14} />
                        </div>
                    </Card>
                </Col>

                <Col md="1" className="p-0 me-1">
                    <Card className="shadow-sm border-0 bg-white text-center p-2">
                        <div className="d-flex flex-row align-items-center gap-2">
                            <GrPowerReset size={18} />
                            <span className="fw-semibold">{t("stock.reset")}</span>
                        </div>
                    </Card>
                </Col>

                <Col md="2" className="p-0 me-1">
                    <Card
                        className="shadow-sm border-0 bg-white text-center p-2"
                        onClick={() => {
                            setShowRemainTable(!showRemainTable);
                            setCurrentPage(1);
                        }}
                        style={{ cursor: 'pointer' }}
                    >
                        <div className="d-flex flex-row align-items-center gap-2">
                            {showRemainTable ? (
                                <>
                                    <MdInventory size={18} />
                                    <span className="fw-semibold">{t("stock.remain")}</span>
                                </>
                            ) : (
                                <>
                                    <IoIosListBox size={18} />

                                    <span className="fw-semibold">{t("stock.records")}</span>
                                </>
                            )}
                        </div>
                    </Card>
                </Col>
            </Row>
        );
    };

    const TableRender = ({ data }) => (
        <div className="container mt-3">
            <div className="table-responsive rounded border bg-white shadow-sm">
                <table className="table table-hover align-middle mb-0 text-center">
                    <thead className="table-light">
                        <tr>
                            <th>{t("stock.name")}</th>
                            <th>{t("stock.image")}</th>
                            <th>{t("stock.date")}</th>
                            <th>{t("stock.quantity")}</th>
                            <th>{t("stock.price")}</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row, index) => (
                            <tr key={index}>
                                <td className="fw-semibold">{row.product.name}</td>
                                <td>
                                    <img src={row.product.image} alt="product" style={{ height: "50px", objectFit: "cover" }} />
                                </td>
                                <td>{row.createAt}</td>
                                <td>{row.quantity}</td>
                                <td>${row.price}</td>
                                <td>
                                    <Button className="me-2"><IoMdAdd /></Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    const RemainTable = ({ data }) => {
        const list = Object.values(data);
        return (
            <div className="container mt-3">
                <div className="table-responsive rounded border bg-white shadow-sm">
                    <table className="table table-hover align-middle mb-0 text-center">
                        <thead className="table-light">
                            <tr>
                                <th>{t("stock.id")}</th>
                                <th>{t("stock.name")}</th>
                                <th>{t("stock.image")}</th>
                                <th>{t("stock.remain")}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {list.map((row, index) => (
                                <tr key={index}>
                                    <td className="fw-semibold">{row.id}</td>
                                    <td className="fw-semibold">{row.name}</td>
                                    <td>
                                        <img src={row.image} alt="product" style={{ height: "50px", objectFit: "cover" }} />
                                    </td>
                                    <td>{row.stock}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    };

    return (
        <div style={{ backgroundColor: '#F5F6FA' }}>
            <Container fluid>
                <Row>
                    <Col md={2} className="p-0" style={{ minHeight: "100vh" }}>
                        <AdminSidebar />
                    </Col>
                    <Col md={10} style={{ minHeight: "100vh" }}>
                        <AdminNav title={t("stock.title")} />
                        <Filter setItemsPerPage={setItemPerPage} />
                        {showRemainTable
                            ? <RemainTable data={currentList} />
                            : <TableRender data={currentList} />}
                        <PaginationCom
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                            totalPages={totalPages}
                        />
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default ProductStock;
