window.j = {
    startCollapsed: false,
    lessonNum: 8,
    lessonName: "Week of 10-3",
    intro: "In the lectures for this week, we will go over qualitative properties of graphs and maximizing and minimizing functions",
    sections: [
      {
        name: String.raw `Finding where a function is increasing and decreasing`,
        backgroundColor: "green",
        web: "Hw 3: 1, 5-7, 9; Hw 4: 1-7, 11; Hw 5: 2, 5-7; PT 2: 1-6, 8; Hw 6: 4, 7, 9-10; PT 3: 8; Hw 9: 8, 10; PF: 4, 6, 10-12, 14-15",
        book: "148",
        exam: "Up to one question on test 2 and up to one question on the final",
        intro: String.raw `$f(x)$ is <span class='green'>increasing</span> when its slope is <span class='green'>positive</span> and <span class='red'>decreasing</span> when its slope is <span class='red'>negative</span><br>Since $f'(x)$ is the slope of $f(x)$, we know that $f(x)$ is <span class='green'>increasing</span> when $f'(x)\g{>0}$ and $f(x)$ is <span class='red'>decreasing</span> when $f'(x)\r{<0}$`,
        general: String.raw `$$f(x)=\{\t{an equation}\}$$Find the intervals where $f(x)$ is increasing and where $f(x)$ is decreasing`,
        specific: String.raw `$$f(x)=x^3-3x$$Find the intervals where $f(x)$ is increasing and where $f(x)$ is decreasing`,
        rightColWidth: 50,
        steps: [
          {
            general: String.raw`Find $f'(x)$:`,
            specific: String.raw`$$\begin{aligned}\gb{f'(x)}&=\bb{2(3x^2)+6(2x)+6(1)}\\[4pt]&=\gb{6x^2+12x+6}\end{aligned}$$`,
          },
          {
            general: String.raw`Solve $f'(x)=0$ for $x$. I will the $x$-values you get <span class='orange'>critical points</span>`,
            specific: String.raw`$$\ga{\gb{6x^2+12x+6=0}\\[4pt]\bb{6(x^2+2x+1)=0}\\[4pt]\bb{6(x+1)(x+1)=0}\\[4pt]\bb{x+1=0,\ x+1=0}\\[4pt]\gb{x=\o{-1}}}$$`,
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
            specific: String.raw`$$\begin{aligned}\gb{f'(\pu{-2})}&=\bb{6(\pu{-2}+1)(\pu{-2}+1)}\\[4pt]&=\bb{6}\gb{\g{>0}}\\[4pt]\gb{f'(\pu{0})}&=\bb{6(\pu{0}+1)(\pu{0}+1)}\\[4pt]&=\bb{6}\gb{\g{>0}}\end{aligned}$$`,
          },
          {
            general: String.raw`Add a $\g{+}$ sign above each interval containing a test point with a <span class='green'>positive</span> $f'$ value and a $\r{-}$ sign above each interval containing a test point with a <span class='red'>negative</span> $f'$ value`,
            specific: String.raw`<iframe src="https://www.desmos.com/calculator/w5rcwhu1qj?embed" width="500" height="500" style="border: 1px solid #ccc" frameborder=0></iframe>`,
          },
          {
            general: String.raw`Determine the intervals where $f'(x)$ is <span class='green'>positive</span> and <span class='red'>negative</span><ol><li>$f'(x)\g{>0}$ in the intervals with a $\g{+}$ above them</li><li>$f'(x)\r{<0}$ in the intervals with a $\r{-}$ sign above them.</li></ol><b>Note: The endpoints of the intervals are the $\btip{\o{\textbf{critical points}}}{x\t{-values where }f'(x)=0}$ not the $\btip{\pu{\textbf{test points}}}{\t{the }x\t{-values on each side of the critical points}}$</b>`,
            specific: String.raw`<ol><li>$\bb{f'(x)\g{>0}\t{ on the intervals }(-\infty,\o{-1})\t{ and }(\o{-1},\infty)}$</li><li>$\bb{f'(x)\t{ is never }\rt{negative}}$</li></ol>`,
          },
          {
            general: String.raw`Determine the intervals where $f(x)$ is <span class='green'>increasing</span> and <span class='red'>decreasing</span><ol><li>$f(x)$ is <span class='green'>increasing</span> in the intervals where $f'(x)\g{>0}$</li><li>$f(x)$ is <span class='red'>decreasing</span> in the intervals where $f'(x)\r{<0}$</li></ol><b>Note: The endpoints of the intervals are the $\btip{\o{\textbf{critical points}}}{x\t{-values where }f'(x)=0}$ not the $\btip{\pu{\textbf{test points}}}{\t{the }x\t{-values on each side of the critical points}}$</b><br><b>Note: Make sure that you justify your answer by mentioning something like "b/c $f'(x)\g{>0}$" for $\gt{increasing}$ and "b/c $f'(x)\r{<0}$" for $\rt{decreasing}$</b>`,
            specific: String.raw`<ol><li>$\gb{\t{$f(x)$ is $\gt{increasing}$ on the intervals $(-\infty,\o{-1})$ and $(\o{-1},\infty)$ b/c $f'(x)\g{>0}$}}$</li><li>$\gb{f(x)\t{ is never }\rt{decreasing}\t{ b/c }f'(x)\t{ is never }\rt{negative}}$</li></ol>`,
          },
        ],
        examples: [
            {specific: String.raw `$$f(x)=x^3-3x$$Find the intervals where $f(x)$ is increasing and where $f(x)$ is decreasing`,
            steps: [
              String.raw`$$\begin{aligned}\gb{f'(x)}&=\bb{3x^2-3(1)}\\[4pt]&=\gb{3x^2-3}\end{aligned}$$`,
              String.raw`$$\ga{\gb{3x^2-3=0}\\[4pt]\bb{3(x^2-1)=0}\\[4pt]\bb{3(x-1)(x+1)=0}\\[4pt]\bb{x-1=0,\ x+1=0}\\[4pt]\gb{x=\o{1},\o{-1}}}$$`,
              String.raw`<iframe src="https://www.desmos.com/calculator/6umzww5wyu?embed" width="500" height="500" style="border: 1px solid #ccc" frameborder=0></iframe>`,
              String.raw`<iframe src="https://www.desmos.com/calculator/w1d88wsakw?embed" width="500" height="500" style="border: 1px solid #ccc" frameborder=0></iframe>`,
              String.raw`$$\begin{aligned}\gb{f'(\pu{-2})}&=\bb{6(\pu{-2}-1)(\pu{-2}+1)}\\[4pt]&=\bb{18}\gb{\g{>0}}\\[4pt]\gb{f'(\pu{0})}&=\bb{6(\pu{0}-1)(\pu{0}+1)}\\[4pt]&=\bb{-6}\gb{\r{<0}}\\[4pt]\gb{f'(\pu{2})}&=\bb{6(\pu{2}-1)(\pu{2}+1)}\\[4pt]&=\bb{18}\gb{\g{>0}}\end{aligned}$$`,
              String.raw`<iframe src="https://www.desmos.com/calculator/fvq7clpm18?embed" width="500" height="500" style="border: 1px solid #ccc" frameborder=0></iframe>`,
              String.raw`<ol><li>$\bb{f'(x)\g{>0}\t{ on the intervals }(-\infty,\o{-1})\t{ and }(\o{1},\infty)}$</li><li>$\bb{f'(x)\r{<0}\t{ on the interval }(\o{-1},\o{1})}$</li></ol>`,
              String.raw`<ol><li>$\gb{f(x)\t{ is }\gt{increasing}\t{ on the intervals }(-\infty,\o{-1})\t{ and }(\o{1},\infty)\t{ b/c }f'(x)\g{>0}}$</li><li>$\gb{f(x)\t{ is }\rt{decreasing}\t{ on the interval }(\o{-1},\o{1})\t{ b/c }f'(x)\r{<0}}$</li></ol>`,
            ],
          },
          {specific: String.raw `$$f(x)=-2x^3+3x^2+12x$$Find the intervals where $f(x)$ is increasing and where $f(x)$ is decreasing`,
            steps: [
              String.raw`$$\begin{aligned}\gb{f'(x)}&=\bb{-2(3x^2)+3(2x)+12(1)}\\[4pt]&=\gb{-6x^2+6x+12}\end{aligned}$$`,
              String.raw`$$\ga{\gb{-6x^2+6x+12=0}\\[4pt]\bb{-6(x^2-x-2)=0}\\[4pt]\bb{-6(x-2)(x+1)=0}\\[4pt]\bb{x-2=0,\ x+1=0}\\[4pt]\gb{x=\o{2},\o{-1}}}$$`,
              String.raw`<iframe src="https://www.desmos.com/calculator/um4krsdjcr?embed" width="500" height="500" style="border: 1px solid #ccc" frameborder=0></iframe>`,
              String.raw`<iframe src="https://www.desmos.com/calculator/je0kmpehyi?embed" width="500" height="500" style="border: 1px solid #ccc" frameborder=0></iframe>`,
              String.raw`$$\begin{aligned}\gb{f'(\pu{-2})}&=\bb{-6(\pu{-2}-2)(\pu{-2}+1)}\\[4pt]&=\bb{-24}\gb{\r{<0}}\\[4pt]\gb{f'(\pu{0})}&=\bb{-6(\pu{0}-1)(\pu{0}+1)}\\[4pt]&=\bb{6}\gb{\g{>0}}\\[4pt]\gb{f'(\pu{3})}&=\bb{-6(\pu{3}-2)(\pu{3}+1)}\\[4pt]&=\bb{-24}\gb{\r{<0}}\end{aligned}$$`,
              String.raw`<iframe src="https://www.desmos.com/calculator/yytyrvbyab?embed" width="500" height="500" style="border: 1px solid #ccc" frameborder=0></iframe>`,
              String.raw`<ol><li>$\bb{f'(x)\g{>0}\t{ on the interval }(\o{-1},\o{2})}$</li><li>$\bb{f'(x)\r{<0}\t{ on the intervals }(-\infty,\o{-1})\t{ and }(\o{2},\infty)}$</li></ol>`,
              String.raw`<ol><li>$\gb{f(x)\t{ is }\gt{increasing}\t{ on the interval }(\o{-1},\o{2})\t{ b/c }f'(x)\g{>0}}$</li><li>$\gb{f(x)\t{ is }\rt{decreasing}\t{ on the intervals }(-\infty,\o{-1})\t{ and }(\o{2},\infty)\t{ b/c }f'(x)\r{<0}}$</li></ol>`,
            ],
          },
          {specific: String.raw `$$f(x)=2x^2+8x+1$$Find the intervals where $f(x)$ is increasing and where $f(x)$ is decreasing`,
          steps: [
            String.raw`$$\begin{aligned}\gb{f'(x)}&=\bb{2(2x)+8(1)+0}\\[4pt]&=\gb{4x+8}\end{aligned}$$`,
            String.raw`$$\ga{\gb{4x+8=0}\\[4pt]\bb{4x=-8}\\[4pt]\gb{x=\o{-2}}}$$`,
            String.raw`<iframe src="https://www.desmos.com/calculator/kviwej0neh?embed" width="500" height="500" style="border: 1px solid #ccc" frameborder=0></iframe>`,
            String.raw`<iframe src="https://www.desmos.com/calculator/wj7oouvs8d?embed" width="500" height="500" style="border: 1px solid #ccc" frameborder=0></iframe>`,
            String.raw`$$\begin{aligned}\gb{f'(\pu{-3})}&=\bb{4(\pu{-3})+8}\\[4pt]&=\bb{-4}\gb{\r{<0}}\\[4pt]\gb{f'(\pu{0})}&=\bb{4(\pu{0})+8}\\[4pt]&=\bb{8}\gb{\g{>0}}\end{aligned}$$`,
            String.raw`<iframe src="https://www.desmos.com/calculator/bwitdznnwj?embed" width="500" height="500" style="border: 1px solid #ccc" frameborder=0></iframe>`,
            String.raw`<ol><li>$\bb{f'(x)\g{>0}\t{ on the interval }(\o{-2},\infty)}$</li><li>$\bb{f'(x)\r{<0}\t{ on the interval }(-\infty,\o{-2})}$</li></ol>`,
            String.raw`<ol><li>$\gb{f(x)\t{ is }\gt{increasing}\t{ on the interval }(\o{-2},\infty)\t{ b/c }f'(x)\g{>0}}$</li><li>$\gb{f(x)\t{ is }\rt{decreasing}\t{ on the interval }(-\infty,\o{-2})\t{ b/c }f'(x)\r{<0}}$</li></ol>`,
          ],
        }
        ],
      },
      {
        name: String.raw `Finding where a function has a relative maximum or relative minimum`,
        backgroundColor: "green",
        web: "Hw 3: 1, 5-7, 9; Hw 4: 1-7, 11; Hw 5: 2, 5-7; PT 2: 1-6, 8; Hw 6: 4, 7, 9-10; PT 3: 8; Hw 9: 8, 10; PF: 4, 6, 10-12, 14-15",
        book: "148",
        exam: "Up to one question on test 2 and up to one question on the final. I will ask to find the increasing and decreasing intervals in one question on the exam. Then I will ask in another question to find the relative maxima and minima of the same equation either using your answer from the previous question or intervals I give you where $f'(x)$ is positive and negative (so you can still do the problem if you didn't know how to do the increasing/decreasing problem)",
        intro: String.raw `A relative maximum is a point on the graph where $y$ is higher than nearby points.<br>The below graph has a relative maximum at $x=\o{2}$ and $y=\pu{4}$<br><img src="/pictures/MaxMin1Ex1.png" alt="HTML5 Icon" style="width:500px;height:500px;"><br>From the picture we see that $f(x)$ is <span class='green'>increasing</span> on the left side of a relative maximum and <span class='red'>decreasing</span> on the right side of a relative maximum.<br>Therefore, a relative maximum will occur at an $x$-value where $\btip{f'(x)\t{ goes from }\gt{positive}\t{ to }\rt{negative}}{\t{because a graph is }\gt{increasing}\t{ when }\t{its derivative is}\\\gt{positive}\t{ and }\rt{decreasing}\t{ when its derivative is }\rt{negative}}$ as you move from left to right.<br>A relative minimum is a point on the graph where $y$ is lower than nearby points.<br>The below graph has a relative minimum at $x=\o{2}$ and $y=\pu{1}$<br><img src="/pictures/MaxMin2Ex1.png" alt="HTML5 Icon" style="width:500px;height:500px;"><br>From the picture, we see that $f(x)$ is <span class='red'>decreasing</span> on the left side of a relative minimum and <span class='green'>increasing</span> on the right side of a relative minimum<br>Therefore, a relative minimum will occur at an $x$-value where $f'(x)$ goes from <span class='red'>negative</span> to <span class='green'>positive</span> as you move from left to right.<br>`,
        general: String.raw `$f'(x)$ is <span class='green'>positive</span> on the intervals {list of intervals} and <span class='red'>negative</span> on the intervals {another list of intervals}.<br>$f''(x)$ is <span class='green'>positive</span> on the intervals {list of intervals} and <span class='red'>negative</span> on the intervals {another list of intervals}.<br>Find the $x$-values where $f(x)$ has a relative maximum and the $x$-values where $f(x)$ has a relative minimum`,
        specific: String.raw `$f'(x)$ is <span class='green'>positive</span> on the intervals $(-\infty,\o{-1})$ and $(\o{1},\infty)$ and <span class='red'>negative</span> on the interval $(\o{-1},\o{1})$.<br>$f''(x)$ is <span class='green'>positive</span> on the interval $(\o{0},\infty)$ and <span class='red'>negative</span> on the interval $(-\infty,\o{0})$<br>Find the $x$-values where $f(x)$ has a relative maximum and the $x$-values where $f(x)$ has a relative minimum`,
        rightColWidth: 50,
        steps: [
          {
            general: String.raw`It helps, convert the given information about $f'(x)$ into a sign chart.<br>On the test you should already have a sign chart for the problem from a previous exam question, but you can use the given information if you didn't make the sign chart in the other question.`,
            specific: String.raw`<iframe src="https://www.desmos.com/calculator/9rupoowae1?embed" width="500" height="500" style="border: 1px solid #ccc" frameborder=0></iframe>`,
          },
          {
            general: String.raw`Find the points where $f(x)$ has relative maximum or minimum <ol><li>$f(x)$ has a relative maximum at the $x$-values on the sign chart where $f'(x)$ goes from <span class='green'>positive</span> to <span class='red'>negative</span> as you move from left to right</li><li>$f(x)$ has a relative minimum at the $x$-values on the sign chart where $f'(x)$ goes from <span class='red'>negative</span> to <span class='green'>positive</span> as you move from left to right</li></ol><b>Note: Make sure you justify your answer by saying something like "because $f'(x)$ goes from <span class='green'>positive</span> to <span class='red'>negative</span>"</b><br><b>Note: If you are using the sign you used for increasing and decreasing, remember that the relevant $\mathbf{x}$-values are the $\btip{\o{\textbf{critical points}}}{x\t{-values where }f'(x)=0}$ not the $\btip{\pu{\textbf{test points}}}{\t{the }x\t{-values on each side of the critical points}}$</b>`,
            specific: String.raw`<ol><li>$\gb{\begin{flalign}&f(x)\t{ has a relative maximum at }x=\o{-1}\t{ b/c }f'(x)\\[2pt]&\t{goes from }\gt{positive}\t{ to }\rt{negative}\end{flalign}}$</li><li>$\gb{\begin{flalign}&f(x)\t{ has a relative minimum at }x=\o{1}\t{ b/c }f'(x)\\[2pt]&\t{goes from }\rt{negative}\t{ to }\gt{positive}\end{flalign}}$</li></ol>`,
          },
        ],
        examples: [
          {
            specific: String.raw`$f'(x)$ is <span class='green'>positive</span> on the interval $(\o{-1},\o{2})$ and <span class='red'>negative</span> on the intervals $(-\infty,\o{-1})$ and $(\o{2},\infty)$.<br>$f''(x)$ is <span class='green'>positive</span> on the interval $(-\infty,\o{0})$ and <span class='red'>negative</span> on the interval $(\o{0},\infty)$<br>Find the $x$-values where $f(x)$ has a relative maximum and the $x$-values where $f(x)$ has a relative minimum`,
            steps:[
              String.raw`<iframe src="https://www.desmos.com/calculator/uo2pkb4fna?embed" width="500" height="500" style="border: 1px solid #ccc" frameborder=0></iframe>`,
              String.raw`<ol><li>$\gb{\begin{flalign}&f(x)\t{ has a relative maximum at }x=\o{2}\t{ b/c }f'(x)\\[2pt]&\t{goes from }\gt{positive}\t{ to }\rt{negative}\end{flalign}}$</li><li>$\gb{\begin{flalign}&f(x)\t{ has a relative minimum at }x=\o{-1}\t{ b/c }f'(x)\\[2pt]&\t{goes from }\rt{negative}\t{ to }\gt{positive}\end{flalign}}$</li></ol>`
            ]
          },
          {
            specific: String.raw`$f'(x)$ is <span class='green'>positive</span> on the interval $(\o{-2},\infty)$ and <span class='red'>negative</span> on the interval $(-\infty,\o{-2})$.<br>$f''(x)$ is $\gt{positive}$ on the intervals $(-\infty,\o{-1})$ and $(\o{-1},\infty)$ and never <span class='red'>negative</span><br>Find the $x$-values where $f(x)$ has a relative maximum and the $x$-values where $f(x)$ has a relative minimum`,
            steps:[
              String.raw`<iframe src="https://www.desmos.com/calculator/mfgbfch1en?embed" width="500" height="500" style="border: 1px solid #ccc" frameborder=0></iframe>`,
              String.raw`<ol><li>$\gb{\begin{flalign}&f(x)\t{ never has a relative maximum at }\t{ b/c }f'(x)\\[2pt]&\t{ never goes from }\gt{positive}\t{ to }\rt{negative}\end{flalign}}$</li><li>$\gb{\begin{flalign}&f(x)\t{ has a relative minimum at }x=\o{-2}\t{ b/c }f'(x)\\[2pt]&\t{goes from }\rt{negative}\t{ to }\gt{positive}\end{flalign}}$</li></ol>`,
            ]
          }
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
            specific: String.raw`$$\bb{\begin{aligned}f'(x)&=2(3x^2)+6(2x)+6(1)\\[4pt]&=6x^2+12x+6\end{aligned}}$$$$\begin{aligned}\gb{f''(x)}&=\bb{6(2x)+12(1)+0}\\[4pt]&=\gb{12x+12}\end{aligned}$$`,
          },
          {
            general: String.raw`Solve $f''(x)=0$ for $x$. I will the $x$-values you get <span class='orange'>second derivative critical points</span>`,
            specific: String.raw`$$\ga{\gb{12x+12=0}\\[4pt]\bb{12x=-12}\\[4pt]\gb{x=\o{-1}}}$$`,
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
            general: String.raw`Calculate $f''(\put{each test point})$ and determine whether it is <span class='green'>positive</span> or <span class='red'>negative</span>.`,
            specific: String.raw`$$\begin{aligned}\gb{f''(\pu{-2})}&=\bb{12(\pu{-2})+12}\\[4pt]&=\bb{-12}\gb{\r{<0}}\\[4pt]\gb{f''(\pu{0})}&=\bb{12(\pu{0})+12}\\[4pt]&=\bb{12}\gb{\g{>0}}\end{aligned}$$`,
          },
          {
            general: String.raw`Add a $\g{+}$ sign above each interval containing a test point with a <span class='green'>positive</span> $f'$ value and a $\r{-}$ sign above each interval containing a test point with a <span class='red'>negative</span> $f'$ value`,
            specific: String.raw`<iframe src="https://www.desmos.com/calculator/mfuvvek2ae?embed" width="500" height="500" style="border: 1px solid #ccc" frameborder=0></iframe>`,
          },
          {
            general: String.raw`Determine the intervals where $f''(x)$ is <span class='green'>positive</span> and <span class='red'>negative</span><ol><li>$f''(x)\g{>0}$ in the intervals with a $\g{+}$ above them</li><li>$f''(x)\r{<0}$ in the intervals with a $\r{-}$ sign above them.</li></ol><b>Note: The endpoints of the intervals are the $\btip{\o{\textbf{second derivative critical points}}}{x\t{-values where }f''(x)=0}$ not the $\btip{\pu{\textbf{test points}}}{\t{the }x\t{-values on each side of the critical points}}$</b>`,
            specific: String.raw`<ol><li>$\bb{f''(x)\g{>0}\t{ on the interval }(\o{-1},\infty)}$</li><li>$\bb{f''(x)\r{<0}\t{ on the interval }(-\infty,\o{-1})}$</li></ol>`,
          },
          {
            general: String.raw`Determine the intervals where $f(x)$ is concave <span class='green'>up</span> and concave <span class='red'>down</span><ol><li>$f(x)$ is concave <span class='green'>up</span> in the intervals where $f''(x)\g{>0}$</li><li>$f(x)$ is concave <span class='red'>down</span> in the intervals where $f''(x)\r{<0}$</li></ol><b>Note: The endpoints of the intervals are the $\btip{\o{\textbf{second derivative critical points}}}{x\t{-values where }f''(x)=0}$ not the $\btip{\pu{\textbf{test points}}}{\t{the }x\t{-values on each side of the critical points}}$</b><br><b>Note: Make sure that you justify your answer by mentioning something like "b/c $f''(x)\g{>0}$" for concave $\gt{up}$ and "b/c $f''(x)\r{<0}$" for concave $\rt{down}$</b>`,
            specific: String.raw`<ol><li>$\gb{\t{$f(x)$ is concave $\gt{up}$ on the interval $(\o{-1},\infty)$ b/c $f''(x)\g{>0}$}}$</li><li>$\gb{f(x)\t{ is concave }\rt{down}\t{ on the interval }(-\infty,\o{-1})\t{ b/c }f''(x)\r{<0}}$</li></ol>`,
          },
        ],
        examples: [
            {
              specific:String.raw`$f(x)=x^3-3x$<br>Find the intervals where $f(x)$ is concave up and the intervals where $f(x)$ is concave down`,
              steps:[
                String.raw`$$\bb{\begin{aligned}f'(x)&=3x^2-3(1)\\[4pt]&=3x^2-3\end{aligned}}$$$$\begin{aligned}\gb{f''(x)}&=\bb{3(2x)-0}\\[4pt]&=\gb{6x}\end{aligned}$$`,
                String.raw`$$\ga{\gb{6x=0}\\[4pt]\gb{x=\o{0}}}$$`,
                String.raw`<iframe src="https://www.desmos.com/calculator/74zf9kkupj?embed" width="500" height="500" style="border: 1px solid #ccc" frameborder=0></iframe>`,
                String.raw`<iframe src="https://www.desmos.com/calculator/tffkjeuutx?embed" width="500" height="500" style="border: 1px solid #ccc" frameborder=0></iframe>`,
                String.raw`$$\begin{aligned}\gb{f''(\pu{-1})}&=\bb{6(\pu{-1})}\\[4pt]&=\bb{-6}\gb{\r{<0}}\\[4pt]\gb{f''(\pu{1})}&=\bb{6(\pu{1})}\\[4pt]&=\bb{6}\gb{\g{>0}}\end{aligned}$$`,
                String.raw`<iframe src="https://www.desmos.com/calculator/6jbqx2mulw?embed" width="500" height="500" style="border: 1px solid #ccc" frameborder=0></iframe>`,
                String.raw`<ol><li>$\bb{f''(x)\g{>0}\t{ on the interval }(\o{0},\infty)}$</li><li>$\bb{f''(x)\r{<0}\t{ on the interval }(-\infty,\o{0})}$</li></ol>`,
                String.raw`<ol><li>$\gb{\t{$f(x)$ is concave $\gt{up}$ on the interval $(\o{0},\infty)$ b/c $f''(x)\g{>0}$}}$</li><li>$\gb{f(x)\t{ is concave }\rt{down}\t{ on the interval }(-\infty,\o{0})\t{ b/c }f''(x)\r{<0}}$</li></ol>`
              ]
            },
            {
              specific:String.raw`$f(x)=-2x^3+12x^2+12x$<br>Find the intervals where $f(x)$ is concave up and the intervals where $f(x)$ is concave down`,
              steps:[
                String.raw`$$\bb{\begin{aligned}f'(x)&=-2(3x^2)+12(2x)+12(1)\\[4pt]&=-6x^2+24x+12\end{aligned}}$$$$\begin{aligned}\gb{f''(x)}&=\bb{-6(2x)+24}\\[4pt]&=\gb{-12x+6}\end{aligned}$$`,
                String.raw`$$\ga{\gb{-12x+24=0}\\[4pt]\bb{-12x=-24}\\[4pt]\gb{x=\o{-2}}}$$`,
                String.raw`<iframe src="https://www.desmos.com/calculator/ub3vsifquh?embed" width="500" height="500" style="border: 1px solid #ccc" frameborder=0></iframe>`,
                String.raw`<iframe src="https://www.desmos.com/calculator/d8tpmr9y4k?embed" width="500" height="500" style="border: 1px solid #ccc" frameborder=0></iframe>`,
                String.raw`$$\begin{aligned}\gb{f''(\pu{-1})}&=\bb{6(\pu{-1})}\\[4pt]&=\bb{-6}\gb{\r{<0}}\\[4pt]\gb{f''(\pu{1})}&=\bb{6(\pu{1})}\\[4pt]&=\bb{6}\gb{\g{>0}}\end{aligned}$$`,
                String.raw`<iframe src="https://www.desmos.com/calculator/chmnnytzvd?embed" width="500" height="500" style="border: 1px solid #ccc" frameborder=0></iframe>`,
                String.raw`<ol><li>$\bb{f''(x)\g{>0}\t{ on the interval }(-\infty,\o{2})}$</li><li>$\bb{f''(x)\r{<0}\t{ on the interval }(\o{2},\infty)}$</li></ol>`,
                String.raw`<ol><li>$\gb{\t{$f(x)$ is concave $\gt{up}$ on the interval $(-\infty,\o{2})$ b/c $f''(x)\g{>0}$}}$</li><li>$\gb{f(x)\t{ is concave }\rt{down}\t{ on the interval }(\o{2},\infty)\t{ b/c }f''(x)\r{<0}}$</li></ol>`
              ]
            }
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
        specific: String.raw `$f'(x)$ is <span class='green'>positive</span> on the intervals $(-\infty,\o{-1})$ and $(\o{1},\infty)$ and <span class='red'>negative</span> on the interval $(\o{-1},\o{1})$.<br>$f''(x)$ is <span class='green'>positive</span> on the interval $(\o{0},\infty)$ and <span class='red'>negative</span> on the interval $(-\infty,\o{0})$<br>Find the $x$-values where $f(x)$ has an inflection point`,
        rightColWidth: 50,
        steps: [
          {
            general: String.raw`It helps, convert the given information about $f''(x)$ into a sign chart.<br>On the test you should already have a sign chart for the problem from a previous exam question, but you can use the given information if you didn't make the sign chart in the other question.`,
            specific: String.raw`<iframe src="https://www.desmos.com/calculator/necgvwq4ku?embed" width="500" height="500" style="border: 1px solid #ccc" frameborder=0></iframe>`,
          },
          {
            general: String.raw`$f(x)$ has an inflection point where $\btip{f''(x)\t{ changes sign}}{\t{goes from }\gt{positive}\t{ to }\rt{negative}\\\t{ or }\rt{negative}\t{ to }\gt{positive}}$<br><b>Note: </b>Make sure that you justify your answer by saying something like "because $f''(x)$ changes sign"`,
            specific: String.raw`$f(x)$ has an inflection point at $x=\o{0}$ b/c $f''(x)$ changes sign`,
          },
        ],
        examples: [
          {
            specific: String.raw`$f'(x)$ is <span class='green'>positive</span> on the interval $(\o{-1},\o{2})$ and <span class='red'>negative</span> on the intervals $(-\infty,\o{-1})$ and $(\o{2},\infty)$.<br>$f''(x)$ is <span class='green'>positive</span> on the interval $(-\infty,\o{1})$ and <span class='red'>negative</span> on the interval $(\o{1},\infty)$<br>Find the $x$-values where $f(x)$ has a relative maximum and the $x$-values where $f(x)$ has a relative minimum`,
            steps:[
              String.raw`<iframe src="https://www.desmos.com/calculator/5jl77skqky?embed" width="500" height="500" style="border: 1px solid #ccc" frameborder=0></iframe>`,
              String.raw`$\gb{f(x)\t{ has an inflection point at }x=\o{1}\t{ b/c }f''(x)\t{ changes sign}}$`
            ]
          },
          {
            specific: String.raw`$f'(x)$ is <span class='green'>positive</span> on the interval $(\o{-2},\infty)$ and <span class='red'>negative</span> on the interval $(-\infty,\o{-2})$.<br>$f''(x)$ is $\gt{positive}$ on the intervals $(-\infty,\o{-1})$ and $(\o{-1},\infty)$ and never <span class='red'>negative</span><br>Find the $x$-values where $f(x)$ has a relative maximum and the $x$-values where $f(x)$ has a relative minimum`,
            steps:[
              String.raw`<iframe src="https://www.desmos.com/calculator/xoqlqu5eez?embed" width="500" height="500" style="border: 1px solid #ccc" frameborder=0></iframe>`,
              String.raw`$\gb{\begin{flalign}&f(x)\t{ never has an inflection point }\t{ b/c }f'(x)\\[2pt]&\t{ never changes sign}\end{flalign}}$`,
            ]
          }
        ],
      },
      {
        name: String.raw `$\t{Find the absolute maximum and minimum of a function on }[a,b]$`,
        backgroundColor: "green",
        web: "Hw 3: 1, 5-7, 9; Hw 4: 1-7, 11; Hw 5: 2, 5-7; PT 2: 1-6, 8; Hw 6: 4, 7, 9-10; PT 3: 8; Hw 9: 8, 10; PF: 4, 6, 10-12, 14-15",
        book: "148",
        exam: "Up to one question on Test 2, Up to one question on Final",
        intro: String.raw `In this section, we describe how to find the absolute maximum and absolute minimum of $f(x)$ on $[\r{a},\r{b}]$.<br>The absolute maximum of a graph is the highest $y$-value of the entire graph and the absolute minimum of a graph is the lowest $y$-value on the entire graph<br><br>In this class the $x$-values of the max/min of $f(x)$ over $[\r{a},\r{b}]$ are each either a $\btip{\ot{critical point}}{\o{\t{an }x\t{-value where }\\[4pt]f'(x)=0}}$ or an $\btip{\rt{endpoint}\t{ of the interval}}{\r{a}\t{ or }\r{b}}$<br>Therefore, to find the max/min, first find the $\btip{\ot{critical points}}{\o{\t{the }x\t{-values where }\\[4pt]f'(x)=0}}$.<br>Then plug in the $\btip{\ot{critical points}}{\o{\t{the }x\t{-values where }\\[4pt]f'(x)=0}}$ and the $\btip{\rt{endpoints}}{\r{a}\t{ and }\r{b}}$ into $f(x)$ to determine which of them gives the absolute minimum and which of them gives the absolute maximum.<br>The minimum is the smallest $y$-value you get from plugging in and the maximum is the largest $y$-value you get from plugging in.`,
        //<br>Then plug in each of the $\btip{\ot{critical points}}{\o{\t{the }x\t{-values where }\\[4pt]f'(x)=0}}$ and $\btip{\rt{the endpoints}}{\r{a}\t{ and }\r{b}}$ into $f(x)$<br>The absolute maximum is the largest $y$-value you get and the absolute minimum is the smallest $y$ you get
        general: String.raw `$$f(x)=\{\t{an equation}\}$$Find the absolute max and min of $f(x)$ on the interval $[\r{a},\r{b}]$`,
        specific: String.raw `$$f(x)=x^4-4x$$Find the absolute max and min of $f(x)$ on the interval $[\r{0},\r{2}]$`,
        rightColWidth: 50,
        steps: [
          {
            general: String.raw`Find $f'(x)$`,
            specific: String.raw`$$\gb{f'(x)=4x^3-4}$$`,
          },
          {
            general: String.raw`Solve $f'(x)=0$ for $x$. I will call the $x$-values you get $\ot{critical points}$`,
            specific: String.raw`$\ga{\gb{4x^3-4x=0}\\[4pt]\bb{4x^3=4}\\[4pt]\bb{x^3=1}\\[4pt]\gb{x=\o{1}}}$`,
          },
          {
            general: String.raw`Plug in each $\btip{\ot{critical point}}{\o{x\t{-value where }f'(x)=0}}$ and the $\btip{\rt{endpoints}}{\r{a}\t{ and }\r{b}}$ into $f(x)$`,
            specific: String.raw`$\begin{aligned}\gb{f(\o{1})}&=\bb{(\o{1})^4-4(\o{1})}\\[4pt]&=\gb{-3}\\[4pt]\gb{f(\r{0})}&=\bb{(\r{0})^4-4(\r{0})}\\[4pt]&=\gb{0}\\[4pt]\gb{f(\r{2})}&=\bb{(\r{2})^4-4(\r{2})}\\[4pt]&=\gb{8}\end{aligned}$`,
          },
          {
            general: String.raw`Determine the max and min<ol><li>The largest $y$-value from step 3 is the absolute max</li><li>The smallest $y$-value from step 3 is the absolute min</li></ol>`,
            specific: String.raw`Max: $\btip{8}{\t{the }y\t{-values are }-3,\ 0,\ 8\\\t{the largest of which is 8}}$<br>Min: $\btip{-3}{\t{the }y\t{-values are }-3,\ 0,\ 8\\\t{the smallest of which is -3}}$`,
          }
        ],
        examples: [
          {
            specific: String.raw`$$f(x)=x^2-4x$$Find the absolute max and min of $f(x)$ on the interval $[\r{1},\r{4}]$`,
            steps:[
              String.raw`$$\gb{f'(x)=2x-4}$$`,
              String.raw`$\ga{\gb{2x-4=0}\\[4pt]\gb{x=\o{2}}}$`,
              String.raw`$\begin{aligned}\gb{f(\o{2})}&=\bb{(\o{2})^2-4(\o{2})}\\[4pt]&=\gb{-4}\\[4pt]\gb{f(\r{1})}&=\bb{(\r{1})^2-4(\r{1})}\\[4pt]&=\gb{-3}\\[4pt]\gb{f(\r{4})}&=\bb{(\r{4})^2-4(\r{4})}\\[4pt]&=\gb{0}\end{aligned}$`,
              String.raw`Max: $\btip{0}{\t{the }y\t{-values are }-4,\ -3,\ 0\\\t{the largest of which is 0}}$<br>Min: $\btip{-4}{\t{the }y\t{-values are }-4,\ -3,\ 0\\\t{the smallest of which is -4}}$`,
            ]
          },
          {
            specific: String.raw`$$f(x)=x^3-3x$$Find the absolute max and min of $f(x)$ on the interval $[\r{-1},\r{2}]$`,
            steps:[
              String.raw`$$\gb{f'(x)=3x^2-3}$$`,
              String.raw`$\ga{\gb{3x^2-3=0}\\[4pt]\bb{3x^2=3}\\[4pt]\bb{x^2=1}\\[4pt]\gb{x=\o{-1},\o{1}}}$`,
              String.raw`$\begin{aligned}\gb{f(\o{-1})}&=\bb{(\o{-1})^3-4(\o{-1})}\\[4pt]&=\gb{2}\\[4pt]\gb{f(\o{1})}&=\bb{(\o{1})^3-3(\o{1})}\\[4pt]&=\gb{-2}\\[4pt]\gb{f(\r{2})}&=\bb{(\r{2})^3-3(\r{2})}\\[4pt]&=\gb{2}\end{aligned}$`,
              String.raw`Max: $\btip{2}{\t{the }y\t{-values are }2,\ -2,\ 2\\\t{the largest of which is 2}}$<br>Min: $\btip{-2}{\t{the }y\t{-values are }2,\ -2,\ 2\\\t{the smallest of which is -2}}$`,
            ]
          }
        ],
      },
      {
        name: String.raw `$\t{Determine the absolute maximum and minimum of a function on }(0,\infty)$`,
        backgroundColor: "green",
        web: "Hw 3: 1, 5-7, 9; Hw 4: 1-7, 11; Hw 5: 2, 5-7; PT 2: 1-6, 8; Hw 6: 4, 7, 9-10; PT 3: 8; Hw 9: 8, 10; PF: 4, 6, 10-12, 14-15",
        book: "148",
        exam: "Up to one question on Test 2, Up to one question on Final",
        intro: String.raw `In this section, we describe how to find the maximum and minimum of a function on $(0,\infty)$.<br>In this class, you will only be asked to find the max and min of $f(x)$ on $(0,\infty)$ if $f''(x)$ is always $\gt{positive}$ or always $\rt{negative}$<br>If $f''(x)$ is always $\gt{positive}$, then the $f(x)$ is concave $\gt{up}$.<br>As seen in the below picture, it has a minimum at the $x$-value with zero slope and no maximum.<br><iframe src="https://www.desmos.com/calculator/8syqpx5pvb?embed" width="500" height="500" style="border: 1px solid #ccc" frameborder=0></iframe><br>Since derivative means slope, $f(x)$ has a minimum when its derivative is 0.<br>Therefore, if $f''(x)$ is always positive, the minimum on $(0,\infty)$ is the $\btip{\t{critical point}}{x\t{-value where }f'(x)=0}$ of $f(x)$ and there is no maximum on $(0,\infty)$<br>If $f''(x)$ is always $\rt{negative}$, then $f(x)$ is concave $\rt{down}$<br>As seen in the below picture, $f(x)$ has maximum at at the $x$-value with zero slope and no minimum.<br><iframe src="https://www.desmos.com/calculator/hp4kvxib78?embed" width="500" height="500" style="border: 1px solid #ccc" frameborder=0></iframe><br>Since derivative means slope, $f(x)$ has a maximum where its derivative is 0.<br>Therefore, if $f''(x)$ is always negative, the maximum on $(0,\infty)$ is the $\btip{\t{critical point}}{x\t{-value where }f'(x)=0}$ of $f(x)$ and there is no minimum on $(0,\infty)$<br>`,
        //<br>Then plug in each of the $\btip{\ot{critical points}}{\o{\t{the }x\t{-values where }\\[4pt]f'(x)=0}}$ and $\btip{\rt{the endpoints}}{\r{a}\t{ and }\r{b}}$ into $f(x)$<br>The absolute maximum is the largest $y$-value you get and the absolute minimum is the smallest $y$ you get
        general: String.raw `$$f(x)=\{\t{an equation}\}$$Find the absolute max and min of $f(x)$ on the interval $(0,\infty))$`,
        specific: String.raw `$$f(x)=x^4-4x$$Find the absolute max and min of $f(x)$ on the interval $(0,\infty)$`,
        rightColWidth: 50,
        steps: [
          {
            general: String.raw`Find $f'(x)$`,
            specific: String.raw`$$\gb{f'(x)=4x^3-4}$$`,
          },
          {
            general: String.raw`Solve $f'(x)=0$ for $x$. $\btip{\t{I will call the $x$-value you get the }\ot{critical point}}{\t{you will get only one critical point in this type of problem}}$`,
            specific: String.raw`$\ga{\gb{4x^3-4x=0}\\[4pt]\bb{4x^3=4}\\[4pt]\bb{x^3=1}\\[4pt]\gb{x=\o{1}}}$`,
          },
          // {
          //   general: String.raw`Calculate the $y$-value of the $\btip{\ot{critical point}}{x\t{-value from step 2}}$ by plugging in the $x$-value from step 2 into $f(x)$`,
          //   specific: String.raw`$\begin{aligned}\gb{y}&=f(\o{1})\\[4pt]&=\gb{(\o{1})^4-4(\o{1})}\\[4pt]&=\o{3}\end{aligned}$`,
          // },
          {
            general: String.raw`Find $f''(x)$`,
            specific: String.raw`$\gb{f''(x)=12x^2}$`,
          },
          {
            general: String.raw`$\btip{\t{Determine whether }f''(x)\t{ is always positive or always negative on }(0,\infty)}{\t{one or the other will happen on this type of problem}}$<br>Remember that in the interval $(0,\infty)$ $x$ will be positive.`,
            specific: String.raw`$\bb{f''(x)=12x^2>0\t{ on }(0,\infty)}$`,
          },
          {
            general: String.raw`Determine the max and min<ol><li>If $f''(x)$ is always positive, then the min is $f(\btip{\ot{the critical point}}{x\t{-value from step 2}})$ and there is no max</li><li>If $f''(x)$ is always positive, then the min is $f(\btip{\ot{the critical point}}{x\t{-value from step 2}})$ and there is no max</li></ol><br><b>Note: make sure to mention that $f''(x)$ is always positive or always negative (whichever one applies). This will be worth points on the exam</b>`,
            specific: String.raw`$\gb{\t{Because }f''(x)\t{ is always positive, the min is}}$<br>\begin{aligned}\ob{y}&=\bb{f(\o{1})}\\[4pt]&=\gb{(\o{1})^4-4(\o{1})}\\[4pt]&=\ob{-3}\end{aligned}$\gb{\t{and there is no max.}}$`,
          }
        ],
        examples: [
          {
            specific:String.raw`$$f(x)=x^3-3x$$Find the absolute max and min of $f(x)$ on the interval $(0,\infty)$`,
            steps:[
              String.raw`$$\gb{f'(x)=3x^2-3}$$`,
              String.raw`$\ga{\gb{3x^2-3=0}\\[4pt]\bb{3x^3=3}\\[4pt]\bb{x^2=1}\\[4pt]\gb{x=\o{-1},\o{1}}}$`,
            ]
          }
        ],
      },
    ],
  }