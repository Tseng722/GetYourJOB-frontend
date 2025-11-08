import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';

const Home: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center', // 垂直置中
                alignItems: 'center',     // 水平置中
                height: '100vh',          // 高度填滿畫面
                textAlign: 'center',
            }}
        >
            <Container>
                <h1>Welcome to Resume Helper</h1>

                <Button variant="primary" onClick={() => navigate('/overview')}>
                    Start
                </Button>
                <Button variant="primary" onClick={() => navigate('/login')}>
                    Login
                </Button>
                <Button variant="primary" onClick={() => navigate('/register')}>
                    Register
                </Button>
            </Container>
        </div>
    );
};

export default Home;
