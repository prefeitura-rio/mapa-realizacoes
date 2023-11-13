import * as React from 'react';
import { useState, useEffect } from 'react';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

import { getListTemaName } from '../../../firebase';

export default function Temas({ value, onChange }) {
  const [temas, setTemas] = useState([]);
  useEffect(() => {
    getListTemaName().then((list) => {
      setTemas(Object.keys(list).map((key) => list[key]));
    });
  }, []);
  return (
    <Stack spacing={3} >
      <Autocomplete
        multiple
        id="tags-standard"
        options={temas}
        onChange={(event, newValue) => onChange(newValue.map(value => value))}
        getOptionLabel={(option) => option}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            // label="Temas relacionados"
            // placeholder="Temas"
          />
        )}
      />
    </Stack>
  );
}
