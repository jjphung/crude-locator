$(document).ready(function() {
    $.ajax({
        method: "GET",
        url: 'https://my.api.mockaroo.com/locations.json?key=a45f1200',
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
                        <a href="https://www.google.com/maps/dir/?api=1&destination=' + response[i].latitude + ',' + response[i].longitude + '&travelmode=driving" target="_blank"><button type="button" class="btn btn-dark btn-dir-style card-link" id="dir">Directions</button></a>\
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

            //hide text and show new map
            $('#map-text').hide();
            $('.map').show();
            $('.map').attr('src', 'https://maps.googleapis.com/maps/api/staticmap?center=' + response[i-1].latitude + ', ' + response[i-1].longitude + '&zoom=13&scale=2&size=200x300&maptype=roadmap&format=png&visual_refresh=true&markers=size:small%7Ccolor:0xff0000%7Clabel:1%7C' + response[i-1].latitude + ', ' + response[i-1].longitude);

        });

        //add listener to info button
        $('.card-body').on('click', '#info', function(event){
            var i = $(event.target).parent().parent()[0].id;

            //prevents duplicates, avoid clustering dom
            if($('.card.overlay')){
                $('.card.overlay').remove();
            }

            //show info card
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

        // var response = [{"id":1,"name":"Nienow and Sons","url":"https://deviantart.com/nonummy/integer/non.png","address":"65850 Rieder Junction","city":"Miami","state":"FL","postal_code":"33169","latitude":"25.9441","longitude":"-80.2144","monday_open":"8:59 AM","monday_close":"5:07 PM","tuesday_open":"8:26 AM","tuesday_close":"9:44 PM","wednesday_open":"6:31 AM","wednesday_close":"8:20 PM","thursday_open":"7:02 AM","thursday_close":"6:28 PM","friday_open":"8:10 AM","friday_close":"8:54 PM","saturday_open":"9:23 AM","saturday_close":"6:39 PM","sunday_open":"8:08 AM","sunday_close":"5:17 PM"},{"id":2,"name":"Dare LLC","url":"http://answers.com/at/velit/eu/est/congue/elementum.aspx","address":"4833 Bluejay Pass","city":"Grand Forks","state":"ND","postal_code":"58207","latitude":"47.9335","longitude":"-97.3944","monday_open":"8:41 AM","monday_close":"9:10 PM","tuesday_open":"9:27 AM","tuesday_close":"6:13 PM","wednesday_open":"9:51 AM","wednesday_close":"7:59 PM","thursday_open":"8:37 AM","thursday_close":"7:28 PM","friday_open":"9:13 AM","friday_close":"7:18 PM","saturday_open":"6:51 AM","saturday_close":"8:40 PM","sunday_open":"9:00 AM","sunday_close":"8:02 PM"},{"id":3,"name":"Williamson, Gibson and Mosciski","url":"https://1und1.de/risus/semper/porta.png","address":"83730 Springview Pass","city":"Cincinnati","state":"OH","postal_code":"45228","latitude":"39.0706","longitude":"-84.4179","monday_open":"9:32 AM","monday_close":"5:52 PM","tuesday_open":"7:34 AM","tuesday_close":"4:43 PM","wednesday_open":"6:42 AM","wednesday_close":"4:17 PM","thursday_open":"8:51 AM","thursday_close":"7:29 PM","friday_open":"6:25 AM","friday_close":"5:17 PM","saturday_open":"8:20 AM","saturday_close":"6:27 PM","sunday_open":"8:08 AM","sunday_close":"5:39 PM"},{"id":4,"name":"Grady, Ruecker and Wunsch","url":"http://hc360.com/risus/praesent/lectus/vestibulum.xml","address":"924 Westerfield Street","city":"New Haven","state":"CT","postal_code":"06520","latitude":"41.3657","longitude":"-72.9275","monday_open":"7:54 AM","monday_close":"8:27 PM","tuesday_open":"6:19 AM","tuesday_close":"9:28 PM","wednesday_open":"6:55 AM","wednesday_close":"6:45 PM","thursday_open":"6:52 AM","thursday_close":"8:35 PM","friday_open":"9:03 AM","friday_close":"8:18 PM","saturday_open":"7:50 AM","saturday_close":"7:17 PM","sunday_open":"8:44 AM","sunday_close":"4:24 PM"},{"id":5,"name":"Braun LLC","url":"https://icq.com/vehicula/consequat/morbi/a/ipsum.aspx","address":"49675 Vahlen Crossing","city":"Hayward","state":"CA","postal_code":"94544","latitude":"37.6374","longitude":"-122.067","monday_open":"9:33 AM","monday_close":"7:03 PM","tuesday_open":"8:41 AM","tuesday_close":"6:15 PM","wednesday_open":"9:30 AM","wednesday_close":"7:24 PM","thursday_open":"9:21 AM","thursday_close":"8:20 PM","friday_open":"7:03 AM","friday_close":"7:04 PM","saturday_open":"9:19 AM","saturday_close":"9:13 PM","sunday_open":"9:23 AM","sunday_close":"8:04 PM"},{"id":6,"name":"McDermott, Windler and Zulauf","url":"https://sohu.com/molestie.json","address":"12 Cody Road","city":"San Angelo","state":"TX","postal_code":"76905","latitude":"31.4647","longitude":"-100.39","monday_open":"9:02 AM","monday_close":"5:51 PM","tuesday_open":"6:43 AM","tuesday_close":"9:03 PM","wednesday_open":"9:25 AM","wednesday_close":"7:29 PM","thursday_open":"7:36 AM","thursday_close":"4:19 PM","friday_open":"7:40 AM","friday_close":"7:20 PM","saturday_open":"9:55 AM","saturday_close":"7:07 PM","sunday_open":"9:41 AM","sunday_close":"5:47 PM"},{"id":7,"name":"Ebert, Crist and Schroeder","url":"https://psu.edu/tempus/semper/est/quam.html","address":"2954 Oak Valley Parkway","city":"Seattle","state":"WA","postal_code":"98148","latitude":"47.4441","longitude":"-122.3249","monday_open":"6:49 AM","monday_close":"8:04 PM","tuesday_open":"7:47 AM","tuesday_close":"8:06 PM","wednesday_open":"6:13 AM","wednesday_close":"8:51 PM","thursday_open":"7:41 AM","thursday_close":"6:28 PM","friday_open":"7:07 AM","friday_close":"4:45 PM","saturday_open":"8:34 AM","saturday_close":"8:22 PM","sunday_open":"6:48 AM","sunday_close":"6:52 PM"},{"id":8,"name":"Harber-Witting","url":"https://homestead.com/curabitur/convallis/duis/consequat.html","address":"46210 Bonner Center","city":"Salt Lake City","state":"UT","postal_code":"84189","latitude":"40.6681","longitude":"-111.9083","monday_open":"6:07 AM","monday_close":"6:12 PM","tuesday_open":"7:16 AM","tuesday_close":"7:31 PM","wednesday_open":"9:53 AM","wednesday_close":"6:13 PM","thursday_open":"8:01 AM","thursday_close":"4:44 PM","friday_open":"9:26 AM","friday_close":"7:20 PM","saturday_open":"8:02 AM","saturday_close":"6:14 PM","sunday_open":"9:57 AM","sunday_close":"8:33 PM"},{"id":9,"name":"Kutch-Ward","url":"https://etsy.com/aliquam/sit/amet/diam/in/magna.json","address":"2381 Melody Point","city":"Oklahoma City","state":"OK","postal_code":"73197","latitude":"35.5514","longitude":"-97.4075","monday_open":"6:43 AM","monday_close":"8:32 PM","tuesday_open":"9:00 AM","tuesday_close":"9:35 PM","wednesday_open":"7:36 AM","wednesday_close":"7:02 PM","thursday_open":"7:13 AM","thursday_close":"5:39 PM","friday_open":"8:04 AM","friday_close":"7:01 PM","saturday_open":"6:22 AM","saturday_close":"6:07 PM","sunday_open":"7:06 AM","sunday_close":"8:48 PM"}];
 
        $('#list-footer').click(function(event){
                $('.map-area').hide();
                $('.card-area').show();     
        })

        $('#map-footer').click(function(event){
                $('.card-area').hide();
                $('.map-area').show();
        })

});