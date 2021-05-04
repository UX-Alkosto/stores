/*! stores - v1.3.9 */
function log(t,e=""){let s="";switch(e){case"error":s="#dd171b";break;case"info":s="#2450f9";break;case"warning":s="#e4a003";break;default:s="#2ecc71"}const a=`background: ${s}; border-radius: 0.5em;color: white; font-weight: bold; padding: 2px 0.5em`;return console.log("%cStores",a,t)}class Stores{constructor(t){this.json=t}get stores(){return this.getStores()}async getStores(){if(this.json.length)return await fetch(this.json,{cache:"force-cache",mode:"cors"}).then(t=>{if(t.ok)return t.json();throw`Unable to load Json file ${this.json}`}).then(t=>t);throw`Unable to load Json file ${this.json}`}static getStoreFromUrl(){let t,e,s=new URL(window.location).pathname.split("/");return s.map((a,n)=>{if(a.length)try{"tiendas"===a?(t=s[n+1],"c"===(e=s[n+2])&&(e=s[n+3])):"nuestras-tiendas"===a&&(t=s[n+1],e=s[n+2])}catch(t){log(t,"error")}}),{city:t,store:e}}}class Store{constructor({address:t="",city:e="",howToGet:s="",image:a="",label:n="",link:i="",external:r=!1,map:l="",name:o="",order:h=0,schedule:c=[],scheduleDetail:d=[]}){this.address=t,this.city=e,this.external=r,this.howToGet=s,this.image=a,this.label=`todas ${n}`,this.link=i,this.map=l,this.name=o,this.order=h,this.schedule=c,this.scheduleDetail=d}get isOpen(){return this._isOpen()}async render(t="store"){const e=await this.isOpen;switch(t){case"detail":return`\n\t\t\t<div class="bg-tienda"></div>\n\t\t\t<div class="imagen_tienda">\n\t\t\t\t<img src="${this.image}" alt="${this.name}">\n\t\t\t</div>\n\t\t\t<div class="detalle_tienda">\n\t\t\t\t<div class="info_detalle">\n\t\t\t\t\t<h2>${this.name}</h2>\n\t\t\t\t\t<span class="direc">${this.address}</span>\n\t\t\t\t\t<p class="apertura ${e.open?"verde":"rojo"}">${e.message}</p>\n\t\t\t\t\t<span class="tit_horario">\n\t\t\t\t\t\t<i class="alk-icon-clock"></i>\n\t\t\t\t\t\tHorarios\n\t\t\t\t\t</span>\n\t\t\t\t\t<div class="horarios_detalle">\n\t\t\t\t\t\t${this.scheduleDetail.map(t=>`<p>${t}</p>`).join("")}\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="links_detalle">\n\t\t\t\t\t\t${this.howToGet.length?`<span><a href="${this.howToGet}" target="_blank" rel="noopener" title="Como llegar">\n\t\t\t\t\t\t\t<i class="alk-icon-arrive"></i>\n\t\t\t\t\t\t\tComo llegar\n\t\t\t\t\t\t</a></span>`:""}\n\t\t\t\t\t\t${this.map.length?`<span><a href="${this.map}" target="_blank" rel="noopener" title="Ver mapa">\n\t\t\t\t\t\t\t<i class="alk-icon-mapa"></i>\n\t\t\t\t\t\t\tVer mapa\n\t\t\t\t\t\t</a></span>`:""}\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>`;default:return`<div style="order: ${this.order}" class="store" data-city="${this.label}">\n\t\t\t\t<h2 class="ciudad_mun">${this.city}</h2>\n\t\t\t\t<div class="recuadroUno">\n\t\t\t\t\t<h3 class="nombre">\n\t\t\t\t\t\t<i class="alk-icon-nuestras-tiendas"></i>\n\t\t\t\t\t\t${this.name}\n\t\t\t\t\t</h3>\n\t\t\t\t\t<div class="ir">\n\t\t\t\t\t\t<a href="${this.link.length?`${this.link}`:"#"}" target="${this.external?"_blank":"_self"}" rel="noopener" title="${this.name} - ${this.city}">\n\t\t\t\t\t\t\t<i class="alk-icon-arrow-right-square"></i>\n\t\t\t\t\t\t</a>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<p class="direccionTienda">${this.address}</p>\n\t\t\t\t<p class="apertura ${e.open?"verde":"rojo"}">${e.message}</p>\n\t\t\t\t<div class="indicaciones">\n\t\t\t\t\t${this.link.length?`<div class="ver_horario">\n\t\t\t\t\t\t\t<i class="alk-icon-mapa"></i>\n\t\t\t\t\t\t\t<a href="${this.link}" target="${this.external?"_blank":"_self"}" rel="noopener" title="Ver mapa y horarios">Ver mapa y horarios</a>\n\t\t\t\t\t\t</div>`:""}\n\t\t\t\t\t${this.link.length?`\x3c!--<div class="comoLlegar">\n\t\t\t\t\t\t\t<i class="alk-icon-mapa"></i>\n\t\t\t\t\t\t\t<a href="${this.howToGet}" target="_blank" rel="noopener" title="Cómo llegar">Cómo llegar</a>\n\t\t\t\t\t\t</div>--\x3e`:""}\n\t\t\t\t</div>\n\t\t\t\t<a class="click" href="${this.link.length?`${this.link}`:"#"}" target="${this.external?"_blank":"_self"}" rel="noopener" title="${this.name} - ${this.city}"></a>\n\t\t\t</div>`}}async _isOpen(){return(await import("./isopen.js")).isOpen(this.schedule)}}export{Stores,Store,log};