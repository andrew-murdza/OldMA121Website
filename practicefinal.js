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
    str1=str.substring(0,str.length-1);
    return [str1.length==0?'1':str1];
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

diffterms1=function(str){
    fps='';
    is=findChar(str,['+','-'])
    terms=str.split(/[+-]/)
    for(let i=0;i<terms.length;i++){
        strs1=diffterm(terms[i])
        str1='\\p{'+strs1[0]+'}';
        str2=i>0?'\\p{'+str[is[i-1]]+'}':''
        fps=fps+str2+str1;
    }
    return fps
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

coxints=function(a,c){
    a='\\r{'+a+'}'
    c='\\b{'+c+'}'
    ss='$$\\iep{'+a+'}{\\infty}{\\frac{'+c+'}{x}}\\p{=}'
    ss1='\\p{-}\\p{'+c+'}\\p{\\ln(\\p{'+a+'})}'
    return [
        ss+'\\p{'+c+'}\\p{\\ln(x)}\\evp{'+a+'}{\\infty}$$',
        ss+'\\p{'+c+'}\\p{\\ln(\\p{\\infty})}'+ss1+'$$',
        ss+'\\p{'+c+'}\\p{(\\infty)}'+ss1+'$$',
        ss+'\\p{\\infty}'+ss1+'$$',
        ss+'\\p{\\infty}$$</p><p><b>Note: WebAssign is looking for DNE instead. I will accept both $\infty$ and the DNE on the exam.</b>'
    ]
}

coxnints=function(a,c,n){
    a='\\r{'+a+'}'
    c='\\b{'+c+'}'
    n='\\g{'+n+'}'
    ss='$$\\iep{'+a+'}{\\infty}{\\frac{'+c+'}{x^{'+n+'}}}\\p{=}'
    ss1='\\p{-}\\p{'+c+'}\\p{\\ln(\\p{'+a+'})}'
    fs='\\p{\\frac{\\p{'+c+'}}{\\p{-'+n+'}\\p{+}\\p{1}}}\\p{x^{-\\p{'+n+'}\\p{+}\\p{1}}}'
    return [
        ss+'\\iep{'+a+'}{\\infty}{'+c+'x^{-'+n+'}}$$',
        ss+fs+'\\evp{'+a+'}{\\infty}$$',
        ss+fs.replaceAll('x','(\\infty)')+'\\p{-}'+fs.replaceAll('x','('+a+')')+'$$',
        ss+'\\p{\\frac{\\p{'+c+'}}{-\\p{'+n+'}\\p{+}\\p{1}}}\\p{(0)}'+'\\p{-}'+fs.replaceAll('x','('+a+')')+'$$',
    ]
}

coxex=function(a,c){
    return {
        question:'Find $\\iep{\\r{'+a+'}}{\\infty}{\\frac{\\b{'+c+'}}{x}}$',
        steps:coxints(a,c)
    }
}

coxnex=function(a,c,n){
    return {
        question:'Find $\\iep{\\r{'+a+'}}{\\infty}{\\frac{\\b{'+c+'}}{x^{\\g{'+n+'}}}}$',
        steps:coxnints(a,c,n)
    }
}

ecx=function(a,c){
    a='\\r{'+a+'}'
    c='\\b{'+c+'}'
    ss='$$\\iep{'+a+'}{\\infty}{e^{-'+c+'x}}\\p{=}'
    fs='\\p{\\frac{\\p{1}}{\\p{-'+c+'}}}\\p{e^{\\p{-'+c+'}\\p{x}}}'
    st='\\p{-}'+fs.replaceAll('x','{('+a+')}')
    return{
        question:'Find $\\iep{'+a+'}{\\infty}{e^{-'+c+'x}}$',
        steps:[
            ss+fs+'\\evp{'+a+'}{\\infty}$$',
            ss+fs.replaceAll('x','(\\infty)')+st+'$$',
            ss+'\\p{\\frac{\\p{1}}{\\p{-'+c+'}}}\\p{e^{\\p{-}\\p{\\infty}}}'+st+'$$',
            ss+'\\p{\\frac{\\p{1}}{\\p{-'+c+'}}}\\p{(0)}'+st+'$$'
        ]
    }
}

sepvarex=function(c,n){
    con=c/(n+1)
    if(con==1){
        con='';
    }
    else{
        con=con==-1?'\\p{-}':'\\p{'+con+'}'
    }
    con1=n+1
    c='\\b{'+c+'}'
    n='\\r{'+n+'}'
    return {
        question:'Solve $\\frac{dy}{dx}='+c+'x^{\\r{'+n+'}}y$',
        steps:[
            '$$\\p{\\frac{\\p{1}}{\\p{y}}}\\p{dy}\\p{=}\\p{'+c+'}\\p{x^{\\p{'+n+'}}}\\p{dx}$$',
            '$$\\a{\\p{\\int{\\p{\\frac{\\p{1}}{\\p{y}}}}\\,dy}&\\p{=}\\p{\\i{\\p{'+c+'}\\p{x^{\\p{'+n+'}}}}}\\\\[10pt]\\p{\\ln(\\p{y})}&\\p{=}\\p{\\frac{\\p{'+c+'}}{\\p{'+n+'}\\p{+}\\p{1}}}\\p{x^{\\p{'+n+'}\\p{+}\\p{1}}}\\p{+C}}$$',
            '$$\\p{\\ln(\\p{y})}\\p{=}'+con+'\\p{x}^{\\p{'+con1+'}}\\p{+C}$$',
            '$$\\p{y}\\p{=}\\p{e^{'+con+'\\p{x}^{\\p{'+con1+'}}\\p{+C}}}$$',
        ]
    }
}

const xss=function(xs){
    xssol='x=';
    for(let i=0;i<xs.length;i++){
        x=xs[i];
        xssol=xssol+String.raw`\o{`+x+String.raw`}`;
        if(i<xs.length-1){
            xssol=xssol+",\\ ";
        }
    }
    return xssol;
  }
const ha=function(fs,n,m,a,b){//fs needs colored coefficients and powers
    strs=['>','numerator has the higher power','\\gb{f(x)\\t{ has no horizontal asymptotes}}'];
    has=String.raw`\ob{\t{The horizontal asymptote of $f(x)$ is}}$ $\hspace{0.5cm}\gb{y=`
    if(n==m){
        strs=['=','numerator and the denominator have the same highest power',has+String.raw`\ds\frac{\r{`+a+String.raw`}}{\lb{`+b+`}}}`];
    }
    if(n<m){
        strs=['<','denominator has the higher power',has+`0}`];
    }
    return {
        question: String.raw`<p>$$f(x)=\displaystyle`+fs+`$$Find the horizontal asymptote(s) of $f(x)$</p>`,
        steps:[
            '$\\bb{\\go{'+n+'}'+strs[0]+'\\g{'+m+'}}$',
            String.raw`\p$$\bb{\t{Because the `+strs[1]+`,}}$$<p></p>$`+strs[2]+`$`
        ]
    };
}

const va=function(fs,denom,zw,xs){
    xsstr='';
    for(let i=0;i<xs.length;i++){
        xsstr=xsstr+'x=\\go{'+xs[i]+'}';
        if(i<xs.length-1){
            xsstr=xsstr+',\\ '
        }
    }
    v=['','is'];
    if(xs.length>1){
        v=['s','are'];
    }
    if(xs.length==0){
        xsstr='\\t{no solutions}'
        ans=String.raw`\\gb{$f(x)$\t{ has no vertical asymptotes}}`
    }
    else{
        ans=String.raw`\ob{\t{The vertical asymptote`+v[0]+` of }f(x)\\t{ `+v[1]+` }`+xsstr+'}';
    }
    steps=String.raw`<p>$$\gb{\r{`+denom+String.raw`}=0}$$`;
    if(zw.length>0){
        steps=steps+`$$\\bb{\\a{`+zw+`}}$$`;
    }
    steps=steps+String.raw`$$\gb{`+xsstr+`}$$</p>`;
    return {
        question:String.raw`<p>$$f(x)=\displaystyle`+fs+`$$Find the vertical asymptote(s) of $f(x)$</p>`,
        steps:[
            steps,
            String.raw`<p>$`+ans+`$</p>`,
        ]
    }
}


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
            areapw(a,b,c,gs,hs),//picsize('pwarea4',500)+
            pwcalc(a,b,c,gs,hs)
        ]
    }
}

