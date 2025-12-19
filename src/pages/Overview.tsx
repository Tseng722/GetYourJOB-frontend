import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import ProfileSection from '../components/ProfileSection';
import MetricsDashboard from './MetricsDashboard'

const Overview: React.FC = () => {
    const navigate = useNavigate();

    return (
        <Container>
            <h1>TBC</h1>
            <MetricsDashboard />

        </Container>
    );
};

export default Overview;
