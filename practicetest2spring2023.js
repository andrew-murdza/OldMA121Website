import {
    addpause,
    ap,
    buildPoly,
    cleanpoly,
    cleanup,
    convertWork, convterm,
    deriv, lineqzero, mult,
    pauseList, picsize, pow,
    qr, rounddigits, sub,
    subf, subtract, writeNum,
    zerosquadfactor,
} from "./Calc.js?v=10";

function incdecsetup(a1,x1,x2,d){
    let temp1=x1;
    x1=Math.min(x1,x2);
    x2=Math.max(temp1,x2)
    let list=cubicsetup(a1,x1,x2,d);
    return incdec(list[0],list[1],list[2],list[3],list[4])
}
function concavcubicsetup(a1,x1,x2,d){
    let list=cubicsetup(a1,x1,x2,d);
    return concavcubic(list[0],list[1],list[2],list[3])
}
function relmaxminsecondderivsetup(a1,x1,x2,d){
    let list=cubicsetup(a1,x1,x2,d);
    return relmaxminsecondderiv(list[0],list[1],list[2],list[3])
}
function poisetup(a1,x1,x2,d){
    let list=cubicsetup(a1,x1,x2,d);
    return poi(list[0],list[1],list[2],list[3])
}

function incdec(a,b,c,d,zs){
    return signchartprob(a,b,c,d,zs,'','increasing','decreasing');
}

function concavcubic(a,b,c,d){
    let x=-b/(3*a);
    return signchartprob(a,b,c,d,[x-1,x+1],cleanpoly(0,0,6*a,2*b),'concave up','concave down');
}


function cubicsetup(a1,x1,x2,d){//,bincdec
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
    return [a,b,c,d,makezs(x1==x2?[x1]:[x1,x2])];//Doesn't work for cubic but cubic generates its own zs
}


function cubicMaxMin(a,b,...as){
    let fs=cleanpoly(...as);
    let sol=zerosquadfactor(3*as[0],2*as[1],as[2])
    let zw=convertWork(sol[0])
    let xs=sol[1];
    let f=buildPoly(...as);
    return maxminex(fs,f,xs,a,b,zw)
}
function cubicMaxMinSetup(a,b,a1,x1,x2,d){
    let as=cubicsetup(a1,x1,x2,d);
    let fs=cleanpoly(as[0],as[1],as[2],as[3]);
    let sol=zerosquadfactor(3*as[0],2*as[1],as[2])
    let zw=convertWork(sol[0])
    let xs=sol[1];
    let a11=as[0];
    let a12=as[1];
    let a13=as[2];
    let a14=as[3];
    let f=buildPoly(a11,a12,a13,a14);
    return maxminex(fs,f,xs,a,b,zw)
}
function maxminex(fs,f,xs,a,b,zw,fpwk,rewrite){
    let temp=a;
    a=Math.min(a,b);
    b=Math.max(temp,b)
    if(fpwk==null){
        fpwk='$f\'(x)\\p{=}'+addpause(deriv(fs)[1])+'$'
    }
    let list=[];
    let str='$$\\begin{aligned}\\p{f(x)}&\\p{=}\\p{'+fs+'}\\\\[6pt]';
    for(let i=0;i<xs.length;i++){
        str=str+subf(f,fs,xs[i],'o',list)+'\\\\[10pt]'
    }
    str=str+subf(f,fs,a,'b',list)+'\\\\[10pt]'+subf(f,fs,b,'b',list)+'\\end{aligned}$$'
    let m=Math.min(...list)
    let M=Math.max(...list)
    let steps1=['The $\\bt{endpoints}$ are\\p $x='+pauseList([a,b],'b')+'$',fpwk];
    if(rewrite!=null){
        steps1.push('$$f\'(x)\\p{=}'+rewrite+'$$');
    }
    steps1.push(zw)
    steps1.push(`<p>The $\\ot{critical points}$ are\\p $x=`+pauseList(xs,'o')+`$</p><p>The $\\bt{endpoints}$ are\\p $x=`+pauseList([a,b],'b')+`$</p>`+str)
    steps1.push(`<p>The $y$-values are $`+pauseList(list)+`$</p><p>The min\\p $y$-value is \\p$`+m+`$</p><p>The max\\p $y$-value is \\p$`+M+`$</p>`)
    return{
        question:'<p>Find the absolute maximum and absolute minimum of $f(x)='+fs+'$ on $[\\b{'+a+'},\\b{'+b+'}]$</p>',
        steps:steps1
    }
}
function maxminzinfquad(a,b,c){
    let fs=cleanpoly(a,b,c)
    let fps=deriv(fs)[1];
    let a0=a;
    let b0=b;
    let c0=c;
    let a1=2*a;
    let b1=-b;
    let sol=lineqzero(2*a,b)
    let cp=sol[1]
    let zw=convertWork(sol[0])
    let fpw='$$\\begin{aligned}f\'(x)&\\p{=}'+addpause(fps)+'\\end{aligned}$$'
    return maxminzinf(buildPoly(a,b,c),a>0,cp,fs,zw,fpw)
}
function maxminzinf(f,pos,cp,fs,zw,fpw){
    fs=fs=cleanup(fs)
    let fs1=convterm(fs);
    let fps=deriv(fs1)[1];
    let fpps=deriv(fps)[1];
    let strs=pos?['$\\gt{positive}$','$\\gt{min}$','$\\rt{max}$']:['$\\rt{negative}$','$\\rt{max}$','$\\gt{min}$']
    let y=f(cp);
    return {
        question:`<p>Find the absolute maximum and absolute minimum of $f(x)=`+fs+`$ on $(0,\\infty)$</p>`,
        steps:[
            fpw,
            zw,
            '$$\\begin{aligned}f\'(x)&\\p{=}\\p{'+fps+'}\\\\[6pt]\\p{f\'\'(x)}&\\p{=}'+addpause(fpps)+'\\end{aligned}$$',
            'Because $f\'\'(x)$\\p is always \\p'+strs[0]+',\\p $f(x)$ has\\p a '+strs[1]+' at\\p $x=\\o{'+cp+'}$\\p and\\p no '+strs[2],
            'The '+strs[1]+' $y$-value is $$\\begin{aligned}\\p{f(x)}&\\p{=}\\p{'+fs+'}\\\\[10pt]\\p{f(\\p{\\o{'+cp+'}})}&\\p{=}'+sub(addpause(fs),'x','\\o{'+cp+'}')+'\\\\[10pt]&\\p{=}\\p{'+y+'}\\end{aligned}$$</p><p>\\p and\\p there is \\p no '+strs[2]+' $y$-value'
        ]
    }
}
function fevalsignsDes(f,fs,zs){
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


function relmaxminsecondderiv(a,b,c,d){
    let fp=cleanpoly(0,3*a,2*b,c)
    let fpp=cleanpoly(0,0, 6*a,2*b)
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
        question:String.raw`<p>$$f(x)=`+cleanpoly(a,b,c,d)+`$$</p><p>Find the relative maxima and minima of $f(x)$</p>`,
        steps:list
    }
}

