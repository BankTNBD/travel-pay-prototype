"use client";

import * as React from 'react';
import { Container, Typography, Checkbox } from '@mui/material';
import BottomNav from '@/components/BottomNav';
import TopBar from '@/components/TopBar';
import styles from './page.module.css';
import { readLocalStorage, updateLocalStorage, removeLocalStorage } from '@/functions/localStorageFunc';
import { SwipeableList, SwipeableListItem } from '@sandstreamdev/react-swipeable-list';
import '@sandstreamdev/react-swipeable-list/dist/styles.css';

export default function Home() {
    const [billsList, setBillsList] = React.useState([]);
    const [peopleList, setPeopleList] = React.useState([]);

    const loadLocalStorageData = () => {
        const billsList = readLocalStorage('billsList') || [];
        setBillsList(billsList);
        const peopleList = readLocalStorage('peopleList') || [];
        setPeopleList(peopleList);
    };

    React.useEffect(() => {
        loadLocalStorageData();

        const handleStorageChange = () => {
            loadLocalStorageData();
        };


        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    const handleDelete = (id) => {
        updateLocalStorage('billsList', 'removeById', id);
        setBillsList(readLocalStorage('billsList'));
        removeLocalStorage(id);
    };

    const handleCheckboxChange = (value, person) => {
        const data = readLocalStorage(value.id);
        if(data.includes(person)) {
            updateLocalStorage(value.id, 'remove', person);
        } else {
            updateLocalStorage(value.id, 'add', person);
        }
        loadLocalStorageData();
    };

    const handleCheckChange = (value, person) => {
        return readLocalStorage(value.id).includes(person);
    };

    return (
        <div className={styles.page}>
            <TopBar />
            <SwipeableList
                style={{ marginBottom: '60px', maxWidth: '100vw', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                
            >
                {billsList.map((value, index) => (
                    <SwipeableListItem
                        key={index}
                        swipeLeft={{
                            content: <div style={{ backgroundColor: 'red', color: 'white', height: '100%', width: '100%', display: 'flex', justifyContent: 'end', alignItems: 'center' }}>
                                <Typography variant="h6" component="h2" sx={{ color: 'white', padding: 1 }}>
                                Delete
                                </Typography>
                            </div>,
                            action: () => handleDelete(value.id),
                        }}
                        
                    >
                        <Container>
                            <Typography variant="h6" component="h2">
                                {value.bill} {value.amount}฿
                            </Typography>
                            <Container sx={{ display: 'flex', justifyContent: 'space-between', margin: 1 }}>
                                <Container sx={{ display: 'flex', flexDirection: 'row', width: 'max-content', overflowX: 'auto' }} disableGutters>
                                    {peopleList.map((person, index) => (
                                        <Container
                                            key={index}
                                            sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 'max-content' }}
                                        >
                                            <Checkbox
                                                checked={handleCheckChange(value, person) || false}
                                                onChange={() => handleCheckboxChange(value, person)}
                                                sx={{ '&:hover': { bgcolor: 'transparent' } }}
                                                disableRipple
                                                color="default"
                                                inputProps={{ 'aria-label': 'Checkbox' }}
                                            />
                                            <Typography variant="body2" component="p">
                                                {person}
                                            </Typography>
                                        </Container>
                                    ))}
                                </Container>
                            </Container>
                        </Container>
                    </SwipeableListItem>
                ))}
            </SwipeableList>
            <BottomNav updateFunc={loadLocalStorageData}/>
        </div>
    );
}