const xss=function(xs){
    xssol='x=';
    for(let i=0;i<xs.length;i++){
        x=xs[i];
        xssol=xssol+String.raw`\o{`+x+String.raw`}`;
        if(i<xs.length-1){
            xssol=xssol+",\\ ";
        }
    }
    return xssol;
  }
const ha=function(fs,n,m,a,b){//fs needs colored coefficients and powers
    strs=['>','numerator has the higher power','\\gb{f(x)\\t{ has no horizontal asymptotes}}'];
    has=String.raw`\ob{\t{The horizontal asymptote of $f(x)$ is}}$\p $\hspace{0.5cm}\gb{y=`
    if(n==m){
        strs=['=','numerator and the denominator have the same highest power',has+String.raw`\ds\frac{\r{`+a+String.raw`}}{\lb{`+b+`}}}`];
    }
    if(n<m){
        strs=['<','denominator has the higher power',has+`0}`];
    }
    return {
        question: String.raw`<p>$$f(x)=\displaystyle`+fs+`$$Find the horizontal asymptote(s) of $f(x)$</p>`,
        steps:[
            '\\p<p>$\\bb{\\go{'+n+'}'+strs[0]+'\\g{'+m+'}}$</p>',
            String.raw`<p>\p$$\bb{\t{Because the `+strs[1]+`,}}$$\\p$`+strs[2]+`$`
        ]
    };
}

const va=function(fs,denom,zw,xs){
    xsstr='';
    for(let i=0;i<xs.length;i++){
        xsstr=xsstr+'x=\\go{'+xs[i]+'}';
        if(i<xs.length-1){
            xsstr=xsstr+',\\ '
        }
    }
    v=['','is'];
    if(xs.length>1){
        v=['s','are'];
    }
    if(xs.length==0){
        xsstr='\\t{no solutions}'
        ans=String.raw`\\gb{$f(x)$\t{ has no vertical asymptotes}}`
    }
    else{
        ans=String.raw`\ob{\t{The vertical asymptote`+v[0]+` of }f(x)\\t{ `+v[1]+` }`+xsstr+'}';
    }
    steps=String.raw`\p<p>$$\gb{\r{`+denom+String.raw`}=0}$$`;
    if(zw.length>0){
        steps=steps+`\\p$$\\bb{\\a{`+zw+`}}$$`;
    }
    steps=steps+String.raw`\p$$\gb{`+xsstr+`}$$</p>`;
    return {
        question:String.raw`<p>$$f(x)=\displaystyle`+fs+`$$Find the vertical asymptote(s) of $f(x)$</p>`,
        steps:[
            steps,
            String.raw`\p<p>$`+ans+`$</p>`,
        ]
    }
}

const fevalg=function(f,fs,x,c,b){
    r='('+x+')';
    if(c.length>0){
        r='\\'+c+'{'+x+'}';
    }
    s='\\gb{f('+r+')}&=\\bb{'+fs.replaceAll('x','('+r+')')+'}\\\\[4pt]'+'&=\\gb{'+f(x)+'}';
    if(b){
        s='$$\\a{'+s+'}$$'
    }
    return s;
}
const feval=function(f,fs,x,c){
    return fevalg(f,fs,x,c,false);
}

const fevaloinf=function(f,fs,x){
    return String.raw`$$\a{\ob{y}&=\bb{f(\o{`+x+`})}\\\\[4pt]&=\\gb{`+fs.replaceAll('x','(\\o{'+x+'})')+`}\\\\[4pt]&=\\ob{`+f(x)+`}}$$`;
}

