import{a as R,S as B,i as n}from"./assets/vendor-DvfmeZXB.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function a(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function o(e){if(e.ep)return;e.ep=!0;const t=a(e);fetch(e.href,t)}})();const $="https://pixabay.com/api/",D="53335895-4d104a908de65f21952c0d536";async function m(r,s=1){const a={key:D,q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,page:s,per_page:15};try{return(await R.get($,{params:a})).data}catch(o){throw o}}let d;const h=document.querySelector(".gallery"),y=document.querySelector(".loader"),g=document.querySelector(".load-more");function L(r){const s=r.map(({webformatURL:a,largeImageURL:o,tags:e,likes:t,views:i,comments:v,downloads:S})=>`
        <li class="gallery-item">
          <a href="${o}">
            <img src="${a}" alt="${e}" />
          </a>
          <ul class="stats">
  <li class="stats-item">
    <span class="stats-label">Likes</span>
    <span class="stats-value">${t}</span>
  </li>
  <li class="stats-item">
    <span class="stats-label">Views</span>
    <span class="stats-value">${i}</span>
  </li>
  <li class="stats-item">
    <span class="stats-label">Comments</span>
    <span class="stats-value">${v}</span>
  </li>
  <li class="stats-item">
    <span class="stats-label">Downloads</span>
    <span class="stats-value">${S}</span>
  </li>
</ul>
        </li>
    `).join("");h.insertAdjacentHTML("beforeend",s),d?d.refresh():d=new B(".gallery a",{captions:!0,captionsData:"alt",captionDelay:250,captionPosition:"bottom"})}function E(){h.innerHTML=""}function b(){y.classList.remove("hidden")}function w(){y.classList.add("hidden")}function p(){g.classList.remove("hidden")}function q(){g.classList.add("hidden")}const u=document.querySelector(".form"),M=document.querySelector(".load-more");let c="",l=1,f=0;u.addEventListener("submit",async r=>{if(r.preventDefault(),c=(new FormData(u).get("search-text")||"").trim(),!c){n.warning({message:"Please enter a search query",position:"topRight"});return}b(),E(),q(),l=1;try{const a=await m(c,l),{hits:o=[],totalHits:e=0}=a;if(f=e,o.length===0){n.error({message:"No images found. Try another query.",position:"topRight"});return}L(o),f>15&&p()}catch{n.error({message:"Request failed",position:"topRight"})}finally{w(),u.reset()}});M.addEventListener("click",async()=>{l+=1,q(),b();try{const r=await m(c,l),{hits:s=[]}=r;L(s);const{height:a}=document.querySelector(".gallery").firstElementChild.getBoundingClientRect();window.scrollBy({top:a*2,behavior:"smooth"}),l*15<f?p():n.info({message:"We're sorry, but you've reached the end of search results",position:"topRight"})}catch{n.error({message:"Request failed",position:"topRight"}),p()}finally{w()}});
//# sourceMappingURL=index.js.map
