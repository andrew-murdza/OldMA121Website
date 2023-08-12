rounddigits=function(t,n){
    let s=Math.ceil(Math.log10(Math.abs(t)));
    let a=Math.pow(10,n-s);
    return Math.round(t*a)/a;
}
quadform=function(a,b,c){
    return '\\p{\\frac{\\p{-}\\p{\\b{'+b+'}}\\p{\\pm}\\p{\\sqrt{\\p{\\b{'+b+'}}^\\p{2}\\p{-}\\p{4}\\p{\\r{'+a+'}}\\p{\\go{'+c+'}}}}}{\\p{2}\\p{\\r{'+a+'}}}}'
}
quad=function(a,b,c){
    return ('\\r{'+a+'}x^2+\\b{'+b+'}x+\\go{'+c+'}').replaceAll('+\\b{-','\\b{-').replaceAll('+\\go{-','\\go{-')
}
quadformexEqSol=function(a,b,c){
    let str='\\t{no solution}'
    if(Math.pow(b,2)-4*a*c>=0){
        let x1=rounddigits((-b+Math.sqrt(Math.pow(b,2)-4*a*c))/(2*a),3);
        let x2=rounddigits((-b-Math.sqrt(Math.pow(b,2)-4*a*c))/(2*a),3);
        str='\\p{'+x1+'}\\p{,\\ }\\p{'+x2+'}';
    }
    let str1='$$'+quad(a,b,c)+'\\p{=}\\p{0}$$'
    return{
        question:'Solve $'+quadNum(a,b,c)+'=0$',
        steps:['','','','','','',str1+'$$\\begin{aligned}\\p{x}&\\p{=}\\p{\\frac{\\p{-}\\p{\\b{b}}\\p{\\pm}\\p{\\sqrt{\\p{\\b{b}}^\\p{2}\\p{-}\\p{4}\\p{\\r{a}}\\p{\\go{c}}}}}{\\p{2}\\p{\\r{a}}}}\\\\[10pt]&\\p{=}'+quadform('('+a+')','('+b+')','('+c+')')+'\\\\[7pt]&\\p{=}'+str+'\\end{aligned}$$','']
    }
}
findFactors=function(c){
    let c1=Math.abs(c);
    let returnList=[];
    if(c1==0){
        returnList.push([0,1]);
    }
    for(let i=1;i<=Math.sqrt(c1);i++) {
        if (c1 % i == 0) {
            if (c < 0) {
                returnList.push([c1 / i, -i]);
                returnList.push([-c1 / i, i]);
            } else {
                returnList.push([c1 / i, i]);
                returnList.push([-c1 / i, -i]);
            }
        }
    }
    return returnList;
}
factorMonicQuadVal=function(b,c){
    if(c==0){
        return [0,b];
    }
    let list=findFactors(c);
    for(let i=0;i<list.length;i++){
        if(list[i][0]+list[i][1]==b){
            return list[i];
        }
    }
    return null;
}

factorMonicQuad=function(b,c){
    let list=factorMonicQuadVal(b,c);
    return ('\\p{(}'+convertFactor(list[0])+'\\p{)}\\p{(}'+convertFactor(list[1])+'\\p{)}').replaceAll('\\p{(}\\p{x}\\p{)}','\\p{x}')
}

