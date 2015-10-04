/*!
 * VERSION: 0.1.1
 * DATE: 2015-09-27
 *
 * Copyright 2015, Jean Paze (@jpaze)
 * Released under MIT license
 */
(function (root, factory) {
  var setCSSFilter = factory();

  if (typeof exports === 'object') {
    module.exports = setCSSFilter;
  } else if (typeof define === 'function' && define.amd) {
    define([], function () {
      return (root.returnExportsGlobal = setCSSFilter);
    });
  } else {
    root.setCSSFilter = setCSSFilter;
  }
}(this, function () {
  var setCSSFilter = function( target, obj ){
    if( target.length ){
      for (var i = 0; i < target.length; i++) {
        setCSSFilter( target[ i ], obj );
      };
      return;
    };

    var styles = window.getComputedStyle(document.documentElement, '');
    var vendorPrefix = (Array.prototype.slice.call(styles).join('').match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o']))[1];
    var prop = (vendorPrefix === 'webkit') ? '-webkit-filter' : 'filter';
    var progress = ( obj.progress * 100 ) >> 0;
    var noDS = obj.filter != 'drop-shadow';
    var filterProgress = noDS ? ( Math.abs( obj.start - obj.end ) / 100 * progress ) : 0;
    var value = noDS ? ( ( obj.start < obj.end ) ? obj.start + filterProgress : obj.start - filterProgress ) : 0;
    var currentFilters = getFilters( { target:target, remove:obj.filter, prop:prop } );
    var addFilter;
    var unit = ( obj.filter == 'blur' ) ? 'px' : '';
        unit = ( obj.filter == 'hue-rotate' ) ? 'deg' : unit;
        unit = ( obj.filter != 'hue-rotate' && obj.filter != 'blur' ) ? '%' : unit;

    if( !noDS ){
        var startX = obj.start[ 0 ];
        var startY =  obj.start[ 1 ];
        var startBlur = obj.start[ 2 ];
        var startColor = obj.start[ 3 ] || '#000000';
        var startOpacity = obj.start[ 4 ] || 0;

        var endX = obj.end[ 0 ];
        var endY =  obj.end[ 1 ];
        var endBlur = obj.end[ 2 ];
        var endColor = obj.end[ 3 ] || '#000000';
        var endOpacity = obj.end[ 4 ] || 0;

        var incX = startX + Math.abs( startX - endX ) / 100 * progress;
            incX = ( startX > endX ) ? ( startX - Math.abs( startX - endX ) / 100 * progress ) : incX;
        var incY = startY + Math.abs( startY - endY ) / 100 * progress;
            incY = ( startY > endY ) ? ( startY - Math.abs( startY - endY ) / 100 * progress ) : incY;
        var incBlur = startBlur + Math.abs( startBlur - endBlur ) / 100 * progress;
            incBlur = ( startBlur > endBlur ) ? ( startBlur - Math.abs( startBlur - endBlur ) / 100 * progress ) : incBlur;
        var incOpacity = startOpacity + Math.abs( startOpacity - endOpacity ) / 100 * progress;
            incOpacity = ( startOpacity > endOpacity ) ? ( startOpacity - Math.abs( startOpacity - endOpacity ) / 100 * progress ) : incOpacity;

        var startRed = parseInt( startColor.substring( 1, 3 ), 16 );
        var startGreen = parseInt( startColor.substring( 3, 5 ), 16 );
        var startBlue = parseInt(startColor.substring( 5, 7 ), 16 );

        var endRed = parseInt( endColor.substring( 1, 3 ), 16 );
        var endGreen = parseInt( endColor.substring( 3, 5 ), 16 );
        var endBlue = parseInt( endColor.substring( 5, 7 ), 16 );

        var redVal = parseInt( startRed + Math.abs( startRed - endRed ) / 100 * progress );
            redVal = ( startRed > endRed ) ? parseInt( startRed - Math.abs( startRed - endRed ) / 100 * progress ) : redVal;
            redVal = ( redVal < 255 ) ? redVal : 255;

        var greenVal = parseInt( startGreen + Math.abs( startGreen - endGreen ) / 100 * progress );
            greenVal = ( startGreen > endGreen ) ? parseInt( startGreen - Math.abs( startGreen - endGreen ) / 100 * progress ) : greenVal;
            greenVal = ( greenVal < 255 ) ? greenVal : 255;

        var blueVal = parseInt( startBlue + Math.abs( startBlue - endBlue ) / 100 * progress );
            blueVal = ( startBlue > endBlue ) ? parseInt( startBlue - Math.abs( startBlue - endBlue ) / 100 * progress ) : blueVal;
            blueVal = ( blueVal < 255 ) ? blueVal : 255;

        //console.log( '[ setCSSFilter ] | currentFilters: ' + currentFilters );

        addFilter = 'drop-shadow(' + incX + 'px ' + incY + 'px ' + incBlur + 'px rgba(' + redVal + ',' + greenVal + ',' + blueVal + ',' + incOpacity + ') )';
    } else {
        //console.log( '[ setCSSFilter ] | currentFilters: ' + currentFilters );

        addFilter = obj.filter + '(' + value + unit + ')';
    };

    var setFilters = ( currentFilters.indexOf( '[REPLACE]' ) != -1 ) ? currentFilters.replace( '[REPLACE]', addFilter ) : addFilter + ' ' + currentFilters;

    target.style[ prop ] = setFilters;

    //console.log( '[ setCSSFilter ] | SET: ' + setFilters );
    //console.log( '[ setCSSFilter ] | COMPUTED: ' + ( getComputedStyle( target )[ prop ] ) );
    //console.log( '[ setCSSFilter ] | ------------- ' );
  };

  function getFilters( obj ) {
      var currentFilters = getStyle( obj.target, obj.prop ).split( ' ' );
      var isDS = ( obj.remove == 'drop-shadow' );
      var strFilters = '';

      for( var i = 0; i < currentFilters.length; i++ ){
          var invalidItem = ( currentFilters[ i ].substr( 0, 1 ) == '-' || !isNaN( currentFilters[ i ].substr( 0, 1 ) ) );
          var append = ( i < ( currentFilters.length - 1 ) ) ? ' ' : '';
          var patt = new RegExp( obj.remove );

          if( patt.test( currentFilters[ i ] ) ){
              if( !isDS && invalidItem ){
                  currentFilters[ ( i - 1 ) ] += ' ' + currentFilters[ i ];

                  currentFilters.splice( i, 1 );
                  i--;
              };

              strFilters += '[REPLACE]' + append;
          } else if( isDS && invalidItem ){
              currentFilters.splice( i, 1 );
              i--;
           } else {
              strFilters += currentFilters[ i ] + append;
          };
      };

      return ( strFilters == 'none' ) ? '' : strFilters;
  };

  function getStyle(el, cssprop){
      if (el.currentStyle)
          return el.currentStyle[cssprop]
      else if (document.defaultView && document.defaultView.getComputedStyle)
          return document.defaultView.getComputedStyle(el, '')[cssprop]
      else
          return el.style[cssprop]
  };

  return setCSSFilter;
}));
