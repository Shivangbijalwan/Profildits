const avatarInput = document.getElementById('avatarInput');
const avatarPreview = document.getElementById('avatarPreview');
const skillInput = document.getElementById('skillInput');
const interestInput = document.getElementById('interestInput');
const skills = document.getElementById('skills');
const interests = document.getElementById('interests');

let skillList = [];
let interestList = [];

// Avatar Upload Preview
avatarInput.addEventListener('change', () => {
  const file = avatarInput.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      avatarPreview.style.backgroundImage = `url(${reader.result})`;
      avatarPreview.textContent = '';
    };
    reader.readAsDataURL(file);
  }
});

// Skill Tag Entry
skillInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    e.preventDefault();
    const val = skillInput.value.trim();
    if (val && !skillList.includes(val)) {
      skillList.push(val);
      updateTags(skills, skillList);
      skillInput.value = '';
    }
  }
});

// Interest Tag Entry
interestInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    e.preventDefault();
    const val = interestInput.value.trim();
    if (val && !interestList.includes(val)) {
      interestList.push(val);
      updateTags(interests, interestList);
      interestInput.value = '';
    }
  }
});

function updateTags(container, list) {
  container.innerHTML = '';
  list.forEach(tag => {
    const el = document.createElement('span');
    el.textContent = tag;
    el.className = 'bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm';
    container.appendChild(el);
  });
}

// Download Profile
function downloadProfile() {
  const profile = {
    name: document.getElementById('name').value,
    about: document.getElementById('about').value,
    linkedin: document.getElementById('linkedin').value,
    github: document.getElementById('github').value,
    education: document.getElementById('education').value,
    skills: skillList,
    interests: interestList,
  };
  const blob = new Blob([JSON.stringify(profile, null, 2)], { type: 'application/json' });
  saveAs(blob, 'profildits-profile.json');
}

// AI Suggest About (fake for now)
function suggestAbout() {
  document.getElementById('about').value = "I'm a passionate developer who loves building web apps and exploring tech.";
}

// Auto-delete data on tab close
window.onbeforeunload = () => localStorage.clear();
