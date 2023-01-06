(() => {
    "use strict";
    function isWebp() {
        function testWebP(callback) {
            let webP = new Image;
            webP.onload = webP.onerror = function() {
                callback(2 == webP.height);
            };
            webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
        }
        testWebP((function(support) {
            let className = true === support ? "webp" : "no-webp";
            document.documentElement.classList.add(className);
        }));
    }
    let bodyLockStatus = true;
    let bodyLockToggle = (delay = 500) => {
        if (document.documentElement.classList.contains("lock")) bodyUnlock(delay); else bodyLock(delay);
    };
    let bodyUnlock = (delay = 500) => {
        let body = document.querySelector("body");
        if (bodyLockStatus) {
            let lock_padding = document.querySelectorAll("[data-lp]");
            setTimeout((() => {
                for (let index = 0; index < lock_padding.length; index++) {
                    const el = lock_padding[index];
                    el.style.paddingRight = "0px";
                }
                body.style.paddingRight = "0px";
                document.documentElement.classList.remove("lock");
            }), delay);
            bodyLockStatus = false;
            setTimeout((function() {
                bodyLockStatus = true;
            }), delay);
        }
    };
    let bodyLock = (delay = 500) => {
        let body = document.querySelector("body");
        if (bodyLockStatus) {
            let lock_padding = document.querySelectorAll("[data-lp]");
            for (let index = 0; index < lock_padding.length; index++) {
                const el = lock_padding[index];
                el.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
            }
            body.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
            document.documentElement.classList.add("lock");
            bodyLockStatus = false;
            setTimeout((function() {
                bodyLockStatus = true;
            }), delay);
        }
    };
    function menuInit() {
        if (document.querySelector(".icon-menu")) document.addEventListener("click", (function(e) {
            if (bodyLockStatus && e.target.closest(".icon-menu") && !document.querySelector(".menu__icon").disabled) {
                bodyLockToggle();
                document.querySelector(".menu__body").style.paddingTop = document.querySelector(".page").getBoundingClientRect().top + "px";
                document.querySelector(".header__menu").classList.toggle("menu-open");
                document.querySelector(".menu__icon").classList.toggle("menu-open");
                document.querySelector(".user-menu__button").toggleAttribute("disabled");
                if (document.querySelector(".menu__icon").classList.contains("menu-open")) document.querySelector(".menu__body").style.paddingTop = document.querySelector("main").getBoundingClientRect().top + "px"; else setTimeout((() => {
                    document.querySelector(".menu__body").style.paddingTop = "0px";
                }), 500);
            }
        }));
        if (document.querySelector(".user-menu__button")) document.addEventListener("click", (function(e) {
            if (bodyLockStatus && e.target.closest(".user-menu__button") && !document.querySelector(".user-menu__button").disabled) {
                bodyLockToggle();
                document.querySelector(".user-menu").classList.toggle("menu-open");
                document.querySelector(".user-menu__button").classList.toggle("menu-open");
                document.querySelector(".menu__icon").toggleAttribute("disabled");
                if (document.querySelector(".user-menu").classList.contains("menu-open")) document.querySelector(".user-menu__body").style.paddingTop = document.querySelector("main").getBoundingClientRect().top + "px"; else setTimeout((() => {
                    document.querySelector(".user-menu__body").style.paddingTop = "0px";
                }), 500);
            }
        }));
    }
    let addWindowScrollEvent = false;
    setTimeout((() => {
        if (addWindowScrollEvent) {
            let windowScroll = new Event("windowScroll");
            window.addEventListener("scroll", (function(e) {
                document.dispatchEvent(windowScroll);
            }));
        }
    }), 0);
    window["FLS"] = true;
    isWebp();
    menuInit();
})();