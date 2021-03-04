document.addEventListener("DOMContentLoaded", function () {
  let swiperMain = new Swiper(".swiper-main", {
    slidesPerView: 1,
    loop: true,
    autoplay: {
      delay: 8000,
    },
    navigation: {
      nextEl: '.selectornx1',
      prevEl: '.selectorpr1',
    },
  });

  let swiperBrand = new Swiper(".swiper-brand", {
    slidesPerView: 7,
    speed: 500,
    autoplay: {
      delay: 8000,
    },

    navigation: {
      nextEl: '.selectornx2',
      prevEl: '.selectorpr2',
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      350: {
        slidesPerView: 2,
      },
      450: {
        slidesPerView: 3,
      },
      575: {
        slidesPerView: 4,
      },
      768: {
        slidesPerView: 5,
      },
      991: {
        slidesPerView: 6,
      },
      1200: {
        slidesPerView: 7,
      },
    },
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const $megamenuParentListItem = $(".megamenu-nav > li.is-parent");

  const $megamenuBackground = $("#megamenu-background");

  const isTouch = "ontouchstart" in window || !!navigator.msMaxTouchPoints;

  const handleMenuItemOpenState = (elem) => {
    elem.addClass("is-open");
    elem.find("a").first().attr("aria-expanded", true);
  };

  const handleMenuItemCloseState = (elem) => {
    elem.removeClass("is-open");
    elem.find("a").first().attr("aria-expanded", false);
  };

  const openMegamenu = (bgElem, heightVal) => {
    $("body").addClass("megamenu-visible");
    bgElem.height(heightVal);
  };

  const closeMegamenu = (bgElem, heightVal) => {
    $("body").removeClass("megamenu-visible");
    bgElem.height(heightVal);
  };

  const $megamenuContentElem = $(".megamenu-nav .megamenu-content");

  const getTallestMenuHeight = () => {
    let maxHeight = 0;
    $megamenuContentElem.each((index, item) => {
      if ($(item).outerHeight() > maxHeight) {
        maxHeight = $(item).outerHeight();
      }
    });
    return maxHeight;
  };

  const debouncedClose = _.debounce(closeMegamenu, 400);
  const throttledContentHeightCount = _.throttle(getTallestMenuHeight, 100);

  let megamenuContentMaxHeight = 0;

  window.onresize = () => {
    megamenuContentMaxHeight = throttledContentHeightCount();
  };

  $(() => {
    megamenuContentMaxHeight = getTallestMenuHeight();

    $megamenuParentListItem.each((index, item) => {
      if (!isTouch) {
        $(item).hoverIntent({
          sensitivity: 10,
          interval: 50,
          over: () => {
            debouncedClose.cancel();
            $megamenuParentListItem.removeClass("is-open");
            handleMenuItemOpenState($(item));
            openMegamenu($megamenuBackground, megamenuContentMaxHeight);
          },
          out: () => {
            handleMenuItemCloseState($(item));
            debouncedClose($megamenuBackground, 0);
          },
        });
      }

      $(item)
        .find("a")
        .first()
        .on("click touch", () => {
          if (!$(item).hasClass("is-open")) {
            $megamenuParentListItem.removeClass("is-open");
            handleMenuItemOpenState($(item));
            openMegamenu($megamenuBackground, megamenuContentMaxHeight);
          } else {
            handleMenuItemCloseState($(item));
            closeMegamenu($megamenuBackground, 0);
          }
        });
    });

    $("#megamenu-dim").on("click touch", (e) => {
      if ($("body").hasClass("megamenu-visible")) {
        e.preventDefault();
        $megamenuParentListItem.removeClass("is-open");
        closeMegamenu($megamenuBackground, 0);
      }
    });
  });
});

jQuery(window).on("scroll", function () {
  scrolling();

  function scrolling() {
    var header = jQuery(".header");
    var headerHeight = header.height();
    var scrollTop = jQuery(window).scrollTop();
    var flag = true;

    if (scrollTop > headerHeight && flag) {
      flag = false;
      $(".header__wrappers").addClass("active");
      $('.tables__panel').toggleClass('active', $(this).scrollTop() > 500);
    } else {
      flag = true;
      $(".header__wrappers").removeClass("active");
   
    }
  }
});

let stickyEl = new Sticksy.initializeAll('.js-sticky-widget', {topSpacing: 120, listen: true })
stickyEl.onStateChanged = function (state) {
	if (state === 'fixed') stickyEl.nodeRef.classList.add('widget--sticky')
	else stickyEl.nodeRef.classList.remove('widget--sticky')
}

AOS.init({
  duration: 900,
  debounceDelay: 50,
});
