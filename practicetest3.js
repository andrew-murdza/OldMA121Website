antiex=function(fs,fps){
    return `<p>The derivative of $\\b{`+fs+`}$ is\\p $\\r{`+fps+`}$\\p, so an anti-derivative of $\\r{`+fps+`}$ is\\p $\\b{`+fs+`}$</p>`
}


antiexb=function(fs,fps){
    return `<p>The derivative of $`+fs+`$ is\\p $`+fps+`$\\p, so the integral of $`+fps+`$ is\\p $`+fs+`\\C$</p><p>$$\\i{`+fps+`}=\\p{`+fs+`}\\C$$</p>`
}

antiexv2=function(fs,fps){
    return antiexb('\\b{'+fs+'}','\\r{'+fps+'}');
}

rone=function(c){
    // if(c==1){
    //     return ''
    // }
    // return '\\r{'+(c==-1?'-':c)+'}'
    return c==1?'':'\\r{'+c+'}'
}

ronep2=function(c){
    return c==1?'1':'\\r{'+c+'}'
}

iterms=function(fs,is,rs){
    str='$$\\a{\\i{'+fs+'}&='
    if(rs.length>0){
       str=str+rs+'\\\\[10pt]&\\p{=}' 
    }
    return str+is+'\\C}$$'
}

itermsprep=function(fps,fss){
    str='';
    for(let i=0;i<fps.length;i++){
        j=0;
        if(i>0&&fps[i].charAt(0)=='-'){
            j=1;
        }
        str=str+`<p>$$\\i{`+fps[i].substring(j)+`}=\\p{`+fss[i].substring(j)+`}\\C$$</p>`
    }
    return str;
}

iterms1=function(fps,fss){
    str=itermsprep(fps,fss);
    str=str+'<p>$$\\i{'+itermscombine(fps,false)+'}='+itermscombine(fss,true)+'\\C$$</p>'
    return str;
}

itermscombine=function(fss,ps){
    if(fss.length==0){
        return '';
    }
    strs=['\\p{','}'];
    if(!ps){
        strs=['',''];
    }
    str=strs[0]+fss[0]+strs[1];
    for(let i=1;i<fss.length;i++){
        j=0;
        s='+';
        if(fss[i].charAt(0)=='-'){
            j=1;
            s='-'
        }
        str=str+strs[0]+s+strs[1]+strs[0]+fss[i].substring(j)+strs[1];
    }
    return str;
}

itermsex1=function(fps,fss){
    return {
        question:'Find $\\ds\\i{'+itermscombine(fps,false)+'}$',
        steps:[
            iterms1(fps,fss)
        ]
    }
}

fofp=function(fps,c){
    its=inttermsall(fps);
    fs=its[its.length-2];
    return {
        question:`Find $f(x)$ such that $f'(x)=\\b{`+fps+`}$ and $f(0)=\\r{`+c+`}$`,
        steps:[
            `<p>$$\\a{\\gb{f(x)}&=\\p{\\ob{\\i{\\p{\\b{f'(x)}}}}}\\\\[4pt]&\\p{=}\\p{\\ob{\\i{\\p{\\b{`+fps+`}}}}}\\\\[7pt]&\\p{=\\gb{`+fs+`\\C}}}$$</p>`,
            `<p>$$\\a{\\ob{\\r{f(0)}}&=\\p{\\ob{`+fs.replaceAll('x','(0)')+`\\C}}\\\\[10pt]\\qquad\\p{\\gb{\\btip{\\r{`+c+`}}{\\r{f(0)}=\\r{`+c+`}}}}&\\p{{}=\\gb{`+fs.replaceAll('x','(0)')+`\\C}}\\\\[4pt]\\p{\\gb{\\g{C}}}&\\p{=}\\p{\\gb{\\g{`+c+`}}}}$$</p>`,
            `<p>$$\\a{\\gb{f(x)}&=\\p{\\ob{`+fs+`\\C}}\\\\[10pt]&\\p{=}\\p{\\gb{`+fs+`\\p{+\\g{`+c+`}}}}}$$</p>`
        ]
    }
}

pc=`$\\gt{plus $C$}$`

defintwu=function(a,b,fps,fs){
    fb='\\p{\\b{'+fs.replaceAll('x','(\\r{'+b+'})')+'}}';
    fa='\\p{\\b{'+fs.replaceAll('x','(\\pu{'+a+'})')+'}}';
    return `<p>Suppose that $f'(x)=`+fps+`$ and we want to find $f(\\r{`+b+`})-f(\\pu{`+a+`})$</p><p>We would first find $f(x)$ by taking the integral of $f'(x)$</p><p>$$\\a{f(x)&=\\p{\\i{f'(x)}}\\\\[10pt]&\\p{=}\\p{\\i{`+fps+`}}\\\\[10pt]&\\p{=}\\p{\\b{`+fs+`}\\C}}$$</p><p>This means that</p><p>$$\\a{f(\\r{`+b+`})-f(\\pu{`+a+`})&=\\p{\\left[`+fb+`\\C\\right]}\\p{-}\\p{\\left[`+fa+`\\C\\right]}\\\\[10pt]&\\p{=}\\p{\\left[`+fb+`\\right]}\\p{-}\\p{\\left[`+fa+`\\right]}}$$</p>`
}

defint=function(a,b,fps,fs){
    return defint1(a,b,fps,fs,'');
}

