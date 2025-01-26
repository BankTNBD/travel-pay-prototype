"use client";

import * as React from 'react';
import { Container, Typography, Checkbox } from '@mui/material';
import BottomNav from '@/components/BottomNav';
import TopBar from '@/components/TopBar';
import styles from './page.module.css';
import { readLocalStorage } from '@/functions/localStorageFunc';

export default function Home() {
    const [billsList, setBillsList] = React.useState([]);
    const [peopleList, setPeopleList] = React.useState([]);
    React.useEffect(() => {
        const billsList = readLocalStorage('billsList') || [];
        setBillsList(billsList);

        const peopleList = readLocalStorage('peopleList') || [];
        setPeopleList(peopleList);
    }, []);

    return (
        <div className={styles.page}>
            <TopBar />
            <Container sx={{ marginBottom: '60px', maxWidth: '100vw', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {billsList.map((value, index) => (
                    <Container key={index} sx={{ margin: 1 }}>
                        <Typography variant="h6" component="h2">
                            {value.bill}
                        </Typography>
                        <Container sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            {peopleList.map((person, index) => (
                                <Checkbox
                                    sx={{ '&:hover': { bgcolor: 'transparent' } }}
                                    disableRipple
                                    color="default"
                                    inputProps={{ 'aria-label': 'Checkbox demo' }}
                                />
                            ))}
                        </Container>

                    </Container>
                ))}
            </Container>
            <BottomNav />
        </div>
    );
}