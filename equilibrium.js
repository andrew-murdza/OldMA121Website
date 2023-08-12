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
    let returnList=[];
    let list=[];
    let str='\\t{no solution}'
    if(Math.pow(b,2)-4*a*c>=0){
        let x1=rounddigits((-b+Math.sqrt(Math.pow(b,2)-4*a*c))/(2*a),3);
        let x2=rounddigits((-b-Math.sqrt(Math.pow(b,2)-4*a*c))/(2*a),3);
        str='\\p{'+x1+'}\\p{,\\ }\\p{'+x2+'}';
        list.push([x1,x2]);
    }
    returnList.push('\\p{x}&\\p{=}\\p{\\frac{\\p{-}\\p{\\b{b}}\\p{\\pm}\\p{\\sqrt{\\p{\\b{b}}^\\p{2}\\p{-}\\p{4}\\p{\\r{a}}\\p{\\go{c}}}}}{\\p{2}\\p{\\r{a}}}}\\\\[10pt]&\\p{=}'+quadform('('+a+')','('+b+')','('+c+')')+'\\\\[7pt]&\\p{=}'+str)
    return [returnList,list];
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
}
lineqzero=function(a,b){
    return linEqSolve(a,b,0,0);
}
zerosquadfactor=function(a,b,c){
    if(a==0){
        return lineqzero(b,c);
    }
    let list=factorSolveWork(a,b,c);
    if(list==null){
        return quadformexEqSol(a,b,c);
    }
    return list;
}
factorSolveWork=function(a,b,c){
    let returnList=[];
    let q=factorQuad(a,b,c);
    if(q==null||b%a!=0||c%a!=0){
        return quadformexEqSol(a,b,c)
    }
    let b1=b/a;
    let c1=c/a;
    if(a!=1&&c!=0){
        returnList.push(coef(a)+'\\p{(}'+quadNum(1,b1,c1)+'\\p{)}&\\p{=}\\p{0}');
    }
    returnList.push(q+'&\\p{=}{0}');
    let list=factorMonicQuadFactors(b1,c1);
    let list1=factorMonicQuadVal(b1,c1);
    returnList.push(list[0]+'&\\p{=}\\p{0}\\p{,\\ }'+list[1]+'\\p{=}\\p{0}');
    returnList.push('\\p{x}&\\p{=}\\p{'+(-list1[0])+'}\\p{, \\ }\\p{'+(-list1[1])+'}')
    return [returnList,list[0]==list[1]?-list[0]:[-list[0],-list[1]]];
}
linEqSolve=function(b1,c1,b2,c2){
    let returnList=[];
    let b3=Math.abs(b2-b1);
    let c3=-(c2-c1)*Math.sign(b2-b1);
    if(b1==1&&b2==0&&c1==0||b2==1&&b1==0&&c2==0){
        return [returnList,[c3/b3]];
    }
    if(b1!=1&&(c1!=0||b2!=0)&&(c2!=0||b1!=0)){
        returnList.push(coef(b3)+'\\p{x}&\\p{=}\\p{'+c3+'}')
    }
    if(b3!=1){
        returnList.push('$\\p{x}\\p{=}\\p{'+(c3/b3)+'}$');
    }
    return [returnList,[c3/b3]];
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
    let returnList=[];
    let a3=Math.abs(a2-a1);
    if(a3==0){
        let b3=Math.abs(b2-b1);
        let c3=-(c2-c1)*Math.sign(b2-b1);
        returnList.push('\\p{'+b3+'}\\p{x}&\\p{=}\\p{'+c3+'}');
        if(b3!=1){
            returnList.push('\\p{x}&\\p{=}\\p{'+(c3/b3)+'}')
        }
        return [returnList,[c3/b3]];
    }
    let b3=(b2-b1)*Math.sign(a2-a1);
    let c3=(c2-c1)*Math.sign(a2-a1);
    let list=factorSolveWork(a3,b3,c3);
    returnList.push(quadNum(a3,b3,c3)+'&\\p{=}\\p{0}');
    returnList.push(...list[0]);
    return [returnList,list[1]];
}
distAndSolve=function(a,b,c,d){
    let returnList=[];
    let str0=d<0?'\\p{'+d+'}':'\\p{+}'+'\\p{'+d+'}';
    let str='\\p{(}\\p{x}'+str0+'\\p{)}';
    let strs=[quadNum(a,b,c)+'&\\p{=}',(str+'^\\p{2}').replaceAll('\\p{+}\\p{-','\\p{-'),'\\p{x}^\\p{2}'+str0+'\\p{x}'+str0+'\\p{x}\\p{+}\\p{'+Math.pow(d,2)+'}'];
    returnList.push(strs[0]+strs[1]);
    returnList.push(strs[0]+str+str);
    returnList.push(strs[0]+strs[2]);
    let a1=1; let b1=2*d; let c1=Math.pow(d,2);
    returnList.push(strs[0]+quadNum(a1,b1,c1));
    let list=quadEqSolve(a,b,c,a1,b1,c1);
    returnList.push(...list[0]);
    //for equilibrium solve only
    returnList.push(returnList[returnList.length-1].replaceAll('x','\\bt{equilibrium price}'));
    return [returnList,list[1]];
}
sub=function(str,x,xval){
    return str.replaceAll(x,'{('+xval+')}');
}
subEqui=function(a,b,c,d){
    let list=distAndSolve(a,b,c,d);
    let str='';
    for(let i=0;i<list[1].length;i++){
        let x=list[1][i]
        let xval=rounddigits(x,3);
        let yval=rounddigits(a*Math.pow(x,2)+b*x+c,4);
        str=str+'$$\\begin{aligned}\\p{\\got{equilibrium quantity}}&\\p{=}'+quadNum(a,b,c)+'\\\\[4pt]&\\p{=}'+sub(quadNum(a,b,c),'x',xval)+'\\\\[4pt]&\\p{=}\\p{'+yval+'}\\end{aligned}$$';
    }
    return str;
}
equiEx=function(a,b,c,d){
    let str0=d<0?'\\p{'+d+'}':'\\p{+}'+'\\p{'+d+'}';
    let str='\\p{(}\\p{x}'+str0+'\\p{)}^\\p{2}';
    return{
        question: 'Find the equilibrium for the supply $\\g{S(x)}=\\g{'+quadNum(a,b,c)+'}$ and $\\r{D(x)}=\\r{'+str+'}$',
        steps:[turnToEq(distAndSolve(a,b,c,d)[0]),subEqui(a,b,c,d)]
    }
}
//Works for non-fraction equations b/c of 4pt
turnToEq=function(steps){
    if(steps.length==0){
        return '';
    }
    let str='$$\\begin{aligned}'+steps[0];
    for(let i=1;i<steps.length;i++){
        str=str+'\\\\[4pt]'+steps[i];
    }
    return str+'\\end{aligned}$$';
}
window.j = {
    startCollapsed: false,
    lessonNum: 13,
    lessonName: "Solving for equilibrium price and quantity",
    intro:String.raw`<p>In this section, we will describe how to find equilibrium</p>`,
    sections: [
        {
            name: String.raw`Solving for equilibrium price and quantity`,
            intro: String.raw`<p>Given supply $\g{S(x)}$ and $\r{D(x)}$, the <span class='hi'>$\bt{equilibrium quantity}$ is the <span class='invisible'>$\bt{$x$-value}$</span></span>\p where\p $\g{S(x)}=\r{D(x)}$.</p><p>Once you have found the $\bt{equilibrium quantity}$,\p you can find the\p <span class='hi'>$\got{equilibrum price}$ <span class='invisible'>(the $\got{$y$-value}$).</span></span></p><p>Since <span class='hi'>$\g{S(x)}$ is <span class='invisible'>the $y$-value</span></span>\p,\p you can calculate the\p $\got{equilibrum price}$\p by\p substituting the\p $\bt{equilibrium quantity}$ into\p $\g{S(x)}$.</p><p><b>Note: </b>you can also plug into $\r{D(x)}$ if you prefer since\p $\g{S(x)}$ and $\r{D(x)}$ are the same at the equilibrium.</p>`,
            rightColWidth: 90,
            steps: {
                general:{
                    question:String.raw`Find the equilibrium for the supply $\g{S(x)}=\gt{an equation}$ and $\r{D(x)}=\rt{another equation}$`,
                    steps:[
                        String.raw`Find the $\bt{equilibrium quantity}$,\p which is the $\bt{$x$-value}$\p you get from\p solving \p$\g{S(x)}=\r{D(x)}$ for $x$`,
                        String.raw`Find the $\got{equilbrium quantity}$,\p which is the $\got{$y$-value}$\p you get from\p substituting the \p$\bt{equilbrium quantity}$\p into\p $\g{S(x)}$ or $\r{D(x)}$ (you will get the same answer from both $\g{S(x)}$ and $\r{D(x)}$)`
                    ]
                },
                specific:equiEx(1,11,2497,-66)
            },
            examples: [

            ],
        },
    ],
}