defint1=function(a,b,fps,str){
    its=inttermsall(turnblack(fps));
    fs=turnblack(its[its.length-2]);
    fb='\\p{\\left[\\b{'+fs.replaceAll('x','(\\r{'+b+'})')+'}\\right]}';
    fa='\\p{\\left[\\b{'+fs.replaceAll('x','(\\pu{'+a+'})')+'}\\right]}';
    strs=['',''];
    if(str.length>0){
        strs=['\\t{'+str+'}&=','\\\\[10pt]'];
        fps='\\g{'+fps+'}'
    }
    //`+strs[0]+`\\p{\\ie{\\p{\\pu{`+a+`}}}{\\p{\\r{`+b+`}}}{\\p{`+fps+`}}}`+strs[1]+`&\\p{=}\\p{\\b{`+fs+`}}\\p{\\ev{\\p{\\pu{`+a+`}}}{\\p{\\r{`+b+`}}}}\\\\[10pt]&\\p{=}`+fb+`\\p{-}`+fa+`
    return `<p>$$\\a{`+strs[0]+`\\p{\\ie{\\p{\\pu{`+a+`}}}{\\p{\\r{`+b+`}}}{\\p{`+fps+`}}}`+strs[1]+`&\\p{=}\\p{\\b{`+fs+`}}\\p{\\ev{\\p{\\pu{`+a+`}}}{\\p{\\r{`+b+`}}}}\\\\[10pt]&\\p{=}`+fb+`\\p{-}`+fa+`}$$</p>`;
}

Aintab=function(a,b,fps){
    return defint1(a,b,fps,'Area')
}

Aintabwu=function(a,b,fps,fs){
    return qAintab(a,b,fps)+`<p><span class='hi'>To answer this question, we find the integral of $\\g{f(x)}$ from $x=\\pu{`+a+`}$ to $x=\\r{`+b+`}$:</span></p>`+Aintab(a,b,fps,fs);
}


qAintab=function(a,b,fps){
    return `<p>Question: Find the area under the curve below from $x=\\pu{`+a+`}$ to $x=\\r{`+b+`}$</p><p>$f(x)=\\g{`+fps+`}$</p>`;
}

Aintabex=function(a,b,fps,fs){
    return {
        question:qAintab(a,b,fps),
        steps:[
            Aintab(a,b,fps)
        ]
    }
}

defintex=function(a,b,fps,fs,rs){
    a='\\pu{'+a+'}';
    b='\\r{'+b+'}';
    its=inttermsall(fps);
    fs=turnblack(its[its.length-2]);
    fs='\\b{'+fs+'}';
    fb='\\p{\\left[\\b{'+fs.replaceAll('x','('+b+')')+'}\\right]}';
    fa='\\p{\\left[\\b{'+fs.replaceAll('x','('+a+')')+'}\\right]}';
    return {
        question:`Find $\\ie{`+a+`}{`+b+`}{`+fs+`}$`,
        steps:[
            iterms(fps,fs,''),
            `$$\\a{\\ie{`+a+`}{`+b+`}{`+fps+`}&=\\p{`+fs+`}\\p{\\ev{\\p{`+a+`}}{\\p{`+b+`}}}\\\\[10pt]&\\p{=}\\p{`+fb+`}\\p{-}\\p{`+fa+`}}$$`
        ]
    }
}

tex=`<p><span class='hi'>When taking the derivative of terms being added/subtracted,<span class='invisible'> find the derivative of each term separately</span></span></p>`;

etermsex=function(fs,ds,ans){
    ds1=`$\\d{`+fs+`}`;
    return {
        question:`<b>Example: </b>Find `+ds1+'$',
        steps: [
            ds+`<p>$`+ds1+'='+ans+'$$</p>'
        ]
    }
}

turnblack=function(str){
    strs=['\\b','\\r','\\g']
    for(let i=0;i<strs.length;i++){
        str=str.replaceAll(strs[i],'')
    }
    return str;
}


const ca0g=function(qs,ini,k,t,tu,gr){
    return ca0(qs,ini,k,t,tu,false,gr);
}

const ca0=function(qs,ini,k,t,tu,N,gr){
    return{
        question: '<p>A '+qs+String.raw` is $\lb{`+ini+`}$. The `+grn(gr,N)+` rate of the `+qs+` is $\\o{`+k+`\\%}$. Find the $\\yut{`+qs+`}$ after $\\g{`+t+`}$ `+tu+`</p>`,
        steps:[
            cp(k),
            `$$`+ca(ini,k/100,t,0,N)+`$$`,
        ]
    }
}

const grn=function(gr,N){
    if(gr.length==0){
        gr=N?'decay':'growth';
    }
    return gr;
}

const cp=function(k){
    return '$$\\ob{\\ot{growth rate}=\\p{\\frac{\\p{\\o{'+k+'}}}{\\p{100}}}\\p{=}\\p{\\o{'+k/100+'}}}$$';
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
    return strs[0]+'\\p{'+cam[0]+'}\\p{=}'+strs[1]+'\\p{'+cam[1]+'}\\p{\\cdot }\\p{e}{^{'+ms(N)+'\\p{('+cam[2]+')}\\p{('+cam[3]+')}}}'+strs[2];
}

const ms=function(N){
    return N?'\\p{\\r{-}}':'';
}

grt=function(N,gr){
    return `\\ot{`+grn(gr,N)+` rate}`;
}

cab=function(ini,k,t){
    return ca0g('bacteria population',ini,k,t,'minutes','')
}

diffetx=function(str){
    i=str.search('e^x')
    c=parsec(str.slice(0,i-2))
    cs='\\b{'+c+'}';
    if(c==1){
        cs='';
    }
    return ['\\p{'+cs+'}\\p{\\p{e}\\p{^x}}',cs+'e^x']
}

