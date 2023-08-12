rounddigits=function(t,n){
    let s=Math.ceil(Math.log10(Math.abs(t)));
    let a=Math.pow(10,n-s);
    return Math.round(t*a)/a;
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
linInEqSolve=function(b1,c1,b2,c2,sign){
    let returnList=[];
    let b3=b2-b1;
    let c3=-c2-c1;
    let str1='';
    let str2='';
    let a=c3/b3;
    let sign1=sign;
    if(b1==1&&b2==0&&c1==0||b2==1&&b1==0&&c2==0){

    }
    else if(b1!=1&&(c1!=0||b2!=0)&&(c2!=0||b1!=0)){
        str1='$'+coef(b3)+'\\p{x}\\p{'+sign+'}\\p{'+c3+'}$'
    }
    if(b3!=1&&b3>0){
        str2='$\\p{x}\\p{'+sign+'}\\p{'+(c3/b3)+'}$';
    }
    else if(b3!=1&&b3<0){
        str2='$\\p{x}\\p{'+opposite(sign)+'}\\p{'+(c3/b3)+'}$';
        sign1=opposite(sign);
    }
    let str3='$('+a+',\\infty)$'
    if(sign1=='\\ge'){
        str3='$['+a+',\\infty)$'
    }
    else if(sign1=='\\le'){
        str3='$(-\\infty,'+a+']$'
    }
    else if(sign1=='<'){
        str3='$(-\\infty,'+a+')$'
    }
    return{
        question:'Solve the inequality $'+linstr(b1,c1)+'='+linstr(b2,c2)+'$',
        steps:[str1,str2,str3]
    }
}

opposite=function(sign){
    if(sign=='<'){
        return '>'
    }
    if(sign=='>'){
        return '<'
    }
    if(sign=='='){
        return sign;
    }
    if(sign=='\\le'){
        return '\\ge'
    }
    if(sign=='\\ge'){
        return '\\le'
    }
    return null;
}
intNot=function(a,b,ol,or){
    a='\\r{'+a+'}'
    b='\\b{'+b+'}'
    let str1='$'+a+(ol?'< ':'\\le')+'x'+(or?'<':'\\le')+b+'$';
    let str2='$'+(ol?'(':'[')+a+','+b+(or?')':']')+'$'
    return{
        question:'Write '+str1+' in interval notation',
        steps:[str2]
    }
}
intNotR=function(a,ol){
    a='\\r{'+a+'}'
    let str1='$x'+(ol?'> ':'\\ge')+a+'$';
    let str2='$'+(ol?'(':'[')+a+','+'\\infty)$'
    return{
        question:'Write '+str1+' in interval notation',
        steps:[str2]
    }
}
intNotL=function(b,or){
    b='\\b{'+b+'}'
    let str1='$x'+(or?' <':'\\le')+b+'$';
    let str2='$(-\\infty,'+b+(or?')':']')+'$'
    return{
        question:'Write '+str1+' in interval notation',
        steps:[str2]
    }
}
window.j = {
    startCollapsed: false,
    lessonNum: 13,
    lessonName: "Inequalities",
    intro:String.raw`<p>In this section, we will describe how to find equilibrium</p>`,
    sections: [
        {
            name: String.raw`Interval notation`,
            intro: String.raw`<p>In this section we will discuss interval notation</p><p>Interval notation is used to represent\p ranges of $x$ values</p><p>Intervals have the form$$\p{\{\p{(}\p{ or }\p{[}\}}\r{\p{\t{left}}\t{ }\p{\t{endpoint}}}\p{,}\b{\p{\t{right}}\t{ }\p{\t{endpoint}}}\p{\{\p{)} \p{or} \p{]}\}}$$\p which represents the $x$-values between $\p{\rt{left endpoint}}$ \pand $\p{\bt{right endpoint}}$</p><p>Parentheses means the endpoint is not included and brackets means the endpoint is included.</p><p>For example, $(\r{2},\b{3}]$ means\p the $x$-values between\p $\r{2}$\p and\p $\b{3}$, where $\r{2}$ not included and $\b{3}$ is included.</p><p>In other words, $(\r{2},\b{3}]$ represents $\r{2}< x\le \b{3}$.</p><p>If there is a left endpoint but no right endpoint, the right endpoint is $\infty$ with parentheses.</p><p>For example, $x\ge\r{5}$ is $[\r{5},\infty)$</p><p>If there is a right endpoint but no left endpoint, the left endpoint is $-\infty$ with parentheses.</p><p>For example, $x\le \b{4}$ is $[\b{4},\infty)$</p>`,
            rightColWidth: 90,
            steps: {
                general:{
                    question:String.raw`Write {an inequality} in interval notation`,
                    steps:[
                        String.raw`<p>Interval notation has the form <p>$\p{\{\p{(}\p{ or }\p{[}\}}\r{\p{\t{left}}\t{ }\p{\t{endpoint}}}\p{,}\b{\p{\t{right}}\t{ }\p{\t{endpoint}}}\p{\{\p{)} \p{or} \p{]}\}},$</p>\p where parentheses are used if\p the endpoint is\p not included\p and\p brackets are used if\p the endpoint is\p included.</p><p>If there is no $\rt{left endpoint}$, the $\rt{left endpoint}$ is $\r{-\infty}$ with parentheses</p><p>If there is no $\bt{right endpoint}$, the $\bt{right endpoint}$ is $\b{\infty}$ with parentheses</p>`,
                    ]
                },
                specific:intNot(3,5,true,false)
            },
            examples: [
                intNotL(2,true),
                intNotR(-3,false),
            ],
        },
        {
            name: String.raw`Solving linear inequalities`,
            intro: String.raw`<p>In this section, we show how to solve inequalities of the form $ax+b\le cx+d$ where $\le$ could be replaced by $<$, $>$, or $\ge$ </p>`,
            rightColWidth: 90,
            steps: {
                general: {
                    question: String.raw`Write {an inequality} in interval notation`,
                    steps: [
                        String.raw`<p>Move all of the terms with $x$ to one side and all the terms without $x$ to the other side</p>`,
                        String.raw`<p>Divide both sides by the constant in front of $x$</p><p>If the constant is negative, flip the inequality (change greater than to less than and less than or greater than)</p>`,
                        String.raw`<p>If required by WebAssign, write your answer in interval notation</p>`
                    ]
                },
                specific: linInEqSolve(3, 4, 2, 9, '>')
            },
            examples: [
                linInEqSolve(5, 4, 3, 6, '\\le')
            ],
        }
    ],
}