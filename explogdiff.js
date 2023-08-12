eds=function(b){
    b1=`\\b{`+b+`}`
    return `$$\\d{`+b1+`\\cdot\\g{e^x}}=\\p{`+b1+`}\\p{\\cdot}\\p{\\d{\\g{e^x}}=}\\p{`+b1+`}\\p{\\cdot}\\p{\\r{e^x}}$$`
}

lnds=function(b){
    b1=`\\b{`+b+`}`
    return `$$\\d{`+b1+`\\cdot\\g{\\ln(x)}}=\\p{\\frac{`+b1+`}{x}}$$`
    //return `$$\\d{`+b1+`\\cdot\\g{\\ln(x)}}=\\p{`+b1+`}\\p{\\cdot}\\p{\\d{\\g{\\ln(x)}}=}\\p{`+b1+`}\\p{\\cdot}\\p{\\r{\\ds\\frac{1}{x}}}$$`
}

edsa=function(b,a){
    return edsag(b,a)+`=}\\p{`+a*b+`e^{\\r{`+a+`}x}}$$`;
}

edal=function(a){
    a1=`\\r{`+a+'}';
    e1=`e^{`+a1+`x}`;
    return `<p>$$\\d{e^{`+a1+`x}}=\\p{`+a1+e1+`}$$</p>`
}

edsag=function(b,a){
    b1=`\\b{`+b+`}`;
    a1=`\\r{`+a+`}`;
    f1=`e^{`+a1+`x}`;
    return `\\p$$\\d{`+b1+`\\cdot\\g{`+f1+`}}=\\p{`+b1+`}\\p{\\cdot}\\p{`+a1+f1;
    //=\\p`+b1+`\\p{\\cdot}\\p\\d{\\g{`+f1+`}}
}

bcoef=function(b){
    bs=b==1?'':b;
    return '\\b{'+(b==-1?'-':bs)+'}';
}

ecex=function(b){
    return {
        question:`<b>Example: </b>Find $\\d{`+bcoef(b)+`\\g{e^x}}$`,
        steps:[
            eds(b),
        ]
    }
}

ecexs=function(b){
    b=bcoef(b);
    return {
        question:`<b>Example: </b>Find $\\d{`+b+`e^x}$`,
        steps:[
            `\\p$$\\d{`+b+`e^x}=\\p{`+b+`e^x}$$`,
        ]
    }
}

lncex=function(b){
    b=bcoef(b);
    return {
        question:`<b>Example: </b>Find $\\d{`+b+`\\ln(x)}$`,
        steps:[
            `\\p$$\\d{`+b+`\\ln(x)}=\\p{\\frac{`+b+`}{x}}$$`,
        ]
    }
}

ea=function(a){
    a1='\\r{'+a+'}';
    return `\\p$$\\d{e^{`+a1+`x}}=\\p{`+a1+`e^{`+a1+`x}}$$`
}

eaex=function(a){
    return{
        question:`<b>Example: </b>Find $\\d{e^{\\r{`+a+`}x}}$`,
        steps: [
            ea(a)
        ]
    }
}

ecaex=function(b,a){
    return {
        question:`<b>Example: </b>Find $\\d{`+bcoef(b)+`\\g{e^{\\r{`+a+`}x}}}$`,
        steps:[
            edsa(b,a),
        ]
    }
}

etermsex=function(fs,ds,ans){
    ds1=`$\\d{`+fs+`}`;
    return {
        question:`<b>Example: </b>Find `+ds1+'$',
        steps: [
            ds+`<p>$`+ds1+'='+ans+'$$</p>'
        ]
    }
}

qtane=function(b,a){
    return 'Find the equation of the line tangent to $y=\\b{'+b+'}e^{\\r{'+a+'}x}$ at the point '+pt(b);
}

pt=function(b){
    return '$(0,\\b{'+b+'})$'
}

fpeeq=`<p>To find the $\\put{slope}$, we need to calculate \\p$f'(x)$:</p>`;

fpeeq2=function(b,a){
    b1='\\b{'+b+'}';
    a1='\\r{'+a+'}';
    return `<p>$$f'(x)=\\p{\\d{`+b1+`e^{`+a1+`x}}=}\\p{`+b1+'}\\p{\\cdot}\\p{'+a1+`e^{`+a1+`x}=}\\p{`+a*b+`e^{`+a+`x}}$$</p>`;
}

