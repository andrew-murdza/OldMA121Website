import {deriv,coef,addpause,ap,pr,coefnp,rounddigits,psf,sub,psf1,qr,picsize} from "./Calc.js?v=201";
function eac(a,c){
    return{
        question: 'Solve $e^{'+a+'t}='+c+'$ for $t$',
        steps:[
            '$$\\begin{aligned}\\ln(\\p{e^{'+a+'t}})&\\p{=}\\p{\\ln(\\p{'+c+'})}\\\\[6pt]\\p{'+a+'}\\p{t}&\\p{=}\\p{\\ln(\\p{'+c+'})}\\end{aligned}$$','$$\\p{t}\\p{=}\\p{\\frac{\\p{\\ln(\\p{'+c+'})}}{\\p{'+a+'}}}$$'
        ]
    }
}

function lncderiv(c,fs,fps){
    fps='\\p{\\pk{'+fps+'}}';
    return '\\b{'+coef(c)+'}\\p{\\cdot}\\p{\\frac{'+fps+'}{\\p{\\pu{'+fs+'}}}}';
}

function lncfderivex(c,fs){
    let fps=deriv(fs)[1];
    return{
        question:'<p>Let $f(x)=\\b{'+c+'}\\ln(\\pu{'+fs+'})$</p><p>Find $f\'(x)$</p>',
        steps:[
            '$$\\begin{aligned}\\b{c}&\\p{=}\\p{\\b{'+c+'}}\\\\[6pt]\\p{\\pu{g(x)}}&\\p{=}\\p{\\pu{'+fs+'}}\\end{aligned}$$',
            '$$\\begin{aligned}\\pk{g\'(x)}&\\p{=}\\pk{'+addpause(fps)+'}\\end{aligned}$$',
            '$$f\'(x)='+lncderiv(c,fs,fps)+'$$'
        ]
    }
}

function lncfracderivex(c,fs,gs){
    let fp=deriv(fs)[1];
    let gp=deriv(gs)[1];
    let fs1='\\frac{'+fs+'}{'+gs+'}'
    let f1p='\\pk{'+'\\p{\\frac{\\p{\\g{'+ap(fp)+'}}\\p{\\cdot}\\p{\\o{'+ap(gs)+'}}\\p{-}\\p{\\pu{'+ap(fs)+'}}\\p{\\cdot}\\p{\\b{'+ap(gp)+'}}}{\\p{(}\\p{\\o{'+gs+'}}\\p{)}^\\p{2}}}'+'}';
    return{
        question:'<p>Let $f(x)=\\b{'+coefnp(c)+'}\\ln\\left(\\pu{'+fs1+'}\\right)$</p><p>Find $f\'(x)$</p>',
        steps:[
            '$$\\begin{aligned}\\b{c}&\\p{=}\\p{\\b{'+c+'}}\\\\[6pt]\\p{\\pu{g(x)}}&\\p{=}\\p{'+fs1+'}\\end{aligned}$$',
            '<p>Since $\\pu{g(x)}\\p{=}\\p{\\frac{\\pu{'+fs+'}}{\\o{'+gs+'}}}$\\p is a fraction,\\p' +
            ' we need\\p the quotient rule\\p to calculate' +
            ' \\p$g\'(x)$</p><p>The quotient rule is $$'+qr+'$$</p><p>$$\\begin{aligned}\\pu{f_1(x)}&\\p{=}\\pu{\\p{'+fs+'}}\\\\[4pt]\\p{\\o{f_2(x)}}&\\p{=}\\p{\\o{'+gs+'}}\\\\[4pt]\\p{\\g{f\'_1(x)}}&\\p{=}\\p{\\g{'+fp+'}}\\\\[4pt]\\p{\\b{f\'_2(x)}}&\\p{=}\\p{\\b{'+gp+'}}\\end{aligned}$$$$\\begin{aligned}\\p{\\pk{g\'(x)}}&\\p{=}\\pk{\\p{\\frac{\\p{\\g{f_1\'(x)}}\\p{\\cdot}\\p{\\o{f_2(x)}}\\p{-}\\p{\\pu{f_1(x)}}\\p{\\cdot}\\p{\\b{f_2\'(x)}}}{\\p{(\\o{f_2(x)})}^\\p{2}}}}\\\\[10pt]&\\p{=}\\p{'+f1p+'}\\end{aligned}$$</p>',
            '$$f\'(x)='+lncderiv(c,fs1,'\\left('+f1p+'\\right)')+'$$'
        ]
    }
}


