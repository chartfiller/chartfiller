    var txtInputs = [
    "pg2_duration",
    "pg2_stretcher_purpose",
    "pg3_neuro_comments",
    "pg4_resp_comments",
    "pg4_cardiac_comments",
    "pg5_head_comments",
    "pg5_neck_comments",
    "pg5_chest_comments",
    "pg5_ap_appearance",
    "pg5_ap_palpation",
    "pg5_ap_bowel_sounds",
    "pg5_ap_findings",
    "pg5_pelvis_comments",
    "pg5_back_comments",
    "pg5_ex_comments",
    "pg5_ex_restraints",
    "pg5_ex_skin_findings"
    ];
    var txtAreas = [
    "pg2_chief_complaint",
    "pg2_hpi",
    "pg2_scene_description",
    "pg2_belongings",
    "pg8_at_ref",
    "pg8_lv_ref",
    "pg8_at_rec",
    "pg8_can_1",
    "pg8_can_2"
    ];
    var selBoxes = [
    "pg2_duration_units",
    "pg2_als_assessment",
    "pg2_to_truck",
    "pg2_position",
    "pg2_from_truck",
    "pg3_stroke_scale",
    "pg3_gcs_eye",
    "pg3_gcs_verbal",
    "pg3_gcs_verbal",
    "pg4_radial_l",
    "pg4_radial_r",
    "pg4_fem_l",
    "pg4_fem_r",
    "pg4_carotid_l",
    "pg4_carotid_r",
    "pg4_dors_l",
    "pg4_dors_r",
    "pg2_to_truck",
    "pg2_duration_units",
    "pg2_first_on_scene"
    ];

function save_options() {

    
    for (var i=0;i<txtInputs.length;i++) {
        localStorage[txtInputs[i]] = document.getElementById(txtInputs[i]).value;
    }
        
    for (var i=0;i<txtAreas.length;i++) {
        localStorage[txtAreas[i]] = document.getElementById(txtAreas[i]).value;
    }
    
    for (var i=0;i<selBoxes.length;i++) {
       // localStorage[selBoxes[i]] = selBoxes[i].children[selBoxes[i].selectedIndex].value;
            var j = document.getElementById(selBoxes[i]).selectedIndex;
            localStorage[selBoxes[i]] = document.getElementById(selBoxes[i]).options[j].value;
    }
    
    // Update status to let user know options were saved.
    var status = document.getElementById("status");
    status.innerHTML = "OPTIONS SAVED";
    setTimeout(function() {
        status.innerHTML = "";
    }, 2000);
}

// Restores select box state to saved value from localStorage.
function restore_options() {

    
    for (var i=0;i<txtInputs.length;i++) {
    	if (localStorage[txtInputs[i]]=="undefined")
    	{
    	}
    	else
    	{
        document.getElementById(txtInputs[i]).value = localStorage[txtInputs[i]];
        }
    }
    
    for (var i=0;i<txtAreas.length;i++) {
    if (localStorage[txtAreas[i]]=="undefined")
    	{
    	}
    	else
    	{
        document.getElementById(txtAreas[i]).value = localStorage[txtAreas[i]];
        }
    }
    
    for (var i=0;i<selBoxes.length;i++) {
    if (localStorage[selBoxes[i]]=="undefined")
    	{
    	}
    	else
    	{
        selBoxes[i].children[selBoxes[i].selectedIndex].value = localStorage[selBoxes[i]];
        }
    }
    
}
document.addEventListener('DOMContentLoaded', restore_options);
document.querySelector('#save').addEventListener('click', save_options);
