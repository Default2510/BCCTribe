var firstFruitsPath = function(date) {
	if (!isDateValid(date)) {
		date = new Date();
	}
	var base = "app/data/first-fruits/";
	var year = date.getFullYear();
	var month = date.getMonth();
	switch(month) {
		case 0:
			month = "01-january";
			break;
		case 1:
			month = "02-february";
			break;
		case 2:
			month = "03-march";
			break;
		case 3:
			month = "04-april";
			break;
		case 4:
			month = "05-may";
			break;
		case 5:
			month = "06-june";
			break;
		case 6:
			month = "07-July";
			break;
		case 7:
			month = "08-august";
			break;
		case 8:
			month = "09-september";
			break;
		case 9:
			month = "10-october";
			break;
		case 10:
			month = "11-november";
			break;
		case 11:
			month = "12-december";
	} 
	return base + year + "/" + month + ".json";
};

var isDateValid = function(date) {
	if (date == null || date == 'Invalid Date') {
		return false;
	}
	return true;
};

(function(window, document, undefined)
{

    // helper functions
    var trim = function(str) {
        return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g,'');
    };

    var hasClass = function(el, cn) {
        return (' ' + el.className + ' ').indexOf(' ' + cn + ' ') !== -1;
    };

    var addClass = function(el, cn) {
        if (!hasClass(el, cn)) {
            el.className = (el.className === '') ? cn : el.className + ' ' + cn;
        }
    };

    var removeClass = function(el, cn) {
        el.className = trim((' ' + el.className + ' ').replace(' ' + cn + ' ', ' '));
    };

    var hasParent = function(el, id) {
        if (el) {
            do {
                if (el.id === id) {
                    return true;
                }
                if (el.nodeType === 9) {
                    break;
                }
            }
            while((el = el.parentNode));
        }
        return false;
    };
    
    // normalize vendor prefixes

    var doc = document.documentElement;

    window.App = (function()
    {

        var _init = false, app = { };

        var inner = document.getElementById('inner-wrap'),

            nav_open = false,

            nav_class = 'js-nav';

        app.init = function()
        {
           if (_init) {
                return;
            }
            _init = true;
            
 
            var closeNavEnd = function(e)
            {
                if (e && e.target === inner) {
                    document.removeEventListener(transition_end, closeNavEnd, false);
                }
                nav_open = false;
            };

            app.closeNav =function()
            {
                if (nav_open) {
                    // close navigation after transition or immediately
                    var duration = (transition_end && transition_prop) ? parseFloat(window.getComputedStyle(inner, '')[transition_prop + 'Duration']) : 0;
                    if (duration > 0) {
                        document.addEventListener(transition_end, closeNavEnd, false);
                    } else {
                        closeNavEnd(null);
                    }
                }
                removeClass(doc, nav_class);
            };

            app.openNav = function()
            {
                if (nav_open) {
                    return;
                }
                addClass(doc, nav_class);
                nav_open = true;
            };

            app.toggleNav = function(e)
            {
                if (nav_open && hasClass(doc, nav_class)) {
                    app.closeNav();
                } else {
                    app.openNav();
                }
                if (e) {
                    e.preventDefault();
                }
            };

            // open nav with main "nav" button
            if ( document.getElementById('nav-open-btn') ) {
            	document.getElementById('nav-open-btn').addEventListener('click', app.toggleNav, false);
            }

            // close nav with main "close" button
            if ( document.getElementById('nav-close-btn') ) {
            	document.getElementById('nav-close-btn').addEventListener('click', app.toggleNav, false);
            }

            // close nav by touching the partial off-screen content
            document.addEventListener('click', function(e)
            {
                if (nav_open && !hasParent(e.target, 'nav')) {
                    e.preventDefault();
                    app.closeNav();
                }
            },
            true);

            addClass(doc, 'js-ready');

        };

        return app;

    })();

    if (window.addEventListener) {
        window.addEventListener('DOMContentLoaded', window.App.init, false);
    }

})(window, window.document);
