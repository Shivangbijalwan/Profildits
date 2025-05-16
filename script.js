// Avatar upload with image preview
const avatarInput = document.getElementById('avatarInput');
const avatarDisplay = document.getElementById('avatarDisplay');

avatarDisplay.addEventListener('click', () => avatarInput.click());

avatarInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    avatarDisplay.innerHTML = `<img src="${reader.result}" alt="Avatar" class="w-full h-full object-cover rounded-full">`;
  };
  reader.readAsDataURL(file);
});

// Color picker changes profile theme
const colorPicker = document.getElementById('colorPicker');
const profileArea = document.getElementById('profile-area');

colorPicker.addEventListener('input', () => {
  const color = colorPicker.value;
  // Append opacity 10% (hex 1A = 26 decimal ~ 10%)
  profileArea.style.setProperty('background-color', color + '1A');
  profileArea.style.setProperty('border-color', color);
  profileArea.querySelectorAll('input, textarea').forEach(el => {
    el.style.backgroundColor = color + '1A';
  });
});

// AI button changes About content
const aiBtn = document.getElementById('aiBtn');
const aboutInput = document.getElementById('aboutInput');
const aiSamples = [
  "Creative front-end developer passionate about design and user experience.",
  "Problem-solver with a knack for clean, efficient code.",
  "A lifelong learner exploring the future of web and AI.",
   "I am a passionate software developer with over 5 years of experience building scalable web applications. I enjoy working with modern JavaScript frameworks and improving user experiences.",
  "Hi! I’m a web enthusiast who loves crafting beautiful and intuitive interfaces. When I’m not coding, you’ll find me exploring photography and design trends.",
  "As a lifelong learner, I am always eager to take on new challenges and improve my skills in front-end and back-end development. I thrive in collaborative environments.",
  "Dedicated team player with a strong background in software engineering. I believe in communication, collaboration, and continuous improvement.",
  "Technology fascinates me, and I’m driven by the opportunity to create innovative solutions that impact people’s lives positively.",
  "My goal is to become a full-stack developer who not only writes code but also understands business needs and user psychology.",
  "I am fascinated by data-driven solutions and AI. I enjoy working on projects that combine creativity with analytics to solve real-world problems.",
  "Energetic and motivated developer with a start-up mindset, ready to adapt and contribute effectively in fast-paced environments.",
  "Passionate about open source, I actively contribute to community projects and love sharing knowledge with fellow developers.",
  "With a background in design and development, I bridge the gap between aesthetics and functionality to deliver seamless digital experiences.",
  "I focus on building applications that solve user pain points and deliver exceptional customer experiences.",
  "Coding is my hobby and profession. I enjoy experimenting with new technologies and turning ideas into reality.",
  "Experienced in agile workflows, I value collaboration and iterative development to deliver quality software.",
  "Curious and creative coder who enjoys learning new languages and frameworks to keep skills fresh and relevant.",
  "I enjoy mentoring juniors and believe in the power of teamwork to accomplish ambitious goals.",
  "Combining analytical skills with creativity, I develop software solutions that are both efficient and user-friendly.",
  "Motivated self-starter who thrives in dynamic environments and consistently meets deadlines.",
  "I’m passionate about making tech accessible and enjoy creating inclusive user experiences.",
  "Detail-oriented developer with a knack for debugging and optimizing code for better performance.",
  "Always excited about emerging technologies like AI, blockchain, and cloud computing, eager to integrate them into my projects."

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
  profileLinks.appendChild(input);
});
const layouts = document.querySelectorAll('.profile-style > div');

layouts.forEach((layout, index) => {
  layout.addEventListener('click', () => {
    profileArea.className = 'w-full md:w-2/4 p-6 rounded shadow-lg transition-all duration-500 ease-in-out';

    switch(index) {
      case 0: // Layout 1 - Clean card with soft shadow
        profileArea.classList.add('bg-white', 'border', 'border-gray-200', 'shadow-md');
        break;
      case 1: // Layout 2 - Soft pastel background with subtle glow
        profileArea.classList.add('bg-gradient-to-br', 'from-pink-100', 'via-purple-100', 'to-blue-100', 'shadow-lg', 'ring-4', 'ring-indigo-200');
        break;
      case 2: // Layout 3 - Elevated with shadow and border-radius
        profileArea.classList.add('bg-white', 'rounded-2xl', 'shadow-xl', 'border-2', 'border-indigo-400');
        break;
      case 3: // Layout 4 - Neon glow effect with dark text
        profileArea.classList.add('bg-gray-900', 'text-white', 'rounded-xl', 'shadow-[0_0_15px_rgba(99,102,241,0.7)]', 'border', 'border-indigo-600');
        break;
      case 4: // Layout 5 - Frosted glass effect
        profileArea.classList.add('bg-white/30', 'backdrop-blur-lg', 'border', 'border-white/40', 'shadow-lg', 'text-gray-800');
        break;
      case 5: // Layout 6 - Vibrant gradient with subtle shadow
        profileArea.classList.add('bg-gradient-to-r', 'from-yellow-400', 'via-red-400', 'to-pink-500', 'text-white', 'rounded-lg', 'shadow-lg');
        break;
      case 6: // Layout 7 - Elegant card with drop shadow and smooth corners
        profileArea.classList.add('bg-white', 'rounded-xl', 'shadow-2xl', 'border', 'border-gray-300');
        break;
      case 7: // Layout 8 - Bold dark mode style with neon border
        profileArea.classList.add('bg-gray-800', 'text-white', 'rounded-lg', 'border-4', 'border-purple-500', 'shadow-[0_0_20px_rgba(139,92,246,0.7)]');
        break;
      case 8: // Layout 9 - Soft shadow with blue accent border and padding
        profileArea.classList.add('bg-white', 'border-4', 'border-blue-400', 'rounded-lg', 'shadow-md', 'p-8');
        break;
      case 9: // Layout 10 - Minimalist card with subtle hover scale
        profileArea.classList.add('bg-white', 'rounded-lg', 'shadow-sm', 'transition-transform', 'hover:scale-105');
        break;
    }
  });
});

