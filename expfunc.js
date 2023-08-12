const ca0=function(qs,ini,k,t,tu,N,gr){
    return{
        question: '<p>A '+qs+String.raw` is $\lb{`+ini+`}$. The `+grn(gr,N)+` of the `+qs+` is $\\o{`+k+`\%}$. Find the $\\yut{`+qs+`}$ after $\\g{`+t+`}$ `+tu+`</p>`,
        steps:[
            cp(k),
            `$$`+ca(ini,k/100,t,0,N)+`$$`,
        ]
    }
}

const cai=function(ini,k,t){
    return{
        question: String.raw`<p>Suppose that $\lb{\$`+ini+`}$ is invested in an account for $\\g{`+t+`}$ years. Find the balance in the account if interest is compounded continuously at $\\o{`+k+`\%}$</p>`,
        steps:[
            cp(k),
            `$$`+ca(ini,k/100,t,0,false)+`$$`,
        ]
    }
}

const dbt=function(qs,k){
    return{
        question: String.raw`<p>The growth rate of a `+qs+` is $\\o{`+k+`\%}$. After what $\\gt{period of time}$ will the `+qs+` double?</p>`,
        steps:[
            cp(k),
            String.raw`$$\ob{\gt{time to double}=}\gb{\frac{\ln(2)}{\ot{`+k/100+`}}}$$`,
        ]
    }
}

const hl=function(k){
    return{
        question: String.raw`<p>A radioactive substance has a decay rate of $\ot{`+k+`\%}$ per year. What is its half-life?</p>`,
        steps:[
            cp(k),
            String.raw`$$\ob{\gt{half-life}=}\gb{\frac{\ln(2)}{\ot{`+k/100+`}}}$$`,
        ]
    }
}

const cap=function(ini,k,t){
    return{
        question: String.raw`<p>Find the present value of $\lb{\$`+ini+`}$ due $\\g{`+t+`}$ years later at $\\o{`+k+`\%}$, compounded continuously.</p>`,
        steps:[
            cp(k),
            `$$`+ca(ini,k/100,t,0,true)+`$$`,
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
            `$$\\gb{`+ca(cam,k/100,t,1,N)+`}$$`,
            String.raw`$$\gb{\lbt{starting amount}=\frac{\yu{`+cam+`}}{e^{`+ms(N)+'(\\o{'+k/100+`})(\\g{`+t+`})}}}$$`
        ]
    }
}

const ca2=function(qs,cam,ini,t,tu,N,gr){
    strs=N?['(',')']:['',''];
    return{
        question: '<p>A '+qs+String.raw` is $\lb{`+ini+`}.$ `+'After '+`$\\g{`+t+`}$ `+tu+`, the `+qs+String.raw` is $\yu{`+cam+`}$. Find the `+grn(gr,N)+` rate of the `+qs+`.</p>`,
        steps:[
            `$$\\gb{`+ca(cam,ini,t,2,N)+`}$$`,
            String.raw`$$\bb{\frac{\yut{`+cam+`}}{\\lbt{`+ini+`}}=e^{`+ms(N)+`(`+grt(N,gr)+`)(\\g{`+t+`})}}$$`,
            String.raw`$$\bb{\ln\left(\frac{\yut{`+cam+`}}{\\lbt{`+ini+`}}\\right)=`+ms(N)+`(`+grt(N,gr)+`)(\\g{`+t+`})}$$`,
            `$$\\ob{`+grt(N,gr)+String.raw`=}\gb{\frac{\ln\left(\frac{\yut{`+cam+`}}{\\lbt{`+ini+`}}\\right)}{`+ms(N)+strs[0]+'\\g{'+t+'}'+strs[1]+`}}$$`,
        ]
    }
}

