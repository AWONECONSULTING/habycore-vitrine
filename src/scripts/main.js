import { initSmoothScroll } from './smooth-scroll.js';

const copy = document.documentElement.lang === 'fr' ? {"closeMenu":"Fermer le menu","openMenu":"Ouvrir le menu","previous":"Précédent","next":"Suivant","showLess":"Réduire","readMore":"Lire la suite"} : {"closeMenu":"Close menu","openMenu":"Open menu","previous":"Previous","next":"Next","showLess":"Show less","readMore":"Read more"};

{
const root=document.documentElement;
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
const fine=matchMedia('(pointer:fine)').matches;
if(!reduce) root.classList.add('anim');
const yr=new Date().getFullYear();
document.getElementById('yr').textContent=yr;
document.querySelectorAll('.yr').forEach(e=>e.textContent=yr);

/* préchargement */
const loader=document.getElementById('loader');
const start=()=>{root.classList.add('go');loader.classList.add('out');setTimeout(()=>loader.remove(),1100);};
const direct=['mentions-legales','conditions','confidentialite','accessibilite'].includes(location.hash.slice(1));
if(reduce||direct){loader.remove();root.classList.add('go');}else setTimeout(start,1250);

/* grille du plan + grille éclairée */
let g='',g2='';
for(let i=0;i<=600;i+=30){const m=i%120===0?' major':'';g+=`<path class="gridline${m}" d="M${i} 0V600M0 ${i}H600"/>`;g2+=`<path class="spot-grid" d="M${i} 0V600M0 ${i}H600"/>`;}
document.getElementById('gridG').innerHTML=g;
document.getElementById('gridG2').innerHTML=g2;

/* Keep the outgoing word above the clipping box until its next entry. */
const rot=[...document.querySelectorAll('#rot span')];let ri=0;
if(!reduce)setInterval(()=>{
  const outgoing=rot[ri];
  outgoing.classList.remove('on');
  outgoing.classList.add('off');
  ri=(ri+1)%rot.length;
  const incoming=rot[ri];
  // Reset below the mask without animating back through the visible word.
  incoming.style.transition='none';
  incoming.style.transform='translateY(110%)';
  incoming.classList.remove('off');
  void incoming.offsetWidth;
  incoming.style.transition='';
  incoming.style.transform='';
  incoming.classList.add('on');
},2400);

/* titres mot à mot */
document.querySelectorAll('h2.rv').forEach(h=>{h.classList.add('split');const tk=[];h.childNodes.forEach(n=>{const tag=n.nodeType===1?n.tagName.toLowerCase():null;n.textContent.split(/(\s+)/).forEach(w=>{if(!w)return;if(/^\s+$/.test(w))tk.push(null);else tk.push(tag?`<${tag}>${w}</${tag}>`:w);});});let i=0;h.innerHTML=tk.map(w=>w===null?' ':`<span class="wd"><span style="--i:${i++}">${w}</span></span>`).join('');});

/* bandeau d'expertises */
const words=document.documentElement.lang === 'fr' ? ['Développement logiciel','Architecture logicielle','Intelligence artificielle','Automatisation','E-commerce','Transformation digitale','Audit technique','Formation professionnelle'] : ['Software development','Software architecture','Artificial intelligence','Automation','E-commerce','Digital transformation','Technical audit','Professional training'];
const seq=words.map(w=>`<span>${w}</span>`).join('');
const track=document.getElementById('track');track.innerHTML=seq+seq;

/* navigation */
const nav=document.getElementById('nav'),burger=document.getElementById('burger'),prog=document.getElementById('prog');
burger.addEventListener('click',()=>{const o=nav.classList.toggle('open');burger.setAttribute('aria-expanded',o);burger.setAttribute('aria-label',o?copy.closeMenu:copy.openMenu);});
const links=[...document.querySelectorAll('#menu a')];
links.forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');burger.setAttribute('aria-expanded','false');burger.setAttribute('aria-label',copy.openMenu);}));
const secObs=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting){links.forEach(l=>l.classList.toggle('on',l.getAttribute('href')==='#'+e.target.id));}});},{rootMargin:'-45% 0px -50% 0px'});
['entreprise','activites','methode','vision','contact'].forEach(id=>secObs.observe(document.getElementById(id)));

