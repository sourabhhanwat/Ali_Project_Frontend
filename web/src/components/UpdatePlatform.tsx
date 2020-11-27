import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { RouteComponentProps, useMatch } from '@reach/router';
import React from 'react';
import '../modules/Subject';
import { styled, Avatar, Button, makeStyles } from '@material-ui/core';
import { useForm} from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import axios from "axios";

const StyledAvatar = styled(Avatar)(({ theme }) => ({
    backgroundColor: theme.palette.secondary.main,
}));
  
const formStyles = makeStyles({
  formDesign: {
    width : '80%' , 
    backgroundColor: 'white', 
    marginTop: "1.5%"
  },
});

interface IFormInput {
  name: String;
  des: String;
  res: String;
  pro: String;
}

export default function UpdatePlatform(this: any, {platformId,}: RouteComponentProps<{platformId: number;}>) {

    const { register, handleSubmit } = useForm<IFormInput>({
      defaultValues: {
        pro: '',
      }
    });
    const [lst, setLst] = React.useState([])
    const [platform, updatePlatform] = React.useState<any>([]);
    const [project, updateProject] = React.useState<any>([]);
    const [user, setUserName] = React.useState('');

    const [status, setStatus] = React.useState({
      isSubmitted : false,
      status : false,
    })

    const match = useMatch('/dashboard/UpdatePlatform/:platformId');

    if (match) {
        platformId = parseInt((match as any).platformId);
    }
    
    React.useEffect(() => {
      fetch(`/api/v1/platforms/${platformId}`)
        .then(results => results.json())
        .then(data => {
          updatePlatform(data);
        });
    }, []);

    React.useEffect(() => {
        fetch('/api/v1/projects')
          .then(results => results.json())
          .then(data => {
            updateProject(data);
          });
      }, []);

    const onSubmit = (data: IFormInput,e:any) => {
      console.log(data);
      
      axios.post('/api/v1/updateplatform/', {
        Name: data.name,
        Description: data.des,
        Responsible: data.res,
        Project: data.pro,
        platformId : platformId,
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