import { Box, Paper, Typography } from "@mui/material";
import LoginForm from "@/modules/auth/components/LoginForm";

export default function Login() {
    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "grid",
                placeItems: "center",
                p: 2,
                background: "linear-gradient(135deg, #0f172a, #1e293b)",
            }}
        >
            <Paper sx={{ width: "100%", maxWidth: 420, p: 4, borderRadius: 3 }} elevation={8}>
                <Typography variant="h4" fontWeight={700} sx={{ mb: 1 }}>
                    Aplicacao
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    Entre com seu email e senha
                </Typography>

                <LoginForm />

                <Typography variant="caption" color="text.disabled" sx={{ display: "block", mt: 3 }}>
                    Use suas credenciais de ambiente
                </Typography>
            </Paper>
        </Box>
    );
}
