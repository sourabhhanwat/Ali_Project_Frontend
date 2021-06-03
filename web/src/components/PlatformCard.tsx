import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import { styled, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Filter1OutlinedIcon from '@material-ui/icons/Filter1Outlined';
import Skeleton from '@material-ui/lab/Skeleton';
import { Link } from '@reach/router';
import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import RelativeDate from './RelativeDate';
import axios from "axios";
import { PDFDownloadLink } from '@react-pdf/renderer';
import { PdfDocument } from './PDFGeneration';
import { confirmAlert } from 'react-confirm-alert';
import Moment from 'react-moment';
import moment from 'moment';

const StyledAvatar = styled(Avatar)(
    ({
        theme,
        level,
    }: {
        theme: Theme;
        level: 'veryLow' | 'low' | 'medium' | 'high' | 'veryHigh';
    }) => ({
        '&.MuiAvatar-colorDefault': {
            color: theme.palette[level].main,
            backgroundColor: theme.palette[level].light,
        },
    })
);

export function SkeletonPlatformCard() {
    return (
        <Card>
            <CardContent>
                <Box fontWeight={800} clone>
                    <Typography variant="h5">
                        <Skeleton variant="text" />
                    </Typography>
                </Box>
                <Typography variant="caption">
                    <Skeleton variant="text" />
                </Typography>
            </CardContent>
            <Divider />
            <Divider />
            <List>
                <ListItem>
                    <ListItemAvatar>
                        <StyledAvatar level="veryHigh">
                            <Filter1OutlinedIcon />
                        </StyledAvatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={
                            <Box clone fontWeight={800} fontSize="body2.fontSize">
                                <Typography>
                                    <Skeleton variant="text" />
                                </Typography>
                            </Box>
                            
                        }
                    />
                </ListItem>
                <Divider />
                
                <ListItem>
                    <ListItemText
                        primary={
                            <Box
                                clone
                                fontWeight={800}
                                fontSize="body2.fontSize"
                            >
                                <Typography>
                                    <Skeleton variant="text" />
                                </Typography>
                            </Box>
                        }
                    />
                </ListItem>
            </List>
        </Card>
    );
}

const StyledLink = styled(Link)({ textDecoration: 'none' });

export default function PlatformCard({ platform }: { platform: Platform }) {

    const [status, setstatus] = React.useState({
        isdeleted: false,
    })

    const submit = (value : any) => {
        console.log("func called")
        confirmAlert({
          title: 'Confirm to delete',
          message: 'Are you sure to do this.',
          buttons: [
            {
              label: 'Yes',
                onClick: () => axios.post('/api/v1/deleteplatform/', {
                    platformId: value,
                })
                .then(function (response) {
                    console.log(response);
                    setstatus({
                        isdeleted : true,
                    })
                })
                .catch(function (error) {
                    console.log(error);
                }),
            },
            {
              label: 'No',
              onClick: () => setstatus({
                isdeleted : false,
            })
            }
          ],
        });  
    };

    

    const [platformData, setPlatform] = React.useState<any>([]);

    React.useEffect(() => {
      axios.get(`/api/v1/platforms/${platform.id}`)
        .then(data => {
          data.data.rbui_assessment_date = moment(data.data.rbui_assessment_date).format('DD/MM/YYYY');
          data.data.last_inspection.last_underwater_inspection_date = moment(data.data.last_inspection.last_underwater_inspection_date).format('DD/MM/YYYY');
          data.data.platform_installation_date = moment(data.data.platform_installation_date).format('DD/MM/YYYY');
          setPlatform(data.data);
        });
    }, []);

    console.log("PLatform data ==", platformData)

    var projectId = platformData ? platformData.project : ''
    console.log("I am projectId =",projectId)

    if(status.isdeleted === true){
        window.location.href=(`/dashboard/project/${projectId}/platforms`);
    }
    
    return (
        <Card>
            <CardContent>
                <Box fontWeight={800} clone>
                    <Typography variant="h5">{platform.name}</Typography>
                </Box>
                <Typography variant="caption">
                    <RelativeDate date={platform.updated_at} />
                    <p style={{fontSize : '14px'}}>{platform.description}</p>
                </Typography>
            </CardContent>
            <Divider />
            <Divider />
            <List>
                <ListItem>
                    <ListItemAvatar>
                        <StyledAvatar level="veryHigh">
                            <Filter1OutlinedIcon />
                        </StyledAvatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={
                            <Box clone fontSize="body2.fontSize">
                                <Typography>Jackets</Typography>
                            </Box>
                        }
                    />
                    <ListItemAvatar>
                        <StyledAvatar level="veryHigh" style={{backgroundColor : 'white'}}>
                            <Box  clone fontWeight={800}>
                                <PDFDownloadLink
                                    document={<PdfDocument data={platformData} />}
                                    fileName={platformData.name}
                                    >
                                    <Button
                                        type = "submit"  
                                        variant="contained"
                                        size="large"
                                        color="primary"
                                        title="Download Report"
                                        style={{margin: 5, backgroundColor: 'unset', boxShadow: 'none'}}
                                        >
                                        <img style={{ width : '30px', height : '30px'}} alt=""
                                        src="https://img.icons8.com/color/100/000000/export-pdf.png"/>
                                    </Button>
                                </PDFDownloadLink>
                            </Box>
                        </StyledAvatar>
                    </ListItemAvatar>
                </ListItem>
                
            </List>
            <Box justifyContent="space-between" clone>
                <CardActions>
                        <Button size= "small" title="Delete" color="primary"
                            onClick={() => submit(platform.id)} >
                            <DeleteIcon />
                        </Button>
                
                    <StyledLink
                        to={`/dashboard/platforms/${platform.id}/analysis`}>
                        <Box  clone fontWeight={800}>
                            <Button color="primary" title="Analysis">
                                Assessment <ChevronRightIcon />
                            </Button>
                        </Box>
                    </StyledLink>
                        
                </CardActions>
            </Box>
        </Card>
    );
}