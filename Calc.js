export function coefnp(a){
    if(a==1){
        return ''
    }
    return a==-1?'-':a;
}
export function coefpnp(a){
    return a==1?'':(a+'').replaceAll('-','\\m');
}
export function readCoefPow(list,str,sign){
    if(str==''){
        return;
    }
    sign=sign=='+'?[1,1]:[-1,1];
    if(str.includes('x^')){
        let strs=str.split('x^');
        let c=readNum(strs[0])
        let n=readNum(strs[1])
        list.push([mult(c,sign),n]);
    }
    else if(str.includes('e^')){
        let strs=str.split('e^');
        let c=readNum(strs[0])
        let n=readNum(strs[1].replaceAll('x',''))
        list.push([mult(c,sign),n,'e']);
    }
    else if(str.includes('^x')){
        let strs=str.split('^x');
        let c=readNum(strs[0])
        list.push([sign,c,'a']);
    }
    else if(str.includes('\\ln(x)')){
        let strs=str.split('\\ln(x)');
        let c=readNum(strs[0]);
        list.push([mult(c,sign),[1,1],'ln']);
    }
    else if(str.includes('\\log')){
        let strs=str.split('\\log_{')
        let a=readNum(strs[1].split('}')[0]);
        list.push([sign,a,'log']);
    }
    else if(str.includes('x')){
        list.push([mult(readNum(str.replaceAll('x','')),sign),[1,1]]);
    }
    else{
        list.push([mult(readNum(str),sign),[0,1]]);
    }
}

export function equalsArray(array1,array2){//Only works for scalar arrays
    return array1.length === array2.length && array1.every(function(value, index) { return value === array2[index]})
}

export function writeNumTerm(c,power){
    if(c[1]==1){
        return c[0];
    }
    return writeNum(c,power)
}

export function writecxn(c,n){
    if(c[0]==0){
        return ''
    }
    if(n[0]==0){
        return writeNumTerm(c);
    }
    else if(equalsArray(n,[1,1])){
        return writeNum(c)+'x'
    }
    return writeNum(c)+'x^{'+writeNum(n,true)+'}';
}

