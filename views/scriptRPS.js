let sekali = true;

class Player{
    constructor(batu, gunting, kertas){
        this.batu = batu;
        this.gunting = gunting;
        this.kertas = kertas;
    }

    control(){
        let page1 = document.querySelector('.fa-solid');
        page1.addEventListener('click', function(){
            window.location.href = "index.html";
        })




        let batuPlayer = document.querySelector('.batu');
        batuPlayer.addEventListener('click', function(){
            batuPlayer.classList.add("bacgroundSign");
            check('batu');
        })

        let kertasPlayer = document.querySelector('.kertas');
        kertasPlayer.addEventListener('click', function(){
            kertasPlayer.classList.add("bacgroundSign");
            check('kertas');
        })

        let guntingPlayer = document.querySelector('.gunting');
        guntingPlayer.addEventListener('click', function(){
            guntingPlayer.classList.add("bacgroundSign");
            check('gunting');
        })

        let reload = document.querySelector('.ulang');
        reload.addEventListener('click', function(){
            location.reload();
        })
    }

    
}

let call = new Player('batu', 'gunting', 'kertas');
call.control();




function check(data){
    if(sekali){
        sekali = false;
        let random = Math.floor(Math.random() * 3);

        let batuCom = document.getElementById('batuCom');
        let kertasCom = document.getElementById('kertasCom');
        let guntingCom = document.getElementById('guntingCom');
        let choosen = '';

        if(random == 0){
        batuCom.classList.add("bacgroundSign");
        choosen = 'batu';
        }else if(random == 1){
            kertasCom.classList.add("bacgroundSign");
            choosen = 'kertas';
        }else{
            guntingCom.classList.add("bacgroundSign");
            choosen = 'gunting';
        }

        // console.log(choosen)
        // console.log(data)
        let box = document.getElementById('box')
        let keterangan = document.getElementById('keterangan');


        if(data == 'batu'){
            if(choosen == 'batu'){
                console.log('draw');
                box.classList.add('win');
                keterangan.innerHTML = 'DRAW';
                keterangan.classList.toggle('keterangan2');
            }else if(choosen == 'kertas'){
                console.log('kalah');
                box.classList.add('win');
                keterangan.innerHTML = 'COM <br> WIN';
                keterangan.classList.toggle('keterangan2');
            }else{
                console.log('menang');
                box.classList.add('win');
                keterangan.innerHTML = 'PLAYER 1 WIN';
                keterangan.classList.toggle('keterangan2');
            }
        }else if(data == 'kertas'){
            if(choosen == 'batu'){
                console.log('menang');
                box.classList.add('win');
                keterangan.innerHTML = 'PLAYER 1 WIN';
                keterangan.classList.toggle('keterangan2');
            }else if(choosen == 'kertas'){
                console.log('draw');
                box.classList.add('win');
                keterangan.innerHTML = 'DRAW';
                keterangan.classList.toggle('keterangan2');
            }else{
                console.log('kalah');
                box.classList.add('win');
                keterangan.innerHTML = 'COM <br> WIN';
                keterangan.classList.toggle('keterangan2');
            }
        }else{
            if(choosen == 'batu'){
                console.log('kalah');
                box.classList.add('win');
                keterangan.innerHTML = 'COM <br> WIN';
                keterangan.classList.toggle('keterangan2');
            }else if(choosen == 'kertas'){
                console.log('menang');
                box.classList.add('win');
                keterangan.innerHTML = 'PLAYER 1 WIN';
                keterangan.classList.toggle('keterangan2');
            }else{
                console.log('draw');
                box.classList.add('win');
                keterangan.innerHTML = 'DRAW';
                keterangan.classList.toggle('keterangan2');
            }
        }
    }else{
        alert("after 1 round, reload the game")
    }
}
