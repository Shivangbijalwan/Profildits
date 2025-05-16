// Elements
const colorPicker = document.getElementById('colorPicker');
const colorHex = document.getElementById('colorHex');

const avatarInput = document.getElementById('avatarInput');
const avatarPreview = document.getElementById('avatarPreview');

const nameInput = document.getElementById('nameInput');
const aboutInput = document.getElementById('aboutInput');
const aiAboutBtn = document.getElementById('aiAboutBtn');

const socialProfilesContainer = document.getElementById('socialProfilesContainer');
const addSocialBtn = document.getElementById('addSocialBtn');

const skillsInput = document.getElementById('skillsInput');
const educationInput = document.getElementById('educationInput');

const interestInput = document.getElementById('interestInput');
const interestChipsContainer = document.getElementById('interestChips');

const designButtons = document.querySelectorAll('.design-button');
const profilePreview = document.getElementById('profilePreview');

const generateBtn = document.getElementById('generateLinkBtn');
const shareLink = document.getElementById('shareLink');
const qrCode = document.getElementById('qrCode');
const qrContainer = document.getElementById('qrContainer');
const downloadQR = document.getElementById('downloadQR');

// --- THEME COLOR ---

colorPicker.addEventListener('input', (e) => {
  const val = e.target.value;
  document.documentElement.style.setProperty('--user-theme-color', val);
  colorHex.textContent = val;
});

// --- AVATAR UPLOAD & BASIC ADJUSTMENT ---

avatarInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (ev) => {
    avatarPreview.style.backgroundImage = `url(${ev.target.result})`;
    avatarPreview.style.backgroundSize = 'cover';
    avatarPreview.style.backgroundPosition = 'center';
  };
  reader.readAsDataURL(file);
});

// --- ABOUT AI SUGGESTION ---

const aiAboutSuggestions = [
  "Passionate about technology and coding.",
  "Creative problem solver with strong teamwork skills.",
  "Lifelong learner excited about AI and web development.",
  "Dedicated professional with a focus on user experience.",
  "Aspiring full-stack developer with a love for design.",
];

aiAboutBtn.addEventListener('click', () => {
  // Pick a random AI suggestion from the list
  const randomSuggestion = aiAboutSuggestions[Math.floor(Math.random() * aiAboutSuggestions.length)];
  aboutInput.value = randomSuggestion;
});

// --- SOCIAL MEDIA LINKS ---

addSocialBtn.addEventListener('click', () => {
  const newInput = document.createElement('input');
  newInput.type = 'url';
  newInput.placeholder = 'Add social profile link';
  newInput.className = 'w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 mb-2';
  socialProfilesContainer.appendChild(newInput);
});

// --- INTEREST TAGS ---

interestInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && interestInput.value.trim() !== '') {
    e.preventDefault();
    addInterestChip(interestInput.value.trim());
    interestInput.value = '';
  }
});

function addInterestChip(text) {
  const chip = document.createElement('div');
  chip.className = 'inline-flex items-center bg-blue-200 text-blue-800 rounded-full px-3 py-1 m-1 cursor-pointer select-none';

  chip.textContent = text;

  const closeBtn = document.createElement('span');
  closeBtn.className = 'ml-2 text-blue-600 font-bold cursor-pointer';
  closeBtn.textContent = '×';
  closeBtn.onclick = () => chip.remove();

  chip.appendChild(closeBtn);
  interestChipsContainer.appendChild(chip);
}

// --- PROFILE DESIGN SWITCH ---

designButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Remove active class from all buttons
    designButtons.forEach(btn => btn.classList.remove('border-4', 'border-blue-600'));

    // Add active class to clicked button
    button.classList.add('border-4', 'border-blue-600');

    // Change profilePreview layout based on data-layout attribute
    const layout = button.dataset.layout;
    profilePreview.className = `p-6 rounded shadow bg-white text-gray-900 ${layout}`;
  });
});

// --- GENERATE SHARE LINK & QR CODE ---

generateBtn.addEventListener('click', () => {
  // For demo - generate a dummy unique link
  const userId = Math.floor(Math.random() * 1000000);
  const link = `https://profildits.com/user/${userId}`;

  shareLink.textContent = link;
  shareLink.href = link;
  shareLink.classList.remove('hidden');

  qrContainer.classList.remove('hidden');
  qrCode.innerHTML = ''; // Clear previous QR

  new QRCode(qrCode, {
    text: link,
    width: 150,
    height: 150,
  });

  // Setup download QR button
  setTimeout(() => {
    downloadQR.onclick = () => {
      const qrCanvas = qrCode.querySelector('canvas');
      if (!qrCanvas) return;
      const imgData = qrCanvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = imgData;
      a.download = 'profildits-qr.png';
      a.click();
    };
  }, 300);
});
