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


    /* ---- Lightbox: click any figure image to enlarge ------------------ */
    var figures = document.querySelectorAll(".plate-figure");

    if (figures.length) {
      var overlay = document.createElement("div");
      overlay.className = "lightbox";
      overlay.setAttribute("role", "dialog");
      overlay.setAttribute("aria-modal", "true");
      overlay.setAttribute("aria-label", "Enlarged image");
      overlay.innerHTML =
        '<button class="lightbox__close" type="button" aria-label="Close">&#10005;</button>' +
        '<img class="lightbox__img" alt="" />' +
        '<p class="lightbox__caption"></p>';
      document.body.appendChild(overlay);

      var oImg = overlay.querySelector(".lightbox__img");
      var oCap = overlay.querySelector(".lightbox__caption");
      var oClose = overlay.querySelector(".lightbox__close");
      var lastFocus = null;

      var open = function (src, alt, caption) {
        lastFocus = document.activeElement;
        oImg.src = src;
        oImg.alt = alt || "";
        oCap.textContent = caption || "";
        overlay.classList.add("is-open");
        document.body.classList.add("lightbox-open");
        oClose.focus();
      };

      var close = function () {
        overlay.classList.remove("is-open");
        document.body.classList.remove("lightbox-open");
        if (lastFocus) lastFocus.focus();
      };

      figures.forEach(function (fig) {
        var img = fig.querySelector("img");
        if (!img) return;

        /* Wrap the image in a button so it is keyboard reachable and
           announced correctly, then add the visible hint. */
        var btn = document.createElement("button");
        btn.type = "button";
        btn.className = "plate-figure__btn";
        btn.setAttribute("aria-label", "Enlarge image: " + (img.alt || "figure"));
        img.parentNode.insertBefore(btn, img);
        btn.appendChild(img);

        var hint = document.createElement("span");
        hint.className = "plate-figure__hint";
        hint.innerHTML =
          '<svg viewBox="0 0 24 24" aria-hidden="true">' +
          '<circle cx="11" cy="11" r="7"></circle>' +
          '<line x1="16" y1="16" x2="21" y2="21"></line>' +
          '<line x1="11" y1="8" x2="11" y2="14"></line>' +
          '<line x1="8" y1="11" x2="14" y2="11"></line>' +
          "</svg>Enlarge";
        btn.appendChild(hint);

        btn.addEventListener("click", function () {
          var cap = fig.querySelector("figcaption");
          open(img.currentSrc || img.src, img.alt, cap ? cap.textContent.trim() : "");
        });
      });

      overlay.addEventListener("click", function (e) {
        if (e.target === overlay || e.target === oClose) close();
      });

      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && overlay.classList.contains("is-open")) close();
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
