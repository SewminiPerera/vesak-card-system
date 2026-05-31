/* =========================================================
   DIGITAL VESAK CARD SYSTEM — app.js
   Enhanced: PNG Download, WhatsApp Share, Photo Upload
   Author: Dinithi Sewmini Perera
   ========================================================= */

'use strict';

/* ---------------------------------------------------------
   STATE
--------------------------------------------------------- */
const state = {
  uiLang: 'en',
  cardLang: 'en',
  selectedTemplate: 0,
  selectedPoem: 0,
  fromName: '',
  toName: '',
  postcardMode: false,
  uploadedPhotoDataUrl: null   // NEW: base64 data URL of user-uploaded photo
};

/* ---------------------------------------------------------
   10 TEMPLATES
--------------------------------------------------------- */
const templates = [
  { id:1,  nameEn:'Serene Buddha',   nameSi:'සාන්ත බුදු',        img:'images/template-1.png', type:'image' },
  { id:2,  nameEn:'Vesak Lanterns',  nameSi:'වෙසක් කූඩු',         img:'images/template-2.png', type:'image' },
  { id:3,  nameEn:'Sacred Temple',   nameSi:'පූජනීය විහාරය',      img:'images/template-3.png', type:'image' },
  { id:4,  nameEn:'Bodhi Tree',      nameSi:'බෝධිය',              img:'images/template-4.png', type:'image' },
  { id:5,  nameEn:'Lotus Pond',      nameSi:'නෙළුම් විල',          img:'images/template-5.png', type:'image' },
  { id:6,  nameEn:'Golden Buddha',   nameSi:'රන් බුදු',            img:'images/template-6.png', type:'image' },
  { id:7,  nameEn:'Oil Lamps',       nameSi:'පහන් දැල්වීම',        img:null, type:'gradient',
    gradient:'radial-gradient(ellipse at center, #3a1a00 0%, #7a3500 30%, #1a0800 100%)', emoji:'🪔', accent:'#e8850a' },
  { id:8,  nameEn:'Vesak Festival',  nameSi:'වෙසක් උත්සව',         img:null, type:'gradient',
    gradient:'linear-gradient(135deg, #0d1b4b 0%, #1a0a5e 40%, #2d0a40 70%, #1a0a2e 100%)', emoji:'🎑', accent:'#8a6ff0' },
  { id:9,  nameEn:'Temple Flowers',  nameSi:'පූජා මල්',            img:null, type:'gradient',
    gradient:'radial-gradient(circle at 30% 70%, #3d0020 0%, #6b1039 40%, #1a000d 100%)', emoji:'🌸', accent:'#e075a0' },
  { id:10, nameEn:'Peaceful Dawn',   nameSi:'සාන්ත උදාව',          img:null, type:'gradient',
    gradient:'linear-gradient(180deg, #1a1060 0%, #2d3080 30%, #e8a040 70%, #f0c060 100%)', emoji:'🌅', accent:'#f0c060' }
];