function prex(f,g){
    let fp='\\g{'+deriv(f)[1]+'}';
    let gp='\\b{'+deriv(g)[1]+'}';
    f='\\pu{'+f+'}'
    g='\\o{'+g+'}'
    return{
        question:String.raw`<p>Let $f(x)=\pu{`+ap(f)+`}\\o{`+ap(g)+`}$</p><p>Calculate $f'(x)$</p>`,
        steps:[
            '$$\\begin{aligned}\\pu{f_1(x)}&\\p{=}\\p{'+f+'}\\\\[4pt]\\p{\\o{f_2(x)}}&\\p{=}\\p{'+g+'}\\end{aligned}$$',
            '$$\\begin{aligned}\\g{f\'_1(x)}&\\p{=}'+addpause(fp)+'\\\\[4pt]\\p{\\b{f\'_2(x)}}&\\p{=}'+addpause(gp)+'\\end{aligned}$$',
            '$$\\begin{aligned}f\'(x)&\\p{=}\\p{'+ap(fp)+'}\\p{\\cdot}\\p{'+ap(g)+'}\\p{+}\\p{'+ap(f)+'}\\p{\\cdot}\\p{'+ap(gp)+'}\\end{aligned}$$'
        ]
    }
}

function prodean(n,a){
    return prex('x^'+n,('e^{'+a+'x}').replaceAll('-','\\m'))
}

function prodaxn(n,a){
    return prex('x^'+n,a+'^x')
}