fpplug=`<p>To get the $\\put{slope}$, we need to\\p plug in the $x$-value of the point, $x=\\p{0}$\\p into\\p $f'(x)$:</p>`;

fpplug2=function(b,a){
    return `<p>$$\\p{\\pu{m}=}\\p{f'(0)}\\p{=}\\p{`+a*b+`e^{`+a+`(0)}}\\p{=}\\p{\\put{`+a*b+`}}\\quad\\p{\\hi{e^0=1}}$$</p>`
}

psm=function(b,a){
    return `<p>$$y-\\p{\\b{`+b+`}=}\\p{\\pu{`+a*b+`}}\\p{(}\\p{x}\\p{-}\\p{\\o{0})}$$</p><p>$$y=\\p{\\pu{`+a*b+`}x+\\b{`+b+`}}$$</p>`
}

eqol=String.raw`<p>To get the equation of the line from \p the $\put{slope}$, we use \p point-slope form:</p><p>$$y\p{-}\p{\b{y_1}}\p{=}\p{\pu{m}}\p{(}\p{x}\p{-}\p{\o{x_1}}\p{)}$$</p>`;

eqol2=function(b,a){
    return `<p>The point is \\p $(\\o{0},\\b{`+b+`})$</p><p>$$\\o{x_1}=\\p{\\o{0}}$$</p><p>$$\\b{y_1}=\\p{\\b{`+b+`}}$$</p><p>$$\\pu{m}=\\p{\\pu{`+a*b+`}}$$</p>`+psm(b,a);
}

etanex=function(b,a){
    return{
        question:`<b>Example: </b>`+qtane(b,a),
        steps:[
            fpeeq2(b,a),fpplug2(b,a),eqol2(b,a)
        ]
    }
}

qexn=function(n,a){
    return `Find $\\d{\\pu{x^{`+n+`}}\\o{e^{`+a+`x}}}$`
}

clnex=function(b){
    c='\\b{'+b+'}';
    return {
        question:`<b>Example: </b>Find \\d{`+c+`\\ln(x)}`,
        steps:[
            `\\p$$\\d{`+c+`\\ln(x)}=\\p{\\frac{\\b{c}}{x}}$$`
        ]
    }
}

preq=String.raw`<p>This derivative includes functions being multiplied, so we need to use the \p product rule</p><p>$$\d{\pu{f_1(x)}\cdot\o{f_2(x)}}=\p{\b{f_1'(x)}}\p{\cdot}\p{\o{f_2(x)}}\p{+}\p{\pu{f_1(x)}}\p{\cdot}\p{\go{f_2'(x)}}$$</p>`

prodfs=function(fs,gs,fps,gps){
    fs='\\pu{'+fs+'}';
    gs='\\o{'+gs+'}';
    fps=`\\b{`+fps+`}`;
    gps=`\\go{`+gps+`}`;
    str='';
    str=str+`<p>$$\\pu{f_1(x)}=\\p{`+fs+`}$$</p>`;
    str=str+`<p>$$\\o{f_2(x)}=\\p{`+gs+`}$$</p>`;
    str=str+`<p>$$\\b{f_1'(x)}=\\p{`+fps+`}$$</p>`;
    str=str+`<p>$$\\go{f_2'(x)}=\\p{`+gps+`}$$</p>`;
    str=str+`<p>$$\\d{`+fs+gs+`}=\\p{`+fps+`}\\p{\\cdot}\\p{`+gs+`}\\p{+}\\p{`+fs+`}\\p{\\cdot}\\p{`+gps+`}$$</p>`
    return str;
}

prodex=function(n,a){
    return{
        question:`<b>Example: </b>`+qexn(n,a),
        steps:[
            prodfs(`x^`+n,`e^{`+a+`x}`,n+'x'+(n==2?'':'^'+(n-1)),a+'e^{'+a+'x}')
        ]
    }
}

lnff=String.raw`<p>$$\d{\ln(\b{f(x)})}=\p{\frac{\r{f'(x)}}{\b{f(x)}}}$$</p>`;

