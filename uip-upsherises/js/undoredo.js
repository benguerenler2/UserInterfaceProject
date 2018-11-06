/**
 * Function is called whenever a link takes the user to another page.
 * The old location is stored in the sessionStorage for later use with backwards traversal.
 */
function changelocation() {
    var oldTraverse = sessionStorage.getItem("traversalback");

    if (oldTraverse == null) {
        oldTraverse = "";
    }

    var location = window.location.toString();
    sessionStorage.setItem("traversalback", oldTraverse.concat(",", location));
}

/**
 * Function for traversing back one page.
 * Pops the last location of the string stored in the sessionStorage and sets the location to that location.
 * Also pushes the old location to the session storage for use with forward traversal.
 * If the traversal cannot be backed more, the location is set to itself.
 */
function goback() {
    var traverseback = sessionStorage.getItem("traversalback");

    if (traverseback != null) {
        var traversesplit = traverseback.split(",");
        var location = traversesplit.pop();
        var newtraverse = traversesplit.concat();
        sessionStorage.setItem("traversalback", newtraverse);
        if (sessionStorage.getItem("traversalforward") == null) {
            sessionStorage.setItem("traversalforward", window.location.toString());
        } else {
            sessionStorage.setItem("traversalforward",
                sessionStorage.getItem("traversalforward").concat(",", window.location.toString()));
        }
        window.location.assign(location);
    }
}

/**
 * Function for traversing forward one page.
 * Only applicable if the backwards traversal function has been called before.
 */
function goforward() {
    var traverseforward = sessionStorage.getItem("traversalforward");

    if (traverseforward != null) {
        var traversesplit = traverseforward.split(",");
        var location = traversesplit.pop();
        var newtraverse = traversesplit.concat();
        sessionStorage.setItem("traversalforward", newtraverse);
        if (sessionStorage.getItem("traversalback") == null) {
            sessionStorage.setItem("traversalback", window.location.toString());
        } else {
            sessionStorage.setItem("traversalback",
                sessionStorage.getItem("traversalback").concat(",", window.location.toString()));
        }
        window.location.assign(location);
    }
}