$(document).ready(function() {
    $.ajax({
        method: "GET",
        //TODO: replace url with your own
        url: 'https://my.api.mockaroo.com/locations.json?key=ENTERKEYHERE',
        dataType: 'json'
    }).success(function (response) {
        // work with response data here
        $('.header').prepend('<p id="header">'+ 'Found '+ response.length + ' Taco Trucks in 92121' + '</p>');

        //creation of cards
        for (var i = 0; i < response.length; i++){
            
            $('.card-area').append(
                '<div class="card" id="' + response[i].id +'"' + '> \
                    <div class="card-body">\
                        <span class="card-title">Taco Truck ' + (i + 1)  + '</span>\
                        <span id="miles">0.5 miles</span>\
                        <br/>\
                        <br/>\
                        <h6 class="card-subtitle mb-2 text-muted">' + response[i].address + '<br/>' + response[i].city + ', ' + response[i].state + ' ' + response[i].postal_code +'</h6>\
                        <p class="card-text open-today">Open today until 9pm</p>\
                        <img class="img-fluid" src="assets/phone-icon.png"/>\
                        <span class="card-text phone">111-123-4122</span>\
                        <br/>\
                        <br/>\
                        <a href="https://www.google.com/maps/dir/?api=1&destination=' + response[i].latitude + ',' + response[i].longitude + '&travelmode=driving" target="_blank">\
                        <button type="button" class="btn btn-dark btn-dir-style card-link" id="dir">Directions</button>\
                        </a>\
                        <button type="button" class="btn btn-dark btn-info-style card-link" id="info" href="#">More info</button>\
                    </div>\
                </div>'
            );
        }

        
        //initial page load
        $('.map').css('display', 'none');

        //Map display on click
        $('.card').click(function(event){
            var i = this.id;

            $('.card-body').css('background-color', 'white');
            $(this).children('.card-body').css('background-color', '#EBEBEB');

            //hide text and show new map
            $('#map-text').hide();
            $('.map').show();

            //TODO: Using Static Map Google API; replace API key
            $('.map').attr('src', 'https://maps.googleapis.com/maps/api/staticmap?center=' + response[i-1].latitude + ', ' + response[i-1].longitude + '&zoom=13&scale=2&size=200x300&maptype=roadmap&format=png&visual_refresh=true&markers=size:small%7Ccolor:0xff0000%7Clabel:1%7C' + response[i-1].latitude + ', ' + response[i-1].longitude + "&key=ENTERKEYHERE");
            

        });

        //add listener to info button
        $('.card-body').on('click', '#info', function(event){
            var i = $(event.target).parent().parent()[0].id;

            //prevents duplicates, avoid clustering dom
            if($('.card.overlay')){
                $('.card.overlay').remove();
            }


            //show info overlay card
            $('#map-text').before('<div class="card overlay" style="width: 20rem;">\
            <p id="exit">X</p>\
            <img class="card-img-top" src="https://via.placeholder.com/350x150" alt="Card image cap">\
            <div class="card-body">\
            <span class="card-title">Taco Truck ' + i  + '</span>\
            <br/>\
            <h6 class="card-subtitle mb-2 text-muted">' + response[i-1].address + '<br/>' + response[i-1].city + ', ' + response[i-1].state + ' ' + response[i-1].postal_code +'</h6>\
            <div class="row">\
            <div class="col-sm-6 overlay-phone">\
            <img class="img-fluid" src="assets/phone-icon.png"/>\
            <span class="card-text phone">111-123-4122</span>\
            </div>\
            <div class="col-sm-6">\
            <img class="img-fluid" src="assets/direction-icon.png"/>\
            <span class="card-text phone">Get Directions</span>\
            </div>\
            </div>\
            <div class="row">\
            <div class="col-sm-5 days">\
            <p>Monday <br/> Tuesday <br/>Wednesday <br/>Thursday <br/> Friday <br/>Saturday <br/> Sunday <br/>\
            </p>\
            </div>\
            <div class="col-sm-7 day-times">\
            <p>' + response[i-1].monday_open + ' - ' + response[i-1].monday_close +  '<br/>' 
            + response[i-1].tuesday_open + ' - ' + response[i-1].tuesday_close + ' <br/>' +
            response[i-1].wednesday_open + ' - ' + response[i-1].wednesday_close +  '<br/>' +
            response[i-1].thursday_open + ' - ' + response[i-1].thursday_close +  '<br/>' +
            response[i-1].friday_open + ' - ' + response[i-1].friday_close +  '<br/>' +
            response[i-1].saturday_open + ' - ' + response[i-1].saturday_close +  '<br/>' +
            response[i-1].sunday_open + ' - ' + response[i-1].sunday_close +  '<br/>' + '</p>\
            </div>\
            </div>\
            <a href="'+ response[i-1].url + '" target="_blank" class="btn btn-dark card-link">View Full Details</a>\
            </div>\
            </div>');
        
            $('#exit').click(function(event){
                var cardoverlay = $(event.target).parent();
                cardoverlay.remove();
            });

        });
    
    });

        // list click
        $('#list-footer').click(function(event){
                $('.map-area').hide();
                $('.card-area').show();     

                $('#list-footer').css({
                    'color': '#FFFFFF',
                    'background-color': '#FCB040'
                });

                $('#map-footer').css({
                    'color': '#FCB040',
                    'background-color': '#FFFFFF'
                });
        })

        //map click
        $('#map-footer').click(function(event){
                $('.card-area').hide();
                $('.map-area').show();

                $('#map-footer').css({
                    'color': '#FFFFFF',
                    'background-color': '#FCB040'
                });

                $('#list-footer').css({
                    'color': '#FCB040',
                    'background-color': '#FFFFFF'
                });
        })

});