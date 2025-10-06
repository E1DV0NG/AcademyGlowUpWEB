// ==================== POPUP FUNCTIONALITY ====================

let currentDownloadType = null;

// Download URLs
const downloadLinks = {
  checklist:
    "files/Jak_eliminovat_stres_pred_zkouskou_nebo_pracovnim_pohovorem.pdf",
  ebook: "files/Deset_potravin_ktere_podpori_vasi_plodnost-e-book-ZDARMA.pdf",
};

// Open popup - musí být globální pro onclick
window.openPopup = function (type) {
  currentDownloadType = type;
  const popup = document.getElementById("downloadPopup");
  if (popup) {
    popup.classList.add("active");
    document.body.style.overflow = "hidden";

    // Focus on first input
    const firstInput = popup.querySelector("input");
    if (firstInput) {
      setTimeout(() => firstInput.focus(), 100);
    }
  }
};

// Close popup - musí být globální pro onclick
window.closePopup = function () {
  const popup = document.getElementById("downloadPopup");
  if (popup) {
    popup.classList.remove("active");
    document.body.style.overflow = "";

    // Reset form
    const form = document.getElementById("downloadForm");
    if (form) {
      form.reset();
    }
  }
  currentDownloadType = null;
};

// Close popup when clicking outside
document.addEventListener("DOMContentLoaded", () => {
  const popup = document.getElementById("downloadPopup");

  if (popup) {
    popup.addEventListener("click", (e) => {
      if (e.target === popup) {
        closePopup();
      }
    });
  }

  // Handle form submission
  const form = document.getElementById("downloadForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const userName = document.getElementById("userName").value;
      const userEmail = document.getElementById("userEmail").value;

      // Validace
      if (!userName || !userEmail) {
        alert("Prosím vyplňte všechna pole");
        return;
      }

      // Email validace
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(userEmail)) {
        alert("Prosím zadejte platnou e-mailovou adresu");
        return;
      }

      // TODO: Zde bude fetch API pro odeslání dat na server
      // Pro teď jen logujeme a stahujeme soubor
      console.log("Form data:", {
        name: userName,
        email: userEmail,
        type: currentDownloadType,
        timestamp: new Date().toISOString(),
      });

      /* 
      PŘIPRAVENO PRO FETCH API:
      
      fetch('/api/download-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: userName,
          email: userEmail,
          type: currentDownloadType,
          timestamp: new Date().toISOString()
        })
      })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        // Pokračovat se stažením
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('Něco se pokazilo. Prosím zkuste to znovu.');
        return;
      });
      */

      // Spustit stažení
      if (currentDownloadType && downloadLinks[currentDownloadType]) {
        const link = document.createElement("a");
        link.href = downloadLinks[currentDownloadType];
        link.download = "";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Zobrazit poděkování
        alert("Děkujeme! Váš materiál byl stažen.");
      }

      // Zavřít popup
      closePopup();
    });
  }

  // Keyboard support
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      const popup = document.getElementById("downloadPopup");
      if (popup && popup.classList.contains("active")) {
        closePopup();
      }
    }
  });
});
