rounddigits=function(t,n){
    if(Math.abs(t)<Math.pow(10,-n)){
        return 0;
    }
    let s=Math.ceil(Math.log10(Math.abs(t)));
    let a=Math.pow(10,n-s);
    return Math.round(t*a)/a;
}
quadform=function(a,b,c){
    return '\\p{\\frac{\\p{-}\\p{\\b{'+b+'}}\\p{\\pm}\\p{\\sqrt{\\p{\\b{'+b+'}}^\\p{2}\\p{-}\\p{4}\\p{\\r{'+a+'}}\\p{\\go{'+c+'}}}}}{\\p{2}\\p{\\r{'+a+'}}}}'
}
quad=function(a,b,c){
    return ('\\r{'+a+'}x^2+\\b{'+b+'}x+\\go{'+c+'}').replaceAll('+\\b{-','\\b{-').replaceAll('+\\go{-','\\go{-')
}
quadformexEqSol=function(a,b,c){
    let returnList=[];
    let list=[];
    let str='\\t{no solution}'
    if(Math.pow(b,2)-4*a*c>=0){
        let x1=rounddigits((-b+Math.sqrt(Math.pow(b,2)-4*a*c))/(2*a),3);
        let x2=rounddigits((-b-Math.sqrt(Math.pow(b,2)-4*a*c))/(2*a),3);
        str='\\p{'+x1+'}\\p{,\\ }\\p{'+x2+'}';
        list.push([x1,x2]);
    }
    returnList.push('\\p{x}&\\p{=}\\p{\\frac{\\p{-}\\p{\\b{b}}\\p{\\pm}\\p{\\sqrt{\\p{\\b{b}}^\\p{2}\\p{-}\\p{4}\\p{\\r{a}}\\p{\\go{c}}}}}{\\p{2}\\p{\\r{a}}}}\\\\[10pt]&\\p{=}'+quadform('('+a+')','('+b+')','('+c+')')+'\\\\[7pt]&\\p{=}'+str)
    return [returnList,list];
}
findFactors=function(c){
    let c1=Math.abs(c);
    let returnList=[];
    if(c1==0){
        returnList.push([0,1]);
    }
    for(let i=1;i<=Math.sqrt(c1);i++) {
        if (c1 % i == 0) {
            if (c < 0) {
                returnList.push([c1 / i, -i]);
                returnList.push([-c1 / i, i]);
            } else {
                returnList.push([c1 / i, i]);
                returnList.push([-c1 / i, -i]);
            }
        }
    }
    return returnList;
}
factorMonicQuadVal=function(b,c){
    if(c==0){
        return [0,b];
    }
    let list=findFactors(c);
    for(let i=0;i<list.length;i++){
        if(list[i][0]+list[i][1]==b){
            return list[i];
        }
    }
    return null;
}
convterm=function(str){
    str=str.replace(/\\sqrt\[(.*)\]\{(.*)\}/,'$2^{\\powfrac{1}{$1}}}')
    str=str.replace(/\\sqrt\{(.*)\}/,'$1^\\powfrac{1}{2}')
    str=str.replace(/\\frac\{(.*)\}\{x\}/,'$1x\\^{\\m1}')
    return str.replace(/\\frac\{(.*)\}\{(.*)\^(.*)\}/,'$1$2\\^{\\m$3}')
}
factorMonicQuad=function(b,c){
    let list=factorMonicQuadVal(b,c);
    return ('\\p{(}'+convertFactor(list[0])+'\\p{)}\\p{(}'+convertFactor(list[1])+'\\p{)}').replaceAll('\\p{(}\\p{x}\\p{)}','\\p{x}')
}

factorMonicQuadFactors=function(b,c){
    let list=factorMonicQuadVal(b,c);
    return [convertFactor(list[0]),convertFactor(list[1])];
}
convertFactor=function(x0,str){
    if(x0<0){
        return '\\p{x}\\p{-'+(-x0)+'}';
    }
    if(x0>0){
        return '\\p{x}\\p{+}\\p{'+x0+'}';
    }
    return '\\p{x}';
}
factorQuad=function(a,b,c){
    if(a==1){
        return factorMonicQuad(b,c);
    }
    if(b%a==0&&c%a==0){
        let b1=b/a;
        let c1=c/a;
        let q=factorMonicQuad(b1,c1);
        if(q==null){
            return '\\p{'+a+'}\\p{(}'+quadNum(1,b1,c1)+'\\p{)}';
        }
        return coef(a)+q;
    }
    return null;
}
coef=function(a){
    if(a==1){
        return '';
    }
    return a==-1?'\\p{-}':'\\p{'+a+'}';
}
quadNum=function(a,b,c){
    let str=('\\p{'+a+'}\\p{x}^\\p{2}\\p{+}\\p{'+b+'}\\p{x}\\p{+}\\p{'+c+'}').replaceAll('\\p{0}\\p{x}^\\p{2}\\p{+}\\p{0}\\p{x}\\p{+}','')
    str=str.replaceAll('\\p{0}\\p{x}^\\p{2}\\p{+}','')
    str=str.replaceAll('\\p{0}\\p{x}\\p{+}','').replaceAll('\\p{1}\\p{x}','\\p{x}');
    str=str.replaceAll('\\p{+}\\p{-','\\p{-').replaceAll('\\p{+}\\p{0}','');
    return str==''?'\\p{0}':str;
}
linstr=function(a,b){
    return quadNum(0,a,b);
}
lineqzero=function(a,b){
    return linEqSolve(a,b,0,0);
}
zerosquadfactor=function(a,b,c){
    if(a==0){
        return lineqzero(b,c);
    }
    let list=factorSolveWork(a,b,c);
    if(list==null){
        return quadformexEqSol(a,b,c);
    }
    return list;
}
//adds orange color to solution
factorSolveWork=function(a,b,c){
    let returnList=[];
    let q=factorQuad(a,b,c);
    if(q==null||b%a!=0||c%a!=0){
        return quadformexEqSol(a,b,c)
    }
    let b1=b/a;
    let c1=c/a;
    returnList.push(quadNum(a,b,c)+'&\\p{=}\\p{0}')
    if(a!=1&&c!=0){
        returnList.push(coef(a)+'\\p{(}'+quadNum(1,b1,c1)+'\\p{)}&\\p{=}\\p{0}');
    }
    returnList.push(q+'&\\p{=}\\p{0}');
    let list=factorMonicQuadFactors(b1,c1);
    let list1=factorMonicQuadVal(b1,c1);
    returnList.push(list[0]+'&\\p{=}\\p{0}\\p{,\\ }'+list[1]+'\\p{=}\\p{0}');
    returnList.push('\\p{x}&\\p{=}\\p{\\o{'+(-list1[0])+'}}\\p{, \\ }\\p{\\o{'+(-list1[1])+'}}')
    return [returnList,list1[0]==list1[1]?-list1[0]:[-list1[0],-list1[1]]];
}
linEqSolve=function(b1,c1,b2,c2){
    let returnList=[addpause(cleancubic(0,0,b1,c1))+'&\\p{=}'+addpause(cleancubic(0,0,b2,c2))];
    let b3=Math.abs(b2-b1);
    let c3=-(c2-c1)*Math.sign(b2-b1);
    if(b1==1&&b2==0&&c1==0||b2==1&&b1==0&&c2==0){
        return [returnList,[c3/b3]];
    }
    if(b1!=1&&(c1!=0||b2!=0)&&(c2!=0||b1!=0)){
        returnList.push(coef(b3)+'\\p{x}&\\p{=}\\p{'+c3+'}')
    }
    if(b3!=1){
        returnList.push('\\p{x}&\\p{=}\\p{\\o{'+(c3/b3)+'}}');
    }
    return [returnList,[c3/b3]];
}

