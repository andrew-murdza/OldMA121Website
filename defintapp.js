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

defintex=function(a,b,fps){
    a='\\pu{'+a+'}';
    b='\\r{'+b+'}';
    its=inttermsall(fps);
    fs=turnblack(its[its.length-2]);
    fs='\\b{'+fs+'}';
    fb='\\p{\\left[\\b{'+fs.replaceAll('x','('+b+')')+'}\\right]}';
    fa='\\p{\\left[\\b{'+fs.replaceAll('x','('+a+')')+'}\\right]}';
    return {
        question:`Find $\\ie{`+a+`}{`+b+`}{`+fps+`}$`,
        steps:[
            iterms(fps,fs,''),
            `$$\\a{\\ie{`+a+`}{`+b+`}{`+fps+`}&=\\p{`+fs+`}\\p{\\ev{\\p{`+a+`}}{\\p{`+b+`}}}\\\\[10pt]&\\p{=}\\p{`+fb+`}\\p{-}\\p{`+fa+`}}$$`
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

parsec=function(c){
    if(c=='-'){
        return -1;
    }
    return c==''?1:parseInt(c);
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

inttermsall=function(str){
    str=turnblack(str)
    if(str.startsWith('{')){
        str=str.substring(1,str.length-1);
    }
    fss='';
    wstrs='';
    let ints='';
    is=findChar(str,['+','-']);
    terms=str.split(/[+-]/)
    for(let i=0;i<terms.length;i++){
        if(terms[i].length>0){
            strs1=intterm(terms[i])
            str1='\\p{'+strs1[0]+'}';
            str3=strs1.length>1?strs1[1]:terms[i];
            fss=fss+(i>0?str[is[i-1]]:'')+str3;
            //Remove extra work because studying for test now
            //wstrs=wstrs+'<p>$$\\i{'+str3+'}='+str1+'$$</p>'
            str2=i>0?'\\p{'+str[is[i-1]]+'}':''
            ints=ints+str2+str1;
        }
    }
    return [wstrs,ints,fss]
}



intterm=function(str){
    if(str.length==0){
        return '';
    }
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

areapw=function(a,b,c,gs,hs){
    return '<p>$$\\t{Area}='+defintstr('\\pk{'+a+'}','\\r{'+c+'}','\\b{'+gs+'}')+'\\p{+}'+defintstr('\\r{'+c+'}','\\go{'+b+'}','\\g{'+hs+'}')+'$$</p>'
}

pw=function(c,gs,hs){
    return `$$f(x)=\\begin{cases}\\b{`+gs+`}&x<\\r{`+c+`}\\\\[4pt]\\g{`+hs+`}&x\\ge\\r{`+c+`}\\end{cases}$$`
}

pwq=function(a,b,c,gs,hs,C){
    return (C?'t':'Find t')+'he area under '+pw(c,gs,hs)+'from $x=\\pk{'+a+'}$ to $x=\\go{'+b+'}$'+(C?' is ':'.')
}

pwwu=function(a,b,c,gs,hs,C){
    return pwq(a,b,c,gs,hs,true)+areapw(a,b,c,gs,hs)
}

defintbar=function(a,b,fs){
    return inteq(fs)+'\\p{\\ev{\\p{'+a+'}}{\\p{'+b+'}}}'
}

defintstr=function(a,b,fs){
    return '\\p{\\ie{\\p{'+a+'}}{\\p{'+b+'}}{\\p{'+fs+'}}}'
}

twodefint=function(a,b,c,d,gs,hs,s,str){
    strs=['','']
    if(str.length>0){
        strs10=['\\t{'+str+'}&=','\\\\[10pt]']
    }
    s='\\p{'+s+'}';
    let ints=defintstr(a,b,gs)+s+defintstr(c,d,hs);
    nextstep='&\\p{=}\\p{\\left('+defintbar(a,b,gs)+'\\right)}'+s+'\\p{\\left('+defintbar(c,d,hs)+'\\right)}\\\\[10pt]&\\p{=}'
    ans='\\p{\\left('+defintplugin(a,b,gs)+'\\right)}'+s+'\\p{\\left('+defintplugin(c,d,hs)+'\\right)}'
    return `$$\\a{`+strs10[0]+ints+strs10[1]+nextstep+ans+`}$$`
}

pwcalc=function(a,b,c,gs,hs){
    return twodefint('\\pk{'+a+'}','\\r{'+c+'}','\\r{'+c+'}','\\go{'+b+'}','\\b{'+gs+'}','\\g{'+hs+'}','+','Area')
}

defintplugin=function(a,b,fs){
    intf=inteq(fs);
    return '\\p{\\left[\\p{'+intf.replaceAll('x','{('+b+')}')+'}\\right]}\\p{-}\\p{\\left[\\p{'+intf.replaceAll('x','{('+a+')}')+'}\\right]}'
}

pwex=function(a,b,c,gs,hs){
    return{
        question:pwq(a,b,c,gs,hs,false),
        steps:[
            picsize('pwarea4',500)+areapw(a,b,c,gs,hs),
            pwcalc(a,b,c,gs,hs)
        ]
    }
}

eval=function(fs,a){
    return fs.replaceAll('x','{('+a+')}')
}

areatc=function(a,b,c,fs,gs,f,g){
    fc=f(c)
    gc=g(c)
    a='\\go{'+a+'}'
    b='\\b{'+b+'}'
    bt=fc>gc?['f(x)','g(x)',fs,gs]:['g(x)','f(x)',gs,fs]
    return {
        question:'Find the area between the curves $f(x)='+fs+'$ and $g(x)='+gs+'$ from $x=\\go{'+a+'}$ to $x=\\b{'+b+'}$',
        steps:[
            `$$\\gb{\\a{\\p{f(`+c+`)}&\\p{{}=`+eval(fs,c)+`}\\\\[10pt]&\\p{=\\p{`+fc+`}}\\\\[10pt]\\p{g(`+c+`)}&\\p{=}\\p{`+eval(gs,c)+`}\\\\[10pt]&\\p{=}\\p{`+gc+`}}}$$</p><p>$\\bb{\\ga{\\t{Since }\\p{`+bt[0]+`}\\p{\\t{ has the higher $y$-value, }}\\\\[4pt]\\p{\\t{the $\\gt{top}$ function is }}\\p{`+bt[0]+`=}\\p{\\g{`+bt[2]+'}}\\p{\\t{ and}}\\\\[4pt]\\p{\\t{the $\\rt{bottom}$ function is }}\\p{'+bt[1]+'=}\\p{\\r{'+bt[3]+'}}}}$',
            `$$\\a{\\gb{\\t{Area}}&=\\bb{\\iep{`+a+`}{`+b+`}{\\gt{top function}}\\p{-}\\iep{`+a+`}{`+b+`}{\\rt{bottom function}}}\\\\[10pt]&=\\gb{\\iep{`+a+`}{`+b+`}{\\g{`+bt[2]+`}}\\p{-}\\iep{`+a+`}{`+b+`}{\\r{`+bt[3]+`}}}}$$`,
            twodefint(a,b,a,b,'\\g{'+bt[2]+'}','\\r{'+bt[3]+'}','-','Area')
        ]
    }
}

areatc2=function(a,b,c,fs,gs,f,g,as){
    as1=['$$\\a{\\p{'+fs+'}&\\p{=}\\p{'+gs+'}\\\\[10pt]'+as+'\\p{x}&\\p{=}\\p{\\go{'+a+'}}\\p{, \\ x=}\\p{\\b{'+b+'}}\\\\[4pt]\\p{\\go{a}}&\\p{=}\\p{\\go{'+a+'}}\\p{,}\\ \\p{\\b{b}}\\p{=}\\p{\\b{'+b+'}}}$$']
    as1.push(...areatc(a,b,c,fs,gs,f,g).steps)
    return {
        question:'Find the area between the curves $f(x)='+fs+'$ and $g(x)='+gs+'$',
        steps: as1
    }
}

equi=function(ss,ds,xe,s,alg){
    xe1=xe
    xe='\\b{'+xe+'}'
    ss='\\g{'+ss+'}'
    ds='\\r{'+ds+'}'
    return {
        question:'Find the equilibrium for the supply function $\\g{S(x)}=\\g{'+ss+'}$ and the demand function $\\r{D(x)}=\\r{'+ds+'}$',
        steps:[
            `$$\\a{`+ss+`&\\p{=}\\p{`+ds+`}\\\\[4pt]`+alg+`\\p{x}&\\p{=}\\p{\\b{`+xe+`}}\\\\[4pt]\\p{\\bt{equilibrium quantity}}&\\p{=}\\p{`+xe+`}}$$`,
            `$$\\a{\\got{equilibrium price}&=\\p{\\g{S(\\p{`+xe+`})}}\\\\[4pt]&\\p{=}\\p{`+eval(ss,xe)+`}\\\\[4pt]&\\p{=}\\p{\\go{`+s(xe1)+`}}}$$`
        ]
    }
}

consurp=function(ss,ds,xe,s){
    qe='\\go{'+s(xe)+'}'
    xe='\\b{'+xe+'}'
    ds='\\r{'+ds+'}'
    xq='\\p{-}\\p{('+xe+')}\\p{('+qe+')}'
    return {
        question:'Find the consumer surplus for the supply $\\g{S(x)}='+ss+'$, $\\r{D(x)}=\\r{'+ds+'}$, $\\bt{equilibrium quantity}='+xe+'$ and $\\got{equilibrium price}='+qe+'$',
        steps:[
            '$$\\a{\\p{\\t{consumer surplus}}&\\p{=}\\iep{0}{\\bt{eq. quantity}}{\\r{D(x)}}\\p{-}\\p{(\\bt{eq. quantity})}\\p{(\\got{eq. price})}\\\\[10pt]&\\p{=\\iep{0}{'+xe+'}{'+ds+'}'+xq+'}\\\\[10pt]&\\p{=\\p{\\left('+defintbar(0,xe,ds)+'\\right)}'+xq+'}\\\\[10pt]&\\p{=\\left('+defintplugin(0,xe,ds)+'\\right)'+xq+'}}$$'
        ]
    }
}

prodsurp=function(ss,ds,xe,s){
    qe='\\go{'+s(xe)+'}'
    xe='\\b{'+xe+'}'
    ss='\\g{'+ss+'}'
    xq='\\p{('+xe+')}\\p{('+qe+')}\\p{-}'
    return {
        question:'Find the producer surplus for the supply $\\g{S(x)}=\\g{'+ss+'}$, $\\r{D(x)}='+ds+'$, $\\bt{equilibrium quantity}='+xe+'$ and $\\got{equilibrium price}='+qe+'$',
        steps:[
            '$$\\a{\\p{\\t{producer surplus}}&\\p{=}\\p{(\\bt{eq. quantity})}\\p{(\\got{eq. price})}\\p{-}\\iep{0}{\\bt{eq. quantity}}{\\g{S(x)}}\\\\[10pt]&\\p{='+xq+'\\iep{0}{'+xe+'}{'+ss+'}}\\\\[10pt]&\\p{='+xq+'\\p{\\left('+defintbar(0,xe,ss)+'\\right)}}\\\\[10pt]&\\p{='+xq+'\\p{\\left('+defintplugin(0,xe,ss)+'\\right)}}}$$'
        ]
    }
}

piw=function(str){
    return '\\p{\\pi\\p{\\left(\\p{'+str+'}\\right)}}'
}

vol=function(a,b,fs,gs){
    fs='\\g{'+fs+'}'
    a='\\r{'+a+'}'
    b='\\b{'+b+'}'
    return{
        question:`Find the volume of the solid generated by revolving $y=`+fs+`$ from $x=`+a+`$ to $x=`+b+`$ around the $x$-axis`,
        steps:[
            '$$\\a{\\p{\\t{volume}}&\\p{{}=\\p{\\pi}\\iep{\\r{a}}{\\b{b}}{\\p{\\left(\\p{\\g{f(x)}}\\right)}\\p{^2}}}\\\\[10pt]&\\p{=}\\p{\\pi}\\iep{'+a+'}{'+b+'}{\\p{\\left(\\p{'+fs+'}\\right)}\\p{^2}}}$$',
            '$$\\a{\\t{volume}&='+piw(defintstr(a,b,gs))+'\\\\[10pt]&\\p{=}'+piw(defintbar(a,b,gs))+'\\\\[10pt]&\\p{=}'+piw(defintplugin(a,b,gs))+'}$$'
        ]
    }
}

const picsize=function(str,l){
    return `<p><img src="/pictures/`+str+'.png" alt="HTML5 Icon" style="width:'+l+'px;height:'+l+'px;"></p>';
}

window.j = {
    startCollapsed: false,
    lessonNum: 12,
    lessonName: "Applications of Definite Integrals",
    intro: String.raw`<p>In this section, we will discuss some applications of integrals with endpoints</p><ol><pli>Area under a split-domain function</pli><pli>Area between curves between two with given endpoints</pli><pli>Area between two curves without given endpoints</pli><pli>Consumer Surplus</pli><pli>Producer Surplus</pli><pli>Volume</pli></ol><p> We will also review how to find the equilibrium corresponding to a given supply and demand.</p>`,
    sections: [
    {
        name: String.raw`Calculating Area Under a Split Domain Function`,
        backgroundColor: "green",
        web: "Hw 3: 1, 5-7, 9; Hw 4: 1-7, 11; Hw 5: 2, 5-7; PT 2: 1-6, 8; Hw 6: 4, 7, 9-10; PT 3: 8; Hw 9: 8, 10; PF: 4, 6, 10-12, 14-15",
        book: "148",
        exam: "Up to one question on Test 2, Up to one question on Final",
        intro: String.raw`<p>Consider the split-domain function </p><p>`+pw(2,'x^2','4x-4')+`</p><p>The graph of $f(x)$ looks like this:</p>`+picsize('pwarea1',500)+`<p>As seen in the above picture,\\p the area under $f(x)$ from $x=\\pk{0}$ to $x=\\go{4}$ is\\p the same as\\p the area under $y=\\b{x^2}$ from\\p $x=\\pk{0}$ to $x=\\r{2}$\\p plus the area under $y=\\g{4x-4}$\\p from $x=\\r{2}$ to $x=\\go{4}$.</p>
        <p>The area under $y=\\b{x^2}$ from $x=\\pk{0}$ to $x=\\r{2}$ is </p><p>$$\\t{Area}=\\p{\\ie{\\p{\\pk{0}}}{\\p{\\r{2}}}{\\p{\\b{x^2}}}}$$</p>
        <p>The area under $y=\\g{4x-4}$ from $x=\\r{2}$ to $x=\\go{4}$ is </p><p>$$\\t{Area}=\\p{\\ie{\\p{\\r{2}}}{\\p{\\go{4}}}{\\p{\\g{4x-4}}}}$$</p>
        <p>Therefore, `+pwwu(0,4,2,'x^2','4x-4')+`</p><p>In general, the area under `+pw('c','g(x)','h(x)')+` from $x=\\pk{a}$ to $x=\\go{b}$ is `+areapw('a','b','c','g(x)','h(x)')+`</p><p>Here are some examples: </p>`+picsize('pwarea2',500)+'<p>'+pwwu(-1,1,0,'x^2','x')+'</p>'+picsize('pwarea3',500)+'<p>'+pwwu(0,2,1,'9x','2x^2+7')+'</p>',
        rightColWidth: 90,
        steps: {
            general:{
                question:pwq('a','b','c','g(x)','h(x)'),
                steps:[
                    '<p>Use the following equation for the area in terms of integrals</p>'+
                    areapw('a','b','c','g(x)','h(x)')+'</p>',
                    '<p>WebAssign only: Find the area by calculating the integrals from the previous steps</p>'
                ]
            },
            specific:pwex(-2,3,0,'7-x^2','7')
        },
        examples: [

        ],
    },
    {
        name: String.raw`Calculating Area Between Two Curves With Given Endpoints`,
        backgroundColor: "green",
        web: "Hw 3: 1, 5-7, 9; Hw 4: 1-7, 11; Hw 5: 2, 5-7; PT 2: 1-6, 8; Hw 6: 4, 7, 9-10; PT 3: 8; Hw 9: 8, 10; PF: 4, 6, 10-12, 14-15",
        book: "148",
        exam: "Up to one question on Test 2, Up to one question on Final",
        intro: String.raw`<p>To calculate the area between $y=f(x)$ and $y=g(x)$ from $x=\go{a}$ to $x=\b{b}$,\p we first need to determine\p which function is on $\gt{top}$\p (has the $\gt{bigger}$ $y$-values) \pand\p which function is on the $\rt{bottom}$\p (has the $\rt{smaller}$ $y$-values)</p><p>To determine the $\gt{top}$ function and the $\rt{bottom}$ function,\p substitute a test point\p (an $x$-value between $x=\go{a}$ and $x=\b{b}$) into\p $f(x)$ and $g(x)$ to get their $y$-values.</p><p>The function with the $\gt{larger}$ $y$-value is the\p $\gt{top}$ function\p and the function with the $\rt{smaller}$\p $y$-value is the\p $\rt{bottom}$ function</p><p>There are two possibilities\p depending on whether $f(x)$ or $g(x)$ has the higher $y$-value<ol><pli>If $f(x)$ has the higher $y$-value,\p then the $\gt{top}$ function is\p $f(x)$\p and the $\rt{bottom}$ function is\p $g(x)$</pli><pli>If $g(x)$ has the higher $y$-value,\p then the $\gt{top}$ function is\p $g(x)$\p and the $\rt{bottom}$ function is\p $f(x)$</pli></ol></p><p>Once the $\gt{top}$ and $\rt{bottom}$ functions have been determined,\p you can calculate the area between $f(x)$ and $g(x)$ with the formula</p><p>$$\t{Area}=\iep{\go{a}}{\b{b}}{\gt{top function}}\p{-}\iep{\go{a}}{\b{b}}{\rt{bottom function}}$$</p>`+picsize('topbot',500),
        rightColWidth: 90,
        steps: {
            general:{
                question:'Find the area between the curves $y=f(x)$ and $y=g(x)$ from $x=\\go{a}$ to $x=\\b{b}$',
                steps:[
                    String.raw`<p>To determine the \p$\gt{top}$ function and the \p$\rt{bottom}$ function,\p substitute a test point \p between $x=\go{a}$ and $x=\b{b}$\p into\p $f(x)$\p and\p $g(x)$:</p><ul><pli>If $f(x)$ has the $\gt{higher}$ \p$y$-value,\p the $\gt{top}$ function is\p $f(x)$ and the \p$\rt{bottom}$ function is \p$g(x)$</pli><pli>If $g(x)$ has the $\gt{higher}$ \p$y$-value,\p the $\gt{top}$ function is\p $g(x)$ and\p the $\rt{bottom}$ function is\p $f(x)$</pli></ul>`,
                    String.raw`Calculate the area with the formula</p><p>$$\t{Area}=\iep{\go{a}}{\b{b}}{\gt{top function}}\p{-}\iep{\go{a}}{\b{b}}{\rt{bottom function}}$$`,
                    String.raw`<b>WebAssign only:</b> Calculate the area by computing the integrals`
                ]
            },
            specific:areatc(0,2,1,'2x','x^2',x=>2*x,x=>Math.pow(x,2))
        },
        examples: [

        ],
    },
    {
        name: String.raw`Calculating Area Between Two Curves Without Given Endpoints`,
        backgroundColor: "green",
        web: "Hw 3: 1, 5-7, 9; Hw 4: 1-7, 11; Hw 5: 2, 5-7; PT 2: 1-6, 8; Hw 6: 4, 7, 9-10; PT 3: 8; Hw 9: 8, 10; PF: 4, 6, 10-12, 14-15",
        book: "148",
        exam: "Up to one question on Test 2, Up to one question on Final",
        intro: String.raw`<p>To calculate the area between $y=f(x)$ and $y=g(x)$ from $x=\go{a}$ to $x=\b{b}$, we use the formula</p><p>$$\t{Area}=\iep{\go{a}}{\b{b}}{\gt{top function}}\p{-}\iep{\go{a}}{\b{b}}{\rt{bottom function}}$$</p><p>However, sometimes $\go{a}$ and $\b{b}$ are not given.</p><p>In these cases,\p $\go{a}$ and $\b{b}$ are\p the $x$-values you get when you\p <span class='hi'>solve $f(x)=g(x)$</span> because\p $x=\r{a}$ and $x=\b{b}$ are the $x$-values where\p $y=f(x)$ and $y=g(x)$ intersect</p>`+picsize('topbot2',500),
        rightColWidth: 90,
        steps: {
            general:{
                question:'Find the area between the curves $y=f(x)$ and $y=g(x)$',
                steps:[
                    String.raw`<p>Find $\go{a}$ and $\b{b}$, which are\p the $x$-values you get when\p solving\p $f(x)=g(x)$</p>`,
                    String.raw`<p>To determine the $\gt{top}$ function and the $\rt{bottom}$ function,\p substitute an $x$-value between\p $x=\go{a}$ and $x=\b{b}$\p into\p $f(x)$ and $g(x)$:</p><ul><pli>If $f(x)$ has the $\gt{higher}$ $y$-value,\p the $\gt{top}$ function is\p $f(x)$ and\p the $\rt{bottom}$ function is\p $g(x)$</pli><pli>If $g(x)$ has the $\gt{higher}$ $y$-value,\p the $\gt{top}$ function is\p $g(x)$\p and the $\rt{bottom}$ function is\p $f(x)$</pli></ul>`,
                    String.raw`Calculate the area with the formula</p><p>$$\t{Area}=\iep{\go{a}}{\b{b}}{\gt{top function}}\p{-}\iep{\go{a}}{\b{b}}{\rt{bottom function}}$$`,
                    String.raw`<b>WebAssign only:</b> Calculate the area by computing the integrals`
                ]
            },
            specific:areatc2(-2,2,0,'4x','x^2+4x-4',x=>4*x,x=>Math.pow(x,2)+4*x-4,'\\p{x^2}&\\p{=}\\p{4}\\\\[10pt]')
        },
        examples: [

        ],
    },
    {
        name: String.raw`Finding equilibrium between supply and demand`,
        backgroundColor: "green",
        web: "Hw 3: 1, 5-7, 9; Hw 4: 1-7, 11; Hw 5: 2, 5-7; PT 2: 1-6, 8; Hw 6: 4, 7, 9-10; PT 3: 8; Hw 9: 8, 10; PF: 4, 6, 10-12, 14-15",
        book: "148",
        exam: "Up to one question on Test 2, Up to one question on Final",
        intro: String.raw`<p>Given supply $\g{S(x)}$ and $\r{D(x)}$, the <span class='hi'>$\bt{equilibrium quantity}$ is the <span class='invisible'>$\bt{$x$-value}$</span></span>\p where\p $\g{S(x)}=\r{D(x)}$.</p><p>Once you have found the $\bt{equilibrium quantity}$,\p you can find the\p <span class='hi'>$\got{equilibrum price}$ <span class='invisible'>(the $\got{$y$-value}$).</span></span></p><p>Since <span class='hi'>$\g{S(x)}$ is <span class='invisible'>the $y$-value</span></span>\p,\p you can calculate the\p $\got{equilibrum price}$\p by\p substituting the\p $\bt{equilibrium quantity}$ into\p $\g{S(x)}$.</p><p><b>Note: </b>you can also plug into $\r{D(x)}$ if you prefer since\p $\g{S(x)}$ and $\r{D(x)}$ are the same at the equilibrium</p>`,
        rightColWidth: 90,
        steps: {
            general:{
                question:String.raw`Find the equilibrium for the supply $\g{S(x)}=\gt{an equation}$ and $\r{D(x)}=\rt{another equation}$`,
                steps:[
                    String.raw`Find the $\bt{equilibrium quantity}$,\p which is the $\bt{$x$-value}$\p you get from\p solving \p$\g{S(x)}=\r{D(x)}$ for $x$`,
                    String.raw`Find the $\got{equilbrium quantity}$,\p which is the $\got{$y$-value}$\p you get from\p substituting the \p$\bt{equilbrium quantity}$\p into\p $\g{S(x)}$ or $\r{D(x)}$ \p(you will get the same answer from both $\g{S(x)}$ and $\r{D(x)}$)`
                ]
            },
            specific:equi('x^2','(x-6)^2',3,x=>Math.pow(x,2),'\\p{x^2}&\\p{=}\\p{(x-6)}\\p{(x-6)}\\\\[4pt]\\p{x^2}&\\p{=}\\p{x^2}\\p{-}\\p{12x}\\p{+}\\p{36}\\\\[4pt]\\p{12x}&\\p{=}\\p{36}\\\\[4pt]')
        },
        examples: [
            equi('3x+2','-2x+11',1.8,x=>3*x+2,'\\p{5x}&\\p{=}\\p{9}\\\\[4pt]')
        ],
    },
    {
        name: String.raw`Calculating Consumer Surplus`,
        backgroundColor: "green",
        web: "Hw 3: 1, 5-7, 9; Hw 4: 1-7, 11; Hw 5: 2, 5-7; PT 2: 1-6, 8; Hw 6: 4, 7, 9-10; PT 3: 8; Hw 9: 8, 10; PF: 4, 6, 10-12, 14-15",
        book: "148",
        exam: "Up to one question on Test 2, Up to one question on Final",
        intro: String.raw`<p>If the demand function is $\r{D(x)}$,\p then Consumer Surplus can be calculated with the formula</p><p>$$\iep{0}{\bt{equilibrium quantity}}{\r{D(x)}}\p{-}\p{(\bt{equilibrium quantity})}\p{(\got{equilibrium price})}$$</p><p>Both in WebAssign and the exam,\p you will be given\p $\bt{equilibrium quantity}$ and $\got{equilibrium price}$\p before you are asked to find consumer surplus.</p><p>Therefore, all you have to do is\p plug everything into the above formula</p>`,
        rightColWidth: 60,
        steps: {
            general:{
                question:String.raw`Find the consumer surplus for the supply $\r{D(x)}=\gt{an equation}$, $\g{S(x)}=\rt{another equation}$, $\bt{equilibrium quantity}=\bt{a number}$ and $\got{equilibrium price}=\got{another number}$`,
                steps:[
                    String.raw`Calculate the Consumer Surplus with the formula $$\p{\t{Consumer Surplus}}\p{=}\iep{0}{\bt{eq. quantity}}{\r{D(x)}}\p{-}\p{(\bt{eq. quantity})}\p{(\got{eq. price})}$$`
                ]
            },
            specific:consurp('3x+2','-2x+11',1.8,x=>3*x+2)
        },
        examples: [
            //consurp('3x+2','-2x+11',1.8,x=>3*x+2)
        ],
    },
    {
        name: String.raw`Calculating Producer Surplus`,
        backgroundColor: "green",
        web: "Hw 3: 1, 5-7, 9; Hw 4: 1-7, 11; Hw 5: 2, 5-7; PT 2: 1-6, 8; Hw 6: 4, 7, 9-10; PT 3: 8; Hw 9: 8, 10; PF: 4, 6, 10-12, 14-15",
        book: "148",
        exam: "Up to one question on Test 2, Up to one question on Final",
        intro: String.raw`<p>If the supply function is $\g{S(x)}$,\p then Producer Surplus can be calculated with the formula</p><p>$$\p{(\bt{equilibrium quantity})}\p{(\got{equilibrium price})}\p{-}\iep{0}{\bt{equilibrium quantity}}{\g{S(x)}}$$</p><p>Both in WebAssign and the exam,\p you will be given\p the $\bt{equilibrium quantity}$ and the $\got{equilibrium price}$\p before you are asked to find producer surplus.</p><p>Therefore, all you have to do is\p plug everything into the above formula</p>`,
        rightColWidth: 60,
        steps: {
            general:{
                question:String.raw`Find the producer surplus for the supply $\r{D(x)}=\gt{an equation}$, $\g{S(x)}=\rt{another equation}$, $\bt{equilibrium quantity}=\bt{a number}$ and $\got{equilibrium price}=\got{another number}$`,
                steps:[
                    String.raw`Calculate the producer surplus with the formula $$\p{\t{producer surplus}}\p{=}\p{(\bt{eq. quantity})}\p{(\got{eq. price})}\p{-}\iep{0}{\bt{eq. quantity}}{\g{S(x)}}$$`
                ]
            },
            specific:prodsurp('3x+2','-2x+11',1.8,x=>3*x+2)
        },
        examples: [
            //consurp('3x+2','-2x+11',1.8,x=>3*x+2)
        ],
    },
    {
        name: String.raw`Calculating Volume`,
        backgroundColor: "green",
        web: "Hw 3: 1, 5-7, 9; Hw 4: 1-7, 11; Hw 5: 2, 5-7; PT 2: 1-6, 8; Hw 6: 4, 7, 9-10; PT 3: 8; Hw 9: 8, 10; PF: 4, 6, 10-12, 14-15",
        book: "148",
        exam: "Up to one question on Test 2, Up to one question on Final",
        intro: String.raw`<p>The volume generated by revolving $y=\g{f(x)}$ from $x=\r{a}$ to $x=\b{b}$ around the $x$-axis is calculated with the formula</p><p>$$\t{volume}=\p{\pi}\iep{\r{a}}{\b{b}}{\left(\p{\g{f(x)}}\right)\p{^2}}$$</p>`,
        rightColWidth: 60,
        steps: {
            general:{
                question:String.raw`Find the volume of the solid generated by revolving $y=\g{f(x)}$ from $x=\r{a}$ to $x=\b{b}$ around the $x$-axis`,
                steps:[
                    String.raw`Plug in \p$\b{f(x)}$,\p $\r{a}$,\p and $\g{b}$\p into the formula </p><p>$$\t{volume}=\p{\pi}\iep{\r{a}}{\b{b}}{\p{\left(\p{\g{f(x)}}\right)}\p{^2}}$$`,
                    String.raw`<b>WebAssign only: </b> Calculate the integral to find the volume`
                ]
            },
            specific:vol(-1,1,'e^x','e^{2x}')
        },
        examples: [
            vol(0,8,'\\sqrt{4+x}','4+x')
        ],
    }
    ],
  }