const fevals=function(f,fs,xs,cs){
    s='';
    c='';
    for(let i=0;i<xs.length;i++){
        if(cs.length>i){
            c=cs[i];
        }
        s=s+feval(f,fs,xs[i],c);
        if(i<xs.length-1){
            s=s+'\\\\[4pt]';
        }
    }
    return "$$\\a{"+s+"}$$";
}
const maxminab = function(f,fs,a,b,fp,fps,xs) {
    xs1=[a,b];
    cs=['pu','pu','o'];
    xssol=xss(xs);
    for(let i=0;i<xs.length;i++){
        x=xs[i];
        if(x!=a&&x!=b){
            xs1=xs1.concat(x);
        }
    }
    ys=[];
    yss=String.raw`}{\t{the }y\t{-values are }`;
    for(x of xs1){
        y=f(x);
        ys=ys.concat(y);
        yss=yss+y+',\\ '
    }
    yss=yss.substring(0,yss.length-2)+String.raw`\\\t{the `;
    fes=fevals(f,fs,xs1,cs);
    m=Math.min(...ys);
    M=Math.max(...ys);
    return {
      question: String.raw`$$f(x)=`+fs+String.raw`$$Find the absolute max and min of $f(x)$ on the interval $[\r{`+a+String.raw`},\r{`+b+String.raw`}]$`,
      steps: [String.raw`\p$$\gb{f'(x)=`+fp+'}$$',
      String.raw`\p$$\gb{`+fp+String.raw`=0}$$\p$$\bb{\ga{`+fps+String.raw`}}$$\p$$\gb{`+xssol+String.raw`}$$`,
      fes,
      String.raw`<p>\p Max:\p $\btip{`+M+yss+'largest of which is $'+M+String.raw`$}}$</p>\p<p>Min: $\btip{`+m+yss+'smallest of which is $'+m+'$}}$</p>',]
    };
  }

  const maxminzinf=function(f,fs,fp,fps,x,fpp,p){
    s=['\\g{>0}','\\gt{positive}','\\gt{min}','\\rt{max}'];
    if(!p){
        s=['\\r{<0}','\\rt{negative}','\\rt{max}','\\gt{min}'];
    }

    return{
        question: String.raw`$$f(x)=`+fs+String.raw`$$Find the absolute max and min of $f(x)$ on the interval $(0,\infty)$`,
        steps:[
            String.raw`\p$$\gb{f'(x)=`+fp+'}$$',
            String.raw`\p$$\gb{`+fp+String.raw`=0}\\[4pt]$$\p$$\bb{\ga{`+fps+String.raw`}}\\[4pt]$$\p$$\gb{x=\o{`+x+String.raw`}}$$`,
            String.raw`\p$$\gb{f''(x)=`+fpp+'}$$',
            String.raw`\p$$\bb{f''(x)=`+fpp+s[0]+String.raw`\t{ on }(0,\infty)}$$`,
            String.raw`\p$$\gb{\t{Because }f''(x)\t{ is always }`+s[1]+`,\\t{the }`+s[2]+`\\t{ is }}$$\\p`+fevaloinf(f,fs,x)+String.raw`\p$$\gb{\t{and there is no }`+s[3]+`}$$`
        ]
    };
  }
  fence=function(d){
    return {question: String.raw `A farmer wants to build a three-sided rectangular fence near a river, using $\pk{`+d+String.raw`}$ yards of fencing. Assume that the river runs straight and that John need not fence in the side next to the river. What are the $\put{length}$ and the $\ot{width}$ of the fence which maximizes the enclosed area?`+picsize('fence',500)+String.raw``,
    steps: [
      String.raw`$\bb{\t{The relevant variables are }\b{x}\ (\bt{width})\t{ and }\pu{y}\ (\put{length})}$<br>Note: You can call $\bt{width}$ and $\put{length}$ any letter you want, you don't have to use $\b{x}$ and $\pu{y}$`,
      String.raw`$$\gb{A=\b{x}\cdot\pu{y}}$$`,
      String.raw`$\bb{\t{Based on the below diagram, the amount of fence used is }2\b{x}+\pu{y}}$<br>`+picsize('fencevar',500)+String.raw`<br>$\bb{\t{Since the farmer uses }\pk{`+d+String.raw`}\t{ yards of the fence,}}$$$\gb{2\b{x}+\pu{y}=\pk{`+d+`}}$$`,
      String.raw`$$\pu{y}=\pk{`+d+String.raw`}-2\b{x}$$`,
      String.raw`$$\begin{aligned}\gb{A}&=\gb{\b{x}\cdot \pu{y}}\\[4pt]&=\gb{\b{x}\cdot(\pk{`+d+String.raw`}-2\b{x})}\\[4pt]\gb{f(\b{x})}&=\gb{\b{x}\cdot(\pk{`+d+String.raw`}-2\b{x})}\end{aligned}$$`,
      String.raw`$$\a{\gb{f(\b{x})}&=\gb{\b{x}\cdot(\pk{`+d+String.raw`}-2\b{x})}\\[4pt]&=\pk{`+d+String.raw`}\b{x}-2\b{x}^2}$$$$\gb{\a{f'(\b{x})&=\pk{`+d+String.raw`}-4\b{x}}}$$`,
      String.raw`$$\a{\gb{\pk{`+d+String.raw`}-4\b{x}}&=\gb{0}\\[4pt]\bb{\pk{`+d+String.raw`}}&=\bb{4\b{x}}\\[7pt]\bb{\b{x}}&=\bb{\frac{\pk{`+d+String.raw`}}{4}}\\[7pt]\gb{\b{x}}&=\gb{\o{`+d/4+String.raw`}}}$$`,
      String.raw`$\ga{\ob{f'(x)=\pk{`+d+String.raw`}-4\b{x}}\\[4pt]\gb{f''(x)=-4}}$`,
      String.raw`$$\bb{f''(x)=-4\r{<0}\t{ on }(0,\infty)}$$`,
      String.raw`$\gb{\t{Because }f''(x)\t{ is always $\rt{negative}$, a $\bt{width}$ of $\bt{`+d/4+String.raw`}$ gives the $\rt{maximum}$ area}}$`,
      String.raw`$$\a{\gb{\pu{y}}&=\bb{\pk{`+d+String.raw`}-2\b{x}}\\[4pt]&=\gb{\pk{`+d+String.raw`}-2(\o{`+d/4+String.raw`})}\\[4pt]&=\ob{`+d/2+String.raw`}}$$`,
    ],
  }
  }

  const pic=function(str){
    return `<p><img src="/pictures/`+str+'.png" alt="HTML5 Icon" ></p>';
  }

  const picsize=function(str,l){
    return `<p><img src="/pictures/`+str+'.png" alt="HTML5 Icon" style="width:'+l+'px;height:'+l+'px;"></p>';
  }

  signcharts=function(f,xs,zs){
    strs1=['TtFsF','TtTsF','TtTsT']
    strs=[];;
    for(let i=0;i<strs1.length;i++){
        strs[i]=signchartfig(f,xs,zs,strs1[i]);
    }
    return strs;
  }

  signchartfig=function(f,xs,zs,str1){
    str='signchartc';
    numberline='';
    for(let i=0;i<zs.length;i++){
        sign='p';
        if(f(zs[i])<0){
            sign='m';
        }
        numberline=numberline+'_'+zs[i]+'_'+sign;
        if(i<xs.length){
            numberline=numberline+'_'+xs[i];
        }
    }
    return '\\p'+pic(str+str1+numberline);
  }

  const fevalsigns=function(f,fs,fn,zs){
    str='<p>';
    for(let i=0;i<zs.length;i++){
        r='(\\pu{'+zs[i]+'})';
        y=f(zs[i]);
        ineq='\\g{>0}';
        if(y<0){
            ineq='\\r{<0}';
        }
        str=str+'<p>\\p$\\gb{'+fn+r+'}=\\bb{'+fs.replaceAll('x',r)+'}$</p>\\p<p>\\p$\\phantom{\\gb{'+fn+r+'}}=\\bb{'+y+'}$\\p$\\hspace{0.5cm}\\gb{'+ineq+'}$</p>'
        // if(i<zs.length-1){
        //     str=str+'\\\\[4pt]';
        // }
    }
    return str;//+'}$$</p>'
  }

  const posnegzs=function(f,xs,zs){
    n=zs.length-1;
    pzsi=[];
    nzsi=[];

    str='(-\\infty,\\o{'+xs[0]+'})';
    if(f(zs[0])>=0){
        pzsi=pzsi.concat(str);
    }
    else{
        nzsi=nzsi.concat(str);
    }

    for(let i=1;i<zs.length-1;i++){
        str='(\\o{'+xs[i-1]+'},\\o{'+xs[i]+'})';
        if(f(zs[i])>=0){
            pzsi=pzsi.concat(str);
        }
        else{
            nzsi=nzsi.concat(str);
        }
    }

    str='(\\o{'+xs[n-1]+'},\\infty)';
    if(f(zs[n])>=0){
        pzsi=pzsi.concat(str);
    }
    else{
        nzsi=nzsi.concat(str);
    }
    v=[];
    v.push(pzsi,nzsi);
    return v;
  }

  const fsignex1=function(fn,szsi,ineq,fps1,ineq11){
    str='bb';
    if(fps1.length>0){
        str='gb'
    }
    fpexp1=`<pli>$\\`+str+`{`+fn+`(x)`;
    if(szsi.length==0){
        if(ineq.length>8){
            ineq=ineq.substring(8);
        }
        return fpexp1+`\\t{ is never }`+ineq+`}$</pli>`;
    }
    fpexp1=fpexp1+ineq+'\\t{ on }';
    for(let i=0;i<szsi.length;i++){
        fpexp1=fpexp1+szsi[i];
        if(i<szsi.length-1){
            fpexp1=fpexp1+',\\ '
        }
    }
    if(fps1.length>0){
        fpexp1=fpexp1+'\\t{ b/c }'+fps1+'(x)'+ineq11;
    }
    return fpexp1+'}$</pli>';
  }

  const fsignex=function(fn,pzsi,nzsi,ineq1,ineq2,fps1){
    return '<p><ol>'+fsignex1(fn,pzsi,ineq1,fps1,'\\g{>0}')+fsignex1(fn,nzsi,ineq2,fps1,'\\r{<0}')+'</ol></p>';
  }

  signchartprob=function(fs,fps,fp,zw,xs,zs,fps1,qstr1,qstr2){
    strs=signcharts(fp,xs,zs);
    xs.sort();
    xssol=xss(xs);
    str0='';
    fn=`f'`;
    strs1=['\\t{ is }\\gt{increasing}','\\t{ is }\\rt{decreasing}',`f'`]
    if(fps1.length>0){
        str0=`$$\\bb{f'(x)=`+fps1+'}$$\\p'
        fn=`f''`;
        strs1=['\\t{ is concave }\\gt{up}','\\t{ is concave }\\rt{down}',`f''`];
    }
    critstr=String.raw`<p>\p$$\gb{`+fps+String.raw`=0}$$`;
    if(zw.length>0){
        critstr=critstr+String.raw`\p$$\bb{\a{`+zw+`}}$$`
    }
    critstr=critstr+`\\p$$\\gb{`+xssol+`}$$</p>`;
    posneg=posnegzs(fp,xs,zs);
    pzsi=posneg[0];
    nzsi=posneg[1];

   
    
    return {question: String.raw`<p>$$f(x)=`+fs+`$$Find the intervals where $f(x)$ is `+qstr1+` and where $f(x)$ is `+qstr2+`</p>`,
    steps: [
        String.raw`<p>\p`+str0+`$$\\gb{`+fn+`(x)=`+fps+`}$$</p>`,
        critstr,
        strs[0],
        strs[1],
        fevalsigns(fp,fps,fn,zs),
        strs[2],
        fsignex(fn,pzsi,nzsi,'\\g{>0}','\\r{<0}',''),
        fsignex('f',pzsi,nzsi,strs1[0],strs1[1],strs1[2]),
    ],
    }
  }

  const incdec=function(fs,fps,fp,zw,xs,zs){
   return signchartprob(fs,fps,fp,zw,xs,zs,'','increasing','decreasing');
  }

  const concavcubic=function(fs,fps,fpps,zw,fpp,x){
    return signchartprob(fs,fpps,fpp,zw,[x],[x-1,x+1],fps,'concave up','concave down');
  }

  const signs=function(f,zs){
    signs1=[];
    for(let i=0;i<zs.length;i++){
        signs1[i]=1;
        if(f(zs[i])<0){
            signs1[i]=-1;
        }
    }
    return signs1;
  }

  const maxminex1=function(ms,mnotM){
    strs=['maximum','\\gt{positive}','\\rt{negative}'];
    if(mnotM){
        strs=['minimum','\\rt{negative}','\\gt{positive}'];
    }
    start=String.raw`<pli>$\gb{\begin{flalign}&f(x)\t{ has `;
    end=String.raw`goes from }`+strs[1]+`\\t{ to }`+strs[2]+`\\end{flalign}}$</pli>`
    middle=String.raw`}\t{ b/c }f'(x)\\[2pt]&\t{`;
    if(ms.length==0){
        return start+String.raw`no relative `+strs[0]+middle+`never `+end
    }
    return start+'a relative '+strs[0]+' at $x='+ms+middle+end;
  }

  const maxminex=function(xs,zs,fp,fpppint,fppmint){
    ss=signs(fp,zs);
    ms='';
    Ms='';
    for(let i=0;i<xs.length;i++){
        if(ss[i]<0&&ss[i+1]>0){
            ms=ms+'\\o{'+xs[i]+'}, \\';
        }
        else if(ss[i]>0&&ss[i+1]<0){
            Ms=Ms+'\\o{'+xs[i]+'}, \\';
        }
    }
    if(ms.length>0){
        ms=ms.substring(0,ms.length-2)+"$";
    }
    if(Ms.length>0){
        Ms=Ms.substring(0,Ms.length-2)+"$";
    }
    v=posnegzs(fp,xs,zs);
    ans=`<p><ol>`+maxminex1(Ms,false)+maxminex1(ms,true)+'</ol></p>';
    return {
        question: String.raw`<p>$f'(x)\g{>0}\t{ on }`+v[0]+String.raw`$ and $f'(x)\r{<0}\t{ on }`+v[1]+String.raw`$.</p>\p<p>$f''(x)\g{>0}\t{ on }`+fpppint+String.raw`$ and $f''(x)\r{<0}\t{ on }`+fppmint+`$</p>\\p<p>Find the $x$-values where $f(x)$ has a relative maximum and the $x$-values where $f(x)$ has a relative minimum</p>`,
        steps:[
            signchartfig(fp,xs,zs,'TtFsT'),
            ans,
        ]
    }
  }