/* ---------------------------------------------------------
   10 POEMS — English & Sinhala
--------------------------------------------------------- */
const poems = [
  {
    titleEn: 'Light of Vesak', titleSi: 'වෙසක් ආලෝකය',
    en: `On this sacred Vesak day,\nBuddha's light shows us the way,\nCompassion blooms like lotus bright,\nHis teachings guide through day and night.\n\nMay peace and joy fill your heart,\nMay wisdom never from you part,\nAs lanterns glow in evening sky,\nMay blessings reach both low and high.`,
    si: `මේ පූජනීය වෙසක් දිනේ,\nබුදු රජාණෝ ආලෝකය දෙනේ,\nකරුණාවෙන් නෙළුම් පිපේ,\nධර්මය අපට මග පෙනේ.\n\nසතුට සාමය ඔබේ හදේ,\nප්‍රඥාව නිතර ලගේ,\nආකාශේ පහන් බැබළේ,\nආශිර්වාදය ඔබට ලැබේ.`
  },
  {
    titleEn: 'The Noble Path', titleSi: 'ආර්ය මාර්ගය',
    en: `Walk the path the Buddha showed,\nLay down every heavy load,\nThrough the Noble Eightfold Way,\nFind the light of endless day.\n\nLet go of anger, greed and strife,\nEmbrace the gift of sacred life,\nIn Dhamma's truth forever rest,\nAmong all paths — this one is best.`,
    si: `බුදු රජ පෙන්වූ මාර්ගයේ,\nගෙවන්නෙ ජීවිතේ,\nආර්ය අෂ්ටාංගික මාර්ගයේ,\nලබන්නෙ නිදහස් ලොවේ.\n\nකෝපය, ලෝභය ත්‍යාග කරා,\nජීවිතේ සැනසිල්ල ලබා,\nධර්මයේ සත්‍යයෙන් හිද,\nජය ගන්නෙ සිත් ලොවේ.`
  },
  {
    titleEn: 'Lotus of Compassion', titleSi: 'කරුණාවේ නෙළුම',
    en: `From muddy waters, pure and bright,\nThe lotus blooms in golden light,\nSo too the heart that's filled with love,\nRises pure like stars above.\n\nThe Buddha taught us: love all beings,\nAs a mother loves, so caring,\nMay your heart bloom like the flower,\nBlest in every passing hour.`,
    si: `මඩ වතුරෙන් නෑගී ඉහළ,\nනෙළුම් මල සිනාසේ,\nආදරයෙන් පිරුණු හදල,\nජීවිතේ බිහිදේ.\n\nබුදු රජ කීවේ: සෙනෙහෙ කරව,\nමෑණියන් මෙන් සෙනෙහෙ දරව,\nනෙළුමක් සෙ ඔබ හිත,\nසතුටෙන් සෙනෙහෙ ලබව.`
  },
  {
    titleEn: 'Vesak Moonlight', titleSi: 'වෙසක් හිනිදු',
    en: `Full moon of Vesak, shining bright,\nFilling all the world with light,\nThree sacred truths this night recalls —\nBirth, Enlightenment, Nirvana falls.\n\nUnder your soft and gentle glow,\nMay seeds of peace and wisdom grow,\nHappy Vesak to one and all,\nMay blessings rise and sorrows fall.`,
    si: `වෙසක් පොහොය සිනාසේ,\nලෝකය ආලෝකෙ දෙනේ,\nත්‍රිවිධ සිද්ධිය මෙ රෑ,\nහිතේ සතුටක් ගෙනේ.\n\nඔබේ සිනා ආලෝකේ,\nසාමය ප්‍රඥා ලැබේ,\nසුභ වෙසක් සියල්ලටම,\nශ්‍රිය සෞභාග්‍ය ලැබේ.`
  },
  {
    titleEn: 'The Bodhi Blessing', titleSi: 'බෝධිය යට',
    en: `Beneath the sacred Bodhi tree,\nThe Blessed One found the way to be free,\nStars bore witness to that holy night,\nWhen darkness turned to eternal light.\n\nMay that ancient wisdom touch your soul,\nAnd make your broken spirit whole,\nOn this Vesak, may you find,\nPeace and joy of a liberated mind.`,
    si: `ශ්‍රී මහා බෝ රුකෙ යට,\nසම්මා සම්බෝ ලද,\nරාත්‍රිය දෑස් ලූ,\nආලෝකේ ලෝකේ ගෙව,\n\nඒ ප්‍රාඥ ශ්‍රී ලෝකේ,\nඔබ සිත ස්පර්ශ කරේ,\nවෙසක් දිනේ ඔබටම,\nසාමය ප්‍රීතිය ලැබේ.`
  },
  {
    titleEn: 'Lanterns of Hope', titleSi: 'බලාපොරොත්තුවේ පහන',
    en: `We light a lantern in the night,\nA symbol of the Buddha's light,\nEach flame a prayer, each glow a song,\nTo make the suffering world belong.\n\nMay every lantern that we raise,\nSet the darkness all ablaze,\nMay hope and joy forever shine,\nThis Vesak in your heart and mine.`,
    si: `රාත්‍රියේ පහනක් දල්වා,\nබුදු ආලෝකය සිහිකරා,\nසෑම දැල්ලක් ප්‍රාර්ථනාවයි,\nලෝකයේ දුක් නිවාලා.\n\nඔසවා හිටිය පහනින්,\nඅන්ධකාරය නිවා,\nබලාපොරොත්තු ප්‍රීතිය,\nඔබ හදේ දල්ව.`
  },
  {
    titleEn: 'The Middle Way', titleSi: 'මධ්‍යම ප්‍රතිපදාව',
    en: `Not too loose and not too tight,\nThe Middle Way reveals the light,\nBetween the thorns of want and fear,\nThe path of peace is bright and clear.\n\nFollow the Buddha's gentle guide,\nWith truth and love walk side by side,\nThe Middle Way will set you free,\nTo find what truly you can be.`,
    si: `ඉතා ලිහිල් ද, ඉතා තද ද,\nමධ්‍ය ප්‍රතිපදාව ලෝකේ,\nලෝභ භය අතරේ,\nසාමයේ මාර්ගය පෙනේ.\n\nබුදු රජ ශ්‍රිය අනුව,\nසත්‍ය ආදරේ ගෙන,\nමධ්‍ය මාර්ගෙ ඔබ,\nනිදහස ලබා ගත.`
  },
  {
    titleEn: "Dhamma's Gift", titleSi: 'ධර්මයේ ත්‍යාගය',
    en: `The greatest gift is Dhamma's truth,\nGuiding the old and blessing youth,\nNo treasure shines as bright and clear,\nAs wisdom that we hold so dear.\n\nOn this most holy Vesak day,\nMay Dhamma's light upon you stay,\nMay you walk in truth and peace,\nUntil all suffering finds release.`,
    si: `ශ්‍රේෂ්ඨම ත්‍යාගය ධර්ම සත්‍යයි,\nමහල්ලෝ, ළමයින් ආශිර්වාද,\nනිධානය ආලෝකෙ,\nප්‍රඥාව ශ්‍රේෂ්ඨ ලෝකේ.\n\nමේ ශ්‍රේෂ්ඨ වෙසක් දිනේ,\nධර්ම ආලෝකේ ඔබේ,\nසත්‍ය සාමයේ ගෙවා,\nදුකෙන් නිදහස ලබා.`
  },
  {
    titleEn: 'River of Blessings', titleSi: 'ආශිර්වාද ගඟ',
    en: `Like a river flowing free,\nBlessings flow from Buddha's tree,\nTouching lives along the way,\nLighting up the darkest day.\n\nMay you bathe in that sweet stream,\nMay your life be more than dream,\nHappy Vesak, may you find,\nThe river of a peaceful mind.`,
    si: `ගඟක් සෙ ශ්‍රී ගලා,\nආශිර්වාද බෝ රුකෙ ලා,\nජීවිත ස්පර්ශ කරා,\nඅඳුරු දවස ආලෝකෙ.\n\nඒ ශ්‍රී ධාරාවේ,\nජීවිතේ සුන්දරි,\nසුභ වෙසක් — ඔබ,\nසාන්ත සිතේ ගඟ ලබේ.`
  },
  {
    titleEn: 'Eternal Peace', titleSi: 'සදාකාලික සාමය',
    en: `When all the noise of life fades away,\nAnd we are left with stillness to stay,\nThere lies the truth the Buddha found —\nIn perfect peace, on sacred ground.\n\nMay Vesak bring that peace to you,\nMake every dream and vision true,\nMay you walk in light each day,\nAs eternal peace lights up your way.`,
    si: `ජීවිතේ ඝෝෂා සිදී,\nනිශ්ශබ්දතාවේ රැකී,\nබුද්ධ ශ්‍රී සත්‍යය ඔතන,\nශ්‍රේෂ්ඨ සාමය ලොවේ.\n\nවෙසක් ඔබට සාමය,\nසිහිනෙ සහ දැකීම,\nසෑම දිනෙ ආලෝකෙ,\nසදාකාල සාමේ ලබේ.`
  }
];

