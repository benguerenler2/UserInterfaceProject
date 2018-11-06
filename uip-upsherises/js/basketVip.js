function addEvent(element, event, delegate ) {
    if (typeof (window.event) != 'undefined' && element.attachEvent)
        element.attachEvent('on' + event, delegate);
    else
        element.addEventListener(event, delegate, false);
}

addEvent(document, 'readystatechange', function() {
    if ( document.readyState !== "complete" )
        return true;

    var items = document.querySelectorAll("section.products div");
    var cart = document.querySelectorAll("#cart ul")[0];

    function updateCart(){
        var total = 0.0;
        var cart_items = document.querySelectorAll("#cart ul div")
        for (var i = 0; i < cart_items.length; i++) {
            var cart_item = cart_items[i];
            var quantity = cart_item.getAttribute('data-quantity');
            var price = cart_item.getAttribute('data-price');

            var sub_total = parseFloat(quantity * parseFloat(price));
            cart_item.querySelectorAll("span.sub-total")[0].innerHTML = " = " + sub_total.toFixed(2);

            total += sub_total;
        }

        document.querySelectorAll("#cart span.total")[0].innerHTML = total.toFixed(2);
        localStorage.setItem("vOneLocalStorage", total);

    }

    function addCartItem(item, id) {
        var clone = item.cloneNode(true);
        clone.setAttribute('data-id', id);
        clone.setAttribute('data-quantity', 1);
        clone.removeAttribute('id');

        var fragment = document.createElement('span');
        fragment.setAttribute('class', 'quantity');
        fragment.innerHTML = ' x 1';
        clone.appendChild(fragment);

        fragment = document.createElement('span');
        fragment.setAttribute('class', 'sub-total');
        clone.appendChild(fragment);
        cart.appendChild(clone);

    }

    function updateCartItem(item){
        var quantity = item.getAttribute('data-quantity');
        quantity = parseInt(quantity) + 1
        item.setAttribute('data-quantity', quantity);
        var span = item.querySelectorAll('span.quantity');
        span[0].innerHTML = ' x ' + quantity;
    }

    function onDrop(event){
        if(event.preventDefault) event.preventDefault();
        if (event.stopPropagation) event.stopPropagation();
        else event.cancelBubble = true;

        var id = event.dataTransfer.getData("Text");
        var item = document.getElementById(id);

        var exists = document.querySelectorAll("#cart ul div[data-id='" + id + "']");

        if(exists.length > 0){
            updateCartItem(exists[0]);
        } else {
            addCartItem(item, id);
        }

        updateCart();

        return false;
    }

    function onDragOver(event){
        if(event.preventDefault) event.preventDefault();
        if (event.stopPropagation) event.stopPropagation();
        else event.cancelBubble = true;
        return false;
    }

    addEvent(cart, 'drop', onDrop);
    addEvent(cart, 'dragover', onDragOver);

    function onDrag(event){
        event.dataTransfer.effectAllowed = "move";
        event.dataTransfer.dropEffect = "move";
        var target = event.target || event.srcElement;
        var success = event.dataTransfer.setData('Text', target.id);
    }


    for (var i = 0; i < items.length; i++) {
        var item = items[i];
        addEvent(item, 'dragstart', onDrag);

    };
});