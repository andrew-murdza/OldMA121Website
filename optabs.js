import {
    addpause,
    buildPoly,
    cleanpoly,
    convertWork,
    deriv,
    pauseList, qr,
    subf,
    ap,
    zerosquadfactor, mult, writeNum, cleanup, subtract, picsize, convterm, rounddigits, sub, pow, lineqzero
} from "./Calc.js?v=5";
function cubicMaxMin(a,b,...as){
    let fs=cleanpoly(...as);
    let sol=zerosquadfactor(3*as[0],2*as[1],as[2])
    let zw=convertWork(sol[0])
    let xs=sol[1];
    let f=buildPoly(...as);
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
function fracMaxMin(a,b,a1,b1){//b and a must be non-zero
    b=Math.pow(b,2);
    let f1s=cleanpoly(a,0);
    let f2s=cleanpoly(1,0,b);
    let fp1s=deriv(f1s)[1];
    let fp2s=deriv(f2s)[1];
    let fs='\\frac{'+f1s+'}{'+f2s+'}';
    let denom='('+f2s+')^2';
    let fpsw='&\\p{=}\\p{\\frac{'+addpause(cleanpoly(a,0,a*b))+'\\p{-}'+addpause(cleanpoly(2*a,0,0))+'}{\\p{'+denom+'}}}\\\\[10pt]&\\p{=}\\p{\\frac{'+addpause(cleanpoly(-a,0,a*b))+'}{\\p{'+denom+'}}}'
    let fpsim='\\p{\\frac{'+cleanpoly(-a,0,a*b)+'}{\\p{'+denom+'}}}'
    let list=['\\p{'+fpsim+'}&\\p{=}\\p{0}','\\p{'+fpsim+'}\\p{'+denom+'}&\\p{=}\\p{0}\\p{'+denom+'}'];
    let sol=zerosquadfactor(-a,0,a*b)
    list.push(...sol[0])
    let xs=sol[1]
    let zw=convertWork(list);
    let str='<p>Since $f(x)='+addpause(fs)+'$\\p is\\p a' +
        ' fraction,\\p we need to use\\p the quotient' +
        ' rule</p><p><div class="row"><div class="col">$$'+qr+'$$</div><div class="col">$$\\begin{aligned}\\hspace{1cm}\\p{\\pu{f_1(x)}}&\\p{=}\\p{\\pu{'+f1s+'}}\\\\[6pt]\\hspace{1cm}\\o{\\p{f_2(x)}}&\\p{=}\\o{\\p{'+f2s+'}}\\\\[6pt]\\hspace{1cm}\\p{\\g{f_1\'(x)}}&\\p{=}\\p{\\g{'+addpause(fp1s)+'}}\\\\[6pt]\\hspace{1cm}\\b{\\p{f_2\'(x)}}&\\p{=}\\b{'+addpause(fp2s)+'}\\end{aligned}$$</div></div></p>'
    str=str+'<p>$$\\begin{aligned}\\p{f\'(x)}&\\p{=}\\p{\\frac{\\p{\\g{'+ap(fp1s)+'}}\\p{\\cdot}\\p{\\o{'+ap(f2s)+'}}\\p{-}\\p{\\pu{'+ap(f1s)+'}}\\p{\\cdot}\\p{\\b{'+ap(fp2s)+'}}}{\\p{(\\p{\\o{'+f2s+'}})}^\\p{2}}}\\\\[10pt]'+fpsw+'\\end{aligned}$$</p>'
    let a2=a;
    let b2=b;
    let f=x=>(a2*x/(Math.pow(x,2)+b2))
    return maxminex(fs,f,xs,a1,b1,zw,str)
}
function pointymaxmin(a,b,n,a1rt,b1rt){
    let a1=Math.pow(a1rt,3);
    let b1=Math.pow(b1rt,3);
    let fs=cleanup(a+'x^'+writeNum(n,true)+(b==0?'':'+'+b));
    let df=deriv(fs);
    let fpwk='$$\\begin{aligned}f\'(x)&\\p{=}'+addpause(df[0])+'\\\\[6pt]&\\p{=}'+addpause(df[1])+'\\end{aligned}$$'
    let a2=a;
    let b2=b;
    let c=mult([a,1],n);
    let n1=subtract(n,[1,1])
    n1=[-n1[0],n1[1]];
    let n2=n;
    let rewrite='\\p{'+writeNum(c)+'}\\p{\\cdot}\\p{\\frac{\\p{1}}{\\p{x}^\\p{'+writeNum(n1,true)+'}}}'
    let f=x=>a*Math.pow(Math.abs(x),n2[0]/n2[1])+b;
    let xs=[0];
    let zw='$$\\begin{aligned}x^\\p{'+writeNum(n1,true)+'}&\\p{=}\\p{0}\\\\[6pt]\\p{x}&\\p{=}\\p{\\o{0}}\\end{aligned}$$'
    return maxminex(fs,f,xs,a1,b1,zw,fpwk,rewrite)
}
function maxminzinffrac(a,b){
    let fs=a+'x^2+'+'\\frac{'+b+'}{x}'
    let fs1=convterm(fs);
    let fps=deriv(fs1)[1];
    let a0=a;
    let b0=b;
    let a1=2*a;
    let b1=-b;
    let sign='\\p{'+(b1>0?'+':'-')+'}'
    let frac='\\p{\\frac{\\p{'+Math.abs(b1)+'}}{\\p{x}^\\p{2}}}'
    let fps2=cleanup('\\p{'+a1+'}\\p{x}'+sign+frac)
    let lhs1=cleanup('\\p{(\\p{'+a1+'}\\p{x})}\\p{(\\p{x}^\\p{2})}'+sign+'\\p{\\left('+frac+'\\right)}\\p{(\\p{x}^\\p{2})}')
    let cp=rounddigits(Math.sign(-a1/b1)*Math.pow(Math.abs(-a1/b1),1/3),3);
    let zw='$$\\begin{aligned}'+addpause(fps)+'&\\p{=}\\p{0}\\\\[10pt]'+fps2+'&\\p{=}\\p{0}\\\\'+lhs1+'&\\p{=}\\p{0}\\p{(\\p{x}^\\p{2})}\\\\[10pt]'+addpause(a1+'x^3+'+b1)+'&\\p{=}\\p{0}\\\\[6pt]'+addpause(a1+'x^3')+'&\\p{=}\\p{'+(-b1)+'}\\\\[6pt]'+addpause('x^3')+'&\\p{=}'+addpause(rounddigits(-a1/b1,3))+'\\\\[6pt]\\p{x}&\\p{=}\\o{\\p{'+cp+'}}\\end{aligned}$$'
    let fpw='$$\\begin{aligned}f(x)&\\p{=}'+addpause(fs1)+'\\\\[6pt]\\p{f\'(x)}&\\p{=}'+addpause(fps)+'\\end{aligned}$$'
    return maxminzinf(x=>a0*pow(x,2)+b0/x,a>0,cp,fs,zw,fpw)
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
window.j = {
    startCollapsed: false,
    lessonNum: 10,
    lessonName: "Optimization Part 1",
    intro: String.raw`<p>In this section,\p we will discuss\p how to find\p the absolute maximum\p and\p minimum of\p $f(x)$\p on an interval</p>`,
    sections: [
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
                specific:cubicMaxMin(0,4,1,0,-3,0)
            },
            examples: [
                fracMaxMin(4,1,-3,3),
                cubicMaxMin(0,3,1,-3,0,0),
                //cubicMaxMin(1,3,-2,9,-12,0)
            ],
        },
        {
            name: String.raw`Find absolute maximum and minimum on a closed interval of a pointy function`,
            intro: String.raw`<p>In this section,\p we will discuss how to\p find the absolute \p max and min\p of a pointy\p graph</p><p>A pointy graph is\p a graph with\p sharp corners</p><p>`+picsize('pointyopt',500)+String.raw`</p><p>As seen in the above picture,\p<span class="hi"> a graph <span class="invisible"> can also have a max</span><span class="invisible"> or</span><span class="invisible"> min at a point where</span><span class="invisible"> the graph is pointy</span></span></p><p><span class="hi">A graph is pointy where <span class="invisible">its derivative is</span><span class="invisible"> DNE</span></p><p>In this class,\p a non-piecewise function <span class="invisible">will be pointy when</span><span class="invisible"> $f'(x)$ has</span><span class="invisible"> division by zero</span></span></p><p>To account for this,\p we will say that\p<span class="hi"> $f(x)$ has a $\ot{critical point}$ when<span class="invisible"> $f'(x)$ has </span><span class="invisible">division by zero</span><span class="invisible"> or</span><span class="invisible"> $f'(x)=0$</span></span></p>`,
            rightColWidth: 90,
            steps: {
                general:{
                    question:String.raw`<p>Find the absolute maximum and absolute minimum of $f(x)=\t{\{an equation\}}$ on $[\b{a},\b{b}]$</p>`,
                    steps:[
                        String.raw`Identify\p the $\bt{endpoints}$`,
                        String.raw`<p>Find \p$f'(x)$</p>`,
                        String.raw`<p>Rewrite\p $f'(x)$\p without\p a negative exponent\p using\p the property $\b{\p{c}}\p{(\p{\pu{g(x)}})}^{\p{-}\p{\r{n}}}\p{=}\p{\b{c}}\p{\cdot}\p{\frac{\p{1}}{\p{(\p{\pu{g(x)}})}^\p{\r{n}}}}$</p>`,
                        String.raw`<p>A fraction is\p DNE\p when\p its denominator is\p zero</p><p><span class="hi">A $\ot{critical point}$ occurs when<span class="invisible"> $f'(x)$ is</span><span class="invisible"> zero </span><span class="invisible">or</span><span class="invisible"> DNE</span></span></p><p>Solve for when\p the denominator of\p $f'(x)$\p is zero\p to get \p the $\ot{critical points}$</p>`,
                        String.raw`<p>Get\p the $\t{$y$-values}$\p by\p plugging in the\p $\ot{critical points}$\p and\p $\bt{endpoints}$\p into\p $f(x)$</p>`,
                        String.raw`<p><ol><pli><span class="hi">The absolute maximum is<span class="invisible"> the largest </span><span class="invisible">$y$-value</span></span></pli><pli><span class="hi">The absolute minimum is<span class="invisible"> the smallest </span><span class="invisible">$y$-value</span></span></pli></ol></p>`
                    ]
                },
                specific:pointymaxmin(2,1,[2,3],-1,2)
            },
            examples: [

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
                        String.raw`<p>Find the\p $y$-value of\p the $\rt{max}$\p or\p $\gt{min}$ by\p plugging the\p $\ot{critical point}$\p into\p $f(x)$</p><p><b>Note:\p Do not plug into\p $f'(x)$\p or\p $f''(x)$</b></p>`
                    ]
                },
                specific:maxminzinffrac(1,2)
            },
            examples: [
                maxminzinfquad(-3,12,2),
                //maxminzinfquad(2,-4,0),
                //maxminzinfquad(-1,6,0),
            ],
        },
    ],
}