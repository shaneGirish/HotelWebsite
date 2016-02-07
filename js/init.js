(function($) {
  "use strict";

  /*-------------------------------------------------*/
  /* =  preloader
  /*-------------------------------------------------*/
  $(window).load(function() {
    $("#preloader").fadeOut("slow");
  });

  /*-------------------------------------------------*/
  /* =  preloader
  /*-------------------------------------------------*/
  $(document).ready(function() {

    var window_height = $(window).height();
    var screen_size = $(window).width();
    $('#subheader, #subheader .rslides li ').css('height', window_height);
    $(".console").hide();
    $('textarea').autosize();
    $('textarea').css("height", "50px");

    /*-------------------------------------------------*/
    /* =  scroll to top
    /*-------------------------------------------------*/
    var to_top_icon = $('#top');
    $(to_top_icon).hide();
    $(window).scroll(function() {
      if ($(this).scrollTop() > 75) {
        to_top_icon.fadeIn();
      } else {
        to_top_icon.fadeOut();
      }
    });

    /*-------------------------------------------------*/
    /* =  scroll on link
  	/*-------------------------------------------------*/
    if ($(window).width() < 768) {
      var top_ofset = $('header').height() + 40;
    } else {
      var top_ofset = $('header').height() + 91;
    }

    var top_ofset = $('header').height() + 40;

    $('header nav ul a,.findout-more ,.logo, .scroll-down, #top').smoothScroll({
      offset: -top_ofset,
      // one of 'top' or 'left'
      direction: 'top',
      // only use if you want to override default behavior
      scrollTarget: null,
      // fn(opts) function to be called before scrolling occurs.
      // `this` is the element(s) being scrolled
      beforeScroll: function() {},
      // fn(opts) function to be called after scrolling occurs.
      // `this` is the triggering element
      afterScroll: function() {},
      easing: 'easeInOutExpo',
      speed: 1000,
      // coefficient for "auto" speed
      autoCoefficent: 2,
      // $.fn.smoothScroll only: whether to prevent the default click action
      preventDefault: true
    });

    [].slice.call(document.querySelectorAll('.rslides_tabs')).forEach(function(nav) {
      new DotNav(nav, {
        callback: function(idx) {
          //console.log( idx )
        }
      });
    });

    /*-------------------------------------------------*/
    /* =  scroll over 
    /*-------------------------------------------------*/
    var navigation = $('header');
    $(window).scroll(function() {
      if ($(window).scrollTop() > (window_height - 156)) {
        navigation.addClass('change');
        navigation.delay(1000).queue(function() {
          $(this).addClass('animate')
        });
      } else {
        navigation.removeClass('change animate');
      }
    });

    /*-------------------------------------------------*/
    /* =  add text in button
    /*-------------------------------------------------*/
    $('#filters .filter').on('click', function() {
      var text = $(this).children('i').html();
      $('.filter-section .select-cat').html(text);
    });

    /*-------------------------------------------------*/
    /* =  Close navbar on click
    /*-------------------------------------------------*/
    $('.select-cat').on('click', function() {
      $(".filters").toggleClass('active');
    });
    $('.filter').on('click', function() {
      $('.filters').toggleClass('active');
    });

    /*-------------------------------------------------*/
    /* =  Close navbar on click
    /*-------------------------------------------------*/
    $(".bars").on("click", function() {
      $("nav").toggleClass('active');
      $("html").toggleClass('active-sidebar');
      $(".mobile-overlay").toggleClass('active');

    });

    $('header nav a').on('click', function() {
      $('nav').removeClass('active');
      $("html").removeClass('active-sidebar');
      $(".mobile-overlay").removeClass('active');
    });

    /*-------------------------------------------------*/
    /* =  Populate photos
    /*-------------------------------------------------*/
    var thumbnailOverrides = {
      "in 19.jpg": {dir: "562x237", className: "width2"},
      "in 10.jpg": {dir: "562x237", className: "width2"},
      "in 6.jpg": {dir: "562x237", className: "width2"},
      "in 15.jpg": {dir: "562x237", className: "width2"},
      "3 out.jpg": {dir: "562x237", className: "width2"},
      "12 out.jpg": {dir: "562x237", className: "width2"},
      "26 out.jpg": {dir: "562x237", className: "width2"},
      "27 out.jpg": {dir: "562x237", className: "width2"},
      "21 out.jpg": {dir: "562x237", className: "width2"},
      "30 out.jpg": {dir: "562x237", className: "width2"},
      "image.jpeg" : {dir: "280x476", className: "height2"},
      "2 out.jpg" : {dir: "280x476", className: "height2"},
      "in 4.jpg" : {dir: "280x476", className: "height2"},
      "in 16.jpg" : {dir: "280x476", className: "height2"},
      "in 18.jpg" : {dir: "280x476", className: "height2"},
      "1 out.jpg" : {dir: "280x476", className: "height2"},
      "16 out.jpg" : {dir: "280x476", className: "height2"},
      "17 out.jpg" : {dir: "280x476", className: "height2"}
    };
    var photos = {
      "View" : ["28 out.JPG", "29 out.JPG", "30 out.JPG", "31 out.JPG", "32 out.JPG", "33 out.JPG"],
      "Town" : ["24 out.JPG", "25 out.JPG", "26 out.JPG", "27 out.JPG", "22 out.JPG", "23 out.JPG"],
      "Resort" : ["2 out.jpg", "19 out.JPG", "20 out.jpg", "3 out.jpg", "4 out.jpg", "5 out.jpg", "7 out.jpg", "8 out.jpg", "9 out.jpg", "11 out.jpg", "12 out.jpg", "13 out.jpg", "14 out.jpg", "15 out.jpg", "16 out.jpg", "17 out.jpg", "18 out.jpg", "1 out.jpg", "10 out.jpg", "10a out.jpg"],
      "Apartments" : ["in 20.jpg", "in 3.jpg", "in 4.jpg", "in 5.jpg", "in 6.jpg", "in 7.jpg", "in 8.jpg", "in 9.jpg", "in 12.jpg", "in 13.jpg", "in 14.jpg", "in 15.jpg", "in 16.jpg", "in 17.jpg", "in 18.jpg", "in 19.jpg", "in 2.jpg", "image.jpeg", "in 1.jpg", "in 10.jpg", "in 11.jpg"]
    };    

    var photoBoxTemplate = _.template($("#photoBox").html());
    var wrapperDiv = $('#filter_content');
    _.each(photos, function(photoList, group) {
      _.each(photoList, function(photo) {
        var thumbnail = thumbnailOverrides[photo] || {dir: "280x237", className: ""};
        wrapperDiv.append(photoBoxTemplate({
          'group': group,
          'photo': "images/photos/" + group + "/" + photo,
          'thumbnail': "images/photos/_resized/" + thumbnail.dir + "/" + photo,
          'dimensionClass': thumbnail.className
        }));
      })
    });

    /*-------------------------------------------------*/
    /* =  img to background
    /*-------------------------------------------------*/
    $(".white-popup img , .isotope-item >a >img").each(function(i, elem) {
      var img = $(elem);
      var div = $("<div />").css({
        background: "url(" + img.attr("src") + ") no-repeat",
        width: img.width() + "px",
        height: img.height() + "px"
      });
      img.replaceWith(div);
      $(div).addClass('browse-images')
    });

    /*-------------------------------------------------*/
    /* =  Izotope
    /*-------------------------------------------------*/
    $.Isotope.prototype._getCenteredMasonryColumns = function() {
      this.width = this.element.width();

      var parentWidth = this.element.parent().width();

      // i.e. options.masonry && options.masonry.columnWidth
      var colW = this.options.masonry && this.options.masonry.columnWidth ||
        // or use the size of the first item
        this.$filteredAtoms.outerWidth(true) ||
        // if there's no items, use size of container
        parentWidth;

      var cols = Math.floor(parentWidth / colW);
      cols = Math.max(cols, 1);

      // i.e. this.masonry.cols = ....
      this.masonry.cols = cols;
      // i.e. this.masonry.columnWidth = ...
      this.masonry.columnWidth = colW;
    };

    $.Isotope.prototype._masonryReset = function() {
      // layout-specific props
      this.masonry = {};
      // FIXME shouldn't have to call this again
      this._getCenteredMasonryColumns();
      var i = this.masonry.cols;
      this.masonry.colYs = [];
      while (i--) {
        this.masonry.colYs.push(0);
      }
    };

    $.Isotope.prototype._masonryResizeChanged = function() {
      var prevColCount = this.masonry.cols;
      // get updated colCount
      this._getCenteredMasonryColumns();
      return (this.masonry.cols !== prevColCount);
    };

    $.Isotope.prototype._masonryGetContainerSize = function() {
      var unusedCols = 0,
        i = this.masonry.cols;
      // count unused columns
      while (--i) {
        if (this.masonry.colYs[i] !== 0) {
          break;
        }
        unusedCols++;
      }

      return {
        height: Math.max.apply(Math, this.masonry.colYs),
        // fit container to columns that have been used;
        width: (this.masonry.cols - unusedCols) * this.masonry.columnWidth
      };
    };

    // cache filter_content
    var $filter_content = $('#filter_content');
    // initialize isotope
    $filter_content.isotope({
      filter: ".Apartments",
      animationOptions: {
        duration: 750,
        queue: false
      }
    });
    // filter items when filter link is clicked
    $('.filters a').click(function() {
      var selector = $(this).attr('data-filter');
      $filter_content.isotope({
        filter: selector
      });
      return false;
    });

    /*-------------------------------------------------*/
    /* =  magnific popup 
    /*-------------------------------------------------*/
    var close_icon = '<svg fill="currentColor" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" \
         viewBox="0 0 50 50" enable-background="new 0 0 50 50" xml:space="preserve"> \
      <path fill-rule="evenodd" clip-rule="evenodd" d="M7.3,42.7c-9.8-9.8-9.8-25.6,0-35.4c9.8-9.8,25.6-9.8,35.4,0 \
        c9.8,9.8,9.8,25.6,0,35.4C32.9,52.4,17.1,52.4,7.3,42.7z M41.3,8.7c-9-9-23.5-9-32.5,0c-9,9-9,23.5,0,32.5c9,9,23.5,9,32.5,0 \
        C50.2,32.3,50.2,17.7,41.3,8.7z"/> \
      <path fill-rule="evenodd" clip-rule="evenodd" d="M32.5,16l1.5,1.5L17.5,34L16,32.5L32.5,16z"/> \
      <path fill-rule="evenodd" clip-rule="evenodd" d="M34,32.5L32.5,34L16,17.5l1.5-1.5L34,32.5z"/> \
      </svg>';

    $('.popup-modal').magnificPopup({
      type: 'inline',
      midClick: true,
      removalDelay: 50,
      callbacks: {
        open: function() {
          $('.mfp-close').empty().append(close_icon);
        },
        beforeOpen: function() {
          // just a hack that adds mfp-anim class to markup 
          this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
          this.st.mainClass = this.st.el.attr('data-effect');
        }
      }
    });

    $('.mfp-close').magnificPopup({
      mainClass: 'mfp-with-fade',
      removalDelay: 500, //delay removal by X to allow out-animation
      callbacks: {
        beforeClose: function() {
          this.content.addClass('hinge');
        },
        close: function() {
          this.content.removeClass('hinge');
        }
      },
      midClick: true
    });

    $('.popup-gallery').magnificPopup({
      delegate: 'a',
      type: 'image',
      removalDelay: 500,
      tLoading: 'Loading image #%curr%...',
      mainClass: 'mfp-img-mobile',
      fixedContentPos: true,
      gallery: {
        enabled: true,
        navigateByImgClick: true,
        preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
      },
      image: {
        tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
        titleSrc: function(item) {
          return item.el.attr('title') + '<small></small>';
        }
      },
      callbacks: {
        open: function() {
          $('.mfp-close').empty().append(close_icon);
        },
        beforeOpen: function() {
          // just a hack that adds mfp-anim class to markup 
          this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
          this.st.mainClass = this.st.el.attr('data-effect');
        }
      }
    });

    /*-------------------------------------------------*/
    /* =  slider subheader
  	/*-------------------------------------------------*/
    var owl = $("#slider1");

    owl.owlCarousel({

      navigation: false, // Show next and prev buttons
      slideSpeed: 500,
      paginationSpeed: 3000,
      singleItem: true,
      transitionStyle: "fade",
      autoPlay: true

    });
    $('#subheader .owl-pagination .owl-page').append('<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 16 16"preserveAspectRatio="none"><circle cx="8" cy="8" r="6.215"/></svg>');
    var container_wrap = '<div class="container nav-container"></div>';
    $('#subheader .owl-pagination').wrap(container_wrap);

    // Custom Navigation Events
    $(".next").on('click', function() {
      owl.trigger('owl.next');
    })
    $(".prev").on('click', function() {
      owl.trigger('owl.prev');
    })

    $('#slider1 .item >img').each(function(i, elem) {
      var img = $(elem);
      var div = $('<div />').css({
        background: 'url("' + img.attr('src') + '") no-repeat',
        width: img.width() + 'px',
        height: img.height() + 'px'
      });
      img.replaceWith(div);
      $(div).addClass('browse-images')
    });

    /*-------------------------------------------------*/
    /* =  slider pricing
    /*-------------------------------------------------*/
    if ($(window).width() < 670) {

      $("#pricing-slider").owlCarousel({
        items: 4, //10 items above 1000px browser width
        itemsDesktop: false, //5 items between 1000px and 901px
        itemsDesktopSmall: false, // betweem 900px and 601px
        itemsTablet: false, //2 items between 600 and 0
        itemsMobile: [670, 1] // itemsMobile disabled - inherit from itemsTablet option
      });

      // Custom Navigation Events
      $(".pricing-section .next").on("click", function() {
        $("#pricing-slider").trigger('owl.next');
      });
      $(".pricing-section .prev").on("click", function() {
        $("#pricing-slider").trigger('owl.prev');
      });

    } else {
      if (typeof $("#pricing-slider").data('owlCarousel') != 'undefined') {
        $("#pricing-slider").data('owlCarousel').destroy();
      }

    }

    $(window).on('resize', function() {
      var screen_size = $(window).width();

      if (screen_size <= 670) {
        var owl = $("#pricing-slider");

        owl.owlCarousel({
          items: 4, //10 items above 1000px browser width
          itemsDesktop: false, //5 items between 1000px and 901px
          itemsDesktopSmall: false, // betweem 900px and 601px
          itemsTablet: false, //2 items between 600 and 0
          itemsMobile: [670, 1] // itemsMobile disabled - inherit from itemsTablet option
        });

        // Custom Navigation Events
        $(".pricing-section .next").on("click", function() {
          owl.trigger('owl.next');
        });
        $(".pricing-section .prev").on("click", function() {
          owl.trigger('owl.prev');
        });

      } else {
        if (typeof $("#pricing-slider").data('owlCarousel') != 'undefined') {
          $("#pricing-slider").data('owlCarousel').destroy();
        }

      }
    }).trigger('resize');

    /*-------------------------------------------------*/
    /* =  animate objects
    /*-------------------------------------------------*/

    var $fadeInUp = $('#about .about__item, #pricing-slider .item , #customers ul,#customers .owl-pagination, .main-form .human-test div:nth-child(2)');
    var $fadeInLeft = $('section h3 ,#subheader h4, .heading-slogan-section h4, .heading-slogan-section h2 , #follow .tweet h3, .social form ,.theme h3,.main-form .test');
    var $fadeInRight = $('section .container >p, #subheader h1, .social ul, .main-form button.btn1, #filter .filters');
    var $fadeIn = $('.footer-main small, .main-form .input , #video .console');

    // InView - fadeIn

    if ($(window).width() >= 768) {
      $fadeIn.css('opacity', 0);
      $fadeInUp.css('opacity', 0);
      $fadeInLeft.css('opacity', 0);
      $fadeInRight.css('opacity', 0);

      $fadeIn.one('inview', function(event, visible) {
        if (visible) {
          $(this).addClass('animated fadeIn');
        }
      });

      // InView - fadeInDown
      $fadeInUp.one('inview', function(event, visible) {
        if (visible) {
          $(this).addClass('animated fadeInUp');
        }
      });
      // InView - fadeInLeft
      $fadeInLeft.one('inview', function(event, visible) {
        if (visible) {
          $(this).addClass('animated fadeInLeft');
        }
      });
      // InView - fadeInRight
      $fadeInRight.one('inview', function(event, visible) {
        if (visible) {
          $(this).addClass('animated fadeInRight');
        }
      });

    } else {

      $fadeIn.css('opacity', 1);
      $fadeInUp.css('opacity', 1);
      $fadeInLeft.css('opacity', 1);
      $fadeInRight.css('opacity', 1);

    }

    $(window).on('resize', function() {
      var screen_size = $(window).width();

      if (screen_size >= 768) {

        $fadeIn.css('opacity', 0);
        $fadeInUp.css('opacity', 0);
        $fadeInLeft.css('opacity', 0);
        $fadeInRight.css('opacity', 0);

        $fadeIn.one('inview', function(event, visible) {
          if (visible) {
            $(this).addClass('animated fadeIn');
          }
        });

        // InView - fadeInDown
        $fadeInUp.one('inview', function(event, visible) {
          if (visible) {
            $(this).addClass('animated fadeInUp');
          }
        });
        // InView - fadeInLeft
        $fadeInLeft.one('inview', function(event, visible) {
          if (visible) {
            $(this).addClass('animated fadeInLeft');
          }
        });
        // InView - fadeInRight
        $fadeInRight.one('inview', function(event, visible) {
          if (visible) {
            $(this).addClass('animated fadeInRight');
          }
        });

      } else {

        $fadeIn.css('opacity', 1);
        $fadeInUp.css('opacity', 1);
        $fadeInLeft.css('opacity', 1);
        $fadeInRight.css('opacity', 1);

      }
    }).trigger('resize');

    /*-------------------------------------------------*/
    /* =  map
    /*-------------------------------------------------*/

    function initialize() {
      var loc = new google.maps.LatLng(35.260145, 25.725041);

      var map = new google.maps.Map(document.getElementById("map"), {
        zoom: 16,
        center: loc,
        scrollwheel: false
      });

      var marker = new google.maps.Marker({ position: loc, map: map });

      google.maps.event.addListener(marker, 'click', function() {
        map.panTo(loc);
      });

      new google.maps.InfoWindow({
        content: document.getElementById("infobox1"),
      }).open(map, marker);
    }

    google.maps.event.addDomListener(window, 'load', initialize);
  });

})(jQuery);