factorMonicQuadFactors=function(b,c){
    let list=factorMonicQuadVal(b,c);
    return [convertFactor(list[0]),convertFactor(list[1])];
}
convertFactor=function(x0,str){
    if(x0<0){
        return '\\p{x}\\p{-'+(-x0)+'}';
    }
    if(x0>0){
        return '\\p{x}\\p{+}\\p{'+x0+'}';
    }
    return '\\p{x}';
}
factorQuad=function(a,b,c){
    if(a==1){
        return factorMonicQuad(b,c);
    }
    if(b%a==0&&c%a==0){
        let b1=b/a;
        let c1=c/a;
        let q=factorMonicQuad(b1,c1);
        if(q==null){
            return '\\p{'+a+'}\\p{(}'+quadNum(1,b1,c1)+'\\p{)}';
        }
        return coef(a)+q;
    }
    return null;
}
coef=function(a){
    if(a==1){
        return '';
    }
    return a==-1?'\\p{-}':'\\p{'+a+'}';
}
quadNum=function(a,b,c){
    let str=('\\p{'+a+'}\\p{x}^\\p{2}\\p{+}\\p{'+b+'}\\p{x}\\p{+}\\p{'+c+'}').replaceAll('\\p{0}\\p{x}^\\p{2}\\p{+}\\p{0}\\p{x}\\p{+}','')
    str=str.replaceAll('\\p{0}\\p{x}^\\p{2}\\p{+}','')
    str=str.replaceAll('\\p{0}\\p{x}\\p{+}','').replaceAll('\\p{1}\\p{x}','\\p{x}');
    str=str.replaceAll('\\p{+}\\p{-','\\p{-').replaceAll('\\p{+}\\p{0}','');
    return str==''?'\\p{0}':str;
}
linstr=function(a,b){
    return quadNum(0,a,b);
    // let str=(a+'x+'+b).replaceAll('+-','-').replaceAll('+0','');
    // str=str.replaceAll('1x','x');
    // return str==''?'0':str;
}
lineqzero=function(a,b){
    let str='$$\\begin{aligned}'+linstr(a,b)+'&\\p{=}\\p{0}\\\\[4pt]\\p{x}&\\p{=}\\p{'+(-b/a)+'}\\end{aligned}$$';
    if(a!=1&&a!=0&&b!=0){
        str='$$\\begin{aligned}'+linstr(a,b)+'&\\p{=}\\p{0}\\\\[4pt]\\p{'+a+'}\\p{x}&\\p{=}\\p{'+(-b)+'}\\\\[4pt]\\p{x}&\\p{=}\\p{'+(-b/a)+'}\\end{aligned}$$'
    }
    return {
        question:'Solve $'+linstr(a,b)+'=0$',
        steps:['','','','','',str,'','']
    }
}
zerosquadfactor=function(a,b,c){
    if(a==0){
        return lineqzero(b,c);
    }
    let list=factorSolveWork(a,b,c);
    if(list==null){
        return quadformexEqSol(a,b,c);
    }
    return{
        question:'Solve $'+quadNum(a,b,c)+'=0$',
        steps:['','','','','','',list[0],'$$\\begin{aligned}'+list[1]+'\\end{aligned}$$']
    }
}

quadNumSolve=function(a,b,c,f){
    let strs=['\\p{\\frac{'+quadNum(a,b,c)+'}{\\p{'+f+'}}}','\\p{=}\\p{0}']
    let stepList=zerosquadfactor(a,b,c).steps;
    stepList[2]='$$\\begin{aligned}'+strs[0]+'&'+strs[1]+'\\\\[10pt]\\left('+strs[0]+'\\right)\\p{'+f+'}&\\p{=}\\p{0}\\p{'+f+'}\\\\[7pt]'+quadNum(a,b,c)+'&\\p{=}\\p{0}\\end{aligned}$$'
    return{
        question:'Solve $'+strs[0]+strs[1]+'$',
        steps:stepList
    }
}
factorSolveWork=function(a,b,c){
    let q=factorQuad(a,b,c);
    if(q==null||b%a!=0||c%a!=0){
        return null;
    }
    let b1=b/a;
    let c1=c/a;
    let strs=['$$\\begin{aligned}'+quadNum(a,b,c)+'&\\p{=}\\p{0}\\\\[4pt]','&\\p{=}\\p{0}\\end{aligned}$$'];
    if(a!=1&&c!=0){
        strs[0]=strs[0]+coef(a)+'\\p{(}'+quadNum(1,b1,c1)+'\\p{)}&\\p{=}\\p{0}\\\\[4pt]';
    }
    let list=factorMonicQuadFactors(b1,c1);
    let list1=factorMonicQuadVal(b1,c1);
    return [strs[0]+q+strs[1],list[0]+'&\\p{=}\\p{0}\\p{,\\ }'+list[1]+'\\p{=}\\p{0}\\\\[4pt]\\p{x}&\\p{=}\\p{'+(-list1[0])+'}\\p{, \\ }\\p{'+(-list1[1])+'}'];
}
linEqSolve=function(b1,c1,b2,c2){
    let strs1=[linstr(b1,c1),'='+linstr(b2,c2)];
    let start='$$\\begin{aligned}'+strs1[0]+'&'+strs1[1]+'\\\\[4pt]';
    let end='\\end{aligned}$$';
    let b3=Math.abs(b2-b1);
    let c3=-(c2-c1)*Math.sign(b2-b1);
    if(c1!=0&&c2!=0||b1!=0&&b2!=0){
        let str2='';
        let str=start+'\\p{'+b3+'}\\p{x}&\\p{=}\\p{'+c3+'}'+end;
        if(b3!=1){
            str2='$\\p{x}\\p{=}\\p{'+(c3/b3)+'}$';
        }
        return {
            question: 'Solve $'+strs1[0]+strs1[1]+'$',
            steps:['','','','',str,str2,'','']
        }
    }
    else if(c1!=0&&b1!=0||c2!=0&&b2!=0){
        let b3=Math.abs(b2-b1);
        let c3=-(c2-c1)*Math.sign(b2-b1);
        let str=start+b3+'\\p{x}&\\p{=}\\p{'+c3+'}'+(b3!=1?'\\\\[4pt]\\p{x}&\\p{=}\\p{'+(c3/b3)+'}':'')+end;
        return {
            question: 'Solve $'+strs1[0]+strs1[1]+'$',
            steps:['','','','','',str,'','']
        }
    }
    else {
        let str=start+(b3!=1?'\\p{x}&\\p{=}\\p{'+(c3/b3)+'}':'')+end;
        return {
            question: 'Solve $'+strs1[0]+strs1[1]+'$',
            steps:['','','','','',str,'','']
        }
    }
}