/* compteurs */
document.querySelectorAll('.odo').forEach(o=>{o.innerHTML='<span>'+[...Array(10).keys(),...Array(10).keys()].map(d=>`<span>${d}</span>`).join('')+'</span>';if(reduce)o.firstChild.style.transform=`translateY(${-o.dataset.to*60}px)`;});
const count=el=>{requestAnimationFrame(()=>{el.firstChild.style.transform=`translateY(${-(10+ +el.dataset.to)*60}px)`;});};
const fl=[...document.querySelectorAll('#factList li')];let fi=0;
if(!reduce){const cyc=()=>{fl.forEach((l,k)=>l.classList.toggle('cur',k===fi));fi=(fi+1)%fl.length;};setTimeout(()=>{cyc();setInterval(cyc,2600);},1800);fl.forEach((l,k)=>l.addEventListener('pointerenter',()=>{fi=k;fl.forEach((m,q)=>m.classList.toggle('cur',q===k));}));}

/* révélations */
const rvObs=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');e.target.querySelectorAll('[data-to]').forEach(count);rvObs.unobserve(e.target);}});},{threshold:.12,rootMargin:'0px 0px -6% 0px'});
document.querySelectorAll('.rv').forEach(el=>rvObs.observe(el));

/* phrase manifeste */
const st=document.getElementById('statement');
st.innerHTML=st.textContent.trim().split(/\s+/).map(w=>`<span class="w">${w}</span>`).join(' ');
const ws=[...st.querySelectorAll('.w')];

const hA=document.getElementById('halfA'),hB=document.getElementById('halfB'),fig=document.getElementById('heroFig');
let px=0,py=0;
const setHalves=()=>{const o=Math.min(scrollY/6,innerWidth<640?18:40);const d=o+px;hA.style.transform=`translate(${-d+py*.3}px,${d+py*.3}px)`;hB.style.transform=`translate(${d-py*.3}px,${-d-py*.3}px)`;};
const clamp=v=>Math.max(0,Math.min(1,v));
/* croquis du symbole : tracé en boucle */
{const SK=document.getElementById('vSketch');const G=[...SK.querySelectorAll('.sk-g')],C=[...SK.querySelectorAll('.sk-c')],S=[...SK.querySelectorAll('.sk-s')];
G.forEach((e,i)=>{e.setAttribute('pathLength','1');e.style.animationDelay=(i/G.length*1.6).toFixed(2)+'s';});
C.forEach((e,i)=>e.style.animationDelay=(1.8+i*.35).toFixed(2)+'s');
S.forEach((e,i)=>e.style.animationDelay=(3.8+i*.7).toFixed(2)+'s');}

const tick=()=>{
  const vh=innerHeight,y=scrollY,H=document.documentElement.scrollHeight-vh;
  nav.classList.toggle('solid',y>24);
  prog.style.transform=`scaleX(${H>0?y/H:0})`;
  if(reduce){ws.forEach(w=>w.classList.add('on'));}
  else{const r=st.getBoundingClientRect();const n=Math.round(clamp((vh*.85-r.top)/(r.height+vh*.35))*ws.length);ws.forEach((w,i)=>w.classList.toggle('on',i<n));}
  if(!reduce){const mt=document.getElementById('mth'),mr=mt.parentElement.getBoundingClientRect(),k=innerWidth<640?.55:1;
    const ex=clamp((vh*.5-mr.bottom)/(vh*.6));
    if(ex>0){const xe=ex*ex;mt.style.transformOrigin='50% 100%';mt.style.transform=`translateY(${(-xe*120*k).toFixed(1)}px) rotateX(${(xe*34*k).toFixed(2)}deg) scale(${(1-xe*.16*k).toFixed(3)})`;mt.style.opacity=(1-xe*.75).toFixed(3);}
    else{const mp=clamp((vh-mr.top)/(vh*.75)),r=(1-mp)**2;mt.style.transformOrigin='50% 0%';mt.style.transform=`translateY(${(r*120*k).toFixed(1)}px) rotateX(${(-r*34*k).toFixed(2)}deg) scale(${(1-r*.16*k).toFixed(3)})`;mt.style.opacity=(1-r*.75).toFixed(3);}}
  if(!reduce){setHalves();}
};
addEventListener('scroll',tick,{passive:true});addEventListener('resize',tick);tick();

