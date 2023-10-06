import * as React from 'react';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

export default function Programas({ value, onChange }) {
  return (
    <Stack spacing={3} sx={{ width: 680 }}>
      <Autocomplete
     
        id="tags-standard"
    
        options={programas}
        onChange={(event, newValue) => onChange(newValue ? newValue.title: "")}
        getOptionLabel={(option) => option.title}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            label="Programas relacionados"
            placeholder="Programas"
          />
        )}
      />
    </Stack>
  );
}



// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const programas = [
  {title: "Reviver Centro"},
  {title: "Porto Maravilha"},
  {title: "Maravalley"},
  {title: "Bairro Maravilha"},
  {title: "Jardim Maravilha"},
  {title: "Anel Viário de Campo Grande"},
  {title: "Parques"},
  {title: "Praças"},
  {title: "Transolímpica"},
  {title: "Transcarioca"},
  {title: "Transoeste"},
  {title: "Transbrasil"},
  {title: "Clínicas da Família"},
  {title: "Super Centro Carioca de Saúde"},
  {title: "Morar Carioca"},
  {title: "Casa Carioca"},
  {title: "Minha Casa Minha Vida"},
  {title: "Favela com dignidade"},
  {title: "Combate a fome"},
  {title: "GETs"},
  {title: "Creches"},
  {title: "Demolição de construções irregulares"},
  {title: "Guarda municipal"},
  {title: "SmartLuz"} 
];