distAndSolve=function(a,b,c,d){
    let str0=d<0?'\\p{'+d+'}':'\\p{+}'+'\\p{'+d+'}';
    let str='\\p{(}\\p{x}'+str0+'\\p{)}';
    let strs=[quadNum(a,b,c),'\\p{=}'+str+'^\\p{2}'.replaceAll('\\p{+}\\p{-','\\p{-'),'\\p{x}^\\p{2}'+str0+'\\p{x}'+str0+'\\p{x}\\p{+}\\p{'+Math.pow(d,2)+'}']
    let strEx='$$\\begin{aligned}'+strs[0]+'&'+strs[1]+'\\\\[4pt]'+strs[0]+'&\\p{=}'+str+str+'\\\\[4pt]'+strs[0]+'&\\p{=}'+strs[2]+'\\end{aligned}$$'
    let stepList=quadEqSolve(a,b,c,1,2*d,Math.pow(d,2)).steps;
    stepList[3]=strEx;
    return{
        question:'Solve $'+strs[0]+strs[1]+'$',
        steps:stepList
    }
}

fracSolve=function(a,b){
    return{
        question:'Solve $'+a+'x-'+b+'x^{-2}=0$',
        steps:[
            '','$\\p{'+a+'}\\p{x}\\p{-}\\p{\\frac{\\p{'+b+'}}{\\p{x}^\\p{2}}}\\p{=}\\p{0}$',
            '$$\\begin{aligned}\\p{x}^\\p{2}\\p{(}\\p{'+a+'}\\p{x}\\p{)}\\p{-}\\p{x}^\\p{2}\\p{\\left(\\p{\\frac{\\p{'+b+'}}{\\p{x}^\\p{2}}}\\right)}&\\p{=}\\p{x}^\\p{2}\\p{(0)}\\\\[7pt]\\p{'+a+'}\\p{x}^\\p{3}\\p{-}\\p{'+b+'}&\\p{=}\\p{0}\\end{aligned}$$',
            '','$$\\begin{aligned}\\p{'+a+'}\\p{x}^\\p{3}\\p{-}\\p{'+b+'}&\\p{=}\\p{0}\\\\[4pt]\\p{'+a+'}\\p{x}^\\p{3}&\\p{=}\\p{'+b+'}\\\\[4pt]\\p{x}^\\p{3}&\\p{=}\\p{'+(b/a)+'}\\\\[10pt]\\p{x}&\\p{=}\\p{'+rounddigits(Math.pow(b/a,1/3),6)+'}\\end{aligned}$$',
            '',''
        ]
    }
}