/* bandeau : vitesse liée au défilement */
let mx=0,vel=0,lastY=scrollY,hover=false,tw=0;
const mq=track.parentElement;mq.addEventListener('pointerenter',()=>hover=true);mq.addEventListener('pointerleave',()=>hover=false);
/* projecteur sur la grille du hero */
const spot=document.getElementById('spotC'),hsvg=fig.querySelector('svg'),hero=document.getElementById('accueil');
let sx=300,sy=300,tx=null,ty=null,t0=performance.now();
/* HTML bubbles use the figure bounds; SVG coordinates may be letterboxed.
   Project the live bubble edges into the SVG so every connector stays attached. */
const heroPaths=[...hsvg.querySelectorAll('.link')];
const heroNodes=[...fig.querySelectorAll('.node')];
const connectorPoint=hsvg.createSVGPoint();
const connectorEnds=[
  {edge:'bottom',dx:50,dy:12,curve:'190 180 220 205'},
  {edge:'left',dx:-50,dy:0,curve:'450 270 400 285'},
  {edge:'top',dx:50,dy:-12,curve:'230 440 260 410'},
];
const syncHeroConnectors=()=>{
  if(!heroNodes[0].getClientRects().length)return; // Mobile hides bubbles; portrait tablets show them.
  const matrix=hsvg.getScreenCTM();
  if(!matrix)return;
  const inverse=matrix.inverse();
  const bounds=heroNodes.map(node=>node.getBoundingClientRect());
  bounds.forEach((rect,i)=>{
    const config=connectorEnds[i];
    connectorPoint.x=config.edge==='left'?rect.left:rect.left+rect.width/2;
    connectorPoint.y=config.edge==='bottom'?rect.bottom:config.edge==='top'?rect.top:rect.top+rect.height/2;
    const p=connectorPoint.matrixTransform(inverse);
    heroPaths[i].setAttribute('d',`M${p.x.toFixed(2)} ${p.y.toFixed(2)} C ${(p.x+config.dx).toFixed(2)} ${(p.y+config.dy).toFixed(2)} ${config.curve}`);
  });
};
syncHeroConnectors();
addEventListener('resize',syncHeroConnectors);
document.fonts.ready.then(syncHeroConnectors);
if(fine&&!reduce)hero.addEventListener('pointermove',e=>{const p=hsvg.createSVGPoint();p.x=e.clientX;p.y=e.clientY;const q=p.matrixTransform(hsvg.getScreenCTM().inverse());tx=q.x;ty=q.y;});
hero.addEventListener('pointerleave',()=>{tx=null;});
const loop=t=>{
  const dy=scrollY-lastY;lastY=scrollY;vel=Math.min(vel*.92+Math.abs(dy)*.08,14);
  if(!tw)tw=track.scrollWidth/2;
  if(!hover){mx-=(.55+vel)*(dy<0?-1:1)*(dy===0&&vel<.6?1:1);}
  if(mx<-tw)mx+=tw;if(mx>0)mx-=tw;
  track.style.transform=`translate3d(${mx}px,0,0)`;
  const a=(t-t0)/2600,ox=tx??300+Math.cos(a)*150,oy=ty??300+Math.sin(a*1.3)*120;
  sx+=(ox-sx)*.08;sy+=(oy-sy)*.08;spot.setAttribute('cx',sx.toFixed(1));spot.setAttribute('cy',sy.toFixed(1));
  syncHeroConnectors();
  requestAnimationFrame(loop);
};
if(!reduce)requestAnimationFrame(loop);
addEventListener('resize',()=>{tw=0;});

