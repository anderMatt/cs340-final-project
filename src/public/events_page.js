$(document).ready(function() {
    var newEventForm = $('#addEvent');
    var submitBtn = $('#submitEvent');
    var deletePending = false;

    initEventForm();
    newEventForm.submit(onEventSubmit);
    $('.cancelButton').click(cancelEvent);

    function initEventForm() {
        window.olympicsApi.getAllLocations()
            .done(function(locations) {
                var dropdown = $('select[name="location_id"]');
                $.each(locations, function(i, location) {
                    var option = $('<option></option>').val(location.locationId).html(location.locationName);
                    if(i === 0) {
                        option.attr('selected', true);
                    }
                    dropdown.append(option);
                });
            });
        }

        function onEventSubmit(event) {
        console.log('Submitting new event...');
        event.preventDefault();
        submitBtn.prop('disabled', true);

        var formData = newEventForm.serialize();
        window.olympicsApi.createEvent(formData)
            .done(function(data) {
                location.reload(true);
            })
            .fail(function(response) {
                alert('Failed to create event! Error: ' + response.responseText);
                submitBtn.prop('disabled', false);
            });
        }
        
        function cancelEvent() {
            if(deletePending) {
            return;
        }

        var $this = $(this);
        var event = $this.data('cancel-event');
        $this.prop('disabled', true);
        deletePending = true;

        window.olympicsApi.cancelEvent(event)
            .done(function(data) {
                window.location.href = "/events";
            })
            .fail(function(err) {
                alert("Unable to cancel event! " + err.responseText);
                $this.prop('disabled', false);
            })
            .always(function() {
                deletePending = false;
            });
        }
});