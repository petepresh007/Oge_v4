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


    $.ajax({
        type: 'POST',
        url: 'http://0.0.0.0:5001/api/v1/places_search/',
        contentType: 'application/json',
        data: JSON.stringify({})
    }).done(function (data) {
        for (const place of data) {
            const template = `<article>

        <div class="title">

          <h2>${place.name}</h2>

          <div class="price_by_night">

        $${place.price_by_night}

          </div>
        </div>
        <div class="information">
          <div class="max_guest">
        <i class="fa fa-users fa-3x" aria-hidden="true"></i>

        <br />

        ${place.max_guest} Guests

          </div>
          <div class="number_rooms">
        <i class="fa fa-bed fa-3x" aria-hidden="true"></i>

        <br />

        ${place.number_rooms} Bedrooms
          </div>
          <div class="number_bathrooms">
        <i class="fa fa-bath fa-3x" aria-hidden="true"></i>

        <br />

        ${place.number_bathrooms} Bathroom

          </div>
        </div>
        <div class="description">

          ${place.description}

        </div>

      </article> <!-- End 1 PLACE Article -->`;
            $('section.places').append(template);
        }
    });

})

