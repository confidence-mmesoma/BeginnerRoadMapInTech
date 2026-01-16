// 1. DATA: The Roadmaps
const roadmaps = {
    frontend: {
        title: "Frontend Development",
        source: "Recommended Source: Kevin Powell (YouTube)",
        topics: ["HTML5 Basics", "CSS Fundamentals", "Flexbox & Grid", "JavaScript Basics", "DOM Manipulation", "Fetch API", "React Basics"]
    },
    backend: {
        title: "Backend Development",
        source: "Recommended Source: The Net Ninja (Node.js Playlist)",
        topics: ["Node.js Basics", "NPM & Packages", "Express Framework", "REST APIs", "MongoDB Basics", "Authentication", "Deployment"]
    },
    ai: {
        title: "AI Automation",
        source: "Recommended Source: Liam Ottley (YouTube)",
        topics: ["Prompt Engineering", "OpenAI API Basics", "Zapier/Make Workflows", "Vector Databases", "Building Custom GPTs", "AI Agents"]
    },
    data: {
        title: "Data Science",
        source: "Recommended Source: Alex The Analyst (YouTube)",
        topics: ["Excel for Data", "SQL Fundamentals", "Python Programming", "Pandas & NumPy", "Data Visualization (Tableau)", "Statistics Basics"]
    },
    mobile: {
        title: "Mobile App Dev (Flutter)",
        source: "Recommended Source: Academind (YouTube)",
        topics: ["Dart Programming", "Flutter Widgets", "State Management", "Navigation & Routing", "Firebase Integration", "App Store Deployment"]
    },
    cyber: {
        title: "Cybersecurity",
        source: "Recommended Source: NetworkChuck (YouTube)",
        topics: ["Networking Basics", "Linux Terminal", "Python for Hacking", "Metasploit Basics", "Web App Security", "CompTIA Security+ Prep"]
    },
    design: {
        title: "UI/UX Design",
        source: "Recommended Source: Mizko (YouTube)",
        topics: ["Design Principles", "Figma Basics", "User Research", "Wireframing", "Prototyping", "Design Systems", "Handoff to Devs"]
    },
    devops: {
        title: "DevOps Engineering",
        source: "Recommended Source: TechWorld with Nana (YouTube)",
        topics: ["Linux Administration", "Docker Containers", "Kubernetes Basics", "CI/CD Pipelines", "Terraform (IaC)", "Monitoring Tools"]
    }
};

// 2. SELECTORS
const selectEl = document.getElementById('roadmap-select');
const roadmapContent = document.getElementById('roadmap-content');
const progressContainer = document.getElementById('progress-container');
const progressBar = document.getElementById('progress-bar-fill');
const progressPercent = document.getElementById('progress-percent');
const resetBtn = document.getElementById('reset-btn');

// 3. APP LOGIC
function init() {
    const savedPath = localStorage.getItem('selectedPath');
    if (savedPath) {
        selectEl.value = savedPath;
        renderRoadmap(savedPath);
    }
}

function renderRoadmap(pathKey) {
    const data = roadmaps[pathKey];
    if (!data) return;

    progressContainer.classList.remove('hidden');

    // Get saved progress for this specific path
    const completedTopics = JSON.parse(localStorage.getItem(`progress-${pathKey}`)) || [];

    let html = `
        <div class="section-card">
            <div class="source-box">📺 ${data.source}</div>
            <h3>${data.title} Checklist</h3>
            <div class="checklist">
    `;

    data.topics.forEach(topic => {
        const isChecked = completedTopics.includes(topic) ? 'checked' : '';
        html += `
            <label class="topic-item">
                <input type="checkbox" class="topic-check" value="${topic}" ${isChecked}>
                <span>${topic}</span>
            </label>
        `;
    });

    html += `</div></div>`;
    roadmapContent.innerHTML = html;

    updateProgress(pathKey);
    setupEventListeners(pathKey);
}

function updateProgress(pathKey) {
    const checkboxes = document.querySelectorAll('.topic-check');
    const checked = document.querySelectorAll('.topic-check:checked');
    const percentage = checkboxes.length > 0 ? Math.round((checked.length / checkboxes.length) * 100) : 0;

    progressBar.style.width = percentage + '%';
    progressPercent.innerText = `${percentage}% Completed`;

    // Save checked items to localStorage
    const completed = Array.from(checked).map(cb => cb.value);
    localStorage.setItem(`progress-${pathKey}`, JSON.stringify(completed));
}

function setupEventListeners(pathKey) {
    const checkboxes = document.querySelectorAll('.topic-check');
    checkboxes.forEach(cb => {
        cb.addEventListener('change', () => updateProgress(pathKey));
    });
}

// 4. EVENT LISTENERS
selectEl.addEventListener('change', (e) => {
    const path = e.target.value;
    if (path) {
        localStorage.setItem('selectedPath', path);
        renderRoadmap(path);
    } else {
        roadmapContent.innerHTML = '<p>Select a roadmap to begin.</p>';
        progressContainer.classList.add('hidden');
    }
});

resetBtn.addEventListener('click', () => {
    if (confirm("Reset all progress for this path?")) {
        const path = selectEl.value;
        localStorage.removeItem(`progress-${path}`);
        renderRoadmap(path);
    }
});

// Start App
init();

// celebration Message

function updateProgress(pathKey) {
    const checkboxes = document.querySelectorAll('.topic-check');
    const checked = document.querySelectorAll('.topic-check:checked');
    const percentage = checkboxes.length > 0 ? Math.round((checked.length / checkboxes.length) * 100) : 0;

    progressBar.style.width = percentage + '%';
    progressPercent.innerText = `${percentage}% Completed`;

    // --- ADD THIS PART BELOW ---
    // Remove any existing celebration first
    const existingMsg = document.querySelector('.celebration');
    if (existingMsg) existingMsg.remove();

    if (percentage === 100) {
        const msg = document.createElement('div');
        msg.className = 'celebration';
        msg.innerText = "🎉 Journey Complete! You're ready for the next level.";
        // Insert it right above the checklist
        roadmapContent.prepend(msg);
    }
    // ---------------------------

    const completed = Array.from(checked).map(cb => cb.value);
    localStorage.setItem(`progress-${pathKey}`, JSON.stringify(completed));
}