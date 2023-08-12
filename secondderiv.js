window.j = {
  startCollapsed: false,
  lessonNum: 7,
  lessonName: "Pracetice Exam",
  intro: "Last lecture, we saw the derivative is the rate of change of something and saw a large number of applications of the derivative.<br>In this lecture, we will discuss how to calculate derivatives.<br>We write the derivative of $f(x)$ as $f'(x)$ or $\\frac{d}{dx}\\left(f(x)\\right)$",
  sections: [
    {
      name: String.raw `Find horizontal asymptotes of a function`,
      backgroundColor: "green",
      web: "Hw 3: 1, 5-7, 9; Hw 4: 1-7, 11; Hw 5: 2, 5-7; PT 2: 1-6, 8; Hw 6: 4, 7, 9-10; PT 3: 8; Hw 9: 8, 10; PF: 4, 6, 10-12, 14-15",
      book: "148",
      exam: "Up to one question on Test 2, Up to one question on Final",
      intro: String.raw `In this section, we describe how to find the horizontal asymptotes of a function.<br>In this class, a horizontal asymptote is a horizontal line that the graph of a function $\btip{\t{approaches on the far right of the graph}}{\t{In more complicated situations, a horizontal}\\\t{asymptote could be on the far left side instead}}$<br>For example, $y=\pu{1}$ is a horizontal asymptote of the below graph.<br><img src="/pictures/NotesHA1AtInfinity.png" alt="HTML5 Icon" style="width:500px;height:500px;"><br>Since $\displaystyle\lim_{x\to\infty}f(x)=\put{a number}$ means that $y$ approaches $y=\put{that number}$ on the far right of the graph, you can find a horizontal asymptote of $f(x)$ by calculating $\displaystyle\lim_{x\to\infty}f(x)$:<br><ol><li>If $\displaystyle\lim_{x\to\infty}f(x)=\put{a number}$, then $\btip{\t{the horizontal asymptote of }f(x)}{f(x)\t{ could have a second horizontal}\\\t{asymptote corresponding to }\displaystyle\lim_{x\to-\infty}f(x)\\\t{but this does not happen in our course}}$ is $y=\put{that number}$</li><li>If $\displaystyle\lim_{x\to\infty}f(x)=\infty$, then $\btip{f(x)\t{ has no horizontal asymptotes}}{f(x)\t{ could still have a horizontal}\\\t{asymptote corresponding to }\displaystyle\lim_{x\to-\infty}f(x)\\\t{but this does not happen in our course}}$</li></ol>In particular, when $\displaystyle\lim_{x\to\infty}\frac{\r{a}x^{\go{n}}+\t{terms with }x\t{ to powers less than }\go{n}}{\lb{b}x^{\g{m}}+\t{terms with }x\t{ to powers less than }\g{m}}$ we have the following:<br><ol><li>$\btip{\t{If the numerator has the higher power}}{\go{n}>\g{m}}$, then $\displaystyle\lim_{x\to\infty}f(x)=\infty$ and $f(x)$ has no horizontal asymptotes</li><li>$\btip{\t{If the denominator has the higher power}}{\g{m}>\go{n}}$, then $\displaystyle\lim_{x\to\infty}f(x)=\pu{0}$ and the horizontal asymptote of $f(x)$ is $y=\pu{0}$</li><li>$\btip{\t{If the denominator and the numerator have the same highest power}}{\g{m}=\go{n}}$, then $\displaystyle\lim_{x\to\infty}f(x)=\pu{\frac{\r{a}}{\lb{b}}}$ and the horizontal asymptote of $f(x)$ is $y=\pu{\frac{\r{a}}{\lb{b}}}$</li></ol>`,
      general: String.raw `$$f(x)=\displaystyle\frac{\r{a}x^{\go{n}}+\t{terms with }x\t{ to powers less than }\go{n}}{\lb{b}x^{\g{m}}+\t{terms with }x\t{ to powers less than }\g{m}}$$Find the horizontal asymptote(s) of $f(x)$`,
      specific: String.raw `$$f(x)=\displaystyle\frac{\r{7}x^{\go{3}}+8x+1}{\lb{4}x^{\g{6}}+1}$$Find the horizontal asymptote(s) of $f(x)$`,
      rightColWidth: 50,
      steps: [
        {
          general: String.raw`Determine whether $\btip{\go{n}}{\got{The highest power in the numerator}}$ is greater than, less than, or equal to $\btip{\g{m}}{\gt{The highest power in the denominator}}$`,
          specific: String.raw`$$\bb{\go{3}<\g{6}}$$`,
        },
        {
          general: String.raw`Find the horizontal asymptote(s) of $f(x)$:<br><ol><li>If $\btip{\go{n}>\g{m}}{\t{The numerator has}\\\t{the higher power}}$, $f(x)$ has no horizontal asymptotes</li><li>If $\btip{\g{m}>\go{n}}{\t{The denominator has}\\\t{the higher power}}$, the horizontal asymptote of $f(x)$ is $y=0$</li><li>If $\btip{\g{m}=\go{n}}{\t{The denominator and}\\\t{the numerator have}\\\t{the same highest power}}$, the horizontal asymptote of $f(x)$ is $y=\frac{\r{a}}{\lb{b}}$</li></ol><b>Note: You must include the $y=$; it will be worth points on the exam.</b>`,
          specific: String.raw`$\begin{aligned}&\bb{\t{Because the denominator has the higher power,}}\\[4pt]&\t{The horizontal asymptote of $f(x)$ is $\gb{y=0}$}\end{aligned}$`,
        }
      ],
      examples: [
      ],
    },
    {
      name: String.raw `Find vertical asymptotes of a function`,
      backgroundColor: "green",
      web: "Hw 3: 1, 5-7, 9; Hw 4: 1-7, 11; Hw 5: 2, 5-7; PT 2: 1-6, 8; Hw 6: 4, 7, 9-10; PT 3: 8; Hw 9: 8, 10; PF: 4, 6, 10-12, 14-15",
      book: "148",
      exam: "Up to one question on Test 2, Up to one question on Final",
      intro: String.raw `In this section, we describe how to find the vertical asymptotes of a function.<br>A vertical asymptote of a graph is a vertical line that a graph approaches $\btip{\t{as }x\t{ approaches }\got{an $x$-value}}{\t{from the right and/or left side}}$<br>For example, $x=\go{2}$ is a vertical asymptote of the below graph.<br><img src="/pictures/NotesVA1Right.png" alt="HTML5 Icon" style="width:500px;height:500px;"><br>One can show that $x=\go{a}$ is a vertical asymptote of $f(x)$ if $\displaystyle\lim_{x\to\go{a}^-}f(x)$ and/or $\displaystyle\lim_{x\to\go{a}^+}f(x)$ are either $\infty$ or $-\infty$<br>In this class, we will only find vertical asymptotes of fractions. In this class, the vertical asymptotes of a fraction are $x=\got{first $x$-value where the denominator is 0},$ $x=\got{second $x$-value where the denominator is 0},$$\ \cdots\ ,\ $$x=\got{last $x$-value where the denominator is 0}$`,
      general: String.raw `$$f(x)=\frac{\t{\{numerator\}}}{\rt{\{denominator\}}}$$Find the vertical asymptote(s) of $f(x)$`,
      specific: String.raw `$$f(x)=\displaystyle\frac{x+3}{\r{3x-2}}$$Find the vertical asymptote(s) of $f(x)$`,
      rightColWidth: 50,
      steps: [
        {
          general: String.raw`Solve $\rt{\{denominator\}}=0$ for $x$:`,
          specific: String.raw`$$\gb{\r{3x-2}=0}$$$$\bb{3x=2}$$$$\gb{x=\go{\frac{2}{3}}}$$`,
        },
        {
          general: String.raw`The vertical asymptotes of $f(x)$ are $x=\got{first $x$-value from step 1}$, $x=\got{second $x$-value from step 1}$, ..., $x=\got{last $x$-value from step 1}$`,
          specific: String.raw`$\ob{\t{The vertical asymptote of }f(x)\t{ is }x=\go{\frac{2}{3}}}$`,
        }
      ],
      examples: [
      ],
    },
    {
      name: String.raw `Find the second derivative of a function`,
      backgroundColor: "green",
      web: "Hw 3: 1, 5-7, 9; Hw 4: 1-7, 11; Hw 5: 2, 5-7; PT 2: 1-6, 8; Hw 6: 4, 7, 9-10; PT 3: 8; Hw 9: 8, 10; PF: 4, 6, 10-12, 14-15",
      book: "148",
      exam: "Up to one question on Test 2, Up to one question on Final",
      intro: String.raw `In this section, we describe how to find the second derivative of a function.<br>The second derivative of a function is the derivative of the derivative of the function and is written as $f''(x)$.<br>To find $f''(x)$, find $f'(x)$ and the take the derivative of $f'(x)$`,
      general: String.raw `$$f(x)=\{\t{an equation}\}$$Find $f''(x)$`,
      specific: String.raw `$$f(x)=3x^3+7x^2-8x+4+\frac{4}{x}$$Find $f''(x)$`,
      rightColWidth: 50,
      steps: [
        {
          general: String.raw`Find $f'(x)$:`,
          specific: String.raw`$$\begin{aligned}f'(x)&=\bb{\d{3x^3+7x^2-8x+4+\frac{4}{x}}}\\[10pt]&=\bb{\d{3x^3+7x^2-8x+4+4x^{-1}}}\\[10pt]&=\bb{\d{3x^3}+\d{7x^2}-\d{8x}+\d{4}+\d{4x^{-1}}}\\[10pt]&=\bb{\btipa{3(3x^2)}{\d{\b{3}x^{\r{3}}}=\b{3}\p{\r{3}x^{\r{3}-1}}}+\btipa{7(2x)}{\d{\b{7}x^{\r{2}}}=\b{7}\p{\r{2}x^{\r{2}-1}}}-\btipa{8(1)}{\d{\b{8}x}&=\b{8}\cdot\d{x}\\[8pt]&=\b{8}(1)}+\btip{0}{\d{\t{a constant}}=0}+\btipa{4(-x^{-2})}{\d{\b{4}x^{\r{-1}}}=\b{4}\p{\r{-1}x^{\r{-1}-1}}}}\\[10pt]&=\gb{9x^2+14x-8-4x^{-2}}\end{aligned}$$`,
        },
        {
          general: String.raw`$f''(x)$ is the derivative of $f'(x)$`,
          specific: String.raw`$$\begin{aligned}f'(x)&=\bb{\d{9x^2+14x-8-4x^{-2}}}\\[10pt]&=\bb{\d{9x^2}+\d{14x}-\d{8}-\d{4x^{-2}}}\\[10pt]&=\gb{\btipa{9(2x)}{\d{\b{9}x^{\r{2}}}=\b{9}\p{\r{2}x^{\r{2}-1}}}+\btipa{14(1)}{\d{\b{14}x}&=\b{14}\cdot\d{x}\\[8pt]&=\b{14}(1)}+\btip{0}{\d{\t{a constant}}=0}-\btipa{4(-2x^{-3})}{\d{\b{4}x^{\r{-2}}}=\b{4}\p{\r{-2}x^{\r{-2}-1}}}}\\[10pt]&=\ob{18x+14+8x^{-3}}\end{aligned}$$`,
        }
      ],
      examples: [
      ],
    },
    {
      name: String.raw `Find the critical points of a function (WebAssign only)`,
      backgroundColor: "green",
      web: "Hw 3: 1, 5-7, 9; Hw 4: 1-7, 11; Hw 5: 2, 5-7; PT 2: 1-6, 8; Hw 6: 4, 7, 9-10; PT 3: 8; Hw 9: 8, 10; PF: 4, 6, 10-12, 14-15",
      book: "148",
      exam: "WebAssign only",
      intro: String.raw `In this class, the critical points of a function are $\btip{\t{the points where }f'(x)=0}{\t{more complicated situations, critical}\\\t{points also occur when $f'(x)=\t{DNE}$}}$.<br>We will see later that critical points are related to where a function is increasing and decreasing and maximimizing or minimizing a function.`,
      general: String.raw `$$f(x)=\{\t{an equation}\}$$Find the critical points of $f(x)$`,
      specific: String.raw `$$f(x)=12+2x^2+x^4$$Find the critical points of $f(x)$`,
      rightColWidth: 50,
      steps: [
        {
          general: String.raw`Find $f'(x)$:`,
          specific: String.raw`$$\begin{aligned}f'(x)&=\bb{\d{12+2x^2-x^4}}\\[10pt]&=\bb{\d{12}+\d{2x^2}-\d{x^4}}\\[10pt]&=\bb{\btipa{2(2x)}{\d{\b{2}x^{\r{2}}}=\b{2}\p{\r{2}x^{\r{2}-1}}}+\btip{0}{\d{\t{a constant}}=0}-\btipa{4x^3}{\d{x^{\r{4}}}=\r{4}x^{\r{4}-1}}}\\[10pt]&=\gb{4x-4x^3}\end{aligned}$$`,
        },
        {
          general: String.raw`Solve $f'(x)=0$ to get the $x$-values of the critical points`,
          specific: String.raw`$$\begin{aligned}4x-4x^3&=0\\[10pt]-4x(x^2-1)&=0\\[10pt]-4x(x-1)(x+1)&=0\\[10pt]-4x=0,\ x-1&=0,\ x+1=0\\[10pt]x&=0,1,-1\end{aligned}$$`,
        },
        {
          general: String.raw`Plug in the $x$-values from step 2 into $f(x)$ to get the $y$-values`,
          specific: String.raw`$$\begin{aligned}y&=f(0)=12+2(0)^2+(0)^4=12\\[10pt]y&=f(1)=12+2(1)^2+(1)^4=15\\[10pt]y&=f(-1)=12+2(-1)^2+(-1)^4=15\end{aligned}$$`,
        },
        {
          general: String.raw`Combine the $x$-values from step 2 and the $y$-values from step 3 to get the critical points`,
          specific: String.raw`The critical points are $(0,12)$, $(1,15)$, and $(-1,15)$.`,
        }
      ],
      examples: [
        {
          specific: String.raw `$$f(x)=x^3+x^2-5x+5$$Find the critical points of $f(x)$`,
          steps: [String.raw`$f'(x)=3x^2+2x-5$`,String.raw`$$\begin{aligned}\r{3}x^2+\b{2}x\go{-5}&=0\end{aligned}$$Using the quadratic formula, we get $$\begin{aligned}x&=\frac{-\b{2}\pm\sqrt{(\b{2})^2-4(\r{3})(\go{-5})}}{2(\r{3})}\\[10pt]&=\frac{-2\pm8}{6}\\[10pt]&=1,-1.667\end{aligned}$$`,String.raw`$$\begin{aligned}y&=f(1)=(1)^3+(1)^2-5(1)-5=2\\[10pt]y&=f(-1.667)=(-1.667)^3+(-1.667)^2-5(-1.667)-5=1.4815\end{aligned}$$`,String.raw`The critical points are $(1,-8)$ and $(-1.667,1.4815)$`]
        }
      ],
    },
    {
      name: String.raw `Finding where a function is increasing and decreasing`,
      backgroundColor: "green",
      web: "Hw 3: 1, 5-7, 9; Hw 4: 1-7, 11; Hw 5: 2, 5-7; PT 2: 1-6, 8; Hw 6: 4, 7, 9-10; PT 3: 8; Hw 9: 8, 10; PF: 4, 6, 10-12, 14-15",
      book: "148",
      exam: "Up to one question on test 2 and up to one question on the final",
      intro: String.raw `$f(x)$ is <span class='green'>increasing</span> when its slope is <span class='green'>positive</span> and <span class='red'>decreasing</span> when its slope is <span class='red'>negative</span><br>Since $f'(x)$ is the slope of $f(x)$, we know that $f(x)$ is <span class='green'>increasing</span> when $f'(x)\g{>0}$ and $f(x)$ is <span class='red'>decreasing</span> when $f'(x)\r{<0}$`,
      general: String.raw `$$f(x)=\{\t{an equation}\}$$Find the intervals where $f(x)$ is increasing and where $f(x)$ is decreasing`,
      specific: String.raw `$$f(x)=2x^3+6x^2+6x$$Find the intervals where $f(x)$ is increasing and where $f(x)$ is decreasing`,
      rightColWidth: 50,
      steps: [
        {
          general: String.raw`Find $f'(x)$:`,
          specific: String.raw`$$\begin{aligned}\gb{f'(x)}&=\bb{2(3x^2)+6(2x)+6(1)}\\[10pt]&=\gb{6x^2+12x+6}\end{aligned}$$`,
        },
        {
          general: String.raw`Solve $f'(x)=0$ for $x$. I will the $x$-values you get <span class='orange'>critical points</span>`,
          specific: String.raw`$$\ga{\gb{6x^2+12x+6=0}\\[10pt]\bb{6(x^2+2x+1)=0}\\[10pt]\bb{6(x+1)(x+1)=0}\\[10pt]\bb{x+1=0,\ x+1=0}\\[10pt]\gb{x=\o{-1}}}$$`,
        },
        {
          general: String.raw`Make a number line with the <span class='orange'>critical points</span> on it`,
          specific: String.raw`<iframe src="https://www.desmos.com/calculator/dksbvpa75u?embed" width="500" height="500" style="border: 1px solid #ccc" frameborder=0></iframe>`,
        },
        {
          general: String.raw`The critical points divide the number into smaller parts called intervals. Add an $x$-value (called a <span class='purple'>test point</span>) to each interval`,
          specific: String.raw`<iframe src="https://www.desmos.com/calculator/szqok4wbmy?embed" width="500" height="500" style="border: 1px solid #ccc" frameborder=0></iframe>`,
        },
        {
          general: String.raw`Calculate $f'(\put{each test point})$ and determine whether it is <span class='green'>positive</span> or <span class='red'>negative</span>. It is often easier to calculate using the factored version of $f'(x)$`,
          specific: String.raw`$$\begin{aligned}\gb{f'(\pu{-2})}&=\bb{6(\pu{(-2)}+1)(\pu{(-2)}+1)}\\[10pt]&=\bb{6}\gb{\g{>0}}\\[10pt]\gb{f'(\pu{0})}&=\bb{6(\pu{(0)}+1)(\pu{(0)}+1)}\\[10pt]&=\bb{6}\gb{\g{>0}}\end{aligned}$$`,
        },
        {
          general: String.raw`Add a $\g{+}$ sign above each interval containing a test point with a <span class='green'>positive</span> $f'$ value and a $\r{-}$ sign above each interval containing a test point with a <span class='red'>negative</span> $f'$ value`,
          specific: String.raw`<iframe src="https://www.desmos.com/calculator/w5rcwhu1qj?embed" width="500" height="500" style="border: 1px solid #ccc" frameborder=0></iframe>`,
        },
        {
          general: String.raw`Determine the intervals where $f'(x)$ is <span class='green'>positive</span> and <span class='red'>negative</span><ol><li>$f'(x)\g{>0}$ in the intervals with a $\g{+}$ above them</li><li>$f'(x)\r{<0}$ in the intervals with a $\r{-}$ sign above them.</li></ol>`,
          specific: String.raw`<ol><li>$\gb{f'(x)\g{>0}\t{ on the intervals }(-\infty,-1)\t{ and }(-1,\infty)}$</li><li>$\gb{f'(x)\t{ is never }\rt{negative}}$</li></ol>`,
        },
        {
          general: String.raw`Determine the intervals where $f(x)$ is <span class='green'>increasing</span> and <span class='red'>decreasing</span><ol><li>$f(x)$ is <span class='green'>increasing</span> in the intervals where $f'(x)\g{>0}$</li><li>$f(x)$ is <span class='red'>decreasing</span> in the intervals where $f'(x)\r{<0}$</li></ol>`,
          specific: String.raw`<ol><li>$\gb{\t{$f(x)$ is $\gt{increasing}$ on the intervals $(-\infty,-1)$ and $(-1,\infty)$}}$</li><li>$\gb{f(x)\t{ is never }\rt{decreasing}}$</li></ol>`,
        },
      ],
      examples: [

      ],
    },
    {
      name: String.raw `Finding where a function has a relative maximum or relative minimum`,
      backgroundColor: "green",
      web: "Hw 3: 1, 5-7, 9; Hw 4: 1-7, 11; Hw 5: 2, 5-7; PT 2: 1-6, 8; Hw 6: 4, 7, 9-10; PT 3: 8; Hw 9: 8, 10; PF: 4, 6, 10-12, 14-15",
      book: "148",
      exam: "Up to one question on test 2 and up to one question on the final. I will ask to find the increasing and decreasing intervals in one question on the exam. Then I will ask in another question to find the relative maxima and minima of the same equation either using your answer from the previous question or intervals I give you where $f'(x)$ is positive and negative (so you can still do the problem if you didn't know how to do the increasing/decreasing problem)",
      intro: String.raw `A relative maximum is a point on the graph where $y$ is higher than nearby points.<br>The below graph has a relative maximum at $x=\go{2}$<br>NEED GRAPH<br>From the picture we see that $f(x)$ is <span class='green'>increasing</span> on the left side of a relative maximum and <span class='red'>decreasing</span> on the right side of a relative maximum.<br>Therefore, a relative maximum will occur at an $x$-value where $\btip{f'(x)\t{ goes from }\gt{positive}\t{ to }\rt{negative}}{\t{because a graph is }\gt{increasing}\t{ when }\t{its derivative is}\\\gt{positive}\t{ and }\rt{decreasing}\t{ when its derivative is }\rt{negative}}$ as you move from left to right.<br>A relative minimum is a point on the graph where $y$ is lower than nearby points.<br>The below graph has a relative minimum at $x=\go{2}$<br>NEED GRAPH<br>From the picture, we see that $f(x)$ is <span class='red'>decreasing</span> on the left side of a relative minimum and <span class='green'>increasing</span> on the right side of a relative minimum<br>Therefore, a relative minimum will occur at an $x$-value where $f'(x)$ goes from <span class='red'>negative</span> to <span class='green'>positive</span> as you move from left to right.<br>`,
      general: String.raw `$f'(x)$ is <span class='green'>positive</span> on the intervals {list of intervals} and <span class='red'>negative</span> on the intervals {another list of intervals}.<br>$f''(x)$ is <span class='green'>positive</span> on the intervals {list of intervals} and <span class='red'>negative</span> on the intervals {another list of intervals}.<br>Find the $x$-values where $f(x)$ has a relative maximum and the $x$-values where $f(x)$ has a relative minimum`,
      specific: String.raw `$f'(x)$ is <span class='green'>positive</span> on the intervals $(-\infty,-1)$ and $(1,\infty)$ and <span class='red'>negative</span> on the interval $(-1,1)$.<br>$f''(x)$ is <span class='green'>positive</span> on the interval $(0,\infty)$ and <span class='red'>negative</span> on the interval $(-\infty,0)$<br>Find the $x$-values where $f(x)$ has a relative maximum and the $x$-values where $f(x)$ has a relative minimum`,
      rightColWidth: 50,
      steps: [
        {
          general: String.raw`It helps, convert the given information about $f'(x)$ into a sign chart.<br>On the test you should already have a sign chart for the problem from a previous exam question, but you can use the given information if you didn't make the sign chart in the other question.`,
          specific: String.raw`<iframe src="https://www.desmos.com/calculator/9rupoowae1?embed" width="500" height="500" style="border: 1px solid #ccc" frameborder=0></iframe>`,
        },
        {
          general: String.raw`Find the points where $f(x)$ has relative maximum or minimum <ol><li>$f(x)$ has a relative maximum at the $x$-values on the sign chart where $f'(x)$ goes from <span class='green'>positive</span> to <span class='red'>negative</span> as you move from left to right</li><li>$f(x)$ has a relative minimum at the $x$-values on the sign chart where $f'(x)$ goes from <span class='red'>negative</span> to <span class='green'>positive</span> as you move from left to right</li></ol><b>Note: </b>Make sure you justify your answer by saying something like "because $f'(x)$ goes from <span class='green'>positive</span> to <span class='red'>negative</span>"`,
          specific: String.raw`<ol><li>$\gb{\begin{flalign}&f(x)\t{ has a relative maximum at }x=-1\t{ b/c }f'(x)\\[2pt]&\t{goes from }\gt{positive}\t{ to }\rt{negative}\end{flalign}}$</li><li>$\gb{\begin{flalign}&f(x)\t{ has a relative minimum at }x=1\t{ b/c }f'(x)\\[2pt]&\t{goes from }\rt{negative}\t{ to }\gt{positive}\end{flalign}}$</li></ol>`,
        },
      ],
      examples: [

      ],
    },
    {
      name: String.raw `Finding where a function is concave up and concave down`,
      backgroundColor: "green",
      web: "Hw 3: 1, 5-7, 9; Hw 4: 1-7, 11; Hw 5: 2, 5-7; PT 2: 1-6, 8; Hw 6: 4, 7, 9-10; PT 3: 8; Hw 9: 8, 10; PF: 4, 6, 10-12, 14-15",
      book: "148",
      exam: "Up to one question on test 2 and up to one question on the final.",
      intro: String.raw `A graph is concave up it has an upwards opening or smiley shape shape like this:<br><iframe src="https://www.desmos.com/calculator/82voxdroo2?embed" width="500" height="500" style="border: 1px solid #ccc" frameborder=0></iframe><br>The graph might be only part of the shape like in these examples:<br><img src="/pictures/uphalf1.png" alt="HTML5 Icon" style="width:500px;height:500px;"><br><img src="/pictures/uphalf2.png" alt="HTML5 Icon" style="width:500px;height:500px;"><br><img src="/pictures/uphalf3.png" alt="HTML5 Icon" style="width:500px;height:500px;"><br>One can show that a graph is concave <span class='green'>up</span> where its <span class='lightblue'>slope</span> is <span class='green'>increasing</span>.<br>Therefore, a graph is concave <span class='green'>up</span> when its $\btip{\lbt{derivative}\t{ is }\gt{increasing}}{\t{because }\lbt{slope}\t{ is the}\\\t{same thing as }\lbt{derivative}}$.<br>This means that a graph is concave <span class='green'>up</span> when $\btip{\t{the derivative of }\lbt{the derivative}\t{ is }\gt{positive}}{\lbt{something}\text{ is }\gt{increasing}\t{ when its derivative is }\gt{positive}}$<br>So, $f(x)$ is concave <span class='green'>up</span> when $f''(x)\g{>0}$.<br>A graph is concave down when it has a downwards opening or frowney shape like this:<br><iframe src="https://www.desmos.com/calculator/nngpwoxjmk?embed" width="500" height="500" style="border: 1px solid #ccc" frameborder=0></iframe><br>The graph might be only part of the shape like in these examples:<br><br><img src="/pictures/downhalf1.png" alt="HTML5 Icon" style="width:500px;height:500px;"><br><img src="/pictures/downhalf2.png" alt="HTML5 Icon" style="width:500px;height:500px;"><br><img src="/pictures/downhalf3.png" alt="HTML5 Icon" style="width:500px;height:500px;"><br>One can show that a graph is concave <span class='red'>down</span> where its <span class='lightblue'>slope</span> is <span class='red'>decreasing</span>.<br>Therefore, a graph is concave <span class='red'>down</span> when its $\btip{\lbt{derivative}\t{ is }\rt{decreasing}}{\t{because }\lbt{slope}\t{ is the}\\\t{same thing as }\lbt{derivative}}$.<br>This means that a graph is concave <span class='red'>down</span> when $\btip{\t{the derivative of }\lbt{the derivative}\t{ is }\rt{negative}}{\lbt{something}\text{ is }\rt{decreasing}\t{ when its derivative is }\rt{negative}}$<br>So, $f(x)$ is concave <span class='red'>down</span> when $f''(x)\r{<0}$.`,
      general: String.raw `$f(x)=\t{\{an equation\}}$<br>Find the intervals where $f(x)$ is concave up and the intervals where $f(x)$ is concave down`,
      specific: String.raw `$f(x)=2x^3+6x^2+6x$<br>Find the intervals where $f(x)$ is concave up and the intervals where $f(x)$ is concave down`,
      rightColWidth: 50,
      steps: [
        {
          general: String.raw`Find $f''(x)$:`,
          specific: String.raw`$$\bb{\begin{aligned}f'(x)&=2(3x^2)+6(2x)+6(1)\\[10pt]&=6x^2+12x+6\end{aligned}}$$$$\begin{aligned}\gb{f''(x)}&=\bb{6(2x)+12(1)+0}\\[10pt]&=\gb{12x+12}\end{aligned}$$`,
        },
        {
          general: String.raw`Solve $f''(x)=0$ for $x$. I will the $x$-values you get <span class='orange'>second derivative critical points</span>`,
          specific: String.raw`$$\ga{\gb{12x+12=0}\\[10pt]\bb{12x=-12}\\[10pt]\gb{x=\o{-1}}}$$`,
        },
        {
          general: String.raw`Make a number line with the <span class='orange'>second derivative critical points</span> on it`,
          specific: String.raw`<iframe src="https://www.desmos.com/calculator/k75mzr4idh?embed" width="500" height="500" style="border: 1px solid #ccc" frameborder=0></iframe>`,
        },
        {
          general: String.raw`The second derivative critical points divide the number into smaller parts called intervals. Add an $x$-value (called a <span class='purple'>test point</span>) to each interval`,
          specific: String.raw`<iframe src="https://www.desmos.com/calculator/osntkxefop?embed" width="500" height="500" style="border: 1px solid #ccc" frameborder=0></iframe>`,
        },
        {
          general: String.raw`Calculate $f''(\put{each test point})$ and determine whether it is <span class='green'>positive</span> or <span class='red'>negative</span>. It is often easier to calculate using the factored version of $f'(x)$`,
          specific: String.raw`$$\begin{aligned}\gb{f''(\pu{-2})}&=\bb{12\pu{(-2)}+12}\\[10pt]&=\bb{-12}\gb{\r{<0}}\\[10pt]\gb{f''(\pu{0})}&=\bb{12\pu{(0)}+12}\\[10pt]&=\bb{12}\gb{\g{>0}}\end{aligned}$$`,
        },
        {
          general: String.raw`Add a $\g{+}$ sign above each interval containing a test point with a <span class='green'>positive</span> $f'$ value and a $\r{-}$ sign above each interval containing a test point with a <span class='red'>negative</span> $f'$ value`,
          specific: String.raw`<iframe src="https://www.desmos.com/calculator/mfuvvek2ae?embed" width="500" height="500" style="border: 1px solid #ccc" frameborder=0></iframe>`,
        },
        {
          general: String.raw`Determine the intervals where $f''(x)$ is <span class='green'>positive</span> and <span class='red'>negative</span><ol><li>$f''(x)\g{>0}$ in the intervals with a $\g{+}$ above them</li><li>$f''(x)\r{<0}$ in the intervals with a $\r{-}$ sign above them.</li></ol>`,
          specific: String.raw`<ol><li>$\gb{f''(x)\g{>0}\t{ on the interval }(-1,\infty)}$</li><li>$\gb{f''(x)\r{<0}\t{ on the interval }(-\infty,-1)}$</li></ol>`,
        },
        {
          general: String.raw`Determine the intervals where $f(x)$ is concave <span class='green'>up</span> and concave <span class='red'>down</span><ol><li>$f(x)$ is concave <span class='green'>up</span> in the intervals where $f''(x)\g{>0}$</li><li>$f(x)$ is concave <span class='red'>down</span> in the intervals where $f''(x)\r{<0}$</li></ol>`,
          specific: String.raw`<ol><li>$\gb{\t{$f(x)$ is concave $\gt{up}$ on the interval $(-1,\infty)$}}$</li><li>$\gb{f(x)\t{ is concave }\rt{down}\t{ on the interval }(-\infty,-1)}$</li></ol>`,
        },
      ],
      examples: [

      ],
    },
    {
      name: String.raw `Finding where a function has an inflection point`,
      backgroundColor: "green",
      web: "Hw 3: 1, 5-7, 9; Hw 4: 1-7, 11; Hw 5: 2, 5-7; PT 2: 1-6, 8; Hw 6: 4, 7, 9-10; PT 3: 8; Hw 9: 8, 10; PF: 4, 6, 10-12, 14-15",
      book: "148",
      exam: "Up to one question on test 2 and up to one question on the final.",
      intro: String.raw `An inflection point is an $x$-value where $\btip{f(x)\t{ changes concavity}}{\t{goes from concave}\gt{ up }\t{to concave}\\\rt{down}\t{ or concave }\rt{down}\t{ to concave }\gt{up}}$ as you move from left to right.<br>Therefore $f''(x)$ has an inflection point at the $x$-values where $\btip{f''(x)\t{ changes sign (goes from }\gt{positive}\t{ to }\rt{negative}\t{ or }\rt{negative}\t{ to }\gt{positive}\t{)}}{\t{because }f(x)\t{ is concave }\gt{up}\t{ when }f''(x)\g{>0}\t{ and concave }\rt{down}\t{ when }f''(x)\r{<0}}$`,
      general: String.raw `$f'(x)$ is <span class='green'>positive</span> on the intervals {list of intervals} and <span class='red'>negative</span> on the intervals {another list of intervals}.<br>$f''(x)$ is <span class='green'>positive</span> on the intervals {list of intervals} and <span class='red'>negative</span> on the intervals {another list of intervals}.<br>Find the $x$-values where $f(x)$ has an inflection point`,
      specific: String.raw `$f'(x)$ is <span class='green'>positive</span> on the intervals $(-\infty,-1)$ and $(1,\infty)$ and <span class='red'>negative</span> on the interval $(-1,1)$.<br>$f''(x)$ is <span class='green'>positive</span> on the interval $(0,\infty)$ and <span class='red'>negative</span> on the interval $(-\infty,0)$<br>Find the $x$-values where $f(x)$ has an inflection point`,
      rightColWidth: 50,
      steps: [
        {
          general: String.raw`It helps, convert the given information about $f''(x)$ into a sign chart.<br>On the test you should already have a sign chart for the problem from a previous exam question, but you can use the given information if you didn't make the sign chart in the other question.`,
          specific: String.raw`<iframe src="https://www.desmos.com/calculator/necgvwq4ku?embed" width="500" height="500" style="border: 1px solid #ccc" frameborder=0></iframe>`,
        },
        {
          general: String.raw`$f(x)$ has an inflection point where $\btip{f''(x)\t{ changes sign}}{\t{goes from }\gt{positive}\t{ to }\rt{negative}\\\t{ or }\rt{negative}\t{ to }\gt{positive}}$<br><b>Note: </b>Make sure that you justify your answer by saying something like "because $f''(x)$ changes sign"`,
          specific: String.raw`$f(x)$ has an inflection point at $x=0$ because $f''(x)$ changes sign there`,
        },
      ],
      examples: [

      ],
    },
  ],
}
