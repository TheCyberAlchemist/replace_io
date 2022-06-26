import{r as i,d as s}from"./read_write.f1e05fa8.js";async function l(){const o=await i();console.log(o),c(o)}l();function c(o){let f=o;const t=document.querySelector("#my_body");t.innerHTML="";for(let e=0;e<f.length;e++)t.innerHTML+=`
      <tr>
        <td class="id_td">${f[e].id}</td>
        <td>${f[e].pattern}</td>
        <td>${f[e].replacement}</td>
        <td class="delete_td"><button class="delete_buttons" data-id="${f[e].id}">
          <i class="fas fa-trash-alt"></i>
        </button></td>
      </tr>
    `;const n=document.querySelectorAll(".delete_buttons");for(let e=0;e<n.length;e++)n[e].addEventListener("click",b=>{const a=b.target.dataset.id;console.log(a),s(a).then(r=>{console.log(r),c(r)})})}
