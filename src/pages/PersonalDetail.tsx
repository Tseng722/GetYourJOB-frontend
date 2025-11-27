import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import ProfileSection from '../components/ProfileSection';

const PersonalDetail: React.FC = () => {
    return (
        <Container >
            <ProfileSection />
        </Container>
    );
};

export default PersonalDetail;
