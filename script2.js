
init();

function init() {

    const fructe = Array.from(document.querySelectorAll('.fruit'));
    const cards = Array.from(document.querySelectorAll('.flip-card-inner'));
    
    let imagini = ['avocado','banana','broccoli','carrot','grapes','tomato','watermelon','cauliflower','cherries','corn','avocado','banana','broccoli','carrot','grapes','tomato','watermelon','cauliflower','cherries','corn'];
    let allowClick = true;
    let matched = 0;
    let fruitMatch=[];
    let clickedElements=[];
    let incercari = 0;
    
    shuffle(imagini);
    
    //Add all cards images with the shuffled array 

        
       for (let i = 0 ; i < fructe.length ; i++){
    
             fructe[i].src=`imagini/${imagini[i]}.png`;
             fructe[i].parentElement.parentElement.classList.add(imagini[i]);
        
        }
        
    

    //Make each card clickable
    
    cards.forEach(function(el,index){
        el.addEventListener('click',function(e){

            //Prevent click for cards that are shown and to rotate only the first two cards
            
            if(allowClick && this.classList[2] !== 'rotate'){
    
                this.classList.add('rotate');
    
                //Push Dom elements and the fruit class to two sepparate arrays
                clickedElements.push(this);
                fruitMatch.push(this.classList[1]);
        
        
                if(clickedElements.length > 1){
                    incercari++; //Count moves to calculate accuracy
                    allowClick=false;


                    //Timeout function to see the cards one scond before they return if they do not match
                    setTimeout(() => {

                     //Check if last two cards have the same value,if not rotate them back,else let them visible

                        if(fruitMatch[0] !== fruitMatch[1]){
    
                            for(let i = 0; i < clickedElements.length; i++){
                                clickedElements[i].classList.remove('rotate');
                            }
                        }else{
                            matched++;
                        }
                        
                        allowClick = true; 
                        fruitMatch.length=0; 
                        clickedElements.length=0;     
    
                 //If there are 10 matche the game is won
    
                        if(matched >= 10){
                            document.querySelector('.title').textContent='You WON!!!!';
                            document.querySelector('.accuracy-value').textContent =  (10/incercari * 100).toFixed(2) + ' %';
                            document.querySelector('.accuracy-value').style.display='block';
                            document.querySelector('.accuracy').style.display ='block';                 
                        }
    
                    }, 1000);
                }           
            }
        });
    });

    //Cuntdown clock

    setInterval(() => {
        const timer = document.querySelector('.timer-value');
        let number = parseInt(timer.textContent) ;

        //Substract from timer only if the game is not won or the number reached 0
        if(number > 0 && matched < 10) number--;
         
        timer.textContent = number;
    
        if(number === 0){
            allowClick=false;
            document.querySelector('.title').textContent='You Lose!'; 
        }
    }, 1000);
}






//Function to shuffle the images array

function shuffle(matrice){
    let arr = matrice;
    for(let i = 0; i < matrice.length ; i++){
        let random = Math.floor(Math.random()*matrice.length);
        let firstEl= arr[i];
        let secondEl = arr[random];
        
        arr[i] = secondEl;
        arr[random] = firstEl;
    }
}

//Refresh page to restart game. I messed the code realy bad when i tried to reset the game values so i chose the simple way out

document.querySelector('.new-game').addEventListener('click',function(){
    window.location.reload();
    
})

