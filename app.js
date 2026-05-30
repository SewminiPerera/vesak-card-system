/* =========================================================
   DIGITAL VESAK CARD SYSTEM — app.js
   Author: Dinithi Sewmini Perera
   GitHub: https://github.com/SewminiPerera
   ========================================================= */

'use strict';

/* ---------------------------------------------------------
   STATE
--------------------------------------------------------- */
const state = {
  uiLang: 'en',          // UI language (en | si)
  cardLang: 'en',        // Card content language
  selectedTemplate: 0,   // Index 0-9
  selectedPoem: 0,       // Index 0-9
  fromName: '',
  toName: '',
  postcardMode: false
};

/* ---------------------------------------------------------
   10 TEMPLATES
--------------------------------------------------------- */
const templates = [
  {
    id: 1,
    nameEn: 'Serene Buddha',
    nameSi: 'සාන්ත බුදු',
    img: 'images/template-1.png',
    type: 'image'
  },
  {
    id: 2,
    nameEn: 'Vesak Lanterns',
    nameSi: 'වෙසක් කූඩු',
    img: 'images/template-2.png',
    type: 'image'
  },
  {
    id: 3,
    nameEn: 'Sacred Temple',
    nameSi: 'පූජනීය විහාරය',
    img: 'images/template-3.png',
    type: 'image'
  },
  {
    id: 4,
    nameEn: 'Bodhi Tree',
    nameSi: 'බෝධිය',
    img: 'images/template-4.png',
    type: 'image'
  },
  {
    id: 5,
    nameEn: 'Lotus Pond',
    nameSi: 'නෙළුම් විල',
    img: 'images/template-5.png',
    type: 'image'
  },
  {
    id: 6,
    nameEn: 'Golden Buddha',
    nameSi: 'රන් බුදු',
    img: 'images/template-6.png',
    type: 'image'
  },
  {
    id: 7,
    nameEn: 'Oil Lamps',
    nameSi: 'පහන් දැල්වීම',
    img: null,
    type: 'gradient',
    gradient: 'radial-gradient(ellipse at center, #3a1a00 0%, #7a3500 30%, #1a0800 100%)',
    emoji: '🪔',
    accent: '#e8850a'
  },
  {
    id: 8,
    nameEn: 'Vesak Festival',
    nameSi: 'වෙසක් උත්සව',
    img: null,
    type: 'gradient',
    gradient: 'linear-gradient(135deg, #0d1b4b 0%, #1a0a5e 40%, #2d0a40 70%, #1a0a2e 100%)',
    emoji: '🎑',
    accent: '#8a6ff0'
  },
  {
    id: 9,
    nameEn: 'Temple Flowers',
    nameSi: 'පූජා මල්',
    img: null,
    type: 'gradient',
    gradient: 'radial-gradient(circle at 30% 70%, #3d0020 0%, #6b1039 40%, #1a000d 100%)',
    emoji: '🌸',
    accent: '#e075a0'
  },
  {
    id: 10,
    nameEn: 'Peaceful Dawn',
    nameSi: 'සාන්ත උදාව',
    img: null,
    type: 'gradient',
    gradient: 'linear-gradient(180deg, #1a1060 0%, #2d3080 30%, #e8a040 70%, #f0c060 100%)',
    emoji: '🌅',
    accent: '#f0c060'
  }
];

