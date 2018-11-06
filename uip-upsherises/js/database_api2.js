/**
 * Variable for how many beer items should be generated.
 * @type {number}
 */
var num = 12;

/**
 * Called when the page is loaded and ready.
 * Will read from the database, NUM beer items where NUM is the variable num.
 * The function picks out some useful information and pushes a grid-item for each beer into the grid.
 */
$.when( $.ready ).then(function() {

    var result = [];

    $.getJSON("../resources/DBFilesJSON/dutchman_table_sbl_beer.json", function (data) {
        var items = [];

        $.each(data, function (key, val) {

            var beer_nr;
            var beer_name;
            var beer_price;

            $.each(val, function (key, val2) {
                if (key == 'nr') {
                    beer_nr = val2;
                }
                if (key == 'namn') {
                    beer_name = val2;
                }
                if (key == 'prisinklmoms') {
                    beer_price = val2;
                }

            })

            var beer_info = {
                id: beer_nr,
                name: beer_name,
                price: beer_price
            }

            result.push("<div class='grid-item' id='" + beer_nr + "' data-price='" + beer_price + "' draggable='true'>" + beer_name + "</div>");

            items.push(beer_info);

            if (items.length >= num) {
                return false;
            }
        });

        document.getElementById("grid").innerHTML = result.join("");
    });
});