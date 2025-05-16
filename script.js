// Avatar Upload
const avatarDisplay = document.getElementById("avatarDisplay");
const avatarInput = document.getElementById("avatarInput");

avatarDisplay.addEventListener("click", () => avatarInput.click());

avatarInput.addEventListener("change", () => {
  const file = avatarInput.files[0];
  const reader = new FileReader();

  reader.onload = () => {
    avatarDisplay.style.backgroundImage = `url(${reader.result})`;
    avatarDisplay.style.backgroundSize = "cover";
    avatarDisplay.textContent = "";
  };

  if (file) reader.readAsDataURL(file);
});

// AI Button for About Text
const aboutInput = document.getElementById("aboutInput");
const aiBtn = document.getElementById("aiBtn");

const aboutSuggestions = [
  "Aspiring full-stack developer passionate about open-source.",
  "Loves solving real-world problems using tech.",
  "Creative thinker who enjoys UI/UX design.",
  "Enthusiastic coder & lifelong learner!",
  "Always building something cool with code."
];

aiBtn.addEventListener("click", () => {
  const randomIndex = Math.floor(Math.random() * aboutSuggestions.length);
  aboutInput.value = aboutSuggestions[randomIndex];
});

// Color Palette Buttons
document.querySelectorAll(".color-btn").forEach(button => {
  button.addEventListener("click", () => {
    const color = button.getAttribute("data-color");
    const profileArea = document.getElementById("profile-area");

    // Reset and apply selected color
    profileArea.className = `w-full md:w-2/4 p-4 rounded shadow ${color} transition-all duration-500`;
  });
});

// Layout Switcher (Just UI swap for now)
document.querySelectorAll(".profile-style").forEach((style, index) => {
  style.addEventListener("click", () => {
    alert(`Switched to layout ${index + 1} (You can extend this with layout templates)`);
  });
});

// Download Profile as Image
document.getElementById("downloadBtn").addEventListener("click", () => {
  html2canvas(document.getElementById("profile-area")).then(canvas => {
    const link = document.createElement("a");
    link.download = "profile.png";
    link.href = canvas.toDataURL();
    link.click();
  });
});