function logaxn(n,a){
    let ex=prex('x^'+n,'\\log_{'+a+'}(x)')
    ex.steps.push('$$\\begin{aligned}f\'(x)&=\\p{x^{'+coefnp(n-1)+'}\\cdot\\frac{1}{\\ln('+a+')}+'+n+'x^{'+coefnp(n-1)+'}\\cdot\\log_{'+a+'}(x)}\\\\[10pt]&\\p{=}\\p{x^{'+coefnp(n-1)+'}\\left('+n+'+\\frac{1}{\\ln('+a+')}\\cdot\\log_{'+a+'}(x)\\right)}\\\\[7pt]&\\p{=}\\p{x^{'+coefnp(n-1)+'}\\left('+n+'+'+rounddigits(1/Math.log(a),3)+'\\cdot\\log_{'+a+'}(x)\\right)}\\end{aligned}$$')
    return ex;
}
function tanex(a,b,fs,m){
    let fp=deriv(fs)[1]
    return{
        question:`Find the equation of the line tangent to $f(x)=`+fs+`$ at the point $(\\r{`+a+`},\\g{`+b+`})$`,
        steps:[
            '$$f\'(x)\\p{=}'+fp+'$$',
            '$$\\begin{aligned}\\p{\\b{m}}&\\p{=}\\p{f\'}\\p{(\\r{'+a+'})}\\\\[4pt]&\\p{=}'+sub(fp,'x','\\r{'+a+'}')+'\\\\[4pt]\\p{\\b{m}}&\\p{=}\\p{\\b{'+m+'}}\\end{aligned}$$',
            'The equation of the tangent line is$$'+psf(a,b,m)+'$$',
            'The equation of the tangent line is$$'+psf1(a,b,m)+'$$',
        ]
    }
}
function tanexe(c,a){
    return tanex(0,c,c+('e^{'+a+'x}').replaceAll('-','\\m'),c*a)
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

function derivintroex(fs){
    return {
        question:'<p>Let $f(x)='+fs+'$</p><p>Find $f\'(x)$</p>',
        steps:['$$f\'(x)='+addpause(deriv(fs)[1])+'$$']
    }
}

window.j = {
    startCollapsed: false,
    lessonNum: 10,
    lessonName: "Exponential and Logarithmic Functions",
    intro: String.raw`<p>In this lecture, we will discuss exponential functions and logarithmic functions</p><p>Exponential functions are useful for modeling exponential growth and exponential decay</p><p><b>Exponential Growth</b></p><p>Exponential growth happens when a quantity grows at rate that is proportional to the current value of the quantity</p><p>Examples of exponential growth are population growth and compound interest</p><p>Below is a graph of exponential growth</p><p>`+picsize('expgrowth',500)+`</p><p>An exponential growth function has the form $y=ce^{ax}$ where $c$ is the starting amount and $a$ is the growth rate</p><p><b>Exponential Decay</b></p><p>Exponential decay happens when a quantity decreases at a rate that is proportional to the current value of the quantity</p><p>Examples of exponential decay are radioactive decay and present value</p><p>Below is a graph of exponential growth</p><p>`+picsize('expdecay',500)+`</p><p>An exponential decay function has the form $y=ce^{-ax}$ where $c$ is the starting amount and $a$ is the decay rate</p>`,
    sections: [
        {
            name: String.raw`Solve $e^{at}=c$`,
            backgroundColor: "green",
            web: "Hw 3: 1, 5-7, 9; Hw 4: 1-7, 11; Hw 5: 2, 5-7; PT 2: 1-6, 8; Hw 6: 4, 7, 9-10; PT 3: 8; Hw 9: 8, 10; PF: 4, 6, 10-12, 14-15",
            book: "148",
            exam: "Up to one question on test 2 and up to one question on the final",
            intro: String.raw`<p>In this section,\p we will discuss how to\p solve $e^{at}=c$</p>`,
            rightColWidth: 50,
            steps:{
                general:{question:String.raw`<p>Solve $e^{at}=c$ for $t$</p>`,
                    steps:[
                        String.raw`<p>Take the\p $\ln$ of\p both sides\p to\p cancel the $e$</p>`,
                        String.raw`<p>Solve\p for $t$</p>`,
                    ]
                },
                specific:eac(2,3)
            },
            examples: [
                eac(4,7),eac(3,8),eac(5,2),eac(4,3),eac(7,4),eac(6,3)
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
                specific:derivintroex('4x^3-3e^{\\m 2x}-3\\ln(x)')
            },
            examples: [
                derivintroex('\\ln(x)-2e^x+2x'),
                derivintroex('-3e^{5x}+4+5\\ln(x)'),
                derivintroex('x^3-4e^{\\m2x}+4e^x'),
                derivintroex('3\\ln(x)-2x+4e^{2x}'),
                derivintroex('7e^x-9x^2+5\\ln(x)'),
                derivintroex('3e^{\\m5x}-12\\ln(x)+5'),
                // derivintroex('2e^x-\\ln(x)+x^2'),
                // derivintroex('2e^{2x}-3\\ln(x)+x'),
                // derivintroex('-e^{-x}+\\ln(x)+x^4'),
                // derivintroex('2e^{-2x}-2e^x+1'),
            ],
        },
        {
            name: String.raw`Derivative of $c\ln(g(x))$`,
            backgroundColor: "green",
            web: "Hw 3: 1, 5-7, 9; Hw 4: 1-7, 11; Hw 5: 2, 5-7; PT 2: 1-6, 8; Hw 6: 4, 7, 9-10; PT 3: 8; Hw 9: 8, 10; PF: 4, 6, 10-12, 14-15",
            book: "148",
            exam: "Up to one question on test 2 and up to one question on the final",
            intro: String.raw`<p>In this section, we will discuss how to find the derivative of $c\ln(g(x))$</p>`,
            rightColWidth: 50,
            steps:{
                general:{question:String.raw`<p>Let $f(x)=\b{c}\ln(\pu{g(x)})$</p><p>Find $f'(x)$</p>`,
                    steps:[
                        String.raw`<p>Identify $\b{c}$ and $\pu{g(x)}$</p>`,
                        String.raw`<p>Find $\pk{g'(x)}$</p>`,
                        String.raw`<p>Find\p $f'(x)$ with\p the formula\p $$\frac{d}{dx}\left(\b{c}\ln(\pu{g(x)}\right)=`+lncderiv('c','g(x)','g\'(x)')+`$$</p>`
                    ]
                },
                specific:lncfderivex(4,'x^2+1')
            },
            examples: [
                lncfderivex(6,'4x'),
                lncfderivex(-2,'2x+4'),
                lncfderivex(1,'3x^2+x'),
                lncfderivex(-5,'9x'),
                lncfderivex(7,'x^4+x^2'),
                lncfderivex(-6,'4x-5'),
                lncfracderivex(1,'x^2+1','2x')
                //lncfderivex(5,'8x'),
                //lncfderivex(3,'3x^2+2'),
            ],
        },
        {
            name: String.raw`Derivative of $x^ne^{ax}$`,
            backgroundColor: "green",
            web: "Hw 3: 1, 5-7, 9; Hw 4: 1-7, 11; Hw 5: 2, 5-7; PT 2: 1-6, 8; Hw 6: 4, 7, 9-10; PT 3: 8; Hw 9: 8, 10; PF: 4, 6, 10-12, 14-15",
            book: "148",
            exam: "Up to one question on test 2 and up to one question on the final",
            intro: String.raw`<p>In this section, we will discuss how to find the derivative of $x^ne^{ax}$ using product rule</p>`,
            rightColWidth: 50,
            steps:{
                general:{question:String.raw`<p>Let $f(x)=x^ne^{ax}$</p><p>Find $f'(x)$</p>`,
                    steps:[
                        String.raw`<p>Identify\p $\pu{f_1(x)}$\p and\p $\o{f_2(x)}$</p>`,
                        String.raw`<p>Calculate\p $\g{f_1'(x)}$\p and \p $\b{f_2'(x)}$\p using the formula\p$$\frac{d}{dx}\left(\b{c}e^{\r{a}x}\right)=\p{\r{a}}\p{\cdot}\p{\b{c}}\p{e^{\p{\r{a}}\p{x}}}$$</p>`,
                        String.raw`<p>Plug into\p the formula \p$$`+pr+`$$</p>`
                    ]
                },
                specific:prodean(2,3)
            },
            examples: [
                prodean(4,7),prodean(3,8),prodean(5,2),prodean(4,3),prodean(7,4),prodean(6,3),
                //prodean(2,-2)
            ],
        },
        {
            name: String.raw`Derivative of $x^na^x$`,
            backgroundColor: "green",
            web: "Hw 3: 1, 5-7, 9; Hw 4: 1-7, 11; Hw 5: 2, 5-7; PT 2: 1-6, 8; Hw 6: 4, 7, 9-10; PT 3: 8; Hw 9: 8, 10; PF: 4, 6, 10-12, 14-15",
            book: "148",
            exam: "Up to one question on test 2 and up to one question on the final",
            intro: String.raw`<p>In this section, we will discuss how to find the derivative of $x^na^x$ using product rule</p>`,
            rightColWidth: 50,
            steps:{
                general:{question:String.raw`<p>Let $f(x)=x^na^x$</p><p>Find $f'(x)$</p>`,
                    steps:[
                        String.raw`<p>Identify\p $\pu{f_1(x)}$\p and\p $\o{f_2(x)}$</p>`,
                        String.raw`<p>Calculate\p $\g{f_1'(x)}$\p and \p $\b{f_2'(x)}$\p using the formula\p$$\frac{d}{dx}\left(\r{a}^x\right)=\p{\r{a}}^\p{x}\p{\cdot}\p{\ln(\p{\r{a}})}$$</p>`,
                        String.raw`<p>Plug into\p the formula \p$$`+pr+`$$</p>`
                    ]
                },
                specific:prodaxn(2,3)
            },
            examples: [

            ],
        },
        {
            name: String.raw`Derivative of $x^n\log_a(x)$`,
            backgroundColor: "green",
            web: "Hw 3: 1, 5-7, 9; Hw 4: 1-7, 11; Hw 5: 2, 5-7; PT 2: 1-6, 8; Hw 6: 4, 7, 9-10; PT 3: 8; Hw 9: 8, 10; PF: 4, 6, 10-12, 14-15",
            book: "148",
            exam: "Up to one question on test 2 and up to one question on the final",
            intro: String.raw`<p>In this section, we will discuss how to find the derivative of $x^n\log_a(x)$ using product rule</p>`,
            rightColWidth: 50,
            steps:{
                general:{question:String.raw`<p>Let $f(x)=x^n\log_a(x)$</p><p>Find $f'(x)$</p>`,
                    steps:[
                        String.raw`<p>Identify\p $\pu{f_1(x)}$\p and\p $\o{f_2(x)}$</p>`,
                        String.raw`<p>Calculate\p $\g{f_1'(x)}$\p and \p $\b{f_2'(x)}$\p using the formula\p$$\frac{d}{dx}\left(\log_{\r{a}}(x)\right)=\p{\frac{1}{\p{x}\p{\cdot}\p{\ln(\p{\r{a}})}}}$$</p>`,
                        String.raw`<p>Plug into\p the formula \p$$`+pr+`$$</p>`,
                        String.raw`<p>Simplify by<ol><pli>Switching the order of the two terms</pli><pli>Factoring out a common factor $x^{n-1}$</pli><pli>Converting $\frac{1}{\ln(a)}$ to a decimal</pli></ol></p>`
                    ]
                },
                specific:logaxn(7,4)
            },
            examples: [

            ],
        },
        {
            name: String.raw`Equation of line tangent to $ce^{ax}$`,
            backgroundColor: "green",
            web: "Hw 3: 1, 5-7, 9; Hw 4: 1-7, 11; Hw 5: 2, 5-7; PT 2: 1-6, 8; Hw 6: 4, 7, 9-10; PT 3: 8; Hw 9: 8, 10; PF: 4, 6, 10-12, 14-15",
            book: "148",
            exam: "Up to one question on test 2 and up to one question on the final",
            intro: String.raw`<p>In this section, we will discuss how to find the line tangent to of $\g{c}e^{\go{a}x}$ at the point $(\r{0},\g{c})$</p>`,
            rightColWidth: 50,
            steps:{
                general:{question:String.raw`<p>Find the equation of the line tangent to $f(x)=\b{c}e^{\r{a}x}$ at $x=0$</p>`,
                    steps:[
                        String.raw`<p>Find \p$f'(x)$</p>`,
                        String.raw`<p>Find \pthe $\bt{slope}$ of\p the tangent line\p by\p plugging\p the $\rt{$x$-value}$ of the point\p into\p the derivative</p>`,
                        String.raw`<p>Find\p the equation of\p the tangent line\p with\p point-slope form\p$$`+psf('x_1','y_1','m')+`$$</p>`,
                        String.raw`<p>Solve for $y$ (WebAssign only)</p>`
                    ]
                },
                specific:tanexe(4,2)
            },
            examples: [

            ],
        },
    ],
}