export function writef(f,p){
    let str='';
    for(let i=0;i<f.length;i++){
        let str1=writecxn(f[i][0],f[i][1]);
        if(str1!=''&&str1!='0'){
            str=str+(i>0&&(f[i][0][0]>=0||f[i][0][1]!=1)?'+':'')+str1;
        }
    }
    if(f.length>1&&p){
        str='('+str+')'
    }
    if(str==''){
        str='0';
    }
    return str;
}
export function findaddsub(str){
    let list=[];
    for(let i=0;i<str.length;i++) {
        if ((str[i] == '+' || str[i] == '-')) {
            list.push(i);
        }
    }
    return list;
}
export function addpause(str){
    str=cleanup(str);
    str=str.replaceAll(/(\\sqrt\{.+?})/g,'\\p{$1}')
    str=str.replaceAll(/(\\ln\(.+?)/g,'\\p{$1}')
    str=fracReWritePause(''+str);
    //str=str.replaceAll(/(\\frac\{.+?}\{.+?})/g,'\\p{$1}')
    //str=str.replaceAll(/(\\powfrac\{.+?}\{.+?})/g,'\\p\{$1}')
    str=str.replaceAll('+','\\p{+}').replaceAll('-','\\p{-}')
    str=str.replaceAll('x','\\p{x}')
    str=str.replaceAll('C','\\p{C}')
    str=str.replaceAll('e^','\\p{e}^')
    str=str.replaceAll('\\m','\\p{\\m}')
    str=str.replaceAll('\\cdot','\\p{\\cdot}')
    str=str.replaceAll(/(\(.+?\))/g,'\\p{$1}')
    return str.replaceAll(/([0-9]+)/g,'\\p{$1}')
}
export function convterm(str){
    str=sqrtRewrite(str)
    return fracReWrite(str);
}

export function convtermInt(str){
    str=sqrtRewrite(str)
    return fracReWriteInt(str);
}

// export function derivWk(fs,b){
//     let d=deriv(fs);
//     let str1=(d[0]!=''?d[0]+'\\\\[6pt]':'')
//     let str='\\begin{aligned}$f(x)\\p{=}'+fs+'$\\end{aligned}'
// }
export function sqrtRewrite(str){
    let i=str.search('\\\\sqrt');
    if(i>=0){
        i=i+5;
        let k=findBrackets(str).get(i);
        let str2=str.substring(i+1,k);
        let n=2;
        if(str[i]=='['){
            let j=findBrackets1(str,'[',']').get(i);
            k=findBrackets(str).get(j+1);
            n=str.substring(i+1,j);
            str2=str.substring(j+2,k)
        }
        let str1=(str2=='x'?'x':'('+str2+')')+'^\\powfrac{1}{'+n+'}'
        return sqrtRewrite(str.substring(0,i-5)+str1+str.substring(k+1));
    }
    return str;
}
export function failed(list){
    return list.length<2;
}

export function fracReWritePause(str){
    let strs=['frac','powfrac'];//,'powfrac']
    for(const str1 of strs){
        str=fracReWritePausePart(str,str1);
    }
    return str;
}
export function fracReWritePausePart(str,str1){
    let i=str.search('\\\\'+str1);
    let map=findBrackets(str);
    let j=str1.length+1;
    if(i>=0) {
        i = i + j;
        let k = map.get(i);
        let str2 = fracReWritePausePart(str.substring(i + 1, k),str1);
        let k1 = map.get(k + 1);
        let str3 = fracReWritePausePart(str.substring(k + 2, k1),str1);
        return str.substring(0, i - j) + '\\p{\\'+str1+'{'+str2+'}{'+str3+'}}' + fracReWritePausePart(str.substring(k1 + 1),str1);
    }
    return str;
}
export function fracReWrite(str){
    let i=str.search('\\\\frac');
    let map=findBrackets(str);
    if(i>=0){
        i=i+5;
        let k=map.get(i);
        let str2=str.substring(i+1,k);
        let k1=map.get(k+1);
        let str3=str.substring(k+2,k1)
        if(!failed(readNum(str2))&&str3.includes('x')){
            let str1=''
            if(str3=='x'){
                str1=str2+'x^{\\m1}'
            }
            else if(str3.startsWith('x^')){
                let n=str3.substring(2);
                str1=str2+'x^{\\m'+n+'}';
            }
            else if(str3.includes('(')){
                let w=str3.search('\\)');
                let strs=[str3.substring(1,w),str3.substring(w+2,str3.length)]
                str1=str2+'('+strs[0]+')^{\\m'+strs[1]+'}'
            }
            else{
                str1=str2+'('+str3+')^{\\m1}'
            }
            return fracReWrite(str.substring(0,i-5)+str1+str.substring(k1+1));
        }
    }
    return str;
}
export function fracReWriteInt(str){
    let i=str.search('\\\\frac');
    let map=findBrackets(str);
    if(i>=0){
        i=i+5;
        let k=map.get(i);
        let str2=str.substring(i+1,k);
        let k1=map.get(k+1);
        let str3=str.substring(k+2,k1)
        if(!failed(readNum(str2))&&str3.includes('x')){
            let str1='';
            if(str3.startsWith('x^')){
                let n=str3.substring(2);
                str1=str2+'x^{\\m'+n+'}';
            }
            else if(str3.includes('(')){
                let w=str3.search('\\)');
                let strs=[str3.substring(1,w),str3.substring(w+2,str3.length)]
                str1=str2+'('+strs[0]+')^{\\m'+strs[1]+'}'
            }
            else{
                return str.substring(0,k1+1)+fracReWrite(str.substring(k1+1));
            }
            return fracReWrite(str.substring(0,i-5)+str1+str.substring(k1+1));
        }
    }
    return str;
}
export function findBrackets(str){
    return findBrackets1(str,'{','}')
}
export function findBrackets1(str,str1,str2){
    let map=new Map();
    for(let i=0;i<str.length;i++){
        if(str[i]==str1){
            let c=1;
            let j=i;
            while(j<str.length-1&&c>0){
                j=j+1;
                if(str[j]==str1){
                    c=c+1;
                }
                if(str[j]==str2){
                    c=c-1;
                }
            }
            map.set(i,j)
        }
    }
    return map;
}
export function readf(str){
    str=fracReWrite(str);
    let list1=[];
    let list=findaddsub(str);
    if(list.length==0){
        readCoefPow(list1,str,'+')
    }
    else{
        let shift=0;
        if(list[0]==0&&list.length>1){
            shift=1;
            readCoefPow(list1,str.substring(str[0]=='-'?1:0,list[1]),str[0]=='-'?'-':'+');
        }
        else if(list[0]==0&&list.length==1){
            shift=1;
            readCoefPow(list1,str.substring(str[0]=='-'?1:0,0),str[0]=='-'?'-':'+');
        }
        else{
            readCoefPow(list1,str.substring(str[0]=='-'?1:0,list[0]),str[0]=='-'?'-':'+');
        }
        for(let i=1+shift;i<list.length;i++){
            readCoefPow(list1,str.substring(list[i-1]+1,list[i]),str[list[i-1]]);
        }
        readCoefPow(list1,str.substring(list[list.length-1]+1),str[list[list.length-1]]=='-'?'-':'+');
    }
    return list1;
}
export function writecfn(c,n,f){
    if(n[0]==0||c[0]==0){
        return writeNum(c);
    }
    else if(equalsArray(n,[1,1])&&equalsArray(c,[1,1])){
        return f;
    }
    else if(equalsArray(n,[1,1])){
        return writeNum(c)+'('+f+')'
    }
    return writeNum(c)+'('+f+')'+'^{'+writeNum(n,true)+'}';
}
export function derivcxn(c,n){
    let str1=n[1]!=1&&n[0]!=0?writeNum(n)+'\\cdot'+writeNum(c)+'x^{'+writeNum(n,true)+'-1}':'';
    let str2=writecxn(mult(c,n),subtract(n,[1,1]));
    return [str1,str2];
}
export function derivceax(c,a){
    return [a[0]!=1||a[1]!=1?writeNum(a)+'\\cdot'+writeNum(c)+'e^{'+writeNum(a)+'x}':'',writeNum(mult(a,c))+'e^{'+writeNum(a)+'x}']
}
export function intceax(c,a){
    return ['',(a[0]!=1||a[1]!=1?'\\frac{'+writeNumTerm(c)+'}{'+writeNum(a)+'}':writeNum(c))+'e^{'+writeNum(a)+'x}']
}
export function derivcln(c){
    return ['','\\frac{'+writeNumTerm(c)+'}{x}']
}

export function derivpoly(f){
    let list=[];
    for(const c of f){
        list.push(c[0],c[1])
    }
    return list;
}
export function combineTerms(list){
    let str=''
    for(let i=0;i<list.length;i++){
        if(list[i]!=''){
            str=str+(i>0?'+':'')+list[i];
        }
    }
    str=str.replaceAll('+-','-')
    return str==''?'0':str;
}
export const qr=String.raw`\p{\frac{d}{dx}}\p{\left(\p{\frac{\p{\yu{f_1(x)}}}{\p{\o{f_2(x)}}}}\right)}\p{=}\p{\frac{\p{\g{f_1'(x)}}\p{\cdot}\p{\o{f_2(x)}}\p{-}\p{\yu{f_1(x)}}\p{\cdot}\p{\b{f_2'(x)}}}{\p{(}\p{\o{f_2(x)}}\p{)}^\p{2}}}`
export function derivcfxn(str){
    let j=str.indexOf(')');
    let k=str.indexOf('(');
    let c=readNum(str.substring(0,k))
    let f=str.substring(k+1,j);
    let fp=deriv(f);
    let n=readNum(str.substring(j+2));
    if(equalsArray(n,[1,1])&&equalsArray(c,[1,1])){
        return deriv(f)
    }
    if(equalsArray(n,[1,1])){
        return [fp[0]!=''?writeNum(c)+'('+fp[0]+')':'',writeNum(c)+'('+fp[1]+')'];
    }
    let str1='';
    if(n[1]==1&&fp[0]!=''){//n[0]!=1&& already covered vt previous if statement
        str1=writecfn(mult(c,n),subtract(n,[1,1]),f)+'\\cdot'+fp[0];
    }
    else if(n[1]==1&&failed(readNum(fp[1]))){
        str1=writecfn(mult(c,n),subtract(n,[1,1]),f)+'\\cdot'+fp[1];
    }
    else if(n[1]!=1){
        str1=writeNum(n)+'\\cdot'+writeNum(c)+'('+f+')^{'+writeNum(n,true)+'-1}\\cdot'+(fp[0]==''?fp[1]:fp[0])
    }
    let str2=writecfn(mult(c,n),subtract(n,[1,1]),f)+'\\cdot'+fp[1];
    if(!failed(readNum(fp[1]))){
        str1=str1==''?writecfn(mult(c,n),subtract(n,[1,1]),f)+'\\cdot'+fp[1]:str1;
        str2=writecfn(mult(mult(c,n),readNum(fp[1])),subtract(n,[1,1]),f)
    }
    let str3='<div class="row"><div' +
        ' class="col">$$\\p{\\frac{d}{dx}}\\p{\\left(\\b{c}\\p{(\\pu{g(x)})}^\\p{\\r{n}}\\p{\\cdot}\\p{\\g{g\'(x)}}\\right)}\\p{=}\\p{\\r{n}}\\p{\\cdot}\\p{\\b{c}}\\p{(\\pu{g(x)})}^{\\p{\\r{n}}\\p{-}\\p{1}}\\p{\\cdot}\\p{\\g{g\'(x)}}$$</div><div' +
        ' class="col">$$\\begin{aligned}\\hspace{1cm}\\p{\\b{c}}&\\p{=}\\p{\\b{'+writeNumTerm(c,false)+'}}\\\\[6pt]\\hspace{1cm}\\pu{\\p{g(x)}}&\\p{=}\\pu{\\p{'+f+'}}\\\\[6pt]\\hspace{1cm}\\p{\\r{n}}&\\p{=}\\p{\\r{'+writeNumTerm(n,false)+'}}\\\\[6pt]\\hspace{1cm}\\g{\\p{g\'(x)}}&\\p{=}\\g{'+addpause(fp[1])+'}\\end{aligned}$$</div></div>'
    return [str1,str2,str3]
}
export function readNum(str){
    str=str+'';
    if(str==''){
        return [1,1]
    }
    str=str.replaceAll('\\m ','-')
    str=str.replaceAll('\\m','-')
    if(str[0]=='{'){
        str=str.substring(1,str.length-1);
    }
    if(str==''){
        return [1,1];
    }
    if(str=='-'){
        return [-1,1]
    }
    if(!isNaN(str)){
        return [parseFloat(str),1]
    }
    let s=1;
    if(str[0]=='-'){
        s=-1;
    }
    let list = str.replaceAll('\\frac','').replaceAll('\\powfrac','').split(/[{}]+/)
    if(!isNaN(list[1])&&!isNaN(list[2])){
        return [s*list[1],list[2]]
    }
    return [NaN];
}
// export function findLast(str,c){
//     let i=str.search(c);
//     let j=i;
//     while(i>=0){
//         j=i;
//         i=str.indexOf(c,i)
//     }
//     return j;
// }
export function writeIntFrac(n){
    return (n<0?'\\m':'')+Math.abs(n);
}
export function writeNum(list,power){
    if(list[1]==1){
        return power?coefpnp(list[0]):coefnp(list[0]);
    }
    return '\\'+(power?'pow':'')+'frac{'+writeIntFrac(list[0])+'}{'+writeIntFrac(list[1])+'}'
}
export function gcd(n,m){
    n = Math.abs(n);
    m = Math.abs(m);
    let s=Math.sign(m)
    if(n==0||n==1||m==1){
        return 1;
    }
    while(m) {
        let t = m;
        m = n % m;
        n = t;
    }
    return n*s;
}
export function reduce(n,m){
    let g=gcd(n,m);
    return [n/g,m/g];
}
export function mult(list1,list2){
    let n=list1[0]*list2[0];
    let m=list1[1]*list2[1];
    return reduce(n,m)
}
export function div(list1,list2){
    let n=list1[0]*list2[1];
    let m=list1[1]*list2[0];
    return reduce(n,m)
}

export function subtract(list1,list2){
    let n=list1[0]*list2[1]-list1[1]*list2[0];
    let m=list1[1]*list2[1];
    return reduce(n,m)
}
export function add(list1,list2){
    let n=list1[0]*list2[1]+list1[1]*list2[0];
    let m=list1[1]*list2[1];
    return reduce(n,m)
}
export function cleanup(str){
    str=''+str
    str=str.replaceAll('1x','x')
    str=str.replaceAll(/\\frac{\-([0-9]+)}{(.+?)}/g,'-\\frac{$1}{$2}')
    str=str.replaceAll(/\\powfrac{\-([0-9]+)}{(.+?)}/g,'{-\\powfrac{$1}{$2}}')
    str=str.replaceAll(/\\powfrac{\\m([0-9]+)}{(.+?)}/g,'{\\m\\powfrac{$1}{$2}}')
    str=str.replaceAll(/\\frac{\\m([0-9]+)}{(.+?)}/g,'\\m\\frac{$1}{$2}')
    str=str.replaceAll('+-','-')
    return str.replaceAll('+\\m','\\m')
}

function derivapx(c,a) {
    return ['',writeNum(c)+writeNum(a,true)+'^x\\cdot\\ln('+writeNum(a,true)+')'];
}

function derivlogax(c,a){
    return ['','\\frac{'+writeNumTerm(c)+'}{x\\cdot\\ln('+writeNum(a,true)+')}'];
}

export function intcxn(c,n){
    //let str1=n[1]!=1||n[0]!=0?'\\frac{'+writeNum(c)+'}{'+writeNum(n)+'+1}x^{'+writeNum(n,true)+'+1}':'';
    //let str2=writecxn(div(c,add(n,[1,1])),add(n,[1,1]));
    //return [str1,str2];
    return ['',n[0]==0?writeNum(c)+'x':'\\frac{'+writeNumTerm(c)+'}{'+writeNumTerm(n)+'+1}x^{'+writeNumTerm(n,true)+'+1}']
}

export function int(str){
    let list=intNoC(str);
    list[0]=list[0]!=''?list[0]+'+C':'';
    list[1]=list[1]+'+C';
    return list;
}
export function intcox(c){
    return ['',writeNum(c)+'\\ln(x)']
}
export function intNoC(str){
    let fs=readf(str);
    let flag=false;
    let list=[[],[]]
    for(const f of fs){
        let deriv;
        if(f.length==3&&f[2]=='e'){
            deriv=intceax(f[0],f[1]);
        }
        else if(f[1][0]==-1&&f[1][1]==1){
            deriv=intcox(f[0]);
        }
        else{
            deriv=intcxn(f[0],f[1]);
        }
        if(deriv[0]!=''){
            flag=true;
            list[0].push(deriv[0])
        }
        else{
            list[0].push(deriv[1])
        }
        list[1].push(deriv[1])
    }
    return [flag?combineTerms(list[0]):'',combineTerms(list[1])]
}


export function deriv(str){
    if(!isNaN(str)){
        return ['','0'];
    }
    if(str.includes('(')&&!str.includes('\\ln')&&!str.includes('\\log')){
        return derivcfxn(str)
    }
    let fs=readf(str);
    let flag=false;
    let list=[[],[]]
    for(const f of fs){
        let deriv;
        if(f.length==3&&f[2]=='ln'){
            deriv=derivcln(f[0]);
        }
        else if(f.length==3&&f[2]=='e'){
            deriv=derivceax(f[0],f[1]);
        }
        else if(f.length==3&&f[2]=='a'){
            deriv=derivapx(f[0],f[1])
        }
        else if(f.length==3&&f[2]=='log'){
            deriv=derivlogax(f[0],f[1])
        }
        else{
            deriv=derivcxn(f[0],f[1]);
        }
        if(deriv[0]!=''){
            flag=true;
            list[0].push(deriv[0])
        }
        else{
            list[0].push(deriv[1])
        }
        list[1].push(deriv[1])
    }
    return [flag?combineTerms(list[0]):'',combineTerms(list[1])]
}
export const pr=String.raw`\p{\frac{d}{dx}}\p{(}\p{\yu{f_1(x)}}\p{\cdot}\p{\o{f_2(x)}}\p{)}\p{=}\p{\g{f_1'(x)}}\p{\cdot}\p{\o{f_2(x)}}\p{+}\p{\yu{f_1(x)}}\p{\cdot}\p{\b{f_2'(x)}}`;
export const propexp=String.raw`$$\begin{aligned}\g{\p{\frac{\b{c}}{\sqrt{\bk{x}}}}}&\p{=}\p{\b{c}}\p{x}^{\g{\p{-}\p{\powfrac{1}{2}}}}\qquad&\g{\p{\frac{\b{c}}{\bk{x}}}}&\p{=}\p{\b{c}}\p{x}^{\g{\p{-}\p{1}}}\qquad&\p{\b{c}\g{\sqrt{\bk{x}}}}&\p{=}\p{\b{c}}\p{x}^{\g{\p{\powfrac{1}{2}}}}\\\\[20pt]\g{\p{\frac{\b{c}}{\sqrt[\r{n}]{\bk{x}}}}}&\p{=}\p{x}^{\g{\p{-}\p{\powfrac{\p{1}}{\p{\r{n}}}}}}\qquad&\g{\p{\frac{\b{c}}{\bk{x}^{\r{n}}}}}&\p{=}\p{\b{c}}\p{x}^{\p{\g{-}}\p{\r{n}}}\qquad&\p{\b{c}\g{\sqrt[\r{n}]{\bk{x}}}}&\p{=}\p{\b{c}}\p{x}^{\g{\p{\powfrac{\p{1}}{\p{\r{n}}}}}}\end{aligned}$$`
export const propexpf=String.raw`$$\begin{aligned}\g{\p{\frac{\b{c}}{\sqrt{\pu{g(x)}}}}}&\p{=}\p{\b{c}}\p{(\pu{g(x)})}^{\g{\p{-}\p{\powfrac{1}{2}}}}\qquad&\g{\p{\frac{\b{c}}{\pu{g(x)}}}}&\p{=}\p{\b{c}}\p{(\pu{g(x)})}^{\g{\p{-}\p{1}}}\qquad&\p{\b{c}\g{\sqrt{\pu{g(x)}}}}&\p{=}\p{\b{c}}\p{(\pu{g(x)})}^{\g{\p{\powfrac{1}{2}}}}\\\\[20pt]\g{\p{\frac{\b{c}}{\sqrt[\r{n}]{\pu{g(x)}}}}}&\p{=}\p{\b{c}}\p{(\pu{g(x)})}^{\g{\p{-}\p{\powfrac{\p{1}}{\p{\r{n}}}}}}\qquad&\g{\p{\frac{\b{c}}{(\pu{g(x)})^{\r{n}}}}}&\p{=}\p{\b{c}}\p{(\pu{g(x)})}^{\p{\g{-}}\p{\r{n}}}\qquad&\p{\b{c}\g{\sqrt[\r{n}]{\pu{g(x)}}}}&\p{=}\p{\b{c}}\p{(\pu{g(x)})}^{\g{\p{\powfrac{\p{1}}{\p{\r{n}}}}}}\end{aligned}$$`
export function rounddigits(t,n){
    if(t==0){
        return 0;
    }
    let s=Math.ceil(Math.log10(Math.abs(t)));
    let a=Math.pow(10,n-s);
    return Math.sign(n)*Math.round(t*a)/a;
}
export function pauseList(xs,c){
    let str='';
    let strs=c==null?['','']:['\\'+c+'{','}']
    for(let i=0;i<xs.length;i++){
        let x=xs[i];
        str=str+`\\p{`+strs[0]+x+strs[1]+`}`;
        if(i<xs.length-1){
            str=str+"\\p{,}\\ ";
        }
    }
    return str;
}
export function suby(f,x1,v,b){
    return (b?'\\p{\\g{y}}':'\\g{y}')+'&\\p{=}\\p{f}\\p{(\\r{'+x1+'})}\\\\[4pt]&\\p{=}'+sub(addpause(f),'x','\\r{'+x1+'}')+'\\\\[4pt]&\\p{=}\\p{\\g{'+v+'}}'
}
export function subf(f,fs,x1,c,list){
    let v=rounddigits(f(x1),3);
    x1=c==null?x1:'\\'+c+'{'+x1+'}'
    list.push(v);
    return '\\p{f}\\p{('+x1+')}&\\p{=}'+sub(addpause(fs),'x',x1)+'\\\\[4pt]&\\p{=}\\p{'+v+'}'
}
export function buildPoly(...as){
    let b=as;
    return x=>evalPoly(x,...b)
}
export function evalPoly(x,...as){
    if(as.length==0){
        return 0;
    }
    let sum=as[as.length-1];
    for(let i=0;i<as.length-1;i++){
        sum=sum+as[i]*Math.pow(x,as.length-i-1);
    }
    return sum;
}
export function pow(x,y){
    return Math.sign(x)*Math.pow(Math.abs(x),y);
}
export function sub(str,x,xval){
    return str.replaceAll(x,'{('+xval+')}');
}
export function quadform(a,b,c){
    return '\\p{\\frac{\\p{-}\\p{\\b{'+b+'}}\\p{\\pm}\\p{\\sqrt{\\p{\\b{'+b+'}}^\\p{2}\\p{-}\\p{4}\\p{\\pu{'+a+'}}\\p{\\go{'+c+'}}}}}{\\p{2}\\p{\\pu{'+a+'}}}}'
}
export function pic(str,l){
    return `<p><img src="/pictures/`+str+'.png" alt="HTML5 Icon" style="width:500px;height:500px;"></p>';
}
export function quad(a,b,c){
    return ('\\r{'+a+'}x^2+\\b{'+b+'}x+\\go{'+c+'}').replaceAll('+\\b{-','\\b{-').replaceAll('+\\go{-','\\go{-')
}
export function quadformexEqSol(a,b,c){
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
export function coef1p(c){
    return c==1?'':'^\\p{'+c+'}'
}
export function findFactors(c){
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
export function factorMonicQuadVal(b,c){
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

export function factorMonicQuad(b,c){
    let list=factorMonicQuadVal(b,c);
    return ('\\p{(}'+convertFactor(list[0])+'\\p{)}\\p{(}'+convertFactor(list[1])+'\\p{)}').replaceAll('\\p{(}\\p{x}\\p{)}','\\p{x}')
}

export function factorMonicQuadFactors(b,c){
    let list=factorMonicQuadVal(b,c);
    return [convertFactor(list[0]),convertFactor(list[1])];
}
export function convertFactor(x0,str){
    if(x0<0){
        return '\\p{x}\\p{-'+(-x0)+'}';
    }
    if(x0>0){
        return '\\p{x}\\p{+}\\p{'+x0+'}';
    }
    return '\\p{x}';
}
export function factorQuad(a,b,c){
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
export function coef(a){
    if(a==1){
        return '';
    }
    return a==-1?'\\p{-}':'\\p{'+a+'}';
}
export function quadNum(a,b,c){
    let str=('\\p{'+a+'}\\p{x}^\\p{2}\\p{+}\\p{'+b+'}\\p{x}\\p{+}\\p{'+c+'}').replaceAll('\\p{0}\\p{x}^\\p{2}\\p{+}\\p{0}\\p{x}\\p{+}','')
    str=str.replaceAll('\\p{0}\\p{x}^\\p{2}\\p{+}','')
    str=str.replaceAll('\\p{0}\\p{x}\\p{+}','').replaceAll('\\p{1}\\p{x}','\\p{x}');
    str=str.replaceAll('\\p{+}\\p{-','\\p{-').replaceAll('\\p{+}\\p{0}','');
    return str==''?'\\p{0}':str;
}
export function linstr(a,b){
    return quadNum(0,a,b);
}
export function lineqzero(a,b){
    return linEqSolve(a,b,0,0);
}
export function zerosquadfactor(a,b,c){
    if(a==0){
        return lineqzero(b,c);
    }
    let list=factorSolveWork(a,b,c);
    if(list==null){
        return quadformexEqSol(a,b,c);
    }
    return list;
}
export function genLetters(capital = false){
    return [...Array(26)].map((_, i) => String.fromCharCode(i + (capital ? 65 : 97)));
}

export const lowerLetters=genLetters()
export const upperLetters=genLetters()

//adds orange color to solution
export function factorSolveWork(a,b,c){
    let returnList=[];
    let q=factorQuad(a,b,c);
    if(q==null||b%a!=0||c%a!=0){
        return quadformexEqSol(a,b,c)
    }
    let b1=b/a;
    let c1=c/a;
    returnList.push(quadNum(a,b,c)+'&\\p{=}\\p{0}')
    if(a!=1&&c!=0){
        returnList.push(coef(a)+'\\p{(}'+quadNum(1,b1,c1)+'\\p{)}&\\p{=}\\p{0}');
    }
    returnList.push(q+'&\\p{=}\\p{0}');
    let list=factorMonicQuadFactors(b1,c1);
    let list1=factorMonicQuadVal(b1,c1);
    returnList.push(list[0]+'&\\p{=}\\p{0}\\p{,\\ }'+list[1]+'\\p{=}\\p{0}');
    returnList.push('\\p{x}&\\p{=}\\p{\\o{'+(-list1[0])+'}}\\p{, \\ }\\p{\\o{'+(-list1[1])+'}}')
    return [returnList,list1[0]==list1[1]?[-list1[0]]:[-list1[0],-list1[1]]];
}
export function linEqSolve(b1,c1,b2,c2){
    let returnList=[addpause(cleanpoly(b1,c1))+'&\\p{=}'+addpause(cleanpoly(b2,c2))];
    let b3=Math.abs(b2-b1);
    let c3=-(c2-c1)*Math.sign(b2-b1);
    if(b1==1&&b2==0&&c1==0||b2==1&&b1==0&&c2==0){
        return [returnList,[c3/b3]];
    }
    if(b1!=1&&(c1!=0||b2!=0)&&(c2!=0||b1!=0)){
        returnList.push(coef(b3)+'\\p{x}&\\p{=}\\p{'+c3+'}')
    }
    if(b3!=1){
        returnList.push('\\p{x}&\\p{=}\\p{\\o{'+(c3/b3)+'}}');
    }
    return [returnList,[c3/b3]];
}

export function quadEqSolve(a1,b1,c1,a2,b2,c2){
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
export function picsize(str,l){
    return `<p><img src="/pictures/`+str+'.png" alt="HTML5 Icon" style="width:'+l+'px;height:'+l+'px;"></p>';
}

export function picadv (str,l,h,x,y){
    return `<p><img src="/pictures/`+str+'.png" alt="HTML5 Icon" style="width:'+l+'px;height:'+h+'px; object-fit: cover;object-position: '+x+'% '+y+'%;"></p>';//border: 1pt solid #333333;
}
export function convertWork(array){
    let str='$$\\begin{aligned}';
    for(let i=0;i<array.length;i++){
        str=str+(i>0?'\\\\[4pt]':'')+array[i]
    }
    return str+'\\end{aligned}$$'
}
function polyterm(n){
    if(n==0){
        return ''
    }
    return n==1?'x':'x^'+n;
}
export function cleanpoly(...as){
    let str='';
    let str1=''
    let j=0;
    for(let i=0;i<as.length;i++){
        let c=Math.abs(as[i]);
        c=c==1&&i<as.length-1?'':c;
        str=str+(as[i]>0&&j>0?'+':as[i]<0?'-':'')+(as[i]!=0?c+polyterm(as.length-1-i):'')
        if(as[i]!=0){
            j++;
        }
    }
    return str==''?0:str;
}
export function p(str){
    return '\\p{'+str+'}';
}
export function rpp(str){
    return p(rp(str));
}
export function removeSingleCommand(str,str1){
    let str0='\\'+str1+'{';
    let i=str.indexOf(str0);
    if(i>0){
        let map=findBrackets(str)
        let j=map.get(i+str0.length-1)
        return removeSingleCommand(str.substring(0,i)+str.substring(i+str0.length,j)+str.substring(j+1),str1)
    }
    return str;
}
export function removeCommand(str,...strs){
    for(const str1 of strs){
        str=removeSingleCommand(str,str1)
    }
    return str;
}
export function rp(str){
    return removeCommand(str,'p')
}
export function rc(str){
    let list=['r','bk','pu','pk','go','o','g','lb','b','w'];
    for(const str1 of list){
        list.push(str+'t')
        if(str1.includes('p')){
            list.push(str1.replaceAll('p','y'))
        }
    }
    return removeCommand(str,...list);
}
export function sap(str){
    return str.includes('-')||str.includes('+');
}

export function ap(str,a){
    if(a==null){
        a=-1;
    }
    return sap(str)&&a!=1?'\\p{(}'+str+'\\p{)}':str;
}
export function slope(x1,y1,x2,y2){
    return '\\p{\\frac{\\p{\\pu{'+y2+'}}\\p{-}\\p{\\g{'+mp(y1)+'}}}{\\p{\\lb{'+x2+'}}\\p{-}\\p{\\r{'+mp(x1)+'}}}}'
}
export function mp(t){
    return t<0?'('+t+')':t;
}
export function psf(x1,y1,m){
    return '\\p{y}\\p{-}\\p{\\g{'+mp(y1)+'}}\\p{=}\\p{\\b{'+m+'}}\\p{(}\\p{x}\\p{-}\\p{\\r{'+mp(x1)+'}}\\p{)}'
}
export function psf1(x1,y1,m){
    return '\\p{y}\\p{=}\\p{\\b{'+m+'}}\\p{(}\\p{x}\\p{-}\\p{\\r{'+mp(x1)+('}}\\p{)}\\p{+}\\p{\\g{'+y1+'}}').replaceAll('\\p{+}\\p\\g{-','\\p\\g{-')
}