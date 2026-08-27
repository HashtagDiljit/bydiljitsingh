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
    /* Named plateFigs, not figures: the showcase above already uses a
       `figures` variable, and `var` is function-scoped, so reusing the
       name overwrote it and froze the showcase on its first image. */
    var plateFigs = document.querySelectorAll(".plate-figure");

    if (plateFigs.length) {
      var overlay = document.createElement("div");
      overlay.className = "lightbox";
      overlay.setAttribute("role", "dialog");
      overlay.setAttribute("aria-modal", "true");
      overlay.setAttribute("aria-label", "Enlarged image");
      overlay.innerHTML =
        '<button class="lightbox__close" type="button" aria-label="Close">&#10005;</button>' +
        '<img class="lightbox__img" alt="" />' +
        '<video class="lightbox__video" autoplay loop playsinline controls></video>' +
        '<p class="lightbox__caption"></p>';
      document.body.appendChild(overlay);

      var oImg = overlay.querySelector(".lightbox__img");
      var oVid = overlay.querySelector(".lightbox__video");
      var oCap = overlay.querySelector(".lightbox__caption");
      var oClose = overlay.querySelector(".lightbox__close");
      var lastFocus = null;

      var open = function (src, alt, caption, isVideo) {
        lastFocus = document.activeElement;
        if (isVideo) {
          oVid.src = src;
          oVid.hidden = false;
          oImg.hidden = true;
          oImg.removeAttribute("src");
          oVid.play().catch(function () {});
        } else {
          oImg.src = src;
          oImg.alt = alt || "";
          oImg.hidden = false;
          oVid.hidden = true;
          oVid.pause();
          oVid.removeAttribute("src");
        }
        oCap.textContent = caption || "";
        oCap.hidden = !caption;
        overlay.classList.add("is-open");
        document.body.classList.add("lightbox-open");
        /* The overlay is visibility:hidden until its transition runs, and
           focus() is ignored inside a hidden subtree. Wait for the element
           to actually become visible before moving focus into the dialog. */
        var focusWhenVisible = function () {
          if (getComputedStyle(overlay).visibility === "visible") {
            oClose.focus();
          } else {
            window.requestAnimationFrame(focusWhenVisible);
          }
        };
        window.requestAnimationFrame(focusWhenVisible);
      };

      var close = function () {
        overlay.classList.remove("is-open");
        document.body.classList.remove("lightbox-open");
        oVid.pause();
        if (lastFocus) lastFocus.focus();
      };

      plateFigs.forEach(function (fig) {
        var img = fig.querySelector("img, video");
        if (!img) return;
        var isVideo = img.tagName.toLowerCase() === "video";

        /* Wrap the image in a button so it is keyboard reachable and
           announced correctly, then add the visible hint. */
        var btn = document.createElement("button");
        btn.type = "button";
        btn.className = "plate-figure__btn";
        btn.setAttribute(
          "aria-label",
          (isVideo ? "Play full size: " : "Enlarge image: ") +
            (img.alt || img.getAttribute("aria-label") || "figure")
        );
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
          open(
            img.currentSrc || img.src,
            img.alt,
            cap ? cap.textContent.trim() : "",
            isVideo
          );
        });
      });

      overlay.addEventListener("click", function (e) {
        if (e.target === overlay || e.target === oClose) close();
      });

      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && overlay.classList.contains("is-open")) close();
      });
    }


    /* ---- Gallery: reveal further batches as you approach the bottom --- */
    var batches = document.querySelectorAll(".gallery__batch");
    var sentinel = document.querySelector("[data-gallery-sentinel]");

    if (batches.length > 1 && sentinel && "IntersectionObserver" in window) {
      /* Hide the later batches only now, so a visitor without JavaScript
         still gets the whole gallery in one go. */
      var shown = 1;
      for (var i = 1; i < batches.length; i++) {
        batches[i].hidden = true;
      }

      var moreIO = new IntersectionObserver(
        function (entries) {
          if (!entries[0].isIntersecting) return;
          if (shown >= batches.length) {
            moreIO.disconnect();
            return;
          }
          batches[shown].hidden = false;
          shown += 1;
          if (shown >= batches.length) {
            moreIO.disconnect();
            return;
          }
          /* The sentinel often stays inside the root margin after a batch
             is revealed. IntersectionObserver only reports transitions, so
             without re-arming it the callback would never fire again and
             the gallery would stop loading after one batch. */
          moreIO.unobserve(sentinel);
          window.requestAnimationFrame(function () {
            moreIO.observe(sentinel);
          });
        },
        { rootMargin: "0px 0px 600px 0px" }
      );

      moreIO.observe(sentinel);
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
