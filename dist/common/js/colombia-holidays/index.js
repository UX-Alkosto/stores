/*! stores - v1.3.6 */
import{EASTER_WEEK_HOLIDAYS,HOLIDAYS}from"./holidays.js";const MILLISECONDS_DAY=864e5;function getColombiaHolidaysByYear(t){if(t){if((t=t.toString()).match(/^\d*$/g)){if(t<1970||t>99999)throw"The year should be greater to 1969 and smaller to 100000";{const e=HOLIDAYS.map(e=>({holiday:nextDay(t.toString().concat("-").concat(e.day),e.daysToSum),celebrationDay:t.toString().concat("-").concat(e.day),celebration:e.celebration})),o=new Date(butcherAlgorithm(t)),a=EASTER_WEEK_HOLIDAYS.map(t=>{const e=new Date(o.getTime()+t.day*MILLISECONDS_DAY);return{holiday:nextDay(getFormattedDate(e.getUTCFullYear(),e.getUTCMonth()+1,e.getUTCDate()),t.daysToSum),celebrationDay:getFormattedDate(e.getUTCFullYear(),e.getUTCMonth()+1,e.getUTCDate()),celebration:t.celebration}});return e.concat(a).sort((t,e)=>new Date(t.holiday)-new Date(e.holiday))}}throw"The year is not a number"}throw"No year provided"}function butcherAlgorithm(t){const e=(t=parseInt(t))%19,o=Math.floor(t/100),a=t%100,r=Math.floor(o/4),n=o%4,c=Math.floor((o+8)/25),i=(19*e+o-r-Math.floor((o-c+1)/3)+15)%30,l=(32+2*n+2*Math.floor(a/4)-i-a%4)%7,D=i+l-7*Math.floor((e+11*i+22*l)/451)+114;return getFormattedDate(t,Math.floor(D/31),1+D%31)}function nextDay(t,e){const o=new Date(t),a=7===e?o:new Date(o.getTime()+(7+e-o.getUTCDay())%7*MILLISECONDS_DAY);return getFormattedDate(a.getUTCFullYear(),a.getUTCMonth()+1,a.getUTCDate())}function addZero(t){return(t=t.toString())>0&&t<10&&!t.startsWith("0")?"0".concat(t):t}function getFormattedDate(t,e,o){return t.toString().concat("-").concat(addZero(e)).concat("-").concat(addZero(o))}export{getColombiaHolidaysByYear};