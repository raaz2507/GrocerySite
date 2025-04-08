imgArre=['./../img/banerImg1.jpg','./../img/banerImg2.jpg','./../img/banerImg3.jpg','./../img/banerImg4.jpg',];
let index=0;
function changeBanner(banner){
    banner.src= imgArre[index];
    // banner.style.backgroundImage= `url('${imgArre[index]}')`;
    index= ( ++index ) % imgArre.length;
}