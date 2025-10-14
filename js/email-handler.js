// ==================== EMAILJS CONFIGURATION ====================
// Konfigurace EmailJS - VYPLŇTE VLASTNÍ ÚDAJE
// Návod k nastavení: https://www.emailjs.com/
const EMAILJS_CONFIG = {
  publicKey: "M-53nojOKgudSHGhZ", // Získejte na https://dashboard.emailjs.com/admin/account
  serviceId: "service_jp0y46s", // ID vašeho emailové služby (např. service_abc123)
  templateIds: {
    download: "template_t4ch6sz", // Template ID pro stažení materiálů
    contact: "template_td9bbb9", // Template ID pro kontaktní formulář
  },
};

// Download URLs
const downloadLinks = {
  checklist:
    "files/Jak_eliminovat_stres_pred_zkouskou_nebo_pracovnim_pohovorem.pdf",
  ebook: "files/Deset_potravin_ktere_podpori_vasi_plodnost-e-book-ZDARMA.pdf",
};

// ==================== EMAILJS INITIALIZATION ====================
let emailjsLoaded = false;

function loadEmailJS() {
  return new Promise((resolve, reject) => {
    if (emailjsLoaded) {
      resolve();
      return;
    }

    const script = document.createElement("script");
    script.src =
      "https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js";
    script.async = true;

    script.onload = () => {
      emailjs.init(EMAILJS_CONFIG.publicKey);
      emailjsLoaded = true;
      resolve();
    };

    script.onerror = () => {
      reject(new Error("Failed to load EmailJS"));
    };

    document.head.appendChild(script);
  });
}

// ==================== DOWNLOAD POPUP FUNCTIONALITY ====================
let currentDownloadType = null;

window.openPopup = function (type) {
  currentDownloadType = type;
  const popup = document.getElementById("downloadPopup");
  if (popup) {
    popup.classList.add("active");
    document.body.style.overflow = "hidden";

    const firstInput = popup.querySelector("input");
    if (firstInput) {
      setTimeout(() => firstInput.focus(), 100);
    }
  }
};

window.closePopup = function () {
  const popup = document.getElementById("downloadPopup");
  if (popup) {
    popup.classList.remove("active");
    document.body.style.overflow = "";

    const form = document.getElementById("downloadForm");
    if (form) {
      form.reset();
    }
  }
  currentDownloadType = null;
};

async function sendDownloadEmail(
  userName,
  userEmail,
  downloadType,
  gdprConsent,
  marketingConsent
) {
  try {
    await loadEmailJS();

    const templateParams = {
      user_name: userName,
      user_email: userEmail,
      download_type: downloadType,
      download_date: new Date().toLocaleString("cs-CZ"),
      material_name:
        downloadType === "checklist"
          ? "Check List - Jak eliminovat stres před zkouškou"
          : "E-book - Deset potravin, které podpoří vaši plodnost",
      gdpr_consent: gdprConsent ? "ANO - povinný souhlas" : "NE",
      marketing_consent: marketingConsent
        ? "ANO - souhlasí s marketingem"
        : "NE - nesouhlasí",
    };

    await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templateIds.download,
      templateParams
    );

    console.log("Download notification sent to Petra");
    return true;
  } catch (error) {
    console.error("Error sending download notification:", error);
    throw error; // Propagujeme chybu - bez emailu nedovolíme stažení
  }
}

function initiateDownload(downloadType) {
  if (downloadType && downloadLinks[downloadType]) {
    const link = document.createElement("a");
    link.href = downloadLinks[downloadType];
    link.download = "";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return true;
  }
  return false;
}

// ==================== CONTACT FORM FUNCTIONALITY ====================
async function sendContactEmail(formData) {
  try {
    await loadEmailJS();

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      phone: formData.phone || "Neuvedeno",
      subject: formData.subject,
      message: formData.message,
      send_date: new Date().toLocaleString("cs-CZ"),
    };

    await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templateIds.contact,
      templateParams
    );

    console.log("Contact email sent successfully");
    return { success: true };
  } catch (error) {
    console.error("Error sending contact email:", error);
    return {
      success: false,
      error: error.text || "Něco se pokazilo. Prosím zkuste to znovu.",
    };
  }
}

