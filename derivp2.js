rp=function(str){
    return str.replaceAll('\\p{','\\pn{')
}
coef=function(a){
    if(a==1){
        return ''
    }
    return a==-1?'\\p{-}':'\\p{'+a+'}';
}
coefnp=function(a){
    if(a==1){
        return ''
    }
    return a==-1?'-':a;
}

turnblack=function(str){
    let strs=['r','b','lb','pk','pu','yu','yk','g','o','go']
    for(let i=0;i<strs.length;i++){
        str=str.replaceAll('\\'+strs[i]+'{','\\pn{')
    }
    return str;
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
    // str=str.replaceAll(/(\\sqrt.*\{.*\})/g,'\\p{$1}')
    // str=str.replaceAll(/(\\frac\{.*\}\{.*\})/g,'\\p{$1}')
    // str=str.replaceAll(/(\\powfrac\{.*\}\{.*\})/g,'\\p{$1}')
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
    c=c==''?' ':c;
    let n=str.substring(i+2).replaceAll('powfrac','frac');//parseInt
    let n1=n.replaceAll('frac','powfrac')
    return [n+'\\cdot'+c+'\\p{x}^{'+n1+'\\p{-}\\p{1}}']
}
coef1p=function(c){
    return c==1?'':'^\\p{'+c+'}'
}
diffcxn1=function(str){
    let i=str.search('x\\^');
    let c=parsec(str.slice(0,i));
    let n=parseInt(str.substring(i+2));
    return ['\\p{'+n*c+'}\\p{x}'+coef1p(n-1)]
}

convterm=function(str){
    str=str.replaceAll(/\\sqrt\[(.*)\]\{(.*)\}/,'$2^{\\powfrac{1}{$1}}}')
    str=str.replaceAll(/\\sqrt\{(.*)\}/,'$1^\\powfrac{1}{2}')
    str=str.replaceAll(/\\frac\{(.*)\}\{x\}/,'$1x\\^{\\m1}')
    return str.replaceAll(/\\frac\{(.*)\}\{(.*)\^(.*)\}/,'$1$2\\^{\\m$3}')
}

