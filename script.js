// ─────────────────────────────────────────────────────────────────────────────
//  MTGRP — script.js
//  Parallax image grid with smooth inertia scrolling, project modals,
//  about modal, and work list modal. All data lives in PROJECTS below.
// ─────────────────────────────────────────────────────────────────────────────

// ── 1. ABOUT DATA ────────────────────────────────────────────────────────────
const ABOUT_HTML = `
  <h2>MTGRP</h2>
  <p class="about-statement">
    Architecture concerned with metabolism and circularity — a political approach
    to temperature, material expression, and collective use. We are interested in
    the spaces in between.
  </p>
  <div class="about-partners">
    <div>
      <div class="partner-name">Andrew Georges</div>
      <div class="partner-role">Partner</div>
    </div>
    <div>
      <div class="partner-name">Charbel Abou Chacra</div>
      <div class="partner-role">Partner</div>
    </div>
    <div>
      <div class="partner-name">Nahi El Khoury</div>
      <div class="partner-role">Partner</div>
    </div>
    <div>
      <div class="partner-name">Joe Chamata</div>
      <div class="partner-role">Partner</div>
    </div>
  </div>
  <table class="modal-data-table">
    <tr><td>Email</td><td><a href="mailto:contact@mtgrp.xyz" style="color:#0033FF;text-decoration:none">contact@mtgrp.xyz</a></td></tr>
    <tr><td>Instagram</td><td><a href="https://www.instagram.com/metagroupe/" target="_blank" style="color:#0033FF;text-decoration:none">@metagroupe</a></td></tr>
    <tr><td>Offices</td><td>Beirut &nbsp;·&nbsp; Madrid &nbsp;·&nbsp; Milan</td></tr>
    <tr><td>Est.</td><td>2018</td></tr>
  </table>
`;

// ── 2. PROJECT REGISTRY ───────────────────────────────────────────────────────
//  id         — unique key, matches photo filenames: photos/p01-01.jpg etc.
//  title      — project name
//  subtitle   — typology / competition note
//  desc       — description shown in modal
//  location   — city / country
//  type       — programme
//  size       — area or scale
//  budget     — if disclosed
//  status     — current status
//  team       — array of names
//  collab     — array of collaborator names
//  photos     — number of photos available (files: photos/<id>-01.jpg …)
//               Set to 0 if no photos yet — placeholder shown instead.
//
//  ORDER: newest first. The grid shuffles them visually anyway.
// ─────────────────────────────────────────────────────────────────────────────

