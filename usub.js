import {
    int,
    convtermInt,
    addpause,
    rp,
    intNoC,
    deriv, add
} from "./Calc.js?v=158";

// function diffterms1(str){
//     fps='';
//     is=findChar(str,['+','-'])
//     terms=str.split(/[+-]/)
//     for(let i=0;i<terms.length;i++){
//         strs1=diffterm(terms[i])
//         str1='\\p{'+strs1[0]+'}';
//         str2=i>0?'\\p{'+str[is[i-1]]+'}':''
//         fps=fps+str2+str1;
//     }
//     return fps
// }
//
// function diffetx(str){
//     i=str.search('e^x')
//     c=parsec(str.slice(0,i-2))
//     cs='\\b{'+c+'}';
//     if(c==1){
//         cs='';
//     }
//     return ['\\p{'+cs+'}\\p{\\p{e}\\p{^x}}',cs+'e^x']
// }
//
// function diffceax(str){
//     i=str.search('e\\^{');
//     c=parsec(str.slice(0,i));
//     c=c!=1?'\\b{'+c+'}':'';
//     exp=str.substring(i+3);
//     j=exp.search('x')
//     a=parsec(exp.slice(0,j));
//     return [`\\p{`+c+`}\\p{\\cdot}\\p{\\r{`+a+`}}\\p{e^{\\p{\\r{`+a+`}}\\p{x}}}`,``+c+`e^{\\r{`+a+`}x}`]
// }
//
// function diffc(str){
//     return ['0'];
// }
//
// function diffcx(str){
//     return [str.substring(0,str.length-1)];
// }
//
// function parsec(c){
//     if(c=='-'){
//         return -1;
//     }
//     return c==''?1:parseInt(c);
// }
//
// function diffcxn(str){
//     i=str.search('x\\^');
//     c=parsec(str.slice(0,i));
//     n=parseInt(str.substring(i+2));
//     n1=n==2?'':'\\p{^{'+(n-1)+'}}';
//     return [c*n+'\\p{x}'+n1]
// }
//
// function diffterm(str){
//     if(!str.includes('x')){
//         return diffc(str)
//     }
//     else if(!str.includes('^')){
//         return diffcx(str)
//     }
//     else if(str.includes('x^')){
//         return diffcxn(str)
//     }
//     else if(str.includes('e^{')){
//         return diffceax(str)
//     }
//     else{
//         return diffetx(str)
//     }
// }
//
// function findChar(str,chars){
//     is=[];
//     for(let i=0;i<str.length;i++){
//         for(let j=0;j<chars.length;j++){
//             if(str[i]==chars[j]){
//                 is.push(i)
//             }
//         }
//     }
//     return is;
// }

function eusub(fs){
    let du='\\pu{'+addpause(deriv(fs)[1])+'}';
    let pow='\\r{'+addpause(fs)+'}'
    let org=rp('\\i{'+du+'e^{'+pow+'}}');
    return{
        question:'Find $'+org+'$',
        steps:[
            '$$\\r{u}='+pow+'$$',
            '$$\\b{du}=\\p{\\d{'+pow+'}=}'+du+'\\,\\p{dx}$$',
            '$$'+org+'=\\p{\\int \\p{e}^{\\p{\\r{u}}}\\,\\b{du}}$$',
            '$$'+org+'=\\p{e}^{\\p{\\r{u}}}\\p{+C}$$',
            '$$'+org+'=\\p{e}^{\\p{'+pow+'}}\\p{+C}$$',
        ]
    }
}

function eusubPow(n){
    return eusub('x^'+n)
}

