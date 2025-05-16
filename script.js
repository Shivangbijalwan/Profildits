// script.js - full working version for Profildits
document.addEventListener("DOMContentLoaded", () => {
  const avatarInput = document.getElementById("avatarInput");
  const avatarDisplay = document.getElementById("avatarDisplay");
  const avatarPreview = document.getElementById("avatarPreview");
  const colorPicker = document.getElementById("colorPicker");
  const aboutInput = document.getElementById("aboutInput");
  const aboutPreview = document.getElementById("aboutPreview");
  const aiBtn = document.getElementById("aiBtn");
  const interestInput = document.getElementById("interestInput");
  const interestChips = document.getElementById("interestChips");
  const addLinkBtn = document.getElementById("addLinkBtn");
  const profileLinks = document.getElementById("profileLinks");
  const layoutButtons = document.querySelectorAll(".profile-style");
  const profileArea = document.getElementById("profile-area");
  const generateLinkBtn = document.getElementById("generateLinkBtn");
  const shareLink = document.getElementById("shareLink");
  const qrContainer = document.getElementById("qrContainer");
  const qrCode = document.getElementById("qrCode");
  const downloadQR = document.getElementById("downloadQR");

  // Avatar upload
  avatarDisplay.addEventListener("click", () => avatarInput.click());
  avatarInput.addEventListener("change", () => {
    const file = avatarInput.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        avatarPreview.innerHTML = `<img src="${reader.result}" class="w-24 h-24 rounded-full object-cover" />`;
        avatarDisplay.innerHTML = `<img src="${reader.result}" class="w-24 h-24 rounded-full object-cover" />`;
      };
      reader.readAsDataURL(file);
    }
  });

  // Theme color picker
  colorPicker.addEventListener("input", () => {
    profileArea.style.borderColor = colorPicker.value;
  });

  // About You
  aboutInput.addEventListener("input", () => {
    aboutPreview.textContent = aboutInput.value;
  });

  // AI button
  aiBtn.addEventListener("click", () => {
    const randomAbouts = [
      "Passionate coder who loves building cool web apps!",
      "Tech enthusiast with a flair for creative design.",
      "I turn coffee into code and ideas into interfaces.",
    ];
    const random = randomAbouts[Math.floor(Math.random() * randomAbouts.length)];
    aboutInput.value = random;
    aboutPreview.textContent = random;
  });

  // Interest tags
  interestInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const value = interestInput.value.trim();
      if (value) {
        const chip = document.createElement("span");
        chip.className = "bg-blue-200 px-2 py-1 rounded-full text-sm";
        chip.textContent = value;
        interestChips.appendChild(chip);
        interestInput.value = "";
      }
    }
  });

  // Add profile links
  addLinkBtn.addEventListener("click", () => {
    const link = prompt("Enter your profile link (e.g. https://github.com/user):");
    if (link && link.startsWith("http")) {
      const anchor = document.createElement("a");
      anchor.href = link;
      anchor.target = "_blank";
      anchor.className = "text-blue-600 underline text-sm";
      anchor.textContent = link;
      profileLinks.appendChild(anchor);
    }
  });

  // Layout switching
  layoutButtons.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      profileArea.className = "w-full md:w-2/4 mx-auto p-4 border-2 rounded bg-white shadow";
      if (index === 0) {
        profileArea.classList.add("border-blue-500");
      } else if (index === 1) {
        profileArea.classList.add("border-green-500", "bg-gray-50");
      } else {
        profileArea.classList.add("border-purple-500", "bg-yellow-50");
      }
    });
  });

  // Generate shareable link & QR
  generateLinkBtn.addEventListener("click", () => {
    html2canvas(profileArea).then((canvas) => {
      const dataUrl = canvas.toDataURL();
      shareLink.href = dataUrl;
      shareLink.textContent = "Click here to view/download your profile";
      shareLink.classList.remove("hidden");
      qrContainer.classList.remove("hidden");
      qrCode.innerHTML = "";
      new QRCode(qrCode, {
        text: dataUrl,
        width: 128,
        height: 128,
      });

      downloadQR.onclick = () => {
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = "profile.png";
        link.click();
      };
    });
  });
});
