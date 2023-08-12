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
} from "./Calc.js?v=3";
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
    let steps1=[fpwk];
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
    let str='<p><div class="row"><div class="col">$$'+qr+'$$</div><div class="col">$$\\begin{aligned}\\hspace{1cm}\\p{\\pu{f_1(x)}}&\\p{=}\\p{\\pu{'+f1s+'}}\\\\[6pt]\\hspace{1cm}\\o{\\p{f_2(x)}}&\\p{=}\\o{\\p{'+f2s+'}}\\\\[6pt]\\hspace{1cm}\\p{\\g{f_1\'(x)}}&\\p{=}\\p{\\g{'+addpause(fp1s)+'}}\\\\[6pt]\\hspace{1cm}\\b{\\p{f_2\'(x)}}&\\p{=}\\b{'+addpause(fp2s)+'}\\end{aligned}$$</div></div></p>'
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
            String.raw`Because\p $f''(x)$ is\p always \p$\rt{negative}$,\p a $\ot{width}$\p of\p $\ot{`+d/4+`}$ gives\\p the $\\rt{maximum}$ area`,
            String.raw`$$\begin{aligned}\yu{y}&\p{=}\p{\yk{`+d+`}}\\p{-}\\p{2}\\p{\\o{x}}\\\\[4pt]&\\p{=}\\p{\\yk{`+d+`}}\\p{-}\\p{2}\\p{(\\o{`+d/4+`})}\\\\[4pt]&\\p{=}\\p{\\yu{`+d/2+`}}\\end{aligned}$$`,
            '$$\\begin{aligned}A&\\p{=}\\p{\\pu{x}}\\p{\\cdot}\\p{\\o{y}}\\\\[4pt]&\\p{=}\\p{(\\o{'+d/4+'})}\\p{\\cdot}\\p{(\\pu{'+d/2+'})}\\\\[4pt]&\\p{=}\\p{'+pow(d,2)/8+'}\\end{aligned}$$',
        ]
    }
}
function baseballex(x1,n1,dx,dn){
    let dn1=-dn;
    let m='\\p{\\frac{\\p{'+dn1+'}}{\\p{'+dx+'}}}'
    let m1=rounddigits(dn1/dx,3);
    let m2=2*m1;
    let x11=m1*x1;
    let b=-x11+n1;
    let n=m1+'\\p{(\\p{x}\\p{-}\\p{'+x1+'})}\\p{+}\\p{'+n1+'}'
    let sol=lineqzero(m2,b);
    let x=sol[1]
    return {
        question:baseballQ(x1,n1,dx,dn),
        steps:[
            '$$\\begin{aligned}\\p{-}\\p{\\Delta N}&\\p{=}\\p{'+dn+'}\\\\[7pt]\\p{\\Delta N}&\\p{=}\\p{'+dn1+'}\\\\\\p{m}&\\p{=}\\p{\\frac{\\p{\\Delta N}}{\\p{\\Delta x}}}\\\\[10pt]&\\p{=}'+m+'\\\\[7pt]&='+m1+'\\\\[7pt]\\p{x_1}&\\p{=}\\p{'+x1+'}\\\\[4pt]\\p{N_1}&\\p{=}\\p{'+n1+'}\\end{aligned}$$',
            '$$\\begin{aligned}\\p{N}\\p{-}\\p{N_1}&\\p{=}\\p{m}\\p{(\\p{x}\\p{-}\\p{x_1})}\\\\[10pt]\\p{N}\\p{-}\\p{'+n1+'}&\\p{=}'+m1+'\\p{(\\p{x}\\p{-}\\p{'+x1+'})}\\\\[10pt]\\p{N}&\\p{=}'+n+'\\end{aligned}$$',
            '$$\\begin{aligned}f(x)&\\p{=}\\p{x}\\p{N}\\\\[7pt]&\\p{=}\\p{x}\\p{('+n+')}\\end{aligned}$$',
            ('$$\\begin{aligned}f(x)&\\p{=}\\p{x}\\p{('+n+')}\\\\[10pt]&\\p{=}\\p{x}\\p{(\\p{'+m1+'}\\p{(\\p{x}\\p{-}\\p{'+x1+'})\\p{+}\\p{'+n1+'}})}\\\\[6pt]&\\p{=}\\p{x}\\p{(\\p{'+m1+'}\\p{x}\\p{-}\\p{\\p{'+x11+'}\\p{+}\\p{'+n1+'})}\\\\[6pt]\\p{=}\\p{x}\\p{(\\p{'+m1+'}\\p{x}\\p{+}\\p{'+b+'}})}\\\\[6pt]&\\p{=}\\p{'+m1+'}\\p{x}^\\p{2}\\p{+}\\p{'+b+'}\\\\[6pt]\\p{f\'(x)}&\\p{=}\\p{'+m2+'}\\p{x}\\p{+}\\p{'+b+'}\\end{aligned}$$').replaceAll('\\p{-}\\p{\\p{-','\\p{+}\\p{\\p{'),
            convertWork(sol[0]),
            '$$\\begin{aligned}f\'(x)&\\p{=}'+m2+'x+'+b+'\\\\[6pt]\\p{f\'\'(x)}&\\p{=}\\p{'+m1+'}\\end{aligned}$$',
            String.raw`Because\p $f''(x)$ is\p always \p$\rt{negative}$,\p a $\ot{price}$\p of\p $\ot{`+x+`}$ gives\\p the $\\rt{maximum}$ revenue`,
            `The maximum revenue is\\p$$\\begin{aligned}f(\\p{\\o{`+x+`}})&\\p{=}`+m1+`\\p{(\\ot{`+x+`})}^\\p{2}\\p{+}\\p{`+b+`}\\p{(\\ot{`+x+`})}\\\\[6pt]&\\p{=}\\p{`+(m1*pow(x,2)+b*x)+`}\\end{aligned}$$`
        ]
    }
}
function baseballQ(x1,n1,dx,dn){
    return `<p>When a baseball park owner charges\\p $`+x1+`$ for admission,\\p there is an average attendance\\p of $`+n1+`$ people.</p><p>For every $`+dx+`$ increase\\p in the admission price,\\p there is a loss of\\p $`+dn+`$ customers\\p from the average number.</p><p>What admission price\\p should be charged\\p in order to\\p maximize revenue?</p>`
}
window.j = {
    startCollapsed: false,
    lessonNum: 10,
    lessonName: "Optimization Word Problems",
    intro: String.raw`<p>In this section,\p we will discuss\p how to find the absolute maximum and minimum of $f(x)$ on an interval</p>`,
    sections: [
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
                        String.raw`<p>Determine\p if $f''(x)$ is\p always $\gt{positive}$\p or\p always $\rt{negative}$</p><p><ol><pli>If all of the numbers in front of $x$<span class="invisible"> in $f''(x)$</span><span class="invisible"> are $\gt{positive}$,</span><span class="invisible"> $f''(x)$ is always $\gt{positive}$</span><span class="invisible"> on $(0,\infty)$,</span><span class="invisible"> so $f(x)$ has</span><span class="invisible"> a $\gt{min}$ at</span><span class="invisible"> the $\ot{critical point}$</span><span class="invisible"> and</span><span class="invisible"> no $\rt{max}$</span></pli><pli>If all of the numbers in front of $x$<span class="invisible"> in $f''(x)$</span><span class="invisible"> are $\rt{negative}$,</span><span class="invisible"> $f''(x)$ is always $\rt{negative}$</span><span class="invisible"> on $(0,\infty)$,</span><span class="invisible"> so $f(x)$ has</span><span class="invisible"> a $\rt{max}$ at</span><span class="invisible"> the $\ot{critical point}$</span><span class="invisible"> and</span><span class="invisible"> no $\gt{min}$</span></pli></ol></p>`,
                        String.raw`Find the\p $\yut{length}$ of\p the fence by\p plugging in\p the $\ot{critical point}$\p for $x$\p into\p the equation from step 4`,
                        String.raw`Find\p the area by multiplying\p $\ot{width}$\p by\p the $\put{length}$`
                    ]
                },
                specific:fence(100)
            },
            examples: [

            ],
        },
        {
            name: String.raw`Baseball Game`,
            intro:String.raw`<p>In this section,\p we will describe how to\p answer the following question:</p>`+baseballQ('x_1','N_1','\\Delta x','-\\Delta N')+String.raw`<p>
        We solve this problem\p in two stages:</p><p><ol><pli>Rewrite <span class="invisible">the word problem as</span><span class="invisible"> maximizing a function $f(x)$</span></pli><pli>Use the steps<span class="invisible"> from the previous lecture</span><span class="invisible"> to </span><span class="invisible">maximize $f(x)$</span></pli></ol></p><p>In the first stage,</p><p><ol><pli>Use<span class="invisible"> point slope form</span><span class="invisible"> to find </span><span class="invisible">an equation for the number of customers</span></pli><pli>$f(x)$ is<span class="invisible"> the price</span><span class="invisible"> times </span><span class="invisible">the number of customers</span></pli></ol></p><p> In the second stage,\p we maximize\p $f(x)$ by</p><p>
        <ol>
            <pli>
                Finding<span class="invisible"> the critical point</span>
            </pli>
            <pli>
                Using <span class="invisible">$f''(x)$</span><span class="invisible"> to </span><span class="invisible">verify that</span><span class="invisible"> the critical point is</span><span class="invisible"> a max</span>
            </pli>
            <pli>
                Use <span class="invisible">the critical point</span><span class="invisible"> to</span><span class="invisible"> find the</span><span class="invisible"> maximum revenue</span>
            </pli>
        </ol></p>`,
            rightColWidth: 90,
            steps: {
                general:{
                    question:baseballQ('x_1','N_1','\\Delta x','-\\Delta N'),
                    steps:[
                        String.raw`Identify\p the slope\p and\p point for\p the number of customers\p in terms of\p price`,
                        String.raw`Write\p the number of customers\p in terms of\p price\p using\p point-slope form`,
                        String.raw`$f(x)$ is\p the price\p ($x)$\p times the number of customers`,
                        String.raw`Find $f'(x)$</p><p>I recommend\p distributing the\p $x$\p to avoid product rule<br>Using product rule is\p totally correct\p but it takes longer`,
                        String.raw`Solve\p $f'(x)=0$\p to get\p the $\btip{\ot{critical point}}{\b{x\t{-value where }f'(x)=0}}$\p which is\p the best price\p to charge`,
                        String.raw`Find $f''(x)$`,
                        String.raw`<p>Determine\p if $f''(x)$ is\p always $\gt{positive}$\p or\p always $\rt{negative}$</p><p><ol><pli>If all of the numbers in front of $x$<span class="invisible"> in $f''(x)$</span><span class="invisible"> are $\gt{positive}$,</span><span class="invisible"> $f''(x)$ is always $\gt{positive}$</span><span class="invisible"> on $(0,\infty)$,</span><span class="invisible"> so $f(x)$ has</span><span class="invisible"> a $\gt{min}$ at</span><span class="invisible"> the $\ot{critical point}$</span><span class="invisible"> and</span><span class="invisible"> no $\rt{max}$</span></pli><pli>If all of the numbers in front of $x$<span class="invisible"> in $f''(x)$</span><span class="invisible"> are $\rt{negative}$,</span><span class="invisible"> $f''(x)$ is always $\rt{negative}$</span><span class="invisible"> on $(0,\infty)$,</span><span class="invisible"> so $f(x)$ has</span><span class="invisible"> a $\rt{max}$ at</span><span class="invisible"> the $\ot{critical point}$</span><span class="invisible"> and</span><span class="invisible"> no $\gt{min}$</span></pli></ol></p>`,
                        String.raw`Find\p the maxmimum revenue by\p plugging\p the critical point\p into\p $f(x)$`
                    ]
                },
                specific:baseballex(3,100,0.1,2)
            },
            examples: [

            ],
        },
        {
            name: String.raw`Surface surface area for a box`,
            backgroundColor: "green",
            web: "Hw 3: 1, 5-7, 9; Hw 4: 1-7, 11; Hw 5: 2, 5-7; PT 2: 1-6, 8; Hw 6: 4, 7, 9-10; PT 3: 8; Hw 9: 8, 10; PF: 4, 6, 10-12, 14-15",
            book: "148",
            exam: "Up to one question on test 2 and up to one question on the final",
            intro: String.raw`A rectangular box with no top is to contain $\ykt{a number}$ cubic inches of volume. Find the dimensions of the box that will minimize the surface surface area. The height (l) of the base is $\got{a number}$ the width (w).
        <br><br>
        We solve this problem in two stages:<ol><li>Rewrite the word problem as maximizing a function $f(x)$</li><li>Use the steps from the previous lecture to maximize $f(x)$</li></ol>
        <br>
        <br>
        In the first stage,
        <ol><li>Write the surface area in terms of $\ot{width}$, $\yut{height}$, and $\lbt{length}$</li><li>Use $\btip{\ykt{the volume}}{\t{given in the problem}}$ and $\btip{\got{the ratio of the length to width}}{\t{given in the problem}}$ to write $\yut{height}$ and $\lbt{length}$ in terms of $\ot{width}$.<li>Use the previous two steps to rewrite surface area in terms of only $\ot{width}$, i.e., $\t{surface area}=f(\ot{width})$</li></ol> 
        <br>
        In the second stage, we maximize $f(\ot{width})$ by
        <ol>
            <li>
                Finding the critical point
            </li>
            <li>
                Using $f''$ to verify that the critical point is a max
            </li>
            <li>
                Use the critical point to find the $\yut{height}$ and $\lbt{length}$
            </li>
        </ol>
        `,
            rightColWidth: 50,
            steps: {
                general: {
                    question: String.raw`A rectangular box with no top  is to contain $\ykt{a number}$ cubic inches of volume. Find the dimensions of the box that will minimize the surface surface area. The height (l) of the base is $\got{a number}$ times the width (w).`,
                    steps: [
                        String.raw`Determine the variables that the surface area depends on`,
                        String.raw`Write an equation for the surface area in terms of $\ot{width}$ and $\yut{height}$`,
                        String.raw`Use the volume and $\btip{\got{the ratio of the length to width}}{\t{given in the problem}}$ to relate $\ot{width}$, $\yut{height}$, and $\lbt{length}$`,
                        String.raw`Solve the volume equation from step 3 to solve for $\yut{height}$ in terms of $\ot{width}$<br><br>It is equally to solve for $\ot{width}$ or $\lbt{length}$ but the math will be much harder`,
                        String.raw`Substitute the equations from step 3 and step 4 for $\lbt{length}$ and $\yut{height}$ in the surface area equation and simplify`,
                        String.raw`Find $f'(\o{w})$`,
                        String.raw`Solve $f'(\o{w})=0$ for $\o{w}$ to get the $\btip{\bt{critical point}}{\b{x\t{-value where }f'(x)=0}}$`,
                        String.raw`Find $f''(x)$`,
                        String.raw`$\btip{\t{Determine whether }f''(x)\t{ is always $\gt{positive}$ or always $\rt{negative}$ on }(0,\infty)}{\t{one or the other will happen on this type of problem}}$<br>You should be able to tell whether $f''(x)$ is $\gt{positive}$ or $\rt{negative}$ without doing any math<br>Remember that in the interval $(0,\infty)$ $x$ will be positive.`,
                        String.raw`Use $f''(x)$ to verify that the $\bt{critical point}$ gives the $\gt{minimum}$ area<ol><li>If $f''(x)$ is always $\gt{positive}$, then the $\bt{critical point}$ gives the $\gt{minimum}$ area</li><li>If $f''(x)$ is always $\rt{negative}$, then the $\bt{critical point}$ gives the $\rt{maximum}$ surface area<br><b>Note: make sure to mention that $f''(x)$ is always $\g{\textbf{positive}}$ or always $\r{\textbf{negative}}$ (whichever one applies). This will be worth points on the exam</b>`,
                        String.raw`Find the $\yut{height}$ and $\lbt{length}$ of the fence by plugging in the $\bt{critical point}$ for the $\ot{width}$ into the equation from equations step 4 and step 5`,
                    ]
                },
                specific: {
                    question: String.raw`A rectangular box with no top  is to contain $\ykt{2250}$ cubic inches of volume. Find the dimensions of the box that will minimize the surface surface area. The height (l) of the base is $\got{three}$ times the width (w).`,
                    steps: [
                        String.raw`$\bb{\t{The relevant variables are }\o{w}\ (\ot{width})\t{ and }\yu{h}\ (\yut{height})\t{, and }\lb{l}\ (\lbt{length}) }$<br>Note: You can call $\ot{width}$, $\yut{height}$, and $\lbt{length}$ any letter you want, you don't have to use $\o{w}$, $\yu{h}$, and $\lb{l}$`,
                        String.raw`$$\gb{A=2\o{w}\cdot\yu{h}+\o{w}\cdot\lb{l}+2\lb{l}\cdot\yu{h}}$$`,
                        String.raw`$\bb{\ga{\t{Since the }\lbt{length}\t{ is }\got{three }\t{times the }\ot{width},}}$<br>$$\lb{l}=\go{3}\o{w}$$$\bb{\t{Since the volume of the box is }\yk{2250},}$$$\a{\yk{2250}&=\lb{l}\o{w}\yu{h}}$$`,
                        String.raw`$$\a{\yk{2250}&=\lb{l}\o{w}\yu{h}\\[4pt]\yk{2250}&=(3\o{w})(\o{w})\yu{h}\\[4pt]\yk{2250}&=3\o{w}^2\yu{h}\\[7pt]\yu{h}&=\frac{750}{\o{w}^2}}$$`,
                        String.raw`$$\a{A&=2\o{w}\cdot\yu{h}+\o{w}\cdot\lb{l}+2\lb{l}\cdot\yu{h}\\[7pt]&=2\o{w}\cdot\frac{750}{\o{w}^2}+\o{w}\cdot(3\o{w})+2\cdot(3\o{w})\cdot \frac{750}{\o{w}^2}\\[10pt]&=3\o{w}^2+\frac{6000}{\o{w}}\\[10pt]f(\o{w})&=3\o{w}^2+\frac{6000}{\o{w}}}$$`,
                        String.raw`$$\a{\bb{f(\o{w})}&=\bb{3\o{w}^2+6000\cdot\o{w}^{-1}}}$$$$\gb{\a{f'(\o{w})&=6\o{w}-6000\o{w}^{-2}}}$$`,
                        String.raw`$$\a{\gb{6\o{w}-6000\o{w}^{-2}}&=\gb{0}\\[7pt]\bb{6\o{w}-\frac{6000}{\o{w}^{2}}}&=\bb{0}\\[10pt]\bb{6\o{w}(\o{w}^2)-\frac{6000}{\o{w}^2}(\o{w}^2)}&=\bb{0}\\[7pt]\bb{6\o{w}^3-6000}&=\bb{0}\\[4pt]\bb{6\o{w}^3}&=\bb{6000}\\[4pt]\bb{\o{w}^3}&=\bb{1000}\\[4pt]\gb{\o{w}}&=\gb{\b{10}}}$$`,
                        String.raw`$\ga{\ob{f'(\o{w})=6\o{w}-6000\o{w}^{-2}}\\[4pt]\gb{f''(x)=6+12000\o{w}^{-3}}}$`,
                        String.raw`$\bb{f''(x)=6+12000\o{w}^{-3}\g{>0}\t{ on }(0,\infty)}$`,
                        String.raw`$\gb{\t{Because }f''(x)\t{ is always $\gt{positive}$, a $\ot{width}$ of $\bt{10}$ gives the $\gt{minimum}$ area}}$`,
                        String.raw`$$\a{\yu{h}&=\frac{750}{\o{w}^2}\\[10pt]&=\frac{750}{\b{10}^2}\\[10pt]&=7.5\\[7pt]\yu{l}&=3\o{w}\\[4pt]&=3(\b{10})\\[4pt]&=30}$$`,
                    ],
                },
            },
            examples: []
        }
    ],
}