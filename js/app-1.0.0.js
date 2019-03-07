/* App scripts version 1.0.0 beta 1
-------------------------------------------------- */

(function ($) {

  /**
   * Toggle .toggle-me sibling element with "is-on/is-off"class
   * Add "parent-focus" class to parent with grouper class
   */
  $('.toggler').on('click', function (e) {
    $(this).siblings('.toggle-me').toggleClass('is-on');
    $(this).parent().closest('.grouper').toggleClass('parent-focus');
  });

  /**
   * Gets element by ID and assigns a given class
   * Add "parent-focus" class to parent with grouper class (if any)
   */
  $('[data-toggle-class]').on('click', function (e) {
    var selector = $(this);
    var cssClass = selector.data('toggle-class');
    var target = '#' + selector.attr('aria-controls');
    var hasAriaExpanded = $(this).attr('aria-expanded');
    $(target).toggleClass(cssClass);
    $(this).parent().closest('.grouper').toggleClass('parent-focus');
    
     // Has aria-expanded attribute - main expand/collapse button
     if (hasAriaExpanded && hasAriaExpanded.length) {
      $(this).attr('aria-expanded', function (_, attr) {
        return attr == 'true' ? false : true;
      });
    }
  });



  /**
   * Toggle tabs
   */
  $('[role="tab"]').on('click', function (e) {
    var tabId = $(this).attr('href');
    var tabs = $('[role="tab"]');
    var tabPanels = $('[role="tabpanel"]');
    // Set all tabs to aria-selected="false" 
    $(tabs).removeAttr('aria-selected');
    // Adding  hidden attr to all tab panels
    $(tabPanels).attr('hidden', true);
    // Set current tab to aria-selected="true"
    $(this).attr('aria-selected', true);
    // Removing hidden attr from current tab panel
    $(tabId).removeAttr('hidden').focus();
    e.preventDefault();
  });
  /**
   * Toggle acordion
   */
  $('.accordion-toggle').on('click', function (e) {
    $(this).attr('aria-expanded', function (_, attr) {
      return attr == 'true' ? false : true;
    });
    $(this).siblings('.accordion').attr('hidden', function (_, attr) {
      return !attr
    });
    if($(this).attr('aria-expanded') == 'true'){
      $(this).parent().closest('.grouper').toggleClass('parent-focus');
    }else{
      $(this).parent().closest('.grouper').removeClass('parent-focus');
    }
   
    e.preventDefault();
  });

  /**
   * Close/Colapse elements by clicking outside of them 
   */
  $(document).on('click', function (e) {
    // Colapse dropdowns by clicking outside of them 
    $('.grouper')
      .not($('.grouper').has($(e.target)))
      .removeClass('parent-focus')
      .children('.dropdown,.submenu')
      .removeClass('is-on');
  });


})(jQuery);