import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { RouteComponentProps, useMatch } from '@reach/router';
import React from 'react';
import '../modules/Subject';
import { Typography, styled, Avatar, makeStyles, Theme, createStyles, Button } from '@material-ui/core';
import { useForm} from 'react-hook-form';
import axios from "axios";
import PlatformIcon from './icons/Platform';

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
    // startdate: Date;
    res: String;
    pro: String;
    // enddate: Date;
  }

  export default function NewPlatform(this: any, _: RouteComponentProps) {

    const { register, handleSubmit ,reset} = useForm<IFormInput>();
    const [lst, setLst] = React.useState([])
    const [lst2, setLst2] = React.useState([])
    const [status, setStatus] = React.useState({
      isSubmitted : false,
      status : false,
    })

    let projectId: number | undefined;

    const match = useMatch('/dashboard/projects/:projectId');

    if (match) {
        projectId = parseInt((match as any).projectId);
    }
      
    
    const onSubmit = (data: IFormInput,e:any) => {
      console.log(data);
      
      axios.post('/api/v1/saveplatform/', {
        Name: data.name,
        Description: data.des,
        // StartDate: data.startdate,
        Responsible: data.res,
        Project: data.pro,
        // EndDate: data.enddate
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

    const onDrop = () => {
      axios.get('/api/v1/users/')
      .then(function (response) {
        // setLst(response.data.map((item: any) => item.username + ":"+ item.id))
        setLst(response.data.map((item : any) => ({
          username : item.username,
          id : item.id,
        })))
      })
      .catch(function (error) {
        console.log(error);
      });
    };

    const onDrop2 = () => {
      axios.get('/api/v1/projects/')
      .then(function (response) {
        setLst2(response.data.map((item: any) => ({
          name: item.name,
          id : item.id,
        })))
      })
      .catch(function (error) {
        console.log(error);
      });
    };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              mb={8}>

              <Box display="flex" justifyContent="center" mb={2}>
            <StyledAvatar>
              <PlatformIcon />
            </StyledAvatar>
             </Box>
            
                <Box display="flex" justifyContent="center" mb={2}>
                <Typography component="h1" variant="h5" align="center">
                    New Platform
                </Typography>
                </Box>

            </Box>  
                <Grid container spacing={1}>
             <Grid item xs={12}>

                {status.isSubmitted ? status.status ? 
                  <p style={{color: "green"}}>Data Submitted Succesfully!!..</p> : 
                  <p style={{ color : "red"}}>Data Not Saved!!.</p> : null
                }

                 <label style={{ width : "100px" , height: "40px", margin:"10px", fontSize:"18px"}}>Platform Name</label> 
                 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                 <input style={{ width : "900px" , height: "40px", margin:"10px"}} name="name" placeholder="Platform Name here" ref={register({ required: true, maxLength: 100 })}  />
            </Grid>
            
            <Grid item xs={12}>
                 <label style={{ width : "100px" , height: "40px", margin:"10px", fontSize:"18px"}}>Platform Description</label>
                 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                 <input style={{ width : "900px" , height: "40px", margin:"10px"}} name="des" placeholder="Platform Description here" ref={register({ required: true, maxLength: 2000 })}  />
            </Grid>

            {/* <Grid item xs={12}>
                  <label style={{ width : "100px" , height: "40px", margin:"10px", fontSize:"18px"}}>Platform Start Date</label>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <input type='date' style={{ width : "900px" , height: "40px", margin:"10px"}} name="startdate" ref={register({ required: true })}  />
            </Grid> */}
            
            <Grid item xs={12}>
            <Box>
                    <label style={{ width : "100px" , height: "40px", margin:"10px", fontSize:"18px"}}>Responsible</label>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                    <select style={{ width : "300px" , height: "40px", margin:"10px", fontSize:"18px"}} name="res" ref={register}> 
                    {lst.map((list: any) => (
                    <option value= {list.id} key={list.id}> {list.username} </option>
                    ))}
                    </select> 
                    <Box fontWeight={800} clone>
                          <Button
                              type = "button"
                              variant="contained"
                              onClick={() => onDrop()}
                              size="large"
                              color="primary"
                              style={{margin: 5}}>
                              Load
                          </Button>
                      </Box>
                    {/* <button style={{ width : "200px" , height: "40px", margin:"10px",backgroundColor: 'lightGreen', fontStyle: "inherit"}}  type="button" onClick={() => onDrop()}>Load</button> */}
                    
                </Box>
            </Grid>

            <Grid item xs={12}>
            <Box>
                    <label style={{ width : "100px" , height: "40px", margin:"10px", fontSize:"18px"}}>Projects   </label>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <select style={{ width : "300px" , height: "40px", margin:"10px", fontSize:"18px"}} name="pro" ref={register}> 
                    {lst2.map((list: any) => (
                    <option value= {list.id} key={list.id}> {list.name} </option>
                    ))}
                    </select> 
                    <Box fontWeight={800} clone>
                          <Button
                              type = "button"
                              variant="contained"
                              onClick={() => onDrop2()}
                              size="large"
                              color="primary"
                              style={{margin: 5}}>
                              Load
                          </Button>
                      </Box>
                    {/* <button style={{ width : "200px" , height: "40px", margin:"10px",backgroundColor: 'lightGreen', fontStyle: "inherit"}}  type="button" onClick={() => onDrop2()}>Load</button> */}
                    
                </Box>
            </Grid>

            {/* <Grid item xs={12}>
                  <label style={{ width : "100px" , height: "40px", margin:"10px", fontSize:"18px"}}>Expected Completion Date</label>
                  <input type='date' style={{ width : "900px" , height: "40px", margin:"10px"}} name="enddate" ref={register({ required: true})} />
            </Grid> */}
            </Grid>
            <Box fontWeight={800} clone>
                <Button
                    type = "submit"
                    variant="contained"
                    size="large"
                    color="primary"
                    style={{margin: 5}}>
                    Submit
                </Button>
            </Box>
    </form>
    );
}