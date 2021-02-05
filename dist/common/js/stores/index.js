/*! stores - v1.2.8 */
export const stores={get:async(t="")=>{if(t.length)return await fetch(t,{cache:"force-cache",mode:"cors"}).then(t=>t.json()).then(t=>t)},getStoreFromUrl:(t=window.location)=>{let e,a,n=new URL(t).pathname.split("/");return n.map((t,s)=>{t.length&&"tiendas"===t&&(e=n[s+1],"c"===(a=n[s+2])&&(a=n[s+3]))}),{city:e,store:a}},isOpen:async(t=[])=>{if(t.length){return(await import("./isopen.js")).isOpen(t)}},log:t=>{return console.log("%cStores","background: #2ecc71; border-radius: 0.5em;color: white; font-weight: bold; padding: 2px 0.5em",t)},render:{detail:async({address:t="",howToGet:e="",image:a="",map:n="",name:s="",schedule:i=[],scheduleDetail:r=[]})=>{const l=await stores.isOpen(i);return`\n\t\t\t<div class="bg-tienda"></div>\n\t\t\t<div class="imagen_tienda">\n\t\t\t\t<img src="${a}" alt="${s}">\n\t\t\t</div>\n\t\t\t<div class="detalle_tienda">\n\t\t\t\t<div class="info_detalle">\n\t\t\t\t\t<h2>${s}</h2>\n\t\t\t\t\t<span class="direc">${t}</span>\n\t\t\t\t\t<p class="apertura ${l.open?"verde":"rojo"}">${l.message}</p>\n\t\t\t\t\t<span class="tit_horario">\n\t\t\t\t\t\t<i class="alk-icon-clock"></i>\n\t\t\t\t\t\tHorarios\n\t\t\t\t\t</span>\n\t\t\t\t\t<div class="horarios_detalle">\n\t\t\t\t\t\t${r.map(t=>`<p>${t}</p>`).join("")}\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="links_detalle">\n\t\t\t\t\t\t${e.length?`<span><a href="${e}" target="_blank" rel="noopener" title="Como llegar">\n\t\t\t\t\t\t\t<i class="alk-icon-arrive"></i>\n\t\t\t\t\t\t\tComo llegar\n\t\t\t\t\t\t</a></span>`:""}\n\t\t\t\t\t\t${n.length?`<span><a href="${n}" target="_blank" rel="noopener" title="Ver mapa">\n\t\t\t\t\t\t\t<i class="alk-icon-mapa"></i>\n\t\t\t\t\t\t\tVer mapa\n\t\t\t\t\t\t</a></span>`:""}\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>`},store:async({address:t="",city:e="",howToGet:a="",label:n="",link:s="",external:i=!1,name:r="",schedule:l=[]})=>{const o=await stores.isOpen(l);return`<div class="store" data-city="${n}">\n\t\t\t\t<h2 class="ciudad_mun">${e}</h2>\n\t\t\t\t<div class="recuadroUno">\n\t\t\t\t\t<h3 class="nombre">\n\t\t\t\t\t\t<i class="alk-icon-nuestras-tiendas"></i>\n\t\t\t\t\t\t${r}\n\t\t\t\t\t</h3>\n\t\t\t\t\t<div class="ir">\n\t\t\t\t\t\t<a href="${s.length?`${s}`:"#"}" target="${i?"_blank":"_self"}" rel="noopener" title="${r} - ${e}">\n\t\t\t\t\t\t\t<i class="alk-icon-arrow-right-square"></i>\n\t\t\t\t\t\t</a>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<p class="direccionTienda">${t}</p>\n\t\t\t\t<p class="apertura ${o.open?"verde":"rojo"}">${o.message}</p>\n\t\t\t\t<div class="indicaciones">\n\t\t\t\t\t${s.length?`<div class="ver_horario">\n\t\t\t\t\t\t\t<i class="alk-icon-mapa"></i>\n\t\t\t\t\t\t\t<a href="${s}" target="${i?"_blank":"_self"}" rel="noopener" title="Ver mapa y horarios">Ver mapa y horarios</a>\n\t\t\t\t\t\t</div>`:""}\n\t\t\t\t\t${s.length?`\x3c!--<div class="comoLlegar">\n\t\t\t\t\t\t\t<i class="alk-icon-mapa"></i>\n\t\t\t\t\t\t\t<a href="${a}" target="_blank" rel="noopener" title="Cómo llegar">Cómo llegar</a>\n\t\t\t\t\t\t</div>--\x3e`:""}\n\t\t\t\t</div>\n\t\t\t\t<a class="click" href="${s.length?`${s}`:"#"}" target="${i?"_blank":"_self"}" rel="noopener" title="${r} - ${e}"></a>\n\t\t\t</div>`}}};