function showFormMessage(formId, message, type) {
  const messageEl = document.getElementById("formMessage");
  if (messageEl) {
    messageEl.textContent = message;
    messageEl.className = `form-message ${type}`;
    messageEl.style.display = "block";

    // Auto-hide success messages after 5 seconds
    if (type === "success") {
      setTimeout(() => {
        messageEl.style.display = "none";
      }, 5000);
    }
  }
}

function setButtonLoading(button, isLoading) {
  if (button) {
    button.disabled = isLoading;
    if (isLoading) {
      button.classList.add("loading");
    } else {
      button.classList.remove("loading");
    }
  }
}

// ==================== EVENT LISTENERS ====================
document.addEventListener("DOMContentLoaded", () => {
  // Download Popup Handlers
  const popup = document.getElementById("downloadPopup");
  if (popup) {
    popup.addEventListener("click", (e) => {
      if (e.target === popup) {
        closePopup();
      }
    });
  }

  const downloadForm = document.getElementById("downloadForm");
  if (downloadForm) {
    downloadForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const userName = document.getElementById("userName").value.trim();
      const userEmail = document.getElementById("userEmail").value.trim();
      const gdprConsent = document.getElementById("gdprConsent").checked;
      const marketingConsent =
        document.getElementById("marketingConsent").checked;
      const submitBtn = downloadForm.querySelector('button[type="submit"]');

      // Validace
      if (!userName || !userEmail) {
        alert("Prosím vyplňte všechna pole");
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(userEmail)) {
        alert("Prosím zadejte platnou e-mailovou adresu");
        return;
      }

      // Kontrola GDPR souhlasu (povinné)
      if (!gdprConsent) {
        alert(
          "Pro stažení materiálu musíte souhlasit se zásadami ochrany osobních údajů"
        );
        return;
      }

      // Zobrazit loading stav
      setButtonLoading(submitBtn, true);
      const originalText = submitBtn.textContent;
      submitBtn.textContent = "Odesílám...";

      try {
        // NEJDŘÍV odeslat email Petře s informací o souhlasech
        await sendDownloadEmail(
          userName,
          userEmail,
          currentDownloadType,
          gdprConsent,
          marketingConsent
        );

        // Teprve PO úspěšném odeslání spustit stažení
        const downloaded = initiateDownload(currentDownloadType);

        if (downloaded) {
          alert("Děkujeme! Váš materiál se stahuje.");
        } else {
          alert("Omlouváme se, materiál není momentálně dostupný.");
        }

        closePopup();
      } catch (error) {
        // Pokud email selže, NEpovolíme stažení
        alert(
          "Omlouváme se, došlo k chybě při odesílání. Prosím zkuste to znovu."
        );
      } finally {
        setButtonLoading(submitBtn, false);
        submitBtn.textContent = originalText;
      }
    });
  }

  // Contact Form Handler
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const messageEl = document.getElementById("formMessage");

      // Get form data
      const formData = {
        name: document.getElementById("contactName").value.trim(),
        email: document.getElementById("contactEmail").value.trim(),
        phone: document.getElementById("contactPhone").value.trim(),
        subject: document.getElementById("contactSubject").value.trim(),
        message: document.getElementById("contactMessage").value.trim(),
      };

      // Validace
      if (
        !formData.name ||
        !formData.email ||
        !formData.subject ||
        !formData.message
      ) {
        showFormMessage(
          "contactForm",
          "Prosím vyplňte všechna povinná pole",
          "error"
        );
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        showFormMessage(
          "contactForm",
          "Prosím zadejte platnou e-mailovou adresu",
          "error"
        );
        return;
      }

      // Set loading state
      setButtonLoading(submitBtn, true);
      if (messageEl) messageEl.style.display = "none";

      // Send email
      const result = await sendContactEmail(formData);

      // Reset loading state
      setButtonLoading(submitBtn, false);

      if (result.success) {
        showFormMessage(
          "contactForm",
          "Děkujeme za vaši zprávu! Brzy se vám ozvu.",
          "success"
        );
        contactForm.reset();
      } else {
        showFormMessage("contactForm", result.error, "error");
      }
    });
  }

  // Keyboard support for popup
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      const popup = document.getElementById("downloadPopup");
      if (popup && popup.classList.contains("active")) {
        closePopup();
      }
    }
  });
});

// ==================== CONSOLE INFO ====================
console.log(
  "Email Handler loaded. Remember to configure EmailJS settings in email-handler.js"
);
console.log(
  "Visit https://www.emailjs.com/ to set up your account and get API keys"
);