/* ---------------------------------------------------------
   10 POEMS — English & Sinhala
--------------------------------------------------------- */
const poems = [
  {
    titleEn: 'Light of Vesak',
    titleSi: 'වෙසක් ආලෝකය',
    en: `On this sacred Vesak day,
Buddha's light shows us the way,
Compassion blooms like lotus bright,
His teachings guide through day and night.

May peace and joy fill your heart,
May wisdom never from you part,
As lanterns glow in evening sky,
May blessings reach both low and high.`,
    si: `මේ පූජනීය වෙසක් දිනේ,
බුදු රජාණෝ ආලෝකය දෙනේ,
කරුණාවෙන් නෙළුම් පිපේ,
ධර්මය අපට මග පෙනේ.

සතුට සාමය ඔබේ හදේ,
ප්‍රඥාව නිතර ලගේ,
ආකාශේ පහන් බැබළේ,
ආශිර්වාදය ඔබට ලැබේ.`
  },
  {
    titleEn: 'The Noble Path',
    titleSi: 'ආර්ය මාර්ගය',
    en: `Walk the path the Buddha showed,
Lay down every heavy load,
Through the Noble Eightfold Way,
Find the light of endless day.

Let go of anger, greed and strife,
Embrace the gift of sacred life,
In Dhamma's truth forever rest,
Among all paths — this one is best.`,
    si: `බුදු රජ පෙන්වූ මාර්ගයේ,
ගෙවන්නෙ ජීවිතේ,
ආර්ය අෂ්ටාංගික මාර්ගයේ,
ලබන්නෙ නිදහස් ලොවේ.

කෝපය, ලෝභය ත්‍යාග කරා,
ජීවිතේ සැනසිල්ල ලබා,
ධර්මයේ සත්‍යයෙන් හිද,
ජය ගන්නෙ සිත් ලොවේ.`
  },
  {
    titleEn: 'Lotus of Compassion',
    titleSi: 'කරුණාවේ නෙළුම',
    en: `From muddy waters, pure and bright,
The lotus blooms in golden light,
So too the heart that's filled with love,
Rises pure like stars above.

The Buddha taught us: love all beings,
As a mother loves, so caring,
May your heart bloom like the flower,
Blest in every passing hour.`,
    si: `මඩ වතුරෙන් නෑගී ඉහළ,
නෙළුම් මල සිනාසේ,
ආදරයෙන් පිරුණු හදල,
ජීවිතේ බිහිදේ.

බුදු රජ කීවේ: සෙනෙහෙ කරව,
මෑණියන් මෙන් සෙනෙහෙ දරව,
නෙළුමක් සෙ ඔබ හිත,
සතුටෙන් සෙනෙහෙ ලබව.`
  },
  {
    titleEn: 'Vesak Moonlight',
    titleSi: 'වෙසක් හිනිදු',
    en: `Full moon of Vesak, shining bright,
Filling all the world with light,
Three sacred truths this night recalls —
Birth, Enlightenment, Nirvana falls.

Under your soft and gentle glow,
May seeds of peace and wisdom grow,
Happy Vesak to one and all,
May blessings rise and sorrows fall.`,
    si: `වෙසක් පොහොය සිනාසේ,
ලෝකය ආලෝකෙ දෙනේ,
ත්‍රිවිධ සිද්ධිය මෙ රෑ,
හිතේ සතුටක් ගෙනේ.

ඔබේ සිනා ආලෝකේ,
සාමය ප්‍රඥා ලැබේ,
සුභ වෙසක් සියල්ලටම,
ශ්‍රිය සෞභාග්‍ය ලැබේ.`
  },
  {
    titleEn: 'The Bodhi Blessing',
    titleSi: 'බෝධිය යට',
    en: `Beneath the sacred Bodhi tree,
The Blessed One found the way to be free,
Stars bore witness to that holy night,
When darkness turned to eternal light.

May that ancient wisdom touch your soul,
And make your broken spirit whole,
On this Vesak, may you find,
Peace and joy of a liberated mind.`,
    si: `ශ්‍රී මහා බෝ රුකෙ යට,
සම්මා සම්බෝ ලද,
රාත්‍රිය දෑස් ලූ,
ආලෝකේ ලෝකේ ගෙව,

ඒ ප්‍රාඥ ශ්‍රී ලෝකේ,
ඔබ සිත ස්පර්ශ කරේ,
වෙසක් දිනේ ඔබටම,
සාමය ප්‍රීතිය ලැබේ.`
  },
  {
    titleEn: 'Lanterns of Hope',
    titleSi: 'බලාපොරොත්තුවේ පහන',
    en: `We light a lantern in the night,
A symbol of the Buddha's light,
Each flame a prayer, each glow a song,
To make the suffering world belong.

May every lantern that we raise,
Set the darkness all ablaze,
May hope and joy forever shine,
This Vesak in your heart and mine.`,
    si: `රාත්‍රියේ පහනක් දල්වා,
බුදු ආලෝකය සිහිකරා,
සෑම දැල්ලක් ප්‍රාර්ථනාවයි,
ලෝකයේ දුක් නිවාලා.

ඔසවා හිටිය පහනින්,
අන්ධකාරය නිවා,
බලාපොරොත්තු ප්‍රීතිය,
ඔබ හදේ දල්ව.`
  },
  {
    titleEn: 'The Middle Way',
    titleSi: 'මධ්‍යම ප්‍රතිපදාව',
    en: `Not too loose and not too tight,
The Middle Way reveals the light,
Between the thorns of want and fear,
The path of peace is bright and clear.

Follow the Buddha's gentle guide,
With truth and love walk side by side,
The Middle Way will set you free,
To find what truly you can be.`,
    si: `ඉතා ලිහිල් ද, ඉතා තද ද,
මධ්‍ය ප්‍රතිපදාව ලෝකේ,
ලෝභ භය අතරේ,
සාමයේ මාර්ගය පෙනේ.

බුදු රජ ශ්‍රිය අනුව,
සත්‍ය ආදරේ ගෙන,
මධ්‍ය මාර්ගෙ ඔබ,
නිදහස ලබා ගත.`
  },
  {
    titleEn: 'Dhamma\'s Gift',
    titleSi: 'ධර්මයේ ත්‍යාගය',
    en: `The greatest gift is Dhamma's truth,
Guiding the old and blessing youth,
No treasure shines as bright and clear,
As wisdom that we hold so dear.

On this most holy Vesak day,
May Dhamma's light upon you stay,
May you walk in truth and peace,
Until all suffering finds release.`,
    si: `ශ්‍රේෂ්ඨම ත්‍යාගය ධර්ම සත්‍යයි,
මහල්ලෝ, ළමයින් ආශිර්වාද,
නිධානය ආලෝකෙ,
ප්‍රඥාව ශ්‍රේෂ්ඨ ලෝකේ.

මේ ශ්‍රේෂ්ඨ වෙසක් දිනේ,
ධර්ම ආලෝකේ ඔබේ,
සත්‍ය සාමයේ ගෙවා,
දුකෙන් නිදහස ලබා.`
  },
  {
    titleEn: 'River of Blessings',
    titleSi: 'ආශිර්වාද ගඟ',
    en: `Like a river flowing free,
Blessings flow from Buddha's tree,
Touching lives along the way,
Lighting up the darkest day.

May you bathe in that sweet stream,
May your life be more than dream,
Happy Vesak, may you find,
The river of a peaceful mind.`,
    si: `ගඟක් සෙ ශ්‍රී ගලා,
ආශිර්වාද බෝ රුකෙ ලා,
ජීවිත ස්පර්ශ කරා,
අඳුරු දවස ආලෝකෙ.

ඒ ශ්‍රී ධාරාවේ,
ජීවිතේ සුන්දරි,
සුභ වෙසක් — ඔබ,
සාන්ත සිතේ ගඟ ලබේ.`
  },
  {
    titleEn: 'Eternal Peace',
    titleSi: 'සදාකාලික සාමය',
    en: `When all the noise of life fades away,
And we are left with stillness to stay,
There lies the truth the Buddha found —
In perfect peace, on sacred ground.

May Vesak bring that peace to you,
Make every dream and vision true,
May you walk in light each day,
As eternal peace lights up your way.`,
    si: `ජීවිතේ ඝෝෂා සිදී,
නිශ්ශබ්දතාවේ රැකී,
බුද්ධ ශ්‍රී සත්‍යය ඔතන,
ශ්‍රේෂ්ඨ සාමය ලොවේ.

වෙසක් ඔබට සාමය,
සිහිනෙ සහ දැකීම,
සෑම දිනෙ ආලෝකෙ,
සදාකාල සාමේ ලබේ.`
  }
];

