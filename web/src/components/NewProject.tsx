// import Box from '@material-ui/core/Box';
// import Grid from '@material-ui/core/Grid';
// import { RouteComponentProps, useMatch } from '@reach/router';
// import React, { useEffect } from 'react';
// import '../modules/Subject';
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
// import { Typography, TextField,  Link, styled, Avatar, makeStyles, Theme, createStyles, Checkbox, IconButton, Collapse } from '@material-ui/core';
// import { useForm, useFormContext } from 'react-hook-form';
// import axios from "axios";
// import PlatformIcon from './icons/Platform';
// import ProjectIcon from './icons/Project';

// const StyledAvatar = styled(Avatar)(({ theme }) => ({
//     backgroundColor: theme.palette.secondary.main,
// }));

// const StyledImage = styled('img')(({ theme }) => ({
//     width: theme.spacing(25),
//     marginBottom: theme.spacing(2),
//     objectFit: 'contain',
//     textAlign: 'center',
// }));

// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     root: {
//       flexGrow: 1,
//     },
//   }),
// );

// const tableStyles = {
//   padding: 'unset',
// };
  

//   interface IFormInput {
//     name: String;
//     des: String;
//     startdate: Date;
//     res: String;
//     enddate: Date;
//     // project_id:String;
//   }

//   // declare var id: any;

//   export default function NewProject(this: any, _: RouteComponentProps) {

//     const { register, handleSubmit } = useForm<IFormInput>();
//     const [lst, setLst] = React.useState([]);
//     const [status , setStatus] = React.useState({ username: '', id:''});
//     // const [id , setid] = React.useState();
//     const [theValue, setTheValue] = React.useState("");



//     const onSubmit = (data: IFormInput) => {
      
//       axios.get('/api/v1/users/')
//       .then(function (response) {
//         for(let i in response.data){
//           if(response.data[i].username == data.res){
//             setTheValue(response.data[i].id);
//             console.log(theValue);
//           }
//         }
//       })
//       .catch(function (error) {
//         console.log(error);
//       });
//       console.log("id" + theValue);
//       // console.log(data.enddate)
      
//       axios.post('/api/v1/saveproject/', {
//         Name: data.name,
//         Description: data.des,
//         StartDate: data.startdate,
//         Responsible: data.res.split(":")[1],
//         EndDate: data.enddate,
//         project_id: theValue,

//       })
//       .then(function (response) {
//         console.log(response);
//         console.log(response.data.status);
//         // window.alert(response.status);
//     })
//       .catch(function (error) {
//         console.log(error);
//       });
//     };

//     const onDrop = () => {
//       axios.get('/api/v1/users/')
//       .then(function (response) {

//         // for (i in response.data[i])
//         // setLst(response.data.map((item: any) => item.username + ":" + item.id))
//           setLst(response.data.map((item: any) => item.username ))
//           // setLst(response.data.)
//       })
//       .catch(function (error) {
//         console.log(error);
//       });
//     };
  

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//             <Box
//               display="flex"
//               flexDirection="column"
//               alignItems="center"
//               mb={8}>

//               <Box display="flex" justifyContent="center" mb={2}>
//             <StyledAvatar>
//               <ProjectIcon />
//             </StyledAvatar>
//              </Box>
            
//                 <Box display="flex" justifyContent="center" mb={2}>
//                 <Typography component="h1" variant="h5" align="center">
//                     New Project {status}
//                 </Typography>
//                 </Box>

//             </Box>  
//                 <Grid container spacing={1}>
//                 <Grid item xs={12}>
//                  <label style={{ width : "100px" , height: "40px", margin:"10px", fontSize:"18px"}}>Project Name</label> 
//                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//                  <input style={{ width : "900px" , height: "40px", margin:"10px"}} name="name" placeholder="Project Name here" ref={register({ required: true, maxLength: 100 })}  />
//             </Grid>
            
//             <Grid item xs={12}>
//                  <label style={{ width : "100px" , height: "40px", margin:"10px", fontSize:"18px"}}>Project Description</label>
//                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//                  <input style={{ width : "900px" , height: "40px", margin:"10px"}} name="des" placeholder="Project Description here" ref={register({ required: true, maxLength: 2000 })}  />
//             </Grid>

//             <Grid item xs={12}>
//                   <label style={{ width : "100px" , height: "40px", margin:"10px", fontSize:"18px"}}>Project Start Date</label>
//                   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//                   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//                   <input type='date' style={{ width : "900px" , height: "40px", margin:"10px"}} name="startdate" ref={register({ required: true })}  />
//             </Grid>
            
//             <Grid item xs={12}>
              
//                 <Box>
//                     <label style={{ width : "100px" , height: "40px", margin:"10px", fontSize:"18px"}}>Responsible</label>
//                     &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//                     &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//                     &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//                     <select style={{ width : "300px" , height: "40px", margin:"10px", fontSize:"18px"}} name="res" ref={register}> 
//                     {lst.map((list) => (
//                     <option  value= {list} key={list}> {list} </option>
//                     ))}
//                     </select> 
//                     <button style={{ width : "200px" , height: "40px", margin:"10px",backgroundColor: 'lightGreen', fontStyle: "inherit"}}  type="button" onClick={() => onDrop()}>Load</button>
                    
