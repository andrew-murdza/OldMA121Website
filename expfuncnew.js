const ca0=function(qs,ini,k,t,tu,N,gr){
    return{
        question: '<p>A '+qs+String.raw` is $\lb{`+ini+`}$. The `+grn(gr,N)+` of the `+qs+` is $\\o{`+k+`\%}$. Find the $\\yut{`+qs+`}$ after $\\g{`+t+`}$ `+tu+`</p>`,
        steps:[
            cp(k),
            `$$\\begin{aligned}\\p{\\lbt{starting amount}}&\\p{=}\\p{\\lb{`+ini+`}}\\\\[6pt]\\p{`+grt(true,'')+`}&\\p{=}\\p{\\o{`+k/100+`}}\\\\[6pt]\\p{\\gt{time passed}}&\\p{=}\\p{\\g{`+t+`}}\\end{aligned}$$$$\\p{`+ca(ini,k/100,t,0,N)+`}$$`,
        ]
    }
}

const cai=function(ini,k,t){
    return{
        question: String.raw`<p>Suppose that $\lb{\$`+ini+`}$ is invested in an account for $\\g{`+t+`}$ years. Find the balance in the account if interest is compounded continuously at $\\o{`+k+`\%}$</p>`,
        steps:[
            cp(k),
            `$$\\begin{aligned}\\p{\\lbt{starting amount}}&\\p{=}\\p{\\lb{`+ini+`}}\\\\[6pt]\\p{`+grt(true,'')+`}&\\p{=}\\p{\\o{`+k/100+`}}\\\\[6pt]\\p{\\gt{time passed}}&\\p{=}\\p{\\g{`+t+`}}\\end{aligned}$$$$\\p{`+ca(ini,k/100,t,0,false)+`}$$`,
        ]
    }
}

const dbt=function(qs,k){
    return{
        question: String.raw`<p>The growth rate of a `+qs+` is $\\o{`+k+`\%}$. After what $\\gt{period of time}$ will the `+qs+` double?</p>`,
        steps:[
            cp(k),
            String.raw`$$\p{\gt{time to double}=}\p{\frac{\p{\ln(2)}}{\p{\ot{`+k/100+`}}}}$$`,
        ]
    }
}

const hl=function(k){
    return{
        question: String.raw`<p>A radioactive substance has a decay rate of $\ot{`+k+`\%}$ per year. What is its half-life?</p>`,
        steps:[
            cp(k),
            String.raw`$$\p{\gt{half-life}=}\p{\frac{\p{\ln(2)}}{\p{\ot{`+k/100+`}}}}$$`,
        ]
    }
}

const cap=function(ini,k,t){
    return{
        question: String.raw`<p>Find the present value of $\lb{\$`+ini+`}$ due $\\g{`+t+`}$ years later at $\\o{`+k+`\%}$, compounded continuously.</p>`,
        steps:[
            cp(k),
            `$$\\begin{aligned}\\p{\\lbt{starting amount}}&\\p{=}\\p{\\lb{`+ini+`}}\\\\[6pt]\\p{`+grt(true,'')+`}&\\p{=}\\p{\\o{`+k/100+`}}\\\\[6pt]\\p{\\gt{time passed}}&\\p{=}\\p{\\g{`+t+`}}\\end{aligned}$$$$\\p{`+ca(ini,k/100,t,0,true)+`}$$`,
        ]
    }
}

const ca0g=function(qs,ini,k,t,tu,gr){
    return ca0(qs,ini,k,t,tu,false,gr);
}

const ca0d=function(qs,ini,k,t,tu,gr){
    return ca0(qs,ini,k,t,tu,true,gr);
}


const ca1=function(qs,cam,k,t,tu,N,gr){
    return{
        question: '<p>After '+`$\\g{`+t+`}$ `+tu+`, the `+qs+String.raw` is $\yu{`+cam+`}$. The `+grn(gr,N)+` rate of the `+qs+` is $\\o{`+k+`\%}$. Find the $\\lbt{starting `+qs+`}$</p>`,
        steps:[
            cp(k),
            `$$\\begin{aligned}\\p{\\put{current amount}}&\\p{=}\\p{\\pu{`+cam+`}}\\\\[6pt]\\p{`+grt(N,'')+`}&\\p{=}\\p{\\o{`+k/100+`}}\\\\[6pt]\\p{\\gt{time passed}}&\\p{=}\\p{\\g{`+t+`}}\\end{aligned}$$$$\\p{`+ca(cam,k/100,t,1,N)+`}$$`,
            String.raw`$$\p{\lbt{starting amount}=}\p{\frac{\p{\yu{`+cam+`}}}{\\p{e}^{`+msp(N)+'\\p{(\\o{'+k/100+`})}\\p{(\\g{`+t+`})}}}}$$`
        ]
    }
}

const ca2=function(qs,cam,ini,t,tu,N,gr){
    let strs=N?['(',')']:['',''];
    return{
        question: '<p>A '+qs+String.raw` is $\lb{`+ini+`}.$ `+'After '+`$\\g{`+t+`}$ `+tu+`, the `+qs+String.raw` is $\yu{`+cam+`}$. Find the `+grn(gr,N)+` rate of the `+qs+`.</p>`,
        steps:[
            `$$\\begin{aligned}\\p{\\put{current amount}}&\\p{=}\\p{\\pu{`+cam+`}}\\\\[6pt]\\p{\\lbt{starting amount}}&\\p{=}\\p{\\lb{`+ini+`}}\\\\[6pt]\\p{\\gt{time passed}}&\\p{=}\\p{\\g{`+t+`}}\\end{aligned}$$$$\\p{`+ca(cam,ini,t,2,N)+`}$$`,
            String.raw`$$\p{\frac{\p{\yut{`+cam+`}}}{\\p{\\lbt{`+ini+`}}}}\\p{=}\\p{e}^{`+msp(N)+`\\p{(`+grt(N,gr)+`)}\\p{(\\g{`+t+`})}}$$`,
            String.raw`$$\p{\ln\left(\p{\frac{\p{\yut{`+cam+`}}}{\\p{\\lbt{`+ini+`}}}}\\right)}\\p{=}`+msp(N)+`\\p{(`+grt(N,gr)+`)}\\p{(\\g{`+t+`})}$$`,
            `$$\\pn{`+grt(N,gr)+String.raw`=}\pn{\frac{\ln\left(\frac{\yut{`+cam+`}}{\\lbt{`+ini+`}}\\right)}{`+ms(N)+strs[0]+'\\g{'+t+'}'+strs[1]+`}}$$`,
        ]
    }
}

