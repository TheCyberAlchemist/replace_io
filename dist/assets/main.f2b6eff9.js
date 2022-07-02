import{r as l,d as m}from"./read_write.3a21e387.js";async function i(){const o=await l();console.log(o),f(o)}i();function f(o){let e=o;const n=document.querySelector("#my_body");n.innerHTML="";for(let t=0;t<e.length;t++)n.innerHTML+=`
      <tr>
        <td class="id_td">${e[t].id}</td>
        <td>${e[t].pattern}</td>
        <td>${e[t].replacement}</td>
        <td class="delete_td"><button class="delete_buttons" data-id="${e[t].id}">
          <i class="fas fa-trash-alt"></i>
        </button></td>
      </tr>
    `;const a=document.querySelectorAll(".delete_buttons");for(let t=0;t<a.length;t++)a[t].addEventListener("click",d=>{const r=d.target.dataset.id;console.log(r),m(r).then(s=>{console.log(s),f(s)})})}
