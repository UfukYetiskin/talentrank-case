import React, { useState } from 'react'
import InputComponent from '../Input/Input'
import { TextField, Box, Button, MenuItem, InputLabel, Select, Typography, FormControl, FormControlLabel } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormLabel from '@mui/material/FormLabel';


function JobDetail({ formDataState, setFormDataState, errorMessage, handleChange }) {
    console.log("Error Message in Job Detail Page", errorMessage);
    return (
        <div className='flex flex-col w-full md:w-[776px]'>
            <TextField
                label={"Title"}
                className='w-full'
                id="outlined-start-adornment"
                sx={{
                    m: 1,
                    //  width: '75ch',
                    '& .MuiFilledInput-root': {
                        backgroundColor: 'white'
                    }
                }}
                value={formDataState?.title}
                onChange={(e) => handleChange(e, "title")}
            />
            {errorMessage["Title"] && <p className="text-red-500 text-sm ml-2"> <span className='border border-red-500 rounded-full px-[8px] py-[2px]'>!</span> {errorMessage["Title"]}</p>}

            <TextField
                multiline
                rows={10}
                fullWidth
                className='w-full'
                placeholder="Start typing..."
                sx={{ m: 1 }}
                label="Description About The Position"
                value={formDataState?.description}
                onChange={(e) => handleChange(e, "description")}

            />
            {errorMessage["Description"] && <p className="text-red-500 text-sm ml-2"><span className='border border-red-500 rounded-full px-[8px] py-[2px]'>!</span> {errorMessage["Description"]}</p>}

            <FormControl className='w-full' fullWidth sx={{ m: 1 }}>
                <InputLabel id="demo-simple-select-helper-label">Minute {"(AI will generate 6 questions)"}</InputLabel>
                <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    label="Minute (AI will generate 6 questions)"
                    value={formDataState?.interviewDuration}
                    onChange={(e) => handleChange(e, "interviewDuration")}
                >
                    <MenuItem value=""><em>None</em></MenuItem>
                    <MenuItem value="5">5 Minutes</MenuItem>
                    <MenuItem value="10">10 Minutes</MenuItem>
                    <MenuItem value="15">15 Minutes</MenuItem>
                    <MenuItem value="20">20 Minutes</MenuItem>
                    <MenuItem value="30">30 Minutes</MenuItem>
                </Select>
            </FormControl>
            {errorMessage["Interview Duration"] && <p className="text-red-500 text-sm ml-2"><span className='border border-red-500 rounded-full px-[8px] py-[2px]'>!</span> {errorMessage["Interview Duration"]}</p>}

            <FormControl sx={{ m: 1 }} fullWidth className='w-full'>
                <FormLabel id="demo-row-radio-buttons-group-label">Job Location</FormLabel>
                <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    className='grid grid-cols-3'
                    value={formDataState?.jobLocation}
                    onChange={(e) => handleChange(e, "jobLocation")}
                >
                    <div className='relative mr-4'>
                        <FormControlLabel value="Remote" control={<Radio className='mt-4' />} label="Remote" />
                        <span className='w-full absolute -bottom-6 md:-bottom-1 left-8 text-sm text-gray-400'>
                            Work from anywhere
                        </span>
                    </div>
                    <div className='relative mr-4'>
                        <FormControlLabel value="Hybrid" control={<Radio className='mt-4' />} label="Hybrid" />
                        <span className='w-full absolute -bottom-6 md:-bottom-1 left-8 text-sm text-gray-400'>
                            Work from anywhere
                        </span>
                    </div>
                    <div className='relative mr-4'>
                        <FormControlLabel value="Onsite" control={<Radio className='mt-4' />} label="Onsite" />
                        <span className='w-full absolute -bottom-6 md:-bottom-1 left-8 text-sm text-gray-400'>
                            Work from anywhere
                        </span>
                    </div>
                </RadioGroup>
            </FormControl>
            {errorMessage["Job Location"] && <p className="text-red-500 text-sm ml-2"><span className='border border-red-500 rounded-full px-[8px] py-[2px]'>!</span> {errorMessage["Job Location"]}</p>}
        </div>

    )
}

export default JobDetail