/* ---------------------------------------------------------
   TRANSLATIONS for UI elements
--------------------------------------------------------- */
const translations = {
  en: {
    fromPlaceholder: 'Enter your name...',
    toPlaceholder: "Enter recipient's name...",
    cardFrom: 'From:',
    cardTo: 'To:',
    wishMain: 'Happy Vesak!',
    wishSub: 'සුභ වෙසක්!',
    defaultPoem: 'Please select a poem from the left panel...',
    downloadSuccess: '🎉 Card downloaded successfully!',
    creating: '✨ Creating your card...'
  },
  si: {
    fromPlaceholder: 'ඔබේ නම ඇතුළු කරන්න...',
    toPlaceholder: 'ලබන්නාගේ නම ඇතුළු කරන්න...',
    cardFrom: 'යවන්නා:',
    cardTo: 'ලබන්නා:',
    wishMain: 'සුභ වෙසක් !',
    wishSub: 'Happy Vesak!',
    defaultPoem: 'වම් පැනලයෙන් කවියක් තෝරන්න...',
    downloadSuccess: '🎉 කාඩ් සාර්ථකව බාගත කෙරිණ!',
    creating: '✨ ඔබේ කාඩ් සකස් කරමින්...'
  }
};

/* ---------------------------------------------------------
   INIT
--------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  initParticles();
  renderTemplateGrid();
  renderPoemList();
  // Initialize postcard toggle state
  const pcToggle = document.getElementById('postcardToggle');
  if (pcToggle) pcToggle.checked = state.postcardMode;
  updatePreview();
  goToStep(1);
});

/* ---------------------------------------------------------
   PARTICLES
--------------------------------------------------------- */
function initParticles() {
  const container = document.getElementById('particles');
  const count = 30;
  const colors = ['#f5c842', '#d4a017', '#fdf6e3', '#c0392b', '#9b59b6'];

  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 6 + 2;
    p.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      left: ${Math.random() * 100}%;
      animation-duration: ${Math.random() * 15 + 10}s;
      animation-delay: ${Math.random() * 15}s;
      opacity: 0;
      box-shadow: 0 0 ${size * 2}px currentColor;
    `;
    container.appendChild(p);
  }
}

/* ---------------------------------------------------------
   UI LANGUAGE (for interface text only)
--------------------------------------------------------- */
function setLanguage(lang) {
  state.uiLang = lang;

  document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('btn-lang-' + lang).classList.add('active');

  if (lang === 'si') {
    document.body.classList.add('lang-si');
  } else {
    document.body.classList.remove('lang-si');
  }

  // Update all data-en / data-si elements
  document.querySelectorAll('[data-en]').forEach(el => {
    const text = el.getAttribute('data-' + lang);
    if (text) el.textContent = text;
  });

  // Update input placeholders
  document.getElementById('fromName').placeholder = translations[lang].fromPlaceholder;
  document.getElementById('toName').placeholder = translations[lang].toPlaceholder;
}

/* ---------------------------------------------------------
   CARD LANGUAGE
--------------------------------------------------------- */
function selectCardLanguage(lang) {
  state.cardLang = lang;

  document.getElementById('card-lang-en').classList.toggle('active', lang === 'en');
  document.getElementById('card-lang-si').classList.toggle('active', lang === 'si');

  // Re-render poem list in selected language
  renderPoemList();
  updatePreview();
}

/* ---------------------------------------------------------
   POSTCARD TOGGLE
--------------------------------------------------------- */
function togglePostcard(checked) {
  state.postcardMode = !!checked;
  const card = document.getElementById('vesakCard');
  if (card) card.classList.toggle('postcard', state.postcardMode);
  // Mark address box aria state
  const addr = document.getElementById('addressBox');
  if (addr) addr.setAttribute('aria-hidden', state.postcardMode ? 'false' : 'true');
  updatePreview();
}

/* ---------------------------------------------------------
   STEP NAVIGATION
--------------------------------------------------------- */
function goToStep(n) {
  // Hide all sections
  document.querySelectorAll('.builder-section').forEach(s => s.classList.remove('active'));
  document.getElementById('section-' + n).classList.add('active');

  // Update step dots
  document.querySelectorAll('.step').forEach((dot, idx) => {
    dot.classList.remove('active', 'done');
    if (idx + 1 < n)  dot.classList.add('done');
    if (idx + 1 === n) dot.classList.add('active');
  });

  // Scroll to top of builder panel on mobile
  document.getElementById('builderPanel').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/* ---------------------------------------------------------
   RENDER TEMPLATE GRID
--------------------------------------------------------- */
function renderTemplateGrid() {
  const grid = document.getElementById('templateGrid');
  grid.innerHTML = '';

  templates.forEach((t, i) => {
    const div = document.createElement('div');
    div.className = 'template-thumb' + (i === state.selectedTemplate ? ' selected' : '');
    div.id = 'tmpl-' + i;
    div.setAttribute('aria-label', t.nameEn);
    div.onclick = () => selectTemplate(i);

    if (t.type === 'image') {
      const img = document.createElement('img');
      img.src = t.img;
      img.alt = t.nameEn;
      img.loading = 'lazy';
      div.appendChild(img);
    } else {
      const grad = document.createElement('div');
      grad.className = 't-gradient';
      grad.style.background = t.gradient;
      grad.textContent = t.emoji;
      div.appendChild(grad);
    }

    const nameEl = document.createElement('div');
    nameEl.className = 't-name';
    nameEl.textContent = t.nameEn;
    div.appendChild(nameEl);

    grid.appendChild(div);
  });
}

function selectTemplate(i) {
  state.selectedTemplate = i;

  document.querySelectorAll('.template-thumb').forEach(t => t.classList.remove('selected'));
  document.getElementById('tmpl-' + i).classList.add('selected');

  updatePreview();
}

/* ---------------------------------------------------------
   RENDER POEM LIST
--------------------------------------------------------- */
function renderPoemList() {
  const list = document.getElementById('poemList');
  list.innerHTML = '';
  const lang = state.cardLang;

  poems.forEach((p, i) => {
    const div = document.createElement('div');
    div.className = 'poem-item' + (i === state.selectedPoem ? ' selected' : '');
    div.id = 'poem-item-' + i;
    div.onclick = () => selectPoem(i);

    const preview = p[lang].split('\n')[0];

    div.innerHTML = `
      <div class="poem-item-num">POEM ${String(i + 1).padStart(2, '0')}</div>
      <div class="poem-item-title">${lang === 'en' ? p.titleEn : p.titleSi}</div>
      <div class="poem-item-preview">${preview}</div>
    `;

    list.appendChild(div);
  });
}

function selectPoem(i) {
  state.selectedPoem = i;

  document.querySelectorAll('.poem-item').forEach(el => el.classList.remove('selected'));
  document.getElementById('poem-item-' + i).classList.add('selected');

  updatePreview();
}

/* ---------------------------------------------------------
   UPDATE CARD PREVIEW
--------------------------------------------------------- */
function updatePreview() {
  const lang = state.cardLang;
  const t = translations[lang];
  const tmpl = templates[state.selectedTemplate];
  const poem = poems[state.selectedPoem];

  // From/To
  state.fromName = document.getElementById('fromName')?.value || '';
  state.toName   = document.getElementById('toName')?.value  || '';

  // Address (postcard)
  const addrVal = document.getElementById('toAddress')?.value || '';
  state.toAddress = addrVal;

  // --- Photo side ---
  const photoSide = document.getElementById('cardPhotoSide');
  if (tmpl.type === 'image') {
    photoSide.style.background = 'none';
    photoSide.style.backgroundImage = `url('${tmpl.img}')`;
    photoSide.style.backgroundSize = 'cover';
    photoSide.style.backgroundPosition = 'center';
    photoSide.style.backgroundRepeat = 'no-repeat';
  } else {
    photoSide.style.backgroundImage = 'none';
    photoSide.style.background = tmpl.gradient;
  }

  // Photo label
  document.getElementById('photoLabel').textContent =
    lang === 'en' ? tmpl.nameEn : tmpl.nameSi;

  // --- Content side ---
  document.getElementById('cardWishTitle').textContent = t.wishMain;
  document.getElementById('cardWishSi').textContent    = t.wishSub;

  document.getElementById('cardPoemTitle').textContent =
    lang === 'en' ? poem.titleEn : poem.titleSi;

  document.getElementById('cardPoemText').textContent = poem[lang];

  // Names
  const fromText = state.fromName
    ? `${t.cardFrom} ${state.fromName}`
    : `${t.cardFrom} —`;
  const toText = state.toName
    ? `${t.cardTo} ${state.toName}`
    : `${t.cardTo} —`;

  document.getElementById('cardFrom').textContent = fromText;
  document.getElementById('cardTo').textContent   = toText;

  // Postcard: populate address box lines
  const addressBox = document.getElementById('addressLines');
  if (addressBox) {
    if (state.postcardMode && state.toAddress) {
      const lines = state.toAddress.split('\n').map(l => l.trim()).filter(Boolean);
      addressBox.innerHTML = lines.map(l => `<div class="addr-line">${escapeHtml(l)}</div>`).join('');
    } else {
      addressBox.innerHTML = '';
    }
  }

  // Card lang font
  const contentSide = document.getElementById('cardContentSide');
  if (lang === 'si') {
    contentSide.style.fontFamily = "'Noto Sans Sinhala', serif";
  } else {
    contentSide.style.fontFamily = "'Cormorant Garamond', serif";
  }
}

// Small helper to escape HTML when inserting address lines
function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/* ---------------------------------------------------------
   DOWNLOAD CARD
--------------------------------------------------------- */
async function downloadCard() {
  const lang = state.cardLang;
  const t = translations[lang];

  // Validate card is complete
  const fromVal = document.getElementById('fromName')?.value || '';
  const toVal = document.getElementById('toName')?.value || '';

  if (!fromVal || !toVal) {
    showToast('⚠️ Please fill in both names first (Step 4).');
    return;
  }

  showLoading(t.creating);

  try {
    // Check if html2canvas is available
    if (typeof html2canvas === 'undefined') {
      hideLoading();
      showToast('⚠️ Download library loading. Try again in a moment.');
      console.error('html2canvas not available');
      return;
    }

    const card = document.getElementById('vesakCard');
    if (!card) {
      hideLoading();
      showToast('⚠️ Card not found. Complete all steps first.');
      console.error('Card element not found');
      return;
    }

    // Force visible state
    const originalDisplay = card.style.display;
    card.style.display = 'block';

    // Render with html2canvas - simpler config
    const canvas = await html2canvas(card, {
      allowTaint: true,
      useCORS: true,
      scale: 2,
      logging: false,
      backgroundColor: '#1a0a2e',
      proxy: null,
      foreignObjectRendering: false
    });

    card.style.display = originalDisplay;

    if (!canvas) {
      hideLoading();
      showToast('⚠️ Canvas generation failed. Try refreshing.');
      console.error('Canvas is null');
      return;
    }

    // Try blob method first (more reliable)
    try {
      canvas.toBlob(
        (blob) => {
          if (blob && blob.size > 0) {
            downloadBlob(blob, `Vesak-Card-${Date.now()}.png`);
            hideLoading();
            showToast(t.downloadSuccess);
          } else {
            throw new Error('Blob is empty or null');
          }
        },
        'image/png',
        0.95
      );
    } catch (blobErr) {
      // Fallback to dataURL method
      console.warn('Blob method failed, trying dataURL:', blobErr);
      const dataUrl = canvas.toDataURL('image/png');
      if (dataUrl && dataUrl.startsWith('data:')) {
        downloadDataUrl(dataUrl, `Vesak-Card-${Date.now()}.png`);
        hideLoading();
        showToast(t.downloadSuccess);
      } else {
        throw new Error('DataURL generation failed');
      }
    }

  } catch (err) {
    console.error('Download error:', err);
    hideLoading();
    showToast('⚠️ Download failed. Check browser console.');
  }
}

// Download blob helper
function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.style.display = 'none';
  document.body.appendChild(link);
  
  try {
    link.click();
  } finally {
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(url), 100);
  }
}

// Download dataURL helper (fallback)
function downloadDataUrl(dataUrl, filename) {
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = filename;
  link.style.display = 'none';
  document.body.appendChild(link);
  
  try {
    link.click();
  } finally {
    document.body.removeChild(link);
  }
}

/* ---------------------------------------------------------
   CREATE NEW CARD
--------------------------------------------------------- */
function createNew() {
  state.selectedTemplate = 0;
  state.selectedPoem     = 0;
  state.fromName         = '';
  state.toName           = '';
  state.toAddress        = '';
  state.postcardMode     = false;
  state.cardLang         = 'en';

  document.getElementById('fromName').value = '';
  document.getElementById('toName').value   = '';
  document.getElementById('toAddress').value = '';
  const pcToggle = document.getElementById('postcardToggle');
  if (pcToggle) {
    pcToggle.checked = false;
    togglePostcard(false);
  }

  selectCardLanguage('en');
  renderTemplateGrid();
  renderPoemList();
  updatePreview();
  goToStep(1);

  showToast('✨ Ready to create a new card!');
}

/* ---------------------------------------------------------
   LOADING OVERLAY
--------------------------------------------------------- */
function showLoading(msg) {
  let overlay = document.getElementById('loadingOverlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'loading-overlay';
    overlay.id = 'loadingOverlay';
    overlay.innerHTML = `
      <div class="loading-spinner"></div>
      <div class="loading-text" id="loadingText"></div>
    `;
    document.body.appendChild(overlay);
  }
  document.getElementById('loadingText').textContent = msg || 'Loading...';
  overlay.style.display = 'flex';
}

function hideLoading() {
  const overlay = document.getElementById('loadingOverlay');
  if (overlay) overlay.style.display = 'none';
}

/* ---------------------------------------------------------
   TOAST NOTIFICATION
--------------------------------------------------------- */
function showToast(msg) {
  let toast = document.getElementById('toastMsg');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    toast.id = 'toastMsg';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3500);
}
