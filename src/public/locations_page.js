$(document).ready(function() {
    var newLocationForm = $('#addLocation');
    var submitBtn = $('#submitLocation');
    var deletePending = false;

    $('.deleteLocationBtn').click(onLocationDelete);

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

    function onLocationDelete(event) {
        if(deletePending) {
            return;
        }

        var $this = $(this);
        var locationId = $this.data('location-id');
        $this.prop('disabled', true);
        deletePending = true;

        window.olympicsApi.deleteLocation(locationId)
            .done(function(data) {
                window.location.href = "/locations";
            })
            .fail(function(err) {
                alert("Unable to delete location! " + err.responseText);
                $this.prop('disabled', false);
            })
            .always(function() {
                deletePending = false;
            });
    }
});