import React, { useEffect, useState } from 'react'
import { Table, Spinner, Alert, Button, Container, Row, Col } from 'react-bootstrap'
import { getUserApplication, type AllApplication } from "../api/applicationApi"
import { useNavigate } from 'react-router-dom'
import StatusTag from '../style/StatusTag'
import "../style/apple.css";
const AllApplicationTable: React.FC = () => {
    const [applications, setApplications] = useState<AllApplication[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string>('')
    const navigate = useNavigate()

    useEffect(() => {
        async function loadApplications() {
            try {
                const data = await getUserApplication()
                setApplications(data)
            } catch (err: any) {
                console.error('Error fetching applications:', err)
                setError('Failed to load applications.')
            } finally {
                setLoading(false)
            }
        }

        loadApplications()
    }, [])

    if (loading) return <Spinner animation="border" />
    if (error) return <Alert variant="danger">{error}</Alert>
    // if (applications.length === 0) return <p>No applications found.</p>

    return (
        <Container className="mt-4">
            <div className="max-w-6xl mx-auto p-8 space-y-8">
                {/* Header */}
                <div className="flex justify-between ">
                    <Row>
                        <Col md={9}>
                            <h2 className='apple-title-primary'>Your Applications</h2>
                        </Col>
                        <Col md={3}>
                            <button
                                onClick={() => navigate(`/applications/create`)}
                                className="apple-btn-primary"
                            >
                                + New Application
                            </button>
                        </Col>

                    </Row>
                </div>

                {/* Card Container */}
                <div className="apple-table-card mt-4" style={{
                    overflow: "hidden",
                }}>
                    <table className="min-w-full apple-table">
                        <thead>
                            <tr>
                                <th>Action</th>
                                <th>Company</th>
                                <th>Job Title</th>
                                <th>Status</th>
                                <th>Application Date</th>
                                <th>Website</th>
                            </tr>
                        </thead>

                        <tbody>
                            {applications.map((app) => (
                                <tr key={app.id ?? Math.random()}>
                                    <td>
                                        <span
                                            className="apple-action-btn"
                                            onClick={() => navigate(`/applications/update/${app.id}`)}
                                        >
                                            View →
                                        </span>
                                    </td>

                                    <td>{app.companyTitle || "-"}</td>

                                    <td className="max-w-xs truncate">{app.jobTitle}</td>

                                    <td>
                                        <StatusTag status={app.status ?? ""} />
                                    </td>

                                    <td>
                                        {app.applicationDate
                                            ? new Date(app.applicationDate).toLocaleDateString()
                                            : "-"}
                                    </td>

                                    <td>
                                        {app.website ? (
                                            <a
                                                href={app.website}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 hover:underline"
                                            >
                                                Link
                                            </a>
                                        ) : (
                                            "-"
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </Container>
    )
}

export default AllApplicationTable
