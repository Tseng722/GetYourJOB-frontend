import MetricCard from "../components/MetricCard";

import { Spinner, Col, Row } from 'react-bootstrap'
import { useApplicationMetrics } from "../hooks/useApplicationMetrics"
const MetricsDashboard = () => {
    const { data, loading } = useApplicationMetrics();
    if (loading || !data) return <Spinner />;

    return (
        <>
            <Row>
                <Col md={4}>
                    <MetricCard label="Total" value={data.appliedCount} />
                </Col>
                <Col md={4}>
                    <MetricCard label="This Month" value={data.thisMonth} />
                </Col>
                <Col md={4}>
                    <MetricCard label="This Week" value={data.thisWeek} />
                </Col>
            </Row>
            <Row>
                <Col md={4}>
                    <MetricCard label="Applied→Screening" value={`${data.appliedToScreening}%`} />
                </Col>
                <Col md={4}>
                    <MetricCard label="Screening→Interview" value={`${data.screeningToInterview}%`} />
                </Col>
                <Col md={4}>
                    <MetricCard label="Interview→Offer" value={`${data.interviewToOffer}%`} />
                </Col>



            </Row>

            <Row>
                <Col md={6}>
                    <MetricCard label="Rejection Rate" value={`${data.rejectionRate}%`} />
                </Col>
                <Col md={6}>
                    <MetricCard label="Ghosting Rate" value={`${data.ghostingRate}%`} />
                </Col>

            </Row>


        </>
    );
};
export default MetricsDashboard