quadEqSolve=function(a1,b1,c1,a2,b2,c2){
    if(a1==0&&a2==0){
        return linEqSolve(b1,c1,b2,c2);
    }
    if(a2==0&&b2==0&&c2==0){
        return zerosquadfactor(a1,b1,c1);
    }
    if(a1==0&&b1==0&&b1==0){
        return zerosquadfactor(a2,b2,c2);
    }
    let returnList=[];
    let a3=Math.abs(a2-a1);
    if(a3==0){
        let b3=Math.abs(b2-b1);
        let c3=-(c2-c1)*Math.sign(b2-b1);
        returnList.push('\\p{'+b3+'}\\p{x}&\\p{=}\\p{'+c3+'}');
        if(b3!=1){
            returnList.push('\\p{x}&\\p{=}\\p{'+(c3/b3)+'}')
        }
        return [returnList,[c3/b3]];
    }
    let b3=(b2-b1)*Math.sign(a2-a1);
    let c3=(c2-c1)*Math.sign(a2-a1);
    let list=factorSolveWork(a3,b3,c3);
    returnList.push(quadNum(a3,b3,c3)+'&\\p{=}\\p{0}');
    returnList.push(...list[0]);
    return [returnList,list[1]];
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
const pic=function(str){
    return `<p><img src="/pictures/`+str+'.png" alt="HTML5 Icon" ></p>';
}

const picsize=function(str,l){
    return `<p><img src="/pictures/`+str+'.png" alt="HTML5 Icon" style="width:'+l+'px;height:'+l+'px;"></p>';
}

const picadv=function (str,l,h,x,y){
    return `<p><img src="/pictures/`+str+'.png" alt="HTML5 Icon" style="width:'+l+'px;height:'+h+'px; object-fit: cover;object-position: '+x+'% '+y+'%;"></p>';//border: 1pt solid #333333;
}

function makezs(xs) {
    let n=xs.length;
    if (xs.length == 0) {
        return [0];
    }
    let zs = [];
    zs[0]=xs[0]>0?0:xs[0]-1;
    for(let i=1;i<n;i++){
        let x1=xs[i-1]+1;
        let x2=xs[i]-1;
        if(xs[i-1]<0&&xs[i]>0){
            zs[i]=0;
        }
        else {
            zs[i]=Math.abs(x1)>Math.abs(x2)?x2:x1;
        }
    }
    zs[n]=xs[n-1]<0?0:xs[n-1]+1;
    return zs;
}
incdecsetup=function(a1,x1,x2,d){
    let list=cubicsetup(a1,x1,x2,d);
    return incdec(list[0],list[1],list[2],list[3],list[4])
}
relmaxminfirstderivsetup=function(a1,x1,x2,d){
    let list=cubicsetup(a1,x1,x2,d);
    return relmaxminfirstderiv(list[0],list[1],list[2],list[3],list[4])
}
concavcubicsetup=function(a1,x1,x2,d){
    let list=cubicsetup(a1,x1,x2,d);
    return concavcubic(list[0],list[1],list[2],list[3])
}
relmaxminsecondderivsetup=function(a1,x1,x2,d){
    let list=cubicsetup(a1,x1,x2,d);
    return relmaxminsecondderiv(list[0],list[1],list[2],list[3])
}
poisetup=function(a1,x1,x2,d){
    let list=cubicsetup(a1,x1,x2,d);
    return poi(list[0],list[1],list[2],list[3])
}

cubicsetup=function(a1,x1,x2,d){//,bincdec
    // if(bincdec==null){
    //     bincdec=true;
    // }
    // if(x1+x2%2!=0){
    //     x1=x1-1;
    // }
    let a=a1;
    let b=-3*a*(x1+x2);
    let c=3*a*x1*x2;
    if(b%2==0){
        b=b/2;
    }
    else if(a%2!=0){
        a=a*2;
        c=c*2;
    }
    // let zs=makezs([(x1+x2)/2]);
    // if(bincdec){
    //     zs=
    // }
    return [a,b,c,d,makezs(x1==x2?[x1]:[x1,x2])];//Doesn't work for cubic but cubic generates its own zs
}

signcharts=function(f,xs,zs){
    let signs=[]
    let strs=[];
    for(let i=0;i<zs.length;i++){
        signs[i]=Math.sign(f(zs[i]))
    }
    for(let i=0;i<3;i++){
        strs[i]=createSignChartCanvas(xs,zs,signs,true,i>0,i>1,i)//signchartfig(f,xs,zs,strs1[i]);
    }
    return strs;
}
convertWork=function(array){
    let str='$$\\begin{aligned}';
    for(let i=0;i<array.length;i++){
        str=str+(i>0?'\\\\[4pt]':'')+array[i]
    }
    return str+'\\end{aligned}$$'
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
    return pic(str+str1+numberline);
}

const fevalsigns=function(f,fs,fn,zs){
    let str='';//'$$\\begin{aligned}';
    for(let i=0;i<zs.length;i++){
        let r='\\p{(\\pu{'+zs[i]+'})}';
        let y=f(zs[i]);
        let ineq='\\g{>0}';
        if(y<0){
            ineq='\\r{<0}';
        }
        str=str+(i>0?'\\\\[16pt]':'')+'\\p{'+fn+r+'}&\\p{=}'+sub(addpause(fs),'x','\\pu{'+zs[i]+'}')+'\\\\[4pt]&\\p{=}\\p{'+y+'}\\p{'+ineq+'}'
        // if(i<zs.length-1){
        //     str=str+'\\\\[4pt]';
        // }
    }
    return str//+'\\end{aligned}$$';//+'}$$</p>'
}

const posnegzs=function(f,xs,zs){
    let n=zs.length-1;
    let pzsi=[];
    let nzsi=[];

    let str='\\p{(}\\p{-}\\p{\\infty}\\p{,}\\p{\\o{'+xs[0]+'}}\\p{)}';
    if(f(zs[0])>=0){
        pzsi=pzsi.concat(str);
    }
    else{
        nzsi=nzsi.concat(str);
    }

    for(let i=1;i<zs.length-1;i++){
        str='\\p{(}\\p{\\o{'+xs[i-1]+'}}\\p{,}\\p{\\o{'+xs[i]+'}}\\p{)}';
        if(f(zs[i])>=0){
            pzsi=pzsi.concat(str);
        }
        else{
            nzsi=nzsi.concat(str);
        }
    }

    str='\\p{(}\\p{\\o{'+xs[n-1]+'}}\\p{,}\\p{\\infty}\\p{)}';
    if(f(zs[n])>=0){
        pzsi=pzsi.concat(str);
    }
    else{
        nzsi=nzsi.concat(str);
    }
    let v=[];
    v.push(pzsi,nzsi);
    return v;
}

const fsignex1=function(fn,szsi,ineq,fps1,ineq11){
    let fpexp1=`<pli>$`+fn+`(x)`;
    if(szsi.length==0){
        if(ineq.length>8){
            ineq=ineq.substring(8);
        }
        return fpexp1+`\\p{\\t{ is}}\\p{\\t{ never }`+ineq+`}$</pli>`;
    }
    fpexp1=fpexp1+ineq+'\\t{ on }';
    for(let i=0;i<szsi.length;i++){
        fpexp1=fpexp1+szsi[i];
        if(i<szsi.length-1){
            fpexp1=fpexp1+'\\p{,}\\ '
        }
    }
    if(fps1.length>0){
        fpexp1=fpexp1+'\\p{\\t{ b/c }}\\p{'+fps1+'(x)}\\p{'+ineq11+'}';
    }
    return fpexp1+'$</pli>';
}

const fsignex=function(fn,pzsi,nzsi,ineq1,ineq2,fps1){
    return '<p><ol>'+fsignex1(fn,pzsi,ineq1,fps1,'\\g{>0}')+fsignex1(fn,nzsi,ineq2,fps1,'\\r{<0}')+'</ol></p>';
}
cleancubic=function(a,b,c,d){
    let str=a+'x^3+'+b+'x^2+'+c+'x+'+d;
    str=str.replaceAll('0x^3+','')
    str=str.replaceAll('0x^2+','')
    str=str.replaceAll('0x+','')
    str=str.replaceAll('+0','')
    str=str.replaceAll('1x','x')
    return str.replaceAll('+-','-')
}

pics=function(strs){
    let str='<div style="position:relative">'
    for(let i=0;i<strs.length;i++){
        str=str+strs[i]
    }
    return str+'</div>'
}

signchartprob=function(a,b,c,d,zs,fps1,qstr1,qstr2){
    let f=cleancubic(a,b,c,d)
    let fp=cleancubic(0,3*a,2*b,c);
    let fpfunc=x=>3*a*Math.pow(x,2)+2*b*x+c;
    let sol=fps1==''?zerosquadfactor(3*a,2*b,c):zerosquadfactor(0,6*a,2*b)
    let zw=convertWork(sol[0])
    let xs=sol[1]
    xs.sort();
    let xssol=xss(xs);
    let str0='';
    let fn=`f'`;
    let strs1=['\\t{ is }\\gt{increasing}','\\t{ is }\\rt{decreasing}',`f'`]
    if(fps1.length>0){
        str0=`f'(x)&\\p{=}`+addpause(fp)+'\\\\[4pt]\\p'
        fpfunc=x=>6*a*x+2*b;
        fp=cleancubic(0,0,6*a,2*b)
        fn=`f''`;
        strs1=['\\t{ is concave }\\gt{up}','\\t{ is concave }\\rt{down}',`f''`];
    }
    let strs=signcharts(fpfunc,xs,zs);
    //let critstr=String.raw`<p>\p$$\gb{`+fp+String.raw`=0}$$`;
    // if(zw.length>0){
    //     critstr=critstr+String.raw`\p$$\bb{\a{`+zw+`}}$$`
    // }
    // critstr=critstr+`\\p$$\\gb{`+xssol+`}$$</p>`;
    let posneg=posnegzs(fpfunc,xs,zs);
    let pzsi=posneg[0];
    let nzsi=posneg[1];
    return {question: String.raw`<p>$$f(x)=`+f+`$$Find the intervals where $f(x)$ is `+qstr1+` and where $f(x)$ is `+qstr2+`</p>`,
        steps: [
            `<p>$$\\begin{aligned}`+str0+`{`+fn+`(x)}&\\p{=}`+addpause(fp)+`\\end{aligned}$$</p>`,
            zw,
            strs[0],//pic(strs)
            strs[1],
            '$$\\begin{aligned}'+fn+'(x)&\\p{=}\\p{'+fp+'}\\\\[8pt]'+fevalsigns(fpfunc,fp,fn,zs)+'\\end{aligned}$$',
            strs[2],
            fsignex(fn,pzsi,nzsi,'\\g{>0}','\\r{<0}',''),
            fsignex('f',pzsi,nzsi,strs1[0],strs1[1],strs1[2]),
        ],
    }
}

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
    str=str.replace(/\\sqrt\[(.*)\]\{(.*)\}/,'$2^{\\powfrac{1}{$1}}}')
    str=str.replace(/\\sqrt\{(.*)\}/,'$1^\\powfrac{1}{2}')
    str=str.replace(/\\frac\{(.*)\}\{x\}/,'$1x\\^{\\m1}')
    return str.replace(/\\frac\{(.*)\}\{(.*)\^(.*)\}/,'$1$2\\^{\\m$3}')
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

suby=function(f,x1,v,b){
    return (b?'\\p{y}':'y')+'&\\p{=}\\p{f}\\p{('+x1+')}\\\\[4pt]&\\p{=}'+sub(addpause(f),'x',x1)+'\\\\[4pt]&\\p{=}\\p{'+v+'}'
}

subypp=function(fpp,x1,v){
    return '\\p{f\'\'}\\p{('+x1+')}\\\\[4pt]&\\p{=}'+sub(addpause(fpp),'x',x1)+'\\\\[4pt]&\\p{=}\\p{'+v+'}'
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

const incdec=function(a,b,c,d,zs){
    return signchartprob(a,b,c,d,zs,'','increasing','decreasing');
}

const concavcubic=function(a,b,c,d){
    let x=-b/(3*a);
    return signchartprob(a,b,c,d,[x-1,x+1],cleancubic(0,0,6*a,2*b),'concave up','concave down');
}

list2str=function(list){
    let str='';
    for(let i=0;i<list.length;i++){
        str=str+(i>0?'\\p{,} ':'')+'\\p{\\o{'+list[i]+'}}'
    }
    return str
}

const fevalsignsDes=function(f,fs,zs){
    let str='$$\\begin{aligned}f\'\'(x)&\\p{=}\\p{'+fs+'}\\\\[6pt]';
    for(let i=0;i<zs.length;i++){
        //let conclusion='\\p{\\t{ could be a max or a min}}'
        let r='\\p{(\\o{'+zs[i]+'})}';
        let y=f(zs[i]);
        let str1='\\p{\\t{ could have}}\\p{\\t{ a max }}\\p{\\t{or}}\\p{\\t{ a min}}'
        let ineq='=0'
        if(y>0){
            ineq='\\g{>0}';
            str1='\\p{\\t{ has a }\\p{\\gt{min}}}'
            //conclusion='\\p{\\t{ is a }\\gt{min}}'
        }
        if(y<0){
            ineq='\\r{<0}';
            str1='\\p{\\t{ has a }\\p{\\rt{max}}}'
            //conclusion='\\p{\\t{ is a }\\rt{max}}'
        }
        str=str+(i>0?'\\\\[16pt]':'')+'\\p{f\'\''+r+'}&\\p{=}'+sub(addpause(fs),'x','\\o{'+zs[i]+'}')+'\\\\[4pt]&\\p{=}\\p{'+y+'}\\p{'+ineq+'}\\\\[6pt]\\p{\\implies}\\p{f(x)}'+str1+'\\p{\\t{ at }}\\p{x=\\o{'+zs[i]+'}}'//\\\\[4pt]&\\p{\\implies}\\p{x}\\p{=}\\p{'+zs[i]+'}'//+conclusion
        // if(i<zs.length-1){
        //     str=str+'\\\\[4pt]';
        // }
    }
    return str+'\\end{aligned}$$';//+'}$$</p>'
}


relmaxminsecondderiv=function(a,b,c,d){
    let fp=cleancubic(0,3*a,2*b,c)
    let fpp=cleancubic(0,0, 6*a,2*b)
    let sol=zerosquadfactor(3*a,2*b,c)
    let zw=convertWork(sol[0])
    let xs=sol[1]
    let list=[String.raw`<p>$$f'(x)\p{=}`+addpause(fp)+`$$</p>`];
    list.push(zw)
    list.push(String.raw`<p>$$\begin{aligned}f'(x)&\p{=}`+addpause(fp)+`\\\\[6pt]f''(x)&\\p{=}`+addpause(fpp)+`\\end{aligned}$$</p>`)
    let xMaxMin=[[],[]];
    let f=x=>6*a*x+2*b;
    let str='<ol>'
    list.push(fevalsignsDes(f,fpp,xs))
    for(let i=0;i<xs.length;i++){
        let x=xs[i];
        let str1='Since $\\p{f\'\'}\\p{(\\o{'+x+'})}'
        let fppv=f(x);
        if(fppv>0){
            xMaxMin[1].push(x)
            //str1=str1+'\\p{\\g{>0}}$<span class="invisible">, $f(x)$ </span><span class="invisible">has a relative' +
            //    ' $\\gt{min}$</span><span class="invisible"> at $x=\\o{'+x+'}$</span>'
        }
        else if(fppv<0){
            xMaxMin[0].push(x)
            //str1=str1+'\\p{\\r{ < 0}}$<span class="invisible">, $f(x)$ has</span><span class="invisible"> a' +
                //' relative $\\rt{max}$</span><span class="invisible"> at $x=\\o{'+x+'}$</span>'
        }
        else{
            //str1=str1+'\\p{=0}$<span class="invisible">, $f(x)$ </span><span class="invisible">could have a
            // relative max, min, or neither.</span><span class="invisible"> use a sign chart</span><span class="invisible"> for </span><span class="invisible">$f\'(x)$</span> to determine <span class="invisible">whether there is</span><span class="invisible"> a max, min, or neither</span><span class="invisible"> at $x=\o{'+x+'}$</span>'
        }
        //str=str+'<pli>'+str1+'</pli>'
    }
    //list.push(str+'</ol>')
    list=list.concat(ypts(a,b,c,d,xMaxMin[0],xMaxMin[1]))
    return{
        question:String.raw`<p>$$f(x)=`+cleancubic(a,b,c,d)+`$$</p><p>Find the relative maxima and minima of $f(x)$</p>`,
        steps:list
    }
}

relmaxminfirstderiv=function(a,b,c,d,zs){
    let list=incdec(a,b,c,d,zs).steps;
    list.pop()
    let sol=zerosquadfactor(3*a,2*b,c)
    let xs=sol[1]
    let list1=minmaxfirstderivx(x=>3*a*Math.pow(x,2)+2*b*x+c,zs,xs)
    let strs=['$\\gt{positive}$','$\\rt{negative}$']
    let strs01=['maxima','minimima']
    let strs2=[];
    for(let i=0;i<2;i++){
        let strs3=['no ','','<span class="invisible"> never </span>']
        if(list[i].length>0){
            strs3=['','<span class="invisible"> at </span><span class="invisible">$x\\p{=}'+list2str(list1[i])+'$</span>','']
        }
        strs2[i]='$f(x)$ has<span class="invisible"> '+strs3[0]+'relative '+strs01[i]+strs3[1]+'</span><span class="invisible"> because </span><span class="invisible">$f\'(x)$ </span>'+strs3[2]+'<span class="invisible">goes from </span><span class="invisible">'+strs[i]+'</span><span class="invisible"> to </span><span class="invisible">'+strs[1-i]+'</span>';
    }
    list.push('<ol><pli>'+strs2[0]+'</pli><pli>'+strs2[1]+'</pli></ol>')
    list=list.concat(ypts(a,b,c,d,list1[0],list1[1]))
    return{
        question:String.raw`<p>$$f(x)=`+cleancubic(a,b,c,d)+`$$</p><p>Find the relative maxima and minima of $f(x)$</p>`,
        steps:list
    }
}
poi=function(a,b,c,d){
    let list=concavcubic(a,b,c,d).steps;
    list.pop()
    let xs=[-b/(3*a)]
    let list1=poix(x=>6*a*x+2*b,[xs[0]-1,xs[0]+1],xs)
    let str='$f(x)$\\p has no points of inflection\\p because\\p $f\'\'(x)$\\p doesn\'t change sign'
    if(xs.length>0){
        str='The point'+as(xs)+' of inflection<span class="invisible"> of $f(x)$ '+(xs.length>1?'are':'is')+'</span><span class="invisible"> at </span><span class="invisible">$x='+list2str(xs)+'$</span><span class="invisible"> because</span><span class="invisible"> $f\'\'(x)$</span><span class="invisible"> changes sign </span><span class="invisible">at '+(xs.length>1?'those':'that')+' $x$-value'+(xs.length>1?'s':'')+'</span>'
    }
    list.push(str)
    list=list.concat(ypts1(a,b,c,d,list1))
    return{
        question:String.raw`<p>$$f(x)=`+cleancubic(a,b,c,d)+`$$</p><p>Find the points of inflection of $f(x)$</p>`,
        steps:list
    }
}
ypts=function(a,b,c,d,xsMin,xsMax){
    let strs01=[['maximum','maxima'],['minimum','minima']]
    let list=[];
    let list1=[xsMin,xsMax]
    let strs3=[]
    let str1='f(x)&\\p{=}\\p{'+cleancubic(a,b,c,d)+'}\\\\[6pt]'
    for(let i=0;i<2;i++){
        let str3=''
        let str2=''
        let str4='no '
        for(let j=0;j<list1[i].length;j++){
            let x=list1[i][j];
            let v=rounddigits(a*Math.pow(x,3)+b*Math.pow(x,2)+c*x+d,3);
            str1=str1+(i+j>0?'\\\\[10pt]':'')+suby(addpause(cleancubic(a,b,c,d)),'\\o{'+x+'}',v,true)
            str3=str3+(j>0?'$\\p{,}$ ':'')+'$\\p{(}\\p{'+x+'}\\p{,}\\p{'+v+'}\\p{)}$'
        }
        if(str3!=''){
            str2='<span class="invisible"> at </span><span class="invisible">the point'+(list1[i].length>1?'s':'')+' '+str3+'</span>'
            str4=list1[i].length==1?'a ':'';
        }
        strs3[i]='$f(x)$ has<span class="invisible"> '+str4+'relative '+strs01[i][list1[i].length==1?0:1]+str2+'</span>';
    }
    list.push('$$\\begin{aligned}'+str1+'\\end{aligned}$$')
    list.push('<ol><pli>'+strs3[0]+'</pli><pli>'+strs3[1]+'</pli></ol>')
    return list;
}
as=function(list){
    return list.length>1?'s':''
}
ypts1=function(a,b,c,d,xs){
    let list=[]
    let str1='f(x)&\\p{=}\\p{'+cleancubic(a,b,c,d)+'}\\\\[6pt]';
    let str3=''
    let str2=''
    let str4='$f(x)$\p has no points of inflection\p because\p $f\'\'(x)$\p doesn\'t change sign'
    for(let j=0;j<xs.length;j++){
        let x=xs[j];
        let v=rounddigits(a*Math.pow(x,3)+b*Math.pow(x,2)+c*x+d,3);
        str1=str1+(j>0?'\\\\[10pt]':'')+suby(addpause(cleancubic(a,b,c,d)),'\\o{'+x+'}',v,true)
        str3=str3+(j>0?'$\\p{,}$ ':'')+'$\\p{(}\\p{'+x+'}\\p{,}\\p{'+v+'}\\p{)}$'
    }
    if(str3!=''){
        str2='<span class="invisible"> at </span><span class="invisible">the point'+(xs.length>1?'s':'')+' '+str3+'</span>'
        str4='The point'+as(xs)+' of inflection\\p of $f(x)$ '+(xs.length>1?'are':'is')+'\\p '+str3+'\\p because\\p $f\'\'(x)$\\p changes sign \\pat '+(xs.length>1?'those':'that')+' point'+as(xs)
    }
    list.push('$$\\begin{aligned}'+str1+'\\end{aligned}$$')
    list.push(str4)
    return list;
}

const minmaxfirstderivx=function(f,zs,xs){
    let signs=findSigns(f,zs);
    let returnList=[[],[]];
    for(let i=0;i<signs.length-1;i++){
        if(signs[i]>0&&signs[i+1]<0){
            returnList[0].push(xs[i]);
        }
        else if(signs[i]<0&&signs[i+1]>0){
            returnList[1].push(xs[i]);
        }
    }
    return returnList;
}

const poix=function(f,zs,xs){
    let signs=findSigns(f,zs);
    let returnList=[];
    for(let i=0;i<signs.length-1;i++){
        if(signs[i]!=signs[i+1]){
            returnList.push(xs[i]);
        }
    }
    return returnList;
}

const findSigns=function(f,zs){
    signs1=[];
    for(let i=0;i<zs.length;i++){
        signs1[i]=1;
        if(f(zs[i])<0){
            signs1[i]=-1;
        }
    }
    return signs1;
}

// const maxminex1=function(ms,mnotM){
//     strs=['maximum','\\gt{positive}','\\rt{negative}'];
//     if(mnotM){
//         strs=['minimum','\\rt{negative}','\\gt{positive}'];
//     }
//     start=String.raw`<pli>$\gb{\begin{flalign}&f(x)\t{ has `;
//     end=String.raw`goes from }`+strs[1]+`\\t{ to }`+strs[2]+`\\end{flalign}}$</pli>`
//     middle=String.raw`}\t{ b/c }f'(x)\\[2pt]&\t{`;
//     if(ms.length==0){
//         return start+String.raw`no relative `+strs[0]+middle+`never `+end
//     }
//     return start+'a relative '+strs[0]+' at $x='+ms+middle+end;
// }

// const maxminex=function(a,b,c,d,zs,fp,fpppint,fppmint){
//     let sol=zerosquadfactor(3*a,2*b,c)
//     let fp=x=>
//     let ss=signs(fp,zs);
//     ms='';
//     let Ms='';
//     for(let i=0;i<xs.length;i++){
//         if(ss[i]<0&&ss[i+1]>0){
//             ms=ms+'\\o{'+xs[i]+'}, \\';
//         }
//         else if(ss[i]>0&&ss[i+1]<0){
//             Ms=Ms+'\\o{'+xs[i]+'}, \\';
//         }
//     }
//     if(ms.length>0){
//         ms=ms.substring(0,ms.length-2)+"$";
//     }
//     if(Ms.length>0){
//         Ms=Ms.substring(0,Ms.length-2)+"$";
//     }
//     v=posnegzs(fp,xs,zs);
//     ans=`<p><ol>`+maxminex1(Ms,false)+maxminex1(ms,true)+'</ol></p>';
//     return {
//         question: String.raw`<p>$f'(x)\g{>0}\t{ on }`+v[0]+String.raw`$ and $f'(x)\r{<0}\t{ on }`+v[1]+String.raw`$.</p>\p<p>$f''(x)\g{>0}\t{ on }`+fpppint+String.raw`$ and $f''(x)\r{<0}\t{ on }`+fppmint+`$</p>\\p<p>Find the $x$-values where $f(x)$ has a relative maximum and the $x$-values where $f(x)$ has a relative minimum</p>`,
//         steps:[
//             signchartfig(fp,xs,zs,'TtFsT'),
//             ans,
//         ]
//     }
// }

drawRec=function(content,x,y,w,h,c){
    content.fillStyle = "rgb("+c[0]+","+c[1]+","+c[2]+")"
    content.fillRect(x-w/2,y-h/2,w,h);
}

drawText=function(content,text,x,y,c,fontsize){
    if(fontsize==null){
        fontsize=30;
    }
    content.font = fontsize+"px Arial";
    content.textAlign = "center";
    content.fillStyle = "rgb("+c[0]+","+c[1]+","+c[2]+")"
    content.fillText(text,x,y);
}
let names=[];
let xssc=[];
let zssc=[];
let signssc=[];
let bxssc=[];
let bzssc=[];
let bsignssc=[];
drawSignChart=function(name,xs,zs,signs,bxs,bzs,bsigns){
    let canvas = document.getElementById(name)
    let content=canvas.getContext("2d");
    let y0=200;
    let M=xs.length;
    let a=canvas.width;
    let dx=8;
    let dycrit=54;
    let dytest=27;
    let xaxish=4;
    let critColor=[253, 119, 0];
    let testColor=[153, 102, 255];
    let deltay=35;
    let deltay2=50;
    let dyplus=40;
    let plusColor=[114, 221, 0];
    let minusColor=[232, 9, 0];
    drawRec(content,a/2,y0,a,xaxish,[0,0,0])
    for(let i=0;i<M+1;i++){
        if(i<M&&bxs){
            let x=a/(M+1)*(i+1)
            drawRec(content,x,y0,dx,2*dycrit,critColor)
            drawText(content,xs[i],x-(xs[i]<0?4:0),y0+dycrit+deltay,critColor)
        }
        let x=a/(M+1)*(i+0.5);
        if(bsigns&&i<signs.length){
            if(signs[i]>0){
                drawRec(content,x,y0-dytest-deltay2-dyplus,2*dyplus,dx,plusColor)
                drawRec(content,x,y0-dytest-deltay2-dyplus,dx,2*dyplus,plusColor)
            }
            if(signs[i]<0){
                drawRec(content,x,y0-dytest-deltay2-dyplus,2*dyplus,dx,minusColor)
            }
        }
        if(bzs&&i<zs.length){
            drawRec(content,x,y0,dx,2*dytest,testColor)
            drawText(content,zs[i],x-(zs[i]<0?4:0),y0+dytest+deltay,testColor)
        }
    }
}

document.addEventListener("DOMContentLoaded", function(event) {
    for(let i=0;i<names.length;i++){
        drawSignChart(names[i],xssc[i],zssc[i],signssc[i],bxssc[i],bzssc[i],bsignssc[i])
    }
});

btotext=function(b){
    return b?'T':'F';
}

signchartName=function(xs,zs,signs,bxs,bzs,bsigns){
    let str='SignChart_xs_';
    for(let i=0;i<xs.length;i++){
        str=str+'_'+xs[i];
    }
    str=str+'_zs_'
    for(let i=0;i<zs.length;i++){
        str=str+'_'+zs[i]
    }
    str=str+'_signs_'
    for(let i=0;i<signs.length;i++){
        str=str+'_'+(signs[i]>0?'p':'m');
    }
    let name=str+'_'+btotext(bxs)+'_'+btotext(bzs)+'_'+btotext(bsigns)
    let count=1;
    while(names.includes(name+'_'+count)){
        count=count+1;
    }
    names.push(name+'_'+count);
    return name+'_'+count;
}

createSignChartCanvas=function(xs,zs,signs,bxs,bzs,bsigns,j){
    let name=signchartName(xs,zs,signs,bxs,bzs,bsigns);
    xssc.push(xs);
    zssc.push(zs);
    signssc.push(signs);
    bxssc.push(bxs);
    bzssc.push(bzs);
    bsignssc.push(bsigns);
    return '<canvas id=' + name + ' width="660" height="300" class="invisible">Your browser does not support the canvas element.</canvas>'//style="position:absolute;top:0;left:0;z-index:'+10*j+'"
}

window.j = {
    startCollapsed: false,
    lessonNum: 10,
    lessonName: "Qualitative Properties of Graphs",
    intro: String.raw`In this lecture,\p we will discuss\p how to use\p derivatives\p to study\p qualitative properties\p of graphs<ol><pli>Increasing and Decreasing Graphs</pli><pli>Maxima and Minima of Graphs</pli><pli>Concave Up and Concave Down Graphs</pli><pli>Points of Inflection</pli><pli>Second Derivative Test</pli></ol>`,
    sections: [
        {
            name: String.raw`Increasing and Decreasing Graphs`,
            backgroundColor: "green",
            web: "Hw 3: 1, 5-7, 9; Hw 4: 1-7, 11; Hw 5: 2, 5-7; PT 2: 1-6, 8; Hw 6: 4, 7, 9-10; PT 3: 8; Hw 9: 8, 10; PF: 4, 6, 10-12, 14-15",
            book: "148",
            exam: "Up to one question on test 2 and up to one question on the final",
            intro: String.raw`<p>`+picsize('incdecslopes',500)+String.raw`</p><p>As seen in the above picture,<ol><pli>$f(x)$ is <span class='green'>increasing</span> when<span class="invisible"> its slope is </span><span class="invisible"><span class='green'>positive</span></span></pli><pli>$f(x)$ is<span class="invisible"><span class='red'> decreasing </span>when</span><span class="invisible"> its slope is </span><span class="invisible"><span class='red'>negative</span></span></pli></ol></p><p><span class="hi">The calculus word for<span class="invisible"> slope at a point is</span><span class="invisible"> the derivative</span></span></p><p>Therefore,<ol><pli><span class="hi">$f(x)$ is $\gt{increasing}$ when <span class="invisible">$f'(x)$</span><span class="invisible"> is</span><span class="invisible"> $\gt{positive}$</span></span></pli><pli><span class="hi">$f(x)$ is $\rt{decreasing}$ when <span class="invisible">$f'(x)$</span><span class="invisible"> is</span><span class="invisible"> $\rt{negative}$</span></span></pli></ol></p>`+picsize('incdecv2',500)+`<p><b>An Example:</b></p><p>If the market share of a business\\p has a $\\gt{positive}$ derivative\\p is the business\\p growing\\p or\\p shrinking?</p><p>If the derivative of\\p market share\\p is $\\gt{positive}$,\\p market share is\\p $\\gt{increasing}$ over time.</p><p>Therefore,\\p the business is\\p $\\gt{growing}$</p>`+`<p><b>A Warning:</b></p><p><b>Note:\\p $f(x)$ is not necessarily\\p $\\g{\\textbf{increasing}}$ when $f(x)$ is $\\g{\\textbf{positive}}$.</b></p><p><b>Whether $f(x)$ is\\p $\\g{\\textbf{increasing}}$\\p only depends on\\p the sign of\\p $f'(x)$.</b></p><p><b>The same goes for $\\r{\\textbf{decreasing}}$</b></p><p><b>How to find where $f(x)$ is increasing and decreasing?</b></p><p>The points where\\p $f(x)$ changes from\\p $\\gt{increasing}$\\p to\\p $\\rt{decreasing}$\\p must satisfy\\p $f'(x)=0$</p><p>We call the points where\\p $f'(x)=0$\\p $\\ot{critical points}$</p>`,
            rightColWidth: 50,
            steps:{
                general:{question:String.raw`<p>$$f(x)=\{\t{an equation}\}$$Find the intervals where $f(x)$ is increasing and where $f(x)$ is decreasing</p>`,
                    steps:[
                        String.raw`<p>Find\p $f'(x)$</p>`,
                        String.raw`<p>\pSolve\p $f'(x)=0$\p to get\p the <span class='orange'>critical points</span></p>`,
                        String.raw`<p>Make a\p number line\p with\p the <span class='orange'>critical points</span> on it</p>`,
                        String.raw`<p>The critical points\p divide the number\p into\p smaller parts\p called\p intervals.</p><p>Add an\p $x$-value\p (called a \p<span class='purple'>test point</span>)\p to\p each interval</p>`,
                        String.raw`<p>Calculate\p $f'\p{(\put{each test point})}$\p and\p determine\p whether it is \p<span class='green'>positive</span>\p or\p <span class='red'>negative</span>.</p>`,//It is often easier to calculate using the factored version of $f'(x)$</p>`,
                        String.raw`<p>Add a\p $\g{+}$ sign\p above\p each interval containing\p a test point\p with a\p <span class='green'>positive</span> $f'$ value\p and a\p $\r{-}$ sign\p above \peach interval containing\p a test point\p with a \p<span class='red'>negative</span> $f'$ value</p>`,
                        String.raw`<p>Determine the intervals where\p $f'(x)$\p is\p <span class='green'>positive</span>\p and\p <span class='red'>negative</span><ol><pli>$f'(x)\g{>0}$ in<span class="invisible"> the intervals</span><span class="invisible"> with a</span><span class="invisible"> $\g{+}$ sign </span><span class="invisible">above them</span></pli><pli>$f'(x)\r{<0}$ in<span class="invisible"> the intervals</span><span class="invisible"> with a</span><span class="invisible"> $\r{-}$ sign</span><span class="invisible"> above them.</span></pli></ol></p><p><b>Note:\p The endpoints of\p the intervals are the\p $\btip{\o{\textbf{critical points}}}{x\t{-values where }f'(x)=0}$ \pnot\p the $\btip{\pu{\textbf{test points}}}{\t{the }x\t{-values on each side of the critical points}}$</b></p>`,
                        String.raw`<p>Determine\p the intervals where\p $f(x)$ is\p <span class='green'>increasing</span>\p and\p <span class='red'>decreasing</span><ol><pli>$f(x)$ is <span class="invisible"><span class='green'>increasing</span></span><span class="invisible"> on </span><span class="invisible">the intervals where</span><span class="invisible"> $f'(x)\g{>0}$</span></pli><pli>$f(x)$ is <span class="invisible"><span class='red'>decreasing</span></span><span class="invisible"> on </span><span class="invisible">the intervals where</span><span class="invisible"> $f'(x)\r{<0}$</span></pli></ol></p><p><b>Note:\p The endpoints of\p the intervals are the\p $\btip{\o{\textbf{critical points}}}{x\t{-values where }f'(x)=0}$\p not\p the $\btip{\pu{\textbf{test points}}}{\t{the }x\t{-values on each side of the critical points}}$</b></p>`,
                    ]
                },
                specific:incdecsetup(1,-1,1,0)
                    //incdec(`2x^3+6x^2+6x`,`6x^2+12x+6`,x=>6*Math.pow(x,2)+12*x+6,String.raw`6(x^2+2x+1)&=0\\[4pt]6(x+1)(x+1)&=0\\[4pt]x+1=0,\ x+1&=0`,[-1],[-2,0]),
            },
            examples: [
                incdecsetup(1,0,2,0),
                incdecsetup(1,1,3,0),
                incdecsetup(-1,-4,0,5)//need to be sorted
                // incdec(`x^3-3x`,`3x^2-3`,x=>3*Math.pow(x,2)-3,String.raw`3(x^2-1)&=0\\[4pt]3(x-1)(x+1)&=0\\[4pt]x-1=0,\ x+1&=0`,[-1,1],[-2,0,2]),
                // incdec(`-2x^3+3x^2+12x`,`-6x^2+6x+12`,x=>-6*Math.pow(x,2)+6*x+12,String.raw`-6(x^2-x-2)&=0\\[4pt]-6(x-2)(x+1)&=0\\[4pt]x-2=0,\ x+1&=0`,[-1,2],[-2,0,3]),
                // incdec(`x^3-3x^2`,`3x^2-6x`,x=>3*Math.pow(x,2)-6*x,String.raw`3x(x-2)&=0\\[4pt]3x=0,\ x-2&=0`,[0,2],[-1,1,3]),
                // incdec(`-x^3-3x^2`,`-3x^2-6x`,x=>-3*Math.pow(x,2)-6*x,String.raw`-3x(x+2)&=0\\[4pt]-3x=0,\ x+2&=0`,[-2,0],[-3,-1,1]),
                // incdec(`x^3+3x^2-24x+1`,`3x^2+6x-24`,x=>3*Math.pow(x,2)+6*x-24,String.raw`3(x^2+2x-8)&=0\\[4pt]3(x+4)(x-2)&=0\\[4pt]x+4=0,\ x-2&=0`,[-4,2],[-5,0,3]),
            ],
        },
        {
            name: String.raw`Find relative maximum and minimum using the first derivative test`,
            backgroundColor: "green",
            web: "Hw 3: 1, 5-7, 9; Hw 4: 1-7, 11; Hw 5: 2, 5-7; PT 2: 1-6, 8; Hw 6: 4, 7, 9-10; PT 3: 8; Hw 9: 8, 10; PF: 4, 6, 10-12, 14-15",
            book: "148",
            exam: "Up to one question on test 2 and up to one question on the final",
            intro: String.raw`<p>In this section,\p we will discuss\p maxima\p and\p minima</p><p>From the previous section,\p $f(x)$ is $\gt{increasing}$ when\p $f'(x)\g{>0}$\p and\p $f(x)$ is $\rt{decreasing}$ when\p $f'(x)\r{<0}$.</p><p>Therefore,\p a graph of a max\p and\p the graph of a min\p would like the below graphs</p><p><div class="row"><div class="col">`+picsize('min1stderiv',500)+`</div><div class="col"></div>`+picsize('max1stderiv',500)+String.raw`</div></p><p>As seen in the below pictures,<ol><pli><span class="hi">$f(x)$ has a min when <span class="invisible">$f'(x)$</span><span class="invisible"> goes from </span><span class="invisible">$\rt{negative}$</span><span class="invisible"> to  </span><span class="invisible">$\gt{positive}$</span></span></pli><pli><span class="hi">$f(x)$ has a max when <span class="invisible">$f'(x)$</span><span class="invisible"> goes from </span><span class="invisible">$\gt{positive}$</span><span class="invisible"> to  </span><span class="invisible">$\rt{negative}$</span></span></pli></ol></p>`,
            rightColWidth: 50,
            steps:{
                general:{
                    question:String.raw`<p>$$f(x)=\{\t{an equation}\}$$</p><p>Find the relative maxima and minima of $f(x)$</p>`,
                    steps:[
                        String.raw`<p>Find\p $f'(x)$</p>`,
                        String.raw`<p>\pSolve\p $f'(x)=0$\p to get\p the <span class='orange'>critical points</span></p>`,
                        String.raw`<p>Make a\p number line\p with\p the <span class='orange'>critical points</span> on it</p>`,
                        String.raw`<p>The critical points\p divide the number\p into\p smaller parts\p called\p intervals.</p><p>Add an\p $x$-value\p (called a \p<span class='purple'>test point</span>)\p to\p each interval</p>`,
                        String.raw`<p>Calculate\p $f'\p{(\put{each test point})}$\p and\p determine\p whether it is <span class='green'>positive</span>\p or\p <span class='red'>negative</span>.</p>`,//It is often easier to calculate using the factored version of $f'(x)$</p>`,
                        String.raw`<p>Add a\p $\g{+}$ sign\p above\p each interval containing\p a test point\p with a\p <span class='green'>positive</span> $f'$ value\p and a\p $\r{-}$ sign\p above \peach interval containing\p a test point\p with a \p<span class='red'>negative</span> $f'$ value</p>`,
                        String.raw`<p>Determine the intervals where\p $f'(x)$\p is\p <span class='green'>positive</span>\p and\p <span class='red'>negative</span><ol><pli>$f'(x)\g{>0}$ in<span class="invisible"> the intervals</span><span class="invisible"> with a</span><span class="invisible"> $\g{+}$ sign </span><span class="invisible">above them</span></pli><pli>$f'(x)\r{<0}$ in<span class="invisible"> the intervals</span><span class="invisible"> with a</span><span class="invisible"> $\r{-}$ sign</span><span class="invisible"> above them.</span></pli></ol></p><p><b>Note:\p The endpoints of\p the intervals are the\p $\btip{\o{\textbf{critical points}}}{x\t{-values where }f'(x)=0}$ \pnot\p the $\btip{\pu{\textbf{test points}}}{\t{the }x\t{-values on each side of the critical points}}$</b></p>`,
                        String.raw`<p>Determine\p the $x$-values of the\p relative maxima and minima\p of\p $f(x)$<ol><pli><span class="hi">$f(x)$ has a <span class="invisible">relative max</span><span class="invisible"> at a </span><span class="invisible">$\ot{critical point}$ </span><span class="invisible"> where</span><span class="invisible"> $f'(x)$ </span><span class="invisible">goes from </span><span class="invisible">$\gt{positive}$ </span><span class="invisible">to</span><span class="invisible"> $\rt{negative}$</span></span></pli><pli><span class="hi">$f(x)$ has a <span class="invisible">relative min</span><span class="invisible"> at a </span><span class="invisible">$\ot{critical point}$ </span><span class="invisible"> where</span><span class="invisible"> $f'(x)$ </span><span class="invisible">goes from </span><span class="invisible">$\rt{negative}$ </span><span class="invisible">to</span><span class="invisible"> $\gt{positive}$</span></span></pli></ol></p><p><b>Note:\p Maxima\p and \p minima\p are points\p or $x$-values\p</b></p><p><b>They are not intervals</b></p>`,
                        String.raw`<p>Determine the\p $y$-values\p of\p the maxima and minima\p by\p substituting the\p $\ot{$x$-values}$\p into\p $f(x)$</p><p><b>Note: Do not \puse $f'(x)$\p to calculate\p the $y$-values.\p Use $f(x)$ instead</b></p>`,
                        String.raw`<p>Write the\p relative maxima and minima\p in the form $$\p{(}\p{\t{$x$-value}}\p{,}\p{\t{$y$-value}}\p{)}$$</p>`
                    ]
                },
                specific:relmaxminfirstderiv(1,0,-3,0,[-2,0,2])
                //incdec(`2x^3+6x^2+6x`,`6x^2+12x+6`,x=>6*Math.pow(x,2)+12*x+6,String.raw`6(x^2+2x+1)&=0\\[4pt]6(x+1)(x+1)&=0\\[4pt]x+1=0,\ x+1&=0`,[-1],[-2,0]),
            },
            examples: [
                relmaxminfirstderiv(1,-3,0,0,[-1,1,3]),
                relmaxminfirstderiv(1,-6,9,0,[0,2,4]),
                //relmaxminfirstderivsetup(-1,-4,0,5)
                // incdec(`x^3-3x`,`3x^2-3`,x=>3*Math.pow(x,2)-3,String.raw`3(x^2-1)&=0\\[4pt]3(x-1)(x+1)&=0\\[4pt]x-1=0,\ x+1&=0`,[-1,1],[-2,0,2]),
                // incdec(`-2x^3+3x^2+12x`,`-6x^2+6x+12`,x=>-6*Math.pow(x,2)+6*x+12,String.raw`-6(x^2-x-2)&=0\\[4pt]-6(x-2)(x+1)&=0\\[4pt]x-2=0,\ x+1&=0`,[-1,2],[-2,0,3]),
                // incdec(`x^3-3x^2`,`3x^2-6x`,x=>3*Math.pow(x,2)-6*x,String.raw`3x(x-2)&=0\\[4pt]3x=0,\ x-2&=0`,[0,2],[-1,1,3]),
                // incdec(`-x^3-3x^2`,`-3x^2-6x`,x=>-3*Math.pow(x,2)-6*x,String.raw`-3x(x+2)&=0\\[4pt]-3x=0,\ x+2&=0`,[-2,0],[-3,-1,1]),
                // incdec(`x^3+3x^2-24x+1`,`3x^2+6x-24`,x=>3*Math.pow(x,2)+6*x-24,String.raw`3(x^2+2x-8)&=0\\[4pt]3(x+4)(x-2)&=0\\[4pt]x+4=0,\ x-2&=0`,[-4,2],[-5,0,3]),
            ],
        },
        {
            name: String.raw`Concave Up and Concave Down Graphs`,
            backgroundColor: "green",
            web: "Hw 3: 1, 5-7, 9; Hw 4: 1-7, 11; Hw 5: 2, 5-7; PT 2: 1-6, 8; Hw 6: 4, 7, 9-10; PT 3: 8; Hw 9: 8, 10; PF: 4, 6, 10-12, 14-15",
            book: "148",
            exam: "Up to one question on test 2 and up to one question on the final.",
            intro: String.raw`<p>In this section,\p we will discuss\p concave $\gt{up}$\p and \p concave $\rt{down}$ graphs.</p><p><b>What is a concave up graph?</b></p><p><span class="hi">A graph is concave $\gt{up}$ if<span class="invisible"> it has an $\gt{upwards}$ opening</span><span class="invisible"> or</span><span class="invisible"> $\gt{smiley}$ shape:</span></span></p>`+picsize('concaveupex1',500)+String.raw`<p><b>Note:\p The eyeballs are added for comedic effect.\p They are not actually\p part of the graph</b></p><p>The graph might be only part of\p the $\gt{smiley}$ shape:</p><div class="row"><div class="col">`+picsize('concaveupex2',500)+`</div><div class="col">`+picsize('concaveupex3',500)+String.raw`</div></div><p><b>What is a concave down graph?</b></p><p><span class="hi">A graph is concave $\rt{down}$ if<span class="invisible"> it has an $\rt{downwards}$ opening</span><span class="invisible"> or</span><span class="invisible"> $\rt{frowney}$ shape:</span></span></p>`+picsize('concavedownex1',500)+String.raw`<p>The graph might be only part of\p the $\rt{frowney}$ shape:</p><div class="row"><div class="col">`+picsize('concavedownex2',500)+`</div><div class="col">`+picsize('concavedownex3',500)+`</div></div><p>There are also graphs that are\\p concave $\\gt{up}$\\p in somes parts\\p and\\p concave $\\rt{down}$\\p in other parts</p><p>`+picsize('concaveupdowngraph',500)+`</p><p><b>Why do we care about concave up and concave down graphs?</b></p><p><span class="hi">Concavity can be used to<span class="invisible"> describe long term behavior</span></span></p>`
//<div class="row"><div class="col">\`+picsize('concaveup',500)+\`<p>The above graph is\\\\p concave $\\\\gt{up}$</p><p>If a graph is\\\\p concave $\\\\gt{up}$\\\\p and\\\\p $\\\\bt{decreasing}$,\\\\p the graph will\\\\p decrease \\\\pat a slower and slower rate\\\\p and\\\\p may eventually\\\\p start increasing</p><p>If a graph is\\\\p concave $\\\\gt{up}$\\\\p and\\\\p $\\\\pkt{increasing}$,\\\\p the graph will\\\\p increase\\\\p at a faster and faster rate</p><p>For example,<ol><pli>a stock which is<span class="invisible"> concave $\\\\gt{up}$</span><span class="invisible"> and </span><span class="invisible">$\\\\bt{decreasing}$</span><span class="invisible"> is still decreasing</span><span class="invisible"> but</span><span class="invisible"> is starting to recover</span></pli><pli>a stock which<span class="invisible"> is concave $\\\\gt{up}$</span><span class="invisible"> and</span><span class="invisible"> </span><span class="invisible">$\\\\pkt{increasing}$</span><span class="invisible"> is growing</span><span class="invisible"> and</span><span class="invisible"> its growth is</span><span class="invisible"> getting even faster</span></pli></ol></p></div><div class="col">\`+picsize('concavedown',500)+\`<p>The above graph is\\\\p concave $\\\\rt{down}$</p><p>If a graph is\\\\p concave $\\\\rt{down}$\\\\p and\\\\p $\\\\pkt{increasing}$,\\\\p the graph will\\\\p increase \\\\pat a slower and slower rate\\\\p and\\\\p may eventually\\\\p start decreasing</p><p>If a graph is\\\\p concave $\\\\rt{down}$\\\\p and\\\\p $\\\\bt{decreasing}$,\\\\p the graph will\\\\p decrease\\\\p at a faster and faster rate</p><p>For example,<ol><pli>a stock which is<span class="invisible"> concave $\\\\rt{down}$</span><span class="invisible"> and </span><span class="invisible">$\\\\pkt{increasing}$</span><span class="invisible"> is still increasing</span><span class="invisible"> but</span><span class="invisible"> its growth is slowing down</span></pli><pli>a stock which<span class="invisible"> is concave $\\\\rt{down}$</span><span class="invisible"> and</span><span class="invisible"> </span><span class="invisible">$\\\\bt{decreasing}$</span><span class="invisible"> is falling</span><span class="invisible"> and</span><span class="invisible"> it is falling</span><span class="invisible"> at a faster and faster rate</span></pli></ol></p></div></div>
+`<p>Consider the stock of General Motors</p>`+picsize('GM',500)+String.raw`<p>Before the chip shortage,\p GM has\p an improving \plong term behavior</p><p>Even though it starts out decreasing,\p it is decreasing\p at a slower and slower rate</p><p>Then \p the stock\p starts to increase\p and\p begins to increase\p at a faster and faster rate</p><p>During this time,\p GM's stock is\p concave $\gt{up}$</p><p>After the chip shortage began,\p the graph of the stock\p became concave $\rt{down}$</p><p>The increase in the graph\p starts to\p slow down</p><p>Then the graph\p starts to decrease\p and begins\p to decrease\p faster and faster</p><p><b>How we determine when a graph is concave up or concave down?</b></p>`+picadv('concaveuparrows',500,400,0,0)+`<p>The above graph is\\p concave \\p$\\gt{up}$</p><p>What happens to\\p the $\\got{slope}$ of\\p a concave $\\gt{up}$ graph\\p as $x$ increases?</p><p>As $x$ increases,<span class="invisible"> the $\\got{slope}$ of</span><span class="invisible"> a concave $\\gt{up}$ graph</span><span class="invisible"> $\\gt{increases}$</span></p><p><span class="hi">If a function is concave $\\gt{up}$,<span class="invisible"> its $\\got{slope}$ is</span><span class="invisible"> $\\gt{increasing}$</span></span></p><p><span class="hi">If $\\got{a quantity}$ is $\\gt{increasing}$,<span class="invisible"> its derivative is</span><span class="invisible"> $\\gt{positive}$</span></span></p><p>Therefore,\\p the derivative of\\p the $\\got{slope}$\\p of a concave $\\gt{up}$ graph\\p is $\\gt{positive}$</p><p><span class="hi">Another word for $\\got{slope}$<span class="invisible"> is $\\got{the derivative}$</span></span></p><p>Therefore,\\p the derivative of\\p $\\got{the derivative}$ of\\p a concave $\\gt{up}$ graph is\\p $\\gt{positive}$</p><p>In other words,\\pthe second derivative<span class="invisible"> of a concave $\\gt{up}$ graph is</span><span class="invisible"> $\\gt{positive}$</span></p><p><span class="hi">So $f(x)$ is concave $\\gt{up}$ when<span class="invisible"> $f''(x)$ is</span><span class="invisible"> $\\gt{positive}$</span></span></p>`+picadv('concavedownarrowsv2',500,400,0,100)+`<p>The above graph is\\p concave \\p$\\rt{down}$</p><p>What happens to\\p the $\\got{slope}$ of\\p a concave $\\rt{down}$ graph\\p as $x$ increases?</p><p>As $x$ increases,<span class="invisible"> the $\\got{slope}$ of</span><span class="invisible"> a concave $\\rt{down}$ graph</span><span class="invisible"> $\\rt{decreases}$</span></p><p><span class="hi">If a function is concave $\\rt{down}$,<span class="invisible"> its $\\got{slope}$ is</span><span class="invisible"> $\\rt{decreasing}$</span></span></p><p><span class="hi">If $\\got{a quantity}$ is $\\rt{decreasing}$,<span class="invisible"> its derivative is</span><span class="invisible"> $\\rt{negative}$</span></span></p><p>Therefore,\\p the derivative of\\p the $\\got{slope}$\\p of a concave $\\rt{down}$ graph\\p is $\\rt{negative}$</p><p><span class="hi">Another word for $\\got{slope}$<span class="invisible"> is $\\got{the derivative}$</span></span></p><p>Therefore,\\p the derivative of\\p $\\got{the derivative}$ of\\p a concave $\\rt{down}$ graph is\\p $\\rt{negative}$</p><p>In other words,\\p the second derivative<span class="invisible"> of a concave $\\rt{down}$ graph is</span><span class="invisible"> $\\rt{negative}$</span></p><p><span class="hi">So $f(x)$ is concave $\\rt{down}$ when<span class="invisible"> $f''(x)$ is</span><span class="invisible"> $\\rt{negative}$</span></span></p><p>In summary,<ol><pli><span class="hi">$f(x)$ is concave $\\gt{up}$ when<span class="invisible"> $f''(x)$ is</span><span class="invisible"> $\\gt{positive}$</span></span></pli><pli><span class="hi">$f(x)$ is concave $\\rt{down}$ when<span class="invisible"> $f''(x)$ is</span><span class="invisible"> $\\rt{negative}$</span></span></pli></ol></p>`+picsize('concavity2ndderivv2',500)+String.raw`<p><b>Note:\p $f(x)$ is not necessarily\p concave $\g{\textbf{up}}$ when $f(x)$ or $f'(x)$ is $\g{\textbf{positive}}$.</b></p><p><b>Whether $f(x)$ is\p concave $\g{\textbf{up}}$\p only depends on\p the sign of\p $f''(x)$.</p><p><b>The same goes for concave $\r{\textbf{down}}$</b></p>`,
            rightColWidth: 50,
            steps:{
                general:{
                    question:String.raw`<p>$f(x)=\t{\{an equation\}}$</p>\p<p>Find the intervals where $f(x)$ is concave up and the intervals where $f(x)$ is concave down</p>`,
                    steps:[
                        String.raw`<p>Find\p $f''(x)$</p>`,
                        String.raw`<p>\pSolve\p $f''(x)=0$\p to get\p the <span class='orange'>second derivative critical points</span></p>`,
                        String.raw`<p>Make a\p number line\p with\p the <span class='orange'>second derivative critical points</span> on it</p>`,
                        String.raw`<p>The second derivative critical points\p divide the number\p into\p smaller parts\p called\p intervals.</p><p>Add an\p $x$-value\p (called a \p<span class='purple'>test point</span>)\p to\p each interval</p>`,
                        String.raw`<p>Calculate\p $f''\p{(\put{each test point})}$\p and\p determine\p whether it is \p<span class='green'>positive</span>\p or\p <span class='red'>negative</span>.</p>`,//It is often easier to calculate using the factored version of $f''(x)$</p>`,
                        String.raw`<p>Add a\p $\g{+}$ sign\p above\p each interval containing\p a test point\p with a\p <span class='green'>positive</span> $f'$ value\p and a\p $\r{-}$ sign\p above \peach interval containing\p a test point\p with a \p<span class='red'>negative</span> $f'$ value</p>`,
                        String.raw`<p>Determine the intervals where\p $f''(x)$\p is\p <span class='green'>positive</span>\p and\p <span class='red'>negative</span><ol><pli>$f''(x)\g{>0}$ in<span class="invisible"> the intervals</span><span class="invisible"> with a</span><span class="invisible"> $\g{+}$ sign </span><span class="invisible">above them</span></pli><pli>$f''(x)\r{<0}$ in<span class="invisible"> the intervals</span><span class="invisible"> with a</span><span class="invisible"> $\r{-}$ sign</span><span class="invisible"> above them.</span></pli></ol></p><p><b>Note:\p The endpoints of\p the intervals are the\p $\btip{\o{\textbf{second derivative critical points}}}{x\t{-values where }f''(x)=0}$ \pnot\p the $\btip{\pu{\textbf{test points}}}{\t{the }x\t{-values on each side of the second derivative critical points}}$</b></p>`,
                        String.raw`<p>Determine\p the intervals where\p $f(x)$ is\p concave <span class='green'>up</span>\p and\p concave <span class='red'>down</span><ol><pli>$f(x)$ is <span class="invisible">concave <span class='green'>up</span></span><span class="invisible"> on </span><span class="invisible">the intervals where</span><span class="invisible"> $f''(x)\g{>0}$</span></pli><pli>$f(x)$ is <span class="invisible">concave <span class='red'>down</span></span><span class="invisible"> on </span><span class="invisible">the intervals where</span><span class="invisible"> $f''(x)\r{<0}$</span></pli></ol></p><p><b>Note:\p The endpoints of\p the intervals are the\p $\btip{\o{\textbf{second derivative critical points}}}{x\t{-values where }f''(x)=0}$\p not\p the $\btip{\pu{\textbf{test points}}}{\t{the }x\t{-values on each side of the second derivative critical points}}$</b></p>`,
                    ]
                },
                specific:concavcubic(1,0,-3,0)
            },
            examples: [
                //concavcubic(1,-3,0,0),concavcubic(1,-6,9,0)
                // concavcubic('x^3-3x',`3x^2-3`,`6x`,'',x=>6*x,0),
                // concavcubic('-2x^3+12x^2+12x',`-6x^2+24x+12`,`-12x+24`,'-12x=-24\\\\[4pt]',x=>-12*x+24,2),
                // concavcubic('x^3-3x^2',`3x^2-6x`,`6x-6`,'6x=6\\\\[4pt]',x=>6*x-6,1),
                // concavcubic('-x^3-3x^2',`-3x^2-6x`,`-6x-6`,'-6x=6\\\\[4pt]',x=>-6*x-6,-1),
                // concavcubic('x^3+3x^2-24x+1',`3x^2+6x-24`,`6x+6`,'6x=-6\\\\[4pt]',x=>6*x+6,-1),
            ],
        },
        {
            name: String.raw`Find points of inflection`,
            backgroundColor: "green",
            web: "Hw 3: 1, 5-7, 9; Hw 4: 1-7, 11; Hw 5: 2, 5-7; PT 2: 1-6, 8; Hw 6: 4, 7, 9-10; PT 3: 8; Hw 9: 8, 10; PF: 4, 6, 10-12, 14-15",
            book: "148",
            exam: "Up to one question on test 2 and up to one question on the final",
            intro: String.raw`<p><span class="hi">A point of inflection of $f(x)$ <span class="invisible">is a point where</span><span class="invisible"> the graph of $f(x)$</span><span class="invisible"> changes its concavity</span></span><span class="invisible"> (goes from</span><span class="invisible"> concave $\gt{up}$</span><span class="invisible"> to</span><span class="invisible"> concave $\rt{down}$</span><span class="invisible"> or concave $\rt{down}$</span><span class="invisible"> to</span><span class="invisible"> concave $\gt{up}$)</span></p><p>`+picsize('downuppoi',500)+String.raw`</p><b>Why do we care about points of inflection?</b><p><span class="hi">Concavity is used to determine<span class="invisible"> long term behavior</span></span></p><p>Therefore, <span class="hi">a point of inflection is<span class="invisible"> the location of</span><span class="invisible"> a change in </span><span class="invisible">the long-term behavior</span><span class="invisible"> of the graph</span></span></p><p>Consider the stock of General Motors</p>`+picsize('GMpoi',500)+String.raw`<p>Before the chip shortage,\p GM has\p an improving \plong term behavior\p because it is concave $\gt{up}$</p><p>After the chip shortage began,\p the graph of the stock\p became concave $\rt{down}$\p and the graph now had\p a worseninig long term behavior</p><p>The point where\p the long term behavior\p of GM stock changed\p (the time\p the chip shortage began)\p is\p the point of inflection\p of the graph</p><p>A point of inflection\p is also \pthe point where\p the graph changes\p the fastest\p or\p the slowest</p><div class="row"><div class="col"><p>Fastest Change</p>`+picsize('steepest',500)+String.raw`</div><div class="col"><p>Slowest Change</p>`+picsize('shallowest',500)+String.raw`</div></div><p><span class="hi">A graph is concave $\gt{up}$ when <span class="invisible">$f''(x)$ is</span><span class="invisible"> $\gt{positive}$</span></span></p><p><span class="hi">A graph is concave $\rt{down}$ when <span class="invisible">$f''(x)$ is</span><span class="invisible"> $\rt{negative}$</span></span></p><p><span class="hi">A point of inflection of $f(x)$ <span class="invisible">is a point where</span><span class="invisible"> the graph of $f(x)$</span><span class="invisible"> changes its concavity</span></p><p>Therefore,<span class="hi"> a point of inflection is where<span class="invisible"> $f''(x)$ </span><span class="invisible">changes sign</span></span> <span class="invisible">(changes from </span><span class="invisible">$\gt{positive}$ </span><span class="invisible">to </span><span class="invisible">$\rt{negative}$ </span><span class="invisible">or </span><span class="invisible">$\rt{negative}$ </span><span class="invisible">to </span><span class="invisible">$\gt{positive}$)</span><div class="row"><div class="col">`+picsize('updownpoifpp',500)+`</div><div class="col">`+picsize('downuppoifpp',500)+`</div></div></p>`,
            rightColWidth: 50,
            steps:{
                general:{
                    question:String.raw`<p>$$f(x)=\{\t{an equation}\}$$</p><p>Find the points of inflection of $f(x)$</p>`,
                    steps:[
                        String.raw`<p>Find\p $f''(x)$</p>`,
                        String.raw`<p>\pSolve\p $f''(x)=0$\p to get\p the <span class='orange'>second derivative critical points</span></p>`,
                        String.raw`<p>Make a\p number line\p with\p the <span class='orange'>second derivative critical points</span> on it</p>`,
                        String.raw`<p>The second derivative critical points\p divide the number\p into\p smaller parts\p called\p intervals.</p><p>Add an\p $x$-value\p (called a \p<span class='purple'>test point</span>)\p to\p each interval</p>`,
                        String.raw`<p>Calculate\p $f'\p{(\put{each test point})}$\p and\p determine\p whether it is \p<span class='green'>positive</span>\p or\p <span class='red'>negative</span>.</p>`,//It is often easier to calculate using the factored version of $f''(x)$</p>`,
                        String.raw`<p>Add a\p $\g{+}$ sign\p above\p each interval containing\p a test point\p with a\p <span class='green'>positive</span> $f'$ value\p and a\p $\r{-}$ sign\p above \peach interval containing\p a test point\p with a \p<span class='red'>negative</span> $f'$ value</p>`,
                        String.raw`<p>Determine the intervals where\p $f''(x)$\p is\p <span class='green'>positive</span>\p and\p <span class='red'>negative</span><ol><pli>$f''(x)\g{>0}$ in<span class="invisible"> the intervals</span><span class="invisible"> with a</span><span class="invisible"> $\g{+}$ sign </span><span class="invisible">above them</span></pli><pli>$f''(x)\r{<0}$ in<span class="invisible"> the intervals</span><span class="invisible"> with a</span><span class="invisible"> $\r{-}$ sign</span><span class="invisible"> above them.</span></pli></ol></p><p><b>Note:\p The endpoints of\p the intervals are the\p $\btip{\o{\textbf{second derivative critical points}}}{x\t{-values where }f''(x)=0}$ \pnot\p the $\btip{\pu{\textbf{test points}}}{\t{the }x\t{-values on each side of the second derivative critical points}}$</b></p>`,
                        String.raw`<p>The $x$-values of the<span class="invisible"> points of inflection</span><span class="invisible"> of</span><span class="invisible"> $f(x)$</span><span class="invisible"> are the</span><span class="invisible"> points where </span><span class="invisible">$f''(x)$ goes from</span><span class="invisible"> $\gt{positive}$ </span><span class="invisible">to</span><span class="invisible"> $\rt{negative}$</span><span class="invisible"> or </span><span class="invisible">$\rt{negative}$</span><span class="invisible"> to</span><span class="invisible"> $\gt{positive}$</span></p><p><span class="hi"><b>Note:<span class="invisible">points of inflection</span><span class="invisible"> are points</span><span class="invisible"> or</span><span class="invisible"> $x$-values</span></span></b></p><p><b><span class="hi">They are not intervals</b></span></p>`,
                        String.raw`<p>Determine the\p $y$-values\p of\p the points of inflection\p by\p substituting the\p $\ot{$x$-values}$\p into\p $f(x)$</p><p><b>Note: Do not \puse $f''(x)$\p to calculate\p the $y$-values.\p Use $f(x)$ instead</b></p>`,
                        String.raw`<p>Write the\p points of the inflection\p in the form $$\p{(}\p{\t{$x$-value}}\p{,}\p{\t{$y$-value}}\p{)}$$</p>`
                    ]
                },
                specific:poi(1,0,-3,0)
                //incdec(`2x^3+6x^2+6x`,`6x^2+12x+6`,x=>6*Math.pow(x,2)+12*x+6,String.raw`6(x^2+2x+1)&=0\\[4pt]6(x+1)(x+1)&=0\\[4pt]x+1=0,\ x+1&=0`,[-1],[-2,0]),
            },
            examples: [
                poi(1,-3,0,0),
                poi(1,-6,9,0)
                // incdec(`x^3-3x`,`3x^2-3`,x=>3*Math.pow(x,2)-3,String.raw`3(x^2-1)&=0\\[4pt]3(x-1)(x+1)&=0\\[4pt]x-1=0,\ x+1&=0`,[-1,1],[-2,0,2]),
                // incdec(`-2x^3+3x^2+12x`,`-6x^2+6x+12`,x=>-6*Math.pow(x,2)+6*x+12,String.raw`-6(x^2-x-2)&=0\\[4pt]-6(x-2)(x+1)&=0\\[4pt]x-2=0,\ x+1&=0`,[-1,2],[-2,0,3]),
                // incdec(`x^3-3x^2`,`3x^2-6x`,x=>3*Math.pow(x,2)-6*x,String.raw`3x(x-2)&=0\\[4pt]3x=0,\ x-2&=0`,[0,2],[-1,1,3]),
                // incdec(`-x^3-3x^2`,`-3x^2-6x`,x=>-3*Math.pow(x,2)-6*x,String.raw`-3x(x+2)&=0\\[4pt]-3x=0,\ x+2&=0`,[-2,0],[-3,-1,1]),
                // incdec(`x^3+3x^2-24x+1`,`3x^2+6x-24`,x=>3*Math.pow(x,2)+6*x-24,String.raw`3(x^2+2x-8)&=0\\[4pt]3(x+4)(x-2)&=0\\[4pt]x+4=0,\ x-2&=0`,[-4,2],[-5,0,3]),
            ],
        },
        {
            name: String.raw`Find relative maximum and minimum using the second derivative test`,
            backgroundColor: "green",
            web: "Hw 3: 1, 5-7, 9; Hw 4: 1-7, 11; Hw 5: 2, 5-7; PT 2: 1-6, 8; Hw 6: 4, 7, 9-10; PT 3: 8; Hw 9: 8, 10; PF: 4, 6, 10-12, 14-15",
            book: "148",
            exam: "Up to one question on test 2 and up to one question on the final",
            intro: String.raw`<p>In this section,\p we will discuss\p how to find\p $\rt{maxima}$ and $\gt{minima}$ using the\p second derivative test</p><p><div class="row"><div class="col">`+picsize('min2ndderiv',500)+String.raw`<p>If $f'(\o{c})=0$ and $f(x)$ is concave $\gt{up}$,\p $f(x)$ has a $\gt{min}$\p at $x=\o{c}$</p><p><span class="hi">If $f(x)$ is concave $\gt{up}$, <span class="invisible">$f''(x)$ is</span><span class="invisible"> $\gt{positive}$</span></span></p><p>Therefore,\p <span class="hi">if $f'(\o{c})=0$<span class="invisible"> and </span><span class="invisible">$f''(\o{c})$ is</span><span class="invisible"> $\gt{positive}$</span><span class="invisible"> $f(x)$ has </span><span class="invisible">a $\gt{min}$</span><span class="invisible"> at $x=\o{c}$</span></span></p></div><div class="col">`+picsize('max2ndderiv',500)+String.raw`<p>If $f'(\o{c})=0$ and $f(x)$ is concave $\rt{down}$, \p$f(x)$ has a $\rt{max}$\p at $x=\o{c}$</p><p><span class="hi">If $f(x)$ is concave $\rt{down}$, <span class="invisible">$f''(x)$ is</span><span class="invisible"> $\rt{negative}$</span></span></p><p>Therefore,\p <span class="hi">if $f'(\o{c})=0$<span class="invisible"> and </span><span class="invisible">$f''(\o{c})$ is</span><span class="invisible"> $\rt{negative}$</span><span class="invisible"> $f(x)$ has </span><span class="invisible">a $\rt{max}$</span><span class="invisible"> at $x=\o{c}$</span></span></p></div></div></p>`,
            rightColWidth: 50,
            steps:{
                general:{
                    question:String.raw`<p>$$f(x)=\{\t{an equation}\}$$</p><p>Find the relative maxima and minima of $f(x)$</p>`,
                    steps:[
                        String.raw`<p>Find\p $f'(x)$</p>`,
                        String.raw`<p>\pSolve\p $f'(x)=0$\p to get\p the <span class='orange'>critical points</span></p>`,
                        String.raw`<p>Find \p$f''(x)$</p>`,
                        String.raw`<p><div class="row"><div class="col">`+picsize('min2ndderiv',250)+'</div><div' +
                        ' class="col">'+picsize('max2ndderiv',250)+String.raw`</div></div></p><p>Calculate \p$f''(\ot{each critical point})$\p and\p determine\p whether it is\p $\gt{positive}$\p or\p $\rt{negative}$</p><p><ol><pli>If $f''(x)\g{>0}$,<span class="invisible"> the $\ot{critical point}$ is</span><span class="invisible"> a $\gt{min}$</span></pli><pli>If $f''(x)\r{<0}$,<span class="invisible"> the $\ot{critical point}$ is</span><span class="invisible"> a $\rt{max}$</span></pli><pli>If $f''(x)=0$,<span class="invisible"> you have to use</span><span class="invisible"> the first derivative test</span><span class="invisible"> (sign chart) </span><span class="invisible">to determine whether the </span><span class="invisible">$\ot{critical point}$ is a </span><span class="invisible"> max,</span><span class="invisible"> min,</span><span class="invisible"> or </span><span class="invisible">neither</span></pli></ol></p>`,
                        String.raw`<p>Determine the\p $y$-values\p of\p the maxima and minima\p by\p substituting the\p $\ot{$x$-values}$\p into\p $f(x)$</p><p><b>Note: Do not \puse $f'(x)$\p to calculate\p the $y$-values.\p Use $f(x)$ instead</b></p>`,
                        String.raw`<p>Write the\p relative maxima and minima\p in the form $$\p{(}\p{\t{$x$-value}}\p{,}\p{\t{$y$-value}}\p{)}$$</p>`
                    ]
                },
                specific:relmaxminsecondderiv(1,0,-3,0,[-2,0,2])
                //incdec(`2x^3+6x^2+6x`,`6x^2+12x+6`,x=>6*Math.pow(x,2)+12*x+6,String.raw`6(x^2+2x+1)&=0\\[4pt]6(x+1)(x+1)&=0\\[4pt]x+1=0,\ x+1&=0`,[-1],[-2,0]),
            },
            examples: [
                // incdec(`x^3-3x`,`3x^2-3`,x=>3*Math.pow(x,2)-3,String.raw`3(x^2-1)&=0\\[4pt]3(x-1)(x+1)&=0\\[4pt]x-1=0,\ x+1&=0`,[-1,1],[-2,0,2]),
                // incdec(`-2x^3+3x^2+12x`,`-6x^2+6x+12`,x=>-6*Math.pow(x,2)+6*x+12,String.raw`-6(x^2-x-2)&=0\\[4pt]-6(x-2)(x+1)&=0\\[4pt]x-2=0,\ x+1&=0`,[-1,2],[-2,0,3]),
                // incdec(`x^3-3x^2`,`3x^2-6x`,x=>3*Math.pow(x,2)-6*x,String.raw`3x(x-2)&=0\\[4pt]3x=0,\ x-2&=0`,[0,2],[-1,1,3]),
                // incdec(`-x^3-3x^2`,`-3x^2-6x`,x=>-3*Math.pow(x,2)-6*x,String.raw`-3x(x+2)&=0\\[4pt]-3x=0,\ x+2&=0`,[-2,0],[-3,-1,1]),
                // incdec(`x^3+3x^2-24x+1`,`3x^2+6x-24`,x=>3*Math.pow(x,2)+6*x-24,String.raw`3(x^2+2x-8)&=0\\[4pt]3(x+4)(x-2)&=0\\[4pt]x+4=0,\ x-2&=0`,[-4,2],[-5,0,3]),
            ],
        },
        {
            name: String.raw`Summary`,
            backgroundColor: "green",
            web: "Hw 3: 1, 5-7, 9; Hw 4: 1-7, 11; Hw 5: 2, 5-7; PT 2: 1-6, 8; Hw 6: 4, 7, 9-10; PT 3: 8; Hw 9: 8, 10; PF: 4, 6, 10-12, 14-15",
            book: "148",
            exam: "Up to one question on test 2 and up to one question on the final",
            intro: String.raw`<p><b>When do we use the original function?</b></p><p>We use the original function to\p calculate\p $y$-values</p><p>This includes\p $y$-values of\p points of inflection\p or\p maxima\p and\p minima</p><p><b>When do we use $f'(x)$?</b></p><p>$f'(x)$ is\p used to\p calculate\p slope</p><p>$f'(x)$ is used to\p determine when\p $f(x)$\p is $\gt{increasing}$\p and\p $\rt{decreasing}$</p><p><ol><pli>$f(x)$ is $\gt{increasing}$ when<span class="invisible"> $f'(x)$ is </span><span class="invisible">$\gt{positive}$</span></pli><pli>$f(x)$ is $\rt{decreasing}$ when<span class="invisible"> $f'(x)$ is </span><span class="invisible">$\rt{negative}$</span></pli></ol></p><p>$f'(x)$ is also used to\p find the possible locations of\p maxima\p and\p minima</p><p>To find where $f(x)$ could\p have a max or min,\p solve\p $f'(x)=0$\p to get the\p $\ot{critical points}$</p><p><b>When do we use $f''(x)$?</b></p><p>$f''(x)$ is used to\p determine when\p $f(x)$\p is concave $\gt{up}$\p and\p concave $\rt{down}$</p><p><ol><pli>$f(x)$ is concave $\gt{up}$ when<span class="invisible"> $f''(x)$ is </span><span class="invisible">$\gt{positive}$</span></pli><pli>$f(x)$ is concave $\rt{down}$ when<span class="invisible"> $f''(x)$ is </span><span class="invisible">$\rt{negative}$</span></pli></ol></p><p>$f''(x)$ is used to\p find\p points of inflection</p><p>$f(x)$ has a point of inflection when\p $f''(x)$\p goes from\p $\gt{positive}$\p to\p $\rt{negative}$\p or\p $\rt{negative}$\p to\p $\gt{positive}$</p><p>$f''(x)$ is also usefd to\p determine whether\p $\ot{critical point}$ is\p a $\rt{max}$\p or\p a $\gt{min}$</p><p><ol><pli>If $f''(x)\g{>0}$,<span class="invisible"> then $f(x)$ is</span><span class="invisible"> concave $\gt{up}$,</span><span class="invisible"> so the critical point is</span><span class="invisible"> a $\gt{min}$</span></pli><pli>If $f''(x)\r{<0}$,<span class="invisible"> then $f(x)$ is</span><span class="invisible"> concave $\rt{down}$,</span><span class="invisible"> so the critical point is</span><span class="invisible"> a $\rt{max}$</span></pli></ol></p>`,
            rightColWidth: 50,
            steps:{
                general:{
                    question:String.raw``,
                    steps:[

                    ]
                },
                specific:{question:'',steps:[]}
                //incdec(`2x^3+6x^2+6x`,`6x^2+12x+6`,x=>6*Math.pow(x,2)+12*x+6,String.raw`6(x^2+2x+1)&=0\\[4pt]6(x+1)(x+1)&=0\\[4pt]x+1=0,\ x+1&=0`,[-1],[-2,0]),
            },
            examples: [
                // incdec(`x^3-3x`,`3x^2-3`,x=>3*Math.pow(x,2)-3,String.raw`3(x^2-1)&=0\\[4pt]3(x-1)(x+1)&=0\\[4pt]x-1=0,\ x+1&=0`,[-1,1],[-2,0,2]),
                // incdec(`-2x^3+3x^2+12x`,`-6x^2+6x+12`,x=>-6*Math.pow(x,2)+6*x+12,String.raw`-6(x^2-x-2)&=0\\[4pt]-6(x-2)(x+1)&=0\\[4pt]x-2=0,\ x+1&=0`,[-1,2],[-2,0,3]),
                // incdec(`x^3-3x^2`,`3x^2-6x`,x=>3*Math.pow(x,2)-6*x,String.raw`3x(x-2)&=0\\[4pt]3x=0,\ x-2&=0`,[0,2],[-1,1,3]),
                // incdec(`-x^3-3x^2`,`-3x^2-6x`,x=>-3*Math.pow(x,2)-6*x,String.raw`-3x(x+2)&=0\\[4pt]-3x=0,\ x+2&=0`,[-2,0],[-3,-1,1]),
                // incdec(`x^3+3x^2-24x+1`,`3x^2+6x-24`,x=>3*Math.pow(x,2)+6*x-24,String.raw`3(x^2+2x-8)&=0\\[4pt]3(x+4)(x-2)&=0\\[4pt]x+4=0,\ x-2&=0`,[-4,2],[-5,0,3]),
            ],
        },
    ],
}