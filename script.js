const WHATSAPP_NUMBER = '5978743042'; // Suriname country code + local number
let language = 'nl';
const langToggle = document.getElementById('langToggle');
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
function makeMessage(role, lang=language){
  if(lang === 'en') return `Hi! I would like to apply for the S.S.E.R.C. modelling application for the ${role} role. This is a volunteer role for now. Thank you!`;
  return `Hallo! Ik wil graag solliciteren voor de modelling application van S.S.E.R.C. voor de rol ${role}. Dit is voorlopig een vrijwillige rol. Bedankt!`;
}
function whatsappLink(role){return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(makeMessage(role))}`;}
document.querySelectorAll('.role-apply').forEach(link=>link.addEventListener('click',e=>{e.preventDefault();window.open(whatsappLink(link.dataset.role),'_blank','noopener,noreferrer')}));
document.getElementById('generalApply').addEventListener('click',e=>{e.preventDefault();window.open(whatsappLink(language==='en'?'Volunteer / general application':'Vrijwilliger / algemene sollicitatie'),'_blank','noopener,noreferrer')});
langToggle.addEventListener('click',()=>{language=language==='nl'?'en':'nl';document.documentElement.lang=language;langToggle.textContent=language==='nl'?'EN':'NL';document.querySelectorAll('[data-nl][data-en]').forEach(el=>{el.innerHTML=el.dataset[language]});document.querySelectorAll('.role-apply span:first-child').forEach(el=>el.textContent=language==='nl'?'Solliciteer voor deze rol':'Apply for this role');});
menuToggle.addEventListener('click',()=>navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>navLinks.classList.remove('open')));
document.getElementById('year').textContent=new Date().getFullYear();
