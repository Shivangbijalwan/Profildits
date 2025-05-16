// JavaScript (Complete with avatar preview, color picker, AI suggestions, interests, social links, layout switcher, shareable QR code)

// Avatar upload with image preview and drag-drop support
const avatarInput = document.getElementById('avatarInput');
const avatarDisplay = document.getElementById('avatarDisplay');

avatarDisplay.addEventListener('click', () => avatarInput.click());
avatarInput.addEventListener('change', handleAvatarUpload);
avatarDisplay.addEventListener('dragover', (e) => e.preventDefault());
avatarDisplay.addEventListener('drop', (e) => {
  e.preventDefault();
  const file = e.dataTransfer.files[0];
  if (file) previewAvatar(file);
});

function handleAvatarUpload(e) {
  const file = e.target.files[0];
  if (file) previewAvatar(file);
}

function previewAvatar(file) {
  const reader = new FileReader();
  reader.onload = () => {
    avatarDisplay.innerHTML = `<img src="${reader.result}" alt="Avatar" class="w-full h-full object-cover">`;
  };
  reader.readAsDataURL(file);
}

// Color picker changes profile theme with presets
const colorPicker = document.getElementById('colorPicker');
const profileArea = document.getElementById('profile-area');

const presets = ['#1D4ED8', '#10B981', '#F59E0B'];
const presetContainer = document.getElementById('colorPresets');
presets.forEach(color => {
  const btn = document.createElement('button');
  btn.className = 'w-6 h-6 rounded-full m-1';
  btn.style.backgroundColor = color;
  btn.onclick = () => applyThemeColor(color);
  presetContainer.appendChild(btn);
});

colorPicker.addEventListener('input', () => applyThemeColor(colorPicker.value));

function applyThemeColor(color) {
  profileArea.style.setProperty('background-color', `${color}10`);
  profileArea.style.setProperty('border-color', color);
  profileArea.querySelectorAll('input, textarea').forEach(el => {
    el.style.backgroundColor = `${color}10`;
  });
}

// AI button changes About content
const aiBtn = document.getElementById('aiBtn');
const aboutInput = document.getElementById('aboutInput');
const aiSamples = [
  "Creative front-end developer passionate about design and user experience.",
  "Problem-solver with a knack for clean, efficient code.",
  "A lifelong learner exploring the future of web and AI."
];

aiBtn.addEventListener('click', () => {
  const random = Math.floor(Math.random() * aiSamples.length);
  aboutInput.value = aiSamples[random];
});

// Interests as tag-based chips
const interestInput = document.getElementById('interestInput');
const interestChips = document.getElementById('interestChips');

interestInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    const text = interestInput.value.trim();
    if (!text) return;

    const chip = document.createElement('div');
    chip.className = 'bg-blue-200 text-blue-800 px-2 py-1 rounded-full text-sm flex items-center gap-1';
    chip.innerHTML = `${text} <span class="cursor-pointer text-red-500">&times;</span>`;
    interestChips.appendChild(chip);

    chip.querySelector('span').addEventListener('click', () => chip.remove());

    interestInput.value = '';
  }
});

// Add social profile links with limit and validation
const profileLinks = document.getElementById('profileLinks');
const addLinkBtn = document.getElementById('addLinkBtn');

addLinkBtn.addEventListener('click', () => {
  const currentLinks = profileLinks.querySelectorAll('input').length;
  if (currentLinks >= 5) return alert("You can add up to 5 links only.");

  const input = document.createElement('input');
  input.type = 'url';
  input.placeholder = 'Enter profile link';
  input.className = 'w-full mt-1 p-2 border rounded';
  input.target = '_blank';
  input.onblur = () => {
    if (!input.value.startsWith('http')) {
      alert("Please enter a valid URL starting with http or https");
      input.focus();
    }
  };
  profileLinks.appendChild(input);
});

// Layout changer
const layouts = document.querySelectorAll('.profile-style');

layouts.forEach((layout, index) => {
  layout.addEventListener('click', () => {
    profileArea.className = 'w-full md:w-2/4 p-4 rounded shadow transition-all duration-300';
    if (index === 0) {
      profileArea.classList.add('border-2', 'border-blue-500', 'bg-white');
    } else if (index === 1) {
      profileArea.classList.add('bg-gray-100', 'shadow-xl');
    } else if (index === 2) {
      profileArea.classList.add('scale-105', 'bg-white');
    }
  });
});

// Ensure all images are loaded
function ensureImagesLoaded(container) {
  const images = container.querySelectorAll('img');
  const promises = Array.from(images).map(img => {
    if (img.complete && img.naturalHeight !== 0) return Promise.resolve();
    return new Promise(resolve => {
      img.onload = img.onerror = resolve;
    });
  });
  return Promise.all(promises);
}

// Generate profile shareable link & QR code with imgbb upload
const generateLinkBtn = document.getElementById('generateLinkBtn');
const shareLink = document.getElementById('shareLink');
const qrContainer = document.getElementById('qrContainer');
const qrCodeDiv = document.getElementById('qrCode');
const downloadQRBtn = document.getElementById('downloadQR');

generateLinkBtn.addEventListener('click', async () => {
  const scrollY = window.scrollY;
  const profileAreaEl = document.getElementById('profile-area');
  const originalPosition = profileAreaEl.style.position;
  const originalTop = profileAreaEl.style.top;

  generateLinkBtn.style.display = 'none';
  downloadQRBtn.style.display = 'none';
  shareLink.style.display = 'none';

  profileAreaEl.style.position = 'relative';
  profileAreaEl.style.top = `-${scrollY}px`;

  await ensureImagesLoaded(profileAreaEl);
  const canvas = await html2canvas(profileAreaEl);

  profileAreaEl.style.position = originalPosition;
  profileAreaEl.style.top = originalTop;

  generateLinkBtn.style.display = '';
  downloadQRBtn.style.display = '';
  shareLink.style.display = '';

  const dataUrl = canvas.toDataURL();
  const base64Image = dataUrl.split(',')[1];

  const formData = new FormData();
  formData.append("image", base64Image);

  const response = await fetch("https://api.imgbb.com/1/upload?key=6eef1f3aadb547e0e46840dfd1e63d95", {
    method: "POST",
    body: formData
  });

  const result = await response.json();
  const imageUrl = result.data.url;

  shareLink.textContent = imageUrl;
  shareLink.href = imageUrl;
  shareLink.classList.remove('hidden');

  qrCodeDiv.innerHTML = '';
  new QRCode(qrCodeDiv, {
    text: imageUrl,
    width: 128,
    height: 128,
    colorDark: "#000000",
    colorLight: "#ffffff",
  });

  qrContainer.classList.remove('hidden');

  downloadQRBtn.onclick = () => {
    const qrCanvas = qrCodeDiv.querySelector('canvas');
    const qrImg = qrCanvas.toDataURL("image/png");
    const a = document.createElement('a');
    a.href = qrImg;
    a.download = "profile_qr.png";
    a.click();
  };
});

// Live Preview Feature
const inputs = document.querySelectorAll('input[type="text"], textarea');
inputs.forEach(input => {
  input.addEventListener('input', () => {
    profileArea.classList.add('ring-2', 'ring-indigo-400');
    setTimeout(() => {
      profileArea.classList.remove('ring-2', 'ring-indigo-400');
    }, 1000);
  });
});
