import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { RouteComponentProps, useMatch } from '@reach/router';
import React from 'react';
import '../modules/Subject';
import {  styled, Avatar, Button, makeStyles } from '@material-ui/core';
import { useForm} from 'react-hook-form';
import axios from "axios";
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

const StyledAvatar = styled(Avatar)(({ theme }) => ({
    backgroundColor: theme.palette.secondary.main,
}));

interface IFormInput {
  name: String;
  des: String;
  res: String;
  pro: String;
}

const formStyles = makeStyles({
  formDesign: {
    width : '80%' , 
    backgroundColor: 'white', 
    marginTop: "1.5%"
  },
});

export default function NewPlatform(this: any, {projectId,}: RouteComponentProps<{projectId: number;}>) {

    
    const [lst, setLst] = React.useState([])
    const [project, setProject] = React.useState<any>([]);
    const [user, setUserName] = React.useState('');

    const [status, setStatus] = React.useState({
      isSubmitted : false,
      status : false,
    })

    const match = useMatch('/dashboard/projects/:projectId');

    if (match) {
        projectId = parseInt((match as any).projectId);
    }
    React.useEffect(() => {
      axios.get(`/api/v1/projects/${projectId}`)
        .then(data => {
          setProject(data.data);
        });
    }, []);

    React.useEffect(() => {
      axios.get('/api/v1/users/')
        .then(data => {
          setLst(data.data.map((item : any) => ({
                  username : item.username,
                  id : item.id,
                })))
        });
    }, []);

    const { register, handleSubmit } = useForm<IFormInput>({
      defaultValues: {
        pro: '',
      }
    });

    const onSubmit = (data: IFormInput,e:any) => {
      
      axios.post('/api/v1/saveplatform/', {
        Name: data.name,
        Description: data.des,
        Responsible: user,
        Project: project.id,
      })
      .then(function (response) {
        console.log(response);
        setStatus({
          isSubmitted : true,
          status : response.data.status,
        })
    })
      .catch(function (error) {
        console.log(error);
      });
      e.target.reset();
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setUserName(event.target.value);
    };

    const form = formStyles();

  return (
    <div className="Container" style={{textAlign : 'center'}}>
      <form onSubmit={handleSubmit(onSubmit)}  noValidate autoComplete="off" style={{display : 'inline-block'}}>
            <Box mb={8}>
              <Grid container spacing={1} style={{marginTop: '5%'}}>
                <Grid item xs={12}>
                  {status.isSubmitted ? status.status ? 
                    <p style={{color: "green"}}>Data Submitted Succesfully!!..</p> : 
                    <p style={{ color : "red"}}>Data Not Saved!!.</p> : null
                  }

                  <TextField id="outlined-basic" 
                    className={form.formDesign} 
                    label="Platform Name" 
                    variant="outlined" 
                    name="name"
                    inputRef={register({ required: true, maxLength: 100 })}/>
                </Grid>
            
                <Grid item xs={12} style={{marginTop: "2%"}}>
                  <TextField
                    id="outlined-multiline-static"
                    label="Platform Description"
                    multiline
                    rows={6}
                    name="des"
                    variant="outlined"
                    className={form.formDesign}
                    inputRef={register({ required: true,})}
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
                  <TextField id="outlined-basic" 
                    style={{ width : "80%", backgroundColor: 'white', height: "40px"}} 
                    label="Platform Name" 
                    variant="outlined" 
                    name="res"
                    value={project.name}
                    className={form.formDesign}
                    // defaultValue={project.name ? project.name : 'hello'}
                    inputRef={register({required: true})}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      readOnly: true,
                  }}/>
                </Grid>

            
                <Grid item xs={12}>
                  <Button
                      style={{width: '80%' , marginTop: '5%'}}
                      type = "submit"
                      variant="contained"
                      size="large"
                      color="primary">
                      Save Platform
                  </Button>
                </Grid>
            </Grid>
          </Box> 
    </form>
    </div>
    );
}