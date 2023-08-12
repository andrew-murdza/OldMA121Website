rounddigits=function(t,n){
    let s=Math.ceil(Math.log10(Math.abs(t)));
    let a=Math.pow(10,n-s);
    return Math.round(t*a)/a;
}
pergr=function(g){
    return String.raw`\p{1}\p{+}\p{\frac{\go{\p{`+g+`}}}{100}}`;
}
pf=function(str){
    return '<span class="blue">population after '+str+' increase</span>'
}
po=function(str){
    return '<span class="red">population before '+str+' increase</span>'
}
let pi='<span class="gold">percent increase</span>'
pie=function(P,r,P0){
    return '$$\\p{\\b{'+P+'}}\\p{=}\\left('+pergr(r)+'\\right)\\p{\\r{'+P0+'}}$$'
}
fpex=function(P,r){
    let str1=pie(P,r,'P_0');
    let str2='$$\\p{\\b{'+P+'}}\\p{=}'+(1+r/100)+'\\p{\\r{P_0}}$$'
    let str3='$$\\r{P_0}='+rounddigits(P/(1+r/100),6)+'$$'
    return{
        question:String.raw`After a $\go{`+r+`}$ percent increase, the population of a city is $\\bt{`+P+`}.$ What was the $\\rt{former population}?$`,
        steps:[str1,str2,str3]
    }
}
window.j = {
    startCollapsed: false,
    lessonNum: 13,
    lessonName: "The Former Population Problem",
    intro:String.raw`<p>In this section, we will solve\p the former population problem</p>`,
    sections: [
        {
            name: String.raw`The Former Population Problem`,
            intro: String.raw`<p>In this section, we will solve the former population problem</p><p>In this problem,\p we are given\p the `+pf('an')+` \p(which I will call $\\p{\\b{P}}$) \\pand\\p the `+pi+`\\p (which I will call $\\p{\\go{r}}$) \\pand we want to find\\p the `+po('the')+`\\p (which I will call $\\p{\\r{P_0}}$)</p><p>An increase of $\\go{r}\%$ is the same thing as\\p multiplying by $`+pergr('r')+`$</p><p>For example, an increase of $\\go{5}\%$ is the same thing as\\p multiplying by $`+pergr(5)+`\\p{=}\\p{1.05}$</p><p>Therefore \\p`+pf('the')+`is \\p1.05 times\\p the `+po('the')+`:$$\\p{\\b{P}}\\p{=}\\p{`+1.05+`}\\p{\\r{P_0}}$$</p><p>In general, we have\\p the percent growth equation `+pie('P','r','P_0')+`</p><p>To solve our problem,\\p we substitute given values of\\p $\\b{P}$\\p and\\p $\\go{r}$\\p into\\p the percent growth equation.</p><p>Then \\pwe divide both sides by\\p the number in front of $\\r{P_0}$\\p to solve for \\p$\\r{P_0}$</p>`,
            rightColWidth: 90,
            steps: {
                general:{
                    question:String.raw`After a $\go{r}$ percent increase, the population of a city is $\bt{a number}.$ What was the $\rt{former population}$?`,
                    steps:[
                        String.raw`<p>Plug in \pthe `+pf('the')+`\\p ($\\b{P}$)\\p and\\p the `+pi+`\\p $(\\go{r})$\\p into\\p the percent growth equation `+pie('P','r','P_0')+`</p>`,
                        String.raw`<p>Simplify</p>`,
                        String.raw`<p>Divide both sides by\p the number in front of $\r{P_0}$\p to solve for \p$\r{P_0}$</p>`
                    ]
                },
                specific:fpex(741000,3)
            },
            examples: [

            ],
        },
    ],
}