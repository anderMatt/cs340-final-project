$(document).ready(function() {

    var searchTimeout = null;
    var deletePending = false;

    var newAthleteForm = $('#addAthlete');
    var submitBtn = $('#submitAthlete');
    var lastNameSearch = $('input[name="lastNameSearch"]');
    var lastNameSearchBtn = $('#lastNameSearchBtn');
    var refreshSearchBtn = $('#refreshSearchBtn');

    initAthleteForm();
    lastNameSearchBtn.click(onLastNameSearch);
    refreshSearchBtn.click(onRefresh);
    $('.deleteAthleteBtn').click(onAthleteDelete);
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

        function onLastNameSearch(event) {
            var lastName = lastNameSearch.val().trim();
            if(lastName != "") {
                document.location.href = "/athletes?lastname=" + encodeURIComponent(lastName);
            } else {
                document.location.href = "/athletes";
            }
        }

        function onRefresh(event) {
            document.location.href = "/athletes";
        }

        function onAthleteDelete(event) {
            if(deletePending) {
                return;
            }

            var $this = $(this);
            var athleteId = $this.data('athlete-id');
            $this.prop('disabled', true);
            deletePending = true;

            window.olympicsApi.deleteAthlete(athleteId)
                .done(function(data) {
                    deletePending = false;
                    window.location.href = "/athletes";
                })
                .fail(function(err) {
                    alert('Unable to delete athlete! ' + err.responseText);
                    $this.prop('disabled', false);
                    deletePending = false;
                });
        }
});

