import React, { useState, useEffect, type ChangeEvent } from "react";
import { Form, Button, Row, Col, Container, Alert, Spinner } from "react-bootstrap";

import { createApplication } from "../api/applicationApi";
import { useNavigate } from "react-router-dom";
import type { ApplicationForm, StatusType } from "../types/applicationType";


const CreateApplication: React.FC = () => {
    const [form, setForm] = useState<ApplicationForm>({
        companyTitle: "",
        jobTitle: "",
        applicationDate: new Date().toISOString().split('T')[0],
        resourceId: "",
        applyById: "",
        website: "",
    });


    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [saving, setSaving] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);
    const navigate = useNavigate()

    const statusOptions: Array<{ value: StatusType; label: string }> = [
        { value: "inProgress", label: "In progress" },
        { value: "applyed", label: "Applied" },
        { value: "firstInterview", label: "1st Interview" },
        { value: "secondInterview", label: "2nd Interview" },
        { value: "thirdInterview", label: "3rd Interview" },
        { value: "fourthInterview", label: "4th Interview" },
        { value: "fifthInterview", label: "5th Interview" },
        { value: "offer", label: "Offer" },
        { value: "rejected", label: "Rejected" },
    ];


    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    // 儲存資料
    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setSuccess(false);
        setError(null);
        try {
            await createApplication(form);
            setSuccess(true);
            navigate("/overview")
        } catch (err: any) {
            setError(err.message || "儲存失敗");
        } finally {
            setSaving(false);
        }
    };

    if (error) return <p>Error: {error}</p>;

    return (
        <Container>
            <Form onSubmit={handleSave}>
                <Row className="mb-3">
                    <Col md={6}>
                        <Form.Group controlId="companyTitle">
                            <Form.Label>Company</Form.Label>
                            <Form.Control
                                value={form.companyTitle ?? ""}
                                onChange={handleChange}
                                placeholder="Company title"
                            />
                        </Form.Group>
                    </Col>

                    <Col md={6}>
                        <Form.Group controlId="jobTitle">
                            <Form.Label>Job Title *</Form.Label>
                            <Form.Control
                                required
                                value={form.jobTitle}
                                onChange={handleChange}
                                placeholder="Job title"
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col md={3}>
                        <Form.Group controlId="applicationDate">
                            <Form.Label>Application Date</Form.Label>
                            <Form.Control
                                type="date"
                                value={form.applicationDate ? new Date(form.applicationDate).toISOString().split("T")[0] : ""}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>

                    <Col md={3}>
                        <Form.Group controlId="status">
                            <Form.Label>Status</Form.Label>
                            <Form.Select
                                value={form.status ?? ""}
                                onChange={handleChange}
                            >
                                <option value="">-- Select --</option>
                                {statusOptions.map((s) => (
                                    <option key={s.value ?? "null"} value={s.value ?? ""}>
                                        {s.label}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Col>

                    <Col md={3}>
                        <Form.Group controlId="resourceId">
                            <Form.Label>Resource</Form.Label>
                            <Form.Select
                                value={form.resourceId ?? ""}
                                onChange={handleChange}
                            >
                                <option value="">-- Select --</option>
                                <option value="Linkedin">Linkedin</option>
                                <option value="Website">Website</option>
                                <option value="WelcomeToJungle">Welcome to jungle</option>
                                <option value="WelcomeToJungle">Glassdoor</option>
                                <option value="WelcomeToJungle">Reed</option>
                                <option value="WelcomeToJungle">TotalJobs</option>
                                <option value="Email">Email</option>
                                <option value="Networking">Networking</option>
                                <option value="Indeed">Indeed</option>
                                <option value="Other">Other</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col md={3}>
                        <Form.Group controlId="applyById">
                            <Form.Label>Apply By</Form.Label>
                            <Form.Select
                                value={form.applyById ?? ""}
                                onChange={handleChange}
                            >
                                <option value="">-- Select --</option>
                                <option value="Linkedin">Linkedin</option>
                                <option value="Website">Website</option>
                                <option value="WelcomeToJungle">Welcome to jungle</option>
                                <option value="Email">Email</option>
                                <option value="Networking">Networking</option>
                                <option value="Indeed">Indeed</option>
                                <option value="Other">Other</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>

                <Form.Group className="mb-3" controlId="website">
                    <Form.Label>Website</Form.Label>
                    <Form.Control
                        type="url"
                        value={form.website ?? ""}
                        onChange={handleChange}
                        placeholder="https://company.com/job"
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="howManyApplicant">
                    <Form.Label>How many applicants</Form.Label>
                    <Form.Control
                        type="number"
                        min={0}
                        value={form.howManyApplicant ?? ""}
                        onChange={handleChange}
                        placeholder="Number of applicants"
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="jobDescription">
                    <Form.Label>Job Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={6}
                        value={form.jobDescription ?? ""}
                        onChange={handleChange}
                    />
                </Form.Group>

                <div className="d-flex gap-2">
                    <Button variant="secondary" onClick={() => navigate(-1)}>
                        Back
                    </Button>
                    <Button type="submit" variant="primary" disabled={saving}>
                        {saving ? (
                            <>
                                <Spinner animation="border" size="sm" /> Saving...
                            </>
                        ) : (
                            form.id ? "Update" : "Create"
                        )}
                    </Button>
                    {success && <span style={{ color: "green" }}>Success</span>}
                </div>

            </Form>

        </Container >
    );
};

export default CreateApplication;
