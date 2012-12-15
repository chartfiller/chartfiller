
$(document).ready(function() {
    $('.headerTable').append('<button onclick="" style="background:red;color:white;" class="chartfiller">AutoComplete</button>');

    $('.chartfiller').click(function() {
        chrome.extension.sendMessage({
            greeting: "pg2"
        }, function(response) {
            var chief_complaint = response.chief_complaint;
            var cc_duration = response.cc_duration;
            var als_assessment = response.als_assessment;
            var cc_duration_units = response.cc_duration_units;
            var hpi = response.hpi;
            var scene_description = response.scene_description;
            var patient_belongings = response.patient_belongings;
            var to_truck = response.to_truck;
            var from_truck = response.from_truck;
            var position = response.position;
        
            $('textarea[name=PRMAIN_cc]').text(chief_complaint);
            $('input[name=PRMAIN_ccduration]').val(cc_duration);
            $('select[name=PRMAIN_als_assessment]').attr('value',als_assessment);
            $('select[name=PRMAIN_ccdurunits]').attr('value',cc_duration_units);
            $('textarea[name=PRMAIN_hpi]').text(hpi);
            $('textarea[name=PRMAIN_belongings]').text(patient_belongings);
            $('textarea[name=scene_description]').text(scene_description);

            $('select[name=pt_moved_via]').attr('value',to_truck);
            $('select[name=pt_position]').attr('value',position);
            $('select[name=pt_moved_from]').attr('value',from_truck);
        });
    });
});
