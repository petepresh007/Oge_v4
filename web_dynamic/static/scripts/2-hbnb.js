$(document).ready(function () {
    let amenity_array = [];
    const checkbox = $('input[type="checkbox"]');
    checkbox.change(function () {
        const checkboxValue = $(this).val();
        var amenityId = $(this).data('id');

        if ($(this).is(':checked')) {
            amenity_array.push({ id: amenityId, name: checkboxValue });
        } else {
            amenity_array = amenity_array.filter(function (item) {
                return item.id !== amenityId;
            });
        }
        updateAmenitiesList(amenity_array);
    })

    function updateAmenitiesList(amenities) {
        var listText = amenities.map(function (item) {
            return item.name;
        }).join(', ');

        $('.amenities h4').text(listText);
    }

    $.ajax({
        url: 'http://127.0.0.1:5001/api/v1/status/',
        dataType: 'json',
        success: function (data) {
            console.log(data)
            if (data.status === "OK") {
                $('div#api_status').addClass('available');
            } else {
                $('div#api_status').removeClass('available');
            }
        }
    })
})