function fracusub(fs,a,b){
    a='\\g{'+a+'}'
    b='\\lb{'+b+'}'
    let du='\\pu{'+addpause(deriv(fs)[1])+'}';
    let denom='\\r{'+addpause(fs)+'}'
    let org=rp('\\i{\\frac{'+du+'}{'+denom+'}}');
    let org1=rp('\\ie{'+a+'}{'+b+'}{\\frac{'+du+'}{'+denom+'}}');
    let anti='\\p{\\ln('+denom+')}'
    return{
        question:'Find $'+org+'$',
        steps:[
            '$$\\r{u}='+denom+'$$',
            '$$\\b{du}=\\d{'+denom+'}\\p{=('+du+')}\\,\\p{dx}$$',
            '$$'+org+'=\\p{\\int \\p{\\frac{\\p{\\b{du}}}{\\p{\\r{u}}}}}$$',
            '$$'+org+'=\\p{\\int} \\p{\\frac{\\p{1}}{\\p{\\r{u}}}}\\,\\p{\\b{du}}$$',
            '$$'+org+'=\\p{\\ln(\\p{\\r{u}})}\\p{+C}$$',
            '$$'+org+'='+anti+'\\p{+C}$$',
            '$$'+org1+'='+anti+'\\evp{'+a+'}{'+b+'}$$',//'\\ev{'+a+'}{'+b+'}$$',
            '$$'+org1+'='+anti.replaceAll('x','{('+b+')}')+'\\p{-}'+anti.replaceAll('x','{('+a+')}')+'$$',
        ]
    }
}

function powusubSpecial(c,b,n){
    let coef='\\pu{'+addpause(c+'t')+'}';
    let base='\\r{'+addpause(b+'t^2-1')+'}';
    let b1=2*b
    let du=addpause('\\b{'+b1+'t}');
    n='\\g{\\p{'+n+'}}'
    let org=rp('\\i{'+coef+'('+base+')^{'+n+'}}');
    let anti='\\p{\\frac{\\left(\\pk{\\p{\\frac{\\p{'+c+'}}{\\p{'+b1+'}}}}\\right)}{\\g{'+n+'}\\p{+}\\p{1}}}\\p{(\\p{\\r{u}})}^{'+n+'\\p{+}\\p{1}}\\p{+C}'
    return{
        question:'Find $'+org+'$',
        steps:[
            '$$\\r{u}='+base+'$$',
            '$$\\b{du}=\\p{\\d{'+base+'}=}\\p{('+du+')}\\,\\p{\\go{dx}}$$',
            '$$\\go{dx}=\\p{\\frac{\\p{du}}{'+du+'}}$$',
            '$$'+org+'=\\p{\\int} '+coef+'\\p{(\\p{\\r{u}})}^{'+n+'}\\p{\\left(\\p{\\frac{\\p{du}}{'+du+'}}\\right)}$$',
            '$$'+org+'=\\p{\\int\\pk{\\p{\\frac{\\p{'+c+'}}{\\p{'+b1+'}}}}\\p{(\\p{\\r{u}})}^{'+n+'}\\,du}$$',
            '$$'+org+'='+anti+'$$',
            '$$'+org+'='+anti.replaceAll('\\r{u}',base)+'$$',
        ]
    }
}
function powusub(fs,n){
    let du='\\pu{'+addpause(deriv(fs)[1])+'}';
    let base='\\r{'+addpause(fs)+'}'
    n='\\g{\\p{'+n+'}}';
    let org=rp('\\i{'+du+'('+base+')^'+n+'}');
    let anti='\\p{\\frac{\\p{1}}{'+n+'\\p{+}\\p{1}}}\\p{\\r{u}}^{'+n+'\\p{+}\\p{1}}\\p{+C}';
    return{
        question:'Find $'+org+'$',
        steps:[
            '$$\\r{u}='+base+'$$',
            '$$\\b{du}=\\p{\\d{'+base+'}=}'+du+'\\,\\p{dx}$$',
            '$$'+org+'=\\p{\\int \\p{\\r{u}}^'+n+'\\,\\b{du}}$$',
            '$$'+org+'='+anti+'$$',
            '$$'+org+'='+anti.replaceAll('\\r{u}','('+base+')')+'$$'
        ]
    }
}



