import React, { useState, useEffect, type ChangeEvent } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { getUserProfile, updateUserProfile } from "../api/userApi";

// 從 API 取回與表單相同的資料結構
interface Profile {
    name: string;
    email: string;
    phone: string;
    location: string;
    experience: string;
}

const ProfileSection: React.FC = () => {
    const [formData, setFormData] = useState<Profile>({
        name: "",
        email: "",
        phone: "",
        location: "",
        experience: "",
    });

    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [saving, setSaving] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);

    // 初始化載入資料
    useEffect(() => {
        async function loadProfile() {
            try {
                const data = await getUserProfile();
                setFormData(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        loadProfile();
    }, []);

    // 處理輸入變更
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({
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
            await updateUserProfile(formData);
            setSuccess(true);
        } catch (err: any) {
            setError(err.message || "儲存失敗");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <p>載入中...</p>;
    if (error) return <p>錯誤: {error}</p>;

    return (
        <div className="apple-card mb-4">
            <Form onSubmit={handleSave}>
                <h2 className="section-title"></h2>
                <h2 className="apple-title-primary mb-4">Personal Detail</h2>

                <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter your name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="phone">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                        type="tel"
                        placeholder="Enter your phone"
                        value={formData.phone ?? ""}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="location">
                    <Form.Label>Current Location</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter your location"
                        value={formData.location ?? ""}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="experience">
                    <Form.Label>Experiences</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={12}
                        placeholder="Enter something....."
                        value={formData.experience ?? ""}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Button onClick={handleSave} disabled={saving} variant="primary" type="submit">
                    {saving ? "儲存中..." : "儲存"}
                </Button>

                {success && <span style={{ color: "green", marginLeft: 10 }}>儲存成功！</span>}
                {error && <span style={{ color: "red", marginLeft: 10 }}>{error}</span>}
            </Form>

        </div>

    );
};

export default ProfileSection;
