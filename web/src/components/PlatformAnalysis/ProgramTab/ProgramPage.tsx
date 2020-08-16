import { Typography } from '@material-ui/core';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Grid from '@material-ui/core/Grid';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React from 'react';
import Checkbox from '../../FormWidget/Checkbox';
import TextField from '../../FormWidget/TextField';
import { usePlatformTypeListContext } from '../../PlatformTypeListProvider';

export default function ProgramPage() {
    var ButtonDesign = {

        backgroundColor: 'light blue',
        padding:    '15px 32px',
        margin: '4px 2px',
        
    };
    var h3Design = {
        backgroundColor: 'light blue',

    };

    const platformTypeListSubject = usePlatformTypeListContext();

    const content = React.useMemo(
        () => (
            <Grid container spacing={4}>
               
                <Grid item xs={3} md={3}>
                    <p>Platform Name</p> 
                </Grid>

                <Grid item xs={3} md={3}>
                    <TextField
                        name={['pf_name']}
                        label="Platform Name"
                    />
                </Grid>
                
                <Grid item xs={3} md={3}>
                </Grid>  

                <Grid item xs={3} md={3}>
                    <h3>Other Works Details</h3>
                </Grid>

{/* ============================================== */}
                <Grid item xs={3} md={3}>
                    <p>Last Under Water Inspection Date</p> 
                </Grid>

                <Grid item xs={3} md={3}>
                    <TextField
                        name={['Under_Water_Inspection_Date']}
                        label="Inspection Date"
                    />
                </Grid>

                <Grid item xs={3} md={3}>
                </Grid> 

                <Grid item xs={3} md={3}>
                    <Checkbox
                        label="Weld Monitoring"
                        name="weld_monitoring"
                    />
                </Grid>
{/* =================================================== */}
                <Grid item xs={3} md={3}>
                    <p>Platform Risk Ranking</p> 
                </Grid>

                <Grid item xs={3} md={3}>
                    <TextField
                        name={['Platform_Risk_Rankinge']}
                        label="Platform Risk Rankinge"
                    />
                </Grid>

                <Grid item xs={3} md={3}>
                </Grid> 

                <Grid item xs={3} md={3}>
                    <Checkbox
                        label="Marine Growth Cleaning"
                        name="Marine_Growth_Cleaning"
                    />
                </Grid>
{/* ================================================ */}

                <Grid item xs={3} md={3}>
                    <h3 style={h3Design}>Type of Survey Level</h3> 
                </Grid>

                <Grid item xs={3} md={3}>
                    <h3 style={h3Design}>Next Selected Inspection Interval (Years)</h3>
                </Grid>


                <Grid item xs={3} md={3}>
                    <h3 style={h3Design}>Next Inspection Date</h3>
                </Grid>

                <Grid item xs={3} md={3}>
                    <Checkbox
                        label="Debris Clearance"
                        name="Debris_Clearance"
                    />
                </Grid>
{/* =================================================== */}
                <Grid item xs={3} md={3}>
                    <p>Level I</p> 
                </Grid>

                <Grid item xs={3} md={3}>
                    <TextField
                        name={['Level1']}
                        label="Level I"
                    />
                </Grid>

                <Grid item xs={3} md={3}>
                    <TextField
                        name={['Level1']}
                        label="Inspection Date"
                    />
                </Grid>

                <Grid item xs={3} md={3}>
                    <Checkbox
                        label="Anode Confirmation"
                        name="MAnode_Confirmation"
                    />
                </Grid>
{/* ================================================ */}
                <Grid item xs={3} md={3}>
                    <p>Level II</p> 
                </Grid>

                <Grid item xs={3} md={3}>
                    <TextField
                        name={['Level2']}
                        label="Level II"
                    />
                </Grid>

                <Grid item xs={3} md={3}>
                    <TextField
                        name={['Level2']}
                        label="Inspection Date"
                    />
                </Grid>

                <Grid item xs={3} md={3}>
                    <Checkbox
                        label="Scour Repair"
                        name="Scour_Repair"
                    />
                </Grid>
{/* ===================================== */}
                <Grid item xs={3} md={3}>
                    <p>Level III</p> 
                </Grid>

                <Grid item xs={3} md={3}>
                    <TextField
                        name={['Level3']}
                        label="Level III"
                    />
                </Grid>

                <Grid item xs={3} md={3}>
                    <TextField
                        name={['Level3']}
                        label="Inspection Date"
                    />
                </Grid>

                <Grid item xs={3} md={3}>
                    <Checkbox
                        label="Corrosion Survey"
                        name="Corrosion_Survey"
                    />
                </Grid>
{/* ===================================== */}
                <Grid item xs={3} md={3}>
                </Grid> 

                <Grid item xs={3} md={3}>
                </Grid> 

                <Grid item xs={3} md={3}>
                </Grid> 

                <Grid item xs={3} md={3}>
                    <Checkbox
                        label="Other"
                        name="other"
                    />
                </Grid>
{/* ================================================ */}
                <Grid item xs={3} md={3}>
                    <h3 style={h3Design}>Survey Details</h3> 
                </Grid>

                <Grid item xs={3} md={3}>
                </Grid>

                 <Grid item xs={3} md={3}>
                </Grid>  

                <Grid item xs={3} md={3}>
                </Grid> 
{/* ================================================ */}

                <Grid item xs={3} md={3}>
                    <h3 style={h3Design}>API Level I Survey - Routine Above-water Inspection</h3> 
                </Grid>

                <Grid item xs={3} md={3}>
                    <h3 style={h3Design}>Method</h3>
                </Grid>


                <Grid item xs={3} md={3}>
                    <h3 style={h3Design}>Scope of Survey</h3>
                </Grid>

                <Grid item xs={3} md={3}>
                </Grid> 
{/* =================================================== */}
                <Grid item xs={3} md={3}>
                    <p>Above-water Visual</p> 
                </Grid>

                <Grid item xs={3} md={3}>
                    <TextField
                        name={['method']}
                        label="Method"
                    />
                </Grid>

                <Grid item xs={3} md={3}>
                    <TextField
                        name={['Scope of Survey']}
                        label="Scope"
                    />
                </Grid>

                <Grid item xs={3} md={3}>
                </Grid> 
{/* =================================================== */}
                <Grid item xs={3} md={3}>
                    <p>Coating Survey</p> 
                </Grid>

                <Grid item xs={3} md={3}>
                    <TextField
                        name={['method']}
                        label="Method"
                    />
                </Grid>

                <Grid item xs={3} md={3}>
                    <TextField
                        name={['Scope of Survey']}
                        label="Scope"
                    />
                </Grid>

                <Grid item xs={3} md={3}>
                </Grid> 
{/* ===================================== */}

                <Grid item xs={3} md={3}>
                    <p>Underwater CP Survey</p> 
                </Grid>

                <Grid item xs={3} md={3}>
                    <TextField
                        name={['method']}
                        label="Method"
                    />
                </Grid>

                <Grid item xs={3} md={3}>
                    <TextField
                        name={['Scope of Survey']}
                        label="Scope"
                    />
                </Grid>

                <Grid item xs={3} md={3}>
                </Grid> 
{/* ===================================== */}

                <Grid item xs={3} md={3}>
                    <p>Appurtenance and Personnel Safety Devices Surveys</p> 
                </Grid>

                <Grid item xs={3} md={3}>
                    <TextField
                        name={['method']}
                        label="Method"
                    />
                </Grid>

                <Grid item xs={3} md={3}>
                    <TextField
                        name={['Scope of Survey']}
                        label="Scope"
                    />
                </Grid>

                <Grid item xs={3} md={3}>
                </Grid> 
{/* ===================================== */}

                <Grid item xs={3} md={3}>
                    <p>Deck Elevation Survey</p> 
                </Grid>

                <Grid item xs={3} md={3}>
                    <TextField
                        name={['method']}
                        label="Method"
                    />
                </Grid>

                <Grid item xs={3} md={3}>
                    <TextField
                        name={['Scope of Survey']}
                        label="Scope"
                    />
                </Grid>

                <Grid item xs={3} md={3}>
                </Grid> 
{/* ===================================== */}

                <Grid item xs={3} md={3}>
                    <p>Supplemental Surveys (NDT, material sampling, wall thickness measurements, etc)</p> 
                </Grid>

                <Grid item xs={3} md={3}>
                    <TextField
                        name={['method']}
                        label="Method"
                    />
                </Grid>

                <Grid item xs={3} md={3}>
                    <TextField
                        name={['Scope of Survey']}
                        label="Scope"
                    />
                </Grid>

                <Grid item xs={3} md={3}>
                </Grid> 
{/* ===================================== */}

                <Grid item xs={3} md={3}>
                    <h3 style={h3Design}>API Level II Survey -Underwater Inspection</h3> 
                </Grid>

                <Grid item xs={3} md={3}>
                    <h3 style={h3Design}>Method</h3>
                </Grid>


                <Grid item xs={3} md={3}>
                    <h3 style={h3Design}>Scope of Survey</h3>
                </Grid>

                <Grid item xs={3} md={3}>
                </Grid> 
{/* =================================================== */}
                <Grid item xs={3} md={3}>
                    <p>General Visual (Dents, Cracks, Abrasions, Bows, Severed, Holes, Gouges, Missing, Other)</p> 
                </Grid>

                <Grid item xs={3} md={3}>
                    <TextField
                        name={['method']}
                        label="Method"
                    />
                </Grid>

                <Grid item xs={3} md={3}>
                    <TextField
                        name={['Scope of Survey']}
                        label="Scope"
                    />
                </Grid>

                <Grid item xs={3} md={3}>
                </Grid> 
{/* =================================================== */}
                <Grid item xs={3} md={3}>
                    <p>Debris</p> 
                </Grid>

                <Grid item xs={3} md={3}>
                    <TextField
                        name={['method']}
                        label="Method"
                    />
                </Grid>

                <Grid item xs={3} md={3}>
                    <TextField
                        name={['Scope of Survey']}
                        label="Scope"
                    />
                </Grid>

                <Grid item xs={3} md={3}>
                </Grid> 
{/* ===================================== */}

                <Grid item xs={3} md={3}>
                    <p>Marine growth Thickness</p> 
                </Grid>

                <Grid item xs={3} md={3}>
                    <TextField
                        name={['method']}
                        label="Method"
                    />
                </Grid>

                <Grid item xs={3} md={3}>
                    <TextField
                        name={['Scope of Survey']}
                        label="Scope"
                    />
                </Grid>

                <Grid item xs={3} md={3}>
                </Grid> 
{/* ===================================== */}

                <Grid item xs={3} md={3}>
                    <p>Scour Depth</p> 
                </Grid>

                <Grid item xs={3} md={3}>
                    <TextField
                        name={['method']}
                        label="Method"
                    />
                </Grid>

                <Grid item xs={3} md={3}>
                    <TextField
                        name={['Scope of Survey']}
                        label="Scope"
                    />
                </Grid>

                <Grid item xs={3} md={3}>
                </Grid> 
{/* ===================================== */}

                <Grid item xs={3} md={3}>
                    <p>Anodes</p> 
                </Grid>

                <Grid item xs={3} md={3}>
                    <TextField
                        name={['method']}
                        label="Method"
                    />
                </Grid>

                <Grid item xs={3} md={3}>
                    <TextField
                        name={['Scope of Survey']}
                        label="Scope"
                    />
                </Grid>

                <Grid item xs={3} md={3}>
                </Grid> 
{/* ===================================== */}

                <Grid item xs={3} md={3}>
                    <p>Cathodic potential</p> 
                </Grid>

                <Grid item xs={3} md={3}>
                    <TextField
                        name={['method']}
                        label="Method"
                    />
                </Grid>

                <Grid item xs={3} md={3}>
                    <TextField
                        name={['Scope of Survey']}
                        label="Scope"
                    />
                </Grid>

                <Grid item xs={3} md={3}>
                </Grid> 
{/* ===================================== */}

                <Grid item xs={3} md={3}>
                    <p>Risers</p> 
                </Grid>

                <Grid item xs={3} md={3}>
                    <TextField
                        name={['method']}
                        label="Method"
                    />
                </Grid>

                <Grid item xs={3} md={3}>
                    <TextField
                        name={['Scope of Survey']}
                        label="Scope"
                    />
                </Grid>

                <Grid item xs={3} md={3}>
                </Grid> 
{/* ===================================== */}

                <Grid item xs={3} md={3}>
                    <p>J-Tube</p> 
                </Grid>

                <Grid item xs={3} md={3}>
                    <TextField
                        name={['method']}
                        label="Method"
                    />
                </Grid>

                <Grid item xs={3} md={3}>
                    <TextField
                        name={['Scope of Survey']}
                        label="Scope"
                    />
                </Grid>

                <Grid item xs={3} md={3}>
                </Grid> 
{/* ===================================== */}

                <Grid item xs={3} md={3}>
                    <p>Caissons</p> 
                </Grid>

                <Grid item xs={3} md={3}>
                    <TextField
                        name={['method']}
                        label="Method"
                    />
                </Grid>

                <Grid item xs={3} md={3}>
                    <TextField
                        name={['Scope of Survey']}
                        label="Scope"
                    />
                </Grid>

                <Grid item xs={3} md={3}>
                </Grid> 
{/* ===================================== */}

                <Grid item xs={3} md={3}>
                    <p>Conductor</p> 
                </Grid>

                <Grid item xs={3} md={3}>
                    <TextField
                        name={['method']}
                        label="Method"
                    />
                </Grid>

                <Grid item xs={3} md={3}>
                    <TextField
                        name={['Scope of Survey']}
                        label="Scope"
                    />
                </Grid>

                <Grid item xs={3} md={3}>
                </Grid> 
{/* ===================================== */}

                <Grid item xs={3} md={3}>
                    <h3 style={h3Design}>API Level III Survey -Underwater Inspection</h3> 
                </Grid>

                <Grid item xs={3} md={3}>
                    <h3 style={h3Design}>Method</h3>
                </Grid>


                <Grid item xs={3} md={3}>
                    <h3 style={h3Design}>Scope of Survey</h3>
                </Grid>

                <Grid item xs={3} md={3}>
                </Grid> 
{/* =================================================== */}
                <Grid item xs={3} md={3}>
                    <p>Visual Corrosion Survey</p> 
                </Grid>

                <Grid item xs={3} md={3}>
                    <TextField
                        name={['method']}
                        label="Method"
                    />
                </Grid>

                <Grid item xs={3} md={3}>
                    <TextField
                        name={['Scope of Survey']}
                        label="Scope"
                    />
                </Grid>

                <Grid item xs={3} md={3}>
                </Grid> 
{/* =================================================== */}
                <Grid item xs={3} md={3}>
                    <p>Flooded member detection or member close visual inspection</p> 
                </Grid>

                <Grid item xs={3} md={3}>
                    <TextField
                        name={['method']}
                        label="Method"
                    />
                </Grid>

                <Grid item xs={3} md={3}>
                    <TextField
                        name={['Scope of Survey']}
                        label="Scope"
                    />
                </Grid>

                <Grid item xs={3} md={3}>
                </Grid> 
{/* ===================================== */}

                <Grid item xs={3} md={3}>
                    <p>Weld/joint close visual inspection</p> 
                </Grid>

                <Grid item xs={3} md={3}>
                    <TextField
                        name={['method']}
                        label="Method"
                    />
                </Grid>

                <Grid item xs={3} md={3}>
                    <TextField
                        name={['Scope of Survey']}
                        label="Scope"
                    />
                </Grid>

                <Grid item xs={3} md={3}>
                </Grid> 
{/* ===================================== */}

                <Grid item xs={3} md={3}>
                    <h3 style={h3Design}>API Level IV Survey -Underwater Inspection</h3> 
                </Grid>

                <Grid item xs={3} md={3}>
                    <h3 style={h3Design}>Method</h3>
                </Grid>


                <Grid item xs={3} md={3}>
                    <h3 style={h3Design}>Scope of Survey</h3>
                </Grid>

                <Grid item xs={3} md={3}>
                </Grid> 
{/* =================================================== */}
                <Grid item xs={3} md={3}>
                    <p>Weld/joint NDT</p> 
                </Grid>

                <Grid item xs={3} md={3}>
                    <TextField
                        name={['method']}
                        label="Method"
                    />
                </Grid>

                <Grid item xs={3} md={3}>
                    <TextField
                        name={['Scope of Survey']}
                        label="Scope"
                    />
                </Grid>

                <Grid item xs={3} md={3}>
                </Grid> 
{/* =================================================== */}
                <Grid item xs={3} md={3}>
                    <p>Wall UT</p> 
                </Grid>

                <Grid item xs={3} md={3}>
                    <TextField
                        name={['method']}
                        label="Method"
                    />
                </Grid>

                <Grid item xs={3} md={3}>
                    <TextField
                        name={['Scope of Survey']}
                        label="Scope"
                    />
                </Grid>

                <Grid item xs={3} md={3}>
                </Grid> 
{/* ===================================== */}

                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                    </Grid> 
                    <Grid item xs={12} md={6}>
                        <button style={ButtonDesign} type="submit"><b>SAVE</b></button>
                    </Grid>
                </Grid>

            </Grid>
  
        ),
        [platformTypeListSubject]
    );

    return (
        <ExpansionPanel defaultExpanded>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="body1">General Details</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>{content}</ExpansionPanelDetails>
        </ExpansionPanel>
    );
}
