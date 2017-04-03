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

        //TODO: extract into a css class and decouple wrapper from textbox
        wrapper.style.position = 'fixed';
        wrapper.style.bottom = '0px';
        wrapper.style.right = '0px';
        wrapper.style.height = '100px';
        wrapper.style.width = '300px';

        textbox.style.display = 'none';
        textbox.style.height = '100px';
        textbox.style.width = '300px';
        wrapper.appendChild(textbox);

        document.body.insertBefore(wrapper, document.body.firstChild);

        return textbox;
    }

    function listenForDataChanges() {
        var text = textbox.value;
        setData(k, text);
    }

    function listenForUIToggle(e){
        if(e.shiftKey && e.keyCode === 126) {
            textbox.style.display === 'none' ? textbox.style.display = 'block' : textbox.style.display = 'none';
        }
    }

    /*
    * Kickstart
    */
    renderData(getData(k));
    textbox.onkeyup = listenForDataChanges;

    window.onkeypress = listenForUIToggle;
})(window, document);