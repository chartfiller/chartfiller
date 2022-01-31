const _allowed = [
    'create.cfm', // specrep/create.cfm (testing)
    'page2.cfm',
    'page3.cfm',
    'page4.cfm',
    'page5.cfm',
    'page8.cfm'
];


const selectorMap = {
    "pg2_als_assessment": "select[name=PRMAIN_als_assessment]",
    "pg2_belongings": "textarea[name=PRMAIN_belongings]",
    "pg2_chief_complaint": "textarea[name=PRMAIN_cc]",
    "pg2_duration": "input[name=PRMAIN_ccduration]",
    "pg2_duration_units": "select[name=PRMAIN_ccdurunits]",
    "pg2_first_on_scene": "select[name=PRMAIN_first_on_scene]",
    "pg2_from_truck": "select[name=pt_moved_from]",
    "pg2_hpi": "textarea[name=PRMAIN_hpi]",
    "pg2_position": "select[name=pt_position]",
    "pg2_scene_description": "textarea[name=scene_description]",
    "pg2_stretcher_purpose": "input[name=stretcher_purpose_descr]",
    "pg2_to_truck": "select[name=pt_moved_via]",
    
    "pg3_gcs_eye": "",
    "pg3_gcs_verbal": "",
    "pg3_neuro_comments": "",
    "pg3_stroke_scale": "",
    "pg4_cardiac_comments": "",
    "pg4_carotid_l": "",
    "pg4_carotid_r": "",
    "pg4_dors_l": "",
    "pg4_dors_r": "",
    "pg4_fem_l": "",
    "pg4_fem_r": "",
    "pg4_radial_l": "",
    "pg4_radial_r": "",
    "pg4_resp_comments": "",
    "pg5_ap_appearance": "",
    "pg5_ap_bowel_sounds": "",
    "pg5_ap_findings": "",
    "pg5_ap_palpation": "",
    "pg5_back_comments": "",
    "pg5_chest_comments": "",
    "pg5_ex_comments": "",
    "pg5_ex_restraints": "",
    "pg5_ex_skin_findings": "",
    "pg5_head_comments": "",
    "pg5_neck_comments": "",
    "pg5_pelvis_comments": "",
    "pg8_at_rec": "",
    "pg8_at_ref": "",
    "pg8_can_1": "",
    "pg8_can_2": "",
    "pg8_lv_ref": "",
};

/**
 * Called on page load
 */
$(document).ready(function() {
    const here = (window.location.pathname || '').split('/');
    //const name = (here.length === 3) ? here.pop() : '';
    const name = 'page2.cfm';
    let validPage = (_allowed.indexOf(name) > -1);

    if (!validPage) {
	console.debug('[chartfiller] nothing to do for ' + here);
	return;
    }

    // inject the 'AutoComplete' button
    $('.headerTable').append('<button onclick="" style="background:red;color:white;" class="chartfiller">AutoComplete</button>');    


    // Handler for when the button is pressed
    //
    // Page 8 buttons will need special treatment...
    $('.chartfiller').click(function() {
	console.log('chrome.extension.sendMessage('+name+')');

	chrome.extension.sendMessage({
	    pageName: name,
	}, function(response) {
	    const { data, error } = response;

	    if (error) {
		console.warn('sendMessage received an error: ', error);
		alert(error);
		return;
	    }
	    
	    Object.keys(data).forEach((key, i) => {
		// need to know input name and type because not every input has (had?) an "id" field.
		// originally, I was using selectors like $('input[name=WHATEVER]'), but $(`#${id}`)
		// should work ...if the IDs are present on all fields.

		// otherwise, this will require a map lookup (see 'exampleMap')
		if (selectorMap.hasOwnProperty(key)) {
		    const selector = selectorMap[key];
		    const value = data[key];
		    console.log("Setting '"+selector+"' to '"+value+"'");
		    
		    if (selector.startsWith('input') || selector.startsWith('select')) {
			$(selector).val( value );
		    }
		    else if (selector.startsWith('textarea')) {
			$(selector).text( value );
		    }
		}
	    });
	    console.log(data);
	});
    });
});
