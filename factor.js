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
    if(list==null){
        return null;
    }
    return ('\\p{(}'+convertFactor(list[0],'r')+'\\p{)}\\p{(}'+convertFactor(list[1],'pu')+'\\p{)}').replaceAll('\\p{(}\\p{x}\\p{)}','\\p{x}')
}
convertFactor=function(x0,str){
    if(x0<0){
        return '\\p{x}\\'+str+'{\\p{-'+(-x0)+'}}';
    }
    if(x0>0){
        return '\\p{x}\\p{+}\\'+str+'{\\p{'+x0+'}}';
    }
    return '\\p{x}';
}
quadNum=function(a,b,c){
    let str=('\\p{'+a+'}\\p{x}^\\p{2}\\p{+}\\p{'+b+'}\\p{x}\\p{+}\\p{'+c+'}').replaceAll('\\p{0}\\p{x}^\\p{2}\\p{+}\\p{0}\\p{x}\\p{+}','')
    str=str.replaceAll('\\p{0}\\p{x}^\\p{2}\\p{+}','')
    str=str.replaceAll('\\p{0}\\p{x}\\p{+}','').replaceAll('\\p{1}\\p{x}','\\p{x}');
    str=str.replaceAll('\\p{+}\\p{-','\\p{-').replaceAll('\\p{+}\\p{0}','');
    return str==''?'\\p{0}':str;
}
quadMonicColor=function(b,c){
    let str=('\\p{x}^\\p{2}\\p{+}\\p{\\b{'+b+'}}\\p{x}\\p{+}\\p{\\go{'+c+'}}').replaceAll('\\p{\\b{0}}\\p{x}\\p{+}','');
    return str.replaceAll('\\p{+}\\p{\\b{-','\\p{\\b{-').replaceAll('+\\p{\\go{-','\\p{\\go{-')
}

factorEx=function(a,b,c){
    return {
        question:'Factor $'+quadNum(a,b,c)+'$',
        steps:[
            factorGcd(a,b,c),
            factorMonic(a,b,c)
        ]
    }
}

gcd=function(a,b){
    if(b==0){
        return Math.abs(a);
    }
    return gcd(b,a%b)
}

