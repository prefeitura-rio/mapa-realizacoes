import * as React from 'react';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

export default function Temas({ value, onChange }) {
  return (
    <Stack spacing={3} sx={{ width: 680 }}>
      <Autocomplete
        multiple
        id="tags-standard"
        options={temas}
        onChange={(event, newValue) => onChange(newValue.map(value => value.title))}
        getOptionLabel={(option) => option.title}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            label="Temas relacionados"
            placeholder="Temas"
          />
        )}
      />
    </Stack>
  );
}



// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const temas = [
  {title: "Zeladoria"},
 { title: "Segurança pública"},
 { title: "Turismo"},
 { title: "Cultura"},
{  title:  "Tecnologia e inovação"},
 { title: " Legado Olímpico"},
 { title:  "Meio Ambiente"},
{  title: " Transporte"},
{  title:  "Saúde"},
{  title:  " Proteção Social"},
 { title: "Emprego e renda"},
 { title: "Educação"},
 { title: "Infraestrutura"},
{  title: "Acessibilidade"},
  {title: "Habitação"},
 { title: "Animais"}
];