if(!reduce&&fine){
  fig.addEventListener('pointermove',e=>{const r=fig.getBoundingClientRect();const x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;px=Math.hypot(x,y)*22;py=x*10;setHalves();});
  fig.addEventListener('pointerleave',()=>{px=0;py=0;setHalves();});
  /* cartes : halo + inclinaison 3D */
  document.querySelectorAll('.pole,.trust>div,.trio>div').forEach(c=>{
    c.addEventListener('pointermove',e=>{const r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
      c.style.setProperty('--x',(e.clientX-r.left)+'px');c.style.setProperty('--y',(e.clientY-r.top)+'px');
      c.style.transition='transform .15s,border-color .4s,box-shadow .5s';c.style.transform=`perspective(1000px) rotateX(${(-y*6).toFixed(2)}deg) rotateY(${(x*7).toFixed(2)}deg) translateY(-4px)`;});
    c.addEventListener('pointerleave',()=>{c.style.transition='';c.style.transform='';});});
}

/* signe : grille + inclinaison */
{let sg='';for(let i=0;i<=400;i+=25)sg+=`<path class="sg-line" d="M${i} 0V400M0 ${i}H400"/>`;document.getElementById('sgGrid').innerHTML=sg;
const sign=document.getElementById('sign'),ssv=sign.querySelector('svg');
if(!reduce&&fine){sign.addEventListener('pointermove',e=>{const r=sign.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;ssv.style.transform=`rotateX(${(-y*14).toFixed(1)}deg) rotateY(${(x*14).toFixed(1)}deg)`;});sign.addEventListener('pointerleave',()=>ssv.style.transform='');}}

/* méthode : étapes interactives */
{const tabsEl=[...document.querySelectorAll('#mth .mt')],panesEl=[...document.querySelectorAll('#mth .mp')],fillEl=document.getElementById('mFill'),tok=document.getElementById('mTok'),mth=document.getElementById('mth');
let cur=0,timer=null,paused=false,seen=false;const DUR=5000;
const show=(i,user)=>{if(user)paused=true;cur=i;tabsEl.forEach((t,k)=>{t.classList.toggle('on',k===i);t.classList.toggle('past',k<i);t.classList.remove('run');t.setAttribute('aria-selected',k===i);t.tabIndex=k===i?0:-1;});
  panesEl.forEach((p,k)=>p.classList.toggle('on',k===i));document.getElementById('mCnt').textContent=i+1;fillEl.style.transform=`scaleX(${i/4})`;tok.style.left=`calc(10% + ${i*20}%)`;
  clearTimeout(timer);if(!reduce&&seen&&!paused){void tabsEl[i].offsetWidth;tabsEl[i].style.setProperty('--dur',DUR+'ms');tabsEl[i].classList.add('run');timer=setTimeout(()=>show((cur+1)%5),DUR);}
};
tabsEl.forEach((t,k)=>{t.addEventListener('click',()=>show(k,true));t.addEventListener('keydown',e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();const n=(cur+(e.key==='ArrowRight'?1:4))%5;show(n,true);tabsEl[n].focus();}});});
mth.addEventListener('pointerenter',()=>{if(fine){paused=true;clearTimeout(timer);tabsEl[cur].classList.remove('run');}});
mth.addEventListener('pointerleave',()=>{if(fine){paused=false;show(cur);}});
document.getElementById('mPrev').addEventListener('click',()=>show((cur+4)%5,true));
document.getElementById('mNext').addEventListener('click',()=>show((cur+1)%5,true));
{const bd=document.getElementById('mBody');let sx=null,sy=0;bd.addEventListener('pointerdown',e=>{sx=e.clientX;sy=e.clientY;});
bd.addEventListener('pointerup',e=>{if(sx===null)return;const dx=e.clientX-sx,dy=e.clientY-sy;sx=null;if(Math.abs(dx)>45&&Math.abs(dx)>Math.abs(dy))show(dx<0?(cur+1)%5:(cur+4)%5,true);});
bd.addEventListener('pointercancel',()=>sx=null);}
const mObs=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting&&!seen){seen=true;show(0);}});},{threshold:.35});mObs.observe(mth);show(0);}

/* packs : préremplir l'objet */
document.querySelectorAll('.pk-btn').forEach(b=>b.addEventListener('click',()=>{const sel=document.getElementById('f-subject');sel.value=b.dataset.subject;sel.closest('.field').classList.remove('err');}));

