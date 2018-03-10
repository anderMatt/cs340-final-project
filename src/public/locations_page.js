$(document).ready(function() {
    var newLocationForm = $('#addLocation');
    var submitBtn = $('#submitLocation');

    newLocationForm.submit(onLocationSubmit);

    function onLocationSubmit(event) {
        console.log('Submitting new location...');
        event.preventDefault()
        submitBtn.prop('disabled', true);

        var formData = newLocationForm.serialize();
        window.olympicsApi.createLocation(formData)
            .done(function(data) {
                location.reload(true);
            })
            .fail(function(response) {
                alert('Failed to create location! Error: ' + response.responseText);
                submitBtn.prop('disabled', false);
            });
    }
});