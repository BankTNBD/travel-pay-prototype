import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';

export default function TopBar() {
    return (
        <AppBar position="static" sx={{ width: 1 }}>
            <Toolbar>
                <Typography variant="h6" component="div" >
                    TravelPay
                </Typography>
            </Toolbar>
        </AppBar>
    );
}