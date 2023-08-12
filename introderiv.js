rp=function(str){
    return str.replaceAll('\\p{','\\pn{')
}
coef=function(a){
    if(a==1){
        return ''
    }
    return a==-1?'\\p{-}':'\\p{'+a+'}';
}
derivConst=function(a){
    return {
        question:String.raw`<p>Let $f(x)=`+a+`$</p><p>Calculate $f'(x)$</p>`,
        steps:[`$f'(x)\\p{=}\\p{0}$`]
    }
}
derivCx=function(c){
    return {
        question:String.raw`<p>Let $f(x)=\pu{`+rp(coef(c))+`}x$</p><p>Calculate $f'(x)$</p>`,
        steps:[`$f'(x)\\p{=}\\p{\\pu{`+c+`}}$`]
    }
}
powr=function(c,n){
    n='\\p{\\r{'+n+'}}'
    let n1=n.replaceAll('\\frac','\\powfrac')
    return{
        question:String.raw`<p>Let $f(x)=\pu{`+rp(coef(c))+`}x^{\\r{`+n1+`}}$</p><p>Calculate $f'(x)$</p>`,
        steps:[
            `$f'(x)\\p{=}`+n+'\\p{\\cdot}\\pu{'+coef(c)+'}\\p{x}^{'+n1+'\\p{-}\\p{1}}$'
        ]
    }
}
powrex=function(c,n){
    n='\\p{\\r{'+n+'}}'
    let n1=n.replaceAll('\\frac','\\powfrac')
    c='\\p{\\pu{'+c+'}}'
    return '\\p{\\frac{d}{dx}}'+c+'\\p{x}^'+n1+'\\p{=}'+n+'\\p{\\cdot}'+c+'\\p{x}^{'+n1+'\\p{-}\\p{1}}'
}
cderivex=function(c){
    return '\\p{\\frac{d}{dx}}\\p{\\pu{'+c+'}}\\p{=}\\p{0}'
}
cxderivex=function(c){
    return '\\p{\\frac{d}{dx}}\\p{\\pu{'+c+'}}\\p{x}\\p{=}\\p{\\pu{'+c+'}}'
}
//Only works for n=+-1 and m=integer or m=1
powrpropexp=function(c,n,m){
    n=n*Math.sign(m);
    m=Math.abs(m);
    c='\\pu{'+coef(c)+'}'
    let pow=m==1?'\\r{\\p{'+n+'}}':'\\r{\\p{'+(n<0?'-':'')+'\\frac{\\p{'+Math.abs(n)+'}}{\\p{'+m+'}}}}';
    let powexp=pow.replaceAll('frac','powfrac')
    let fstr1='\\p{x}^\\p{'+Math.abs(n)+'}';
    if(m!=1){
        fstr1=('\\p{\\sqrt[\\p{'+m+'}]{\\p{x}}}').replaceAll('[\\p{2}]','')
    }
    let fstr=c+fstr1
    if(n<0){
        fstr='\\p{\\frac{'+c+'}{'+fstr1+'}}'
    }
    return{
        question:String.raw`<p>Let $f(x)=`+rp(fstr)+`$</p><p>Calculate $f'(x)$</p>`,
        steps:[
            m!=1||n<0?'$\\p{f(x)}\\p{=}'+c+'\\p{x}^'+powexp+'$':'',
            `$$f'(x)\\p{=}`+pow+'\\p{\\cdot}'+coef(c)+'\\p{x}^{'+powexp+'\\p{-}\\p{1}}$$',
        ]
    }
}
diffetx=function(str){
    let i=str.search('e^x')
    let c=parsec(str.slice(0,i-2))
    let cs='\\b{'+c+'}';
    if(c==1){
        cs='';
    }
    return ['\\p{'+cs+'}\\p{\\p{e}\\p{^x}}',cs+'e^x']
}

