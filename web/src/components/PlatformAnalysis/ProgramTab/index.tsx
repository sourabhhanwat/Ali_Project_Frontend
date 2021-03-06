import Box from '@material-ui/core/Box';
import React from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Grid from '@material-ui/core/Grid';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Checkbox from '../../FormWidget/Checkbox';
import TextField from '../../FormWidget/TextField';
import { Typography } from '@material-ui/core';
import DatePicker from '../../FormWidget/DatePicker';
import { useFormContext } from 'react-hook-form';
import { usePlatformTypeListContext } from '../../PlatformTypeListProvider';
import moment from 'moment';

export default function ProgramTab({ hidden }: { hidden?: boolean }) {

    const platformTypeListSubject = usePlatformTypeListContext();

    const { watch } = useFormContext();

    const risk_ranking = watch(
        'risk_ranking'
    );
    
    const platform_name = watch('name');

    const inspection_date = watch('last_inspection.last_underwater_inspection_date');

    let date_value =  inspection_date ? moment(inspection_date).format("D/MM/YYYY") : 'Inspection Date'

    let red = (risk_ranking === 'H') ?  '#FFC000' : (risk_ranking === 'VH') ?  '#FF0000' : (risk_ranking === 'M') ?  '#FFFF00' : (risk_ranking === 'L') ?  '#92D050' : '#00B050';

    var h3Design = {
        backgroundColor: 'light blue',
    };

    return(
        <Box hidden={hidden}>
            <Accordion defaultExpanded>
                <AccordionSummary style={{backgroundColor: "#02bfa6"}} expandIcon={<ExpandMoreIcon />}>
                    <Typography style={{color: "White"}} variant="h6">Inspection Program</Typography>
                </AccordionSummary>
                    <AccordionDetails>
                        <Grid container spacing={4}>
                    <Grid item xs={12} md={12}>
                    </Grid>
                    <Grid item xs={3} md={3}>
                        <p>Platform Name</p> 
                    </Grid>

                    <Grid item xs={3} md={3}>
                        <div style={{border: '1px solid #d0d0d0', borderRadius: '5px'}}>
                            <Typography style={{padding: '1rem 0.5rem', color: '#989696'}}>{platform_name}</Typography>
                        </div>
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
                        <div style={{border: '1px solid #d0d0d0', borderRadius: '5px'}}>
                            <Typography style={{padding: '1rem 0.5rem', color: '#989696'}}>{date_value}</Typography>
                        </div>
                    </Grid>

                    <Grid item xs={3} md={3}>
                    </Grid> 

                    <Grid item xs={3} md={3}>
                        <Checkbox
                            label="Weld Monitoring"
                            name="other_detail.weld_monitoring"
                        />
                    </Grid>
    {/* =================================================== */}
                    <Grid item xs={3} md={3}>
                        <p>Platform Risk Ranking</p> 
                    </Grid>

                    <Grid item xs={3} md={3}>
                        <div style={{backgroundColor: red, height:"50px", borderRadius: '5px'}}>
                            <Typography style={{color: "white", fontWeight: 'bold', textAlign:"center", fontSize: "21px" ,padding:"0.5rem 1rem"}}>{risk_ranking}</Typography>
                        </div>
                    </Grid>

                    <Grid item xs={3} md={3}>
                    </Grid> 

                    <Grid item xs={3} md={3}>
                        <Checkbox
                            label="Marine Growth Cleaning"
                            name="other_detail.marine_growth_cleaning"
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
                            name="other_detail.debris_clearance"
                        />
                    </Grid>
    {/* =================================================== */}
                    <Grid item xs={3} md={3}>
                        <p>Level I</p> 
                    </Grid>

                    <Grid item xs={3} md={3}>
                    <TextField
                                name={['level_1_selected_inspection_interval_for_next_inspection']}
                                label="Inspection Interval"
                                disabled
                            />
                    </Grid>

                    <Grid item xs={3} md={3}>
                    <DatePicker
                                label="Inspection Date"
                                name={['level_1_next_inspection_date']}
                                disabled
                                required
                            />
                    </Grid>

                    <Grid item xs={3} md={3}>
                        <Checkbox
                            label="Anode Confirmation"
                            name="other_detail.manode_confirmation"
                        />
                    </Grid>
    {/* ================================================ */}
                    <Grid item xs={3} md={3}>
                        <p>Level II</p> 
                    </Grid>

                    <Grid item xs={3} md={3}>
                    <TextField
                                name={['level_2_selected_inspection_interval_for_next_inspection']}
                                label="Inspection Interval"
                                disabled
                            />
                    </Grid>

                    <Grid item xs={3} md={3}>
                    <DatePicker
                                label="Inspection Date"
                                name={['level_2_next_inspection_date']}
                                disabled
                                required
                            />
                    </Grid>

                    <Grid item xs={3} md={3}>
                        <Checkbox
                            label="Scour Repair"
                            name="other_detail.scour_repair"
                        />
                    </Grid>
    {/* ===================================== */}
                    <Grid item xs={3} md={3}>
                        <p>Level III</p> 
                    </Grid>

                    <Grid item xs={3} md={3}>
                    <TextField
                                name={['level_3_selected_inspection_interval_for_next_inspection']}
                                label="Inspection Interval"
                                disabled
                            />
                    </Grid>

                    <Grid item xs={3} md={3}>
                    <DatePicker
                                label="Inspection Date"
                                name={['level_3_next_inspection_date']}
                                disabled
                                required
                            />
                    </Grid>

                    <Grid item xs={3} md={3}>
                        <Checkbox
                            label="Corrosion Survey"
                            name="other_detail.corrosion_survey"
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
                            name="other_detail.other"
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
                            name={['scope_of_survey','above_water_visual_method']}
                            label="Method"
                        />
                    </Grid>

                    <Grid item xs={3} md={3}>
                        <TextField
                            name={['scope_of_survey','above_water_visual_scope']}
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
                            name={['scope_of_survey','coating_method']}
                            label="Method"
                        />
                    </Grid>

                    <Grid item xs={3} md={3}>
                        <TextField
                            name={['scope_of_survey','coating_scope']}
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
                            name={['scope_of_survey','underwater_cp_method']}
                            label="Method"
                        />
                    </Grid>

                    <Grid item xs={3} md={3}>
                        <TextField
                            name={['scope_of_survey','underwater_cp_scope']}
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
                            name={['scope_of_survey','appurtenance_survey_method']}
                            label="Method"
                        />
                    </Grid>

                    <Grid item xs={3} md={3}>
                        <TextField
                            name={['scope_of_survey','appurtenance_survey_scope']}
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
                            name={['scope_of_survey','deck_elevation_method']}
                            label="Method"
                        />
                    </Grid>

                    <Grid item xs={3} md={3}>
                        <TextField
                            name={['scope_of_survey','deck_elevation_scope']}
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
                            name={['scope_of_survey','supplemental_method']}
                            label="Method"
                        />
                    </Grid>

                    <Grid item xs={3} md={3}>
                        <TextField
                            name={['scope_of_survey','supplemental_scope']}
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
                            name={['scope_of_survey','general_visual_method']}
                            label="Method"
                        />
                    </Grid>

                    <Grid item xs={3} md={3}>
                        <TextField
                            name={['scope_of_survey','general_visual_scope']}
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
                            name={['scope_of_survey','debris_method']}
                            label="Method"
                        />
                    </Grid>

                    <Grid item xs={3} md={3}>
                        <TextField
                            name={['scope_of_survey','debris_scope']}
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
                            name={['scope_of_survey','marine_growth_method']}
                            label="Method"
                        />
                    </Grid>

                    <Grid item xs={3} md={3}>
                        <TextField
                            name={['scope_of_survey','marine_growth_scope']}
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
                            name={['scope_of_survey','scour_depth_method']}
                            label="Method"
                        />
                    </Grid>

                    <Grid item xs={3} md={3}>
                        <TextField
                            name={['scope_of_survey','scour_depth_scope']}
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
                            name={['scope_of_survey','anodes_method']}
                            label="Method"
                        />
                    </Grid>

                    <Grid item xs={3} md={3}>
                        <TextField
                            name={['scope_of_survey','anodes_scope']}
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
                            name={['scope_of_survey','cathodic_method']}
                            label="Method"
                        />
                    </Grid>

                    <Grid item xs={3} md={3}>
                        <TextField
                            name={['scope_of_survey','cathodic_scope']}
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
                            name={['scope_of_survey','risers_method']}
                            label="Method"
                        />
                    </Grid>

                    <Grid item xs={3} md={3}>
                        <TextField
                            name={['scope_of_survey','risers_scope']}
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
                            name={['scope_of_survey','jtube_method']}
                            label="Method"
                        />
                    </Grid>

                    <Grid item xs={3} md={3}>
                        <TextField
                            name={['scope_of_survey','jtube_scope']}
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
                            name={['scope_of_survey','caissons_method']}
                            label="Method"
                        />
                    </Grid>

                    <Grid item xs={3} md={3}>
                        <TextField
                            name={['scope_of_survey','caissons_scope']}
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
                            name={['scope_of_survey','conductor_method']}
                            label="Method"
                        />
                    </Grid>

                    <Grid item xs={3} md={3}>
                        <TextField
                            name={['scope_of_survey','conductor_scope']}
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
                            name={['scope_of_survey','visual_method']}
                            label="Method"
                        />
                    </Grid>

                    <Grid item xs={3} md={3}>
                        <TextField
                            name={['scope_of_survey','visual_scope']}
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
                            name={['scope_of_survey','flooded_method']}
                            label="Method"
                        />
                    </Grid>

                    <Grid item xs={3} md={3}>
                        <TextField
                            name={['scope_of_survey','flooded_scope']}
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
                            name={['scope_of_survey','weld_method']}
                            label="Method"
                        />
                    </Grid>

                    <Grid item xs={3} md={3}>
                        <TextField
                            name={['scope_of_survey','weld_scope']}
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
                            name={['scope_of_survey','joint_ndt_method']}
                            label="Method"
                        />
                    </Grid>

                    <Grid item xs={3} md={3}>
                        <TextField
                            name={['scope_of_survey','joint_ndt_scope']}
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
                            name={['scope_of_survey','wallut_method']}
                            label="Method"
                        />
                    </Grid>

                    <Grid item xs={3} md={3}>
                        <TextField
                            name={['scope_of_survey','wallut_scope']}
                            label="Scope"
                        />
                    </Grid>

                    <Grid item xs={3} md={3}>
                    </Grid> 
    {/* ===================================== */}

                    {/* <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                        </Grid> 
                        <Grid item xs={12} md={6}>
                            <button style={ButtonDesign} type="submit"><b>SAVE</b></button>
                        </Grid>
                    </Grid> */}

                </Grid>
  
                </AccordionDetails>
            </Accordion>
        </Box>
    
    );
}
