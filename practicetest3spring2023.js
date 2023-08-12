import {
    int,
    convtermInt,
    addpause,
    intNoC,
    deriv
} from "./Calc.js?v=157";

function defintwu(a,b,fps,fs){
    let fb='\\p{\\b{'+fs.replaceAll('x','(\\r{'+b+'})')+'}}';
    let fa='\\p{\\b{'+fs.replaceAll('x','(\\pu{'+a+'})')+'}}';
    return `<p>Suppose that $f'(x)=`+fps+`$ and we want to find $f(\\r{`+b+`})-f(\\pu{`+a+`})$</p><p>We would first find $f(x)$ by taking the integral of $f'(x)$</p><p>$$\\a{f(x)&=\\p{\\i{f'(x)}}\\\\[10pt]&\\p{=}\\p{\\i{`+fps+`}}\\\\[10pt]&\\p{=}\\p{\\b{`+fs+`}\\C}}$$</p><p>This means that</p><p>$$\\a{f(\\r{`+b+`})-f(\\pu{`+a+`})&=\\p{\\left[`+fb+`\\C\\right]}\\p{-}\\p{\\left[`+fa+`\\C\\right]}\\\\[10pt]&\\p{=}\\p{\\left[`+fb+`\\right]}\\p{-}\\p{\\left[`+fa+`\\right]}}$$</p>`
}

function defint(a,b,fps,fs){
    return defint1(a,b,fps,fs,'');
}

function defint1(a,b,fps,fs,str){
    let fb='\\p{\\left[\\b{'+fs.replaceAll('x','(\\r{'+b+'})')+'}\\right]}';
    let fa='\\p{\\left[\\b{'+fs.replaceAll('x','(\\pu{'+a+'})')+'}\\right]}';
    let strs=['',''];
    if(str.length>0){
        strs=['\\t{'+str+'}&=','\\\\[10pt]'];
    }
    return `<p>$$\\a{`+strs[0]+`\\ie{\\pu{`+a+`}}{\\r{`+b+`}}{`+fps+`}`+strs[1]+`&\\p{=}\\p{\\b{`+fs+`}}\\p{\\ev{\\p{\\pu{`+a+`}}}{\\p{\\r{`+b+`}}}}\\\\[10pt]&\\p{=}`+fb+`\\p{-}`+fa+`}$$</p>`;
}

function Rint(a,b,fps,fs){
    return defint1(a,b,'\\g{'+fps+'}',fs,'Marginal Revenue')
}

function Rintwu(a,b,fps,fs){
    return '<p>'+qRint(a,b,fps)+`</p><p><span class='hi'>To answer this question, we find the integral of $\\g{R'(x)}$ from $x=\\pu{`+a+`}$ to $x=\\r{`+b+`}$:</span></p>`+Rint(a,b,fps,fs);
}

function Rintex(a,b,fps){
    let strs0=['Total Revenue','f'];
    a='\\pu{'+a+'}';
    b='\\r{'+b+'}';
    let fps1=convtermInt(fps);
    let fs='\\b{'+addpause(intNoC(fps1)[1])+'}';
    let fb='\\p{\\left[\\b{'+fs.replaceAll('x','('+b+')')+'}\\right]}';
    let fa='\\p{\\left[\\b{'+fs.replaceAll('x','('+a+')')+'}\\right]}';
    let strs=['\\t{'+strs0[0]+'}&=\\p{','}\\\\[10pt]&\\p{=}'];
    return {
        question:qRint(a,b,'\\g{'+fps+'}'),
        steps:[
            (fps1!=fps?'$$'+'\\g{'+strs0[1]+'(x)}=\\p{\\g{'+addpause(fps1)+'}}$$</p><p>':'')+'$$\\begin{aligned}'+strs[0]+`\\iep{`+a+`}{`+b+`}{\\g{`+fps+`}}`+strs[1]+`\\p{`+fs+`}\\p{\\ev{`+a+`}{`+b+`}}\\\\[10pt]&\\p{=}\\p{`+fb+`}\\p{-}\\p{`+fa+`}\\end{aligned}$$`
        ]
    }
}



