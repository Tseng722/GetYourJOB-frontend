import React, { useState, type FormEvent } from "react"
import { useNavigate } from "react-router-dom"
import api from "../api/axiosClient";

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [error, setError] = useState<string>("")
    const navigate = useNavigate()

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError("") // 清空舊錯誤

        try {
            const res = await api.post("/auth/login", { email, password })

            const { token } = res.data

            // 儲存 token
            localStorage.setItem("token", token)

            console.log("✅ Login success")
            navigate("/overview")
        } catch (err: any) {
            setError(err.message || "未知錯誤，請稍後再試")
        }
    }

    return (
        <div className="login-container" style={{ maxWidth: 400, margin: "50px auto" }}>
            <h2>登入</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Email：</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>密碼：</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="form-control"
                    />
                </div>
                {error && <p style={{ color: "red" }}>{error}</p>}
                <button type="submit" className="btn btn-primary" style={{ marginTop: 10 }}>
                    登入
                </button>
            </form>
        </div>
    )
}

export default LoginPage
