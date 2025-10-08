(() => {
  const carouselTrack = document.getElementById('carousel-track');
  const dotsContainer = document.getElementById('carousel-dots');
  const galleryGrid = document.getElementById('gallery-grid');
  const modal = document.getElementById('modal');
  const modalImage = document.getElementById('modal-image');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-desc');
  const modalClose = document.getElementById('modal-close');
  let cards = [];
  let carouselIndex = 0;
  let autoTimer = null;
  const AUTO_DELAY = 3500;

  async function fetchCards(){
    try{
      const res = await fetch('php/get_cards.php');
      cards = await res.json();
      renderCarousel();
      renderGallery();
    }catch(err){console.error(err);}
  }

  function renderCarousel(){
    carouselTrack.innerHTML = '';
    dotsContainer.innerHTML = '';
    if(cards.length===0){
      carouselTrack.innerHTML='<div class="carousel-card"><p>No cards yet.</p></div>';
      return;
    }
    cards.forEach((c,i)=>{
      const card = document.createElement('div');
      card.className='carousel-card';
      card.innerHTML=`
        <img src="uploads/${c.filename}" alt="${c.title}">
        <div class="card-content"><h3>${c.title}</h3><p>${c.description?.slice(0,80)||''}</p></div>`;
      carouselTrack.appendChild(card);

      const dot = document.createElement('div');
      dot.className='dot';
      dot.addEventListener('click',()=>goToSlide(i));
      dotsContainer.appendChild(dot);
    });
    updateDots();
    startAuto();
  }

  function renderGallery(){
    galleryGrid.innerHTML='';
    cards.forEach(c=>{
      const item=document.createElement('div');
      item.className='gallery-item';
      item.innerHTML=`
        <img src="uploads/${c.filename}" alt="${c.title}">
        <div class="meta"><h4>${c.title}</h4><p>${c.description?.slice(0,60)||''}</p></div>`;
      item.addEventListener('click',()=>openModal(c));
      galleryGrid.appendChild(item);
    });
  }

  function goToSlide(idx){
    carouselIndex=idx;
    const width=carouselTrack.offsetWidth;
    carouselTrack.style.transform=`translateX(${-carouselIndex*width}px)`;
    updateDots();
  }
  function nextSlide(){goToSlide((carouselIndex+1)%cards.length);}
  function updateDots(){dotsContainer.querySelectorAll('.dot').forEach((d,i)=>d.classList.toggle('active',i===carouselIndex));}
  function startAuto(){stopAuto();autoTimer=setInterval(nextSlide,AUTO_DELAY);}
  function stopAuto(){if(autoTimer){clearInterval(autoTimer);autoTimer=null;}}
  function openModal(c){modalImage.src=`uploads/${c.filename}`;modalTitle.textContent=c.title;modalDesc.textContent=c.description||'';modal.classList.add('show');stopAuto();}
  modalClose.addEventListener('click',()=>{modal.classList.remove('show');startAuto();});
  modal.addEventListener('click',e=>{if(e.target===modal){modal.classList.remove('show');startAuto();}});
  window.addEventListener('resize',()=>goToSlide(carouselIndex));

  fetchCards();
})();
