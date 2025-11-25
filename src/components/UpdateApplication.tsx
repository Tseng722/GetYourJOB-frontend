import React, { useState, useEffect, type ChangeEvent } from "react";
import { Form, Button, Row, Col, Container, Alert, Spinner, Accordion } from "react-bootstrap";

import { getApplicationById, updateApplication } from "../api/applicationApi";
import { analyzeJD, analyzeResume, analyzeATS } from "../api/analyzeApi";
import { getUserExperience } from "../api/userApi";
import { useParams, useNavigate } from "react-router-dom";
import type { ApplicationForm, StatusType } from "../types/applicationType";
import { marked } from "marked";



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
        analyzedJDResponse: "",
        jobDescription: "",
        resumeSuggestionResponse: "",
        atsDescriptionResponse: ""
    });

    const [experience, setExperience] = useState<string | null>(null);

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
        async function loadUserExperience() {
            try {
                const experience = await getUserExperience();
                setExperience(experience);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        loadApplication();
        loadUserExperience();
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
    const handleAnalyzeJD = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setError(null);
        setSuccess(false);

        try {
            const result = await analyzeJD({ jobDescription: form.jobDescription ?? "" });  // 呼叫 API
            const jdText = result.analyzedJDResponse || "";

            setForm(prev => ({
                ...prev,
                analyzedJDResponse: jdText
            }));
        } catch (err: any) {
            setError(err.message || "Fail");
        } finally {
            setSaving(false);
        }
    };


    const handleAnalyzeResume = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setError(null);
        setSuccess(false);

        try {
            const result = await analyzeResume({ jd: form.jobDescription ?? "", experience: experience ?? "" });  // 呼叫 API
            const resumeResult = result.resumeResult || "";

            setForm(prev => ({
                ...prev,
                resumeSuggestionResponse: resumeResult
            }));
        } catch (err: any) {
            setError(err.message || "Fail");
        } finally {
            setSaving(false);
        }
    };

    const handleAnalyzeATS = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setError(null);
        setSuccess(false);

        try {
            const result = await analyzeATS({ jd: form.jobDescription ?? "", experience: form.resume ?? "" });  // 呼叫 API
            const atsResult = result.atsResult || "";

            setForm(prev => ({
                ...prev,
                atsDescriptionResponse: atsResult
            }));
        } catch (err: any) {
            setError(err.message || "Fail");
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

                <Row className="mb-3">
                    <Col md={11}>
                        <Form.Group className="mb-3" controlId="analyzedJDResponse">
                            <Accordion >
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header><Form.Label>JD Analysis</Form.Label></Accordion.Header>
                                    <Accordion.Body>
                                        <div
                                            // contentEditable
                                            // className="form-control"
                                            // style={{ minHeight: "150px", whiteSpace: "pre-wrap" }}
                                            dangerouslySetInnerHTML={{ __html: marked(form.analyzedJDResponse ?? "") }}
                                            onInput={(e) =>
                                                setForm((prev) => ({
                                                    ...prev,
                                                    analyzedJDResponse: (e.target as HTMLDivElement).innerHTML
                                                }))
                                            }
                                        />
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </Form.Group>
                    </Col>
                    <Col md={1}>
                        <Button onClick={handleAnalyzeJD} disabled={saving} variant="primary" type="button">
                            {saving ? "Analyzing..." : "Start"}
                        </Button>
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col md={11}>
                        <Form.Group className="mb-3" controlId="resumeSuggestionResponse">
                            <Accordion >
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header><Form.Label>Resume Suggestion</Form.Label></Accordion.Header>
                                    <Accordion.Body>
                                        <div
                                            dangerouslySetInnerHTML={{ __html: marked(form.resumeSuggestionResponse ?? "") }}
                                            onInput={(e) =>
                                                setForm((prev) => ({
                                                    ...prev,
                                                    resumeSuggestionResponse: (e.target as HTMLDivElement).innerHTML
                                                }))
                                            }
                                        />
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </Form.Group>
                    </Col>
                    <Col md={1}>
                        <Button onClick={handleAnalyzeResume} disabled={saving} variant="primary" type="button">
                            {saving ? "Analyzing..." : "Start"}
                        </Button>
                    </Col>
                </Row>
                <Form.Group className="mb-3" controlId="resume">
                    <Form.Label>Resume</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={4}
                        value={form.resume ?? ""}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Row className="mb-3">
                    <Col md={11}>
                        <Form.Group className="mb-3" controlId="atsDescriptionResponse">
                            <Accordion >
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header><Form.Label>ATS Description</Form.Label></Accordion.Header>
                                    <Accordion.Body>
                                        <div
                                            dangerouslySetInnerHTML={{ __html: marked(form.atsDescriptionResponse ?? "") }}
                                            onInput={(e) =>
                                                setForm((prev) => ({
                                                    ...prev,
                                                    atsDescriptionResponse: (e.target as HTMLDivElement).innerHTML
                                                }))
                                            }
                                        />
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </Form.Group>
                    </Col>
                    <Col md={1}>
                        <Button onClick={handleAnalyzeATS} disabled={saving} variant="primary" type="button">
                            {saving ? "Analyzing..." : "Start"}
                        </Button>
                    </Col>
                </Row>


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
                        Back
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
