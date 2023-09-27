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
import { useState } from "react";
import { Rating } from "react-simple-star-rating";

const UserForm = () => {
  const [rating, setRating] = useState(0);
  const [codePhraseMode, setCodePhraseMode] = useState<boolean>(false);

  const handleRating = (rate: number) => {
    setRating(rate);
  };
  const onPointerEnter = () => console.log("Enter");
  const onPointerLeave = () => console.log("Leave");
  const onPointerMove = (value: number, index: number) =>
    console.log(value, index);

  return (
    <div className="container">
      <form className={s.form}>
        <Box className={s.header}>
          <Typography className={s.history} variant="body1">
            Список Профилей / <span className={s.profile_link}>Профиль</span>
          </Typography>
          <Button disabled variant="contained" color="primary">
            СОХРАНИТЬ
          </Button>
        </Box>
        <div className={s.profile}>
          <div className={s.sidepfp}>
            <Input type="file" disableUnderline className={s.pfp} />
            <div className={s.rating}>
              <Rating
                onClick={handleRating}
                onPointerEnter={onPointerEnter}
                onPointerLeave={onPointerLeave}
                onPointerMove={onPointerMove}
                size={30}
              />
            </div>
          </div>
          <div className={s.profile_credentials}>
            <Typography className={s.title} variant="h5">
              Профиль <div className={s.line}></div>
            </Typography>
            <FormControl fullWidth>
              <InputLabel id="simple-select">Пол</InputLabel>
              <Select labelId="simple-select" label="Пол">
                <MenuItem value={"Male"}>Мужчина</MenuItem>
                <MenuItem value={"Female"}>Женщина</MenuItem>
                <MenuItem value={"Other"}>Другое</MenuItem>
                <MenuItem value={"Mechanik"}>Линолиум</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="simple-select-list">Списки</InputLabel>
              <Select labelId="simple-select-list" label="Списки">
                <MenuItem value={"Male"}>Первый Список</MenuItem>
                <MenuItem value={"Female"}>Второй Список</MenuItem>
                <MenuItem value={"Other"}>Третий Список</MenuItem>
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
                  placeholder={
                    !codePhraseMode
                      ? "Включите кодовую фразу"
                      : "Taka Utilisation SAS Com Walks"
                  }
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
            <TextField label="Имя" variant="outlined" />
          </FormControl>
          <FormControl fullWidth>
            <TextField label="Фамилия" variant="outlined" />
          </FormControl>
          <FormControl fullWidth>
            <TextField label="Возраст" type="number" variant="outlined" />
          </FormControl>
          <FormControl fullWidth>
            <TextField
              variant="filled"
              select
              SelectProps={{
                sx: { textAlign: "center" },
                disableUnderline: true,
                startAdornment: (
                  <InputAdornment position="start">Подписка</InputAdornment>
                ),
              }}
            >
              <MenuItem value={"Бесплатно"}>Бесплатно</MenuItem>
              <MenuItem value={"Премиум"}>Премиум</MenuItem>
              <MenuItem value={"Подписка на уведомления"}>
                Подписка на уведомления
              </MenuItem>
              <MenuItem value={"Spotify Premium"}>Spotify Premium</MenuItem>
            </TextField>
          </FormControl>
        </div>
        <div className={s.rest}>
          <div className={s.job}>
            <Typography className={s.title} variant="h5">
              Работа <div className={s.line}></div>
            </Typography>
            <FormControl fullWidth>
              <TextField label="Должность" variant="outlined" />
            </FormControl>
            <FormControl fullWidth>
              <TextField label="Место Работы" variant="outlined" />
            </FormControl>
          </div>
          <div className={s.home}>
            <Typography className={s.title} variant="h5">
              Домашний Адрес <div className={s.line}></div>
            </Typography>
            <FormControl fullWidth>
              <TextField label="Страна" variant="outlined" />
            </FormControl>{" "}
            <FormControl fullWidth>
              <TextField label="Город" variant="outlined" />
            </FormControl>{" "}
            <FormControl fullWidth>
              <TextField label="Область" variant="outlined" />
            </FormControl>{" "}
            <FormControl fullWidth>
              <TextField label="Адрес" variant="outlined" />
            </FormControl>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
