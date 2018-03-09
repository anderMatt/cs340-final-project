$(document).ready(function() {

    var newAthleteForm = $('#addAthlete');
    var submitBtn = $('#submitAthlete');

    initAthleteForm();
    newAthleteForm.submit(onAthleteSubmit);


    function initAthleteForm() {
        window.olympicsApi.getAllCountries()
            .done(function(countries) {
                var dropdown = $('select[name="country_id"]');
                $.each(countries, function(i, country) {
                    var option = $('<option></option>').val(country.countryId).html(country.countryName);
                    if(i === 0){
                        option.attr('selected', true);
                    }
                    dropdown.append(option);
                });
            });
    }

    function onAthleteSubmit(event) {
        console.log('Submitting new athlete...');
        event.preventDefault();
        submitBtn.prop('disabled', true);

        var formData = newAthleteForm.serialize();
        window.olympicsApi.createAthlete(formData)
            .done(function(data) {
                location.reload(true);
            })
            .fail(function(response) {
                alert('Failed to create athlete! Error: ' + response.responseText);
                submitBtn.prop('disabled', false);
            });
        }
});

