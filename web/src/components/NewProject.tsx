import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { RouteComponentProps, useMatch } from '@reach/router';
import React from 'react';
import '../modules/Subject';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Typography, TextField,  Link, styled, Avatar, makeStyles, Theme, createStyles, Checkbox, IconButton, Collapse } from '@material-ui/core';
import { useForm, useFormContext } from 'react-hook-form';
import { usePlatformMannedStatusListContext } from './UsersDropdown';
import Select from './FormWidget/User';
import { green, lightBlue, lightGreen } from '@material-ui/core/colors';
import { FormatBold } from '@material-ui/icons';
import axios from "axios";

// enum GenderEnum {
//     female = "female",
//     male = "male",
//     other = "other"
//   }

const StyledAvatar = styled(Avatar)(({ theme }) => ({
    backgroundColor: theme.palette.secondary.main,
}));

const StyledImage = styled('img')(({ theme }) => ({
    width: theme.spacing(25),
    marginBottom: theme.spacing(2),
    objectFit: 'contain',
    textAlign: 'center',
}));

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
  }),
);

const tableStyles = {
  padding: 'unset',
};
  
  interface IFormInput {
    name: String;
    des: String;
    startdate: Date;
    res: String;
    enddate: Date;
  }

export default function NewProject(this: any, _: RouteComponentProps) {

    const { register, handleSubmit } = useForm<IFormInput>();

    const onSubmit = (data: IFormInput) => {
      console.log(data.name)
      console.log(data.des)
      console.log(data.startdate)
      console.log(data.res)
      console.log(data.enddate)
      axios.post('/api/v1/saveproject/', {
        Name: data.name,
        Description: data.des,
        StartDate: data.startdate,
        Responsible: data.res,
        EndDate: data.enddate
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    };

    //   const New =

    
    
    
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              mb={8}>

              <Box display="flex" justifyContent="center" mb={2}>
            <StyledAvatar>
                <LockOutlinedIcon />
            </StyledAvatar>
             </Box>
            
                <Box display="flex" justifyContent="center" mb={2}>
                <Typography component="h1" variant="h5" align="center">
                    New Project
                </Typography>
                </Box>

            </Box>  
                <Grid container spacing={1}>
             <Grid item xs={12}>
                 <label style={{ width : "100px" , height: "40px", margin:"20px", fontSize:"18px"}}>Project Name</label>
                <input style={{ width : "1000px" , height: "40px", margin:"20px"}} name="name" ref={register({ required: true, maxLength: 100 })}  />
            </Grid>
            <Grid item xs={12}>
                 <label style={{ width : "100px" , height: "40px", margin:"20px", fontSize:"18px"}}>Project Description</label>
                <input style={{ width : "1000px" , height: "40px", margin:"20px"}} name="des" ref={register({ required: true, maxLength: 2000 })}  />
            </Grid>
            <Grid item xs={12}>
                 <label style={{ width : "100px" , height: "40px", margin:"20px", fontSize:"18px"}}>Project Start Date</label>
                <input type='date' style={{ width : "1000px" , height: "40px", margin:"20px"}} name="startdate" ref={register({ required: true })}  />
            </Grid>
            <Grid item xs={12}>
                 <label style={{ width : "100px" , height: "40px", margin:"20px", fontSize:"18px"}}>Responsible</label>
                <input style={{ width : "1000px" , height: "40px", margin:"20px"}} name="res" ref={register({ required: true})} />
            </Grid>
            <Grid item xs={12}>
                 <label style={{ width : "100px" , height: "40px", margin:"20px", fontSize:"18px"}}>Expected Completion Date</label>
                <input type='date' style={{ width : "1000px" , height: "40px", margin:"20px"}} name="enddate" ref={register({ required: true})} />
            </Grid>
            </Grid>
      <input style={{ width : "300px" , height: "40px", margin:"20px",backgroundColor: 'lightGreen', fontStyle: "inherit"}} type="submit" />
    </form>
    );
}