diffceax=function(str){
    let i=str.search('e\\^{');
    let c=parsec(str.slice(0,i));
    c=c!=1?'\\b{'+c+'}':'';
    let exp=str.substring(i+3);
    let j=exp.search('x')
    let a=parsec(exp.slice(0,j));
    return [`\\p{`+c+`}\\p{\\cdot}\\p{\\r{`+a+`}}\\p{e^{\\p{\\r{`+a+`}}\\p{x}}}`,``+c+`e^{\\r{`+a+`}x}`]
}

diffc=function(str){
    return ['0'];
}

diffcx=function(str){
    str=[str.substring(0,str.length-1)];
    return str==''?'1':str;
}

addpausepart=function(str,strs1){
    let strs=str.split(strs1[0])
    let strs2=strs1.subarray(1);
    let returnstring=addpausepart(strs1[0],strs2);
    for(let j=1;j<strs.length;j++){
        returnstring=returnstring+strs1[0]+addpausepart(strs1[j],strs2)
    }
    return returnstring;
}

addpause=function(str){
    str=str.replaceAll(/(\\sqrt.*\{.+?\})/g,'\\p{$1}')
    str=str.replaceAll(/(\\frac\{.+?\}\{.+?\})/g,'\\p{$1}')
    str=str.replaceAll(/(\\powfrac\{.+?\}\{.+?\})/g,'\\p{$1}')
    str=str.replaceAll('+','\\p{+}').replaceAll('-','\\p{-}')
    str=str.replaceAll('x','\\p{x}')
    str=str.replaceAll('\\m','\\p{\\m}')
    str=str.replaceAll('\\cdot','\\p{\\cdot}')
    return str.replaceAll(/([0-9]+)/g,'\\p{$1}')
}

sub=function(str,x,xval){
    return str.replaceAll(x,'{('+xval+')}');
}
parsec=function(c){
    if(c=='-'){
        return -1;
    }
    return c==''?1:parseInt(c);
}

diffcxn=function(str){
    let i=str.search('x\\^');
    let c=str.slice(0,i);//parsec
    let n=str.substring(i+2).replaceAll('powfrac','frac');//parseInt
    let n1=n.replaceAll('frac','powfrac')
    return [n+'\\cdot'+c+'x^{'+n1+'\\p{-}\\p{1}}']
}

// convterm=function(str){
//     str=str.replace(/\\sqrt\[(.*)\]\{(.*)\}/,'$2^{\\powfrac{1}{$1}}}')
//     str=str.replace(/\\sqrt\{(.*)\}/,'$1^\\powfrac{1}{2}')
//     str=str.replace(/\\frac\{(.*)\}\{x\}/,'$1x\\^{\\m1}')
//     return str.replace(/\\frac\{(.*)\}\{(.*)\^(.*)\}/,'$1$2\\^{\\m$3}')
// }

convterm=function(str){
    str=str.replaceAll(/\\sqrt\[(.+?)\]\{(.+?)\}/g,'$2^\\powfrac{1}{$1}')
    str=str.replace(/\\sqrt\{(.+?)\}/g,'$1^\\powfrac{1}{2}')
    str=str.replace(/\\frac\{([0-9]+)\}\{x\}/g,'$1x\\^{\\m1}')
    return str.replace(/\\frac\{([0-9]+)\}\{(.?)\^(.?)\}/g,'$1$2\\^{\\m$3}')
}

diffterm=function(str){
    if(str==''){
        return [''];
    }
    if(!str.includes('x')){
        return diffc(str)
    }
    else if(!str.includes('^')){
        return diffcx(str)
    }
    else if(str.includes('x^')){
        return diffcxn(str)
    }
    else if(str.includes('e^{')){
        return diffceax(str)
    }
    else{
        return diffetx(str)
    }
}

