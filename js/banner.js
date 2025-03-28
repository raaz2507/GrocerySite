imgArre=['./../img/banerImg1.webp','./../img/banerImg2.webp','./../img/banerImg3.webp','./../img/banerImg4.webp',];
let index=0;
function changeBanner(banner){
    banner.src= imgArre[index];
    // banner.style.backgroundImage= `url('${imgArre[index]}')`;
    index= ( ++index ) % imgArre.length;
}