diffceax=function(str){
    i=str.search('e\\^{');
    c=parsec(str.slice(0,i));
    c=c!=1?'\\b{'+c+'}':'';
    exp=str.substring(i+3);
    j=exp.search('x')
    a=parsec(exp.slice(0,j));
    return [`\\p{`+c+`}\\p{\\cdot}\\p{\\r{`+a+`}}\\p{e^{\\p{\\r{`+a+`}}\\p{x}}}`,``+c+`e^{\\r{`+a+`}x}`]
}

diffc=function(str){
    return ['0'];
}

diffcx=function(str){
    return [str.substring(0,str.length-1)];
}

parsec=function(c){
    if(c=='-'){
        return -1;
    }
    return c==''?1:parseInt(c);
}

diffcxn=function(str){
    i=str.search('x\\^');
    c=parsec(str.slice(0,i));
    n=parseInt(str.substring(i+2));
    n1=n==2?'':'\\p{^{'+(n-1)+'}}';
    return [c*n+'\\p{x}'+n1]
}

diffterm=function(str){
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
    is=[];
    for(let i=0;i<str.length;i++){
        for(let j=0;j<chars.length;j++){
            if(str[i]==chars[j]){
                is.push(i)
            }
        }
    }
    return is;
}

diffterms=function(str){
    wstrs='';
    fps='';
    is=findChar(str,['+','-'])
    terms=str.split(/[+-]/)
    for(let i=0;i<terms.length;i++){
        strs1=diffterm(terms[i])
        str1='\\p{'+strs1[0]+'}';
        if(strs1.length>1){
            wstrs=wstrs+'<p>$$\\ob{\\d{'+strs1[1]+'}='+str1+'}$$</p>'
        }
        str2=i>0?'\\p{'+str[is[i-1]]+'}':''
        fps=fps+str2+str1;
    }
    return wstrs+`<p>$$f'(x)=\\gb{`+fps+'}$$</p>';
}

diffex=function(fs){
    return {
        question:'<p>Let $f(x)='+fs+`.$</p><p>Find $f'(x)$</p>`,
        steps:[
            diffterms(fs)
        ]
    }
}

inttermsall=function(str){
    fss='';
    wstrs='';
    ints='';
    is=findChar(str,['+','-']);
    terms=str.split(/[+-]/)
    for(let i=0;i<terms.length;i++){
        strs1=intterm(terms[i])
        str1='\\p{'+strs1[0]+'}';
        str3=strs1.length>1?strs1[1]:terms[i];
        fss=fss+(i>0?str[is[i-1]]:'')+str3;
        //Remove extra work because studying for test now
        //wstrs=wstrs+'<p>$$\\i{'+str3+'}='+str1+'$$</p>'
        str2=i>0?'\\p{'+str[is[i-1]]+'}':''
        ints=ints+str2+str1;
    }
    return [wstrs,ints,fss]
}


intterm=function(str){
    if(!str.includes('x')){
        return intc(str)
    }
    else if(!str.includes('^')){
        if(str.includes('frac')){
            return intcox(str)
        }
        return intcx(str)
    }
    else if(str.includes('x^')){
        return intcxn(str)
    }
    else if(str.includes('e^{')){
        return intceax(str)
    }
    else{
        return intetx(str)
    }
}


intc=function(str){
    return ['\\b{'+str+'}\\p{x}','\\b{'+str+'}']
}

intcx=function(str){
    return intcxn(str+'^1')
}

intcox=function(str){
    j=str.search('{');
    k=str.search('}')
    c=str.slice(j+1,k)
    return c.length>0?['\\b{'+c+'}\\ln(x)','\\frac{\\b{'+c+'}}{x}']:['\\ln(x)','\\frac{1}{x}']
}

intcxn=function(str){
    i=str.search('x\\^');
    c='\\b{'+str.slice(0,i)+'}';
    if(i==0){
        c='1';
    }
    n='\\r{'+str.substring(i+2)+'}';
    return [`\\p{\\frac{\\p{`+c+`}}{\\p{`+n+`}\\p{+}\\p{1}}}\\p{x}^{\\p{`+n+`}\\p{+}\\p{1}}`,c+'x^'+n]
}

intceax=function(str){
    i=str.search('e\\^{');
    c='\\b{'+str.slice(0,i)+'}';
    if(i==0){
        c='1';
    }
    exp=str.substring(i+3);
    j=exp.search('x')
    a='\\r{'+exp.slice(0,j)+'}';
    return [`\\frac{\\p{`+c+`}}{\\p{`+a+`}}\\p{\\cdot}\\p{e^{\\p{`+a+`}\\p{x}}}`,``+c+`e^{`+a+`x}`]
}

inttermsex=function(fs){
    strs=inttermsall(fs);
    return {
        question:'<p>Let $f(x)='+fs+`.$</p><p>Find $\\i{f(x)}$</p>`,
        steps:[
            strs[0]+'<p>$$\\i{'+fs+'}=\\gb{\\p{'+strs[1]+'}\\C}$$</p>'//fs instead of strs[2] because of lack of color coding and x^1
        ]
    }
}

inteq=function(fs){
    return turnblack(inttermsall(fs)[1])
}

inttermswu=function(fs){
    return (inttermsex(fs).steps)[0]
}

intetx=function(str){
    i=str.search('e^x')
    c=parsec(str.slice(0,i-2))
    cs='\\p{\\b{'+c+'}}';
    if(c==1){
        cs='';
    }
    return [cs+'\\p{\\p{e}\\p{^x}}',cs+'e^x']
}



