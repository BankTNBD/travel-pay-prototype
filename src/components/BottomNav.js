import React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import AddList from './AddList';

export default function BottomNav() {
    const [value, setValue] = React.useState(0);
    const [open, setOpen] = React.useState(value == 1);

    return (
        <Box sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}>
            <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                    setOpen(newValue == 1)
                }}
            >
                <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
                <BottomNavigationAction label="New" icon={<AddCircleRoundedIcon />} />
                <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />
            </BottomNavigation>
            <AddList open={open} setOpen={setOpen}/>
        </Box>
    );
}
