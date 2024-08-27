//slot machine 1. depost money  DONE
//cehck bet on what number of lines how many
//collect bet amount
//spin machine
//give money or tkae moneuy
//again
const prompt = require("prompt-sync")();
const ROWS =3;
const COLUMNS =3;
const symbol_count= {
    "A" : 2,
    "B" : 4,
    "C" : 6,
    "D" : 8
}
const symbol_value ={
    "A" : 8,
    "B" : 6,
    "C" : 4,
    "D" : 2
}






const deposit = () =>{
    while(true){
        const depoitamount= prompt("enter deposit amount: ");
const deponumber= parseFloat(depoitamount);
if(isNaN(deponumber)||deponumber <=0){
    console.log("number is invalid");
}else {return deponumber};
    }

};

const getlines = () => {
    while(true){
        const lines  = prompt("enter number of lines (1-3): ");
    const linesnumber = parseFloat(lines);
    if(isNaN(linesnumber)||linesnumber<=0||linesnumber>3){
        console.log("invlaid number");

    }else{return linesnumber};
    }
    
}
const getbet = (depositamount, linesamount) =>{
    while(true){
    const bet = prompt("enter bet amount  ");
    const betnumber = parseFloat(bet);
    if(isNaN(betnumber)|| betnumber<=0||betnumber>depositamount / linesamount)
    {console.log("no money no honey")
    }else {return betnumber};
}
}
const spin = () =>{
    const symbols = [];
 for([symbol,count] of Object.entries(symbol_count)){
    for(i = 0; i < count; i++){
        symbols.push(symbol);
    }
 }
    
const reels = [[], [], []];
for(let j = 0; j < COLUMNS; j++){
    const reelSymbols = [...symbols];
    for(let k = 0;k < ROWS ; k++){
        const randomindex = Math.floor(Math.random() * reelSymbols.length);
        const selectedSymbol=reelSymbols[randomindex];
        reels[j].push(selectedSymbol);
        reelSymbols.splice(randomindex, 1);
    }
    

}
return reels;

}
const transpose = (reels) =>{
    const rows = [];
    for ( let i = 0; i < ROWS; i++){
        rows.push([]);
        for(let j = 0; j < COLUMNS; j++){
            rows[i].push(reels[j][i])
        }
        

    }
    return rows;
}
const printrows = (rows)=> {
    for (const row of rows ){
        let rowString = "";
        for (const [i , symbol]of row.entries()){
            rowString+= symbol
            if(i != row.length-1){
            rowString += " | ";}
        }
        console.log(rowString);
    }
    
}
const getwin = (rows, betamount, linesamount) => {
    let winnings = 0
    for (let row =0 ;row < linesamount; row++){
        const symbols = rows[row];
        let allsame = true;

        for ( const symbol of symbols ){
            if (symbol != symbols[0]){
                allsame = false;
                break;
            }
        }
        if ( allsame){
            winnings += betamount * symbol_value[symbols[0]]
        }
    }
    return winnings
}







const game = () =>{
    let balance = deposit();


    while(true){
        console.log("you have a balance of  "+ balance);
        let depositamount = deposit();
const linesamount = getlines();
const betamount  = getbet(depositamount, linesamount);
balance -= betamount * linesamount;
const reels =  spin();
const rows = transpose(reels);
printrows(rows);
const winnings = getwin(rows, betamount , linesamount )
balance += winnings
console.log("you won $"+ winnings.toString())


if(balance <=0){
    console.log("you are out of money")
    break;
}
const playagain = prompt("do u wanna play again(y/n)??");

if (playagain != "y"){break;}
}

    };


game();

