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
    str=str.replaceAll(/(\\sqrt.*\{.*\})/g,'\\p{$1}')
    str=str.replaceAll(/(\\frac\{.*\}\{.*\})/g,'\\p{$1}')
    str=str.replaceAll(/(\\powfrac\{.*\}\{.*\})/g,'\\p{$1}')
    str=str.replaceAll('+','\\p{+}').replaceAll('-','\\p{-}')
    str=str.replaceAll('x','\\p{x}')
    str=str.replaceAll('h','\\p{h}')
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

convterm=function(str){
    str=str.replace(/\\sqrt\[(.*)\]\{(.*)\}/,'$2^{\\powfrac{1}{$1}}')
    str=str.replace(/\\sqrt\{(.*)\}/,'$1^\\powfrac{1}{2}')
    str=str.replace(/\\frac\{(.*)\}\{x\}/,'$1x^{\\m1}')
    return str.replace(/\\frac\{(.*)\}\{(.*)\^(.*)\}/,'$1$2^{\\m$3}')
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
    let fs1=convterm(fs)
    return {
        question:'<p>Let $f(x)='+rp(fs)+`.$</p><p>Find $f'(x)$</p>`,
        steps:[
            fs.includes('frac')||fs.includes('\\sqrt')?'$f(x)\\p{=}'+addpause(fs1)+'$':'',
            diffterms(fs1)
        ]
    }
}
deriv=function(fs){
    let fs1=convterm(fs);
    let returnstring='$$\\begin{aligned}'+fs.equals(fs1)?'':'f(x)&\\p{=}'+addpause(fs1)+'\\\\[7pt]\\p';
    return returnstring+'{f\'(x)}&\\p{=}'+deriv1(fs)+'\\end{aligned}$$'
}
fpaex=function(fs,a){
    let str=convterm(fs)
    let str1='f\'(x)&\\p{=}'+addpause(deriv1(str))
    let str2='\\p{f\'(\\r{'+a+'})}&\\p{=}'+sub(addpause(deriv1(str)),'x','\\r{'+a+'}')
    return {
        question:'<p>Let $f(x)='+rp(fs)+`.$</p><p>Find $f'(\\r{`+a+`})$</p>`,
        steps:[
            diffterms(str),
            '$$\\begin{aligned}'+str1+'\\\\[4pt]'+str2+'\\end{aligned}$$'
        ]
    }}

