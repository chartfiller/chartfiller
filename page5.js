$(document).ready(function() {
    $('.headerTable').append('<button onclick="" style="background:red;color:white;" class="chartfiller">AutoComplete</button>');

    $('.chartfiller').click(function() {
        chrome.extension.sendMessage({
            greeting: "pg5"
        }, function(response) {
            var head_comments = response.head_comments;
            var neck_comments = response.neck_comments;
            var chest_comments = response.chest_comments;
            var ap_appearance = response.ap_appearance;
            var ap_palpation = response.ap_palpation;
            var ap_bowel_sounds = response.ap_bowel_sounds;
            var ap_findings = response.ap_findings;
            var trachea = response.trachea;
            var pelvis_comments = response.pelvis_comments;
            var back_comments = response.back_comments;
            var extremity_findings = response.extremity_findings;
            var restraints = response.restraints;
            var skin_findings = response.skin_findings;

            if (ap_findings != '') {
                $('input[name=ap_findings]').val(ap_findings);
            }
            if (trachea != '') {
                $('select[name=trachea]').attr('value',trachea);
            }
            if (restraints != '') {
                $('input[name=ex_restraints]').val(restraints);
            }

            $('input[name=head_comments]').val(head_comments);
            $('input[name=neck_comments]').val(neck_comments);
            $('input[name=chest_comments]').val(chest_comments);
            $('input[name=ap_appearance]').val(ap_appearance);
            $('input[name=ap_palpation]').val(ap_palpation);
            $('input[name=ap_bowel_sounds]').val(ap_bowel_sounds);
            $('input[name=pelvis_comments]').val(pelvis_comments);
            $('input[name=back_comments]').val(back_comments);
            $('input[name=ex_comments]').val(extremity_findings);
            $('input[name=ex_restraints]').val(restraints);
            $('input[name=ex_skin_findings]').val(skin_findings);


            if (ap_findings != '') {
                $('input[name=ap_findings]').val(ap_findings);
            }
        });
    });
});