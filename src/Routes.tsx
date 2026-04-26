import React, { lazy, Suspense } from 'react';
import { Routes as RouterRoutes, Route } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';
import Projects from '@/pages/Projects';
import MainLayout from '@/layouts/MainLayout';

const HomePage = lazy(() => import('@/pages/Home'));

const PageLoader = () => (
    <Box
        sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '60vh'
        }}
    >
        <CircularProgress sx={{ color: 'white' }} />
    </Box>
);

const Routes: React.FC = () => {
    return (
        <RouterRoutes>
            <Route element={<MainLayout />}>
                <Route
                    path="/"
                    element={
                        <Suspense fallback={<PageLoader />}>
                            <HomePage />
                        </Suspense>
                    }
                />
                <Route
                    path="/projects"
                    element={
                        <Suspense fallback={<PageLoader />}>
                            <Projects />
                        </Suspense>
                    }
                />
            </Route>
        </RouterRoutes>
    );
};

export default Routes;