import React from 'react';
import {Select, InputLabel, FormControl, MenuItem} from "@mui/material"


const Print = ({ printAs }) => {
  return (
    <FormControl variant="outlined" sx={{margin: "16px", minWidth: 120}}>
      <InputLabel id="demo-simple-select-outlined-label">Print</InputLabel>
      <Select
        labelId="demo-simple-select-outlined-label"
        id="demo-simple-select-outlined"
        onChange={(e) => printAs(e.target.value)}
        label="Print As"
        autoWidth
      >
        <MenuItem value="pdf"> PDF</MenuItem>
        <MenuItem value="excel">EXCEL</MenuItem>
      </Select>
    </FormControl>
  );
};

export default Print;
