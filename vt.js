window.P='3a9e2927f6ec1e8196c6dfa9c7a9959080f1902f';
window.VT={sleep:ms=>new Promise(r=>setTimeout(r,ms)),
set:(el,v)=>{Object.getOwnPropertyDescriptor(Object.getPrototypeOf(el),'value').set.call(el,v);['input','change','blur'].forEach(e=>el.dispatchEvent(new Event(e,{bubbles:true})));},
vis:sel=>[...document.querySelectorAll(sel)].find(e=>e.offsetParent),
leaf:(t,starts)=>[...document.querySelectorAll('*')].find(e=>e.offsetParent&&e.children.length===0&&(starts?e.textContent.trim().startsWith(t):e.textContent.trim()===t)),
close:async()=>{document.body.dispatchEvent(new MouseEvent('mousedown',{bubbles:true}));document.body.click();await VT.sleep(500);},
open:async(name)=>{const i=VT.vis(`input[name=${name}]`);i.scrollIntoView({block:'center'});i.click();await VT.sleep(900);return i;},
pick:async(name,vals,starts)=>{await VT.open(name);const out=[];for(const v of vals){const e=VT.leaf(v,starts);if(e){e.click();out.push(v);await VT.sleep(500);}else out.push(v+'?');}await VT.close();return name+'='+VT.vis(`input[name=${name}]`).value;},
search:async(name,q,pickText)=>{await VT.open(name);const s=[...document.querySelectorAll('input')].find(i=>i.offsetParent&&/find a category|search brands/i.test(i.placeholder||''));if(s){VT.set(s,q);await VT.sleep(1500);}const e=VT.leaf(pickText);if(e)e.click();await VT.sleep(800);await VT.close();return name+'='+VT.vis(`input[name=${name}]`).value;},
build:async(item,o)=>{const c=COPY[item],r=[];
 const inp=document.querySelector('input[type=file]');const bl=await Promise.all(c.photos.map(async n=>[n,await (await fetch(`https://raw.githubusercontent.com/morgantmonroe/listing-photos/${P}/item${item}/${n}.jpg`)).blob()]));const dt=new DataTransfer();for(const [n,b] of bl)dt.items.add(new File([b],`item${item}_${n}.jpg`,{type:'image/jpeg'}));inp.files=dt.files;inp.dispatchEvent(new Event('change',{bubbles:true}));await VT.sleep(7000);
 VT.set(VT.vis('[name=title]'),c.vtitle);VT.set(VT.vis('[name=description]'),c.vdesc||c.desc);
 r.push(await VT.search('category',o.catq,o.cat));
 if(o.brand)r.push(await VT.search('brand',o.brand,o.brand));
 r.push(await VT.pick('size',[o.size]));
 r.push(await VT.pick('condition',[o.cond]));
 r.push(await VT.pick('color',o.colors));
 if(o.mat&&VT.vis('input[name=material]'))r.push(await VT.pick('material',[o.mat]));
 VT.set(VT.vis('[name=price]'),o.price);
 r.push('photos '+[...document.querySelectorAll('button')].filter(b=>b.offsetParent&&(b.getAttribute('aria-label')||'')==='Remove selected photo').length);
 r.push(JSON.stringify([...document.querySelectorAll('input')].filter(i=>i.offsetParent&&['title','brand','size','condition','color','price','category','material'].includes(i.name)).map(i=>i.name+'='+i.value)));
 return r.join(' || ');}};
'vt ok';
