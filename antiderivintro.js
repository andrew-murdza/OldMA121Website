import {int, convtermInt, addpause, intNoC} from "./Calc.js?v=157";

function antiex(fs,fps){
    return `<p>The derivative of $\\b{`+fs+`}$ is\\p $\\r{`+fps+`}$\\p, so an anti-derivative of $\\r{`+fps+`}$ is\\p $\\b{`+fs+`}$</p>`
}


function antiexb(fs,fps){
    return `<p>The derivative of $`+fs+`$ is\\p $`+fps+`$\\p, so the integral of $`+fps+`$ is\\p $`+fs+`\\C$</p><p>$$\\i{`+fps+`}=\\p{`+fs+`}\\C$$</p>`
}

function antiexv2(fs,fps){
    return antiexb('\\b{'+addpause(fs)+'}','\\r{'+fps+'}');
}

function antic(c){
    //return antiexb(rone(c)+'x',ronep2(c));
    return antiexb('\\r{'+c+'}x','\\r{'+c+'}');
}

function intex(fs,fps){
    return {
        question: `Find $\\i{`+fps+`}$`,
        steps:[
            `$$\\i{`+fps+`}=\\p{`+fs+`}\\C$$`
        ]
    }
}

function intcex(c){
    return intex(rone(c)+'\\p{x}',ronep2(c));
}

function cdx(c){
    return antiexb(''+rone(c)+'\\ln(x)','\\frac{'+ronep2(c)+'}{x}');
}

function cdxex(c){
    return intex(''+rone(c)+'\\p{\\ln(x)}','\\frac{'+rone(c)+'}{x}');
}

function ce(c){
    return antiexb(''+rone(c)+'e^x',''+rone(c)+'e^x')
}

function cex(c){
    return intex(''+rone(c)+'\\p{e^x}',''+rone(c)+'e^x');
}

function rone(c){
    // if(c==1){
    //     return ''
    // }
    // return '\\r{'+(c==-1?'-':c)+'}'
    return c==1?'':'\\r{'+c+'}'
}

function ronep2(c){
    return c==1?'1':'\\r{'+c+'}'
}

function ckx(c,k){
    let bk='\\b{'+k+'}';
    return antiexb(`\\frac{`+ronep2(c)+`}{`+bk+`}e^{`+bk+`x}`,rone(c)+'e^{'+bk+'x}');
}

function ckxex(c,k){
    let bk='\\b{'+k+'}';
    return intex(`\\frac{\\p{`+ronep2(c)+`}}{\\p{`+bk+`}}\\p{e^{`+bk+`x}}`,rone(c)+'e^{'+bk+'x}');
}

function powint(c,n){
    let bn='\\b{'+n+'}';
    return antiexb('\\frac{'+ronep2(c)+'}{'+bn+'+1}'+'x^{'+bn+'+1}',rone(c)+'x^{'+bn+'}')
}

function powintex(c,n){
    let bn='\\b{'+n+'}';
    return intex('\\frac{\\p{'+ronep2(c)+'}}{\\p{'+bn+'}\\p{+}\\p{1}}}\\p{'+'x^{\\p{'+bn+'}\\p{+}\\p{1}}',rone(c)+'x^{'+bn+'}')
}

function powfracint(c,n){
    let bn='\\b{'+(-n)+'}';
    return `<p>$$\\i{\\frac{`+ronep2(c)+`}{x^{\\b{`+n+`}}}}=\\p{\\i{`+rone(c)+`x^{`+bn+`}}=}\\p{\\frac{`+ronep2(c)+`}{`+bn+`+1}}\\p{x^{`+bn+`+1}}\\C$$</p>`
}

function powfracintex(c,n){
    return {
        question:`Find $\\ds\\i{\\frac{`+ronep2(c)+`}{x^{\\b{`+n+`}}}}$`,
        steps:[
            `$$\\frac{`+ronep2(c)+`}{x^{\\b{`+n+`}}}=\\p{`+rone(c)+`x^{-\\b{`+n+`}}}$$`,
            powfracint(c,n)
        ]
    }
}

