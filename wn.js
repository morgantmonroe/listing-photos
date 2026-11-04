window.P='3a9e2927f6ec1e8196c6dfa9c7a9959080f1902f';
window.WN={sleep:ms=>new Promise(r=>setTimeout(r,ms)),
set:(el,v)=>{const p=el.tagName==='TEXTAREA'?HTMLTextAreaElement.prototype:HTMLInputElement.prototype;Object.getOwnPropertyDescriptor(p,'value').set.call(el,v);el.dispatchEvent(new Event('input',{bubbles:true}));el.dispatchEvent(new Event('change',{bubbles:true}));},
byLabel:(lab)=>[...document.querySelectorAll('input[id^=downshift]')].find(i=>i.offsetParent&&(i.closest('label,div')?.innerText||'').replace(/\s+/g,' ').trim().startsWith(lab)),
pick:async(lab,val,typeIt=true)=>{const i=WN.byLabel(lab);if(!i)return lab+': no field';i.scrollIntoView({block:'center'});i.focus();i.click();await WN.sleep(500);if(typeIt){WN.set(i,val);await WN.sleep(1200);}const opts=[...document.querySelectorAll('[role=option]')].filter(o=>o.offsetParent);const o=val&&(opts.find(o=>o.textContent.trim().toLowerCase()===val.toLowerCase())||opts.find(o=>o.textContent.trim().toLowerCase().startsWith(val.toLowerCase())));if(o){o.click();await WN.sleep(600);return lab+':'+o.textContent.trim();}const l=opts.map(o=>o.textContent.trim()).slice(0,25).join('|');i.blur();return lab+': none ['+l+']';},
build:async(item,o)=>{const c=COPY[item],r=[];
 const x=[...document.querySelectorAll('button')].find(b=>b.offsetParent&&/close/i.test(b.getAttribute('aria-label')||''));x&&x.click();await WN.sleep(800);
 const inp=document.querySelector('input[type=file]');const bl=await Promise.all(c.photos.map(async n=>[n,await (await fetch(`https://raw.githubusercontent.com/morgantmonroe/listing-photos/${P}/item${item}/${n}.jpg`)).blob()]));const dt=new DataTransfer();for(const [n,b] of bl)dt.items.add(new File([b],`item${item}_${n}.jpg`,{type:'image/jpeg'}));inp.files=dt.files;inp.dispatchEvent(new Event('change',{bubbles:true}));await WN.sleep(7000);
 const chip=[...document.querySelectorAll('button,div,span')].find(e=>e.offsetParent&&e.children.length===0&&e.textContent.trim()==="Women's Contemporary");chip&&chip.click();await WN.sleep(2000);
 WN.set(document.querySelector('input[name=title]'),c.title);WN.set(document.querySelector('textarea[name=description]'),c.desc);
 r.push(document.querySelectorAll('button[aria-label="Remove media"]').length+' photos');
 r.push(await WN.pick('Type',o.type));r.push(await WN.pick('Size',o.size));r.push(await WN.pick('Condition',o.cond,false));
 if(o.brand)r.push(await WN.pick('Brand',o.brand));r.push(await WN.pick('Color',o.color));
 r.push(await WN.pick('Hazardous Materials','No Hazardous Materials',false));
 const p=[...document.querySelectorAll('input')].find(i=>i.offsetParent&&(i.closest('label,div')?.innerText||'').trim().startsWith('Price (USD)'));WN.set(p,o.price);r.push('price '+p.value);
 const q=document.querySelector('input[name=quantity]');if(!q.value)WN.set(q,'1');
 const b=[...document.querySelectorAll('button')].find(b=>b.offsetParent&&/Shipping Profile/.test(b.innerText));b.scrollIntoView({block:'center'});b.click();
 return r.join(' || ');},
save:async()=>{const ok=/Small item/.test(document.body.innerText);[...document.querySelectorAll('button')].find(b=>b.offsetParent&&b.textContent.trim()==='Save Draft').click();return 'ship '+ok;}};
'wn ok';
