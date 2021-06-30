'use strict'
$( document ).ready(function() {
let polja;
let matrix = new Array(18*14).fill(0);
let netacneZastave = [];
let colors = ["blue","green","red","purple","#8f0e31","#0e966b","black","silver"];
let nizBrojeva = Array.from({length: 18*14}, (e, i)=> i);
function createMastrix(){
    let pocetak = new Date;
    for (let i = 0; i < (18*14); i++) {
       $("#main").append("<div class='polje'></div>");
    }
    polja = $('.polje');
    for(let i = 0; i < 40; i++) {
        let rnd = Math.floor(Math.random() * nizBrojeva.length);
            let pozicija = nizBrojeva[rnd];
            nizBrojeva.splice(rnd,1);
            matrix[pozicija]=-1;
            $(polja[pozicija]).css('background','yellow');
            let moguciOkolisi = izbaciNepostojece(pozicija);
            for(let j=0;j<moguciOkolisi.length;j++){
               if(matrix[moguciOkolisi[j]]!=-1){
                   matrix[moguciOkolisi[j]]++;
               }
            }
    }
    let kraj = new Date;
    console.log(kraj.getTime()-pocetak.getTime());
    console.log(matrix);
}
createMastrix();
$(polja).on('click',klikno);
function klikno() {
    let r_broj = $(this).index();
    $(polja[r_broj]).css('background','white');
    if(matrix[r_broj]==-1){
        $(polja[r_broj]).append("<div class='mina'></div>");
        $(polja[r_broj]).off('click').off('contextmenu');
        matrix[r_broj]=14;
        setTimeout(prikaziMine, 200);
        ispisX();
        ofujGa();
    }else if(matrix[r_broj]==0){
        proveriNulu(r_broj);
    }else{
        $(polja[r_broj]).text(matrix[r_broj]).css("color",(colors[matrix[r_broj]-1])).off('click').off('contextmenu');
    }
}
$(polja).on("contextmenu",function(){
    let r_broj = $(this).index();
    
    if($(polja[r_broj]).html() == ""){
        $(polja[r_broj]).append("<img src='zastava.png'></img>").off('click');
        if(matrix[r_broj]!=-1)
        netacneZastave.push(r_broj);
    }else{
        $(polja[r_broj]).html("").on('click',klikno);
        if(netacneZastave.indexOf(r_broj)!=-1){
            netacneZastave.splice(netacneZastave.indexOf(r_broj),1);
        }
    }
})
function proveriNulu(r_broj) {
    if(matrix[r_broj]==0){
        $(polja[r_broj]).css('background','white').off('click').off('contextmenu');
        matrix[r_broj]=13;
        let okolisi = izbaciNepostojece(r_broj);
        for (let j = 0; j < okolisi.length; j++) {
            proveriNulu(okolisi[j]);
            
        }
    }else if(matrix[r_broj]!=13){
        $(polja[r_broj]).text(matrix[r_broj]).css("color",(colors[matrix[r_broj]-1])).off('click').off('contextmenu').css('background','white');
    }
}
function izbaciNepostojece(poz) {
    let ImaGore;
    let ImaDole;
    let ImaLevo;
    let ImaDesno;
    let h = Math.floor(poz/18);
    let w = poz%18;
    ImaGore = ((h-1)>=0)?true:false;
    ImaDole = ((h+1)<=13)?true:false;
    ImaLevo = ((w-1)>=0)?true:false;
    ImaDesno = ((w+1)<=17)?true:false;
 
    let moguciOkolisi=[];
    ImaGore?moguciOkolisi.push(poz-18):null;
    ImaDole?moguciOkolisi.push(poz+18):null;
    ImaLevo?moguciOkolisi.push(poz-1):null;
    ImaDesno?moguciOkolisi.push(poz+1):null;
    (ImaGore&ImaDesno)?moguciOkolisi.push(poz-17):null;
    (ImaGore&ImaLevo)?moguciOkolisi.push(poz-19):null;
    (ImaDole&ImaLevo)?moguciOkolisi.push(poz+17):null;
    (ImaDole&ImaDesno)?moguciOkolisi.push(poz+19):null;
    return moguciOkolisi;
}
function prikaziMine() {
    let pozicijaNule = matrix.indexOf(-1);
    matrix[pozicijaNule]=14
    if(pozicijaNule!=-1){     
        console.log($(polja[pozicijaNule]).html());
        if($(polja[pozicijaNule]).html()!='<img src="zastava.png">'){
        $(polja[pozicijaNule]).append("<div class='mina'></div>");
        }
        setTimeout(prikaziMine, 200);
}
}
function ofujGa() {
    for (let i = 0; i < matrix.length; i++) {
        $(polja[i]).off('click').off('contextmenu')
        
    }
}
function ispisX() {
    for (let i = 0; i < netacneZastave.length; i++) {
        $(polja[netacneZastave[i]]).html('<img src="naopaka.png">');
        
    }
}
});