// ca2h=function(qs,cam,ini,t,N,gr,ans){
//     strs=ans?['ob','}\\gb{']:['gb',''];
//     return [
//         `$$\\gb{`+ca(cam,ini,t,2,N)+`}$$`,
//         String.raw`$$\bb{\frac{\yut{`+cam+`}}{\\lbt{`+ini+`}}=e^{`+ms(N)+`(`+grt(N,gr)+`)(\\g{`+t+`})}}$$`,
//         String.raw`$$\bb{\ln\left(\frac{\yut{`+cam+`}}{\\lbt{`+ini+`}}\\right)=`+ms(N)+`(`+grt(N,gr)+`)(\\g{`+t+`})}$$`,
//         `$$\\`+strs[0]+`{`+grt(N,gr)+`=`+strs[1]+String.raw`\frac{\ln\left(\frac{\yut{`+cam+`}}{\\lbt{`+ini+`}}\\right)}{`+ms(N)+strs[0]+'\\g{'+t+'}'+strs[1]+`}}$$`,
//     ]
// }

const ca3=function(qs,cam,ini,k,N,gr){
    strs=N?['(',')']:['',''];
    return{
        question: '<p>A '+qs+String.raw` is $\lb{`+ini+`}.$ The `+grn(gr,N)+` rate of the `+qs+' is '+`$\\o{`+k+`\%}$. `+'$\\gt{How long}$ will it take for the '+qs+` to reach $\\yu{`+cam+`}$?</p>`,
        steps:[
            `$$\\gb{`+ca(cam,ini,k/100,3,N)+`}$$`,
            String.raw`$$\bb{\frac{\yut{`+cam+`}}{\\lbt{`+ini+`}}=e^{`+ms(N)+`(\\ot{`+k/100+`})(\\gt{time passed})}}$$`,
            String.raw`$$\bb{\ln\left(\frac{\yut{`+cam+`}}{\\lbt{`+ini+`}}\\right)=`+ms(N)+`(\\ot{`+k/100+`})(\\gt{time passed})}$$`,
            `$$\\ob{\\gt{time passed}`+String.raw`=}\gb{\frac{\ln\left(\frac{\yut{`+cam+`}}{\\lbt{`+ini+`}}\\right)}{`+ms(N)+strs[0]+'\\o{'+k/100+'}'+strs[1]+`}}$$`,
        ]
    }
}

grt=function(N,gr){
    return `\\ot{`+grn(gr,N)+` rate}`;
}

const ms=function(N){
    return N?'\\r{-}':'';
}

const cp=function(k){
    return '$$\\ob{\\ot{growth rate}=\\frac{\\o{'+k+'}}{100}=\\o{'+k/100+'}}$$';
}

const grn=function(gr,N){
    if(gr.length==0){
        gr=N?'decay':'growth';
    }
    return gr;
}

const ca=function(a,b,c,n,N){
    cam=['\\yut{current amount}','\\lbt{starting amount}',grt(N,''),'\\gt{time passed}']
    strs=n==0?['\\ob{','}\\gb{','}']:['','',''];
    is=[0,1,2,3];
    is.splice(n,1);
    cs=['pu','lb','o','g'];
    ds=[a,b,c];
    for(let i=0;i<is.length;i++){
        cam[is[i]]='\\'+cs[is[i]]+'{'+ds[i]+'}';
    }
    return strs[0]+cam[0]+'='+strs[1]+cam[1]+'\\cdot e^{'+ms(N)+'('+cam[2]+')('+cam[3]+')}'+strs[2];
}

const intexp=function(ini,k,t,N){
    strs=N?['\\r{-}','(',')']:['','',''];
    return String.raw`$$\gb{\frac{\lbt{`+ini+`}}{`+strs[0]+strs[1]+`\\ot{`+k/100+`}`+strs[2]+String.raw`}\cdot \left(e^{`+strs[0]+`(\\ot{`+k/100+`})(\\gt{`+t+`})}-1\\right)}$$`
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
    return `$$\\gt{time passed}=`+t2+`-`+t1+`=\\g{`+t+`}$$`;
}

