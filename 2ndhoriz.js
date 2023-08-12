import {addpause, convterm, deriv, pic, coefnp, rounddigits, suby, quadform, propexpf, cleanpoly} from "./Calc.js";

function secondderivex(fstr){//Generalized Power cannot contain something nonlinear
    let str=convterm(fstr);
    let strs=deriv(str);
    let str1='$$\\begin{aligned}f(x)&\\p{=}\\p{'+str+'}\\\\[6pt]\\p{f\'(x)}&\\p{=}'+(strs[0]!=''?addpause(strs[0])+'\\\\[6pt]&\\p{=}':'')
        +addpause(strs[1])+'\\end{aligned}$$'
    let strs1=deriv(strs[1])
    let str2='$$\\begin{aligned}f\'\'(x)&\\p{=}'+addpause(strs1[0]!=''?strs1[0]:strs1[1])+'\\end{aligned}$$'
    if(strs.length>2){
        str1='$$f(x)\\p{=}\\p{'+str+'}$$'+strs[2]+'$$\\begin{aligned}\\p{f\'(x)}&\\p{=}'+(strs[0]!=''?addpause(strs[0])+'\\\\[6pt]&\\p{=}':'')
            +addpause(strs[1])+'\\end{aligned}$$'
    }
    if(strs1.length>2){
        str2=strs1[2]+'$$\\begin{aligned}f\'\'(x)&\\p{=}'+addpause(strs1[0]!=''?strs1[0]:strs1[1])+'\\end{aligned}$$'
    }
    return {
        question:'<p>Let $f(x)='+fstr+'$</p><p>Find $f\'\'(x)$</p>',
        steps:[
            str!=fstr?'$$f(x)\\p{=}\\p{'+str+'}$$':'',
            str1,str2
        ]
    }
}
function htex(a,b,c,d){
    let f=cleanpoly(a,b,c,d)
    let fp=deriv(f)[1];
    let str='\\t{no solution}'
    let str1=''
    let xs=[]
    let xs1=[]
    let str2='Because \\p$f\'(x)$ is\\p never 0,\\p there are\\p no points\\p where\\p $f(x)$ has a\\p horizontal tangent line'
    if(Math.pow(2*b,2)-12*a*c>=0){
        xs[0]=(-2*b+Math.sqrt(Math.pow(2*b,2)-12*a*c))/(6*a);
        xs[1]=(-2*b-Math.sqrt(Math.pow(2*b,2)-12*a*c))/(6*a)
        xs1[0]=rounddigits(xs[0],3);
        xs1[1]=rounddigits(xs[1],3);
        str1='$$\\begin{aligned}f(x)&\\p{=}\\p{'+f+'}\\\\[10pt]'
        str2='<p>The points where\\p $f(x)$ has\\p a horizontal tangent line are </p><p>'
        for(let i=0;i<(xs1[0]==xs1[1]?1:2);i++){
            let v=rounddigits(a*Math.pow(xs[i],3)+b*Math.pow(xs[i],2)+c*xs[i]+d,3);
            str1=str1+(i>0?'\\\\[10pt]':'')+suby(f,xs1[i],v,i>0)
            str2=str2+(i>0?'$\\p{,}$ ':'')+'$\\p{(}\\p{\\r{'+xs1[i]+'}}\\p{,}\\p{\\g{'+v+'}}\\p{)}$'
        }
        str='\\p{\\r{'+xs1[0]+'}}\\p{,}\\ \\p{\\r{'+xs1[1]+'}}';
        str1=str1+'\\end{aligned}$$'
    }
    return{
        question:String.raw`<p>Find the points where the line tangent to $f(x)=`+f+`$ is horizontal</p>`,
        steps:[
            '$$f\'(x)\\p{=}'+addpause(fp)+'$$',
            '$$'+addpause(fp)+'\\p{=}\\p{0}$$$$\\begin{aligned}\\p{x}&\\p{=}'+quadform('a','b','c')+'\\\\[10pt]&\\p{=}'+quadform('('+3*a+')','('+2*b+')','('+c+')')+'\\\\[7pt]&\\p{=}'+str+'\\end{aligned}$$',
            str1,str2+'</p>'
        ]
    }
}
window.j = {
    startCollapsed: false,
    lessonNum: 10,
    lessonName: "Second Derivatives and Horizontal Tangent Lines",
    intro: String.raw`<p>In this section,\p we will discuss\p second derivatives\p and \p horizontal tangent lines</p>`,
    sections: [
        {
            name: String.raw`Calculating Second Derivatives`,
            backgroundColor: "green",
            web: "Hw 3: 1, 5-7, 9; Hw 4: 1-7, 11; Hw 5: 2, 5-7; PT 2: 1-6, 8; Hw 6: 4, 7, 9-10; PT 3: 8; Hw 9: 8, 10; PF: 4, 6, 10-12, 14-15",
            book: "148",
            exam: "Up to one question on test 2 and up to one question on the final",
            intro: String.raw`<p>In this section,\p we will discuss how to\p find the second derivative of $f(x)$\p which is written as\p $f''(x)$</p><p>You find $f''(x)$\p using the following steps<ol><pli>Find <span class="invisible">$f'(x)$</span></pli><pli><span class="hi">$f''(x)$ is<span class="invisible"> the derivative of</span><span class="invisible"> $f'(x)$</span></span></pli></ol></p>`,
            rightColWidth: 50,
            steps:{
                general:{question:String.raw`<p>$$f(x)=\{\t{an equation}\}$$</p><p>Find $f''(x)$</p>`,
                    steps:[
                        String.raw`Remove\p square roots\p and\p fractions\p using\p the following\p properties of exponents`+propexpf,
                        String.raw`Find\p $f'(x)$\p by\p taking the derivative of\p $f(x)$`,
                        String.raw`Find\p $f''(x)$\p by\p taking the derivative of\p $f'(x)$`
                    ]
                },
                specific: secondderivex('\\sqrt[3]{3x-2}')
            },
            examples: [
                secondderivex('3x^2+4x+\\frac{3}{x}'),
                secondderivex('3x^3-4x^\\frac{3}{4}+7\\sqrt{x}'),
                secondderivex('3x^3-4x^\\frac{2}{5}+\\frac{7}{\\sqrt{x}}'),
                secondderivex('7x^\\frac{2}{5}+6\\sqrt{x}-\\frac{5}{\\sqrt[3]{x}}'),
                secondderivex('x^6-2x^5+3x^3-x+5')
            ],
        },
        {
            name: String.raw`Find where a function has a horizontal tangent line`,
            intro: String.raw`<p>In this section,\p we show how to\p find\p the points where\p a function has\p a horizontal tangent line</p><p><div class="row"><div class="col">`+pic('maxslopes')+`</div><div class="col">`+pic('minslopes')+String.raw`</div></div></p><p>As seen in the below pictures,\p many functions\p have a min or a max\p when they have a\p horizontal tangent line</p><p>We find where\p the tangent line is horizontal\p using\p two observations<ol><pli>The slope of <span class="invisible">a horizontal line</span><span class="invisible"> is $\p{0}$</span></pli><pli><span class="hi">Another word for<span class="invisible"> "the slope at a point" is</span><span class="invisible"> the derivative</span></span></pli></ol></p><p>Based on these two observations,\p<span class="hi"> a graph has <span class="invisible">a horizontal tangent line</span><span class="invisible"> when</span><span class="invisible"> its derivative</span><span class="invisible"> is</span><span class="invisible"> 0</span></span></p>`,
            rightColWidth: 90,
            steps: {
                general:{
                    question:String.raw`<p>Find the points where the line tangent to $f(x)=\t{\{an equation\}}$ is horizontal</p>`,
                    steps:[
                        String.raw`<p>Find \p$f'(x)$</p>`,
                        String.raw`<p><ol><pli>The slope of <span class="invisible">a horizontal line</span><span class="invisible"> is $\p{0}$</span></pli><pli><span class="hi">Another word for<span class="invisible"> "the slope at a point" is</span><span class="invisible"> the derivative</span></span></pli></ol></p><p>Therefore, we get\p the $\rt{$x$-values}$\p by\p solving \p$f'(x)\p{=}\p{0}$</p>`,
                        String.raw`<p>Get\p the $\gt{$y$-values}$\p by\p plugging in \p the $\rt{$x$-values}$\p into\p $f(x)$</p><p><b>Note: \pFind the $y$-values by\p substituting\p into\p the original functon,\p not the derivative</b></p>`,
                        String.raw`<p>Convert the\p $\rt{$x$-values}$\p and\p $\gt{$y$-values}$\p you found\p into\p points\p using the format $\p{(}\p{\rt{$x$-value}}\p{,}\p{\gt{$y$-value}}\p{)}$</p>`
                    ]
                },
                specific:htex(2,3,1,4)
            },
            examples: [
                htex(1,4,4,2),//htex(1,-5,1,2)
            ],
        },
    ],
}