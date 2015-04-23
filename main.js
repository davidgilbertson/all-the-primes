(function() {
    'use strict';

    var primeListEl = document.getElementById('prime-list');
    var viewPortHeight = window.innerHeight;
    var listHeight = primeListEl.offsetHeight;
    var scrollPos = document.body.scrollTop;
    var spaceBelow = listHeight - scrollPos - viewPortHeight;
    var lastPrime = 3;
    var i;

    function makeEl(text, tagName) {
        var el = document.createElement(tagName);

        el.appendChild(document.createTextNode(text));

        return el;
    }

    function getNextPrime() {
        var candidate = lastPrime + 2;
        var testNum = Math.floor(Math.sqrt(candidate));
        var result = 0;

        while (testNum < candidate) {

            result = (candidate / testNum);
            if (parseInt(result, 10) === result) {
                candidate += 2;
                testNum = Math.floor(Math.sqrt(candidate));
            } else {
                testNum++;
            }
        }

        lastPrime = candidate;
        return candidate;
    }

    function appendNextPrime() {
        primeListEl.appendChild(makeEl(getNextPrime(), 'p'));
    }

    // Kick it off with a bunch of primes
    for (i = 0; i < 101; i++) {
        appendNextPrime();
    }

    window.addEventListener('scroll', function() {
        if (spaceBelow < viewPortHeight * 5) {
            appendNextPrime();
        }
    });
})();