# 📧 Nastavení EmailJS pro Academy GlowUp

## Co bylo implementováno

### ✅ Kontaktní stránka (kontakty.html)

- **Dvousloupcové rozložení**: vlevo kontaktní informace, vpravo formulář
- **Kontaktní formulář** s poli: jméno, email, telefon, předmět, zpráva
- **Real-time validace** formuláře
- **Loading stavy** při odesílání
- **Zprávy o úspěchu/chybě**
- **Plně responzivní** design

### ✅ Univerzální EmailJS handler (js/email-handler.js)

Jeden soubor pro:

1. **Download popup** - odesílá email při stažení materiálů + spouští download
2. **Kontaktní formulář** - odesílá email s obsahem zprávy

## 🚀 Rychlé nastavení (3 kroky)

### 1. Vytvořte EmailJS účet

Jděte na [emailjs.com](https://www.emailjs.com/) a zaregistrujte se.

### 2. Nastavte služby a šablony

#### A) Přidejte emailovou službu

- V dashboardu: **Email Services** → **Add New Service**
- Vyberte poskytovatele (Gmail, Outlook...)
- Autorizujte a poznamenejte si **Service ID**

#### B) Vytvořte 2 šablony

**Šablona 1: Download Notification**

```
Subject: Stažení materiálu - {{material_name}}

Dobrý den {{to_name}},

děkujeme za zájem! Právě jste si stáhl/a: {{material_name}}
Datum: {{download_date}}

S úctou,
Petra Fakenberg
```

Poznamenejte si **Template ID**

**Šablona 2: Contact Form**

```
Subject: Nová zpráva z webu - {{subject}}

Od: {{from_name}}
Email: {{from_email}}
Telefon: {{phone}}

Předmět: {{subject}}

Zpráva:
{{message}}

---
Odesláno: {{send_date}}
```

Poznamenejte si **Template ID**

### 3. Aktualizujte konfiguraci

Otevřete `js/email-handler.js` a na řádcích 5-11 vyplňte:

```javascript
const EMAILJS_CONFIG = {
  publicKey: "abcdefGHIJKLMN", // Váš Public Key
  serviceId: "service_abc123", // Vaše Service ID
  templateIds: {
    download: "template_download123", // Template ID pro download
    contact: "template_contact456", // Template ID pro kontakt
  },
};
```

## 📁 Struktura souborů

```
projekt/
├── index.html              # Hlavní stránka s download popup
├── kontakty.html          # NOVÁ kontaktní stránka
├── style/
│   └── style.css          # CSS (včetně nových stylů pro kontakty)
└── js/
    ├── email-handler.js   # NOVÝ univerzální EmailJS handler
    ├── hamburger.js       # Mobilní menu
    └── smooth-loading.js  # Smooth scrolling
```

## 🎯 Jak to funguje

### Download popup (index.html)

1. Uživatel klikne "Stáhnout Zdarma"
2. Otevře se popup s formulářem
3. Po odeslání:
   - Email se odešle na pozadí
   - Soubor se automaticky stáhne
   - Popup se zavře

### Kontaktní formulář (kontakty.html)

1. Uživatel vyplní formulář
2. Po odeslání:
   - Tlačítko zobrazí "Odesílám..."
   - Email se odešle
   - Zobrazí se zpráva o úspěchu/chybě
   - Formulář se vyčistí

## ⚙️ Parametry šablon

### Download Template

- `{{to_name}}` - Jméno uživatele
- `{{to_email}}` - Email uživatele
- `{{download_type}}` - checklist/ebook
- `{{material_name}}` - Název materiálu
- `{{download_date}}` - Datum stažení

### Contact Template

- `{{from_name}}` - Jméno odesílatele
- `{{from_email}}` - Email odesílatele
- `{{phone}}` - Telefon (nebo "Neuvedeno")
- `{{subject}}` - Předmět zprávy
- `{{message}}` - Text zprávy
- `{{send_date}}` - Datum odeslání

## ✅ Testování

1. **Test download popup**:

   - Otevřete index.html
   - Klikněte "Stáhnout Zdarma"
   - Vyplňte formulář
   - Zkontrolujte email

2. **Test kontaktního formuláře**:
   - Otevřete kontakty.html
   - Vyplňte formulář
   - Zkontrolujte zobrazení úspěšné zprávy
   - Zkontrolujte email

## 🔧 Troubleshooting

**Email se neodešle:**

- Zkontrolujte console v prohlížeči (F12)
- Ověřte, že všechny ID v konfiguraci jsou správné
- Zkontrolujte, že jste autorizovali emailovou službu

**Soubor se nestáhne:**

- Zkontrolujte, že cesty k souborům v `downloadLinks` jsou správné
- Ujistěte se, že složka `files/` obsahuje PDF soubory

**Formulář nejde odeslat:**

- Zkontrolujte, že je `email-handler.js` správně načten
- Ověřte, že nejsou chyby v console

## 📞 Podpora

Pro detailní dokumentaci EmailJS navštivte:

- [EmailJS Dokumentace](https://www.emailjs.com/docs/)
- [EmailJS Dashboard](https://dashboard.emailjs.com/)

---

**Hotovo! 🎉** Po nastavení EmailJS budou oba formuláře plně funkční.
