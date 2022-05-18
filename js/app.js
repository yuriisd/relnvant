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
            if (bodyLockStatus && e.target.closest(".icon-menu")) {
                bodyLockToggle();
                document.documentElement.classList.toggle("menu-open");
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
    if (document.querySelector(".wrapper")) {
        function bindModal(trigger, modal, close) {
            trigger = document.querySelector(trigger), modal = document.querySelector(modal), 
            close = document.querySelector(close);
            const iframe = document.querySelector(".youtube__iframe");
            trigger.addEventListener("click", (e => {
                e.preventDefault();
                modal.style.display = "flex";
                document.querySelector("body").style.overflow = "hidden";
                iframe.src = "https://www.youtube.com/embed/jlCFcieKZf8?autoplay=1";
            }));
            close.addEventListener("click", (() => {
                modal.style.display = "none";
                document.querySelector("body").style.overflow = "visible";
                iframe.src = "";
            }));
            modal.addEventListener("click", (e => {
                if (e.target === modal) {
                    modal.style.display = "none";
                    document.querySelector("body").style.overflow = "visible";
                    iframe.src = "";
                }
            }));
        }
        bindModal(".play__btn", ".modal__wrapper", ".modal__close");
        AOS.init();
    }
    function numCounter(selector, number, time, step) {
        const counter = document.querySelector(selector);
        let res = 0;
        const allTime = Math.round(time / (number / step));
        let interval = setInterval((() => {
            res += step;
            if (res === number) clearInterval(interval);
            counter.innerHTML = res;
        }), allTime);
    }
    numCounter("#customers", 972, 2500, 2);
    numCounter("#financial", 181, 3800, 1);
    numCounter("#environmental", 98, 3500, 1);
    numCounter("#business", 746, 2700, 2);
    AOS.init();
})();