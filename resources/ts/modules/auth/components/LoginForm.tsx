import React, { useState } from "react";
import { router, useForm } from "@inertiajs/react";
import {
    Button,
    TextField,
    Stack,
    InputAdornment,
    IconButton,
    CircularProgress,
} from "@mui/material";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export default function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);
    const { data, setData, post, processing, errors } = useForm({
        email: "",
        password: "",
    });

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    function submit(e: React.FormEvent) {
        e.preventDefault();

        post("/login", {
            onSuccess: () => {
                router.visit("/home", {
                    replace: true,
                    preserveState: false,
                    preserveScroll: false,
                });
            },
        });
    }

    return (
        <form onSubmit={submit} style={{ width: "100%" }}>
            <Stack spacing={3}>
                <TextField
                    label="Email"
                    placeholder="Digite seu email"
                    value={data.email}
                    onChange={(e) => setData("email", e.target.value)}
                    error={!!errors.email}
                    helperText={errors.email}
                    fullWidth
                    variant="outlined"
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AlternateEmailIcon color="action" />
                                </InputAdornment>
                            ),
                        },
                    }}
                />

                <TextField
                    label="Senha"
                    placeholder="Digite sua senha"
                    type={showPassword ? "text" : "password"}
                    value={data.password}
                    onChange={(e) => setData("password", e.target.value)}
                    error={!!errors.password}
                    helperText={errors.password}
                    fullWidth
                    variant="outlined"
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <LockOutlinedIcon color="action" />
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        },
                    }}
                />

                <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    disabled={processing}
                    fullWidth
                    sx={{
                        py: 1.5,
                        fontWeight: "bold",
                        borderRadius: 2,
                        textTransform: "none",
                        fontSize: "1rem",
                    }}
                >
                    {processing ? <CircularProgress size={24} color="inherit" /> : "Entrar"}
                </Button>
            </Stack>
        </form>
    );
}