/* ---------------------------------------------------------
   TRANSLATIONS
--------------------------------------------------------- */
const translations = {
  en: {
    fromPlaceholder: 'Enter your name...',
    toPlaceholder:   "Enter recipient's name...",
    cardFrom: 'From:',
    cardTo:   'To:',
    wishMain: 'Happy Vesak!',
    wishSub:  'සුභ වෙසක්!',
    defaultPoem:     'Please select a poem from the left panel...',
    downloadSuccess: '🎉 Card downloaded successfully!',
    creating:        '✨ Creating your card...',
    whatsappMsg:     '🌸 Wishing you a Happy Vesak! I created this card for you using the Digital Vesak Card System.'
  },
  si: {
    fromPlaceholder: 'ඔබේ නම ඇතුළු කරන්න...',
    toPlaceholder:   'ලබන්නාගේ නම ඇතුළු කරන්න...',
    cardFrom: 'යවන්නා:',
    cardTo:   'ලබන්නා:',
    wishMain: 'සුභ වෙසක් !',
    wishSub:  'Happy Vesak!',
    defaultPoem:     'වම් පැනලයෙන් කවියක් තෝරන්න...',
    downloadSuccess: '🎉 කාඩ් සාර්ථකව බාගත කෙරිණ!',
    creating:        '✨ ඔබේ කාඩ් සකස් කරමින්...',
    whatsappMsg:     '🌸 ඔබට සුභ වෙසක් වේවා! ඩිජිටල් වෙසක් කාඩ් පද්ධතිය භාවිතා කර ඔබ සඳහා මෙම කාඩ් සෑදීමි.'
  }
};

