/*! stores - v1.0.0 - 2021-01-21 */
import{stores}from"./stores/index.js";window.storesJsonFile&&stores.get(storesJsonFile).then(({ciudades:e})=>{const t=document.querySelector(".cities-menu"),o=document.querySelector(".cities-menu--mobile"),r=document.querySelector("#stores"),s=[];Object.entries(e).forEach(e=>{const r=e[1],c=e[0];t.insertAdjacentHTML("beforeend",`<li role="presentation">\n\t\t\t\t\t\t<a href="#${c}" aria-controls="${c}" role="tab" data-toggle="tab">${r.label}</a>\n\t\t\t\t\t</li>`),o.insertAdjacentHTML("beforeend",`<option value="${c}">${r.label}</option>`),Object.values(r.tiendas).forEach(e=>{s.push(stores.render.store({address:e.direccion,city:r.label,howToGet:e.como_llegar,label:`todas ${c}`,link:e.ir,name:e.nombre_tienda,schedule:e.horario_apertura}))})}),Promise.all(s).then(e=>{r.innerHTML="",e.forEach(e=>r.insertAdjacentHTML("beforeend",`${e}`)),document.querySelectorAll(".cities-menu > li > a").forEach(e=>{e.addEventListener("click",t=>{t.preventDefault(),document.querySelector(".cities-menu > li.active").classList.remove("active"),t.currentTarget.closest("li").classList.add("active");const o=e.getAttribute("href").replace("#","");o?(document.querySelectorAll(`.store:not([data-city~=${o}])`).forEach(e=>e.style.display="none"),document.querySelectorAll(`.store[data-city~=${o}]`).forEach(e=>e.style.display="grid")):document.querySelectorAll(".store").forEach(e=>e.style.display="none")})}),$("select").niceSelect().change(function(){$(this).find("option:selected").each(function(){const e=$(this).attr("value");e?($(".store").not("[data-city~="+e+"]").hide(),$("[data-city~="+e+"]").css({display:"grid"})):$(".store").hide()})})})});