eval=function(fs,a){
    return fs.replaceAll('x','{('+a+')}')
}

const picsize=function(str,l){
    return `<p><img src="/pictures/`+str+'.png" alt="HTML5 Icon" style="width:'+l+'px;height:'+l+'px;"></p>';
}

const fevalg=function(f,fs,x,c,b){
    r='('+x+')';
    if(c.length>0){
        r='\\'+c+'{'+x+'}';
    }
    s='\\gb{f('+r+')}&=\\bb{'+fs.replaceAll('x','('+r+')')+'}\\\\[4pt]'+'&=\\gb{'+f(x)+'}';
    if(b){
        s='$$\\a{'+s+'}$$'
    }
    return s;
}
const feval=function(f,fs,x,c){
    return fevalg(f,fs,x,c,false);
}

const fevaloinf=function(f,fs,x){
    return String.raw`$$\a{\ob{y}&=\bb{f(\o{`+x+`})}\\\\[4pt]&=\\gb{`+fs.replaceAll('x','(\\o{'+x+'})')+`}\\\\[4pt]&=\\ob{`+f(x)+`}}$$`;
}

const fevals=function(f,fs,xs,cs){
    s='';
    c='';
    for(let i=0;i<xs.length;i++){
        if(cs.length>i){
            c=cs[i];
        }
        s=s+feval(f,fs,xs[i],c);
        if(i<xs.length-1){
            s=s+'\\\\[4pt]';
        }
    }
    return "$$\\a{"+s+"}$$";
}
const maxminab = function(f,fs,a,b,fp,fps,xs) {
    xs1=[a,b];
    cs=['pu','pu','o'];
    xssol=xss(xs);
    for(let i=0;i<xs.length;i++){
        x=xs[i];
        if(x!=a&&x!=b){
            xs1=xs1.concat(x);
        }
    }
    ys=[];
    yss=String.raw`}{\t{the }y\t{-values are }`;
    for(x of xs1){
        y=f(x);
        ys=ys.concat(y);
        yss=yss+y+',\\ '
    }
    yss=yss.substring(0,yss.length-2)+String.raw`\\\t{the `;
    fes=fevals(f,fs,xs1,cs);
    m=Math.min(...ys);
    M=Math.max(...ys);
    return {
      question: String.raw`$$f(x)=`+fs+String.raw`$$Find the absolute max and min of $f(x)$ on the interval $[\r{`+a+String.raw`},\r{`+b+String.raw`}]$`,
      steps: [String.raw`\p$$\gb{f'(x)=`+fp+'}$$',
      String.raw`\p$$\gb{`+fp+String.raw`=0}$$\p$$\bb{\ga{`+fps+String.raw`}}$$\p$$\gb{`+xssol+String.raw`}$$`,
      fes,
      String.raw`<p>\p Max:\p $\btip{`+M+yss+'largest of which is $'+M+String.raw`$}}$</p>\p<p>Min: $\btip{`+m+yss+'smallest of which is $'+m+'$}}$</p>',]
    };
  }

  const maxminzinf=function(f,fs,fp,fps,x,fpp,p){
    s=['\\g{>0}','\\gt{positive}','\\gt{min}','\\rt{max}'];
    if(!p){
        s=['\\r{<0}','\\rt{negative}','\\rt{max}','\\gt{min}'];
    }

    return{
        question: String.raw`$$f(x)=`+fs+String.raw`$$Find the absolute max and min of $f(x)$ on the interval $(0,\infty)$`,
        steps:[
            String.raw`\p$$\gb{f'(x)=`+fp+'}$$',
            String.raw`\p$$\gb{`+fp+String.raw`=0}\\[4pt]$$\p$$\bb{\ga{`+fps+String.raw`}}\\[4pt]$$\p$$\gb{x=\o{`+x+String.raw`}}$$`,
            String.raw`\p$$\gb{f''(x)=`+fpp+'}$$',
            String.raw`\p$$\bb{f''(x)=`+fpp+s[0]+String.raw`\t{ on }(0,\infty)}$$`,
            String.raw`\p$$\gb{\t{Because }f''(x)\t{ is always }`+s[1]+`,\\t{the }`+s[2]+`\\t{ is }}$$\\p`+fevaloinf(f,fs,x)+String.raw`\p$$\gb{\t{and there is no }`+s[3]+`}$$`
        ]
    };
  }

  signcharts=function(f,xs,zs){
    strs1=['TtFsF','TtTsF','TtTsT']
    strs=[];;
    for(let i=0;i<strs1.length;i++){
        strs[i]=signchartfig(f,xs,zs,strs1[i]);
    }
    return strs;
  }

  signchartfig=function(f,xs,zs,str1){
    str='signchartc';
    numberline='';
    for(let i=0;i<zs.length;i++){
        sign='p';
        if(f(zs[i])<0){
            sign='m';
        }
        numberline=numberline+'_'+zs[i]+'_'+sign;
        if(i<xs.length){
            numberline=numberline+'_'+xs[i];
        }
    }
    return '\\p'+pic(str+str1+numberline);
  }

  const fevalsigns=function(f,fs,fn,zs){
    str='<p>';
    for(let i=0;i<zs.length;i++){
        r='(\\pu{'+zs[i]+'})';
        y=f(zs[i]);
        ineq='\\g{>0}';
        if(y<0){
            ineq='\\r{<0}';
        }
        str=str+'<p>\\p$\\gb{'+fn+r+'}=\\bb{'+fs.replaceAll('x',r)+'}$</p>\\p<p>\\p$\\phantom{\\gb{'+fn+r+'}}=\\bb{'+y+'}$\\p$\\hspace{0.5cm}\\gb{'+ineq+'}$</p>'
        // if(i<zs.length-1){
        //     str=str+'\\\\[4pt]';
        // }
    }
    return str;//+'}$$</p>'
  }

  const posnegzs=function(f,xs,zs){
    n=zs.length-1;
    pzsi=[];
    nzsi=[];

    str='(-\\infty,\\o{'+xs[0]+'})';
    if(f(zs[0])>=0){
        pzsi=pzsi.concat(str);
    }
    else{
        nzsi=nzsi.concat(str);
    }

    for(let i=1;i<zs.length-1;i++){
        str='(\\o{'+xs[i-1]+'},\\o{'+xs[i]+'})';
        if(f(zs[i])>=0){
            pzsi=pzsi.concat(str);
        }
        else{
            nzsi=nzsi.concat(str);
        }
    }

    str='(\\o{'+xs[n-1]+'},\\infty)';
    if(f(zs[n])>=0){
        pzsi=pzsi.concat(str);
    }
    else{
        nzsi=nzsi.concat(str);
    }
    v=[];
    v.push(pzsi,nzsi);
    return v;
  }

  const fsignex1=function(fn,szsi,ineq,fps1,ineq11){
    str='bb';
    if(fps1.length>0){
        str='gb'
    }
    fpexp1=`<pli>$\\`+str+`{`+fn+`(x)`;
    if(szsi.length==0){
        if(ineq.length>8){
            ineq=ineq.substring(8);
        }
        return fpexp1+`\\t{ is never }`+ineq+`}$</pli>`;
    }
    fpexp1=fpexp1+ineq+'\\t{ on }';
    for(let i=0;i<szsi.length;i++){
        fpexp1=fpexp1+szsi[i];
        if(i<szsi.length-1){
            fpexp1=fpexp1+',\\ '
        }
    }
    if(fps1.length>0){
        fpexp1=fpexp1+'\\t{ b/c }'+fps1+'(x)'+ineq11;
    }
    return fpexp1+'}$</pli>';
  }

  const fsignex=function(fn,pzsi,nzsi,ineq1,ineq2,fps1){
    return '<p><ol>'+fsignex1(fn,pzsi,ineq1,fps1,'\\g{>0}')+fsignex1(fn,nzsi,ineq2,fps1,'\\r{<0}')+'</ol></p>';
  }

  signchartprob=function(fs,fps,fp,zw,xs,zs,fps1,qstr1,qstr2){
    strs=signcharts(fp,xs,zs);
    xs.sort();
    xssol=xss(xs);
    str0='';
    fn=`f'`;
    strs1=['\\t{ is }\\gt{increasing}','\\t{ is }\\rt{decreasing}',`f'`]
    if(fps1.length>0){
        str0=`$$\\bb{f'(x)=`+fps1+'}$$'
        fn=`f''`;
        strs1=['\\t{ is concave }\\gt{up}','\\t{ is concave }\\rt{down}',`f''`];
    }
    critstr=String.raw`<p>$$\gb{`+fps+String.raw`=0}$$`;
    if(zw.length>0){
        critstr=critstr+String.raw`$$\bb{\a{`+zw+`}}$$`
    }
    critstr=critstr+`$$\\gb{`+xssol+`}$$</p>`;
    posneg=posnegzs(fp,xs,zs);
    pzsi=posneg[0];
    nzsi=posneg[1];

   
    
    return {question: String.raw`<p>$$f(x)=`+fs+`$$Find the intervals where $f(x)$ is `+qstr1+` and where $f(x)$ is `+qstr2+`</p>`,
    steps: [
        String.raw`<p>\p`+str0+`$$\\gb{`+fn+`(x)=`+fps+`}$$</p>`,
        critstr,
        strs[0],
        strs[1],
        fevalsigns(fp,fps,fn,zs),
        strs[2],
        fsignex(fn,pzsi,nzsi,'\\g{>0}','\\r{<0}',''),
        fsignex('f',pzsi,nzsi,strs1[0],strs1[1],strs1[2]),
    ],
    }
  }

  const incdec=function(fs,fps,fp,zw,xs,zs){
   return signchartprob(fs,fps,fp,zw,xs,zs,'','increasing','decreasing');
  }

  const concavcubic=function(fs,fps,fpps,zw,fpp,x){
    return signchartprob(fs,fpps,fpp,zw,[x],[x-1,x+1],fps,'concave up','concave down');
  }

  const signs=function(f,zs){
    signs1=[];
    for(let i=0;i<zs.length;i++){
        signs1[i]=1;
        if(f(zs[i])<0){
            signs1[i]=-1;
        }
    }
    return signs1;
  }

  const maxminex1=function(ms,mnotM){
    strs=['maximum','\\gt{positive}','\\rt{negative}'];
    if(mnotM){
        strs=['minimum','\\rt{negative}','\\gt{positive}'];
    }
    start=String.raw`<pli>$\gb{\begin{flalign}&f(x)\t{ has `;
    end=String.raw`goes from }`+strs[1]+`\\t{ to }`+strs[2]+`\\end{flalign}}$</pli>`
    middle=String.raw`}\t{ b/c }f'(x)\\[2pt]&\t{`;
    if(ms.length==0){
        return start+String.raw`no relative `+strs[0]+middle+`never `+end
    }
    return start+'a relative '+strs[0]+' at $x='+ms+middle+end;
  }

  const pic=function(str){
    return `<p><img src="/pictures/`+str+'.png" alt="HTML5 Icon" ></p>';
  }

  const maxminex=function(xs,zs,fp,fpppint,fppmint){
    ss=signs(fp,zs);
    ms='';
    Ms='';
    for(let i=0;i<xs.length;i++){
        if(ss[i]<0&&ss[i+1]>0){
            ms=ms+'\\o{'+xs[i]+'}, \\';
        }
        else if(ss[i]>0&&ss[i+1]<0){
            Ms=Ms+'\\o{'+xs[i]+'}, \\';
        }
    }
    if(ms.length>0){
        ms=ms.substring(0,ms.length-2)+"$";
    }
    if(Ms.length>0){
        Ms=Ms.substring(0,Ms.length-2)+"$";
    }
    v=posnegzs(fp,xs,zs);
    ans=`<p><ol>`+maxminex1(Ms,false)+maxminex1(ms,true)+'</ol></p>';
    return {
        question: String.raw`<p>$f'(x)\g{>0}\t{ on }`+v[0]+String.raw`$ and $f'(x)\r{<0}\t{ on }`+v[1]+String.raw`$.</p>\p<p>$f''(x)\g{>0}\t{ on }`+fpppint+String.raw`$ and $f''(x)\r{<0}\t{ on }`+fppmint+`$</p>\\p<p>Find the $x$-values where $f(x)$ has a relative maximum and the $x$-values where $f(x)$ has a relative minimum</p>`,
        steps:[
            signchartfig(fp,xs,zs,'TtFsT'),
            ans,
        ]
    }
  }


  prodrule=function(f,g){ 
    fp='\\g{'+turnblack(diffterms1(f))+'}'
    gp='\\b{'+turnblack(diffterms1(g))+'}'
    f='\\pu{'+f+'}'
    g='\\o{'+g+'}'
    return {
        question:'',
        steps:[
            String.raw`$$\begin{aligned}\yu{f_1(x)}&=`+f+`\\\\[10pt]\\o{f_2(x)}&=\\o{`+g+`}\\end{aligned}$$`,
            String.raw`$$\begin{aligned}\g{f_1'(x)}&=\frac{d}{dx}\ya{`+f+String.raw`}\\[10pt]&=`+fp+String.raw`\\[10pt]\b{f_2'(x)}&=\frac{d}{dx}\ya{\o{`+g+String.raw`}}\\[10pt]&=\b{`+gp+`}\\end{aligned}$$`,
            String.raw`$$\begin{aligned}f'(x)&=\g{f_1'(x)}\cdot\o{f_2(x)}+\yu{f_1(x)}\cdot\b{f_2'(x)}\\[10pt]&=\ya{`+fp+String.raw`}\cdot\ya{`+g+`}+\\ya{`+f+String.raw`}\cdot\ya{`+gp+`}\\end{aligned}$$`,
        ]
    }
  }
  quorule=function(f,g){ 
    fp='\\g{'+turnblack(diffterms1(f))+'}'
    gp='\\b{'+turnblack(diffterms1(g))+'}'
    f='\\pu{'+f+'}'
    g='\\o{'+g+'}'
    return {
        question:'',
        steps:[
            String.raw`$$\begin{aligned}\yu{f_1(x)}&=`+f+`\\\\[10pt]\\o{f_2(x)}&=\\o{`+g+`}\\end{aligned}$$`,
            String.raw`$$\begin{aligned}\g{f_1'(x)}&=\frac{d}{dx}\ya{`+f+String.raw`}\\[10pt]&=`+fp+String.raw`\\[10pt]\b{f_2'(x)}&=\frac{d}{dx}\ya{\o{`+g+String.raw`}}\\[10pt]&=\b{`+gp+`}\\end{aligned}$$`,
            String.raw`$$\begin{aligned}f'(x)&=\frac{\g{f_1'(x)}\cdot\o{f_2(x)}-\yu{f_1(x)}\cdot\b{f_2'(x)}}{(\o{f_2(x)})^2}\\[10pt]&=\frac{\ya{`+fp+String.raw`}\cdot\ya{`+g+`}-\\ya{`+f+String.raw`}\cdot\ya{`+gp+`}}{(\\o{`+g+`})^2}\\end{aligned}$$`,
        ]
    }
  }

