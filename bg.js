chrome.extension.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.greeting == "pg2") 
            sendResponse({
                chief_complaint : localStorage["pg2_chief_complaint"],
                cc_duration : localStorage["pg2_duration"],
                als_assessment : localStorage["pg2_als_assessment"],
                cc_duration_units : localStorage["pg2_duration_units"],
                hpi : localStorage["pg2_hpi"],
                scene_description : localStorage["pg2_scene_description"],
                patient_belongings : localStorage["pg2_belongings"],
                to_truck : localStorage["pg2_to_truck"],
                from_truck : localStorage["pg2_from_truck"],
                position : localStorage["pg2_position"]
            });
        else if(request.greeting == "pg3")
            sendResponse({
                neuro_comments : localStorage["pg3_neuro_comments"],
                stroke_scale : localStorage["pg3_stroke_scale"],
                gcs_eye : localStorage["pg3_gcs_eye"],
                gcs_verbal : localStorage["pg3_gcs_verbal"],
                gcs_motor : localStorage["pg3_gcs_motor"]
            });
        else if (request.greeting == "pg4")
            sendResponse({
                resp_comments : localStorage["pg4_resp_comments"],
                cardiac_comments : localStorage["pg4_cardiac_comments"],
                carotid_r : localStorage["pg4_carotid_r"],
                carotid_l : localStorage["pg4_carotid_r"],
                radial_r : localStorage["pg4_radial_r"],
                radial_l : localStorage["pg4_radial_l"],
                fem_r : localStorage["pg4_fem_r"],
                fem_l : localStorage["pg4_fem_l"],
                dors_r : localStorage["pg4_dors_r"],
                dors_l : localStorage["pg4_dors_l"]
            });
        else if (request.greeting == "pg5")
            sendResponse({
                head_comments : localStorage["pg5_head_comments"],
                neck_comments : localStorage["pg5_neck_comments"],
                chest_comments : localStorage["pg5_chest_comments"],
                ap_appearance : localStorage["pg5_ap_appearance"],
                ap_palpation : localStorage["pg5_ap_palpation"],
                ap_bowel_sounds : localStorage["pg5_ap_bowel_sounds"],
                ap_findings : localStorage["pg5_ap_findings"],
                trachea : 'M',
                pelvis_comments : localStorage["pg5_pelvis_comments"],
                back_comments : localStorage["pg5_back_comments"],
                extremity_findings : localStorage["pg5_ex_comments"],
                restraints : localStorage["pg5_ex_restraints"],
                skin_findings : localStorage["pg5_ex_skin_findings"]
            });
        else if (request.greeting == "pg8")
            sendResponse({
                at_ref_comment : localStorage["pg8_at_ref"],
                lv_ref_comment : localStorage["pg8_lv_ref"],
                at_rec_comment : localStorage["pg8_at_rec"],
                can_1 : localStorage["pg8_can_1"],
                can_2 : localStorage["pg8_can_2"]
            });
            
    });