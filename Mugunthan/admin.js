(() => {
  const form = document.getElementById('add-card-form');
  const adminList = document.getElementById('admin-list');

  async function fetchCards(){
    const res = await fetch('php/get_cards.php');
    const cards = await res.json();
    renderAdminList(cards);
  }

  function renderAdminList(cards){
    adminList.innerHTML='';
    if(cards.length===0){adminList.innerHTML='<p>No uploaded items yet.</p>';return;}
    cards.slice().reverse().forEach(c=>{
      const div=document.createElement('div');div.className='admin-item';
      div.innerHTML=`
        <img class="preview-img" src="uploads/${c.filename}" alt="${c.title}">
        <div class="admin-meta">
          <h4>${c.title}</h4>
          <textarea placeholder="Add description">${c.description||''}</textarea>
          <div class="admin-actions">
            <button class="btn save-btn">Save</button>
            <button class="delete-btn">Delete</button>
          </div>
        </div>`;
      const saveBtn = div.querySelector('.save-btn');
      const delBtn = div.querySelector('.delete-btn');
      const textarea = div.querySelector('textarea');

      saveBtn.addEventListener('click',async ()=>{
        const formData=new FormData();
        formData.append('filename',c.filename);
        formData.append('description',textarea.value);
        await fetch('php/save_description.php',{method:'POST',body:formData});
        alert('Saved'); fetchCards();
      });
      delBtn.addEventListener('click',async ()=>{
        if(confirm('Delete this card?')){
          const formData=new FormData(); formData.append('filename',c.filename);
          await fetch('php/delete_card.php',{method:'POST',body:formData});
          alert('Deleted'); fetchCards();
        }
      });

      adminList.appendChild(div);
    });
  }

  form.addEventListener('submit',async e=>{
    e.preventDefault();
    const img=form.querySelector('#card-image-input').files[0];
    const title=form.querySelector('#card-title-input').value;
    const fd=new FormData(); fd.append('image',img); fd.append('title',title);
    await fetch('php/upload_card.php',{method:'POST',body:fd});
    form.reset(); fetchCards(); alert('Card added');
  });

  fetchCards();
})();