quadEqSolve=function(a1,b1,c1,a2,b2,c2){
    if(a1==0&&a2==0){
        return linEqSolve(b1,c1,b2,c2);
    }
    if(a2==0&&b2==0&&c2==0){
        return zerosquadfactor(a1,b1,c1);
    }
    if(a1==0&&b1==0&&b1==0){
        return zerosquadfactor(a2,b2,c2);
    }
    let strs1=[quadNum(a1,b1,c1),'\\p{=}'+quadNum(a2,b2,c2)];
    let a3=Math.abs(a2-a1);
    let start='$$\\begin{aligned}'+strs1[0]+'&'+strs1[1]+'\\\\[4pt]';
    let end='\\end{aligned}$$';
    if(a3==0){
        let b3=Math.abs(b2-b1);
        let c3=-(c2-c1)*Math.sign(b2-b1);
        let str2='';
        let str=start+'\\p{'+b3+'}\\p{x}&\\p{=}\\p{'+c3+'}'+end;
        if(b3!=1){
            str2='$\\p{x}\\p{=}\\p{'+(c3/b3)+'}$';
        }
        return {
            question: 'Solve $'+strs1[0]+strs1[1]+'$',
            steps:['','','','',str,str2,'','']
        }
    }
    let b3=(b2-b1)*Math.sign(a2-a1);
    let c3=(c2-c1)*Math.sign(a2-a1);
    let strs=factorSolveWork(a3,b3,c3);
    return {
        question: 'Solve $'+strs1[0]+strs1[1]+'$',
        steps:['','','','',start+quadNum(a3,b3,c3)+'&\\p{=}\\p{0}'+end,'',strs[0],'$$\\begin{aligned}'+strs[1]+'\\end{aligned}$$']
    }
}
window.j = {
    startCollapsed: false,
    lessonNum: 13,
    lessonName: "Solving Equations",
    intro:String.raw`<p>In this section, we will give a 8-step process that can be used to solve any equation in this class</p>`,
    sections: [
        {
            name: String.raw`Solving Equations`,
            intro: String.raw`In this section, we will give an 8-step process that can be used to solve any equation you will need to solve in this class. These are the steps <ol><pli>Simplify both sides</pli><pli>Rewrite negative exponents as fractions</pli><pli>Remove denominators</pli><pli>If there are multiple terms with $x$, <span class="invisible">distribute every term</span></pli><pli>Combine like terms</pli><pli>If there is only one $x$ in the equation, <span class="invisible">cancel everything next to </span><span class="invisible">$x$</span></pli><pli>Move everything to one side and factor</pli><pli>Set each factor equal to $0$ and solve for $x$</pli></ol>`,
            rightColWidth: 90,
            steps: {
                general:{
                    question:String.raw`Solve an equation`,
                    steps:[
                        'Simplify both sides',
                        String.raw`<p>Rewrite negative exponents as fractions using the identity$$\p{\b{c}}\p{\r{a}}^{\p{-\go{n}}}\p{=}\p{\frac{\p{\b{c}}}{\p{\r{a}}^{\p{\go{n}}}}}$$</p>`,
                        'Remove all denominators from the equation by\\p multiplying both sides of\\p the equation by\\p every\\p denominator',
                        'If there are multiple terms with $x$,\\p distribute all terms with $x$',
                        'Combine like terms from both sides of the equation',
                        'If there is only one $x$ in the equation,\\p cancel everything next to $x$ by\\p doing stuff to both sides.\\p Cancel stuff in the opposite order of\\p the order of operations when calculating',
                        'If there is more than one $x$,\\p move everything to one side and factor.\\p If you cannot factor, use the quadratic formula instead',
                        'If there is more than one $x$,\\p set each factor equal to\\p 0 and\\p solve for\\p $x$'
                    ]
                },
                specific: distAndSolve(1,12,2883,-67)
            },
            examples: [
                quadformexEqSol(6,4,-3),
                linEqSolve(1.04,0,0,676000),
                // {
                //     question: 'Solve the equation $1.04x=676000$',
                //     steps:['','','', '',
                //         '$\\p{x}\\p{=}\\p{650000}$','', ''
                //     ]
                // },
                {
                    question: 'Solve the equation $x+0.05x=102$',
                    steps:['$\\p{1.05}\\p{x}\\p{=}\\p{102}$','','','', '',
                        '$$\\begin{aligned}\\p{1.05}\\p{x}&\\p{=}\\p{102}\\\\[4pt]\\p{x}&\\p{=}\\p{97.1}\\end{aligned}$$','', ''
                    ]
                },
                quadformexEqSol(9,2,-0.09),
                lineqzero(2,5),
                zerosquadfactor(3,-6,-9),
                linEqSolve(5,2,4,6),
                quadNumSolve(-4,0,4,'(x^2+1)^2'),
                quadEqSolve(1,0,2,0,2,2),
                fracSolve(2,432),
                zerosquadfactor(-3,-6,9),
                zerosquadfactor(12,-24,0),
                lineqzero(6,-30),
                zerosquadfactor(3,18,15),
                lineqzero(2,1),
                zerosquadfactor(-6,-12,0),
                zerosquadfactor(3,18,24),
                zerosquadfactor(3,0,-12),
                distAndSolve(1,0,0,-6),
                fracSolve(6,6000),
                zerosquadfactor(3,2,-5),
                zerosquadfactor(-4,4,0),
                zerosquadfactor(3,20,25),
                zerosquadfactor(3,18,15),
                quadEqSolve(1,0,4,0,6,4),
                // lineqzero(4,8),
                // linEqSolve(2,8,4,-2),
                // zerosquadfactor(1,-2,-3),
                // distAndSolve(1,0,0,-4),
                // quadEqSolve(1,0,-2,0,5,-2),
                // fracSolve(1,8),
                // quadNumSolve(1,-2,1,'x^2+4')
            ],
        },
    ],
}