window.j = {
    startCollapsed: false,
    lessonNum: 12,
    lessonName: "Practice Final",
    intro: String.raw`<p>The final exam will be in our classroom from 3:30 - 6:00 PM on December 13th</p>\p<p>It will have the following structure<ol><pli>Question 1: Calculate a derivative with the product rule (Section 1)</pli><pli>Question 2: Calculate a derivative with the quotient rule (Section 2)</pli><pli>Question 3: find the horizontal asymptotes of a fraction (Section 3)</pli><pli>Question 4: find the vertical asymptotes of a fraction (Section 4)</pli><pli>Question 5: Find increasing and decreasing intervals (Section 5)</pli><pli>Question 6: Current amount equation (Section 6)</pli><pli>Question 7: Calculating derivatives involving $e^x$ and $e^{ax}$ (Section 7)</pli><pli>Question 8: Calculate Integral Without Endpoints (Section 8)</pli><pli>Question 9: Area under a split domain function (Section 9)</pli><pli>Question 10: Calculate improper integral of $\frac{c}{x^n}$(Section 10)</pli><pli>Question 11: Improper integral of $e^{-cx}$(Section 11)</pli><pli>Question 12: Solve $\frac{dy}{dx}=cx^ny$ (Section 12)</pli></ol></p><p><b>Note: </b>simplification of answers is not required.</p>`,
    sections: [
        {
            name: "Product Rule",
            backgroundColor: "green",
            web: "LATER",
            book: "158-159",
            exam: "Might be on Test 1",
            intro: String.raw`In this section, we show how to calculate the derivative of <span class='purple'>one function</span> multipled by <span class='orange'>another function</span>. We do this with the Product Rule: $$\begin{flalign}&\frac{d}{dx}\ya{\yut{\{first function\}}\cdot\ot{\{second function\}}}\\[10pt]&\quad=\gt{\{the derivative of the first function\}}\cdot\ot{\{the second function\}}\\[10pt]&\qquad+\yut{\{the first function\}}\cdot\bt{\{the derivative of the second function\}}\\[10pt]&\t{or, the abbreviated version,}\\[10pt]&\frac{d}{dx}\ya{\yu{f_1(x)}\cdot\o{f_2(x)}}=\g{f_1'(x)}\cdot\o{f_2(x)}+\yu{f_1(x)}\cdot\b{f_2'(x)}\end{flalign}$$`,
            rightColWidth: 50,
            steps: 
            {
                general:{
                    question:String.raw`$f(x)=\frac{d}{dx}\ya{\yut{\{first function\}}\cdot\ot{\{second function\}}}$. Find $f'(x)$`,
                    steps:[
                        String.raw`Identify $\yu{f_1(x)}$ and $\o{f_2(x)}$:$$\begin{aligned}1.\ \yu{f_1(x)}&\t{ is the }\yut{first function}\\[10pt]2.\ \o{f_2(x)}&\t{ is the }\ot{second function}\end{aligned}$$`,
                        String.raw`Find $\btip{\g{f_1'(x)}}{\gt{the derivative of $f_1(x)$}}$ and $\btip{\b{f_2'(x)}}{\bt{the derivative of $f_2(x)$}}$`,
                        String.raw`Substitute $\btip{\yu{f_1(x)}}{\yut{the first function}}$, $\btip{\o{f_2(x)}}{\ot{the second function}}$, $\btip{\g{f_1'(x)}}{\gt{the derivative of the first function}}$, and $\btip{\b{f_2'(x)}}{\bt{the derivative of the second function}}$ into the product rule equation:$$f'(x)=\g{f_1'(x)}\cdot\o{f_2(x)}+\yu{f_1(x)}\cdot\b{f_2'(x)}$$`,
                    ]
                },
                specific:prodrule('x^2+1','x-5')
            },
            examples: [
                prodrule('x^2+1','x-5'),
                prodrule('x-x^2','2x+1'),
                prodrule('x^2-1','x^2+1'),
                prodrule('2x+1','3-3x'),
                prodrule('8x^2-2x','1-x^2'),
                prodrule('5x+4','3x^2+x')
            ],
          },
          {
            name: "Quotient Rule",
            backgroundColor: "green",
            web: "LATER",
            book: "158-159",
            exam: "Might be on Test 1",
            intro: String.raw`In this section, we show how to calculate the derivative of <span class='purple'>one function</span> divided by <span class='orange'>another function</span>. We do this with the Quotient Rule: $$\begin{flalign}&\frac{d}{dx}\ya{\frac{\yut{\{numerator\}}}{\ot{\{denominator\}}}}\\[10pt]&\quad=\frac{\gt{\{the derivative of the numerator\}}\cdot\ot{\{the denominator\}}}{\ya{\ot{\{the denominator\}}}^2}\\[10pt]&\qquad-\frac{\yut{\{the numerator\}}\cdot\bt{\{the derivative of the denominator\}}}{\ya{\ot{\{the denominator\}}}^2}\\[10pt]&\t{or, the abbreviated version,}\\[10pt]&\frac{d}{dx}\ya{\frac{\yu{f_1(x)}}{\o{f_2(x)}}}=\frac{\g{f_1'(x)}\cdot\o{f_2(x)}-\yu{f_1(x)}\cdot\b{f_2'(x)}}{\ya{\o{f_2(x)}}^2}\end{flalign}$$`,
            general: String.raw`$f(x)=\frac{d}{dx}\ya{\frac{\yut{\{numerator\}}}{\ot{\{denominator\}}}}$. signchartpFind $f'(x)$<br>OR<br>Find $\frac{d}{dx}\ya{\frac{\yut{\{numerator\}}}{\ot{\{denominator\}}}}$`,
            specific: String.raw`$f(x)=\frac{\yu{4x^2+x}}{\o{3-x}}$. Find $f'(x)$`,
            rightColWidth: 50,
            steps: 
            {
                general:{
                    question:String.raw`$f(x)=\frac{d}{dx}\ya{\yut{\{first function\}}\cdot\ot{\{second function\}}}$. Find $f'(x)$`,
                    steps:[
                        String.raw`Identify $\yu{f_1(x)}$ and $\o{f_2(x)}$:$$\begin{aligned}1.\ \yu{f_1(x)}&\t{ is the }\yut{first function}\\[10pt]2.\ \o{f_2(x)}&\t{ is the }\ot{second function}\end{aligned}$$`,
                        String.raw`Find $\btip{\g{f_1'(x)}}{\gt{the derivative of $f_1(x)$}}$ and $\btip{\b{f_2'(x)}}{\bt{the derivative of $f_2(x)$}}$`,
                        String.raw`Substitute $\btip{\yu{f_1(x)}}{\yut{the first function}}$, $\btip{\o{f_2(x)}}{\ot{the second function}}$, $\btip{\g{f_1'(x)}}{\gt{the derivative of the first function}}$, and $\btip{\b{f_2'(x)}}{\bt{the derivative of the second function}}$ into the quotient rule equation:$$f'(x)=\frac{\g{f_1'(x)}\cdot\o{f_2(x)}+\yu{f_1(x)}\cdot\b{f_2'(x)}}{(\o{f_2(x)})^2}$$`,
                    ]
                },
                specific:quorule('x^2+1','x-5')
            },
            examples: [
                quorule('x^2+1','x-5'),
                quorule('x-x^2','2x+1'),
                quorule('x^2-1','x^2+1'),
                quorule('2x+1','3-3x'),
                quorule('8x^2-2x','1-x^2'),
                quorule('5x+4','3x^2+x')
            ],
          },
        {
            name: String.raw`Find horizontal asymptotes of a function`,
            backgroundColor: "green",
            web: "Hw 3: 1, 5-7, 9; Hw 4: 1-7, 11; Hw 5: 2, 5-7; PT 2: 1-6, 8; Hw 6: 4, 7, 9-10; PT 3: 8; Hw 9: 8, 10; PF: 4, 6, 10-12, 14-15",
            book: "148",
            exam: "Up to one question on Test 2, Up to one question on Final",
            intro: String.raw`<p>In this section, we describe how to find the horizontal asymptotes of a function.</p>\p<p>In this class, a horizontal asymptote is a horizontal line that the graph of a function $\btip{\t{approaches on the far right of the graph}}{\t{In more complicated situations, a horizontal}\\\t{asymptote could be on the far left side instead}}$</p>\p<p>For example, $y=\pu{1}$ is a horizontal asymptote of the below graph.</p>\p<p><img src="/pictures/NotesHA1AtInfinity.png" alt="HTML5 Icon" style="width:500px;height:500px;"></p>\p<p>Since $\displaystyle\lim_{x\to\infty}f(x)=\put{a number}$ means that $y$ approaches $y=\put{that number}$ on the far right of the graph, you can find a horizontal asymptote of $f(x)$ by calculating $\displaystyle\lim_{x\to\infty}f(x)$:</p>\p<p><ol><pli>If $\displaystyle\lim_{x\to\infty}f(x)=\put{a number}$, then $\btip{\t{the horizontal asymptote of }f(x)}{f(x)\t{ could have a second horizontal}\\\t{asymptote corresponding to }\displaystyle\lim_{x\to-\infty}f(x)\\\t{but this does not happen in our course}}$ is $y=\put{that number}$</pli><pli>If $\displaystyle\lim_{x\to\infty}f(x)=\infty$, then $\btip{f(x)\t{ has no horizontal asymptotes}}{f(x)\t{ could still have a horizontal}\\\t{asymptote corresponding to }\displaystyle\lim_{x\to-\infty}f(x)\\\t{but this does not happen in our course}}$</pli></ol>\p In particular, when $\displaystyle\lim_{x\to\infty}\frac{\r{a}x^{\go{n}}+\t{terms with }x\t{ to powers less than }\go{n}}{\lb{b}x^{\g{m}}+\t{terms with }x\t{ to powers less than }\g{m}}$ we have the following:</p>\p<p><ol><pli>$\btip{\t{If the numerator has the higher power}}{\go{n}>\g{m}}$, then $\displaystyle\lim_{x\to\infty}f(x)=\infty$ and $f(x)$ has no horizontal asymptotes</pli><pli>$\btip{\t{If the denominator has the higher power}}{\g{m}>\go{n}}$, then $\displaystyle\lim_{x\to\infty}f(x)=\pu{0}$ and the horizontal asymptote of $f(x)$ is $y=\pu{0}$</pli><pli>$\btip{\t{If the denominator and the numerator have the same highest power}}{\g{m}=\go{n}}$, then $\displaystyle\lim_{x\to\infty}f(x)=\pu{\frac{\r{a}}{\lb{b}}}$ and the horizontal asymptote of $f(x)$ is $y=\pu{\frac{\r{a}}{\lb{b}}}$</pli></ol></p>`,
            // specific: String.raw`<p>$$f(x)=\displaystyle\frac{\r{7}x^{\go{3}}+8x+1}{\lb{4}x^{\g{6}}+1}$$Find the horizontal asymptote(s) of $f(x)$</p>`,
            rightColWidth: 50,
            steps: {
                general:{
                    question:String.raw`<p>$$f(x)=\displaystyle\frac{\r{a}x^{\go{n}}+\t{terms with }x\t{ to powers less than }\go{n}}{\lb{b}x^{\g{m}}+\t{terms with }x\t{ to powers less than }\g{m}}$$Find the horizontal asymptote(s) of $f(x)$</p>`,
                    steps:[
                        String.raw`\p<p>Determine whether $\btip{\go{n}}{\got{The highest power in the numerator}}$ is greater than, less than, or equal to $\btip{\g{m}}{\gt{The highest power in the denominator}}$</p>`,
                        String.raw`\p<p>Find the horizontal asymptote(s) of $f(x)$:</p>\p<p><ol><pli>If $\btip{\go{n}>\g{m}}{\t{The numerator has}\\\t{the higher power}}$, $f(x)$ has\p no horizontal asymptotes</pli><pli>If $\btip{\g{m}>\go{n}}{\t{The denominator has}\\\t{the higher power}}$, the horizontal asymptote of $f(x)$ is\p $y=0$</pli><pli>If $\btip{\g{m}=\go{n}}{\t{The denominator and}\\\t{the numerator have}\\\t{the same highest power}}$, the horizontal asymptote of $f(x)$ is\p $y=\frac{\r{a}}{\lb{b}}$</pli></ol>\p<b>Note: You must include the $y=$; it will be worth points on the exam.</b></p>`,
                    ]
                },
                specific:ha(String.raw`\frac{\r{7}x^{\go{3}}+8x+1}{\lb{4}x^{\g{6}}+1}`,3,6,7,4)
            },
            examples: [
                ha(String.raw`\frac{\r{10}x^{\go{4}}+6}{\lb{7}x^{\g{2}}+2}`,4,2,10,7),
                ha(String.raw`\frac{\r{5}x^{\go{2}}+6}{\lb{4}x^{\g{2}}+4x}`,2,2,5,4),
                ha(String.raw`\frac{\r{2}x^{\go{3}}+6}{\lb{7}x^{\g{5}}+2x^2}`,3,5,2,7),
                ha(String.raw`\frac{\r{2}x+1}{\lb{3}x+4}`,1,1,2,3),
                ha(String.raw`\frac{\r{5}x^{\go{7}}+7}{\lb{7}x^{\g{4}}+2}`,7,4,5,7),
                ha(String.raw`\frac{\r{6}x^{\go{3}}+5x}{x^{\g{5}}+2}`,3,5,6,1),
            ],
            },
            {
            name: String.raw`Find vertical asymptotes of a function`,
            backgroundColor: "green",
            web: "Hw 3: 1, 5-7, 9; Hw 4: 1-7, 11; Hw 5: 2, 5-7; PT 2: 1-6, 8; Hw 6: 4, 7, 9-10; PT 3: 8; Hw 9: 8, 10; PF: 4, 6, 10-12, 14-15",
            book: "148",
            exam: "Up to one question on Test 2, Up to one question on Final",
            intro: String.raw`<p>In this section, we describe how to find the vertical asymptotes of a function.</p>\p<p>A vertical asymptote of a graph is a vertical line that a graph approaches $\btip{\t{as }x\t{ approaches }\got{an $x$-value}}{\t{from the right and/or left side}}$</p>\p<p>For example, $x=\go{2}$ is a vertical asymptote of the below graph.</p>\p<p><img src="/pictures/NotesVA1Right.png" alt="HTML5 Icon" style="width:500px;height:500px;"></p>\p<p>One can show that $x=\go{a}$ is a vertical asymptote of $f(x)$ if $\displaystyle\lim_{x\to\go{a}^-}f(x)$ and/or $\displaystyle\lim_{x\to\go{a}^+}f(x)$ are either $\infty$ or $-\infty$</p>\p<p>In this class, we will only find vertical asymptotes of fractions.</p>\p<p>In this class, the vertical asymptotes of a fraction are $x=\got{first $x$-value where the denominator is 0},$ $x=\got{second $x$-value where the denominator is 0},$$\ \cdots\ ,\ $$x=\got{last $x$-value where the denominator is 0}$</p>`,
            rightColWidth: 50,
            steps: {
                general:{
                    question:String.raw`<p>$$f(x)=\frac{\t{\{numerator\}}}{\rt{\{denominator\}}}$$Find the vertical asymptote(s) of $f(x)$</p>`,
                    steps:[
                        String.raw`\p<p>Solve $\rt{\{denominator\}}=0$ for $x$:</p>`,
                        String.raw`\p<p>The vertical asymptotes of $f(x)$ are \p$x=\got{first $x$-value from step 1}$, $x=\got{second $x$-value from step 1}$, ..., $x=\got{last $x$-value from step 1}$</p>`,
                    ]
                },
                specific:va(String.raw`\frac{x+3}{\r{3x-2}}`,`3x-2`,`3x=2`,[`\\frac{2}{3}`]),
            },
            examples: [
                va(String.raw`\frac{x+4}{\r{x-6}}`,`x-6`,``,[6]),
                va(String.raw`\frac{x}{\r{x^2-x-2}}`,`x^2-x-2`,`(x-2)(x+1)=0`,[2,-1]),
                va(String.raw`\frac{x^2+1}{\r{x^2-2x+1}}`,`x^2-2x+1`,`(x-1)(x-1)=0`,[1]),
                va(String.raw`\frac{2x^4+1}{\r{2x+4}}`,`2x+4`,`2x=-4`,[-2]),
                va(String.raw`\frac{x^2+4}{\r{x^2-4}}`,`x^2-4`,`(x-2)(x+2)=0`,[2,-2]),
                va(String.raw`\frac{4}{\r{8x+5}}`,`8x+5`,`8x=-5`,[`-\\frac{5}{8}`]),
            ],
            },
        {
            name: String.raw`Finding where a function is increasing and decreasing`,
            backgroundColor: "green",
            web: "Hw 3: 1, 5-7, 9; Hw 4: 1-7, 11; Hw 5: 2, 5-7; PT 2: 1-6, 8; Hw 6: 4, 7, 9-10; PT 3: 8; Hw 9: 8, 10; PF: 4, 6, 10-12, 14-15",
            book: "148",
            exam: "Up to one question on test 2 and up to one question on the final",
            intro: String.raw`<p>$f(x)$ is <span class='green'>increasing</span> when its slope is \p<span class='green'>positive</span>\p and <span class='red'>decreasing</span> when its slope is \p<span class='red'>negative</span></p>\p<p>Since $f'(x)$ is the slope of $f(x)$, we know that $f(x)$ is <span class='green'>increasing</span> when \p$f'(x)\g{>0}$\p and $f(x)$ is <span class='red'>decreasing</span> when\p $f'(x)\r{<0}$</p>`,
            rightColWidth: 50,
            steps:{
                general:{question:String.raw`<p>$$f(x)=\{\t{an equation}\}$$Find the intervals where $f(x)$ is increasing and where $f(x)$ is decreasing</p>`,
                steps:[
                    String.raw`\p<p>Find $f'(x)$:</p>`,
                    String.raw`\p<p>Solve $f'(x)=0$ for $x$. \pI will the $x$-values you get <span class='orange'>critical points</span></p>`,
                    String.raw`\p<p>Make a number line with the <span class='orange'>critical points</span> on it</p>`,
                    String.raw`\p<p>The critical points divide the number into smaller parts called intervals. Add an $x$-value (called a <span class='purple'>test point</span>) to each interval</p>`,
                    String.raw`\p<p>Calculate $f'(\put{each test point})$ and determine\p whether it is <span class='green'>positive</span> or <span class='red'>negative</span>.</p>`,//It is often easier to calculate using the factored version of $f'(x)$</p>`,
                    String.raw`\p<p>Add a $\g{+}$ sign above each interval containing a test point with a\p <span class='green'>positive</span> $f'$ value\p and a $\r{-}$ sign above each interval containing a test point with a \p<span class='red'>negative</span> $f'$ value</p>`,
                    String.raw`\p<p>Determine the intervals where $f'(x)$ is <span class='green'>positive</span> and <span class='red'>negative</span><ol><pli>$f'(x)\g{>0}$ in the intervals with a \p$\g{+}$ above them</pli><pli>$f'(x)\r{<0}$ in the intervals with a \p$\r{-}$ sign above them.</pli></ol>\p<b>Note: The endpoints of the intervals are the\p $\btip{\o{\textbf{critical points}}}{x\t{-values where }f'(x)=0}$ not the $\btip{\pu{\textbf{test points}}}{\t{the }x\t{-values on each side of the critical points}}$</b></p>`,
                    String.raw`\p<p>Determine the intervals where $f(x)$ is <span class='green'>increasing</span> and <span class='red'>decreasing</span><ol><pli>$f(x)$ is <span class='green'>increasing</span> in the intervals\p where $f'(x)\g{>0}$</pli><pli>$f(x)$ is <span class='red'>decreasing</span> in the intervals where \p$f'(x)\r{<0}$</pli></ol>\p<b>Note: The endpoints of the intervals are the\p $\btip{\o{\textbf{critical points}}}{x\t{-values where }f'(x)=0}$ not the $\btip{\pu{\textbf{test points}}}{\t{the }x\t{-values on each side of the critical points}}$</b></p>\p<p>\p<b>Note: Make sure that you justify your answer by mentioning something like "b/c $f'(x)\g{>0}$" for $\g{\textbf{increasing}}$ and "b/c $f'(x)\r{<0}$" for $\r{\textbf{decreasing}}$</b></p>`,
                ]
                },
                specific:incdec(`2x^3+6x^2+6x`,`6x^2+12x+6`,x=>6*Math.pow(x,2)+12*x+6,String.raw`6(x^2+2x+1)&=0\\[4pt]6(x+1)(x+1)&=0\\[4pt]x+1=0,\ x+1&=0`,[-1],[-2,0]),
            },
            examples: [
                incdec(`x^3-3x`,`3x^2-3`,x=>3*Math.pow(x,2)-3,String.raw`3(x^2-1)&=0\\[4pt]3(x-1)(x+1)&=0\\[4pt]x-1=0,\ x+1&=0`,[-1,1],[-2,0,2]),
                incdec(`-2x^3+3x^2+12x`,`-6x^2+6x+12`,x=>-6*Math.pow(x,2)+6*x+12,String.raw`-6(x^2-x-2)&=0\\[4pt]-6(x-2)(x+1)&=0\\[4pt]x-2=0,\ x+1&=0`,[-1,2],[-2,0,3]),
                incdec(`x^3-3x^2`,`3x^2-6x`,x=>3*Math.pow(x,2)-6*x,String.raw`3x(x-2)&=0\\[4pt]3x=0,\ x-2&=0`,[0,2],[-1,1,3]),
                incdec(`-x^3-3x^2`,`-3x^2-6x`,x=>-3*Math.pow(x,2)-6*x,String.raw`-3x(x+2)&=0\\[4pt]-3x=0,\ x+2&=0`,[-2,0],[-3,-1,1]),
                incdec(`x^3+3x^2-24x+1`,`3x^2+6x-24`,x=>3*Math.pow(x,2)+6*x-24,String.raw`3(x^2+2x-8)&=0\\[4pt]3(x+4)(x-2)&=0\\[4pt]x+4=0,\ x-2&=0`,[-4,2],[-5,0,3]),
            ],
            },        
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
                cab(3000,4,5),
                cab(500,2,10),
                cab(100,9,4)
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
                diffex('3x^2+7x+2e^x'),
                diffex('9x-8e^{2x]+x^3'),
                diffex('x^4+3-e^x')
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
            inttermsex(`4x+9-\\frac{5}{x}+7`),
            inttermsex(`5e^{2x}-x^2+6`)
        ],
    },
    {
        name: String.raw`Calculating Area Under a Split Domain Function`,
        backgroundColor: "green",
        web: "Hw 3: 1, 5-7, 9; Hw 4: 1-7, 11; Hw 5: 2, 5-7; PT 2: 1-6, 8; Hw 6: 4, 7, 9-10; PT 3: 8; Hw 9: 8, 10; PF: 4, 6, 10-12, 14-15",
        book: "148",
        exam: "Up to one question on Test 2, Up to one question on Final",
        intro: String.raw`<p>Consider the split-domain function </p><p>`+pw(2,'x^2','4x-4')+`</p><p>The graph of $f(x)$ looks like this:</p>`+picsize('pwarea1',500)+`<p>As seen in the above picture, the area under $f(x)$ from $x=\\pk{0}$ to $x=\\go{4}$ is the same as area under $y=\\b{x^2}$ from $x=\\pk{0}$ to $x=\\r{2}$ plus the area under $y=\\g{4x-4}$ from $x=\\r{2}$ to $x=\\go{4}$.</p>
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
            pwex(0,9,3,'8x+1','3x'),
            pwex(2,5,4,'3x^2+2x','9'),
            pwex(-1,3,0,'x^4','\\frac{7}{x}'),
            pwex(5,7,6,'e^x','3x^2'),
            pwex(3,9,5,'x-3','8'),
            pwex(-2,0,-1,'x+3','2x+10')
        ],
    },
    {
        name: String.raw`Calculating the Improper Integral of $\frac{c}{x}$`,
        backgroundColor: "green",
        web: "Hw 3: 1, 5-7, 9; Hw 4: 1-7, 11; Hw 5: 2, 5-7; PT 2: 1-6, 8; Hw 6: 4, 7, 9-10; PT 3: 8; Hw 9: 8, 10; PF: 4, 6, 10-12, 14-15",
        book: "148",
        exam: "Up to one question on Test 2, Up to one question on Final",
        intro: String.raw`<p>In this section we will find improper integrals of $\frac{\b{c}}{x}$</p>`,
        rightColWidth: 90,
        steps: {
            general:{
                question:String.raw`Find $\iep{\r{a}}{\infty}{\frac{\b{c}}{x}}$`,
                steps:[
                    String.raw`<p>The first step of calculating an integral with endpoints is to\p calculate the integral without endpoints\p and\p add the bar with the endpoints:</p>`,
                    String.raw`<p>Then plug in the endpoints and subtract to get rid of the bar</p>`,
                    String.raw`<p>We will now use the fact that \p$\hi{\ln(\infty)=\p{\infty}}$</p><p><b>Note: (this will be provided on the equation sheet for the exam)</b></p>`,
                    String.raw`<p>You can think of $\infty$ as\p a very big positive number.</p><p>Since $\b{c}$ times a really big positive number is \pa very big positive number,$$\p{\b{c}}\p{(\infty)}\p{=}\p{\infty}$$</p>`,
                    String.raw`<p>You can think of $\infty$ as\p a very big positive number.</p><p>Since a really big positive number minus a small number (like $\b{c}\ln(\r{a})$) is a\p really big positive number,\p $$\infty-\b{c}\ln(\r{a})=\p{\infty}$$</p><p><b>Note: WebAssign is looking for DNE instead. I will accept both $\infty$ and the DNE on the exam.</b></p>`
                ]
            },
            specific:coxex(9,2)
        },
        examples: [
            coxex(3,5),
            coxex(9,4),
            coxex(8,7),
            coxex(5,2),
            coxex(7,9)
        ],
    },
    {
        name: String.raw`Calculating the Improper Integral of $\frac{c}{x^{n}}$`,
        backgroundColor: "green",
        web: "Hw 3: 1, 5-7, 9; Hw 4: 1-7, 11; Hw 5: 2, 5-7; PT 2: 1-6, 8; Hw 6: 4, 7, 9-10; PT 3: 8; Hw 9: 8, 10; PF: 4, 6, 10-12, 14-15",
        book: "148",
        exam: "Up to one question on Test 2, Up to one question on Final",
        intro: String.raw`<p>In this section we will find improper integrals of $\frac{\b{c}}{x^{\g{n}}}$\p, where a $\g{n}$ is a whole number bigger than $1$.</p>`,
        rightColWidth: 90,
        steps: {
            general:{
                question:String.raw`Calculate $\iep{\r{a}}{\infty}{\frac{\b{c}}{x^{\g{n}}}}$`,
                steps:[
                    String.raw`<p>To calculate the integral, we first want to\p rewrite $\frac{\b{c}}{x^{\g{n}}}$ as\p $$\frac{\b{c}}{x^{\g{n}}}=\b{c}x^{-\g{n}}$$</p>`,
                    String.raw`<p>The first step of calculating an integral with endpoints is to\p calculate the integral without endpoints\p and\p add the bar with the endpoints:</p>`,
                    String.raw`<p>Then plug in the endpoints and subtract to get rid of the bar</p>`,
                    String.raw`<p>We will now use the fact that \p$\hi{(\infty)^{\t{negative power}}=\p{0}}$</p><p><b>Note: (this will be provided on the equation sheet for the exam)</b></p>`,
                ]
            },
            specific:coxnex(9,4,3)
        },
        examples: [
            coxnex(3,2,2),
            coxnex(5,4,6),
            coxnex(8,5,3),
            coxnex(9,2,7),
            coxnex(3,6,3),
        ],
    },
    // {
    //     name: String.raw`Calculating the Improper Integral of $e^{-cx}$`,
    //     backgroundColor: "green",
    //     web: "Hw 3: 1, 5-7, 9; Hw 4: 1-7, 11; Hw 5: 2, 5-7; PT 2: 1-6, 8; Hw 6: 4, 7, 9-10; PT 3: 8; Hw 9: 8, 10; PF: 4, 6, 10-12, 14-15",
    //     book: "148",
    //     exam: "Up to one question on Test 2, Up to one question on Final",
    //     intro: String.raw`<p>In this section we will find improper integrals of\p $e^{-\b{c}x}$</p>`,
    //     rightColWidth: 90,
    //     steps: {
    //         general:{
    //             question:String.raw`Find $\iep{\r{a}}{\infty}{e^{-\b{c}x}}$`,
    //             steps:[
    //                 String.raw`<p>The first step of calculating an integral with endpoints is to\p calculate the integral without endpoints\p and\p add the bar with the endpoints:</p>`,
    //                 String.raw`<p>Then plug in the endpoints and subtract to get rid of the bar</p>`,
    //                 String.raw`<p>You can think of $\infty$ as a\p really big positive number\p and\p $-\infty$ as a\p really big negative number.</p><p>Since $-\b{3}$ times a big positive number is a\p big negative number,\p $-\b{3}(\infty)=\p{-\infty}$</p>`,
    //                 String.raw`<p>Finally, we use the fact that \p$\hi{e^{-\infty}=\p{0}}$</p><p><b>Note: this fact will be on the formula sheet for the exam</b></p>`
    //             ]
    //         },
    //         specific:ecx(9,2)
    //     },
    //     examples: [
    //         ecx(3,8),
    //         ecx(5,4),
    //         ecx(8,5),
    //         ecx(2,9),
    //         ecx(3,6),
    //     ],
    // },
    {
        name: String.raw`Solving $\frac{dy}{dx}=cx^ny$`,
        backgroundColor: "green",
        web: "Hw 3: 1, 5-7, 9; Hw 4: 1-7, 11; Hw 5: 2, 5-7; PT 2: 1-6, 8; Hw 6: 4, 7, 9-10; PT 3: 8; Hw 9: 8, 10; PF: 4, 6, 10-12, 14-15",
        book: "148",
        exam: "Up to one question on Test 2, Up to one question on Final",
        intro: String.raw`<p>In this section, we will solve $\frac{dy}{dx}=\b{c}x^{\r{n}}y$</p>`,
        rightColWidth: 90,
        steps: {
            general:{
                question:String.raw`Solve $\frac{dy}{dx}=\b{c}x^{\r{n}}y$`,
                steps:[
                    String.raw`<p>We first move all of the $y$ stuff to one side and all of the $x$ stuff to the other side by\p multiplying by $dx$\p and \pdividing by $y$</p>`,
                    String.raw`<p>We then integrate both sides \p(don't forget the $+C$)</p>`,
                    String.raw`<p>WebAssign only: simplify the integrals</p>`,
                    String.raw`<p>Finally, we\p cancel the $\ln$\p by\p raising $e$ to the power of both sides</p>`
                ]
            },
            specific:sepvarex(4,3)
        },
        examples: [
            sepvarex(9,2),
            sepvarex(3,2),
            sepvarex(10,4),
            sepvarex(9,8),
            sepvarex(6,2)
        ],
    },
    ],
  }