window.j = {
    startCollapsed: false,
    lessonNum: 10,
    lessonName: "Test 2 Practice Exam",
    intro: String.raw`<p>The second exam will be on October 20th.</p>\p<p>It will have the following structure<ol><pli>Question 1: $f(x)=\t{\{a fraction\}}$. <ol><pli>Find the horizontal asymptote(s) of $f(x)$ if there are any horizontal asymptotes (section 10.1)</pli><pli>Part b: Find the vertical asymptotes of $f(x)$ if there are vertical asymptotes (section 10.2)</pli></ol></pli><pli>Second question: $f(x)=\t{\{a polynomial of degree 3\}}$. Find the intervals where $f(x)$ is increasing and the intervals where $f(x)$ is decreasing (section 10.3)</pli><pli>Third question: $f(x)=\t{\{same equation as problem 2\}}$ Find the intervals where the same $f(x)$ is concave up and concave down (section 10.5)</pli><pli>Fourth problem: $f(x)=\t{\{same equation as problem 2\}}$. Find where $f(x)$ has a relative max or a relative min. If you weren't able to do problems 2 and 3, you may assume that $f'(x)$ is positive on {these intervals} and negative on {these intervals} and $f''(x)$ is positive on {these intervals} and negative on {these intervals} (section 10.4)</pli><pli>Fifth Problem: $f(x)=\t{\{a polynomial of degree 2, 3, or 4\}}$. Find the absolute max and min of $f(x)$ on $[a,b]$ (section 10.6)</pli><pli>Sixth Problem: $f(x)=\t{\{a polynomial of degree 2 or 4\}}$. Find the absolute max and min of $f(x)$ on $(0,\infty)$ (section 10.7)</pli><pli>Seventh Problem: A farmer wants to build a three-sided rectangular fence near a river, using $\t{\{a number\}}$ yards of fencing. Assume that the river runs straight and that John need not fence in the side next to the river. What are the $\t{length}$ and the $\t{width}$ of the fence which maximizes the enclosed area? (section 10.8)</pli></ol></p>`,
    sections: [
    {
        name: String.raw`<p>Find horizontal asymptotes of a function</p>`,
        backgroundColor: "green",
        web: "Hw 3: 1, 5-7, 9; Hw 4: 1-7, 11; Hw 5: 2, 5-7; PT 2: 1-6, 8; Hw 6: 4, 7, 9-10; PT 3: 8; Hw 9: 8, 10; PF: 4, 6, 10-12, 14-15",
        book: "148",
        exam: "Up to one question on Test 2, Up to one question on Final",
        intro: String.raw`<p>In this section, we describe how to find the horizontal asymptotes of a function.</p>\p<p>In this class, a horizontal asymptote is a horizontal line that the graph of a function $\btip{\t{approaches on the far right of the graph}}{\t{In more complicated situations, a horizontal}\\\t{asymptote could be on the far left side instead}}$</p>\p<p>For example, $y=\pu{1}$ is a horizontal asymptote of the below graph.</p>\p<p><img src="/pictures/NotesHA1AtInfinity.png" alt="HTML5 Icon" style="width:500px;height:500px;"></p>\p<p>Since $\displaystyle\lim_{x\to\infty}f(x)=\put{a number}$ means that $y$ approaches $y=\put{that number}$ on the far right of the graph, you can find a horizontal asymptote of $f(x)$ by calculating $\displaystyle\lim_{x\to\infty}f(x)$:</p>\p<p><ol><pli>If $\displaystyle\lim_{x\to\infty}f(x)=\put{a number}$, then $\btip{\t{the horizontal asymptote of }f(x)}{f(x)\t{ could have a second horizontal}\\\t{asymptote corresponding to }\displaystyle\lim_{x\to-\infty}f(x)\\\t{but this does not happen in our course}}$ is $y=\put{that number}$</pli><pli>If $\displaystyle\lim_{x\to\infty}f(x)=\infty$, then $\btip{f(x)\t{ has no horizontal asymptotes}}{f(x)\t{ could still have a horizontal}\\\t{asymptote corresponding to }\displaystyle\lim_{x\to-\infty}f(x)\\\t{but this does not happen in our course}}$</pli></ol>\p In particular, when $\displaystyle\lim_{x\to\infty}\frac{\r{a}x^{\go{n}}+\t{terms with }x\t{ to powers less than }\go{n}}{\lb{b}x^{\g{m}}+\t{terms with }x\t{ to powers less than }\g{m}}$ we have the following:</p>\p<p><ol><pli>$\btip{\t{If the numerator has the higher power}}{\go{n}>\g{m}}$, then $\displaystyle\lim_{x\to\infty}f(x)=\infty$ and $f(x)$ has no horizontal asymptotes</pli><pli>$\btip{\t{If the denominator has the higher power}}{\g{m}>\go{n}}$, then $\displaystyle\lim_{x\to\infty}f(x)=\pu{0}$ and the horizontal asymptote of $f(x)$ is $y=\pu{0}$</pli><pli>$\btip{\t{If the denominator and the numerator have the same highest power}}{\g{m}=\go{n}}$, then $\displaystyle\lim_{x\to\infty}f(x)=\pu{\frac{\r{a}}{\lb{b}}}$ and the horizontal asymptote of $f(x)$ is $y=\pu{\frac{\r{a}}{\lb{b}}}$</pli></ol></p>`,
        // specific: String.raw`<p>$$f(x)=\displaystyle\frac{\r{7}x^{\go{3}}+8x+1}{\lb{4}x^{\g{6}}+1}$$Find the horizontal asymptote(s) of $f(x)$</p>`,
        rightColWidth: 50,
        steps: {
            general:{
                question:String.raw`<p>$$f(x)=\displaystyle\frac{\r{a}x^{\go{n}}+\t{terms with }x\t{ to powers less than }\go{n}}{\lb{b}x^{\g{m}}+\t{terms with }x\t{ to powers less than }\g{m}}$$Find the horizontal asymptote(s) of $f(x)$</p>`,
                steps:[
                    String.raw`\p<p>Determine whether $\btip{\go{n}}{\got{The highest power in the numerator}}$ is greater than, less than, or equal to $\btip{\g{m}}{\gt{The highest power in the denominator}}$</p>`,
                    String.raw`\p<p>Find the horizontal asymptote(s) of $f(x)$:</p>\p<p><ol><pli>If $\btip{\go{n}>\g{m}}{\t{The numerator has}\\\t{the higher power}}$, $f(x)$ has\p no horizontal asymptotes</pli><pli>If $\btip{\g{m}>\go{n}}{\t{The denominator has}\\\t{the higher power}}$, the horizontal asymptote of $f(x)$ is\p $y=0$</pli><pli>If $\btip{\g{m}=\go{n}}{\t{The denominator and}\\\t{the numerator have}\\\t{the same highest power}}$, the horizontal asymptote of $f(x)$ is\p $y=\frac{\r{a}}{\lb{b}}$</pli></ol>\p<b>Note: You must include the $y=$; it will be worth points on the exam.</b></p>`,
                ]
            },
            specific:ha(String.raw`\frac{\r{7}x^{\go{3}}+8x+1}{\lb{4}x^{\g{6}}+1}`,3,6,7,4)
        },
        examples: [
            ha(String.raw`\frac{\r{10}x^{\go{4}}+6}{\lb{7}x^{\g{2}}+2}`,4,2,10,7),
            ha(String.raw`\frac{\r{5}x^{\go{2}}+6}{\lb{4}x^{\g{2}}+4x}`,2,2,5,4),
            ha(String.raw`\frac{\r{2}x^{\go{3}}+6}{\lb{7}x^{\g{5}}+2x^2}`,3,5,2,7),
            ha(String.raw`\frac{\r{2}x+1}{\lb{3}x+4}`,1,1,2,3),
            ha(String.raw`\frac{\r{5}x^{\go{7}}+7}{\lb{7}x^{\g{4}}+2}`,7,4,5,7),
            ha(String.raw`\frac{\r{6}x^{\go{3}}+5x}{x^{\g{5}}+2}`,3,5,6,1),
        ],
        },
        {
        name: String.raw`<p>Find vertical asymptotes of a function</p>`,
        backgroundColor: "green",
        web: "Hw 3: 1, 5-7, 9; Hw 4: 1-7, 11; Hw 5: 2, 5-7; PT 2: 1-6, 8; Hw 6: 4, 7, 9-10; PT 3: 8; Hw 9: 8, 10; PF: 4, 6, 10-12, 14-15",
        book: "148",
        exam: "Up to one question on Test 2, Up to one question on Final",
        intro: String.raw`<p>In this section, we describe how to find the vertical asymptotes of a function.</p>\p<p>A vertical asymptote of a graph is a vertical line that a graph approaches $\btip{\t{as }x\t{ approaches }\got{an $x$-value}}{\t{from the right and/or left side}}$</p>\p<p>For example, $x=\go{2}$ is a vertical asymptote of the below graph.</p>\p<p><img src="/pictures/NotesVA1Right.png" alt="HTML5 Icon" style="width:500px;height:500px;"></p>\p<p>One can show that $x=\go{a}$ is a vertical asymptote of $f(x)$ if $\displaystyle\lim_{x\to\go{a}^-}f(x)$ and/or $\displaystyle\lim_{x\to\go{a}^+}f(x)$ are either $\infty$ or $-\infty$</p>\p<p>In this class, we will only find vertical asymptotes of fractions.</p>\p<p>In this class, the vertical asymptotes of a fraction are $x=\got{first $x$-value where the denominator is 0},$ $x=\got{second $x$-value where the denominator is 0},$$\ \cdots\ ,\ $$x=\got{last $x$-value where the denominator is 0}$</p>`,
        rightColWidth: 50,
        steps: {
            general:{
                question:String.raw`<p>$$f(x)=\frac{\t{\{numerator\}}}{\rt{\{denominator\}}}$$Find the vertical asymptote(s) of $f(x)$</p>`,
                steps:[
                    String.raw`\p<p>Solve $\rt{\{denominator\}}=0$ for $x$:</p>`,
                    String.raw`\p<p>The vertical asymptotes of $f(x)$ are \p$x=\got{first $x$-value from step 1}$, $x=\got{second $x$-value from step 1}$, ..., $x=\got{last $x$-value from step 1}$</p>`,
                ]
            },
            specific:va(String.raw`\frac{x+3}{\r{3x-2}}`,`3x-2`,`3x=2`,[`\\frac{2}{3}`]),
        },
        examples: [
            va(String.raw`\frac{x+4}{\r{x-6}}`,`x-6`,``,[6]),
            va(String.raw`\frac{x}{\r{x^2-x-2}}`,`x^2-x-2`,`(x-2)(x+1)=0`,[2,-1]),
            va(String.raw`\frac{x^2+1}{\r{x^2-2x+1}}`,`x^2-2x+1`,`(x-1)(x-1)=0`,[1]),
            va(String.raw`\frac{2x^4+1}{\r{2x+4}}`,`2x+4`,`2x=-4`,[-2]),
            va(String.raw`\frac{x^2+4}{\r{x^2-4}}`,`x^2-4`,`(x-2)(x+2)=0`,[2,-2]),
            va(String.raw`\frac{4}{\r{8x+5}}`,`8x+5`,`8x=-5`,[`-\\frac{5}{8}`]),
        ],
        },
    {
        name: String.raw`<p>Finding where a function is increasing and decreasing</p>`,
        backgroundColor: "green",
        web: "Hw 3: 1, 5-7, 9; Hw 4: 1-7, 11; Hw 5: 2, 5-7; PT 2: 1-6, 8; Hw 6: 4, 7, 9-10; PT 3: 8; Hw 9: 8, 10; PF: 4, 6, 10-12, 14-15",
        book: "148",
        exam: "Up to one question on test 2 and up to one question on the final",
        intro: String.raw`<p>$f(x)$ is <span class='green'>increasing</span> when its slope is \p<span class='green'>positive</span>\p and <span class='red'>decreasing</span> when its slope is \p<span class='red'>negative</span></p>\p<p>Since $f'(x)$ is the slope of $f(x)$, we know that $f(x)$ is <span class='green'>increasing</span> when \p$f'(x)\g{>0}$\p and $f(x)$ is <span class='red'>decreasing</span> when\p $f'(x)\r{<0}$</p>`,
        rightColWidth: 50,
        steps:{
            general:{question:String.raw`<p>$$f(x)=\{\t{an equation}\}$$Find the intervals where $f(x)$ is increasing and where $f(x)$ is decreasing</p>`,
            steps:[
                String.raw`\p<p>Find $f'(x)$:</p>`,
                String.raw`\p<p>Solve $f'(x)=0$ for $x$. \pI will the $x$-values you get <span class='orange'>critical points</span></p>`,
                String.raw`\p<p>Make a number line with the <span class='orange'>critical points</span> on it</p>`,
                String.raw`\p<p>The critical points divide the number into smaller parts called intervals. Add an $x$-value (called a <span class='purple'>test point</span>) to each interval</p>`,
                String.raw`\p<p>Calculate $f'(\put{each test point})$ and determine\p whether it is <span class='green'>positive</span> or <span class='red'>negative</span>.</p>`,//It is often easier to calculate using the factored version of $f'(x)$</p>`,
                String.raw`\p<p>Add a $\g{+}$ sign above each interval containing a test point with a\p <span class='green'>positive</span> $f'$ value\p and a $\r{-}$ sign above each interval containing a test point with a \p<span class='red'>negative</span> $f'$ value</p>`,
                String.raw`\p<p>Determine the intervals where $f'(x)$ is <span class='green'>positive</span> and <span class='red'>negative</span><ol><pli>$f'(x)\g{>0}$ in the intervals with a \p$\g{+}$ above them</pli><pli>$f'(x)\r{<0}$ in the intervals with a \p$\r{-}$ sign above them.</pli></ol>\p<b>Note: The endpoints of the intervals are the\p $\btip{\o{\textbf{critical points}}}{x\t{-values where }f'(x)=0}$ not the $\btip{\pu{\textbf{test points}}}{\t{the }x\t{-values on each side of the critical points}}$</b></p>`,
                String.raw`\p<p>Determine the intervals where $f(x)$ is <span class='green'>increasing</span> and <span class='red'>decreasing</span><ol><pli>$f(x)$ is <span class='green'>increasing</span> in the intervals\p where $f'(x)\g{>0}$</pli><pli>$f(x)$ is <span class='red'>decreasing</span> in the intervals where \p$f'(x)\r{<0}$</pli></ol>\p<b>Note: The endpoints of the intervals are the\p $\btip{\o{\textbf{critical points}}}{x\t{-values where }f'(x)=0}$ not the $\btip{\pu{\textbf{test points}}}{\t{the }x\t{-values on each side of the critical points}}$</b></p>\p<p>\p<b>Note: Make sure that you justify your answer by mentioning something like "b/c $f'(x)\g{>0}$" for $\g{\textbf{increasing}}$ and "b/c $f'(x)\r{<0}$" for $\r{\textbf{decreasing}}$</b></p>`,
            ]
            },
            specific:incdec(`2x^3+6x^2+6x`,`6x^2+12x+6`,x=>6*Math.pow(x,2)+12*x+6,String.raw`6(x^2+2x+1)&=0\\[4pt]6(x+1)(x+1)&=0\\[4pt]x+1=0,\ x+1&=0`,[-1],[-2,0]),
        },
        examples: [
            incdec(`x^3-3x`,`3x^2-3`,x=>3*Math.pow(x,2)-3,String.raw`3(x^2-1)&=0\\[4pt]3(x-1)(x+1)&=0\\[4pt]x-1=0,\ x+1&=0`,[-1,1],[-2,0,2]),
            incdec(`-2x^3+3x^2+12x`,`-6x^2+6x+12`,x=>-6*Math.pow(x,2)+6*x+12,String.raw`-6(x^2-x-2)&=0\\[4pt]-6(x-2)(x+1)&=0\\[4pt]x-2=0,\ x+1&=0`,[-1,2],[-2,0,3]),
            incdec(`x^3-3x^2`,`3x^2-6x`,x=>3*Math.pow(x,2)-6*x,String.raw`3x(x-2)&=0\\[4pt]3x=0,\ x-2&=0`,[0,2],[-1,1,3]),
            incdec(`-x^3-3x^2`,`-3x^2-6x`,x=>-3*Math.pow(x,2)-6*x,String.raw`-3x(x+2)&=0\\[4pt]-3x=0,\ x+2&=0`,[-2,0],[-3,-1,1]),
            incdec(`x^3+3x^2-24x+1`,`3x^2+6x-24`,x=>3*Math.pow(x,2)+6*x-24,String.raw`3(x^2+2x-8)&=0\\[4pt]3(x+4)(x-2)&=0\\[4pt]x+4=0,\ x-2&=0`,[-4,2],[-5,0,3]),
        ],
        },
        {
        name: String.raw`<p>Finding where a function has a relative maximum or relative minimum</p>`,
        backgroundColor: "green",
        web: "Hw 3: 1, 5-7, 9; Hw 4: 1-7, 11; Hw 5: 2, 5-7; PT 2: 1-6, 8; Hw 6: 4, 7, 9-10; PT 3: 8; Hw 9: 8, 10; PF: 4, 6, 10-12, 14-15",
        book: "148",
        exam: "Up to one question on test 2 and up to one question on the final. I will ask to find the increasing and decreasing intervals in one question on the exam. Then I will ask in another question to find the relative maxima and minima of the same equation either using your answer from the previous question or intervals I give you where $f'(x)$ is positive and negative (so you can still do the problem if you didn't know how to do the increasing/decreasing problem)",
        intro: String.raw`<p>A relative maximum is a point on the graph where $y$ is higher than nearby points.</p>\p<p>The below graph has a relative maximum at $x=\o{2}$ and $y=\pu{4}$</p>\p<p><img src="/pictures/MaxMin1Ex1.png" alt="HTML5 Icon" style="width:500px;height:500px;"></p>\p<p>From the picture we see that $f(x)$ is\p <span class='green'>increasing</span> on the left side of a relative maximum and \p<span class='red'>decreasing</span> on the right side of a relative maximum.</p>\p<p>Therefore, a relative maximum will occur at an $x$-value where the derivative goes from \p$\gt{positive}\t{ to }\rt{negative}$`+
        // \p$\btip{f'(x)\t{ goes from }\gt{positive}\t{ to }\rt{negative}}{\t{because a graph is }\gt{increasing}\t{ when }\t{its derivative is}\\\gt{positive}\t{ and }\rt{decreasing}\t{ when its derivative is }\rt{negative}}$
        String.raw` as you move from left to right.</p>\p<p>A relative minimum is a point on the graph where $y$ is lower than nearby points.</p>\p<p>The below graph has a relative minimum at $x=\o{2}$ and $y=\pu{1}$</p>\p<p><img src="/pictures/MaxMin2Ex1.png" alt="HTML5 Icon" style="width:500px;height:500px;"></p>\p<p>From the picture, we see that $f(x)$ is\p <span class='red'>decreasing</span> on the left side of a relative minimum and \p<span class='green'>increasing</span> on the right side of a relative minimum</p>\p<p>Therefore, a relative minimum will occur at an $x$-value where $f'(x)$ goes from\p <span class='red'>negative</span> to <span class='green'>positive</span> as you move from left to right.</p>\p<p></p>`,
        rightColWidth: 50,
        steps:{
            general:{
                question:String.raw`<p>$f'(x)$ is <span class='green'>positive</span> on the intervals {list of intervals} and <span class='red'>negative</span> on the intervals {another list of intervals}.</p>\p<p>$f''(x)$ is <span class='green'>positive</span> on the intervals {list of intervals} and <span class='red'>negative</span> on the intervals {another list of intervals}.</p>\p<p>Find the $x$-values where $f(x)$ has a relative maximum and the $x$-values where $f(x)$ has a relative minimum</p>`,
                steps:[
                    String.raw`\p<p>It helps, convert the given information about $f'(x)$ into a sign chart.</p>\p<p>On the test you should already have a sign chart for the problem from a previous exam question, but you can use the given information if you didn't make the sign chart in the other question.</p>`,
                    String.raw`\p<p>Find the points where $f(x)$ has relative maximum or minimum <ol><pli>$f(x)$ has a relative maximum at the $x$-values on the sign chart where $f'(x)$\p goes from \p<span class='green'>positive</span> to <span class='red'>negative</span> as you move from left to right</pli><pli>$f(x)$ has a relative minimum at the $x$-values on the sign chart where $f'(x)$\p goes from\p <span class='red'>negative</span> to <span class='green'>positive</span> as you move from left to right</pli></ol>\p<b>Note: Make sure you justify your answer by saying something like "because $f'(x)$ goes from <span class='green'>positive</span> to <span class='red'>negative</span>"</b></p>\p<p>\p<b>Note: If you are using the sign you used for increasing and decreasing, remember that the relevant $\mathbf{x}$-values are the\p $\btip{\o{\textbf{critical points}}}{x\t{-values where }f'(x)=0}$ not the $\btip{\pu{\textbf{test points}}}{\t{the }x\t{-values on each side of the critical points}}$</b></p>`,
                ]
            },
            specific:maxminex([-1,1],[-2,0,2],x=>(x-1)*(x+1),'(-\\infty,0)','(0,\\infty)'),
        },
        examples: [
            maxminex([-1,2],[-2,0,3],x=>-(x-2)*(x+1),'(-\\infty,0)','(0,\\infty)'),
            maxminex([-2],[-3,-1],x=>-(x+2),'(0,\\infty)','(-\\infty,0)'),
            maxminex([0,2],[-1,1,3],x=>x*(x-2),'(1,\\infty)','(-\\infty,1)'),
            maxminex([0,2],[-1,1,3],x=>-x*(x-2),'(-\\infty,1)','(1,\\infty)'),
            maxminex([-4,2],[-5,0,3],x=>(x+4)*(x-2),'(1,\\infty)','(-\\infty,1)'),
        ],
        },
        {
        name: String.raw`<p>Finding where a function is concave up and concave down</p>`,
        backgroundColor: "green",
        web: "Hw 3: 1, 5-7, 9; Hw 4: 1-7, 11; Hw 5: 2, 5-7; PT 2: 1-6, 8; Hw 6: 4, 7, 9-10; PT 3: 8; Hw 9: 8, 10; PF: 4, 6, 10-12, 14-15",
        book: "148",
        exam: "Up to one question on test 2 and up to one question on the final.",
        intro: String.raw`<p>A graph is concave up it has an upwards opening or smiley shape shape like this:</p>\p<p><iframe src="https://www.desmos.com/calculator/82voxdroo2?embed" width="500" height="500" style="border: 1px solid #ccc" frameborder=0></iframe></p>\p<p>The graph might be only part of the shape like in these examples:</p>\p<p><img src="/pictures/uphalf1.png" alt="HTML5 Icon" style="width:500px;height:500px;"></p>\p<p><img src="/pictures/uphalf2.png" alt="HTML5 Icon" style="width:500px;height:500px;"></p>\p<p><img src="/pictures/uphalf3.png" alt="HTML5 Icon" style="width:500px;height:500px;"></p>\p<p>One can show that a graph is concave <span class='green'>up</span> where its <span class='lightblue'>slope</span> is <span class='green'>increasing</span>.</p>\p<p>Therefore, a graph is concave <span class='green'>up</span> when its $\btip{\lbt{derivative}\t{ is }\gt{increasing}}{\t{because }\lbt{slope}\t{ is the}\\\t{same thing as }\lbt{derivative}}$.</p>\p<p>This means that a graph is concave <span class='green'>up</span> when $\btip{\t{the derivative of }\lbt{the derivative}\t{ is }\gt{positive}}{\lbt{something}\text{ is }\gt{increasing}\t{ when its derivative is }\gt{positive}}$</p>\p<p>So, $f(x)$ is concave <span class='green'>up</span> when $f''(x)\g{>0}$.</p>\p<p>A graph is concave down when it has a downwards opening or frowney shape like this:</p>\p<p><iframe src="https://www.desmos.com/calculator/nngpwoxjmk?embed" width="500" height="500" style="border: 1px solid #ccc" frameborder=0></iframe></p>\p<p>The graph might be only part of the shape like in these examples:</p>\p<p></p>\p<p><img src="/pictures/downhalf1.png" alt="HTML5 Icon" style="width:500px;height:500px;"></p>\p<p><img src="/pictures/downhalf2.png" alt="HTML5 Icon" style="width:500px;height:500px;"></p>\p<p><img src="/pictures/downhalf3.png" alt="HTML5 Icon" style="width:500px;height:500px;"></p>\p<p>One can show that a graph is concave <span class='red'>down</span> where its <span class='lightblue'>slope</span> is <span class='red'>decreasing</span>.</p>\p<p>Therefore, a graph is concave <span class='red'>down</span> when its $\btip{\lbt{derivative}\t{ is }\rt{decreasing}}{\t{because }\lbt{slope}\t{ is the}\\\t{same thing as }\lbt{derivative}}$.</p>\p<p>This means that a graph is concave <span class='red'>down</span> when $\btip{\t{the derivative of }\lbt{the derivative}\t{ is }\rt{negative}}{\lbt{something}\text{ is }\rt{decreasing}\t{ when its derivative is }\rt{negative}}$</p>\p<p>So, $f(x)$ is concave <span class='red'>down</span> when $f''(x)\r{<0}$.</p>`,
        rightColWidth: 50,
        steps:{
            general:{
                question:String.raw`<p>$f(x)=\t{\{an equation\}}$</p>\p<p>Find the intervals where $f(x)$ is concave up and the intervals where $f(x)$ is concave down</p>`,
                steps:[
                    String.raw`\p<p>Find $f''(x)$:</p>`,
                    String.raw`\p<p>Solve $f''(x)=0$ for $x$.\p I will the $x$-values you get <span class='orange'>second derivative critical points</span></p>`,
                    String.raw`\p<p>Make a number line with the <span class='orange'>second derivative critical points</span> on it</p>`,
                    String.raw`\p<p>The second derivative critical points divide the number into smaller parts called intervals. Add an $x$-value (called a <span class='purple'>test point</span>) to each interval</p>`,
                    String.raw`\p<p>Calculate $f''(\put{each test point})$ and determine\p whether it is <span class='green'>positive</span> or <span class='red'>negative</span>.</p>`,
                    String.raw`\p<p>Add a $\g{+}$ sign above each interval containing a test point with a\p <span class='green'>positive</span> $f''$ value\p and a $\r{-}$ sign above each interval containing a test point with a\p <span class='red'>negative</span> $f''$ value</p>`,
                    String.raw`\p<p>Determine the intervals where $f''(x)$ is <span class='green'>positive</span> and <span class='red'>negative</span><ol><pli>$f''(x)\g{>0}$ in the intervals with a $\g{+}$ above them</pli><pli>$f''(x)\r{<0}$ in the intervals with a $\r{-}$ sign above them.</pli></ol><b>Note: The endpoints of the intervals are the $\btip{\o{\textbf{second derivative critical points}}}{x\t{-values where }f''(x)=0}$ not the $\btip{\pu{\textbf{test points}}}{\t{the }x\t{-values on each side of the critical points}}$</b></p>`,
                    String.raw`\p<p>Determine the intervals where $f(x)$ is concave <span class='green'>up</span> and concave <span class='red'>down</span><ol><pli>$f(x)$ is concave <span class='green'>up</span> in the intervals where\p $f''(x)\g{>0}$</pli><pli>$f(x)$ is concave <span class='red'>down</span> in the intervals where\p $f''(x)\r{<0}$</pli></ol><b>Note: The endpoints of the intervals are the \p$\btip{\o{\textbf{second derivative critical points}}}{x\t{-values where }f''(x)=0}$ not the $\btip{\pu{\textbf{test points}}}{\t{the }x\t{-values on each side of the critical points}}$</b></p>\p<p><b>Note: Make sure that you justify your answer by mentioning something like "b/c $f''(x)\g{>0}$" for concave $\gt{up}$ and "b/c $f''(x)\r{<0}$" for concave $\rt{down}$</b></p>`,
                ]
            },
            specific:concavcubic('2x^3+6x^2+6x',`6x^2+12x+6`,`12x+12`,'12x=-12\\\\[4pt]',x=>12*x+12,-1),
        },
        examples: [
            concavcubic('x^3-3x',`3x^2-3`,`6x`,'',x=>6*x,0),
            concavcubic('-2x^3+12x^2+12x',`-6x^2+24x+12`,`-12x+24`,'-12x=-24\\\\[4pt]',x=>-12*x+24,2),
            concavcubic('x^3-3x^2',`3x^2-6x`,`6x-6`,'6x=6\\\\[4pt]',x=>6*x-6,1),
            concavcubic('-x^3-3x^2',`-3x^2-6x`,`-6x-6`,'-6x=6\\\\[4pt]',x=>-6*x-6,-1),
            concavcubic('x^3+3x^2-24x+1',`3x^2+6x-24`,`6x+6`,'6x=-6\\\\[4pt]',x=>6*x+6,-1),
        ],
        },
        {
            name: String.raw`<p>$\t{Find the absolute maximum and minimum of a function on }[a,b]$</p>`,
            backgroundColor: "green",
            web: "Hw 3: 1, 5-7, 9; Hw 4: 1-7, 11; Hw 5: 2, 5-7; PT 2: 1-6, 8; Hw 6: 4, 7, 9-10; PT 3: 8; Hw 9: 8, 10; PF: 4, 6, 10-12, 14-15",
            book: "148",
            exam: "Up to one question on Test 2, Up to one question on Final",
            intro: String.raw`<p>In this section, we describe how to find the absolute maximum and absolute minimum of $f(x)$ on $[\pu{a},\pu{b}]$.</p><ol><pli>The absolute maximum of a graph is the highest $y$-value of the entire graph</pli><pli>the absolute minimum of a graph is the lowest $y$-value on the entire graph</pli><ol>\p<p>In this class the $x$-values of the max/min of $f(x)$ over $[\pu{a},\pu{b}]$ are each either a $\btip{\ot{critical point}}{\o{\t{an }x\t{-value where }\\[4pt]f'(x)=0}}$ or an $\btip{\put{endpoint}\t{ of the interval}}{\pu{a}\t{ or }\pu{b}}$</p>\p<p>The $\btip{\put{endpoints}}{\pu{a}\t{ or }\pu{b}}$  are given in the problem</p>\p<p>Therefore, to find the max/min, first find the $\btip{\ot{critical points}}{\o{\t{the }x\t{-values where }\\[4pt]f'(x)=0}}$.</p>\p<p>Then plug in the $\btip{\ot{critical points}}{\o{\t{the }x\t{-values where }\\[4pt]f'(x)=0}}$ and the $\btip{\put{endpoints}}{\pu{a}\t{ and }\pu{b}}$ into $f(x)$ to determine which of them gives the absolute minimum and which of them gives the absolute maximum.</p>\p<p>The minimum is the smallest $y$-value you get from plugging in and the maximum is the largest $y$-value you get from plugging in.</p>`,
            //</p>\p<p>Then plug in each of the $\btip{\ot{critical points}}{\o{\t{the }x\t{-values where }\\[4pt]f'(x)=0}}$ and $\btip{\put{the endpoints}}{\pu{a}\t{ and }\pu{b}}$ into $f(x)$</p>\p<p>The absolute maximum is the largest $y$-value you get and the absolute minimum is the smallest $y$ you get
            rightColWidth: 50,
            steps:{
                general:{
                    question:String.raw`<p>$$f(x)=\{\t{an equation}\}$$Find the absolute max and min of $f(x)$ on the interval $[\pu{a},\pu{b}]$</p>`,
                    steps:[
                        String.raw`\p<p>Find $f'(x)$</p>`,
                        String.raw`\p<p>Solve $f'(x)=0$ for $x$.\p I will call the $x$-values you get $\ot{critical points}$</p>`,
                        String.raw`\p<p>Plug in each $\btip{\ot{critical point}}{\o{x\t{-value where }f'(x)=0}}$ and the $\btip{\put{endpoints}}{\pu{a}\t{ and }\pu{b}}$ into\p $f(x)$</p>`,
                        String.raw`\p<p>Determine the max and min<ol><pli>The absolute max is the\p largest $y$-value from step 3</pli><pli>the absolute min is the\p smallest $y$-value from step 3</pli></ol></p>`,
                    ]
                },
                specific:maxminab(x=>Math.pow(x,4)-4*x,"x^4-4x",0,2,"4x^3-4","4x^3=4\\\\[4pt]x^3=1",[1]),
            },
            examples: [
                maxminab(x=>Math.pow(x,2)-4*x,"x^2-4x",1,4,"2x-4","2x=4",[2]),
                maxminab(x=>Math.pow(x,3)-3*x,"x^3-3x",-1,2,"3x^2-3","3x^2=3\\\\[4pt]x^2=1",[-1,1]),
                maxminab(x=>Math.pow(x,4)+1,"x^4+1",-2,1,"4x^3","x^3=0",[0]),
                maxminab(x=>Math.pow(x,3)-3*Math.pow(x,2),"x^3-3x^2",-1,2,"3x^2-6x","3x(x-2)=0\\\\[4pt]3x=0,\ x-2=0",[0,2]),
                maxminab(x=>-2*Math.pow(x,3)-6*Math.pow(x,2)-6*x,"-2x^3-6x^2-6x",-2,0,"-6x^2-12x-6","-6(x^2+2x+1)=0\\\\[4pt]-6(x+1)(x+1)=0\\\\[4pt]x+1=0",[-1]),
            ],
          },
        {
        name: String.raw`<p>$\t{Determine the absolute maximum and minimum of a function on }(0,\infty)$</p>`,
        backgroundColor: "green",
        web: "Hw 3: 1, 5-7, 9; Hw 4: 1-7, 11; Hw 5: 2, 5-7; PT 2: 1-6, 8; Hw 6: 4, 7, 9-10; PT 3: 8; Hw 9: 8, 10; PF: 4, 6, 10-12, 14-15",
        book: "148",
        exam: "Up to one question on Test 2, Up to one question on Final",
        intro: String.raw`<p>In this section, we describe how to find the $\rt{maximum}$ and $\gt{minimum}$ of a function on $(0,\infty)$.</p>\p<p>In this class, you will only be asked to find the $\rt{maximum}$ and $\gt{minimum}$ of $f(x)$ on $(0,\infty)$ if $f''(x)$ is always $\gt{positive}$ or always $\rt{negative}$</p>\p<p>If $f''(x)$ is always $\gt{positive}$, then the $f(x)$ is \pconcave $\gt{up}$.</p>\p<p>As seen in the below picture, it has a $\gt{minimum}$ at the $x$-value with zero slope and no $\rt{maximum}$.</p>\p<p><iframe src="https://www.desmos.com/calculator/8syqpx5pvb?embed" width="500" height="500" style="border: 1px solid #ccc" frameborder=0></iframe></p>\p<p>Since derivative means slope, $f(x)$ has a $\gt{minimum}$ when its derivative is 0.</p>\p<p>Therefore, if $f''(x)$ is always $\gt{positive}$, $\btip{\ot{critical point}}{x\t{-value where }f'(x)=0}$ of $f(x)$ is the\p $\gt{minimum}$ on $(0,\infty)$ is the and there is no $\rt{maximum}$ on $(0,\infty)$</p>\p<p>If $f''(x)$ is always $\rt{negative}$, then $f(x)$ is\p concave $\rt{down}$</p>\p<p>As seen in the below picture, $f(x)$ has $\rt{maximum}$ at at the $x$-value with zero slope and no $\gt{minimum}$.</p>\p<p><iframe src="https://www.desmos.com/calculator/hp4kvxib78?embed" width="500" height="500" style="border: 1px solid #ccc" frameborder=0></iframe></p>\p<p>Since derivative means slope, $f(x)$ has a $\rt{maximum}$ where its derivative is 0.</p>\p<p>Therefore, if $f''(x)$ is always $\rt{negative}$,\p the $\btip{\ot{critical point}}{x\t{-value where }f'(x)=0}$ of $f(x)$ is the\p $\rt{maximum}$ on $(0,\infty)$ is and there is no $\gt{minimum}$ on $(0,\infty)$</p>\p<p></p>`,
        //</p>\p<p>Then plug in each of the $\btip{\ot{critical points}}{\o{\t{the }x\t{-values where }\\[4pt]f'(x)=0}}$ and $\btip{\rt{the endpoints}}{\r{a}\t{ and }\r{b}}$ into $f(x)$</p>\p<p>The absolute maximum is the largest $y$-value you get and the absolute minimum is the smallest $y$ you get
        rightColWidth: 50,
        steps:{
            general:{question:String.raw`<p>$$f(x)=\{\t{an equation}\}$$Find the absolute max and min of $f(x)$ on the interval $(0,\infty)$</p>`,
            steps:[
                String.raw`\p<p>Find $f'(x)$</p>`,
                String.raw`\p<p>Solve $f'(x)=0$ for $x$.\p $\btip{\t{I will call the $x$-value you get the }\ot{critical point}}{\t{you will get only one critical point in this type of problem}}$</p>`,
                String.raw`\p<p>Find $f''(x)$</p>`,
                String.raw`\p<p>$\btip{\t{Determine whether }f''(x)\t{ is always $\gt{positive}$ or always $\rt{negative}$ on }(0,\infty)}{\t{one or the other will happen on this type of problem}}$</p>\p<p>Remember that in the interval $(0,\infty)$ $x$ will be positive.</p>`,
                String.raw`<p>Determine the $\rt{max}$ and $\gt{min}$<ol><pli>If $f''(x)$ is always $\gt{positive}$, then \pthe $\gt{min}$ is $f(\btip{\ot{the critical point}}{x\t{-value from step 2}})$ and there is no $\rt{max}$</pli><pli>If $f''(x)$ is always $\rt{negative}$, then \pthe $\rt{max}$ is $f(\btip{\ot{the critical point}}{x\t{-value from step 2}})$ and there is no $\gt{min}$</pli></ol></p>\p<p><b>Note: make sure to mention that $f''(x)$ is always $\gt{positive}$ or always $\rt{negative}$ (whichever one applies). This will be worth points on the exam</b></p>`,
            ]},
            specific:maxminzinf(x=>Math.pow(x,4)-4*x,"x^4-4x","4x^3-4","4x^3=4\\\\[4pt]x^3=1",1,"12x^2",true),
        },
        examples: [
            maxminzinf(x=>2*x-Math.pow(x,2),"2x-x^2","2-2x","2=2x",1,"-2",false),
            maxminzinf(x=>Math.pow(x,2)-6*x,"x^2-6x","2x-6","2x=6",3,"2",true),
            maxminzinf(x=>-Math.pow(x,4)+32*x,"-x^4+32x","-4x^3+32","-4x^3=-32\\\\[4pt]x^3=8",2,"-12x^2",false),
            maxminzinf(x=>Math.pow(x,2)-2*x+1,"x^2-2x+1","2x-2","2x=2",1,"2",true),
        ],
        },
        {
        name: String.raw`<p>Max/Min Word Problems: A Fence by a River</p>`,
        backgroundColor: "green",
        web: "Hw 3: 1, 5-7, 9; Hw 4: 1-7, 11; Hw 5: 2, 5-7; PT 2: 1-6, 8; Hw 6: 4, 7, 9-10; PT 3: 8; Hw 9: 8, 10; PF: 4, 6, 10-12, 14-15",
        book: "148",
        exam: "Up to one question on test 2 and up to one question on the final",
        intro: String.raw`<p>We will describe how to answer the following question:</p>\p<p>A farmer wants to build a three-sided rectangular fence near a river, using $\pk{d}$ yards of fencing. Assume that the river runs straight and that John need not fence in the side next to the river. What are the $\put{length}$ and the $\bt{width}$ of the fence which maximizes the enclosed area? A diagram for the problem, provided on the exam but not in WebAssign, is below:
        </p>`+picsize('fence',500)+String.raw`<p>
        We solve this problem in two stages:<ol><pli>Rewrite the word problem as maximizing a function $f(x)$</pli><pli>Use the steps from the previous lecture to maximize $f(x)$</pli></ol>
        </p>\p<p>
        In the first stage,
        <ol><pli>Write the area in terms of $\bt{width}$ and $\put{length}$</pli><pli>Use the $\btip{\pkt{amount of fence used}}{\t{given in the problem}}$ to write $\put{length}$ in terms of $\bt{width}$.<pli>Use the previous two steps to rewrite area in terms of only $\bt{width}$, i.e., $\t{area}=f(\bt{width})$</pli></ol> 
        </p>\p<p>
        In the second stage, we maximize $f(\bt{width})$ by
        <ol>
            <pli>
                Finding the critical point
            </pli>
            <pli>
                Using $f''$ to verify that the critical point is a max
            </pli>
            <pli>
                Use the critical point to find the $\put{length}$
            </pli>
            <pli>
                In WebAssign, you will have to plug the $\bt{width}$ and $\put{length}$ into the area equation to get the maximum area.
            </pli>
        </ol>
        </p>`,
        rightColWidth: 50,
        steps:{
            general:{
                question: String.raw`<p>A farmer wants to build a three-sided rectangular fence near a river, using $\pk{d}$ yards of fencing. Assume that the river runs straight and that John need not fence in the side next to the river. What are the $\put{length}$ and the $\bt{width}$ of the fence which maximizes the enclosed area?</p>`+picsize('fence',500)+String.raw``,
                steps:[
                    String.raw`<p>Determine the variables that the area depends on</p>`,
                    String.raw`<p>Write an equation for the area in terms of $\bt{width}$ and $\put{length}$</p>`,
                    String.raw`<p>Use the amount of fence used to write an equation that relates $\bt{width}$ and $\put{length}$</p>`,
                    String.raw`<p>Solve the equation from step 3 to solve for $\put{length}$ in terms of $\bt{width}$</p>\p<p></p>\p<p>It is equally correct to solve for $\bt{width}$ in terms of $\put{length}$ if you prefer that</p>`,
                    String.raw`<p>Substitute the equation from step 4 for $\put{length}$ in the area equation</p>\p<p></p>\p<p>If you solved for $\bt{width}$, then substitute for $\bt{width}$ instead</p>`,
                    String.raw`<p>Find $f'(\b{x})$</p>\p<p>I recomend distributing the $\b{x}$ to avoid product rule</p>\p<p>Using product rule is totally correct but it takes longer</p>`,
                    String.raw`<p>Solve $f'(\b{x})=0$ for $\b{x}$ to get the $\btip{\ot{critical point}}{\o{x\t{-value where }f'(x)=0}}$</p>`,
                    String.raw`<p>Find $f''(x)$</p>`,
                    String.raw`<p>$\btip{\t{Determine whether }f''(x)\t{ is always $\gt{positive}$ or always $\rt{negative}$ on }(0,\infty)}{\t{one or the other will happen on this type of problem}}$</p>\p<p>You should be able to tell whether $f''(x)$ is $\gt{positive}$ or $\rt{negative}$ without doing any math</p>\p<p>Remember that in the interval $(0,\infty)$ $x$ will be positive.</p>`,
                    String.raw`<p>Use $f''(x)$ to verify that the $\ot{critical point}$ gives the $\rt{maximum}$ area<ol><pli>If $f''(x)$ is always $\gt{positive}$, then the $\ot{critical point}$ gives the $\gt{minimum}$ area</pli><pli>If $f''(x)$ is always $\rt{negative}$, then the $\ot{critical point}$ gives the $\rt{maximum}$ area</p>\p<p><b>Note: make sure to mention that $f''(x)$ is always $\g{\textbf{positive}}$ or always $\r{\textbf{negative}}$ (whichever one applies). This will be worth points on the exam</b></p>`,
                    String.raw`<p>Find the $\put{length}$ of the fence by plugging in the $\ot{critical point}$ for the $\bt{width}$ into the equation from step 5</p>`,
                ]
            },
            specific:fence(100),
        },
        examples: [
            fence(40),
            fence(12),
            fence(20),
            fence(8),
        ],
      },
    ],
  }