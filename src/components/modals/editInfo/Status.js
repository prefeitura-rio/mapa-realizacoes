import * as React from 'react';
import { useState, useEffect } from 'react';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

import { getListStatusName } from '../../../firebase';

export default function Status({ value, onChange }) {
  const [status, setStatus] = useState([]);
  useEffect(() => {
    getListStatusName().then((list) => {
      setStatus(Object.keys(list).map((key) => list[key]));
    });
  }, []);
  return (
    <Stack spacing={3} sx={{ width: 700 }}>
      <Autocomplete
        id="tags-standard"
        options={status}
        onChange={(event, newValue) => onChange(newValue ? newValue: "")}
        getOptionLabel={(option) => option}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            // label="Status relacionados"
            // placeholder="status"
          />
        )}
      />
    </Stack>
  );
}
