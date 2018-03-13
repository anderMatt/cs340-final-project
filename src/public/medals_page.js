$(document).ready(function() {
    var deletePending = false;
    $('.deleteMedalBtn').click(onMedalDelete);

    function onMedalDelete(event) {
        if (deletePending) {
            return;
        }

        var $this = $(this);
        var medalId = $this.data('medal-id');
        $this.prop('disabled', true);
        deletePending = true;

        window.olympicsApi.deleteMedal(medalId)
            .done(function (data) {
                window.location.href = '/medals';
            })
            .fail(function (err) {
                alert('Unable to delete medal: ' + err.responseText);
                $this.prop('disabled', false);
                deletePending = false;
            });
    };
});
