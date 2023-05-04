import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { baseurl } from '../../api/apiConfig'
import MUIDataTable from 'mui-datatables'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import {
    Card,
    CardActions,
    Dialog,
    DialogActions,
    DialogContent,
} from '@mui/material'
import { CardContent } from '@mui/material'
import { Typography } from '@mui/material'
import { Button } from '@mui/material'
import { Grid } from '@mui/material'
import { SlButton, SlDialog } from '@shoelace-style/shoelace/dist/react'
import { DialogTitle } from '@mui/material'
import { DialogContentText } from '@mui/material'
import { error } from 'jquery'

function Glossary() {
    const [glossary, setGlossary] = useState([])
    const [autoCompleteData, setAutoCompleteData] = useState([])
    const [filteredReesult, setFilteredReesult] = useState([])
    const [open, setOpen] = useState(false)
    const [newAbbrivation, setNewAbbrivation] = useState({
        employee_id: localStorage.getItem('employee_id')
    })

    useEffect(() => {
        getMicrotekGlossary()
    }, [])
    function getMicrotekGlossary() {
        axios({
            method: 'get',
            url: `${baseurl.base_url}/mtek-glossary/get-microtek-glossary`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })
            .then((res) => {
                console.log(res)
                if (!res.data.data) {
                    return
                }
                setGlossary(res.data.data)
                setAutoCompleteData(
                    [
                        ...new Set(
                            res?.data?.data?.map((item) => item.abbrevation)
                        ),
                    ].map((item) => {
                        return {
                            value: item,
                            label: item,
                        }
                    })
                )
                setFilteredReesult(res.data.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }
    const handleClose = () => {
        setOpen(false)
        setNewAbbrivation({employee_id: localStorage.getItem('employee_id')})
    }
    function submitNewAbbrivation(){
        axios({
            method: 'post',
            url: `${baseurl.base_url}/mtek-glossary/store-microtek-glossary`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            data:newAbbrivation
        })
        .then((res) => {
            alert(res?.data?.message)
            handleClose();
        })
        .catch((err) => {
            console.log(err)
            alert(err?.response?.data?.message)
            handleClose()
        })
    }
    return (
        <div style={{ padding: '30' }}>
            <div
                style={{
                    display: 'flex',
                    width: '100%',
                    justifyContent: 'space-between',
                }}
            >
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={autoCompleteData}
                    onChange={(e, value) => {
                        if (value) {
                            setFilteredReesult(
                                glossary?.filter(
                                    (item) => item.abbrevation == value?.value
                                )
                            )
                        } else {
                            setFilteredReesult(glossary)
                        }
                    }}
                    sx={{ width: 300 }}
                    renderInput={(params) => (
                        <TextField {...params} label="Abbrevations" />
                    )}
                />
                <Button
                    variant="contained"
                    onClick={() => {
                        setOpen(true)
                    }}
                >
                    Add New Abbrevation
                </Button>
            </div>
            <Grid
                sx={{ marginTop: '5px' }}
                container
                spacing={3}
                rowSpacing={4}
                columns={{ xs: 1, sm: 2, md: 3, lg: 4 }}
            >
                {filteredReesult?.map((item,i) => {
                    return (
                        <Grid key={i} item xs={1} style={{ display: 'flex' }}>
                            <Card sx={{ width: '40vw' }}>
                                <CardContent>
                                    <Typography variant="h5" component="div">
                                        {item.abbrevation}
                                    </Typography>
                                    <Typography variant="body2">
                                        {item.description}
                                    </Typography>
                                    <Typography
                                        sx={{ mt: 1.5 }}
                                        color="text.secondary"
                                    >
                                        {item.defination}
                                    </Typography>
                                    <Typography
                                        sx={{ mt: 1.5 }}
                                        variant="body2"
                                    >
                                        by-{item.created_by}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    )
                })}
            </Grid>
            <Dialog
                fullWidth={true}
                maxWidth={'sm'}
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {'New Abrivation Form'}
                </DialogTitle>
                <DialogContent sx={{display:"flex", flexDirection:'column', gap:'30px'}}>
                <TextField
                sx={{mt:2}}
                    id="outlined-basic"
                    label="Abrevation"
                    value={newAbbrivation?.abrevation}
                    onChange={(e) => {
                        setNewAbbrivation({
                            ...newAbbrivation,
                            abbrevation: e.target.value,
                        })
                    }}
                    required={true}
                    variant="outlined"
                />
                <TextField
                    id="outlined-basic"
                    label="Description"
                    value={newAbbrivation?.description}
                    required={true}
                    onChange={(e) => {
                        setNewAbbrivation({
                            ...newAbbrivation,
                            description: e.target.value,
                        })
                    }}
                    multiline
                    variant="outlined"
                />
                <TextField
                    id="outlined-basic"
                    label="Defination"
                    onChange={(e) => {
                        setNewAbbrivation({
                            ...newAbbrivation,
                            defination: e.target.value,
                        })
                    }}
                    required={true}
                    value={newAbbrivation?.defination}
                    multiline
                    variant="outlined"
                />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancle</Button>
                    <Button onClick={submitNewAbbrivation} autoFocus>
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default Glossary
