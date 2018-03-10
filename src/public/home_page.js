$(document).ready(function() {
    var newCountryForm = $('#addCountry');
    var submitBtn = $('#submitCountry');

    newCountryForm.submit(onCountrySubmit);

    function onCountrySubmit(event) {
        console.log('Submitting new country...');
        event.preventDefault();
        submitBtn.prop('disabled', true);

        var formData = newCountryForm.serialize();
        window.olympicsApi.createCountry(formData)
            .done(function(data) {
                location.reload(true);
            })
            .fail(function(response) {
                alert('Failed to create country! Error: ' + response.responseText);
                submitBtn.prop('disabled', false);
            });
    }
});