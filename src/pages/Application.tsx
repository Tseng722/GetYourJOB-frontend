import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import UpdateApplication from '../components/UpdateApplication';

const Application: React.FC = () => {

    return (
        <Container>
            <UpdateApplication />
        </Container>
    );
};

export default Application;
