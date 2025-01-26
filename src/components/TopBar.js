import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

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