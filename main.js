(function() {
    'use strict';

    var lastPrime = 1;
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
            //console.log('  --  >  testNum, candidate:', testNum, candidate);

            result = (candidate / testNum);
            if (parseInt(result, 10) === result) {
                //console.log('  --  >  This is not a prime:', candidate, 'because it divides by', testNum);
                candidate += 2;
                testNum = Math.floor(Math.sqrt(candidate));
                //continue;
            } else {
                testNum++;
            }
        }

        return candidate;
    }

    function appendNextPrime(primeListEl, lastPrime) {
        var nextPrime = getNextPrime();

        primeListEl.appendChild(makeEl(nextPrime, 'p'));
        return nextPrime;
    }

    for (i = 0; i < 40; i++) {
        lastPrime = appendNextPrime(primeListEl, lastPrime);
    }

    window.addEventListener('scroll', function() {
        if (spaceBelow < viewPortHeight * 5) {
            lastPrime = appendNextPrime(primeListEl, lastPrime);
            //console.log('  --  >  Printing another one');
        }
    });
})();