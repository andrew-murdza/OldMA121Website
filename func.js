rounddigits=function(t,n){
    let s=Math.ceil(Math.log10(Math.abs(t)));
    let a=Math.pow(10,n-s);
    return Math.round(t*a)/a;
}
func=function(f,x,form){
    return '\\p{'+f+'\\p{(}\\p{\\b{'+x+'}}\\p{)}}\\p{=}\\p{\\b{\\go{'+form.replaceAll(x,'\\b{'+x+'}')+'}}}'
}
sub=function(str,x,xval){
    return str.replaceAll(x,'{('+xval+')}');
}
feval=function(f,x,form,a){
    return '\\p{'+f+'}\\p{(}\\p{\\r{'+a+'}}\\p{)}\\p{=}\\p{\\go{'+form.replaceAll(x,'\\bk{(}\\r{'+a+'}\\bk{)}')+'}}'
}
btext=function(str){
    return '\\t{\\{'+str+'\\}}'
}
rp=function(str){
    return str.replaceAll('\\p{','\\pn{')
}
faex=function(f,x,form,a){
    return{
        question:'$'+rp(func(f,x,form))+'.$\\p Find $f(\\r{'+a+'})$',
        steps:['$$'+feval(f,x,form,a)+'$$']
    }
}
window.j = {
    startCollapsed: false,
    lessonNum: 13,
    lessonName: "Functions",
    intro:String.raw`<p>In this section, we will describe how to use functions</p>`,
    sections: [
        {
            name: String.raw`Evaluating Functions`,
            intro: String.raw`<p>A function is a rule used convert\p an input \pinto\p an output.</p><p>A function has the form $$`+func('\\underbrace{f}_{\\begin{gathered}\\t{the first letter of the}\\\\\\t{ function is the name}\\end{gathered}}','\\bk{\\underbrace{\\b{x}}_{\\begin{gathered}\\t{letter inside of the parentheses }\\\\\\t{is the}\\bt{ input variable}\\end{gathered}}}','\\bk{\\underbrace{\\go{\\b{x}^2}}_{\\begin{gathered}\\got{resulting output}\\end{gathered}}}')+`$$</p><p>To calculate the $\\got{output}$ \\pfor\\p a specific $\\rt{input}$\\p (which I will call \\p$\\r{a}$),\\p you replace every \\p$\\bt{input variable}$ \\pin\\p the function equation \\pwith\\p $(\\r{a})$</p><p>Sometimes the parentheses aren't necessary\\p but other times they are.</p><p>If you are unsure,\\p use $(\\r{a})$ instead of $\\r{a}$</p><p>For example,\\p to calculate\\p the $\\got{output}$ of $`+func('f','x','4x^{\\p{2}}')+`$\\p for an $\\rt{an input}$\\p of\\p $\\r{2}$,\\p we replace every \\p$\\b{x}$\\p with\\p $(\\r{2})$: $$`+feval('f','x','4\\p{x}^{\\p{2}}',2)+`\\p{=}\\p{\\go{16}}$$</p><p>In this case,\\p the $\\got{output}$ is\\p $\\go{16}$</p><p>To calculate the $\\got{output}$\\p of the function $`+func('g','x','x^{\\p{2}}')+`$\\p for an $\\rt{input}$ of\\p $\\r{t}$,\\p replace every\\p $\\b{x}$\\p with\\p $(\\r{t})$: $$`+feval('g','x','x^{\\p{2}}','t')+`\\p{=}\\go{\\p{\\r{t}}^{\\p{2}}}$$</p><p>To calculate the $\\got{output}$ of $`+func('f','x','\\p{2}\\p{x}^\\p{2}\\p{-}\\p{x}')+`$\\p for an an $\\rt{input}$ of\\p $\\r{x+h}$,\\p replace every\\p $\\b{x}$\\p with\\p $\\r{x+h}$:$$`+feval('f','x','\\p{2}\\p{x}^\\p{2}\\p{-}\\p{x}','x+h')+`$$</p>`,
            rightColWidth: 90,
            steps: {
                general:{
                    question:String.raw`$f(\b{x})=\got{\{a formula\}}$.\p Find $f(\r{a})$`,
                    steps:[
                        String.raw`<p>Replace every \p$\b{x}$ in the\p $\p{f(\b{x})}\p{=}\p{\got{\{a formula\}}}$\p equation with\p $(\r{a})$</p>`
                    ]
                },
                specific:faex('f','x','\\p{\\sqrt{\\p{x}\\p{+}\\p{1}}}','3')
            },
            examples: [
                faex('f','x','\\p{x}^\\p{2}','x+h')
            ],
        },
    ],
}