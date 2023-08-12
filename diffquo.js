sub=function(str,x,xval){
    return str.replaceAll(x,'{('+xval+')}');
}
rp=function(str){
    return str.replaceAll('\\p{','\\pn{')
}
diffquo=function(intro){
    // let str='\\lb{\\p{x}\\p{+}\\p{h}}\\p{-}\\p{\\r{h}}'
    // if(intro==null||!intro){
    //     str='\\p{h}'
    // }
    return '\\p{\\frac{\\p{f}\\p{(}\\p{\\lb{\\p{x}\\p{+}\\p{h}}}\\p{)}\\p{-}\\p{f}\\p{(}\\p{\\r{x}}\\p{)}}{\\p{h}}}';
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

quadNum=function(a,b,c){
    let str=('\\p{'+a+'}\\p{x}^\\p{2}\\p{+}\\p{'+b+'}\\p{x}\\p{+}\\p{'+c+'}').replaceAll('\\p{0}\\p{x}^\\p{2}\\p{+}\\p{0}\\p{x}\\p{+}','')
    str=str.replaceAll('\\p{0}\\p{x}^\\p{2}\\p{+}','')
    str=str.replaceAll('\\p{0}\\p{x}\\p{+}','').replaceAll('\\p{1}\\p{x}','\\p{x}');
    str=str.replaceAll('\\p{+}\\p{-','\\p{-').replaceAll('\\p{+}\\p{0}','');
    return str==''?'\\p{0}':str;
}
sub=function(str,x,xval){
    return str.replaceAll(x,'{('+xval+')}');
}
dqf=function(str){
    return '\\p{\\frac{'+str+'}{\\p{h}}}'
}
coef=function(a){
    if(a==1){
        return ''
    }
    return a==-1?'\\p{-}':'\\p{'+a+'}';
}
coefp=function(a){
    return a<0?'\\p{-'+rp(coef(-a))+'}':'\\p{+}'+coef(a);
}
coefp1=function(a){//No special case for 1
    return a<0?'\\p{-'+(-a)+'}':'\\p{+}\\p{'+a+'}'
}
coefp2=function(a){//No special case for 1, remove +0
    return coefp1(a).replaceAll('\\p{+}\\p{0}','')
}
rot=function(str){
    return str.replaceAll('\\p{+}\\p{0}\\p{x}','').replaceAll('\\p{+}\\p{0}\\p{h}','');
}
bk=function(str){
    return str.replaceAll('\\r{','\\pn{')
}
diffquoQuadEx=function(a,b,c){
    let fx=quadNum(a,b,c)
    let fxph0=sub(fx,'x','\\r{\\p{x}\\p{+}\\p{h}}')
    let fxph='\\p{f}\\p{(}\\r{\\p{x}\\p{+}\\p{h}}\\p{)}\\p{=}'+fxph0;
    let start='$$\\begin{aligned}\\p{\\t{Diff Quo}}&\\p{=}'
    let end='\\end{aligned}$$'
    let str0=fxph0+'\\p{-'+ap(fx)+'}';
    let str1=bk(str0.replaceAll('\\p{{(\\r{\\p{x}\\p{+}\\p{h}})}}^\\p{2}','\\p{(x+h)}\\p{(x+h)}'))
    let str2=str1.replaceAll('\\p{(x+h)}\\p{(x+h)}',ap('\\p{x}^\\p{2}\\p{+}\\p{x}\\p{h}\\p{+}\\p{x}\\p{h}\\p{+}\\p{h}^{\\p{2}}',a));
    let str3=str2.replaceAll('\\p{+}\\p{x}\\p{h}\\p{+}\\p{x}\\p{h}','\\p{+}\\p{2}\\p{x}\\p{h}');
    let str4=rot(coef(a)+'\\p{x}^\\p{2}'+coefp(2*a)+'\\p{x}\\p{h}'+coefp(a)+'\\p{h}^\\p{2}'+coefp(b)+'\\p{x}'+coefp(b)+'\\p{h}'+coefp2(c)+coefp(-a)+'\\p{x}^{\\p{2}}'+coefp(-b)+'\\p{x}'+coefp2(-c));
    let str5=rot(coef(2*a)+'\\p{x}\\p{h}'+coefp(a)+'\\p{h}^\\p{2}'+coefp(b)+'\\p{h}')
    let str6=rot(coef(2*a)+'\\p{x}'+coefp(a)+'\\p{h}'+coefp2(b));
    return {
        question:'Calculate the difference quotient of $f(x)='+rp(fx)+'$',
        steps:[
            '$$'+fxph+'$$',
            start+dqf(str0)+end,
            start+dqf(str1)+'\\\\[10pt]&\\p{=}'+dqf(str2)+'\\\\[10pt]&\\p{=}'+dqf(str3)
            +(a!=1||b!=0?'\\\\[10pt]&\\p{=}'+dqf(str4):'')+end,
            start+dqf(str5)+end,
            start+str6+end
        ]
    }
}
pic=function(str){
    return '<img src="/pictures/'+str+'" alt="HTML5 Icon" style="width:500px;height:500px;">'
}
window.j = {
    startCollapsed: false,
    lessonNum: 13,
    lessonName: "Derivatives and Difference Quotients",
    intro:String.raw`<p>In this section,\p we will discuss\p derivatives</p><p><b>Difference between average rate of change and derivatives</b></p><p><span class="hi"><span class="invisible">Derivatives,</span><span class="invisible"> also called</span><span class="invisible"> instantaneous rates of change,</span></span>\p are an alternative to\p average rates of change</p><p>Average rate of change\p is\p the slope between <b><em>two</em></b> points.</p><p>Average rate of change measures\p how quickly\p $f(x)$ changes\p <b><em>on average</em></b>\p as\p $x$ changes\p between <b><em>two</em></b> $x$-values</p><p><span class="hi"><span class="invisible">The derivative,</span><span class="invisible"> also called</span><span class="invisible"> instantaneous rates of change,</span></span>\p is\p the slope at a <b><em>single</em></b> point.</p><p>The derivative measures\p how quickly\p $f(x)$ changes\p when \p$x$ changes \pby\p a small amount\p from\p a<b><em> single</em></b> point</p><p>`+pic('avgvsderiv.png')+String.raw`</p><p><b>An example</b></p><p>For example,\p suppose that\p $f(x)$ is the profit\p of a company\p with\p $x$ employees.</p><p>Suppose that\p the graph looks\p something like this:</p><p>`+pic('employeeprofit.png')+String.raw`</p><p><ol><pli>If the average rate of change\p of\p $f(x)$\p as $x$ changes from\p $x=100$\p to \p$x=500$\p is\p $0.1$,\p then increasing\p the number of employees\p from\p $100$\p to\p $500$\p will\p increase profit\p by \p$\$0.10$<span class="invisible"> <b><em>on average</em></b></span><span class="invisible"> for each additional employee</span></pli><pli>If the derivative \pof $f(x)$\p at $x=200$\p is \p$20$,\p then \pincreasing\p the number of employees\p by\p a small amount\p (like\p $10$ employees)\p will\p increase profit\p by\p approximately\p 20 times that amount.</pli><pli>If the derivative \pof $f(x)$\p at $x=450$\p is\p $-60$,\p then\p increasing\p the number of employees\p by\p a small amount \p(like \p$10$ employees)\p will\p decrease profit\p by\p approximately\p 60 times that amount.</pli></ol></p><p><b>Analysis of example</b></p><p>The average rate of change\p tells us that\p having 500 employees\p is\p better than\p having\p 100 employees,\p but the improvement\p is\p small\p compared\p to\p the number of employees\p the business would\p need to hire.</p><p>The instantaneous rate of change\p at $x=200$\p tells us that\p if we currently\p have 200 employees,\p we can\p make a relatively large \pincrease in profit\p by\p hiring 10 additional employees.</p><p>This means that,\p even though\p the average rate of change\p between\p $x=100$\p and $x=500$\p might make it seem like\p hiring more employees\p might not be\p worth it,\p the instantaneous rate of change\p at $x=200$\p shows that\p it is worth it\p to\p hire more employees.</p><p>The instantaneous rate of change\p at $x=450$\p tells us that,\p if we have $450$ employees,\p it is actually\p a bad idea\p to\p increase the number of employees,\p even though\p profit\p increases on average\p as\p the number of employees\p increases from\p $100$\p to\p $500$.</p><p><b>Other applications</b></p><p>As seen in the below graph,\p derivatives\p can be used\p to\p find\p the optimal number of\p employees to hire\p to maximize profit.</p><p>`+pic('signchartmax.png')+String.raw`</p><p>Another application that\p derivatives do much better\p than average rate of change\p is\p making future predictions,\p but we will not do this\p in this lecture.</p><p><b>Difference Quotients</b></p><p>For the rest of this section,\p we will discuss\p difference quotients.</p><p>Difference quotients\p are used to\p prove properties of derivatives\p and\p to \pderive mathematical models,\p but these are not important\p for business majors</p><p>However,\p WebAssign covers difference quotients,\p so I have to cover\p how to calculate them</p>`,
//<p><b>Why do we need the difference quotient?</b></p><p>We will use the difference quotient to resolve the main weakness of average rate of change and the slope formula:</p><p>Both formulas require two points and they only require measure what happens <b><em>on average</em></b> between the two points, but they cannot describe what happens at a single point</p><p>For example, suppose that we are interested in finding the optimal price to charge for pizzas to make the highest profit</p><p>Suppose that the graph of price vs. profit is below:</p><p>$\rt{INSERT GRAPH}$</p><p>If we calculate the slope between the points $(2,100)$ and $(6,140)$, we get $\$10$</p><p>This means that, on average, profit increases by $\$10$ for every $\$1$ increase in the price of pizza between $\$2$ and $\$6$.</p><p>Since the average rate of change was positive, profit increased on average.</p><p>Therefore, charging $\$6$ is better than charging $\$2$ for pizza</p><p>However, if we want to determine the optimal price to charge, we need more information than just what happens on average</p><p>We instead need to know at which prices will increasing the price increase profit and at which prices increasing the price decrease profit.</p>`
        //<p>Then, at the price where profit changes from increasing to decreasing, we will make the highest profit.</p>
    //+String.raw`<p><b>How can we use the difference quotient to solve the weakness of slope?</b></p><p>We will now explain how to use the difference quotient to allow us to calculate the slope at a single point instead of the slope between two points</p><p>The difference quotient is defined as the average rate of change of $f(x)$ as $x$ changes from $\r{x_1}=\r{x}$ to $\lb{x_2}=\lb{x+h}$</p>`
        //<p>Therefore, the difference quotient is given by the formula$$\p{\t{Diff Quo}}\p{=}`+arocf('', 'x','x\\p{+}\\p{h}')
        //`.$$ By simplifying the denominator, we get the difference quotient formula is$$\\p{\\t{Diff Quo}}\\p{=}`+diffquo()
        //+String.raw`<p>If $\lb{h}$ becomes very close to $0$, then $\r{x}$ and $\r{x}+h$ are almost the same point.</p>`,
    sections:[
        {
            name: String.raw`Calculating the Difference Quotient of a Quadratic`,
            intro: String.raw`<p>In this section,\p we discuss how to\p calculate\p the difference quotient of \p a quadratic</p><p>The difference quotient is given by $$\p{\t{Difference Quotient}}\p{=}\p{\frac{\p{f}\p{(}\p{x}\p{+}\p{h}\p{)}\p{-}\p{f}\p{(}\p{x}\p{)}}{\p{h}}}$$</p>`,
            rightColWidth: 90,
            steps: {
                general:{
                    question:String.raw`<p>Calculate the difference quotient of $f(x)=ax^2+bx+c$</p>`,
                    steps:[
                        String.raw`<p>Determine\p $f(\r{x+h})$\p by\p replacing every\p $x$\p in\p the formula of $f(x)$\p with\p $\r{x+h}$</p>`,
                        String.raw`<p>Plug in\p the formulas for\p $f(\r{x+h})$\p and\p $f(x)$\p into\p the difference quotient equation$$\p{\t{Diff Quo}}\p{=}\p{\frac{\p{f}\p{(}\p{x}\p{+}\p{h}\p{)}\p{-}\p{f}\p{(}\p{x}\p{)}}{\p{h}}}$$</p>`,
                        String.raw`<p>Distribute\p as much as possible</p>`,
                        String.raw`<p>Combine like terms.\p After you do this,\p <span class="hi"> every term<span class="invisible"> in the numerator</span><span class="invisible"> should have </span><span class="invisible">an $h$</span></span></p>`,
                        String.raw`<p>Cancel out\p a factor of\p $h$\p from\p <span class="hi">every term</span> in the numerator\p to\p cancel out the denominator.</p>`
                    ]
                },
                specific:diffquoQuadEx(2,3,1)
            },
            examples: [
                diffquoQuadEx(1,3,2),
                diffquoQuadEx(-1,0,4)
            ],
        },
        {
            name: String.raw`Calculating Difference Quotient of a very specific fraction`,
            intro: String.raw`<p>In this section,\p we discuss how to\p calculate the difference quotient of\p $f(x)\p{=}\p{\frac{\p{1}}{\p{x}}}$</p>`,
            rightColWidth: 90,
            steps: {
                general:{
                    question:String.raw`<p>Find the difference quotient of $f(x)=\frac{1}{x}$</p>`,
                    steps:[
                        String.raw`<p>Determine\p $f(\r{x+h})$\p by\p replacing every\p $x$\p in\p the formula of $f(x)$\p with\p $\r{x+h}$</p>`,
                        String.raw`<p>Plug in\p the formulas for\p $f(\r{x+h})$\p and\p $f(x)$\p into\p the difference quotient equation$$\p{\t{Diff Quo}}\p{=}\p{\frac{\p{f}\p{(}\p{x}\p{+}\p{h}\p{)}\p{-}\p{f}\p{(}\p{x}\p{)}}{\p{h}}}$$</p>`,
                        String.raw`<p>Make a common denominator to get$$\begin{aligned}\p{\frac{\p{1}}{\p{x}\p{+}\p{h}}}\p{-}\p{\frac{\p{1}}{\p{x}}}&\p{=}\p{\frac{\p{1}\p{x}}{\p{(x+h)}\p{x}}}\p{-}\p{\frac{\p{1}\p{(x+h)}}{\p{x}\p{(x+h)}}}\\[10pt]&\p{=}\p{\frac{\p{1}\p{x}\p{-}\p{1}\p{(x+h)}}{\p{(x+h)}\p{x}}}\end{aligned}$$</p>`,
                        String.raw`<p>Combine\p the two denominators\p into\p one denominator\p using the propety $$\p{\frac{\left(\p{\frac{\p{\r{a}}}{\p{\b{b}}}}\right)}{\p{\pu{c}}}}\p{=}\p{\frac{\p{\r{a}}}{\p{\b{b}}\p{\pu{c}}}}\qquad\frac{\p{\left(\p{\frac{\p{\r{\p{1}\p{x}\p{-}\p{1}\p{(}\p{x}\p{+}\p{h}\p{)}}}}{\b{\p{(x+h)}\p{x}}}}\right)}}{\p{\pu{\p{h}}}}\p{=}\p{\frac{\r{\p{1}\p{x}\p{-}\p{1}\p{(x+h)}}}{\b{\p{(x+h)}\p{x}}\pu{\p{h}}}}$$</p>`,
                        String.raw`<p>Distribute\p the numerator\p as much as possible</p><p><b>Note:\p Do not distribute\p the denominator</b></p>`,
                        String.raw`<p>Combine like terms.\p After you do this,\p <span class="hi"> every term<span class="invisible"> in the numerator</span><span class="invisible"> should have <span class="invisible">an $h$</span></span></p>`,
                        String.raw`<p>Cancel out\p a factor of\p $h$\p from\p <span class="hi">every term</span>\p in the numerator\p to\p cancel out\p the $h$\p in the denominator.</p>`
                    ]
                },
                specific:{
                    question: String.raw`<p>Find the difference quotient of $f(x)=\frac{1}{x}$</p>`,
                    steps:[
                        String.raw`<p>$f(\r{x+h})\p{=}\p{\frac{\p{1}}{\p{\r{x+h}}}}$</p>`,
                        String.raw`<p>$\p{\t{Diff Quo}}\p{=}\p{\frac{\p{\frac{\p{1}}{\p{x+h}}}\p{-}\p{\frac{\p{1}}{\p{x}}}}{\p{h}}}$</p>`,
                        String.raw`<p>$\p{\t{Diff Quo}}\p{=}\p{\frac{\p{\frac{\p{1}\p{x}\p{-}\p{1}\p{(x+h)}}{\p{(x+h)}\p{x}}}}{\p{h}}}$</p>`,
                        String.raw`<p>$\p{\t{Diff Quo}}\p{=}\p{\frac{\p{1}\p{x}\p{-}\p{1}\p{(x+h)}}{\p{(x+h)}\p{x}\p{h}}}$</p>`,
                        String.raw`<p>$\p{\t{Diff Quo}}\p{=}\p{\frac{\p{x}\p{-}\p{x}\p{-}\p{h}}{\p{(x+h)}\p{x}\p{h}}}$</p>`,
                        String.raw`<p>$\p{\t{Diff Quo}}\p{=}\p{\frac{\p{-}\p{h}}{\p{(x+h)}\p{x}\p{h}}}$</p>`,
                        String.raw`<p>$\p{\t{Diff Quo}}\p{=}\p{\frac{\p{-1}}{\p{(x+h)}\p{x}}}$</p>`,
                    ]
                }
            },
            examples: [

            ],
        }
        ]
}