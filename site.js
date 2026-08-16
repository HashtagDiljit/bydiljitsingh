/* Progressive enhancement. The page renders fully without this file;
   it only adds the load sequence, scroll reveals, the showcase image
   swap, and parallax. All motion is disabled under reduced-motion. */
(function () {
  document.documentElement.classList.add("js");

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function ready(fn) {
    if (document.readyState !== "loading") fn();
    else document.addEventListener("DOMContentLoaded", fn);
  }

  ready(function () {
    /* ---- Scroll reveals ---------------------------------------------- */
    var reveals = document.querySelectorAll(".reveal");

    if (reveals.length) {
      if (reduced || !("IntersectionObserver" in window)) {
        reveals.forEach(function (el) {
          el.classList.add("is-visible");
        });
      } else {
        var io = new IntersectionObserver(
          function (entries) {
            entries.forEach(function (e) {
              if (e.isIntersecting) {
                e.target.classList.add("is-visible");
                io.unobserve(e.target);
              }
            });
          },
          { rootMargin: "0px 0px -12% 0px", threshold: 0.08 }
        );
        reveals.forEach(function (el) {
          io.observe(el);
        });
      }
    }

    /* ---- Showcase: swap the sticky image as items scroll past --------- */
    var items = document.querySelectorAll(".showcase__item");
    var figures = document.querySelectorAll(".showcase__media figure");

    if (items.length && figures.length && "IntersectionObserver" in window) {
      var setActive = function (index) {
        figures.forEach(function (f, i) {
          f.classList.toggle("is-active", i === index);
        });
        items.forEach(function (it, i) {
          it.classList.toggle("is-active", i === index);
        });
      };

      setActive(0);

      var showcaseIO = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (e) {
            if (e.isIntersecting) {
              var idx = parseInt(e.target.getAttribute("data-index"), 10);
              if (!isNaN(idx)) setActive(idx);
            }
          });
        },
        /* Narrow band across the middle of the viewport: whichever item
           crosses it becomes the active image. */
        { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
      );

      items.forEach(function (el) {
        showcaseIO.observe(el);
      });
    }

    /* ---- Parallax ----------------------------------------------------- */
    var layers = document.querySelectorAll(".parallax");

    if (layers.length && !reduced) {
      var ticking = false;

      var update = function () {
        var vh = window.innerHeight;
        layers.forEach(function (el) {
          var rect = el.getBoundingClientRect();
          if (rect.bottom < -200 || rect.top > vh + 200) return;
          var speed = parseFloat(el.getAttribute("data-speed")) || 0.08;
          /* Progress runs -1 to 1 as the element crosses the viewport */
          var progress = (rect.top + rect.height / 2 - vh / 2) / vh;
          el.style.transform =
            "translate3d(0," + (-progress * speed * 100).toFixed(2) + "px,0)";
        });
        ticking = false;
      };

      var onScroll = function () {
        if (!ticking) {
          ticking = true;
          window.requestAnimationFrame(update);
        }
      };

      update();
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll, { passive: true });
    }
  });
})();
