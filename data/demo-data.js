export const demoData = [
  {
    id: "frontend",
    name: "Frontend Stack",
    description: "Набір інструментів для розробки сучасних веб-інтерфейсів.",
    tools: [
      { id: "fe-git", name: "Git", description: "Система контролю версій.", category: "Софт", dependencies: [] },
      { id: "fe-node", name: "Node.js", description: "Середовище виконання JavaScript.", category: "Софт", dependencies: [] },
      { id: "fe-vscode", name: "VS Code", description: "Редактор коду.", category: "Софт", dependencies: [] },
      { id: "fe-vite", name: "Vite", description: "Швидкий збирач проєктів. Вимагає Node.js.", category: "CLI Команди", dependencies: ["fe-node"] },
      { id: "fe-eslint", name: "ESLint", description: "Лінтер для JavaScript/TypeScript. Вимагає Node.js.", category: "CLI Команди", dependencies: ["fe-node"] },
      { id: "fe-ext-prettier", name: "Prettier Extension", description: "Розширення для форматування коду у VS Code.", category: "Розширення", dependencies: ["fe-vscode"] }
    ]
  },
  {
    id: "nodejs",
    name: "Node.js Backend Stack",
    description: "Інструменти для створення серверних застосунків на Node.js.",
    tools: [
      { id: "node-git", name: "Git", description: "Система контролю версій.", category: "Софт", dependencies: [] },
      { id: "node-nvm", name: "NVM", description: "Node Version Manager. Дозволяє керувати версіями Node.js.", category: "Софт", dependencies: [] },
      { id: "node-node", name: "Node.js (LTS)", description: "Середовище виконання. Встановлюється через NVM.", category: "Софт", dependencies: ["node-nvm"] },
      { id: "node-docker", name: "Docker", description: "Контейнеризація для баз даних (PostgreSQL, Redis).", category: "Софт", dependencies: [] },
      { id: "node-pm2", name: "PM2", description: "Менеджер процесів. Вимагає Node.js.", category: "CLI Команди", dependencies: ["node-node"] },
      { id: "node-vscode", name: "VS Code", description: "Редактор коду.", category: "Софт", dependencies: [] },
      { id: "node-ext-rest", name: "REST Client Extension", description: "Тестування API у VS Code.", category: "Розширення", dependencies: ["node-vscode"] }
    ]
  },
  {
    id: "python",
    name: "Python Stack",
    description: "Середовище для розробки мовою Python (Data Science, Backend).",
    tools: [
      { id: "py-git", name: "Git", description: "Система контролю версій.", category: "Софт", dependencies: [] },
      { id: "py-python", name: "Python 3.x", description: "Інтерпретатор Python.", category: "Софт", dependencies: [] },
      { id: "py-pip", name: "pip", description: "Менеджер пакетів Python.", category: "CLI Команди", dependencies: ["py-python"] },
      { id: "py-poetry", name: "Poetry", description: "Сучасний менеджер залежностей. Вимагає Python.", category: "CLI Команди", dependencies: ["py-python"] },
      { id: "py-docker", name: "Docker", description: "Контейнеризація.", category: "Софт", dependencies: [] },
      { id: "py-vscode", name: "VS Code", description: "Редактор коду.", category: "Софт", dependencies: [] },
      { id: "py-ext-python", name: "Python Extension", description: "Розширення Python для VS Code.", category: "Розширення", dependencies: ["py-vscode"] }
    ]
  }
];
