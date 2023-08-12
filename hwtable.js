import {lowerLetters} from "./Calc.js?v=7";
function assignment(name,lists){
    let str='<table><tr><th>Problem #</th><th>Section Title</th><th>Section Link</th></tr>'
    let j=0;
    let k=0;
    for(let i=0;i<lists.length;i++){
        let title=''
        let link=''
        let url=''
        let list=lists[i];
        // alert(i)
        // alert(lists.length)
        // alert(lists[i])
        if(list[0]!=''){
            url='https://lendalcalc.com/'+list[0]+'.html'+(list[1]!=null?'#section='+list[1]:'')
            if(list[1]<0){
                title='Placeholder for Title'//load('./'+list[0]+'.js').(window.j).lessonName
            }
            else{
                title='Placeholder for Title'//load('./'+list[0]+'.js').(window.j).sections[list[2]].name
            }
        }
        else{
            title=list[1]
            url=list[2]
        }
        if(list.length<4){
            k=0;
            j=j+1;
        }
        else{
            if(list[3]!=''){
                k=0;
            }
            if(k==0){
                j=j+1;
            }
            k=k+1;
        }
        link=url.includes('https')?'<a href="'+url+'">'+url+'</a>':url
        str=str+'<tr><td>'+j+(k>0?lowerLetters[k-1]:'')+'</td><td>'+title+'</td><td>'+link+'</td></tr>'
    }
    hws.push({
        name:name,
        backgroundColor: "green",
        intro: str+'</table>',
        rightColWidth: 90,
        steps: {
            general:{
                question:``,
                steps:['']
            },
            specific:{
                question: '',
                steps:['']
            }
        },
        examples: [],
    })
}
let hws=[];
assignment('Homework 1',[['equilibrium',1,''],['slopeform',5,''],['ineq',2,''],['xyIntercept',1,''],['slopeform',2,''],['func',1,''],['PropExp',2,''],['PropExp',2,''],['formerpop',1,''],['quadform',1,''],['slopeform',3,''],['','Distributing','https://tutors.com/lesson/foil-method-math#:~:text=The%20FOIL%20Method%20is%20used,like%20terms%20for%20your%20answer.'],['solveeq',1,'']])
assignment('Homework 2',[['Properties of Limits','Everything Except "None of these are true" should be checked',''],['limits',1,''],['limits',3,''],['diffquo',1,''],['limits',1,''],['limits',3,''],['limits',2,''],['Points of Discontinuity of Graphs',-1,'The points are discontinuity are where you have to lift your pencil when drawing the graph. In this case, that would be the $x$-values of the dotted lines and the jump with the open and filled in circles'],['aroc',2,''],['aroc',1,''],['aroc',3,''],['','Limits in Word Form','the value approached by $f(x)$ when $x$ approaches $\\pkt{the number in the problem}$'],['limits',3,'']])
assignment('Homework 3',[['introderiv',5,''],['introderiv',1,''],['','Points where the derivative doesn\'t exist on a' +
' graph','The points where the derivative doesn\'t exist are points where you have to lift your pencil while drawing' +
' the graph (the dotted line) or where the graph is pointy'],['derivp2',5,''],['2ndhoriz',2,''],['introderiv',5,''],['derivp2',5],['introderiv',6,'']])
assignment('Practice Test 1',[['','Factoring Special Case','https://www.mathsisfun.com/algebra/factoring-quadratics.html',''],['diffquo',2,'',''],['ineq',2],['derivp2',5],['QuadForm',1,'',''],['xyIntercept',2,'',''],['xyIntercept',1,'',''],['limits',1,''],['limits',3,'']])
assignment('Homework 4',[['derivp2',1,''],['derivp2',4],['2ndhoriz',1],['derivp2',4],['2ndhoriz',1],['introderiv',7],['derivp2',3],['','Generalized Power Rule','$f\\circ g$',''],['','Generalized Power Rule','the one like $4(g(x))^3\\cdot g\'(x)$',''],['','Generalized Power Rule','the one like $4(g(2))^3\\cdot g\'(2)$',''],['','Examples of Derivatives','velocity','1'],['','Examples of Derivatives','marginal cost',''],['','Examples of Derivatives','acceleration',''],['','Derivative Rules','All except "none of these" and "$F(x)=f(x)\\cdot g(x)$, then $F\'(x)=f\'(x)\\cdot g\'(x)$" are true'],['derivp2',2]])
assignment('Homework 5',[['limits',5,'',''],['limits',4,'',''],['curvesketch',5],['','Concave Up Graphs','"If $f(x)$' +
' is concave up, then $f\'\'(x)>0$" and "If $f(x)$ is concave up, then $f\'(x)$ is increasing" are the correct ones'],['curvesketch',1],['curvesketch',4],['curvesketch',5],['','Increasing Graphs','"If $f(x)$ is increasing, then $f\'(x)>0$" and "If $f\'(x)>0$, then $f(x)$ is increasing" are the correct options'],['','Critical points','Set $f\'(x)=0$ and solve for $x$ using the quadratic formula (if $f(x)$ has no $x^4$) or by factoring out $4x$ (if $f(x)$ has $x^4$). Plug into $f(x)$ to get $y$']])
assignment('Practice Test 2',[['introderiv',5],['derivp2',3,'',''],['derivp2',5,'',''],['2ndhoriz',1],['','Critical points','Set $f\'(x)=0$ and solve for $x$ using the quadratic formula (if $f(x)$ has no $x^4$) or by factoring out $4x$ (if $f(x)$ has $x^4$). Plug into $f(x)$ to get $y$'],['curvesketch',1],['curvesketch',3],['limits',5,'',''],['limits',4,'',''],['curvesketch',5]])
assignment('Homework 6',[['explog',7],['explog',1],['optwordprob',1],['optabs',1,'',''],['optabs',2,'',''],['optwordprob',2],['explog',4],['explog',3],['explog',2],['explog',3],['optabs',1],['optabs',3]])
assignment('Practice Test 3',[['optwordprob',3],['optabs',1],['expfuncnew',13,'',''],['expfuncnew',8,'',''],['expfuncnew',4,'',1],['expfuncnew',5,'',''],['explog',2],['explog',4],['explog',3],['explog',3]])
assignment('Homework 7',[['expfuncnew',7],['','Differential Equations','The answer like "$B=ce^{(-0.08)t}$"'],['expfuncnew',8],['expfuncnew',6],['expfuncnew',16],['expfuncnew',9],['expfuncnew',14],['expfuncnew',15],['expfuncnew',7],['','Differential Equations','The answer like "$R=ce^{(0.45)t}$"']])
assignment('Homework 8',[['antiderivintro',8],['antiderivintro',8],['explog',6],['expfuncnew',6],['antiderivintro',8],['antiderivintro',9],['','Inverse function','The answer is $a^y=x$'],['antiderivintro',12],['antiderivintro',12]])
assignment('Homework 9',[['usub',1],['antiderivintro',12],['defintapp',2],['antiderivintro',11],['defintapp',4],['defintapp',1],['defintapp',4,'',''],['defintapp',4,'',''],['defintapp',5,'',''],['defintapp',6,'',''],['usub',2],['defintapp',3],['usub',4]])
assignment('Homework 10',[['expfuncnew',10],['expfuncnew',12],['expfuncnew',3],['expfuncnew',11],['','Improper' +
' Integrals','The' +
' answers are "converges" and "diverges"'],['impropsepvar',1],['impropsepvar',2],['impropsepvar',3],['defintapp',7]])
assignment('Practice Final',[['limits',3],['limits',3],['QuadForm',1],['introderiv',5],['explog',2],['introderiv',5],['explog',7],['optwordprob',1],['limits',5,'',''],['limits',4,'',''],['curvesketch',1],['','Critical points','Set $f\'(x)=0$ and solve for $x$ using the quadratic formula (if $f(x)$ has no $x^4$) or by factoring out $4x$ (if $f(x)$ has $x^4$). Plug into $f(x)$ to get $y$'],['curvesketch',5],['introderiv',5],['derivp2',1],['derivp2',3,'',''],['explog',3,'',''],['antiderivintro',8],['antiderivintro',8],['expfuncnew',4,'',''],['expfunc',1,'',''],['antiderivintro',12],['defintapp',3],['sepvar',1]])
window.j = {
    startCollapsed: false,
    lessonNum: 10,
    lessonName: "Homework Table",
    intro: String.raw`<p>In this section,\p we will discuss\p how to find the absolute maximum and minimum of $f(x)$ on an interval</p>`,
    sections: hws,
}