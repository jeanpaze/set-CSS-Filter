# Set CSS Filter

Set CSS Filter is a library to help you applying CSS Filters. Can be called during an update function of any JS tween library or just a single call.

Should works on:
* Edge 13+;
* Firefox 35+;
* Safari 6+;
* Opera 15+;
* Safari & Chrome for iOS 6+;
* Android Browser 4.4+;
* Blackberry Browser 10+;
* Opera 30+ for Android;
* Chrome 44+ for Android;
* Firefox 40+ for Android;
* UC Browser 9.9+ for Android;

Releases
-----

- **0.1.1** - Added the ability to pass an array with DOM Elements + performance improvements.
- **0.1.0** - Initial beta release.

Usage
-----

Just include [setcssfilter.js](setcssfilter.js):

``` html
<script type='text/javascript' src='setcssfilter.js'></script>
```

Or the [minified version](setcssfilter.min.js):

``` html
<script type='text/javascript' src='setcssfilter.min.js'></script>
```

Then set CSS filter with available calls:

``` html
setCSSFilter( image, { progress:1, filter:"hue-rotate", start:0, end:360 } );

setCSSFilter( image, { progress:1, filter:"brightness", start:100, end:200 } );

setCSSFilter( image, { progress:1, filter:"drop-shadow", start:[ 0, 0, 0, '#000000', 1 ], end:[ 10, 10, 8, '#000000', 1 ] } );

setCSSFilter( image, { progress:1, filter:"contrast", start:100, end:200 } );

setCSSFilter( image, { progress:1, filter:"saturate", start:100, end:500 } );

setCSSFilter( image, { progress:1, filter:"sepia", start:0, end:100 } );

setCSSFilter( image, { progress:1, filter:"grayscale", start:0, end:100 } );

setCSSFilter( image, { progress:1, filter:"invert", start:0, end:100 } );

setCSSFilter( image, { progress:1, filter:"blur", start:0, end:4 } );

setCSSFilter( image, { progress:1, filter:"opacity", start:100, end:0 } );
```

That filter applying is cumulative, so you can set multiples filters at the same time. If you want to remove a filter, you need to call again changing the 'start' and 'end' params.

You can call during an updating tween as this TimelineMax example:

``` html
var progressEase = { value:0 };

var tl = new TimelineMax( { repeat:-1 } );
    tl.to( progressEase, 1, { value:1, ease:Elastic.easeOut, onUpdate:updateFilter, onUpdateParams:[ "{self}", { filter: 'blur', start:0, end:16 } ] } );
    tl.to( progressEase, 1, { value:0, ease:Elastic.easeIn, onUpdate:updateFilter, onUpdateParams:[ "{self}", { filter: 'blur', start:0, end:16 } ] } );
    tl.to( progressEase, 1, { value:1, ease:Elastic.easeOut, onUpdate:updateFilter, onUpdateParams:[ "{self}", { filter: 'brightness', start:100, end:500 } ] } );
    tl.to( progressEase, 1, { value:0, ease:Elastic.easeIn, onUpdate:updateFilter, onUpdateParams:[ "{self}", { filter: 'brightness', start:100, end:500 } ] } );
    tl.to( progressEase, 1, { value:1, ease:Elastic.easeOut, onUpdate:updateFilter, onUpdateParams:[ "{self}", { filter: 'drop-shadow', start:[ 0, 0, 0, '#000000', 1 ], end:[ 10, 10, 8, '#000000', 1 ] } ] } );
    tl.to( progressEase, 1, { value:0, ease:Elastic.easeIn, onUpdate:updateFilter, onUpdateParams:[ "{self}", { filter: 'drop-shadow', start:[ 0, 0, 0, '#000000', 1 ], end:[ 10, 10, 8, '#000000', 1 ] } ] } );
    tl.to( progressEase, 1, { value:1, ease:Linear.easeNone, onUpdate:updateFilter, onUpdateParams:[ "{self}", { filter: 'grayscale', start:0, end:100 } ] } );
    tl.to( progressEase, 1, { value:0, ease:Linear.easeNone, onUpdate:updateFilter, onUpdateParams:[ "{self}", { filter: 'grayscale', start:0, end:100 } ] } );

function updateFilter( tween, obj ) {
    setCSSFilter( element, { progress:tween.target.value, filter:obj.filter, start:obj.start, end:obj.end } );
};
```
See in action: http://codepen.io/jeanpaze/pen/gaPqeK

Config
-------

### element

The DOM element or an array of DOM elements to set.

### object

Object with config params:

* progress: Value between 0 and 1;
* filter: Filter name to be applied, see list here: https://developer.mozilla.org/en-US/docs/Web/CSS/filter;
* start: Start value. If filter is 'drop-shadow', this param need to be an array;
* end: End value. If filter is 'drop-shadow', this param need to be an array;

Support
-------

To suggest a feature, report a bug or general discussion: https://github.com/JeanCPz/set-CSS-Filter/issues

Thanks
------

© 2015 Jean Paze. Released under the [MIT License](License.txt).

> CodePen [codepen.io/jeanpaze](http://codepen.io/jeanpaze/) <br>
> Twitter [@jpaze](http://twitter.com/jpaze) <br>
> Facebook [facebook.com/jeanpaze](https://www.facebook.com/jeanpaze)
