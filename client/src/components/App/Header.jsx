import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Button,
  FormControl, FormHelperText,
  IconButton,
  MenuItem, Select,
  Toolbar,
  Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import logo from './logo-blue.svg'
import { useDispatch, useSelector } from 'react-redux';
import { loadCategories } from '../../redux/features/categories';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 6,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,

  },
  appbar: {
    backgroundColor: '#000841',
    borderRadius: 6,
    width: "96%",
    margin: 'auto',
    color: 'white'
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    color: 'white',
    marginTop: theme.spacing(2),
  },
}));

function Header() {
  const [category, setCategory] = useState("");
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.items);

  const handleChangeCategory = (e) => {
    setCategory(e.target.value);
  };

  useEffect(() => {
    dispatch(loadCategories());
  }, [dispatch]);

  const classes = useStyles();


  return (
    <div>
      <AppBar color='transparent' position="sticky" className={classes.appbar}>
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
           <img src={logo}/>
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            <FormControl className={classes.formControl}>
              <Select
                displayEmpty
                className={classes.selectEmpty}
                value={category}
                onChange={handleChangeCategory}
                inputProps={{ 'aria-label': 'Without label' }}
              >
                {categories.map(item => (
                  <MenuItem key={item.value} value={item._id}>
                    {item.title}
                  </MenuItem>
                  ))}}
              </Select>
              <FormHelperText></FormHelperText>
            </FormControl>
          </Typography>
          <Button color="inherit">Войти</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;