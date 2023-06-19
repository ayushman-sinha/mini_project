
let k=20
let ans1=[]
while(k>=0){
    ans1.push(k)
    k--
}
console.log("Count from 20 to 0 : ")
console.log(ans1.join(" ")+ "\n")

let ans2=[]
for( let i=1;i<=20;i++){
    if(i%2==0)
        ans2.push(i)
}
console.log("Even numbers from 1 to 20 : ")
console.log(ans2.join(" "))
console.log("\n")

console.log("Given Pattern : \n")
for(let i=1;i<=5;i++){
    let x=[]
    for(let j=1;j<=i;j++)
        x.push("*")
    console.log(x.join(""))
}


