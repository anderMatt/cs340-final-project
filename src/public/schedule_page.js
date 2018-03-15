$(document).ready(function() {

    var deletePending = false;

    initScheduleFormAthletes();
    initScheduleFormEvents();
    
    $('.unscheduleButton').click(unscheduleEvent);

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
    
    function unscheduleEvent(event){
        if(deletePending) {
            return;
        }

        var $this = $(this);
        var aid = $this.data('unschedule-athlete');
        var eid = $this.data('unschedule-event');
        $this.prop('disabled', true);
        deletePending = true;

        window.olympicsApi.unschedule(aid, eid)
            .done(function(data) {
                window.location.href = "/schedule";
            })
            .fail(function(err) {
                alert("Unable to unschedule event! " + err.responseText);
                $this.prop('disabled', false);
            })
            .always(function() {
                deletePending = false;
            });
    }
    
});