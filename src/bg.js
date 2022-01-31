/**
 * This is the Background Page, which runs in the background and waits for requests.
 * Individual content scripts request specific bits of information depending on the page.
 * 
 * Input lists and _get_opts are copied from options.js
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

// _all_opts works as a getter to prevent modifying a global object.
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
 * This listener responds to 'sendMessage' from the content script.
 */
chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
    const { pageName } = request;
    console.log("got message: ", pageName);

    var keys;
    
    switch (pageName) {
    case 'create.cfm':
	sendResponse({ error: false, data: {} });
	break;

    case 'page2.cfm':
	keys = Object.keys(_all_opts()).filter((k) => k.startsWith('pg2_'));
	chrome.storage.sync.get(keys, function(data) {
	    sendResponse({
		error: false,
		data: data,
	    });
	});
	return true;

    case 'page3.cfm':
	keys = Object.keys(_all_opts()).filter((k) => k.startsWith('pg2_'));
	chrome.storage.sync.get(keys, function(data) {
	    sendResponse({
		error: false,
		data: data,
	    });
	});
	return true;

    case 'page4.cfm':
	keys = Object.keys(_all_opts()).filter((k) => k.startsWith('pg4_'));
	chrome.storage.sync.get(keys, function(data) {
	    sendResponse({
		error: false,
		data: data,
	    });
	});
	return true;
	
    case 'page5.cfm':
	keys = Object.keys(_all_opts()).filter((k) => k.startsWith('pg5_'));
	chrome.storage.sync.get(keys, function(data) {
	    sendResponse({
		error: false,
		data: data,
	    });
	});
	return true;
    case 'page8.cfm':
	keys = Object.keys(_all_opts()).filter((k) => k.startsWith('pg8_'));
	chrome.storage.sync.get(keys, function(data) {
	    sendResponse({
		error: false,
		data: data,
	    });
	});
	return true;
	
    default:
	sendResponse({ error: 'Unknown or invalid page', data: {} });
	return true;
    }
});
