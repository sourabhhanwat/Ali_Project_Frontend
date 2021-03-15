import React from "react";
import {
  Page,
  Text,
  Document,
  StyleSheet} from "@react-pdf/renderer";
import { DataTableCell } from "@david.kucsai/react-pdf-table/lib/DataTableCell";
import { TableHeader } from "@david.kucsai/react-pdf-table/lib/TableHeader";
import { Table, TableBody, TableCell } from "@david.kucsai/react-pdf-table";


const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    // fontFamily: 'Oswald'
  },
  author: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 18,
    margin: 12,
    // fontFamily: 'Oswald'
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: 'justify',
    fontFamily: 'Times-Roman'
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: 'center',
    color: 'grey',
  },

  table : {
    height: 20,
  },

  pageNumber: {
    position: 'absolute',
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'grey',
  },
});

export function PdfDocument(props : any) {
  console.log("pdf generation props", props.data);

  return (
    <Document>
      <Page style={styles.body}>
       {props.data
          ? 
          <> 
            <Text style={styles.header} fixed>
                       ~Created with react-pdf ~
            </Text><Text style={styles.title}>Project Title</Text>
            <Text style={styles.author}>RBI Assessment Summary Report for 
                <Text style={styles.author}>{props.data.name}</Text>
            </Text>
            {/* <Text style={styles.text}>Project Name:  {props.data}</Text> */}
            <Text style={styles.text}>platform Name:  {props.data.name}</Text>
            <Text style={styles.text}>Description: {props.data.description}</Text>
            <Text style={styles.text}>Platform Type: </Text>
            <Text style={styles.text}>Field Name:  {props.data.field_name}</Text>
            <Text style={styles.text}>Installation Date: {props.data.platform_installation_date}</Text>
            
            <Text style={styles.text}>Number of Legs: {props.data.number_of_legs_type ? props.data.number_of_legs_type.name : '-'}</Text>
            <Text style={styles.text}>Design Life:  {props.data.corrosion ? props.data.corrosion.platform_design_life : '-'}</Text>
            <Text style={styles.text}>Last underwater Inspection: {props.data.last_inspection ? props.data.last_inspection.last_underwater_inspection_date : '-'}</Text>

            <Text style={styles.text}>RBI Assessment date: {props.data.rbui_assessment_date}</Text>
            <Text style={styles.text}>RSR: {props.data.reserve_strength_ratio_score ? props.data.reserve_strength_ratio_score.reserve_strength_ratio : '-' }</Text>
            <Text style={styles.text}>RSR Override Applicable: {props.data.reserve_strength_ratio_score ? props.data.reserve_strength_ratio_score.rsr_override : '-' }</Text>
            
            <Text style={styles.subtitle}>Likelihood of Failure</Text>
            
            <Text style={styles.text}>Robustness Score {props.data.robustness_score}</Text>
            <Text style={styles.text}>Platform Vintage: {props.data.platform_vintage_score}</Text>
            <Text style={styles.text}>Brace/Legs : {props.data.platform_legs_and_bracing_score}</Text>
            <Text style={styles.text}>Grouted Pile: {props.data.leg_pile_grouting_score}</Text>
            <Text style={styles.text}>Shallow Gas: {props.data.shallow_gas_score}</Text>
            
            <Text style={styles.text}>Condition Score: {props.data.condition_score}</Text>
            <Text style={styles.text}>Last Inspection: {props.data.last_inspection_score}</Text>
            <Text style={styles.text}>Mechanical Damage: {props.data.mechanical_damage_score}</Text>
            <Text style={styles.text}>Corrosion: {props.data.corrosion_score}</Text>
            <Text style={styles.text}>Marine Growth: {props.data.marine_growths_score}</Text>
            <Text style={styles.text}>Scour: {props.data.scour_score}</Text>
            <Text style={styles.text}>Flooded Member: {props.data.flooded_member_score}</Text>
            <Text style={styles.text}>Unprotected Appurtenances: {props.data.unprotected_appurtenances_score}</Text>
            
            <Text style={styles.text}>Loading Score: {props.data.loading_score}</Text>
            <Text style={styles.text}>Deck Load: {props.data.deck_load_score}</Text>
            <Text style={styles.text}>Deck Elevation - Wave in Deck: {props.data.deck_elevation_wave_in_deck_score}</Text>
            <Text style={styles.text}>Additional Appurtenances: {props.data.additional_appurtenance_score}</Text>
            <Text style={styles.text}>Fatigue Load: {props.data.fatigue_load_score}</Text>
            
            <Text style={styles.text}>RSR Override Score: {props.data.rsr_override_score}</Text>
            <Text style={styles.text}>Total Score: {props.data.total_score}</Text>
            <Text style={styles.text}>Likelihood of Failure Category: {props.data.lof_ranking}</Text>
            
            <Text style={styles.subtitle}>Consequence of Failure</Text>
            <Text style={styles.subtitle}>Life Safety Consequence: {props.data.platform_manned_status? props.data.platform_manned_status.ranking : ''}</Text>
            <Text style={styles.text}>Economic Consequence : {props.data.economic_consequence_category}</Text>
            <Text style={styles.text}>Environmental Consequence : {props.data.environmental_consequence_category}</Text>
            <Text style={styles.text}>Final Consequence Category : {props.data.final_consequence_category}</Text>

            {/* Inspection History */}
            <Text style={styles.subtitle}>Inspection History</Text>
            <Text style={styles.subtitle}>Type of Survey Level                Date of Last Inspection</Text>
            <Text style={styles.text}>Level I : {props.data.level_1_next_inspection_date}</Text>
            <Text style={styles.text}>Level II : {props.data.level_2_next_inspection_date}</Text>
            <Text style={styles.text}>Level III : {props.data.level_3_next_inspection_date}</Text>

            {/* API RP 2SIM Life Safety Category  */}
            <Text style={styles.subtitle}>API RP 2SIM Life Safety Category and Survey Level Recommended Inspection Interval in Years</Text>
            <Text style={styles.text}>Exposure Category as per API RP2SIM : {props.data.exposure_category_level}</Text>
            <Text style={styles.subtitle}>Type of Survey Level        Inspection Interval (Years)</Text>
            <Text style={styles.text}>Level I : {props.data.exposure_category_level_1}</Text>
            <Text style={styles.text}>Level II : {props.data.exposure_category_level_2}</Text>
            <Text style={styles.text}>Level III : {props.data.exposure_category_level_3}</Text>

            {/* Selected Next Inspection Interval and Inspection Date */}
            {/* <Text style={styles.subtitle}>Selected Next Inspection Interval and Inspection Date</Text>
            <Text style={styles.subtitle}>Type of Survey Level Next Selected Inspection    Interval (Years) Next         Inspection Date</Text>
            <Text style={styles.text}>Level I : {props.data.next_10_years_inspection_plan}</Text>
            <Text style={styles.text}>Level II : {props.data.next_10_years_inspection_plan}</Text>
            <Text style={styles.text}>Level III : {props.data.next_10_years_inspection_plan}</Text> */}

            {/* Survey Details */}
            {/* <Text style={styles.subtitle}>Survey Details</Text> */}
            <Text style={styles.text}>Above-water Visual : {props.data.scope_of_survey ? props.data.scope_of_survey.above_water_visual_method : '-'} {props.data.scope_of_survey ? props.data.scope_of_survey.above_water_visual_scope : '-'}</Text>
            <Text style={styles.text}>Coating Survey : {props.data.scope_of_survey ? props.data.scope_of_survey.coating_method : '-'} {props.data.scope_of_survey ? props.data.scope_of_survey.anodes_scope : '-'} </Text>
            <Text style={styles.text}>Underwater CP Survey : {props.data.scope_of_survey ? props.data.scope_of_survey.underwater_cp_method : '-'} {props.data.scope_of_survey ? props.data.scope_of_survey.underwater_cp_scope : '-'}</Text>
            <Text style={styles.text}>Appurtenance and Personnel Safety Devices Surveys : {props.data.scope_of_survey ? props.data.scope_of_survey.appurtenance_survey_method : '-'} {props.data.scope_of_survey ? props.data.scope_of_survey.appurtenance_survey_scope : '-'}</Text>
            <Text style={styles.text}>Deck Elevation Survey : {props.data.scope_of_survey ? props.data.scope_of_survey.deck_elevation_method : '-'} {props.data.scope_of_survey ? props.data.scope_of_survey.deck_elevation_scope : '-'}</Text>
            <Text style={styles.text}>Supplemental Surveys (NDT, material sampling, wall thickness measurements, etc) : {props.data.scope_of_survey ? props.data.scope_of_survey.supplemental_method : '-'} {props.data.scope_of_survey ? props.data.scope_of_survey.supplemental_scope : '-'}</Text>

            
            {/* API Level II Survey -Underwater Inspection */}
            <Text style={styles.text}>General Visual (Dents, Cracks, Abrasions, Bows, Severed, Holes, Gouges, Missing, Other) : {props.data.scope_of_survey ? props.data.scope_of_survey.general_visual_method : '-'} {props.data.scope_of_survey ? props.data.scope_of_survey.general_visual_scope : '-'}</Text>
            <Text style={styles.text}>Debris : {props.data.scope_of_survey ? props.data.scope_of_survey.debris_method : '-'} {props.data.scope_of_survey ? props.data.scope_of_survey.debris_scope : '-'}</Text>
            <Text style={styles.text}>Marine growth Thickness : {props.data.scope_of_survey ? props.data.scope_of_survey.marine_growth_method : '-'} {props.data.scope_of_survey ? props.data.scope_of_survey.marine_growth_scope : '-'}</Text>
            <Text style={styles.text}>Scour Depth : {props.data.scope_of_survey ? props.data.scope_of_survey.scour_depth_method : '-'} {props.data.scope_of_survey ? props.data.scope_of_survey.scour_depth_scope : '-'}</Text>
            <Text style={styles.text}>Anodes : {props.data.scope_of_survey ? props.data.scope_of_survey.anodes_method : '-'} {props.data.scope_of_survey ? props.data.scope_of_survey.anodes_scope : '-'}</Text>
            <Text style={styles.text}>Cathodic potential : {props.data.scope_of_survey ? props.data.scope_of_survey.cathodic_method : '-'} {props.data.scope_of_survey ? props.data.scope_of_survey.cathodic_scope : '-'}</Text>
            <Text style={styles.text}>Risers : {props.data.scope_of_survey ? props.data.scope_of_survey.risers_method : '-'} {props.data.scope_of_survey ? props.data.scope_of_survey.risers_scope : '-'}</Text>
            <Text style={styles.text}>J-Tube : {props.data.scope_of_survey ? props.data.scope_of_survey.jtube_method : '-'} {props.data.scope_of_survey ? props.data.scope_of_survey.jtube_scope : '-'}</Text>
            <Text style={styles.text}>Caissons : {props.data.scope_of_survey ? props.data.scope_of_survey.caissons_method : '-'} {props.data.scope_of_survey ? props.data.scope_of_survey.caissons_scope : '-'}</Text>
            <Text style={styles.text}>Conductor : {props.data.scope_of_survey ? props.data.scope_of_survey.conductor_method : '-'} {props.data.scope_of_survey ? props.data.scope_of_survey.conductor_scope : '-'}</Text>

            {/* pending */}
            <Text style={styles.text}>Visual Corrosion Survey : {props.data.scope_of_survey ? props.data.scope_of_survey.visual_method : '-'} {props.data.scope_of_survey ? props.data.scope_of_survey.visual_scope : '-'}</Text>
            <Text style={styles.text}>Flooded member detection or member close visual inspection : {props.data.scope_of_survey ? props.data.scope_of_survey.flooded_method : '-'} {props.data.scope_of_survey ? props.data.scope_of_survey.flooded_scope : '-'}</Text>
            <Text style={styles.text}>Weld/joint close visual inspection : {props.data.scope_of_survey ? props.data.scope_of_survey.weld_method : '-'} {props.data.scope_of_survey ? props.data.scope_of_survey.weld_scope : '-'}</Text>

            {/* API Level IV Survey -Underwater Inspection */}
            
            
            <Text style={styles.text}>Weld/joint NDT : {props.data.scope_of_survey ? props.data.scope_of_survey.joint_ndt_method : '-'} {props.data.scope_of_survey ? props.data.scope_of_survey.joint_ndt_scope : '-'}</Text>
            <Text style={styles.text}>Wall UT : {props.data.scope_of_survey ? props.data.scope_of_survey.wallut_method : '-'} {props.data.scope_of_survey ? props.data.scope_of_survey.joint_ndt_scope : '-'}</Text>

            {/* <Table
                data={[
                    {firstName: "John", lastName: "Smith", dob: new Date(2000, 1, 1), country: "Australia", phoneNumber: "xxx-0000-0000"}
                ]}
            >
                <TableHeader textAlign={"center"}>
                    <TableCell weighting={0.3}>
                    </TableCell>
                    <TableCell weighting={0.3}>
                    </TableCell>
                    <TableCell>
                    </TableCell>
                    <TableCell>
                    </TableCell>
                    <TableCell>
                    </TableCell>
                </TableHeader>
                <TableBody>
                    <DataTableCell style={{border: '1px solid black', height: '12%', width: '1rem'}}weighting={0.3} getContent={(r) => ''}/>
                    <DataTableCell weighting={0.3} getContent={(r) => ''}/>
                    <DataTableCell weighting={0.3} getContent={(r) => ''}/>
                    <DataTableCell weighting={0.3} getContent={(r) => ''}/>
                    <DataTableCell weighting={0.3} getContent={(r) => ''}/>
                </TableBody>
            </Table> */}
            
           </>
                     
          : ""}
      </Page>
    </Document>
  );
}