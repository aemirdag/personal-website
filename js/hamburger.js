const menu_toggle = document.querySelector('.menu-toggle');
const sidebar = document.querySelector('.navbar');

menu_toggle.addEventListener('click', () => {
    menu_toggle.classList.toggle('is-active');
    sidebar.classList.toggle('is-active');
});

function burgerClicked(x) {
    var click = document.getElementById("navbar-phone-menu");

    if (click.style.display === "none" || click.style.display === "") {
        click.style.display = "flex";
    } else {
        click.style.display = "none";
    }
}

var TxtType = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 1000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtType.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

    var that = this;
    var delta = 70;

    if (this.isDeleting) { 
        delta /= 2;
    }

    if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
    }

    setTimeout(function() {
    that.tick();
    }, delta);
};

window.onload = function() {
    var elements = document.getElementsByClassName('typewrite');
    for (var i=0; i<elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
          new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }

    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #EEEEEE}";
    document.body.appendChild(css);
};

const form = document.getElementById('form-submit-email');

form.addEventListener('submit', (event) => {
    // handle the form data
    const name = form.elements['form-fullname'];
    const msg = form.elements['form-msg']

    // getting the element's value
    let fullName = name.value;
    let emailAddress = 'alialptugemirdag@gmail.com'
    let writtenMsg = msg.value;
    let subject = 'Message from: ' + fullName.toString() + ' - ';

    window.open(`mailto:${emailAddress}?subject=${subject}&body=${writtenMsg}`);
});
