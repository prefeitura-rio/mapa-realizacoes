import * as React from 'react';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

export default function Orgaos({ value, onChange }) {
  return (
    <Stack spacing={3} sx={{ width: 680 }}>
      <Autocomplete
        multiple
        id="tags-standard"
        options={orgaos}
        onChange={(event, newValue) => onChange(newValue.map(value => value.title))}
        getOptionLabel={(option) => option.title}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            label="Orgaos relacionados"
            placeholder="Orgaos"
          />
        )}
      />
    </Stack>
  );
}



// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const orgaos = [
  {title: "Controladoria Geral do Município", sigla: "CGM"},
  {title: "Gabinete do Prefeito", sigla: "GBP"},
  {title: "Procuradoria Geral do Município", sigla: "PGM"},
  {title: "Secretaria de Esportes", sigla: "SMEL"},
  {title: "Secretaria Especial da Juventude", sigla: "JUV-RIO"},
  {title: "Secretaria Especial de Ação Comunitária", sigla: "SEAC-RIO"},
  {title: "Secretaria Especial de Cidadania", sigla: "SECID"},
  {title: "Secretaria Especial de Integração Metropolitana", sigla: "SEIM"},
  {title: "Secretaria Especial de Políticas de Promoção da Mulher", sigla: "SPM-RIO"},
  {title: "Secretaria Especial de Turismo", sigla: "SETUR"},
  {title: "Secretaria Municipal de Desenvolvimento Econômico, Inovação e Simplificação", sigla: "SMDEIS"},
  {title: "Secretaria Municipal do Envelhecimento Saudável e Qualidade de Vida", sigla: "SEMESQV"},
  {title: "Secretaria Municipal da Pessoa com Deficiência", sigla: "SMPD"},
  {title: "Secretaria Municipal de Assistência Social", sigla: "SMAS"},
  {title: "Secretaria Municipal de Ciência e Tecnologia", sigla: "SMCT"},
  {title: "Secretaria Municipal de Conservação", sigla: "SECONSERVA"},
  {title: "Secretaria Municipal de Cultura", sigla: "SMC"},
  {title: "Secretaria Municipal de Educação", sigla: "SME"},
  {title: "Secretaria Municipal de Fazenda e Planejamento", sigla: "SMFP"},
  {title: "Secretaria Municipal de Governo e Integridade Pública", sigla: "SEGOVI"},
  {title: "Secretaria Municipal de Habitação", sigla: "SMH"},
  {title: "Secretaria Municipal de Infraestrutura", sigla: "SMI"},
  {title: "Secretaria Municipal do Ambiente e Clima", sigla: "SMAC"},
  {title: "Secretaria Municipal de Ordem Pública", sigla: "SEOP"},
  {title: "Secretaria Municipal de Planejamento Urbano", sigla: "SMPU"},
  {title: "Secretaria Municipal de Proteção e Defesa dos Animais", sigla: "SMPDA"},
  {title: "Secretaria Municipal de Saúde", sigla: "SMS"},
  {title: "Secretaria Municipal de Trabalho e Renda", sigla: "SMTE"},
  {title: "Secretaria Municipal de Transportes", sigla: "SMTR"},
  {title: "Companhia de Desenvolvimento Urbano da Região do Porto do Rio de Janeiro", sigla: "Cdurp"},
  {title: "Companhia Municipal de Energia e Iluminação", sigla: "Rioluz"},
  {title: "Companhia Municipal de Limpeza Urbana", sigla: "Comlurb"},
  {title: "Companhia de Engenharia de Tráfego", sigla: "CET-RIO"},
  {title: "Empresa Distribuidora de Filmes", sigla: "Riofilme"},
  {title: "Empresa Municipal de Artes Gráficas", sigla: "Imprensa Oficial"},
  {title: "Empresa Municipal de Informática", sigla: "IplanRio"},
  {title: "Empresa Municipal de Multimeios Ltda.", sigla: "MultiRio"},
  {title: "Empresa Municipal de Urbanização", sigla: "Riourbe"},
  {title: "Empresa de Turismo", sigla: "Riotur"},
  {title: "Rio Eventos", sigla: "Rio Eventos"},
  {title: "Instituto Municipal de Urbanismo Pereira Passos", sigla: "IPP"},
  {title: "Instituto de Previdência e Assistência do Município do Rio de Janeiro", sigla: "PREVI-RIO"},
  {title: "Guarda Municipal do Rio de Janeiro", sigla: "GM-Rio"},
  {title: "Fundação Planetário da Cidade do Rio de Janeiro", sigla: "PLANETÁRIO"},
  {title: "Fundação Parques e Jardins", sigla: "FPJ"},
  {title: "Fundação Jardim Zoológico da Cidade do Rio de Janeiro", sigla: "RIOZOO"},
  {title: "Fundação Instituto de Geotécnica do Município do Rio de Janeiro", sigla: "GEO-RIO"},
  {title: "Fundação Instituto Rio das Águas do Município do Rio de Janeiro", sigla: "RIO-ÁGUAS"},
  {title: "Fundação Cidade das Artes", sigla: "Cidade das Artes"}
  
];