// ca2h=function(qs,cam,ini,t,N,gr,ans){
//     strs=ans?['ob','}\\pn{']:['gb',''];
//     return [
//         `$$\\pn{`+ca(cam,ini,t,2,N)+`}$$`,
//         String.raw`$$\pn{\frac{\yut{`+cam+`}}{\\lbt{`+ini+`}}=e^{`+ms(N)+`(`+grt(N,gr)+`)(\\g{`+t+`})}}$$`,
//         String.raw`$$\pn{\ln\left(\frac{\yut{`+cam+`}}{\\lbt{`+ini+`}}\\right)=`+ms(N)+`(`+grt(N,gr)+`)(\\g{`+t+`})}$$`,
//         `$$\\`+strs[0]+`{`+grt(N,gr)+`=`+strs[1]+String.raw`\frac{\ln\left(\frac{\yut{`+cam+`}}{\\lbt{`+ini+`}}\\right)}{`+ms(N)+strs[0]+'\\g{'+t+'}'+strs[1]+`}}$$`,
//     ]
// }

const ca3=function(qs,cam,ini,k,N,gr){
    let strs=N?['(',')']:['',''];
    return{
        question: '<p>A '+qs+String.raw` is $\lb{`+ini+`}.$ The `+grn(gr,N)+` rate of the `+qs+' is '+`$\\o{`+k+`\%}$. `+'$\\gt{How long}$ will it take for the '+qs+` to reach $\\yu{`+cam+`}$?</p>`,
        steps:[
            `$$\\begin{aligned}\\p{\\put{current amount}}&\\p{=}\\p{\\pu{`+cam+`}}\\\\[6pt]\\p{\\lbt{starting amount}}&\\p{=}\\p{\\lb{`+ini+`}}\\\\[6pt]\\p{`+grt(N,'')+`}&\\p{=}\\p{\\o{`+k/100+`}}\\end{aligned}$$$$\\p{`+ca(cam,ini,k/100,3,N)+`}$$`,
            String.raw`$$\p{\frac{\p{\yut{`+cam+`}}}{\\p{\\lbt{`+ini+`}}}}\\p{=}\\p{e}^{`+msp(N)+`\\p{(\\ot{`+k/100+`})}\\p{(\\gt{time passed})}}$$`,
            String.raw`$$\p{\ln\left(\p{\frac{\p{\yut{`+cam+`}}}{\\p{\\lbt{`+ini+`}}}}\\right)}\\p{=}`+msp(N)+`\\p{(\\ot{`+k/100+`})}\\p{(\\gt{time passed})}$$`,
            `$$\\pn{\\gt{time passed}`+String.raw`=}\p{\frac{\p{\ln\left(\p{\frac{\p{\yut{`+cam+`}}}{\\p{\\lbt{`+ini+`}}}}\\right)}}{`+msp(N)+strs[0]+'\\p{\\o{'+k/100+'}}'+strs[1]+`}}$$`,
        ]
    }
}

grt=function(N,gr){
    return `\\ot{`+grn(gr,N)+` rate}`;
}

const ms=function(N){
    return N?'\\r{-}':'';
}

const msp=function(N){
    return N?'\\p{\\r{-}}':'';
}

const cp=function(k){
    return '$$\\pn{\\ot{growth rate}=\\p{\\frac{\\p{\\o{'+k+'}}}{\\p{100}}}\\p{=}\\p{\\o{'+k/100+'}}}$$';
}

const grn=function(gr,N){
    if(gr.length==0){
        gr=N?'decay':'growth';
    }
    return gr;
}

const ca=function(a,b,c,n,N){
    let cam=['\\yut{current amount}','\\lbt{starting amount}',grt(N,''),'\\gt{time passed}']
    let strs=n==0?['\\pn{','}\\pn{','}']:['','',''];
    let is=[0,1,2,3];
    is.splice(n,1);
    let cs=['pu','lb','o','g'];
    let ds=[a,b,c];
    for(let i=0;i<is.length;i++){
        cam[is[i]]='\\'+cs[is[i]]+'{'+ds[i]+'}';
    }
    return strs[0]+cam[0]+'='+strs[1]+'\\p{'+cam[1]+'}\\p{\\cdot} \\p{e}^{'+msp(N)+'\\p{('+cam[2]+')}\\p{('+cam[3]+')}}'+strs[2];
}

const intexp=function(ini,k,t,N){
    let strs=N?['\\r{-}','(',')']:['','',''];
    return String.raw`$$\pn{\frac{\lbt{`+ini+`}}{`+strs[0]+strs[1]+`\\ot{`+k/100+`}`+strs[2]+String.raw`}\cdot \left(e^{`+strs[0]+`(\\ot{`+k/100+`})(\\gt{`+t+`})}-1\\right)}$$`
}

const conflow=function(ini,k,t){
    return{
        question:`Find the amount of a continuous money flow in which $\\lbt{\\$`+ini+`}$ per year is being invested at $\\ot{`+k+`\%}$, compounded continuously for $\\gt{`+t+`}$ years`,
        steps:[
            cp(k),
            intexp(ini,k,t,false),
        ]
    }
}

dt=function(t2,t1){
    return `$$\\gt{time passed}=`+t2+`-`+t1+`=\\g{`+(t2-t1)+`}$$`;
}

const oil=function(ini,k,t1,t2){
    let t=t2-t1;
    return{
        question:`In `+t1+` (t = 0), the world use of natural gas was $\\lbt{`+ini+`}$ billion cubic feet, and the demand for natural gas was growing exponentially at the rate of $\\ot{`+k+`\%}$ per year. If the demand continues to grow at this rate, how many cubic feet of natural gas will the world use from `+t1+` to `+t2+`?
        `,
        steps:[
            cp(k),
            dt(t2,t1)+intexp(ini,k,t,false),
        ]
    }
}

accumpv=function(ini,k,t){
    return{
        question:`Find the accumulated present value of an investment over a $\gt{`+t+`}$-year period if there is a continuous money flow of $\\lbt{`+ini+`}$ per year and the current interest rate is $\\ot{`+k+`\%}$, compounded continuously.`,
        steps:[
            cp(k),
            String.raw`$$\pn{\frac{\lbt{`+ini+`}}{\\r{-}(\\ot{`+k/100+String.raw`})}\cdot \left(e^{\r{-}(\ot{`+k/100+`})(\\gt{`+t+`})}-1\\right)}$$`,
        ]
    }
}

rd=function(s,n){
    return Math.round(s*Math.pow(10,n))/Math.pow(10,n);
}

