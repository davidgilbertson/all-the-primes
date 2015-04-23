(function() {
    'use strict';

    var lastPrime = 3;
    var primeListEl = document.getElementById('prime-list');
    var viewPortHeight = window.innerHeight;
    var listHeight = primeListEl.offsetHeight;
    var scrollPos = document.body.scrollTop;
    var spaceBelow = listHeight - scrollPos - viewPortHeight;
    var i;

    function makeEl(text, tagName) {
        tagName = tagName || 'div';
        var el = document.createElement(tagName);
        var text = document.createTextNode(text);
        el.appendChild(text);
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

        return candidate;
    }

    function appendNextPrime() {
        var nextPrime = getNextPrime();

        primeListEl.appendChild(makeEl(nextPrime, 'p'));
        return nextPrime;
    }


    primeListEl.appendChild(makeEl(3, 'p'));

    // Kick it off
    for (i = 0; i < 40; i++) {
        lastPrime = appendNextPrime(lastPrime);
    }

    window.addEventListener('scroll', function() {
        if (spaceBelow < viewPortHeight * 5) {
            lastPrime = appendNextPrime(primeListEl, lastPrime);
        }
    });
})();