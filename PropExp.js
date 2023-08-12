onepowwk=function(a){
    return `$\\p{\\r{`+a+`}}^{\\p{\\b{1}}}\\p{=}\\p{\\r{`+a+`}}$`
}
onepowrevwk=function(a){
    return `$\\p{\\r{`+a+`}}\\p{=}\\p{\\r{`+a+`}}^{\\p{\\b{1}}}$`
}
zeropowwk=function(a){
    return `$\\p{`+a+`}^{\\p{\\b{0}}}\\p{=}\\p{\\r{1}}$`
}
sqrtrewritewk=function(a){
    return '$\\p{\\b{\\sqrt{\\p{\\r{'+a+'}}}}}\\p{=}\\p{\\r{'+a+'}}^{\\p{\\b{1/2}}}$';
}
sqrtrewritewkn=function(a,n){
    return '$\\p{\\b{\\sqrt[\\go{'+n+'}]{\\p{\\r{'+a+'}}}}}\\p{=}\\p{\\r{'+a+'}}^{\\b{\\p{1}\\p{/}\\p{\\go{'+n+'}}}}$';
}
sqrtrewritewkp=function(a){
    return '$\\p{\\b{\\sqrt{\\p{\\r{'+a+'}}}}}\\p{=}\\p{(\\r{'+a+'})}^{\\p{\\b{1/2}}}$';
}
negpowhelper=function(c,a,n){
    a='\\r{'+a+'}';
    c='\\b{'+c+'}';
    n='\\b{'+n+'}';
    return ['\\p{\\go{\\frac{\\p{'+c+'}}{\\p{'+a+'}^\\p{'+n+'}}}}','\\p{'+c+'}\\p{'+a+'}^'+'{\\p{\\go{-}}\\p{'+n+'}}']
}

negpowwk=function(c,a,n){
    strs=negpowhelper(c,a,n)
    return '$'+strs[0]+'\\p{=}'+strs[1]+'$'
}

