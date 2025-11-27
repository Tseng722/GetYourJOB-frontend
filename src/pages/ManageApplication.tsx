import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import { useParams } from "react-router-dom";
import UpdateApplication from '../components/UpdateApplication';
import CreateApplication from '../components/CreateApplication';

const ManageApplication: React.FC = () => {
    const { id } = useParams();


    if (id) {
        return <UpdateApplication />;
    }

    return <CreateApplication />;

    // return (
    //     <Container>
    //         <UpdateApplication />
    //         <CreateApplication />
    //     </Container>
    // );
};

export default ManageApplication;
