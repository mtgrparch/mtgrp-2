// script.js

// 1. The Database
const aboutData = `
  <h2>metagroupe</h2>
  <table class="modal-data-table">
    <tr><td>Team</td><td>Andrew Georges, Nahi, Charbel, Joe</td></tr>
    <tr><td>Email</td><td>info@mtgrp.xyz</td></tr>
    <tr><td>Address</td><td>Madrid, Spain</td></tr>
  </table>
  <p>metagroupe is an architectural practice focused on modularity, circularity, and metabolism in design. We approach projects across various scales, striving for structural logic and technical precision.</p>
`;

const projects = {
  "lys": {
    name: "Elderly Living Complex",
    location: "Lysá nad Labem",
    status: "Feasibility Study",
    size: "8,500 sqm",
    team: "MTGRP",
    description: "A collective housing strategy utilizing thermal mass and landscaping to activate circadian patterns for elderly residents. An additional site in Milovice replicates this strategic logic."
  },
  "med": {
    name: "The Mediterranean is not a Myth",
    location: "Exhibition",
    status: "Proposal",
    size: "N/A",
    team: "MTGRP",
    description: "An exploratory exhibition framework."
  },
  "ruk": {
    name: "Ruckhalde",
    location: "St. Gallen, Switzerland",
    status: "Competition First Prize / Feasibility",
    size: "Urban Scale",
    team: "MTGRP",
    description: "Europan winning proposal transitioning into a feasibility study for the area."
  }
};

// Replace these placeholders with your actual image paths once downloaded
const images = [
  { src: "https://via.placeholder.com/600x800/eeeeee/999999?text=Lysa+01", projectId: "lys" },
  { src: "https://via.placeholder.com/600x600/dddddd/999999?text=Lysa+02", projectId: "lys" },
  { src: "https://via.placeholder.com/600x900/cccccc/999999?text=Med+01", projectId: "med" },
  { src: "https://via.placeholder.com/600x700/bbbbbb/999999?text=Med+02", projectId: "med" },
  { src: "https://via.placeholder.com/600x800/eeeeee/999999?text=Ruk+01", projectId: "ruk" },
  { src: "https://via.placeholder.com/600x500/dddddd/999999?text=Lysa+03", projectId: "lys" },
  { src: "https://via.placeholder.com/600x850/cccccc/999999?text=Ruk+02", projectId: "ruk" },
  { src: "https://via.placeholder.com/600x750/bbbbbb/999999?text=Med+03", projectId: "med" }
];

// 2. Responsive Settings
const isMobile = window.innerWidth <= 768;
const columnCount = isMobile ? 1 : 4;
const speeds = isMobile ? [1.0] : [0.8, 1.5, 1.2, 0.5];
const margins = isMobile ? [0] : [0, -150, -75, -200];

// 3. Randomize & Build Grid
function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

function buildGrid() {
  const grid = document.getElementById('parallax-grid');
  const shuffledImages = shuffleArray([...images]);
  const columns = Array.from({ length: columnCount }, () => []);

  // Distribute images evenly across the columns
  shuffledImages.forEach((img, index) => {
    columns[index % columnCount].push(img);
  });

  columns.forEach((colImages, index) => {
    const colDiv = document.createElement('div');
    colDiv.className = 'parallax-col';
    colDiv.setAttribute('data-speed', speeds[index]);
    colDiv.style.marginTop = `${margins[index]}px`;

    let imgHTML = '';
    colImages.forEach(img => {
      imgHTML += `<img src="${img.src}" data-project="${img.projectId}" alt="Project Image">`;
    });

    // Duplicate for infinite scroll loop
    colDiv.innerHTML = imgHTML + imgHTML;
    grid.appendChild(colDiv);
  });

  attachImageListeners();
}

// 4. Modal Logic
const modalContainer = document.getElementById('modal-container');
const modalContent = document.getElementById('modal-content');
const closeModal = document.getElementById('close-modal');
const aboutBtn = document.getElementById('about-btn');

function openModal(contentHTML) {
  modalContent.innerHTML = contentHTML;
  modalContainer.classList.remove('hidden');
}

closeModal.addEventListener('click', () => {
  modalContainer.classList.add('hidden');
});

// Close modal when clicking outside the box
modalContainer.addEventListener('click', (e) => {
  if (e.target === modalContainer) {
    modalContainer.classList.add('hidden');
  }
});

aboutBtn.addEventListener('click', () => {
  openModal(aboutData);
});

function attachImageListeners() {
  const allImages = document.querySelectorAll('.parallax-col img');
  allImages.forEach(img => {
    img.addEventListener('click', (e) => {
      const projId = e.target.getAttribute('data-project');
      if(projects[projId]) {
        const p = projects[projId];
        const html = `
          <table class="modal-data-table">
            <tr><td>Project</td><td>${p.name}</td></tr>
            <tr><td>Location</td><td>${p.location}</td></tr>
            <tr><td>Status</td><td>${p.status}</td></tr>
            <tr><td>Size</td><td>${p.size}</td></tr>
            <tr><td>Team</td><td>${p.team}</td></tr>
          </table>
          <p>${p.description}</p>
        `;
        openModal(html);
      }
    });
  });
}

// 5. Unified Parallax Scroll Logic (Mouse + Touch)
let virtualScrollY = 0;

// Mouse wheel
window.addEventListener('wheel', (event) => {
  // Prevent default to stop any bouncing effects on mac
  event.preventDefault(); 
  virtualScrollY += event.deltaY;
}, { passive: false });

// Touch events for mobile
let touchStartY = 0;
window.addEventListener('touchstart', (e) => {
  touchStartY = e.touches[0].clientY;
}, { passive: false });

window.addEventListener('touchmove', (e) => {
  e.preventDefault(); // Prevents native scroll completely
  const touchY = e.touches[0].clientY;
  const deltaY = touchStartY - touchY;
  
  // Adjust sensitivity (1.5x multiplier feels natural on touch)
  virtualScrollY += deltaY * 1.5; 
  touchStartY = touchY;
}, { passive: false });

function updateParallax() {
  const cols = document.querySelectorAll('.parallax-col');
  
  cols.forEach(col => {
    const speed = parseFloat(col.getAttribute('data-speed'));
    let yPosition = -(virtualScrollY * speed);
    
    // dynamically measure height to handle image loading natively
    const singleSetHeight = col.scrollHeight / 2;

    if (singleSetHeight > 0) {
      if (Math.abs(yPosition) >= singleSetHeight) {
        yPosition = yPosition % singleSetHeight; 
      } else if (yPosition > 0) {
        yPosition = (yPosition % singleSetHeight) - singleSetHeight;
      }
      col.style.transform = `translateY(${yPosition}px)`;
    }
  });
  
  requestAnimationFrame(updateParallax);
}

// Initialize
window.addEventListener('DOMContentLoaded', () => {
  buildGrid();
  updateParallax(); // Start the loop immediately
});
