console.log('%cCopyright © 2024 zyyo.net',
    'background-color: #ff00ff; color: white; font-size: 24px; font-weight: bold; padding: 10px;'
);
console.log('%c   /\\_/\\', 'color: #8B4513; font-size: 20px;');
console.log('%c  ( o.o )', 'color: #8B4513; font-size: 20px;');
console.log(' %c  > ^ <', 'color: #8B4513; font-size: 20px;');
console.log('  %c /  ~ \\', 'color: #8B4513; font-size: 20px;');
console.log('  %c/______\\', 'color: #8B4513; font-size: 20px;');

document.addEventListener('contextmenu', function (event) {
    event.preventDefault();
});

function handlePress(event) {
    this.classList.add('pressed');
}

function handleRelease(event) {
    this.classList.remove('pressed');
}

function handleCancel(event) {
    this.classList.remove('pressed');
}

var buttons = document.querySelectorAll('.projectItem');
buttons.forEach(function (button) {
    button.addEventListener('mousedown', handlePress);
    button.addEventListener('mouseup', handleRelease);
    button.addEventListener('mouseleave', handleCancel);
    button.addEventListener('touchstart', handlePress);
    button.addEventListener('touchend', handleRelease);
    button.addEventListener('touchcancel', handleCancel);
});

function toggleClass(selector, className) {
    var elements = document.querySelectorAll(selector);
    elements.forEach(function (element) {
        element.classList.toggle(className);
    });
}

function wx(imageURL) {
    var tcMainElement = document.querySelector(".tc-img");
    if (imageURL) {
        tcMainElement.src = imageURL;
    }
    toggleClass(".tc-main", "active");
    toggleClass(".tc", "active");
}

var tc = document.getElementsByClassName('tc');
var tc_main = document.getElementsByClassName('tc-main');
tc[0].addEventListener('click', function (event) {
    wx();
});
tc_main[0].addEventListener('click', function (event) {
    event.stopPropagation();
});

function left() {
    toggleClass(".left-main", "left-main-open");
    toggleClass(".left", "left-open");
}

function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

function getCookie(name) {
    var nameEQ = name + "=";
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        while (cookie.charAt(0) == ' ') {
            cookie = cookie.substring(1, cookie.length);
        }
        if (cookie.indexOf(nameEQ) == 0) {
            return cookie.substring(nameEQ.length, cookie.length);
        }
    }
    return null;
}

document.addEventListener('DOMContentLoaded', function () {

    var html = document.querySelector('html');
    var themeState = getCookie("themeState") || "Light";
    var svgItems = document.getElementsByTagName("svg");
    var tanChiShe = document.getElementById("tanChiShe");


    function changeTheme(theme) {

        tanChiShe.src = "/static/svg/snake-" + theme + ".svg";
        //切换贪吃蛇
        html.dataset.theme = theme;
        //设置css变量主题
        //不可调换位置,必须在设置css变量后,获取当前css变量的svgcolor
        var svgcolor = getComputedStyle(document.documentElement).getPropertyValue('--svgcolor')
        //获取当前主题svg颜色值
        for (var i = 0; i < svgItems.length; i++) {
            var paths = svgItems[i].getElementsByTagName("path");
            for (var j = 0; j < paths.length; j++) {
                paths[j].setAttribute("fill", svgcolor);
            }
        }
        setCookie("themeState", theme, 365);
        themeState = theme;
    }


    var Checkbox = document.getElementById('myonoffswitch')
    Checkbox.addEventListener('change', function () {
        if (themeState == "Dark") {
            changeTheme("Light");
        } else if (themeState == "Light") {
            changeTheme("Dark");
        } else {
            changeTheme("Dark");
        }
    });


    if (themeState == "Dark") {
        Checkbox.checked = false;
    }

    changeTheme(themeState);


    var pageLoading = document.querySelector("#Sharon-loading");
    setTimeout(function () {
        pageLoading.style.opacity = '0';

    }, 100);


    var fpsElement = document.createElement('div');
    fpsElement.id = 'fps';
    fpsElement.style.zIndex = '10000';
    fpsElement.style.position = 'fixed';
    fpsElement.style.left = '0';
    document.body.insertBefore(fpsElement, document.body.firstChild);

    var showFPS = (function () {
        var requestAnimationFrame = window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (callback) {
                window.setTimeout(callback, 1000 / 60);
            };

        var fps = 0,
            last = Date.now(),
            offset, step, appendFps;

        step = function () {
            offset = Date.now() - last;
            fps += 1;

            if (offset >= 1000) {
                last += offset;
                appendFps(fps);
                fps = 0;
            }

            requestAnimationFrame(step);
        };

        appendFps = function (fpsValue) {
            fpsElement.textContent = 'FPS: ' + fpsValue;
        };

        step();
    })();
});


// 鼠标拖尾
(function fairyDustCursor() {
    var particles = [];

    function init() {
        bindEvents();
        loop();
    }

    function bindEvents() {
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('touchmove', onTouchMove);
        document.addEventListener('touchstart', onTouchMove);
    }

    function onTouchMove(e) {
        if (e.touches.length > 0) {
            for (var i = 0; i < e.touches.length; i++) {
                addParticle(e.touches[i].clientX + window.scrollX, e.touches[i].clientY + window.scrollY);
            }
        }
    }

    function onMouseMove(e) {
        addParticle(e.clientX + window.scrollX, e.clientY + window.scrollY);
    }

    function addParticle(x, y) {
        var particle = new Particle();
        particle.init(x, y);
        particles.push(particle);
    }

    function updateParticles() {
        for (var i = particles.length - 1; i >= 0; i--) {
            particles[i].update();
            if (particles[i].lifeSpan < 0 || particles[i].opacity <= 0) {
                particles[i].remove();
                particles.splice(i, 1);
            }
        }
    }

    function loop() {
        requestAnimationFrame(loop);
        updateParticles();
    }

    function Particle() {
        this.lifeSpan = 200; // 更长的生命周期
        this.opacity = 1;
        this.velocity = {x: (Math.random() < 0.5 ? -1 : 1) * (Math.random() / 2), y: -2}; // 减慢上浮速度
        this.pos = {x: 0, y: 0};

        this.init = function(x, y) {
            this.pos.x = x;
            this.pos.y = y;

            this.element = document.createElement('img');
            this.element.src = 'static/img/bubble.png';
            this.element.style.position = 'absolute';
            this.element.style.width = '10px'; // 减小泡泡尺寸
            this.element.style.height = '10px';
            this.element.style.opacity = this.opacity.toString();
            document.body.appendChild(this.element);
        };

        this.update = function() {
            this.lifeSpan--;
            this.opacity -= 0.005; // 减缓透明度减少的速度
            this.pos.y += this.velocity.y;
            this.pos.x += this.velocity.x;

            this.element.style.top = this.pos.y + 'px';
            this.element.style.left = this.pos.x + 'px';
            this.element.style.opacity = this.opacity.toString();
        };

        this.remove = function() {
            document.body.removeChild(this.element);
        };
    }

    init();
})();
