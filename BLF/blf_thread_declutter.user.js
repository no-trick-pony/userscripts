// ==UserScript==
// @name         BLF Thread Declutter
// @namespace    https://userscripts.no-trick-pony.com/
// @version      0.1.0
// @description  Removes unnecessary stuff from posts on the Budget-Light forum to make threads more readable.
// @author       no-trick-pony
// @match        *://budgetlightforum.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function remove_all(css_selector){
        var signatures = document.querySelectorAll(css_selector);

        signatures.forEach(function(elem){
            elem.remove();
        });
    }

    function merge_online_status_with_last_seen(user_panels_selector){
        var user_panels = document.querySelectorAll(user_panels_selector);

        user_panels.forEach(function(elem){

            // Selects the element with the online/offline colored status indicator.
            var state_elem = elem.querySelector('div.author-offline') || elem.querySelector('div.author-online');

            // Selects the element containing the 'Last seen' text via XPath
            var last_seen_node = document.evaluate(".//*[contains(text(),'Last seen:')]", elem, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

            // 'ago' is unnecessary and makes the text too long in some cases.
            state_elem.textContent = last_seen_node.nextSibling.nodeValue.replace(/\bago\b/, '').trim();

            // Not needed anymore
            last_seen_node.parentElement.remove();
        });

        // Set min-height of posts to 0, otherwise one- or two-line messages have a loooooong blank section.
        document.querySelectorAll('.forum-post-panel-main').forEach(function(elem){
            elem.style.minHeight = 0;
        });
    }

    // Signatures
    remove_all('div.forum-post-content > div.clear');

    // Post count
    remove_all('.forum-post-panel-sub .author-pane-general div.author-pane-line.author-posts');

    // Join date
    remove_all('.forum-post-panel-sub .author-pane-general div.author-pane-line.author-joined');

    // Contact-user button
    remove_all('.forum-post-panel-sub .author-pane-contact');

    // Removes "Online" or "Offline" text next to the green/red dot and writes the
    // last-seen time there instead. Removes the last seen line too.
    merge_online_status_with_last_seen('.forum-post-panel-sub .author-pane-general');

})();