//                 </Box>
//             </Grid>

//             <Grid item xs={12}>
//                  <label style={{ width : "100px" , height: "40px", margin:"10px", fontSize:"18px"}}>Expected Completion Date</label>
                
//                  <input type='date' style={{ width : "890px" , height: "40px", margin:"10px"}} name="enddate" ref={register({ required: true})} />
//             </Grid>
//             </Grid>
//       <input style={{ width : "300px" , height: "40px", margin:"20px",backgroundColor: 'lightGreen', fontStyle: "inherit"}} type="submit"/>
//     </form>
//     );
// }


import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { RouteComponentProps, useMatch } from '@reach/router';
import React from 'react';
import '../modules/Subject';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Typography, TextField,  Link, styled, Avatar, makeStyles, Theme, createStyles, Checkbox, IconButton, Collapse } from '@material-ui/core';
import { useForm, useFormContext } from 'react-hook-form';
import axios from "axios";
import PlatformIcon from './icons/Platform';
import ProjectIcon from './icons/Project';

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
    project_id:String;
  }

  export default function NewProject(this: any, _: RouteComponentProps) {

    const { register, handleSubmit, reset } = useForm<IFormInput>();
    const [lst, setLst] = React.useState([])
    const [status , setStatus] = React.useState([])

   
    const onSubmit = (data: IFormInput,e:any) => {

      // let id;
      // axios.get('/api/v1/users/')
      // .then(function (response) {
      //   for(let i in response.data){
      //     if(response.data[i].username == data.res){
      //       id = response.data[i].id;
      //       console.log(response.data[i].id);
      //     }
      //   }
      // })
      // .catch(function (error) {
      //   console.log(error);
      // });
      console.log(data);
      // console.log(data.des)
      // console.log(data.startdate)
      // console.log(data.res)
      // console.log(data.enddate)
      
      axios.post('/api/v1/saveproject/', {
        Name: data.name,
        Description: data.des,
        StartDate: data.startdate,
        Responsible: data.res.split(":")[1],
        EndDate: data.enddate,
        // project_id: id,

      })
      .then(function (response) {
        console.log(response);
        console.log(response.data.status);
        // window.alert(response.status);
    })
      .catch(function (error) {
        console.log(error);
      });

      e.target.reset();

    };

    let splitdata : any
    const onDrop = () => {
      axios.get('/api/v1/users/')
      .then(function (response) {
        setLst(response.data.map((item: any) => item.username + ":" + item.id))
          // setLst(response.data.map((item: any) => item.username ))
        // splitdata = (response.data.map((item: any) => item.username))
        // setLst(splitdata.split(" "))
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
              <ProjectIcon />
            </StyledAvatar>
             </Box>
            
                <Box display="flex" justifyContent="center" mb={2}>
                <Typography component="h1" variant="h5" align="center">
                    New Project {status}
                </Typography>
                </Box>

            </Box>  
                <Grid container spacing={1}>
                <Grid item xs={12}>
                 <label style={{ width : "100px" , height: "40px", margin:"10px", fontSize:"18px"}}>Project Name</label> 
                 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                 <input style={{ width : "900px" , height: "40px", margin:"10px"}} name="name" placeholder="Project Name here" ref={register({ required: true, maxLength: 100 })}  />
            </Grid>
            
            <Grid item xs={12}>
                 <label style={{ width : "100px" , height: "40px", margin:"10px", fontSize:"18px"}}>Project Description</label>
                 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                 <input style={{ width : "900px" , height: "40px", margin:"10px"}} name="des" placeholder="Project Description here" ref={register({ required: true, maxLength: 2000 })}  />
            </Grid>

            <Grid item xs={12}>
                  <label style={{ width : "100px" , height: "40px", margin:"10px", fontSize:"18px"}}>Project Start Date</label>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <input type='date' style={{ width : "900px" , height: "40px", margin:"10px"}} name="startdate" ref={register({ required: true })}  />
            </Grid>
            
            <Grid item xs={12}>
              
                <Box>
                    <label style={{ width : "100px" , height: "40px", margin:"10px", fontSize:"18px"}}>Responsible</label>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <select style={{ width : "300px" , height: "40px", margin:"10px", fontSize:"18px"}} name="res" ref={register}> 
                    {lst.map((list) => (
                    <option value= {list} key={list}> {list} </option>
                    ))}
                    </select> 
                    <button style={{ width : "200px" , height: "40px", margin:"10px",backgroundColor: 'lightGreen', fontStyle: "inherit"}}  type="button" onClick={() => onDrop()}>Load</button>
                    
                </Box>
            </Grid>

            <Grid item xs={12}>
                 <label style={{ width : "100px" , height: "40px", margin:"10px", fontSize:"18px"}}>Expected Completion Date</label>
                
                 <input type='date' style={{ width : "890px" , height: "40px", margin:"10px"}} name="enddate" ref={register({ required: true})} />
            </Grid>
            </Grid>
      <input style={{ width : "300px" , height: "40px", margin:"20px",backgroundColor: 'lightGreen', fontStyle: "inherit"}} type="submit"/>
    </form>
    );
}