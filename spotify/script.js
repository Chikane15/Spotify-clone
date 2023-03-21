console.log("welcome to spotify");

// Initialize the variables
let songIndex=0;
let audioElement=new Audio('songs/1.mp3');
//audioElement.play();

let masterPlay=document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let songItems= Array.from(document.getElementsByClassName('songItem'));
let masterSongPlay = document.getElementById('masterSongPlay');



let songs =[

    {songName:"warrioyo",filePath:"songs/1.mp3",coverPath:"covers/1.jpg"},
    {songName:"cielo - huma",filePath:"songs/2.mp3",coverPath:"covers/2.jpg"},
    {songName:"Different -heaven",filePath:"songs/3.mp3",coverPath:"covers/3.jpg"},
    {songName:"janji-heroes",filePath:"songs/4.mp3",coverPath:"covers/4.jpg"},
    {songName:"bhula Dena",filePath:"songs/5.mp3",coverPath:"covers/5.jpg"},
    {songName:"Tumhari Kasam",filePath:"songs/6.mp3",coverPath:"covers/6.jpg"},
    {songName:"Na Janna-Salam",filePath:"songs/7.mp3",coverPath:"covers/7.jpg"}
]

songItems.forEach((element ,i) => {
    console.log(element,i);
    element.getElementsByTagName("img")[0].src=songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText=songs[i].songName;
});



//Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity=1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity=0;
    }
})

//listen to Events
audioElement.addEventListener('timeupdate', ()=>{
    console.log('timeupdate');
   // Update Seekbar
   progress=parseInt((audioElement.currentTime/audioElement.duration)*100);
   console.log(progress);
   myProgressBar.value=progress;
})



myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime=myProgressBar.value * audioElement.duration/100;//formula lagaya hai
   })

//agar dusra song bjega to pehle vale ka sign play button m change hona chaheye(pause button se play button m)
const makeAllPlays =()=>{

    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
      element.classList.remove('fa-pause-circle');
      element.classList.add('fa-play-circle');  
    })
}


/*Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
   element.addEventListener('click',(e)=>{
      makeAllPlays();
      songIndex= parseInt(e.target.id);
      e.target.classList.remove('fa-play-circle');//jaise he koi click krega to sign pause m change ho 
      e.target.classList.add('fa-pause-circle');// jana chaheye
      audioElement.src=`songs/${songIndex+1}.mp3`;
      masterSongName.innerText=songs[songIndex].songName;                
      audioElement.currentTime=0;
      audioElement.play();  
      masterPlay.classList.remove('fa-play-circle');//ye vala niche vale play button k leye hai
      masterPlay.classList.add('fa-pause-circle');//jo nicje bottom m deya hai ,jiske use se gaane ko pause lr sakte ho
    })
})*/


Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
       makeAllPlays();
      
       //e.target.classList.remove('fa-play-circle');//jaise he koi click krega to sign pause m change ho 
       //e.target.classList.add('fa-pause-circle');// jana chaheye
       
    
        if(audioElement.paused || audioElement.currentTime<=0){//songs k aage jo play ka button hai uski help se pause play krne k leye
            songIndex= parseInt(e.target.id);
            audioElement.src=`songs/${songIndex+1}.mp3`;
            masterSongName.innerText=songs[songIndex].songName;                
            audioElement.currentTime=0;
            audioElement.play();
            e.target.classList.remove('fa-play-circle');
            e.target.classList.add('fa-pause-circle');
            
        }
        else{//song k aage jo button hai uske help se sing pause krne k leye
            audioElement.pause();
            e.target.classList.remove('fa-pause-circle');
            e.target.classList.add('fa-play-circle');
            
        }
    })
       masterPlay.classList.remove('fa-play-circle');//ye vala niche vale play button k leye hai
       masterPlay.classList.add('fa-pause-circle');//jo niche bottom m deya hai ,jiske use se gaane ko pause lr sakte ho
     })
 




document.getElementById('next').addEventListener('click',()=>{//next song play krne k leye
    if(songIndex>=6){
        songIndex=0;
    }
    else{
        songIndex +=1;
    }
    audioElement.src=`songs/${songIndex+1}.mp3`;
    masterSongName.innerText=songs[songIndex].songName;
    audioElement.currentTime=0;
    audioElement.play();  
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})

document.getElementById('previous').addEventListener('click',()=>{//previous song play krne k leye
    if(songIndex<=0){
        songIndex=0;
    }
    else{
        songIndex -=1;
    }
    audioElement.src=`songs/${songIndex+1}.mp3`;
    masterSongName.innerText=songs[songIndex].songName;
    audioElement.currentTime=0;
    audioElement.play();  
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})