rone=function(c){
    // if(c==1){
    //     return ''
    // }
    // return '\\r{'+(c==-1?'-':c)+'}'
    return c==1?'':'\\r{'+c+'}'
}

ronep2=function(c){
    return c==1?'1':'\\r{'+c+'}'
}


window.j = {
    startCollapsed: false,
    lessonNum: 12,
    lessonName: "Practice Test 3",
    intro: String.raw`<p>The third exam will be on November 17th.</p>\p<p>It will have the following structure<ol><pli>Question 1: Calculate a bacteria population using the current amount equation (Section 1)</pli><pli>Question 2: Calculate the derivative of terms being added or subtracted including at least one term like $ce^x$ or $ce^{ax}$ (Section 2)</pli><pli>Questions 3 and 4 are both on the same topic: Calculate an Integral Without Endpoints (Section 3)</pli><pli>Question 5: Given $f'(x)$ and $f(0)$, find $f(x)$ (Section 4)</pli><pli>Question 6: Calculate an integral with endpoints (Section 5)</pli><pli>Question 7: Calculate the area under a curve (Section 6)</pli></ol></p><p><b>Note: </b>simplification of answers is not required.</p>`,
    sections: [
        {
            name: String.raw`Exponential Growth`,
            backgroundColor: "green",
            web: "Hw 3: 1, 5-7, 9; Hw 4: 1-7, 11; Hw 5: 2, 5-7; PT 2: 1-6, 8; Hw 6: 4, 7, 9-10; PT 3: 8; Hw 9: 8, 10; PF: 4, 6, 10-12, 14-15",
            book: "148",
            exam: "Up to one question on Test 2, Up to one question on Final",
            intro: String.raw`<p>A quantity grows exponentially if the rate at which the quantity grows is proportional to the current amount of the quantity</p><p>One quantity which grows exponentially (and the one which will be on the exam) is a population of bacteria</p><p>Quantities which grow exponentially can be calculated with the current amount equation</p><p>$$\ca$$</p><p></p><p><b>Note: </b>The current amount equation will be on the formula sheet</p><p>On the first exam question, you will be given the\p $\lbt{starting amount}$\p, the\p $\ot{growth rate}$\p (which will need to be converted into a decimal from a percent)\p, and the $\gt{time passed}$\p and you will need to substitute these values into\p the current amount equation\p to get the\p $\put{current amount}$</p><p><b>Note: </b>You do <b>not</b> need to simplify your answer or convert it into a decimal on the exam</p>`,
            rightColWidth: 50,
            steps: {
                general:{
                    question:String.raw`<p>{A quantity} is $\lbt{an amount}$. The growth rate of the quantity is $\ot{a number}$. Find $\put{the quantity}$ after $\gt{an amount of time}$</p>`,
                    steps:[
                        String.raw`<p>If the $\ot{growth rate}$ is a percent,\p convert into a decimal by\p dividing by\p 100</p>`,
                        String.raw`<p>Calculate the amount with the equation $$\p{\put{current amount}}\p{=}\p{\lbt{starting amount}}\p{\cdot }\p{e}{^{\p{(\ot{growth rate})}\p{(\gt{time passed})}}}$$</p>`,
                    ]
                },
                specific:cab(1000,5,7)
            },
            examples: [
                cab(900,8,6),
                cab(400,2,5),
                cab(600,8,2),
                cab(1200,9,5),
                cab(800,3,4),
                cab(4000,4,9),
                cab(2000,3,6),
                cab(7000,1,2),
                cab(9000,2,3),
                cab(3000,4,5)
            ],
        },
        {
            name: String.raw`Calculating Derivatives Terms Being Added or Subtracted Including $e^x$ and $e^{ax}$`,
            backgroundColor: "green",
            web: "Hw 3: 1, 5-7, 9; Hw 4: 1-7, 11; Hw 5: 2, 5-7; PT 2: 1-6, 8; Hw 6: 4, 7, 9-10; PT 3: 8; Hw 9: 8, 10; PF: 4, 6, 10-12, 14-15",
            book: "148",
            exam: "Up to one question on Test 2, Up to one question on Final",
            intro: String.raw`<p>The second exam question on the exam you will take the derivative of multiple terms being added or subtracted with one term involving $e^x$ or $e^{ax}$</p>`+tex+String.raw`<p>These two derivative formulas will be given on the formula sheet</p><p>$$\hi{\d{\b{c}e^x}=\p{\b{c}}\p{e^{\p{x}}}}$$</p><p>$$\hi{\d{\b{c}e^{\r{a}x}}=\p{\b{c}}\p{\cdot}\p{\r{a}}\p{e}^{\p{\r{a}}\p{x}}}$$</p><p>Here are some examples:</p><p>Question: Find $\d{4+8x+\b{4}e^{\r{2}x}}$</p><p>The derivative of $\b{4}e^{\r{2}x}$ is \p$\btip{\b{4}\cdot \r{2}e^{\r{2}x}}{\d{\b{c}e^{\r{a}x}}=\b{c}\cdot\r{a}e^{\r{a}x}}$</p><p> Using this, we get $$\d{4+8x+\b{4}e^{\r{2}x}}=\p{0}\p{+}\p{8}\p{+}\p{\b{4}\cdot\r{2}e^{\r{2}x}}$$</p>`,
            //`<p>$\d{4}=\p0$</p><p>$\d{8x}=\p8$</p><p>$\d{\b{4}e^{\r{2}x}}=\p\b{4}\p \cdot\p\r{2}e^{\r{2}x}$</p><p>Putting the derivatives back together, we get</p><p>$\d{4+8x+\b{4}e^{\r{2}x}}=\p0\p +\p8\p +\p\b{4}\cdot\r{2}e^{\r{2}x}$</p>`,
            rightColWidth: 50,
            steps: {
                general:{
                    question:String.raw`<p>Find $\d{\t{\{a bunch of terms including $\b{c}e^x$ and/or $\b{c}e^{\r{a}x}$ being added/subtracted\}}}$</p>`,
                    steps:[
                        String.raw`<p>Calculate the derivative using derivative rules from test 1 and the formulas</p><p>$$\d{\b{c}e^x}=\p{\b{c}}\p{e^{\p{{x}}}}$$</p><p>$$\d{\b{c}e^{\r{a}x}}=\p{\b{c}}\p{\cdot}\p{\r{a}}\p{e^{\p{\r{a}}\p{x}}}$$</p>`
                    ]
                },
                specific:diffex(`x^2-2e^x+4`)
            },
            examples: [
                diffex('3e^{2x}+9x+4'),
                diffex('4x^2-7e^x'),
                diffex('3e^{2x}+9x+4'),
                diffex('4x^2-7e^x'),
                diffex('9+12e^{6x}-x^2'),
                diffex('8x^3-4e^x'),
                diffex('e^{2x}+5'),
                diffex('3e^x-3x^2+2'),
                diffex('9x+4e^{-2x}+x^3'),
                diffex('3x^2+7x+2e^x')
            ],
        },
        {
        name: String.raw`Integrals Without Endpoints`,
        backgroundColor: "green",
        web: "Hw 3: 1, 5-7, 9; Hw 4: 1-7, 11; Hw 5: 2, 5-7; PT 2: 1-6, 8; Hw 6: 4, 7, 9-10; PT 3: 8; Hw 9: 8, 10; PF: 4, 6, 10-12, 14-15",
        book: "148",
        exam: "Up to one question on Test 2, Up to one question on Final",
        intro: String.raw`<p>Questions 3 and 4 are on the same topic, which is calculating integrals without endpoints (in other words, integrals without numbers on the $\int$ line)</p><p>The following integral formulas will be given on the formula sheet and you will need them to calculate the integrals</p>
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
            <td><p>$$\i{\r{3}e^x}=\p{\r{3}\p{e^{\p{x}}}}\C$$</p></td>
            <td><p>$$\i{\r{-9}e^x}=\p{\r{-9}\p{e^{\p{x}}}}\C$$</p></td>
        </tr>
        <tr>
            <td><p>$$\hi{\i{\r{c}e^{\b{k}x}}=\p{\frac{\p{\r{c}}}{\p{\b{k}}}}\p{e^{\p{\b{k}}\p{x}}}\C}$$</p></td>
            <td><p>$$\i{\r{4}e^{\b{3}x}}=\p{\frac{\p{\r{4}}}{\p{\b{3}}}}\p{e^{\p{\b{3}}\p{x}}}\C$$</p></td>
            <td><p>$$\i{\r{10}e^{\b{-2}x}}=\p{\frac{\p{\r{10}}}{\p{\b{-2}}}\p{e^{\p{\b{-2}}\p{x}}}}\C$$</p></td>
        </tr>
        <tr>
            <td><p>$$\hi{\i{\r{c}x^{\b{n}}}=\p{\frac{\p{\r{c}}}{\p{\b{n}}\p{+}\p{1}}\p{x^{\p{\b{n}}\p{+}\p{1}}}}\C}$$</p></td>
            <td><p>$$\i{\r{6}x^{\b{3}}}=\p{\frac{\p{\r{6}}}{\p{\b{3}}\p{+}\p{1}}}\p{x^{\p{\b{3}}\p{+}\p{1}}}\C$$</p></td>
            <td><p>$$\i{\r{5}x^{\b{4}}}=\p{\frac{\p{\r{5}}}{\p{\b{4}}\p{+}\p{1}}}\p{x^{\p{\b{4}}\p{+}\p{1}}}\C$$</p></td>
        </tr>
        </table>`+String.raw`<p>You will use the above formulas calculate the integrals as well as the following rule:</p>
        <p><span class='hi'>When integrating multiple terms being added or subtracted, <span class='invisible'>calculate the integral of each term separately</span></span>\p using the above list of integral formulas</p><p><b>Note: You only need one $\g{C}$ in your answer</b></p><p>Here are some examples:</p>`+inttermswu('2x^4+3-3e^x'),
        // <p>Find $\ds\i{2x^4+3-2e^x}$</p><p>To find this integral, we first find the integral of each term</p><p>$$\i{2x^4}=\p{\frac{2}{5+1}}\p{x^{5+1}}\C$$</p><p>$$\i{3}=\p{3}\p{x}\C$$</p><p>$$\i{2e^x}=\p{2}\p{e^x}\C$$</p><p>Putting the terms back together and using only one $\g{C}$, we get</p><p>$$\i{2x^4+3-2e^x}=\p{\frac{2}{5+1}}\p{x^{5+1}}\p{+}\p{3}\p{x}\p{-}\p{2}\p{e^x}\C$$</p><p>Find $\ds\i{3e^{2x}+7x-\frac{4}{x}}$</p><p>To find this integral, we first find the integral of each term</p><p>$$\i{3e^{2x}}=\p{\frac{3}{2}}\p{e^{2x}}\C$$</p><p>$$\i{7x}=\p{\frac{7}{1+1}}\p{x^{1+1}}\C$$</p><p>$$\i{\frac{4}{x}}=\p{4}\p{\ln(x)}\C$$</p><p>Putting the terms back together and using only one $\g{C}$, we get</p><p>$$\i{3e^{2x}+7x-\frac{4}{x}}=\p{\frac{3}{2}}\p{e^{2x}}\p{+}\p{\frac{7}{1+1}}\p{x^{1+1}}\p{-}\p{4}\p{\ln(x)}\C$$</p>`,
        rightColWidth: 50,
        steps: {
            general:{
                question:String.raw`<p>Find $\i{\t{\{a function with terms being added/subtracted\}}}$</p>`,
                steps:[
                    `<p><span class='hi'>When integrating multiple terms being added or subtracted, <span class='invisible'>calculate the integral of each term separately</span></span>\\p using the integral formulas from the previous 7 sections</p><p><b>Note: You only need one $\\g{C}$ in your answer</b></p>`
                ]
            },
            specific:inttermsex('3e^x+4+\\frac{3}{x}')
        },
        examples: [
            inttermsex(`16x-5e^{3x}+9`),
            inttermsex(`5x^3-6x+4`),
            inttermsex(`x^2-2e^x+3x`),
            inttermsex(`\\frac{4}{x}+9-3x^4`),
            inttermsex(`4e^x-3x^2+3`),
            inttermsex(`3x+5x^2+7`),
            inttermsex(`4e^{2x}-7x+8`),
            inttermsex(`9x^2+4+\\frac{5}{x}`),
            inttermsex(`6x^5-4x^7+e^x`),
            inttermsex(`3x-\\frac{2}{x}+7`),
        ],
    },
    {
        name: String.raw`Given $f'(x)$ and $f(0)$, find $f(x)$`,
        backgroundColor: "green",
        web: "Hw 3: 1, 5-7, 9; Hw 4: 1-7, 11; Hw 5: 2, 5-7; PT 2: 1-6, 8; Hw 6: 4, 7, 9-10; PT 3: 8; Hw 9: 8, 10; PF: 4, 6, 10-12, 14-15",
        book: "148",
        exam: "Up to one question on Test 2, Up to one question on Final",
        intro: String.raw`<p>On the fifth exam question, you will be given $\b{f'(x)}$ and $\r{f(0)}$ and you will be asked to find $f(x)$.</p><p>For example, suppose that $\b{f'(x)}=\b{x^2+3}$ and $\r{f(0)}=\r{3}$</p><p>To get from $f'(x)$ (in other words to get rid of the derivative), we have to do the opposite of taking a derivative.</p><p>So we need to find\p the integral of\p $f'(x)$:</p><p>$$\a{f(x)&=\p{\i{\p{\b{f'(x)}}}}\\[4pt]&\p{=}\p{\i{\p{\b{x^2+3}}}}\\[7pt]&\p{=}\p{`+inteq('x^2+3')+String.raw`\C}}$$</p><p>We are not done finding $f(x)$ because we need to determine the value of \p $\g{C}$</p><p>We find the value of $\g{C}$ by plugging in $x=0$ into $f(x)$ and using the fact $\r{f(0)}=\r{3}$:</p><p>$$\a{\r{f(0)}&=\p{`+inteq('x^2+3').replaceAll('x','(0)')+String.raw`\C}\\[10pt]\qquad\p{\btip{\b{3}}{\r{f(0)}=\r{3}}}&\p{=}\p{\g{C}}}$$</p><p>Finally we plug in $\g{C}=\g{3}$ back into the $f(x)$ equation:</p><p>$$\a{f(x)&\p{=}`+inteq('x^2+3')+String.raw`\p{+}\p{\g{3}}}$$</p>`,//&=\p{\frac{x^3}{3}}\p{+}\p{3x}\C\\[10pt]
        rightColWidth: 50,
        steps: {
            general:{
                question:String.raw`<p>Find $f(x)$ such that $f'(x)=\bt{a function}$ and $f(0)=\rt{a number}$</p>`,
                steps:[
                    `<p>Find the \\p integral of\\p $f'(x)$</p><p>$$f(x)=\\p{\\i{\\p{f'(x)}}}$$</p><p><b>Note: don't forget the $\\C$</b></p>`,
                    `<p>Plug in $x=0$ into \\p $\\btip{\\t{the equation for }f(x)}{\\t{the equation found in step 1}}$ and use \\p$f(0)=\\rt{a number}$ to find \\p$\\g{C}$</p>`,
                    `<p>To get $f(x)$,\\p plug in the value of \\p$\\g{C}$ you got in step 2 into\\p the $f(x)$ from step 1</p>`
                ]
            },
            specific:fofp('2x+3',5)
        },
        examples: [
            fofp('4x-x^2',4),
            fofp('9e^x+2',2),
            fofp('3x^4+x^2',5),
            fofp('-2x+x^3',8),
            fofp('9x^2-3',-2),
            fofp('4+x',1),
            fofp('9x+5',0),
            fofp('x^2-x^3',6),
            fofp('6x^3+7',10),
            fofp('x-2',3),
        ],
    },
    {
        name: String.raw`Definite Integrals (integrals with endpoints)`,
        backgroundColor: "green",
        web: "Hw 3: 1, 5-7, 9; Hw 4: 1-7, 11; Hw 5: 2, 5-7; PT 2: 1-6, 8; Hw 6: 4, 7, 9-10; PT 3: 8; Hw 9: 8, 10; PF: 4, 6, 10-12, 14-15",
        book: "148",
        exam: "Up to one question on Test 2, Up to one question on Final",
        intro: String.raw`<p>On the sixth question of the exam, you will need to calculate an integral with endpoints (an integral with numbers above and below the $\int$ sign)</p><p>To calculate $\ie{\pu{a}}{\r{b}}f(x)$, first the find the $\bt{variable part of $\i{f(x)}$}$ $\left(\bt{$\i{f(x)}$ without $ {}+C$}\right)$. Then, to calculate $\ie{\pu{a}}{\r{b}}{f(x)}$, plug in the $\rt{top number}$ into the $\bt{variable part of $\i{f(x)}$}$ and the $\put{bottom number}$ into $\bt{variable part of $\i{f(x)}$}$ and subtract them:</p>`+`<p>$$\\hi{\\a{\\ie{\\pu{a}}{\\r{b}}{f(x)}&=\\b{\\left\\{\\t{variable part of }\\i{f(x)}\\right\\}}\\ev{\\pu{a}}{\\r{b}}\\\\[10pt]&=\\p{\\left[\\ipit{\\r{b}}\\right]}\\\\[10pt]&\\qquad\\p{-}\\p{\\left[\\ipit{\\pu{a}}\\right]}}}$$</p><p>The vertical bar with $\\pu{a}$ and $\\r{b}$ stands for "plug in $\\rt{the top number $b$}$ and $\\put{the bottom number $a$}$ and subtract the answers you get with the order $\\t{top plugged in} - \\t{bottom plugged in}$</p><p>Here is an example: Find $\\ie{\\pu{2}}{\\r{6}}{3x^2-4x+1}$</p><p>We first find the $\\bt{variable part}$ of $\\i{3x^2-4x+1}$:</p><p>`+defintex(2,6,'3x^2-4x+1').steps[0]+`</p><p>Finally, to calculate $\\ie{\\pu{2}}{\\r{6}}{3x^2-4x+1}$, we substitute $\\r{6}$ and $\\pu{2}$ into $\\btip{\\b{`+inteq('3x^2-4x+1')+`}}{\\t{the variable part of }\\i{3x^2-4x+1}}$ and subtract the answers we get:</p><p>`+defintex(2,6,'3x^2-4x+1').steps[1]+`</p>`,
        rightColWidth: 50,
        steps: {
            general:{
                question:String.raw`<p>Find $\ie{\pu{a}}{\r{b}}{\t{\{a function\}}}$</p>`,
                steps:[
                    `<p>Find $\\b{\\left\\{\\t{variable part of }\\i{f(x)}\\right\\}}.$</p><p>In other words, find $\\i{f(x)}$ without the $\\C$</p>`,
                    `<p>$$\\hi{\\a{\\ie{\\pu{a}}{\\r{b}}{f(x)}&=\\b{\\left\\{\\t{variable part of }\\i{f(x)}\\right\\}}\\ev{\\pu{a}}{\\r{b}}\\\\[10pt]&=\\p{\\left[\\ipit{\\r{b}}\\right]}\\\\[10pt]&\\qquad\\p{-}\\p{\\left[\\ipit{\\pu{a}}\\right]}}}$$</p>`,
                ]
            },
            specific:defintex(3,4,'4+3e^{2x}')
        },
        examples: [
            defintex(3,4,'9e^x-6x'),
            defintex(2,8,'12x-2'),
            defintex(-1,2,'8+5e^{-2x}'),
            defintex(5,7,'4x^2+\\frac{2}{x}'),
            defintex(-2,-4,'3x^5-9x^2'),
            defintex(0,3,'4e^{-4x}+5x^3'),
            defintex(1,6,'4-7x'),
            defintex(-2,1,'7e^{-3x}+8'),
            defintex(2,4,'9x-3'),
            defintex(-1,3,'8x^2+x'),
        ],
    },
    {
        name: String.raw`Calculating Area Under a Curve With Given Endpoints`,
        backgroundColor: "green",
        web: "Hw 3: 1, 5-7, 9; Hw 4: 1-7, 11; Hw 5: 2, 5-7; PT 2: 1-6, 8; Hw 6: 4, 7, 9-10; PT 3: 8; Hw 9: 8, 10; PF: 4, 6, 10-12, 14-15",
        book: "148",
        exam: "Up to one question on Test 2, Up to one question on Final",
        intro: 'On the seventh exam question, you will be asked to find the area under a curve from $x=\\pu{a}$ to $x=\\r{b}$</p>'+'<p>The area under the curve $y=\\g{f(x)}$ from $x=\\pu{a}$ to $x=\\r{b}$ is calculated with the equation $$\\hi{\\t{Area}=\\ie{\\pu{a}}{\\r{b}}{f(x)}}$$'+Aintabwu(1000,1300,'150x-1740','\\p{\\frac{150}{1+1}}\\p{x^{1+1}}\\p{-}\\p{1740}\\p{x}'),
        rightColWidth: 90,
        steps: {
            general:{
                question:qAintab('a','b','\\t{a function}'),
                steps:[
                    `$$\\hi{\\t{Area}=\\p{\\ie{\\p{\\pu{a}}}{\\p{\\r{b}}}{\\p{\\g{f(x)}}}}}$$`
                ]
            },
            specific:Aintabex(2,3,'x^6')
        },
        examples: [
            Aintabex(1,5,'9x'),
            Aintabex(3,6,'-3x^2'),
            Aintabex(2,3,'x^3'),
            Aintabex(0,4,'4'),
            Aintabex(1,3,'8x^3'),
            Aintabex(0,1,'2x^2'),
            Aintabex(0,2,'4x'),
            Aintabex(2,9,'\\frac{2}{x}'),
            Aintabex(4,7,'3e^x'),
            Aintabex(-2,0,'5x^2'),
        ],
    },
    {
        name: "Product Rule",
        backgroundColor: "green",
        web: "LATER",
        book: "158-159",
        exam: "Might be on Test 1",
        intro: String.raw`In this section, we show how to calculate the derivative of <span class='purple'>one function</span> multipled by <span class='orange'>another function</span>. We do this with the Product Rule: $$\begin{flalign}&\frac{d}{dx}\ya{\yut{\{first function\}}\cdot\ot{\{second function\}}}\\[10pt]&\quad=\gt{\{the derivative of the first function\}}\cdot\ot{\{the second function\}}\\[10pt]&\qquad+\yut{\{the first function\}}\cdot\bt{\{the derivative of the second function\}}\\[10pt]&\t{or, the abbreviated version,}\\[10pt]&\frac{d}{dx}\ya{\yu{f_1(x)}\cdot\o{f_2(x)}}=\g{f_1'(x)}\cdot\o{f_2(x)}+\yu{f_1(x)}\cdot\b{f_2'(x)}\end{flalign}$$Warning: If either $\yu{f_1(x)}$ or $\o{f_2(x)}$ is a constant, use the constant multiple rule instead of the product rule. The product rule is more complicated and overkill in that case`,
        general: String.raw`$f(x)=\frac{d}{dx}\ya{\yut{\{first function\}}\cdot\ot{\{second function\}}}$. Find $f'(x)$<br>OR<br>Find $\frac{d}{dx}\ya{\yut{\{first function\}}\cdot\ot{\{second function\}}}$`,
        specific: String.raw`$f(x)=\yu{\ya{4x^2+x}}\cdot\o{\ya{3-x}}$. Find $f'(x)$`,
        rightColWidth: 50,
        steps: [
          {
            general: String.raw`Identify $\yu{f_1(x)}$ and $\o{f_2(x)}$:$$\begin{aligned}1.\ \yu{f_1(x)}&\t{ is the }\yut{first function}\\[10pt]2.\ \o{f_2(x)}&\t{ is the }\ot{second function}\end{aligned}$$`,
            specific: String.raw`$$\begin{aligned}\yu{f_1(x)}&=\yu{4x^2+x}\\[10pt]\o{f_2(x)}&=\o{3-x}\end{aligned}$$`,
          },
          {
            general: String.raw`Find $\btip{\g{f_1'(x)}}{\gt{the derivative of $f_1(x)$}}$ and $\btip{\b{f_2'(x)}}{\bt{the derivative of $f_2(x)$}}$`,
            specific: String.raw`$$\begin{aligned}\g{f_1'(x)}&=\frac{d}{dx}\ya{\yu{4x^2+x}}\\[10pt]&=\frac{d}{dx}\ya{4x^2}+\frac{d}{dx}\ya{x}\\[10pt]&=\btip{4\cdot(2x)}{\frac{d}{dx}\ya{\b{4}x^{\r{2}}}&=\b{4}\cdot\frac{d}{dx}\ya{x^{\r{2}}}\\&=\b{4}\cdot\r{2}x^{\r{2}-1}}+\btip{1}{\frac{d}{dx}\ya{x}=1}\\[10pt]&=\g{8x+1}\\[10pt]\b{f_2'(x)}&=\frac{d}{dx}\ya{\o{3-x}}\\[10pt]&=\frac{d}{dx}\ya{3}-\frac{d}{dx}\ya{x}\\[10pt]&=\btip{0}{\t{the derivative of}\\ \t{a constant is 0}}-\btip{1}{\frac{d}{dx}\ya{x}=1}\\[10pt]&=\b{-1}\end{aligned}$$`,
          },
          {
            general: String.raw`Substitute $\btip{\yu{f_1(x)}}{\yut{the first function}}$, $\btip{\o{f_2(x)}}{\ot{the second function}}$, $\btip{\g{f_1'(x)}}{\gt{the derivative of the first function}}$, and $\btip{\b{f_2'(x)}}{\bt{the derivative of the second function}}$ into the product rule equation:$$f'(x)=\g{f_1'(x)}\cdot\o{f_2(x)}+\yu{f_1(x)}\cdot\b{f_2'(x)}$$`,
            specific: String.raw`$$\begin{aligned}f'(x)&=\g{f_1'(x)}\cdot\o{f_2(x)}+\yu{f_1(x)}\cdot\b{f_2'(x)}\\[10pt]&=\g{(8x+1)}\cdot\o{(3-x)}+\yu{(4x^2+x)}\cdot\b{\ya{-1}}\end{aligned}$$`,
          }
        ],
        examples: [
          // {
          //   specific: "$f(x)=\\b{3}\\g{\\sqrt{\\bk{x}}}$. Find $f'(x)$",
          //   steps: ["$$f(x)=\\b{3}x^{\\r{1/2}}$$","$$\\begin{aligned}f'(x)&=\\b{3}\\cdot\\frac{d}{dx}\\ya{x^{\\r{1/2}}}\\\\[10pt]&=\\b{3}\\cdot\\ya{\\r{\\frac{1}{2}}x^{\\r{1/2}-1}}\\\\[10pt]&=\\frac{3}{2}x^{-3/2}\\end{aligned}$$"],
          // },
          // {
          //   specific: "Find $\\displaystyle\\frac{d}{dx}\\left(x^{\\r{\\tiny\\frac{1}{2}}}\\right)$",
          //   steps: ["$$\\frac{d}{dx}\\left(x^{\\r{\\tiny\\frac{1}{2}}}\\right)=\\r{\\frac{1}{2}}x^{\\r{\\tiny\\frac{1}{2}}-1}$$"],
          // },
        ],
      },
    ],
  }