import React, { useState } from 'react';
import { AppBar, Toolbar, TextField, Button } from '@mui/material';

const SearchBar = ({ handleParse, loading }) => {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleParseInput = () => {
        handleParse(inputValue);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && !loading) {
            handleParseInput();
        }
    };

    return (
        <AppBar position="static" color="inherit" elevation={0} style={{
            marginTop: 15,
            marginBottom: 15,
        }}>
            <Toolbar>
                <TextField
                    label="Enter domain name..."
                    variant="outlined"
                    size="small"
                    sx={{ flex: 1 }}
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                />
                <Button
                    variant="contained"
                    onClick={handleParseInput}
                    disabled={loading}
                    sx={{ marginLeft: 2 }}
                >
                    Parse Ads.txt
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default SearchBar;
