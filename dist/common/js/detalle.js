/*! stores - release: 1.5.3 */
import{S as e,l as r,a as t,V as a}from"./index-b52769de.js";(async(n,o)=>{try{const i=new e(o),s=e.getStoreFromUrl(),c=n.querySelector("#stores"),l=n.querySelector(".contenedor_tienda_detalle"),d=n.querySelectorAll(".nombre-ciudad"),m=n.querySelector(".tit_otras");r(s),await i.stores.then((async({ciudades:e})=>{const r=e[s.city].tiendas[s.store];c.innerHTML="",d.forEach((r=>r.innerHTML=e[s.city].label));const n=new t({address:r.direccion,external:r.externo,howToGet:r.como_llegar,image:r.imagen,link:r.ir,map:r.ver_mapa,name:r.nombre_tienda,schedule:r.horario_apertura,scheduleDetail:r.horarios});a(await n.render("detail"),l),Object.keys(e[s.city].tiendas).length>1?Object.entries(e[s.city].tiendas).map((async([r,n]=tiendas)=>{if(r==s.store)return;const o=new t({address:n.direccion,city:e[s.city].label,howToGet:n.como_llegar,label:r,link:n.ir,external:n.externo,name:n.nombre_tienda,schedule:n.horario_apertura});a(await o.render(),c)})):m.remove()}))}catch(e){r(e,"error")}})(document,storesJsonFile);