lim=function(f,a){
    return limx('x',f,a)
}
liml=function(f,a){
    return limxs('x',f,a,'\\r{-}')
}
limr=function(f,a){
    return limxs('x',f,a,'\\g{+}')
}
quadNum=function(a,b,c){
    let str=('\\p{'+a+'}\\p{x}^\\p{2}\\p{+}\\p{'+b+'}\\p{x}\\p{+}\\p{'+c+'}').replaceAll('\\p{0}\\p{x}^\\p{2}\\p{+}\\p{0}\\p{x}\\p{+}','')
    str=str.replaceAll('\\p{0}\\p{x}^\\p{2}\\p{+}','')
    str=str.replaceAll('\\p{0}\\p{x}\\p{+}','').replaceAll('\\p{1}\\p{x}','\\p{x}');
    str=str.replaceAll('\\p{+}\\p{-','\\p{-').replaceAll('\\p{+}\\p{0}','');
    return str==''?'\\p{0}':str;
}
pic=function(str){
    return '<img src="/pictures/'+str+'" alt="HTML5 Icon" style="width:500px;height:500px;">'
}
linstr=function(a,b){
    return quadNum(0,a,b);
}
bx=function(f,x){
    return f.replaceAll(x,'\\b{'+x+'}')
}
limx=function(x,f,a){
    return limxs(x,f,a,'')
}
// limxs=function(x,f,a,s){
//     let str=s==''?'':'^'+s;
//     return '\\p{\\lim\\limits_{\\b{'+x+'}\\to\\go{'+a+'}'+str+'}}'+f
// }
limxs=function(x,f,a,s){
    let str=s==''?'':'^\\p{'+s+'}';
    return '\\p{\\lim\\limits_{\\p{\\b{'+x+'}}\\p{\\to}\\p{\\go{'+a+'}}'+str+'}}'+f
}
sub=function(str,x,xval){
    return str.replaceAll(x,'{('+xval+')}');
}
rp=function(str){
    return str.replaceAll('\\p{','\\pn{')
}
p=function(str){
    return '\\p{'+str+'}'
}
rpp=function(str){
    return p(rp(str))
}
limex1=function(f,a){
    f=bx(addpause(f),'x')
    let str='$$'+lim(rpp(f),a)+'\\p{=}'+sub(f,'\\b{x}','\\go{'+a+'}')+'$$'
    return{
        question: 'Calculate $'+rp(lim(f,a))+'$',
        steps:[str]
    }
}
limex2=function(f,a,x){
    f=bx(addpause(f),x)
    let str='$$'+limx(x,rpp(f),a)+'\\p{=}'+sub(f,x,'\\go{'+a+'}')+'$$'
    return{
        question: 'Calculate $'+rp(limx(x,f,a))+'$',
        steps:[str]
    }
}
limfac=function(a){
    let b=Math.pow(a,2);
    let strs=['+','-'];
    if(a<0){
        strs=['-','+']
    }
    let c=Math.abs(a);
    let f=bx('\\p{\\frac{\\p{x}^\\p{2}\\p{-}\\p{'+b+'}}{\\p{x}\\p{'+strs[1]+'}\\p{'+c+'}}}','x')
    let str0='$$\\begin{aligned}'+lim(rpp(f),a)+'&\\p{=}'
    let end='\\end{aligned}$$'
    let str=str0+sub(f,'\\b{x}','\\go{'+a+'}')+'\\\\[10pt]&\\p{=}\\p{\\frac{\\p{0}}{\\p{0}}}'+end;
    let str1=str0+lim('\\p{\\frac{\\p{(}\\p{\\b{x}}\\p{-}\\p{'+c+'}\\p{)}\\p{(}\\p{\\b{x}}\\p{+}\\p{'+c+'}\\p{)}}{\\p{\\b{x}}\\p{'+strs[1]+'}\\p{'+c+'}}}',a)+end;
    let f1='\\p{\\b{x}}\\p{'+strs[0]+'}\\p{'+c+'}';
    let str2=str0+lim(f1,a)+end;
    let str3=str0+sub(f1,'\\b{x}','\\go{'+a+'}')+'\\\\[4pt]&\\p{=}\\p{'+2*a+'}'+end;
    return{
        question: 'Calculate $'+rp(lim(f,a))+'$',
        steps:[str,str1,str2,str3]
    }
}
pwfn=function(name,f,g,a,sign1,sign2){
    a='\\go{'+a+'}'
    if(sign1=='<'||sign1=='\\le'){
        f='\\r{'+f+'}';
        g='\\g{'+g+'}';
        sign1='\\r{'+sign1+'}'
        sign2='\\g{'+sign2+'}'
    }
    else{
        f='\\g{'+f+'}';
        g='\\r{'+g+'}';
        sign1='\\g{'+sign1+'}'
        sign2='\\r{'+sign2+'}'
    }
    let i=8;
    if(f.includes('\\frac')){
        i=i+3;
    }
    if(g.includes('\\frac')){
        i=i+3;
    }
    let str=name==''?'':'\\p{'+name+'(x)}\\p{=}'
    str=str+'\\p{\\begin{cases}'+rpp(f)+'&\\p{x}\\p{'+sign1+'}\\p{'+a+'}\\\\['+i+'pt]'+rpp(g)+'&\\p{x}\\p{'+sign2+'}\\p{'+a+'}\\end{cases}}'
    return str.replaceAll('x','\\b{x}')
}
sublim=function(f,a){
    return sub(f,'\\b{x}','\\go{'+a+'}')
}
pwfnex=function(f,g,a,sign1,sign2,k1,k2){
    let fstr='\\p{f(\\b{x})}'
    let qstr='$$'+rpp(pwfn('f',f,g,a,sign1,sign2))+String.raw`$$<span class="invisible">Find each of the following:</span><ol><pli>$`+rp(liml(fstr,a))+`$</pli><pli>$`+rp(limr(fstr,a))+`$</pli><pli>$`+rp(lim(fstr,a))+`$</pli><ol>`;
    f=addpause(f);
    g=addpause(g);
    let f1=f
    let g1=g
    let n1=k1;
    let n2=k2;
    if(sign1=='>'||sign1=='\\ge'){
        f1=g
        g1=f
        n1=k2;
        n2=k1;
    }
    f1=bx('\\r{'+f1+'}','x')
    g1=bx('\\g{'+g1+'}','x')
    let i1=4;
    let i2=4;
    if(f1.includes('\\frac')){
        i1=10;
        i2=i2+3;
    }
    let j1=4;
    let j2=4;
    if(g1.includes('\\frac')){
        j1=10;
        j2=j2+3;
    }
    if(n1 instanceof String &&n1.includes('\\frac')){
        i2=i2+3;
    }
    if(n2 instanceof String &&n2.includes('\\frac')){
        j2=j2+3;
    }
    let str='Since $'+liml(fstr,a)+'\\p{=}'+limr(fstr,a)+'\\p{=}\\p{\\pu{'+n1+'}}$,</p><p>$'+lim(fstr,a)+'\\p{=}\\p{\\pu{'+n1+'}}$';
    if(n1!=n2){
        str='Since $'+liml(fstr,a)+'\\p{\\ne}'+limr(fstr,a)+'$</p><p>$'+lim(fstr,a)+'\\p{=}\\p{\\t{DNE}}$';
    }
    str='What were the $\\rt{left}$ and $\\gt{right}$ limits?\\p$$\\begin{aligned}'+liml(fstr,a)+'&\\p{=}\\p{'+n1+'}\\\\[10pt]'+limr(fstr,a)+'&\\p{=}\\p{'+n2+'}\\end{aligned}$$</p><p>'+str
    a='\\go{'+a+'}'
    return{
        question:qstr,
        steps:[
            `Since $\\b{x}\\to`+a+`^{\\r{-}}$\\p means that\\p $\\b{x}$ is approaching $`+a+`$\\p and\\p ` +
            `<span class='red'>less than</span>\\p $`+a+`$, $`+liml('\\p{f(\\b{x})}',a)+`\\p{=}`+liml(f1,a)+'$$$\\begin{aligned}'+liml(fstr,a)+'&\\p{=}'+liml(f1,a)+'\\\\['+i1+'pt]&\\p{=}'+sublim(f1,a)+'\\\\['+i2+'pt]&\\p{=}\\p{'+n1+'}\\end{aligned}$$',
            'Since $\\b{x}\\to'+a+'^{\\g{+}}$\\p means that\\p $\\b{x}$ is approaching $'+a+'$\\p and\\p<span' +
            ' class="green"> greater than</span>\\p $'+a+'$, $'+limr('\\p{f(\\b{x})}',a)+'\\p{=}'+limr(g1,a)+'$$$\\begin{aligned}'+limr(fstr,a)+'&\\p{=}'+limr(g1,a)+'\\\\['+j1+'pt]&\\p{=}'+sublim(g1,a)+'\\\\['+j2+'pt]&\\p{=}\\p{'+n2+'}\\end{aligned}$$',
            str
        ]
    }
}
va=function(f,a,b){
    let strs=['$$\\begin{aligned}\\r{'+linstr(a,b)+'}&\\p{=}\\p{0}','\\\\[4pt]\\p{\\t{the vertical asymptote is' +
    ' }}\\p{x}&\\p{=}\\p{'+(-b/a)+'}\\end{aligned}$$'];
    if(a!=1&&a!=0&&b!=0){
        strs[1]='\\\\[4pt]\\p{'+a+'}\\p{x}&\\p{=}\\p{'+(-b)+'}'+strs[1];
    }
    return{
        question:'Find the vertical asymptote(s) of $f(x)=\\frac{'+f+'}{\\r{'+rp(linstr(a,b))+'}}$',
        steps:[strs[0]+strs[1]]
    }
}
coef=function(a,c){
    if(a==1){
        return '';
    }
    return a==-1?'\\'+c+'{\\p{-}}':'\\'+c+'{\\p{'+a+'}}';
}
coef1=function(a,c){
    return a==1?'':'^\\'+c+'{\\p{'+a+'}}';
}
li=function(f){
    return '\\p{\\lim\\limits_{x\\to\\infty}}'+f
}
ha=function(a,b,n,m,o1,o2){
    let f=rp('\\frac{'+coef(a,'r')+'x'+coef1(n,'go')+o1+'}{'+coef(b,'pu')+'x'+coef1(m,'g')+o2+'}')
    a='\\r{'+a+'}'
    b='\\pu{'+b+'}'
    let sign='=';
    let str='The horizontal asymptote is $\\p{y}\\p{=}\\p{\\frac{\\p{'+a+'}}{\\p{'+b+'}}}$';
    if(n<m){
        sign='<';
        str='The horizontal asymptote is $\\p{y}\\p{=}\\p{0}$';
        //strc='the denominator has the highest power'
    }
    else if(n>m){
        sign='>';
        str='There are no horizontal asymptotes';
        //strc='the numerator has the highest power'
    }
    n='\\go{'+n+'}'
    m='\\g{'+m+'}'
    //let strc='the numerator and the denominator have the same highest power'
    let cs='$\\p{'+n+'}\\p{'+sign+'}\\p{'+m+'}$'
    let str1='<div class="row"><div class="col">$$\\begin{aligned}\\p{\\go{n}}&\\p{=}\\p{'+n+'}\\\\[4pt]\\p{\\g{m}}&\\p{=}\\p{'+m+'}\\\\[4pt]\\p{\\r{a}}&\\p{=}\\p{'+a+'}\\\\[4pt]\\p{\\pu{b}}&\\p{=}\\p{'+b+'}\\end{aligned}$$</div><div class="col">'+cs+'</div></div>'
    //let str2='Since '+strc+
    return{
        question:'Find the horizontal asymptote(s) of $'+rp(f)+'$',
        steps:[
            str1,
            'Since '+cs+'\\p,</p><p>'+str
        ]
    }
}
let propexp=String.raw`$$\begin{aligned}\g{\p{\frac{\b{c}}{\sqrt{\bk{x}}}}}&\p{=}\p{\b{c}}\p{x}^{\g{\p{-}\p{\powfrac{1}{2}}}}\qquad&\g{\p{\frac{\b{c}}{\bk{x}}}}&\p{=}\p{\b{c}}\p{x}^{\g{\p{-}\p{1}}}\qquad&\p{\b{c}\g{\sqrt{\bk{x}}}}&\p{=}\p{\b{c}}\p{x}^{\g{\p{\powfrac{1}{2}}}}\\\\[20pt]\g{\p{\frac{\b{c}}{\sqrt[\r{n}]{\bk{x}}}}}&\p{=}\p{x}^{\g{\p{-}\p{\powfrac{\p{1}}{\p{\r{n}}}}}}\qquad&\g{\p{\frac{\b{c}}{\bk{x}^{\r{n}}}}}&\p{=}\p{\b{c}}\p{x}^{\p{\g{-}}\p{\r{n}}}\qquad&\p{\b{c}\g{\sqrt[\r{n}]{\bk{x}}}}&\p{=}\p{\b{c}}\p{x}^{\g{\p{\powfrac{\p{1}}{\p{\r{n}}}}}}\end{aligned}$$`
limgraphex=function(gn,a,l,r){
    gn='PT1Graph'+gn;
    let fstr='\\p{f(x)}'
    let str='Since $'+liml(fstr,a)+'\\p{=}'+limr(fstr,a)+'\\p{=}\\p{\\pu{'+l+'}}$,</p><p>$'+lim(fstr,a)+'\\p{=}\\p{\\pu{'+l+'}}$';
    if(l!=r){
        str='Since $'+liml(fstr,a)+'\\p{\\ne}'+limr(fstr,a)+'$</p><p>$'+lim(fstr,a)+'\\p{=}\\p{\\t{DNE}}$';
    }
    str='What were the $\\rt{left}$ and $\\gt{right}$ limits?\\p$$\\begin{aligned}'+liml(fstr,a)+'&\\p{=}\\p{\\r{'+l+'}}\\\\[10pt]'+limr(fstr,a)+'&\\p{=}\\p{\\g{'+r+'}}\\end{aligned}$$</p><p>'+str
    return{
        question:String.raw`<p>Consider the following graph</p><p>`+pic(gn+'NoLim.png')+`</p><p>Calculate <ol><pli>$`+liml('f(x)',a)+`$</pli><pli>$`+limr('f(x)',a)+`$</pli><pli>$`+lim('f(x)',a)+`$</pli></ol></p>`,
        steps:[
            '<p>'+pic(gn+'Left.png')+'</p><p>$$\\begin{aligned}'+liml('f(x)',a)+'\\p{=}\\r{\\pu{'+l+'}}\\end{aligned}$$</p>',
            '<p>'+pic(gn+'Right.png')+'</p><p>$$\\begin{aligned}'+limr('f(x)',a)+'\\p{=}\\g{\\pu{'+r+'}}\\end{aligned}$$</p>',
            '<p>'+pic(gn+'TwoSided.png')+'</p><p>'+str+'</p>'
        ]
    }
}
removeBlue=function(str){
    return str.replaceAll('\\b{','\\pn{')
}

