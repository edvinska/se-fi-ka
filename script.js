const menu = document.querySelector('.menu');
const nav = document.querySelector('#nav');
function closeMenu(){nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.querySelector('span').textContent='＋';}
menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));menu.querySelector('span').textContent=open?'−':'＋';});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav.classList.contains('open')){closeMenu();menu.focus();}});
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
const journey=document.querySelector('.journey');
const chapterNumber=document.querySelector('.chapter-number');
const chapterTitle=document.querySelector('.chapter-title');
const track=document.querySelector('.journey-track span');
const heroImage=document.querySelector('.hero-image');
const steps=[...document.querySelectorAll('.step')];
const counter=document.querySelector('.journey-counter');
let scheduled=false;
function renderScroll(){scheduled=false;const total=document.documentElement.scrollHeight-innerHeight;document.querySelector('.progress').style.width=`${total>0?scrollY/total*100:0}%`;if(reduced.matches)return;const header=document.querySelector('header').offsetHeight;const range=journey.offsetHeight-(innerHeight-header);const fraction=Math.max(0,Math.min(1,(header-journey.getBoundingClientRect().top)/Math.max(1,range)));const active=Math.min(2,Math.floor(fraction*3));steps.forEach((s,i)=>s.classList.toggle('active',i===active));counter.textContent=`0${active+1} — 03`;chapterNumber.textContent=`0${active+1}`;chapterTitle.textContent=['Sovitaan.','Kuljetetaan.','Toimitetaan.'][active];track.style.width=`${fraction*100}%`;heroImage.style.transform=`scale(${1+Math.min(scrollY/innerHeight,1)*.05})`;}
function queueScroll(){if(!scheduled){scheduled=true;requestAnimationFrame(renderScroll);}}
addEventListener('scroll',queueScroll,{passive:true});addEventListener('resize',queueScroll);reduced.addEventListener('change',queueScroll);renderScroll();
if('IntersectionObserver' in window&&!reduced.matches){document.querySelectorAll('.services h2,.service,.area-copy,.about-grid,.contact h2').forEach(el=>el.classList.add('reveal'));document.body.classList.add('motion');const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}});},{threshold:.12});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));}
const form=document.querySelector('#brief');
document.querySelectorAll('[data-service]').forEach(link=>link.addEventListener('click',()=>{form.elements.service.value=link.dataset.service;}));
form.addEventListener('submit',async e=>{e.preventDefault();const data=new FormData(form);const message=`Kuljetustiedot / SE-FI-KA Kuljetus Oy\n\nPalvelu: ${data.get('service')}\nNoutopaikka: ${String(data.get('from')).trim()}\nMääränpää: ${String(data.get('to')).trim()}\nTavara ja ajankohta: ${String(data.get('details')).trim()}\n\nYhteydenotto: 050 591 0873`;const result=document.querySelector('#brief-result');const text=document.querySelector('#brief-text');const status=document.querySelector('#form-status');result.hidden=false;text.value=message;try{await navigator.clipboard.writeText(message);status.textContent='Kuljetustiedot kopioitu. Soita 050 591 0873 ja sovi kuljetuksesta.';}catch{status.textContent='Muistilista on valmis. Kopioi alla oleva teksti ja soita 050 591 0873.';text.focus();text.select();}});
document.querySelector('#year').textContent=new Date().getFullYear();
