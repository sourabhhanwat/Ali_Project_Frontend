import axios from 'axios';
import React, { PropsWithChildren } from 'react';
import * as yup from 'yup';
import Subject from '../modules/Subject';

export const DecimalLikeSchema = yup
    .string();
    // .matches(/^[0-9.]*$/, 'Only character 0-9 and "."')
    // .typeError('Only character 0-9 and "."');

export const IntegerSchema = yup
    .number();
    // .integer('Only character 0-9')
    // .typeError('Only character 0-9');

export const DateSchema = yup
    .date()
    .typeError('Date should have pattern dd/MM/yyyy');

export const PlatformSchema = yup
    .object({
        id: yup.number(),
        robustness_score: IntegerSchema,
        condition_score: IntegerSchema,
        loading_score: IntegerSchema,
        total_score: IntegerSchema,
        rsr_override_score: IntegerSchema,
        platform_vintage_score: yup.number(),
        access_type: yup.mixed<'M' | 'V'>().oneOf(['M', 'V']),
        platform_legs_and_bracing_score: yup.number(),
        leg_pile_grouting: yup
            .object({
                id: yup.number(),
                pile_in_leg_installation: yup.bool(),
                leg_to_pile_annulus_grouted: yup.bool(),
            })
            .noUnknown(),
        leg_pile_grouting_score: yup.number(),
        shallow_gas: yup
            .object({
                id: yup.number(),
                shallow_gas_effect_detected: yup.bool(),
                shallow_gas_monitored: yup.bool(),
            })
            .noUnknown(),
        shallow_gas_score: yup.number(),
        last_inspection: yup
            .object({
                id: yup.number(),
                last_underwater_inspection_date: yup.date().nullable().transform((v, o) => o === '' ? null : v),
                rbui_inspection_interval: yup.number().nullable(true).transform((v, o) => o === '' ? null : v),
            })
            .noUnknown().nullable(),
        last_inspection_score: yup.number(),
        mechanical_damage: yup
            .object({
                number_of_damaged_members: IntegerSchema.nullable().transform((v, o) => o === '' ? null : v),
            })
            .noUnknown(),
        mechanical_damage_score: yup.number(),
        corrosion: yup
            .object({
                id: yup.number(),
                platform_design_life: yup.number().positive(),
                cp_design_life: yup.number().nullable().transform((v, o) => o === '' ? null : v),
                original_anode_installation_date: yup.date(),
                anode_retrofit_date: yup.date().nullable().transform((v, o) => o === '' ? null : v),
                anode_survey_inspection_date: yup.date().nullable().transform((v, o) => o === '' ? null : v),
                average_anode_depletion_from_survey: yup.number().nullable().transform((v, o) => o === '' ? null : v),
                average_anode_potential_from_survey: yup.number().nullable().transform((v, o) => o === '' ? null : v),
            })
            .noUnknown(),
        corrosion_score: yup.number(),
        marine_growths: yup.array(
            yup
                .object({
                    id:yup.number(),
                    marine_growth_depths_from_el: yup.string(),
                    marine_growth_depths_to_el: yup.string(),
                    marine_growth_inspected_thickness: yup.string(),
                    marine_growth_design_thickness: yup.string(),
                })
                .noUnknown()
        ),
        marine_growth_each_elevation: yup.array(yup.number()),
        marine_growths_score: yup.number(),
        scour: yup
            .object({
                id: IntegerSchema,
                design_scour_depth: DecimalLikeSchema,
                measured_scour_depth_during_inspection: DecimalLikeSchema.nullable().transform((v, o) => o === '' ? null : v),
            })
            .noUnknown(),
        scour_score: yup.number(),
        flooded_member: yup
            .object({
                number_of_flooded_members_in_last_inspection: IntegerSchema.nullable().transform((v, o) => o === '' ? null : v),
                flooded_members_last_inspection_date: yup.date().nullable().transform((v, o) => o === '' ? null : v),
                previous_flooded_members_inspection_date: yup.date().nullable().transform((v, o) => o === '' ? null : v),
                number_of_previous_inspection_flooded_members: IntegerSchema.nullable().transform((v, o) => o === '' ? null : v),
            })
            .noUnknown(),
        flooded_member_score: yup.number(),
        unprotected_appurtenances: yup
            .object({
                id: IntegerSchema,
                number_of_unprotected_gas_riser: IntegerSchema.nullable().transform((v, o) => o === '' ? null : v),
                number_of_unprotected_conductor: IntegerSchema.nullable().transform((v, o) => o === '' ? null : v),
            })
            .noUnknown(),
        unprotected_appurtenances_score: yup.number(),
        deck_load: yup
            .object({
                id: IntegerSchema,
                original_topsides_design_load_known: yup.bool(),
                increase_in_topsides_load: DecimalLikeSchema.nullable().transform((v, o) => o === '' ? null : v),
            })
            .noUnknown(),
        deck_load_score: yup.number(),
        deck_elevation_wave_in_deck: yup
            .object({
                cellar_deck_height: DecimalLikeSchema.nullable().transform((v, o) => o === '' ? null : v),
                maximum_wave_height_10_years: DecimalLikeSchema.nullable().transform((v, o) => o === '' ? null : v),
                storm_surge_10_years: DecimalLikeSchema.nullable().transform((v, o) => o === '' ? null : v),
                maximum_wave_height_100_years: DecimalLikeSchema.nullable().transform((v, o) => o === '' ? null : v),
                storm_surge_100_years: DecimalLikeSchema.nullable().transform((v, o) => o === '' ? null : v),
                maximum_wave_height_10000_years: DecimalLikeSchema.nullable().transform((v, o) => o === '' ? null : v),
                storm_surge_10000_years: DecimalLikeSchema.nullable().transform((v, o) => o === '' ? null : v),
                highest_astronomical_tide: DecimalLikeSchema.nullable().transform((v, o) => o === '' ? null : v),
                crest_height_factor: DecimalLikeSchema.nullable().transform((v, o) => o === '' ? null : v),
            })
            .noUnknown(),
        deck_elevation_wave_in_deck_score: yup.number(),
        additional_appurtenance: yup
            .object({
                id: IntegerSchema,
                number_of_design_risers: IntegerSchema,
                number_of_design_caissons: IntegerSchema,
                number_of_design_conductors: IntegerSchema,
                number_of_additional_risers: IntegerSchema,
                number_of_additional_caissons: IntegerSchema,
                number_of_additional_conductors: IntegerSchema,
            })
            .noUnknown(),
        additional_appurtenance_score: yup.number(),
        fatigue_load: yup
            .object({
                id: IntegerSchema,
                water_depth: DecimalLikeSchema,
                platform_with_conductor_guide_frame: yup.bool(),
            })
            .noUnknown(),
        fatigue_load_score: yup.number(),
        reserve_strength_ratio_score: yup
            .object({
                id: IntegerSchema,
                reserve_strength_ratio: DecimalLikeSchema,
                rsr_override: yup.bool(),
            })
            .noUnknown(),
        
        platform_manned_status: yup
            .object({
                id: IntegerSchema.nullable().transform((v, o) => o === '' ? null : v),
                name: yup.string().trim().nullable().transform((v, o) => o === '' ? null : v),
            })
            .noUnknown().nullable(),
        platform_manned_status_id: yup.ref('platform_manned_status.id'),


        
        environmental_consequence: yup
            .object({
                id: yup.number().nullable().transform((v, o) => o === '' ? null : v),
                platform_type: yup
                    .object({
                        id: IntegerSchema,
                        name: yup.string().trim(),
                    })
                    .noUnknown().nullable(),
                platform_type_id: yup.ref('platform_type.id'),
                daily_oil_production: IntegerSchema,
                estimated_fraction_of_oil_production_loss_due_to_leakage: yup.string(),
                fixed_cost_for_spill_cleanup: yup.string(),
                variable_cost_for_spill_cleanup: yup.string(),
                oil_price: yup.string(),
            })
            .noUnknown(),
        
        economic_impact_consequence: yup
            .object({
                id: IntegerSchema,
                daily_gas_production: DecimalLikeSchema,
                gas_price: yup.string(),
                discount_date_for_interrupted_production: yup.string(),
                fraction_of_remaining_production_loss: yup.string(),
                platform_replacement_cost: yup.string(),
                platform_replacement_time: IntegerSchema,
            })
            .noUnknown(),

        bracing_type: yup
        .object({
            id: IntegerSchema.nullable().transform((v, o) => o === '' ? null : v),
            name: yup.string().trim().nullable().transform((v, o) => o === '' ? null : v),
        })
        .noUnknown().nullable(),
        bracing_type_id: yup.ref('bracing_type.id'),

        number_of_legs_type: yup
            .object({
                id: IntegerSchema,
                name: yup.string(),
            })
            .noUnknown().nullable(),
        
        other_detail: yup
        .object({
            weld_monitoring: yup.bool(),
            marine_growth_cleaning: yup.bool(),
            debris_clearance: yup.bool(),
            manode_confirmation: yup.bool(),
            scour_repair: yup.bool(),
            corrosion_survey: yup.bool(),
            other: yup.bool(),

        }).unknown(),
        
        scope_of_survey: yup
        .object({
            above_water_visual_method: yup.string().nullable().transform((v, o) => o === '' ? null : v),
            above_water_visual_scope: yup.string().nullable().transform((v, o) => o === '' ? null : v),
            coating_method:yup.string().nullable().transform((v, o) => o === '' ? null : v),
            coating_scope:yup.string().nullable().transform((v, o) => o === '' ? null : v),
            underwater_cp_method:yup.string().nullable().transform((v, o) => o === '' ? null : v),
            underwater_cp_scope:yup.string().nullable().transform((v, o) => o === '' ? null : v),
            appurtenance_survey_method:yup.string().nullable().transform((v, o) => o === '' ? null : v),
            appurtenance_survey_scope:yup.string().nullable().transform((v, o) => o === '' ? null : v),
            deck_elevation_method:yup.string().nullable().transform((v, o) => o === '' ? null : v),
            deck_elevation_scope:yup.string().nullable().transform((v, o) => o === '' ? null : v),
            supplemental_method:yup.string().nullable().transform((v, o) => o === '' ? null : v),
            supplemental_scope:yup.string().nullable().transform((v, o) => o === '' ? null : v),
            general_visual_method:yup.string().nullable().transform((v, o) => o === '' ? null : v),
            general_visual_scope:yup.string().nullable().transform((v, o) => o === '' ? null : v),
            debris_method:yup.string().nullable().transform((v, o) => o === '' ? null : v),
            debris_scope:yup.string().nullable().transform((v, o) => o === '' ? null : v),
            marine_growth_method:yup.string().nullable().transform((v, o) => o === '' ? null : v),
            marine_growth_scope:yup.string().nullable().transform((v, o) => o === '' ? null : v),
            scour_depth_method:yup.string().nullable().transform((v, o) => o === '' ? null : v),
            scour_depth_scope:yup.string().nullable().transform((v, o) => o === '' ? null : v),
            anodes_method:yup.string().nullable().transform((v, o) => o === '' ? null : v),
            anodes_scope:yup.string().nullable().transform((v, o) => o === '' ? null : v),
            cathodic_method:yup.string().nullable().transform((v, o) => o === '' ? null : v),
            cathodic_scope:yup.string().nullable().transform((v, o) => o === '' ? null : v),
            risers_method:yup.string().nullable().transform((v, o) => o === '' ? null : v),
            risers_scope:yup.string().nullable().transform((v, o) => o === '' ? null : v),
            jtube_method:yup.string().nullable().transform((v, o) => o === '' ? null : v),
            jtube_scope:yup.string().nullable().transform((v, o) => o === '' ? null : v),
            caissons_method:yup.string().nullable().transform((v, o) => o === '' ? null : v),
            caissons_scope:yup.string().nullable().transform((v, o) => o === '' ? null : v),
            conductor_method:yup.string().nullable().transform((v, o) => o === '' ? null : v),
            conductor_scope:yup.string().nullable().transform((v, o) => o === '' ? null : v),
            visual_method:yup.string().nullable().transform((v, o) => o === '' ? null : v),
            visual_scope:yup.string().nullable().transform((v, o) => o === '' ? null : v),
            flooded_method:yup.string().nullable().transform((v, o) => o === '' ? null : v),
            flooded_scope:yup.string().nullable().transform((v, o) => o === '' ? null : v),
            weld_method:yup.string().nullable().transform((v, o) => o === '' ? null : v),
            weld_scope:yup.string().nullable().transform((v, o) => o === '' ? null : v),
            joint_ndt_method:yup.string().nullable().transform((v, o) => o === '' ? null : v),
            joint_ndt_scope:yup.string().nullable().transform((v, o) => o === '' ? null : v),
            wallut_method:yup.string().nullable().transform((v, o) => o === '' ? null : v),
            wallut_scope:yup.string().nullable().transform((v, o) => o === '' ? null : v),
        })
        .noUnknown(),

        number_of_legs_type_id: yup.ref('number_of_legs_type.id'),
        updated_at: yup.date(),
        created_at: yup.date(),
        name: yup.string().trim(),
        description: yup.string().trim(),
        field_name: yup.string().trim(),
        manned: yup.bool(),
        distance_to_shore: DecimalLikeSchema,
        distance_to_shipping_lane: DecimalLikeSchema,
        api_seismic_zone: yup.string().trim(),
        number_of_bays: IntegerSchema,
        // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        risk_based_underwater_inspection_interval:IntegerSchema.nullable().transform((v, o) => o === '' ? null : v),
        lof_ranking: IntegerSchema,
        exposure_category_level:yup.string().nullable().transform((v, o) => o === '' ? null : v),
        exposure_category_level_1:yup.string().nullable().transform((v, o) => o === '' ? null : v),
        exposure_category_level_2:yup.string().nullable().transform((v, o) => o === '' ? null : v),
        exposure_category_level_3:yup.string().nullable().transform((v, o) => o === '' ? null : v),
        level_1_inspection_date:yup.date(),
        level_2_inspection_date:yup.date(),
        level_3_inspection_date:yup.date(),
        structure_replacement_decision: yup.string(),
        calculate_economic_impact_remaining_life_services:yup.string(),
        calculated_economic_impact_consequence:yup.string(),
        final_consequence_category:yup.string().nullable().transform((v, o) => o === '' ? null : v),
        economic_consequence_category:yup.string().matches(/^[A-E]1*$/, 'Only character A-E').typeError('Only character A-E'),
        risk_ranking:yup.string().nullable().transform((v, o) => o === '' ? null : v),
        environmental_consequence_category:yup.string().matches(/^[A-E]1*$/, 'Only character A-E').typeError('Only character A-E'),
        environmental_consequence_description: yup.string().nullable().transform((v, o) => o === '' ? null : v),
        economic_consequence_description: yup.string().nullable().transform((v, o) => o === '' ? null : v),
        level_1_selected_inspection_interval_for_next_inspection: IntegerSchema,
        level_2_selected_inspection_interval_for_next_inspection: IntegerSchema,
        level_3_selected_inspection_interval_for_next_inspection: IntegerSchema,
        level_1_last_inspection_date:yup.string().nullable().matches(/^\d{4}[\-](0?[1-9]|1[012])[\-](0?[1-9]|[12][0-9]|3[01])$/, 'Only allow YYYY-MM-DD Date Format').typeError('Only allow YYYY-MM-DD Date Format'),
        level_2_last_inspection_date:yup.string().nullable().matches(/^\d{4}[\-](0?[1-9]|1[012])[\-](0?[1-9]|[12][0-9]|3[01])$/, 'Only allow YYYY-MM-DD Date Format').typeError('Only allow YYYY-MM-DD Date Format'),
        level_3_last_inspection_date:yup.string().nullable().matches(/^\d{4}[\-](0?[1-9]|1[012])[\-](0?[1-9]|[12][0-9]|3[01])$/, 'Only allow YYYY-MM-DD Date Format').typeError('Only allow YYYY-MM-DD Date Format'),
        level_1_next_inspection_date:yup.string().nullable().matches(/^\d{4}[\-](0?[1-9]|1[012])[\-](0?[1-9]|[12][0-9]|3[01])$/, 'Only allow YYYY-MM-DD Date Format').typeError('Only allow YYYY-MM-DD Date Format'),
        level_2_next_inspection_date:yup.string().nullable().matches(/^\d{4}[\-](0?[1-9]|1[012])[\-](0?[1-9]|[12][0-9]|3[01])$/, 'Only allow YYYY-MM-DD Date Format').typeError('Only allow YYYY-MM-DD Date Format'),
        level_3_next_inspection_date:yup.string().nullable().matches(/^\d{4}[\-](0?[1-9]|1[012])[\-](0?[1-9]|[12][0-9]|3[01])$/, 'Only allow YYYY-MM-DD Date Format').typeError('Only allow YYYY-MM-DD Date Format'),
        // (0?[1-9]|[12][0-9]|3[01])[\-](0?[1-9]|1[012])[\-]\d
        next_10_years_inspection_plan: yup.array()
        .of(
          yup.object({
            year: IntegerSchema,
            level: yup.string(),
          })
        ),
        number_of_main_piles: IntegerSchema,
        number_of_skirt_piles: IntegerSchema,
        number_of_decks: IntegerSchema,
        deck_weight: DecimalLikeSchema,
        pile_penetration_depth: DecimalLikeSchema,
        jacket_repaired: yup.bool(),
        deck_extension: yup.bool(),
        crane: yup.bool(),
        helideck: yup.bool(),
        boatlanding: yup.bool(),
        anode_grade: IntegerSchema,
        design_date: yup.date().nullable().transform((v, o) => o === '' ? null : v),
        platform_installation_date: yup.date(),
        rbui_assessment_date: yup.date(),
        selected_inspection_interval_for_next_inspection: IntegerSchema,
        calculated_environmental_consequence: IntegerSchema.nullable().transform((v, o) => o === '' ? null : v),
        project: IntegerSchema
    })
    .noUnknown();
    

export const PlatformListSchema = yup.array(PlatformSchema);

declare global {
    export type Platform = yup.InferType<typeof PlatformSchema>;
}

export type ListParam = {
    filter?: {
        project?: number;
    };
};

class PlatformListSubject extends Subject<Platform[] | null> {
    list = this.createAsync(async (param: ListParam = {}) => {
        const { data } = await axios.get<Platform[]>('/api/v1/platforms/', {
            params: param.filter,
            transformResponse(data) {
                return PlatformListSchema.validateSync(data);
            },
        });
        return data;
    });
}

export function usePlatformList(): { subject: PlatformListSubject } {
    const ref = React.useRef<PlatformListSubject>();

    if (!ref.current) {
        ref.current = new PlatformListSubject(null);
    }

    return { subject: ref.current };
}

const PlatformListContext = React.createContext<PlatformListSubject>(
    null as any
);

export function usePlatformListContext(): PlatformListSubject {
    return React.useContext(PlatformListContext);
}

export default function PlatformListProvider({
    children,
    subject,
}: PropsWithChildren<{ subject: PlatformListSubject }>) {
    return (
        <PlatformListContext.Provider value={subject}>
            {children}
        </PlatformListContext.Provider>
    );
}