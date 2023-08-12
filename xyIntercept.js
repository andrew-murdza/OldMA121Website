pic=function(str){
    return '<img src="/pictures/'+str+'" alt="HTML5 Icon" style="width:500px;height:500px;">'
}
quad=function(a,b,c){
    return ('\\r{'+a+'}x^2+\\b{'+b+'}x+\\go{'+c+'}').replaceAll('+\\b{-','\\b{-').replaceAll('+\\go{-','\\go{-')
}

quadNum=function(a,b,c){
    let str=('\\p{'+a+'}\\p{x}^\\p{2}\\p{+}\\p{'+b+'}\\p{x}\\p{+}\\p{'+c+'}').replaceAll('\\p{0}\\p{x}^\\p{2}\\p{+}\\p{0}\\p{x}\\p{+}','')
    str=str.replaceAll('\\p{0}\\p{x}^\\p{2}\\p{+}','')
    str=str.replaceAll('\\p{0}\\p{x}\\p{+}','').replaceAll('\\p{1}\\p{x}','\\p{x}');
    str=str.replaceAll('\\p{+}\\p{-','\\p{-').replaceAll('\\p{+}\\p{0}','');
    return str==''?'\\p{0}':str;
}
quadpause=function(a,b,c){
    let str=('\\p{\\r{'+a+'}}\\p{x}^\\p{2}\\p{+}\\p{\\b{'+b+'}}\\p{x}\\p{+}\\p{\\go{'+c+'}}');
    str=str.replaceAll('\\p{+}\\p{\\b{-','\\p{\\b{-');
    return str.replaceAll('\\p{+}\\p{\\go{-','\\p{\\go{-');
}
rounddigits=function(t,n){
    let s=Math.ceil(Math.log10(Math.abs(t)));
    let a=Math.pow(10,n-s);
    return Math.round(t*a)/a;
}
sub=function(str,x,xval){
    return str.replaceAll(x,'{('+xval+')}');
}
quadform=function(a,b,c){
    return '\\p{\\frac{\\p{-}\\p{\\b{'+b+'}}\\p{\\pm}\\p{\\sqrt{\\p{\\b{'+b+'}}^\\p{2}\\p{-}\\p{4}\\p{\\r{'+a+'}}\\p{\\go{'+c+'}}}}}{\\p{2}\\p{\\r{'+a+'}}}}'
}
xintex=function(a,b,c){
    let str='\\p{\\t{no solution}}'
    let str1='there are no $x$-intercepts'
    if(Math.pow(b,2)-4*a*c>=0){
        let x1=rounddigits((-b+Math.sqrt(Math.pow(b,2)-4*a*c))/(2*a),3);
        let x2=rounddigits((-b-Math.sqrt(Math.pow(b,2)-4*a*c))/(2*a),3);
        str='\\p{'+x1+'}\\p{,}\\ \\p{'+x2+'}';
        if(Math.pow(b,2)-4*a*c>0){
            str1='the $x$-intercepts are\\p $\\p{(}\\p{'+x1+'}\\p{,}\\p{0}\\p{)}$\\p and $\\p{(}\\p{'+x2+'}\\p{,}\\p{0}\\p{)}$'
        }
        else{
            str1='the $x$-intercept is\\p $\\p{(}\\p{'+x1+'}\\p{,}\\p{0}\\p{)}$'
        }
    }
    return{
        question:'Find the $x$-intercepts of $y='+quad(a,b,c)+'$ using the quadratic formula',
        steps:['$$'+quadpause(a,b,c)+'\\p{=}\\p{0}$$$$\\begin{aligned}\\p{x}&\\p{=}'+quadform('a','b','c')+'\\\\[10pt]&\\p{=}'+quadform('('+a+')','('+b+')','('+c+')')+'\\\\[7pt]&\\p{=}'+str+'\\end{aligned}$$',str1]
    }
}
toBlack=function(str){
    str=str.replaceAll('\\r','').replaceAll('\\go','').replaceAll('\\pu','');
    str=str.replaceAll('\\pk','').replaceAll('\\lb','').replaceAll('\\b','');
    return str;
}
yintex=function(a,b,c){
    return {
        question:'Find the $y$-intercepts of $y='+quadNum(a,b,c).replaceAll('\\p','')+'$',
        steps:['$$\\begin{aligned}\\p{y}&\\p{=}'+sub(quadNum(a,b,c),'x',0)+'\\\\[4pt]&\\p{=}\\p{'+c+'}\\end{aligned}$$',
            'The $y$-intercept is $\\p{(}\\p{0}\\p{,}\\p{'+c+'}\\p{)}$'
        ]
    }
}
window.j = {
    startCollapsed: false,
    lessonNum: 13,
    lessonName: "$x$-intercepts and $y$-intercepts",
    intro:String.raw`<p>In this section, we will discuss how to find\p $x$-intercepts\p and\p $y$-intercepts</p>`,
    sections: [
        {
            name: String.raw`$x$-intercepts`,
            intro: String.raw`<p>The $x$-intercept(s) of a graph are\p the point(s) where\p the graph intersects the\p $x$-axis</p><p>`+pic('xint.png')+`</p><p>Since the points on the $x$-axis have a $y$ coordinate of\\p $0$,\\p you find the $x$-intercepts\\p of an equation by\\p setting $y=0$\\p and \\psolving for $x$</p>`,
            rightColWidth: 90,
            steps: {
                general:{
                    question:'Find the $x$-intercepts of $y='+quad('a','b','c')+'$ using the quadratic formula',
                    steps:[
                        String.raw`<p>Set $y=0$\p and\p solve for \p$x$\p to get the \p $x$-values of the $x$-intercept(s)</p>`,
                        String.raw`<p>The $x$-intercepts of the equation are $(\t{first }x\t{-value},0)$, $(\t{second }x\t{-value},0)$, etc.</p>`,
                    ]
                },
                specific:xintex(2,4,-3)
            },
            examples: [
                xintex(2,4,6),
                //xintex(1,4,-2)
            ],
        },
        {
            name: String.raw`$y$-intercepts`,
            intro: String.raw`<p>The $y$-intercept of a graph is\p the point where\p the graph intersects the\p $y$-axis</p><p>`+pic('yint.png')+`</p><p>Since the points on the $y$-axis have an $x$ coordinate of\\p $0$,\\p you find the $y$-intercepts of an equation by\\p substituting \\p$x=0$ \\pinto \\pthe $y=$ equation</p>`,
            rightColWidth: 90,
            steps: {
                general:{
                    question:'Find the $y$-intercepts of $y=ax^2+bx+c$ using the quadratic formula',
                    steps:[
                        String.raw`<p>Substitute \p$x=0$ into\p the $y=$ equation\p to get the \p $y$-values of the $y$-intercept</p>`,
                        String.raw`<p>The $y$-intercept of the equation is $\p{(}\p{0}\p{,}\p{y\t{-value}}\p{)}$</p>`,
                    ]
                },
                specific:yintex(2,4,-3)
            },
            examples: [
                yintex(2,4,6),
                //yintex(1,4,-2)
            ],
        },
    ],
}