lnf=function(fs,fps){
    return String.raw`<p>$$\b{f(x)}=\p{\b{`+fs+String.raw`}}$$</p><p>$$\r{f'(x)}=\p{\r{`+fps+`}}$$</p>`
    +String.raw`<p>$$\d{\ln(\b{`+fs+`})}=\\p{\\frac{\\p{\\r{`+fps+`}}}{\\p{\\b{`+fs+`}}}}$$`;
}

lnfex=function(fs,fps){
    return {question:`<b>Example: </b>Find $\\d{\\ln(\\b{`+fs+`})}$`,steps:[lnf(fs,fps)]}
}

won=`<p><b>Note: </b>Because the $x$ is in the power instead of underneath the power, we do not subtract one from the exponent</p>`;

cmr=String.raw`<p> When taking the derivative of $\bt{\{a constant\}}$ multiplying $\gt{\{a function\}}$, you leave the $\bt{\{the constant\}}$ as it is and take the derivative of $\gt{\{the function\}}$:<p>$$\d{\b{c}\cdot\g{f(x)}}=\p{\b{c}}\p{\cdot}\p{\d{\g{f(x)}}}$$</p>`;

tex=`<p><span class='hi'>When taking the derivative of terms being added/subtracted,<span class='invisible'> find the derivative of each term separately</span></span></p>`;

// preq=String.raw`<p>This derivative includes functions being multiplied, so we need to use the \p product rule</p>`

// prodfs=function(fs,gs,fps,gps){

//     pr=String.raw`\a{\d{\pu{f_1(x)}\cdot\o{f_2(x)}}&=\p{\b{f_1'(x)}}\p{\cdot}\p{\o{f_2(x)}}\p{+}\p{\pu{f_1(x)}}\p{\cdot}\p{\go{f_2'(x)}}\\[10pt]`
//     fs='\\pu{'+fs+'}';
//     gs='\\o{'+gs+'}';
//     fps=`\\b{`+fps+`}`;
//     gps=`\\go{`+gps+`}`;
//     str='';
//     str=str+`\\a{\\pu{f_1(x)}&=\\p{`+fs+`}\\\\[4pt]`;
//     str=str+`\\o{f_2(x)}&=\\p{`+gs+`}\\\\[4pt]`;
//     str=str+`\\b{f_1'(x)}&=\\p{`+fps+`}\\\\[4pt]`;
//     str=str+`\\go{f_2'(x)}&=\\p{`+gps+`}}`;
//     pr=pr+`\\d{`+fs+gs+`}&=\\p{`+fps+`}\\p{\\cdot}\\p{`+gs+`}\\p{+}\\p{`+fs+`}\\p{\\cdot}\\p{`+gps+`}}`
//     return `<p>$$\\begin{array}{cc}`+pr+'&\\qquad'+str+`\\end{array}$$</p>`;
// }

