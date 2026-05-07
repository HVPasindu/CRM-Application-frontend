import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  CircularProgress,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Swal from "sweetalert2";
import api from "../../services/api";

import desktopBg from "../../assets/login-bg-desktop.png";
import mobileBg from "../../assets/login-bg-mobile.png";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const validateEmail = (value) => {
    if (!value.trim()) {
      return "Email is required";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(value)) {
      return "Enter a valid email address";
    }

    return "";
  };

  const validatePassword = (value) => {
    if (!value.trim()) {
      return "Password is required";
    }

    if (value.length < 6) {
      return "Password must be at least 6 characters";
    }

    return "";
  };

  const handleLogin = async () => {
    const emailValidationMessage = validateEmail(email);
    const passwordValidationMessage = validatePassword(password);

    setEmailError(emailValidationMessage);
    setPasswordError(passwordValidationMessage);

    if (emailValidationMessage || passwordValidationMessage) {
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/auth/login", { email, password });

      localStorage.setItem("crm_token", res.data.token);
      localStorage.setItem("crm_user", JSON.stringify(res.data.user));

      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: "Welcome back!",
        confirmButtonText: "OK",
        confirmButtonColor: "#00a6fb",
      }).then(() => {
        navigate("/dashboard");
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: error.response?.data?.message || "Invalid email or password",
        confirmButtonText: "OK",
        confirmButtonColor: "#00a6fb",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: `url(${mobileBg})` }}
    >
      <div
        className="absolute inset-0 hidden md:block bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${desktopBg})` }}
      />

      <div
        className="absolute inset-0 md:hidden bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${mobileBg})` }}
      />

      <Card
        sx={{
          width: "100%",
          maxWidth: 440,
          borderRadius: "28px",
          boxShadow: "0 12px 35px rgba(11, 19, 43, 0.16)",
          position: "relative",
          zIndex: 2,
          backgroundColor: "rgba(255, 255, 255, 0.92)",
          backdropFilter: "blur(8px)",
        }}
      >
        <CardContent sx={{ p: { xs: 3, sm: 5 } }}>
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-[#00a6fb] rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-md">
              <span className="text-white text-2xl font-bold">CRM</span>
            </div>

            <Typography variant="h4" fontWeight="bold" color="secondary">
              Welcome Back
            </Typography>

            <Typography color="text.secondary" mt={1}>
              Login to access your CRM dashboard
            </Typography>
          </div>

          <div className="flex flex-col gap-5 mt-3">
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);

                if (emailError) {
                  setEmailError("");
                }
              }}
              error={!!emailError}
              helperText={emailError}
            />

            <TextField
              fullWidth
              label="Password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);

                if (passwordError) {
                  setPasswordError("");
                }
              }}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              error={!!passwordError}
              helperText={passwordError}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                        sx={{ color: "#0b132b" }}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />
          </div>

          <div className="mt-8">
            <Button
              fullWidth
              variant="contained"
              disabled={loading}
              onClick={handleLogin}
              sx={{
                py: 1.4,
                borderRadius: "14px",
                textTransform: "none",
                fontSize: "16px",
                fontWeight: "bold",
              }}
            >
              {loading ? (
                <CircularProgress size={24} sx={{ color: "white" }} />
              ) : (
                "Login"
              )}
            </Button>
          </div>

          <div className="mt-6 bg-[#f7fbff] border border-blue-100 rounded-2xl p-4 text-sm text-gray-700">
            <p className="font-semibold mb-1">Test Credentials</p>
            <p>Email: admin@example.com</p>
            <p>Password: password123</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Login;