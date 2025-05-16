// Avatar upload with image preview
const avatarInput = document.getElementById('avatarInput');
const avatarDisplay = document.getElementById('avatarDisplay');

avatarDisplay.addEventListener('click', () => avatarInput.click());
avatarInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    avatarDisplay.innerHTML = `<img src="${reader.result}" alt="Avatar" class="w-full h-full object-cover">`;
  };
  reader.readAsDataURL(file);
});

// Color picker changes profile theme
const colorPicker = document.getElementById('colorPicker');
const profileArea = document.getElementById('profile-area');

colorPicker.addEventListener('input', () => {
  profileArea.style.borderColor = colorPicker.value;
  profileArea.style.backgroundColor = `${colorPicker.value}20`;
});

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

// Add social profile links
const profileLinks = document.getElementById('profileLinks');
const addLinkBtn = document.getElementById('addLinkBtn');

addLinkBtn.addEventListener('click', () => {
  const input = document.createElement('input');
  input.type = 'url';
  input.placeholder = 'Enter profile link';
  input.className = 'w-full mt-1 p-2 border rounded';
  input.target = '_blank';
  profileLinks.appendChild(input);
});

// Layout changer
const layouts = document.querySelectorAll('.profile-style');

layouts.forEach((layout, index) => {
  layout.addEventListener('click', () => {
    profileArea.className = 'w-full md:w-2/4 bg-white p-4 rounded shadow transition-all duration-300';
    if (index === 0) {
      profileArea.classList.add('border-2', 'border-blue-500');
    } else if (index === 1) {
      profileArea.classList.add('bg-gray-100', 'shadow-xl');
    } else if (index === 2) {
      profileArea.classList.add('scale-105');
    }
  });
});

// Generate profile shareable link & QR code
const generateLinkBtn = document.getElementById('generateLinkBtn');
const shareLink = document.getElementById('shareLink');
const qrContainer = document.getElementById('qrContainer');
const qrCodeDiv = document.getElementById('qrCode');
const downloadQRBtn = document.getElementById('downloadQR');

generateLinkBtn.addEventListener('click', async () => {
  const canvas = await html2canvas(document.getElementById('profile-area'));
  const dataUrl = canvas.toDataURL();

  const blob = await fetch(dataUrl).then(res => res.blob());
  const file = new File([blob], "profile.png", { type: "image/png" });
  const fileUrl = URL.createObjectURL(file);

  shareLink.textContent = fileUrl;
  shareLink.href = fileUrl;
  shareLink.classList.remove('hidden');

  qrCodeDiv.innerHTML = '';
  new QRCode(qrCodeDiv, {
    text: fileUrl,
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

// Dark Mode Toggle with save to localStorage
const darkToggle = document.createElement('button');
darkToggle.className = 'fixed bottom-4 right-4 bg-black text-white px-4 py-2 rounded shadow z-50';
document.body.appendChild(darkToggle);

let isDark = localStorage.getItem('darkMode') === 'true';
const applyDarkMode = () => {
  if (isDark) {
    document.body.classList.add('bg-black-900', 'text-white');
    darkToggle.innerText = '☀️ Light Mode';
  } else {
    document.body.classList.remove('bg-white-900', 'text-black');
    darkToggle.innerText = '🌙 Dark Mode';
  }
};

applyDarkMode();

darkToggle.addEventListener('click', () => {
  isDark = !isDark;
  localStorage.setItem('darkMode', isDark);
  applyDarkMode();
});
