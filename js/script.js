"use strict"

/* <loaded>======================================================================================================================================================================================================== */
window.addEventListener('load', windowLoad);

function windowLoad() {
	document.documentElement.classList.add('_loaded');

	/* <menu-icon>======================================================================================================================================================================================================== */
	const iconMenu = document.querySelector('.menu__icon');
	const menuBody = document.querySelector('.menu__body');

	if (iconMenu) {
		function toggleMenu() {
			document.body.classList.toggle('_lock-scroll');
			iconMenu.classList.toggle('_show-menu');
			menuBody.classList.toggle('_show-menu');
		}

		function closeMenu() {
			document.body.classList.remove('_lock-scroll');
			iconMenu.classList.remove('_show-menu');
			menuBody.classList.remove('_show-menu');
		}

		iconMenu.addEventListener("click", toggleMenu);


		document.addEventListener('click', function (e) {
			const target = e.target;
			const menu = target.closest('.menu__body') || target.closest('.menu__icon');
			const isMenuOpen = iconMenu.classList.contains('_show-menu');
			if (!menu && isMenuOpen) {
				closeMenu();
			}
		});


		document.addEventListener('keydown', function (e) {
			if (e.key === 'Escape') {
				closeMenu();
			}
		});


		const menuLinks = document.querySelectorAll('.menu__link');
		menuLinks.forEach(function (link) {
			link.addEventListener("click", function () {
				closeMenu();
			});
		});
	}

	/* <>======================================================================================================================================================================================================== */
	/* <>======================================================================================================================================================================================================== */
	/* <scroll-sections-active-link>======================================================================================================================================================================================================== */
	const sections = document.querySelectorAll('section[id]');

	function scrollActive() {
		const scrollY = window.scrollY;

		sections.forEach(function (current) {
			const sectionHeight = current.offsetHeight;
			const sectionTop = current.offsetTop - (86 + 2); // height header + fix
			const sectionId = current.getAttribute('id');
			const sectionsClass = document.querySelector('.menu__body a[href*=' + sectionId + ']');

			if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
				sectionsClass.classList.add('_active-link');
			} else {
				sectionsClass.classList.remove('_active-link');
			}
		});
	}

	window.addEventListener('scroll', scrollActive);

	/* <change background header>======================================================================================================================================================================================================== */
	function scrollHeader() {
		const header = document.getElementById('header');
		// When the scroll is greater than 50 viewport height, add the bg-header class to the header tag
		if (window.scrollY >= 50) {
			header.classList.add('_bg-header');
		} else {
			header.classList.remove('_bg-header');
		}
	}

	window.addEventListener('scroll', scrollHeader);

	/* <show-scroll-up>======================================================================================================================================================================================================== */
	function scrollUp() {
		const scrollUp = document.getElementById('scroll-up');
		if (window.scrollY >= 320) {
			scrollUp.classList.add('_show-scroll');
		} else {
			scrollUp.classList.remove('_show-scroll');
		}
	}

	window.addEventListener('scroll', scrollUp);

	/* <data-animation>======================================================================================================================================================================================================== */
	function createObserver(selector, className) {
		const elements = document.querySelectorAll(selector);
		const options = {
			threshold: 0.2
		}

		const callback = (entries) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					entry.target.classList.add(className);
				}
			});
		}

		const observer = new IntersectionObserver(callback, options);

		elements.forEach(item => {
			observer.observe(item);
		});
	}

	createObserver('[data-slide-up]', '_animated');
	createObserver('[data-slide-down]', '_animated');
	createObserver('[data-slide-right]', '_animated');
	createObserver('[data-slide-left]', '_animated');

	/* <light&dark-mode>======================================================================================================================================================================================================== */
	const changeThemeButton = document.getElementById('change-theme');

	if (changeThemeButton) {
		function toggleTheme() {
			const body = document.body;
			if (body.classList.contains('_dark-mode')) {
				body.classList.remove('_dark-mode');
				body.classList.add('_light-mode');

				changeThemeButton.classList.remove('_dark-mode');
				changeThemeButton.classList.add('_light-mode');

				localStorage.setItem('theme', '_light-mode');
			} else {
				body.classList.remove('_light-mode');
				body.classList.add('_dark-mode');

				changeThemeButton.classList.remove('_light-mode');
				changeThemeButton.classList.add('_dark-mode');

				localStorage.setItem('theme', '_dark-mode');
			}
		}

		document.addEventListener('DOMContentLoaded', function () {
			const savedTheme = localStorage.getItem('theme');
			const body = document.body;

			if (savedTheme) {
				body.classList.add(savedTheme);
			} else {
				const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
				if (prefersDarkMode) {
					body.classList.add('_dark-mode');
				} else {
					body.classList.add('_light-mode');
				}
			}
		});

		changeThemeButton.addEventListener('click', toggleTheme);

		changeThemeButton.addEventListener("click", function (e) {
			e.stopPropagation();
		});
	}

	/* <>======================================================================================================================================================================================================== */
}

/* end */