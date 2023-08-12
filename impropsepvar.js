coxints=function(a,c){
    a='\\r{'+a+'}'
    c='\\b{'+c+'}'
    ss='$$\\iep{'+a+'}{\\infty}{\\frac{'+c+'}{x}}\\p{=}'
    ss1='\\p{-}\\p{'+c+'}\\p{\\ln(\\p{'+a+'})}'
    return [
        ss+'\\p{'+c+'}\\p{\\ln(x)}\\evp{'+a+'}{\\infty}$$',
        ss+'\\p{'+c+'}\\p{\\ln(\\p{\\infty})}'+ss1+'$$',
        ss+'\\p{'+c+'}\\p{(\\infty)}'+ss1+'$$',
        ss+'\\p{\\infty}'+ss1+'$$',
        ss+'\\p{\\infty}$$</p><p><b>Note: WebAssign is looking for DNE instead. I will accept both $\\infty$ and the DNE on the exam.</b>'
    ]
}

coxnints=function(a,c,n){
    a='\\r{'+a+'}'
    c='\\b{'+c+'}'
    n='\\g{'+n+'}'
    ss='$$\\iep{'+a+'}{\\infty}{\\frac{'+c+'}{x^{'+n+'}}}\\p{=}'
    ss1='\\p{-}\\p{'+c+'}\\p{\\ln(\\p{'+a+'})}'
    fs='\\p{\\frac{\\p{'+c+'}}{\\p{-'+n+'}\\p{+}\\p{1}}}\\p{x^{-\\p{'+n+'}\\p{+}\\p{1}}}'
    return [
        ss+'\\iep{'+a+'}{\\infty}{'+c+'x^{-'+n+'}}$$',
        ss+fs+'\\evp{'+a+'}{\\infty}$$',
        ss+fs.replaceAll('x','(\\infty)')+'\\p{-}'+fs.replaceAll('x','('+a+')')+'$$',
        ss+'\\p{\\frac{\\p{'+c+'}}{-\\p{'+n+'}\\p{+}\\p{1}}}\\p{(0)}'+'\\p{-}'+fs.replaceAll('x','('+a+')')+'$$',
    ]
}

coxex=function(a,c){
    return {
        question:'Find $\\iep{\\r{'+a+'}}{\\infty}{\\frac{\\b{'+c+'}}{x}}$',
        steps:coxints(a,c),
        general:{
            question:'',
            steps:[
                '','','',
                String.raw`<p>You can think of $\infty$ as\p a very big positive number.</p><p>Since $\b{`+c+`}$ times a really big positive number is \\pa very big positive number,$$\\p{\\b{`+c+`}}\\p{(\\infty)}\\p{=}\\p{\\infty}$$</p>`,
                String.raw`<p>You can think of $\infty$ as\p a very big positive number.</p><p>Since a really big positive number minus a small number (like $\b{`+c+`}\\ln(\\r{`+a+String.raw`})$) is a\p really big positive number,\p $$\infty-\b{`+c+`}\\ln(\\r{`+a+String.raw`})=\p{\infty}$$</p><p><b>Note: WebAssign is looking for DNE instead. I will accept both $\infty$ and the DNE on the exam.</b></p>`
            ]
        }
    }
}

coxnex=function(a,c,n){
    return {
        question:'Find $\\iep{\\r{'+a+'}}{\\infty}{\\frac{\\b{'+c+'}}{x^{\\g{'+n+'}}}}$',
        steps:coxnints(a,c,n),
        general:{
            question:'',
            steps:[
                String.raw`<p>To calculate the integral, we first want to\p rewrite $\frac{\b{`+c+`}}{x^{\\g{`+n+`}}}$ as\\p $$\\frac{\\b{`+c+`}}{x^{\\g{`+n+`}}}=\\b{`+c+`}x^{-\\g{`+n+`}}$$</p>`,
                '','','',
            ]
        }
    }
}

ecx=function(a,c){
    a='\\r{'+a+'}'
    c='\\b{'+c+'}'
    ss='$$\\iep{'+a+'}{\\infty}{e^{-'+c+'x}}\\p{=}'
    fs='\\p{\\frac{\\p{1}}{\\p{-'+c+'}}}\\p{e^{\\p{-'+c+'}\\p{x}}}'
    st='\\p{-}'+fs.replaceAll('x','{('+a+')}')
    return{
        question:'Find $\\iep{'+a+'}{\\infty}{e^{-'+c+'x}}$',
        steps:[
            ss+fs+'\\evp{'+a+'}{\\infty}$$',
            ss+fs.replaceAll('x','(\\infty)')+st+'$$',
            ss+'\\p{\\frac{\\p{1}}{\\p{-'+c+'}}}\\p{e^{\\p{-}\\p{\\infty}}}'+st+'$$',
            ss+'\\p{\\frac{\\p{1}}{\\p{-'+c+'}}}\\p{(0)}'+st+'$$'
        ],
        general:{
            question:'',
            steps:[
                '','',
                String.raw`<p>You can think of $\infty$ as a\p really big positive number\p and\p $-\infty$ as a\p really big negative number.</p><p>Since $-\b{`+c+`}$ times a big positive number is a\\p big negative number,\\p $-`+c+`(\\infty)=\\p{-\\infty}$</p>`,
                '',
            ]
        }
    }
}

