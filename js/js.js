/*
* @Author: Administrator
* @Date:   2017-05-16 09:28:37
* @Last Modified by:   Administrator
* @Last Modified time: 2017-05-17 10:47:26
*/

'use strict';

window.onload=function(){
	let audio=document.querySelector('audio');
	let plays=document.querySelector('.play');
	let song  = document.querySelector('.song');
    let author = document.querySelector('.singer');
    let lyrics = document.querySelector('.lyrics');
    let img = document.querySelector('img');
    let info = document.querySelector('.info');
    let cTime = document.querySelector('.cTime');
    let dTime = document.querySelector('.dTime');
    let index =  0;
    let box=document.querySelector('.box');
	let son=document.querySelector('.son');
	let pBottom=document.querySelector('.pBottom');
	let prev=document.querySelector('.prev');
	let next=document.querySelector('.next');



	render(database[0]);

	plays.onclick=function(){
		if(audio.paused){
			audio.play();
			plays.classList.toggle('icon-zanting');
		}else{
			audio.pause();
			plays.classList.toggle('icon-zanting');
		}
	}
	

	//格式化时间
	function  format(time){
        let m =  Math.floor(time /60) >=10 ? Math.floor(time /60) :  '0'+Math.floor(time /60);
        let s =  Math.floor(time % 60) >=10 ? Math.floor(time % 60) :  '0'+Math.floor(time % 60);
        return `${m}:${s}`;

    }

    // 歌词
    let x = 0
    let i = 0;
    audio.ontimeupdate= function(){
        let current = format(audio.currentTime); 
        let duration = format(audio.duration); 
        let string='';
        cTime.innerText = current;

        dTime.innerText =database[index].alltime;

        lyrics.innerHTML='';
        database[index]['lyrics'].forEach(function(value,index){
            if( value.time == current ){
                x = i = index;
            }
        })

        if(x<5){
           i=0
        }else{
            i = x - 5;
        }
        console.log(i,x);
        for(let j=i;j<database[index]['lyrics'].length;j++){
            if(j==x){
                string+=`
             <li class="hot">
                ${database[index]['lyrics'][j]['lyric']}
             </li>`;
            }else{
                string+=`
             <li >
                ${database[index]['lyrics'][j]['lyric']}
             </li>`;
            }

        }
        lyrics.innerHTML = string;



	//进度条
        let ctime1=audio.currentTime;
		let dtime1=audio.duration;
		son.style.width=ctime1/dtime1*100+'%';


    }


	function render(obj){
		let string='';
		song.innerText=obj.songs;
		author.innerText=obj.name;
		// author.src=obj.src;
		audio.src=obj.src;

		info.innerText = `${obj.songs} - ${obj.name} `;
        img.src= obj.photo;
        cTime.innerText = '00:00';

        dTime.innerText = obj.alltime;

        obj.lyrics.forEach(function(value,index){

           string +=`<li>${value.lyric}</li>`

       })
       lyrics.innerHTML= '';
       lyrics.innerHTML=string;

       // audio.src=obj.src;
	}

	next.onclick = function() {
		index++;
		if(index > database.length) {
			index = database.length;
		}
		son.style.width=0;
		audio.pause();
		render(database[index]);
		plays.className="iconfont icon-bofang play";

	}
	prev.onclick = function() {
		index--;
		if(index < 0) {
			index = 0;
		}
		son.style.width=0;
		audio.pause();
		render(database[index]);
		plays.className="iconfont icon-bofang play";
	}
		render(database[index]);
	
	
	
}
