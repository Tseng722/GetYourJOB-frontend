import React, { useState, type FormEvent } from "react"
import axiosClient from "../api/axiosClient" // 根據實際檔案位置修改

const RegisterPage: React.FC = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")
    const [error, setError] = useState("")

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError("")
        setMessage("")

        try {
            const res = await axiosClient.post("/auth/register", {
                name,
                email,
                password,
            })

            const data = res.data
            localStorage.setItem("token", data.token)

            setMessage("註冊成功！請前往登入")
        } catch (err: any) {
            console.error(err)
            const msg =
                err.response?.data?.message ||
                err.response?.data?.error ||
                "註冊失敗，請稍後再試"
            setError(msg)
        }
    }

    return (
        <div className="login-container" style={{ maxWidth: 400, margin: "50px auto" }}>
            <h2>Create your account</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>姓名</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label>密碼</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="form-control"
                    />
                </div>

                {error && <p style={{ color: "red" }}>{error}</p>}
                {message && <p style={{ color: "green" }}>{message}</p>}

                <button type="submit" className="btn btn-primary" style={{ marginTop: 10 }}>
                    Register
                </button>
            </form>
        </div>
    )
}

export default RegisterPage
