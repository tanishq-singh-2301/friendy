var current_fs, next_fs, previous_fs;
var left, opacity, scale;
var animating;

$(".next").click(function () {

    if (animating) return false;

    if ((document.querySelector('.inputs-val-1').value.length < 5)) {
        document.querySelector('#warning-text').innerText = 'It must be atleast 6 letter long'
        return
    }
    else {
        document.querySelector('#warning-text').innerText = '';
    }

    current_fs = $(this).parent();
    next_fs = $(this).parent().next();

    animating = true;


    next_fs.show();
    current_fs.animate({ opacity: 0 }, {
        step: function (now, mx) {
            scale = 1 - (1 - now) * 0.2;
            left = (now * 50) + "%";
            opacity = 1 - now;
            current_fs.css({
                'position': 'absolute'
            });
            next_fs.css({ 'opacity': opacity, 'display': 'flex' });
        },
        duration: 0,
        complete: function () {
            current_fs.hide();
            animating = false;
        },
        easing: 'easeInOutBack'
    });
    try {
        document.querySelector('#topic-1').innerHTML = '';
        document.querySelector('#topic-2').innerHTML = '';
    } catch {
        console.log('Not Found');
    }
});

$("#firstbtn").click(function () {
    var url = location.pathname;
    var url_2 = url.replace('/inside-game/', '');
    var url_3 = url_2.replace('/', '');
    document.querySelector('#url').value = url_3;
    console.log(document.getElementById('url').value);
})

function myFunction() {
    var copyText = document.getElementById("copy-url-input");
    console.log(copyText.value);

    copyText.select();
    copyText.setSelectionRange(0, 99999);
    document.execCommand("copy");

    document.getElementById('copy-btn').innerText = 'Copied.!';
}

window.onload = function () {
    if (location.pathname.includes('inside-game')) {
        var url = location.pathname;
        var url_2 = url.replace('/inside-game/', '');
        var url_3 = url_2.replace('/', '');
        var isTrue = localStorage.getItem(`answered-${url_3}`) || false
        if (isTrue) {
            location.replace(`https://friend-meter.herokuapp.com/game-answers/${url_3}`);
        } else {
            console.log('isTrue Not');
        }
    } else {
        console.log('Normal user');
    }
}

function ansSubmitted() {
    var url = location.pathname;
    var url_2 = url.replace('/inside-game/', '');
    var url_3 = url_2.replace('/', '');
    localStorage.setItem(`answered-${url_3}`, true);
}

if (location.pathname.includes('inside-game')) {
    var submit_btn_1 = document.getElementById("radio-btn-91");
    var submit_btn_2 = document.getElementById("radio-btn-92");
    var submit_btn_3 = document.getElementById("radio-btn-93");
    var submit_btn_4 = document.getElementById("radio-btn-94");

    submit_btn_1.addEventListener('click', ansSubmitted);
    submit_btn_2.addEventListener('click', ansSubmitted);
    submit_btn_3.addEventListener('click', ansSubmitted);
    submit_btn_4.addEventListener('click', ansSubmitted);
}