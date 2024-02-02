import * as React from 'react';
import { useState, useEffect } from 'react';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

import { getListProgramaName } from '../../../firebase';

export default function Programas({ value, onChange }) {
  const [programas, setProgramas] = useState([]);
  useEffect(() => {
    getListProgramaName().then((list) => {
      setProgramas(Object.keys(list).map((key) => list[key]));
    });
  }, []);
  return (
    <Stack spacing={3} >
      <Autocomplete
        multiple
        id="tags-standard"
        options={programas}
        onChange={(event, newValue) => onChange(newValue.map(value => value))}
        getOptionLabel={(option) => option}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            // label="Programas relacionados"
            // placeholder="Programas"
          />
        )}
      />
    </Stack>
  );
}