window.j = {
    startCollapsed: false,
    lessonNum: 13,
    lessonName: "Improper Integrals",
    intro: String.raw`<p>In this section, we discuss improper integrals</p><p>In this class, <span class='hi'>an improper integral is <span class="invisible"> an integral where the upper endpoint is $\infty$</span></span></p><p>Here are some examples of improper integrals</p><p>$$\a{&\iep{3}{\hi{\infty}}{e^{2x}}\qquad&\iep{2}{\hi{\infty}}{\frac{3}{x}}\\[10pt]&\iep{5}{\hi{\infty}}{x^2}\qquad&\iep{6}{\hi{\infty}}{\frac{4}{x^3}}}$$</p><p>We solve improper integrals just like we've done with integrals in the past with the following exception</p><p><b>We have to simplify our answer so that our answer is either\p a number without $\infty$\p or\p the entire answer is just $\infty$</b></p><p>Because it is difficult to simplify answers with $\infty$ in them,\p we will consider only 3 types of improper integrals</p><ol><pli>The improper integral of $\ds\frac{\b{c}}{x}$</pli><pli>The improper integral of $\ds\frac{\b{c}}{x^{\g{n}}}$</pli><pli>The improper integral of $e^{-\b{c}x}$</pli></ol></p>`,
    //<p>Finally, we will discuss two vocab words related to improper integrals that are important for WebAssign</p>`,
    sections: [
    {
        name: String.raw`Calculating the Improper Integral of $\frac{c}{x}$`,
        backgroundColor: "green",
        web: "Hw 3: 1, 5-7, 9; Hw 4: 1-7, 11; Hw 5: 2, 5-7; PT 2: 1-6, 8; Hw 6: 4, 7, 9-10; PT 3: 8; Hw 9: 8, 10; PF: 4, 6, 10-12, 14-15",
        book: "148",
        exam: "Up to one question on Test 2, Up to one question on Final",
        intro: String.raw`<p>In this section we will find improper integrals of $\frac{\b{c}}{x}$</p>`,
        rightColWidth: 90,
        steps: {
            general:{
                question:String.raw`Find $\iep{\r{a}}{\infty}{\frac{\b{c}}{x}}$`,
                steps:[
                    String.raw`<p>The first step of calculating an integral with endpoints is to\p calculate the integral without endpoints\p and\p add the bar with the endpoints:</p>`,
                    String.raw`<p>Then plug in the endpoints and subtract to get rid of the bar</p>`,
                    String.raw`<p>We will now use the fact that \p$\hi{\ln(\infty)=\p{\infty}}$</p><p><b>Note: (this will be provided on the equation sheet for the exam)</b></p>`,
                    String.raw`<p>You can think of $\infty$ as\p a very big positive number.</p><p>Since $\b{c}$ times a really big positive number is \pa very big positive number,$$\p{c}\p{(\infty)}\p{=}\p{\infty}$$</p>`,
                    String.raw`<p>You can think of $\infty$ as\p a very big positive number.</p><p>Since a really big positive number minus a small number (like $\b{c}\ln(\r{a})$) is a\p really big positive number,\p $$\infty-\b{c}\ln(\r{a})=\p{\infty}$$</p><p><b>Note: WebAssign is looking for DNE instead. I will accept both $\infty$ and the DNE on the exam.</b></p>`
                ]
            },
            specific:{question:coxex(9,2).question,steps:coxex(9,2).steps}
        },
        examples: [
            coxex(3,5),
            coxex(9,4),
            coxex(8,7),
            coxex(5,2),
            coxex(7,9)
        ],
    },
    {
        name: String.raw`Calculating the Improper Integral of $\frac{c}{x^{n}}$`,
        backgroundColor: "green",
        web: "Hw 3: 1, 5-7, 9; Hw 4: 1-7, 11; Hw 5: 2, 5-7; PT 2: 1-6, 8; Hw 6: 4, 7, 9-10; PT 3: 8; Hw 9: 8, 10; PF: 4, 6, 10-12, 14-15",
        book: "148",
        exam: "Up to one question on Test 2, Up to one question on Final",
        intro: String.raw`<p>In this section we will find improper integrals of $\frac{\b{c}}{x^{\g{n}}}$\p, where a $\g{n}$ is a whole number bigger than $1$.</p>`,
        rightColWidth: 90,
        steps: {
            general:{
                question:String.raw`Calculate $\iep{\r{a}}{\infty}{\frac{\b{c}}{x^{\g{n}}}}$`,
                steps:[
                    String.raw`<p>To calculate the integral, we first want to\p rewrite $\frac{\b{c}}{x^{\g{n}}}$ as\p $$\frac{\b{c}}{x^{\g{n}}}=\b{c}x^{-\g{n}}$$</p>`,
                    String.raw`<p>The first step of calculating an integral with endpoints is to\p calculate the integral without endpoints\p and\p add the bar with the endpoints:</p>`,
                    String.raw`<p>Then plug in the endpoints and subtract to get rid of the bar</p>`,
                    String.raw`<p>We will now use the fact that \p$\hi{(\infty)^{\t{negative power}}=\p{0}}$</p><p><b>Note: (this will be provided on the equation sheet for the exam)</b></p>`,
                ]
            },
            specific:{question:coxnex(9,4,3).question,steps:coxnex(9,4,3).steps}
        },
        examples: [
            coxnex(3,2,2),
            coxnex(5,4,6),
            coxnex(8,5,3),
            coxnex(9,2,7),
            coxnex(3,6,3),
        ],
    },
    {
        name: String.raw`Calculating the Improper Integral of $e^{-cx}$`,
        backgroundColor: "green",
        web: "Hw 3: 1, 5-7, 9; Hw 4: 1-7, 11; Hw 5: 2, 5-7; PT 2: 1-6, 8; Hw 6: 4, 7, 9-10; PT 3: 8; Hw 9: 8, 10; PF: 4, 6, 10-12, 14-15",
        book: "148",
        exam: "Up to one question on Test 2, Up to one question on Final",
        intro: String.raw`<p>In this section we will find improper integrals of\p $e^{-\b{c}x}$</p>`,
        rightColWidth: 90,
        steps: {
            general:{
                question:String.raw`Find $\iep{\r{a}}{\infty}{e^{-\b{c}x}}$`,
                steps:[
                    String.raw`<p>The first step of calculating an integral with endpoints is to\p calculate the integral without endpoints\p and\p add the bar with the endpoints:</p>`,
                    String.raw`<p>Then plug in the endpoints and subtract to get rid of the bar</p>`,
                    String.raw`<p>You can think of $\infty$ as a\p really big positive number\p and\p $-\infty$ as a\p really big negative number.</p><p>Since $-\frac{1}}{\b{c}}$ (which is negative number)v times a big positive number is a\p big negative number,\p $\frac{1}{-\b{c}}(\infty)=\p{-\infty}$</p>`,
                    String.raw`<p>Finally, we use the fact that \p$\hi{e^{-\infty}=\p{0}}$</p><p><b>Note: this fact will be on the formula sheet for the exam</b></p>`
                ]
            },
            specific:{question: ecx(9,2).question, steps: ecx(9,2).steps}
        },
        examples: [
            ecx(3,8),
            ecx(5,4),
            ecx(8,5),
            ecx(2,9),
            ecx(3,6),
        ],
    }//,
    // {
    //     name: String.raw`Improper Integral Vocab Words`,
    //     backgroundColor: "green",
    //     web: "Hw 3: 1, 5-7, 9; Hw 4: 1-7, 11; Hw 5: 2, 5-7; PT 2: 1-6, 8; Hw 6: 4, 7, 9-10; PT 3: 8; Hw 9: 8, 10; PF: 4, 6, 10-12, 14-15",
    //     book: "148",
    //     exam: "Up to one question on Test 2, Up to one question on Final",
    //     intro: String.raw`<p>In this section we define two WebAssign only vocab words</p><ol><pli>If an improper integral is equal to a number, we say that the integral $\hi{\t{converges}}$</pli><pli>If an improper integral is equal to $\infty$ or DNE, we say that the integral $\hi{\t{diverges}}$</pli></ol>`,
    //     rightColWidth: 90,
    //     steps: {
    //         general:{
    //             question:String.raw`NA`,
    //             steps:[
    //                 String.raw`NA`
    //             ]
    //         },
    //         specific:{
    //             question:'NA',
    //             steps:['NA']
    //         }
    //     },
    //     examples: [
    //     ],
    // },
    ],
  }