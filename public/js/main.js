// ── Custom Cursor ──────────────────────────────────────────────
const cursor = document.getElementById('cursor');
const ring   = document.getElementById('cursorRing');
let mx=0,my=0,rx=0,ry=0;
if(cursor){
  document.addEventListener('mousemove',e=>{
    mx=e.clientX;my=e.clientY;
    cursor.style.left=mx+'px';cursor.style.top=my+'px';
  });
  (function anim(){
    rx+=(mx-rx)*.12;ry+=(my-ry)*.12;
    ring.style.left=rx+'px';ring.style.top=ry+'px';
    requestAnimationFrame(anim);
  })();
  document.querySelectorAll('a,button,.project-card,.skill-card,.cert-card,.filter-btn').forEach(el=>{
    el.addEventListener('mouseenter',()=>{cursor.style.width='6px';cursor.style.height='6px';ring.style.width='52px';ring.style.height='52px';});
    el.addEventListener('mouseleave',()=>{cursor.style.width='12px';cursor.style.height='12px';ring.style.width='38px';ring.style.height='38px';});
  });
}

// ── Scroll Reveal ──────────────────────────────────────────────
const observer=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.classList.add('visible');
      e.target.querySelectorAll('.bar-fill[data-w]').forEach(b=>{
        setTimeout(()=>{b.style.width=b.dataset.w+'%';},200);
      });
    }
  });
},{threshold:.15});
document.querySelectorAll('.reveal,.reveal-left,.reveal-right,.timeline-item,.cert-card').forEach(el=>observer.observe(el));

// ── Skill bars in view ─────────────────────────────────────────
document.querySelectorAll('.bar-fill[data-w]').forEach(bar=>{
  const io=new IntersectionObserver(entries=>{
    if(entries[0].isIntersecting){setTimeout(()=>{bar.style.width=bar.dataset.w+'%';},300);io.disconnect();}
  },{threshold:.5});
  io.observe(bar);
});

// ── Nav shrink on scroll ───────────────────────────────────────
const nav=document.querySelector('nav');
if(nav){
  window.addEventListener('scroll',()=>{
    nav.style.padding=window.scrollY>60?'0.85rem 4rem':'1.3rem 4rem';
  });
}

// ── Active nav link ────────────────────────────────────────────
document.querySelectorAll('.nav-links a').forEach(a=>{
  if(a.getAttribute('href')===window.location.pathname)a.classList.add('active');
});

// ── Filter buttons (work page) ─────────────────────────────────
document.querySelectorAll('.filter-btn').forEach(btn=>{
  btn.addEventListener('click',()=>{
    const cat=btn.dataset.cat;
    const url=cat==='all'?'/work':'/work?category='+encodeURIComponent(cat);
    window.location.href=url;
  });
});

// ── AJAX Contact form ──────────────────────────────────────────
const contactForm=document.getElementById('contactForm');
if(contactForm){
  contactForm.addEventListener('submit',async e=>{
    e.preventDefault();
    const btn=contactForm.querySelector('button[type=submit]');
    const span=btn.querySelector('span');
    span.textContent='Sending…';
    btn.disabled=true;
    const body=Object.fromEntries(new FormData(contactForm));
    try{
      const res=await fetch('/api/contact',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});
      const data=await res.json();
      const alert=document.getElementById('formAlert');
      if(data.success){
        alert.className='alert alert-success';
        alert.textContent='✓ Message sent! I\'ll be in touch soon.';
        contactForm.reset();
      }else{
        alert.className='alert alert-error';
        alert.textContent='✗ '+data.message;
      }
      alert.style.display='block';
    }catch(err){
      console.error(err);
    }finally{
      span.textContent='Send Message ↗';
      btn.disabled=false;
    }
  });
}