factorGcd=function(a,b,c){
    let g=gcd(gcd(a,b),c)*Math.sign(a)
    let a1=a/g;
    let b1=b/g;
    let c1=c/g;
    if(c==0){
        return '$'+quadNum(a,b,c)+'\\p{=}\\p{'+(g+'}\\p{x}\\p{(}\\p{'+a1+'}\\p{x}\\p{+}\\p{'+b1+'}\\p{)}').replaceAll('\\p{+}\\p{-','\\p{-').replaceAll('\\p{1}\\p{x}','\\p{x}')+'$';
    }
    if(g!=1){
        return '$'+quadNum(a,b,c)+'\\p{=}\\p{'+g+'}\\p{(}'+quadNum(a1,b1,c1)+'\\p{)}$'
    }
    return '';
}
coef=function(a){
    if(a==1){
        return '';
    }
    return a==-1?'\\p{-}':'\\p{'+a+'}';
}
factorNoAB=function(a,c){
    if(c/a<0&&c%a==0){
        let d=Math.sqrt(-c/a);
        let str=a!=1?'$$'+quadNum(a,0,c)+'\\p{=}'+coef(a)+'\\p{(}\\p{x}^\\p{2}\\p{-}'+'\\p{\\go{'+(-c/a)+'}}\\p{)}$$':'$\\p{x}^\\p{2}\\p{-}\\p{\\go{'+(-c/a)+'}}$';
        return str+'$$'+quadNum(a,0,c)+'\\p{=}'+coef(a)+'\\p{\\left(\\p{x}\\p{-}\\p{\\sqrt{\\p{\\go{'+(-c/a)+'}}}}\\right)}\\p{\\left(\\p{x}\\p{+}\\p{\\sqrt{\\go{'+(-c/a)+'}}}\\right)}$$'+'$$'+quadNum(a,0,c)+'\\p{=}'+coef(a)+'\\p{(}\\p{x}\\p{-}\\p{'+d+'}\\p{)}\\p{(}\\p{x}\\p{+}\\p{'+d+'}\\p{)}$$';
    }
    else{
        return '$'+quadMonicColor(1,0,c)+'$ cannot be factored'
    }
}
factorMonic=function(a,b,c){
    if(c==0){
        return '';
    }
    if(b==0){
        return factorNoAB(a,c);
    }
    let list=findFactors(c/a);
    let list1=factorMonicQuadVal(b/a,c/a);
    let str='<p>List of pairs of numbers which multiply to $\\p{\\go{'+c/a+'}}$:'
    for(let i=0;i<list.length;i++){
        str=str+'</p><p>$\\p{'+list[i][0]+'}$<span class="invisible"> and </span>$\\p{'+list[i][1]+'}$';
    }
    if(list1==null){
        str=str+'</p><p>None of these pairs of numbers add to $\\p{\\b{'+b/a+'}}$, so '+quadNum(1,b,c)+'<span class="invisible"> cannot be factored</span></p><p>If you are solving an equation,\\p use the quadratic formula instead</p>'
    }
    else{
        let str1=coef(a);
        let str2=factorMonicQuad(b/a,c/a);
        if(str1!=''){
            str2=str1+str2
        }
        let str3=a!=1?quadNum(a,b,c):quadMonicColor(b,c);
        str=str+'</p><p>The pair $\\p{\\r{'+list1[0]+'}}$<span class="invisible"> and </span>$\\p{\\pu{'+list1[1]+'}}$<span class="invisible"> adds to </span>$\\p{\\b{'+b/a+'},}$<span class="invisible"> so </span></p><p>$$'+str3+'='+str2+'$$'
    }
    return (a!=1?'$'+quadNum(a,b,c)+'\\p{=}'+coef(a)+'('+quadMonicColor(b/a,c/a)+'$)':'')+str;
}
window.j = {
    startCollapsed: false,
    lessonNum: 13,
    lessonName: "Factoring",
    intro:String.raw`<p>In this section, we will describe how to factor</p>`,
    sections: [
        {
            name: String.raw`Factoring $ax^2+bx+c$`,
            intro: String.raw`<p>In this section, we will describe how to factor quadratic equations,\p which have the form $ax^2+bx+c$</p><p>The first step of factoring is to take out the greatest common factor.</p><p>Once you taken out the greatest common factor, there are three possible scenarios</p><table><tr><th>Property</th><th>Example</th><th>Description of Property</th></tr><tr>`+`<td>$$\\p{x^2-\\go{c}=}\\p{(}\\p{x}\\p{-}\\p{\\sqrt{\\p{\\go{c}}}}\\p{)}\\p{(}\\p{x}\\p{+}\\p{\\sqrt{\\p{\\go{c}}}}\\p{)}$$`+`</td><td>`+`$$\\p{x^2-\\go{9}=}\\p{(}\\p{x}\\p{-}\\p{3}\\p{)}\\p{(}\\p{x}\\p{+}\\p{3}\\p{)}$$</td><td><span class="hi">Difference of Squares</span></td></tr><tr>`+`<td>$\\p{x^2+\\go{c}}$ can't be factored`+`</td><td>`+`$\\p{x^2+\\go{9}}$ can't be factored</td><td><span class="hi">Sum of Squares</span></td></tr><tr>`+`<td>$$\\p{x^2+\\b{b}x+\\go{c}}=\\p{(}\\p{x}\\p{+}\\p{\\r{x_1}}\\p{)}\\p{(}\\p{x}\\p{+}\\p{\\pu{x_2}}\\p{)},$$ where $\\r{x_1}$ and $\\pu{x_2}$ are two numbers which multiply to $\\go{c}$ and add to $\\b{b}$`+`</td><td>`+`$$\\p{x^2+\\b{4}x\\go{-12}}=\\p{(}\\p{x}\\p{+}\\p{\\r{6}}\\p{)}\\p{(}\\p{x}\\p{\\pu{-2}}\\p{)},$$ because $\\r{6}$ and $\\pu{-2}$ are two numbers which multiply to $\\go{-12}$ and add to $\\b{4}$</td><td><span class="hi">Quadratic function with three terms</span></td></tr></table>`,
            rightColWidth: 90,
            steps: {
                general:{
                    question:String.raw`Factor $ax^2+bx+c$`,
                    steps:[
                        'Factor out the greatest common factor',
                        String.raw`Work with one of three cases:<ol><pli>(ex $x^2\go{-4}$)<span class="invisible"> Difference of Squares</span></pli><pli>(ex $x^2+\go{4}$)<span class="invisible"> Sum of Squares</span></pli><pli>(ex $x^2+\b{2}x+\go{1}$) <span class="invisible">Quadratic Function With Three Terms</span></pli></ol>`,
                    ]
                },
                specific: factorEx(1,2,1)
            },
            examples: [
                factorEx(3,0,-3),
                factorEx(2,4,0),
                factorEx(3,18,15),
                factorEx(1,0,-16),
                factorEx(1,5,0),
                factorEx(1,-2,-3),
                // factorEx(3,0,-12)
            ],
        },
    ],
}