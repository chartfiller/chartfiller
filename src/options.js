/**
 * options.js
 *
 * This content script handles the settings page at /options.html
 *
 */
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

/**
 * Returns a dict/object of "input element ID" => "input type"
 * for the above items (txtInputs, txtAreas, selBoxes).
 *
 * This mapping is required to call the type-dependent
 * getter/setter functions.
 * 
 * @return object
 */
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

/**
 * Uses the input mapping (above) to extract user-defined values
 * from the inputs on the options page.
 *
 * @return object
 */
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
    console.debug(values);
    
    chrome.storage.sync.set(values, function() {
	var status = document.getElementById("status");
	status.innerHTML = "OPTIONS SAVED (chrome.storage.sync)";
	setTimeout(function() {
            status.innerHTML = "";
	}, 2000);
    });
}

/**
 * Restore Options is called when the page is loaded and 
 * populates the options screen with the values from storage.
 *
 * 2022-01-30: Treat the string "undefined" as ""
 */
function restore_options() {
    console.info("Restoring Options");
    var vals = {};
    var opts = _all_opts();
    var opt_keys = Object.keys(opts);

    console.debug("Getting options from chrome.storage.sync...");
    console.debug(opt_keys);
    console.log(opts);

    chrome.storage.sync.get(opt_keys, function(items) {
	console.log('Got items from storage.sync:', items);

	opt_keys.forEach((key, i) => {
	    const fieldType = opts[key];
	    const userValue = (items[key] === "undefined") ? "" : items[key];
	    
	    switch (fieldType) {
	    case 'text':
	    case 'textarea':
		vals[key] = userValue;
		
		document.getElementById(key).value = userValue;
		break;

	    case 'select':
		vals[key] = userValue;
		
		var sbox = document.getElementById(key);
		for (var j=0; j<sbox.children.length;j++) {
		    if (sbox.children[j].value == userValue) {
			sbox.selectedIndex = j;
			break;
		    }
		}
		break;

	    default:
		console.warn("Invalid field type: ", opts[key]);
	    }
	});
    });

    return vals; // not sure what this was supposed to return
}

/**
 * Script execution begins here 
 */
document.addEventListener('DOMContentLoaded', restore_options);
document.querySelector('#save').addEventListener('click', save_options);