function csqrt(c){
    let rstr=rone(c).length>0?`\\p{`+rone(c)+`}`:'';
    return `$$\\i{`+rone(c)+`\\b{\\sqrt{\\bk{x}}}}=\\p{\\i{`+rstr+`\\p{x^{\\b{\\powfrac{1}{2}}}}}=}\\p{\\frac{\\p{`+ronep2(c)+`}}{\\b{\\p{\\powfrac{1}{2}}}\\p{+}\\p{1}}}\\p{x^{\\b{\\p{\\powfrac{1}{2}}}\\p{+}\\p{1}}}\\C$$`
}

function csqrtex(c){
    return {
        question:`Find $\\i{`+rone(c)+`\\b{\\sqrt{\\bk{x}}}}$`,
        steps:[
            `$$`+rone(c)+`\\b{\\sqrt{\\bk{x}}}=\\p{`+ronep2(c)+`}\\p{x^{\\p{\\b{\\powfrac{1}{2}}}}}$$`,
            csqrt(c)
        ]
    }
}

function iterms(fs,is,rs){
    let str='$$\\a{\\i{'+fs+'}&='
    if(rs.length>0){
       str=str+rs+'\\\\[10pt]&\\p{=}'
    }
    return str+is+'\\C}$$'
}

function itermsprep(fps,fss){
    let str='';
    for(let i=0;i<fps.length;i++){
        j=0;
        if(i>0&&fps[i].charAt(0)=='-'){
            j=1;
        }
        str=str+`<p>$$\\i{`+fps[i].substring(j)+`}=\\p{`+fss[i].substring(j)+`}\\C$$</p>`
    }
    return str;
}

function iterms1(fps,fss){
    let str=itermsprep(fps,fss);
    str=str+'<p>$$\\i{'+itermscombine(fps,false)+'}='+itermscombine(fss,true)+'\\C$$</p>'
    return str;
}

function itermscombine(fss,ps){
    if(fss.length==0){
        return '';
    }
    let strs=['\\p{','}'];
    if(!ps){
        strs=['',''];
    }
    let str=strs[0]+fss[0]+strs[1];
    for(let i=1;i<fss.length;i++){
        let j=0;
        let s='+';
        if(fss[i].charAt(0)=='-'){
            j=1;
            s='-'
        }
        str=str+strs[0]+s+strs[1]+strs[0]+fss[i].substring(j)+strs[1];
    }
    return str;
}

function itermsex(fs,is,rs){
    return {
        question:'Find $\\ds\\i{'+fs+'}$',
        steps:[
            iterms(fs,is,rs)
        ]
    }
}

function itermsex1(fps,fss){
    return {
        question:'Find $\\ds\\i{'+itermscombine(fps,false)+'}$',
        steps:[
            iterms1(fps,fss)
        ]
    }
}

function fofp(fps,c){
    let fs=addpause(intNoC(fps)[1]);
    return {
        question:`Find $f(x)$ such that $\\b{f'(x)}=\\b{`+fps+`}$ and $f(0)=\\r{`+c+`}$`,
        steps:[
            `<p>$$\\a{f(x)&=\\p{\\i{\\p{\\b{f'(x)}}}}\\\\[4pt]&\\p{=}\\p{\\i{\\p{\\b{`+fps+`}}}}\\\\[7pt]&\\p{=}`+fs+`\\C}$$</p>`,
            `<p>$$\\a{\\r{f(0)}&=`+fs.replaceAll('x','(0)')+`\\C\\\\[10pt]\\qquad\\p{\\btip{\\r{`+c+`}}{\\r{f(0)}=\\r{`+c+`}}}&\\p{=}\\p{\\g{C}}\\\\[4pt]\\p{\\g{C}}&\\p{=}\\p{\\g{`+c+`}}}$$</p>`,
            `<p>$$\\a{f(x)&=\\p{`+fs+`}\\C\\\\[10pt]&\\p{=}\\p{`+fs+`}\\p{+\\g{`+c+`}}}$$</p>`
        ]
    }
}

let pc=`$\\p{\\gt{plus $C$}}$`

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

function Aintab(a,b,fps,fs){
    return defint1(a,b,'\\g{'+fps+'}',fs,'Area')
}

function Rintwu(a,b,fps,fs){
    return '<p>'+qRint(a,b,fps)+`</p><p><span class='hi'>To answer this question, we find the integral of $\\g{R'(x)}$ from $x=\\pu{`+a+`}$ to $x=\\r{`+b+`}$:</span></p>`+Rint(a,b,fps,fs);
}

