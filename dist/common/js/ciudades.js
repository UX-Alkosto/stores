/*! stores - v1.3.6 */
import{Stores,Store,log}from"./stores/index.js";(async(e,r)=>{try{const t=new Stores(r),o=Stores.getStoreFromUrl(),n=e.querySelector("#stores"),a=e.querySelectorAll(".nombre-ciudad");log(o),await t.stores.then(({ciudades:r})=>{n.innerHTML="";let t=0;const s=r[o.city],c=r[o.city][0];Object.keys(r[o.city].tiendas).length&&(a.length&&a.forEach(e=>e.innerHTML=s.label),Object.values(s.tiendas).map(async r=>{const o=new Store({address:r.direccion,city:s.label,howToGet:r.como_llegar,order:t,label:c,link:r.ir,external:r.externo,name:r.nombre_tienda,schedule:r.horario_apertura});t++,n.append(e.createRange().createContextualFragment(await o.render()))}))})}catch(e){log(e,"error")}})(document,storesJsonFile);