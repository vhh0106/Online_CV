const showMenu = (toggleId, navId) => {
    const toggle = document.getElementById(toggleId);
    const nav = document.getElementById(navId);

    if (!toggle || !nav) {
        return;
    }

    toggle.addEventListener('click', () => {
        nav.classList.toggle('show-menu');
    });
};

showMenu('nav-toggle', 'nav-menu');

const navLinks = document.querySelectorAll('.nav_link');

function linkAction() {
    const navMenu = document.getElementById('nav-menu');

    if (navMenu) {
        navMenu.classList.remove('show-menu');
    }
}

navLinks.forEach((link) => link.addEventListener('click', linkAction));

const sections = document.querySelectorAll('section[id]');

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach((current) => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 120;
        const sectionId = current.getAttribute('id');
        const navSection = document.querySelector(`.nav_menu a[href*="${sectionId}"]`);

        if (!navSection) {
            return;
        }

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navSection.classList.add('active-link');
        } else {
            navSection.classList.remove('active-link');
        }
    });
}

window.addEventListener('scroll', scrollActive);
scrollActive();

function scrollTop() {
    const scrollTopButton = document.getElementById('scroll-top');

    if (!scrollTopButton) {
        return;
    }

    if (window.scrollY >= 320) {
        scrollTopButton.classList.add('show-scroll');
    } else {
        scrollTopButton.classList.remove('show-scroll');
    }
}

window.addEventListener('scroll', scrollTop);
scrollTop();

const themeButton = document.getElementById('theme-button');
const darkTheme = 'dark-theme';
const iconTheme = 'bx-sun';
const selectedTheme = localStorage.getItem('selected-theme');
const selectedIcon = localStorage.getItem('selected-icon');

const getCurrentTheme = () => (document.body.classList.contains(darkTheme) ? 'dark' : 'light');
const getCurrentIcon = () => {
    const icon = themeButton ? themeButton.querySelector('i') : null;
    return icon && icon.classList.contains(iconTheme) ? 'bx-sun' : 'bx-moon';
};

if (selectedTheme) {
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme);
}

if (themeButton) {
    const themeIcon = themeButton.querySelector('i');

    if (themeIcon && selectedIcon === 'bx-sun') {
        themeIcon.classList.remove('bx-moon');
        themeIcon.classList.add('bx-sun');
    }

    themeButton.addEventListener('click', () => {
        document.body.classList.toggle(darkTheme);

        if (themeIcon) {
            themeIcon.classList.toggle('bx-moon');
            themeIcon.classList.toggle('bx-sun');
        }

        localStorage.setItem('selected-theme', getCurrentTheme());
        localStorage.setItem('selected-icon', getCurrentIcon());
    });
}

function scaleCV() {
    document.body.classList.add('scale-cv');
}

function removeScale() {
    document.body.classList.remove('scale-cv');
}

function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForFonts() {
    if (document.fonts && document.fonts.ready) {
        try {
            await document.fonts.ready;
        } catch (error) {
            return;
        }
    }
}

const areaCV = document.getElementById('area-cv');
const downloadButtons = document.querySelectorAll('#resume-button, .js-download-cv');

const opt = {
    margin: [0, 0, 0, 0],
    filename: 'Vu-Hoang-Hiep-CV.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: {
        scale: 2,
        useCORS: true,
        scrollY: 0,
        backgroundColor: '#ffffff'
    },
    pagebreak: { mode: ['css', 'legacy'] },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
};

async function generateResume() {
    if (!areaCV || typeof html2pdf === 'undefined') {
        return;
    }

    await waitForFonts();
    scaleCV();
    await wait(220);

    try {
        await html2pdf().set(opt).from(areaCV).save();
    } finally {
        await wait(120);
        removeScale();
    }
}

downloadButtons.forEach((button) => {
    button.addEventListener('click', generateResume);
});

