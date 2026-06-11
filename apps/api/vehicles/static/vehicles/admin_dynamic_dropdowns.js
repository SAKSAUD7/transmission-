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
       A) CAR ASSET FORM  —  Make → Model + Year dropdown
    ═══════════════════════════════════════════════════════════════ */
    const makeEl  = document.getElementById("id_make");
    const modelEl = document.getElementById("id_model");

    // ── Year: replace free-text with select ──────────────────────
    const yearEl = document.getElementById("id_year");
    if (yearEl) {
      const cur    = yearEl.value || "";
      const sel    = document.createElement("select");
      sel.id       = yearEl.id;
      sel.name     = yearEl.name;
      sel.className = yearEl.className;
      sel.appendChild(new Option("— All years —", ""));
      for (let y = new Date().getFullYear() + 1; y >= 1985; y--) {
        const o = new Option(y, y);
        if (String(y) === cur) o.selected = true;
        sel.appendChild(o);
      }
      yearEl.replaceWith(sel);
    }

    // ── Make → Model chaining ────────────────────────────────────
    if (makeEl && modelEl) {
      let allOpts = Array.from(modelEl.options).map(o => ({ v: o.value, t: o.text }));

      function loadModels() {
        const makeName = makeEl.options[makeEl.selectedIndex]?.text || "";
        const prev     = modelEl.value;
        modelEl.innerHTML = "";
        modelEl.appendChild(new Option("— All models of this make —", ""));

        if (!makeName || makeName.startsWith("—")) {
          allOpts.forEach(o => { if (o.v) modelEl.appendChild(new Option(o.t, o.v)); });
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
          })
          .catch(() => {});
      }

      makeEl.addEventListener("change", loadModels);
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
