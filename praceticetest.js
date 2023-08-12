window.j = {
  startCollapsed: false,
  lessonNum: 6,
  lessonName: "Pracetice Exam",
  intro: "Last lecture, we saw the derivative is the rate of change of something and saw a large number of applications of the derivative.<br>In this lecture, we will discuss how to calculate derivatives.<br>We write the derivative of $f(x)$ as $f'(x)$ or $\\frac{d}{dx}\\left(f(x)\\right)$",
  sections: [
    {
      name: String.raw `Calculate $\displaystyle\lim_{x\to a}f(x)$, $\displaystyle\lim_{x\to a^{\w{-}}}f(x)$, or $\displaystyle\lim_{x\to a^{\w{+}}}f(x)$ of a non-piecewise function`,
      backgroundColor: "green",
      web: "Hw 3: 1, 5-7, 9; Hw 4: 1-7, 11; Hw 5: 2, 5-7; PT 2: 1-6, 8; Hw 6: 4, 7, 9-10; PT 3: 8; Hw 9: 8, 10; PF: 4, 6, 10-12, 14-15",
      book: "148",
      exam: "Very important in Test 1 and Test 2, might come up in Test 3, important for Final",
      intro: String.raw `In this section, we find the limits of non-piecewise functions.<br>If you don't know what piecewise functions are, they are in section 6.2.<br>For non-piecewise functions in this class, $\displaystyle\lim_{\lb{x}\to \go{a}}\yu{f(\lb{x})}$, $\displaystyle\lim_{\lb{x}\to \go{a}^-}\yu{f(\lb{x})}$, and $\displaystyle\lim_{\lb{x}\to \go{a}^+}\yu{f(\lb{x})}$ and are solved the same way (in other words, all three of them are equivalent).<br>To solve for $\displaystyle\lim_{\lb{x}\to \go{a}}\yu{f(\lb{x})}$, $\displaystyle\lim_{\lb{x}\to \go{a}^-}\yu{f(\lb{x})}$, or $\displaystyle\lim_{\lb{x}\to \go{a}^+}\yu{f(\lb{x})}$, substitute $\go{a}$ for $\lb{x}$ in <span class='purple'>the $\yu{f(\lb{x})}$ equation</span>.<br>Warning: If there is a variable other than $\lb{x}$, then replace only $\lb{x}$ with $\go{a}.$ Do not replace the other variables with $\go{a}$; leave them as they are.`,
      general: String.raw `$\yu{f(\lb{x})}=\btip{\yut{\{an equation\}}}{\text{usually with $\lb{x}$ and possibly other variables}}.$<br>Find $\displaystyle\lim_{\lb{x}\to \go{a}}f(x)$ OR $\displaystyle\lim_{\lb{x}\to \go{a}^-}f(x)$ OR $\displaystyle\lim_{\lb{x}\to \go{a}^+}f(x)$<br>OR<br>Find $\displaystyle\lim_{\lb{x}\to \go{a}}\btip{\yut{\{an equation\}}}{\text{usually with $\lb{x}$ and possibly other variables}}$ OR $\displaystyle\lim_{\lb{x}\to \go{a}^-}\btip{\yut{\{an equation\}}}{\text{usually with $\lb{x}$ and possibly other variables}}$ OR $\displaystyle\lim_{\lb{x}\to \go{a}^+}\btip{\yut{\{an equation\}}}{\text{usually with $\lb{x}$ and possibly other variables}}$`,
      specific: String.raw`Find $\displaystyle \lim_{\lb{x}\to \go{2}^+}\yu{\lb{x}^2+3+\frac{6}{\lb{x}}}$`,
      rightColWidth: 30,
      steps: [
        {
          general: String.raw`Substitute $\go{a}$ for $\lb{x}$ in <span class='purple'>the equation</span>.<br>Do not substitute for any other variable, just $\lb{x}$`,
          specific: String.raw`$$\begin{aligned}\lim_{\lb{x}\to \go{2}^+}\yu{\lb{x}^2+3+\frac{6}{\lb{x}}}&=\gb{\yu{\go{\ya{2}}^2+3+\frac{6}{\go{\ya{2}}}}}\\[10pt]&=\ob{10}\end{aligned}$$`,
        }
      ],
      examples: [
        {
          specific: String.raw`Find $\displaystyle \lim_{\lb{x}\to\go{3}}\yu{4+a\lb{x}^2}$`,
          steps: [String.raw`$\begin{aligned}\lim_{\lb{x}\to\go{3}}\yu{4+a\lb{x}^2}&=\gb{\yu{4+a\go{\ya{3}}^2}}\\&=\ob{4+9a}\end{aligned}$`],
        },
      ],
    },
    {
      name: String.raw `Calculate $\displaystyle\lim_{x\to a^{\w{-}}}f(x)$, or $\displaystyle\lim_{x\to a^{\w{+}}}f(x)$, and $\displaystyle\lim_{x\to a}f(x)$ of a piecewise function`,
      backgroundColor: "green",
      web: "Hw 3: 1, 5-7, 9; Hw 4: 1-7, 11; Hw 5: 2, 5-7; PT 2: 1-6, 8; Hw 6: 4, 7, 9-10; PT 3: 8; Hw 9: 8, 10; PF: 4, 6, 10-12, 14-15",
      book: "148",
      exam: "Very important in Test 1 and Test 2, might come up in Test 3, important for Final",
      intro: String.raw `In this section, we first explain what a piecewise function is. Then we explain how to calculate limits of piecewise functions.<br><b>What is a Piecewise Function?</b><br>A piecewise function is an equation like this:$$f(\lb{x})=\begin{cases}\r{g(\lb{x})}&\lb{x}\r{<}\go{a}\\[8pt]\g{h(\lb{x})}&\lb{x}\g{\ge}\go{a}\end{cases}$$Note: instead of $\r{<}$ and $\g{\ge}$ it could also be $\r{\le}$ and $\g{>}$. The $\r{<}$ and $\g{\ge}$ could also be switched, with the $\r{<}$ on the bottom row and $\g{\ge}$ on the top row.<br>This is an example of piecewise function:$$f(\lb{x})=\begin{cases}\r{\lb{x}^3}&\lb{x}\r{<}\go{2}\\[8pt]\g{2\lb{x}+4}&\lb{x}\g{\ge}\go{2}\end{cases}$$When substituting an <span class='lightblue'>$\lb{x}$-value</span> which is <span class='green'>greater than or equal to</span> $\go{2}$ into $f(\lb{x})$, we use the function $\g{2\lb{x}+4}.$<br>For example, since $\lb{4}\g{\ge}\go{2}$, $f(\lb{4})=\g{2\lb{\ya{4}}+4}.$<br>When substituting an <span class='lightblue'>$\lb{x}$-value</span> which is <span class='red'>less than</span> $\go{2}$, we use the function $\r{\lb{x}^3}.$<br>For example, since $\lb{1}\r{<}\go{2}$, $f(\lb{1})=\r{\lb{\ya{1}}^3}.$<br><b>How to Calculate Limits of a Piecewise Function?</b><br>Since $\lb{x}\to\go{a}^{\r{-}}$ means that $\lb{x}$ is extremely close to $\go{a}$ and <span class='red'>less than</span> $\go{a}$, $\displaystyle\lim_{\lb{x}\to \go{a}^{\r{-}}}f(x)=\lim_{\lb{x}\to\go{a}^{\r{-}}}\r{g(\lb{x})}$<br>Since $\lb{x}\to\go{a}^{\g{+}}$ means that $\lb{x}$ is extremely close to $\go{a}$ and <span class='green'>greater than</span> $\go{a}$, $\displaystyle\lim_{\lb{x}\to \go{a}^{\g{+}}}f(x)=\lim_{\lb{x}\to\go{a}^{\g{+}}}\g{h(\lb{x})}$<br> To determine $\displaystyle\lim_{\lb{x}\to\go{a}}f(x)$, compare  $\displaystyle\lim_{\lb{x}\to \go{a}^{\r{-}}}f(x)$ and $\displaystyle\lim_{\lb{x}\to \go{a}^{\g{+}}}f(x)$: <ol><li>If $\displaystyle\lim_{\lb{x}\to \go{a}^{\r{-}}}f(x)$ and $\displaystyle\lim_{\lb{x}\to \go{a}^{\r{+}}}f(x)$ are both equal to <span class='purple'>the same number</span>, then $\displaystyle \lim_{\lb{x}\to\go{a}}f(x)=\yut{that number}$</li><li>$\displaystyle\lim_{\lb{x}\to \go{a}^{\r{-}}}f(x)$ and $\displaystyle\lim_{\lb{x}\to \go{a}^{\r{+}}}f(x)$ are equal to different numbers, then $\displaystyle\lim_{\lb{x}\to \go{a}}f(x)=\t{DNE}$</li></ol>`,
      general: String.raw `$$f(\lb{x})=\begin{cases}\r{g(\lb{x})}&\lb{x}\r{<}\go{a}\\[8pt]\g{h(\lb{x})}&\lb{x}\g{\ge}\go{a}\end{cases}\text{   OR   }\begin{cases}\r{g(\lb{x})}&\lb{x}\r{\le}\go{a}\\[8pt]\g{h(\lb{x})}&\lb{x}\g{>}\go{a}\end{cases}$$Note: the rows might be switched with $\r{<}$ on the bottom row and $\g{\ge}$ on the top row<br>Find each of the following:<ol><li>$\displaystyle\lim_{\lb{x}\to\go{a}^{\r{-}}}f(x)$</li><li>$\displaystyle\lim_{\lb{x}\to\go{a}^{\g{+}}}f(x)$</li><li>$\displaystyle\lim_{\lb{x}\to\go{a}}f(x)$</li><ol>`,
      specific: String.raw`$$f(\lb{x})=\begin{cases}\g{2\lb{x}}&\lb{x}\g{>}\go{2}\\[8pt]\r{\lb{x}^2+1}&\lb{x}\r{\le}\go{2}\end{cases}$$Find each of the following:<ol><li>$\displaystyle\lim_{\lb{x}\to\go{2}^{\r{-}}}f(x)$</li><li>$\displaystyle\lim_{\lb{x}\to\go{2}^{\g{+}}}f(x)$</li><li>$\displaystyle\lim_{\lb{x}\to\go{2}}f(x)$</li><ol>`,
      rightColWidth: 45,
      steps: [
        {
          general: String.raw`$$\begin{aligned}\lim_{\lb{x}\to\go{a}^{\r{-}}}f(x)&=\lim_{\lb{x}\to\go{a}^{\r{-}}}\r{g(\lb{x})}\\[10pt]&=\btip{\r{g(\go{a})}}{\t{the }\r{g(\lb{x})}\rt{ equation }\t{with }\go{a}\\[8pt]\t{plugged in for }\lb{x}}\end{aligned}$$`,
          specific: String.raw`$$\begin{aligned}\lim_{\lb{x}\to\go{2}^{\r{-}}}f(x)&=\bb{\lim_{\lb{x}\to\go{2}^{\r{-}}}\r{\lb{x}^2+1}}\\[10pt]&=\gb{\r{\go{\ya{2}}^2+1}}\\[10pt]&=\ob{5}\end{aligned}$$`,
        },
        {
          general: String.raw`$$\begin{aligned}\lim_{\lb{x}\to\go{a}^{\g{+}}}f(x)&=\lim_{\lb{x}\to\go{a}^{\g{+}}}\g{h(\lb{x})}\\[10pt]&=\btip{\g{h(\go{a})}}{\t{the }\g{h(\lb{x})}\gt{ equation }\t{with }\go{a}\\[8pt]\t{plugged in for }\lb{x}}\end{aligned}$$`,
          specific: String.raw`$$\begin{aligned}\lim_{\lb{x}\to\go{2}^{\g{+}}}f(x)&=\bb{\lim_{\lb{x}\to\go{2}^{\g{+}}}\g{2\lb{x}}}\\[10pt]&=\gb{\g{2\go{\ya{2}}}}\\[10pt]&=\ob{4}\end{aligned}$$`,
        },
        {
          general: String.raw`Find $\displaystyle\lim_{\lb{x}\to\go{a}}f(x)$ using $\displaystyle\lim_{\lb{x}\to\go{a}^{\r{-}}}f(x)$ and $\displaystyle\lim_{\lb{x}\to\go{a}^{\g{+}}}f(x)$: <ol><li>If $\displaystyle\lim_{\lb{x}\to\go{a}^{\r{-}}}f(x)=\displaystyle\lim_{\lb{x}\to\go{a}^{\g{+}}}f(x)=\yut{a number}$, then $\displaystyle\lim_{\lb{x}\to\go{a}}f(x)=\yut{that number}$</li><li>If $\displaystyle\lim_{\lb{x}\to\go{a}^{\r{-}}}f(x)\ne\displaystyle\lim_{\lb{x}\to\go{a}^{\g{+}}}f(x)$, then $\displaystyle\lim_{\lb{x}\to\go{a}}f(x)=\t{DNE}$</li></ol>`,
          specific: String.raw`$\gb{\t{Since }\btip{\displaystyle\lim_{\lb{x}\to\go{a}^{\r{-}}}f(x)\ne\displaystyle\lim_{\lb{x}\to\go{a}^{\g{+}}}f(x)}{\t{this is needed as part of your answer}}, \ \btip{\displaystyle\lim_{\lb{x}\to\go{a}}f(x)=\t{DNE}}{\displaystyle\lim_{\lb{x}\to\go{a}}f(x)\t{ does not exist or similar}\\\t{ answers are also correct}}}$`,
        },
      ],
      examples: [
        
      ],
    },
    {
      name: String.raw `Calculate $\displaystyle\lim_{x\to \infty}f(x)$ of a fraction`,
      backgroundColor: "green",
      web: "Hw 3: 1, 5-7, 9; Hw 4: 1-7, 11; Hw 5: 2, 5-7; PT 2: 1-6, 8; Hw 6: 4, 7, 9-10; PT 3: 8; Hw 9: 8, 10; PF: 4, 6, 10-12, 14-15",
      book: "148",
      exam: "Very important in Test 1 and Test 2, might come up in Test 3, important for Final",
      intro: String.raw `In this section, we explain how to find $\displaystyle\lim_{x\to\infty}\frac{\r{a}x^{\go{n}}+\t{terms with }x\t{ to powers less than }\go{n}}{\yu{b}x^{\g{m}}+\t{terms with }x\t{ to powers less than }\g{m}}$ in the case where $\r{a}$ and $\yu{b}$ are positive.<br><br>To make what I mean by "terms with $x$ to powers less than $\go{n}$", lets give an example.<br>If $\go{n}=\go{3}$, then terms with $x$ to a power less than $\go{n}$ would be like $\btip{3x^2}{\t{the power of }x\t{ is 2}\\\t{which is less than }\go{n}=\go{3}}$, $\btip{7x}{\t{the power of }x\t{ is 1}\\\t{which is less than }\go{n}=\go{3}}$ and $\btip{3}{\t{because there is no }x,\\\t{the power of }x\t{ is 0}\\\t{which is less than }\go{n}=\go{3}}$ <br>The limit depends on the highest powers in the numerator and denominator<ol><li>If the numerator has the higher power ($\go{n}>\g{m}$),<br>the limit is $\infty$</li><li>If the numerator has the smaller power ($\go{n}<\g{m}$),<br>the limit is $0$</li><li>If the numerator and the denominator have the same power ($\go{n}=\g{m}$),<br>the limit is $\displaystyle\ya{\frac{\r{a}}{\yu{b}}}$</li></ol>`,
      general: String.raw`Find $\displaystyle\lim_{x\to\infty}\frac{\r{a}x^{\go{n}}+\t{terms with }x\t{ to powers less than }\go{n}}{\yu{b}x^{\g{m}}+\t{terms with }x\t{ to powers less than }\g{m}}$`,
      specific: String.raw`Find $\displaystyle\lim_{x\to\infty}\frac{\r{5}x^{\go{4}}+3x^4+x^2-1}{\yu{2}x^{\g{5}}+4x^2+2}$`,
      rightColWidth: 45,
      steps: [
        {
          general: String.raw`Determine whether $\btip{\go{n}}{\got{The highest power in the numerator}}$ is greater than, less than, or equal to $\btip{\g{m}}{\gt{The highest power in the denominator}}$`,
          specific: String.raw`$\go{4}<\g{5}$`,
        },
        {
          general: String.raw`Calculate the limit:<ol><li>If $\go{n}>\g{m}$, the limit is $\infty$</li><li>If $\go{n}=\g{m}$, the limit is $\frac{\r{a}}{\yu{b}}$</li><li>If $\go{n}<\g{m}$, the limit is $0$</li></ol>`,
          specific: String.raw`$\bb{\t{Because the denominator has the higher power,}}$$$\displaystyle\lim_{x\to\infty}\frac{\r{5}x^{\go{4}}+3x^4+x^2-1}{\yu{2}x^{\g{5}}+4x^2+2}=\gb{0}$$`,
        },
      ],
      examples: [
        
      ],
    },
    {
      name: String.raw `Determine $\displaystyle\lim_{x\to a^{\w{-}}}f(x)$, $\displaystyle\lim_{x\to a^{\w{+}}}f(x)$, and $\displaystyle\lim_{x\to a}f(x)$ from a graph`,
      backgroundColor: "green",
      web: "Hw 3: 1, 5-7, 9; Hw 4: 1-7, 11; Hw 5: 2, 5-7; PT 2: 1-6, 8; Hw 6: 4, 7, 9-10; PT 3: 8; Hw 9: 8, 10; PF: 4, 6, 10-12, 14-15",
      book: "148",
      exam: "Very important in Test 1 and Test 2, might come up in Test 3, important for Final",
      intro: "Empty for now",
      //String.raw `In this section, we explain how to find $\displaystyle\lim_{x\to\go{a}^{\r{-}}}f(x)$, $\displaystyle\lim_{x\to\go{a}^{\g{+}}}f(x)$, $\displaystyle\lim_{x\to\go{a}}f(x)$ from a graph.<br><b>Left-sided Limits</b><br>This is what we mean by $\displaystyle\lim_{x\to\go{a}^{\r{-}}}f(x)$: <ol><li>$\displaystyle\lim_{x\to\go{a}^{\r{-}}}f(x)=\yu{L}$ if $\btip{y\t{ approaches }\yu{L}}{\t{$y$ becomesextremely close to }\yu{L}}$ when $\btip{x\t{ approaches }\go{a}\rt{ from the left}}{x\t{ is }\rt{on the left side }\t{of }x=\go{a}\t{ and }\\x\t{ becomes extremely close to }\go{a}}$</li><li>$\displaystyle\lim_{x\to\go{a}^{\r{-}}}f(x)=\yu{\infty}$ if $\btip{y\t{ approaches }\yu{\infty}}{\t{$y$ becomes}\yut{extremely large and positive}}$ when $\btip{x\t{ approaches }\go{a}\rt{ from the left}}{x\t{ is }\rt{on the left side }\t{of }x=\go{a}\t{ and }\\x\t{ becomes extremely close to }\go{a}}$</li><li>$\displaystyle\lim_{x\to\go{a}^{\r{-}}}f(x)=\yu{-\infty}$ if $\btip{y\t{ approaches }\yu{-\infty}}{\t{$y$ becomes}\yut{extremely large and negative}}$ when $\btip{x\t{ approaches }\go{a}\rt{ from the left}}{x\t{ is }\rt{on the left side }\t{of }x=\go{a}\t{ and }\\x\t{ becomes extremely close to }\go{a}}$</li></ol>To determine the value of $\displaystyle\lim_{x\to\go{a}^{\r{-}}}f(x),\ \btip{\t{approach }x=\go{a}\rt{ from the left}}{\ga{\t{follow the graph as }x\t{ becomes very}\\\t{close to }\go{a}\rt{ from the left side of }x=\go{a}}}$ and determine what happens to $y$.<ol><li>If $y$ $\btip{\t{approaches}}{\t{becomes very close to}}$ <span class='purple'>a number</span>, then $\displaystyle\lim_{x\to\go{a}^{\r{-}}}f(x)=\yut{that number}$</li><li>If $y$ $\btip{\t{approaches }\yu{\infty}}{\t{becomes extremely large and positive}}$, then $\displaystyle\lim_{x\to\go{a}^{\r{-}}}f(x)=\yu{\infty}$</li><li>If $y$ $\btip{\t{approaches }\yu{-\infty}}{\t{becomes extremely large and negative}}$, then $\displaystyle\lim_{x\to\go{a}^{\r{-}}}f(x)=\yu{-\infty}$</li></ol>`,
      general: String.raw`Determine $\displaystyle\lim_{x\to \go{a}^{\r{-}}}f(x)$, $\displaystyle\lim_{x\to \go{a}^{\g{+}}}f(x)$, and $\displaystyle\lim_{x\to \go{a}}f(x)$ from the below graph`,
      specific: String.raw`Below is the graph of $f(x)$: <img src="/pictures/marginalcostjumpNoLim.png" alt="HTML5 Icon" style="width:500px;height:500px;"> <br>Determine $\displaystyle\lim_{x\to \go{40}^{\r{-}}}f(x)$, $\displaystyle\lim_{x\to \go{40}^{\g{+}}}f(x)$, and $\displaystyle\lim_{x\to \go{40}}f(x)$ from the below graph`,
      rightColWidth: 55,
      steps: [
        {
          general: String.raw`To find $\displaystyle\lim_{x\to\go{a}^{\r{-}}}f(x),\ $ $\btip{\t{approach }x=\go{a}\rt{ from the left}}{\t{follow the graph as }x\t{ becomes very}\\\t{close to }\go{a}\rt{ from the left side of }x=\go{a}}$ and determine whether $y$ $\btip{\t{approaches}}{\t{becomes very close to}}$ <span class='purple'>a number</span>, $\btip{\t{approaches }\yu{\infty}}{\t{becomes extremely large and positive}},$ or $\btip{\t{approaches }\yu{-\infty}}{\t{becomes extremely large and negative}}$`,
          specific: String.raw`<img src="/pictures/marginalcostjumpLeft.png" alt="HTML5 Icon" style="width:500px;height:500px;"><br>$\bb{\ga{\t{as you }\btip{\t{approach }x=\go{40}\rt{ from the left}}{\t{follow the graph as }x\t{ becomes very}\\\t{close to }\go{40}\rt{ from the left side of }x=\go{40}},\ y\ \btip{\t{approaches}}{\t{becomes very close to}}\ \yu{80}}}$`,
        },
        {
          general: String.raw`Use Step 1 to find $\displaystyle\lim_{x\to\go{a}^{\r{-}}}f(x)$:<ol><li>If $y$ $\btip{\t{approaches}}{\t{becomes very close to}}$ <span class='purple'>a number</span>, then $\displaystyle\lim_{x\to\go{a}^{\r{-}}}f(x)=\yut{that number}$</li><li>If $y$ $\btip{\t{approaches }\yu{\infty}}{\t{becomes extremely large and positive}}$, then $\displaystyle\lim_{x\to\go{a}^{\r{-}}}f(x)=\yu{\infty}$</li><li>If $y$ $\btip{\t{approaches }\yu{-\infty}}{\t{becomes extremely large and negative}}$, then $\displaystyle\lim_{x\to\go{a}^{\r{-}}}f(x)=\yu{-\infty}$</li></ol>`,
          specific: String.raw`$\displaystyle\lim_{x\to\go{40}^{\r{-}}}f(x)=\gb{\yu{80}}$`,
        },
        {
          general: String.raw`To find $\displaystyle\lim_{x\to\go{a}^{\g{+}}}f(x),\ $ $\btip{\t{approach }x=\go{a}\gt{ from the right}}{\t{follow the graph as }x\t{ becomes very}\\\t{close to }\go{a}\gt{ from the right side of }x=\go{a}}$ and determine whether $y$ $\btip{\t{approaches}}{\t{becomes very close to}}$ <span class='purple'>a number</span>, $\btip{\t{approaches }\yu{\infty}}{\t{becomes extremely large and positive}},$ or $\btip{\t{approaches }\yu{-\infty}}{\t{becomes extremely large and negative}}$`,
          specific: String.raw`<img src="/pictures/marginalcostjumpRight.png" alt="HTML5 Icon" style="width:500px;height:500px;"><br>$\bb{\ga{\t{as you }\btip{\t{approach }x=\go{40}\gt{ from the right}}{\t{follow the graph as }x\t{ becomes very}\\\t{close to }\go{40}\gt{ from the right side of }x=\go{40}},\ y\ \btip{\t{approaches}}{\t{becomes very close to}}\ \yu{40}}}$`,
        },
        {
          general: String.raw`Use Step 1 to find $\displaystyle\lim_{x\to\go{a}^{\g{+}}}f(x)$:<ol><li>If $y$ $\btip{\t{approaches}}{\t{becomes very close to}}$ <span class='purple'>a number</span>, then $\displaystyle\lim_{x\to\go{a}^{\g{+}}}f(x)=\yut{that number}$</li><li>If $y$ $\btip{\t{approaches }\yu{\infty}}{\t{becomes extremely large and positive}}$, then $\displaystyle\lim_{x\to\go{a}^{\g{+}}}f(x)=\yu{\infty}$</li><li>If $y$ $\btip{\t{approaches }\yu{-\infty}}{\t{becomes extremely large and negative}}$, then $\displaystyle\lim_{x\to\go{a}^{\g{+}}}f(x)=\yu{-\infty}$</li></ol>`,
          specific: String.raw`$\displaystyle\lim_{x\to\go{40}^{\g{+}}}f(x)=\gb{\yu{40}}$`,
        },
        {
          general: String.raw`Use the valuess of $\displaystyle\lim_{x\to\go{a}^{\r{-}}}f(x)$ and $\displaystyle\lim_{x\to\go{a}^{\g{+}}}f(x)$ to find $\displaystyle\lim_{x\to\go{a}}f(x)$:<ol><li>If $\displaystyle\lim_{x\to\go{a}^{\r{-}}}f(x)$ and $\displaystyle\lim_{x\to\go{a}^{\g{+}}}f(x)$ are both equal to <span class='purple'>a number</span>, $\displaystyle\lim_{x\to\go{a}}f(x)=\yut{that number}$</li><li>If $\displaystyle\lim_{x\to\go{a}^{\r{-}}}f(x)$ and $\displaystyle\lim_{x\to\go{a}^{\g{+}}}f(x)$ are both equal to $\yu{\infty}$, $\displaystyle\lim_{x\to\go{a}}f(x)=\yu{\infty}$</li><li>If $\displaystyle\lim_{x\to\go{a}^{\r{-}}}f(x)$ and $\displaystyle\lim_{x\to\go{a}^{\g{+}}}f(x)$ are both equal to $\yu{-\infty}$, $\displaystyle\lim_{x\to\go{a}}f(x)=\yu{-\infty}$</li><li>If $\displaystyle\lim_{x\to\go{a}^{\r{-}}}f(x)\ne\displaystyle\lim_{x\to\go{a}^{\g{+}}}f(x)$, then $\displaystyle\lim_{x\to\go{a}}f(x)=\t{DNE}$</li></ol>`,
          specific: String.raw`<img src="/pictures/marginalcostjumpTwoSided.png" alt="HTML5 Icon" style="width:500px;height:500px;">$\ga{\bb{\t{Since }\displaystyle\lim_{x\to\go{40}^{\r{-}}}f(x)\ne\displaystyle\lim_{x\to\go{40}^{\g{+}}}f(x),}\\[10pt]\displaystyle\lim_{x\to\go{40}}f(x)=\gb{\t{DNE}}}$`,
        },
      ],
      examples: [
        
      ],
    },
    {
      name: String.raw `Calculate $\displaystyle\lim_{x\to \infty}f(x)$ from a graph`,
      backgroundColor: "green",
      web: "Hw 3: 1, 5-7, 9; Hw 4: 1-7, 11; Hw 5: 2, 5-7; PT 2: 1-6, 8; Hw 6: 4, 7, 9-10; PT 3: 8; Hw 9: 8, 10; PF: 4, 6, 10-12, 14-15",
      book: "148",
      exam: "Very important in Test 1 and Test 2, might come up in Test 3, important for Final",
      intro: "empty for now",
      //String.raw `In this section, we explain how to find $\displaystyle\lim_{x\to\infty}\frac{\r{a}x^{\go{n}}+\t{terms with }x\t{ to powers less than }\go{n}}{\yu{b}x^{\g{m}}+\t{terms with }x\t{ to powers less than }\g{m}}$ in the case where $\r{a}$ and $\yu{b}$ are positive.<br><br>To make what I mean by "terms with $x$ to powers less than $\go{n}$", lets give an example.<br>If $\go{n}=\go{3}$, then terms with $x$ to a power less than $\go{n}$ would be like $\btip{3x^2}{\ga{\t{the power of }x\t{ is 2}\\\t{which is less than }\go{n}=\go{3}}}$, $\btip{7x}{\ga{\t{the power of }x\t{ is 1}\\\t{which is less than }\go{n}=\go{3}}}$ and $\btip{3}{\ga{\t{because there is no }x,\\\t{the power of }x\t{ is 0}\\\t{which is less than }\go{n}=\go{3}}}$ <br>The limit depends on the highest powers in the numerator and denominator<ol><li>If the numerator has the higher power ($\go{n}>\g{m}$),<br>the limit is $\infty$</li><li>If the numerator has the smaller power ($\g{n}>\go{m}$),<br>the limit is $0$</li><li>If the numerator and the denominator have the same power ($\go{n}=\g{m}$),<br>the limit is the ratio of the coefficients: $\ya{\frac{\r{a}}{\yu{b}}}$</li></ol>`,
      general: String.raw`Find $\displaystyle\lim_{x\to\infty}f(x)$ from the below graph`,
      specific: String.raw`Find $\displaystyle\lim_{x\to\infty}f(x)$ from the below graph<br><img src="/pictures/TVmarginalNoLim.png" alt="HTML5 Icon" style="width:500px;height:500px;">`,
      rightColWidth: 45,
      steps: [
        {
          general: String.raw`To determine the value of $\displaystyle\lim_{x\to\infty}f(x)$ from its graph, look at the far right of the graph and determine whether $y$ $\btip{\t{approaches}}{\t{becomes very close to}}$ <span class='purple'>a number</span>, $\btip{\t{approaches }\yu{\infty}}{\t{becomes extremely large and positive}},$ or $\qquad\btip{\t{approaches }\yu{-\infty}}{\t{becomes extremely large and negative}}$`,
          specific: String.raw`<img src="/pictures/TVmarginalAtInfinity.png" alt="HTML5 Icon" style="width:500px;height:500px;"><br>$\bb{\t{On the far right of the graph, }y\ \btip{\t{approaches}}{\t{becomes very close to}}\yu{100}}$`,
        },
        {
          general: String.raw`Use Step 1 to determine $\displaystyle\lim_{x\to\infty}f(x)$<ol><li>If $y$ $\btip{\t{approaches}}{\t{becomes very close to}}$ <span class='purple'>a number</span>, then $\displaystyle\lim_{x\to\infty}f(x)=\yut{that number}$</li><li>If $y$ $\btip{\t{approaches }\yu{\infty}}{\t{becomes extremely large and positive}}$, then $\displaystyle\lim_{x\to\infty}f(x)=\yu{\infty}$</li><li>If $y$ $\btip{\t{approaches }\yu{-\infty}}{\t{becomes extremely large and negative}}$, then $\displaystyle\lim_{x\to\infty}f(x)=\yu{-\infty}$</li></ol>`,
          specific: String.raw`$\displaystyle\lim_{x\to\infty}f(x)=\gb{\yu{100}}$.`,
        },
      ],
      examples: [
        
      ],
    },
    {
      name: String.raw `Determine the $x$-values where $f(x)$ is discontinuous from its graph`,
      backgroundColor: "green",
      web: "Hw 3: 1, 5-7, 9; Hw 4: 1-7, 11; Hw 5: 2, 5-7; PT 2: 1-6, 8; Hw 6: 4, 7, 9-10; PT 3: 8; Hw 9: 8, 10; PF: 4, 6, 10-12, 14-15",
      book: "148",
      exam: "Very important in Test 1 and Test 2, might come up in Test 3, important for Final",
      intro: "empty for now",
      //String.raw `In this section, we explain how to find $\displaystyle\lim_{x\to\infty}\frac{\r{a}x^{\go{n}}+\t{terms with }x\t{ to powers less than }\go{n}}{\yu{b}x^{\g{m}}+\t{terms with }x\t{ to powers less than }\g{m}}$ in the case where $\r{a}$ and $\yu{b}$ are positive.<br><br>To make what I mean by "terms with $x$ to powers less than $\go{n}$", lets give an example.<br>If $\go{n}=\go{3}$, then terms with $x$ to a power less than $\go{n}$ would be like $\btip{3x^2}{\ga{\t{the power of }x\t{ is 2}\\\t{which is less than }\go{n}=\go{3}}}$, $\btip{7x}{\ga{\t{the power of }x\t{ is 1}\\\t{which is less than }\go{n}=\go{3}}}$ and $\btip{3}{\ga{\t{because there is no }x,\\\t{the power of }x\t{ is 0}\\\t{which is less than }\go{n}=\go{3}}}$ <br>The limit depends on the highest powers in the numerator and denominator<ol><li>If the numerator has the higher power ($\go{n}>\g{m}$),<br>the limit is $\infty$</li><li>If the numerator has the smaller power ($\g{n}>\go{m}$),<br>the limit is $0$</li><li>If the numerator and the denominator have the same power ($\go{n}=\g{m}$),<br>the limit is the ratio of the coefficients: $\ya{\frac{\r{a}}{\yu{b}}}$</li></ol>`,
      general: String.raw`Determine the $x$-values where the below graph is discontinuous`,
      specific: String.raw`Determine the $x$-values where the below graph is discontinuous`,
      rightColWidth: 45,
      steps: [
        {
          general: String.raw`A graph is discontinuous at the $x$-values where you would have to lift your pencil to finish drawing the graph.`,
          specific: String.raw`LATER`,
        },
      ],
      examples: [
        
      ],
    },
    {
      name: String.raw `Calculate a Derivative of a Equation With Multiple Terms Using Power Rule`,
      backgroundColor: "green",
      web: "Hw 3: 1, 5-7, 9; Hw 4: 1-7, 11; Hw 5: 2, 5-7; PT 2: 1-6, 8; Hw 6: 4, 7, 9-10; PT 3: 8; Hw 9: 8, 10; PF: 4, 6, 10-12, 14-15",
      book: "148",
      exam: "Very important in Test 1 and Test 2, might come up in Test 3, important for Final",
      intro: "empty for now",
      //String.raw `In this section, we explain how to find $\displaystyle\lim_{x\to\infty}\frac{\r{a}x^{\go{n}}+\t{terms with }x\t{ to powers less than }\go{n}}{\yu{b}x^{\g{m}}+\t{terms with }x\t{ to powers less than }\g{m}}$ in the case where $\r{a}$ and $\yu{b}$ are positive.<br><br>To make what I mean by "terms with $x$ to powers less than $\go{n}$", lets give an example.<br>If $\go{n}=\go{3}$, then terms with $x$ to a power less than $\go{n}$ would be like $\btip{3x^2}{\ga{\t{the power of }x\t{ is 2}\\\t{which is less than }\go{n}=\go{3}}}$, $\btip{7x}{\ga{\t{the power of }x\t{ is 1}\\\t{which is less than }\go{n}=\go{3}}}$ and $\btip{3}{\ga{\t{because there is no }x,\\\t{the power of }x\t{ is 0}\\\t{which is less than }\go{n}=\go{3}}}$ <br>The limit depends on the highest powers in the numerator and denominator<ol><li>If the numerator has the higher power ($\go{n}>\g{m}$),<br>the limit is $\infty$</li><li>If the numerator has the smaller power ($\g{n}>\go{m}$),<br>the limit is $0$</li><li>If the numerator and the denominator have the same power ($\go{n}=\g{m}$),<br>the limit is the ratio of the coefficients: $\ya{\frac{\r{a}}{\yu{b}}}$</li></ol>`,
      general: String.raw`$f(x)=\yut{\{an equation\}}$ Find $f'(x)$`,
      specific: String.raw`$f(x)=2x^3+\displaystyle\frac{3}{x}-4\sqrt{x}+2$. Find $f'(x)$`,
      rightColWidth: 45,
      steps: [
        {
          general: String.raw`Break down the derivative to calculate the derivative of each term. In other words, do $$f'(x)=\d{\t{first term}}+\d{\t{second term}}+\cdots$$`,
          specific: String.raw`$$f'(x)=\bb{\displaystyle\d{2x^3}+\d{\frac{3}{x}}-\d{4\sqrt{x}}+\d{2}}$$`,
        },
        {
          general: String.raw`To calculate the derivative of each term from step 1, you may need rewrite some of them as $\btip{\b{c}x^{\r{n}}}{\bt{a constant}\t{ times }x\t{ to}\rt{ a power}}$ using the following properties of exponents:$$\begin{aligned}\g{\frac{\b{c}}{\sqrt{\bk{x}}}}&=\b{c}x^{\g{-\tiny\frac{1}{2}}}\qquad&\g{\frac{\b{c}}{\bk{x}}}&=\b{c}x^{\g{-1}}\qquad&\g{\sqrt{\bk{x}}}&=x^{\tiny\g{\frac{1}{2}}}\\[20pt]\g{\frac{\b{c}}{\sqrt[\r{n}]{\bk{x}}}}&=x^{\tiny\g{-\frac{1}{\r{n}}}}\qquad&\g{\frac{\b{c}}{\bk{x}^{\r{n}}}}&=\b{c}x^{\g{-}\r{n}}\qquad&\g{\sqrt[\r{n}]{\bk{x}}}&=x^{\tiny\g{\frac{1}{\r{n}}}}\end{aligned}$$`,
          specific: String.raw`$$\bb{\begin{aligned}\d{\g{\frac{\b{3}}{\bk{x}}}}&=\d{\b{3}x^{\g{-1}}}\\[10pt]\d{\b{4}\g{\sqrt{\bk{x}}}}&=\d{\b{4}x^{\g{1/2}}}\end{aligned}}$$`,
        },
        {
          general: String.raw`To calculate $\displaystyle\b{c}\d{x^{\r{n}}}$, leave $\b{c}$ as it is, multiply by <span class='red'>the power</span>, and subtract one from <span class='red'>the power</span>.$$\d{\b{c}x^{\r{n}}}=\b{c}\ya{\r{n}x^{\r{n}-1}}$$`,
          specific: String.raw`$$\bb{\begin{aligned}\d{\b{2}x^{\r{3}}}&=\b{2}\ya{\r{3}x^{\r{3}-1}}\\[10pt]\d{\g{\frac{\b{3}}{\bk{x}}}}&=\d{\b{3}x^{\g{-1}}}=\b{3}\ya{\r{-1}x^{\r{-1}-1}}\\[10pt]\d{\b{4}\g{\sqrt{\bk{x}}}}&=\d{\b{4}x^{\r{1/2}}}=\b{4}\ya{\r{\frac{1}{2}}x^{\r{1/2}-1}}\end{aligned}}$$`,
        },
        {
          general: String.raw`The derivative of $\b{c}x$ is $\b{c}$ and the derivative of a constant (which is not multiplying an $x$) is 0:$$\d{\b{c}x}=\b{c}\ya{1}\t{ and }\d{\bt{\{a constant\}}}=0$$`,
          specific: String.raw`$$\bb{\d{2}=0}$$`,
        },
        {
          general: String.raw`Put the terms from steps 3 and 4 back together to get the derivative of the entire function:$$\begin{aligned}f'(x)=&\t{\{derivative of the first term\}}\\[10pt]+&\t{\{derivative of the second term\}}+\cdots\end{aligned}$$`,
          specific: String.raw`$$\begin{aligned}f'(x)&=\gb{\b{2}\ya{\r{3}x^{\r{3}-1}}+\b{3}\ya{\r{-1}x^{\r{-1}-1}}-\b{4}\ya{\r{\frac{1}{2}}x^{\r{1/2}-1}}+0}\end{aligned}$$`,
        },
      ],
      examples: [
        
      ],
    },
    {
      name: "Product Rule",
      backgroundColor: "green",
      web: "LATER",
      book: "158-159",
      exam: "Might be on Test 1",
      intro: String.raw`In this section, we show how to calculate the derivative of <span class='purple'>one function</span> multipled by <span class='orange'>another function</span>. We do this with the Product Rule: $$\begin{flalign}&\frac{d}{dx}\ya{\yut{\{first function\}}\cdot\ot{\{second function\}}}\\[10pt]&\quad=\gt{\{the derivative of the first function\}}\cdot\ot{\{the second function\}}\\[10pt]&\qquad+\yut{\{the first function\}}\cdot\bt{\{the derivative of the second function\}}\\[10pt]&\t{or, the abbreviated version,}\\[10pt]&\frac{d}{dx}\ya{\yu{f_1(x)}\cdot\o{f_2(x)}}=\g{f_1'(x)}\cdot\o{f_2(x)}+\yu{f_1(x)}\cdot\b{f_2'(x)}\end{flalign}$$Warning: If either $\yu{f_1(x)}$ or $\o{f_2(x)}$ is a constant, use the constant multiple rule instead of the product rule. The product rule is more complicated and overkill in that case`,
      general: String.raw`$f(x)=\frac{d}{dx}\ya{\yut{\{first function\}}\cdot\ot{\{second function\}}}$. Find $f'(x)$<br>OR<br>Find $\frac{d}{dx}\ya{\yut{\{first function\}}\cdot\ot{\{second function\}}}$`,
      specific: String.raw`$f(x)=\yu{\ya{4x^2+x}}\cdot\o{\ya{3-x}}$. Find $f'(x)$`,
      rightColWidth: 50,
      steps: [
        {
          general: String.raw`Identify $\yu{f_1(x)}$ and $\o{f_2(x)}$:$$\begin{aligned}1.\ \yu{f_1(x)}&\t{ is the }\yut{first function}\\[10pt]2.\ \o{f_2(x)}&\t{ is the }\ot{second function}\end{aligned}$$`,
          specific: String.raw`$$\begin{aligned}\yu{f_1(x)}&=\yu{4x^2+x}\\[10pt]\o{f_2(x)}&=\o{3-x}\end{aligned}$$`,
        },
        {
          general: String.raw`Find $\btip{\g{f_1'(x)}}{\gt{the derivative of $f_1(x)$}}$ and $\btip{\b{f_2'(x)}}{\bt{the derivative of $f_2(x)$}}$`,
          specific: String.raw`$$\begin{aligned}\g{f_1'(x)}&=\frac{d}{dx}\ya{\yu{4x^2+x}}\\[10pt]&=\frac{d}{dx}\ya{4x^2}+\frac{d}{dx}\ya{x}\\[10pt]&=\btip{4\cdot(2x)}{\frac{d}{dx}\ya{\b{4}x^{\r{2}}}&=\b{4}\cdot\frac{d}{dx}\ya{x^{\r{2}}}\\&=\b{4}\cdot\r{2}x^{\r{2}-1}}+\btip{1}{\frac{d}{dx}\ya{x}=1}\\[10pt]&=\g{8x+1}\\[10pt]\b{f_2'(x)}&=\frac{d}{dx}\ya{\o{3-x}}\\[10pt]&=\frac{d}{dx}\ya{3}-\frac{d}{dx}\ya{x}\\[10pt]&=\btip{0}{\t{the derivative of}\\ \t{a constant is 0}}-\btip{1}{\frac{d}{dx}\ya{x}=1}\\[10pt]&=\b{-1}\end{aligned}$$`,
        },
        {
          general: String.raw`Substitute $\btip{\yu{f_1(x)}}{\yut{the first function}}$, $\btip{\o{f_2(x)}}{\ot{the second function}}$, $\btip{\g{f_1'(x)}}{\gt{the derivative of the first function}}$, and $\btip{\b{f_2'(x)}}{\bt{the derivative of the second function}}$ into the product rule equation:$$f'(x)=\g{f_1'(x)}\cdot\o{f_2(x)}+\yu{f_1(x)}\cdot\b{f_2'(x)}$$`,
          specific: String.raw`$$\begin{aligned}f'(x)&=\g{f_1'(x)}\cdot\o{f_2(x)}+\yu{f_1(x)}\cdot\b{f_2'(x)}\\[10pt]&=\g{(8x+1)}\cdot\o{(3-x)}+\yu{(4x^2+x)}\cdot\b{\ya{-1}}\end{aligned}$$`,
        }
      ],
      examples: [
        // {
        //   specific: "$f(x)=\\b{3}\\g{\\sqrt{\\bk{x}}}$. Find $f'(x)$",
        //   steps: ["$$f(x)=\\b{3}x^{\\r{1/2}}$$","$$\\begin{aligned}f'(x)&=\\b{3}\\cdot\\frac{d}{dx}\\ya{x^{\\r{1/2}}}\\\\[10pt]&=\\b{3}\\cdot\\ya{\\r{\\frac{1}{2}}x^{\\r{1/2}-1}}\\\\[10pt]&=\\frac{3}{2}x^{-3/2}\\end{aligned}$$"],
        // },
        // {
        //   specific: "Find $\\displaystyle\\frac{d}{dx}\\left(x^{\\r{\\tiny\\frac{1}{2}}}\\right)$",
        //   steps: ["$$\\frac{d}{dx}\\left(x^{\\r{\\tiny\\frac{1}{2}}}\\right)=\\r{\\frac{1}{2}}x^{\\r{\\tiny\\frac{1}{2}}-1}$$"],
        // },
      ],
    },
    {
      name: "Quotient Rule",
      backgroundColor: "green",
      web: "LATER",
      book: "158-159",
      exam: "Might be on Test 1",
      intro: String.raw`In this section, we show how to calculate the derivative of <span class='purple'>one function</span> divided by <span class='orange'>another function</span>. We do this with the Quotient Rule: $$\begin{flalign}&\frac{d}{dx}\ya{\frac{\yut{\{numerator\}}}{\ot{\{denominator\}}}}\\[10pt]&\quad=\frac{\gt{\{the derivative of the numerator\}}\cdot\ot{\{the denominator\}}}{\ya{\ot{\{the denominator\}}}^2}\\[10pt]&\qquad-\frac{\yut{\{the numerator\}}\cdot\bt{\{the derivative of the denominator\}}}{\ya{\ot{\{the denominator\}}}^2}\\[10pt]&\t{or, the abbreviated version,}\\[10pt]&\frac{d}{dx}\ya{\frac{\yu{f_1(x)}}{\o{f_2(x)}}}=\frac{\g{f_1'(x)}\cdot\o{f_2(x)}-\yu{f_1(x)}\cdot\b{f_2'(x)}}{\ya{\o{f_2(x)}}^2}\end{flalign}$$Warning: If $\o{f_2(x)}$ is a constant, it is $\btip{\t{simpler to use the 'constant division rule' instead of the quotient rule}}{\t{if you don't remember the constant division rule, you can use still use the quotient rule}}$. In this case, you would leave the constant in the denominator as it is and take the derivative of the numerator. If $\yu{f_1(x)}$ is a constant, you still need quotient rule because the 'constant division rule' only applies when the constant is the denominator.`,
      general: String.raw`$f(x)=\frac{d}{dx}\ya{\frac{\yut{\{numerator\}}}{\ot{\{denominator\}}}}$. Find $f'(x)$<br>OR<br>Find $\frac{d}{dx}\ya{\frac{\yut{\{numerator\}}}{\ot{\{denominator\}}}}$`,
      specific: String.raw`$f(x)=\frac{\yu{4x^2+x}}{\o{3-x}}$. Find $f'(x)$`,
      rightColWidth: 50,
      steps: [
        {
          general: String.raw`Identify $\yu{f_1(x)}$ and $\o{f_2(x)}$:$$\begin{aligned}1.\ \yu{f_1(x)}&\t{ is the }\yut{the numerator}\\[10pt]2.\ \o{f_2(x)}&\t{ is }\ot{the denominator}\end{aligned}$$`,
          specific: String.raw`$$\begin{aligned}\yu{f_1(x)}&=\yu{4x^2+x}\\[10pt]\o{f_2(x)}&=\o{3-x}\end{aligned}$$`,
        },
        {
          general: String.raw`Find $\btip{\g{f_1'(x)}}{\gt{the derivative of $f_1(x)$}}$ and $\btip{\b{f_2'(x)}}{\bt{the derivative of $f_2(x)$}}$`,
          specific: String.raw`$$\begin{aligned}\g{f_1'(x)}&=\frac{d}{dx}\ya{\yu{4x^2+x}}\\[10pt]&=\frac{d}{dx}\ya{4x^2}+\frac{d}{dx}\ya{x}\\[10pt]&=\btip{4\cdot(2x)}{\frac{d}{dx}\ya{\b{4}x^{\r{2}}}&=\b{4}\cdot\frac{d}{dx}\ya{x^{\r{2}}}\\&=\b{4}\cdot\r{2}x^{\r{2}-1}}+\btip{1}{\frac{d}{dx}\ya{x}=1}\\[10pt]&=\g{8x+1}\\[10pt]\b{f_2'(x)}&=\frac{d}{dx}\ya{\o{3-x}}\\[10pt]&=\frac{d}{dx}\ya{3}-\frac{d}{dx}\ya{x}\\[10pt]&=\btip{0}{\t{the derivative of}\\ \t{a constant is 0}}-\btip{1}{\frac{d}{dx}\ya{x}=1}\\[10pt]&=\b{-1}\end{aligned}$$`,
        },
        {
          general: String.raw`Substitute $\btip{\yu{f_1(x)}}{\yut{the numerator}}$, $\btip{\o{f_2(x)}}{\ot{the denominator}}$, $\btip{\g{f_1'(x)}}{\gt{the derivative of the numerator}}$, and $\btip{\b{f_2'(x)}}{\bt{the derivative of the denominator}}$ into the quotient rule equation:$$f'(x)=\frac{\g{f_1'(x)}\cdot\o{f_2(x)}-\yu{f_1(x)}\cdot\b{f_2'(x)}}{\ya{\o{f_2(x)}}^2}$$`,
          specific: String.raw`$$\begin{aligned}f'(x)&=\frac{\g{f_1'(x)}\cdot\o{f_2(x)}-\yu{f_1(x)}\cdot\b{f_2'(x)}}{\ya{\o{f_2(x)}}^2}\\[10pt]&=\frac{\g{(8x+1)}\cdot\o{(3-x)}-\yu{(4x^2+x)}\cdot\b{\ya{-1}}}{\ya{\o{3-x}}^2}\end{aligned}$$`,
        }
      ],
      examples: [
        // {
        //   specific: "$f(x)=\\b{3}\\g{\\sqrt{\\bk{x}}}$. Find $f'(x)$",
        //   steps: ["$$f(x)=\\b{3}x^{\\r{1/2}}$$","$$\\begin{aligned}f'(x)&=\\b{3}\\cdot\\frac{d}{dx}\\ya{x^{\\r{1/2}}}\\\\[10pt]&=\\b{3}\\cdot\\ya{\\r{\\frac{1}{2}}x^{\\r{1/2}-1}}\\\\[10pt]&=\\frac{3}{2}x^{-3/2}\\end{aligned}$$"],
        // },
        // {
        //   specific: "Find $\\displaystyle\\frac{d}{dx}\\left(x^{\\r{\\tiny\\frac{1}{2}}}\\right)$",
        //   steps: ["$$\\frac{d}{dx}\\left(x^{\\r{\\tiny\\frac{1}{2}}}\\right)=\\r{\\frac{1}{2}}x^{\\r{\\tiny\\frac{1}{2}}-1}$$"],
        // },
      ],
    },
    {
      name: "Generalized Power Rule",
      backgroundColor: "green",
      web: "LATER",
      book: "158-159",
      exam: "Might be on Test 1",
      intro: String.raw`In this section, we show how to combine the Generalized Power Rule of the previous section with properties of exponents. The relevant properties of exponents are $$\begin{aligned}\g{\frac{\b{c}}{\sqrt{\yu{g(x)}}}}&=\b{c}\ya{{\yu{g(x)}}}^{\g{-\tiny\frac{1}{2}}}\qquad&\g{\frac{\b{c}}{\yu{g(x)}}}&=\b{c}\ya{{\yu{g(x)}}}^{\g{-1}}\qquad&\g{\sqrt{\yu{g(x)}}}&=\ya{{\yu{g(x)}}}^{\tiny\g{\frac{1}{2}}}\\[20pt]\g{\frac{\b{c}}{\sqrt[\r{n}]{\yu{g(x)}}}}&=\ya{{\yu{g(x)}}}^{\tiny\g{-\frac{1}{\r{n}}}}\qquad&\g{\frac{\b{c}}{{\yu{g(x)}}^{\r{n}}}}&=\b{c}\ya{{\yu{g(x)}}}^{\g{-}\r{n}}\qquad&\g{\sqrt[\r{n}]{\yu{g(x)}}}&=\ya{{\yu{g(x)}}}^{\tiny\g{\frac{1}{\r{n}}}}\end{aligned}$$Here are some examples to make the above properties a little clearer:$$\begin{aligned}\g{\frac{\b{1}}{\sqrt{\yu{x^2+1}}}}&=\b{1}\yu{\ya{x^2+1}}^{\g{\tiny-\frac{1}{2}}}\qquad&\g{\frac{\b{3}}{{\yu{x^2+1}}}}&=\b{3}\ya{{\yu{x^2+1}}}^{\g{-1}}\qquad&\g{\sqrt{\yu{x^2+1}}}&=\ya{{\yu{x^2+1}}}^{\tiny\g{\frac{1}{2}}}\\[20pt]\g{\frac{\b{4}}{\sqrt[\r{3}]{\yu{x^2+1}}}}&=\b{4}\ya{{\yu{x^2+1}}}^{\g{\tiny-\frac{1}{\r{3}}}}\qquad&\g{\frac{\b{2}}{\yu{\ya{x^2+1}}^{\r{1/2}}}}&=\b{2}\ya{{\yu{x^2+1}}}^{\g{-}\r{1/2}}\qquad&\g{\sqrt[\r{3}]{\yu{x^2+1}}}&=\ya{{\yu{x^2+1}}}^{\tiny\g{\frac{1}{\r{3}}}}\end{aligned}$$To calculate the derivative of a square or cube root, a $\r{n}$th root, or <span class='blue'>a constant</span> divided by $x$ to <span class='red'>a power</span>, use the one of the properties of exponents to rewrite it in the form of $\b{c}\ya{{\yu{g(x)}}}^{\r{n}}$ (<span class='blue'>a constant</span> times <span class='purple'>a function</span> to <span class='red'>a power</span>). Then we use can use the Generalized Power Rule and the Constant Multiple Rule to calculate the derivative`,
      general: String.raw`$f(x)=\ya{\yut{\{a function\}}}^{\rt{\{a power\}}}$. Find $f'(x)$<br>OR<br>Find $\d{\ya{\yut{\{a function\}}}^{\rt{\{a power\}}}}$`,
      specific: String.raw`$f(x)=\frac{\b{2}}{\ya{\yu{2x+1}}^{\r{6}}}$. Find $f'(x)$`,
      rightColWidth: 50,
      steps: [
        {
          general: String.raw`Rewrite $f(x)$ in the form $\btip{\b{c}\yu{\ya{g(x)}}^{\r{n}}}{\bt{a number}\t{ times }\yut{a function}\t{ to }\rt{a power}}$  using one of these properties of exponents:$$\begin{aligned}\g{\frac{\b{c}}{\sqrt{\yu{g(x)}}}}&=\b{c}\ya{{\yu{g(x)}}}^{\g{-\tiny\frac{1}{2}}}\qquad&\g{\frac{\b{c}}{\yu{g(x)}}}&=\b{c}\ya{{\yu{g(x)}}}^{\g{-1}}\qquad&\g{\sqrt{\yu{g(x)}}}&=\ya{{\yu{g(x)}}}^{\tiny\g{\frac{1}{2}}}\\[20pt]\g{\frac{\b{c}}{\sqrt[\r{n}]{\yu{g(x)}}}}&=\ya{{\yu{g(x)}}}^{\tiny\g{-\frac{1}{\r{n}}}}\qquad&\g{\frac{\b{c}}{{\yu{g(x)}}^{\r{n}}}}&=\b{c}\ya{{\yu{g(x)}}}^{\g{-}\r{n}}\qquad&\g{\sqrt[\r{n}]{\yu{g(x)}}}&=\ya{{\yu{g(x)}}}^{\tiny\g{\frac{1}{\r{n}}}}\end{aligned}$$`,
          specific: String.raw`$$\begin{aligned}f(x)&=\b{2}\cdot\ya{\yu{2x+1}}^{-\r{6}}\end{aligned}$$`,
        },
        {
          general: String.raw`Find $\g{g'(x)}$`,
          specific: String.raw`$$\bb{\g{g'(x)}=\d{2x+1}=\g{2}}$$`,
        },
        {
          general: String.raw`Use the Constant Multiple Rulea and Generalized Power Rule to find the derivative of $\btip{\b{c}\yu{\ya{g(x)}}^{\r{n}}}{\bt{a number}\t{ times }\yut{a function}\t{ to }\rt{a power}}$:$$\d{\b{c}\yu{\ya{g(x)}}^{\r{n}}}=\b{c}\ya{\r{n}}\yu{\ya{g(x)}}^{\r{n}-1}\cdot \g{g'(x)}$$`,
          specific: String.raw`$$\begin{aligned}f'(x)&=\bb{\d{\b{2}\cdot\ya{\yu{2x+1}}^{-\r{6}}}}\\[10pt]&=\bb{\b{2}\cdot\d{\ya{\yu{2x+1}}^{-\r{6}}}}\\[10pt]&=\bb{\b{2}\cdot\ya{\r{6}\cdot\ya{\yu{2x+1}}^{\r{6}-1}}\cdot\g{g'(x)}}\\[10pt]&=\gb{\b{2}\cdot\ya{-\r{6}\cdot\ya{\yu{2x+1}}^{-\r{6}-1}}\cdot\g{2}}\end{aligned}$$`,
        }
      ],
      examples: [
        // {
        //   specific: "$f(x)=\\b{3}\\g{\\sqrt{\\bk{x}}}$. Find $f'(x)$",
        //   steps: ["$$f(x)=\\b{3}x^{\\r{1/2}}$$","$$\\begin{aligned}f'(x)&=\\b{3}\\cdot\\frac{d}{dx}\\ya{x^{\\r{1/2}}}\\\\[10pt]&=\\b{3}\\cdot\\ya{\\r{\\frac{1}{2}}x^{\\r{1/2}-1}}\\\\[10pt]&=\\frac{3}{2}x^{-3/2}\\end{aligned}$$"],
        // },
        // {
        //   specific: "Find $\\displaystyle\\frac{d}{dx}\\left(x^{\\r{\\tiny\\frac{1}{2}}}\\right)$",
        //   steps: ["$$\\frac{d}{dx}\\left(x^{\\r{\\tiny\\frac{1}{2}}}\\right)=\\r{\\frac{1}{2}}x^{\\r{\\tiny\\frac{1}{2}}-1}$$"],
        // },
      ],
    },
  ],
}
