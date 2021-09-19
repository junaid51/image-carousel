("use strict");
(function (global) {
  /**
   *
   * @param {Add the HTML carousel container class name } container
   * @param {pass the images as an array} images
   * @returns
   */
  var zzCarousel = function (container, images) {
    container = container || "carousel-container";
    images = images || [];
    return new zzCarousel.init(`.${container}`, images);
  };

  var currentIndex = 0;

  var preloadImages = function (images) {
    images.forEach((image) => (new Image().src = image));
  };

  var createDots = function (images, context) {
    var dotContainer = document.createElement("div");
    dotContainer.className = "zz_car_dots";
    for (var i = 0; i < images.length; i++) {
      var span = document.createElement("span");
      span.className = "zz_car_dot";
      span.setAttribute("data-index", i);
      context.images[i] = {
        image: context.images[i],
        span,
      };
      dotContainer.appendChild(span);
    }
    dotContainer.addEventListener("click", function (e) {
      var t = e.target;
      if (t.nodeName === "SPAN") {
        var j = +t.getAttribute("data-index");
        j !== currentIndex &&
          context.gotoIndex(j, j > currentIndex ? "right" : "left");
      }
    });
    return dotContainer;
  };

  zzCarousel.prototype = {
    gotoIndex(index, direction = "right") {
      var _this = this;
      _this.images[currentIndex].span.className = "zz_car_dot";
      index =
        index < 0
          ? _this.images.length - 1
          : index > _this.images.length - 1
          ? 0
          : index;
      currentIndex = index;
      _this.images[currentIndex].span.className = "zz_car_dot active";
      _this.image.className = "zz_car_img hidden";
      setTimeout(function () {
        _this.image.className = "zz_car_img " + direction;
        _this.image.src = _this.images[currentIndex].image;
      }, 0);
      return this;
    },
    next() {
      this.gotoIndex(currentIndex + 1, "right");
      return this;
    },
    prev() {
      this.gotoIndex(currentIndex - 1, "left");
      return this;
    },
  };

  zzCarousel.init = function (container, images) {
    var _this = this;
    _this.container = container;
    _this.images = images;

    preloadImages(images);

    // Attach to the container
    var parent = document.querySelector(container);
    var imgContainer = document.createElement("div");
    var prevButton = document.createElement("button");
    var nextButton = document.createElement("button");

    prevButton.addEventListener("click", this.prev.bind(this));
    nextButton.addEventListener("click", this.next.bind(this));

    var img1 = document.createElement("img");

    imgContainer.className = "zz_car_img-container";

    prevButton.className = "zz_car_prev";
    nextButton.className = "zz_car_next";
    prevButton.innerHTML = "&#10094;";
    nextButton.innerHTML = "&#10095;";
    prevButton.setAttribute("type", "button");
    nextButton.setAttribute("type", "button");

    (img1.alt = "Loading..."), (img1.width = "500"), (img1.height = "300");
    _this.image = img1;

    imgContainer.append(
      prevButton,
      nextButton,
      img1,
      createDots(images, _this)
    );
    parent.appendChild(imgContainer);
    _this.gotoIndex(currentIndex);
  };

  zzCarousel.init.prototype = zzCarousel.prototype;
  global.Carousel = global.CS = zzCarousel;
})(window);
