const fructe = Array.from(document.querySelectorAll('.fruit'));
const flipCards = Array.from(document.querySelectorAll('.flip-card-inner'));
let imagini = ['avocado','banana','broccoli','carrot','grapes','tomato','watermelon','cauliflower','cherries','corn','avocado','banana','broccoli','carrot','grapes','tomato','watermelon','cauliflower','cherries','corn'];
let allowClick = true;
let fruitMatch=[];
let matchedFruits =[];



shuffle(imagini);


for (let i = 0 ; i < fructe.length ; i++){

    fructe[i].src=`imagini/${imagini[i]}.png`;

    fructe[i].parentElement.parentElement.classList.add(imagini[i]);
    
}



document.querySelector('.board').addEventListener('click',function(e){

    if(allowClick && e.target.parentElement.parentElement.classList[2] !== 'rotate'){
        //Elements with the rotate class
        let fruit = e.target.parentElement.parentElement.classList[1];
    
    if(e.target.nodeName === 'IMG'){
        e.target.parentElement.parentElement.classList.toggle('rotate');       

        //Add last two fruit related classes to array,and if they do not match, reset array
        fruitMatch.push(fruit);
        

        if(fruitMatch.length > 1 && fruitMatch[0] === fruitMatch[1]){
            // alert('match')
            matchedFruits.push(fruit);
            fruitMatch.length=0;
            
        }else if(fruitMatch.length > 1 && fruitMatch[0] !== fruitMatch[1]){
            console.log(fruitMatch)
            fruitMatch.length=0;
        }
        
    }

    //check if two cards are shown

    const rotate =Array.from(document.querySelectorAll('.rotate'));


    if(fruitMatch.length > 0){
        
        allowClick = false;
        setTimeout(() => {
            allowClick= true;
            for(let i = 0; i < flipCards.length ;i++){ 
                flipCards[i].classList.remove('rotate');
            }

            for( let i = 0; i < matchedFruits.length; i++){
               let fruits = document.querySelectorAll(`.${matchedFruits[i]}`);
               for( let i= 0; i < fruits.length; i++){
                   fruits[i].classList.add('rotate');
               }
            }
        }, 1000);

    }

    console.log(fruitMatch);
    console.log(matchedFruits);
    console.log(flipCards)
  }  
});

//Start Game


//Simple shuffle function



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