const PROJECTS = [
  {
    id: "p14",
    title: "XXXXXXXXXX",
    subtitle: "XXXXXXXXXX",
    desc: "XXXXXXXXXX",
    location: "XXXXXXXXXX",
    type: "—",
    size: "—",
    budget: "—",
    status: "Forthcoming",
    team: ["Andrew Georges", "Charbel Abou Chacra", "Nahi El Khoury", "Joe Chamata"],
    collab: [],
    photos: 0,
  },
  {
    id: "p13",
    title: "A Home in the Sun",
    subtitle: "Coliving for Seniors",
    desc: "An elderly coliving home for seniors in Lysá nad Labem, Czech Republic. The project proposes a shared domestic environment that rethinks how aging populations inhabit collective space — prioritising thermal comfort, communal activity, and open-ended use over institutional typology. Warmth, both climatic and social, is the organising principle.",
    location: "Lysá nad Labem, CZ",
    type: "Coliving / Housing",
    size: "—",
    budget: "—",
    status: "—",
    team: ["Andrew Georges", "Charbel Abou Chacra", "Nahi El Khoury", "Joe Chamata"],
    collab: [],
    photos: 10,
  },
  {
    id: "p11",
    title: "Die Den Gletscher Bewohnen",
    subtitle: "Europan — Winner",
    desc: "Winning entry for the Europan competition. The project addresses inhabitation in proximity to glacial landscape, proposing a model of dwelling responsive to extreme thermal and ecological conditions. The glacier is not backdrop but partner — a slow, material presence that shapes the logic of the building.",
    location: "—",
    type: "Competition",
    size: "—",
    budget: "—",
    status: "Winner",
    team: ["Andrew Georges", "Charbel Abou Chacra", "Nahi El Khoury", "Joe Chamata"],
    collab: [],
    photos: 0,
  },
  {
    id: "p10",
    title: "Holcim Visitor Center",
    subtitle: "Competition Entry",
    desc: "Competition entry for the Holcim Visitor Center. The proposal engages with the material logic of cement and industrial production as the conceptual basis for a public-facing cultural building. The building performs its own material origin.",
    location: "—",
    type: "Cultural",
    size: "—",
    budget: "—",
    status: "Competition entry",
    team: ["Andrew Georges", "Charbel Abou Chacra", "Nahi El Khoury", "Joe Chamata"],
    collab: [],
    photos: 0,
  },
  {
    id: "p09",
    title: "Santa María de Valdeiglesias",
    subtitle: "Adaptive Reuse — 2nd Prize",
    desc: "Second prize in the competition for the adaptive reuse of the monastery of Santa María de Valdeiglesias. The project negotiates between the preserved fabric of a historic religious complex and a contemporary programme for collective inhabitation — working with rather than against the existing spatial hierarchies of monastic life.",
    location: "Pelayos de la Presa, ES",
    type: "Heritage / Adaptive Reuse",
    size: "—",
    budget: "—",
    status: "2nd Prize",
    team: ["Andrew Georges", "Charbel Abou Chacra", "Nahi El Khoury", "Joe Chamata"],
    collab: [],
    photos: 5,
  },
  {
    id: "p08",
    title: "Papushevo Park",
    subtitle: "Urban Development",
    desc: "An urban development combining a public park, kindergarten, and office buildings. The park is the structuring element of the ensemble — a ground that organises collective life rather than filling residual space between built volumes.",
    location: "Russia",
    type: "Urban / Mixed Use",
    size: "—",
    budget: "—",
    status: "—",
    team: ["Andrew Georges", "Charbel Abou Chacra", "Nahi El Khoury", "Joe Chamata"],
    collab: [],
    photos: 7,
  },
  {
    id: "p07",
    title: "Casa de Aperos",
    subtitle: "Collective Housing",
    desc: "A collective housing project in Eivissa working with the existing agricultural typology of the island — the tool shed or farm annex — as a model for shared domestic organisation in a dense Mediterranean context. The vernacular is not quoted but inhabited.",
    location: "Eivissa, ES",
    type: "Housing",
    size: "—",
    budget: "—",
    status: "—",
    team: ["Andrew Georges", "Charbel Abou Chacra", "Nahi El Khoury", "Joe Chamata"],
    collab: [],
    photos: 10,
  },
  {
    id: "p06b",
    title: "Three Brothers",
    subtitle: "Three Pavilions",
    desc: "Three pavilions for three brothers on the coast of Amchit, Lebanon. Each pavilion is distinct — a singular response to a shared site — while the three together constitute a small domestic landscape on the water's edge.",
    location: "Amchit, Lebanon",
    type: "Residential / Pavilion",
    size: "—",
    budget: "—",
    status: "—",
    team: ["Andrew Georges", "Charbel Abou Chacra", "Nahi El Khoury", "Joe Chamata"],
    collab: [],
    photos: 7,
  },
  {
    id: "p06",
    title: "Cárcel Abierta",
    subtitle: "Adaptive Reuse",
    desc: "Adaptive reuse of a prison in Chile. The project addresses the conversion of a site of confinement into a structure for collective life — working through the existing spatial order of the penitentiary as an architectural argument about openness and enclosure.",
    location: "Chile",
    type: "Heritage / Adaptive Reuse",
    size: "—",
    budget: "—",
    status: "—",
    team: ["Andrew Georges", "Charbel Abou Chacra", "Nahi El Khoury", "Joe Chamata"],
    collab: [],
    photos: 0,
  },
  {
    id: "p05",
    title: "Amchit Fire Proving Grounds",
    subtitle: "Ephemeral Station",
    desc: "A temporary firefighter training station in Amchit, Lebanon — designed to transform into a public park for children once its operational phase is complete. A single structure serving two sequential programmes, using material and landscape logic to negotiate the transition between them.",
    location: "Amchit, Lebanon",
    type: "Public / Ephemeral",
    size: "—",
    budget: "—",
    status: "—",
    team: ["Andrew Georges", "Charbel Abou Chacra", "Nahi El Khoury", "Joe Chamata"],
    collab: [],
    photos: 0,
  },
  {
    id: "p04",
    title: "Dancing House",
    subtitle: "Adaptive Reuse & Coliving",
    desc: "A collaborative adaptive project for a traditional house in Beit Mery. The existing structure is adapted for a coliving situation with communal activities, and the garden is populated with a series of follies that extend the collective life of the house into the landscape.",
    location: "Beit Mery, Lebanon",
    type: "Residential / Coliving",
    size: "—",
    budget: "—",
    status: "—",
    team: ["Andrew Georges", "Charbel Abou Chacra", "Nahi El Khoury", "Joe Chamata"],
    collab: [],
    photos: 0,
  },
  {
    id: "p03",
    title: "RAZ House",
    subtitle: "Interior Design",
    desc: "Interior design for a two-floor apartment. The project works at the scale of the domestic interior — material sequence, threshold, and the spatial relationship between shared and private life across two levels.",
    location: "—",
    type: "Interior Design",
    size: "Duplex — 2 floors",
    budget: "—",
    status: "—",
    team: ["Andrew Georges", "Charbel Abou Chacra", "Nahi El Khoury", "Joe Chamata"],
    collab: [],
    photos: 0,
  },
  {
    id: "p02",
    title: "Baglietto Pavilion",
    subtitle: "Competition — Honourable Mention",
    desc: "Competition entry for the Baglietto Pavilion, receiving an honourable mention. A proposal exploring temporary structure, public presence, and the architecture of gathering — a single gesture that is simultaneously enclosure and threshold.",
    location: "—",
    type: "Pavilion / Competition",
    size: "—",
    budget: "—",
    status: "Honourable Mention",
    team: ["Andrew Georges", "Charbel Abou Chacra", "Nahi El Khoury", "Joe Chamata"],
    collab: [],
    photos: 0,
  },
  {
    id: "p01",
    title: "KWL — Beirut River",
    subtitle: "Competition — 1st Prize",
    desc: "First prize in the KWL competition. The project reframes the infrastructure of the Beirut River as a site of meeting — proposing that the engineered channel, rather than dividing, can become the basis for a new form of urban public space. Infrastructure as meeting place.",
    location: "Beirut, Lebanon",
    type: "Infrastructure / Public Space",
    size: "—",
    budget: "—",
    status: "1st Prize",
    team: ["Andrew Georges", "Charbel Abou Chacra", "Nahi El Khoury", "Joe Chamata"],
    collab: [],
    photos: 0,
  },
];

