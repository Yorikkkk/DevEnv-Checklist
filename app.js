import { demoData } from './data/demo-data.js';

// State
let state = {
    theme: 'light',
    activeStackId: demoData[0].id,
    searchQuery: '',
    categoryFilter: 'Всі',
    progress: {}, // { toolId: boolean }
    customSteps: {} // { stackId: [Tool] }
};

// DOM Elements
const themeToggle = document.getElementById('theme-toggle');
const resetBtn = document.getElementById('reset-btn');
const stackContainer = document.getElementById('stack-container');
const checklistContainer = document.getElementById('checklist-container');
const stackNameDisplay = document.getElementById('stack-name-display');
const searchInput = document.getElementById('search-input');
const categoryFilters = document.querySelectorAll('input[name="category"]');
const emptyState = document.getElementById('empty-state');
const addStepForm = document.getElementById('add-step-form');
const completedCountEl = document.getElementById('completed-count');
const totalCountEl = document.getElementById('total-count');
const progressBarEl = document.getElementById('progress-bar');
const foundCountEl = document.getElementById('found-count');

// Initialization
function init() {
    loadState();
    applyTheme();
    renderStackSelector();
    renderChecklist();
    setupEventListeners();
}

// State Management
function loadState() {
    const saved = localStorage.getItem('devenv_state');
    if (saved) {
        state = { ...state, ...JSON.parse(saved) };
    } else {
        // Init theme based on system preference
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            state.theme = 'dark';
        }
        saveState();
    }
}

function saveState() {
    localStorage.setItem('devenv_state', JSON.stringify(state));
}

// Theme
function applyTheme() {
    document.documentElement.setAttribute('data-theme', state.theme);
}

function toggleTheme() {
    state.theme = state.theme === 'light' ? 'dark' : 'light';
    applyTheme();
    saveState();
}

// Render Stack Selector
function renderStackSelector() {
    stackContainer.innerHTML = '';
    demoData.forEach(stack => {
        const card = document.createElement('div');
        card.className = `stack-card ${stack.id === state.activeStackId ? 'active' : ''}`;
        card.innerHTML = `
            <h3>${stack.name}</h3>
            <p>${stack.description}</p>
        `;
        card.addEventListener('click', () => {
            state.activeStackId = stack.id;
            saveState();
            renderStackSelector();
            renderChecklist();
        });
        stackContainer.appendChild(card);
    });
}

// Logic: Get current stack combined with custom steps
function getCurrentTools() {
    const stack = demoData.find(s => s.id === state.activeStackId);
    if (!stack) return [];

    const custom = state.customSteps[state.activeStackId] || [];
    return [...stack.tools, ...custom];
}

// Logic: Check dependencies
function areDependenciesMet(toolId, tools) {
    const tool = tools.find(t => t.id === toolId);
    if (!tool || !tool.dependencies || tool.dependencies.length === 0) return true;

    return tool.dependencies.every(depId => state.progress[depId] === true);
}

function getMissingDependencies(toolId, tools) {
    const tool = tools.find(t => t.id === toolId);
    if (!tool || !tool.dependencies) return [];

    return tool.dependencies
        .filter(depId => !state.progress[depId])
        .map(depId => {
            const depTool = tools.find(t => t.id === depId);
            return depTool ? depTool.name : depId;
        });
}

// Render Checklist
function renderChecklist() {
    const allTools = getCurrentTools();
    const stack = demoData.find(s => s.id === state.activeStackId);
    if (stack) stackNameDisplay.textContent = stack.name;

    // Filter tools
    let filteredTools = allTools;

    if (state.searchQuery) {
        const query = state.searchQuery.toLowerCase();
        filteredTools = filteredTools.filter(t =>
            t.name.toLowerCase().includes(query) ||
            t.description.toLowerCase().includes(query)
        );
    }

    if (state.categoryFilter !== 'Всі') {
        filteredTools = filteredTools.filter(t => t.category === state.categoryFilter);
    }

    checklistContainer.innerHTML = '';

    // Update stats
    const totalCount = allTools.length;
    const completedCount = allTools.filter(t => state.progress[t.id]).length;

    totalCountEl.textContent = totalCount;
    completedCountEl.textContent = completedCount;
    progressBarEl.style.width = totalCount === 0 ? '0%' : `${(completedCount / totalCount) * 100}%`;
    foundCountEl.textContent = filteredTools.length;

    if (filteredTools.length === 0) {
        emptyState.classList.remove('hidden');
    } else {
        emptyState.classList.add('hidden');

        filteredTools.forEach(tool => {
            const isChecked = !!state.progress[tool.id];
            const isLocked = !isChecked && !areDependenciesMet(tool.id, allTools);
            const missingDeps = getMissingDependencies(tool.id, allTools);
            const isCustom = tool.id.startsWith('custom-');

            const card = document.createElement('div');
            card.className = `tool-card ${isChecked ? 'checked' : ''} ${isLocked ? 'locked' : ''}`;

            card.innerHTML = `
                <label class="checkbox-wrapper">
                    <input type="checkbox" id="${tool.id}" ${isChecked ? 'checked' : ''} ${isLocked ? 'disabled' : ''}>
                    <span class="checkmark"></span>
                </label>
                <div class="tool-info">
                    <div class="tool-header">
                        <h4>${tool.name}</h4>
                        <span class="badge">${tool.category}</span>
                        ${isCustom ? '<span class="badge custom">Кастомний</span>' : ''}
                    </div>
                    <p class="tool-desc">${tool.description}</p>
                    ${isLocked ? `
                        <div class="dependency-warning">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                            Заблоковано. Потрібно: ${missingDeps.join(', ')}
                        </div>
                    ` : ''}
                </div>
            `;

            const checkbox = card.querySelector('input');
            checkbox.addEventListener('change', (e) => {
                if (isLocked) return;
                state.progress[tool.id] = e.target.checked;
                saveState();
                renderChecklist(); // Re-render to update dependent tools
            });

            checklistContainer.appendChild(card);
        });
    }
}

// Event Listeners Setup
function setupEventListeners() {
    themeToggle.addEventListener('click', toggleTheme);

    resetBtn.addEventListener('click', () => {
        if (confirm('Ви впевнені, що хочете скинути весь прогрес і видалити кастомні кроки?')) {
            localStorage.removeItem('devenv_state');
            state.progress = {};
            state.customSteps = {};
            saveState();
            renderChecklist();
        }
    });

    searchInput.addEventListener('input', (e) => {
        state.searchQuery = e.target.value;
        renderChecklist();
    });

    categoryFilters.forEach(radio => {
        radio.addEventListener('change', (e) => {
            document.querySelectorAll('.filter-label').forEach(l => l.classList.remove('active'));
            e.target.closest('.filter-label').classList.add('active');
            state.categoryFilter = e.target.value;
            renderChecklist();
        });
    });

    addStepForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const nameInput = document.getElementById('step-name');
        const descInput = document.getElementById('step-desc');
        const catInput = document.getElementById('step-cat');

        const name = nameInput.value.trim();
        if (name.length < 3) return;

        const newTool = {
            id: `custom-${Date.now()}`,
            name: name,
            description: descInput.value.trim(),
            category: catInput.value,
            dependencies: []
        };

        if (!state.customSteps[state.activeStackId]) {
            state.customSteps[state.activeStackId] = [];
        }
        state.customSteps[state.activeStackId].push(newTool);
        saveState();

        nameInput.value = '';
        descInput.value = '';
        renderChecklist();
    });
}

// Boot
document.addEventListener('DOMContentLoaded', init);
