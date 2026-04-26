import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Home() {

    const navigate = useNavigate();
    
    const handleGoToProjects = () => {
        navigate('/projects');
    }

    return (
        <Box>
            <Grid spacing={12} container>
                <Grid size={6}>
                    <Paper>
                        <Button
                            onClick={handleGoToProjects}
                        >
                        </Button>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
}