function qRint(a,b,fps){
    return `<p>Question: A fight promoter sells $x$ tickets and has a marginal-revenue function given by the following</p><p>$$\\g{R'(x)}=\\g{`+fps+`}$$</p><p>Find the total revenue generated from the sale of ticket $\\pu{`+a+`}$ through ticket $\\r{`+b+`}$ (That is, integrate from $x=\\pu{`+a+`}$ to $x=\\r{`+b+`}.$)</p>`;
}

function defintex1(a,b,fps,str,str1){
    a='\\pu{'+a+'}';
    b='\\r{'+b+'}';
    let fps1=convtermInt(fps);
    let fs='\\b{'+addpause(intNoC(fps1)[1])+'}';
    let fb='\\p{\\left[\\b{'+fs.replaceAll('x','('+b+')')+'}\\right]}';
    let fa='\\p{\\left[\\b{'+fs.replaceAll('x','('+a+')')+'}\\right]}';
    let strs=str1!=''?[str1+'&=\\p{','}\\\\[10pt]&\\p{=}']:['','&='];
    return {
        question:`Find $\\ie{`+a+`}{`+b+`}{`+fps+`}$`,
        steps:[
            (fps1!=fps?'<p>$$'+str+'='+addpause(fps1)+'$$':'')+'$$\\p{\\i{'+fps+'}=}'+fs+'\\p{\\g{+C}}$$',
            '$$\\begin{aligned}'+strs[0]+`\\ie{`+a+`}{`+b+`}{`+fps+`}`+strs[1]+`\\p{`+fs+`}\\p{\\ev{`+a+`}{`+b+`}}\\\\[10pt]&\\p{=}\\p{`+fb+`}\\p{-}\\p{`+fa+`}\\end{aligned}$$`
        ]
    }
}

function defintex(a,b,fps){
    return defintex1(a,b,fps,fps,'');
}

function antiderivex(fs) {
    let str='\\ds\\i{'+fs+'}';
    let fstr=convtermInt(fs);
    let list=int(fstr);
    let str1='$$\\begin{aligned}'+str+'&=';
    if(list[0]!=''){
        str1=str1+addpause(list[0])+'\\\\[10pt]&\\p{=}'
    }
    return{
        question:'Find $'+str+'$',
        steps:[
            (fstr!=fs?'$$f(x)='+addpause(fstr)+'$$':''),str1+addpause(list[1])+'\\end{aligned}$$'
        ]
    }
}

function ca0(qs,ini,k,t,tu,N,gr){
    return{
        question: '<p>A '+qs+String.raw` is $\lb{`+ini+`}$. The `+grn(gr,N)+` of the `+qs+` is $\\o{`+k+`\\%}$. Find the $\\yut{`+qs+`}$ after $\\g{`+t+`}$ `+tu+`</p>`,
        steps:[
            cp(k,N),
            `$$\\begin{aligned}\\p{\\lbt{starting amount}}&\\p{=}\\p{\\lb{`+ini+`}}\\\\[6pt]\\p{`+grt(N,'')+`}&\\p{=}\\p{\\o{`+k/100+`}}\\\\[6pt]\\p{\\gt{time passed}}&\\p{=}\\p{\\g{`+t+`}}\\end{aligned}$$$$\\p{`+ca(ini,k/100,t,0,N)+`}$$`,
        ]
    }
}

function ca0g(qs,ini,k,t,tu,gr){
    return ca0(qs,ini,k,t,tu,false,gr);
}

function ca0d(qs,ini,k,t,tu,gr){
    return ca0(qs,ini,k,t,tu,true,gr);
}


