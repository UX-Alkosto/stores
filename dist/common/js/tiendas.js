/*! stores - release: 1.4.3 */
import{S as e,T as t,a as r,V as a,l as n}from"./index-dfd3dfa7.js";(async(s,i,o)=>{try{const n=new e(o),c=s.querySelector(".cities-menu"),l=s.querySelector(".cities-menu--mobile"),d=s.querySelector("#stores"),u=/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);u&&async function(){const e=s.createElement("script");e.type="text/javascript",e.src="https://cdn.jsdelivr.net/gh/ux-alkosto/stores/dist/common/js/jquery.nice-select.js",e.crossorigin="anonymus",s.getElementsByTagName("head")[0].appendChild(e)}(),await n.stores.then((async({ciudades:e})=>{d.innerHTML="";const n=[],o=[];Object.entries(e).map((([a,s]=e)=>{o.push(function(e="",r=""){return t`<li role="presentation"><a href="#${e}" aria-controls="${e}" role="tab" data-toggle="tab">${r}</a></li>`}(a,s.label));const i=new Option(s.label,a);l.append(i),Object.values(s.tiendas).map((async e=>{const t=new r({address:e.direccion,city:s.label,howToGet:e.como_llegar,label:a,link:e.ir,external:e.externo,name:e.nombre_tienda,schedule:e.horario_apertura});n.push(t.render())}))})),a(o,c),Promise.all(n).then((e=>a(e,d))),c.querySelectorAll("li > a").forEach((e=>{e.addEventListener("click",(t=>{t.preventDefault(),s.querySelector(".cities-menu > li.active").classList.remove("active"),t.currentTarget.closest("li").classList.add("active");const r=e.getAttribute("href").replace("#","");r?(s.querySelectorAll(`.store:not([data-city~=${r}])`).forEach((e=>e.style.display="none")),s.querySelectorAll(`.store[data-city~=${r}]`).forEach((e=>e.style.display="grid"))):s.querySelectorAll(".store").forEach((e=>e.style.display="none"))}))})),u&&i("document").ready((function(){i(l).niceSelect().change((function(){i(this).find("option:selected").each((function(){const e=i(this).attr("value");e?(i(".store").not("[data-city~="+e+"]").hide(),i("[data-city~="+e+"]").css({display:"grid"})):i(".store").hide()}))}))}))}))}catch(e){n(e,"error")}})(document,window.jQuery,storesJsonFile);
