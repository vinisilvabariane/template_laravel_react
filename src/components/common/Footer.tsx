import { Box, Container, Typography, Link } from "@mui/material";

export default function Footer() {
    return (
        <Box
            component="footer"
            sx={{
                backgroundColor: 'transparent',
                py: 3,
                mt: 'auto'
            }}
        >
            <Container maxWidth="lg">
                <Typography
                    variant="body2"
                    align="center"
                    sx={{
                        color: 'rgba(255, 255, 255, 0.7)'
                    }}
                >
                    {'© '}
                    <Link
                        color="inherit"
                        href="/"
                        sx={{
                            color: 'white',
                            textDecoration: 'none',
                            '&:hover': {
                                textDecoration: 'underline'
                            }
                        }}
                    >
                        Vinicius Bariane
                    </Link>{' '}
                    {new Date().getFullYear()}
                </Typography>
                <Typography
                    variant="body2"
                    align="center"
                    sx={{
                        mt: 1,
                        color: 'rgba(255, 255, 255, 0.5)'
                    }}
                >
                    Feito com React & Material-UI
                </Typography>
            </Container>
        </Box>
    );
}