'use strict'
$( document ).ready(function() {
let polja;
let matrix;
let netacneZastave = [];
function createMastrix(){
    matrix = [];
    for (let i = 0; i < (18*14); i++) {
        matrix[i]=0;
       $("#main").append("<div class='polje'></div>");
    }
    polja = $('.polje');
    for(let i = 0; i < 40; i++) {
        let pozicija = Math.floor(Math.random() * (18*14));
        let dosadasnje = [];
        if(dosadasnje.indexOf(pozicija) == -1){
            dosadasnje.push(pozicija);
            matrix[pozicija]=-1;
        }else{
            i--;
        } 
    }
    for (let i = 0; i <= (18*14); i++) {
        if(matrix[i]==0){
            let moguciOkolisi = izbaciNepostojece(i);
            let br=0;
            for(let j=0;j<moguciOkolisi.length;j++){
                if(matrix[moguciOkolisi[j]]==-1){
                    br++;
                }
            }
            if(br!=0)
            matrix[i]=br;
        }
    }
    console.log(matrix);
}
createMastrix();
$(polja).on('click',klikno);
function klikno() {
    let r_broj = $(this).index();
    $(polja[r_broj]).css('background','white');
    let boja;
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
        let boja = pronadjiBoju(matrix[r_broj]);
        $(polja[r_broj]).text(matrix[r_broj]).css("color",boja).off('click').off('contextmenu');
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
        let boja = pronadjiBoju(matrix[r_broj]);
        $(polja[r_broj]).text(matrix[r_broj]).css("color",boja).off('click').off('contextmenu').css('background','white');
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
    let moguciOkolisi = [(poz-19),(poz-18),(poz-17),(poz-1),(poz+1),(poz+17),(poz+18),(poz+19)];
           if(ImaGore==false){
                moguciOkolisi.splice(moguciOkolisi.indexOf(poz-19),1);
                moguciOkolisi.splice(moguciOkolisi.indexOf(poz-18),1);
                moguciOkolisi.splice(moguciOkolisi.indexOf(poz-17),1);
            }
            if(ImaLevo==false){
                if(moguciOkolisi.indexOf(poz-19) !=-1){
                    moguciOkolisi.splice(moguciOkolisi.indexOf(poz-19),1);
                }
                moguciOkolisi.splice(moguciOkolisi.indexOf(poz-1),1);
                moguciOkolisi.splice(moguciOkolisi.indexOf(poz+17),1);
            }
            if(ImaDole==false){
                if(moguciOkolisi.indexOf(poz+17) !=-1){
                    moguciOkolisi.splice(moguciOkolisi.indexOf(poz+17),1);
                }
                moguciOkolisi.splice(moguciOkolisi.indexOf(poz+18),1);
                moguciOkolisi.splice(moguciOkolisi.indexOf(poz+19),1);
            }
            if(ImaDesno==false){
                if(moguciOkolisi.indexOf(poz+19) !=-1){
                    moguciOkolisi.splice(moguciOkolisi.indexOf(poz+19),1);
                }
                if(moguciOkolisi.indexOf(poz-17) !=-1){
                    moguciOkolisi.splice(moguciOkolisi.indexOf(poz-17),1);
                }
                moguciOkolisi.splice(moguciOkolisi.indexOf(poz+1),1);
            }
    return moguciOkolisi;
}
function pronadjiBoju(vrednost) {
    let boja;
    switch(vrednost){
        case 1:
            boja = "blue";
            break;
        case 2:
            boja= "green";
            break;
        case 3:
            boja = "red";
            break;
        case 4:
            boja="purple";
            break;
        case 5:
            boja="#8f0e31";
            break;
        case 6:
            boja="#0e966b";
            break;
        case 7:
            boja="black";
            break;
        case 8:
            boja= "silver";
            break;
    }
    return boja;
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