const oil=function(ini,k,t1,t2){
    t=t2-t1;
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
            String.raw`$$\gb{\frac{\lbt{`+ini+`}}{\\r{-}(\\ot{`+k/100+String.raw`})}\cdot \left(e^{\r{-}(\ot{`+k/100+`})(\\gt{`+t+`})}-1\\right)}$$`,
        ]
    }
}

rd=function(s,n){
    return Math.round(s*Math.pow(10,n))/Math.pow(10,n);
}

carypop=function(ini,cam,t1,t2,t3){
    t=t2-t1;
    tt=t3-t1;
    k=rd(Math.log(cam/ini)/t,4);
    return {
        question: String.raw`The population of Cary in `+t1+` was $\\lb{`+ini+`}$. In `+t2+`, the population had grown to $\\yu{`+cam+`}$. Using the uninhibited growth model, predict the population of Cary for the year `+t3+`</p>`,
        steps:[
            dt(t2,t1)+`$$`+ca(ini,cam,t,2,false)+`$$`,
            String.raw`$$\bb{\frac{\yut{`+cam+`}}{\\lbt{`+ini+`}}=e^{(\\ot{growth rate})(\\g{`+t+`})}}$$`,
            String.raw`$$\bb{\ln\left(\frac{\yut{`+cam+`}}{\\lbt{`+ini+`}}\\right)=(\\ot{growth rate})(\\g{`+t+`})}$$`,
            String.raw`$$\a{\gb{\ot{growth rate}}&=\gb{\frac{\ln\left(\frac{\yut{`+cam+`}}{\\lbt{`+ini+`}}\\right)}{\\g{`+t+`}}}\\\\[7pt]&=\\gb{\\ot{`+k+`}}}$$`,
            String.raw`$$`+ca(ini,k,tt,0,false)+`$$`
        ]
    }
}

carbon=function(hf,lf){
    k=rd(Math.log(2)/hf,5);
    const cam=100-lf;
    return {
        question:`The radioactive element carbon-14 has a half-life of `+hf+` years. The percentage of carbon-14 present in the remains of plants and animals can be used to determine age. How old is a skeleton that has lost $\\yut{`+lf+`\%}$ of its carbon-14?`,
        steps:[
            String.raw`$$\a{`+hf+String.raw`&=\frac{\ln(2)}{\ot{decay rate}}\\[10pt]\ot{decay rate}&=\frac{\ln(2)}{`+hf+`}\\\\[7pt]&=`+k+`}$$`,
            String.raw`$$\yut{current amount}=100-`+lf+`=\\yut{`+cam+`}$$`,
            `$$`+ca(cam,100,k/100,3,true)+`$$`,
            String.raw`$$\frac{\yut{`+cam+`}}{\\lbt{100}}=e^{\\r{-}(\\ot{`+k/100+`})(\\gt{time passed})}$$`,
            String.raw`$$\ln\left(\frac{\yut{`+cam+`}}{\\lbt{100}}\\right)=\\r{-}(\\ot{`+k/100+`})(\\gt{time passed})$$`,
            `$$\\gt{time passed}`+String.raw`=\frac{\ln\left(\frac{\yut{`+cam+`}}{\\lbt{100}}\\right)}{\\r{-}(\\o{`+k/100+`})}$$`,
        ]
    }
}

ln=function(s){
    return Math.log(s);
}

