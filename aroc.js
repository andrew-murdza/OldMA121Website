slope=function(x1,y1,x2,y2){
    return '\\p{\\frac{\\p{\\pu{'+y2+'}}\\p{-}\\p{\\g{'+mp(y1)+'}}}{\\p{\\lb{'+x2+'}}\\p{-}\\p{\\r{'+mp(x1)+'}}}}'
}
rounddigits=function(t,n){
    let s=Math.ceil(Math.log10(Math.abs(t)));
    let a=Math.pow(10,n-s);
    return Math.round(t*a)/a;
}
mp=function(t){
    return t<0?'('+t+')':t;
}
sub=function(str,x,xval){
    return str.replaceAll(x,'{('+xval+')}');
}
rp=function(str){
    return str.replaceAll('\\p{','\\pn{')
}
arocf=function(f,x1,x2,fn){
    if(fn==null){
        fn='f';
    }
    x1='\\r{'+x1+'}'
    x2='\\lb{'+x2+'}'
    let str='\\p{\\frac{\\p{'+fn+'}\\p{(}\\p{\\lb{'+x2+'}}\\p{)}\\p{-}\\p{'+fn+'}\\p{(}\\p{\\r{'+x1+'}}\\p{)}}{\\p{\\lb{'+x2+'}}\\p{-}\\p{\\r{'+mp(x1)+'}}}}';
    let fp=f.includes('-')||f.includes('+')?'\\p{(}'+f+'\\p{)}':f;
    if(f!=''){
        str=str+'\\\\[10pt]&\\p{=}\\p{\\frac{'+sub(f,'x',x2)+'\\p{-}'+sub(fp,'x',x1)+'}{\\p{\\lb{'+x2+'}}\\p{-}\\p{\\r{'+mp(x1)+'}}}}'
    }
    return str;
}
arocfex=function(f,x1,x2){
    return{
        question:String.raw`<p>$y=f(x)=`+rp(f)+`$</p><p>Find the average rate of change as $x$ changes from $\\r{`+x1+`}$ to $\\lb{`+x2+`}$</p>`,
        steps:['$$\\begin{aligned}\\p{\\r{x_1}}&\\p{=}\\p{\\r{'+x1+'}}\\\\[4pt]\\p{\\lb{x_2}}&\\p{=}\\p{\\lb{'+x2+'}}\\end{aligned}$$$$\\begin{aligned}\\p{\\t{Average Rate of Change}}&\\p{=}'+arocf(f,x1,x2)+'\\end{aligned}$$']
    }
}
avgvelex=function(f,x1,x2){
    x1='\\r{'+x1+'}'
    x2='\\lb{'+x2+'}'
    return{
        question:'<p>An object is thrown downward from the top of a tower. The distance in feet that it falls in $t$ seconds is given by the following.$$\\p{s(t)='+rp(f.replaceAll('x','t'))+'}$$</p><p>(a) How far will the object fall in $'+x1+'$ seconds?</p><p>(b) How far will the object fall in $'+x2+'$ seconds?</p><p>(c) Find the average velocity from $t = '+x1+'$ seconds to $t = '+x2+'$ seconds.</p>',
        steps:[
            'The amount the object falls\\p in\\p $'+x1+'$ seconds\\p is $$\\p{s}\\p{(}\\p{'+x1+'}\\p{)}\\p{=}'+sub(f,'x',x1)+'$$',
            'The amount the object falls\\p in\\p $'+x2+'$ seconds\\p is $$\\p{s}\\p{(}\\p{'+x2+'}\\p{)}\\p{=}'+sub(f,'x',x2)+'$$',
            '$$\\begin{aligned}\\p{\\t{Average Velocity}}&\\p{=}'+arocf(f,x1,x2,'s')+'\\end{aligned}$$'
        ]
    }
}
arocDataEx=function(x1,y1,x2,y2){
    let m=rounddigits((y2-y1)/(x2-x1),4);
    return{
        question:String.raw`<p>It is that in $\\r{`+x1+`}$, there were $\\g{`+y1+`}$ divorces. In $\\lb{`+x2+`}$, there were $\\pu{`+y2+`}$ divorces.</p><p>(a) Find the average rate of change of divorces with respect to time.</p><p>(b) What is the proper unit for this average rate of change?</p>`,
        steps:[
            String.raw`<p>Since we are finding\p the average rate of change\p of\p divorces\p with respect to\p time,</p><p>divorces\p is the\p $y$ variable\p and\p time\p is\p the $x$ variable.</p><p>This means that\p $\r{x_1}$ and $\lb{x_2}$\p will be\p years\p and\p $\g{y_1}$ and $\pu{y_2}$\p will be\p numbers of divorces</p>`,
            '$$\\begin{aligned}\\p{\\r{x_1}}&\\p{=}\\p{\\r{'+x1+'}}\\\\[4pt]\\p{\\g{y_1}}&\\p{=}\\p{\\g{'+y1+'}}\\\\[4pt]\\p{\\lb{x_1}}&\\p{=}\\p{\\lb{'+x2+'}}\\\\[4pt]\\p{\\pu{x_1}}&\\p{=}\\p{\\pu{'+y2+'}}\\end{aligned}$$$$\\begin{aligned}\\p{\\text{Average Rate of Change}}&\\p{=}'+slope(x1,y1,x2,y2)+'\\\\[7pt]&\\p{=}\\p{'+m+'}\\end{aligned}$$',
            //'<div class="row"><div class="col">$$\\begin{aligned}\\p{\\r{x_1}}&\\p{=}\\p{\\r{'+x1+'}}\\\\[4pt]\\p{\\g{y_1}}&\\p{=}\\p{\\g{'+y1+'}}\\\\[4pt]\\p{\\lb{x_1}}&\\p{=}\\p{\\lb{'+x2+'}}\\\\[4pt]\\p{\\pu{x_1}}&\\p{=}\\p{\\pu{'+y2+'}}\\end{aligned}$$</div><div class="col">$$\\begin{aligned}\\p{\\text{Average Rate of Change}}&\\p{=}'+slope(x1,y1,x2,y2)+'\\\\[7pt]&\\p{=}\\p{'+m+'}\\end{aligned}$$</div></div>',
            'The units of average of rate change are $$\\begin{aligned}\\p{\\frac{\\p{\\t{units of }}\\p{\\t{$y$ variable}}}{\\p{\\t{units of }}\\p{\\t{$x$ variable}}}}&\\p{=}\\p{\\frac{\\p{\\t{units of }}\\p{\\t{divorces}}}{\\p{\\t{units of }}\\p{\\t{time}}}}\\\\[10pt]&\\p{=}\\p{\\frac{\\p{\\t{divorces}}}{\\p{\\t{year}}}}\\\\[7pt]&\\p{=}\\p{\\t{divorces }}\\p{\\t{per }}\\p{\\t{year}}\\end{aligned}$$'
        ]
    }
}
window.j = {
    startCollapsed: false,
    lessonNum: 13,
    lessonName: "Average Rate of Change",
    intro:String.raw`<p>In this section,\p we will discuss\p average rate of change\p and\p average velocity</p>`,
    sections: [
        {
            name: String.raw`Calculating Average Rate of Change From a Word Problem`,
            intro: String.raw`<p>In this section,\p we discuss how to\p calculate\p the average rate of change\p in a word problem</p><p>Average rate of change is\p another word for slope,\p so it is calculated\p with\p the slope formula$$\p{\t{Average Rate of Change}}\p{=}`+slope('x_1','y_1','x_2','y_2')+String.raw`$$</p><p>Average Rate of Change is\p written as\p "Average Rate of Change\p of <span class="invisible">{$\p{y}$ variable}</span>\p With Respect to <span class="invisible">{$\p{x}$ variable},</span>"</p>`,
            rightColWidth: 90,
            steps: {
                general:{
                    question:String.raw`<p>It is that in $\rt{\{a year\}}$, there were $\gt{\{a number\}}$ divorces. In $\lbt{\{another year\}}$, there were $\put{\{another number\}}$ divorces.</p><p>(a) Find the average rate of change of divorces with respect to time.</p><p>(b) What is the proper unit for this average rate of change?</p>`,
                    steps:[
                        String.raw`<p xmlns="http://www.w3.org/1999/html">Using the fact that Average Rate of Change is written as\p "Average Rate of Change\p of <span class="invisible">{$\p{y}$ variable}</span>\p With Respect to <span class="invisible">{$\p{x}$ variable},"</span></p><p>Identify which variable is\p $x$\p and\p which variable is\p $y$</p>`,
                        String.raw`<p>Calculate \pthe Average Rate of Change\p With\p the Slope Formula$$\p{\t{Average Rate of Change}}\p{=}`+slope('x_1','y_1','x_2','y_2')+`$$</p>`,
                        String.raw`<p>The unit for average rate of change is $\p{\frac{\p{\t{units of }}\p{\t{$y$ variable}}}{\p{\t{units of }}\p{\t{$x$ variable}}}}$</p>`
                    ]
                },
                specific:arocDataEx(1982,1230000,1993,1265000)
            },
            examples: [

            ],
        },
        {
            name: String.raw`Calculating Average Rate of Change of a Function`,
            intro: String.raw`<p>In this section,\p we discuss how to\p calculate\p the average rate of change\p of a function as\p $x$ changes from \p \p $\r{x_1}$\p to\p $\lb{x_2}$</p><p>To calculate the average rate of change,\p we need to use the\p slope formula$$\p{\t{Average Rate of Change}}\p{=}`+slope('x_1','y_1','x_2','y_2')+String.raw`$$</p><p>We are given $\r{x_1}$ and $\lb{x_2}$,\p but we still need to find\p $\g{y_1}$\p and\p $\pu{y_2}$.</p><p>Since $y=f(x)$,\p $\g{y_1}\p{=}\p{f}\p{(}\p{\r{x_1}}\p{)}$\p and \p$\pu{y_2}\p{=}\p{f}\p{(}\p{\lb{x_2}}\p{)}$</p><p>Therefore,\p the average rate of change of $f(x)$\p is\p calculated with the formula$$\p{\t{Average Rate of Change}}\p{=}`+arocf('','x_1','x_2')+`$$</p>`,
            rightColWidth: 90,
            steps: {
                general:{
                    question:String.raw`<p>$y=f(x)=\t{\{an equation\}}$</p><p>Find the average rate of change as $x$ changes from $\r{x_1}$ to $\lb{x_2}$</p>`,
                    steps:[
                        String.raw`Calculate Average Rate of Change \pwith\p the formula$$\p{\t{Average Rate of Change}}\p{=}`+arocf('','x_1','x_2')+`$$`
                    ]
                },
                specific:arocfex('\\p{11}\\p{x}^\\p{2}\\p{+}\\p{5}\\p{x}',1,3)
            },
            examples: [

            ],
        },
        {
            name: String.raw`Calculating Average Velocity`,
            intro: String.raw`<p>In this section,\p we discuss how to\p calculate\p the average velocity\p of an object\p from\p $t=\r{x_1}$\p to\p $t=\lb{x_2}$</p><p>Average velocity is\p the same thing as\p the average rate\p of change\p of position</p>`,
            rightColWidth: 90,
            steps: {
                general:{
                    question:String.raw`<p>An object is thrown downward from the top of a tower. The distance in feet that it falls in $t$ seconds is given by the following.$$\p{s(t)=\{\t{an equation}\}}$$</p><p>(a) How far will the object fall in $\r{x_1}$ seconds?</p><p>(b) How far will the object fall in $\lb{x_2}$ seconds?</p><p>(c) Find the average velocity from $t = \r{x_1}$ seconds to $t = \lb{x_2}$ seconds.</p>`,
                    steps:[
                        String.raw`<p>To calculate\p how far will the object falls\p in\p $\r{x_1}$ seconds,\p</p><p>plug\p $\r{x_1}$\p into\p $s(t)$</p>`,
                        String.raw`<p>To calculate\p how far will the object falls\p in\p $\lb{x_2}$ seconds,\p</p><p>plug\p $\lb{x_2}$\p into\p $s(t)$</p>`,
                        String.raw`<p>To calculate\p average velocity,\p</p><p>plug into\p the formula $$\p{\t{Average Velocity}}\p{=}`+arocf('','x_1','x_2','s')+`$$</p>`
                    ]
                },
                specific:avgvelex('\\p{16}\\p{x}^\\p{2}\\p{+}\\p{15}\\p{x}',3,5)
            },
            examples: [

            ],
        },
    ],
}