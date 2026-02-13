import type { FC } from 'react';
import { Fab, Zoom, useScrollTrigger } from '@mui/material';
import { ChevronUp } from 'lucide-react';

export const ScrollToTop: FC = () => {
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 300,
    });

    const handleClick = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <Zoom in={trigger}>
            <Fab
                onClick={handleClick}
                size="medium"
                aria-label="scroll back to top"
                sx={{
                    position: 'fixed',
                    bottom: 32,
                    right: 32,
                    bgcolor: 'primary.main',
                    color: 'white',
                    boxShadow: '0 4px 14px 0 rgba(37, 99, 235, 0.39)',
                    '&:hover': {
                        bgcolor: 'primary.dark',
                        transform: 'translateY(-4px)',
                    },
                    transition: 'all 0.2s ease-in-out',
                }}
            >
                <ChevronUp size={24} />
            </Fab>
        </Zoom>
    );
};
