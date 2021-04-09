/*! stores - v1.3.7 */
import{getColombiaHolidaysByYear}from"../colombia-holidays/index.js";const isOpen=(e=[])=>{try{const t=new Date,o=new Date(t),a=`${t.getFullYear()}-${t.getMonth()+1}-${t.getDate()<10?"0"+t.getDate():t.getDate()}`,l=getColombiaHolidaysByYear(t.getFullYear()),n={hour:"numeric",hour12:!0,minute:"numeric"};o.setDate(t.getDate()+1),0===e[t.getDay()].length&&(e[t.getDay()]=["0:00","0:00"]),0===e[o.getDay()].length&&(e[o.getDay()]=["0:00","0:00"]);let r={open:e[t.getDay()][0].split(":"),close:e[t.getDay()][1].split(":")},g={open:e[o.getDay()][0].split(":"),close:e[o.getDay()][1].split(":")},s={open:new Date(t.getFullYear(),t.getMonth(),t.getDate(),Number(r.open[0]),Number(r.open[1])),close:new Date(t.getFullYear(),t.getMonth(),t.getDate(),Number(r.close[0]),Number(r.close[1]))},i={open:new Date(o.getFullYear(),o.getMonth(),o.getDate(),Number(g.open[0]),Number(g.open[1])),close:new Date(o.getFullYear(),o.getMonth(),o.getDate(),Number(g.close[0]),Number(g.close[1]))};for(const o in l){l[o].holiday===a&&(r.open=e[0][0].split(":"),r.close=e[0][1].split(":"),s.open=new Date(t.getFullYear(),t.getMonth(),t.getDate(),Number(r.open[0]),Number(r.open[1])),s.close=new Date(t.getFullYear(),t.getMonth(),t.getDate(),Number(r.close[0]),Number(r.close[1])))}if(t.getTime()>=s.open.getTime()&&t.getTime()<=s.close.getTime()){return{open:!0,message:`Abierto, ${`cierra a las ${s.close.toLocaleString("es-CO",n)}`}`}}return{open:!1,message:`Cerrado, ${`abre a las ${i.open.toLocaleString("es-CO",n)}`}`}}catch(e){console.error(e)}};export{isOpen};