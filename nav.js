/* Barre de navigation commune à toutes les pages du site. */
(function () {
  var G = [
    ['equipement.html', 'Équipement', 'Les meilleures pièces par palier'],
    ['talents.html', 'Talents et rotation', 'Rotation, talents, sorts et stats'],
    ['groupe.html', 'Groupe et marques', 'Marques, annonces, Stream Deck'],
    ['conso.html', 'Consommables et métiers', 'Potions, Minage, Forge'],
    ['parcours.html', 'Parcours 1 à 60', 'Sorts, donjons et armes par palier']
  ];
  var D = [
    ['rfc', 13, 18, 'Gouffre de Ragefeu'],
    ['rol', 15, 22, 'Ruines de Lordaeron'],
    ['wc', 15, 24, 'Cavernes des Lamentations'],
    ['dm', 17, 26, 'Les Mortemines'],
    ['sfk', 20, 30, 'Donjon d’Ombrecroc'],
    ['bfd', 24, 32, 'Profondeurs de Brassenoire'],
    ['esw', 26, 33, 'Site de fouilles des Paluns'],
    ['cod', 28, 35, 'Cité de Dalaran'],
    ['rfk', 29, 38, 'Kraal de Tranchebauge'],
    ['gnomer', 29, 38, 'Gnomeregan'],
    ['smgy', 30, 38, 'Monastère écarlate · Cimetière'],
    ['smlib', 33, 41, 'Monastère écarlate · Bibliothèque'],
    ['smarm', 36, 44, 'Monastère écarlate · Armurerie'],
    ['rfd', 37, 46, 'Souilles de Tranchebauge'],
    ['smcath', 38, 46, 'Monastère écarlate · Cathédrale'],
    ['uld', 41, 51, 'Uldaman'],
    ['zf', 44, 54, 'Zul’Farrak'],
    ['mara', 46, 55, 'Maraudon'],
    ['st', 50, 60, 'Le Temple englouti'],
    ['brd', 52, 60, 'Profondeurs de Blackrock'],
    ['dme', 54, 60, 'Hache-Tripes · Est'],
    ['lbrs', 55, 60, 'Pic Blackrock · inférieur'],
    ['dmw', 56, 60, 'Hache-Tripes · Ouest'],
    ['dmn', 56, 60, 'Hache-Tripes · Nord'],
    ['stratl', 58, 60, 'Stratholme · porte principale'],
    ['stratd', 58, 60, 'Stratholme · porte de service'],
    ['scholo', 58, 60, 'Scholomance'],
    ['ubrs', 59, 60, 'Pic Blackrock · supérieur']
  ];
  var BANDS = [[10, 20, '13 à 20'], [20, 30, '20 à 30'], [30, 40, '30 à 40'], [40, 50, '40 à 50'], [50, 61, '50 à 60']];
  var here = (location.pathname.split('/').pop() || 'index.html').replace(/\?.*$/, '');
  if (here === '') here = 'index.html';
  var lv = 0;
  try { lv = parseInt(localStorage.getItem('wow-level'), 10) || 0; } catch (e) {}

  var css = '' +
    '.tn{position:sticky;top:0;z-index:50;background:#120c07;border-bottom:1px solid #6b4f22;box-shadow:0 2px 10px rgba(0,0,0,.45);font-family:Inter,system-ui,sans-serif}' +
    '.tn-in{max-width:1100px;margin:0 auto;display:flex;align-items:center;gap:4px;padding:0 12px;height:46px}' +
    '.tn a,.tn button{color:#f3d88f;text-decoration:none;font:600 14px/1 Inter,system-ui,sans-serif;background:none;border:0;cursor:pointer;padding:10px 10px;border-radius:6px;white-space:nowrap}' +
    '.tn a:hover,.tn button:hover,.tn button[aria-expanded=true]{background:#2a1d0f}' +
    '.tn .tn-home{font-family:Cinzel,serif;font-weight:700;font-size:15px;margin-right:auto;letter-spacing:.02em}' +
    '.tn .tn-home.on{color:#fff}' +
    '.tn button:after{content:"";display:inline-block;margin-left:7px;border:4px solid transparent;border-top:5px solid currentColor;border-bottom:0;vertical-align:2px;transition:transform .15s}' +
    '.tn button[aria-expanded=true]:after{transform:rotate(180deg)}' +
    '.tn-p{display:none;position:absolute;top:46px;right:12px;background:#f3e6c4;color:#2a1c0e;border:1px solid #b8975c;border-radius:10px;box-shadow:0 12px 30px rgba(0,0,0,.5);padding:8px;max-height:calc(100vh - 60px);overflow:auto;z-index:51}' +
    '.tn-p.open{display:block}' +
    '.tn-p a{display:block;color:#2a1c0e;padding:9px 10px;border-radius:6px;font-weight:600;white-space:normal}' +
    '.tn-p a:hover{background:#e6d3a3}' +
    '.tn-p a.on{background:#d9b45c;color:#1b1209}' +
    '.tn-p small{display:block;font-weight:400;color:#6f5536;font-size:12.5px;margin-top:2px}' +
    '.tn-g{width:300px}' +
    '.tn-d{width:min(760px,calc(100vw - 24px));display:none;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:4px 10px}' +
    '.tn-d.open{display:grid}' +
    '.tn-b{font-family:Cinzel,serif;font-weight:700;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#8a4f0c;padding:8px 10px 2px}' +
    '.tn-d a{display:flex;gap:8px;align-items:baseline;padding:6px 10px;font-size:13.5px}' +
    '.tn-d a b{font-weight:700;color:#6f5536;font-size:12px;min-width:38px}' +
    '.tn-d a.on b{color:#1b1209}' +
    '.tn-d a.lv{box-shadow:inset 3px 0 0 #1d5fae}' +
    '.tn-note{grid-column:1/-1;font-size:12px;color:#6f5536;padding:4px 10px 6px}' +
    '.tn-pn{display:flex;flex-wrap:wrap;justify-content:space-between;gap:10px;margin:22px 0 8px}' +
    '.tn-pn a{flex:1 1 240px;display:block;background:#efe1bf;color:#2a1c0e;border:1px solid #b8975c;border-radius:10px;padding:12px 14px;text-decoration:none;font-weight:600}' +
    '.tn-pn a small{display:block;color:#6f5536;font-weight:500;font-size:12.5px;margin-bottom:2px}' +
    '.tn-pn a.nx{text-align:right}' +
    '.tn-pn a:hover{border-color:#8a4f0c}' +
    '@media (max-width:620px){.tn-in{padding:0 6px;gap:0}.tn a,.tn button{padding:10px 8px;font-size:13.5px}.tn .tn-home{font-size:14px}' +
    '.tn-p{left:8px;right:8px;width:auto!important}.tn-d{grid-template-columns:1fr}}' +
    'body.has-tn nav.tabs{top:46px!important}';

  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  function build() {
    var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
    var g = '', d = '';
    G.forEach(function (x) {
      g += '<a href="' + x[0] + '"' + (x[0] === here ? ' class="on" aria-current="page"' : '') + '>' + esc(x[1]) + '<small>' + esc(x[2]) + '</small></a>';
    });
    BANDS.forEach(function (b) {
      var rows = D.filter(function (x) { return x[1] >= b[0] && x[1] < b[1]; });
      d += '<div><div class="tn-b">Niveaux ' + b[2] + '</div>';
      rows.forEach(function (x) {
        var f = x[0] + '.html', cls = [];
        if (f === here) cls.push('on');
        if (lv && lv >= x[1] && lv <= x[2]) cls.push('lv');
        d += '<a href="' + f + '"' + (cls.length ? ' class="' + cls.join(' ') + '"' : '') + (f === here ? ' aria-current="page"' : '') + '><b>' + x[1] + '–' + x[2] + '</b>' + esc(x[3]) + '</a>';
      });
      d += '</div>';
    });
    if (lv) d += '<div class="tn-note">Le trait bleu marque les donjons de ton niveau (' + lv + ').</div>';
    var bar = document.createElement('div');
    bar.className = 'tn';
    bar.innerHTML = '<div class="tn-in">' +
      '<a class="tn-home' + (here === 'index.html' ? ' on' : '') + '" href="index.html">Accueil</a>' +
      '<button type="button" aria-expanded="false" aria-controls="tn-g">Guides</button>' +
      '<button type="button" aria-expanded="false" aria-controls="tn-d">Donjons</button>' +
      '</div><div class="tn-p tn-g" id="tn-g">' + g + '</div><div class="tn-p tn-d" id="tn-d">' + d + '</div>';
    document.body.insertBefore(bar, document.body.firstChild);
    var bs = getComputedStyle(document.body);
    bar.style.marginTop = '-' + bs.paddingTop;
    bar.style.marginLeft = '-' + bs.paddingLeft;
    bar.style.marginRight = '-' + bs.paddingRight;
    bar.style.marginBottom = bs.paddingTop === '0px' ? '0' : bs.paddingTop;
    document.body.classList.add('has-tn');

    var btns = bar.querySelectorAll('button');
    function closeAll(except) {
      btns.forEach(function (b) {
        if (b === except) return;
        b.setAttribute('aria-expanded', 'false');
        document.getElementById(b.getAttribute('aria-controls')).classList.remove('open');
      });
    }
    btns.forEach(function (b) {
      b.addEventListener('click', function (e) {
        e.stopPropagation();
        var p = document.getElementById(b.getAttribute('aria-controls'));
        var open = b.getAttribute('aria-expanded') !== 'true';
        closeAll(b);
        b.setAttribute('aria-expanded', open ? 'true' : 'false');
        p.classList.toggle('open', open);
      });
    });
    bar.querySelectorAll('.tn-p').forEach(function (p) { p.addEventListener('click', function (e) { e.stopPropagation(); }); });
    document.addEventListener('click', function () { closeAll(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeAll(); });

    /* Fiche précédente / suivante en bas des fiches donjon */
    var idx = -1;
    D.forEach(function (x, i) { if (x[0] + '.html' === here) idx = i; });
    var old = document.querySelector('nav.nav');
    if (idx >= 0 && old) {
      var pv = D[idx - 1], nx = D[idx + 1], h = '';
      h += pv ? '<a class="pv" href="' + pv[0] + '.html"><small>← Fiche précédente</small>' + esc(pv[3]) + ' (' + pv[1] + '–' + pv[2] + ')</a>' : '<a class="pv" href="index.html"><small>←</small>Tous les donjons</a>';
      h += nx ? '<a class="nx" href="' + nx[0] + '.html"><small>Fiche suivante →</small>' + esc(nx[3]) + ' (' + nx[1] + '–' + nx[2] + ')</a>' : '<a class="nx" href="index.html"><small>→</small>Tous les donjons</a>';
      old.className = 'tn-pn';
      old.innerHTML = h;
    }
  }
  if (document.body) build(); else document.addEventListener('DOMContentLoaded', build);
})();
