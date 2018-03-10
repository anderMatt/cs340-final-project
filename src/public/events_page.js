$(document).ready(function() {
    var newEventForm = $('#addEvent');
    var submitBtn = $('#submitEvent');

    initEventForm();
    newEventForm.submit(onEventSubmit);

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
});