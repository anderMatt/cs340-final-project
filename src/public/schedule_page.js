$(document).ready(function() {

    initScheduleForm();

    function initScheduleForm() {
        window.olympicsApi.getAllAthletes()
            .done(function(athletes) {
                var dropdown = $('select[name="aid"]');
                $.each(athletes, function(i, athlete) {
                    var option = $('<option></option>').val(athlete.athleteId).html(athlete.firstName);
                    if(i === 0){
                        option.attr('selected', true);
                    }
                    dropdown.append(option);
                });
            });
    }
    
});