/* carrousels mobiles */
document.querySelectorAll('.slide').forEach(sl=>{
  sl.classList.add('swipe-ready');
  const items=[...sl.children],c=document.createElement('div');c.className='sl-ctrl'+(sl.dataset.dark||sl.closest('.inv')?' dk':'')+(sl.classList.contains('s')?' s':'');
  c.innerHTML='<button class="arr" type="button" aria-label="'+copy.previous+'"><svg viewBox="0 0 24 24"><path d="M19 12H5M11 6l-6 6 6 6"/></svg></button><span class="sl-dots">'+items.map(()=>'<i></i>').join('')+'</span><button class="arr" type="button" aria-label="'+copy.next+'"><svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg></button>';
  sl.after(c);const dots=[...c.querySelectorAll('i')],[pv,nx]=c.querySelectorAll('button');
  const idx=()=>{let best=0,d=1e9;items.forEach((it,k)=>{const v=Math.abs(it.offsetLeft-sl.offsetLeft-sl.scrollLeft-parseFloat(getComputedStyle(sl).paddingLeft));if(v<d){d=v;best=k;}});return best;};
  const upd=()=>{const i=idx();dots.forEach((dt,k)=>dt.classList.toggle('on',k===i));pv.disabled=i===0;nx.disabled=i===items.length-1;pv.style.opacity=i===0?.35:1;nx.style.opacity=i===items.length-1?.35:1;};
  const go=i=>{const it=items[Math.max(0,Math.min(items.length-1,i))];sl.scrollTo({left:it.offsetLeft-sl.offsetLeft-parseFloat(getComputedStyle(sl).paddingLeft),behavior:reduce?'auto':'smooth'});};
  pv.addEventListener('click',()=>go(idx()-1));nx.addEventListener('click',()=>go(idx()+1));
  // Keep vertical page gestures native; handle horizontal swipes and mouse drags.
  let drag=null,suppressClick=false;
  sl.addEventListener('pointerdown',e=>{
    if(e.button!==0||sl.scrollWidth<=sl.clientWidth)return;
    drag={id:e.pointerId,x:e.clientX,y:e.clientY,left:sl.scrollLeft,active:false};
    suppressClick=false;
  });
  sl.addEventListener('pointermove',e=>{
    if(!drag||drag.id!==e.pointerId)return;
    const dx=e.clientX-drag.x,dy=e.clientY-drag.y;
    if(!drag.active){
      if(Math.abs(dy)>8&&Math.abs(dy)>Math.abs(dx)){drag=null;return;}
      if(Math.abs(dx)<8)return;
      drag.active=true;sl.setPointerCapture(e.pointerId);sl.classList.add('dragging');
    }
    e.preventDefault();sl.scrollLeft=drag.left-dx;
  });
  const endDrag=()=>{
    if(!drag)return;
    const active=drag.active,target=idx();
    if(sl.hasPointerCapture(drag.id))sl.releasePointerCapture(drag.id);
    drag=null;sl.classList.remove('dragging');
    if(active){suppressClick=true;go(target);}
  };
  sl.addEventListener('pointerup',endDrag);
  sl.addEventListener('pointercancel',endDrag);
  sl.addEventListener('pointerleave',()=>{if(drag&&!drag.active)drag=null;});
  sl.addEventListener('dragstart',e=>e.preventDefault());
  sl.addEventListener('click',e=>{if(suppressClick){e.preventDefault();e.stopPropagation();suppressClick=false;}},true);
  sl.addEventListener('scroll',()=>requestAnimationFrame(upd),{passive:true});
  sl.addEventListener('keydown',e=>{if(e.key==='ArrowRight'){e.preventDefault();go(idx()+1);}if(e.key==='ArrowLeft'){e.preventDefault();go(idx()-1);}});
  upd();addEventListener('resize',upd);
});

/* lire la suite (mobile) */
{const rm=document.getElementById('readMore'),mo=document.getElementById('aboutMore');rm.addEventListener('click',()=>{const o=mo.classList.toggle('open');rm.setAttribute('aria-expanded',o);rm.querySelector('span').textContent=o?copy.showLess:copy.readMore;});}