findChar=function(str,chars){
    let is=[];
    for(let i=0;i<str.length;i++){
        for(let j=0;j<chars.length;j++){
            if(str[i]==chars[j]){
                is.push(i)
            }
        }
    }
    return is;
}
convterms=function(str){
    let newstr='';
    let is=findChar(str,['+','-'])
    let terms=str.split(/[+-]/)
    for(let i=0;i<terms.length;i++){
        let str1=convterm(terms[i])
        let str2=i>0?str[is[i-1]]:''
        newstr=newstr+str2+str1;
    }
    return newstr;
}
diffterms=function(str){
    let fps=deriv1(str);
    return `$$\\begin{aligned}f(x)&\\p{=}`+addpause(str)+`\\\\[7pt]\\p{f'(x)}&\\p{=}`+addpause(fps)+'\\end{aligned}$$';
}
deriv1=function(str){
    let fps='';
    let is=findChar(str,['+','-'])
    let terms=str.split(/[+-]/)
    for(let i=0;i<terms.length;i++){
        let strs1=diffterm(terms[i])
        let str1='\\p{'+strs1[0]+'}';
        let str2=i>0?'\\p{'+str[is[i-1]]+'}':''
        fps=fps+str2+str1;
    }
    return fps
}
aps=function(str){
    return str.replaceAll('+','\\p{+}').replaceAll('-','\\p{-}')
}

diffex=function(fs){
    let fs1=convterms(fs)
    return {
        question:'<p>Let $f(x)='+rp(fs)+`.$</p><p>Find $f'(x)$</p>`,
        steps:[
            fs.includes('frac')||fs.includes('\\sqrt')?'$f(x)\\p{=}'+addpause(fs1)+'$':'',
            diffterms(fs1)
        ]
    }
}
deriv=function(fs){
    let fs1=convterms(fs);
    let returnstring='$$\\begin{aligned}'+fs.equals(fs1)?'':'f(x)&\\p{=}'+addpause(fs1)+'\\\\[7pt]\\p';
    return returnstring+'{f\'(x)}&\\p{=}'+deriv1(fs)+'\\end{aligned}$$'
}
fpaex=function(fs,a){
    let str=convterms(fs)
    let str1='f\'(x)&\\p{=}'+addpause(deriv1(str))
    let str2='\\p{f\'(\\r{'+a+'})}&\\p{=}'+sub(addpause(deriv1(str)),'x','\\r{'+a+'}')
    return {
        question:'<p>Let $f(x)='+rp(fs)+`.$</p><p>Find $f'(\\r{`+a+`})$</p>`,
        steps:[
            diffterms(str),
            '$$\\begin{aligned}'+str1+'\\\\[4pt]'+str2+'\\end{aligned}$$'
        ]
    }}