window.j = {
    startCollapsed: false,
    lessonNum: 13,
    lessonName: "Calculating Derivatives Part 1",
    intro:String.raw`<p>The exam will have 7 questions<ol><pli>Question 1: Given three graphs, <span class="invisible">find </span><span class="invisible"> the limit from the left,</span><span class="invisible"> the limit from the right,</span><span class="invisible"> and</span><span class="invisible"> the limit from both sides</span><span class="invisible"> of each graph </span></pli><pli>Question 2:<span class="invisible"> Calculate</span> <span class="invisible">two limits</span><span class="invisible"> by</span><span class="invisible"> plugging in</span></pli><pli>Question 3: <span class="invisible">Calculate</span><span class="invisible"> the left,</span><span class="invisible"> right,</span><span class="invisible"> and</span><span class="invisible"> two-sided limits</span><span class="invisible"> of</span><span class="invisible"> a piecewise function</span></pli><pli>Question 4:<span class="invisible"> Find the</span> <span class="invisible">horizontal asymptotes</span><span class="invisible"> of a fraction</span></pli><pli>Question 5:<span class="invisible"> Find the</span><span class="invisible"> vertical asymptotes of</span><span class="invisible"> a fraction</span></pli><pli>Question 6:<span class="invisible"> Calculate the</span><span class="invisible"> derivative of</span><span class="invisible"> an equation with</span><span class="invisible"> multiple terms</span></pli><pli>Question 7:<span class="invisible"> Calculate</span><span class="invisible"> $f'(a)$</span></pli></ol></p>`,
    sections:[
        {
            name: String.raw`Finding Limits From Graphs`,
            intro: removeBlue(String.raw`<p>In this section,\p we will study\p limits</p><p>We will talk about\p four types of limits: <ol><pli>Left-Sided Limits</pli><pli>Right-Sided Limits</pli><pli>Two-Sided Limits</pli><pli>Limits At Infinity</pli></ol></p><p>$\rt{Left}$-sided limits represent\p the $\pkt{$y$-value}$\p a graph \papproaches\p as\p $x$ \papproaches the\p $\rt{left}$ side of\p $\got{an $x$-value}$.</p><p>For example,\p find the limit as $x$ approaches $\go{20}$\p from the $\rt{left}$\p of the below function</p><p>`+pic('zombieNoLim.png')+String.raw`</p><p>The limit as $x$ approaches $\go{20}$\p from the $\rt{left}$\p is \p$\pkt{10}$\p because\p the $y$-value of \p the graph \papproaches\p $\pk{10}$ \pas $x$ approaches $\go{20}$ \pfrom the $\rt{left}$ side</p><p>`+pic('zombieLeft.png')+String.raw`</p><p>We write the limit as $$`+liml('\\p{f(\\b{x})}','20')+String.raw`\p{=}\p{\pk{10}}$$</p><p>$\gt{Right}$-sided limits represent\p the $\pkt{$y$-value}$\p a graph\p approaches\p as $x$ approaches the\p $\gt{right}$ side of\p $\got{an $x$-value}$.</p><p>For example,\p find the limit as $x$ approaches $\go{20}$\p from the $\gt{right}$\p of the below function</p><p>`+pic('zombieNoLim.png')+String.raw`</p><p>The limit as $x$ approaches $\go{20}$\p from the $\rt{left}$\p is\p $\pkt{4}$\p because \pthe $y$-value of\p the graph \papproaches\p $\pk{4}$ \pas $x$ approaches $\go{20}$\p from the $\gt{right}$ side</p><p>`+pic('zombieRight.png')+String.raw`</p><p>We write the limit as $$`+limr('\\p{f(\\b{x})}','20')+String.raw`\p{=}\p{\pk{4}}$$</p><p>Two-Sided limits represent\p the $\pkt{$y$-value}$\p a graph\p approaches\p as\p $x$ approaches\p an $\got{$x$-value}$\p from both sides.</p><p>Sometimes,\p the two-sided limit\p doesn't exist\p because\p the graph\p approaches different values\p from \pthe $\rt{left}$\p and\p the $\gt{right}$ sides \pof the graph.</p><p>For example,\p find the limit as $x$ approaches $\go{20}$\p for the below graph</p><p>`+pic('zombieNoLim.png')+String.raw`</p><p>\p The two-sided limit\p as $x$ approaches \p $\go{20}$\p doesn't exist\p (written as \pDNE) \pbecause\p the $\pkt{$y$-values}$\p approach $\r{10}$ \pon the\p $\rt{left}$ side \pand \p approach \p$\g{4}$\p on the\p $\gt{right}$ side</p><p>`+pic('zombieTwoSided.png')+String.raw`</p><p>We write the limit as $$`+lim('\\p{f(\\b{x})}',20)+String.raw`\p{=}\p{\t{DNE}}$$</p><p>If the graph approaches the same $\pkt{$y$-value}$\p on both sides,\p then\p the two-sided limit\p is\p equal to\p $\pk{\t{that $y$-value}}$</p><p>For example,\p find the two-sided limit\p as $x$ approaches $\got{40}$\p of the below graph</p><p>`+pic('marginalcostcontinuousNoLim.png')+String.raw`</p><p>The limit\p as $x$ approaches $\got{40}$is\p $\pk{80}$ \pbecause\p the $y$-value \pof the graph\p approaches\p $\pk{80}$ \pas\p $x$ approaches\p $\got{40}$\p from \pboth the left and right</p><p>`+pic('marginalcostcontinuousTwoSided.png')+String.raw`</p><p>We have the following way \pto determine two-sided limits\p from\p the $\rt{left}$\p and\p $\gt{right}$ limits</p><ol><pli><p><span class="hi">If the<span class="invisible"> $\rt{left}$ sided</span><span class="invisible"> and</span><span class="invisible"> the $\gt{right}$-sided limits </span><span class="invisible">are</span><span class="invisible"> the $\pkt{same number}$,</span><span class="invisible"> the two-sided limit</span><span class="invisible"> is\p $\pkt{that number}$.</span></p><p>In equation form,\p if $`+liml('\\p{f(\\b{x})}', 'a')+'\\p{=}'+limr('\\p{f(\\b{x})}','a')+'\\p{=}\\p{\\pkt{a number},}'+`$</p><p>then $`+lim('\\p{f(\\b{x})}', 'a')+`\\p{=}\\p{\\pkt{that number}}$</p></pli><pli><p><span class="hi">If the <span class="invisible">$\\rt{left}$ sided</span><span class="invisible"> and</span><span class="invisible"> $\\gt{right}$ sided limits</span><span class="invisible"> are</span><span class="invisible"> different numbers,</span><span class="invisible"> then</span><span class="invisible"> the two-sided limit</span><span class="invisible"> does not exist.</span></p><p>In equation form,\\p if $`+liml('\\p{f(\\b{x})}','a')+'\\p{\\ne}'+limr('\\p{f(\\b{x})}','a')+`\\p{,}$</p><p>then $`+lim('\\p{f(\\b{x})}','a')+`\\p{=}\\p{\\t{DNE}}$</p></pli></ol><p>The last type of limit\\p we will talk about\\p is\\p limits at infinity.</p>`+String.raw`<p>Limits at infinity describe\p the $\pkt{$y$-value}$\p the graph\p approaches\p on the\p far right side of\p the graph.</p><p>For example,\p find the limit as $x$\p approaches $\infty$ \pof \pthe below graph </p><p>`+pic('TVmarginalNoLim.png')+String.raw`</p><p>the limit as $x$\p approaches $\infty$ \p is $\pkt{50}$ \pbecause \pthe $y$-value of\p the graph \papproaches \p$\pk{50}$\p on the \pfar right side of the graph</p><p>`+pic('TVmarginalatInfinityCopy.png')+`</p><p>We write the limit as $`+li('\\p{f(x)}')+`\\p{=}\\p{\\pk{50}}$</p>`),
            rightColWidth: 90,
            steps: {
                general: {
                    question: String.raw`Given a graph, calculate <ol><pli>$`+liml('\\p{f(x)}','a')+`$</pli><pli>$`+limr('\\p{f(x)}','a')+`$</pli><pli>$`+lim('\\p{f(x)}','a')+`$</pli></ol>`,
                    steps: [
                        `$`+liml('\\p{f(x)}','a')+String.raw`$ is\p the value \pon the\p $y$-axis\p that\p the graph approaches\p as\p $x$ approaches $\go{a}$\p from the\p $\rt{left}$ side`,
                        `$`+limr('\\p{f(x)}','a')+String.raw`$ is\p the value \pon the\p $y$-axis\p that\p the graph approaches\p as\p $x$ approaches $\go{a}$\p from the\p $\gt{right}$ side`,
                        String.raw`<p>To determine $`+lim('\\p{f(\\b{x})}','a')+`$\\p, compare  $`+liml('\\p{f(\\b{x})}','a')+`$\\p and $`+limr('\\p{f(\\b{x})}','a')+`$\\p: <ol><pli>If\\p $`+liml('\\p{f(\\b{x})}','a')+`$\\p and $`+limr('\\p{f(\\b{x})}','a')+`$\\p are\\p both\\p equal to\\p <span class='purple'>the same number</span>,\\p then $`+lim('\\p{f(\\b{x})}','a')+`\\p{=}\\p{\\yut{that number}}$</pli><pli>If\\p $`+liml('\\p{f(\\b{x})}','a')+`$\\p and $`+limr('\\p{f(\\b{x})}','a')+`$\\p are\\p equal to\\p different numbers,\\p then $`+lim('\\p{f(\\b{x})}','a')+`\\p{=}\\p{\\t{DNE}}$</pli></ol></p>`
                    ]
                },
                specific: limgraphex(1,2,2,4)
            },
            examples: [
                limgraphex(2,1,4,4),
                limgraphex(3,4,4,4),
                limgraphex(4,2,2,2),
                limgraphex(5,2,2,2),
                limgraphex(6,3,3,2)
            ],
        },
        {
            name: String.raw`Calculating Limits of non-piecewise functions`,
            intro: String.raw`<p>In this section,\p we discuss how to\p calculate\p the limit \pas\p $\b{x}$ approaches $\got{a number}$ \pof\p non-piecewise functions.</p>`,
            rightColWidth: 90,
            steps: {
                general: {
                    question: String.raw`Calculate $`+rp(lim('\\t{\{a function\}}','a'))+`$`,
                    steps: [
                        String.raw`<p>Plug in \p$\got{what $x$ is approaching}$\p into\p the limit equation</p>`,
                        //`<p>Substitute\p $\go{a}$ \pfor\p $\b{x}$ \pin \p$\t{\{the function\}}$.</p><p>If
                        // there is\p no division by zero,\p the answer you get\p is\p the value of the limit.</p>`,
                    ]
                },
                specific: limex1('2x+4',2)
            },
            examples: [
                limex2('xh^2+2x',0,'h'),
                limex1('4\\sqrt{x}+4',4),
                limex1('9x^2+x',1),
                limex2('xh^2+h^3+x^2',0,'h'),
                limex1('9-2x',3)
            ],
        },
        {
            name: String.raw`Calculating Limits of Piecewise functions`,
            intro: String.raw `<p>In this section,\p we first explain\p what a piecewise function is.</p><p>Then\p we explain how to\p calculate\p limits of\p piecewise functions.</p><p><b>What is a Piecewise Function?</b></p><p>A piecewise function\p is\p an equation like this:$$`+pwfn('f','g(x)','h(x)','a','<','\\ge')+'$$'+
                //Note: instead of $\r{<}$ and $\g{\ge}$ it could also be $\r{\le}$ and $\g{>}$.</p><p>The $\r{<}$ and $\g{\ge}$ could also be switched, with the $\r{<}$ on the bottom row and $\g{\ge}$ on the top row.</p><p>
                `<p>This is an example of piecewise function:$$`+pwfn('f','2x+4','x^3','2','\\ge','<')+String.raw`$$\p When\p substituting an\p <span class='blue'>$\b{x}$-value</span> which is\p <span class='green'>greater than or equal to</span>\p $\go{2}$\p into\p $f(\b{x})$,\p we use\p the function\p $\g{2\b{x}+4}.$</p><p>For example,\p since \p$\p{\b{4}}\p{\g{\ge}}\p{\go{2},}$\p $f(\b{4})\p{=}\g{\p{2}\p{(\b{4})}\p{+}\p{4}}\p{.}$</p><p>When\p substituting an\p <span class='blue'>$\b{x}$-value</span>\p which \pis \p<span class='red'>less than</span> \p$\go{2}$,\p into $f(x)$\p we use\p the function\p $\r{\b{x}^3}.$</p><p>For example,\p since\p $\p{\b{1}}\p{\r{<}}\p{\go{2},}$ $\p{f(\b{1})}\p{=}\p{\r{(\b{1})^\p{3}}}\p{.}$</p>`,
            //`<p><b>How to Calculate Limits of a Piecewise Function?</b></p><p>Since $\b{x}\to\go{a}^{\r{-}}$ means that $\b{x}$ is approaching $\go{a}$ and <span class='red'>less than</span> $\go{a}$, $\displaystyle\lim_{\b{x}\to \go{a}^{\r{-}}}f(x)=\lim_{\b{x}\to\go{a}^{\r{-}}}\r{g(\b{x})}$</p><p>Since $\b{x}\to\go{a}^{\g{+}}$ means that $\b{x}$ is approaching $\go{a}$ and <span class='green'>greater than</span> $\go{a}$, $\displaystyle\lim_{\b{x}\to \go{a}^{\g{+}}}f(x)=\lim_{\b{x}\to\go{a}^{\g{+}}}\g{h(\b{x})}$</p><p> To determine $\displaystyle\lim_{\b{x}\to\go{a}}f(x)$, compare  $\displaystyle\lim_{\b{x}\to \go{a}^{\r{-}}}f(x)$ and $\displaystyle\lim_{\b{x}\to \go{a}^{\g{+}}}f(x)$: <ol><li>If $\displaystyle\lim_{\b{x}\to \go{a}^{\r{-}}}f(x)$ and $\displaystyle\lim_{\b{x}\to \go{a}^{\r{+}}}f(x)$ are both equal to <span class='purple'>the same number</span>, then $\displaystyle \lim_{\b{x}\to\go{a}}f(x)=\yut{that number}$</li><li>$\displaystyle\lim_{\b{x}\to \go{a}^{\r{-}}}f(x)$ and $\displaystyle\lim_{\b{x}\to \go{a}^{\r{+}}}f(x)$ are equal to different numbers, then $\displaystyle\lim_{\b{x}\to \go{a}}f(x)=\t{DNE}$</li></ol></p>`,
            rightColWidth: 90,
            steps: {
                general: {
                    question: String.raw`$$`+rpp(pwfn('f','g(x)','h(x)','a','<','\\ge'))+'\\p{\\text{   OR   }}'+rpp(pwfn('','h(x)','g(x)','a','\\ge','<'))+String.raw`$$\p Find each of the following:<ol><pli>$`+rp(liml('\\p{f(\\b{x})}','a'))+`$</pli><pli>$`+rp(limr('\\p{f(\\b{x})}','a'))+`$</pli><pli>$`+rp(lim('\\p{f(\\b{x})}','a'))+`$</pli><ol>`,
                    steps: [
                        `Since $\\b{x}\\to\\go{a}^{\\r{-}}$\\p means that\\p $\\b{x}$ is approaching $\\go{a}$\\p and\\p <span class='red'>less than</span>\\p $\\go{a}$, $`+liml('\\p{f(\\b{x})}','a')+`\\p{=}`+liml('\\p{\\r{g(\\b{x})}}','a')+`$</p><p>Calculate $`+liml('\\p{\\r{g(\\b{x})}}','a')+`$\\p by\\p plugging in\\p $\\got{what $x$ is approaching}$\\p into\\p $\\r{g(\\b{x})}$</p>`,
                        `Since $\\b{x}\\to\\go{a}^{\\g{+}}$\\p means that\\p $\\b{x}$ is approaching $\\go{a}$\\p and\\p <span class='green'>greater than</span>\\p $\\go{a}$, $`+limr('\\p{f(\\b{x})}','a')+`\\p{=}`+limr('\\p{\\g{h(\\b{x})}}','a')+`$</p><p>Calculate $`+limr('\\p{\\g{h(\\b{x})}}','a')+`$\\p by\\p plugging in\\p $\\got{what $x$ is approaching}$\\p into\\p $\\g{h(\\b{x})}$</p>`,
                        // String.raw`<p>Since $\lb{x}\to\go{a}^{\g{+}}$ means that $\lb{x}$ is approaching $\go{a}$ and <span class='green'>greater than</span> $\go{a}$, $$\lim_{\lb{x}\to \go{a}^{\g{+}}}f(x)=\lim_{\lb{x}\to\go{a}^{\g{+}}}\g{h(\lb{x})}$$Calculate $\lim\limits_{\b{x}\to\go{a}^{\g{+} }}\g{h(\b{x})}$ by substituting $\go{a}$ for $\b{x}$</p>`,
                        String.raw`<p>To determine $`+lim('\\p{f(\\b{x})}','a')+`$\\p, compare  $`+liml('\\p{f(\\b{x})}','a')+`$\\p and $`+limr('\\p{f(\\b{x})}','a')+`$\\p: <ol><pli>If\\p $`+liml('\\p{f(\\b{x})}','a')+`$\\p and $`+limr('\\p{f(\\b{x})}','a')+`$\\p are\\p both\\p equal to\\p <span class='purple'>the same number</span>,\\p then $`+lim('\\p{f(\\b{x})}','a')+`\\p{=}\\p{\\yut{that number}}$</pli><pli>If\\p $`+liml('\\p{f(\\b{x})}','a')+`$\\p and $`+limr('\\p{f(\\b{x})}','a')+`$\\p are\\p equal to\\p different numbers,\\p then $`+lim('\\p{f(\\b{x})}','a')+`\\p{=}\\p{\\t{DNE}}$</pli></ol></p>`
                    ]
                },
                specific: pwfnex('9+x','x^2',2,'>','\\le',11,4)
            },
            examples: [
                pwfnex('4x+1','5',1,'<','\\ge',5,5),
                pwfnex('8x','4x^2',2,'\\ge','<',16,16),
                pwfnex('x^2','x',-1,'>','\\le',1,-1),
                pwfnex('x-2','5x^2-2',0,'\\le','>',-2,-2),
                pwfnex('x^2','5x',3,'<','\\ge',9,15),
            ],
        },
        {
            name: String.raw `Find the horizontal asymptotes of a fraction`,
            intro: String.raw`<p>In this section,\p we discuss\p horizontal asymptotes.</p><p>A horizontal asymptote is\p a horizontal line\p that\p the graph of a function\p $\btip{\t{approaches on the far right of the graph}}{\t{In more complicated situations, a horizontal}\\\t{asymptote could be on the far left side instead}}$</p><p>For example,\p find the\p horizontal asymptote(s) of\p the below graph.</p><p><img src="/pictures/NotesHA1NoLim.png" alt="HTML5 Icon" style="width:500px;height:500px;"></p><p>The horizontal asymptote is `+`$\\p{y}\\p{=}\\p{\\pu{1}}$\\p because\\p the graph approaches\\p the horizontal line $\\p{y}\\p{=}\\p{\\pu{1}}$ on the far right of the graph</p><p>`+pic('NotesHA1AtInfinity.png')+`</p>`//<p>Since $`+li('\\p{f(x)}')+String.raw`\p{=}\p{\put{a number}}$\p means that\p $y$\p approaches\p $y\p{=}\p{\put{that number}}$\p on the\p far right\p of the graph,\p you can find\p a horizontal asymptote\p of $f(x)$\p by\p calculating $`+li('\\p{f(x)}')+`$\\p:
                +`<p>Since $`+li('\\p{f(x)}')+`\\p{=}\\p{\\put{a number}}$\\p means that\\p the $y$ value of the graph\\p approaches $\\p{y}\\p{=}\\p{\\put{that number}}$, 
            <ol><pli>If $`+li('\\p{f(x)}')+String.raw`\p{=}\p{\put{a number},}$\p then\p $\btip{\t{the horizontal asymptote of }f(x)}{f(x)\t{ could have a second horizontal}\\\t{asymptote corresponding to }\displaystyle\lim_{x\to-\infty}f(x)\\\t{but this does not happen in our course}}$\p is $\p{y}\p{=}\p{\put{that number}}$</pli><pli>If $`+li('\\p{f(x)}')+String.raw`\p{=}\p{\infty}$\p,\p then\p $\btip{f(x)\t{ has no horizontal asymptotes}}{f(x)\t{ could still have a horizontal}\\\t{asymptote corresponding to }\displaystyle\lim_{x\to-\infty}f(x)\\\t{but this does not happen in our course}}$</pli></ol>`,
            rightColWidth: 90,
            steps: {
                general: {
                    question: String.raw`Find the horizontal asymptotes of $f(x)=\frac{\r{a}x^{\go{n}}+\t{terms with }x\t{ to powers less than }\go{n}}{\yu{b}x^{\g{m}}+\t{terms with }x\t{ to powers less than }\g{m}}$`,
                    steps: [
                        String.raw`<p>To find the horizontal asymptotes,\p we need to\p calculate\p $`+li('\\p{f(x)}')+String.raw`$</p><p>To do this, \pdetermine whether\p $\btip{\go{n}}{\got{The highest power in the numerator}}$ \pis\p greater than,\p less than,\p or\p equal to\p $\btip{\g{m}}{\gt{The highest power in the denominator}}$</p>`,
                        String.raw`Determine the horizontal asymptote<ol><pli>If $\p{\go{n}}\p{>}\p{\g{m}}\p{,}$ $`+li('\\p{f(x)}')+String.raw`\p{=}\p{\infty}$\p,</p><p>so<span class="invisible"> there are</span> <span class="invisible">no horizontal asymptotes</span></pli><pli>If $\p{\go{n}}\p{=}\p{\g{m}}$\p, $`+li('\\p{f(x)}')+String.raw`\p{=}\p{\frac{\p{\r{a}}}{\p{\yu{b}}}}$\p,</p><p>so<span class="invisible"> the horizontal asymptote</span><span class="invisible"> is</span> $\p{y}\p{=}\p{\frac{\p{\r{a}}}{\p{\pu{b}}}}$</pli><pli>If $\p{\go{n}}\p{<} \p{\g{m},}$ $`+li('\\p{f(x)}')+String.raw`\p{=}\p{0,}$</p><p>so <span class="invisible">the horizontal asymptote </span><span class="invisible">is</span> $\p{y}\p{=}\p{0}$</pli></ol>\p<b>Note:\p always remember to\p include\p $y=$\p in \pthe equation of the horizontal asymptote</b>`,
                    ]
                },
                specific: ha(4,2,5,2,'+3x','-9')
            },
            examples: [
                ha(7,3,2,5,'+x+1','+x^4'),
                ha(4,2,4,4,'+2x^3','+3x^2'),
                ha(9,8,3,2,'-x^2','-x+1'),
                ha(5,5,3,3,'-3x-2','+x^2'),
                ha(1,1,2,3,'-x-1','+6'),
            ],
        },
        {
            name: String.raw `Find the vertical asymptotes of a fraction`,
            intro: String.raw `<p>In this section,\p we describe how to\p find\p the vertical asymptotes\p of\p a function.</p><p>A vertical asymptote\p of a graph\p is\p a vertical line\p that a graph approaches\p $\btip{\t{as }x\t{ approaches }\got{an $x$-value}}{\t{from the right and/or left side}}$</p><p>For example,\p find the\p vertical asymptote(s)\p of the below graph.</p><p><img src="/pictures/NotesVA1NoLim.png" alt="HTML5 Icon" style="width:500px;height:500px;"></p><p>The vertical asymptote of the below graph is $\p{x}\p{=}\p{\go{2}}$\p because\p the graph\p approaches\p the vertical line $\p{x}\p{=}\p{\go{2}}$\p as \p $x$ approaches $\go{2}$</p><p>`+pic('NotesVA1Right.png')+String.raw`</p><p>One can show that\p $x=\go{a}$\p is\p a vertical asymptote\p of $f(x)$\p if $`+liml('\\p{f(x)}','a')+`$\\p and/or $`+limr('\\p{f(x)}','a')+String.raw`$\p are\p either\p $\infty$\p or\p $-\infty$</p><p>`+pic('NotesVA1TwoSided.png')+String.raw`</p>`,
            //`<br>The limit depends on the highest powers in the numerator and denominator<ol><li>If the numerator has the higher power ($\go{n}>\g{m}$),<br>the limit is $\infty$</li><li>If the numerator has the smaller power ($\go{n}<\g{m}$),<br>the limit is $0$</li><li>If the numerator and the denominator have the same power ($\go{n}=\g{m}$),<br>the limit is $\displaystyle\ya{\frac{\r{a}}{\yu{b}}}$</li></ol>`,
            rightColWidth: 90,
            steps: {
                general: {
                    question: String.raw`Find the vertical asymptote(s) of $\frac{\t{\{a numerator\}}}{\rt{\{a denominator\}}}$`,
                    steps: [
                        String.raw`Set $\p{\rt{\{the denominator\}}}\p{=}\p{0}$\p and\p solve for\p $x$.</p><p><b>Note: \pMake sure to\p include $x=$\p in\p the equation(s)\p of\p the vertical asymptote(s)</b>`,
                    ]
                },
                specific: va('x-3',3,6)
            },
            examples: [
                va('x^2+1',1,4),
                va('2x+4',2,-2),
                va('x^2+2x',1,-5),
                va('4',1,-1),
                va('9x',2,4),
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
                specific:diffex('-4x^2+8x-6')
            },
            examples: [
                diffex('8\\sqrt{x}-4x'),
                diffex('x^3-\\frac{2}{x}'),
                diffex('9x^3+10x^2-4'),
                diffex('4x-\\frac{2}{\\sqrt{x}}'),
                diffex('\\sqrt[4]{x}-5'),
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
                specific:fpaex('9x^3','1')
            },
            examples: [
                fpaex('4x^2-1','1'),
                fpaex('8x+4','2'),
                fpaex('x^4-4x','0'),
                fpaex('3x^3-5x','-1'),
                fpaex('9x^2+2x','-2'),
            ],
        },
    ]
}