carypop=function(ini,cam,t1,t2,t3){
    let t=t2-t1;
    let tt=t3-t1;
    let k=rd(Math.log(cam/ini)/t,4);
    return {
        question: String.raw`The population of Cary in `+t1+` was $\\lb{`+ini+`}$. In `+t2+`, the population had grown to $\\yu{`+cam+`}$. Using the uninhibited growth model, predict the population of Cary for the year `+t3+`</p>`,
        steps:[
            dt(t2,t1)+`$$`+ca(ini,cam,t,2,false)+`$$`,
            String.raw`$$\pn{\frac{\yut{`+cam+`}}{\\lbt{`+ini+`}}=e^{(\\ot{growth rate})(\\g{`+t+`})}}$$`,
            String.raw`$$\pn{\ln\left(\frac{\yut{`+cam+`}}{\\lbt{`+ini+`}}\\right)=(\\ot{growth rate})(\\g{`+t+`})}$$`,
            String.raw`$$\a{\pn{\ot{growth rate}}&=\pn{\frac{\ln\left(\frac{\yut{`+cam+`}}{\\lbt{`+ini+`}}\\right)}{\\g{`+t+`}}}\\\\[7pt]&=\\pn{\\ot{`+k+`}}}$$`,
            String.raw`$$`+ca(ini,k,tt,0,false)+`$$`
        ]
    }
}

carbon=function(hf,lf){
    let k=rd(Math.log(2)/hf,8);
    let cam=100-lf;
    return {
        question:`The radioactive element carbon-14 has a half-life of `+hf+` years. The percentage of carbon-14 present in the remains of plants and animals can be used to determine age. How old is a skeleton that has lost $\\yut{`+lf+`\%}$ of its carbon-14?`,
        steps:[
            String.raw`$$\a{`+hf+String.raw`&=\frac{\ln(2)}{\ot{decay rate}}\\[10pt]\ot{decay rate}&=\frac{\ln(2)}{`+hf+`}\\\\[7pt]&=`+k+`}$$`,
            String.raw`$$\yut{current amount}=100-`+lf+`=\\yut{`+cam+`}$$`,
            `$$`+ca(cam,100,k,3,true)+`$$`,
            String.raw`$$\frac{\yut{`+cam+`}}{\\lbt{100}}=e^{\\r{-}(\\ot{`+k+`})(\\gt{time passed})}$$`,
            String.raw`$$\ln\left(\frac{\yut{`+cam+`}}{\\lbt{100}}\\right)=\\r{-}(\\ot{`+k+`})(\\gt{time passed})$$`,
            `$$\\gt{time passed}`+String.raw`=\frac{\ln\left(\frac{\yut{`+cam+`}}{\\lbt{100}}\\right)}{\\r{-}(\\o{`+k+`})}$$`,
        ]
    }
}

ln=function(s){
    return Math.log(s);
}

newton=function(T1,T2,Ts){
    let T1s=`\\lb{`+T1+`}`;
    let Tss=`\\r{`+Ts+`}`;
    let T2s=`\\yu{`+T2+`}`;
    let k=rd(ln((T2-Ts)/(T1-Ts))/(-30),4);
    return{
        question:String.raw`<p>By Newton's Law of Cooling, the rate at which an object cools is directly proportional to the difference in temperature between the object and the surrounding medium. If a certain object cools from $\lbt{`+T1+`°}$ to $\\yut{`+T2+`°}$ in $\\gt{half an hour}$ when surrounded by air at $\\rt{`+Ts+`°}$, find its temperature at the end of another half hour.</p>`,
        steps:[
            String.raw`$$`+T2s+`=`+Tss+`+(`+T1s+`-`+Tss+`)e^{-(\\o{k})(\\g{30})}$$`,
            String.raw`$$`+T2+`-`+Tss+`=(`+T1s+`-`+Tss+`)e^{-(\\o{k})(\\g{30})}$$`,
            String.raw`$\frac{`+T2+`-`+Tss+`}{`+T1s+`-`+Tss+`}=e^{-(\\o{k})(\\g{30})}$`,
            String.raw`$$\ln\left(\frac{`+T2+`-`+Tss+`}{`+T1s+`-`+Tss+`}\\right)=-(\\o{k})(\\g{30})$$`,
            String.raw`$$\o{k}=\frac{\ln\left(\frac{`+T2+`-`+Tss+`}{`+T1s+`-`+Tss+`}\\right)}{-(\\g{30})}=\\o{`+k+'}$$',
            String.raw`$$\yu{T}=`+Tss+`+(`+T1s+`-`+Tss+`)e^{-(\\o{`+k+`})(\\g{30}+\\g{30})}$$`
        ]
    }
}

logistic=function(P1,P2,t1,t2,t3){
    let L=500000000;
    let C1=L/P1-1;
    let C=rd(C1,4);
    let I1=(L/P2-1)/C1;
    let I=rd(I1,4);
    let k1=ln(I1)/(-10);
    let k=rd(k1,4);
    let t=t3-t1;
    let P=rd(L/(1+C1*Math.exp(-k1*t)),-6);
    return {
        question:String.raw`<p>Population is `+P1+` in `+t1+` and `+P2+` in `+t2+`. The limiting population is $\\lb{500,000,000}$. Predict the population for the year `+t3+`. Round to the nearest million</p>`,
        steps: [
            String.raw`$$\yu{P}=\frac{\lb{500000000}}{1+\r{C}e^{-(\o{k})(\gt{time passed})}}$$`,
            String.raw`Plug in the population of 1930 $(\gt{time passed}=\g{0})$ into $$\yu{`+P1+String.raw`}=\frac{\lb{500000000}}{1+\r{C}e^{-(\o{k})(\gt{0})}}$$`,
            `$$\\yu{`+P1+String.raw`}\cdot\left(1+\r{C}e^{0}\right)=\lb{500000000}$$Since $e^0=1$,$$\yu{`+P1+String.raw`}\cdot\left(1+\r{C}\right)=\lb{500000000}$$$$1+\r{C}=\frac{\lb{500000000}}{\yu{`+P1+String.raw`}}$$$$\r{C}=\frac{\lb{500000000}}{\yu{`+P1+`}}-1=\\r{`+C+`}$$`,
            String.raw`$$\yu{P}=\frac{\lb{500000000}}{1+\r{`+C+`}e^{-(\\o{k})(\\g{10})}}$$`,
            `$$\\yu{`+P2+String.raw`}=\frac{\lb{500000000}}{1+\r{`+C+`}e^{-(\\o{k})(\\g{10})}}$$`,
            String.raw`$$(\yu{`+P2+String.raw`})\left(1+\r{`+C+`}e^{-(\\o{k})(\\g{10})}\\right)=\\lb{500000000}$$$$1+\\r{`+C+String.raw`}e^{-(\o{k})(\g{10})}=\frac{\lb{500000000}}{\yu{`+P2+`}}$$$$\\r{`+C+String.raw`}e^{-(\o{k})(\g{10})}=\frac{\lb{500000000}}{\yu{`+P2+String.raw`}}-1$$$$e^{-(\o{k})(\g{10})}=\frac{\frac{\lb{500000000}}{\yu{`+P2+`}}-1}{\\r{`+C+`}}=`+I+String.raw`$$$$-(\o{k})(\g{10})=\ln(`+I+String.raw`)$$$$\o{k}=\frac{\ln(`+I+`)}{-(\\g{10})}=\\o{`+k+`}$$`,
            dt(t3,t1)+String.raw`<p>$$\yu{P}=\frac{\lb{500000000}}{1+\r{`+C+`}e^{-(\\o{`+k+`})(\\g{`+t+`})}}=`+P+`$$</p>`
        ]
    }
}

