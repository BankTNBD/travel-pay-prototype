"use client";

import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, InputAdornment } from '@mui/material';
import uidGen from '@/functions/uidGen';
import { readLocalStorage, writeLocalStorage, updateLocalStorage } from '@/functions/localStorageFunc';

export default function AddList({ open, setOpen }) {
    const [amountHandler, setAmountHandler] = React.useState('');
    const handleClose = () => {
        setOpen(false);
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
                        const bill = formJson.bill;
                        const amount = formJson.amount;
                        if (isNaN(amount)) {
                            setAmountHandler({ error: true, helperText: 'Please enter a valid amount' });
                        } else {
                            const uid = uidGen();
                            updateLocalStorage('billsList', 'add', { id: uid, bill, amount, div: false });
                            writeLocalStorage(uid, []);
                            handleClose();
                            setAmountHandler('');
                        }
                    },
                }}
            >
                <DialogTitle>Add new bill</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Add a new bill to the list.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        name="bill"
                        label="Bill name"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="amount"
                        name="amount"
                        label="Amount"
                        type="text"
                        fullWidth
                        variant="standard"
                        {...amountHandler}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit">Add</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}