/* formulaire */
const form=document.getElementById('form');
const emailOk=v=>/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
const check=el=>{const f=el.closest('.field');if(!f)return true;let ok=el.value.trim()!=='';if(ok&&el.type==='email')ok=emailOk(el.value.trim());f.classList.toggle('err',!ok);el.setAttribute('aria-invalid',String(!ok));return ok;};
form.querySelectorAll('.field [required]').forEach(el=>{el.addEventListener('blur',()=>{if(el.value)check(el);});el.addEventListener('input',()=>{if(el.closest('.field').classList.contains('err'))check(el);});});
const consent=document.getElementById('f-consent'),consentL=document.getElementById('consentL');
consent.addEventListener('change',()=>consentL.classList.toggle('err',!consent.checked));
const submit=form.querySelector('[type="submit"]'),submitLabel=submit.querySelector('[data-submit-label]');
const submitText=submitLabel.textContent,status=document.getElementById('form-status');
const formCopy=document.documentElement.lang==='fr'?{
  sending:'Envoi en cours…',
  invalid:'Merci de vérifier les champs et votre consentement avant de réessayer.',
  error:'L’envoi n’a pas pu être confirmé. Vos champs sont conservés. Vous pouvez nous écrire à contact@habycore.com.'
}:{
  sending:'Sending…',
  invalid:'Please check your details and consent before trying again.',
  error:'Your submission could not be confirmed. Your details have been kept. You can email us at contact@habycore.com.'
};
let sending=false;
form.addEventListener('submit',async e=>{e.preventDefault();if(sending)return;let ok=true,first=null;
  status.hidden=true;status.textContent='';status.classList.remove('error');
  form.querySelectorAll('.field [required]').forEach(el=>{if(!check(el)){ok=false;first=first||el;}});
  if(!consent.checked){ok=false;consentL.classList.add('err');first=first||consent;}
  if(!ok){first.focus();return;}
  sending=true;submit.disabled=true;form.setAttribute('aria-busy','true');
  submitLabel.textContent=formCopy.sending;status.textContent=formCopy.sending;status.hidden=false;
  const controller=new AbortController(),timeout=setTimeout(()=>controller.abort(),30000);
  try{
    const response=await fetch(form.action,{
      method:'POST',body:new URLSearchParams(new FormData(form)),
      credentials:'omit',signal:controller.signal
    });
    if(!response.ok){
      status.textContent=response.status===400?formCopy.invalid:formCopy.error;
      throw new Error('Form submission failed');
    }
    const result=await response.json();
    if(result.ok!==true)throw new Error('Submission not confirmed');
    status.hidden=true;form.classList.add('sent');form.querySelector('.done h3').focus();
  }catch{
    if(status.textContent===formCopy.sending)status.textContent=formCopy.error;
    status.classList.add('error');status.hidden=false;status.focus();
  }finally{
    clearTimeout(timeout);sending=false;submit.disabled=false;
    form.removeAttribute('aria-busy');submitLabel.textContent=submitText;
  }
});
document.getElementById('again').addEventListener('click',()=>{form.reset();form.classList.remove('sent');status.hidden=true;status.textContent='';document.getElementById('f-name').focus();});

/* pages légales */
const legal=document.getElementById('legal'),pages=['mentions-legales','conditions','confidentialite','accessibilite'];
let backY=0,isOpen=false;
const route=()=>{const h=location.hash.slice(1);
  if(pages.includes(h)){if(!isOpen){backY=scrollY;isOpen=true;}legal.classList.add('open');document.body.style.overflow='hidden';
    legal.querySelectorAll('[data-l]').forEach(el=>el.classList.toggle('on',el.dataset.l===h));legal.querySelector('.legal-bar nav a.on')?.scrollIntoView({inline:'center',block:'nearest'});legal.scrollTop=0;}
  else if(isOpen){isOpen=false;legal.classList.remove('open');document.body.style.overflow='';}
};
addEventListener('hashchange',route);route();
const closeLegal=()=>{history.replaceState(null,'',location.pathname+location.search);route();scrollTo({top:backY,behavior:'instant'});};
document.getElementById('closeLegal').addEventListener('click',closeLegal);
addEventListener('keydown',e=>{if(e.key==='Escape'&&isOpen)closeLegal();});
}


initSmoothScroll();
