import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { RouteComponentProps} from '@reach/router';
import React from 'react';
import '../modules/Subject';
import {  styled, Avatar, makeStyles, Button, TextField, MenuItem} from '@material-ui/core';
import { useForm} from 'react-hook-form';
import axios from "axios";
import { KeyboardDatePicker } from '@material-ui/pickers';
import { Redirect } from 'react-router-dom';

const StyledAvatar = styled(Avatar)(({ theme }) => ({
    backgroundColor: theme.palette.secondary.main,
}));

const formStyles = makeStyles({
  formDesign: {
    width : '55%' , 
    backgroundColor: 'white', 
    marginTop: "1.5%"
  },

  formDate: {
    width: '34%',
    backgroundColor: 'white',
  }
});

interface IFormInput {
  name: String;
  des: String;
  startdate: Date;
  res: String;
  enddate: Date;
  project_id:String;
}

export default function NewProject(this: any, _: RouteComponentProps) {

  const { register, handleSubmit, reset } = useForm<IFormInput>();
  const [lst, setLst] = React.useState([])
  const [user, setUserName] = React.useState('');
  const [status , setStatus] = React.useState({
    isSubmitted : false,
    status : false
  })
  const [startDate, setStartDate] = React.useState<Date | null>(
    new Date(),
  );
  
  const [endDate, setEndDate] = React.useState<Date | null>(
    new Date(),
  );

  const onSubmit = (data: IFormInput,e:any) => {  
    axios.post('/api/v1/saveproject/', {
      Name: data.name,
      Description: data.des,
      StartDate: startDate,
      Responsible: user,
      EndDate: endDate,
    })
    .then(function (response) {
      console.log(response);
      setStatus({
        isSubmitted: true,
        status: response.data.status
      })
    })
    .catch(function (error) {
      console.log(error);
    });
    e.target.reset();
  };

  React.useEffect(() => {
    axios.get('/api/v1/users/')
      .then(data => {
        setLst(data.data.map((item : any) => ({
                username : item.username,
                id : item.id,
              })))
      });
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  const handleStartDateChange = (date: Date | null) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date: Date | null) => {
    setEndDate(date);
  };

  const form = formStyles();

  if(status.isSubmitted == true){
    window.location.href='/dashboard/CreatePlatform/';
  }

return (
    <div className="Container" style={{textAlign : 'center'}}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off" style={{display : 'inline-block'}}>
            <Box mb={8} style={{marginTop: '5%'}}>

              <Grid container spacing={1}>
                <Grid item xs={12}>
                {status.isSubmitted ? status.status ? 
                  <p style={{color: "green"}}>Data Submitted Succesfully!!..</p> : 
                  <p style={{ color : "red"}}>Data Not Saved!!.</p> : null
                }
                <TextField id="outlined-basic" 
                  className={form.formDesign} 
                  label="Project Name" 
                  variant="outlined" 
                  name="name"
                  inputRef={register({ required: true, maxLength: 100 })}/>

                </Grid>
            
                <Grid item xs={12}>
                  <TextField
                    id="outlined-multiline-static"
                    label="Project Description"
                    multiline
                    rows={6}
                    name="des"
                    variant="outlined"
                    className={form.formDesign}
                    inputRef={register({ required: true,})}
                  />      
                </Grid>
              
                <Grid container justify="space-around" style={{margin : '0 17.5%'}}>
                  <KeyboardDatePicker
                    margin="normal"
                    id="date-picker-dialog"
                    fullWidth
                    inputVariant="outlined"
                    label="Start Date"
                    format="MM/dd/yyyy"
                    name="startdate"
                    value={startDate}
                    onChange={handleStartDateChange}
                    className={form.formDate}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />

                  <KeyboardDatePicker
                      margin="normal"
                      id="date-picker-dialog"
                      fullWidth
                      inputVariant="outlined"
                      label="Start Date"
                      format="MM/dd/yyyy"
                      name="enddate"
                      value={endDate}
                      className={form.formDate}
                      onChange={handleEndDateChange}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                    />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    id="outlined-select-user"
                    select
                    label="Select Username"
                    value={user}
                    onChange={handleChange}
                    variant="outlined"
                    className={form.formDesign}
                    name="res" 
                    ref={register}>
                      {lst.map((list: any) => (
                        <MenuItem key={list.id} value={list.id}>
                          {list.username}
                        </MenuItem>
                      ))}
                  </TextField>
                </Grid>

                <Grid item xs={12}>
                  <Button
                      style={{width: '55%' , marginTop: '1.5%', padding: '.7rem'}}
                      type = "submit"
                      variant="contained"
                      size="large"
                      color="primary">
                      Save Project
                  </Button>
                </Grid>
              </Grid>
            </Box>
            
      {/* <input style={{ width : "300px" , height: "40px", margin:"20px",backgroundColor: 'lightGreen', fontStyle: "inherit"}} type="submit"/> */}
        
    </form>
    </div>
    );
}