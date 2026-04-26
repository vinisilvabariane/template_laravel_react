import { router } from "@inertiajs/react";
import { Box, Button, Paper, Typography } from "@mui/material";

export default function HomePage() {
    const handleLogout = () => router.post("/logout");

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "grid",
                placeItems: "center",
                p: 2,
                background: "linear-gradient(135deg, #111827, #1f2937)",
            }}
        >
            <Paper sx={{ width: "100%", maxWidth: 520, p: 4, borderRadius: 3 }} elevation={8}>
                <Typography variant="h4" fontWeight={700} sx={{ mb: 1 }}>
                    Home
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                    Aplicacao minima com autenticacao JWT pronta.
                </Typography>

                <Button variant="contained" color="error" onClick={handleLogout}>
                    Sair
                </Button>
            </Paper>
        </Box>
    );
}