// ── 3. WORK LIST MODAL HTML ───────────────────────────────────────────────────
function buildWorkListHTML() {
  let rows = PROJECTS.map((p, i) => {
    const num = String(i + 1).padStart(2, '0');
    return `
      <tr class="work-row" data-id="${p.id}" style="cursor:pointer">
        <td style="color:#ccc;font-family:'Karla',sans-serif;font-size:0.7rem;
                   letter-spacing:0.08em;padding-top:3px;width:36px">${num}</td>
        <td style="font-size:1.1rem;padding-right:24px">${p.title}
          ${p.subtitle ? `<span style="font-style:italic;color:#888;font-size:0.85em"> — ${p.subtitle}</span>` : ''}
        </td>
        <td style="font-style:italic;font-size:0.85rem;color:#888;
                   text-align:right;white-space:nowrap">${p.location}</td>
      </tr>`;
  }).join('');

  return `
    <h2>Work — ${PROJECTS.length} projects</h2>
    <table class="modal-data-table" style="margin-bottom:0">
      <tbody>${rows}</tbody>
    </table>`;
}

// ── 4. PROJECT MODAL HTML ─────────────────────────────────────────────────────
function buildProjectHTML(p) {
  const teamHTML = p.team.length
    ? `<ul class="modal-team-list">${p.team.map(n => `<li>${n}</li>`).join('')}</ul>`
    : '—';
  const collabHTML = p.collab.length
    ? `<ul class="modal-team-list">${p.collab.map(n => `<li>${n}</li>`).join('')}</ul>`
    : null;

  return `
    <h2>${p.title}</h2>
    <table class="modal-data-table">
      <tr><td>Location</td><td>${p.location}</td></tr>
      <tr><td>Type</td><td>${p.type}</td></tr>
      <tr><td>Size</td><td>${p.size}</td></tr>
      <tr><td>Budget</td><td>${p.budget}</td></tr>
      <tr><td>Status</td><td>${p.status}</td></tr>
      <tr><td>Team</td><td>${teamHTML}</td></tr>
      ${collabHTML ? `<tr><td>Collaborators</td><td>${collabHTML}</td></tr>` : ''}
    </table>
    <p class="modal-desc">${p.desc}</p>`;
}

