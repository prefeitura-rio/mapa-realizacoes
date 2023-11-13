import * as React from 'react';
import { useState, useEffect } from 'react';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

import { getListOrgaoName } from '../../../firebase';

export default function Orgaos({ value, onChange }) {
  const [orgaos, setOrgaos] = useState([]);
  useEffect(() => {
    getListOrgaoName().then((list) => {
      setOrgaos(Object.keys(list).map((key) => list[key]));
    });
  }, []);
  return (
    <Stack spacing={3} >
      <Autocomplete
        multiple
        id="tags-standard"
        options={orgaos}
        onChange={(event, newValue) => onChange(newValue.map(value => value))}
        getOptionLabel={(option) => option}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            // label="Orgaos relacionados"
            // placeholder="Orgaos"
          />
        )}
      />
    </Stack>
  );
}
