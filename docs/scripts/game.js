import{getIndexFromAi as L}from"./ai.js";const A=document.querySelector("#tic-tac-toe-container"),E=[...A.querySelectorAll("button")],e=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]],p=t=>{let i=[],r;return e.forEach(e=>{e.every(e=>"x"===t[e])&&(i.push(...e),r="x"),e.every(e=>"o"===t[e])&&(i.push(...e),r="o")}),r?{idxs:i,letter:r}:null};var t=({isArtificialOponent:e,isArtificialX:t,onWin:i,onCatsGame:r,difficultyLevel:o})=>{E.forEach(e=>{e.innerHTML="",e.removeAttribute("letter"),e.classList.remove("win")});{var{isArtificialOponent:a,isArtificialX:e,onWin:c,onCatsGame:l,difficultyLevel:s}={isArtificialOponent:e,isArtificialX:t,onWin:i,onCatsGame:r,difficultyLevel:o};let n="x";const d=["","","","","","","","",""],f=()=>E.forEach((e,t)=>{e.innerHTML=d[t],e.setAttribute("letter",d[t])}),v=(e,t,i)=>{if(void 0===e)throw new Error("No index provided");if(""!==d[e])throw new Error("Space already marked");d[e]=n,f();var e=p(d),r=!e&&d.every(Boolean);if(e||r)return i(e,r);n="x"===n?"o":"x",t()},u=e=>{"BUTTON"===e.target.tagName&&(e=E.indexOf(e.target),v(e,()=>{a&&x()},m))},m=(e,t)=>{A.removeEventListener("click",u),e&&(e.idxs.forEach(e=>E[e].classList.add("win")),setTimeout(()=>c(e.letter),750)),t&&setTimeout(()=>l(),750)},x=()=>{A.removeEventListener("click",u);const e=L[s](d);setTimeout(()=>{v(e,()=>A.addEventListener("click",u),m)},1e3)};return e?x():A.addEventListener("click",u),{endGame:m}}};export{t as resetGame};