import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { RouteComponentProps, useMatch } from '@reach/router';
import React from 'react';
import '../modules/Subject';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Typography, TextField,  Link, styled, Avatar, makeStyles, Theme, createStyles, Checkbox, IconButton, Collapse } from '@material-ui/core';
import { useForm, useFormContext } from 'react-hook-form';
import axios from "axios";

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
  
  var global_num: any ; 

  var lst1 : any;

  function Drop() {

    const [lst, setLst] = React.useState([])

    React.useEffect(() =>  {

      axios.get('/api/v1/users/')
      .then(function (response) {
        // global_num = response.data;
        setLst(response.data.map((item: any) => item.username))
        // console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    }, [lst])
    

    // let lst = [];

    

    // for (let i in global_num) {
    //   lst.push(global_num[i]['username']); 
    //   // console.log(global_num[i]['username']); // "0", "1", "2",
    // }

    // for (let i in lst) {
    //   console.log('ist');
    //   console.log(i);
    // }

    console.log("global nav")
    console.log(lst);

    
    return (
      
      <select style={{ width : "300px" , height: "40px", margin:"20px", fontSize:"18px"}} name="res"> 
      {lst.map((list) => (
      <option value= {list}> {list} </option>
      ))}
      </select> 
    );
  }



  
  // enum GenderEnum {
  //   male = "male",
  //   female = "female"
  // }

  // interface KeyValuePair {
  //   key: string;
  //   value: string;
  // }
  
  // let foo: KeyValuePair = { key: "k", value: "val" };


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
      console.log(data.name);
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

    // const onDrop = () => {
    //   axios.get('/api/v1/users/')
    //   .then(function (response) {
    //     global_num = response.data;
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
    // };

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
              
                <Box>
                    <label style={{ width : "100px" , height: "40px", margin:"20px", fontSize:"18px"}}>Responsible</label>
                    <Drop />
                    {/* <input style={{ width : "100px" , height: "40px", margin:"20px",backgroundColor: 'lightGreen', fontStyle: "inherit"}} 
                     value="load" type="button" onClick={() => Drop()} /> */}
                </Box>
            </Grid>

            {/* <Grid item xs={12}>
              <label style={{ width : "100px" , height: "40px", margin:"20px", fontSize:"18px"}}>Responsible</label>
                <DropDownList
                  data= {this.sizes}
                  value= {this.state.value}
                  onChange = {this.handleChange}
                  inputRef={register}
                />
            </Grid> */}

            <Grid item xs={12}>
                 <label style={{ width : "100px" , height: "40px", margin:"20px", fontSize:"18px"}}>Expected Completion Date</label>
                <input type='date' style={{ width : "1000px" , height: "40px", margin:"20px"}} name="enddate" ref={register({ required: true})} />
            </Grid>
            </Grid>
      <input style={{ width : "300px" , height: "40px", margin:"20px",backgroundColor: 'lightGreen', fontStyle: "inherit"}} type="submit"/>
    </form>
    );
}