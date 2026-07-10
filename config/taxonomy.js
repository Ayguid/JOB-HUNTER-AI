export default [
    // ---- Tu stack principal: el peso más alto, claramente por encima del resto ----
    { tag: "vue", keywords: ["vue", "vue.js", "vuejs", "nuxt", "nuxt.js", "nuxtjs"], points: 30, label: "Vue.js" },
    { tag: "laravel", keywords: ["laravel"], points: 30, label: "Laravel" },
    { tag: "javascript", keywords: ["javascript", "js"], points: 20, label: "JavaScript" },
    { tag: "php", keywords: ["php"], points: 20, label: "PHP" },

    // ---- Secundarios reales, pero no tu fuerte ----
    { tag: "typescript", keywords: ["typescript", "ts"], points: 10, label: "TypeScript" },
    { tag: "node", keywords: ["node", "node.js", "nodejs"], points: 10, label: "Node.js" },
    { tag: "react", keywords: ["react", "react.js", "reactjs"], points: 8, label: "React" },
    { tag: "python", keywords: ["python"], points: 8, label: "Python" },
    { tag: "c#", keywords: ["c#", "csharp", ".net", "dotnet"], points: 10, label: "C#" },

    { tag: "remote", keywords: ["remote", "remoto", "home office", "teletrabajo"], points: 20, label: "Remote Collaboration" },

    // ---- Testing: fuerte de verdad, sube Selenium ----
    { tag: "qa", keywords: ["qa", "quality assurance"], points: 15, label: null },
    { tag: "selenium", keywords: ["selenium"], points: 20, label: "Selenium" },
    { tag: "cypress", keywords: ["cypress"], points: 10, label: "Cypress" },
    { tag: "mocha", keywords: ["mocha"], points: 10, label: "Mocha" },

    // ---- Especializaciones tuyas: diferenciales reales ----
    { tag: "microservices", keywords: ["microservices", "microservicios"], points: 15, label: "Microservices" },
    { tag: "camunda", keywords: ["camunda"], points: 25, label: "Camunda" },
    { tag: "automation", keywords: ["automation", "automatizacion", "automatización"], points: 10, label: null },
    { tag: "rest", keywords: ["rest", "rest api", "restful"], points: 8, label: "REST APIs" },
    { tag: "api", keywords: ["api", "apis"], points: 5, label: null },
    { tag: "ecommerce", keywords: ["ecommerce", "e-commerce"], points: 10, label: null },

    // ---- Infra: específico, se queda igual ----
    { tag: "gitlab", keywords: ["gitlab"], points: 10, label: "GitLab" },
    { tag: "ci/cd", keywords: ["ci/cd", "ci\\/cd", "cicd", "continuous integration", "continuous deployment"], points: 12, label: "CI/CD" },
    { tag: "docker", keywords: ["docker"], points: 10, label: "Docker" },
    { tag: "devops", keywords: ["devops"], points: 6, label: null },

    // ---- Proceso / soft: bajan, son ruido en descripciones largas ----
    { tag: "confluence", keywords: ["confluence"], points: 5, label: "Confluence" },
    { tag: "jira", keywords: ["jira"], points: 5, label: "Jira" },
    { tag: "agile", keywords: ["agile"], points: 5, label: "Agile" },
    { tag: "documentation", keywords: ["documentation", "documentacion", "documentación", "technical writer", "tech writer"], points: 6, label: "Technical Documentation" },

    // ---- OJO: "lead" suelto matcheaba "Tech Lead"/"Team Lead" en cualquier título.
    // Saqué esa keyword; ahora solo cuenta si dice "leadership"/"team lead" completo/"liderazgo".
    { tag: "leadership", keywords: ["leadership", "team lead", "liderazgo"], points: 5, label: "Team Leadership" },
    { tag: "teaching", keywords: ["teaching", "docencia", "instructor"], points: 8, label: null },
    { tag: "mentoring", keywords: ["mentoring", "mentor"], points: 8, label: null },

    // ---- Ruido puro: casi cualquier JD corporativo los menciona, peso mínimo ----
    { tag: "solutions", keywords: ["solution", "solutions engineer"], points: 3, label: null },
    { tag: "consulting", keywords: ["consult", "consulting", "consultoria", "consultoría"], points: 3, label: null },
    { tag: "senior", keywords: ["senior", "sr", "sr."], points: 2, label: null },
];