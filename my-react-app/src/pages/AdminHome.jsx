<<<<<<< HEAD
import React, { useEffect } from 'react';

import { useAuth } from '../api/AuthContext';
import { Col, Row, Card, Form, Container } from 'react-bootstrap';
import { FaUsers, FaBox, FaChartLine, FaClock, FaArrowUp, FaArrowDown } from 'react-icons/fa';
=======
import React, { useEffect, useState } from 'react';

import { useAuth } from '../api/AuthContext';
import { Col, Row, Card, Form, Container } from 'react-bootstrap';
import { FaBan, FaBox, FaChartLine, FaClock, FaArrowUp, FaArrowDown } from 'react-icons/fa';
>>>>>>> main
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
<<<<<<< HEAD
const Home = () => {
    const { user, isLoggedIn } = useAuth();
=======
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
>>>>>>> main

    useEffect(() => {
        if (isLoggedIn && user) {
            console.log("Thông tin user:", user);
        }
    }, [user, isLoggedIn]);

<<<<<<< HEAD
    const statsData = [
        {
            title: 'Total User',
            value: '40,689',
            icon: <FaUsers size={32} className="text-white" />,
            iconBg: 'bg-primary',
            change: '+8.5%',
            changeText: 'Up from yesterday',
            isUp: true,
        },
        {
            title: 'Total Order',
            value: '10,293',
            icon: <FaBox size={32} className="text-white" />,
            iconBg: 'bg-warning',
            change: '+1.3%',
            changeText: 'Up from past week',
            isUp: true,
        },
        {
            title: 'Total Sales',
            value: '$89,000',
            icon: <FaChartLine size={32} className="text-white" />,
            iconBg: 'bg-success',
            change: '-4.3%',
            changeText: 'Down from yesterday',
            isUp: false,
        },
        {
            title: 'Total Pending',
            value: '2040',
            icon: <FaClock size={32} className="text-white" />,
            iconBg: 'bg-danger',
            change: '+1.8%',
            changeText: 'Up from yesterday',
            isUp: true,
        },
    ];
=======
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



>>>>>>> main

    const DashboardStats = () => {
        return (
            <Row className="g-4 my-4">
<<<<<<< HEAD
                {statsData.map((stat, idx) => (
                    <Col key={idx} md={6} lg={3} className='m-0'>
                        <Card className="shadow-sm border-0 rounded-4 h-100">
                            <Card.Body className="d-flex flex-column gap-3">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="text-muted fw-semibold">{stat.title}</div>
                                    <div className={`p-2 rounded-3 d-flex align-items-center justify-content-center ${stat.iconBg}`}>
                                        {stat.icon}
                                    </div>
                                </div>
                                <h3 className="fw-bold mb-0">{stat.value}</h3>
                                <div className="d-flex align-items-center gap-2">
                                    {stat.isUp ? (
                                        <FaArrowUp className="text-success" />
                                    ) : (
                                        <FaArrowDown className="text-danger" />
                                    )}
                                    <span className={`fw-semibold ${stat.isUp ? 'text-success' : 'text-danger'}`}>
                                        {stat.change}
                                    </span>
                                    <span className="text-muted small">{stat.changeText}</span>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
=======
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
>>>>>>> main
            </Row>
        );
    };

<<<<<<< HEAD
    const data = Array.from({ length: 40 }, (_, i) => ({
        name: `${(i + 1) * 1500}`,
        value: Math.floor(30 + Math.random() * 70), // từ 30% đến 100%
    }));

=======
>>>>>>> main
    const SalesChart = () => {
        return (
            <Card className="shadow-sm border-0 rounded-4 p-5 mt-4">
                <Row className="align-items-center mb-3">
                    <Col>
                        <h5 className="fw-bold mb-0">Sales Details</h5>
                    </Col>
                    <Col xs="auto">
<<<<<<< HEAD
                        <Form.Select size="sm">
                            <option>October</option>
                            <option>September</option>
                            <option>August</option>
                        </Form.Select>
=======
                        <Form.Select
                            size="sm"
                            value={time}
                            onChange={(e) => selectTime(e.target.value)}
                        >
                            <option value="This Week">This Week</option>
                            <option value="This month">This Month</option>
                            <option value="This year">This Year</option>
                        </Form.Select>

>>>>>>> main
                    </Col>
                </Row>

                <ResponsiveContainer width="100%" height={300}>
<<<<<<< HEAD
                    <AreaChart data={data}>
=======
                    <AreaChart data={chartData}>
>>>>>>> main
                        <defs>
                            <linearGradient id="colorBlue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#4e7cf3" stopOpacity={0.4} />
                                <stop offset="95%" stopColor="#4e7cf3" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                        <YAxis
<<<<<<< HEAD
                            domain={[0, 100]}
                            tickFormatter={(val) => `${val}%`}
                            tick={{ fontSize: 12 }}
                        />
                        <Tooltip formatter={(val) => `${val.toFixed(2)}%`} />
=======
                            tickFormatter={(val) => `$${val}`}
                            tick={{ fontSize: 12 }}
                        />
                        <Tooltip formatter={(val) => `$${val.toFixed(2)}`} />
>>>>>>> main
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
            </Card>
        );
    };

    return (
<<<<<<< HEAD
        <div style={{backgroundColor:'#F5F6FA'}}>
            <Container fluid>
                <Row>
                    <Col md={2} className='ps-0'>
                        <AdminSidebar ></AdminSidebar>
                    </Col>
                    <Col md={10}>
=======
        <div style={{ backgroundColor: '#F5F6FA' }}>
            <Container fluid>
                <Row>
                    <Col md={2} className="p-0" style={{ minHeight: "100vh" }}>
                        <AdminSidebar ></AdminSidebar>
                    </Col>
                    <Col md={10} style={{ minHeight: "100vh" }}>
>>>>>>> main
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