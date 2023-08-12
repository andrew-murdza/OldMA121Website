quad=function(a,b,c){
    return ('\\r{'+a+'}x^2+\\b{'+b+'}x+\\go{'+c+'}').replaceAll('+\\b{-','\\b{-').replaceAll('+\\go{-','\\go{-')
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
vertexex=function(a,b,c){
    let x=-b/(2*a);
    let xval=rounddigits(x,3);
    let yval=rounddigits(a*Math.pow(x,2)+b*x+c,3);
    return{
        question:'Find the vertex of the parabola $y='+quad(a,b,c)+'$',
        steps:[
            '$$\\begin{aligned}\\p{x}'//&\\p{=}'\\p{-}\\p{\\frac{\\p{\\b{b}}}{\\p{2}\\p{\\r{a}}}}\\\\[10pt]
            +'&\\p{=}\\p{-}\\p{\\frac{\\p{\\b{'+b+'}}}{\\p{2}\\p{(\\r{'+a+'})}}}\\\\[7pt]&\\p{=}\\p{'+xval+'}\\end{aligned}$$',
            '$$\\begin{aligned}\\p{y}&\\p{=}'+quadpause(a,b,c)+'\\\\[4pt]&\\p{=}'+sub(quadpause(a,b,c),'x',xval)+'\\\\[4pt]&\\p{=}\\p{'+yval+'}\\end{aligned}$$',
            'The vertex is $\\p{(}\\p{'+xval+'}\\p{,}\\p{'+yval+'}\\p{)}$'
        ]
    }
}
quadform=function(a,b,c){
    return '\\p{\\frac{\\p{-}\\p{\\b{'+b+'}}\\p{\\pm}\\p{\\sqrt{\\p{\\b{'+b+'}}^\\p{2}\\p{-}\\p{4}\\p{\\r{'+a+'}}\\p{\\go{'+c+'}}}}}{\\p{2}\\p{\\r{'+a+'}}}}'
}
quadformex=function(a,b,c){
    let str='\\t{no solution}'
    if(Math.pow(b,2)-4*a*c>=0){
        let x1=rounddigits((-b+Math.sqrt(Math.pow(b,2)-4*a*c))/(2*a),3);
        let x2=rounddigits((-b-Math.sqrt(Math.pow(b,2)-4*a*c))/(2*a),3);
        str='\\p{'+x1+'}\\p{,}\\ \\p{'+x2+'}';
    }
    return{
        question:'Solve $'+quad(a,b,c)+'=0$ using the quadratic formula',
        steps:['$$\\begin{aligned}\\p{x}&\\p{=}'+quadform('('+a+')','('+b+')','('+c+')')+'\\\\[7pt]&\\p{=}'+str+'\\end{aligned}$$']
    }
}
window.j = {
    startCollapsed: false,
    lessonNum: 13,
    lessonName: "Quadratic Functions",
    intro:String.raw`<p>In this section, we will study parabolas,\p which have the form\p $y=`+quad('a','b','c')+'$</p><p>We will discuss how to </p><ol><pli>Find the vertex of a parabola</pli><pli>Solve the equation $'+quad('a','b','c')+'=0$ using the quadratic formula</pli></ol>',
    sections: [
        {
            name: String.raw`Vertex of a parabola`,
            intro: String.raw`<p>In this section, we will describe how to find the vertex of a parabola.</p><p>A parabola $y=`+quad('a','b','c')+`$ looks like this:</p><div class="row"><div class="col">\\p<img src="/pictures/upparabola.png" alt="HTML5 Icon" style="width:500px;height:500px;"><p>If $\\r{a}>0$,\\p the parabola looks like\\p an upwards opening $\\bigcup$ shape,\\p and the vertex is\\p the lowest point on the parabola</p></div><div class="col"><img src="/pictures/downparabola.png" alt="HTML5 Icon" style="width:500px;height:500px;"><p>If $\\r{a}<0$,\\p the parabola looks like\\p a downwards opening $\\bigcap$ shape,\\p and the vertex is\\p the highest point on the parabola</p></div></div>`,
            rightColWidth: 90,
            steps: {
                general:{
                    question:String.raw`Find the vertex of the parabola $y=`+quad('a','b','c')+'$',
                    steps:[
                       '<p>Find the \\p$x$-coordinate of the vertex\\p using the formula</p><p>$$x\\p{=}\\p{-}\\p{\\frac{\\p{\\b{b}}}{\\p{2}\\p{\\r{a}}}}$$</p>',
                        '<p>Find the \\p$y$-coordinate of the vertex by\\p substituting \\pthe $x$-coordiate \\pinto\\p $y='+quad('a','b','c') +'$</p>',
                        'Write the vertex as a point \\pusing the format \\p$\\p{(}\\p{x\\t{-coordinate}}\\p{,}\\p{y\\t{-coordinate}}\\p{)}$'
                    ]
                },
                specific: vertexex(2,4,1),
            },
            examples: [
                //vertexex(-1,-4,2)
            ],
        },
        {
            name: String.raw`Solving the equation $ax^2+bx+c=0$ using the quadratic formula`,
            intro: String.raw`<p>In this section, we will solve $`+quad('a','b','c')+`=0$ using the quadratic formula</p>`,
            rightColWidth: 90,
            steps: {
                general:{
                    question:String.raw`Solve $`+quad('a','b','c')+`=0$ using the quadratic formula`,
                    steps:[
                        '<p>The solution(s) are\\p $$\\p{x}\\p{=}'+quadform('a','b','c')+'$$</p><p>\\p<b>Note: </b>\\pIf there is a negative number in the square root,\\p then there is no solution</p>',
                    ]
                },
                specific: quadformex(2,4,1),
            },
            examples: [
                //quadformex(6,4,-7)
            ],
        },
    ],
}