function ca1(qs,cam,k,t,tu,N,gr){
    return{
        question: '<p>After '+`$\\g{`+t+`}$ `+tu+`, the `+qs+String.raw` is $\yu{`+cam+`}$. The `+grn(gr,N)+` rate of the `+qs+` is $\\o{`+k+`\\%}$. Find the $\\lbt{starting `+qs+`}$</p>`,
        steps:[
            cp(k,N),
            `$$\\begin{aligned}\\p{\\put{current amount}}&\\p{=}\\p{\\pu{`+cam+`}}\\\\[6pt]\\p{`+grt(N,'')+`}&\\p{=}\\p{\\o{`+k/100+`}}\\\\[6pt]\\p{\\gt{time passed}}&\\p{=}\\p{\\g{`+t+`}}\\end{aligned}$$$$\\p{`+ca(cam,k/100,t,1,N)+`}$$`,
            String.raw`$$\p{\lbt{starting amount}=}\p{\frac{\p{\yu{`+cam+`}}}{\\p{e}^{`+msp(N)+'\\p{(\\o{'+k/100+`})}\\p{(\\g{`+t+`})}}}}$$`
        ]
    }
}

function ca2(qs,cam,ini,t,tu,N,gr){
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

function grt(N,gr){
    return `\\ot{`+grn(gr,N)+` rate}`;
}

function ms(N){
    return N?'\\r{-}':'';
}

function msp(N){
    return N?'\\p{\\r{-}}':'';
}

function cp(k,N){
    return '$$\\pn{'+grt(N,'')+'=\\p{\\frac{\\p{\\o{'+k+'}}}{\\p{100}}}\\p{=}\\p{\\o{'+k/100+'}}}$$';
}

function grn(gr,N){
    if(gr.length==0){
        gr=N?'decay':'growth';
    }
    return gr;
}

function ca(a,b,c,n,N){
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

function ederiv(c){
    return '\\ds\\frac{d}{dx}{\\b{'+c+'}e^x}=\\p{\\b{'+c+'}}\\p{e^\\p{x}}'
}
function eaderiv(c,a){
    return '\\frac{d}{dx}{\\b{'+c+'}e^{\\r{'+a+'}x}}=\\p{\\r{'+a+'}}\\p{\\cdot}\\p{\\b{'+c+'}}\\p{e^{\\p{\\r{'+a+'}}\\p{x}}}'
}
function clnderiv(c){
    return '\\ds\\frac{d}{dx}\\b{'+c+'}\\ln(x)=\\p{\\frac{\\p{\\b{'+c+'}}}{\\p{x}}}'
}

function derivintroex(fs) {
    return {
        question: '<p>Let $f(x)=' + fs + '$</p><p>Find $f\'(x)$</p>',
        steps: ['$$f\'(x)=' + addpause(deriv(fs)[1]) + '$$']
    }
}

window.j = {
    startCollapsed: false,
    lessonNum: 11,
    lessonName: "Calculating anti-derivatives and integrals",
    intro: String.raw`<p>The exam will have 7 questions</p><p><ol><pli>Find $f'(x)$, where $f(x)$ has terms with $e^x$, $e^{ax}$, and $\ln(x)$ (Section 1)</pli><pli>Find current amount with the current amount equation (Section 2 or Section 3)</pli><pli>Find starting amount with the current amount equation (Section 4)</pli><pli>Find growth rate with the current amount equation (Section 5)</pli><pli>Find an anti-derivative with multiple terms (Section 6)</pli><pli>Find a definite integral (an integral with endpoints) (Section 7)</pli><pli>Find Total Revenue from Marginal Revenue (Section 8)</pli></ol></p>`,
    sections: [
        {
            name: String.raw`Derivatives involving $e^x$, $e^{ax}$ and $\ln(x)$`,
            backgroundColor: "green",
            web: "Hw 3: 1, 5-7, 9; Hw 4: 1-7, 11; Hw 5: 2, 5-7; PT 2: 1-6, 8; Hw 6: 4, 7, 9-10; PT 3: 8; Hw 9: 8, 10; PF: 4, 6, 10-12, 14-15",
            book: "148",
            exam: "Up to one question on test 2 and up to one question on the final",
            intro: String.raw`<p>In this section,\p we will discuss how to\p take derivatives involving\p $e^x$, \p $e^{ax}$,\p and\p $\ln(x)$</p><p>We will use the following derivative rules</p><p><table>
        <tr>
            <th>Formula</th>
            <th>Example 1</th>
            <th>Example 2</th>
        </tr>
        <tr>
            <td><p>$$\hi{`+ederiv('c')+`}$$</p></td>
            <td><p>$$`+ederiv(7)+`$$</p></td>
            <td><p>$$`+ederiv(-4)+`$$</p></td>
        </tr>
        <tr>
            <td><p>$$\\hi{`+eaderiv('c','a')+`}$$</p></td>
            <td><p>$$`+eaderiv(5,-2)+`$$</p></td>
            <td><p>$$`+eaderiv(2,4)+`$$</p></td>
        </tr>
        <tr>
            <td><p>$$\\hi{`+clnderiv('c')+`}$$</p></td>
            <td><p>$$`+clnderiv(9)+`$$</p></td>
            <td><p>$$`+clnderiv(2)+`$$</p></td>
        </tr></p>`,
            rightColWidth: 50,
            steps:{
                general:{question:String.raw`<p>Let $f(x)=\t{\{an equation\}}$</p><p>Find $f'(x)$</p>`,
                    steps:[
                        String.raw`<p>Take the derivative of each term using the following derivative rules</p><p><ol><pli>$$\hi{`+ederiv('c')+`}$$</pli><pli>$$\\hi{`+eaderiv('c','a')+`}$$</pli><pli>$$\\hi{`+clnderiv('c')+`}$$</pli></ol></p>`
                    ]
                },
                specific:derivintroex('12x^3-3e^{5x}+3\\ln(x)')
            },
            examples: [
                derivintroex('9e^{\\m4x}+4e^x-2'),
                derivintroex('6x-3e^x+6\\ln(x)'),
                derivintroex('5\\ln(x)+9-2e^{\\m9x}'),
                derivintroex('6e^{2x}+4x+e^x'),
                derivintroex('5e^{9x}-3\\ln(x)+4x^2'),
                derivintroex('-5e^x-12x+2\\ln(x)'),
                // derivintroex('2e^x-\\ln(x)+x^2'),
                // derivintroex('2e^{2x}-3\\ln(x)+x'),
                // derivintroex('-e^{-x}+\\ln(x)+x^4'),
                // derivintroex('2e^{-2x}-2e^x+1'),
            ],
        },
        {
            name: String.raw`Exponential Growth`,
            backgroundColor: "green",
            web: "Hw 3: 1, 5-7, 9; Hw 4: 1-7, 11; Hw 5: 2, 5-7; PT 2: 1-6, 8; Hw 6: 4, 7, 9-10; PT 3: 8; Hw 9: 8, 10; PF: 4, 6, 10-12, 14-15",
            book: "148",
            exam: "Up to one question on Test 2, Up to one question on Final",
            intro: String.raw`<p>A quantity grows exponentially if\p the rate at which\p the quantity grows\p is proportional to\p the current amount of\p the quantity</p><p>Here are some examples of\p exponential growth<ol><pli>Population growth with unlimited resources:\p the rate at which new animals are born\p is proportional to\p the current amount of animals</pli><pli>Compound Interest:\p the increase in your savings\p due to interest is\p proportional to\p your current savings</pli></ol></p><p></p><p>A quantity which grows exponentially\p can be calculated with\p the current amount equation</p><p>$$\p{\ca}$$</p>`,//<p>$e^{\t{\{a power\}}}$ can be converted into a decimal with scientific and graphing calculators, but I don't need you to compute it as a decimal on the exam</p>`,
            rightColWidth: 50,
            steps: {
                general:{
                    question:String.raw`<p>{A quantity} is $\lbt{an amount}$. The growth rate of the quantity is $\ot{a number}.$ Find $\yut{the quantity}$ after $\gt{an amount of time}$</p>`,
                    steps:[
                        String.raw`<p>If the $\ot{growth rate}$ is a percent,\p convert into\p a decimal by\p dividing by 100</p>`,
                        String.raw`<p>Calculate the amount\p with\p the current amount equation \p$$\ca$$</p>`,
                    ]
                },
                specific:ca0g('bacteria population',800,2,5,'minutes','')
            },
            examples: [
                ca0g('bacteria population',500,1,3,'minutes',''),
                ca0g('bacteria population',800,3,4,'minutes',''),
                ca0g('bacteria population',200,6,2,'minutes',''),
                ca0g('bacteria population',100,4,7,'minutes',''),
                ca0g('bacteria population',700,2,3,'minutes',''),
                ca0g('bacteria population',300,9,8,'minutes','')
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
                specific:ca0d('amount of a radioactive substance',800,2,5,'years','')
            },
            examples: [
                ca0d('amount of a radioactive substance',500,1,3,'years',''),
                ca0d('amount of a radioactive substance',800,3,4,'years',''),
                ca0d('amount of a radioactive substance',200,6,2,'years',''),
                ca0d('amount of a radioactive substance',100,4,7,'years',''),
                ca0d('amount of a radioactive substance',700,2,3,'years',''),
                ca0d('amount of a radioactive substance',300,9,8,'years','')
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
                specific:ca1('bacteria population',800,1,1,'minutes',false,'')
            },
            examples: [
                ca1('bacteria population',200,2,3,'minutes',false,''),
                ca1('amount of a radioactive substance',70,5,5,'years',true,''),
                ca1('bacteria population',400,2,2,'minutes',false,''),
                ca1('bacteria population',500,4,5,'minutes',false,''),
                ca1('amount of a radioactive substance',600,5,4,'years',true,''),
                ca1('amount of a radioactive substance',100,8,9,'years',true,''),
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
                    question:String.raw`<p>A quantity is $\bt{an amount}$. After $\gt{an amount of time}$, the quantity is $\yut{another amount}$. Find the $\ot{growth/decay rate}$ of the quantity</p>`,
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
            name: String.raw`Integral of multiple terms being added or subtracted`,
            backgroundColor: "green",
            web: "Hw 3: 1, 5-7, 9; Hw 4: 1-7, 11; Hw 5: 2, 5-7; PT 2: 1-6, 8; Hw 6: 4, 7, 9-10; PT 3: 8; Hw 9: 8, 10; PF: 4, 6, 10-12, 14-15",
            book: "148",
            exam: "Up to one question on Test 2, Up to one question on Final",
            intro: String.raw`<p>Before we discuss how to find the integral of multiple terms being added or subtracted, let's first review all of the anti-derivative formulas</p>

        <table>
        <tr>
            <th>Formula</th>
            <th>Example 1</th>
            <th>Example 2</th>
        </tr>
        <tr>
            <td><p>$$\hi{\ds\i{\r{c}}=\p{\r{c}\p{x}}\C}$$</p></td>
            <td><p>$$\ds\i{\r{7}}=\p{\r{7}\p{x}}\C$$</p></td>
            <td><p>$$\ds\i{\r{-3}}=\p{\r{-3}\p{x}}\C$$</p></td>
        </tr>
        <tr>
            <td><p>$$\hi{\ds\i{\frac{\r{c}}{x}}=\p{\r{c}\p{\ln(x)}}\C}$$</p></td>
            <td><p>$$\ds\i{\frac{\r{8}}{x}}=\p{\r{8}\p{\ln(x)}}\C$$</p></td>
            <td><p>$$\ds\i{\frac{\r{1}}{x}}=\p{\r{1}\p{\ln(x)}}\C$$</p></td>
        </tr>
        <tr>
            <td><p>$$\hi{\i{\r{c}e^x}=\p{\r{c}\p{e^x}}\C}$$</p></td>
            <td><p>$$\i{\r{3}e^x}=\p{\r{3}\p{e^x}}\C$$</p></td>
            <td><p>$$\i{\r{-9}e^x}=\p{\r{-9}\p{e^x}}\C$$</p></td>
        </tr>
        <tr>
            <td><p>$$\hi{\i{\r{c}e^{\b{k}x}}=\p{\p{\frac{\r{c}}{\b{k}}}\p{e^{\b{k}x}}}\C}$$</p></td>
            <td><p>$$\i{\r{4}e^{\b{3}x}}=\p{\p{\frac{\r{4}}{\b{3}}}\p{e^{\b{3}x}}}\C$$</p></td>
            <td><p>$$\i{\r{10}e^{\b{-2}x}}=\p{\p{\frac{\r{10}}{\b{-2}}}\p{e^{\b{-2}x}}}\C$$</p></td>
        </tr>
        <tr>
            <td><p>$$\hi{\i{\r{c}x^{\b{n}}}=\p{\p{\frac{\r{c}}{\b{n}+1}}\p{x^{\b{n}+1}}}\C}$$</p></td>
            <td><p>$$\i{\r{6}x^{\b{3}}}=\p{\p{\frac{\r{6}}{\b{3}+1}}\p{x^{\b{3}+1}}}\C$$</p></td>
            <td><p>$$\i{\r{5}x^{\b{4}}}=\p{\p{\frac{\r{5}}{\b{4}+1}}\p{x^{\b{4}+1}}}\C$$</p></td>
        </tr>
        </table>`+String.raw`
        <p><span class='hi'>When integrating multiple terms being added or subtracted, <span class='invisible'>calculate the integral of each term separately</span></span>\p using the above list of integral formulas</p><p><b>Note: You only need one $\g{C}$ in your answer</b></p><p>Here are some examples:</p>
        <p>Find $\ds\i{2x^4+3-2e^x}$</p><p>To find this integral, we first find the integral of each term</p><p>$$\i{2x^4}=\p{\frac{2}{5+1}}\p{x^{5+1}}\C$$</p><p>$$\i{3}=\p{3}\p{x}\C$$</p><p>$$\i{2e^x}=\p{2}\p{e^x}\C$$</p><p>Putting the terms back together and using only one $\g{C}$, we get</p><p>$$\i{2x^4+3-2e^x}=\p{\frac{2}{5+1}}\p{x^{5+1}}\p{+}\p{3}\p{x}\p{-}\p{2}\p{e^x}\C$$</p><p>Find $\ds\i{3e^{2x}+7x-\frac{4}{x}}$</p><p>To find this integral, we first find the integral of each term</p><p>$$\i{3e^{2x}}=\p{\frac{3}{2}}\p{e^{2x}}\C$$</p><p>$$\i{7x}=\p{\frac{7}{1+1}}\p{x^{1+1}}\C$$</p><p>$$\i{\frac{4}{x}}=\p{4}\p{\ln(x)}\C$$</p><p>Putting the terms back together and using only one $\g{C}$, we get</p><p>$$\i{3e^{2x}+7x-\frac{4}{x}}=\p{\frac{3}{2}}\p{e^{2x}}\p{+}\p{\frac{7}{1+1}}\p{x^{1+1}}\p{-}\p{4}\p{\ln(x)}\C$$</p>`,
            rightColWidth: 50,
            steps: {
                general:{
                    question:String.raw`<p>Find $\i{\t{\{a function with terms being added/subtracted\}}}$</p>`,
                    steps:[
                        String.raw`<p>Rewrite\p $\r{c}\sqrt{x}$\p and \p $\frac{\r{c}}{x^{\bt{power other than 1}}}$\p using the properties</p><p>$$\hi{\r{c}\b{\sqrt{\bk{x}}}=\p{\r{c}}\p{x^{\b{\powfrac{1}{2}}}}}$$</p><p>$$\hi{\frac{\r{c}}{x^{\b{n}}}=\p{\r{c}}\p{x^{-\b{n}}}}$$</p>`,
                        `<p><span class='hi'>When integrating multiple terms being added or subtracted, <span class='invisible'>calculate the integral of each term separately</span></span>\\p using the integral formulas from the previous 7 sections</p><p><b>Note: You only need one $\\g{C}$ in your answer</b></p>`
                    ]
                },
                specific:antiderivex(`9x+2x^3+5e^x`)
            },
            examples: [
                antiderivex(`\\frac{6}{x}-9+4e^{2x}`),
                antiderivex(`\\frac{9}{x^3}+x+2`),
                antiderivex(`5e^{\\m2x}-2e^x+x^3`),
                antiderivex(`2x+\\frac{1}{x}+e^{\\m3x}`),
                antiderivex(`9x^3-12x+\\frac{7}{x^2}`),
                antiderivex(`\\frac{3}{x}+\\frac{4}{x^3}-3e^{2x}`),
            ],
        },
        {
            name: String.raw`Definite Integrals (integrals with endpoints)`,
            backgroundColor: "green",
            web: "Hw 3: 1, 5-7, 9; Hw 4: 1-7, 11; Hw 5: 2, 5-7; PT 2: 1-6, 8; Hw 6: 4, 7, 9-10; PT 3: 8; Hw 9: 8, 10; PF: 4, 6, 10-12, 14-15",
            book: "148",
            exam: "Up to one question on Test 2, Up to one question on Final",
            intro: String.raw`<p>In the previous section, we saw that we could use integrals\p to find $f(x)$ if\p we knew $f'(x)$\p and $f(0)$.</p><p>We found the integral of $f'(x)$\p to get $\bt{the variable part of $f(x)$}$\p and used $f(0)$ to\p find $\g{C}$</p><p>Sometimes we want to\p calculate $f(\r{b})-f(\pu{a})$\p (the change in $f(x)$ between $x=\pu{a}$ and $x=\r{b}$)\p without knowing\p $f(0)$ or\p $\g{C}$</p><p>Below are some examples</p>`
                //<p>This is possible because when subtracting the $\g{C}$'s in $f(\r{b})$ and $f(\pu{a})$ cancel out:</p><p>$$\a{f(\r{b})-f(\pu{a})&=\p{\left[\ipi{\r{b}}\C\right]}\p{-}\p{\left[\ipi{\pu{a}}\C\right]}\\[10pt]&\p{=}\p{\ipi{\r{b}}}\p{-}\p{\ipi{\pu{a}}}}$$</p>
                +defintwu(1,2,'3x^2+4','\\frac{3}{2+1}x^{2+1}\\p{+}\\p{4x}')+defintwu(3,5,'2x-6','\\frac{2}{1+1}x^{1+1}\\p{-}\\p{6x}')
                //+defintwu(-2,0,'e^{x}-x^2','e^{x}\\p{-}\\p{\\frac{1}{2+1}x^{2+1}}')
                +`<p>In general, when finding $f(\\r{b})-f(\\pu{a})$, first find the integral of $f'(x)$</p><p>Then use the following formula:</p><p>$$\\a{f(\\r{b})-f(\\pu{a})\\p{=}\\p{\\left[\\ipi{\\r{b}}\\right]}\\p{-}\\p{\\left[\\ipi{\\pu{a}}\\right]}}$$</p><p>We will use this formula so much that we call 
        $\\a{\\p{\\left[\\ipi{\\r{b}}\\right]}\\p{-}\\p{\\left[\\ipi{\\pu{a}}\\right]}}$</p><p>$\\ie{\\pu{a}}{\\r{b}}{f'(x)}$</p><p>We also abbreviate $\\a{\\p{\\left[\\ipi{\\r{b}}\\right]}\\p{-}\\p{\\left[\\ipi{\\pu{a}}\\right]}}$ as </p><p>$\\b{\\left\\{\\t{variable part of }\\i{f'(x)}\\right\\}}\\ev{\\pu{a}}{\\r{b}}$</p><p>Replacing $f'(x)$ with $f(x)$, we get\\p $$\\hi{\\a{\\ie{\\pu{a}}{\\r{b}}{f(x)}&=\\b{\\left\\{\\t{variable part of }\\i{f(x)}\\right\\}}\\ev{\\pu{a}}{\\r{b}}\\\\[10pt]&=\\a{\\p{\\left[\\ipit{\\r{b}}\\right]}\\p{-}\\p{\\left[\\ipit{\\pu{a}}\\right]}}}}$$</p><p>Here are some examples</p>`+defint(1,3,'2x','\\frac{2}{1+1}x^{1+1}'),
            rightColWidth: 50,
            steps: {
                general:{
                    question:String.raw`<p>Find $\ie{\pu{a}}{\r{b}}{\t{\{a function\}}}$</p>`,
                    steps:[
                        `<p>Find $\\b{\\left\\{\\t{variable part of }\\i{f(x)}\\right\\}}.$</p><p>In other words, find $\\i{f(x)}$ without the $\\C$</p>`,
                        `<p>$$\\hi{\\a{\\ie{\\pu{a}}{\\r{b}}{f(x)}&=\\b{\\left\\{\\t{variable part of }\\i{f(x)}\\right\\}}\\ev{\\pu{a}}{\\r{b}}\\\\[10pt]&=\\p{\\left[\\ipit{\\r{b}}\\right]}\\\\[10pt]&\\qquad\\p{-}\\p{\\left[\\ipit{\\pu{a}}\\right]}}}$$</p>`,
                    ]
                },
                specific:defintex(0,2,'5x+3e^{2x}')//defintex(3,4,'4+3e^{2x}','4x\\p{+}\\p{\\frac{3}{2}e^{2x}}','')
            },
            examples: [
                defintex(1,2,'5x^3+12x'),
                defintex(5,7,'-\\frac{3}{x}+4'),
                defintex(3,6,'5e^x+x^2'),
                defintex(-3,1,'5x^3-e^{\\m2x}'),
                defintex(1,4,'\\frac{5}{x^2}+2e^x'),
                defintex(3,4,'-x+4')
            ],
        },
        {
            name: String.raw`Revenue From Marginal Revenue`,
            backgroundColor: "green",
            web: "Hw 3: 1, 5-7, 9; Hw 4: 1-7, 11; Hw 5: 2, 5-7; PT 2: 1-6, 8; Hw 6: 4, 7, 9-10; PT 3: 8; Hw 9: 8, 10; PF: 4, 6, 10-12, 14-15",
            book: "148",
            exam: "Up to one question on Test 2, Up to one question on Final",
            intro: 'In  this section, we will discuss how to calculate total revenue'+Rintwu(1000,1300,'150x-1740','\\p{\\frac{150}{1+1}}\\p{x^{1+1}}\\p{-}\\p{1740}\\p{x}'),
            rightColWidth: 90,
            steps: {
                general:{
                    question:qRint('a','b','\\t{a function}'),
                    steps:[
                        `$$\\hi{\\t{Total Revenue}=\\p{\\ie{\\pu{a}}{\\r{b}}{\\p{\\g{R'(x)}}}}}$$`
                    ]
                },
                specific:Rintex(200,300,'9x^4+3')
            },
            examples: [
                Rintex(300,500,'5x-4'),
                Rintex(100,600,'12x^2+10'),
                Rintex(500,800,'20x^3-4x'),
                Rintex(300,400,'50x+30'),
                Rintex(700,900,'9x+x^3'),
                Rintex(100,300,'2x^6+20')
            ],
        }
    ],
}