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
            '$$\\a{\\p{\\i{\\p{\\frac{\\p{1}}{\\p{y}}}}}&\\p{=}\\p{\\i{\\p{'+c+'}\\p{x^{\\p{'+n+'}}}\\p{dx}}}\\\\[10pt]\\p{\\ln(\\p{y})}&\\p{=}\\p{\\frac{\\p{'+c+'}}{\\p{'+n+'}\\p{+}\\p{1}}}\\p{x^{\\p{'+n+'}\\p{+}\\p{1}}}\\p{+C}}$$',
            '$$\\p{\\ln(\\p{y})}\\p{=}'+con+'\\p{x}^{\\p{'+con1+'}}\\p{+C}$$',
            '$$\\p{y}\\p{=}\\p{e^{'+con+'\\p{x}^{\\p{'+con1+'}}\\p{+C}}}$$',
        ]
    }
}

window.j = {
    startCollapsed: false,
    lessonNum: 13,
    lessonName: "Properties of Exponents",
    intro: String.raw`<p>In this lecture, we will review properties of exponents</p>`,
    sections: [
        {
            name: String.raw`Power of One`,
            backgroundColor: "green",
            web: "Hw 3: 1, 5-7, 9; Hw 4: 1-7, 11; Hw 5: 2, 5-7; PT 2: 1-6, 8; Hw 6: 4, 7, 9-10; PT 3: 8; Hw 9: 8, 10; PF: 4, 6, 10-12, 14-15",
            book: "148",
            exam: "Up to one question on Test 2, Up to one question on Final",
            intro: String.raw`<p>In this section, we will use the property $\r{a}^{\b{1}}=\r{a}$</p>`,
            rightColWidth: 90,
            steps: {
                general:{
                    question:String.raw`Find the equilibrium price and equilibrium quantity for <span class="red">the demand</span> <span id="demand">$\r{D(x)}=\r{\{\t{an equation}\}}$</span> and the <span class="green">supply</span> <span id = "supply">$\g{S(x)}=\g{\{\t{an equation}\}}$</span>`,
                    steps:[
                        String.raw`<p>The <span class="blue">equilibrium quantity</span> is the $x$-value where the $\gt{supply}$ ($\g{S(x)}$) and the $\rt{demand}$ ($\r{D(x)}$) are equal.</p<p></p>`,
                        // String.raw`<p><span id="equiquandef">The <span class="blue">equilibrium quantity</span> is the $x$-value where the $\btip{\gt{supply}}{\href{AllExampleV2.html#supply}{\g{S(x)}}}$ and the $\btip{\rt{demand}}{\href{AllExampleV2.html#demand}{\r{D(x)}}}$ are equal.</span> Therefore, to find the equilibrium quantity, we set $\btip{\r{D(x)}}{\href{AllExampleV2.html#demand}{\rt{demand}}}=\btip{\g{S(x)}}{\href{AllExampleV2.html#supply}{\gt{supply}}}$ and solve for $x$</p><p>We first find the equilibrium quantity by setting the $\btip{\r{D(x)}}{\href{AllExampleV2.html#demand}{\rt{demand}}}=\btip{\g{S(x)}}{\href{AllExampleV2.html#supply}{\gt{supply}}}$ and solving for $x$</p><p>The equilibrium quantity is the $x$-value where the $\btip{\gt{supply}}{\href{AllExampleV2.html#supply}{\g{S(x)}}}$ and the $\btip{\rt{demand}}{\href{AllExampleV2.html#demand}{\r{D(x)}}}$ are equal. Write an equation in terms of $S(x)$ and $D(x)$ which can be solved to find the equilibrium quantity</p><p>Replace $\btip{\g{S(x)}}{\href{AllExampleV2.html#supply}{\gt{supply}}}$ and $\btip{\r{D(x)}}{\href{AllExampleV2.html#demand}{\rt{demand}}}$ with the formulas given the problem</p>`,
                        // String.raw`<p>The equilibrium price is the value of the $\btip{\rt{demand}}{\href{AllExampleV2.html#demand}{\r{D(x)}}}$ or the $\btip{\gt{supply}}{\href{AllExampleV2.html#supply}{\g{S(x)}}}$ when $x$ is the equilibrium quantity</p><p>Therefore, you get the equilibrium quantity by substituting the equilibrium quantity into $\btip{\g{S(x)}}{\href{AllExampleV2.html#supply}{\gt{supply}}}$ and $\btip{\r{D(x)}}{\href{AllExampleV2.html#demand}{\rt{demand}}}=\btip{\g{S(x)}}{\href{AllExampleV2.html#supply}{\gt{supply}}}$</p><p>It doesn't matter whether you plug into the $\btip{\gt{supply}}{\href{AllExampleV2.html#supply}{\g{S(x)}}}$ or the $\btip{\rt{demand}}{\href{AllExampleV2.html#demand}{\r{D(x)}}}$ because $\btip{\t{the }\rt{demand}\t{ and the }\gt{supply}\t{ are equal when }x\t{ is the equilibrium quantity}}{\href{AllExampleV2.html#equiquandef}{\t{this is the definition of the equilibrium quantity}}}$</p><p>To find the equilibrium price, substitute the equilibrium quantity into $\btip{\r{D(x)}}{\href{AllExampleV2.html#demand}{\rt{demand}}}$</p><p></p>`,
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