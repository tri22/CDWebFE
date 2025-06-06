import React, { useEffect } from 'react';

import { useAuth } from '../api/AuthContext';
import { Col, Row, Card, Form, Container } from 'react-bootstrap';
import { FaUsers, FaBox, FaChartLine, FaClock, FaArrowUp, FaArrowDown } from 'react-icons/fa';
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
const Home = () => {
    const { user, isLoggedIn } = useAuth();

    useEffect(() => {
        if (isLoggedIn && user) {
            console.log("Thông tin user:", user);
        }
    }, [user, isLoggedIn]);

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

    const DashboardStats = () => {
        return (
            <Row className="g-4 my-4">
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
            </Row>
        );
    };

    const data = Array.from({ length: 40 }, (_, i) => ({
        name: `${(i + 1) * 1500}`,
        value: Math.floor(30 + Math.random() * 70), // từ 30% đến 100%
    }));

    const SalesChart = () => {
        return (
            <Card className="shadow-sm border-0 rounded-4 p-5 mt-4">
                <Row className="align-items-center mb-3">
                    <Col>
                        <h5 className="fw-bold mb-0">Sales Details</h5>
                    </Col>
                    <Col xs="auto">
                        <Form.Select size="sm">
                            <option>October</option>
                            <option>September</option>
                            <option>August</option>
                        </Form.Select>
                    </Col>
                </Row>

                <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id="colorBlue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#4e7cf3" stopOpacity={0.4} />
                                <stop offset="95%" stopColor="#4e7cf3" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                        <YAxis
                            domain={[0, 100]}
                            tickFormatter={(val) => `${val}%`}
                            tick={{ fontSize: 12 }}
                        />
                        <Tooltip formatter={(val) => `${val.toFixed(2)}%`} />
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
        <div style={{backgroundColor:'#F5F6FA'}}>
            <Container fluid>
                <Row>
                    <Col md={2} className='ps-0'>
                        <AdminSidebar ></AdminSidebar>
                    </Col>
                    <Col md={10}>
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