newton=function(T1,T2,Ts){
    T1s=`\\lb{`+T1+`}`;
    Tss=`\\r{`+Ts+`}`;
    T2s=`\\yu{`+T2+`}`;
    k=rd(ln((T2-Ts)/(T1-Ts))/(-30),4);
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
    L=500000000;
    C1=L/P1-1;
    C=rd(C1,4);
    I1=(L/P2-1)/C1;
    I=rd(I1,4);
    k1=ln(I1)/(-10);
    k=rd(k1,4);
    t=t3-t1;
    P=rd(L/(1+C1*Math.exp(-k1*t)),-6);
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
        intro: String.raw`<p>A quantity grows exponentially if the rate at which the quantity grows is proportional to the current amount of the quantity</p><p>Here are some examples of exponential growth<ol><pli>Population growth with unlimited resources: the rate at which new animals are born is proportional to the current amount of animals</pli><pli>Compound Interest: the increase in your savings due to interest is proportional to your current savings</pli></ol></p><p></p><p>A quantity which grows exponentially can be calculated with the current amount equation</p>$$\ca$$<p>$e^{\t{\{a power\}}}$ can be converted into a decimal with scientific and graphing calculators, but I don't need you to compute it as a decimal on the exam</p>`,
        rightColWidth: 50,
        steps: {
            general:{
                question:String.raw`<p>{A quantity} is $\lbt{an amount}$. The growth rate of the quantity is $\ot{a number}$. Find $\yut{the quantity}$ after $\gt{an amount of time}$</p>`,
                steps:[
                    String.raw`<p>If the $\ot{growth rate}$ is a percent, convert into a decimal by dividing by 100</p>`,
                    String.raw`<p>Calculate the amount with the equation $$\yut{current amount}=\lbt{starting amount}\cdot e^{(\ot{growth rate})(\gt{time passed})}$$</p>`,
                ]
            },
            specific:ca0g('bacteria population',1000,5,3,'minutes','')
        },
        examples: [

        ],
        },
        {
            name: String.raw`Exponential Decay`,
            backgroundColor: "green",
            web: "Hw 3: 1, 5-7, 9; Hw 4: 1-7, 11; Hw 5: 2, 5-7; PT 2: 1-6, 8; Hw 6: 4, 7, 9-10; PT 3: 8; Hw 9: 8, 10; PF: 4, 6, 10-12, 14-15",
            book: "148",
            exam: "Up to one question on Test 2, Up to one question on Final",
            intro: String.raw`<p>A quantity decays exponentially if the rate at which the quantity decreases is proportional to the current amount of the quantity</p><p>Here are some examples of exponential decay<ol><pli>Radioactive decay: the radioactive material consumed is proportional to the amount left</pli><pli>Prsent Value: the decrease in the value of your car due to inflation is proportional to the current value of the car</pli></ol></p><p></p><p>A quantity which $\rt{decays}$ exponentially can be calculated with the current amount equation with $\rt{a minus}$ in front of the $\ot{growth rate}$:</p>$$\cda$$`,
            rightColWidth: 50,
            steps: {
                general:{
                    question:String.raw`<p>{A quantity} is $\lbt{an amount}$. The decay rate of the quantity is $\ot{a number}$. Find $\yut{the quantity}$ after $\gt{an amount of time}$</p>`,
                    steps:[
                        String.raw`<p>If the $\ot{decay rate}$ is a percent, convert into a decimal by dividing by 100</p>`,
                        String.raw`<p>Calculate the amount with the equation $$\cda$$</p>`,
                    ]
                },
                specific:ca0d('bacteria population',1000,5,3,'minutes','')
            },
            examples: [
    
            ],
        },
        {
            name: String.raw`Finding the Starting Amount`,
            backgroundColor: "green",
            web: "Hw 3: 1, 5-7, 9; Hw 4: 1-7, 11; Hw 5: 2, 5-7; PT 2: 1-6, 8; Hw 6: 4, 7, 9-10; PT 3: 8; Hw 9: 8, 10; PF: 4, 6, 10-12, 14-15",
            book: "148",
            exam: "Up to one question on Test 2, Up to one question on Final",
            intro: String.raw`<p>The current amount equation is $$\ca\t{ for growth }$$and$$\cda\t{ for }\rt{decay}$$If you the $\yut{current amount}$, the $\ot{growth rate}$, and the $\gt{time passed}$, you can solve for the $\lbt{starting amount}$ by dividing both sides by $e^{(\ot{growth rate})(\gt{time passed})}$</p>`,
            rightColWidth: 50,
            steps: {
                general:{
                    question:String.raw`<p>The growth/decay rate of the quantity is $\ot{a number}$. After $\gt{an amount of time}$, the quantity is $\yut{an amount}$. Find the $\lbt{starting amount}$ of the quantity</p>`,
                    steps:[
                        String.raw`<p>If the $\ot{growth/decay rate}$ is a percent, convert into a decimal by dividing by 100</p>`,
                        String.raw`<p>Plug in the $\yut{current amount}$, the $\ot{decay rate}$, and the $\gt{time passed}$ into the growth or decay version of the current amount equation<ol><li>Growth Current Amount Equation:$$\ca$$</li><li>Decay Current Amount Equation:$$\cda$$</li></ol></p>`,
                        String.raw`<p>Solve for the $\lbt{starting amount}$ by diving both sides by $\btip{e^{(\ot{growth rate})(\gt{time passed})}}{\t{for growth}}$ or $\btip{e^{\r{-}(\ot{growth rate})(\gt{time passed})}}{\t{for }\rt{decay}}$</p>`,
                    ]
                },
                specific:ca1('bacteria population',2000,5,8,'minutes',false,'')
            },
            examples: [
                ca1('amount of a radioactive substance',10,2,200,'years',true,'')
            ],
        },
        {
            name: String.raw`Finding the Growth or Decay Rate`,
            backgroundColor: "green",
            web: "Hw 3: 1, 5-7, 9; Hw 4: 1-7, 11; Hw 5: 2, 5-7; PT 2: 1-6, 8; Hw 6: 4, 7, 9-10; PT 3: 8; Hw 9: 8, 10; PF: 4, 6, 10-12, 14-15",
            book: "148",
            exam: "Up to one question on Test 2, Up to one question on Final",
            intro: String.raw`<p>The current amount equation is $$\ca\t{ for growth }$$and$$\cda\t{ for }\rt{decay}$$If you the $\yut{current amount}$, the $\ot{growth rate}$, and the $\gt{time passed}$, you can solve for the $\ot{growth rate}$ with the following steps:<ol><li>divide both sides by the $\lbt{starting amount}$ to get $$\frac{\yut{current amount}}{\lbt{starting amount}}=e^{(\ot{growth rate})(\gt{time passed})}\ \ \t{ OR }\ \ \frac{\yut{current amount}}{\lbt{starting amount}}=e^{\r{-}(\ot{decay rate})(\gt{time passed})}$$</li><li>Cancel the $e$ to a power by taking the $\ln$ of both sides. $\ln$ is the opposite of $e$ with a power, similarly to how squaring and square rooting are opposites. Whenever you want to remove $e$ with a power from an equation, take the $\ln$ of both sides</li>$$\ln\left(\frac{\yut{current amount}}{\lbt{starting amount}}\right)=(\ot{growth rate})(\gt{time passed})\ \ \t{ OR }\ \ \ln\left(\frac{\yut{current amount}}{\lbt{starting amount}}\right)=\r{-}(\ot{decay rate})(\gt{time passed})$$<li>Divide both sides by $\gt{time passed}$ or $\r{-}(\gt{time passed})$ to solve for the growth or decay rate</li></ol></p>`,
            rightColWidth: 50,
            steps: {
                general:{
                    question:String.raw`<p>The growth rate of the quantity is $\ot{a number}$. After $\gt{an amount of time}$, the quantity is $\yut{an amount}$. Find the $\lbt{starting amount}$ of the quantity</p>`,
                    steps:[
                        String.raw`<p>Plug in the $\yut{current amount}$, the $\lbt{starting amount}$, and the $\gt{time passed}$ into the growth or decay version of the current amount equation<ol><li>Growth Current Amount Equation:$$\ca$$</li><li>Decay Current Amount Equation:$$\cda$$</li></ol></p>`,
                        String.raw`<p>Divide both sides by the $\lbt{starting amount}$</p>`,
                        String.raw`<p>Take the $\ln$ both sides to cancel the $e$</p>`,
                        String.raw`<p>Divide by $\gt{time passed}$ or $\r{-}(\gt{time passed})$ to solve for the growth or decay rate</p>`
                    ]
                },
                specific:ca2('bacteria population',2000,1000,2,'minutes',false,'')
            },
            examples: [
                // ca1('amount of a radioactive substance',10,2,200,'years',true,'')
            ],
        },
        {
            name: String.raw`Current Amount Equation: Finding Time Passed`,
            backgroundColor: "green",
            web: "Hw 3: 1, 5-7, 9; Hw 4: 1-7, 11; Hw 5: 2, 5-7; PT 2: 1-6, 8; Hw 6: 4, 7, 9-10; PT 3: 8; Hw 9: 8, 10; PF: 4, 6, 10-12, 14-15",
            book: "148",
            exam: "Up to one question on Test 2, Up to one question on Final",
            intro: String.raw`<p>The current amount equation is $$\ca\t{ for growth }$$and$$\cda\t{ for }\rt{decay}$$If you the $\yut{current amount}$, the $\ot{growth rate}$, and the $\gt{time passed}$, you can solve for the $\gt{time passed}$ with the following steps:<ol><li>divide both sides by the $\lbt{starting amount}$ to get $$\frac{\yut{current amount}}{\lbt{starting amount}}=e^{(\ot{growth rate})(\gt{time passed})}\ \ \t{ OR }\ \ \frac{\yut{current amount}}{\lbt{starting amount}}=e^{\r{-}(\ot{decay rate})(\gt{time passed})}$$</li><li>Cancel the $e$ to a power by taking the $\ln$ of both sides. $\ln$ is the opposite of $e$ with a power, similarly to how squaring and square rooting are opposites. Whenever you want to remove $e$ with a power from an equation, take the $\ln$ of both sides</li>$$\ln\left(\frac{\yut{current amount}}{\lbt{starting amount}}\right)=(\ot{growth rate})(\gt{time passed})\ \ \t{ OR }\ \ \ln\left(\frac{\yut{current amount}}{\lbt{starting amount}}\right)=\r{-}(\ot{decay rate})(\gt{time passed})$$<li>Divide both sides by $\ot{growth rate}$ or $\r{-}(\ot{decay rate})$ to solve for the $\gt{time passed}$</li></ol></p>`,
            rightColWidth: 50,
            steps: {
                general:{
                    question:String.raw`<p>{A quantity} is $\lbt{an amount}$. The growth rate of the quantity is $\ot{a number}$. How long until {the quantity} reaches $\yut{an amount}$</p>`,
                    steps:[
                        String.raw`<p>Plug in the $\yut{current amount}$, the $\lbt{starting amount}$, and the $\ot{growth/decay rate}$ into the growth or decay version of the current amount equation<ol><li>Growth Current Amount Equation:$$\ca$$</li><li>Decay Current Amount Equation:$$\cda$$</li></ol></p>`,
                        String.raw`<p>Divide both sides by the $\lbt{starting amount}$</p>`,
                        String.raw`<p>Take the $\ln$ both sides to cancel the $e$</p>`,
                        String.raw`<p>Divide by $\ot{growth rate}$ or $\r{-}(\ot{decay rate})$ to solve for the $\gt{time passed}$</p>`
                    ]
                },
                specific:ca3('bacteria population',2000,1000,2,false,'interest')
            },
        },
        {
            name: String.raw`Compound Interest`,
            backgroundColor: "green",
            web: "Hw 3: 1, 5-7, 9; Hw 4: 1-7, 11; Hw 5: 2, 5-7; PT 2: 1-6, 8; Hw 6: 4, 7, 9-10; PT 3: 8; Hw 9: 8, 10; PF: 4, 6, 10-12, 14-15",
            book: "148",
            exam: "Up to one question on Test 2, Up to one question on Final",
            intro: String.raw`<p>Compound Interest can be calculated with the growth version of the current amount equation with the growth rate replaced by the interest rate</p>$$\yut{current amount}=\lbt{starting amount}\cdot e^{(\ot{interest rate})\cdot(\gt{time passed})}$$</p>`,
            rightColWidth: 50,
            steps: {
                general:{
                    question:String.raw`<p>Suppose that $\lbt{an amount of money}$ is invested in an account for $\gt{a number of}$ years. Find the $\yut{balance}$ in the account if interest is compounded continuously at $\ot{an interest rate}$</p>`,
                    steps:[
                        String.raw`<p>Convert the interest rate to a decimal by dividing by 100</p>`,
                        String.raw`<p>Plug into the current amount equation to find the $\yut{balance}$$$\yut{balance}=\lbt{starting amount}\cdot e^{(\ot{interest rate})\cdot(\gt{time passed})}$$</p>`,
                    ]
                },
                specific:cai(24000,8,5)
            },
            examples: [
                
            ],
        },
        {
            name: String.raw`Present Value`,
            backgroundColor: "green",
            web: "Hw 3: 1, 5-7, 9; Hw 4: 1-7, 11; Hw 5: 2, 5-7; PT 2: 1-6, 8; Hw 6: 4, 7, 9-10; PT 3: 8; Hw 9: 8, 10; PF: 4, 6, 10-12, 14-15",
            book: "148",
            exam: "Up to one question on Test 2, Up to one question on Final",
            intro: String.raw`<p>Find  can be calculated with the decay version of the current amount equation with the decay rate replaced by the interest rate</p>$$\yut{current amount}=\lbt{starting amount}\cdot e^{-(\ot{interest rate})\cdot(\gt{time passed})}$$</p>`,
            rightColWidth: 50,
            steps: {
                general:{
                    question:String.raw`<p>Find the present value of $\lbt{an amount of money}$ due $\gt{a number of}$ years later at $\ot{an interest rate}$, compounded continuously.</p>`,
                    steps:[
                        String.raw`<p>Convert the interest rate to a decimal by dividing by 100</p>`,
                        String.raw`<p>Plug into the current amount equation to find the $\yut{present value}$$$\yut{present value}=\lbt{starting value}\cdot e^{\r{-}(\ot{interest rate})\cdot(\gt{time passed})}$$</p>`,
                    ]
                },
                specific:cap(24000,8,5)
            },
            examples: [
                // ca1('amount of a radioactive substance',10,2,200,'years',true,'')
            ],
        },
        {
            name: String.raw`Doubling Time`,
            backgroundColor: "green",
            web: "Hw 3: 1, 5-7, 9; Hw 4: 1-7, 11; Hw 5: 2, 5-7; PT 2: 1-6, 8; Hw 6: 4, 7, 9-10; PT 3: 8; Hw 9: 8, 10; PF: 4, 6, 10-12, 14-15",
            book: "148",
            exam: "Up to one question on Test 2, Up to one question on Final",
            intro: String.raw`<p>The amount of time it takes for a quantity to double is given by the below equation:$$\gt{time to double}=\frac{\ln(2)}{\ot{growth rate}}$$</p>`,
            rightColWidth: 50,
            steps: {
                general:{
                    question:String.raw`<p>The growth rate of {a quantity} is $\ot{a number}$. After what $\gt{period of time}$ will {the quantity} double?</p>`,
                    steps:[
                        String.raw`<p>Convert the growth rate to a decimal by dividing by 100</p>`,
                        String.raw`<p>Calculate the $\gt{time to double}$ with the below equation$$\gt{time to double}=\frac{\ln(2)}{\ot{growth rate}}$$</p>`,
                    ]
                },
                specific:dbt('bacteria population',5)
            },
            examples: [
                // ca1('amount of a radioactive substance',10,2,200,'years',true,'')
            ],
        },
        {
            name: String.raw`Half-Life`,
            backgroundColor: "green",
            web: "Hw 3: 1, 5-7, 9; Hw 4: 1-7, 11; Hw 5: 2, 5-7; PT 2: 1-6, 8; Hw 6: 4, 7, 9-10; PT 3: 8; Hw 9: 8, 10; PF: 4, 6, 10-12, 14-15",
            book: "148",
            exam: "Up to one question on Test 2, Up to one question on Final",
            intro: String.raw`<p>Half-life (the amount of time for half of a radioactive substance to decay) is calculated by the below formula:$$\gt{half-life}=\frac{\ln(2)}{\ot{decay rate}}$$</p>`,
            rightColWidth: 50,
            steps: {
                general:{
                    question:String.raw`<p>A radioactive substance has a decay rate of $\ot{a number}$ per year. What is its half-life?</p>`,
                    steps:[
                        String.raw`<p>Convert the decay rate to a decimal by dividing by 100</p>`,
                        String.raw`<p>Calculate the $\gt{half-life}$ with the below equation$$\gt{half-life}=\frac{\ln(2)}{\ot{decay rate}}$$</p>`,
                    ]
                },
                specific:hl(3)
            },
            examples: [
                // ca1('amount of a radioactive substance',10,2,200,'years',true,'')
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
        

        // {
        //     name: String.raw`Population of Cary (WebAssign Only)`,
        //     backgroundColor: "green",
        //     web: "Hw 3: 1, 5-7, 9; Hw 4: 1-7, 11; Hw 5: 2, 5-7; PT 2: 1-6, 8; Hw 6: 4, 7, 9-10; PT 3: 8; Hw 9: 8, 10; PF: 4, 6, 10-12, 14-15",
        //     book: "148",
        //     exam: "Up to one question on Test 2, Up to one question on Final",
        //     intro: String.raw`<p>The population of Cary in 1980 was $\lb{21763}$. In 1987, the population had grown to $\yu{39387}$. Using the uninhibited growth model, predict the population of Cary for the year 2010</p><p>This problem is difficult because it requires two stages to solve:<ol><li>Use the given information to find the $\ot{growth rate}$</li><li>Plug in the given information and the growth rate into the current amount equation to find the population in 2010.</li></ol></p>`,
        //     rightColWidth: 50,
        //     steps: {
        //         general:{
        //             question:String.raw`<p>The population of Cary in 1980 was $\lb{21763}$. In 1987, the population had grown to $\yu{39387}$. Using the uninhibited growth model, predict the population of Cary for the year 2010</p>`,
        //             steps:[
        //                 String.raw`Plug in the given information into the current amount equation$$\ca$$`,
        //                 String.raw`<p>Divide both sides by the $\lbt{starting amount}$</p>`,
        //                 String.raw`<p>Take the $\ln$ both sides to cancel the $e$</p>`,
        //                 String.raw`<p>Divide by $\gt{time passed}$ or $\r{-}(\gt{time passed})$ to solve for the growth rate</p>`,
        //                 String.raw`Plug into the current amount equation$$\ca$$`
        //             ]
        //         },
        //         specific:{
        //             question: String.raw`The population of Cary in 1980 was $\lb{21763}$. In 1987, the population had grown to $\yu{39387}$. Using the uninhibited growth model, predict the population of Cary for the year 2010</p>`,
        //             steps:[
        //                 String.raw`Between 1980 and 1987, $1987-1980=\g{7}$ years passed. Plugging into the current amount equation, we get $$`+ca(21763,39387,7,2,false)+`$$`,
        //                 String.raw`$$\frac{\yu{39387}}{\lb{21763}}=e^{(\ot{growth rate})(\g{7})}$$`,
        //                 String.raw`$$\ln\left(\frac{\yu{39387}}{\lb{21763}}\right)=(\ot{growth rate})(\g{7})$$`,
        //                 String.raw`$$\a{\ot{growth rate}&=\frac{\ln\left(\frac{\yu{39387}}{\lb{21763}}\right)}{\g{7}}\\[7pt]&=\o{0.08475}}$$`,
        //                 String.raw`Between 1980 and 2010, $2010-1980=\g{30}$ years passed. Plugging into the current amount equation, we get $$`+ca(21763,0.08475,30,0,false)+`$$`
        //             ]
        //         }
        //     },
        //     examples: [
        //         // ca1('amount of a radioactive substance',10,2,200,'years',true,'')
        //     ],
        // },
    ],
  }