window.j = {
    startCollapsed: false,
    lessonNum: 11,
    lessonName: "Exponential Word Problems",
    intro: String.raw`<p>In this lecture, we will discuss exponential and logarithmic functions.</p><p>We will discuss<ol><pli>What are exponential and logarithmic functions?</pli><pli>Word problems solved using exponential and logarithmic functions</pli><pli>Derivatives of exponential and logarithmic functions</pli></ol></p>`,
    sections: [
        {
            name: String.raw`Exponential Growth`,
            backgroundColor: "green",
            web: "Hw 3: 1, 5-7, 9; Hw 4: 1-7, 11; Hw 5: 2, 5-7; PT 2: 1-6, 8; Hw 6: 4, 7, 9-10; PT 3: 8; Hw 9: 8, 10; PF: 4, 6, 10-12, 14-15",
            book: "148",
            exam: "Up to one question on Test 2, Up to one question on Final",
            intro: String.raw`<p>A quantity grows exponentially if\p the rate at which\p the quantity grows\p is proportional to\p the current amount of\p the quantity</p><p>Here are some examples of\p exponential growth<ol><pli>Population growth with unlimited resources:\p the rate at which new animals are born\p is proportional to\p the current amount of animals</pli><pli>Compound Interest:\p the increase in your savings\p due to interest is\p proportional to\p your current savings</pli></ol></p><p></p><p>A quantity which grows exponentially\p can be calculated with\p the current amount equation</p><p>$$\p{\ca}$$</p><p>$e^{\t{\{a power\}}}$ can be converted into a decimal with scientific and graphing calculators, but I don't need you to compute it as a decimal on the exam</p>`,
            rightColWidth: 50,
            steps: {
                general:{
                    question:String.raw`<p>{A quantity} is $\lbt{an amount}$. The growth rate of the quantity is $\ot{a number}.$ Find $\yut{the quantity}$ after $\gt{an amount of time}$</p>`,
                    steps:[
                        String.raw`<p>If the $\ot{growth rate}$ is a percent,\p convert into\p a decimal by\p dividing by 100</p>`,
                        String.raw`<p>Calculate the amount\p with\p the current amount equation \p$$\ca$$</p>`,
                    ]
                },
                specific:ca0g('bacteria population',1000,5,3,'minutes','')
            },
            examples: [
                ca0g('bacteria population',6000,5,5,'minutes',''),
                ca0g('bacteria population',700,2,3,'minutes',''),
                ca0g('bacteria population',400,3,2,'minutes',''),
                ca0g('bacteria population',500,1,4,'minutes',''),
                ca0g('bacteria population',3000,5,1,'minutes',''),
                ca0g('bacteria population',400,6,4,'minutes','')
            ],
        },
        {
            name: String.raw`Exponential Decay`,
            backgroundColor: "green",
            web: "Hw 3: 1, 5-7, 9; Hw 4: 1-7, 11; Hw 5: 2, 5-7; PT 2: 1-6, 8; Hw 6: 4, 7, 9-10; PT 3: 8; Hw 9: 8, 10; PF: 4, 6, 10-12, 14-15",
            book: "148",
            exam: "Up to one question on Test 2, Up to one question on Final",
            intro: String.raw`<p>A quantity decays exponentially if\p the rate at which\p the quantity decreases is\p proportional to\p the current amount of the quantity</p><p>Here are some examples of exponential decay<ol><pli>Radioactive decay:\p the radioactive material consumed\p is proportional to\p the amount left</pli><pli>Present Value:\p the decrease in the value of your car\p due to inflation is\p proportional to\p the current value of the car</pli></ol></p><p></p><p>A quantity which $\rt{decays}$ exponentially\p can be calculated with\p the current amount equation\p with $\rt{a minus}$\p in front of\p the $\ot{growth rate}$:</p><p>$$\cda$$</p>`,
            rightColWidth: 50,
            steps: {
                general:{
                    question:String.raw`<p>{A quantity} is $\lbt{an amount}$. The decay rate of the quantity is $\ot{a number}$. Find $\yut{the quantity}$ after $\gt{an amount of time}$</p>`,
                    steps:[
                        String.raw`<p>If the $\ot{decay rate}$ is a percent,\p convert into\p a decimal by\p dividing by 100</p>`,
                        String.raw`<p>Calculate the amount with\p the current amount equation\p $$\cda$$</p>`,
                    ]
                },
                specific:ca0d('amount of a radioactive substance',1000,5,3,'years','')
            },
            examples: [
                ca0d('amount of a radioactive substance',6000,5,5,'years',''),
                ca0d('amount of a radioactive substance',700,2,3,'years',''),
                ca0d('amount of a radioactive substance',400,3,2,'years',''),
                ca0d('amount of a radioactive substance',500,1,4,'years',''),
                ca0d('amount of a radioactive substance',3000,5,1,'years',''),
                ca0d('amount of a radioactive substance',400,6,4,'years','')
            ],
        },
        {
            name: String.raw`Finding the Starting Amount`,
            backgroundColor: "green",
            web: "Hw 3: 1, 5-7, 9; Hw 4: 1-7, 11; Hw 5: 2, 5-7; PT 2: 1-6, 8; Hw 6: 4, 7, 9-10; PT 3: 8; Hw 9: 8, 10; PF: 4, 6, 10-12, 14-15",
            book: "148",
            exam: "Up to one question on Test 2, Up to one question on Final",
            intro: String.raw`<p>The current amount equation is\p $$\ca\quad\p{\t{ for growth }}$$\pand\p$$\cda\quad\p{\t{ for }\rt{decay}}$$</p><p>If you know\p the $\yut{current amount}$,\p the $\ot{growth rate}$,\p and the $\gt{time passed}$,\p you can solve for\p the $\lbt{starting amount}$\p by dividing both sides by\p $e^{(\ot{growth rate})(\gt{time passed})}$</p>`,
            rightColWidth: 50,
            steps: {
                general:{
                    question:String.raw`<p>The growth/decay rate of the quantity is $\ot{a number}$. After $\gt{an amount of time}$, the quantity is $\yut{an amount}$. Find the $\lbt{starting amount}$ of the quantity</p>`,
                    steps:[
                        String.raw`<p>If the $\ot{growth/decay rate}$ is a percent,\p convert into a decimal by\p dividing by 100</p>`,
                        String.raw`<p>Plug in\p the $\yut{current amount}$,\p the $\ot{decay rate}$,\p and\p the $\gt{time passed}$ into\p the growth\p or decay version\p of the current amount equation<ol><pli>Growth Current Amount Equation:\p$$\ca$$</pli><pli>Decay Current Amount Equation:\p$$\cda$$</pli></ol></p>`,
                        String.raw`<p>Solve for\p the $\lbt{starting amount}$ by\p diving both sides by\p $\btip{e^{(\ot{growth rate})(\gt{time passed})}}{\t{for growth}}$\p or\p $\btip{e^{\r{-}(\ot{growth rate})(\gt{time passed})}}{\t{for }\rt{decay}}$</p>`,
                    ]
                },
                specific:ca1('bacteria population',2000,5,8,'minutes',false,'')
            },
            examples: [
                ca1('bacteria population',4000,2,2,'minutes',false,''),
                ca1('amount of a radioactive substance',10,3,4,'years',true,''),
                ca1('bacteria population',100,5,3,'minutes',false,''),
                ca1('bacteria population',2000,7,1,'minutes',false,''),
                ca1('amount of a radioactive substance',200,4,2,'years',true,''),
                ca1('amount of a radioactive substance',400,6,5,'years',true,''),
            ],
        },
        {
            name: String.raw`Finding the Growth or Decay Rate`,
            backgroundColor: "green",
            web: "Hw 3: 1, 5-7, 9; Hw 4: 1-7, 11; Hw 5: 2, 5-7; PT 2: 1-6, 8; Hw 6: 4, 7, 9-10; PT 3: 8; Hw 9: 8, 10; PF: 4, 6, 10-12, 14-15",
            book: "148",
            exam: "Up to one question on Test 2, Up to one question on Final",
            intro: String.raw`<p>The current amount equation is\p $$\ca\quad\p{\t{ for growth }}$$\pand\p$$\cda\quad\p{\t{ for }\rt{decay}}$$</p><p>If you know\p the $\yut{current amount}$,\p the $\ot{growth rate}$,\p and\p the $\gt{time passed}$,\p you can solve for\p the $\ot{growth rate}$</p>`,
 //with the following steps:<ol><li>divide both sides by the $\lbt{starting amount}$ to get $$\frac{\yut{current amount}}{\lbt{starting amount}}=e^{(\ot{growth rate})(\gt{time passed})}\ \ \t{ OR }\ \ \frac{\yut{current amount}}{\lbt{starting amount}}=e^{\r{-}(\ot{decay rate})(\gt{time passed})}$$</li><li>Cancel the $e$ to a power by taking the $\ln$ of both sides. $\ln$ is the opposite of $e$ with a power, similarly to how squaring and square rooting are opposites. Whenever you want to remove $e$ with a power from an equation, take the $\ln$ of both sides</li>$$\ln\left(\frac{\yut{current amount}}{\lbt{starting amount}}\right)=(\ot{growth rate})(\gt{time passed})\ \ \t{ OR }\ \ \ln\left(\frac{\yut{current amount}}{\lbt{starting amount}}\right)=\r{-}(\ot{decay rate})(\gt{time passed})$$<li>Divide both sides by $\gt{time passed}$ or $\r{-}(\gt{time passed})$ to solve for the growth or decay rate</li></ol></p>`,
            rightColWidth: 50,
            steps: {
                general:{
                    question:String.raw`<p>The growth rate of the quantity is $\ot{a number}$. After $\gt{an amount of time}$, the quantity is $\yut{an amount}$. Find the $\lbt{starting amount}$ of the quantity</p>`,
                    steps:[
                        String.raw`<p>Plug in\p the $\yut{current amount}$,\p the $\lbt{starting amount}$,\p and\p the $\gt{time passed}$ into\p the growth or decay version of\p the current amount equation<ol><pli>Growth Current Amount Equation:\p$$\ca$$</pli><pli>Decay Current Amount Equation:\p$$\cda$$</pli></ol></p>`,
                        String.raw`<p>Divide both sides by\p the $\lbt{starting amount}$</p>`,
                        String.raw`<p>Take the\p $\ln$ of\p both sides to\p cancel the $e$</p>`,
                        String.raw`<p>Divide by $\gt{time passed}$\p or $\r{-}(\gt{time passed})$\p to solve for\p the $\ot{growth or decay rate}$</p>`
                    ]
                },
                specific:ca2('bacteria population',2000,1000,2,'minutes',false,'')
            },
            examples: [
                ca2('bacteria population',4000,1000,2,'minutes',false,''),
                ca2('amount of a radioactive substance',10,12,4,'years',true,''),
                ca2('bacteria population',100,50,3,'minutes',false,''),
                ca2('bacteria population',2000,900,1,'minutes',false,''),
                ca2('amount of a radioactive substance',200,400,2,'years',true,''),
                ca2('amount of a radioactive substance',400,600,5,'years',true,''),
            ],
        },
        {
            name: String.raw`Current Amount Equation: Finding Time Passed`,
            backgroundColor: "green",
            web: "Hw 3: 1, 5-7, 9; Hw 4: 1-7, 11; Hw 5: 2, 5-7; PT 2: 1-6, 8; Hw 6: 4, 7, 9-10; PT 3: 8; Hw 9: 8, 10; PF: 4, 6, 10-12, 14-15",
            book: "148",
            exam: "Up to one question on Test 2, Up to one question on Final",
            intro: String.raw`<p>The current amount equation is\p $$\ca\quad\p{\t{ for growth }}$$\pand\p$$\cda\quad\p{\t{ for }\rt{decay}}$$</p><p>If you know\p the $\yut{current amount}$,\p the $\lbt{starting amount}$,\p and\p the $\ot{growth rate}$,\p you can solve for\p the $\gt{time passed}$</p>`,
            rightColWidth: 50,
            steps: {
                general:{
                    question:String.raw`<p>{A quantity} is $\lbt{an amount}$. The growth rate of the quantity is $\ot{a number}$. How long until {the quantity} reaches $\yut{an amount}$</p>`,
                    steps:[
                        String.raw`<p>Plug in the $\yut{current amount}$,\p the $\lbt{starting amount}$,\p and\p the $\ot{growth/decay rate}$ into\p the growth or decay version of\p the current amount equation<ol><pli>Growth Current Amount Equation:\p$$\ca$$</pli><pli>Decay Current Amount Equation:\p$$\cda$$</pli></ol></p>`,
                        String.raw`<p>Divide both sides by\p the $\lbt{starting amount}$</p>`,
                        String.raw`<p>Take\p the $\ln$ of\p both sides to\p cancel the $e$</p>`,
                        String.raw`<p>Divide by\p $\ot{growth rate}$ or $\r{-}(\ot{decay rate})$ to\p solve for\p the $\gt{time passed}$</p>`
                    ]
                },
                specific:ca3('bacteria population',2000,1000,2,false,'')
            },
            examples: [
                ca3('bacteria population',4000,1000,2,false,''),
                ca3('amount of a radioactive substance',10,12,4,true,''),
                ca3('bacteria population',100,50,3,false,''),
                ca3('bacteria population',2000,900,1,false,''),
                ca3('amount of a radioactive substance',200,400,2,true,''),
                ca3('amount of a radioactive substance',400,600,5,true,''),
            ]
        },
        {
            name: String.raw`Compound Interest`,
            backgroundColor: "green",
            web: "Hw 3: 1, 5-7, 9; Hw 4: 1-7, 11; Hw 5: 2, 5-7; PT 2: 1-6, 8; Hw 6: 4, 7, 9-10; PT 3: 8; Hw 9: 8, 10; PF: 4, 6, 10-12, 14-15",
            book: "148",
            exam: "Up to one question on Test 2, Up to one question on Final",
            intro: String.raw`<p>Compound Interest can be calculated with\p the growth version of\p the current amount equation with\p the growth rate replaced by\p the interest rate</p><p>$$\yut{current amount}=\p{\lbt{starting amount}}\p{\cdot}\p{e}^{\p{(\ot{interest rate})}\p{\cdot}\p{(\gt{time passed})}}$$</p>`,
            rightColWidth: 50,
            steps: {
                general:{
                    question:String.raw`<p>Suppose that $\lbt{an amount of money}$ is invested in an account for $\gt{a number of}$ years. Find the $\yut{balance}$ in the account if interest is compounded continuously at $\ot{an interest rate}$</p>`,
                    steps:[
                        String.raw`<p>Convert the interest rate\p to a decimal by\p dividing by 100</p>`,
                        String.raw`<p>Plug into\p the current amount equation to\p find the $\yut{balance}$\p$$\yut{balance}=\p{\lbt{starting amount}}\p{\cdot} \p{e}^{\p{(\ot{interest rate})}\p{\cdot}\p{(\gt{time passed})}}$$</p>`,
                    ]
                },
                specific:cai(24000,8,5)
            },
            examples: [
                cai(6000,5,5),
                cai(700,2,3),
                cai(400,3,2),
                cai(500,1,4),
                cai(3000,5,1),
                cai(400,6,4)
            ],
        },
        {
            name: String.raw`Present Value`,
            backgroundColor: "green",
            web: "Hw 3: 1, 5-7, 9; Hw 4: 1-7, 11; Hw 5: 2, 5-7; PT 2: 1-6, 8; Hw 6: 4, 7, 9-10; PT 3: 8; Hw 9: 8, 10; PF: 4, 6, 10-12, 14-15",
            book: "148",
            exam: "Up to one question on Test 2, Up to one question on Final",
            intro: String.raw`<p>Present value can be calculated with\p the decay version of\p the current amount equation with\p the decay rate replaced by\p the interest rate</p><p>$$\yut{current amount}\p{=\lbt{starting amount}}\p{\cdot} \p{e}^{\p{-}\p{(\ot{interest rate})}\p{\cdot}\p{(\gt{time passed})}}$$</p>`,
            rightColWidth: 50,
            steps: {
                general:{
                    question:String.raw`<p>Find the present value of $\lbt{an amount of money}$ due $\gt{a number of}$ years later at $\ot{an interest rate}$, compounded continuously.</p>`,
                    steps:[
                        String.raw`<p>Convert the interest rate\p to a decimal by\p dividing by 100</p>`,
                        String.raw`<p>Plug into\p the current amount equation\p to find the $\yut{present value}$\p$$\yut{present value}=\p{\lbt{starting value}}\p{\cdot} \p{e}^{\p{\r{-}}\p{(\ot{interest rate})}\p{\cdot}\p{(\gt{time passed})}}$$</p>`,
                    ]
                },
                specific:cap(24000,8,5)
            },
            examples: [
                cap(6000,5,5),
                cap(700,2,3),
                cap(400,3,2),
                cap(500,1,4),
                cap(3000,5,1),
                cap(400,6,4)
            ],
        },
        {
            name: String.raw`Doubling Time`,
            backgroundColor: "green",
            web: "Hw 3: 1, 5-7, 9; Hw 4: 1-7, 11; Hw 5: 2, 5-7; PT 2: 1-6, 8; Hw 6: 4, 7, 9-10; PT 3: 8; Hw 9: 8, 10; PF: 4, 6, 10-12, 14-15",
            book: "148",
            exam: "Up to one question on Test 2, Up to one question on Final",
            intro: String.raw`<p>The amount of time it takes for\p a quantity to\p double is given by\p the below equation:\p$$\gt{time to double}=\p{\frac{\p{\ln(2)}}{\p{\ot{growth rate}}}}$$</p>`,
            rightColWidth: 50,
            steps: {
                general:{
                    question:String.raw`<p>The growth rate of {a quantity} is $\ot{a number}$. After what $\gt{period of time}$ will {the quantity} double?</p>`,
                    steps:[
                        String.raw`<p>Convert the growth rate\p to a decimal by\p dividing by 100</p>`,
                        String.raw`<p>Calculate the $\gt{time to double}$\p with the below equation\p$$\gt{time to double}=\p{\frac{\p{\ln(2)}}{\p{\ot{growth rate}}}}$$</p>`,
                    ]
                },
                specific:dbt('bacteria population',5)
            },
            examples: [
                dbt('bacteria population',4),
                dbt('bacteria population',9),
                dbt('bacteria population',2),
                dbt('bacteria population',6),
                dbt('bacteria population',2),
                dbt('bacteria population',8),
            ],
        },
        {
            name: String.raw`Half-Life`,
            backgroundColor: "green",
            web: "Hw 3: 1, 5-7, 9; Hw 4: 1-7, 11; Hw 5: 2, 5-7; PT 2: 1-6, 8; Hw 6: 4, 7, 9-10; PT 3: 8; Hw 9: 8, 10; PF: 4, 6, 10-12, 14-15",
            book: "148",
            exam: "Up to one question on Test 2, Up to one question on Final",
            intro: String.raw`<p>Half-life\p (the amount of time for half of a radioactive substance to decay)\p is calculated by the below formula:\p$$\gt{half-life}=\p{\frac{\p{\ln(2)}}{\p{\ot{decay rate}}}}$$</p>`,
            rightColWidth: 50,
            steps: {
                general:{
                    question:String.raw`<p>A radioactive substance has a decay rate of $\ot{a number}$ per year. What is its half-life?</p>`,
                    steps:[
                        String.raw`<p>Convert the decay rate\p to a decimal by\p dividing by 100</p>`,
                        String.raw`<p>Calculate the\p $\gt{half-life}$ with\p the below equation\p$$\gt{half-life}=\p{\frac{\p{\ln(2)}}{\p{\ot{decay rate}}}}$$</p>`,
                    ]
                },
                specific:hl(3)
            },
            examples: [
                hl(4),
                hl(9),
                hl(2),
                hl(6),
                hl(2),
                hl(8),
            ],
        },
        {
            name: String.raw`Continuous Money Flow`,
            backgroundColor: "green",
            web: "Hw 3: 1, 5-7, 9; Hw 4: 1-7, 11; Hw 5: 2, 5-7; PT 2: 1-6, 8; Hw 6: 4, 7, 9-10; PT 3: 8; Hw 9: 8, 10; PF: 4, 6, 10-12, 14-15",
            book: "148",
            exam: "Up to one question on Test 2, Up to one question on Final",
            intro: String.raw`<p>Continuous money flow can be calculated with the below equation$$\t{continuous money flow}=\frac{\lbt{amount invested}}{\ot{interest rate}}\cdot \left(e^{(\ot{interest rate})(\gt{time passed})}-1\right)$$</p>`,
            rightColWidth: 50,
            steps: {
                general:{
                    question:String.raw`<p>Find the amount of a continuous money flow in which $\lbt{an amount}$ per year is being invested at $\ot{an interest rate}$, compounded continuously for $\gt{a number of}$ years</p>`,
                    steps:[
                        String.raw`<p>Convert the interest rate to a decimal by dividing by 100</p>`,
                        String.raw`Calculate continuous money flow with the formula$$\frac{\lbt{amount invested}}{\ot{interest rate}}\cdot \left(e^{(\ot{interest rate})(\gt{time passed})}-1\right)$$`,
                    ]
                },
                specific:conflow(225,9,10)
            },
            examples: [
                // ca1('amount of a radioactive substance',10,2,200,'years',true,'')
            ],
        },
        {
            name: String.raw`Acculumated Present Value`,
            backgroundColor: "green",
            web: "Hw 3: 1, 5-7, 9; Hw 4: 1-7, 11; Hw 5: 2, 5-7; PT 2: 1-6, 8; Hw 6: 4, 7, 9-10; PT 3: 8; Hw 9: 8, 10; PF: 4, 6, 10-12, 14-15",
            book: "148",
            exam: "Up to one question on Test 2, Up to one question on Final",
            intro: String.raw`<p>Acculumated present value can be calculated with the below equation$$\t{acculumated present value}=\frac{\lbt{amount invested}}{\r{-}\ot{interest rate}}\cdot \left(e^{\r{-}(\ot{interest rate})(\gt{time passed})}-1\right)$$</p>`,
            rightColWidth: 50,
            steps: {
                general:{
                    question:String.raw`<p>Find the accumulated present value of an investment over a $\gt{a number}$-year period if there is a continuous money flow of $\lbt{a number}$ per year and the current interest rate is $\ot{a number}$, compounded continuously.</p>`,
                    steps:[
                        String.raw`<p>Convert the interest rate to a decimal by dividing by 100</p>`,
                        String.raw`Calculate the acculumated present value with the formula$$\frac{\lbt{amount invested}}{\r{-}\ot{interest rate}}\cdot \left(e^{\r{-}(\ot{interest rate})(\gt{time passed})}-1\right)$$`,
                    ]
                },
                specific:accumpv(3100,8,18)
            },
            examples: [
                // ca1('amount of a radioactive substance',10,2,200,'years',true,'')
            ],
        },
        {
            name: String.raw`Gas Consumption (WebAssign Only)`,
            backgroundColor: "green",
            web: "Hw 3: 1, 5-7, 9; Hw 4: 1-7, 11; Hw 5: 2, 5-7; PT 2: 1-6, 8; Hw 6: 4, 7, 9-10; PT 3: 8; Hw 9: 8, 10; PF: 4, 6, 10-12, 14-15",
            book: "148",
            exam: "Up to one question on Test 2, Up to one question on Final",
            intro: String.raw`<p>Calculate natural gas use with the equation$$\t{gas used}=\frac{\lbt{starting use}}{\ot{growth rate}}\cdot \left(e^{(\ot{growth rate})(\gt{time passed})}-1\right)$$</p>`,
            rightColWidth: 50,
            steps: {
                general:{
                    question:String.raw`<p>In 1990 (t = 0), the world use of natural gas was 75818 billion cubic feet, and the demand for natural gas was growing exponentially at the rate of 6% per year. If the demand continues to grow at this rate, how many cubic feet of natural gas will the world use from 1990 to 2018?</p>`,
                    steps:[
                        String.raw`<p>Convert the growth rate to a decimal by dividing by 100</p>`,
                        String.raw`Calculate the gas consumed with the formula$$\frac{\lbt{starting use}}{\ot{growth rate}}\cdot \left(e^{(\ot{growth rate})(\gt{time passed})}-1\right)$$`,
                    ]
                },
                specific:oil(75818,6,1990,2018)
            },
            examples: [
                // ca1('amount of a radioactive substance',10,2,200,'years',true,'')
            ],
        },
        {
            name: String.raw`Population of Cary (WebAssign Only)`,
            backgroundColor: "green",
            web: "Hw 3: 1, 5-7, 9; Hw 4: 1-7, 11; Hw 5: 2, 5-7; PT 2: 1-6, 8; Hw 6: 4, 7, 9-10; PT 3: 8; Hw 9: 8, 10; PF: 4, 6, 10-12, 14-15",
            book: "148",
            exam: "Up to one question on Test 2, Up to one question on Final",
            intro: String.raw`<p>The population of Cary in 1980 was $\lb{21763}$. In 1987, the population had grown to $\yu{39387}$. Using the uninhibited growth model, predict the population of Cary for the year 2010</p><p>This problem is difficult because it requires two stages to solve:<ol><li>Use the given information to find the $\ot{growth rate}$</li><li>Plug in the given information and the growth rate into the current amount equation to find the population in 2010.</li></ol></p>`,
            rightColWidth: 50,
            steps: {
                general:{
                    question:String.raw`<p>The population of Cary in 1980 was $\lb{21763}$. In 1987, the population had grown to $\yu{39387}$. Using the uninhibited growth model, predict the population of Cary for the year 2010</p>`,
                    steps:[
                        String.raw`Plug in the given information into the current amount equation$$\ca$$`,
                        String.raw`<p>Divide both sides by the $\lbt{starting amount}$</p>`,
                        String.raw`<p>Take the $\ln$ both sides to cancel the $e$</p>`,
                        String.raw`<p>Divide by $\gt{time passed}$ or $\r{-}(\gt{time passed})$ to solve for the growth rate</p>`,
                        String.raw`Plug into the current amount equation$$\ca$$`
                    ]
                },
                specific:carypop(21763,39387,1980,1987,2010)
            },
            examples: [
                // ca1('amount of a radioactive substance',10,2,200,'years',true,'')
            ],
        },
        {
            name: String.raw`Age from Half-life (WebAssign Only)`,
            backgroundColor: "green",
            web: "Hw 3: 1, 5-7, 9; Hw 4: 1-7, 11; Hw 5: 2, 5-7; PT 2: 1-6, 8; Hw 6: 4, 7, 9-10; PT 3: 8; Hw 9: 8, 10; PF: 4, 6, 10-12, 14-15",
            book: "148",
            exam: "Up to one question on Test 2, Up to one question on Final",
            intro: String.raw`<p>The radioactive element carbon-14 has a half-life of 5750 years. The percentage of carbon-14 present in the remains of plants and animals can be used to determine age. How old is a skeleton that has lost 46% of its carbon-14?</p>`,
            rightColWidth: 50,
            steps: {
                general:{
                    question:String.raw`<p>The radioactive element carbon-14 has a half-life of 5750 years. The percentage of carbon-14 present in the remains of plants and animals can be used to determine age. How old is a skeleton that has lost 46% of its carbon-14?</p>`,
                    steps:[
                        String.raw`Calculate the decay rate from the half-life using $$\t{half-life}=\frac{\ln(2)}{\ot{decay rate}}$$`,
                        String.raw`$\yut{current amount}=100\%-\t{percentage lost}$`,
                        String.raw`Plug in the $\yut{current amount}$, $\ot{decay rate}$ and $\lbt{starting amount (100%)}$ into the current amount equation$$\cda$$`,
                        String.raw`<p>Divide both sides by the $\lbt{starting amount}$</p>`,
                        String.raw`<p>Take the $\ln$ both sides to cancel the $e$</p>`,
                        String.raw`<p>Divide by $\r{-}(\ot{decay rate})$ to solve for the $\gt{time passed}$</p>`
                    ]
                },
                specific:carbon(5750,46),
            },
            examples: [
                // ca1('amount of a radioactive substance',10,2,200,'years',true,'')
            ],
        },
        {
            name: String.raw`Newton's Law of Cooling (WebAssign only)`,
            backgroundColor: "green",
            web: "Hw 3: 1, 5-7, 9; Hw 4: 1-7, 11; Hw 5: 2, 5-7; PT 2: 1-6, 8; Hw 6: 4, 7, 9-10; PT 3: 8; Hw 9: 8, 10; PF: 4, 6, 10-12, 14-15",
            book: "148",
            exam: "Up to one question on Test 2, Up to one question on Final",
            intro: String.raw`<p>By Newton's Law of Cooling, the rate at which an object cools is directly proportional to the difference in temperature between the object and the surrounding medium. If a certain object cools from 125° to 100° in half an hour when surrounded by air at 75°, find its temperature at the end of another half hour.</p>`,
            rightColWidth: 50,
            steps: {
                general:{
                    question:String.raw`<p>By Newton's Law of Cooling, the rate at which an object cools is directly proportional to the difference in temperature between the object and the surrounding medium. If a certain object cools from $\lbt{125°}$ to $\yut{100°}$ in $\gt{half an hour}$ when surrounded by air at $\rt{75°}$, find its temperature at the end of another half hour.</p>`,
                    steps:[
                        String.raw`Plug in the given info to the equation $$\yu{T}=\r{T_s}+(\lb{T_1}-\r{T_s})e^{-(\o{k})(\gt{time passed})}$$ where $\r{T_s}$ is the surrounding temperature`,
                        String.raw`Subtract $\r{T_s}$ from both sides`,
                        String.raw`Divide both sides by $\lb{T_1}-\r{T_s}$`,
                        String.raw`Take the $\ln$ of both sides to cancel the $e$`,
                        String.raw`<p>Divide by $\r{-}(\gt{time passed})$ to solve for $\o{k}$</p>`,
                        String.raw`<p>Plug in $\o{k}$, $\r{T_s}$, $\lb{T_1}$, and $\gt{time passed}$ into $$\yu{T}=\r{T_s}+(\lb{T_1}-\r{T_s})e^{-(\o{k})(\gt{time passed})}$$</p>`
                    ]
                },
                specific:newton(125,100,75)
            },
            examples: [
                // ca1('amount of a radioactive substance',10,2,200,'years',true,'')
            ],
        },
        {
            name: String.raw`Logistic Growth (WebAssign only)`,
            backgroundColor: "green",
            web: "Hw 3: 1, 5-7, 9; Hw 4: 1-7, 11; Hw 5: 2, 5-7; PT 2: 1-6, 8; Hw 6: 4, 7, 9-10; PT 3: 8; Hw 9: 8, 10; PF: 4, 6, 10-12, 14-15",
            book: "148",
            exam: "Up to one question on Test 2, Up to one question on Final",
            intro: String.raw`<p>Population is 122,800,000 in 1930 and 131,700,000 in 1940. The limiting population is $\lb{500,000,000}$. Predict the population for the year $2000$. Round to the nearest million</p>`,
            rightColWidth: 50,
            steps: {
                general:{
                    question:String.raw`<p>Population is 122,800,000 in 1930 and 131,700,000 in 1940. The limiting population is $\lb{500,000,000}$. Predict the population for the year $2000$. Round to the nearest million</p>`,
                    steps:[
                        String.raw`Plug in the $\lbt{limiting population}$ for $\lb{L}$ into the equation $$\yut{P}=\frac{\lb{L}}{1+\r{C}e^{-(\o{k})(\gt{time passed})}}$$`,
                        String.raw`Plug in the population of 1930 $(\gt{time passed}=\g{0})$ into $$\yu{P}=\frac{\lb{L}}{1+\r{C}e^{-(\o{k})(\gt{time passed})}}$$`,
                        String.raw`Solve for $\r{C}$`,
                        String.raw`Plug in $\r{C}$ into $$\yu{P}=\frac{\lb{L}}{1+\r{C}e^{-(\o{k})(\gt{time passed})}}$$`,
                        String.raw`Plug in the population in 1940 ($\gt{time passed}=\g{10}$) into $$\yu{P}=\frac{\lb{L}}{1+\r{C}e^{-(\o{k})(\gt{time passed})}}$$`,
                        String.raw`Solve for $\o{k}$`,
                        String.raw`<p>Plug in $\o{k}$ and $\gt{time passed}=2000-1930=\g{70}$, into $$\yu{P}=\frac{\lb{L}}{1+\r{C}e^{-(\o{k})(\gt{time passed})}}$$</p>`
                    ]
                },
                specific:logistic(122800000,131700000,1930,1940,2000)
            },
            examples: [
                logistic(131700000,150700000,1940,1950,2000),
                logistic(150700000,179300000,1950,1960,2000),
            ],
        },
    ],
}