/* ---------------------------------------------------------
   INIT
--------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  initParticles();
  renderTemplateGrid();
  renderPoemList();
  const pcToggle = document.getElementById('postcardToggle');
  if (pcToggle) pcToggle.checked = state.postcardMode;
  updatePreview();
  goToStep(1);
  setupUploadDragDrop();
});

/* ---------------------------------------------------------
   PARTICLES
--------------------------------------------------------- */
function initParticles() {
  const container = document.getElementById('particles');
  const colors = ['#f5c842', '#d4a017', '#fdf6e3', '#c0392b', '#9b59b6'];
  for (let i = 0; i < 30; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 6 + 2;
    p.style.cssText = `width:${size}px;height:${size}px;background:${colors[Math.floor(Math.random()*colors.length)]};left:${Math.random()*100}%;animation-duration:${Math.random()*15+10}s;animation-delay:${Math.random()*15}s;opacity:0;box-shadow:0 0 ${size*2}px currentColor;`;
    container.appendChild(p);
  }
}

/* ---------------------------------------------------------
   UI LANGUAGE
--------------------------------------------------------- */
function setLanguage(lang) {
  state.uiLang = lang;
  document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('btn-lang-' + lang).classList.add('active');
  document.body.classList.toggle('lang-si', lang === 'si');
  document.querySelectorAll('[data-en]').forEach(el => {
    const text = el.getAttribute('data-' + lang);
    if (text) el.textContent = text;
  });
  document.getElementById('fromName').placeholder = translations[lang].fromPlaceholder;
  document.getElementById('toName').placeholder   = translations[lang].toPlaceholder;
}

