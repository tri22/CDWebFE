import React, { useEffect, useState } from 'react';
import { useAuth } from '../api/AuthContext';
import { Col, Row, Card, Form, Container } from 'react-bootstrap';

import {
    FaBan, FaBox, FaChartLine, FaArrowUp, FaArrowDown,
} from 'react-icons/fa';
import {
    AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from 'recharts';
import orderApi from '../api/orderApi';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import AdminSidebar from '../components/AdminSidebar';
import AdminNav from '../components/AdminNav';


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






    const SalesChart = () => (
        <Card className="shadow-sm border-0 rounded-4 p-5 mt-4">
            <Row className="align-items-center mb-3">
                <Col>
                    <h5 className="fw-bold mb-0">{t("adminHome.salesDetails")}</h5>

                </Col>
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
                        tickFormatter={(val) => t("currency", { value: val })}
                        tick={{ fontSize: 12 }}
                    />
                    <Tooltip formatter={(val) => t("currency", { value: val.toFixed(2) })} />
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


    return (
        <div style={{ backgroundColor: '#F5F6FA' }}>
            <Container fluid>
                <Row>
                    <Col md={2} className="p-0" style={{ minHeight: "100vh" }}>
                        <AdminSidebar ></AdminSidebar>
                    </Col>
                    <Col md={10} style={{ minHeight: "100vh" }}>

                        <AdminNav user={user} title={t("adminTitle.dashboard")} />
                        <DashboardStats />
                        <SalesChart />

                    </Col>
                </Row >
            </Container>

        </div>

    );
};

export default Home;