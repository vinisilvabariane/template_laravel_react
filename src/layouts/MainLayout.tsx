import { Box } from "@mui/material";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            backgroundColor: '#141416'
        }}>
            <Navbar />
            <Box component="main" sx={{
                flexGrow: 1,
                py: 3,
                px: { xs: 2, md: 4 },
                backgroundColor: '#141416'
            }}>
                <Outlet />
            </Box>
            <Footer />
        </Box>
    );
}