// === Looping slider ===
const slider = document.querySelector('.recent-projects-slider');
if (slider) {
	const clone = slider.innerHTML;
	slider.innerHTML += clone; // duplikat isi buat looping
}

// === Hover 3D Effect ===
const cards = document.querySelectorAll('.project-card');
cards.forEach(card => {
	card.addEventListener('mousemove', e => {
		const rect = card.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;
		const rotateY = ((x / rect.width) - 0.5) * 20; // sudut
		const rotateX = ((y / rect.height) - 0.5) * -20;
		card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
	});
	card.addEventListener('mouseleave', () => {
		card.style.transform = 'rotateX(0deg) rotateY(0deg)';
	});
});

// === Neon Cursor ===
const cursor = document.querySelector('.cursor');
document.addEventListener('mousemove', e => {
	cursor.style.left = `${e.clientX}px`;
	cursor.style.top = `${e.clientY}px`;
});

// Fade-in scroll
const faders = document.querySelectorAll('.fade-in');
const appearOptions = { threshold: 0.2 };
const appearOnScroll = new IntersectionObserver((entries, observer) => {
	entries.forEach(entry => {
		if (!entry.isIntersecting) return;
		entry.target.classList.add('appear');
		observer.unobserve(entry.target);
	});
}, appearOptions);
faders.forEach(fader => appearOnScroll.observe(fader));
