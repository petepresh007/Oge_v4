$(document).ready(function() {
    let amenity_array = [];
    const checkbox = $('input[type="checkbox"]');
    checkbox.change(function() {
        const checkboxValue = $(this).val();
        var amenityId = $(this).data('id');

        if ($(this).is(':checked')){
            amenity_array.push({ id: amenityId, name: checkboxValue });
        }else{
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
})

