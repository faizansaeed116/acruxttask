/* ------------------------------------------------------------------------------
 *
 *  # Custom JS code
 *
 *  Place here all your custom js. Make sure it's loaded after app.js
 *
 * ---------------------------------------------------------------------------- */

$(document).ready(function () {
    let pathname = window.location.pathname;
    let selected_URL = $("a[href='" + pathname + "']");
    let nav_sub_ = selected_URL.closest("li.nav-item-submenu");

    if (nav_sub_.length > 0) {
        nav_sub_.addClass('nav-item-expanded nav-item-open');
    }

    selected_URL.addClass("active");
});