// ── 5. BUILD PARALLAX GRID ────────────────────────────────────────────────────
//  Each project contributes placeholder tiles (one per photo slot, min 1).
//  When you add real photos, replace the placeholder src with the real path.

const isMobile   = window.innerWidth <= 768;
const COL_COUNT  = isMobile ? 1 : 3;
const SPEEDS     = isMobile ? [1.0] : [0.7, 1.35, 0.55];
const MARGINS    = isMobile ? [0]   : [0, -200, -110];

// Build a flat list of image tiles from all projects
function buildTileList() {
  const tiles = [];
  PROJECTS.forEach(p => {
    const count = Math.max(p.photos, 1); // always at least 1 tile per project
    for (let i = 1; i <= count; i++) {
      const num = String(i).padStart(2, '0');
      const src = p.photos > 0
        ? `photos/${p.id}-${num}.jpg`
        : null; // null = show styled placeholder
      tiles.push({ src, projectId: p.id, label: p.title });
    }
  });
  // shuffle so projects interleave across columns
  return tiles.sort(() => Math.random() - 0.5);
}

function buildGrid() {
  const grid = document.getElementById('parallax-grid');
  const tiles = buildTileList();
  const columns = Array.from({ length: COL_COUNT }, () => []);

  tiles.forEach((tile, i) => columns[i % COL_COUNT].push(tile));

  columns.forEach((colTiles, ci) => {
    const col = document.createElement('div');
    col.className = 'parallax-col';
    col.dataset.speed = SPEEDS[ci];
    col.style.marginTop = `${MARGINS[ci]}px`;

    // Build tile HTML — real img or placeholder div
    const tileHTML = colTiles.map(tile => {
      if (tile.src) {
        return `<img src="${tile.src}" data-id="${tile.projectId}" alt="${tile.label}" loading="lazy">`;
      } else {
        // Placeholder — styled box showing project title
        return `
          <div class="img-placeholder" data-id="${tile.projectId}"
               style="width:100%;background:#f0f0f0;min-height:220px;
                      display:flex;align-items:flex-end;padding:16px;
                      cursor:pointer;box-sizing:border-box;
                      font-family:'EB Garamond',serif;font-style:italic;
                      font-size:0.9rem;color:#aaa;">
            ${tile.label}
          </div>`;
      }
    }).join('');

    // Duplicate for infinite loop
    col.innerHTML = tileHTML + tileHTML;
    grid.appendChild(col);
  });

  attachClickListeners();
}

