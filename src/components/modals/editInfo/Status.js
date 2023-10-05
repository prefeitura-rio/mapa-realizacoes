import * as React from 'react';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

export default function Status({ value, onChange }) {
  return (
    <Stack spacing={3} sx={{ width: 680 }}>
      <Autocomplete
     
        id="tags-standard"
   
        options={status}
        // value={value}  // Garante que o valor seja sempre um array
        onChange={(event, newValue) => onChange(newValue)}
        getOptionLabel={(option) => option.title}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            label="Status relacionados"
            placeholder="status"
          />
        )}
      />
    </Stack>
  );
}



// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const status = [
  {title: "Concluído"},
  {title: "Em Andamento"},
  {title: "Em Licitação"},
  {title: "Interrompida"}
];