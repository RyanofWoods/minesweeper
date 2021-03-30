(()=>{"use strict";const e=document.getElementById("minesweeper"),t=document.getElementById("table-wrap"),s=document.getElementById("minesweeper-header"),n=e=>{let t="<tr>";for(let s=1;s<=e;s+=1)t+='<td class="unopened"></td>';return t+="</tr>",t};let l=0,d=0,o=0,a=[],r=!1,c=99,i=0,u=0;const m=document.querySelector("table"),f=document.querySelectorAll("#flags_left div"),L=document.querySelectorAll("#timer div"),p=document.getElementById("face"),g=(e,t)=>{const s=t.toString(10).padStart(3,"0");let n=0;for(let t=0;t<3;t+=1)n=13*parseInt(s[t],10),e[t].style.backgroundPositionX=`-${n}px`},v=()=>{g(f,c)},w=()=>{!0===r&&i<999&&(i+=1,g(L,i))},y=e=>{for(let t=0;t<d;t+=1)for(let s=0;s<l;s+=1)!0===a[t][s]&&(e?(m.rows[t].cells[s].classList.add("flagged"),c=0,v()):m.rows[t].cells[s].classList.add("mine"))},I=(e,t)=>{e>=0&&e<d&&t>=0&&t<l&&x(m.rows[e].cells[t])},x=e=>{const t=(e=>{if(e.classList.contains("opened"))return!1;let t=0;const s=e.parentNode.rowIndex,n=e.cellIndex;for(let e=-1;e<2;e+=1)for(let o=-1;o<2;o+=1){const r=s+e,c=n+o;r>=0&&r<=d-1&&c>=0&&c<=l-1&&a[r][c]&&(t+=1)}return t})(e);if(!1!==t)if(0===t){(e=>{e.classList.remove("unopened"),e.classList.add("opened")})(e);const t=e.parentNode.rowIndex,s=e.cellIndex;I(t-1,s-1),I(t-1,s),I(t-1,s+1),I(t,s-1),I(t,s+1),I(t+1,s-1),I(t+1,s),I(t+1,s+1)}else e.classList.add(`mine-neighbour-${t}`),e.classList.remove("unopened")},E=e=>{if(0===u&&(r=!0),!r)return;const t=e.currentTarget;if(0===e.button){if(t.classList.contains("flagged"))return;u+=1,1===u?((e=>{const t=e.parentNode.rowIndex,s=e.cellIndex;for(let e=0;e<d;e+=1){a[e]=[];for(let t=0;t<l;t+=1)a[e].push(!1)}let n=o;do{const e=Math.floor(Math.random()*d),o=Math.floor(Math.random()*l);e===t&&o===s||!1===a[e][o]&&(a[e][o]=!0,n-=1)}while(n>0)})(t),x(t)):(e=>{const t=e.parentNode.rowIndex,s=e.cellIndex;!0===a[t][s]?(e.classList.add("mine"),r=!1,p.classList.remove("facesmile"),p.classList.add("facedead"),y(!1)):x(e)})(t)}else 2===e.button&&(e=>{e.classList.contains("unopened")&&c>=0&&(e.classList.contains("flagged")?(e.classList.toggle("flagged"),c+=1):c>0&&(e.classList.toggle("flagged"),c-=1)),v()})(t);(()=>{let e=!0;for(let t=0;t<d;t+=1){for(let s=0;s<l&&(m.rows[t].cells[s].classList.contains("unopened")&&!1===a[t][s]&&(e=!1),!1!==e);s+=1);if(!1===e)break}e&&(r=!1,p.classList.remove("facesmile"),p.classList.add("facewin"),y(!0))})()};document.addEventListener("DOMContentLoaded",(()=>{setInterval(w,1e3)}));const b=document.querySelector("table"),h=document.getElementById("face"),M=document.getElementById("difficulty");let S,T,B,q;const A=()=>{const m=M.value;var f;"beginner"===m?(T=9,B=9,q=10):"intermediate"===m?(T=16,B=16,q=40):"expert"===m&&(T=30,B=16,q=99),o=(f={xTiles:T,yTiles:B,mines:q}).mines,l=f.xTiles,d=f.yTiles,c=o,r=!1,i=0,u=0,a=[],w(),v(),p.classList.add("facesmile"),p.classList.remove("facewin"),p.classList.remove("facedead"),((l,d)=>{e.innerHTML="";for(let t=1;t<=d;t+=1)e.insertAdjacentHTML("beforeend",n(l));s.style.width=24*l+6+"px",t.style.width=24*l+6+"px"})(T,B),S=document.querySelectorAll("#minesweeper td"),S.forEach((e=>{e.addEventListener("mouseup",(e=>{h.classList.remove("facesuprised"),E(e)})),e.addEventListener("mousedown",(t=>{0===t.button&&(e.classList.add("pressed"),h.classList.add("facesuprised"))})),e.addEventListener("mouseleave",(()=>{e.classList.remove("pressed")}))}))};b.addEventListener("contextmenu",(e=>{e.preventDefault()}),!1),h.addEventListener("click",(e=>{0===e.button&&(h.classList.remove("facepressed"),A())})),h.addEventListener("mousedown",(e=>{0===e.button&&h.classList.add("facepressed")})),h.addEventListener("mouseleave",(e=>{0===e.button&&h.classList.remove("facepressed")})),A()})();
//# sourceMappingURL=main.js.map