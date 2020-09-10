import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { RouteComponentProps, useMatch } from '@reach/router';
import React from 'react';
import '../modules/Subject';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Typography, TextField,  Link, styled, Avatar, makeStyles, Theme, createStyles, Checkbox, IconButton, Collapse } from '@material-ui/core';
import { useFormContext } from 'react-hook-form';
import { usePlatformMannedStatusListContext } from './UsersDropdown';
import Select from './FormWidget/User';


function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="#">
                rbui
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

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


export default function NewProject(_: RouteComponentProps) {


//     const { watch } = useFormContext();

// const platformMannedStatusListSubject = usePlatformMannedStatusListContext();

// const platform_manned_status_id = watch('platform_manned_status_id');

// console.log("platform_manned_status_id");
// console.log(platform_manned_status_id);

// const [
//     platformMannedStatusList,
//     setPlatformMannedStatusList,
// ] = React.useState<platform_user_status[]>([]);

// const handlePlatformMannedStatus = React.useCallback(
//     (state: State<platform_user_status[] | null>) => {
//         setPlatformMannedStatusList(state.value ?? []);
//     },
//     []
// );

// React.useEffect(() => {
//     platformMannedStatusListSubject.attach(handlePlatformMannedStatus);
//     return () =>
//         platformMannedStatusListSubject.detach(handlePlatformMannedStatus);
// }, [platformMannedStatusListSubject, handlePlatformMannedStatus]);

// const platformMannedStatus = React.useMemo(
//     () =>
//         platformMannedStatusList.find(
//             (value) => value.id === platform_manned_status_id
//         ),
//     [platform_manned_status_id, platformMannedStatusList]
// );

// console.log('platformMannedStatusList');
// console.log(platformMannedStatusList);

    
  return (
        <>
        <form noValidate>
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

        <Box mb={2}>

        <Grid container spacing={1}>
             <Grid item xs={12}>
            <TextField
                // inputRef={register({
                //     required: {
                //         value: true,
                //         message: 'firstname required',
                //     },
                //     minLength: {
                //         value: 3,
                //         message: 'firstname too short',
                //     },
                // })}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Name"
                name="Name"
                autoComplete="firstname"
                // error={!!errors['firstname']}
                // helperText={errors['firstname']?.message}
                autoFocus
            />
            </Grid>
            <Grid item xs={12}>
            <TextField
                // inputRef={register({
                //     required: {
                //         value: true,
                //         message: 'lastname required',
                //     },
                //     minLength: {
                //         value: 3,
                //         message: 'lastname too short',
                //     },
                // })}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Description"
                name="Description"
                autoComplete="firstname"
                // error={!!errors['lastname']}
                // helperText={errors['lastname']?.message}
                autoFocus
            />
            </Grid>

            <Grid item xs={12}>
            <TextField
                // inputRef={register({
                //     required: {
                //         value: true,
                //         message: 'lastname required',
                //     },
                //     minLength: {
                //         value: 3,
                //         message: 'lastname too short',
                //     },
                // })}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Start Date"
                name="StartDate"
                autoComplete="firstname"
                // error={!!errors['lastname']}
                // helperText={errors['lastname']?.message}
                autoFocus
            />
            </Grid>

            <Grid item xs={12}>
            <TextField
                // inputRef={register({
                //     required: {
                //         value: true,
                //         message: 'lastname required',
                //     },
                //     minLength: {
                //         value: 3,
                //         message: 'lastname too short',
                //     },
                // })}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Responsible"
                name="Responsible"
                autoComplete="firstname"
                // error={!!errors['lastname']}
                // helperText={errors['lastname']?.message}
                autoFocus
            />
            </Grid>
            <Grid item xs={12}> 
            <TextField
                // inputRef={register({
                //     required: {
                //         value: true,
                //         message: 'lastname required',
                //     },
                //     minLength: {
                //         value: 3,
                //         message: 'lastname too short',
                //     },
                // })}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Expected Completion Date"
                name="ExpectedCompletionDate"
                autoComplete="firstname"
                // error={!!errors['lastname']}
                // helperText={errors['lastname']?.message}
                autoFocus
            />
            </Grid>

            <Box mb={2}>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                >
                    {/* {!isPending && 'Sign In'}
                    {isPending && <CircularProgress />} */}
                </Button>
            </Box>
            
            </Grid>
        </Box>
  </form>
        </>
    );
}