/* ---------------------------------------------------------
   CARD LANGUAGE
--------------------------------------------------------- */
function selectCardLanguage(lang) {
  state.cardLang = lang;
  document.getElementById('card-lang-en').classList.toggle('active', lang === 'en');
  document.getElementById('card-lang-si').classList.toggle('active', lang === 'si');
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
  const addr = document.getElementById('addressBox');
  if (addr) addr.setAttribute('aria-hidden', state.postcardMode ? 'false' : 'true');
  updatePreview();
}

/* ---------------------------------------------------------
   STEP NAVIGATION
--------------------------------------------------------- */
function goToStep(n) {
  document.querySelectorAll('.builder-section').forEach(s => s.classList.remove('active'));
  document.getElementById('section-' + n).classList.add('active');
  document.querySelectorAll('.step').forEach((dot, idx) => {
    dot.classList.remove('active', 'done');
    if (idx + 1 < n)  dot.classList.add('done');
    if (idx + 1 === n) dot.classList.add('active');
  });
  document.getElementById('builderPanel').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/* ---------------------------------------------------------
   PHOTO UPLOAD (NEW)
--------------------------------------------------------- */
function setupUploadDragDrop() {
  const zone = document.getElementById('uploadDropZone');
  if (!zone) return;

  ['dragover', 'dragenter'].forEach(evt => {
    zone.addEventListener(evt, e => {
      e.preventDefault();
      zone.classList.add('drag-over');
    });
  });

  ['dragleave', 'dragend', 'drop'].forEach(evt => {
    zone.addEventListener(evt, e => {
      e.preventDefault();
      zone.classList.remove('drag-over');
    });
  });

  zone.addEventListener('drop', e => {
    const file = e.dataTransfer?.files?.[0];
    if (file && file.type.startsWith('image/')) {
      processUploadedPhoto(file);
    } else {
      showToast('⚠️ Please drop an image file (JPG, PNG, WEBP).');
    }
  });
}

function handlePhotoUpload(event) {
  const file = event.target.files?.[0];
  if (!file) return;
  if (!file.type.startsWith('image/')) {
    showToast('⚠️ Please select an image file.');
    return;
  }
  processUploadedPhoto(file);
}

function processUploadedPhoto(file) {
  const reader = new FileReader();
  reader.onload = (e) => {
    state.uploadedPhotoDataUrl = e.target.result;

    // Show preview row
    const row = document.getElementById('uploadPreviewRow');
    const img = document.getElementById('uploadPreviewImg');
    const name = document.getElementById('uploadPreviewName');
    if (row && img && name) {
      img.src = e.target.result;
      name.textContent = file.name;
      row.style.display = 'flex';
    }

    // Deselect any template (add a special "uploaded" indicator to first thumb)
    document.querySelectorAll('.template-thumb').forEach(t => t.classList.remove('selected'));
    // Mark drop zone as having a photo
    const zone = document.getElementById('uploadDropZone');
    if (zone) zone.classList.add('has-photo');

    updatePreview();
    showToast('📷 Photo uploaded! Your card preview is updated.');
  };
  reader.readAsDataURL(file);
}

function removeUploadedPhoto() {
  state.uploadedPhotoDataUrl = null;
  const row = document.getElementById('uploadPreviewRow');
  const imgEl = document.getElementById('uploadPreviewImg');
  const input = document.getElementById('photoUploadInput');
  if (row) row.style.display = 'none';
  if (imgEl) imgEl.src = '';
  if (input) input.value = '';

  const zone = document.getElementById('uploadDropZone');
  if (zone) zone.classList.remove('has-photo');

  // Re-select first template
  selectTemplate(state.selectedTemplate);
  updatePreview();
  showToast('🗑️ Photo removed. Template restored.');
}

/* ---------------------------------------------------------
   RENDER TEMPLATE GRID
--------------------------------------------------------- */
function renderTemplateGrid() {
  const grid = document.getElementById('templateGrid');
  grid.innerHTML = '';
  templates.forEach((t, i) => {
    const div = document.createElement('div');
    div.className = 'template-thumb' + (i === state.selectedTemplate && !state.uploadedPhotoDataUrl ? ' selected' : '');
    div.id = 'tmpl-' + i;
    div.setAttribute('aria-label', t.nameEn);
    div.onclick = () => selectTemplate(i);

    if (t.type === 'image') {
      const img = document.createElement('img');
      img.src = t.img; img.alt = t.nameEn; img.loading = 'lazy';
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
  // Clear uploaded photo when a template is selected
  if (state.uploadedPhotoDataUrl) {
    state.uploadedPhotoDataUrl = null;
    const row = document.getElementById('uploadPreviewRow');
    const input = document.getElementById('photoUploadInput');
    if (row) row.style.display = 'none';
    if (input) input.value = '';
    const zone = document.getElementById('uploadDropZone');
    if (zone) zone.classList.remove('has-photo');
  }
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
    div.innerHTML = `
      <div class="poem-item-num">POEM ${String(i+1).padStart(2,'0')}</div>
      <div class="poem-item-title">${lang === 'en' ? p.titleEn : p.titleSi}</div>
      <div class="poem-item-preview">${p[lang].split('\n')[0]}</div>
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
  const t    = translations[lang];
  const tmpl = templates[state.selectedTemplate];
  const poem = poems[state.selectedPoem];

  state.fromName  = document.getElementById('fromName')?.value  || '';
  state.toName    = document.getElementById('toName')?.value    || '';
  state.toAddress = document.getElementById('toAddress')?.value || '';

  // --- Photo side: uploaded photo takes priority ---
  const photoSide = document.getElementById('cardPhotoSide');
  if (state.uploadedPhotoDataUrl) {
    photoSide.style.backgroundImage  = `url('${state.uploadedPhotoDataUrl}')`;
    photoSide.style.backgroundSize   = 'cover';
    photoSide.style.backgroundPosition = 'center';
    photoSide.style.backgroundRepeat  = 'no-repeat';
    photoSide.style.background = '';
  } else if (tmpl.type === 'image') {
    photoSide.style.background = 'none';
    photoSide.style.backgroundImage  = `url('${tmpl.img}')`;
    photoSide.style.backgroundSize   = 'cover';
    photoSide.style.backgroundPosition = 'center';
    photoSide.style.backgroundRepeat  = 'no-repeat';
  } else {
    photoSide.style.backgroundImage = 'none';
    photoSide.style.background = tmpl.gradient;
  }

  // Photo label
  const photoLabel = document.getElementById('photoLabel');
  if (photoLabel) {
    photoLabel.textContent = state.uploadedPhotoDataUrl
      ? (lang === 'en' ? 'Your Photo' : 'ඔබේ ඡායාරූපය')
      : (lang === 'en' ? tmpl.nameEn : tmpl.nameSi);
  }

  // Content side
  document.getElementById('cardWishTitle').textContent = t.wishMain;
  document.getElementById('cardWishSi').textContent    = t.wishSub;
  document.getElementById('cardPoemTitle').textContent = lang === 'en' ? poem.titleEn : poem.titleSi;
  document.getElementById('cardPoemText').textContent  = poem[lang];

  const fromText = state.fromName ? `${t.cardFrom} ${state.fromName}` : `${t.cardFrom} —`;
  const toText   = state.toName   ? `${t.cardTo} ${state.toName}`     : `${t.cardTo} —`;
  document.getElementById('cardFrom').textContent = fromText;
  document.getElementById('cardTo').textContent   = toText;

  // Postcard address
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
  contentSide.style.fontFamily = lang === 'si'
    ? "'Noto Sans Sinhala', serif"
    : "'Cormorant Garamond', serif";
}

function escapeHtml(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

/* ---------------------------------------------------------
   RENDER CARD TO CANVAS (shared helper)
--------------------------------------------------------- */
async function renderCardToCanvas() {
  const card = document.getElementById('vesakCard');
  if (!card) throw new Error('Card element not found');
  if (typeof html2canvas === 'undefined') throw new Error('html2canvas library not loaded');

  const loadingOverlay = document.getElementById('loadingOverlay');
  const origDisplay = loadingOverlay?.style.display;
  if (loadingOverlay) loadingOverlay.style.display = 'none';

  const origStyles = { overflow: card.style.overflow, position: card.style.position, visibility: card.style.visibility };
  card.style.overflow   = 'visible';
  card.style.position   = 'relative';
  card.style.visibility = 'visible';

  let canvas;
  try {
    canvas = await html2canvas(card, {
      allowTaint: true, useCORS: true, scale: 2, logging: false,
      backgroundColor: '#1a0a2e', proxy: null, foreignObjectRendering: false,
      timeout: 20000, windowHeight: 600, windowWidth: 900
    });
  } finally {
    card.style.overflow   = origStyles.overflow;
    card.style.position   = origStyles.position;
    card.style.visibility = origStyles.visibility;
    if (loadingOverlay) loadingOverlay.style.display = origDisplay || 'flex';
  }

  if (!canvas || canvas.width === 0 || canvas.height === 0)
    throw new Error('Canvas generation produced empty result');

  return canvas;
}

/* ---------------------------------------------------------
   DOWNLOAD CARD AS PNG (enhanced)
--------------------------------------------------------- */
async function downloadCard() {
  const lang = state.cardLang;
  const t    = translations[lang];

  const fromVal = document.getElementById('fromName')?.value || '';
  const toVal   = document.getElementById('toName')?.value   || '';
  if (!fromVal || !toVal) {
    showToast('⚠️ Please fill in both names first (Step 4).');
    return;
  }

  showLoading(t.creating);

  try {
    const canvas  = await renderCardToCanvas();
    const filename = `Vesak-Card-${Date.now()}.png`;
    let downloaded = false;

    // Method 1: Blob
    try {
      canvas.toBlob(blob => {
        if (blob && blob.size > 0) {
          downloadBlob(blob, filename);
          downloaded = true;
          hideLoading();
          showToast(t.downloadSuccess);
        }
      }, 'image/png', 0.95);

      setTimeout(() => {
        if (!downloaded) tryDataUrlMethod();
      }, 3000);
    } catch {
      tryDataUrlMethod();
    }

    async function tryDataUrlMethod() {
      if (downloaded) return;
      try {
        const dataUrl = canvas.toDataURL('image/png');
        if (!dataUrl?.startsWith('data:')) throw new Error('Invalid dataURL');
        downloadDataUrl(dataUrl, filename);
        downloaded = true;
        hideLoading();
        showToast(t.downloadSuccess);
      } catch {
        hideLoading();
        showToast('⚠️ Download failed. Try a different browser.');
      }
    }

  } catch (err) {
    hideLoading();
    showToast(`⚠️ ${err.message || 'Download failed.'}`);
  }
}

/* ---------------------------------------------------------
   SHARE ON WHATSAPP (NEW)
--------------------------------------------------------- */
async function shareToWhatsApp() {
  const lang = state.cardLang;
  const t    = translations[lang];

  const fromVal = document.getElementById('fromName')?.value || '';
  const toVal   = document.getElementById('toName')?.value   || '';

  // Build the WhatsApp message text
  const poem = poems[state.selectedPoem];
  const poemTitle = lang === 'en' ? poem.titleEn : poem.titleSi;

  let msg = t.whatsappMsg + '\n\n';
  if (toVal)   msg += `${t.cardTo} ${toVal}\n`;
  if (fromVal) msg += `${t.cardFrom} ${fromVal}\n`;
  msg += `\n✨ ${poemTitle}\n`;
  msg += poem[lang].substring(0, 120) + '...\n\n';
  msg += '🌸 සබ්බේ සත්තා සුඛිතා හොන්තු 🌸\nMay all beings be happy ☸️';

  // Try Web Share API first (mobile — can share image file)
  const canNativeShare = navigator.share && navigator.canShare;

  if (canNativeShare) {
    // Try to share the card image file via native share sheet
    showLoading('✨ Preparing card for sharing...');
    try {
      const canvas = await renderCardToCanvas();
      hideLoading();

      await new Promise((resolve, reject) => {
        canvas.toBlob(async blob => {
          if (!blob) { reject(new Error('No blob')); return; }
          const file = new File([blob], 'VesakCard.png', { type: 'image/png' });
          if (navigator.canShare({ files: [file] })) {
            try {
              await navigator.share({ files: [file], title: 'Happy Vesak! 🌸', text: msg });
              showToast('🌸 Card shared successfully!');
              resolve();
            } catch (err) {
              if (err.name === 'AbortError') { resolve(); return; }
              reject(err);
            }
          } else {
            // File sharing not supported, share text only
            try {
              await navigator.share({ title: 'Happy Vesak! 🌸', text: msg });
              showToast('🌸 Message shared!');
              resolve();
            } catch (err) {
              if (err.name === 'AbortError') { resolve(); return; }
              reject(err);
            }
          }
        }, 'image/png', 0.95);
      });
      return;
    } catch (err) {
      hideLoading();
      // Fall through to WhatsApp URL method
    }
  }

  // Fallback: WhatsApp URL scheme (opens WhatsApp with pre-filled message)
  // First, try to download the card so user has it to attach manually
  showLoading('✨ Preparing card...');
  try {
    const canvas = await renderCardToCanvas();
    hideLoading();

    // Download the image first
    canvas.toBlob(blob => {
      if (blob) {
        downloadBlob(blob, `Vesak-Card-${Date.now()}.png`);
        showToast('📥 Card saved! Opening WhatsApp...');
        setTimeout(() => {
          const waUrl = `https://wa.me/?text=${encodeURIComponent(msg)}`;
          window.open(waUrl, '_blank');
        }, 800);
      }
    }, 'image/png', 0.95);
  } catch (err) {
    hideLoading();
    // Open WhatsApp anyway with text
    const waUrl = `https://wa.me/?text=${encodeURIComponent(msg)}`;
    window.open(waUrl, '_blank');
    showToast('🌸 Opening WhatsApp...');
  }
}

