import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import ProfileSection from '../components/ProfileSection';

const Overview: React.FC = () => {
    const navigate = useNavigate();

    return (
        <Container>
            {/* <Button variant="primary" onClick={() => navigate('/createApplication')}>New</Button> */}
            <ProfileSection />
        </Container>
    );
};

export default Overview;
