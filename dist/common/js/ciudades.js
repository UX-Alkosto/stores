/*! stores - v1.2.8 */
import{stores}from"./stores/index.js";(()=>{if(storesJsonFile){const e=stores.getStoreFromUrl();stores.log(e),stores.get(storesJsonFile).then(({ciudades:r})=>{const o=r[e.city],t=r[e.city][0],s=document.querySelector("#stores"),n=[];Object.keys(r[e.city].tiendas).length&&(document.querySelector(".nombre-ciudad").innerHTML=o.label,Object.values(o.tiendas).forEach(e=>{n.push(stores.render.store({address:e.direccion,city:o.label,howToGet:e.como_llegar,label:t,link:e.ir,name:e.nombre_tienda,schedule:e.horario_apertura}))}),Promise.all(n).then(e=>{s.innerHTML="",e.forEach(e=>s.insertAdjacentHTML("beforeend",`${e}`))}))})}})();