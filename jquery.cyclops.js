/*
 * jquery.cyclops
 * https://github.com/t0mburton/jquery.cyclops
 * Copyright (c) 2016 - Tom Burton
 * Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
 * Version: 1.0.0
 */
(function($) {
  $.cyclops = {
    defaults: {
      delay: 10000,
      maxItems: 5,
      animate: false,
    }
  }
  $.fn.extend({
    cyclops: function(config) {
      var config = $.extend({}, $.cyclops.defaults, config);

      return this.each(function() {
        var maxVisibleItems = config.maxItems;
        var items;

        //only lists and tables are supported
        if ($(this).is("ol") || $(this).is("ul")) {
          items = $(this).children('li');
        } else if ($(this).is("table")) {
          items = $(this).children('tbody').children('tr');
        } else {
          console.warn("Cyclops - Unsupported element");
          return;
        }

        var totalItems = items.length - 1;

        //init indexes
        var startVisibleIndex = 0;
        var endVisibleIndex = maxVisibleItems > totalItems ? totalItems : maxVisibleItems - 1;

        //start
        cycle();

        function cycle() {
          items.filter(":lt(" + startVisibleIndex + "),:gt(" + endVisibleIndex + ")").hide();

          if (config.animate) {
            items.not(":lt(" + startVisibleIndex + "),:gt(" + endVisibleIndex + ")").slideDown();
          } else {
            items.not(":lt(" + startVisibleIndex + "),:gt(" + endVisibleIndex + ")").show();
          }


          //loop back around once we reach the end of the items
          if (endVisibleIndex >= totalItems) {
            startVisibleIndex = 0;
            endVisibleIndex = maxVisibleItems - 1;
          } else { //move to next batch of items
            startVisibleIndex = endVisibleIndex + 1;
            ((endVisibleIndex + maxVisibleItems) >= totalItems) ?
            endVisibleIndex = totalItems: endVisibleIndex = (endVisibleIndex + maxVisibleItems);
          }

          //repeat
          setTimeout(cycle, config.delay);
        };
      })
    }
  })
})(jQuery);