window.j = {
    startCollapsed: false,
    lessonNum: 14,
    lessonName: "U-substitution",
    intro: String.raw`<p>In this section,\p we will discuss three cases of $u$ substitution</p><ol><pli>$\i{(\put{something next to e})\cdot e^{\rt{a power}}}$</pli><pli>$\i{\frac{\put{numerator}}{\rt{denominator}}}$</pli><pli>$\i{\put{something in front of parentheses}\cdot(\rt{something inside of parentheses})^{\g{n}}}$</pli></ol>`,
    sections: [
    {
        name: String.raw`Usub for $\i{(\t{something next to e})\cdot e^{\t{a power}}}$`,
        backgroundColor: "green",
        web: "Hw 3: 1, 5-7, 9; Hw 4: 1-7, 11; Hw 5: 2, 5-7; PT 2: 1-6, 8; Hw 6: 4, 7, 9-10; PT 3: 8; Hw 9: 8, 10; PF: 4, 6, 10-12, 14-15",
        book: "148",
        exam: "Up to one question on Test 2, Up to one question on Final",
        intro: String.raw`In this section,\p we will calculate $\i{(\put{something next to e})\cdot e^{\rt{a power}}}$ using\p usub subtitution.`,
        rightColWidth: 90,
        steps: {
            general:{
                question:String.raw`Find $\i{(\put{something next to e})\cdot e^{\rt{a power}}}$`,
                steps:[
                    String.raw`Let $\r{u}=\p{\rt{the power of e}}$`,
                    String.raw`Calculate $\b{du}=\b{\p{\d{\p{\r{u}}}}\,\p{dx}}$</p><p>You should get $\b{du}=\p{(\put{the thing next to e})}\p{dx}$</p><p>In general,\p things may be more complicated,\p but not in this class.`,
                    String.raw`Replace\p $\rt{the power}$ with\p $\r{u}$\p and\p $(\put{the thing next to e})dx$ with\p $\b{du}$ to get\p $$\p{\int} \p{e}^{\p{\r{u}}}\,\p{\b{du}}$$`,
                    String.raw`Simplify\p $\ds\int e^{\r{u}}\,\b{du}$ to get\p $$\i{\t{original problem}}=\p{e}^{\p{\r{u}}}\p{+C}$$`,
                    String.raw`Substitute\p $\rt{the power}$ back in for\p $\r{u}$ to get\p $$\i{\t{original problem}}=\p{e}^{\p{\rt{the power}}}\p{+C}$$`
                ]
            },
            specific:eusubPow(4)
        },
        examples: [
            eusubPow(8),
            eusub('9x+4'),
            eusubPow(3),
            eusub('3x^4'),
            eusubPow(7),
            eusub('4x^3+5')
        ],
    },
    {
        name: String.raw`Usub for $\ie{a}{b}{\frac{\t{numerator}}{\t{denominator}}}$`,
        backgroundColor: "green",
        web: "Hw 3: 1, 5-7, 9; Hw 4: 1-7, 11; Hw 5: 2, 5-7; PT 2: 1-6, 8; Hw 6: 4, 7, 9-10; PT 3: 8; Hw 9: 8, 10; PF: 4, 6, 10-12, 14-15",
        book: "148",
        exam: "Up to one question on Test 2, Up to one question on Final",
        intro: String.raw`In this section, we will calculate $\iep{\g{a}}{\lb{b}}{\p{\frac{\p{\put{numerator}}}{\p{\rt{denominator}}}}}$\p using usub subtitution.`,
        rightColWidth: 90,
        steps: {
            general:{
                question:String.raw`Find $\i{\frac{\put{numerator}}{\rt{denominator}}}$`,
                steps:[
                    String.raw`Let $\r{u}=\p{\rt{the denominator}}$`,
                    String.raw`Calculate \p$\b{du}=\p{\b{\p{\d{\p{\r{u}}}}\,\p{dx}}}$</p><p>You should get\p $\b{du}=\p{(\put{the numerator})}\p{dx}$</p>`,//<p>In general,\\p things may be more complicated, but not in this class.`,
                    String.raw`Replace\p $\rt{the denominator}$ with\p $\r{u}$\p and\p $(\put{the numerator})dx$ with\p $\b{du}$ to get\p $$\int \p{\frac{\p{\b{du}}}{\p{\r{u}}}}$$`,
                    String.raw`Rewrite $$\p{\int}\p{ \frac{\p{\b{du}}}{\p{\r{u}}}}$$ as $$\p{\int} \p{\frac{\p{1}}{\p{\r{u}}}}\,\p{\b{du}}$$ using the property $$\p{\frac{\b{c}}{\r{d}}=}\p{\frac{\p{1}}{\p{\r{d}}}}\,\p{\b{c}}$$`,
                    String.raw`Simplify\p $\ds\int \frac{1}{\r{u}}\,\b{du}$\p to get\p $$\i{\t{original problem}}=\p{\ln(\p{\r{u}})}\p{+C}$$`,
                    String.raw`Substitute\p $\rt{the denominator}$\p back in for\p $\r{u}$ to get\p $$\i{\t{original problem}}=\p{\ln(\p{\rt{the denominator}})}\p{+C}$$`,
                    String.raw`Use the anti-derivative to get\p $$\ie{\g{a}}{\lb{b}}{\t{original problem}}=\p{\ln(\p{\rt{denominator}})}\evp{\g{a}}{\lb{b}}$$`,
                    String.raw`Plug in\p $\g{a}$ \pand $\lb{b}$\p and\p subtract to find\p $$\ie{\g{a}}{\lb{b}}{\t{original problem}}$$`
                ]
            },
            specific:fracusub('x^5+3x',1,3)
        },
        examples: [
            fracusub('9x^4+2x^2',1,5),
            fracusub('3x^2+4',0,2),
            fracusub('x^3+1',-1,4),
            fracusub('3x^2+x',1,2),
            fracusub('9x+4',2,4),
            fracusub('x^3-x',3,6)
        ],
    },
    {
        name: String.raw`Usub for $\i{\t{something in front of parentheses}\cdot(\t{something inside of parentheses})^{n}}$`,
        backgroundColor: "green",
        web: "Hw 3: 1, 5-7, 9; Hw 4: 1-7, 11; Hw 5: 2, 5-7; PT 2: 1-6, 8; Hw 6: 4, 7, 9-10; PT 3: 8; Hw 9: 8, 10; PF: 4, 6, 10-12, 14-15",
        book: "148",
        exam: "Up to one question on Test 2, Up to one question on Final",
        intro: String.raw`In this section,\p we will calculate $\i{\p{\put{something in front of parentheses}}\p{\cdot}\p{(\rt{something inside of parentheses})}^{\p{\g{n}}}}$\p using usub subtitution.`,
        rightColWidth: 90,
        steps: {
            general:{
                question:String.raw`Find $\i{\put{something in front of parentheses}\cdot(\rt{something inside of parentheses})^{\g{n}}}$`,
                steps:[
                    String.raw`Let $\r{u}=\p{\rt{the thing inside of parentheses}}$`,
                    String.raw`Calculate \p$\b{du}=\p{\b{\p{\d{\p{\r{u}}}}\,\p{dx}}}$</p><p>You should get\p $\b{du}=\p{(\put{the thing inside of the parentheses})}\p{dx}$</p>`,
                    // String.raw`Solve for $\go{dx}$ by dividing both sides by $\b{\d{\r{u}}}$</p><p>You should get $$\go{dx}=\frac{du}{\b{\d{\r{u}}}}$$`,
                    // String.raw`Replace $\rt{the thing inside of parentheses}$ with $\r{u}$ and $\go{dx}$ with $\frac{du}{\b{\d{\r{u}}}}$ to get $$\int \put{thing in front of parentheses}(\r{u})^{\g{n}}\,\frac{du}{\b{\d{\r{u}}}}$$`,
                    String.raw`Replace\p $\rt{the power}$ with\p $\r{u}$\p and\p $(\put{the thing next to the parentheses})dx$ with\p $\b{du}$ to get\p $$\p{\int} \p{\r{u}}^{\p{\g{n}}}\,\p{\b{du}}$$`,
                    // String.raw`Cancel out a factor of $t$ to get $\ds\int(\pkt{a number})\r{u}^{\g{n}}du$`,
                    String.raw`Simplify the integral to get\p $$\i{\t{original problem}}=\p{\frac{\p{1}}{\p{\g{n}}\p{+}\p{1}}}\p{\r{u}}^{\p{n}\p{+}\p{1}}\p{+C}$$`,
                    String.raw`Substitute $\rt{the thing inside of parentheses}$ back in for\p $\r{u}$ to get\p$$\i{\t{original problem}}=\p{\frac{\p{1}}{\p{\g{n}}\p{+}\p{1}}}\p{(\rt{the thing inside of parentheses})}^{\p{\g{n}\p{+}\p{1}}}\p{+C}$$`,
                ]
            },
            specific:powusub('x^3+1',2)
        },
        examples: [
            powusub('x^3+1',2),
            powusub('8x+2',4),
            powusub('9x^2+2x',-2),
            powusub('x^2-1',4),
            powusub('x-3',6),
            powusub('2x^4-3x^3',5)
        ],
    },
    {
        name: String.raw`Usub for $\i{\t{something in front of parentheses}\cdot(\t{something inside of parentheses})^{n}}$ Part 2`,
        backgroundColor: "green",
        web: "Hw 3: 1, 5-7, 9; Hw 4: 1-7, 11; Hw 5: 2, 5-7; PT 2: 1-6, 8; Hw 6: 4, 7, 9-10; PT 3: 8; Hw 9: 8, 10; PF: 4, 6, 10-12, 14-15",
        book: "148",
        exam: "Up to one question on Test 2, Up to one question on Final",
        intro: String.raw`In this section, we will calculate $\i{\put{something in front of parentheses}\cdot(\rt{something inside of parentheses})^{\g{n}}}$ using usub subtitution.`,
        rightColWidth: 90,
        steps: {
            general:{
                question:String.raw`Find $\i{\put{something in front of parentheses}\cdot(\rt{something inside of parentheses})^{\g{n}}}$`,
                steps:[
                    String.raw`Let $\r{u}=\rt{the thing inside of parentheses}$`,
                    String.raw`Calculate $du=\b{\d{\r{u}}\,\go{dx}}$`,
                    String.raw`Solve for $\go{dx}$ by dividing both sides by $\b{\d{\r{u}}}$</p><p>You should get $$\go{dx}=\frac{du}{\b{\d{\r{u}}}}$$`,
                    String.raw`Replace $\rt{the thing inside of parentheses}$ with $\r{u}$ and $\go{dx}$ with $\frac{du}{\b{\d{\r{u}}}}$ to get $$\int \put{thing in front of parentheses}(\r{u})^{\g{n}}\,\frac{du}{\b{\d{\r{u}}}}$$`,
                    String.raw`Cancel out a factor of $t$ to get $\ds\int(\pkt{a number})\r{u}^{\g{n}}du$`,
                    String.raw`Simplify the integral to get $$\i{\t{original problem}}=\left(\frac{(\pkt{the number})}{\g{n}+1}\right)(\r{u})^{n+1}+C$$`,
                    String.raw`Substitute $\rt{the thing inside of parentheses}$ back in for $\r{u}$ to get that $$\i{\t{original problem}}=\left(\frac{(\pkt{the number})}{\g{n}+1}\right)(\rt{the thing inside of parentheses})^{n+1}+C$$`,
                ]
            },
            specific:powusubSpecial(2,5,3)
        },
        examples: [
            // powusub(4,8,5),
            // powusub(6,3,8),
            // powusub(3,4,7)
        ],
    }
    ],
  }