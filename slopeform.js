rounddigits=function(t,n){
    let s=Math.ceil(Math.log10(Math.abs(t)));
    let a=Math.pow(10,n-s);
    return Math.round(t*a)/a;
}
func=function(f,x,form){
    return '\\p{'+f+'\\p{(}\\p{\\b{'+x+'}}\\p{)}}\\p{=}\\p{\\b{\\go{'+form.replaceAll(x,'\\b{'+x+'}')+'}}}'
}
sub=function(str,x,xval){
    return str.replaceAll(x,'{('+xval+')}');
}
feval=function(f,x,form,a){
    return '\\p{'+f+'}\\p{(}\\p{\\r{'+a+'}}\\p{)}\\p{=}\\p{\\go{'+form.replaceAll(x,'\\bk{(}\\r{'+a+'}\\bk{)}')+'}}'
}
btext=function(str){
    return '\\t{\\{'+str+'\\}}'
}
faex=function(f,x,form,a){
    return{
        question:'$'+func(f,x,form)+'$. Find $f(\\r{'+a+'})$',
        steps:['$$'+feval(f,x,form,a)+'$$']
    }
}
slope=function(x1,y1,x2,y2){
    return '\\p{\\frac{\\p{\\pu{'+y2+'}}\\p{-}\\p{\\g{'+mp(y1)+'}}}{\\p{\\lb{'+x2+'}}\\p{-}\\p{\\r{'+mp(x1)+'}}}}'
}
pic=function(str){
    return '<img src="/pictures/'+str+'" alt="HTML5 Icon" style="width:500px;height:500px;">'
}
picw=function(str,w){
    return '<img src="/pictures/'+str+'" alt="HTML5 Icon" style="width:'+w+'px;">'
}
pich=function(str,h){
    return '<img src="/pictures/'+str+'" alt="HTML5 Icon" style="height:'+w+'px;">'
}
picwh=function(str,w,h){
    return '<img src="/pictures/'+str+'" alt="HTML5 Icon" style="height:'+w+'px;width:'+h+'px">'
}
slopeex=function(x1,y1,x2,y2){
    let m=rounddigits((y2-y1)/(x2-x1),4);
    return{
        question:'Calculate the slope of the line through the points $(\\r{'+x1+'},\\g{'+y1+'})$ and $(\\lb{'+x2+'},\\pu{'+y2+'})$',
        steps:['$$\\begin{aligned}\\p{\\t{slope}}&\\p{=}'+slope(x1,y1,x2,y2)+'\\\\[10pt]&\\p{=}\\p{'+m+'}\\end{aligned}$$']
    }
}
mp=function(t){
    return t<0?'('+t+')':t;
}
psf=function(x1,y1,m){
    return '\\p{y}\\p{-}\\p{\\g{'+mp(y1)+'}}\\p{=}\\p{\\b{'+m+'}}\\p{(}\\p{x}\\p{-}\\p{\\r{'+mp(x1)+'}}\\p{)}'
}
psfex=function(x1,y1,m){
    return{
        question:'Find the equation of the line through the point $(\\r{'+x1+'},\\g{'+y1+'})$ with slope $\\b{'+m+'}$',
        steps:['<div class="row"><div class="col">$$\\begin{aligned}\\p{\\r{x_1}}&\\p{=}\\p{\\r{'+x1+'}}\\\\[4pt]\\p{\\g{y_1}}&\\p{=}\\p{\\g{'+y1+'}}\\\\[4pt]\\p{\\b{m}}&\\p{=}\\p{\\b{'+m+'}}\\end{aligned}$$</div><div class="col">$$\\begin{aligned}'+psf('x_1','y_1','m').replaceAll('\\p{=}','&\\p{=}')+'\\\\[4pt]'+psf(x1,y1,m).replaceAll('\\p{=}','&\\p{=}')+'\\end{aligned}$$</div></div>']
    }
}
mxb=function(m,b){
    let str=('\\p{\\b{'+m+'}}\\p{x}\\p{+}\\p{\\r{'+b+'}}')
    return str.replaceAll('\\p{+}\\p{\\r{-','\\p{\\r{-')
}
axbyc=function(a,b,c){
    let str=(a+'x+'+b+'y+'+c).replaceAll('0x+','').replaceAll('+0y','');
    str=str.replaceAll('+0','').replaceAll('1x','x');
    str=str.replaceAll('1y','y').replaceAll('+-','-')
    return str==''?'0':str;
}
axbycp=function(a,b,c){
    let str=('\\p{'+a+'}\\p{x}\\p{+}\\p{'+b+'}\\p{y}\\p{+}\\p{'+c+'}');
    str=str.replaceAll('\\p{0}\\p{x}\\p{+}','');
    str=str.replaceAll('\\p{0}\\p{y}\\p{+}','');
    str=str.replaceAll('\\p{+}\\p{0}','').replaceAll('\\p{1}\\p{x}','\\p{x}');
    str=str.replaceAll('\\p{1}\\p{y}','\\p{y}');
    str=str.replaceAll('\\p{+}\\p{-','\\p{-');
    return str==''?'\\p{0}':str;
}
mxbex=function(a,b,c){
    let str='$$\\begin{aligned}'+axbycp(a,b,c)+'&\\p{=}\\p{0}'
    if(a!=0||c!=0){
        str=str+'\\\\[4pt]'+axbycp(0,b,0)+'&\\p{=}'+axbycp(-a,0,-c);
    }
    if(b!=0){
        str1=(-a/b)<0?'\\p{-}':'';
        str2=(-c/b)<0?'\\p{-}':'';
        str3=str1+'\\p{\\frac{\\p{'+Math.abs(a)+'}}{\\p{'+Math.abs(b)+'}}}';
        str4=str2+'\\p{\\frac{\\p{'+Math.abs(c)+'}}{\\p{'+Math.abs(b)+'}}}';
        str=str+'\\\\[4pt]\\p{y}&\\p{=}'+mxb(str3,str4).replaceAll('\\p{+}\\p{\\r{\\p{-','\\p{\\r{\\p{-').replaceAll('\\p{\\r{','\\pn{\\r{')+'\\end{aligned}$$';
    }
    return{
        question:'Find the slope and the $y$-interecpt of the line $'+axbyc(a,b,c)+'=0$',
        steps:[str,'The $\\bt{slope}$ is\\p $\\p{\\b{m}}\\p{=}\\b{'+str3+'}$\\p and\\p the $\\rt{$y$-intercept}$ is $\\r{\\p{b}}\\p{=}\\r{'+str4+'}$']
    }
}
twoptex=function(x1,y1,x2,y2){
    let m=rounddigits((y2-y1)/(x2-x1),4);
    return{
        question:'Find the equation of the line through the points $(\\r{'+x1+'},\\g{'+y1+'})$ and $(\\lb{'+x2+'},\\pu{'+y2+'})$',
        steps:[
            '$$\\begin{aligned}\\p{\\b{m}}&\\p{=}'+slope(x1,y1,x2,y2)+'\\\\[10pt]&\\p{=}\\b{\\p{'+m+'}}\\end{aligned}$$',
            '$$'+psf(x1,y1,m)+'$$'
        ]
    }
}
pt=function(a,b){
    return '\\p{(}\\p{'+a+'}\\p{,}\\p{'+b+'}\\p{)}';
}
celex=function(a){
    let str='$$'+psf(32,0,'\\frac{\\p{5}}{\\p{9}}')+'$$';
    let str1=str.replaceAll('\\p{-}\\p{\\g{0}}','');
    let str2=str1.replaceAll('y','\\t{C}(\\t{F})').replaceAll('x','\\t{F}')
    let str3=str2.replaceAll('\\t{F}','\\go{'+a+'}').replaceAll('$$','')
    str3='$$\\begin{aligned}'+str3.replaceAll('\\p{=}','&\\p{=}')+'\\\\[7pt]&\\p{=}';
    str3=str3+'\\p{'+rounddigits((5/9)*(a-32),3)+'}\\end{aligned}$$'
    return {
        question:String.raw`<p>Consider the following table.</p><p><table class="webassigntab"><tr><th></th><th><b>°C</b></th><th><b>°F</b></th></tr><tr><td><b>water freezes</b><td>0</td><td>32</td></tr><tr><td><b>water boils</b><td>100</td><td>212</td></tr></table></p><p>(a) A linear relationship exists between Celsius(C) and Farenheit(F) temperatures. Using points of the form (F,C), find the linear equation solved for C (in terms of F).</p><p>(b) Now, using the linear equation that you just determined, find the Celsius equivalent of $\go{`+a+`}$°F.</p>`,
        steps:[
            String.raw`The two points are $`+pt('\\r{32}','\\g{0}')+`$\\p and $`+pt('\\lb{212}','\\pu{100}')+'$',
            '$$\\begin{aligned}\\p{\\b{m}}&\\p{=}'+slope(32,0,212,100)+'\\\\[10pt]&\\p{=}\\b{\\p{\\frac{\\p{5}}{\\p{9}}}}\\end{aligned}$$',
            str,str1,str2,str3
        ]
    }
}
window.j = {
    startCollapsed: false,
    lessonNum: 13,
    lessonName: "Lines and Slope",
    intro:String.raw`<p>In this section,\p we will discuss\p lines\p and\p slope</p>`,
    sections: [
        {
            name: String.raw`Slope Formula`,
            intro: String.raw`<p>In this section, we will describe\p some applications of slope\p and\p how to calculate\p the slope between two points.</p><p>The slope of a line through the points \p$(\r{x_1},\g{y_1})$\p and \p$(\lb{x_2},\pu{y_2})$\p is\p the ratio of\p the $\bt{vertical change}$\p divided by\p the $\got{horizontal change}.$</p><p><div class="row"><div class="col"><p>$$\begin{aligned}\t{Slope}&\p{=}\p{\frac{\p{\bt{vertical change}}}{\p{\got{horizontal change}}}}`+`\\\\[10pt]&\\p{=}\\p{\\frac{\\p{\\b{\\Delta y}}}{\\p{\\go{\\Delta x}}}}\\\\[10pt]&\\p{=}`+slope('x_1','y_1','x_2','y_2')+`\\end{aligned}$$</div></p><div class="col"><p>`+pic('slopediagram.png')+`</p></div></div></p><p>Here are some applications of slope:</p><ol><pli>Whether slope is <span class="invisible">positive,</span></spam> <span class="invisible">negative,</span> <span class="invisible">or</span><span class="invisible"> zero</span><span class="invisible"> determines whether </span><span class="invisible">$y$ </span><span class="invisible">increases,</span> <span class="invisible">decreases,</span><span class="invisible"> or</span><span class="invisible"> stays the same</span><span class="invisible"> as $x$ increases.</span><span class="invisible"> For example, </span><span class="invisible">whether a stock price will</span><span class="invisible"> increase </span><span class="invisible">or</span> <span class="invisible">decrease</span><span class="invisible"> over time </span><span class="invisible">or</span><span class="invisible"> whether profit will <span class="invisible">increase,</span><span class="invisible"> decrease,</span> <span class="invisible"> or</span><span class="invisible"> stay the same</span> <span class="invisible">if more goods are produced</span></pli><pli>The size<span class="invisible"> (absolute value)</span><span class="invisible"> of </span><span class="invisible">slope</span><span class="invisible"> determines how </span><span class="invisible">quickly $y$ changes</span><span class="invisible"> as </span><span class="invisible">$x$ changes.</span><span class="invisible"> This allows one to determine </span><span class="invisible">which parameters can be altered for</span><span class="invisible"> the greatest change </span><span class="invisible">in profit </span><span class="invisible">or </span><span class="invisible">whether a stock is risky or not</span></pli><pli>Slope can be used to <span class="invisible">approximate </span><span class="invisible">the values of</span><span class="invisible"> $y$ </span><span class="invisible">when</span><span class="invisible"> $x$ is </span><span class="invisible">slightly</span><span class="invisible"> increased </span><span class="invisible">or </span><span class="invisible">decreased.</span><span class="invisible"> For example, </span><span class="invisible">estimating <span class="invisible">a stock price</span><span class="invisible"> in </span><span class="invisible">the near future.</span></pli><pli>Slope can be used to<span class="invisible"> approximate</span><span class="invisible"> the error </span><span class="invisible">in </span><span class="invisible">the predicted value</span><span class="invisible"> of </span>$\\p{y}$<span class="invisible"> due to </span><span class="invisible">uncertainty in</span><span class="invisible"> the value of $x$.</span><span class="invisible"> For example, </span><span class="invisible">the uncertainty in</span><span class="invisible"> the amount of pizza sauce</span><span class="invisible"> you will need to purchase</span><span class="invisible"> due to </span><span class="invisible">uncertainty in </span><span class="invisible">the number of orders your business will receive</span></pli></ol><p>For now,\\p we will just focus on\\p calculating slope\\p but in the future\\p we might discuss how to\\p apply slope to these situations.</p>`,
            rightColWidth: 90,
            steps: {
                general:{
                    question:String.raw`Calculate the slope of the line through the points $(\r{x_1},\g{y_1})$ and $(\lb{x_2},\pu{y_2})$`,
                    steps:[
                        String.raw`Calculate slope with\p the formula $$\p{\t{slope}}\p{=}`+slope('x_1','y_1','x_2','y_2')+`$$`
                    ]
                },
                specific:slopeex(1,3,4,9)
            },
            examples: [
                //slopeex(-1,3,2,5)
            ],
        },
        {
            name: String.raw`Point-Slope Form`,
            intro: String.raw`<div class="row"><div class="col"><p>The slope equation\p can be used\p to \pfind the equation of\p the line \pthrough a point\p with\p a given slope.</p><p>The slope formula can be written as $$\p{\b{m}}\p{=}\p{\frac{\p{y}\p{-}\p{\g{y_1}}}{\p{x}\p{-}\p{\r{x_1}}}}$$</p><p>Multiplying both sides by $\p{x}\p{-}\p{\r{x_1}}$\p,\p we get\p the\p point slope form equation$$`+psf('x_1','y_1','m')+`$$</p>`+String.raw`<p>Point-slope form says\p the equation of the line \pthrough the point\p $(\r{x_1},\g{y_1})$\p with a slope of \p$\b{m}$\p is$$`+psf('x_1','y_1','m')+`$$</p></div><div class="col"><p>`+pic('psf.png')+`</p></div></div>`,
            rightColWidth: 90,
            steps: {
                general:{
                    question:String.raw`Find the equation of the line through the point $(\r{x_1},\g{y_1})$ with slope $\b{m}$`,
                    steps:[
                        String.raw`Plug into\p the point-slope formula $$`+psf('x_1','y_1','m')+`$$`
                    ]
                },
                specific:psfex(-1,3,-2)
            },
            examples: [
                psfex(4,0,7),
                //psfex(-1,2,-2)
            ],
        },
        {
            name: String.raw`Find the slope and $y$-intercept of a line`,
            intro: String.raw`<p>In this section,\p we will discuss how to\p find the slope\p and \p the $y$-intercept of\p a line of the form $\p{a}\p{x}\p{+}\p{b}\p{y}\p{+}\p{c}\p{=}\p{0}$</p>`,
            rightColWidth: 90,
            steps: {
                general:{
                    question:String.raw`Find the slope and the $y$-intercept of the line $ax+by+c=0$`,
                    steps:[
                        String.raw`Solve for\p $y$\p to get\p something of the form $\p{y}\p{=}`+mxb('m','b')+'$',
                        String.raw`The $\bt{slope}$ is\p $\b{m}$\p and\p the $\rt{$y$-intercept}$ is\p $\r{b}$`
                    ]
                },
                specific:mxbex(2,5,9)
            },
            examples: [
                //mxbex(2,-4,1)
            ],
        },
        {
            name: String.raw`Equation of the line through two points`,
            intro: String.raw`<p>In this section,\p we will discuss how to\p find the equation of\p the line\p through two points</p>`,
            rightColWidth: 90,
            steps: {
                general:{
                    question:String.raw`<p>Find the equation of the line through the points $(\r{x_1},\g{y_1})$ and $(\lb{x_2},\pu{y_2})$</p>`,
                    steps:[
                        String.raw`Calculate slope with\p the formula $$\p{\b{m}}\p{=}`+slope('x_1','y_1','x_2','y_2')+`$$`,
                        String.raw`To get the equation of the line, \pplug into\p the point-slope formula $$`+psf('x_1','y_1','m')+`$$`
                    ]
                },
                specific:twoptex(1,3,4,9)
            },
            examples: [

            ],
        },
        {
            name: String.raw`Celsius WebAssign Problem`,
            intro: String.raw`<p>In this section,\p we will discuss how to\p solve\p the Celsius problem</p>`,
            rightColWidth: 90,
            steps: {
                general:{
                    question:String.raw`<p>Consider the following table.</p><p><table class="webassigntab"><tr><th></th><th><b>°C</b></th><th><b>°F</b></th></tr><tr><td><b>water freezes</b><td>0</td><td>32</td></tr><tr><td><b>water boils</b><td>100</td><td>212</td></tr></table></p><p>(a) A linear relationship exists\p between\p Celsius(C)\p and \pFarenheit(F)\p temperatures.\p Using points of\p the form (F,C),\p find the linear equation\p solved for\p C\p (in terms of\p F).</p><p>(b) Now,\p using \pthe linear equation \pthat you just determined,\p find the\p Celsius equivalent \pof\p $\got{\{a number\}}$°F.</p>`,
                    steps:[
                        String.raw`<p>Identify the\p two points.</p><p>Note that \psince we are calculating \pCelsius \pfrom\p Fahrenheight,\p °C \pis\p $y$ \pand\p °F \pis\p $x$.\p This is the opposite of the usual order</p>`,
                        String.raw`Calculate slope \pwith\p the formula $$\p{\b{m}}\p{=}`+slope('x_1','y_1','x_2','y_2')+`$$`,
                        String.raw`To get the equation of the line, \pplug into\p the point-slope formula $$`+psf('x_1','y_1','m')+`$$`,
                        String.raw`Simplify \p$y-0$\p as \p$y$`,
                        String.raw`Replace $\p{y}$\p with $\p{\t{C}(\t{F})}$\p and $\p{x}$\p with $\p{\t{F}}$`,
                        String.raw`Substitute the\p $\got{given Fahrenheight temperatuer}$\p for \p$\p{\t{F}}$\p to calculate \pthe Celsius temperature`
                    ]
                },
                specific:celex(116)
            },
            examples: [

            ],
        },
    ],
}