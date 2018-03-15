(function(window) {

    window.olympicsApi = window.olympicsApi || new OlympicsApi();

    function OlympicsApi(){}
    
    OlympicsApi.prototype.getAllAthletes = function() {
        var url = "/api/athletes";
        return $.ajax({
            url: url,
            type: 'GET'
        });
    };

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

    OlympicsApi.prototype.deleteAthlete = function(athleteId) {
        var url = "/api/athletes/" + athleteId;
        return $.ajax({
            url: url,
            type: 'DELETE'
        });
    };

    OlympicsApi.prototype.deleteLocation = function(locationId) {
        var url = "/api/location/" + locationId;
        return $.ajax({
            url: url,
            type: 'DELETE'
        });
    };

    OlympicsApi.prototype.deleteMedal = function(medalId) {
        console.log("Deleting medal: " + medalId);
        var url = "/api/medal/" + medalId;
        return $.ajax({
            url: url,
            type: 'DELETE'
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

    OlympicsApi.prototype.createCountry = function(countryData) {
        var url = "/api/countries/create";
        return $.ajax({
            url: url,
            type: 'POST',
            dataType: 'json',
            data: countryData
        });
    };
    
    OlympicsApi.prototype.scheduleEvent = function(scheduleData) {
        var url = "/api/schedule/create";
        return $.ajax({
            url: url,
            type: 'POST',
            dataType: 'json',
            data: scheduleData
        });
    }
    
    OlympicsApi.prototype.unschedule = function(aid, eid) {
        var url = "/api/unschedule/" + aid + "&" + eid;
        return $.ajax({
            url: url,
            type: 'DELETE'
        });
    }


})(window);