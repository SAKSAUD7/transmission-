"use strict";
/**
 * admin_asset_form.js
 * ------------------------------------------------------------------
 * 1. Make → Model chaining  (filters model dropdown by selected make)
 * 2. Year dropdown          (smart select from current year down to 1985)
 * 3. Part slug visibility   (only show when asset_type = "part")
 * ------------------------------------------------------------------
 */
(function () {
  // Wait for Django admin DOM to be ready
  document.addEventListener("DOMContentLoaded", function () {

    /* ── 1. Element refs ─────────────────────────────────────────── */
    const makeSelect  = document.querySelector("#id_make");
    const modelSelect = document.querySelector("#id_model");
    const yearSelect  = document.querySelector("#id_year");
    const typeSelect  = document.querySelector("#id_asset_type");
    const slugRow     = document.querySelector(".field-part_slug");

    /* ── 2. Build year <select> options (current year → 1985) ────── */
    if (yearSelect) {
      const currentYear  = new Date().getFullYear();
      const existingVal  = yearSelect.value || "";

      // Replace free-text input with a proper <select>
      const sel = document.createElement("select");
      sel.id   = yearSelect.id;
      sel.name = yearSelect.name;
      sel.className = yearSelect.className;

      // Blank / "all years" option
      const blank = new Option("— All years —", "");
      sel.appendChild(blank);

      for (let y = currentYear + 1; y >= 1985; y--) {
        const opt = new Option(y, y);
        if (String(y) === existingVal) opt.selected = true;
        sel.appendChild(opt);
      }

      yearSelect.replaceWith(sel);
    }

    /* ── 3. Make → Model chaining ────────────────────────────────── */
    if (!makeSelect || !modelSelect) return;

    // Store the full original model list once on page load
    let allModelOptions = [];
    Array.from(modelSelect.options).forEach(opt => {
      allModelOptions.push({ value: opt.value, text: opt.text });
    });

    function filterModels(makeId) {
      const previousVal = modelSelect.value;

      // Clear current options
      modelSelect.innerHTML = "";

      // Always add blank
      modelSelect.appendChild(new Option("---------", ""));

      if (!makeId) {
        // No make selected — show all models
        allModelOptions.forEach(o => {
          if (o.value) modelSelect.appendChild(new Option(o.text, o.value));
        });
        return;
      }

      // Fetch models for the selected make from the existing API endpoint
      fetch(`/api/vehicles/models/?make=${encodeURIComponent(makeSelect.options[makeSelect.selectedIndex]?.text || "")}`)
        .then(r => r.json())
        .then(data => {
          data.forEach(m => {
            const opt = new Option(m.name, m.id);
            if (String(m.id) === String(previousVal)) opt.selected = true;
            modelSelect.appendChild(opt);
          });

          // If no results, fall back to filtering from cached full list by make text
          if (data.length === 0) {
            const makeText = makeSelect.options[makeSelect.selectedIndex]?.text?.toLowerCase() || "";
            allModelOptions.forEach(o => {
              if (o.value && o.text.toLowerCase().startsWith(makeText)) {
                const opt = new Option(o.text, o.value);
                if (o.value === previousVal) opt.selected = true;
                modelSelect.appendChild(opt);
              }
            });
          }
        })
        .catch(() => {
          // Fallback: filter already-loaded options by make name prefix
          const makeText = makeSelect.options[makeSelect.selectedIndex]?.text?.toLowerCase() || "";
          allModelOptions.forEach(o => {
            if (o.value && o.text.toLowerCase().startsWith(makeText)) {
              const opt = new Option(o.text, o.value);
              if (o.value === previousVal) opt.selected = true;
              modelSelect.appendChild(opt);
            }
          });
        });
    }

    // Trigger on change
    makeSelect.addEventListener("change", () => filterModels(makeSelect.value));

    // Run on load (edit form — make already selected)
    if (makeSelect.value) filterModels(makeSelect.value);

    /* ── 4. Show / hide part_slug based on asset_type ────────────── */
    function toggleSlug() {
      if (!slugRow || !typeSelect) return;
      const isPart = typeSelect.value === "part";
      slugRow.style.display = isPart ? "" : "none";
    }

    if (typeSelect) {
      typeSelect.addEventListener("change", toggleSlug);
      toggleSlug(); // run on load
    }

  });
})();
