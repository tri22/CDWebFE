import React, { useEffect, useState } from 'react';
import { useAuth } from '../api/AuthContext';
import { Col, Row, Card, Form, Container } from 'react-bootstrap';
import { FaBan, FaBox, FaChartLine, FaClock, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import AdminSidebar from '../components/AdminSidebar';
import AdminNav from '../components/AdminNav';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
    Area,
    AreaChart,
} from 'recharts';
import orderApi from '../api/orderApi';
import dayjs from 'dayjs';

const Home = () => {
    const { user, isLoggedIn } = useAuth();
    const [chartData, setChartData] = useState([]);
    const [time, setTime] = useState("This Week");
    const [dashboardData, setDashboardData] = useState({
        bestSellingObject: null,
        weekOrder: 0,
        weekSale: 0,
        weekCancel: 0,
    });

    useEffect(() => {
        if (isLoggedIn && user) {
            console.log("Thông tin user:", user);
        }
    }, [user, isLoggedIn]);

    useEffect(() => {
        fetchInfo()
        weeklyRevenue();
    }, []);

    useEffect(() => {
        if (time) {
            selectTime(time);
        }
    }, [time]);


    useEffect(() => {
        if (dashboardData.bestSellingObject) {
            console.log("✅ Đã cập nhật:", dashboardData.bestSellingObject);
        }
    }, [dashboardData.bestSellingObject]);

    const fetchInfo = async () => {
        try {
            const formattedDate = dayjs().format('YYYY-MM-DD');

            const [product, order, sale, cancel] = await Promise.all([
                orderApi.bestSellingProduct(formattedDate),
                orderApi.weekTotalOrder(formattedDate),
                orderApi.weekTotalRevenue(formattedDate),
                orderApi.weekCancelledOrder(formattedDate),
            ]);

            console.log(product.data.result)
            setDashboardData({
                bestSellingObject: product.data.result,
                weekOrder: order.data.result,
                weekSale: sale.data.result,
                weekCancel: cancel.data.result,
            });


        } catch (err) {
            console.log("Error while fetching data:", err);
        }
    };


    const weeklyRevenue = async () => {
        const today = dayjs().format("YYYY-MM-DD");
        orderApi.getWeeklySales(today)
            .then(res => {
                const transformed = res.data.result.map(item => ({
                    name: item.label, // Mon, Tue...
                    value: item.value
                }));
                setChartData(transformed);
            })
            .catch(err => {
                console.error("Failed to load chart data:", err);
            });
    }

    const selectTime = async (value) => {
        setTime(value);
        const today = dayjs().format("YYYY-MM-DD")
        let apiFn = null;

        if (value === "This Week") apiFn = orderApi.getWeeklySales;
        else if (value === "This month") apiFn = orderApi.getMonthlySales;
        else if (value === "This year") apiFn = orderApi.getYearlySales;

        if (apiFn) {
            try {
                const res = await apiFn(today);
                const transformed = res.data.result.map(item => ({
                    name: item.label,
                    value: item.value,
                }));
                setChartData(transformed);
            } catch (err) {
                console.error("Failed to load chart data:", err);
            }
        }
    };




    const DashboardStats = () => {
        return (
            <Row className="g-4 my-4">
                <Col md={6} lg={3} className='m-0'>
                    <Card className="shadow-sm border-0 rounded-4 h-100">
                        <Card.Body className="d-flex flex-column gap-3">
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="fw-bold mb-0">Total Order</div>
                                <div className="p-2 rounded-3 d-flex align-items-center justify-content-center bg-warning">
                                    <FaBox size={32} className="text-white" />
                                </div>
                            </div>
                            <h3 className="fw-bold mb-0">{dashboardData.weekOrder}</h3>
                            <div className="d-flex align-items-center gap-2">
                                <FaArrowUp className="text-success" />
                                <span className="fw-semibold text-success">+1.3%</span>
                                <span className="text-muted small">Up from past week</span>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={6} lg={3} className='m-0'>
                    <Card className="shadow-sm border-0 rounded-4 h-100">
                        <Card.Body className="d-flex flex-column gap-3">
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="fw-bold mb-0">Total Sales</div>
                                <div className="p-2 rounded-3 d-flex align-items-center justify-content-center bg-success">
                                    <FaChartLine size={32} className="text-white" />
                                </div>
                            </div>
                            <h3 className="fw-bold mb-0">${dashboardData.weekSale}</h3>
                            <div className="d-flex align-items-center gap-2">
                                <FaArrowDown className="text-danger" />
                                <span className="fw-semibold text-danger">-4.3%</span>
                                <span className="text-muted small">Down from past week</span>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={6} lg={3} className='m-0'>
                    <Card className="shadow-sm border-0 rounded-4 h-100">
                        <Card.Body className="d-flex flex-column gap-3">
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="fw-bold mb-0">Best week's selling</div>
                            </div>
                            <div className="p-2 rounded-3 d-flex align-items-center justify-content-center">
                                <img src={dashboardData.bestSellingObject?.image || "Loading..."} alt="product" style={{ height: "80px", width: "100%", objectFit: "cover" }} />
                            </div>
                            <h4 className="fw-bold mb-0 ">
                                {dashboardData.bestSellingObject?.name || "Loading..."}
                            </h4>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={6} lg={3} className='m-0'>
                    <Card className="shadow-sm border-0 rounded-4 h-100">
                        <Card.Body className="d-flex flex-column gap-3">
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="fw-bold mb-0">Cancelled Orders</div>
                                <div className="p-2 rounded-3 d-flex align-items-center justify-content-center bg-danger">
                                    <FaBan size={32} className="text-white" />
                                </div>
                            </div>
                            <h3 className="fw-bold mb-0">{dashboardData.weekCancel}</h3>
                            <div className="d-flex align-items-center gap-2">
                                <FaArrowUp className="text-success" />
                                <span className="fw-semibold text-success">+8.5%</span>
                                <span className="text-muted small">Up from past week</span>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row >
        );
    };

    const SalesChart = () => {
        return (
            <Card className="shadow-sm border-0 rounded-4 p-5 mt-4">
                <Row className="align-items-center mb-3">
                    <Col>
                        <h5 className="fw-bold mb-0">Sales Details</h5>
                    </Col>
                    <Col xs="auto">
                        <Form.Select
                            size="sm"
                            value={time}
                            onChange={(e) => selectTime(e.target.value)}
                        >
                            <option value="This Week">This Week</option>
                            <option value="This month">This Month</option>
                            <option value="This year">This Year</option>
                        </Form.Select>

                    </Col >
                </Row >

                <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={chartData}>
                        <defs>
                            <linearGradient id="colorBlue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#4e7cf3" stopOpacity={0.4} />
                                <stop offset="95%" stopColor="#4e7cf3" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                        <YAxis
                            tickFormatter={(val) => `$${val}`}
                            tick={{ fontSize: 12 }}
                        />
                        <Tooltip formatter={(val) => `$${val.toFixed(2)}`} />
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <Area
                            type="monotone"
                            dataKey="value"
                            stroke="#4e7cf3"
                            fillOpacity={1}
                            fill="url(#colorBlue)"
                            dot={{ r: 3 }}
                            activeDot={{ r: 6 }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </Card >
        );
    };

    return (
        <div style={{ backgroundColor: '#F5F6FA' }}>
            <Container fluid>
                <Row>
                    <Col md={2} className="p-0" style={{ minHeight: "100vh" }}>
                        <AdminSidebar ></AdminSidebar>
                    </Col>
                    <Col md={10} style={{ minHeight: "100vh" }}>
                        <div>
                            <div>
                                <AdminNav user={user} title={"Dashboard"}></AdminNav>
                                <DashboardStats></DashboardStats>
                            </div>
                            <SalesChart />
                        </div>
                    </Col>
                </Row >
            </Container>

        </div>

    );
};

export default Home;