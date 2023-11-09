import Tooltip from '@mui/material/Tooltip';
import {
  Button,
  ClickAwayListener,
  DialogContent,
  Divider,
  Input,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
} from "@material-ui/core";
import { IconButton, makeStyles } from "@material-ui/core";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import CloseIcon from "@material-ui/icons/Close";
import clsx from "clsx";
import { useState } from "react";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import UndoIcon from "@material-ui/icons/Undo";
import Temas from './Temas';
import Programas from './Programas';
import Orgaos from './Orgaos';
import Status from './Status';
import DatePicker from './DatePicker';
import DatePickerFim from "./DatePickerFim";

const useStyles = makeStyles((theme) => ({
  root: {},
  contentInput: {
    paddingTop: "8px",
    paddingLeft: "20px",
    paddingRight: "20px",
    display: "flex",
  },
  inputIcon: {
    color: theme.palette.grey[600],
    paddingRight: "10px",
  },
  inputDiv: {
    width: "100%",
    position: "relative",
    marginBottom: "8px",
  },
  inputLabel: {
    color: "rgba(0,0,0,0.54)",
    fontSize: "12px",
    paddingTop: "4px",
    width: "100%",
    color: '#007E7D',
    // fontWeight: 'bold',
    fontSize: '14px',
  },
  inputField: {
    width: "100%",
    paddingTop: "12px",
    fontSize: "0.9rem",
  },
  iconSmall: {
    fontSize: "0.9rem",
  },
  extraIcon: {
    position: "absolute",
    right: "-8px",
    marginTop: "4px",
  },
  underline: {
    "&:before": {
      borderBottom: "1px solid rgba(0, 0, 0, 0.2)",
    },
    "&:hover:not(.Mui-disabled):before": {
      borderBottom: "1px solid rgba(0, 0, 0, 0.2)",
    },
    // "&.Mui-focused:after": {
    //   borderBottom: "1px solid #007E7D", 
    // },
    // "&.Mui-focused:before": {
    //   borderBottom: "1.5px solid #007E7D", 
    // },
  },
  selectPaper: {
    position: "absolute",
    zIndex: 2,
    width: "100%",
  },
}));

const EditItem = ({
  title,
  tooltip,
  IconComponent,
  value,
  jsxValue,
  subTitle,
  extraIcon,
  onClick,
  onChange,
  onCancel,
  select = [],
  disableBlur = false,
  MUIComponents = false,
}) => {
  const classes = useStyles();


  const [inputValue, setinputValue] = useState(value || "");
  const [canceled, setCanceled] = useState(false);

  const handleCanceled = () => {
    setCanceled(!canceled);
    onCancel();
  };

  const onTotalInvestidoChange = (value) => {
    const numericValue = value.replace(/\D/g, ""); // Isso remove todos os caracteres não numéricos
    setinputValue(numericValue);
    if (onChange) onChange(numericValue);
  };

  const onCariocasAtendidosChange = (value) => {
    const numericValue = value.replace(/\D/g, ""); // Isso remove todos os caracteres não numéricos
    setinputValue(numericValue);
    if (onChange) onChange(numericValue);
  };


  const changeInputValue = (newValue) => {
    setinputValue(newValue);
    if (onChange) onChange(newValue);
  };


  const [focused, setFocused] = useState(false);

  const onBlur = (e) => {
    if (onChange) onChange(e.target.value);
  };

  // const onFocus = (e) => {
  //   setFocused(true);
  // };
  const renderAutocompleteComponent = () => {
    if (title === "Órgão") {
      return <Orgaos value={inputValue} onChange={changeInputValue} />;
    } else if (title === "Programa") {
      return <Programas value={inputValue} onChange={changeInputValue} />;
    } else if (title === "Tema") {
      return <Temas value={inputValue} onChange={changeInputValue} />;
    } else if (title === "Status") {
      return <Status value={inputValue} onChange={changeInputValue} />;
    } else if (title === "Data Início") {
      return <DatePicker value={inputValue} onChange={changeInputValue} />;
    } else if (title === "Data Fim") {
      return <DatePickerFim value={inputValue} onChange={changeInputValue} />;
    }
  };

  const MySelector = () => {
    let selected = select
      .filter((el) =>
        el.name
          .toLowerCase()
          .startsWith(inputValue ? inputValue.toLowerCase() : "")
      )
      .slice(0, 3);

    return (
      <Paper square elevation={8} className={classes.selectPaper}>
        <List disablePadding>
          {selected.map((item, i) => (
            <div key={item.name}>
              <ListItem
                button
                onClick={(e) => {
                  setinputValue(item.name);
                  setFocused(false);
                  onChange(item.name)
                }}
              >
                <ListItemIcon>
                  <LocationOnIcon style={{ marginLeft: "8px" }} />
                </ListItemIcon>
                <ListItemText
                  primaryTypographyProps={{ variant: "body2" }}
                  primary={item.name}
                  secondaryTypographyProps={{ variant: "body2" }}
                  secondary={item.address}
                />
              </ListItem>
              {i < selected.length - 1 ? <Divider variant="inset" /> : null}
            </div>
          ))}
        </List>
      </Paper>
    );
  };

  return (
    <div className={classes.contentInput}>
      {IconComponent ? <IconComponent className={classes.inputIcon} /> : null}
      <div
        className={classes.inputDiv}
        style={!IconComponent ? { marginLeft: "34px" } : {}}
      >
        <div className={classes.inputLabel}>
          <Tooltip title={tooltip} placement="right">
           <span>{title}</span> 
          </Tooltip>
        </div>

        {subTitle ? <div className={classes.inputLabel}>{subTitle}</div> : null}
        {jsxValue ? (
          jsxValue
        ) : MUIComponents ? (
          <ClickAwayListener onClickAway={() => setFocused(false)}>
            <div onClick={onClick}>{renderAutocompleteComponent()}</div>
          </ClickAwayListener>
        ) : (
          <Input
            value={inputValue}
            inputProps={{
              style: { textDecoration: canceled ? "line-through" : "none" },
              type: title === "Total Investido" || title === "Cariocas Atendidos" ? "number" : "text",
            }}
            className={classes.inputField}
            classes={{ underline: classes.underline }}
            onChange={(e) => {
              if (title === "Total Investido" || title === "Cariocas Atendidos") {
                const numericValue = e.target.value.replace(/\D/g, "");
                setinputValue(numericValue);
                if (onChange) onChange(numericValue);
              } else {
                setinputValue(e.target.value);
                if (onChange) onChange(e.target.value);
              }
            }}
            disabled={canceled ? true : false}
            onClick={() => setFocused(true)}
            onBlur={disableBlur ? () => { } : onBlur}
          />

        )}
        {extraIcon ? (
          <IconButton
            className={classes.extraIcon}
            onClick={extraIcon === "close" ? handleCanceled : onClick}
          >
            {extraIcon === "forward" ? (
              <ArrowForwardIosIcon
                fontSize="small"
                classes={{ fontSizeSmall: classes.iconSmall }}
              />
            ) : null}
            {extraIcon === "close" ? (
              canceled ? (
                <UndoIcon />
              ) : (
                <CloseIcon />
              )
            ) : null}
          </IconButton>
        ) : null}
        {focused && select.length ? <MySelector /> : null}
      </div>
    </div>
  );
};



export default EditItem;