function relmaxminfirstderiv(a,b,c,d,zs){
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
        question:String.raw`<p>$$f(x)=`+cleanpoly(a,b,c,d)+`$$</p><p>Find the relative maxima and minima of $f(x)$</p>`,
        steps:list
    }
}
function poi(a,b,c,d){
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
        question:String.raw`<p>$$f(x)=`+cleanpoly(a,b,c,d)+`$$</p><p>Find the points of inflection of $f(x)$</p>`,
        steps:list
    }
}
function ypts(a,b,c,d,xsMin,xsMax){
    let strs01=[['maximum','maxima'],['minimum','minima']]
    let list=[];
    let list1=[xsMin,xsMax]
    let strs3=[]
    let str1='f(x)&\\p{=}\\p{'+cleanpoly(a,b,c,d)+'}\\\\[6pt]'
    for(let i=0;i<2;i++){
        let str3=''
        let str2=''
        let str4='no '
        for(let j=0;j<list1[i].length;j++){
            let x=list1[i][j];
            let v=rounddigits(a*Math.pow(x,3)+b*Math.pow(x,2)+c*x+d,3);
            str1=str1+(i+j>0?'\\\\[10pt]':'')+suby(addpause(cleanpoly(a,b,c,d)),'\\o{'+x+'}',v,true)
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
function as(list){
    return list.length>1?'s':''
}
function xss(xs){
    let xssol='x=';
    for(let i=0;i<xs.length;i++){
        let x=xs[i];
        xssol=xssol+String.raw`\o{`+x+String.raw`}`;
        if(i<xs.length-1){
            xssol=xssol+",\\ ";
        }
    }
    return xssol;
}
function posnegzs(f,xs,zs){
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

function fsignex1(fn,szsi,ineq,fps1,ineq11){
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

function list2str(list){
    let str='';
    for(let i=0;i<list.length;i++){
        str=str+(i>0?'\\p{,} ':'')+'\\p{\\o{'+list[i]+'}}'
    }
    return str
}

function fsignex(fn,pzsi,nzsi,ineq1,ineq2,fps1){
    return '<p><ol>'+fsignex1(fn,pzsi,ineq1,fps1,'\\g{>0}')+fsignex1(fn,nzsi,ineq2,fps1,'\\r{<0}')+'</ol></p>';
}
function signcharts(f,xs,zs){
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
function ypts1(a,b,c,d,xs){
    let list=[]
    let str1='f(x)&\\p{=}\\p{'+cleanpoly(a,b,c,d)+'}\\\\[6pt]';
    let str3=''
    let str2=''
    let str4='$f(x)$\p has no points of inflection\p because\p $f\'\'(x)$\p doesn\'t change sign'
    for(let j=0;j<xs.length;j++){
        let x=xs[j];
        let v=rounddigits(a*Math.pow(x,3)+b*Math.pow(x,2)+c*x+d,3);
        str1=str1+(j>0?'\\\\[10pt]':'')+suby(addpause(cleanpoly(a,b,c,d)),'\\o{'+x+'}',v,true)
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

function minmaxfirstderivx(f,zs,xs){
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

function poix(f,zs,xs){
    let signs=findSigns(f,zs);
    let returnList=[];
    for(let i=0;i<signs.length-1;i++){
        if(signs[i]!=signs[i+1]){
            returnList.push(xs[i]);
        }
    }
    return returnList;
}

function findSigns(f,zs){
    let signs1=[];
    for(let i=0;i<zs.length;i++){
        signs1[i]=1;
        if(f(zs[i])<0){
            signs1[i]=-1;
        }
    }
    return signs1;
}

// maxminex1(ms,mnotM){
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

// maxminex(a,b,c,d,zs,fp,fpppint,fppmint){
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

function drawRec(content,x,y,w,h,c){
    content.fillStyle = "rgb("+c[0]+","+c[1]+","+c[2]+")"
    content.fillRect(x-w/2,y-h/2,w,h);
}

function drawText(content,text,x,y,c,fontsize){
    if(fontsize==null){
        fontsize=30;
    }
    content.font = fontsize+"px Arial";
    content.textAlign = "center";
    content.fillStyle = "rgb("+c[0]+","+c[1]+","+c[2]+")"
    content.fillText(text,x,y);
}
function signchartprob(a,b,c,d,zs,fps1,qstr1,qstr2){
    let f=cleanpoly(a,b,c,d)
    let fp=cleanpoly(0,3*a,2*b,c);
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
        fp=cleanpoly(0,0,6*a,2*b)
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
function suby(f,x1,v,b){
    return (b?'\\p{y}':'y')+'&\\p{=}\\p{f}\\p{('+x1+')}\\\\[4pt]&\\p{=}'+sub(addpause(f),'x',x1)+'\\\\[4pt]&\\p{=}\\p{'+v+'}'
}

function subypp(fpp,x1,v){
    return '\\p{f\'\'}\\p{('+x1+')}\\\\[4pt]&\\p{=}'+sub(addpause(fpp),'x',x1)+'\\\\[4pt]&\\p{=}\\p{'+v+'}'
}

function fevalsigns(f,fs,fn,zs){
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
let names=[];
let xssc=[];
let zssc=[];
let signssc=[];
let bxssc=[];
let bzssc=[];
let bsignssc=[];
function drawSignChart(name,xs,zs,signs,bxs,bzs,bsigns){
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

function btotext(b){
    return b?'T':'F';
}

function signchartName(xs,zs,signs,bxs,bzs,bsigns){
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

function createSignChartCanvas(xs,zs,signs,bxs,bzs,bsigns,j){
    let name=signchartName(xs,zs,signs,bxs,bzs,bsigns);
    xssc.push(xs);
    zssc.push(zs);
    signssc.push(signs);
    bxssc.push(bxs);
    bzssc.push(bzs);
    bsignssc.push(bsigns);
    return '<canvas id=' + name + ' width="660" height="300" class="invisible">Your browser does not support the canvas element.</canvas>'//style="position:absolute;top:0;left:0;z-index:'+10*j+'"
}
function fenceQ(d){
    return `A farmer wants to build a three-sided rectangular fence near a river, using $\\yk{`+d+String.raw`}$ yards of fencing. Assume that the river runs straight and that John need not fence in the side next to the river. What are the $\ot{width}$ and the $\yut{length}$ of the fence which maximizes the enclosed area?`
}
function fence(d){
    return {
        question:fenceQ(d),
        steps:[
            '$A\\p{=}\\p{\\pu{x}}\\p{\\cdot}\\p{\\o{y}}$',
            String.raw`<p>Based on the below diagram,\p the amount of fence used\p is $$\p{2}\p{\o{x}}\p{+}\p{\yu{y}}$$</p><p><iframe src="https://www.desmos.com/calculator/tkj3ktocc4?embed" width="500" height="500" style="border: 1px solid #ccc" frameborder=0></iframe></p><p>Since the farmer uses\p $\yk{`+d+String.raw`}$\p yards of the fence,\p$$\p{2}\p{\o{x}}\p{+}\p{\yu{y}}\p{=}\p{\yk{`+d+`}}$$</p>`,
            String.raw`$$\yu{y}\p{=}\p{\yk{`+d+`}}\\p{-}\\p{2}\\p{\\o{x}}$$`,
            String.raw`$$\begin{aligned}A&\p{=}\p{\o{x}}\p{\cdot}\p{\yu{y}}\\[4pt]&\p{=}\p{\o{x}}\p{\cdot}\p{(\yk{`+d+String.raw`}\p{-}\p{2}\p{\o{x}})}\\[4pt]\p{f(\o{x})}&\p{=}\p{\o{x}}\p{\cdot}\p{(\yk{`+d+String.raw`}\p{-}\p{2}\p{\o{x}})}\end{aligned}$$`,
            String.raw`$$\begin{aligned}f(\o{x})&\p{=}\p{\o{x}}\p{\cdot}\p{(\yk{`+d+String.raw`}\p{-}\p{2}\p{\o{x}})}\\[4pt]&\p{=}\p{\yk{`+d+String.raw`}}\p{\o{x}}\p{-}\p{2}\p{\o{x}}^\p{2}\\[4pt]\p{f'(\o{x})}&\p{=}\p{\yk{`+d+`}}\\p{-}\\p{4}\\p{\\o{x}}\\end{aligned}$$`,
            String.raw`$$\begin{aligned}\p{\yk{`+d+String.raw`}}\p{-}\p{4}\p{\o{x}}&\p{=}\p{0}\\[4pt]\p{\yk{`+d+String.raw`}}&\p{=}\p{4}\p{\o{x}}\\[7pt]\p{\o{x}}&\p{=}\p{\frac{\p{\yk{`+d+String.raw`}}}{\p{4}}}\\[7pt]\p{\o{x}}&\p{=}\p{\ot{`+d/4+`}}\\end{aligned}$$`,
            String.raw`$\begin{aligned}f'(x)&\p{=}\p{\yk{`+d+String.raw`}}\p{-}\p{4\o{x}}\\[4pt]\p{f''(x)}&\p{=}\p{-4}\end{aligned}$`,
            String.raw`Because\p $f''(x)$ is\p always \p$\rt{negative}$,\p a $\ot{width}$\p of\p $\ot{`+d/4+String.raw`}$ gives\p the $\rt{maximum}$ area`,
            String.raw`$$\begin{aligned}\yu{y}&\p{=}\p{\yk{`+d+`}}\\p{-}\\p{2}\\p{\\o{x}}\\\\[4pt]&\\p{=}\\p{\\yk{`+d+`}}\\p{-}\\p{2}\\p{(\\o{`+d/4+`})}\\\\[4pt]&\\p{=}\\p{\\yu{`+d/2+`}}\\end{aligned}$$`,
            '$$\\begin{aligned}A&\\p{=}\\p{\\pu{x}}\\p{\\cdot}\\p{\\o{y}}\\\\[4pt]&\\p{=}\\p{(\\o{'+d/4+'})}\\p{\\cdot}\\p{(\\pu{'+d/2+'})}\\\\[4pt]&\\p{=}\\p{'+pow(d,2)/8+'}\\end{aligned}$$',
        ]
    }
}
window.j = {
    startCollapsed: false,
    lessonNum: 10,
    lessonName: "Practice Test 2",
    intro: String.raw`<p>This is\p the exam outline</p><p><ol><pli>Q1: Find where a cubic equation is increasing and decreasing</pli><pli>Q2: Find where the same cubic equation is concave up and concave down</pli><pli>Q3: Find where the same cubic equation has a point of inflection</pli><pli>Q4: Find where the same cubic equation has a relative max and relative min</pli><pli>Q5: Find the interval where the same cubic has an absolute max and min on $[a,b]$</pli><pli>Find the absolute maximum and minimum of a quadratic on $(0,\infty)$</pli><pli>The fence word problem</pli></ol></p>`,
    sections: [
        {
            name: String.raw`Increasing and Decreasing Graphs`,
    backgroundColor: "green",
    web: "Hw 3: 1, 5-7, 9; Hw 4: 1-7, 11; Hw 5: 2, 5-7; PT 2: 1-6, 8; Hw 6: 4, 7, 9-10; PT 3: 8; Hw 9: 8, 10; PF: 4, 6, 10-12, 14-15",
    book: "148",
    exam: "Up to one question on test 2 and up to one question on the final",
    intro: String.raw`<p>`+picsize('incdecslopes',500)+String.raw`</p><p>As seen in the above picture,<ol><pli>$f(x)$ is <span class='green'>increasing</span> when<span class="invisible"> its slope is </span><span class="invisible"><span class='green'>positive</span></span></pli><pli>$f(x)$ is<span class="invisible"><span class='red'> decreasing </span>when</span><span class="invisible"> its slope is </span><span class="invisible"><span class='red'>negative</span></span></pli></ol></p><p><span class="hi">The calculus word for<span class="invisible"> slope at a point is</span><span class="invisible"> the derivative</span></span></p><p>Therefore,<ol><pli><span class="hi">$f(x)$ is $\gt{increasing}$ when <span class="invisible">$f'(x)$</span><span class="invisible"> is</span><span class="invisible"> $\gt{positive}$</span></span></pli><pli><span class="hi">$f(x)$ is $\rt{decreasing}$ when <span class="invisible">$f'(x)$</span><span class="invisible"> is</span><span class="invisible"> $\rt{negative}$</span></span></pli></ol></p>`+picsize('incdecv2',500)+`<p><b>How to find where $f(x)$ is increasing and decreasing?</b></p><p>The points where\\p $f(x)$ changes from\\p $\\gt{increasing}$\\p to\\p $\\rt{decreasing}$\\p must satisfy\\p $f'(x)=0$</p><p>We call the points where\\p $f'(x)=0$\\p $\\ot{critical points}$</p>`,
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
    incdecsetup(1,-2,2,0),
    incdecsetup(-1,-2,2,1),
    incdecsetup(1,-4,0,0),
    incdecsetup(-1,-1,3,1),
    //T
    // incdecsetup(-2,-1,1,5),
    // incdecsetup(-1,-3,1,-4)
],
},
{
    name: String.raw`Concave Up and Concave Down Graphs`,
        backgroundColor: "green",
    web: "Hw 3: 1, 5-7, 9; Hw 4: 1-7, 11; Hw 5: 2, 5-7; PT 2: 1-6, 8; Hw 6: 4, 7, 9-10; PT 3: 8; Hw 9: 8, 10; PF: 4, 6, 10-12, 14-15",
    book: "148",
    exam: "Up to one question on test 2 and up to one question on the final.",
    intro: String.raw`<p>In this section,\p we will discuss\p concave $\gt{up}$\p and \p concave $\rt{down}$ graphs.</p><p><ol><pli><span class="hi">$f(x)$ is concave $\gt{up}$ when<span class="invisible"> $f''(x)$ is</span><span class="invisible"> $\gt{positive}$</span></span></pli><pli><span class="hi">$f(x)$ is concave $\rt{down}$ when<span class="invisible"> $f''(x)$ is</span><span class="invisible"> $\rt{negative}$</span></span></pli></ol></p>`+picsize('concavity2ndderivv2',500),
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
        concavcubicsetup(1,-2,2,0),
        concavcubicsetup(-1,-2,2,1),
        concavcubicsetup(1,-4,0,0),
        concavcubicsetup(-1,-1,3,1),
        //T
        // concavcubicsetup(-2,-1,1,5),
        // concavcubicsetup(-1,-3,1,-4)
    ],
},
{
    name: String.raw`Find points of inflection`,
        backgroundColor: "green",
    web: "Hw 3: 1, 5-7, 9; Hw 4: 1-7, 11; Hw 5: 2, 5-7; PT 2: 1-6, 8; Hw 6: 4, 7, 9-10; PT 3: 8; Hw 9: 8, 10; PF: 4, 6, 10-12, 14-15",
    book: "148",
    exam: "Up to one question on test 2 and up to one question on the final",
    intro: String.raw`<p><span class="hi"> a point of inflection is where<span class="invisible"> $f''(x)$ </span><span class="invisible">changes sign</span></span> <span class="invisible">(changes from </span><span class="invisible">$\gt{positive}$ </span><span class="invisible">to </span><span class="invisible">$\rt{negative}$ </span><span class="invisible">or </span><span class="invisible">$\rt{negative}$ </span><span class="invisible">to </span><span class="invisible">$\gt{positive}$)</span><div class="row"><div class="col">`+picsize('updownpoifpp',500)+`</div><div class="col">`+picsize('downuppoifpp',500)+`</div></div></p>`,
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
            // String.raw`<p>Determine the\p $y$-values\p of\p the points of inflection\p by\p substituting the\p $\ot{$x$-values}$\p into\p $f(x)$</p><p><b>Note: Do not \puse $f''(x)$\p to calculate\p the $y$-values.\p Use $f(x)$ instead</b></p>`,
            // String.raw`<p>Write the\p points of the inflection\p in the form $$\p{(}\p{\t{$x$-value}}\p{,}\p{\t{$y$-value}}\p{)}$$</p>`
        ]
    },
    specific:poi(1,0,-3,0)
},
    examples: [
        poisetup(1,-2,2,0),
        poisetup(-1,-2,2,1),
        poisetup(1,-4,0,0),
        poisetup(-1,-1,3,1),
        //T
        // poisetup(-2,-1,1,5),
        // poisetup(-1,-3,1,-4)
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
            // String.raw`<p>Determine the\p $y$-values\p of\p the maxima and minima\p by\p substituting the\p $\ot{$x$-values}$\p into\p $f(x)$</p><p><b>Note: Do not \puse $f'(x)$\p to calculate\p the $y$-values.\p Use $f(x)$ instead</b></p>`,
            // String.raw`<p>Write the\p relative maxima and minima\p in the form $$\p{(}\p{\t{$x$-value}}\p{,}\p{\t{$y$-value}}\p{)}$$</p>`
        ]
    },
    specific:relmaxminsecondderiv(1,0,-3,0)
},
    examples: [
        relmaxminsecondderivsetup(1,-2,2,0),
        relmaxminsecondderivsetup(-1,-2,2,1),
        relmaxminsecondderivsetup(1,-4,0,0),
        relmaxminsecondderivsetup(-1,-1,3,1),
        //T
        // relmaxminsecondderivsetup(-2,-1,1,5),
        // relmaxminsecondderivsetup(-1,-3,1,-4)
    ],
},
        {
            name: String.raw`Find absolute maximum and minimum on a closed interval`,
            intro: String.raw`<p>In this section,\p we will discuss how to\p find the\p absolute maximum\p and\p minimum \pof $f(x)$\p on a closed interval $[\b{a},\b{b}]$\p (a closed interval is\p an interval \pwith square brackets\p and\p includes the endpoints\p while an open interval\p is an interval \p with parentheses\p and\p does not include the endpoints)</p><p><span class="hi"><span class="invisible">The absolute maximum is</span><span class="invisible"> the highest $y$-value </span><span class="invisible">of the graph</span></span></p><p><span class="hi">The absolute minimum is <span class="invisible">the lowest $y$-value </span><span class="invisible">of the graph</span></p><p><div class="row">`+picsize('maxminab1',500)+`<div class="col"></div><div class="col">`+picsize('maxminab2',500)+String.raw`</div></div></p><p>As seen in the above pictures,\p<span class="hi"> the $x$-value of<span class="invisible"> an absolute max</span><span class="invisible"> or</span><span class="invisible"> min</span><span class="invisible"> is either a</span><span class="invisible"> $\ot{critical point}$,</span><span class="invisible"> an $\bt{endpoint}$,</span><span class="invisible"> or</span><span class="invisible"> both</span></span></p><p>Therefore,\p we can find the\p max and min\p using the following steps</p><p><ol><pli>Identify $\bt{endpoints}$ <span class="invisible">(they are given in the problem)</span></pli><pli>Find the $\ot{critical points}$<span class="invisible"> (the $x$-values</span><span class="invisible"> where $f'(x)=0$)</span></pli><pli>Since max and a min<span class="invisible"> can only occur at</span><span class="invisible"> a $\ot{critical point}$</span><span class="invisible"> or</span><span class="invisible"> $\bt{endpoint}$,</span><span class="invisible"> we can determine </span><span class="invisible">the max and min by</span><span class="invisible"> calculating the $y$-value</span><span class="invisible"> of each $\ot{critical point}$</span><span class="invisible"> and </span><span class="invisible">$\bt{endpoint}$</span></pli><pli>The max is<span class="invisible"> the largest $y$-value </span><span class="invisible">and</span><span class="invisible"> the min is<span class="invisible"></span> the smallest $y$-value</span></pli></ol></p>`,
            rightColWidth: 90,
            steps: {
                general:{
                    question:String.raw`<p>Find the absolute maximum and absolute minimum of $f(x)=\t{\{an equation\}}$ on $[\b{a},\b{b}]$</p>`,
                    steps:[
                        String.raw`Identify\p the $\bt{endpoints}$`,
                        String.raw`<p>Find \p$f'(x)$</p>`,
                        String.raw`<p>Solve $\p{f'(x)}\p{=}\p{0}$\p to get the\p $\ot{critical points}$</p>`,
                        String.raw`<p>Get\p the $\t{$y$-values}$\p by\p plugging in the\p $\ot{critical points}$\p and\p $\bt{endpoints}$\p into\p $f(x)$</p><p><b>Note: \p to get the\p $y$-values,\p substitute $x$-values\p into $f(x)$\p not $f'(x)$</b></p><p><b>Note: Do not\p plug in\p $\o{\textbf{critical points}}$\p which are not\p in the given interval</b></p>`,
                        String.raw`<p><ol><pli><span class="hi">The absolute maximum is<span class="invisible"> the largest </span><span class="invisible">$y$-value</span></span></pli><pli><span class="hi">The absolute minimum is<span class="invisible"> the smallest </span><span class="invisible">$y$-value</span></span></pli></ol></p>`
                    ]
                },
                specific:cubicMaxMin(-1,4,1,0,-3,0)
            },
            examples: [
                cubicMaxMinSetup(-3,0,1,-2,2,0),
                cubicMaxMinSetup(-3,2,-1,-2,2,1),
                cubicMaxMinSetup(-4,1,1,-4,0,0),
                cubicMaxMinSetup(-2,3,-1,-1,3,1),
                //T
                // cubicMaxMinSetup(-2,1,-2,-1,1,5),
                // cubicMaxMinSetup(-3,3,-1,-3,1,-4)
            ],
        },
        {
            name: String.raw`Find absolute maximum and minimum on an open interval`,
            intro: String.raw`<p>In this section,\p we will discuss how to\p find the absolute \p max and min\p of a graph\p on an open interval</p><p>An open interval\p (an interval with\p parentheses\p instead of square brackets)\p does not to include\p its endpoints</p><p>Because of this,\p it is possible for a function\p on an open interval\p to have\p no max\p and/or\p no min</p><p><div class="row"><div class="col">`+picsize('maxnomin',500)+`</div><div class="col">`+picsize('minnomax',500)+String.raw`</div></div></p><p>In general,\p a max or min\p can occur at\p a $\ot{critical point}$\p or\p an $\bt{endpoint}$</p><p>Because an open interval\p doesn't include its\p $\bt{endpoints}$, the\p max \p and\p min\p can only occur at\p $\ot{critical points}$</p><p>In many cases,\p it is very difficult to\p solve \p max and min problems\p on open intervals</p><p>Because of this,\p we will only consider\p one type of problem\p which is easier to solve</p><p><ol><pli>$f(x)$ will have<span class="invisible"> only one $\ot{critical point}$</span></pli><pli>$f''(x)$ will be either<span class="invisible"> always $\gt{positive}$</span><span class="invisible"> or</span><span class="invisible"> always $\rt{negative}$</span></pli></ol></p><p><div class="row"><div class="col">`+picsize('min2ndderivinf',500)+String.raw`<p>If $f(x)$ is always concave $\gt{up}$,\p $f(x)$ has a $\gt{min}$\p at \p the $\ot{critical point}$\p and no $\rt{max}$</p><p><span class="hi">If $f(x)$ is concave $\gt{up}$, <span class="invisible">$f''(x)$ is</span><span class="invisible"> $\gt{positive}$</span></span></p><p>Therefore,\p <span class="hi">if $f''(x)$ is <span class="invisible"> always $\gt{positive}$,<span class="invisible"> $f(x)$ will have </span><span class="invisible">a $\gt{min}$ at </span><span class="invisible">the $\ot{critical point}$ </span><span class="invisible">and </span><span class="invisible"> no $\rt{max}$</span></p></div><div class="col">`+picsize('max2ndderivinf',500)+String.raw`<p>If $f(x)$ is always concave $\rt{down}$,\p $f(x)$ has a $\rt{max}$\p at \p the $\ot{critical point}$\p and no $\gt{min}$</p><p><span class="hi">If $f(x)$ is concave $\rt{down}$, <span class="invisible">$f''(x)$ is</span><span class="invisible"> $\rt{negative}$</span></span></p><p>Therefore,\p <span class="hi">if $f''(x)$ is <span class="invisible"> always $\rt{negative}$,<span class="invisible"> $f(x)$ will have </span><span class="invisible">a $\rt{max}$ at </span><span class="invisible">the $\ot{critical point}$ </span><span class="invisible">and </span><span class="invisible"> no $\gt{min}$</span></p></div></div>`,
            rightColWidth: 90,
            steps: {
                general:{
                    question:String.raw`<p>Find the absolute maximum and absolute minimum of $f(x)=\t{\{an equation\}}$ on $(0,\infty)$</p>`,
                    steps:[
                        String.raw`<p>Find \p$f'(x)$</p>`,
                        String.raw`<p>Solve\p $f'(x)=0$\p to get\p the $\ot{critical points}$</p>`,
                        String.raw`<p>Find\p $f''(x)$</p>`,
                        String.raw`<p>Determine\p if $f''(x)$ is\p always $\gt{positive}$\p or\p always $\rt{negative}$</p><p><ol><pli>If all coefficients<span class="invisible"> in $f''(x)$</span><span class="invisible"> are $\gt{positive}$,</span><span class="invisible"> $f(x)$ is</span><span class="invisible"> concave $\gt{up},$</span></span><span class="invisible"> so $f(x)$ has</span><span class="invisible"> a $\gt{min}$ at</span><span class="invisible"> and</span><span class="invisible"> no $\rt{max}$</span></pli><pli>If all coefficients<span class="invisible"> in $f''(x)$</span><span class="invisible"> are $\rt{negative}$,</span><span class="invisible"> $f(x)$ is </span><span class="invisible"> concave $\rt{down},$</span><span class="invisible"> so $f(x)$ has</span><span class="invisible"> a $\rt{max}$</span><span class="invisible"> and</span><span class="invisible"> no $\gt{min}$</span></pli></ol></p>`,//at</span><span class="invisible"> the $ot{critical point}$</span>
                        // String.raw`<p>Find the\p $y$-value of\p the $\rt{max}$\p or\p $\gt{min}$ by\p plugging the\p $\ot{critical point}$\p into\p $f(x)$</p><p><b>Note:\p Do not plug into\p $f'(x)$\p or\p $f''(x)$</b></p>`
                    ]
                },
                specific:maxminzinfquad(3,-6,0),
            },
            examples: [
                maxminzinfquad(-3,12,2),
                maxminzinfquad(2,-4,0),
                maxminzinfquad(-1,2,1),
                maxminzinfquad(2,-8,0),
                maxminzinfquad(-2,8,-2),
                maxminzinfquad(-2,4,6),
                maxminzinfquad(1,-6,4),
                maxminzinfquad(-1,4,2),
                //T
                maxminzinfquad(-1,2,3)
            ],
        },
        {
            name: String.raw`A Fence by a River`,
            intro:String.raw`<p>In this section,\p we will describe how to\p answer the following question:</p><p>A farmer wants to build\p a three-sided\p rectangular fence\p near a river,\p using $\yk{d}$ yards of fencing.</p><p>Assume that\p the river runs straight\p and that\p John need not fence in\p the side next to the river.</p><p>What are the\p $\yut{length}$\p and\p the $\ot{width}$ of\p the fence which\p maximizes the enclosed area?</p><p>A diagram for the problem,\p provided on the exam but not in WebAssign,\p is below:
        </p><p><iframe src="https://www.desmos.com/calculator/hbi9py1k7h?embed" width="500" height="500" style="border: 1px solid #ccc" frameborder=0></iframe></p><p>
        We solve this problem\p in two stages:</p><p><ol><pli>Rewrite <span class="invisible">the word problem as</span><span class="invisible"> maximizing a function $f(x)$</span></pli><pli>Use the steps<span class="invisible"> from the previous lecture</span><span class="invisible"> to </span><span class="invisible">maximize $f(x)$</span></pli></ol></p><p>In the first stage,</p><p><ol><pli>Write the area in terms of<span class="invisible"> $\ot{width}$</span><span class="invisible"> and</span><span class="invisible"> $\yut{length}$</span></pli><pli>Use the<span class="invisible"> $\btip{\ykt{amount of fence used}}{\t{given in the problem}}$ </span><span class="invisible">to </span><span class="invisible">write $\yut{length}$ </span><span class="invisible">in terms of</span><span class="invisible"> $\ot{width}$.</span></pli><pli>Use the previous two steps to<span class="invisible"> rewrite area</span><span class="invisible"> in terms of</span><span class="invisible"> only $\ot{width}$,</span><span class="invisible"> i.e.,</span><span class="invisible"> $\t{area}=f(\ot{width})$</span></pli></ol></p><p> In the second stage,\p we maximize\p $f(\ot{width})$ by</p><p>
        <ol>
            <pli>
                Finding<span class="invisible"> the critical point</span>
            </pli>
            <pli>
                Using <span class="invisible">$f''(x)$</span><span class="invisible"> to </span><span class="invisible">verify that</span><span class="invisible"> the critical point is</span><span class="invisible"> a max</span>
            </pli>
            <pli>
                Use <span class="invisible">the critical point</span><span class="invisible"> to</span><span class="invisible"> find the</span><span class="invisible"> $\yut{length}$</span>
            </pli>
            <pli>
                In WebAssign,<span class="invisible"> you will have to</span><span class="invisible"> plug </span><span class="invisible">the $\ot{width}$</span><span class="invisible"> and </span><span class="invisible">$\yut{length}$</span><span class="invisible"> into</span><span class="invisible"> the area equation</span><span class="invisible"> to get</span><span class="invisible"> the maximum area.</span>
            </pli>
        </ol></p>`,
            rightColWidth: 90,
            steps: {
                general:{
                    question:fenceQ('d'),
                    steps:[
                        String.raw`Write\p an equation for\p the area \pin terms of\p $\ot{width}$\p and\p $\yut{length}$`,
                        String.raw`Use\p the $\pkt{amount of fence used}$\p to write\p an equation that\p relates\p $\ot{width}$\p and\p $\yut{length}$`,
                        String.raw`Solve\p the equation from step 2\p for $\yut{length}$\p in terms of\p $\ot{width}$</p><p>It is equally correct to\p solve for\p $\ot{width}$\p in terms of\p $\yut{length}$\p if you prefer that`,
                        String.raw`Substitute\p the equation from step 3\p for $\yut{length}$\p into\p the area equation`,
                        String.raw`Find $f'(x)$</p><p>I recommend\p distributing the\p $x$\p to avoid product rule<br>Using product rule is\p totally correct\p but it takes longer`,
                        String.raw`Solve\p $f'(x)=0$\p to get\p the $\btip{\ot{critical point}}{\b{x\t{-value where }f'(x)=0}}$`,
                        String.raw`Find $f''(x)$`,
                        String.raw`<p>Determine\p if $f''(x)$ is\p always $\gt{positive}$\p or\p always $\rt{negative}$</p><p><ol><pli>If all coefficients<span class="invisible"> in $f''(x)$</span><span class="invisible"> are $\gt{positive}$,</span><span class="invisible"> $f(x)$ is</span><span class="invisible"> concave $\gt{up},$</span></span><span class="invisible"> so $f(x)$ has</span><span class="invisible"> a $\gt{min}$ at</span><span class="invisible"> and</span><span class="invisible"> no $\rt{max}$</span></pli><pli>If all coefficients<span class="invisible"> in $f''(x)$</span><span class="invisible"> are $\rt{negative}$,</span><span class="invisible"> $f(x)$ is </span><span class="invisible"> concave $\rt{down},$</span><span class="invisible"> so $f(x)$ has</span><span class="invisible"> a $\rt{max}$</span><span class="invisible"> and</span><span class="invisible"> no $\gt{min}$</span></pli></ol></p>`,
                        String.raw`Find the\p $\yut{length}$ of\p the fence by\p plugging in\p the $\ot{critical point}$\p for $x$\p into\p the equation from step 4`,
                        // String.raw`Find\p the area by multiplying\p $\ot{width}$\p by\p the $\put{length}$`
                    ]
                },
                specific:fence(100)
            },
            examples: [
                fence(16),
                fence(8),
                fence(12),
                fence(20),
                fence(24),
                //T
                // fence(40),
                // fence(20)
            ],
        },
    ],
}