// ── 6. MODAL SYSTEM ───────────────────────────────────────────────────────────
const modalContainer = document.getElementById('modal-container');
const modalContent   = document.getElementById('modal-content');
const closeBtn       = document.getElementById('close-modal');

function openModal(html) {
  modalContent.innerHTML = html;
  modalContainer.classList.remove('hidden');
  // After opening work list, attach row click handlers
  document.querySelectorAll('.work-row').forEach(row => {
    row.addEventListener('click', () => {
      const p = PROJECTS.find(x => x.id === row.dataset.id);
      if (p) openModal(buildProjectHTML(p));
    });
    row.addEventListener('mouseenter', () => row.style.color = '#0033FF');
    row.addEventListener('mouseleave', () => row.style.color = '');
  });
}

closeBtn.addEventListener('click', () => modalContainer.classList.add('hidden'));
modalContainer.addEventListener('click', e => {
  if (e.target === modalContainer) modalContainer.classList.add('hidden');
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') modalContainer.classList.add('hidden');
});

document.getElementById('about-btn').addEventListener('click', () => openModal(ABOUT_HTML));


function attachClickListeners() {
  // both real <img> and placeholder <div> tiles
  document.querySelectorAll('.parallax-col img, .img-placeholder').forEach(el => {
    el.addEventListener('click', () => {
      const p = PROJECTS.find(x => x.id === el.dataset.id);
      if (p) openModal(buildProjectHTML(p));
    });
  });
}

// ── 7. SMOOTH INERTIA SCROLL ──────────────────────────────────────────────────
//  virtualScrollY  = raw target (driven by wheel/touch)
//  smoothScrollY   = interpolated actual position (lerped each frame)
//  This gives the buttery "easing" feel instead of instant jumps.

let virtualScrollY = 0;
let smoothScrollY  = 0;
const LERP_FACTOR  = 0.08; // lower = smoother/slower, higher = snappier

// Mouse wheel — accumulate delta
window.addEventListener('wheel', e => {
  e.preventDefault();
  virtualScrollY += e.deltaY * 0.9;
}, { passive: false });

// Touch
let touchStartY = 0;
window.addEventListener('touchstart', e => {
  touchStartY = e.touches[0].clientY;
}, { passive: false });

window.addEventListener('touchmove', e => {
  e.preventDefault();
  const delta = touchStartY - e.touches[0].clientY;
  virtualScrollY += delta * 1.5;
  touchStartY = e.touches[0].clientY;
}, { passive: false });

// Trackpad momentum — deltaMode 0 = pixels (trackpad), apply less multiplier
window.addEventListener('wheel', () => {}, { passive: true }); // dummy to suppress warning

function lerp(a, b, t) { return a + (b - a) * t; }

function updateParallax() {
  // Smooth interpolation toward target
  smoothScrollY = lerp(smoothScrollY, virtualScrollY, LERP_FACTOR);

  const cols = document.querySelectorAll('.parallax-col');
  cols.forEach(col => {
    const speed = parseFloat(col.dataset.speed);
    let y = -(smoothScrollY * speed);

    // Infinite loop: when we've scrolled a full "set" height, reset
    const halfHeight = col.scrollHeight / 2;
    if (halfHeight > 0) {
      y = ((y % halfHeight) + halfHeight) % halfHeight - halfHeight;
      // handle upward scroll
      if (smoothScrollY < 0) {
        y = -(Math.abs(smoothScrollY * speed) % halfHeight);
        if (y < -halfHeight) y += halfHeight;
      }
    }

    col.style.transform = `translateY(${y}px)`;
  });

  requestAnimationFrame(updateParallax);
}

// ── 8. INIT ───────────────────────────────────────────────────────────────────
window.addEventListener('DOMContentLoaded', () => {
  buildGrid();
  requestAnimationFrame(updateParallax);
});