// Generate profile shareable link & QR code with imgbb upload
const generateLinkBtn = document.getElementById('generateLinkBtn');
const shareLink = document.getElementById('shareLink');
const qrContainer = document.getElementById('qrContainer');
const qrCodeDiv = document.getElementById('qrCode');
const downloadQRBtn = document.getElementById('downloadQR');

function hideDownloadButtonDuringCapture() {
  generateLinkBtn.style.display = 'none';
  downloadQRBtn.style.display = 'none';
  shareLink.style.display = 'none';
}

function showDownloadButtonAfterCapture() {
  generateLinkBtn.style.display = '';
  downloadQRBtn.style.display = '';
  shareLink.style.display = '';
}

generateLinkBtn.addEventListener('click', async () => {
  const scrollY = window.scrollY;
  const originalPosition = profileArea.style.position;
  const originalTop = profileArea.style.top;

  hideDownloadButtonDuringCapture();

  document.getElementById("generateLinkBtn").addEventListener("click", () => {
  const link = window.location.href;

});

document.getElementById("copyLinkBtn").addEventListener("click", () => {
  const link = window.location.href;
  navigator.clipboard.writeText(link).then(() => {
    const msg = document.getElementById("copyMsg");
    msg.classList.remove("hidden");
    setTimeout(() => msg.classList.add("hidden"), 3000);
  });
});


if (navigator.share) {
  navigator.share({
    title: 'Profiledits Profile',
    text: 'Check out Profildits profile:',
    url: window.location.href
  });
}


  // Fix position to avoid scroll in canvas capture
  profileArea.style.position = 'relative';
  profileArea.style.top = `-${scrollY}px`;

  const canvas = await html2canvas(profileArea);

  // Reset position
  profileArea.style.position = originalPosition;
  profileArea.style.top = originalTop;

  showDownloadButtonAfterCapture();

  const dataUrl = canvas.toDataURL();
  const base64Image = dataUrl.split(',')[1];

  const formData = new FormData();
  formData.append("image", base64Image);

  try {
    const response = await fetch("https://api.imgbb.com/1/upload?key=6eef1f3aadb547e0e46840dfd1e63d95", {
      method: "POST",
      body: formData
    });
    const result = await response.json();
    if (result.success) {
      const imageUrl = result.data.url;

      shareLink.textContent = imageUrl;
      shareLink.href = imageUrl;
      shareLink.classList.remove('hidden');
      shareLink.style.color = "#1d4ed8"; // Tailwind blue-700
      shareLink.style.fontWeight = "bold";

      // Add Copy Button next to the link if not already present
      let copyBtn = document.getElementById('copyLinkBtn');
      if (!copyBtn) {
        copyBtn = document.createElement('button');
        copyBtn.id = 'copyLinkBtn';
        copyBtn.textContent = 'Copy Link';
        copyBtn.className = 'ml-2 px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600 transition';
        shareLink.parentNode.appendChild(copyBtn);
      }

      copyBtn.onclick = () => {
        navigator.clipboard.writeText(imageUrl).then(() => {
          copyBtn.textContent = 'Copied!';
          setTimeout(() => (copyBtn.textContent = 'Copy Link'), 1500);
        });
      };

      // Generate QR code
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
        if (!qrCanvas) return;
        const qrImg = qrCanvas.toDataURL("image/png");
        const a = document.createElement('a');
        a.href = qrImg;
        a.download = "profile_qr.png";
        a.click();
      };
    } else {
      alert('Failed to upload image. Please try again.');
    }
  } catch (error) {
    alert('Error uploading image: ' + error.message);
  }
});

// Live Preview Feature - subtle highlight on input
const inputs = document.querySelectorAll('input[type="text"], textarea');
inputs.forEach(input => {
  input.addEventListener('input', () => {
    profileArea.classList.add('ring-2', 'ring-indigo-400');
    setTimeout(() => {
      profileArea.classList.remove('ring-2', 'ring-indigo-400');
    }, 1000);
  });
});
