$(document).ready(function () {
    $(document).keydown(function (e) {
        console.log("HIT")
        var key = e.which;
        if ($.inArray(key, ar) > -1) {
            e.preventDefault();
            return false;
        }
        return true;
    });
});