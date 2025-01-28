"use client";

import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, List, ListItem, ListItemAvatar, Avatar, ListItemText, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { readLocalStorage, writeLocalStorage, updateLocalStorage } from '@/functions/localStorageFunc';

export default function AddList({ open, setOpen, updateFunc }) {
    const [dense, setDense] = React.useState(false);
    const [secondary, setSecondary] = React.useState(false);
    const [people, setPeople] = React.useState([]);
    const [peopleHandler, setPeopleHandler] = React.useState({});
    const [peopleName, setPeopleName] = React.useState('');

    React.useEffect(() => {
        const peopleList = readLocalStorage('peopleList') || [];
        setPeople(peopleList);
    }, []);

    const handleClose = () => {
        setOpen(false);
        setPeopleHandler({});
    };

    return (
        <React.Fragment>
            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: (event) => {
                        event.preventDefault();
                        const formData = new FormData(event.currentTarget);
                        const formJson = Object.fromEntries(formData.entries());
                        const peopleJson = formJson.people;
                        if (people.includes(peopleJson)) {
                            setPeopleHandler({ error: true, helperText: 'This person is already in the list' });
                        } else if (/^ *$/.test(peopleJson)) {
                            setPeopleHandler({ error: true, helperText: 'Please enter a valid name' });
                        }
                        else {
                            updateLocalStorage('peopleList', 'add', peopleJson);
                            setPeople(readLocalStorage('peopleList'));
                            setPeopleHandler({});
                        }
                        setPeopleName('');
                        updateFunc();
                    },
                }}
            >
                <DialogTitle>Add new people</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Add a new people to the list for this trip.
                    </DialogContentText>

                    <List dense={dense}>
                        {people.map((value, index) => (
                            <ListItem
                                key={index}
                                secondaryAction={
                                    <IconButton edge="end" aria-label="delete" onClick={() => {
                                        updateLocalStorage('peopleList', 'remove', value);
                                        setPeople(readLocalStorage('peopleList'));
                                        updateFunc();
                                    }}>
                                        <DeleteIcon />
                                    </IconButton>
                                }
                            >
                                <ListItemText
                                    primary={value}
                                    secondary={secondary ? 'Secondary text' : null}
                                />
                            </ListItem>
                        ))}
                    </List>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        name="people"
                        label="Pepole name"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={peopleName}
                        onChange={(e) => setPeopleName(e.target.value)}
                        {...peopleHandler}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit">Add</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment >
    );
}