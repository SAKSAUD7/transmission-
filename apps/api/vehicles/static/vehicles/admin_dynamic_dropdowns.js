"use strict";
/**
 * admin_asset_form.js
 * ------------------------------------------------------------------
 * Handles two separate forms:
 *
 *   CarAssetAdmin  — Make → Model chaining + Year dropdown
 *   PartAssetAdmin — Part slug → Part type dynamic loading (AJAX)
 * ------------------------------------------------------------------
 */
(function () {
  document.addEventListener("DOMContentLoaded", function () {

    /* ═══════════════════════════════════════════════════════════════
       A) CAR ASSET FORM  —  Make → Model → Year chaining
    ═══════════════════════════════════════════════════════════════ */
    const makeEl  = document.getElementById("id_make");
    const modelEl = document.getElementById("id_model");
    let yearEl  = document.getElementById("id_year");

    // Replace the default ChoiceField with a dynamic one and add a '+' button
    if (yearEl) {
      const cur = yearEl.value || "";
      const sel = document.createElement("select");
      sel.id = yearEl.id;
      sel.name = yearEl.name;
      sel.className = yearEl.className;
      sel.appendChild(new Option("— All years —", ""));
      if (cur) sel.appendChild(new Option(cur, cur, true, true));
      yearEl.replaceWith(sel);
      yearEl = sel;

      // Add a custom '+ Add Year' button
      const addBtn = document.createElement("a");
      addBtn.href = "#";
      addBtn.textContent = " + Add Year";
      addBtn.style.marginLeft = "10px";
      addBtn.style.color = "#447e9b";
      addBtn.style.fontWeight = "bold";
      addBtn.onclick = function(e) {
        e.preventDefault();
        const y = prompt("Enter the year:");
        if (y) {
          const o = new Option(y, y, true, true);
          yearEl.appendChild(o);
        }
      };
      yearEl.parentNode.insertBefore(addBtn, yearEl.nextSibling);
    }

    if (makeEl && modelEl) {
      let allOpts = Array.from(modelEl.options).map(o => ({ v: o.value, t: o.text }));

      function loadYears() {
        if (!yearEl) return;
        const makeName  = makeEl.options[makeEl.selectedIndex]?.text || "";
        const modelName = modelEl.options[modelEl.selectedIndex]?.text || "";
        const prevYear  = yearEl.value;

        yearEl.innerHTML = "";
        yearEl.appendChild(new Option("— All years —", ""));

        if (!makeName || !modelName || makeName.startsWith("—") || modelName.startsWith("—")) {
          // Keep the previous selected year if it exists
          if (prevYear) yearEl.appendChild(new Option(prevYear, prevYear, true, true));
          return;
        }

        fetch(`/api/vehicles/years/?make=${encodeURIComponent(makeName)}&model=${encodeURIComponent(modelName)}`)
          .then(r => r.json())
          .then(data => {
            let found = false;
            data.forEach(y => {
              const o = new Option(y, y);
              if (String(y) === String(prevYear)) { o.selected = true; found = true; }
              yearEl.appendChild(o);
            });
            // If the previously selected year isn't in the API data, add it manually
            if (prevYear && !found) {
              yearEl.appendChild(new Option(prevYear, prevYear, true, true));
            }
          })
          .catch(() => {
             if (prevYear) yearEl.appendChild(new Option(prevYear, prevYear, true, true));
          });
      }

      function loadModels() {
        const makeName = makeEl.options[makeEl.selectedIndex]?.text || "";
        const prev     = modelEl.value;
        modelEl.innerHTML = "";
        modelEl.appendChild(new Option("— All models of this make —", ""));

        if (!makeName || makeName.startsWith("—")) {
          allOpts.forEach(o => { if (o.v) modelEl.appendChild(new Option(o.t, o.v)); });
          loadYears();
          return;
        }
        fetch(`/api/vehicles/models/?make=${encodeURIComponent(makeName)}`)
          .then(r => r.json())
          .then(data => {
            data.forEach(m => {
              const o = new Option(m.name, m.id);
              if (String(m.id) === String(prev)) o.selected = true;
              modelEl.appendChild(o);
            });
            loadYears();
          })
          .catch(() => {});
      }

      makeEl.addEventListener("change", loadModels);
      modelEl.addEventListener("change", loadYears);
      
      // Init
      if (makeEl.value) loadModels();
    }

    /* ═══════════════════════════════════════════════════════════════
       B) PART ASSET FORM  —  Part slug → Part type (AJAX)
    ═══════════════════════════════════════════════════════════════ */
    const slugEl     = document.getElementById("id_part_slug");
    const partTypeEl = document.getElementById("id_part_type");

    if (!slugEl || !partTypeEl) return; // not on a part form

    function loadPartTypes(slug, keepId) {
      if (!slug) {
        partTypeEl.innerHTML = "";
        partTypeEl.appendChild(new Option("— Select Part first —", ""));
        return;
      }
      fetch(`/api/vehicles/part-types/?part_slug=${encodeURIComponent(slug)}`)
        .then(r => { if (!r.ok) throw new Error(); return r.json(); })
        .then(data => {
          const savedId = keepId || "";
          partTypeEl.innerHTML = "";
          data.forEach(item => {
            const o = new Option(item.label, item.id);
            if (String(item.id) === String(savedId)) o.selected = true;
            partTypeEl.appendChild(o);
          });
        })
        .catch(() => {});
    }

    // Fire on slug change
    slugEl.addEventListener("change", function () {
      loadPartTypes(this.value, "");
    });

    // Fire on page load (edit form — pre-select saved type)
    if (slugEl.value) {
      loadPartTypes(slugEl.value, partTypeEl.value);
    } else {
      // blank form — show placeholder
      partTypeEl.innerHTML = "";
      partTypeEl.appendChild(new Option("— Select Part first —", ""));
    }

  });
})();
