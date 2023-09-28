import axios from "axios";
import s from "./UserForm.module.scss";
import {
  Box,
  Button,
  Typography,
  FormControl,
  Input,
  Select,
  MenuItem,
  InputLabel,
  FormControlLabel,
  Checkbox,
  TextField,
  FormGroup,
  InputAdornment,
} from "@mui/material";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Rating } from "react-simple-star-rating";

const UserForm = () => {
  const [rating, setRating] = useState(0);
  const [codePhraseMode, setCodePhraseMode] = useState<boolean>(false);
  const [sufix, setSufix] = useState<string>("V");
  const [prefix, setPrefix] = useState("Mrs.");
  const [subscribed, setSubscribed] = useState("false");
  const [disabled, setDisabled] = useState(true);
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      jobTitle: "",
      jobArea: "",
      age: 0,
      keyword: "None",
      address: "",
      city: "",
      state: "",
      county: "",
    },
    onSubmit: (val) => {
      console.log({ ...val, prefix, sufix, subscribed });
      axios
        .post("http://localhost:8080/users", {
          ...val,
          prefix,
          sufix,
          subscribed,
        })
        .then((res) => {
          if (res.statusText === "Created") {
            alert("Успешно создано");
          }
        });
    },
    validate: ({
      address,
      city,
      county,
      firstName,
      jobArea,
      jobTitle,
      keyword,
      lastName,
      state,
    }) => {
      if (
        !address ||
        !city ||
        !county ||
        !firstName ||
        !jobArea ||
        !lastName ||
        !state ||
        !jobTitle
      ) {
        setDisabled(true);
      } else if (codePhraseMode && keyword === "None") {
        setDisabled(true);
      } else {
        setDisabled(false);
      }
    },
  });

  const handleRating = (rate: number) => {
    setRating(rate);
  };
  useEffect(() => {
    formik.validateForm(formik.values);
  }, [formik.values, codePhraseMode]);

  return (
    <div className="container">
      <form onSubmit={formik.handleSubmit} className={s.form}>
        <Box className={s.header}>
          <Typography className={s.history} variant="body1">
            Список Профилей / <span className={s.profile_link}>Профиль</span>
          </Typography>
          <Button
            type="submit"
            disabled={disabled}
            variant="contained"
            color="primary"
          >
            СОХРАНИТЬ
          </Button>
        </Box>
        <div className={s.profile}>
          <div className={s.sidepfp}>
            <Input type="file" disableUnderline className={s.pfp} />
            <div className={s.rating}>
              <Rating onClick={handleRating} size={30} />
            </div>
          </div>  
          <div className={s.profile_credentials}>
            <Typography className={s.title} variant="h5">
              Профиль <div className={s.line}></div>
            </Typography>
            <FormControl fullWidth>
              <InputLabel id="simple-select">Пол</InputLabel>
              <Select
                onChange={(e) => {
                  setPrefix(e.target.value);
                }}
                id="prefix"
                labelId="simple-select"
                label="Пол"
                defaultValue={"Mrs."}
              >
                <MenuItem value={"Mrs."}>Мужчина</MenuItem>
                <MenuItem value={"Ms."}>Женщина</MenuItem>
                <MenuItem value={" "}>Другое</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="simple-select-list">Списки</InputLabel>
              <Select
                onChange={(e) => {
                  setSufix(e.target.value);
                }}
                id="sufix"
                labelId="simple-select-list"
                label="Списки"
                defaultValue={"V"}
              >
                <MenuItem value={"V"}>V</MenuItem>
                <MenuItem value={"B"}>B</MenuItem>
                <MenuItem value={"A"}>A</MenuItem>
              </Select>
            </FormControl>
            <Box
              sx={{
                display: "flex !important",
                alignItems: "center",
              }}
            >
              <FormControl
                sx={{
                  flexGrow: 1,
                }}
              >
                <InputLabel id="simple-select-list">
                  {!codePhraseMode ? "Включите кодовую фразу" : "Кодовая фраза"}
                </InputLabel>
                <Input
                  onChange={formik.handleChange}
                  placeholder={
                    !codePhraseMode
                      ? "Включите кодовую фразу"
                      : "Taka Utilisation SAS Com Walks"
                  }
                  id="keyword"
                  disabled={!codePhraseMode}
                  disableUnderline
                  sx={{
                    borderBottom: "2px dashed ",
                  }}
                />
              </FormControl>
              <FormControl>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={codePhraseMode}
                      onClick={() => {
                        setCodePhraseMode(!codePhraseMode);
                      }}
                    />
                  }
                  label="Кодовая фраза"
                />
              </FormControl>
            </Box>
          </div>
        </div>
        <div className={s.shared}>
          <Typography className={s.title} variant="h5">
            Общая Информация <div className={s.line}></div>
          </Typography>
          <FormControl fullWidth>
            <TextField
              onChange={formik.handleChange}
              id="firstName"
              label="Имя"
              variant="outlined"
            />
          </FormControl>
          <FormControl fullWidth>
            <TextField
              onChange={formik.handleChange}
              id="lastName"
              label="Фамилия"
              variant="outlined"
            />
          </FormControl>
          <FormControl fullWidth>
            <TextField
              onChange={formik.handleChange}
              id="age"
              label="Возраст"
              type="number"
              variant="outlined"
            />
          </FormControl>
          <FormControl fullWidth>
            <TextField
              variant="filled"
              select
              onChange={(e) => {
                setSubscribed(e.target.value);
              }}
              SelectProps={{
                sx: { textAlign: "center" },
                disableUnderline: true,
                id: "subscribed",
                defaultValue: "false",
                startAdornment: (
                  <InputAdornment position="start">Подписка</InputAdornment>
                ),
              }}
            >
              <MenuItem value={"false"}>Бесплатно</MenuItem>
              <MenuItem value={"true"}>Премиум</MenuItem>
              <MenuItem value={"true"}>Подписка на уведомления</MenuItem>
              <MenuItem value={"true"}>Spotify Premium</MenuItem>
            </TextField>
          </FormControl>
        </div>
        <div className={s.rest}>
          <div className={s.job}>
            <Typography className={s.title} variant="h5">
              Работа <div className={s.line}></div>
            </Typography>
            <FormControl fullWidth>
              <TextField
                onChange={formik.handleChange}
                label="Должность"
                variant="outlined"
                id="jobTitle"
              />
            </FormControl>
            <FormControl fullWidth>
              <TextField
                onChange={formik.handleChange}
                id="jobArea"
                label="Место Работы"
                variant="outlined"
              />
            </FormControl>
          </div>
          <div className={s.home}>
            <Typography className={s.title} variant="h5">
              Домашний Адрес <div className={s.line}></div>
            </Typography>
            <FormControl fullWidth>
              <TextField
                onChange={formik.handleChange}
                id="county"
                label="Страна"
                variant="outlined"
              />
            </FormControl>
            <FormControl fullWidth>
              <TextField
                onChange={formik.handleChange}
                id="city"
                label="Город"
                variant="outlined"
              />
            </FormControl>
            <FormControl fullWidth>
              <TextField
                onChange={formik.handleChange}
                id="state"
                label="Область"
                variant="outlined"
              />
            </FormControl>
            <FormControl fullWidth>
              <TextField
                onChange={formik.handleChange}
                id="address"
                label="Адрес"
                variant="outlined"
              />
            </FormControl>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