window.j = {
    startCollapsed: false,
    lessonNum: 11,
    lessonName: "Derivative of $ce^x$",
    intro: String.raw`<p>In this lecture, we will discuss exponential and logarithmic functions.</p><p>We will discuss<ol><pli>What are exponential and logarithmic functions?</pli><pli>Word problems solved using exponential and logarithmic functions</pli><pli>Derivatives of exponential and logarithmic functions</pli></ol></p>`,
    sections: [
    {
        name: String.raw`Derivative of $ce^x$ (warmup for an exam question)`,
        backgroundColor: "green",
        web: "Hw 3: 1, 5-7, 9; Hw 4: 1-7, 11; Hw 5: 2, 5-7; PT 2: 1-6, 8; Hw 6: 4, 7, 9-10; PT 3: 8; Hw 9: 8, 10; PF: 4, 6, 10-12, 14-15",
        book: "148",
        exam: "Up to one question on Test 2, Up to one question on Final",
        intro: String.raw`<p>The derivative of $\g{e^x}$ is \p$\r{e^x}$:</p><p>$$\d{\g{e^x}}=\p{\r{e^x}}$$</p>`+cmr+String.raw`<p>Using this rule, we obtain the following rule for calculating the derivative of $\b{c}e^x$:</p><p>`+eds('c')+String.raw`</p><p>In layman's terms, <span class='hi'>The derivative of $\bt{a constant}$ times $e$ to the $x$ is itself ($\bt{the constant}$ times $e$ to the $x$)</span></p>`//+won+
        +`<p>Here are some examples:</p>`+`<p>`+eds(3)+`</p>`+`<p>`+eds(5)+`</p>`+`<p>`+eds(-4)+`</p>`,
        rightColWidth: 50,
        steps: {
            general:{
                question:String.raw`<p>Find $\d{\b{c}e^x}$</p>`,
                steps:[
                    String.raw`\p$$\d{\b{c}e^x}=\p{\b{c}e^x}$$`
                ]
            },
            specific:ecexs(2),
        },
        examples: [
            // ecex(-5),
            // ecex(3),
            // ecex(8),
            // ecex(-6),
        ],
    },
    {
        name: String.raw`Derivative of $e^{ax}$ (warmup for an exam question)`,
        backgroundColor: "green",
        web: "Hw 3: 1, 5-7, 9; Hw 4: 1-7, 11; Hw 5: 2, 5-7; PT 2: 1-6, 8; Hw 6: 4, 7, 9-10; PT 3: 8; Hw 9: 8, 10; PF: 4, 6, 10-12, 14-15",
        book: "148",
        exam: "Up to one question on Test 2, Up to one question on Final",
        intro: String.raw`<p>The derivative of $e^{\r{a}x}$ is \p$\r{a}e^{\r{a}x}$:</p>`+edal('a')+String.raw`<p>In layman's terms, <span class='hi'>When calculating the derivative of $e$ to $\rt{a constant}$ times $x$, move $\rt{the constant down}$ and leave the exponent the same</span></p>`+won+`<p>Here are some examples:</p>`+edal(3)+edal(-2)+edal(7)+edal(-6),
        //+String.raw`<p>In general, we get $$\d{e^{\r{a}x}}=\p{\r{a}e^{\r{a}x}}$$</p>`,
        rightColWidth: 50,
        steps: {
            general:{
                question:String.raw`<p>Find $\d{e^{\r{a}x}}$</p>`,
                steps:[
                    ea('a')
                ]
            },
            specific:eaex(2),
        },
        examples: [
            eaex(-4)
        ],
    },
    {
        name: String.raw`Derivative of $ce^{ax}$ (warmup for an exam question)`,
        backgroundColor: "green",
        web: "Hw 3: 1, 5-7, 9; Hw 4: 1-7, 11; Hw 5: 2, 5-7; PT 2: 1-6, 8; Hw 6: 4, 7, 9-10; PT 3: 8; Hw 9: 8, 10; PF: 4, 6, 10-12, 14-15",
        book: "148",
        exam: "Up to one question on Test 2, Up to one question on Final",
        intro: String.raw`<p>The derivative of $\g{e^{\r{a}x}}$ is \p$\r{a}e^{\r{a}x}$:</p><p>$$\d{\g{e^{\r{a}x}}}=\p{\r{a}e^{\r{a}x}}$$</p>`+cmr+String.raw`<p>Using this rule we obtain the following rule for calculating the derivative of $\b{c}e^{\r{a}x}$</p><p>$$\d{\b{c}e^{\r{a}x}}=\p{\b{c}}\p{\cdot}\p{\r{a}e^{\r{a}x}}$$</p><p>In layman's terms, <span class='hi'>When calculating the derivative of $\bt{a constant}$ times $e$ to $\rt{a constant}$ times $x$, move $\rt{the constant down}$ and leave $\bt{the constant multiplying the $e$}$ and the exponent the same</span></p>`+won+`<p>These are some examples:</p><p>`+edsa(6,3)+String.raw`</p><p>`+edsa(5,-2)+`</p><p>`+edsa(-4,5)+String.raw`</p>`,
        rightColWidth: 50,
        steps: {
            general:{
                question:String.raw`<p>Find $\d{\b{c}\g{e^{\r{a}x}}}$</p>`,
                steps:[
                    edsag('c','a')+'}$$',
                ]
            },
            specific:ecaex(2,3),
        },
        examples: [
            ecaex(4,7),
            ecaex(3,5),
            ecaex(2,8),
            ecaex(2,3),
        ],
    },
    {
        name: String.raw`Calculating Derivatives of Equations Involving $e^x$ and $e^{ax}$`,
        backgroundColor: "green",
        web: "Hw 3: 1, 5-7, 9; Hw 4: 1-7, 11; Hw 5: 2, 5-7; PT 2: 1-6, 8; Hw 6: 4, 7, 9-10; PT 3: 8; Hw 9: 8, 10; PF: 4, 6, 10-12, 14-15",
        book: "148",
        exam: "Up to one question on Test 2, Up to one question on Final",
        intro: String.raw`<p> On the exam, I might have question where you have to take the derivative of a bunch of stuff added together where some of the terms are of the form $\b{c}e^x$ or $\b{c}e^{\r{a}x}$ (possibly without $\b{c}$)</p><p>To calculate these derivatives, you will need derivative rules from test 1, one of the most important of is the following:</p>`+tex+String.raw`<p>You will also need the following two derivatives:</p><p>$$\d{\b{c}e^x}=\p{\b{c}}\p{e^x}$$</p><p>$$\d{\b{c}e^{\r{a}x}}=\p{\b{c}}\p{\cdot}\p{\r{a}e^{\r{a}x}}$$</p><p>Here are some examples:</p><p>Question: Find $\d{4+8x+\b{4}e^{\r{2}x}}$</p><p>The derivative of $\b{4}e^{\r{2}x}$ is \p$\btip{\b{4}\cdot \r{2}e^{\r{2}x}}{\d{\b{c}e^{\r{a}x}}=\b{c}\cdot\r{a}e^{\r{a}x}}$</p><p> Using this, we get $$\d{4+8x+\b{4}e^{\r{2}x}}=\p{0}\p{+}\p{8}\p{+}\p{\b{4}\cdot\r{2}e^{\r{2}x}}$$</p>`,
        //`<p>$\d{4}=\p0$</p><p>$\d{8x}=\p8$</p><p>$\d{\b{4}e^{\r{2}x}}=\p\b{4}\p \cdot\p\r{2}e^{\r{2}x}$</p><p>Putting the derivatives back together, we get</p><p>$\d{4+8x+\b{4}e^{\r{2}x}}=\p0\p +\p8\p +\p\b{4}\cdot\r{2}e^{\r{2}x}$</p>`,
        rightColWidth: 50,
        steps: {
            general:{
                question:String.raw`<p>Find $\d{\t{\{a bunch of terms including $\b{c}e^x$ and/or $\b{c}e^{\r{a}x}$ being added/subtracted\}}}$</p>`,
                steps:[
                    String.raw`<p>Calculate the derivative using derivative rules from test 1 and the formulas</p><p>$$\d{\b{c}e^x}=\p{\b{c}e^x}$$</p><p>$$\d{\b{c}e^{\r{a}x}}=\p{\b{c}\cdot\r{a}e^{\r{a}x}}$$</p>`
                ]
            },
            specific:etermsex(`x^2\\b{-2}e^x+4`,`<p>$$\\d{\\b{-2}e^x}=\\p{\\b{-2}e^x}$$</p>`,'\\p{2x}\\p{\\b{-2}e^x}\\p{+}\\p{0}')
        },
        examples: [
            //EXAMPLES NEEDED
        ],
    },
    {
        name: String.raw`Equation of the line tangent to $y=ce^{ax}$ at the point $(0,b)$ (WebAssign only)`,
        backgroundColor: "green",
        web: "Hw 3: 1, 5-7, 9; Hw 4: 1-7, 11; Hw 5: 2, 5-7; PT 2: 1-6, 8; Hw 6: 4, 7, 9-10; PT 3: 8; Hw 9: 8, 10; PF: 4, 6, 10-12, 14-15",
        book: "148",
        exam: "Up to one question on Test 2, Up to one question on Final",
        intro: String.raw`<p>Question: `+qtane(3,2)+String.raw`</p><p>To find the equation of a line using point-slope form, the two things we need are \p the point and \p the $\put{slope}$.</p><p>The point is given to be \p`+pt(3)+String.raw`</p><p>Therefore we need to find the\p $\put{slope}$</p><p>The Calculus word for $\put{slope}$ is \pderivative</p>`+fpeeq+fpeeq2(3,2)+fpplug+fpplug2(3,2)+eqol+eqol2(3,2),
        rightColWidth: 50,
        steps: {
            general:{
                question:String.raw`<p>Find $\d{\t{\{a bunch of terms including $\b{c}e^x$ and/or $\b{c}e^{\r{a}x}$ being added/subtracted\}}}$</p>`,
                steps:[
                    fpeeq,fpplug,eqol
                ]
            },
            specific:etanex(4,5)
        },
        examples: [
            // ecaex(4,7),
            // ecaex(3,5),
            // ecaex(2,8),
            // ecaex(2,3),
        ],
    },
    {
        name: String.raw`Find $\d{x^ne^{ax}}$ (WebAssign only)`,
        backgroundColor: "green",
        web: "Hw 3: 1, 5-7, 9; Hw 4: 1-7, 11; Hw 5: 2, 5-7; PT 2: 1-6, 8; Hw 6: 4, 7, 9-10; PT 3: 8; Hw 9: 8, 10; PF: 4, 6, 10-12, 14-15",
        book: "148",
        exam: "Up to one question on Test 2, Up to one question on Final",
        intro: String.raw`<p>Question: `+qexn(3,2)+String.raw`</p>`+preq+prodex(3,2).steps,
        rightColWidth: 50,
        steps: {
            general:{
                question:qexn('n','a'),
                steps:[
                    preq
                ]
            },
            specific:prodex(5,3)
        },
        examples: [
            prodex(2,6),
            prodex(5,4),
            prodex(7,3),
        ],
    },
    {
        name: String.raw`Derivative of $c\ln(x)$ (warmup for an exam question)`,
        backgroundColor: "green",
        web: "Hw 3: 1, 5-7, 9; Hw 4: 1-7, 11; Hw 5: 2, 5-7; PT 2: 1-6, 8; Hw 6: 4, 7, 9-10; PT 3: 8; Hw 9: 8, 10; PF: 4, 6, 10-12, 14-15",
        book: "148",
        exam: "Up to one question on Test 2, Up to one question on Final",
        intro: String.raw`<p>The derivative of $\g{\ln(x)}$ is \p$\r{\ds\frac{1}{x}}$:</p><p>$$\d{\g{\ln(x)}}=\p{\r{\ds\frac{1}{x}}}$$</p><p>Question: Find $\ds\d{\b{3}\g{\ln(x)}}$</p>`+cmr+String.raw`<p>Using this rule, we obtain the following rule for calculating the derivative of $\b{c}\ln(x)$:</p><p>$$\d{\b{c}\ln(x)}=\p{\b{c}}\p{\cdot}\p{\frac{1}{x}}=\frac{\b{c}}{x}$$</p><p>In layman's terms, <span class='hi'>The derivative of $\bt{a constant}$ times $\ln(x)$ is $\bt{the constant}$ divided by $x$</span></p>`+`<p>Here are some examples:</p><p>`+lnds(3)+String.raw`</p><p>`+lnds(5)+`</p><p>`+lnds(-4)+`</p>`+String.raw`</p>`,
        //<p>In general, we get $$\d{\b{c}\g{\ln(x)}}=\p{\b{c}}\p{\cdot}\p{\ds\r{\frac{1}{x}}}$$</p>`,
        rightColWidth: 50,
        steps: {
            general:{
                question:String.raw`<p>Find $\d{\b{c}\ln(x)}$</p>`,
                steps:[
                    String.raw`\p$$\d{\b{c}\ln(x)}=\p{\ds\frac{\b{c}}{x}}$$`
                ]
            },
            specific:lncex(2),
        },
        examples: [
            //EXAMPLES NEEDED
        ],
    },
    {
        name: String.raw`Calculating Derivatives of Equations Involving $\ln(x)$`,
        backgroundColor: "green",
        web: "Hw 3: 1, 5-7, 9; Hw 4: 1-7, 11; Hw 5: 2, 5-7; PT 2: 1-6, 8; Hw 6: 4, 7, 9-10; PT 3: 8; Hw 9: 8, 10; PF: 4, 6, 10-12, 14-15",
        book: "148",
        exam: "Up to one question on Test 2, Up to one question on Final",
        intro: String.raw`<p> On the exam, I might have question where you have to take the derivative of a bunch of stuff added together where some of the terms are of the form $\b{c}\ln(x)$ (possibly without $\b{c}$)</p><p>To calculate these derivatives, you will need derivative rules from test 1 and the following the derivative:</p><p>$$\d{\b{c}\ln(x)}=\p{\frac{\b{c}}{x}}$$</p><p>Here are some examples:</p><p>Question: Find $\d{x^3-2x^2+\b{6}\ln(x)}$</p>`+tex+String.raw`<p>In particular the derivative of $\b{6}\ln(x)$ is \p$\frac{\b{6}}{x}$</p><p> Using this, we get $$\d{x^3-2x^2+\b{6}\ln(x)}=\p{3x^2}\p{-}\p{4x}\p{+}\p{\frac{\b{6}}{x}}$$</p><p></p>`,
        //`<p>$\d{4}=\p0$</p><p>$\d{8x}=\p8$</p><p>$\d{\b{4}e^{\r{2}x}}=\p\b{4}\p \cdot\p\r{2}e^{\r{2}x}$</p><p>Putting the derivatives back together, we get</p><p>$\d{4+8x+\b{4}e^{\r{2}x}}=\p0\p +\p8\p +\p\b{4}\cdot\r{2}e^{\r{2}x}$</p>`,
        rightColWidth: 50,
        steps: {
            general:{
                question:String.raw`<p>Find $\d{\t{\{a bunch of terms including $\b{c}\ln(x)$ being added/subtracted\}}}$</p>`,
                steps:[
                    String.raw`<p>Calculate the derivative using derivative rules from test 1 and the formula</p><p>$$\d{\b{c}\ln(x)}=\p{\frac{\b{c}}{x}}$$</p>`
                ]
            },
            specific:etermsex(`9x+2\\b{-5}\\ln(x)`,`<p>$\\d{\\b{-5}\\ln(x)}=\\p{\\frac{\\b{-5}}{x}}$</p>`,'9\\p{+}\\p{0}\\p{+}\\p{\\frac{\\b{-5}}{x}}')
        },
        examples: [
            //EXAMPLES NEEDED
        ],
    },
    {
        name: String.raw`Calculating the derivative of $\ln(f(x))$`,
        backgroundColor: "green",
        web: "Hw 3: 1, 5-7, 9; Hw 4: 1-7, 11; Hw 5: 2, 5-7; PT 2: 1-6, 8; Hw 6: 4, 7, 9-10; PT 3: 8; Hw 9: 8, 10; PF: 4, 6, 10-12, 14-15",
        book: "148",
        exam: "Up to one question on Test 2, Up to one question on Final",
        intro: String.raw`<p>The derivative of $\ln(\b{f(x)})$ is \p$\ds\frac{\r{f'(x)}}{\b{f(x)}}$:</p><p>$$\d{\ln(\b{f(x)})}=\p{\frac{\p{\r{f'(x)}}}{\p{\b{f(x)}}}}$$</p><p>In layman's terms, <span class='hi'>the derivative of $\ln$ of $\bt{a function}$ is $\rt{the derivative of the function}$ divided by $\bt{the function}$</span></p><p>Here are some examples:</p><p>`+lnfex('x^2+1','2x').question+`<p>`+lnff+`</p>`+`</p><p>`+lnf('x^2+1','2x')+'</p>',
        //`<p>$\d{4}=\p0$</p><p>$\d{8x}=\p8$</p><p>$\d{\b{4}e^{\r{2}x}}=\p\b{4}\p \cdot\p\r{2}e^{\r{2}x}$</p><p>Putting the derivatives back together, we get</p><p>$\d{4+8x+\b{4}e^{\r{2}x}}=\p0\p +\p8\p +\p\b{4}\cdot\r{2}e^{\r{2}x}$</p>`,
        rightColWidth: 50,
        steps: {
            general:{
                question:String.raw`<p>Find $\d{\ln(\b{f(x)})}$</p>`,
                steps:[
                    lnff
                ]
            },
            specific:lnfex('4x','4')
            //etermsex(`9x+2\\b{-5}\\ln(x)`,`<p>$\\d{\\b{-5}\\ln(x)}=\\p\\b{-5}\\cdot\\ds\\frac{1}{x}$</p>`,'9\\p+\\p0\\p\\b{{}-5}\\cdot\\frac{1}{x}')
        },
        examples: [
            lnfex('x^3-x','3x^2-1'),
            lnfex('2x+1','2'),
            lnfex('3x^3+4','9x^2'),
        ],
    },
    ],
  }