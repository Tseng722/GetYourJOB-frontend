import React, { useEffect, useState } from 'react'
import { Table, Spinner, Alert, Button, Container } from 'react-bootstrap'
import { getUserApplication, type AllApplication } from "../api/applicationApi"
import { useNavigate } from 'react-router-dom'

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
    if (applications.length === 0) return <p>No applications found.</p>

    return (
        <Container className="mt-4">
            <h4>Your Applications</h4>
            <Table bordered hover responsive>
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
                                <Button
                                    variant="secondary"
                                    size="sm"
                                    onClick={() => navigate(`/applications/update/${app.id}`)}
                                >
                                    View
                                </Button>
                            </td>
                            <td>{app.companyTitle || '-'}</td>
                            <td>{app.jobTitle}</td>
                            <td>{app.status || '-'}</td>
                            <td>{app.applicationDate ? new Date(app.applicationDate).toLocaleDateString() : '-'}</td>
                            <td>
                                {app.website ? (
                                    <a href={app.website} target="_blank" rel="noopener noreferrer">
                                        Link
                                    </a>
                                ) : (
                                    '-'
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    )
}

export default AllApplicationTable
