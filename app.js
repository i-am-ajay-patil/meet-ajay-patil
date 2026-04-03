document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS
    AOS.init({ duration: 800, once: true });

    // Particles.js Config
    particlesJS('particles-js', {
        particles: {
            number: { value: 80 },
            color: { value: '#00f2fe' },
            shape: { type: 'circle' },
            opacity: { value: 0.5 },
            size: { value: 3 },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#00f2fe',
                opacity: 0.2,
                width: 1
            },
            move: { enable: true, speed: 2 }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: { enable: false },
                onclick: { enable: false },
                resize: true
            }
        },
        retina_detect: true
    });

    // Set footer year dynamically
    const yearEl = document.getElementById('footer-year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // Icon map for social platforms
    const platformIconMap = {
        linkedin: 'fab fa-linkedin',
        github: 'fab fa-github',
        twitter: 'fab fa-twitter',
        instagram: 'fab fa-instagram'
    };

    fetch('data.json')
        .then(response => {
            if (!response.ok) throw new Error('Failed to load data.json');
            return response.json();
        })
        .then(data => {
            // Hero tagline
            document.getElementById('hero-tagline').innerText = data.profile.headline;

            // About section
            document.getElementById('about-text').innerText = data.profile.summary;

            // Skills section
            const skillsContainer = document.getElementById('skills-container');
            data.technical_skills.forEach(skill => {
                const span = document.createElement('span');
                span.className = 'px-6 py-2 glass rounded-full border border-gray-700 hover:border-[#00f2fe] transition-all text-sm font-medium';
                span.innerText = skill;
                skillsContainer.appendChild(span);
            });

            // Experience section
            populateExperience(data);

            // Social links
            const socialContainer = document.getElementById('social-links');
            data.profile.links.forEach(link => {
                const anchor = document.createElement('a');
                anchor.href = link.url;
                anchor.target = '_blank';
                anchor.rel = 'noopener noreferrer';
                anchor.className = 'text-4xl text-gray-400 hover:text-[#00f2fe] transition-transform hover:scale-110';
                anchor.setAttribute('aria-label', link.platform);

                const key = link.platform.toLowerCase();
                const iconClass = platformIconMap[key] || 'fas fa-link';
                anchor.innerHTML = `<i class="${iconClass}"></i>`;

                socialContainer.appendChild(anchor);
            });
        })
        .catch(err => console.error('Error loading portfolio data:', err));
});

// Populate the Experience section
function populateExperience(data) {
    const expContainer = document.getElementById('experience-container');
    if (!expContainer) return;

    expContainer.innerHTML = '';

    data.experience.forEach(companyData => {
        const companySection = document.createElement('div');
        companySection.className = 'glass p-8 rounded-3xl mb-12 border border-gray-800 hover:border-[#00f2fe]/50 transition-all duration-500 group';
        companySection.setAttribute('data-aos', 'fade-up');

        const rolesHtml = companyData.roles.map((role, rIndex) => `
            <div class="${rIndex > 0 ? 'mt-10 pt-10 border-t border-gray-800/50' : 'mt-6'}">
                <div class="flex flex-col md:flex-row md:justify-between md:items-start mb-4 gap-2">
                    <div>
                        <h4 class="text-xl font-bold text-[#00f2fe] tracking-tight group-hover:text-white transition-colors">${role.title}</h4>
                        <p class="text-sm font-medium text-gray-500 mt-1">${role.period}</p>
                    </div>
                    <span class="text-[10px] uppercase tracking-widest bg-[#0a0a0c] px-3 py-1 rounded-full border border-gray-800 text-gray-400">
                        <i class="fas fa-map-marker-alt mr-1 text-[#00f2fe]"></i> ${role.location}
                    </span>
                </div>
                <ul class="space-y-3">
                    ${role.highlights.map(highlight => `
                        <li class="flex items-start text-sm text-gray-400 leading-relaxed">
                            <span class="text-[#00f2fe] mr-3 mt-1.5 text-[8px]">●</span>
                            <span>${highlight}</span>
                        </li>
                    `).join('')}
                </ul>
            </div>
        `).join('');

        companySection.innerHTML = `
            <div class="flex flex-col sm:flex-row justify-between items-baseline gap-2">
                <h3 class="text-3xl font-black tracking-tighter text-white uppercase group-hover:text-[#00f2fe] transition-colors">
                    ${companyData.company}
                </h3>
                <span class="text-xs font-bold text-gray-600 bg-gray-900/50 px-4 py-1 rounded-md border border-gray-800">
                    ${companyData.duration}
                </span>
            </div>
            <div class="roles-list">
                ${rolesHtml}
            </div>
        `;

        expContainer.appendChild(companySection);
    });
}