negpowk2=function(c,a,n,str){
    let strs=negpowhelper(c,a,n)
    a='\\r{'+a+'}';
    c='\\b{'+c+'}';
    n='\\b{'+n+'}';
    return '$$\\begin{aligned}'+str+'&\\p{=}'+'\\p{\\r{\\frac{\\p{'+c+'}}{\\p{'+a+'}^{\\p{'+n+'}}}}\\\\[10pt]&='+strs[1]+'\\end{aligned}$$'
}
prodwk=function(c,a,n,m){
    a='\\r{'+a+'}';
    n='\\b{'+n+'}';
    m='\\go{'+m+'}';
    c=coef(c);
    return '$\\p{'+c+'}\\p{'+a+'}^{\\p{'+n+'}}\\p{'+a+'}^\\p{'+m+'}\\p{=}\\p{'+c+'}\\p{'+a+'}^{\\p{'+n+'}\\p{+}\\p{'+m+'}}$'
}
quowkhelper=function(a,n,m){
    a='\\r{'+a+'}';
    let p=n-m;
    n='\\b{'+n+'}';
    m='\\go{'+m+'}';
    return ['\\p{\\frac{\\p{'+a+'}^{\\p{'+n+'}}}{\\p{'+a+'}^\\p{'+m+'}}}','\\p{'+a+'}^{\\p{'+n+'}\\p{-}\\p{'+m+'}}','\\p{'+a+'}^{\\p{'+p+'}}'];
}
quowk=function(a,n,m){
    let strs=quowkhelper(a,n,m);
    return '$'+strs[0]+'\\p{=}'+strs[1]+'$';
}
quowk2s=function(a,n,m){
    let strs=quowkhelper(a,n,m);
    return '$$\\begin{aligned}'+strs[0]+'&\\p{=}'+strs[1]+'\\\\[7pt]&\\p{=}'+strs[2]+'\\end{aligned}$$'
}
prodwk2c=function(c,d,a,n,m){
    a='\\r{'+a+'}';
    n='\\b{'+n+'}';
    m='\\go{'+m+'}';
    let e=coef(c*d);
    c=coef(c);
    d=coef(d);
    return '$\\p{'+c+'}\\p{'+a+'}^\\p{'+n+'}\\p{(}\\p{'+d+'}{\\p{'+a+'}}^\\p{'+m+'}\\p{)}\\p{=}\\p{'+e+'}\\p{'+a+'}^{\\p{'+n+'}\\p{+}\\p{'+m+'}}$'
}
coef=function(c){
    if(c==1){
        return '';
    }
    return c==-1?'-':c;
}
pow1=function(c){
    //return c==1?'':'^{'+c+'}';
    return '^{\\p{'+c+'}}';
}
doubleexpwk=function(a,n,m){
    a='\\r{'+a+'}';
    n='\\b{'+n+'}';
    m='\\go{'+m+'}';
    return '$\\p{(}\\p{'+a+'}^\\p{'+n+'}\\p{)}^\\p{'+m+'}\\p{=}\\p{'+a+'}^{\\p{(\\p{'+n+'})}\\p{(\\p{'+m+'})}}$'
}
distexpwk=function(a,b,n){
    a='\\r{'+a+'}';
    b='\\b{'+b+'}';
    n='\\go{'+n+'}';
    return '$\\p{(}\\p{'+a+'}\\p{'+b+'}\\p{)}^\\p{'+n+'}\\p{=}\\p{'+a+'}^{\\p{'+n+'}}\\p{'+b+'}^{\\p{'+n+'}}$'
}
distexp4wk=function(c,a,b,d,n){
    a='\\r{'+a+'}';
    b='\\b{'+b+'}';
    d='\\b{'+d+'}';
    n='\\go{'+n+'}';
    c='\\lb{'+c+'}'
    return '$\\p{(}\\p{'+c+'}\\p{'+a+'}\\p{'+b+'}\\p{'+d+'}\\p{'+')}^\\p{'+n+'}\\p{=}\\p{'+c+'}^{\\p{'+n+'}}\\p{'+a+'}^{\\p{'+n+'}}\\p{'+b+'}^{\\p{'+n+'}}\\p{'+d+'}^{\\p{'+n+'}}$'
}
distexp4wkp=function(c,a,b,d,n){
    a='\\r{'+a+'}';
    b='\\b{'+b+'}';
    d='\\b{'+d+'}';
    n='\\go{'+n+'}';
    c='\\lb{'+c+'}'
    return ['\\p{(}'+'\\p{'+c+'}\\p{'+a+'}\\p{'+b+'}\\p{'+d+'\\p{)}^\\p{'+n+'}','\\p{('+c+')}^{\\p{('+n+')}}\\p{('+a+')}^{\\p{'+n+'}}\\p{('+b+')}^{\\p{'+n+'}}\\p{('+d+')}^{\\p{'+n+'}}']
}
doubledistexp=function(c,n,m,p,q){
    let ns=[Math.pow(c,q),n*q,m*q,p*q]
    let strs=['\\p{(}\\p{'+c+'}\\p{x}^{\\p{'+n+'}}\\p{y}^{\\p{'+m+'}}\\p{z}^{\\p{'+p+'}}'+'\\p{)}^{\\p{'+q+'}}','\\p{('+c+')}^{\\p{'+q+'}}\\p{(x^{'+n+'})}^{\\p{'+q+'}}\\p{(y^{'+m+'})}^{\\p{'+q+'}}\\p{(z^{'+p+'})}^{\\p{'+q+'}}\\\\[4pt]','\\p{'+ns[0]+'}\\p{x}^{\\p{('+n+')}\\p{('+q+')}}\\p{y}^{\\p{('+m+')}\\p{('+q+')}}\\p{z}^{\\p{('+p+')}\\p{('+q+')}}\\\\[4pt]&\\p{=}\\p{'+ns[0]+'}\\p{x}^{\\p{'+ns[1]+'}}\\p{y}^{\\p{'+ns[2]+'}}\\p{z}^{\\p{'+ns[3]+'}}']
    return {
        question:'Simplify $('+c+'x^{'+n+'}y^{'+m+'}z^{'+p+'})^'+q+'$',
        steps:[
            '$$'+strs[0]+'\\p{=}'+strs[1]+'$$',
            '$$\\begin{aligned}'+strs[0]+'&\\p{=}'+strs[2]+'\\end{aligned}$$'
        ]
    }
}
sqrtcan=function(a){
    return '$\\p{(}\\p{\\b{\\sqrt{\\r{'+a+'}}}}\\p{)}^\\p{\\b{2}}\\p{=}\\p{\\r{'+a+'}}$'
}

