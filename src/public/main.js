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

    OlympicsApi.prototype.getAllEvents = function() {
        var url = "/api/events";
        return $.ajax({
            url: url,
            type: 'GET'
        });
    };
    
    OlympicsApi.prototype.getAllLocations = function() {
        var url = "/api/locations";
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

    OlympicsApi.prototype.createEvent = function(eventData) {
        console.log('Creating POST');
        var url = "/api/event/create";
        return $.ajax({
            url: url,
            type: 'POST',
            dataType: 'json',
            data: eventData
        });
    };

    OlympicsApi.prototype.createLocation = function(locationData) {
        var url = "/api/location/create";
        return $.ajax({
            url: url,
            type: 'POST',
            dataType: 'json',
            data: locationData
        });
    };



})(window);