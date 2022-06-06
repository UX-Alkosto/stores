/*! stores - release: 1.6.4 */
const e=1,a=7,t=[{day:-3,daysToSum:a,celebration:"Jueves Santo"},{day:-2,daysToSum:a,celebration:"Viernes Santo"},{day:39,daysToSum:e,celebration:"Ascensión del Señor"},{day:60,daysToSum:e,celebration:"Corphus Christi"},{day:68,daysToSum:e,celebration:"Sagrado Corazón de Jesús"}],o=[{day:"01-01",daysToSum:a,celebration:"Año Nuevo"},{day:"05-01",daysToSum:a,celebration:"Día del Trabajo"},{day:"07-20",daysToSum:a,celebration:"Día de la Independencia"},{day:"08-07",daysToSum:a,celebration:"Batalla de Boyacá"},{day:"12-08",daysToSum:a,celebration:"Día de la Inmaculada Concepción"},{day:"12-25",daysToSum:a,celebration:"Día de Navidad"},{day:"01-06",daysToSum:e,celebration:"Día de los Reyes Magos"},{day:"03-19",daysToSum:e,celebration:"Día de San José"},{day:"06-29",daysToSum:e,celebration:"San Pedro y San Pablo"},{day:"08-15",daysToSum:e,celebration:"La Asunción de la Virgen"},{day:"10-12",daysToSum:e,celebration:"Día de la Raza"},{day:"11-01",daysToSum:e,celebration:"Todos los Santos"},{day:"11-11",daysToSum:e,celebration:"Independencia de Cartagena"}];function n(e){if(e){if((e=e.toString()).match(/^\d*$/g)){if(e<1970||e>99999)throw"The year should be greater to 1969 and smaller to 100000";{const a=o.map((a=>({holiday:r(e.toString().concat("-").concat(a.day),a.daysToSum),celebrationDay:e.toString().concat("-").concat(a.day),celebration:a.celebration}))),n=new Date(function(e){const a=(e=parseInt(e))%19,t=Math.floor(e/100),o=e%100,n=Math.floor(t/4),r=t%4,l=Math.floor((t+8)/25),s=Math.floor((t-l+1)/3),i=(19*a+t-n-s+15)%30,d=Math.floor(o/4),u=(32+2*r+2*d-i-o%4)%7,g=Math.floor((a+11*i+22*u)/451),y=i+u-7*g+114,m=Math.floor(y/31);return c(e,m,1+y%31)}(e)),l=t.map((e=>{const a=new Date(n.getTime()+864e5*e.day);return{holiday:r(c(a.getUTCFullYear(),a.getUTCMonth()+1,a.getUTCDate()),e.daysToSum),celebrationDay:c(a.getUTCFullYear(),a.getUTCMonth()+1,a.getUTCDate()),celebration:e.celebration}}));return a.concat(l).sort(((e,a)=>new Date(e.holiday)-new Date(a.holiday)))}}throw"The year is not a number"}throw"No year provided"}function r(e,a){const t=new Date(e),o=7===a?t:new Date(t.getTime()+(7+a-t.getUTCDay())%7*864e5);return c(o.getUTCFullYear(),o.getUTCMonth()+1,o.getUTCDate())}function l(e){return(e=e.toString())>0&&e<10&&!e.startsWith("0")?"0".concat(e):e}function c(e,a,t){return e.toString().concat("-").concat(l(a)).concat("-").concat(l(t))}const s=(e=[])=>{try{const a=new Date,t=new Date(a),o=`${a.getFullYear()}-${a.getMonth()+1}-${a.getDate()<10?"0"+a.getDate():a.getDate()}`,r=n(a.getFullYear()),l={hour:"numeric",hour12:!0,minute:"numeric"};t.setDate(a.getDate()+1),0===e[a.getDay()].length&&(e[a.getDay()]=["0:00","0:00"]),0===e[t.getDay()].length&&(e[t.getDay()]=["0:00","0:00"]);let c={open:e[a.getDay()][0].split(":"),close:e[a.getDay()][1].split(":")},s={open:e[t.getDay()][0].split(":"),close:e[t.getDay()][1].split(":")},i={open:new Date(a.getFullYear(),a.getMonth(),a.getDate(),Number(c.open[0]),Number(c.open[1])),close:new Date(a.getFullYear(),a.getMonth(),a.getDate(),Number(c.close[0]),Number(c.close[1]))},d={open:new Date(t.getFullYear(),t.getMonth(),t.getDate(),Number(s.open[0]),Number(s.open[1])),close:new Date(t.getFullYear(),t.getMonth(),t.getDate(),Number(s.close[0]),Number(s.close[1]))};for(const t in r){r[t].holiday===o&&(c.open=e[0][0].split(":"),c.close=e[0][1].split(":"),i.open=new Date(a.getFullYear(),a.getMonth(),a.getDate(),Number(c.open[0]),Number(c.open[1])),i.close=new Date(a.getFullYear(),a.getMonth(),a.getDate(),Number(c.close[0]),Number(c.close[1])))}if(a.getTime()>=i.open.getTime()&&a.getTime()<=i.close.getTime()){return{open:!0,message:`Abierto, ${`cierra a las ${i.close.toLocaleString("es-CO",l)}`}`}}return{open:!1,message:`Cerrado, ${`abre a las ${d.open.toLocaleString("es-CO",l)}`}`}}catch(e){console.error(e)}};export{s as isOpen};