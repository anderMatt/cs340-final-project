(function(window) {

    window.olympicsApi = window.olympicsApi || new OlympicsApi();

    function OlympicsApi(){}

    OlympicsApi.prototype.getAllCountries = function() {
        var url = "/api/countries";
        return $.ajax({
            url: url,
            type: 'GET'
        });
    };

    OlympicsApi.prototype.createAthlete = function(athleteData) {
        var url = "/api/athlete/create";
        return $.ajax({
            url: url,
            type: 'POST',
            dataType: 'json',
            data: athleteData
        });
    };



})(window);