function Aintabwu(a,b,fps,fs){
    return qAintab(a,b,fps)+`<p><span class='hi'>To answer this question, we find the integral of $\\g{f(x)}$ from $x=\\pu{`+a+`}$ to $x=\\r{`+b+`}$:</span></p>`+Aintab(a,b,fps,fs);
}


function qAintab(a,b,fps){
    return `<p>Question: Find the area under the curve below from $x=\\pu{`+a+`}$ to $x=\\r{`+b+`}$</p><p>$f(x)=\\g{`+fps+`}$</p>`;
}

function Aintabex(a,b,fps,fs){
    return {
        question:qAintab(a,b,fps),
        steps:[
            Aintab(a,b,fps,fs)
        ]
    }
}

function Rintex(a,b,fps,fs){
    return {
        question:qRint(a,b,fps),
        steps:[
            Rint(a,b,fps,fs)
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

function areaEx(a,b,fps,strs0){
    if(strs0==null){
        strs0=['Area','f'];
    }
    a='\\pu{'+a+'}';
    b='\\r{'+b+'}';
    let fps1=convtermInt(fps);
    let fs='\\b{'+addpause(intNoC(fps1)[1])+'}';
    let fb='\\p{\\left[\\b{'+fs.replaceAll('x','('+b+')')+'}\\right]}';
    let fa='\\p{\\left[\\b{'+fs.replaceAll('x','('+a+')')+'}\\right]}';
    let strs=['\\t{'+strs0[0]+'}&=\\p{','}\\\\[10pt]&\\p{=}'];
    return {
        question:qAintab(a,b,'\\g{'+fps+'}'),
        steps:[
            (fps1!=fps?'$$'+'\\g{'+strs0[1]+'(x)}=\\p{\\g{'+addpause(fps1)+'}}$$</p><p>':'')+'$$\\begin{aligned}'+strs[0]+`\\iep{`+a+`}{`+b+`}{\\g{`+fps+`}}`+strs[1]+`\\p{`+fs+`}\\p{\\ev{`+a+`}{`+b+`}}\\\\[10pt]&\\p{=}\\p{`+fb+`}\\p{-}\\p{`+fa+`}\\end{aligned}$$`
        ]
    }
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

window.j = {
    startCollapsed: false,
    lessonNum: 11,
    lessonName: "Calculating anti-derivatives and integrals",
    intro: String.raw`<p>In this section, we will discuss how calculate anti-derivatives (also called integrals)</p><p><span class='hi'>Anti-derivatives are the opposites of  derivatives</span> in a similar way that adding and subtracting are opposites.</p>`+antiex('x','1')+antiex('x^2','2x')+antiex('x^3+x^2','3x^2+2x')+String.raw`<p>A function can have only one derivative but it can have many antiderivatives.</p><p>For example, $\b{x^2}$ and $\b{x^2}+\g{2}$ are both anti-derivatives of $2x$ because both $\b{x^2}$ and $\b{x^2}+\g{2}$ have a derivative of $2x$.<p>$\b{x^2}+\g{6}$ and $\b{x^2}\g{-4}$ are also an anti-derivatives of $2x$ because the derivative of $\b{x^2}+\g{6}$ and $\b{x^2}\g{-4}$ are also $2x$</p><p>An example of another anti-derivative of $2x$ is\p $\b{x^2}\g{-8}$</p><p>What you notice that $\b{x^2}$, $\b{x^2}+\g{2}$, $\b{x^2}+\g{6}$ and $\b{x^2}\g{-4}$ have in common?</p><p>They all have the same $\bt{variable part}$ with the only difference being $\gt{a constant added or subtracted}$</p><p>Because the derivative of a constant being added or subtracted is $0$, functions that are the same except for $\gt{a constant being added}$ will have the same derivative</p><p>This is why $\b{x^2}$ and $\b{x^2}+\g{2}$ can both be anti-derivatives of $2x$ because the are the same except $\gt{adding a constant}.$</p><p><span class='hi'>In this class, all of the possible anti-derivatives of a function always have the form $\bt{the variable part}+\gt{any constant}$</span></p><p>Since we don't know the value of $\gt{the constant}$, we use $\g{C}$ as a placeholder</p><p>With the placeholder constant, the anti-derivative becomes $\bt{the variable part}+\g{C}$</p><p>The symbol for "all possible antiderivatives" is called the integral and it looks like this:</p><p>$$\i{\rt{\{a function\}}}=\p{\bt{variable part}}\C$$</p><p>Here are some examples: </p>`+antiexv2('x','1')+antiexv2('2x^2','4x')+antiexv2('x^3+4x','3x^2+4')+antiexv2('4x','4'),
    sections: [
    {
        name: String.raw`Integral of a constant`,
        backgroundColor: "green",
        web: "Hw 3: 1, 5-7, 9; Hw 4: 1-7, 11; Hw 5: 2, 5-7; PT 2: 1-6, 8; Hw 6: 4, 7, 9-10; PT 3: 8; Hw 9: 8, 10; PF: 4, 6, 10-12, 14-15",
        book: "148",
        exam: "Up to one question on Test 2, Up to one question on Final",
        intro: String.raw`<p>In this section, we will find the integral of $\rt{a constant}.$</p><p>The derivative of $\rt{a constant}$ times $x$ is\p $\rt{that constant}$</p><p>$$\frac{d}{dx}\r{c}x=\p{\r{c}}$$</p><p>Therefore,</p><p><span class='hi'>the integral of $\rt{a constant}$ is<span class='invisible'> $\rt{that constant}$ multiplied by $x$ `+pc+`</span></span></p><p>$$\\hi{\\i{\\r{c}}=\\p{\\r{c}}\\p{x}\\C}$$</p>`,
        rightColWidth: 50,
        steps: {
            general:{
                question:String.raw`<p>Find $\i{\rt{a constant}}$</p>`,
                steps:[
                    //`<span class='hi'>The integral of $\\rt{a constant}$ is<span class='invisible'> $\\rt{that constant}$ multiplied by $x$ `+pc+`</span></span></p>
                    `$$\\hi{\\i{\\r{c}x}=\\p{\\r{c}}\\p{x}\\C}$$`,
                ]
            },
            specific:intcex(2)
        },
        examples: [
            intcex(4),
            intcex(7),
            intcex(9),
            intcex(-4),
            intcex(-2),
            intcex(4),
        ],
    },
    {
        name: String.raw`Integral of $\frac{c}{x}$`,
        backgroundColor: "green",
        web: "Hw 3: 1, 5-7, 9; Hw 4: 1-7, 11; Hw 5: 2, 5-7; PT 2: 1-6, 8; Hw 6: 4, 7, 9-10; PT 3: 8; Hw 9: 8, 10; PF: 4, 6, 10-12, 14-15",
        book: "148",
        exam: "Up to one question on Test 2, Up to one question on Final",
        intro: String.raw`<p>In this section, we will find the integral of $\rt{a constant}$ by divided by $x$</p><p>The derivative of $\rt{a constant}$ times $\ln(x)$ is \p$\rt{that constant}$ divided by $x$</p><p>$$\frac{d}{dx}\r{c}\ln(x)=\p{\frac{\p{\r{c}}}{\p{x}}}$$</p><p>Therefore,</p>`+`<p><span class='hi'>The integral of $\\rt{a constant}$ divided by $x$ is<span class='invisible'> $\\rt{that constant}$ multiplied by $\\ln(x)$ `+pc+`</span></span></p><p>$$\\hi{\\i{\\frac{\\r{c}}{x}}=\\p{\\r{c}}\\p{\\ln(x)}\\C}$$</p>`,
        rightColWidth: 50,
        steps: {
            general:{
                question:String.raw`<p>Find $\i{\frac{\rt{a constant}}{x}}$</p>`,
                steps:[
                    `$$\\hi{\\i{\\frac{\\r{c}}{x}}=\\p{\\r{c}}\\p{\\ln(x)}\\C}$$`,
                ]
            },
            specific:cdxex(2)
        },
        examples: [
            cdxex(4),
            cdxex(7),
            cdxex(9),
            cdxex(-4),
            cdxex(-2),
            cdxex(4),
        ],
    },
    {
        name: String.raw`Integral of $ce^x$`,
        backgroundColor: "green",
        web: "Hw 3: 1, 5-7, 9; Hw 4: 1-7, 11; Hw 5: 2, 5-7; PT 2: 1-6, 8; Hw 6: 4, 7, 9-10; PT 3: 8; Hw 9: 8, 10; PF: 4, 6, 10-12, 14-15",
        book: "148",
        exam: "Up to one question on Test 2, Up to one question on Final",
        intro: String.raw`<p>In this section, we will find the integral of $\rt{a constant}$ times $e^x$</p><p>The derivative of $\rt{a constant}$ multiplied by $e^x$ is\p itself</p><p>$$\frac{d}{dx}\r{c}e^x=\p{\r{c}}\p{e}^\p{x}$$</p><p>Therefore,</p>`+`<p><span class='hi'>the integral of $\\rt{a constant}$ multiplied by $e^x$ is<span class='invisible'> itself ($\\rt{that constant}$ multiplied by $e^x$ `+pc+`)</span></span></p><p>$$\\hi{\\i{\\r{c}e^x}=\\p{\\r{c}}\\p{e^x}\\C}$$</p>`,
        rightColWidth: 50,
        steps: {
            general:{
                question:String.raw`<p>Find $\i{\rt{\{a constant\}}e^x}$</p>`,
                steps:[
                    `$$\\hi{\\i{\\r{c}e^x}=\\p{\\r{c}}\\p{e^x}\\C}$$`,
                ]
            },
            specific:cex(2)
        },
        examples: [
            cex(4),
            cex(7),
            cex(9),
            cex(-4),
            cex(-2),
            cex(4),
        ],
    },
    {
        name: String.raw`Integral of $ce^{kx}$`,
        backgroundColor: "green",
        web: "Hw 3: 1, 5-7, 9; Hw 4: 1-7, 11; Hw 5: 2, 5-7; PT 2: 1-6, 8; Hw 6: 4, 7, 9-10; PT 3: 8; Hw 9: 8, 10; PF: 4, 6, 10-12, 14-15",
        book: "148",
        exam: "Up to one question on Test 2, Up to one question on Final",
        intro: String.raw`<p>In this section, we will find the integral of $\rt{a constant}$ times $e^{\bt{\{another constant\}}x}$</p><p>When calculating the derivative of $\rt{a constant}$ times $e^{\bt{another constant}x}$,\p we multiply by\p <span class="blue">the constant in the power</span></p><p>$$\frac{d}{dx}\r{c}e^{\b{b}x}=\p{\b{b}}\p{\cdot}\p{\r{c}}\p{e}^{\p{\b{b}}\p{x}}$$</p>`+`<p>Therefore,</p><p><span class='hi'>to calculate the integral of $\\rt{a constant}$ multiplied by $e^{\\bt{\{another constant\}}x}$, <span class='invisible'> divide by $\\bt{the constant in the power}$ and leave $\\rt{the constant multiplying the $e$}$ and the exponent the same</span>)</span><p>$$\\hi{\\i{\\r{c}e^{\\b{k}x}}=\\p{\\frac{\\p{\\r{c}}}{\\p{\\b{k}}}}\\p{e^{\\b{k}x}}\\C}$$</p>`,
        rightColWidth: 50,
        steps: {
            general:{
                question:String.raw`<p>Find $\i{\rt{\{a constant\}}e^{\bt{\{another constant\}}x}}$</p>`,
                steps:[
                    `$$\\hi{\\i{\\r{c}e^{\\b{k}x}}=\\p{\\frac{\\p{\\r{c}}}{\\p{\\b{k}}}}\\p{e^{\\b{k}x}}\\C}$$`,
                ]
            },
            specific:ckxex(2,6)
        },
        examples: [
            ckxex(-4,2),
            ckxex(3,-4),
            ckxex(1,9),
            ckxex(6,3),
            ckxex(-6,7),
            ckxex(-1,-3),
        ],
    },
    {
        name: String.raw`Integral of $cx^n$ without properties of exponents`,
        backgroundColor: "green",
        web: "Hw 3: 1, 5-7, 9; Hw 4: 1-7, 11; Hw 5: 2, 5-7; PT 2: 1-6, 8; Hw 6: 4, 7, 9-10; PT 3: 8; Hw 9: 8, 10; PF: 4, 6, 10-12, 14-15",
        book: "148",
        exam: "Up to one question on Test 2, Up to one question on Final",
        intro: String.raw`<p>In this section, we will find the integral of $\rt{a constant}$ times $x^{\bt{a power}}$</p><p>When taking the derivative of $\rt{a constant}$ times $\bt{a power}$,\p we multiply by $\bt{the power}$\p and\p subtract one from $\bt{the power}$</p><p>$$\frac{d}{dx}\r{c}x^{\b{n}}=\p{\b{n}}\p{\cdot}\p{\r{c}}\p{x}^{\p{\b{n}}\p{-}\p{1}}$$</p><p>Therefore,</p>`+`<p><span class='hi'>To calculate the integral of $\\rt{a constant}$ multiplied by $x^{\\bt{a power}}$, <span class='invisible'> add one to $\\bt{the power}$ </span><span class="invisible"> and</span><span class="invisible"> divide by the new power</span></span></p><p>$$\\hi{\\i{\\r{c}x^{\\b{n}}}=\\p{\\frac{\\p{\\r{c}}}{\\p{\\b{n}}\\p{+}\\p{1}}}\\p{x^{\\p{\\b{n}}\\p{+}\\p{1}}}\\C}$$</p>`,
        rightColWidth: 50,
        steps: {
            general:{
                question:String.raw`<p>Find $\i{\rt{\{a constant\}}e^x}$</p>`,
                steps:[
                    `$$\\hi{\\i{\\r{c}x^{\\b{n}}}=\\p{\\frac{\\p{\\r{c}}}{\\p{\\b{n}}\\p{+}\\p{1}}}\\p{x^{\\p{\\b{n}}\\p{+}\\p{1}}}\\C}$$`,
                ]
            },
            specific:powintex(2,6)
        },
        examples: [
            powintex(-4,2),
            powintex(3,1),
            powintex(1,3),
            powintex(2,-5),
            powintex(4,9),
            powintex(-4,-4),
        ],
    },
    {
        name: String.raw`Integral of $c\sqrt{x}$`,
        backgroundColor: "green",
        web: "Hw 3: 1, 5-7, 9; Hw 4: 1-7, 11; Hw 5: 2, 5-7; PT 2: 1-6, 8; Hw 6: 4, 7, 9-10; PT 3: 8; Hw 9: 8, 10; PF: 4, 6, 10-12, 14-15",
        book: "148",
        exam: "Up to one question on Test 2, Up to one question on Final",
        intro: String.raw`<p>In this section, we will find the integral of $\rt{a constant}$ times $\b{\sqrt{\bk{x}}}$</p><p>To calculate the integral of $\rt{a constant}$ times $\b{\sqrt{\bk{x}}}$, we use the property that</p><p>$$\hi{\r{c}\b{\sqrt{\bk{x}}}=\p{\r{c}}\p{x^{\b{\powfrac{1}{2}}}}}$$</p>`+`<p>and then use the integral power rule:</p><p>`+`$$\\hi{\\i{\\r{c}x^{\\b{n}}}=\\p{\\frac{\\r{c}}{\\b{n}+1}}\\p{x^{\\b{n}+1}}\\C}$$`+`</p>`,
        rightColWidth: 50,
        steps: {
            general:{
                question:String.raw`<p>Find $\i{\rt{\{a constant\}}\b{\sqrt{\bk{x}}}}$</p>`,
                steps:[
                    String.raw`<p>Use the property that</p><p>$$\hi{\r{c}\b{\sqrt{\bk{x}}}=\p{\r{c}}\p{x^{\b{\powfrac{1}{2}}}}}$$</p>`,
                    `$$\\hi{\\i{\\r{c}x^{\\b{n}}}=\\p{\\frac{\\r{c}}{\\b{n}+1}}\\p{x^{\\b{n}+1}}\\C}$$`,
                ]
            },
            specific:csqrtex(8)
        },
        examples: [
            csqrtex(4),
            csqrtex(7),
            csqrtex(9),
            csqrtex(-4),
            csqrtex(-2),
            csqrtex(4),
        ],
    },
    {
        name: String.raw`Integral of a constant divided by $x$ to a power other than one`,
        backgroundColor: "green",
        web: "Hw 3: 1, 5-7, 9; Hw 4: 1-7, 11; Hw 5: 2, 5-7; PT 2: 1-6, 8; Hw 6: 4, 7, 9-10; PT 3: 8; Hw 9: 8, 10; PF: 4, 6, 10-12, 14-15",
        book: "148",
        exam: "Up to one question on Test 2, Up to one question on Final",
        intro: String.raw`<p>In this section, we will find the integral of $\rt{a constant}$ divided by $x^{\bt{power other than one}}$</p><p><b>Note: To calculate the integral of $\r{\textbf{a constant}}$ divided by $x^{\b{1}}$ use the fact that</b></p><p>$$\i{\frac{\r{c}}{x}}= \p{\r{c}\ln(x)}\C$$</p><p>To calculate the integral of $\rt{a constant}$ divided by $x^{\bt{a power}}$, we use the property that</p><p>$$\hi{\frac{\r{c}}{x^{\b{n}}}=\p{\r{c}}\p{x^{-\b{n}}}}$$</p><p>and then use the integral power rule:</p>`+`<p>$$\\hi{\\i{\\r{c}x^{\\b{n}}}=\\p{\\frac{\\r{c}}{\\b{n}+1}}\\p{x^{\\b{n}+1}}\\C}$$</p>`,
        rightColWidth: 50,
        steps: {
            general:{
                question:String.raw`<p>Find $\i{\frac{\rt{a constant}}{x^{\bt{a power other than 1}}}}$</p>`,
                steps:[
                    String.raw`<p>Use the property that</p><p>$$\hi{\frac{\r{c}}{x^{\b{n}}}=\p{\r{c}}\p{x^{-\b{n}}}}$$</p>`,
                    `$$\\hi{\\i{\\r{c}x^{\\b{n}}}=\\p{\\frac{\\r{c}}{\\b{n}+1}}\\p{x^{\\b{n}+1}}\\C}$$`,
                ]
            },
            specific:powfracintex(6,8)
        },
        examples: [
            powfracintex(1,4),
            powfracintex(3,2),
            powfracintex(-7,6),
            powfracintex(-3,9),
            powfracintex(5,2),
            powfracintex(8,3)
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
            specific:antiderivex(`8-3e^x+3x^6`)
        },
        examples: [
            antiderivex(`3x+1-4e^{2x}`),
            antiderivex(`x^3-2x+\\frac{3}{x}`),
            antiderivex(`\\frac{7}{x^3}+9e^x+4`),
            antiderivex(`-4\\sqrt{x}+2e^{2x}+x`),
            antiderivex(`\\frac{-6}{x^4}+e^{3x}+3x^2`),
            antiderivex(`3x^4-x+1`),
        ],
    },
    {
        name: String.raw`Given $f'(x)$ and $f(0)$, find $f(x)$`,
        backgroundColor: "green",
        web: "Hw 3: 1, 5-7, 9; Hw 4: 1-7, 11; Hw 5: 2, 5-7; PT 2: 1-6, 8; Hw 6: 4, 7, 9-10; PT 3: 8; Hw 9: 8, 10; PF: 4, 6, 10-12, 14-15",
        book: "148",
        exam: "Up to one question on Test 2, Up to one question on Final",
        intro: String.raw`<p>Given $\b{f'(x)}$ and $\r{f(0)}$, we need want to find $f(x)$.</p><p>For example, suppose that $\b{f'(x)}=\b{x^2+3}$ and $\r{f(0)}=\r{3}$</p><p>To get from $f'(x)$ to $f(x)$\p (in other words \pto get rid of the derivative),\p we have to\p do the opposite of taking a derivative.</p><p>So we need to find\p the integral of\p $f'(x)$:</p><p>$$\a{f(x)&=\p{\i{\p{\b{f'(x)}}}}\\[4pt]&\p{=}\p{\i{\p{\b{x^2+3}}}}\\[7pt]&\p{=}\p{\frac{x^3}{3}}\p{+}\p{3x}\C}$$</p><p>We are not done finding $f(x)$ because\p we need to determine the value of \p $\g{C}$</p><p>We find the value of $\g{C}$ by\p plugging in $x=0$\p into\p $f(x)$ and\p using the fact $\r{f(0)}=\r{3}$:</p><p>$$\a{\r{f(0)}&=\p{\frac{(0)^3}{3}}\p{+}\p{3(0)}\C\\[10pt]\qquad\p{\btip{\r{3}}{\r{f(0)}=\r{3}}}&\p{=}\p{\g{C}}}$$</p><p>Finally\p we plug in $\g{C}=\g{3}$\p back into the $f(x)$ equation:</p><p>$$\a{f(x)&=\p{\frac{x^3}{3}}\p{+}\p{3x}\C\\[10pt]&\p{=}\p{\frac{x^3}{3}}\p{+}\p{3x}\p{+}\p{\g{3}}}$$</p>`,
        rightColWidth: 50,
        steps: {
            general:{
                question:String.raw`<p>Find $f(x)$ such that $\b{f'(x)}=\bt{a function}$ and $f(0)=\rt{a number}$</p>`,
                steps:[
                    `<p>Find the \\p integral of\\p $\\b{f'(x)}$</p><p>$$f(x)=\\p{\\i{\\b{\\p{f'(x)}}}}$$</p><p><b>Note: don't forget the $\\C$</b></p>`,
                    `<p>Plug in $x=0$ into \\p $\\btip{\\t{the equation for }f(x)}{\\t{the equation found in step 1}}$ and use \\p$f(0)=\\rt{a number}$ to find \\p$\\g{C}$</p>`,
                    `<p>Plug in the value of \\p$\\g{C}$ into\\p the $f(x)$ from step 1</p>`
                ]
            },
            specific:fofp('2x^4+6',5)
        },
        examples: [
            fofp('4x+5',4),
            fofp('7x^2-1',2),
            fofp('9x^3+1',-1),
            fofp('x^3+2x',9),
            fofp('-3x^2+x',3),
            fofp('-x^4+x^3',8),
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
            specific:defintex(3,4,'4+3e^{2x}')//defintex(3,4,'4+3e^{2x}','4x\\p{+}\\p{\\frac{3}{2}e^{2x}}','')
        },
        examples: [
            defintex(4,6,'9x^2+\\frac{3}{x}'),
            defintex(5,9,'x^3+2e^x'),
            defintex(1,3,'\\frac{7}{x^3}+5e^{\\m3x}'),
            defintex(0,5,'8e^x+8\\sqrt{x}'),
            defintex(-2,1,'9x^4-3x^2'),
            defintex(-2,-1,'x^3-x')
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
                    `$$\\hi{\\t{Marginal Revenue}=\\p{\\ie{\\pu{a}}{\\r{b}}{\\p{\\g{R'(x)}}}}}$$`
                ]
            },
            specific:Rintex(200,300,'x^2+4','\\p{\\frac{1}{2+1}}\\p{x^{2+1}}\\p{+}\\p{4}\\p{x}')
        },
        examples: [
            Rintex(100,500,'2x^3+x','\\p{\\frac{2}{3+1}}\\p{x^{3+1}}\\p{+}\\p{\\frac{1}{1+1}}\\p{x^{1+1}}')
        ],
    },
    {
        name: String.raw`Calculating Area Under a Curve With Given Endpoints`,
        backgroundColor: "green",
        web: "Hw 3: 1, 5-7, 9; Hw 4: 1-7, 11; Hw 5: 2, 5-7; PT 2: 1-6, 8; Hw 6: 4, 7, 9-10; PT 3: 8; Hw 9: 8, 10; PF: 4, 6, 10-12, 14-15",
        book: "148",
        exam: "Up to one question on Test 2, Up to one question on Final",
        intro: '<p>In  this section, we will discuss how to\\p calculate the area under a curve\\p from $x=\\pu{a}$' +
            ' to' +
            ' $x=\\r{b}$</p>'+'<p>The area under the curve $y=\\g{f(x)}$\\p from $x=\\pu{a}$ to $x=\\r{b}$ is' +
            ' calculated' +
            ' with' +
            '\\p the equation $$\\p{\\hi{\\t{Area}=\\iep{\\pu{a}}{\\r{b}}{f(x)}}}$$</p>',
            //+Aintabwu(1000,1300,'150x-1740','\\p{\\frac{150}{1+1}}\\p{x^{1+1}}\\p{-}\\p{1740}\\p{x}'),
        rightColWidth: 90,
        steps: {
            general:{
                question:qAintab('a','b','\\t{a function}'),
                steps:[
                    `$$\\hi{\\t{Area}=\\iep{\\pu{a}}{\\r{b}}{\\g{f(x)}}}$$`
                ]
            },
            specific:areaEx(2,3,'x^2+4')
        },
        examples: [
            areaEx(4,6,'9x^2+\\frac{3}{x}'),
            areaEx(5,9,'x^3+2e^x'),
            areaEx(1,3,'\\frac{7}{x^3}+5e^{\\m3x}'),
            areaEx(0,5,'8e^x+8\\sqrt{x}'),
            areaEx(-2,1,'9x^4-3x^2'),
            areaEx(-2,-1,'x^3-x')
        ],
    },
    ],
  }