// ==UserScript==
// @name         memo
// @namespace    https://github.com/mihaiBura/memo
// @version      0.1
// @description  No more forgetting important things.
// @author       mbura
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function(window, document) {
    'use strict';

    var k = getLocationHash(window.location),
        textbox = createTextbox();

    /*
    * Function that outputs a hash of the current location
    * Based on hostname, pathname, and search.
    * Trying to avoid different ports, protocols, hashes
    * , and other href alterations
    * 
    * See more: 
    * https://developer.mozilla.org/en-US/docs/Web/API/Location 
    * http://bl.ocks.org/abernier/3070589
    */
    function getLocationHash(location) {
        return location.hostname + location.pathname + location.search;
    }

    function getData(key){
        return window.localStorage.getItem(key);
    }

    function setData(key, data) {
        window.localStorage.setItem(key, data);
    }

    function renderData(data) {
        textbox.value = data;
    }

    function createTextbox() {
        var wrapper = document.createElement('div'),
            textbox = document.createElement('textarea');

        wrapper.appendChild(textbox);

        document.body.insertBefore(wrapper, document.body.firstChild);

        return textbox;
    }

    function listenForChanges() {
        var text = textbox.value;
        setData(k, text);
    }

    /*
    * Kickstart
    */
    renderData(getData(k));
    textbox.onkeyup = listenForChanges;
})(window, document);