let propexp=String.raw`$$\begin{aligned}\g{\p{\frac{\b{c}}{\sqrt{\bk{x}}}}}&\p{=}\p{\b{c}}\p{x}^{\g{\p{-}\p{\powfrac{1}{2}}}}\qquad&\g{\p{\frac{\b{c}}{\bk{x}}}}&\p{=}\p{\b{c}}\p{x}^{\g{\p{-}\p{1}}}\qquad&\p{\b{c}\g{\sqrt{\bk{x}}}}&\p{=}\p{\b{c}}\p{x}^{\g{\p{\powfrac{1}{2}}}}\\\\[20pt]\g{\p{\frac{\b{c}}{\sqrt[\r{n}]{\bk{x}}}}}&\p{=}\p{x}^{\g{\p{-}\p{\powfrac{\p{1}}{\p{\r{n}}}}}}\qquad&\g{\p{\frac{\b{c}}{\bk{x}^{\r{n}}}}}&\p{=}\p{\b{c}}\p{x}^{\p{\g{-}}\p{\r{n}}}\qquad&\p{\b{c}\g{\sqrt[\r{n}]{\bk{x}}}}&\p{=}\p{\b{c}}\p{x}^{\g{\p{\powfrac{\p{1}}{\p{\r{n}}}}}}\end{aligned}$$`
velaccex=function(s,v,a,t1){
    let vstr='v(t)&\\p{=}'+addpause(v).replaceAll('x','t');
    let astr='a(t)&\\p{=}'+addpause(a).replaceAll('x','t');
    return{
        question:String.raw`<p>$s(t)=`+s+`$</p><p>(a) Find $v(t)$</p><p>(b) Find $a(t)$</p><p>(c) Find $v(\\r{`+t1+`})$</p><p>(d) Find $a(\\r{`+t1+`})$</p>`,
        steps:[
            '$$\\begin{aligned}'+vstr+'\\end{aligned}$$',
            '$$\\begin{aligned}'+vstr+'\\\\[4pt]'+astr+'\\end{aligned}$$',
            '$$\\begin{aligned}'+vstr+'\\\\[4pt]v(\\r{'+t1+'})&\\p{=}'+sub(addpause(v),'x','\\r{'+t1+'}')+'\\end{aligned}$$',
            '$$\\begin{aligned}'+astr+'\\\\[4pt]a(\\r{'+t1+'})&\\p{=}'+sub(addpause(a),'x','\\r{'+t1+'}')+'\\end{aligned}$$',
        ]
    }
}
window.j = {
    startCollapsed: false,
    lessonNum: 13,
    lessonName: "Calculating Derivatives Part 1",
    intro:String.raw`<p>In this section,\p we will discuss\p how to calculate\p derivatives</p><p>There are two ways\p to\p write the derivative\p of $f(x)$</p><p>The derivative\p of $f(x)$\p can be written as\p $f'(x)$\p or\p $\frac{d}{dx}f(x)$</p><p>For example,\p if $f(x)=x^2$,\p $f'(x)$\p and \p $\frac{d}{dx}\p{x^2}$\p both represent\p the derivative of\p $f(x)$.</p>`,
    sections:[
        {
            name: String.raw`Calculating the Derivative of a Constant`,
            intro: String.raw`<p>In this section,\p we will discuss how to\p calculate\p the derivative of \p a constant</p><p>A constant is\p a function that\p doesn't have $x$</p><p>The dervative measures\p how fast $f(x)$ changes\p as\p $x$ changes.</p><p>Since a constant\p does not change\p when\p $x$ changes,\p the derivative of a constant\p is\p $0$</p>`,
            rightColWidth: 90,
            steps: {
                general:{
                    question:String.raw`<p>Let $f(x)=\t{\{something without $x$\}}$</p><p>Calculate $f'(x)$</p>`,
                    steps:[
                        String.raw`<p><span class="hi"><span class="invisible">The derivative of</span><span class="invisible"> something without $x$</span><span class="invisible"> is</span><span class="invisible"> $0$</span></span></p>`
                    ]
                },
                specific:derivConst('4^3')
            },
            examples: [

            ],
        },
        {
            name: String.raw`Calculating the Derivative of a constant times $x$`,
            intro: String.raw`<p>In this section,\p we discuss how to\p calculate\p the derivative of \p a constant times $x$</p><p>The dervative measures\p the slope at a point</p><p>If $\pu{c}$ is a constant,\p then the slope of $f(x)=\pu{c}x$\p is\p $\pu{c}$</p><p>Therefore,\p the derivative of $f(x)=\pu{c}x$\p is\p $f'(x)\p{=}\p{\pu{c}}$</p>`,
            rightColWidth: 90,
            steps: {
                general:{
                    question:String.raw`<p>Let $f(x)=cx$</p><p>Calculate $f'(x)$</p>`,
                    steps:[
                        String.raw`<p><span class="hi"><span class="invisible">The derivative of $\put{a constant}$ times $x$</span><span class="invisible"> is </span><span class="invisible">$\put{that constant}$</span></span>$$\p{\frac{d}{dx}}\p{\left(\p{\pu{c}}\p{x}\right)}\p{=}\p{\pu{c}}$$</p>`
                    ]
                },
                specific:derivCx(10)
            },
            examples: [

            ],
        },
        {
            name: String.raw`Calculating the Derivative of a constant times $x^n$`,
            intro: String.raw`<p>In this section,\p we discuss how to\p calculate\p the derivative of \p $\pu{c}x^{\r{n}}$</p><p>When calculating the derivative of\p $\pu{c}x^{\r{n}}$,\p we use\p the power rule:</p><p><span class="hi"><span class="invisible">To calculate the derivative of</span><span class="invisible"> a $\put{constant}$ times $x$ to $\rt{a power}$,</span><span class="invisible"> multiply by</span><span class="invisible"> $\rt{the power}$</span><span class="invisible"> and</span><span class="invisible"> subtract </span><span class="invisible">one</span><span class="invisible"> from</span><span class="invisible"> $\rt{the power}$</span></span></p><p>$\frac{d}{dx}\p{\pu{c}}\p{x}^\p{\r{n}}\p{=}\p{\r{n}}\p{\cdot}\p{\pu{c}}\p{x}^{\p{\r{n}}\p{-}\p{1}}$</p>`,
            rightColWidth: 90,
            steps: {
                general:{
                    question:String.raw`<p>Let $f(x)=\pu{c}x^\r{n}$</p><p>Calculate $f'(x)$</p>`,
                    steps:[
                        String.raw`<p><span class="hi"><span class="invisible">To calculate the derivative of</span><span class="invisible"> a $\put{constant}$ times $x$ to $\rt{a power}$,</span><span class="invisible"> multiply by</span><span class="invisible"> $\rt{the power}$</span><span class="invisible"> and</span><span class="invisible"> subtract </span><span class="invisible">one</span><span class="invisible"> from</span><span class="invisible"> $\rt{the power}$</span></span></p><p>$\frac{d}{dx}\p{\pu{c}}\p{x}^\p{\r{n}}\p{=}\p{\r{n}}\p{\cdot}\p{\pu{c}}\p{x}^{\p{\r{n}}\p{-}\p{1}}$</p>`,
                    ]
                },
                specific:powr(3,5)
            },
            examples: [

            ],
        },
        {
            name: String.raw`Power Rule With Properties of Exponents`,
            intro: String.raw`<p>In this section,\p we discuss how to\p calculate\p derivatives \pusing\p the power rule\p combined with\p properties of exponents</p>`,
            rightColWidth: 90,
            steps: {
                general:{
                    question:String.raw`<p>Let $f(x)=\t{\{an equation\}}$</p><p>Calculate $f'(x)$</p>`,
                    steps:[
                        String.raw`Rewrite the equation\p in the form\p $\btip{\b{c}x^{\r{n}}}{\bt{a constant}\t{ times }x\t{ to}\rt{ a power}}$\p using\p the following\p properties of exponents:`+propexp,
                        String.raw`<p><span class="hi"><span class="invisible">To calculate the derivative of</span><span class="invisible"> a $\put{constant}$ times $x$ to $\rt{a power}$,</span><span class="invisible"> multiply by</span><span class="invisible"> $\rt{the power}$</span><span class="invisible"> and</span><span class="invisible"> subtract </span><span class="invisible">one</span><span class="invisible"> from</span><span class="invisible"> $\rt{the power}$</span></span></p><p>$\frac{d}{dx}\p{\pu{c}}\p{x}^\p{\r{n}}\p{=}\p{\r{n}}\p{\cdot}\p{\pu{c}}\p{x}^{\p{\r{n}}\p{-}\p{1}}$</p>`,
                    ]
                },
                specific:powrpropexp(2,1,4)
            },
            examples: [
                powrpropexp(2,-1,2),
                powrpropexp(4,-3,1)
            ],
        },
        {
            name: String.raw`Derivatives of Equations With Multiple Terms`,
            intro: String.raw`<p>In this section,\p we discuss how to\p calculate\p the derivatives \p of terms \p being added or subtracted</p><p>First,\p let's review\p the derivative rules\p we have covered so far</p><p><table><tr><th>Formula</th><th>Example 1</th><th>Example 2</th><th>Description</th></tr><tr><td>$\hi{`+cderivex('c')+`}$</td><td>$`+cderivex('9^3+\\sqrt{2}')+`$</td><td>$`+cderivex('91')+String.raw`$</td><td><span class="hi"><span class="invisible">The derivative of</span><span class="invisible"> something without $x$</span><span class="invisible"> is</span><span class="invisible"> $0$</span></span></td></tr><tr><tr><td>$\hi{`+cxderivex('c')+`}$</td><td>$`+cxderivex('-12')+`$</td><td>$`+cxderivex('4')+String.raw`$</td><td><span class="hi"><span class="invisible">The derivative of $\put{a constant}$ times $x$</span><span class="invisible"> is </span><span class="invisible">$\put{that constant}$</span></span></td></tr><tr><tr><td>$\hi{`+powrex('c','n')+`}$</td><td>$`+powrex(2,-4)+`$</td><td>$`+powrex(1,'\\frac{1}{2}')+String.raw`$</td><td><span class="hi"><span class="invisible">To calculate the derivative of</span><span class="invisible"> a $\put{constant}$ times $x$ to $\rt{a power}$,</span><span class="invisible"> multiply by</span><span class="invisible"> $\rt{the power}$</span><span class="invisible"> and</span><span class="invisible"> subtract </span><span class="invisible">one</span><span class="invisible"> from</span><span class="invisible"> $\rt{the power}$</span></span></td></tr></table></p><p>We also used\p the following properties of\p exponents\p to\p calculate derivatives`+propexp+String.raw`</p><p>The last rule we will discuss\p is \phow to\p calculate the derivative of\p terms being\p added\p or\p subtracted</p><p><span class="hi">When calculating the derivative of<span class="invisible"> terms being</span><span class="invisible"> added</span><span class="invisible"> or</span><span class="invisible"> subtracted,</span><span class="invisible"> calculate the derivative </span><span class="invisible"> of each term separately</span></span></p>`,
            rightColWidth: 90,
            steps: {
                general:{
                    question:String.raw`<p>Let $f(x)=\t{\{an equation with terms being added or subtracted\}}$</p><p>Calculate $f'(x)$</p>`,
                    steps:[
                        String.raw`Remove\p square roots\p and\p fractions\p using\p the following\p properties of exponents`+propexp,
                        String.raw`Calculate\p the derivative\p of each term\p using\p the following\p derivative rules$$\begin{aligned}`+(cderivex('c')+`\\\\[10pt]`+cxderivex('c')+`\\\\[10pt]`+powrex('c','n')).replaceAll('\\p{=}','&\\p{=}')+`\\end{aligned}$$`
                    ]
                },
                specific:diffex('-\\sqrt{x}+x+\\sqrt{x}')
            },
            examples: [
                // powrpropexp(2,-1,2),
                // powrpropexp(4,-3,1)
            ],
        },
        {
            name: String.raw`Calculating $f'(a)$`,
            intro: String.raw`<p>In this section,\p we discuss how to\p calculate\p $f'(\r{a})$</p>`,
            rightColWidth: 90,
            steps: {
                general:{
                    question:String.raw`<p>Let $f(x)=\t{\{an equation\}}$</p><p>Calculate $f'(\r{a})$</p>`,
                    steps:[
                        String.raw`Calculate\p $f'(x)$`,
                        String.raw`Calculate\p $f'(\r{a})$\p by\p replacing\p every\p $x$\p with \p$\r{a}$`
                    ]
                },
                specific:fpaex('x^2','1')
            },
            examples: [
            ],
        },
        {
            name: String.raw`Calculating velocity and acceleration`,
            intro: String.raw`<p>In this section,\p we discuss how to\p calculate\p velocity\p and\p acceleration</p>`,
            rightColWidth: 90,
            steps: {
                general:{
                    question:String.raw`<p>$s(t)=\t{\{an equation\}}$</p><p>(a) Find $v(t)$</p><p>(b) Find $a(t)$</p><p>(c) Find $v(\r{t_1})$</p><p>(d) Find $a(\r{t_1})$</p>`,
                    steps:[
                        String.raw`To get\p $v(t)$\p, take the derivative of\p $s(t)$`,
                        String.raw`To get\p $a(t)$\p, take the derivative of\p $v(t)$`,
                        String.raw`To get\p $v(\r{t_1})$\p, plug in\p $\r{t_1}$\p for $t$\p in the \p $v(t)$ equation`,
                        String.raw`To get\p $v(\r{t_1})$\p, plug in\p $\r{t_1}$\p for $t$\p in the \p $a(t)$ equation`,
                    ]
                },
                specific:velaccex('x^3+4x^2+7x+13','3x^2+8x+7+0','6x+8+0',3)
            },
            examples: [
            ],
        }
    ]
}