/* ---------------------------------------------------------
   DOWNLOAD HELPERS
--------------------------------------------------------- */
function downloadBlob(blob, filename) {
  const url  = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url; link.download = filename; link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 500);
}

function downloadDataUrl(dataUrl, filename) {
  const link = document.createElement('a');
  link.href = dataUrl; link.download = filename; link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/* ---------------------------------------------------------
   CREATE NEW CARD
--------------------------------------------------------- */
function createNew() {
  state.selectedTemplate    = 0;
  state.selectedPoem        = 0;
  state.fromName            = '';
  state.toName              = '';
  state.toAddress           = '';
  state.postcardMode        = false;
  state.uploadedPhotoDataUrl = null;
  state.cardLang            = 'en';

  document.getElementById('fromName').value  = '';
  document.getElementById('toName').value    = '';
  document.getElementById('toAddress').value = '';

  // Clear upload UI
  const row   = document.getElementById('uploadPreviewRow');
  const input = document.getElementById('photoUploadInput');
  const zone  = document.getElementById('uploadDropZone');
  if (row)   row.style.display = 'none';
  if (input) input.value = '';
  if (zone)  zone.classList.remove('has-photo');

  const pcToggle = document.getElementById('postcardToggle');
  if (pcToggle) { pcToggle.checked = false; togglePostcard(false); }

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
    overlay.innerHTML = `<div class="loading-spinner"></div><div class="loading-text" id="loadingText"></div>`;
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
   TOAST
--------------------------------------------------------- */
function showToast(msg) {
  let toast = document.getElementById('toastMsg');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast'; toast.id = 'toastMsg';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3500);
}