diffterm=function(str,b){
    if(b==null){
       b=false;
    }
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
        return b?diffcxn1(str):diffcxn(str);
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
        let str1=strs1[0];//'\\p{'+strs1[0]+'}';
        let str2=i>0?str[is[i-1]]:''//'\\p{'+str[is[i-1]]+'}':''
        fps=fps+str2+str1;
    }
    return fps
}
deriv2=function(str){
    let fps='';
    let is=findChar(str,['+','-'])
    let terms=str.split(/[+-]/)
    for(let i=0;i<terms.length;i++){
        let strs1=diffterm(terms[i],true)
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
sap=function(str){
    return str.includes('-')||str.includes('+');
}

ap=function(str,a){
    if(a==null){
        a=-1;
    }
    return sap(str)&&a!=1?'\\p{(}'+str+'\\p{)}':str;
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
let propexpf=String.raw`$$\begin{aligned}\g{\p{\frac{\b{c}}{\sqrt{\pu{g(x)}}}}}&\p{=}\p{\b{c}}\p{(\pu{g(x)})}^{\g{\p{-}\p{\powfrac{1}{2}}}}\qquad&\g{\p{\frac{\b{c}}{\pu{g(x)}}}}&\p{=}\p{\b{c}}\p{(\pu{g(x)})}^{\g{\p{-}\p{1}}}\qquad&\p{\b{c}\g{\sqrt{\pu{g(x)}}}}&\p{=}\p{\b{c}}\p{(\pu{g(x)})}^{\g{\p{\powfrac{1}{2}}}}\\\\[20pt]\g{\p{\frac{\b{c}}{\sqrt[\r{n}]{\pu{g(x)}}}}}&\p{=}\p{\b{c}}\p{(\pu{g(x)})}^{\g{\p{-}\p{\powfrac{\p{1}}{\p{\r{n}}}}}}\qquad&\g{\p{\frac{\b{c}}{(\pu{g(x)})^{\r{n}}}}}&\p{=}\p{\b{c}}\p{(\pu{g(x)})}^{\p{\g{-}}\p{\r{n}}}\qquad&\p{\b{c}\g{\sqrt[\r{n}]{\pu{g(x)}}}}&\p{=}\p{\b{c}}\p{(\pu{g(x)})}^{\g{\p{\powfrac{\p{1}}{\p{\r{n}}}}}}\end{aligned}$$`
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
prex=function(f,g){
    let fp='\\g{'+deriv2(f)+'}';
    let gp='\\b{'+deriv2(g)+'}';
    f='\\pu{'+f+'}'
    g='\\o{'+g+'}'
    return{
        question:String.raw`<p>Let $f(x)=\pu{`+rp(ap(f))+`}\\o{`+rp(ap(g))+`}$</p><p>Calculate $f'(x)$</p>`,
        steps:[
            '$$\\begin{aligned}\\pu{f_1(x)}&\\p{=}\\p{'+f+'}\\\\[4pt]\\p{\\o{f_2(x)}}&\\p{=}\\p{'+g+'}\\end{aligned}$$',
            '$$\\begin{aligned}\\g{f\'_1(x)}&\\p{=}\\p{'+fp+'}\\\\[4pt]\\p{\\b{f\'_2(x)}}&\\p{=}\\p{'+gp+'}\\end{aligned}$$',
            '$$\\begin{aligned}f\'(x)&\\p{=}\\p{'+ap(fp)+'}\\p{\\cdot}\\p{'+ap(g)+'}\\p{+}\\p{'+ap(f)+'}\\p{\\cdot}\\p{'+ap(gp)+'}\\end{aligned}$$'
        ]
    }
}
qrex=function(f,g){
    let fp='\\g{'+deriv2(f)+'}';
    let gp='\\b{'+deriv2(g)+'}';
    f='\\pu{'+f+'}'
    g='\\o{'+g+'}'
    return{
        question:String.raw`<p>Let $f(x)=\frac{\pu{`+f+`}}{\\o{`+g+`}}$</p><p>Calculate $f'(x)$</p>`,
        steps:[
            '$$\\begin{aligned}\\pu{f_1(x)}&\\p{=}\\p{'+f+'}\\\\[4pt]\\p{\\o{f_2(x)}}&\\p{=}\\p{'+g+'}\\end{aligned}$$',
            '$$\\begin{aligned}\\g{f\'_1(x)}&\\p{=}\\p{'+fp+'}\\\\[4pt]\\p{\\b{f\'_2(x)}}&\\p{=}\\p{'+gp+'}\\end{aligned}$$',
            '$$\\begin{aligned}f\'(x)&\\p{=}\\p{\\frac{\\p{'+ap(fp)+'}\\p{\\cdot}\\p{'+ap(g)+'}\\p{-}\\p{'+ap(f)+'}\\p{\\cdot}\\p{'+ap(gp)+'}}{\\p{(}\\p{'+g+'}\\p{)}^\\p{2}}}\\end{aligned}$$'
        ]
    }
}
gprex=function(c,f,n){
    let c1='\\b{'+c+'}'
    c=c==1?'':'\\p{\\b{'+c+'}}'
    let fp='\\g{'+deriv2(f)+'}';
    f='\\pu{'+f+'}'
    n='\\p{\\r{'+n+'}}'
    return{
        question:String.raw`<p>Let $f(x)=`+rp(c+`(`+f+`)^\\r{`+n+`}`)+`$</p><p>Calculate $f'(x)$</p>`,
        steps:[
            '$$\\begin{aligned}\\b{c}&\\p{=}\\p{'+c1+'}\\\\[4pt]\\p{\\pu{g(x)}}&\\p{=}\\p{'+f+'}\\\\[4pt]\\p{\\r{n}}&\\p{=}'+n+'\\end{aligned}$$',
            '$$\\begin{aligned}\\g{g\'(x)}&\\p{=}'+fp+'\\end{aligned}$$',
            '$$\\begin{aligned}f\'(x)&\\p{=}'+n+'\\p{\\cdot}'+c+'\\p{(}\\p{'+f+'}\\p{)}^{'+n+'\\p{-}\\p{1}}\\p{\\cdot}'+ap(addpause(fp))+'\\end{aligned}$$'
        ]
    }
}
pr=String.raw`\p{\frac{d}{dx}}\p{(}\p{\yu{f_1(x)}}\p{\cdot}\p{\o{f_2(x)}}\p{)}\p{=}\p{\g{f_1'(x)}}\p{\cdot}\p{\o{f_2(x)}}\p{+}\p{\yu{f_1(x)}}\p{\cdot}\p{\b{f_2'(x)}}`
qr=String.raw`\p{\frac{d}{dx}}\p{\left(\p{\frac{\p{\yu{f_1(x)}}}{\p{\o{f_2(x)}}}}\right)}\p{=}\p{\frac{\p{\g{f_1'(x)}}\p{\cdot}\p{\o{f_2(x)}}\p{-}\p{\yu{f_1(x)}}\p{\cdot}\p{\b{f_2'(x)}}}{\p{(}\p{\o{f_2(x)}}\p{)}^\p{2}}}`
gpr=String.raw`\p{\frac{d}{dx}}\p{\big(}\p{\b{c}}\p{(}\p{\pu{g(x)}}\p{)}^\p{\r{n}}\p{\big)}\p{=}\p{\r{n}}\p{\cdot}\p{\b{c}}\p{\p{(}\p{\pu{g(x)}}\p{)}^{\p{\r{n}}\p{-}\p{1}}}\p{\cdot}\p{\g{g'(x)}}`
gprpropexp=function(c,f,n,m){
    n=n*Math.sign(m);
    m=Math.abs(m);
    let c1='\\b{'+c+'}'
    c='\\b{'+coef(c)+'}'
    let fp='\\g{'+deriv2(f)+'}';
    f='\\pu{'+f+'}'
    let pow=m==1?'\\r{\\p{'+n+'}}':'\\r{\\p{'+(n<0?'-':'')+'\\frac{\\p{'+Math.abs(n)+'}}{\\p{'+m+'}}}}';
    let powexp=pow.replaceAll('frac','powfrac')
    let fstr1='\\p{('+f+')}'+coef1p(Math.abs(n));
    if(m!=1){
        fstr1=('\\p{\\sqrt[\\p{'+m+'}]{\\p{'+f+'}}}').replaceAll('[\\p{2}]','')
    }
    if(m==1&&n==-1){
        fstr1=f;
    }
    let fstr=c+fstr1
    if(n<0){
        fstr='\\p{\\frac{'+c+'}{'+fstr1+'}}'
    }
    return{
        question:String.raw`<p>Let $f(x)=`+rp(fstr)+`$</p><p>Calculate $f'(x)$</p>`,
        steps:[
            m!=1||n<0?'$\\p{f(x)}\\p{=}'+c+'\\p{('+f+')}^'+powexp+'$':'',
            '$$\\begin{aligned}\\p{\\b{c}}&\\p{=}\\p{'+c1+'}\\\\[4pt]\\p{\\pu{g(x)}}&\\p{=}\\p{'+f+'}\\\\[4pt]\\p{\\r{n}}&\\p{=}'+pow+'\\end{aligned}$$',
            '$$\\begin{aligned}\\g{g\'(x)}&\\p{=}\\p{'+fp+'}\\end{aligned}$$',
            '$$\\begin{aligned}f\'(x)&\\p{=}'+pow+'\\p{\\cdot}'+c+'\\p{(}\\p{'+f+'}\\p{)}^{'+powexp+'\\p{-}\\p{1}}\\p{\\cdot}\\p{'+ap(fp)+'}\\end{aligned}$$'
        ]
    }
}
mp=function(t){
    return t<0?'('+t+')':t;
}
psf=function(x1,y1,m){
    return '\\p{y}\\p{-}\\p{\\g{'+mp(y1)+'}}\\p{=}\\p{\\b{'+m+'}}\\p{(}\\p{x}\\p{-}\\p{\\r{'+mp(x1)+'}}\\p{)}'
}
tanex=function(a,b,f,m){
    let fp=deriv2(f)
    return{
        question:`Find the equation of the line tangent to $f(x)=`+f+`$ at the point $(\\r{`+a+`},\\g{`+b+`})$`,
        steps:[
            '$$f\'(x)\\p{=}'+fp+'$$',
            '$$\\begin{aligned}\\p{\\b{m}}&\\p{=}\\p{f\'}\\p{(\\r{'+a+'})}\\\\[4pt]&\\p{=}'+sub(fp,'x','\\r{'+a+'}')+'\\\\[4pt]\\p{\\b{m}}&\\p{=}\\p{\\b{'+m+'}}\\end{aligned}$$',
            'The equation of the tangent line is$$'+psf(a,b,m)+'$$'
        ]
    }
}
suby=function(f,x1,v,b){
    return (b?'\\p{\\g{y}}':'\\g{y}')+'&\\p{=}\\p{f}\\p{(\\r{'+x1+'})}\\\\[4pt]&\\p{=}'+sub(addpause(f),'x','\\r{'+x1+'}')+'\\\\[4pt]&\\p{=}\\p{\\g{'+v+'}}'
}
rounddigits=function(t,n){
    let s=Math.ceil(Math.log10(Math.abs(t)));
    let a=Math.pow(10,n-s);
    return Math.round(t*a)/a;
}
quadform=function(a,b,c){
    return '\\p{\\frac{\\p{-}\\p{\\b{'+b+'}}\\p{\\pm}\\p{\\sqrt{\\p{\\b{'+b+'}}^\\p{2}\\p{-}\\p{4}\\p{\\pu{'+a+'}}\\p{\\go{'+c+'}}}}}{\\p{2}\\p{\\pu{'+a+'}}}}'
}
htex=function(a,b,c,d){
    let f=(coefnp(a)+'x^3'+'+'+coefnp(b)+'x^2+'+coefnp(c)+'x+'+d).replaceAll('+-','-');
    let fp=deriv2(f);
    let str='\\t{no solution}'
    let str1=''
    let xs=[]
    let xs1=[]
    let str2='Because \\p$f\'(x)$ is\\p never 0,\\p there are\\p no points\\p where\\p $f(x)$ has a\\p horizontal tangent line'
    if(Math.pow(b,2)-4*a*c>=0){
        xs[0]=(-b+Math.sqrt(Math.pow(b,2)-4*a*c))/(2*a);
        xs[1]=(-b-Math.sqrt(Math.pow(b,2)-4*a*c))/(2*a)
        xs1[0]=rounddigits(xs[0],3);
        xs1[1]=rounddigits(xs[1],3);
        str1='$$\\begin{aligned}f(x)&\\p{=}\\p{'+f+'}\\\\[10pt]'
        str2='<p>The points where\\p $f(x)$ has\\p a horizontal tangent line are </p><p>'
        for(let i=0;i<(xs1[0]==xs1[1]?1:2);i++){
            let v=rounddigits(a*Math.pow(xs[i],3)+b*Math.pow(xs[i],2)+c*xs[i]+d,3);
            str1=str1+(i>0?'\\\\[10pt]':'')+suby(f,xs1[i],v,i>0)
            str2=str2+(i>0?'$\\p{,}$ ':'')+'$\\p{(}\\p{\\r{'+xs1[i]+'}}\\p{,}\\p{\\g{'+v+'}}\\p{)}$'
        }
        str='\\p{'+xs1[0]+'}\\p{,}\\ \\p{'+xs1[1]+'}';
        str1=str1+'\\end{aligned}$$'
    }
    return{
        question:String.raw`<p>Find the points where the line tangent to $f(x)=`+f+`$ is horizontal</p>`,
        steps:[
            '$$f\'(x)\\p{=}'+fp+'$$',
            '$$'+fp+'\\p{=}\\p{0}$$$$\\begin{aligned}\\p{x}&\\p{=}'+quadform('a','b','c')+'\\\\[10pt]&\\p{=}'+quadform('('+a+')','('+b+')','('+c+')')+'\\\\[7pt]&\\p{=}'+str+'\\end{aligned}$$',
            str1,str2+'</p>'
        ]
    }
}
const pic=function(str,l){
    return `<p><img src="/pictures/`+str+'.png" alt="HTML5 Icon" style="width:500px;height:500px;"></p>';
}
quopow=function(f,g,n){
    let f1='\\pu{\\frac{'+f+'}{'+g+'}}'
    let fp=deriv2(f)
    let gp=deriv2(g)
    let f1p='\\g{'+'\\p{\\frac{\\p{'+ap(fp)+'}\\p{\\cdot}\\p{'+ap(g)+'}\\p{-}\\p{'+ap(f)+'}\\p{\\cdot}\\p{'+ap(gp)+'}}{\\p{(}\\p{'+g+'}\\p{)}^\\p{2}}}'+'}';
    n='\\p{\\r{'+n+'}}'
    return{
        question:`<p>Let $f(x)=\\left(`+f1+`\\right)^`+rp(n)+`$</p><p>Find $f'(x)$</p>`,
        steps:[
            '$$\\begin{aligned}\\p{\\b{c}}&\\p{=}\\p{\\b{1}}\\\\[4pt]\\p{\\pu{g(x)}}&\\p{=}\\p{'+f1+'}\\\\[4pt]\\p{\\r{n}}&\\p{=}'+n+'\\end{aligned}$$',
            '<p>Since $\\pu{g(x)}\\p{=}\\pu{\\p{\\frac{'+f+'}{'+g+'}}}$\\p is a fraction,\\p' +
            ' we need\\p the quotient rule\\p to calculate' +
            ' \\p$g\'(x)$</p><p>The quotient rule is $$'+turnblack(qr)+'$$</p><p>$$\\begin{aligned}f_1(x)&\\p{=}\\p{'+f+'}\\\\[4pt]\\p{f_2(x)}&\\p{=}\\p{'+g+'}\\\\[4pt]\\p{f\'_1(x)}&\\p{=}\\p{'+fp+'}\\\\[4pt]\\p{f\'_2(x)}&\\p{=}\\p{'+gp+'}\\end{aligned}$$$$\\begin{aligned}\\p{\\g{g\'(x)}}&\\p{=}\\g{\\p{\\frac{\\p{f_1\'(x)}\\p{\\cdot}\\p{f_2(x)}\\p{-}\\p{f_1(x)}\\p{\\cdot}\\p{f_2\'(x)}}{\\p{(f_2(x))}^\\p{2}}}}\\\\[10pt]&\\p{=}\\p{'+f1p+'}\\end{aligned}$$</p>',
            '$$\\begin{aligned}\\p{\\b{c}}&\\p{=}\\p{\\b{1}}\\\\[4pt]\\p{\\pu{g(x)}}&\\p{=}\\p{'+f1+'}\\\\[4pt]\\p{\\r{n}}&\\p{=}'+n+'\\end{aligned}$$$$\\begin{aligned}\\p{f\'(x)}&\\p{=}'+n+'\\p{\\cdot}\\p{\\left(\\p{\\pu{'+f1+'}}\\right)}^{'+n+'\\p{-}\\p{1}}\\p{\\cdot}\\p{\\left('+f1p+'\\right)}\\end{aligned}$$'
        ]
    }
}
window.j = {
    startCollapsed: false,
    lessonNum: 13,
    lessonName: "Calculating Derivatives Part 2",
    intro:String.raw`<p>In this section,\p we will discuss\p more derivative rules</p><p>These will include<ol><pli>The product rule,<span class="invisible"> which is used to calculate derivatives</span><span class="invisible"> of functions being</span><span class="invisible"> multiplied</span></pli><pli>The quotient rule,<span class="invisible"> which is used to calculate derivatives</span><span class="invisible"> of functions being</span><span class="invisible"> divided</span></pli><pli>The generalized power rule,<span class="invisible"> which is used to calculate derivatives</span><span class="invisible"> of functions being</span><span class="invisible"> raised to powers</span></pli></ol></p><p>We will also\p show how to\p combine\p the generalized power rule\p with\p properties of exponents</p>`,
    sections:[
        {
            name: String.raw`Calculating the derivative of functions being multiplied together`,
            intro: String.raw`<p>In this section,\p we show how to\p calculate\p the derivative of\p <span class='purple'>one function</span>\p multipled by\p <span class='orange'>another function</span>.</p><p>We do this with\p the Product Rule:\p $$\begin{flalign}&\frac{d}{dx}\p{(}\p{\yut{\{first function\}}}\p{\cdot}\p{\ot{\{second function\}}}\p{)}\\[10pt]&\quad\p{=}\p{\gt{\{the derivative of the first function\}}}\p{\cdot}\p{\ot{\{the second function\}}}\\[10pt]&\qquad\p{+\ }\p{\yut{\{the first function\}}}\p{\cdot}\p{\bt{\{the derivative of the second function\}}}\\[10pt]&\p{\t{or, }}\p{\t{the abbreviated version,}}\\[10pt]&`+pr+String.raw`\end{flalign}$$</p><p>Warning:\p Even though there is multiplication in $cx^n$,\p it is much easier to use the rule</p><p>$$\p{\frac{d}{dx}}\p{(cx^n)}\p{=}\p{n}\p{\cdot}\p{c}\p{x}^{\p{n}\p{-}\p{1}}$$<span class="invisible">instead</span></p>`,
            rightColWidth: 90,
            steps: {
                general:{
                    question:String.raw`<p>Let $f(x)=\pu{f_1(x)}\o{f_2(x)}$</p><p>Calculate $f'(x)$</p>`,
                    steps:[
                        String.raw`<p>Identify\p $\pu{f_1(x)}$\p and\p $\o{f_2(x)}$</p>`,
                        String.raw`<p>Calculate\p $\g{f_1'(x)}$\p and \p $\b{f_2'(x)}$</p>`,
                        String.raw`<p>Plug into\p the formula \p$$`+pr+`$$</p>`
                    ]
                },
                specific:prex('2x+1','x^2-3')
            },
            examples: [
                prex('4x+5','-2x^2+x'),
                prex('x^2-4','4x^3+2x')
            ],
        },
        {
            name: String.raw`Calculating the derivative of functions being divided`,
            intro: String.raw`<p>In this section,\p we show how to\p calculate\p the derivative of\p <span class='purple'>one function</span>\p divided by\p <span class='orange'>another function</span>.</p><p>We do this with\p the Quotient Rule:\p $$\begin{flalign}&\frac{d}{dx}\p{\left(\p{\frac{\p{\yut{\{numerator\}}}}{\p{\ot{\{denominator\}}}}}\right)}\\[10pt]&\quad\p{=}\p{(}\p{\gt{\{the derivative of the numerator\}}}\p{\cdot}\p{\ot{\{denominator\}}}\\[10pt]&\qquad\frac{\p{-\ }\p{\yut{\{numerator\}}}\p{\cdot}\p{\bt{\{the derivative of the denominator\}}}\p{)}}{\p{(}\p{\ot{denominator}}\p{)}^\p{2}}\\[10pt]&\p{\t{or, }}\p{\t{the abbreviated version,}}\\[10pt]&`+qr+String.raw`\end{flalign}$$</p>`,
            rightColWidth: 90,
            steps: {
                general:{
                    question:String.raw`<p>Let $f(x)=\frac{\pu{f_1(x)}}{\o{f_2(x)}}$</p><p>Calculate $f'(x)$</p>`,
                    steps:[
                        String.raw`<p>Identify\p $\pu{f_1(x)}$\p and\p $\o{f_2(x)}$</p>`,
                        String.raw`<p>Calculate\p $\g{f_1'(x)}$\p and \p $\b{f_2'(x)}$</p>`,
                        String.raw`<p>Plug into\p the formula \p$$`+qr+`$$</p>`
                    ]
                },
                specific:qrex('5-x','3x^2')
            },
            examples: [
                qrex('x^2','4x+1'),
                qrex('4x^2+1','2x-3')
            ],
        },
        {
            name: String.raw`Calculating the derivative of functions being raised to a power`,
            intro: String.raw`<p>In this section,\p we show how to\p calculate\p the derivative of\p <span class='purple'>a function</span>\p raised to <span class='red'>a power</span>.</p><p>We do this with\p the Generalized Power Rule:\p $$\begin{flalign}&\frac{d}{dx}\p{\left(\p{\bt{\{a constant\}}}\p{\cdot}\p{(}\p{\put{\{a function\}}}\p{)}^{\p{\rt{\{a power\}}}}\right)}\\\\[4pt]&\p{=}\p{\rt{\{the power\}}}{}\p{\cdot}{}\p{\bt{\{the constant\}}}\cdot\p{(}\p{\put{\{a function\}}}\p{)}^{\p{\rt{\{the power\}}}\p{-}\p{1}}\p{\cdot}\p{\gt{\{the derivative of the function\}}}\end{flalign}$$\p or, the abbreviated version,$$`+gpr+String.raw`$$</p>`,
            intro: String.raw`<p>In this section,\p we show how to\p calculate\p the derivative of\p <span class='purple'>a function</span>\p raised to <span class='red'>a power</span>.</p><p>We do this with\p the Generalized Power Rule:\p $$\begin{flalign}&\frac{d}{dx}\p{\left(\p{\bt{\{a constant\}}}\p{\cdot}\p{(}\p{\put{\{a function\}}}\p{)}^{\p{\rt{\{a power\}}}}\right)}\\\\[4pt]&\p{=}\p{\rt{\{the power\}}}{}\p{\cdot}{}\p{\bt{\{the constant\}}}\cdot\p{(}\p{\put{\{a function\}}}\p{)}^{\p{\rt{\{the power\}}}\p{-}\p{1}}\p{\cdot}\p{\gt{\{the derivative of the function\}}}\end{flalign}$$\p or, the abbreviated version,$$`+gpr+String.raw`$$</p>`,
            rightColWidth: 90,
            steps: {
                general:{
                    question:String.raw`<p>Let $f(x)=\b{c}(\pu{g(x)})^\r{n}$</p><p>Calculate $f'(x)$</p>`,
                    steps:[
                        String.raw`<p>Identify\p $\b{c}$,\p $\pu{g(x)}$,\p and\p $\r{n}$</p><p><b>Note:\p if there is no $\b{c}$,\p then $\b{c}$ is\p $1$</b></p>`,
                        String.raw`<p>Calculate\p $\g{g'(x)}$</p>`,
                        String.raw`<p>Plug into\p the formula \p$$`+gpr+String.raw`$$</p><p><b>Note:\p If $\b{c}=\b{1}$,\p you don't need to write it</b></p>`
                    ]
                },
                specific:gprex(3,'x+1',2)
            },
            examples: [
                gprex(1,'4x^2+2',4),
                gprex(2,'2x^3-4',-3),
                quopow('3x-7','6x+3',4)
            ],
        },
        {
            name: String.raw`Calculating the derivative of functions with properties of exponents`,
            intro: String.raw`<p>In this section,\p we show how to\p calculate\p the derivative of\p square roots of \p<span class='purple'>functions</span> and \p$\bt{constants}$ divided by $\put{functions}$.</p><p>We do this by combining\p properties of exponents\p with\p the Generalized Power Rule:</p><p>The generalized power rule is given by$$`+gpr+String.raw`$$</p><p>The properties of exponents we will use are`+propexpf+`</p>`,
            rightColWidth: 90,
            steps: {
                general:{
                    question:String.raw`<p>Let $f(x)=\t{\{an equation\}}$</p><p>Calculate $f'(x)$</p>`,
                    steps:[
                        String.raw`<p>Remove\p square roots\p and \p fractions using\p the following\p properties of exponents`+propexpf+`</p>`,
                        String.raw`<p>Identify\p $\b{c}$,\p $\pu{g(x)}$,\p and\p $\r{n}$</p><p><b>Note:\p if there is no $\b{c}$,\p then $\b{c}$ is\p $1$</b></p>`,
                        String.raw`<p>Calculate\p $\g{g'(x)}$</p>`,
                        String.raw`<p>Plug into\p the formula \p$$`+gpr+String.raw`$$</p><p><b>Note:\p If $\b{c}=\b{1}$,\p you don't need to write it</b></p>`
                    ]
                },
                specific:gprpropexp(-2,'3-x',1,3)
            },
            examples: [
                gprpropexp(3,'x^2-x',-1,1),
                gprpropexp(5,'3-x^2',-3,1),
                gprpropexp(4,'x^4+2x^2',-1,2)
            ],
        },
        {
            name: String.raw`Calculating the equation of the tangent line`,
            intro: String.raw`<p>In this section,\p we will discuss how to\p calculate\p the equation of\p the line tangent to\p a function\p at a point</p><p>We use \ptangent lines to\p approximate a function\p when its formula is\p unknown\p or\p too complicated to calculate</p><p>Here are some examples where we could use tangent lines<ol><pli>We know<span class="invisible"> the stock\p and\p its slope\p at a particular time.</span><span class="invisible"> We want to</span><span class="invisible"> predict the price</span><span class="invisible"> in the near future</span><span class="invisible"> without knowledge</span><span class="invisible"> of the future graph</span></pli><pli>We want to approximate the yield of crops</span><span class="invisible"> in a field if we change the amount of fertilizer by a small amount</span><span class="invisible"> but we don't know the formula for yield in terms of fertilizer</span></span></pli><pli>We want to approximate a fish population in the future</span><span class="invisible"> </span><span class="invisible"> but we don't know the formula</span><span class="invisible"> for the population</span></span></pli></ol></p><p>To make the tangent line\p as accurate as possible,\p we want<ol><pli>The $y$-value of the tangent line to be<span class="invisible"> the same as</span><span class="invisible"> the $y$-value of the function</span><span class="invisible"> at the point</span></pli><pli>The slope of the tangent line to be<span class="invisible"> the same as</span><span class="invisible"> the slope of the function</span><span class="invisible"> at the point</span></pli></ol></p><p>`+pic('tangentline')+String.raw`</p><p>As seen in the below picture,\p the tangent line\p at a point\p is close to the graph\p near that point</p><p>We want to find the equation of the tangent line\p with\p point-slope form. For this we need:<ol><pli>The point <span class="invisible">(given)</span><pli>The slope of the line<span class="invisible"> (the same as </span><span class="invisible">the slope of the graph <span class="invisible">at the point)</span></span></pli></ol></p><p><span class="hi">Another word for<span class="invisible"> "the slope at a point" is</span><span class="invisible"> the derivative</span></span></p><p></span>Therefore,<span class="invisible"><span class="hi"> the slope of the tangent line<span class="invisible"> is equal to</span><span class="invisible"> the derivative</span><span class="invisible"> of the function</span><span class="invisible"> at the point</span></span></p>`,
            rightColWidth: 90,
            steps: {
                general:{
                    question:String.raw`<p>Find the equation of the line tangent to $f(x)=\t{\{an equation\}}$ at the point $(\r{x_1},\g{y_1})$</p>`,
                    steps:[
                        String.raw`<p>Find \p$f'(x)$</p>`,
                        String.raw`<p>Find \pthe $\bt{slope}$ of\p the tangent line\p by\p plugging\p the $\rt{$x$-value}$ of the point\p into\p the derivative</p>`,
                        String.raw`<p>Find\p the equation of\p the tangent line\p with\p point-slope form\p$$`+psf('x_1','y_1','m')+`$$</p>`
                    ]
                },
                specific:tanex(2,3,'x^2-1',4)
            },
            examples: [
                tanex(2,3,'x^2-1',4),
                tanex(1,0,'x^3-1',3),
                tanex(0,1,'x^3+x+1',1),
            ],
        },
        {
            name: String.raw`Find where a function has a horizontal tangent line`,
            intro: String.raw`<p>In this section,\p we show how to\p find\p the points where\p a function has\p a horizontal tangent line</p><p><div class="row"><div class="col">`+pic('maxslopes')+`</div><div class="col">`+pic('minslopes')+String.raw`</div></div></p><p>As seen in the below pictures,\p many functions\p have a min or a max\p when they have a\p horizontal tangent line</p><p>We find where\p the tangent line is horizontal\p using\p two observations<ol><pli>The slope of <span class="invisible">a horizontal line</span><span class="invisible"> is $\p{0}$</span></pli><pli><span class="hi">Another word for<span class="invisible"> "the slope at a point" is</span><span class="invisible"> the derivative</span></span></pli></ol></p><p>Based on these two observations,\p a graph has a horizontal tangent line\p when\p its derivative\p is\p 0</p>`,
            rightColWidth: 90,
            steps: {
                general:{
                    question:String.raw`<p>Find the points where the line tangent to $f(x)=\t{\{an equation\}}$ is horizontal</p>`,
                    steps:[
                        String.raw`<p>Find \p$f'(x)$</p>`,
                        String.raw`<p><ol><pli>The slope of <span class="invisible">a horizontal line</span><span class="invisible"> is $\p{0}$</span></pli><pli><span class="hi">Another word for<span class="invisible"> "the slope at a point" is</span><span class="invisible"> the derivative</span></span></pli></ol></p><p>Therefore, we get\p the $\rt{$x$-values}$\p by\p solving \p$f'(x)\p{=}\p{0}$</p>`,
                        String.raw`<p>Get\p the $\gt{$y$-values}$\p by\p plugging in \p the $\rt{$x$-values}$\p into\p $f(x)$</p>`,
                        String.raw`<p>Convert the\p $\rt{$x$-values}$\p and\p $\gt{$y$-values}$\p you found\p into\p points\p using the format $\p{(}\p{\rt{$x$-value}}\p{,}\p{\gt{$y$-value}}\p{)}$</p>`
                    ]
                },
                specific:htex(2,3,1,4)
            },
            examples: [
                htex(2,3,1,4)
            ],
        },
    ]
}