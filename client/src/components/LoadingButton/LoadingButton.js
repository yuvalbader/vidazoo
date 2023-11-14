import React from 'react';
import { Button, CircularProgress } from '@mui/material';

const LoadingButton = ({ loading, handleClick }) => {
    return (
        <Button
            variant="contained"
            onClick={handleClick}
            disabled={loading}
            sx={{ marginLeft: 2 }}
        >
            {loading ? <CircularProgress size={24} /> : 'Parse Ads.txt'}
        </Button>
    );
};

export default LoadingButton;
