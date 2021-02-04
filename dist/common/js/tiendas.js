/*! stores - v1.2.6 */
import{stores}from"./stores/index.js";(async()=>{await async function(){const e=document.createElement("script");e.type="text/javascript",e.src="https://cdn.jsdelivr.net/gh/ux-alkosto/stores@latest/dist/common/js/jquery.nice-select.js",e.crossorigin="anonymus",document.getElementsByTagName("head")[0].appendChild(e)}(),storesJsonFile&&stores.get(storesJsonFile).then(({ciudades:e})=>{const t=document.querySelector(".cities-menu"),o=document.querySelector(".cities-menu--mobile"),s=document.querySelector("#stores"),n=[];Object.entries(e).forEach(e=>{const s=e[1],r=e[0];t.insertAdjacentHTML("beforeend",`<li role="presentation">\n\t\t\t\t\t\t<a href="#${r}" aria-controls="${r}" role="tab" data-toggle="tab">${s.label}</a>\n\t\t\t\t\t</li>`);let c=new Option(s.label,r);o.append(c),Object.values(s.tiendas).forEach(e=>{n.push(stores.render.store({address:e.direccion,city:s.label,howToGet:e.como_llegar,label:`todas ${r}`,link:e.ir,external:e.externo,name:e.nombre_tienda,schedule:e.horario_apertura}))})}),Promise.all(n).then(async e=>{s.innerHTML="",e.forEach(e=>s.insertAdjacentHTML("beforeend",`${e}`)),document.querySelectorAll(".cities-menu > li > a").forEach(e=>{e.addEventListener("click",t=>{t.preventDefault(),document.querySelector(".cities-menu > li.active").classList.remove("active"),t.currentTarget.closest("li").classList.add("active");const o=e.getAttribute("href").replace("#","");o?(document.querySelectorAll(`.store:not([data-city~=${o}])`).forEach(e=>e.style.display="none"),document.querySelectorAll(`.store[data-city~=${o}]`).forEach(e=>e.style.display="grid")):document.querySelectorAll(".store").forEach(e=>e.style.display="none")})}),$("document").ready(function(){$(".cities-menu--mobile").niceSelect().change(function(){$(this).find("option:selected").each(function(){const e=$(this).attr("value");e?($(".store").not("[data-city~="+e+"]").hide(),$("[data-city~="+e+"]").css({display:"grid"})):$(".store").hide()})})})})})})();