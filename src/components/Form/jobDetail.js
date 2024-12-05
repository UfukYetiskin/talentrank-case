import React, { useState } from 'react'
import InputComponent from '../Input/Input'
import { TextField, Box, Button, MenuItem, InputLabel, Select, Typography, FormControl, FormControlLabel } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormLabel from '@mui/material/FormLabel';


function JobDetail({ formDataState, setFormDataState }) {

    return (
        <div className='flex flex-col w-full md:w-[776px]'>
            <InputComponent text={"Job Title"} />
            <TextField
                multiline
                rows={10}
                fullWidth
                className='w-full'
                placeholder="Start typing..."
                sx={{
                    m: 1,
                    // width: '75ch',
                }}
                label="Description About The Position"
            />
            <FormControl className='w-full' fullWidth sx={{ m: 1, }} >
                <InputLabel id="demo-simple-select-helper-label">Minute {"(AI will generate 6 questions)"}</InputLabel>
                <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    label="Minute (AI will generate 6 questions)"
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={"5"}>5 Minutes</MenuItem>
                    <MenuItem value={"10"}>10 Minutes</MenuItem>
                    <MenuItem value={"15"}>15 Minutes</MenuItem>
                    <MenuItem value={"20"}>20 Minutes</MenuItem>
                    <MenuItem value={"30"}>30 Minutes</MenuItem>
                </Select>
            </FormControl>
            <FormControl
                sx={{
                    m: 1,
                }}
                fullWidth
                className='w-full'
            >
                <FormLabel id="demo-row-radio-buttons-group-label">Job Location</FormLabel>
                <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    className='grid grid-cols-3'
                >
                    <div className='relative mr-4'>
                        <FormControlLabel className='' value="Remote" control={<Radio className='mt-4' />} label="Remote" />
                        <span className='w-full absolute -bottom-6 md:-bottom-1 left-8 text-sm text-gray-400'>
                            Work from anywhere
                        </span>
                    </div>
                    <div className='relative mr-4'>
                        <FormControlLabel className='' value="Hybrid" control={<Radio className='mt-4' />} label="Hybrid" />
                        <span className='w-full absolute -bottom-6 md:-bottom-1 left-8 text-sm text-gray-400'>
                            Work from anywhere
                        </span>
                    </div>
                    <div className='relative mr-4'>
                        <FormControlLabel className='' value="Onsite" control={<Radio className='mt-4' />} label="Onsite" />
                        <span className='w-full absolute -bottom-6 md:-bottom-1 left-8 text-sm text-gray-400'>
                            Work from anywhere
                        </span>
                    </div>
                </RadioGroup>
            </FormControl>
        </div>
    )
}

export default JobDetail