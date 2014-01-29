$(document).ready(function() {
    $('.headerTable').append('<button onclick="" style="background:red;color:white;" class="chartfiller">AutoComplete</button>');
debugger;
    $('.chartfiller').click(function() {
        $('.chartfiller').click(function() {
            chrome.extension.sendMessage({
                greeting: "pg3"
            }, function(response) {
                var neuro_comments = response.neuro_comments;
                var stroke_scale = response.stroke_scale;
                var gcs_eye = response.gcs_eye;
                var gcs_verbal = response.gcs_verbal;
                var gcs_motor = response.gcs_motor;

                $('input[name=head_findings]').val(neuro_comments);
                $('select[name=stroke_scale]').attr('value',stroke_scale);
                $('select[name=gcs_eye_1]').attr('value',gcs_eye);
                $('select[name=gcs_verbal_1]').attr('value',gcs_verbal);
                $('select[name=gcs_motor_1]').attr('value',gcs_motor);
            });
        });
    });
});