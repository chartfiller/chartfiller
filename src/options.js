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

function _all_opts() {
    var opts = {};
    for (var i=0; i<txtInputs.length; i++) {
	opts[ txtInputs[i] ] = "text";
    }
    for (var i=0; i<txtAreas.length; i++) {
	opts[ txtAreas[i] ] = "textarea";
    }
    for (var i=0; i<selBoxes.length; i++) {
	opts[ selBoxes[i] ] = "select";
    }
    return opts;
}

function get_user_values() {
    var vals = {};
    var opts = _all_opts();
    var keys = Object.keys(opts);
    
    for (var i=0; i < keys.length; i++) {
	var field_id = keys[i];
	var field_type = opts[field_id];
	if (typeof(field_id) == "undefined" || field_id == "undefined") continue;
	console.debug("Getting user value for: " + field_id + "(" + field_type + ")")

	var el = document.getElementById(field_id);

	if (field_type == "text" || field_type == "textarea") {
	    vals[field_id] = el.value;
	} else if (field_type == "select") {
	    var ch = el.children[el.selectedIndex];
	    if (typeof(ch) != "undefined") {
		vals[field_id] = ch.value;
	    }
	} else {
	    console.warn("Not sure what to do with field " + field_type + ":" + field_id)
	}

    }
    return vals;
}

function save_options() {
    var values = get_user_values();
    var keys = Object.keys(values);
    console.info("Saving Values:");
    console.info(values);
    
    chrome.storage.sync.set(values, function() {
	var status = document.getElementById("status");
	status.innerHTML = "OPTIONS SAVED";
	setTimeout(function() {
            status.innerHTML = "";
	}, 2000);
    });
}

// Restores select box state to saved value from localStorage.
function restore_options() {
    console.info("Restoring Options");
    var vals = {};
    var opts = _all_opts();
    var opt_keys = Object.keys(opts);

    chrome.storage.sync.get(opt_keys, function(items) {
	for (var i=0; i<opt_keys.length; i++) {
	    var field_id = opt_keys[i];
	    var field_type = opts[field_id];
	    var user_val = items[field_id];
	    
	    console.debug(field_id + ":" + field_type + " has value: " + user_val);
		
	    if (field_type == "text" || field_type == "textarea") {
		document.getElementById(field_id).value = user_val;
		    
	    } else if (field_type == "select") {
		var sbox = document.getElementById(field_id);
		sbox.children[ sbox.selectedIndex ].value = user_val;
		// This doesn't seem right
		// something like: sbox.selectedIndex = sbox.children.indexOf(user_val);
		
	    } else {
		console.warn("I don't know what to do with " + field_type + ":" + field_id);
	    }
	}
    });

    return vals;
}

document.addEventListener('DOMContentLoaded', restore_options);
document.querySelector('#save').addEventListener('click', save_options);
