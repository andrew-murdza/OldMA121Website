

sepvarex=function(c,n){
    con=c/(n+1)
    if(con==1){
        con='';
    }
    else{
        con=con==-1?'\\p{-}':'\\p{'+con+'}'
    }
    con1=n+1
    c='\\b{'+c+'}'
    n='\\r{'+n+'}'
    return {
        question:'Solve $\\frac{dy}{dx}='+c+'x^{\\r{'+n+'}}y$',
        steps:[
            '$$\\p{\\frac{\\p{1}}{\\p{y}}}\\p{dy}\\p{=}\\p{'+c+'}\\p{x^{\\p{'+n+'}}}\\p{dx}$$',
            '$$\\a{\\p{\\i{\\p{\\frac{\\p{1}}{\\p{y}}}}}&\\p{=}\\p{\\i{\\p{'+c+'}\\p{x^{\\p{'+n+'}}}}}\\\\[10pt]\\p{\\ln(\\p{y})}&\\p{=}\\p{\\frac{\\p{'+c+'}}{\\p{'+n+'}\\p{+}\\p{1}}}\\p{x^{\\p{'+n+'}\\p{+}\\p{1}}}\\p{+C}}$$',
            '$$\\p{\\ln(\\p{y})}\\p{=}'+con+'\\p{x}^{\\p{'+con1+'}}\\p{+C}$$',
            '$$\\p{y}\\p{=}\\p{e^{'+con+'\\p{x}^{\\p{'+con1+'}}\\p{+C}}}$$',
        ]
    }
}

window.j = {
    startCollapsed: false,
    lessonNum: 13,
    lessonName: "Separation of Variables",
    intro: String.raw`<p>In this lecture, we will show how to solve $\frac{dy}{dx}=\b{c}x^{\r{n}}y$</p>`,
    sections: [
    {
        name: String.raw`Solving $\frac{dy}{dx}=cx^ny$`,
        backgroundColor: "green",
        web: "Hw 3: 1, 5-7, 9; Hw 4: 1-7, 11; Hw 5: 2, 5-7; PT 2: 1-6, 8; Hw 6: 4, 7, 9-10; PT 3: 8; Hw 9: 8, 10; PF: 4, 6, 10-12, 14-15",
        book: "148",
        exam: "Up to one question on Test 2, Up to one question on Final",
        intro: String.raw`<p>In this section, we will solve $\frac{dy}{dx}=\b{c}x^{\r{n}}y$</p>`,
        rightColWidth: 90,
        steps: {
            general:{
                question:String.raw`Solve $\frac{dy}{dx}=\b{c}x^{\r{n}}y$`,
                steps:[
                    String.raw`<p>We first move all of the $y$ stuff to one side and all of the $x$ stuff to the other side by\p multiplying by $dx$\p and \pdividing by $y$</p>`,
                    String.raw`<p>We then integrate both sides \p(don't forget the $+C$)</p>`,
                    String.raw`<p>WebAssign only: simplify the integrals</p>`,
                    String.raw`<p>Finally, we\p cancel the $\ln$\p by\p raising $e$ to the power of both sides</p>`
                ]
            },
            specific:sepvarex(4,3)
        },
        examples: [
            sepvarex(9,2),
            sepvarex(3,2),
            sepvarex(10,4),
            sepvarex(9,8),
            sepvarex(6,2)
        ],
    },
    ],
  }