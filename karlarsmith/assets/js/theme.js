(function () {
	var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	var root = document.documentElement;

	// Header gets a soft shadow once the page scrolls.
	var header = document.querySelector('.krs-header');
	if (header) {
		var onScroll = function () {
			header.classList.toggle('is-scrolled', window.scrollY > 8);
		};
		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });
	}

	// Scroll reveal. Content stays visible if anything here is unsupported.
	var items = document.querySelectorAll('.krs-section > *, .krs-page-hero > *, .krs-home-hero .wp-block-column > *');
	if (reduce || !('IntersectionObserver' in window)) {
		root.classList.remove('krs-js');
		return;
	}
	var io = new IntersectionObserver(function (entries) {
		entries.forEach(function (entry) {
			if (entry.isIntersecting) {
				entry.target.classList.add('is-in');
				io.unobserve(entry.target);
			}
		});
	}, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
	items.forEach(function (el) { io.observe(el); });
	// Failsafe: never leave content hidden.
	setTimeout(function () {
		items.forEach(function (el) { el.classList.add('is-in'); });
	}, 4000);
})();
