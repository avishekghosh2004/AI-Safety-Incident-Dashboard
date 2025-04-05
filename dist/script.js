"use strict";
let incidents = [
    {
        id: 1,
        title: "Biased Recommendation Algorithm",
        description: "Algorithm consistently favored certain demographics...",
        severity: "Medium",
        reported_at: "2025-03-15T10:00:00Z",
    },
    {
        id: 2,
        title: "LLM Hallucination in Critical Info",
        description: "LLM provided incorrect safety procedure information...",
        severity: "High",
        reported_at: "2025-04-01T14:30:00Z",
    },
    {
        id: 3,
        title: "Minor Data Leak via Chatbot",
        description: "Chatbot inadvertently exposed non-sensitive user metadata...",
        severity: "Low",
        reported_at: "2025-03-20T09:15:00Z",
    },
];
const listEl = document.getElementById("incidentList");
const filterEl = document.getElementById("severityFilter");
const sortEl = document.getElementById("sortOrder");
const formEl = document.getElementById("incidentForm");
function renderIncidents() {
    const severity = filterEl.value;
    const sortOrder = sortEl.value;
    let filtered = [...incidents];
    if (severity !== "All") {
        filtered = filtered.filter((incident) => incident.severity === severity);
    }
    filtered.sort((a, b) => {
        const dateA = new Date(a.reported_at).getTime();
        const dateB = new Date(b.reported_at).getTime();
        return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });
    listEl.innerHTML = "";
    filtered.forEach((incident) => {
        const div = document.createElement("div");
        div.className = "incident";
        div.innerHTML = `
        <div class="incident-title">${incident.title} <span>(${incident.severity})</span></div>
        <div><small>${new Date(incident.reported_at).toLocaleString()}</small></div>
        <div class="incident-details">${incident.description}</div>
      `;
        div.addEventListener("click", () => {
            const details = div.querySelector(".incident-details");
            if (details && details instanceof HTMLElement) {
                details.classList.toggle("show");
                details.style.display = details.classList.contains("show")
                    ? "block"
                    : "none";
            }
        });
        listEl.appendChild(div);
    });
}
// Handle form submission
formEl.addEventListener("submit", (e) => {
    e.preventDefault();
    const titleInput = document.getElementById("title");
    const descriptionInput = document.getElementById("description");
    const severityInputs = document.querySelectorAll("input[name='severity']");
    const title = titleInput.value.trim();
    const description = descriptionInput.value.trim();
    let severity = "";
    severityInputs.forEach((input) => {
        if (input.checked)
            severity = input.value;
    });
    if (!title || !description || !severity)
        return;
    const newIncident = {
        id: Date.now(),
        title,
        description,
        severity,
        reported_at: new Date().toISOString(),
    };
    incidents.push(newIncident);
    // Reset form
    formEl.reset();
    // Re-render
    renderIncidents();
});
// Event listeners for filters
filterEl.addEventListener("change", renderIncidents);
sortEl.addEventListener("change", renderIncidents);
// Initial render
renderIncidents();
