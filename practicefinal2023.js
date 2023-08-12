import {
    rp,
    rpp,
    addpause,
    sub,
    picsize,
    cleanpoly,
    zerosquadfactor,
    convertWork,
    deriv,convterm, pow
} from "./Calc.js?v=160";

function fpaex(fs,a){
    let str=convterm(fs)
    let fps=addpause(deriv(str)[1]);
    let str1='f\'(x)&\\p{=}'+fps;
    let str2='\\p{f\'(\\r{'+a+'})}&\\p{=}'+sub(deriv(str)[1],'x','\\r{'+a+'}')
    return {
        question:'<p>Let $f(x)='+rp(fs)+`.$</p><p>Find $f'(\\r{`+a+`})$</p>`,
        steps:[
            '$$\\begin{aligned}'+str1+'\\end{aligned}$$',
            '$$\\begin{aligned}'+str2+'\\end{aligned}$$'
        ]
    }
}

function eval1(fs,a){
    return fs.replaceAll('x','{('+a+')}')
}

function pwfn(name,f,g,a,sign1,sign2){
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
function sublim(f,a){
    return sub(f,'\\b{x}','\\go{'+a+'}')
}
function lim(f,a){
    return limx('x',f,a)
}
function liml(f,a){
    return limxs('x',f,a,'\\r{-}')
}
function limr(f,a){
    return limxs('x',f,a,'\\g{+}')
}
function limxs(x,f,a,s){
    let str=s==''?'':'^\\p{'+s+'}';
    return '\\p{\\lim\\limits_{\\p{\\b{'+x+'}}\\p{\\to}\\p{\\go{'+a+'}}'+str+'}}'+f
}
function bx(f,x){
    return f.replaceAll(x,'\\b{'+x+'}')
}
function pwfnex(f,g,a,sign1,sign2,k1,k2){
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
function incdecsetup(a1,x1,x2,d){
    let temp1=x1;
    x1=Math.min(x1,x2);
    x2=Math.max(temp1,x2)
    let list=cubicsetup(a1,x1,x2,d);
    return incdec(list[0],list[1],list[2],list[3],list[4])
}

function incdec(a,b,c,d,zs){
    return signchartprob(a,b,c,d,zs,'','increasing','decreasing');
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

function grt(N,gr){
    return `\\ot{`+grn(gr,N)+` rate}`;
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
function consurp(sx,sc,dx,dc){//ss,ds,xe,s
    let s=x=>sx*x+sc;
    let xe=(dc-sc)/(sx-dx);
    let qe='\\go{'+s(xe)+'}'
    xe='\\b{'+xe+'}'
    let ss=cleanpoly(sx,sc);
    let ds=cleanpoly(dx,dc);
    ds='\\r{'+ds+'}';
    ss='\\g{'+ss+'}';
    let xq='\\p{-}\\p{('+xe+')}\\p{('+qe+')}'
    return {
        question:'Find the consumer surplus for the supply $\\g{S(x)}='+ss+'$, $\\r{D(x)}=\\r{'+ds+'}$, $\\bt{equilibrium quantity}='+xe+'$ and $\\got{equilibrium price}='+qe+'$',
        steps:[
            '$$\\a{\\p{\\t{consumer surplus}}&\\p{=}\\iep{0}{\\bt{eq. quantity}}{\\r{D(x)}}\\p{-}\\p{(\\bt{eq. quantity})}\\p{(\\got{eq. price})}\\\\[10pt]&\\p{=\\iep{0}{'+xe+'}{'+ds+'}'+xq+'}\\\\[10pt]&\\p{=\\p{\\left('+defintbar(0,xe,ds)+'\\right)}'+xq+'}\\\\[10pt]&\\p{=\\left('+defintplugin(0,xe,ds)+'\\right)'+xq+'}}$$'
        ]
    }
}

function prodsurp(sx,sc,dx,dc){//ss,ds,xe,s
    let s=x=>sx*x+sc;
    let xe=(dc-sc)/(sx-dx);
    let qe='\\go{'+s(xe)+'}'
    xe='\\b{'+xe+'}'
    let ss=cleanpoly(sx,sc);
    let ds=cleanpoly(dx,dc);
    xe='\\b{'+xe+'}'
    ss='\\g{'+ss+'}'
    ds='\\r{'+ds+'}';
    let xq='\\p{('+xe+')}\\p{('+qe+')}\\p{-}'
    return {
        question:'Find the producer surplus for the supply $\\g{S(x)}=\\g{'+ss+'}$, $\\r{D(x)}='+ds+'$, $\\bt{equilibrium quantity}='+xe+'$ and $\\got{equilibrium price}='+qe+'$',
        steps:[
            '$$\\a{\\p{\\t{producer surplus}}&\\p{=}\\p{(\\bt{eq. quantity})}\\p{(\\got{eq. price})}\\p{-}\\iep{0}{\\bt{eq. quantity}}{\\g{S(x)}}\\\\[10pt]&\\p{='+xq+'\\iep{0}{'+xe+'}{'+ss+'}}\\\\[10pt]&\\p{='+xq+'\\p{\\left('+defintbar(0,xe,ss)+'\\right)}}\\\\[10pt]&\\p{='+xq+'\\p{\\left('+defintplugin(0,xe,ss)+'\\right)}}}$$'
        ]
    }
}

function piw(str){
    return '\\p{\\pi\\p{\\left(\\p{'+str+'}\\right)}}'
}

function vol(a,b,fs){//gs
    fs='\\g{'+fs+'}'
    a='\\r{'+a+'}'
    b='\\b{'+b+'}'
    return{
        question:`Find the volume of the solid generated by revolving $y=`+fs+`$ from $x=`+a+`$ to $x=`+b+`$ around the $x$-axis`,
        steps:[
            '$$\\a{\\p{\\t{volume}}&\\p{{}=\\p{\\pi}\\iep{\\r{a}}{\\b{b}}{\\p{\\left(\\p{\\g{f(x)}}\\right)}\\p{^2}}}\\\\[10pt]&\\p{=}\\p{\\pi}\\iep{'+a+'}{'+b+'}{\\p{\\left(\\p{'+fs+'}\\right)}\\p{^2}}}$$',
            // '$$\\a{\\t{volume}&='+piw(defintstr(a,b,gs))+'\\\\[10pt]&\\p{=}'+piw(defintbar(a,b,gs))+'\\\\[10pt]&\\p{=}'+piw(defintplugin(a,b,gs))+'}$$'
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
        j=0;
        let s='+';
        if(fss[i].charAt(0)=='-'){
            j=1;
            s='-'
        }
        str=str+strs[0]+s+strs[1]+strs[0]+fss[i].substring(j)+strs[1];
    }
    return str;
}

function defint1(a,b,fps,str){
    let its=inttermsall(turnblack(fps));
    let fs=turnblack(its[its.length-2]);
    let fb='\\p{\\left[\\b{'+fs.replaceAll('x','(\\r{'+b+'})')+'}\\right]}';
    let fa='\\p{\\left[\\b{'+fs.replaceAll('x','(\\pu{'+a+'})')+'}\\right]}';
    let strs=['',''];
    if(str.length>0){
        strs=['\\t{'+str+'}&=','\\\\[10pt]'];
        fps='\\g{'+fps+'}'
    }
    //`+strs[0]+`\\p{\\ie{\\p{\\pu{`+a+`}}}{\\p{\\r{`+b+`}}}{\\p{`+fps+`}}}`+strs[1]+`&\\p{=}\\p{\\b{`+fs+`}}\\p{\\ev{\\p{\\pu{`+a+`}}}{\\p{\\r{`+b+`}}}}\\\\[10pt]&\\p{=}`+fb+`\\p{-}`+fa+`
    return `<p>$$\\a{`+strs[0]+`\\p{\\ie{\\p{\\pu{`+a+`}}}{\\p{\\r{`+b+`}}}{\\p{`+fps+`}}}`+strs[1]+`&\\p{=}\\p{\\b{`+fs+`}}\\p{\\ev{\\p{\\pu{`+a+`}}}{\\p{\\r{`+b+`}}}}\\\\[10pt]&\\p{=}`+fb+`\\p{-}`+fa+`}$$</p>`;
}

function turnblack(str){
    let strs=['\\b','\\r','\\g']
    for(let i=0;i<strs.length;i++){
        str=str.replaceAll(strs[i],'')
    }
    return str;
}

function parsec(c){
    if(c=='-'){
        return -1;
    }
    return c==''?1:parseInt(c);
}

function findChar(str,chars){
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

function inttermsall(str){
    str=turnblack(str)
    if(str.startsWith('{')){
        str=str.substring(1,str.length-1);
    }
    let fss='';
    let wstrs='';
    let ints='';
    let is=findChar(str,['+','-']);
    let terms=str.split(/[+-]/)
    for(let i=0;i<terms.length;i++){
        if(terms[i].length>0){
            let strs1=intterm(terms[i])
            let str1='\\p{'+strs1[0]+'}';
            let str3=strs1.length>1?strs1[1]:terms[i];
            fss=fss+(i>0?str[is[i-1]]:'')+str3;
            //Remove extra work because studying for test now
            //wstrs=wstrs+'<p>$$\\i{'+str3+'}='+str1+'$$</p>'
            let str2=i>0?'\\p{'+str[is[i-1]]+'}':''
            ints=ints+str2+str1;
        }
    }
    return [wstrs,ints,fss]
}



function intterm(str){
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


function intc(str){
    return ['\\b{'+str+'}\\p{x}','\\b{'+str+'}']
}

function intcx(str){
    return intcxn(str+'^1')
}

function intcox(str){
    let j=str.search('{');
    let k=str.search('}')
    let c=str.slice(j+1,k)
    return c.length>0?['\\b{'+c+'}\\ln(x)','\\frac{\\b{'+c+'}}{x}']:['\\ln(x)','\\frac{1}{x}']
}

function intcxn(str){
    let i=str.search('x\\^');
    let c='\\b{'+str.slice(0,i)+'}';
    if(i==0){
        c='1';
    }
    let n='\\r{'+str.substring(i+2)+'}';
    return [`\\p{\\frac{\\p{`+c+`}}{\\p{`+n+`}\\p{+}\\p{1}}}\\p{x}^{\\p{`+n+`}\\p{+}\\p{1}}`,c+'x^'+n]
}

function intceax(str){
    let i=str.search('e\\^{');
    let c='\\b{'+str.slice(0,i)+'}';
    if(i==0){
        c='1';
    }
    let exp=str.substring(i+3);
    let j=exp.search('x')
    let a='\\r{'+exp.slice(0,j)+'}';
    return [`\\frac{\\p{`+c+`}}{\\p{`+a+`}}\\p{\\cdot}\\p{e^{\\p{`+a+`}\\p{x}}}`,``+c+`e^{`+a+`x}`]
}

function inttermsex(fs){
    let strs=inttermsall(fs);
    return {
        question:'<p>Let $f(x)='+fs+`.$</p><p>Find $\\i{f(x)}$</p>`,
        steps:[
            strs[0]+'<p>$$\\i{'+fs+'}=\\gb{\\p{'+strs[1]+'}\\C}$$</p>'//fs instead of strs[2] because of lack of color coding and x^1
        ]
    }
}

function inteq(fs){
    return turnblack(inttermsall(fs)[1])
}

function intetx(str){
    let i=str.search('e^x')
    let c=parsec(str.slice(0,i-2))
    let cs='\\p{\\b{'+c+'}}';
    if(c==1){
        cs='';
    }
    return [cs+'\\p{\\p{e}\\p{^x}}',cs+'e^x']
}

function areapw(a,b,c,gs,hs){
    return '<p>$$\\t{Area}='+defintstr('\\pk{'+a+'}','\\r{'+c+'}','\\b{'+gs+'}')+'\\p{+}'+defintstr('\\r{'+c+'}','\\go{'+b+'}','\\g{'+hs+'}')+'$$</p>'
}

function pw(c,gs,hs){
    return `$$f(x)=\\begin{cases}\\b{`+gs+`}&x<\\r{`+c+`}\\\\[4pt]\\g{`+hs+`}&x\\ge\\r{`+c+`}\\end{cases}$$`
}

function pwq(a,b,c,gs,hs,C){
    return (C?'t':'Find t')+'he area under '+pw(c,gs,hs)+'from $x=\\pk{'+a+'}$ to $x=\\go{'+b+'}$'+(C?' is ':'.')
}

function pwwu(a,b,c,gs,hs,C){
    return pwq(a,b,c,gs,hs,true)+areapw(a,b,c,gs,hs)
}

function defintbar(a,b,fs){
    return inteq(fs)+'\\p{\\ev{\\p{'+a+'}}{\\p{'+b+'}}}'
}

function defintstr(a,b,fs){
    return '\\p{\\ie{\\p{'+a+'}}{\\p{'+b+'}}{\\p{'+fs+'}}}'
}

function twodefint(a,b,c,d,gs,hs,s,str){
    let strs10=str.length>0?['\\t{'+str+'}&=','\\\\[10pt]']:['',''];
    s='\\p{'+s+'}';
    let ints=defintstr(a,b,gs)+s+defintstr(c,d,hs);
    let nextstep='&\\p{=}\\p{\\left('+defintbar(a,b,gs)+'\\right)}'+s+'\\p{\\left('+defintbar(c,d,hs)+'\\right)}\\\\[10pt]&\\p{=}'
    let ans='\\p{\\left('+defintplugin(a,b,gs)+'\\right)}'+s+'\\p{\\left('+defintplugin(c,d,hs)+'\\right)}'
    return `$$\\a{`+strs10[0]+ints+strs10[1]+nextstep+ans+`}$$`
}

function pwcalc(a,b,c,gs,hs){
    return twodefint('\\pk{'+a+'}','\\r{'+c+'}','\\r{'+c+'}','\\go{'+b+'}','\\b{'+gs+'}','\\g{'+hs+'}','+','Area')
}

function defintplugin(a,b,fs){
    let intf=inteq(fs);
    return '\\p{\\left[\\p{'+intf.replaceAll('x','{('+b+')}')+'}\\right]}\\p{-}\\p{\\left[\\p{'+intf.replaceAll('x','{('+a+')}')+'}\\right]}'
}

function pwex(a,b,c,gs,hs){
    return{
        question:pwq(a,b,c,gs,hs,false),
        steps:[
            picsize('pwarea4',500)+areapw(a,b,c,gs,hs),
            pwcalc(a,b,c,gs,hs)
        ]
    }
}

function areatc(a,b,c,fs,gs,f,g){
    let fc=f(c)
    let gc=g(c)
    a='\\go{'+a+'}'
    b='\\b{'+b+'}'
    let bt=fc>gc?['f(x)','g(x)',fs,gs]:['g(x)','f(x)',gs,fs]
    return {
        question:'Find the area between the curves $f(x)='+fs+'$ and $g(x)='+gs+'$ from $x=\\go{'+a+'}$ to $x=\\b{'+b+'}$',
        steps:[
            `$$\\gb{\\a{\\p{f(`+c+`)}&\\p{{}=`+eval1(fs,c)+`}\\\\[10pt]&\\p{=\\p{`+fc+`}}\\\\[10pt]\\p{g(`+c+`)}&\\p{=}\\p{`+eval1(gs,c)+`}\\\\[10pt]&\\p{=}\\p{`+gc+`}}}$$</p><p>$\\bb{\\ga{\\t{Since }\\p{`+bt[0]+`}\\p{\\t{ has the higher $y$-value, }}\\\\[4pt]\\p{\\t{the $\\gt{top}$ function is }}\\p{`+bt[0]+`=}\\p{\\g{`+bt[2]+'}}\\p{\\t{ and}}\\\\[4pt]\\p{\\t{the $\\rt{bottom}$ function is }}\\p{'+bt[1]+'=}\\p{\\r{'+bt[3]+'}}}}$',
            `$$\\a{\\gb{\\t{Area}}&=\\bb{\\iep{`+a+`}{`+b+`}{\\gt{top function}}\\p{-}\\iep{`+a+`}{`+b+`}{\\rt{bottom function}}}\\\\[10pt]&=\\gb{\\iep{`+a+`}{`+b+`}{\\g{`+bt[2]+`}}\\p{-}\\iep{`+a+`}{`+b+`}{\\r{`+bt[3]+`}}}}$$`,
            twodefint(a,b,a,b,'\\g{'+bt[2]+'}','\\r{'+bt[3]+'}','-','Area')
        ]
    }
}
function limx(x,f,a){
    return limxs(x,f,a,'')
}

window.j = {
    startCollapsed: false,
    lessonNum: 13,
    lessonName: "Practice Final",
    intro:String.raw`<p>The exam will have 12 questions<ol><pli>Find the limit of a piecewise function (section 1)</pli><pli>Calculate $f'(a)$ (section 2)</pli><pli>Increasing and Decreasing Intervals of a Cubic Function (section 3)</pli><pli>Fence by a River (section 4)</pli><pli>Derivatives involving $e^x$, $e^{ax}$, and $\ln(x)$ (section 5)</pli><pli>Solve for current amount (sections 6-7)</pli><pli>Solve for starting amount (section 8)</pli><pli>Area Under a Split Domain Function (section 9)</pli><pli>Area Between Two Curves With Given Endpoints (section 10)</pli><pli>Consumer Surplus (section 11)</pli><pli>Producer Surplus (section 12)</pli><pli>Volume (section 13)</pli></ol></p>`,
    sections:[
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
                pwfnex('x','3',-2,'<','\\ge',-2,3),
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
                fpaex('8x^4+9x','4'),
            ],
        },
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
                incdecsetup(-2,-1,1,5),
                incdecsetup(-1,-3,1,-4)
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
                fence(20),
                //T
                // fence(40),
                // fence(20)
            ],
        },
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
                pwex(0,4,2,'3-x','x^2'),
                pwex(1,5,2,'\\frac{5}{x}+1','3e^{2x}'),
                pwex(0,2,1,'4x+1','9x'),
                pwex(-2,0,1,'5x^3+3','x+2'),
                pwex(-1,5,0,'3e^x+2','9'),
                pwex(0,4,2,'9','3x+1')
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
                areatc(0,2,1,'x+2','2x^3',x=>x+2,x=>2*Math.pow(x,3)),
                areatc(-1,3,0,'9x^3-2','10x',x=>9*Math.pow(x,3)-2,x=>10*x),
                areatc(-2,0,-1,'4x^2','3',x=>4*pow(x,2),x=>3),
                areatc(0,4,1,'2','x+4',x=>2,x=>x+4),
                areatc(1,3,2,'2x','x^3',x=>2*x,x=>Math.pow(x,3)),
                areatc(0,2,1,'2x^2','x^4',x=>2*pow(x,2),x=>Math.pow(x,4))
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
                    question:String.raw`Find the consumer surplus for the supply $\r{D(x)}=\rt{an equation}$, $\g{S(x)}=\gt{another equation}$, $\bt{equilibrium quantity}=\bt{a number}$ and $\got{equilibrium price}=\got{another number}$`,
                    steps:[
                        String.raw`Calculate the Consumer Surplus with the formula $$\p{\t{Consumer Surplus}}\p{=}\iep{0}{\bt{eq. quantity}}{\r{D(x)}}\p{-}\p{(\bt{eq. quantity})}\p{(\got{eq. price})}$$`
                    ]
                },
                specific:consurp(3,2,-2,11)
            },
            examples: [
                consurp(7,-2,-3,8),
                consurp(9,5,-3,11),
                consurp(4,5,-6,7),
                consurp(5,-3,-8,10),
                consurp(4,4,-1,12),
                consurp(9,-4,-1,6)
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
                    question:String.raw`Find the producer surplus for the supply $\r{D(x)}=\rt{an equation}$, $\g{S(x)}=\gt{another equation}$, $\bt{equilibrium quantity}=\bt{a number}$ and $\got{equilibrium price}=\got{another number}$`,
                    steps:[
                        String.raw`Calculate the producer surplus with the formula $$\p{\t{producer surplus}}\p{=}\p{(\bt{eq. quantity})}\p{(\got{eq. price})}\p{-}\iep{0}{\bt{eq. quantity}}{\g{S(x)}}$$`
                    ]
                },
                specific:prodsurp(3,2,-2,11)
            },
            examples: [
                prodsurp(7,-2,-3,8),
                prodsurp(9,5,-3,11),
                prodsurp(4,5,-6,7),
                prodsurp(5,-3,-8,10),
                prodsurp(4,4,-1,12),
                prodsurp(9,-4,-1,6)
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
                        // String.raw`<b>WebAssign only: </b> Calculate the integral to find the volume`
                    ]
                },
                specific:vol(-1,1,'e^x')
            },
            examples: [
                vol(0,8,'\\sqrt{4+9x}'),
                vol(1,3,'9x+1'),
                vol(2,5,'10x^2+2'),
                vol(-1,3,'-3x+2'),
                vol(2,4,'x^2'),
                vol(1,5,'x^2+x')
            ],
        }
    ]
}