window.j = {
    startCollapsed: false,
    lessonNum: 13,
    lessonName: "Properties of Exponents",
    intro: String.raw`<p>In this lecture, we will review properties of exponents</p><table><tr><th>Property</th><th>Example 1</th><th>Example 2</th><th>Description of Property</th></tr><tr><td>`+onepowwk('a')+`</td><td>`+onepowwk('2')+`</td><td>`+onepowwk('x')+`</td><td><span><span class="invisible">Anything to the first power is </span><span class="invisible">itself</span></span></td></tr><tr><td>`+zeropowwk('a')+`</td><td>`+zeropowwk('2')+`</td><td>`+zeropowwk('(-3)')+`</td><td><span><span class="invisible">Anything to the zero power is</span><span class="invisible"> one</span></span></td></tr><tr><td>`+sqrtrewritewk('a')+`</td><td>`+sqrtrewritewk('x')+`</td><td>`+sqrtrewritewkp('x+1')+`</td><td><span><span class="invisible">You can rewrite a square root as</span><span class="invisible"> a one-half power</span></span></td></tr><tr><td>`+sqrtrewritewkn('a','n')+`</td><td>`+sqrtrewritewkn('x','4')+`</td><td>`+sqrtrewritewkn('t','3')+`</td><td><span><span class="invisible">You can rewrite an nth root as </span><span class="invisible"> a one over n power</span></span></td></tr><tr><td>`+negpowwk('c','a','n')+`</td><td>`+negpowwk('3','x','2')+`</td><td>`+negpowwk('4','x','1/2')+`</td><td><span><span class="invisible">You can move a denominator out of a fraction by</span><span class="invisible"> negating its power</span></span></td></tr><tr><td>`+prodwk('1','a','n','m')+`</td><td>`+prodwk(3,'x',4,1)+`</td><td>`+prodwk2c(-2,4,'t',2,3)+`</td><td><span><span class="invisible">When two elements with the same base are multiplied you</span><span class="invisible"> add the exponents</span></span></td></tr><tr><td>`+quowk('a','n','m')+`</td><td>`+quowk('x',5,2)+`</td><td>`+quowk('t',1,4)+`</td><td><span><span class="invisible">When two elements with the same base are divided you</span><span class="invisible"> subtract the exponents</span></span></td></tr><tr><td>`+doubleexpwk('a','n','m')+`</td><td>`+doubleexpwk('x',3,6)+`</td><td>`+doubleexpwk('y',2,-1)+`</td><td><span><span class="invisible">When an exponent is inside of another exponent</span><span class="invisible"> multiply the exponents</span></span></td></tr><tr><td>`+distexpwk('a','b','n')+`</td><td>`+distexpwk('x','y','-2')+`</td><td>`+distexp4wk(2,'x','y','z',-2)+`</td><td><span><span class="invisible">When there are multiple factors inside of an exponent</span><span class="invisible"> raise each factor to that exponent</span></span></tr><tr><td>`+sqrtcan('a')+`</td><td>`+sqrtcan('x')+`</td><td>`+sqrtcan('x-4')+`</td></td><td><span><span class="invisible">The square of a square root of something is</span><span class="invisible"> itself</span></span></tr></table>`,
    sections: [
        {
            name: String.raw`Rewrite Expressions as Powers`,
            intro: String.raw`<p>In this section, we will use properties of exponents to rewrite roots and fractions as powers</p>`,
            rightColWidth: 90,
            steps: {
                general:{
                    question:String.raw`Rewrite roots and fractions as powers`,
                    //String.raw`<p>Simplify $\rt{\{an equation\}}^{\b{1}}$</p>`
                    steps:[
                        String.raw`<p>If needed, use the following properties</p><ol><pli>$\p{\r{a}}\p{=}\p{\r{a}}^{\p{\b{1}}}$</pli><pli>`+sqrtrewritewk('a')+`</pli><pli>`+sqrtrewritewkn('a','n')+`</pli></ol>`,
                        String.raw`<p>If needed, use the property </p><p>$`+negpowwk('c','a','n')+`$</p>`,
                    ]
                },
                specific: {
                    question:'Rewrite roots and fractions as powers$$3+\\sqrt{x+1}+\\frac{4}{\\sqrt[3]{x}}$$',
                    steps: ['$$3+\\b{\\sqrt{\\r{x+1}}}+\\frac{4}{\\b{\\sqrt[\\go{3}]{\\r{x}}}}=\\bb{3+\\b{(\\r{x+1})^\\powfrac{1}{2}}+\\frac{4}{\\r{x}^{\\b{\\powfrac{1}{\\go{3}}}}}}$$','$$3+(x+1)^\\powfrac{1}{2}+\\go{\\frac{\\b{4}}{\\r{x}^{\\b{\\powfrac{1}{3}}}}}=3+\\b{(\\r{x+1})^\\powfrac{1}{2}}+\\bb{\\b{4}\\r{x}^{\\go{-}\\b{\\powfrac{1}{3}}}}$$']
                }
                // specific: {
                //     question:'Rewrite $x$ as $x^{\\t{a power}}$',
                //     steps: [onepowrevwk('x'),'']
                // }
            },
            examples: [
                {
                    question:'Rewrite $\\sqrt{2x+1}$ without a root',
                    steps: [sqrtrewritewkp('2x+1'),'']
                },
                {
                    question:'Rewrite $\\sqrt{2x+1}$ without a root',
                    steps: [sqrtrewritewkp('2x+1'),'']
                },
                {
                    question:'Rewrite $\\sqrt[3]{x}$ without a root',
                    steps: [sqrtrewritewkn('x',3),'']
                },
                {
                    question:'Rewrite $\\frac{3}{x^4}$ without a fraction',
                    steps: ['',negpowwk('3','x','4')]
                },
                {
                    question:'Rewrite $\\frac{1}{\\sqrt{x+4}}$ without a fraction or root',
                    steps: ['$$\\frac{1}{\\b{\\sqrt{\\r{x+4}}}}=\\p{\\frac{\\p{1}}{\\p{(\\r{x+4})}^{\\p{\\b{1/2}}}}}$$','$$\\frac{1}{\\b{\\sqrt{\\r{x+4}}}}=\\p{1}\\p{(\\r{x+4})^{\\p{\\go{-}}\\p{\\b{1/2}}}}$$']
                },
                {
                    question:'Rewrite $\\frac{5}{\\sqrt[4]{x}}$ without a fraction or root',
                    steps: ['$$\\frac{5}{\\b{\\sqrt[\\go{4}]{\\r{x}}}}=\\p{\\frac{\\p{5}}{\\p{\\r{x}}^{\\p{\\b{1/\\go{4}}}}}}$$','$$\\frac{5}{\\b{\\sqrt[4]{\\r{x}}}}=\\p{5}\\p{x}^{\\p{-}\\p{1/4}}$$']
                },
            ],
        },
        {
            name: String.raw`Simplify Equations Using Properties of Exponents`,
            intro: String.raw`<p>In this section, we will list the properties of exponents to simplify</p>`,
            rightColWidth: 90,
            steps: {
                general:{
                    question:String.raw`Rewrite $\rt{\{an equation\}}$ as $\rt{\{another equation\}}^{\bt{a power}}$`,
                    //String.raw`<p>Simplify $\rt{\{an equation\}}^{\b{1}}$</p>`
                    steps:[
                        String.raw`<p>If needed, use the following properties</p><ol><pli>`+prodwk('1','a','n','m')+`</pli><pli>`+quowk('a','n','m')+`</pli><pli>`+distexpwk('a','b','n')+`</pli></ol><p>You may use need to combine these properties with the property $\\r{a}=\\p{\\r{a}}^{\\p{\\b{1}}}$</p>`,
                        String.raw`<p>If needed, use the property </p><p>$`+doubleexpwk('a','n','m')+`$</p>`,
                    ]
                },
                specific: {
                    question:'Simplify $\\frac{x^3}{x^7}$',
                    steps: [quowk2s('x',3,7),'']
                }
            },
            examples: [
                {
                    question:'Simplify $(x^2)(3x)$',
                    steps: ['$$\\begin{aligned}x^2(3x)&=\\p{\\r{x}}^{\\p{\\b{2}}}\\p{(\\p{3}\\p{\\r{x}}^{\\p{\\go{1}}})}\\\\[4pt]&\\p{=}\\p{3}\\p{\\r{x}}^{\\p{\\b{2}}\\p{+}\\p{\\go{1}}}\\\\[4pt]&\\p{=}\\p{3}\\p{x}^{\\p{3}}\\end{aligned}$$','']
                },
                // {
                //     question:'Simplify $(2x)(3x)$',
                //     steps: ['$$\\begin{aligned}(2x)(3x)&=\\p{(2\\p{\\r{x}}^{\\p{\\b{1}}})}\\p{(\\p{3}\\p{\\r{x}}^{\\p{\\go{1}}})}\\\\[4pt]&\\p{=}\\p{6}\\p{\\r{x}}^{\\p{\\b{1}}\\p{+}\\p{\\go{1}}}\\\\[4pt]&\\p{=}\\p{6}\\p{x}^{\\p{2}}\\end{aligned}$$','']
                // },
                doubledistexp(-2,4,-5,8,2),
                // {
                //     question:'Simplify $$x^2\\left(\\frac{3}{x}\\right)$$',
                //     steps: ['$$\\begin{aligned}x^2\\left(\\frac{3}{x}\\right)&=3\\left(\\frac{\\r{x}^{\\b{2}}}{\\r{x}^{\\go{1}}}\\right)\\\\[7pt]&=3\\r{x}^{\\b{2}-\\go{1}}\\\\[4pt]&=3\\r{x}^{\\b{1}}\\\\[4pt]&=3\\r{x}\\end{aligned}$$','']
                // },
                doubledistexp(5,3,-4,9,2),
                doubledistexp(3,2,3,-2,4),
            ],
        },
    ],
}