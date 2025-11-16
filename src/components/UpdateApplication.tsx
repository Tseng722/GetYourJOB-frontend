import React, { useState, useEffect, type ChangeEvent } from "react";
import { Form, Button, Row, Col, Container, Alert, Spinner } from "react-bootstrap";

import { getApplicationById, updateApplication } from "../api/applicationApi";
import { useParams, useNavigate } from "react-router-dom";

export type StatusType =
    | "inProgress"
    | "applyed"
    | "firstInterview"
    | "secondInterview"
    | "thirdInterview"
    | "fourthInterview"
    | "fifthInterview"
    | "offer"
    | "rejected"
    | null;

interface ApplicationForm {
    id?: number;
    companyTitle?: string | null;
    jobTitle: string;
    applicationDate?: string | null;
    status?: StatusType;
    resourceId?: string | null;
    applyById?: string | null;
    website?: string | null;
    howManyApplicant?: number | null;
    jobDescription?: string | null;
    coverLetter?: string | null;
    qusetion?: string | null;
    analyzedJDResponse?: string | null;
    atsScoreResponse?: number | null;
    atsDescriptionResponse?: string | null;
    resumeSuggestionResponse?: string | null;
    inProgressDate?: string | null;
    applyedDate?: string | null;
    // firstInterviewDate?: string | null;
    // secondInterviewDate?: string | null;
    // thirdInterviewDate?: string | null;
    // fourthInterviewDate?: string | null;
    // fifthInterviewDate?: string | null;
    // offerDate?: string | null;
    // rejectedDate?: string | null;
}

const UpdateApplication: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [form, setForm] = useState<ApplicationForm>({
        id: Number(id),
        companyTitle: "",
        jobTitle: "",
        applicationDate: "",
        resourceId: "",
        applyById: "",
        website: "",
    });


    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [saving, setSaving] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);
    const navigate = useNavigate()

    // 初始化載入資料

    useEffect(() => {
        async function loadApplication() {
            try {
                const data = await getApplicationById(Number(id));
                setForm(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        loadApplication();
    }, []);
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


    // 處理輸入變更
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
            await updateApplication(form);
            setSuccess(true);
        } catch (err: any) {
            setError(err.message || "儲存失敗");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <p>Loading...</p>;
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
                    <Col md={4}>
                        <Form.Group controlId="applicationDate">
                            <Form.Label>Application Date</Form.Label>
                            <Form.Control
                                type="date"
                                value={form.applicationDate ? new Date(form.applicationDate).toISOString().split("T")[0] : ""}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>

                    <Col md={4}>
                        <Form.Group controlId="status">
                            <Form.Label>Status</Form.Label>
                            <Form.Select
                                value={form.status ?? ""}
                                onChange={handleChange}
                            >
                                <option value="">-- Select status --</option>
                                {statusOptions.map((s) => (
                                    <option key={s.value ?? "null"} value={s.value ?? ""}>
                                        {s.label}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Col>

                    <Col md={4}>
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

                <Form.Group className="mb-3" controlId="coverLetter">
                    <Form.Label>Cover Letter</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={4}
                        value={form.coverLetter ?? ""}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="qusetion">
                    <Form.Label>Question / Notes</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        value={form.qusetion ?? ""}
                        onChange={handleChange}
                    />
                </Form.Group>

                <div className="d-flex gap-2">
                    <Button variant="secondary" onClick={() => navigate(-1)}>
                        Cancel
                    </Button>
                    <Button type="submit" variant="primary" disabled={loading}>
                        {loading ? (
                            <>
                                <Spinner animation="border" size="sm" /> Saving...
                            </>
                        ) : (
                            form.id ? "Update" : "Create"
                        )}
                    </Button>
                    {success && <span style={{ color: "green" }}>Updated</span>}
                </div>

            </Form>

        </Container >
    );
};

export default UpdateApplication;
