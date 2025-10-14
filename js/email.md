# 📧 Nastavení EmailJS pro Academy GlowUp

## ✅ Co bylo změněno

### Nová logika:

1. **Email jde Petře** (ne uživateli) - dostane info o novém stahovači
2. **Stažení až po emailu** - soubor se stáhne pouze po úspěšném odeslání
3. **Lepší UX** - tlačítko zobrazuje "Odesílám..." během zpracování

---

## 🚀 Rychlé nastavení EmailJS

### Krok 1: Vytvořte účet

- Jděte na [emailjs.com](https://www.emailjs.com/)
- Zaregistrujte se pomocí **academyglowupweb@gmail.com**

### Krok 2: Přidejte emailovou službu

1. V dashboardu: **Email Services** → **Add New Service**
2. Vyberte **Gmail**
3. Autorizujte účet **academyglowupweb@gmail.com**
4. Poznamenejte si **Service ID** (např. `service_abc123`)

### Krok 3: Vytvořte šablony

#### 📥 Šablona 1: Download Notification (pro Petru)

**Nastavení v EmailJS:**

- Template Name: `Download Notification`
- Subject: `Nové stažení: {{material_name}}`
- To Email: **academyglowupweb@gmail.com** (nebo váš preferovaný email)

**Obsah šablony:**

```
Dobrý den Petro,

nový uživatel si právě stáhl materiál z webu.

👤 ÚDAJE UŽIVATELE:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Jméno: {{user_name}}
Email: {{user_email}}

📄 STAŽENÝ MATERIÁL:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Typ: {{download_type}}
Název: {{material_name}}
Datum: {{download_date}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Tento email byl automaticky vygenerován z webu Academy GlowUp.
```

**Poznamenejte si Template ID** (např. `template_xyz789`)

---

#### 📨 Šablona 2: Contact Form (pro Petru)

**Nastavení v EmailJS:**

- Template Name: `Contact Form Message`
- Subject: `Nová zpráva: {{subject}}`
- To Email: **academyglowupweb@gmail.com**

**Obsah šablony:**

```
Dobrý den Petro,

máte novou zprávu z kontaktního formuláře.

👤 OD KOHO:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Jméno: {{from_name}}
Email: {{from_email}}
Telefon: {{phone}}

📧 PŘEDMĚT:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
{{subject}}

💬 ZPRÁVA:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
{{message}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Odesláno: {{send_date}}

Tento email byl automaticky vygenerován z webu Academy GlowUp.
```

**Poznamenejte si Template ID** (např. `template_abc456`)

---

### Krok 4: Získejte Public Key

1. V dashboardu jděte na **Account** → **API Keys**
2. Zkopírujte **Public Key** (např. `M-53nojOKgudSHGhZ`)

---

### Krok 5: Aktualizujte konfiguraci

Otevřete soubor **`js/email-handler.js`** a na řádcích 5-11 vyplňte:

```javascript
const EMAILJS_CONFIG = {
  publicKey: "M-53nojOKgudSHGhZ", // ✅ Už máte
  serviceId: "service_abc123", // ⬅️ ZDE vyplňte Service ID
  templateIds: {
    download: "template_xyz789", // ⬅️ ZDE Template ID pro download
    contact: "template_abc456", // ⬅️ ZDE Template ID pro kontakt
  },
};
```

---

## 🎯 Jak to funguje nyní

### Download Popup (index.html)

```
1. Uživatel klikne "Stáhnout Zdarma"
2. Vyplní jméno a email
3. Klikne "Stáhnout" → tlačítko změní text na "Odesílám..."
4. ✉️ Odešle se email PETŘE s údaji o uživateli
5. ✅ Pouze po úspěšném odeslání se spustí stažení
6. ❌ Pokud email selže, stažení se NESPUSTÍ (zobrazí se chyba)
```

### Kontaktní Formulář (kontakty.html)

```
1. Uživatel vyplní formulář
2. Klikne "Odeslat zprávu"
3. ✉️ Odešle se email PETŘE se zprávou od uživatele
4. ✅ Zobrazí se potvrzení a formulář se vyčistí
```

---

## 📊 Co Petra dostane v emailech

### Download email obsahuje:

- ✅ Jméno uživatele
- ✅ Email uživatele
- ✅ Jaký materiál si stáhl (checklist/ebook)
- ✅ Datum a čas stažení

### Kontaktní email obsahuje:

- ✅ Jméno odesílatele
- ✅ Email odesílatele
- ✅ Telefon (pokud vyplnil)
- ✅ Předmět zprávy
- ✅ Text zprávy
- ✅ Datum a čas odeslání

---

## 🔧 Parametry šablon (pro referenci)

### Download Template

| Parametr            | Popis                       |
| ------------------- | --------------------------- |
| `{{user_name}}`     | Jméno uživatele z formuláře |
| `{{user_email}}`    | Email uživatele z formuláře |
| `{{download_type}}` | "checklist" nebo "ebook"    |
| `{{material_name}}` | Celý název materiálu        |
| `{{download_date}}` | Datum a čas (česky)         |

### Contact Template

| Parametr         | Popis                    |
| ---------------- | ------------------------ |
| `{{from_name}}`  | Jméno odesílatele        |
| `{{from_email}}` | Email odesílatele        |
| `{{phone}}`      | Telefon nebo "Neuvedeno" |
| `{{subject}}`    | Předmět zprávy           |
| `{{message}}`    | Text zprávy              |
| `{{send_date}}`  | Datum a čas odeslání     |

---

## ✅ Checklist k dokončení

- [ ] Vytvořit EmailJS účet
- [ ] Přidat Gmail službu
- [ ] Vytvořit Download Notification šablonu
- [ ] Vytvořit Contact Form šablonu
- [ ] Zkopírovat Service ID
- [ ] Zkopírovat oba Template IDs
- [ ] Vyplnit vše do `email-handler.js`
- [ ] Otestovat download popup
- [ ] Otestovat kontaktní formulář
- [ ] Zkontrolovat, že emaily chodí na správný email

---

## 🧪 Testování

### Test 1: Download Popup

1. Otevřete `index.html`
2. Klikněte "Stáhnout Zdarma"
3. Vyplňte formulář
4. Zkontrolujte, že:
   - Tlačítko změní text na "Odesílám..."
   - Po odeslání se soubor stáhne
   - Petra dostane email s údaji

### Test 2: Kontaktní Formulář

1. Otevřete `kontakty.html`
2. Vyplňte všechna pole
3. Odešlete
4. Zkontrolujte, že:
   - Zobrazí se zelená zpráva o úspěchu
   - Formulář se vyčistí
   - Petra dostane email se zprávou

---

## 🆘 Řešení problémů

**Email se neodešle:**

- Otevřete konzoli (F12) a hledejte červené chyby
- Zkontrolujte, že Service ID a Template IDs jsou správně
- Ověřte, že Gmail služba je autorizovaná

**Stažení nefunguje:**

- Zkontrolujte cesty k souborům v sekci `downloadLinks`
- Ujistěte se, že složka `files/` obsahuje PDF soubory

**Tlačítko "zamrzne" na "Odesílám...":**

- Email se pravděpodobně neodesílá - zkontrolujte konzoli
- Ověřte konfiguraci EmailJS

---

## 📞 Důležité odkazy

- [EmailJS Dashboard](https://dashboard.emailjs.com/)
- [EmailJS Dokumentace](https://www.emailjs.com/docs/)
- Email pro příjem notifikací: **academyglowupweb@gmail.com**

---

**Poznámka:** Nyní Petra dostane email pokaždé, když si někdo stáhne materiál NEBO pošle zprávu přes kontaktní formulář. Uživatelé nedostávají žádné automatické emaily.
