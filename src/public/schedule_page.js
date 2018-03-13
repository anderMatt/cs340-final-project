$(document).ready(function() {

    initScheduleFormAthletes();
    initScheduleFormEvents();

    function initScheduleFormAthletes() {
        window.olympicsApi.getAllAthletes()
            .done(function(athletes) {
                var dropdown = $('select[name="aid"]');
                $.each(athletes, function(i, athlete) {
                    var option = $('<option></option>').val(athlete.athleteId).html(athlete.firstName + " " + athlete.lastName);
                    if(i === 0){
                        option.attr('selected', true);
                    }
                    dropdown.append(option);
                });
            });
    }
    
    function initScheduleFormEvents() {
        window.olympicsApi.getAllEvents()
            .done(function(events) {
                var dropdown = $('select[name="eid"]');
                $.each(events, function(i, event) {
                    var option = $('<option></option>').val(event.eventId).html(event.eventName);
                    if(i === 0){
                        option.attr('selected', true);
                    }
                    dropdown.append(option);
                });
            });
    }
    
});