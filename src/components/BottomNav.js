import React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import FunctionsIcon from '@mui/icons-material/Functions';
import PeopleIcon from '@mui/icons-material/People';
import AddList from './AddList';
import AddPeople from './AddPeople';

export default function BottomNav({ updateFunc }) {
    const [value, setValue] = React.useState(null);
    const [openAddList, setOpenAddList] = React.useState(value == 1);
    const [openAddPeople, setOpenAddPeople] = React.useState(value == 0);

    return (
        <Box sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}>
            <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {
                    setOpenAddList(newValue == 1)
                    setOpenAddPeople(newValue == 0)
                }}
            >
                <BottomNavigationAction label="People" icon={<PeopleIcon />} />
                <BottomNavigationAction label="New" icon={<AddCircleRoundedIcon />} />
                <BottomNavigationAction label="Summarize" icon={<FunctionsIcon />} />
            </BottomNavigation>
            <AddPeople open={openAddPeople} setOpen={setOpenAddPeople} updateFunc={updateFunc}/>
            <AddList open={openAddList} setOpen={setOpenAddList} updateFunc={updateFunc}/>
        </Box>
    );
}
