window.j = {
  startCollapsed: false,
  lessonNum: 5,
  lessonName: "Computing Derivatives",
  intro: "Last lecture, we saw the derivative is the rate of change of something and saw a large number of applications of the derivative.<br>In this lecture, we will discuss how to calculate derivatives.<br>We write the derivative of $f(x)$ as $f'(x)$ or $\\frac{d}{dx}\\left(f(x)\\right)$",
  sections: [
    {
      name: "Derivative of a Constant",
      backgroundColor: "green",
      web: "Hw 3: 1, 5-7, 9; Hw 4: 1-7, 11; Hw 5: 2, 5-7; PT 2: 1-6, 8; Hw 6: 4, 7, 9-10; PT 3: 8; Hw 9: 8, 10; PF: 4, 6, 10-12, 14-15",
      book: "148",
      exam: "Very important in Test 1 and Test 2, might come up in Test 3, important for Final",
      intro: "In this section, we descibe how to take derivatives of constants.<br>Constants are equations without $x$.<br>For example, 2, $\\sqrt{2}$, and $\\pi+2^4-6$ are all constants.<br>From last lecture, we know that the derivative measures how fast something changes as $x$ changes.<br>Since a constant does not change when $x$ changes, its derivative is 0.",
      general: "$f(x)=\\bt{\\{an equation without $x$\\}}$. Find $f'(x)$<br>OR<br>Find $\\displaystyle \\frac{d}{dx}\\left(\\bt{\\{an equation without $x$\\}}\\right)$",
      specific: "$f(x)=\\b{2^5+1}$. Find $f'(x)$",
      rightColWidth: 30,
      steps: [
        {
          general: "$$\\begin{aligned}\\displaystyle f'(x)&=0\\\\[5pt]&\\t{OR}\\\\\\frac{d}{dx}\\left(\\bt{\\{the equation without $x$\\}}\\right)&=0\\end{aligned}$$",
          specific: "$$f'(x)=0$$",
        }
      ],
      examples: [
        {
          specific: "(WebAssign Hw 3 P2)<span class='red'> Need to move to Example heading</span><br>$f(x)=\\b{\\sqrt{7}+32+\\pi}$. Find $f'(x)$",
          steps: ["$$f'(x)=0$$"],
        },
        {
          specific: "Find $\\displaystyle\\frac{d}{dx}\\left(\\b{\\sqrt{7}+32+\\pi}\\right)$",
          steps: ["$\\frac{d}{dx}\\left(\\b{\\sqrt{7}+32+\\pi}\\right)=0$"],
        },
      ],
    },
    {
      name: "Derivative of $x$",
      backgroundColor: "green",
      web: "LATER",
      book: "146",
      exam: "Very important in Test 1 and Test 2, might come up in Test 3, important for Final",
      intro: "The derivative of $x$ is 1:$$\\frac{d}{dx}\\left(x\\right)=1$$",
      general: "$f(x)=x$. Find $f'(x)$<br>OR<br>Find $\\displaystyle \\frac{d}{dx}\\left(x\\right)$",
      specific: "$f(x)=x$. Find $f'(x)$",
      rightColWidth: 30,
      steps: [
        {
          general: "$$\\begin{aligned}\\displaystyle f'(x)&=1\\\\[5pt]&\\t{OR}\\\\\\frac{d}{dx}\\left(x\\right)&=1\\end{aligned}$$",
          specific: "$$f'(x)=1$$",
        }
      ],
      examples: [
        {
          specific: "Find $\\displaystyle\\frac{d}{dx}\\left(x\\right)$",
          steps: ["$$\\frac{d}{dx}\\left(x\\right)=1$$"],
        },
      ],
    },
    {
      name: "Power Rule Without Properties of Exponents",
      backgroundColor: "green",
      web: "LATER",
      book: "145-146",
      exam: "Very important in Test 1 and Test 2, might come up in Test 3, important for Final",
      intro: String.raw`In this section, we descibe how to take the derivative of $x$ to <span class='red'>a power</span><br>The Power Rule says that derivative of $x^{\r{n}}$ is $\r{n}x^{\r{n}-1}$:$$\frac{d}{dx}\left(x^{\r{n}}\right)=\r{n}x^{\r{n}-1}$$In other words, to calculate the derivative of $x^{\rt{a power}}$, multiply by <span class='red'>the power</span> and then subtract one from <span class='red'>the power</span>:$$\frac{d}{dx}\left(x^{\rt{\{a power\}}}\right)=\rt{\{the power\}}x^{\rt{\{the power\}}-1}$$`,
      general: String.raw`$f(x)=x^{\r{n}}$. Find $f'(x)$<br>OR<br>Find $\displaystyle \frac{d}{dx}\left(x^{\r{n}}\right)$`,
      specific: "$f(x)=x^{\\r{5}}$. Find $f'(x)$",
      rightColWidth: 30,
      steps: [
        {
          general: "$$\\begin{aligned}\\displaystyle f'(x)&=\\r{n}x^{\\r{n}-1}\\\\[5pt]&\\t{OR}\\\\\\frac{d}{dx}\\left(x^{\\r{n}}\\right)&=\\r{n}x^{\\r{n}-1}\\end{aligned}$$",
          specific: "$$\\begin{aligned}f'(x)&=\\r{5}x^{\\r{5}-1}\\\\&=5x^4\\end{aligned}$$",
        }
      ],
      examples: [
        {
          specific: "$f(x)=x^{\\r{-2}}$. Find $f'(x)$",
          steps: ["$$\\begin{aligned}f'(x)&=\\r{-2}x^{\\r{-2}-1}\\\\&=-2x^{-3}\\end{aligned}$$"],
        },
        {
          specific: "Find $\\displaystyle\\frac{d}{dx}\\left(x^{\\r{\\tiny\\frac{1}{2}}}\\right)$",
          steps: ["$$\\begin{aligned}\\frac{d}{dx}\\left(x^{\\r{\\tiny\\frac{1}{2}}}\\right)&=\\r{\\frac{1}{2}}x^{\\r{\\tiny\\frac{1}{2}}-1}\\\\&=\\frac{1}{2}x^{{\\tiny-\\frac{1}{2}}}\\end{aligned}$$"],
        },
      ],
    },
    {
      name: "The Constant Multiple Rule",
      backgroundColor: "green",
      web: "LATER",
      book: "148-150",
      exam: "Very important in Test 1 and Test 2, might come up in Test 3, important for Final",
      intro: "<div class='p'>In this section, we descibe how to take the derivative of <span class='blue'>a constant</span> times <span class='green'>a function</span>.</div><div class='p'>The Constant Multiple Rule says that the derivative of <span class='blue'>a constant</span> times <span class='green'>a function</span> is <span class='blue'>the constant</span> times the derivative of <span class='green'>the function</span>.</div><div class='p'>In other words, when taking derivatives of equations with <span class='blue'>constants</span> being multiplied, leave <span class='blue'>those constants</span> as they are and take the derivative of <span class='green'>the rest of the equation</span> as if <span class='blue'>the constants</span> weren't there</div><div class='p'>An important warning: This only applies to constants being multipled, not to constants being added or subtracted</div>This is the constant multiple rule in equation form:$$\\begin{flalign}\\frac{d}{dx}\\p{\\bt{\\{a constant\\}}\\cdot\\gt{\\{a function\\}}}&=\\bt{\\{the constant\\}}\\cdot\\frac{d}{dx}\\p{\\gt{\\{the function\\}}}\\\\\\t{or, the abbreviated version,}\\\\\\frac{d}{dx}\\p{\\b{c}\\cdot\\g{f(x)}}&=\\b{c}\\cdot\\frac{d}{dx}\\p{\\g{f(x)}}\\end{flalign}$$",
      general: "$f(x)=\\bt{\\{a constant\\}}\\cdot\\gt{\\{the function\\}}$. Find $f'(x)$<br>OR<br>Find $\\displaystyle \\frac{d}{dx}\\left(\\bt{\\{a constant\\}}\\cdot\\gt{\\{an function\\}}\\right)$",
      specific: "$f(x)=\\b{3}\\g{x^{2}}$. Find $f'(x)$",
      rightColWidth: 30,
      steps: [
        {
          general: "$$\\begin{aligned}\\displaystyle f'(x)&=\\bt{\\{the constant\\}}\\cdot\\frac{d}{dx}\\p{\\gt{\\{the function\\}}}\\\\[5pt]&\\t{OR}\\\\\\frac{d}{dx}\\left(\\bt{\\{the constant\\}}\\cdot\\gt{\\{the function\\}}\\right)&=\\bt{\\{the constant\\}}\\cdot\\frac{d}{dx}\\p{\\gt{\\{the function\\}}}\\end{aligned}$$",
          specific: "$$f'(x)=\\b{3}\\cdot\\frac{d}{dx}\\p{\\g{x^2}}$$",
        },
        {
          general: "Remove $\\displaystyle \\frac{d}{dx}$ from your final answer by finding $\\displaystyle\\frac{d}{dx}\\p{\\gt{\\{the function\\}}}$",
          specific: "$$\\begin{aligned}f'(x)&=\\b{3}\\cdot\\btip{\\p{2x^{2-1}}}{\\frac{d}{dx}\\p{x^{\\r{2}}}=\\r{2}x^{\\r{2}-1}}\\\\&=6x\\end{aligned}$$",
        }
      ],
      examples: [
        {
          specific: "$f(x)=\\b{-2}\\g{x^{3/2}}$. Find $f'(x)$",
          steps: ["$$f'(x)=\\b{-2}\\cdot\\frac{d}{dx}\\p{\\g{x^{3/2}}}$$","$$\\begin{aligned}f'(x)&=\\b{-2}\\cdot\\btip{\\p{\\frac{3}{2}x^{3/2-1}}}{\\frac{d}{dx}\\p{x^{\\r{3/2}}}=\\r{\\frac{3}{2}}x^{\\r{3/2}-1}}\\\\[10pt]&=-3x^{\\tiny\\frac{1}{2}}\\end{aligned}$$"],
        },
        {
          specific: "Find $\\displaystyle\\frac{d}{dx}\\left(\\b{7}\\g{x^{-4}}\\right)$",
          steps: ["$$\\frac{d}{dx}\\left(\\b{7}\\g{x^{-4}}\\right)=\\b{7}\\cdot\\frac{d}{dx}\\p{\\g{x^{-4}}}$$","$$\\begin{aligned}f'(x)&=\\b{7}\\cdot\\btip{\\p{-4x^{-4-1}}}{\\frac{d}{dx}\\p{x^{\\r{-4}}}=\\r{-4}x^{\\r{-4}-1}}\\\\[10pt]&=-28x^{-5}\\end{aligned}$$"],
        },
      ],
    },
    {
      name: "Power Rule With Properties of Exponents",
      backgroundColor: "green",
      web: "LATER",
      book: "145-146",
      exam: "Important in Test 1 and somewhat important for Test 2 and the Final",
      intro: "In this section, we show how to combine the Power Rule of the previous section with properties of exponents. The relevant properties of exponents are $$\\begin{aligned}\\g{\\frac{\\b{c}}{\\sqrt{\\bk{x}}}}&=\\b{c}x^{\\g{-\\tiny\\frac{1}{2}}}\\qquad&\\g{\\frac{\\b{c}}{\\bk{x}}}&=\\b{c}x^{\\g{-1}}\\qquad&\\g{\\sqrt{\\bk{x}}}&=x^{\\tiny\\g{\\frac{1}{2}}}\\\\[20pt]\\g{\\frac{\\b{c}}{\\sqrt[\\r{n}]{\\bk{x}}}}&=x^{\\tiny\\g{-\\frac{1}{\\r{n}}}}\\qquad&\\g{\\frac{\\b{c}}{\\bk{x}^{\\r{n}}}}&=\\b{c}x^{\\g{-}\\r{n}}\\qquad&\\g{\\sqrt[\\r{n}]{\\bk{x}}}&=x^{\\tiny\\g{\\frac{1}{\\r{n}}}}\\end{aligned}$$Here are some examples to make the above properties a little clearer:$$\\begin{aligned}\\g{\\frac{\\b{1}}{\\sqrt{\\bk{x}}}}&=\\b{1}x^{\\g{\\tiny-\\frac{1}{2}}}\\qquad&\\g{\\frac{\\b{3}}{\\bk{x}}}&=\\b{3}x^{\\g{-1}}\\qquad&\\g{\\sqrt{\\bk{x}}}&=x^{\\tiny\\g{\\frac{1}{2}}}\\\\[20pt]\\g{\\frac{\\b{4}}{\\sqrt[\\r{3}]{\\bk{x}}}}&=\\b{4}x^{\\g{\\tiny-\\frac{1}{\\r{3}}}}\\qquad&\\g{\\frac{\\b{2}}{\\bk{x}^{\\r{1/2}}}}&=\\b{2}x^{\\g{-}\\r{1/2}}\\qquad&\\g{\\sqrt[\\r{3}]{\\bk{x}}}&=x^{\\tiny\\g{\\frac{1}{\\r{3}}}}\\end{aligned}$$To calculate the derivative of a square or cube root, a $\\r{n}$th root, or <span class='blue'>a constant</span> divided by $x$ to <span class='red'>a power</span>, use the one of the properties of exponents to rewrite it in the form of $\\b{c}x^{\\r{n}}$ (<span class='blue'>a constant</span> times $x$ to <span class='red'>a power</span>). Then we use can use the Power Rule and the Constant Multiple Rule to calculate the derivative",
      general: "Find $f'(x)$<br>OR<br>Find $\\displaystyle \\frac{d}{dx}\\left(f(x)\\right)$",
      specific: "$f(x)=\\g{\\frac{\\b{2}}{\\bk{x}^{\\r{6}}}}$. Find $f'(x)$",
      rightColWidth: 30,
      steps: [
        {
          general: "Rewrite $f(x)$ in the form $\\btip{\\b{c}x^{\\r{n}}}{\\bt{a number}\\t{ times }x\\t{ to }\\rt{a power}}$  using one of these properties of exponents:$$\\begin{aligned}\\g{\\frac{\\b{c}}{\\sqrt{\\bk{x}}}}&=\\b{c}x^{\\g{-\\tiny\\frac{1}{2}}}\\qquad&\\g{\\frac{\\b{c}}{\\bk{x}}}&=\\b{c}x^{\\g{-1}}\\qquad&\\g{\\sqrt{\\bk{x}}}&=x^{\\tiny\\g{\\frac{1}{2}}}\\\\[20pt]\\g{\\frac{\\b{c}}{\\sqrt[\\r{n}]{\\bk{x}}}}&=x^{\\tiny\\g{-\\frac{1}{\\r{n}}}}\\qquad&\\g{\\frac{\\b{c}}{\\bk{x}^{\\r{n}}}}&=\\b{c}x^{\\g{-}\\r{n}}\\qquad&\\g{\\sqrt[\\r{n}]{\\bk{x}}}&=x^{\\tiny\\g{\\frac{1}{\\r{n}}}}\\end{aligned}$$",
        },
        {
          general: "Use the Constant Multiple Rule and the Power Rule to find the derivative of $\\btip{\\b{c}x^{\\r{n}}}{\\bt{a number}\\t{ times }x\\t{ to }\\rt{a power}}$",
          specific: "$$\\begin{aligned}f'(x)&=\\b{2}\\cdot\\frac{d}{dx}\\p{x^{\\r{-6}}}\\\\[10pt]&=\\b{2}\\cdot\\p{\\r{-6}x^{\\r{-6}-1}}\\\\[10pt]&=-12x^{-7}\\end{aligned}$$",
        }
      ],
      examples: [
        {
          specific: "$f(x)=\\b{3}\\g{\\sqrt{\\bk{x}}}$. Find $f'(x)$",
          steps: ["$$f(x)=\\b{3}x^{\\r{1/2}}$$","$$\\begin{aligned}f'(x)&=\\b{3}\\cdot\\frac{d}{dx}\\p{x^{\\r{1/2}}}\\\\[10pt]&=\\b{3}\\cdot\\p{\\r{\\frac{1}{2}}x^{\\r{1/2}-1}}\\\\[10pt]&=\\frac{3}{2}x^{-3/2}\\end{aligned}$$"],
        },
        // {
        //   specific: "Find $\\displaystyle\\frac{d}{dx}\\left(x^{\\r{\\tiny\\frac{1}{2}}}\\right)$",
        //   steps: ["$$\\frac{d}{dx}\\left(x^{\\r{\\tiny\\frac{1}{2}}}\\right)=\\r{\\frac{1}{2}}x^{\\r{\\tiny\\frac{1}{2}}-1}$$"],
        // },
      ],
    },
    {
      name: "Sum and Difference Rules",
      backgroundColor: "green",
      web: "LATER",
      book: "150-151",
      exam: "Very important in Test 1 and Test 2, might come up in Test 3, important for Final",
      intro: "In this section, we show how to calculate the derivative of terms being added or subtracted. The Sum and Difference Rules say that when taking the derivative of terms being added or subtracted, keep the addition and subtraction signs and take the derivative of each term. In equation form,$$\\begin{aligned}&\\frac{d}{dx}\\p{\\rt{\\{first term\\}}\\o{\\pm}\\gt{\\{second term\\}}\\o{\\pm}\\bt{\\{third term\\}}\\o{\\pm}\\cdots}\\\\&=\\frac{d}{dx}\\p{\\rt{\\{first term\\}}}\\o{\\pm}\\frac{d}{dx}\\p{\\gt{\\{second term\\}}}\\o{\\pm}\\frac{d}{dx}\\p{\\bt{\\{third term\\}}}\\o{\\pm}\\cdots\\end{aligned}$$",
      general: "$f(x)=\\put{\\{first term\\}}\\o{\\pm}\\put{\\{second term\\}}\\o{\\pm}\\put{\\{third term\\}}\\o{\\pm}\\cdots$. Find $f'(x)$<br>OR<br>Find $\\displaystyle \\frac{d}{dx}\\p{\\put{\\{first term\\}}\\o{\\pm}\\put{\\{second term\\}}\\o{\\pm}\\put{\\{third term\\}}\\o{\\pm}\\cdots}$",
      specific: "$f(x)=\\pu{2x^3}\\o{+}\\pu{4x^2}\\o{-}\\pu{6}$. Find $f'(x)$",
      rightColWidth: 40,
      steps: [
        {
          general: "Leave the $\\o{+}$ and $\\o{-}$ signs and take the derivative of <span class='purple'>each term</span>$$\\begin{aligned}&\\frac{d}{dx}\\p{\\put{\\{first term\\}}\\o{\\pm}\\put{\\{second term\\}}\\o{\\pm}\\put{\\{third term\\}}\\o{\\pm}\\cdots}\\\\&=\\frac{d}{dx}\\p{\\put{\\{first term\\}}}\\o{\\pm}\\frac{d}{dx}\\p{\\put{\\{second term\\}}}\\o{\\pm}\\frac{d}{dx}\\p{\\put{\\{third term\\}}}\\o{\\pm}\\cdots\\end{aligned}$$",
          specific: "$$\\begin{aligned}f'(x)&=\\frac{d}{dx}\\p{\\pu{2x^3}}\\o{+}\\frac{d}{dx}\\p{\\pu{4x^2}}\\o{-}\\frac{d}{dx}\\p{\\pu{6}}\\end{aligned}$$",
        },
        {
          general: "Remove $\\frac{d}{dx}$ from your answer by calculating the derivatives in the previous step",
          specific: "$$\\begin{aligned}f'(x)&=\\b{2}\\cdot\\frac{d}{dx}\\p{x^{\\r{3}}}\\o{+}\\b{4}\\cdot\\frac{d}{dx}\\p{x^{\\r{2}}}\\o{-}\\btip{0}{\\t{the derivative of a constant is 0}}\\\\[10pt]&=\\b{2}\\p{\\r{3}x^{\\r{3}-1}}\\o{+}\\b{4}\\p{\\r{2}x^{\\r{2}-1}}\\\\[10pt]&=6x^2+8x\\end{aligned}$$",
        }
      ],
      examples: [
        // {
        //   specific: "$f(x)=\\b{3}\\g{\\sqrt{\\bk{x}}}$. Find $f'(x)$",
        //   steps: ["$$f(x)=\\b{3}x^{\\r{1/2}}$$","$$\\begin{aligned}f'(x)&=\\b{3}\\cdot\\frac{d}{dx}\\p{x^{\\r{1/2}}}\\\\[10pt]&=\\b{3}\\cdot\\p{\\r{\\frac{1}{2}}x^{\\r{1/2}-1}}\\\\[10pt]&=\\frac{3}{2}x^{-3/2}\\end{aligned}$$"],
        // },
        // {
        //   specific: "Find $\\displaystyle\\frac{d}{dx}\\left(x^{\\r{\\tiny\\frac{1}{2}}}\\right)$",
        //   steps: ["$$\\frac{d}{dx}\\left(x^{\\r{\\tiny\\frac{1}{2}}}\\right)=\\r{\\frac{1}{2}}x^{\\r{\\tiny\\frac{1}{2}}-1}$$"],
        // },
      ],
    },
    {
      name: "Product Rule",
      backgroundColor: "green",
      web: "LATER",
      book: "158-159",
      exam: "Might be on Test 1",
      intro: String.raw`In this section, we show how to calculate the derivative of <span class='purple'>one function</span> multipled by <span class='orange'>another function</span>. We do this with the Product Rule: $$\begin{flalign}&\frac{d}{dx}\p{\put{\{first function\}}\cdot\ot{\{second function\}}}\\[10pt]&\quad=\gt{\{the derivative of the first function\}}\cdot\ot{\{the second function\}}\\[10pt]&\qquad+\put{\{the first function\}}\cdot\bt{\{the derivative of the second function\}}\\[10pt]&\t{or, the abbreviated version,}\\[10pt]&\frac{d}{dx}\p{\pu{f_1(x)}\cdot\o{f_2(x)}}=\g{f_1'(x)}\cdot\o{f_2(x)}+\pu{f_1(x)}\cdot\b{f_2'(x)}\end{flalign}$$Warning: If either $\pu{f_1(x)}$ or $\o{f_2(x)}$ is a constant, use the constant multiple rule instead of the product rule. The product rule is more complicated and overkill in that case`,
      general: String.raw`$f(x)=\frac{d}{dx}\p{\put{\{first function\}}\cdot\ot{\{second function\}}}$. Find $f'(x)$<br>OR<br>Find $\frac{d}{dx}\p{\put{\{first function\}}\cdot\ot{\{second function\}}}$`,
      specific: String.raw`$f(x)=\pu{\p{4x^2+x}}\cdot\o{\p{3-x}}$. Find $f'(x)$`,
      rightColWidth: 50,
      steps: [
        {
          general: String.raw`Identify $\pu{f_1(x)}$ and $\o{f_2(x)}$:$$\begin{aligned}1.\ \pu{f_1(x)}&\t{ is the }\put{first function}\\[10pt]2.\ \o{f_2(x)}&\t{ is the }\ot{second function}\end{aligned}$$`,
          specific: String.raw`$$\begin{aligned}\pu{f_1(x)}&=\pu{4x^2+x}\\[10pt]\o{f_2(x)}&=\o{3-x}\end{aligned}$$`,
        },
        {
          general: String.raw`Find $\btip{\g{f_1'(x)}}{\gt{the derivative of $f_1(x)$}}$ and $\btip{\b{f_2'(x)}}{\bt{the derivative of $f_2(x)$}}$`,
          specific: String.raw`$$\begin{aligned}\g{f_1'(x)}&=\frac{d}{dx}\p{\pu{4x^2+x}}\\[10pt]&=\frac{d}{dx}\p{4x^2}+\frac{d}{dx}\p{x}\\[10pt]&=\btip{4\cdot(2x)}{\frac{d}{dx}\p{\b{4}x^{\r{2}}}&=\b{4}\cdot\frac{d}{dx}\p{x^{\r{2}}}\\&=\b{4}\cdot\r{2}x^{\r{2}-1}}+\btip{1}{\frac{d}{dx}\p{x}=1}\\[10pt]&=\g{8x+1}\\[10pt]\b{f_2'(x)}&=\frac{d}{dx}\p{\o{3-x}}\\[10pt]&=\frac{d}{dx}\p{3}-\frac{d}{dx}\p{x}\\[10pt]&=\btip{0}{\ga{\t{the derivative of}\\ \t{a constant is 0}}}-\btip{1}{\frac{d}{dx}\p{x}=1}\\[10pt]&=\b{-1}\end{aligned}$$`,
        },
        {
          general: String.raw`Substitute $\btip{\pu{f_1(x)}}{\put{the first function}}$, $\btip{\o{f_2(x)}}{\ot{the second function}}$, $\btip{\g{f_1'(x)}}{\gt{the derivative of the first function}}$, and $\btip{\b{f_2'(x)}}{\bt{the derivative of the second function}}$ into the product rule equation:$$f'(x)=\g{f_1'(x)}\cdot\o{f_2(x)}+\pu{f_1(x)}\cdot\b{f_2'(x)}$$`,
          specific: String.raw`$$\begin{aligned}f'(x)&=\g{f_1'(x)}\cdot\o{f_2(x)}+\pu{f_1(x)}\cdot\b{f_2'(x)}\\[10pt]&=\g{(8x+1)}\cdot\o{(3-x)}+\pu{(4x^2+x)}\cdot\b{\p{-1}}\end{aligned}$$`,
        }
      ],
      examples: [
        // {
        //   specific: "$f(x)=\\b{3}\\g{\\sqrt{\\bk{x}}}$. Find $f'(x)$",
        //   steps: ["$$f(x)=\\b{3}x^{\\r{1/2}}$$","$$\\begin{aligned}f'(x)&=\\b{3}\\cdot\\frac{d}{dx}\\p{x^{\\r{1/2}}}\\\\[10pt]&=\\b{3}\\cdot\\p{\\r{\\frac{1}{2}}x^{\\r{1/2}-1}}\\\\[10pt]&=\\frac{3}{2}x^{-3/2}\\end{aligned}$$"],
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
      intro: String.raw`In this section, we show how to calculate the derivative of <span class='purple'>one function</span> divided by <span class='orange'>another function</span>. We do this with the Quotient Rule: $$\begin{flalign}&\frac{d}{dx}\p{\frac{\put{\{numerator\}}}{\ot{\{denominator\}}}}\\[10pt]&\quad=\frac{\gt{\{the derivative of the numerator\}}\cdot\ot{\{the denominator\}}}{\p{\ot{\{the denominator\}}}^2}\\[10pt]&\qquad-\frac{\put{\{the numerator\}}\cdot\bt{\{the derivative of the denominator\}}}{\p{\ot{\{the denominator\}}}^2}\\[10pt]&\t{or, the abbreviated version,}\\[10pt]&\frac{d}{dx}\p{\frac{\pu{f_1(x)}}{\o{f_2(x)}}}=\frac{\g{f_1'(x)}\cdot\o{f_2(x)}-\pu{f_1(x)}\cdot\b{f_2'(x)}}{\p{\o{f_2(x)}}^2}\end{flalign}$$Warning: If $\o{f_2(x)}$ is a constant, it is $\btip{\t{simpler to use the 'constant division rule' instead of the quotient rule}}{\t{if you don't remember the constant division rule, you can use still use the quotient rule}}$. In this case, you would leave the constant in the denominator as it is and take the derivative of the numerator. If $\pu{f_1(x)}$ is a constant, you still need quotient rule because the 'constant division rule' only applies when the constant is the denominator.`,
      general: String.raw`$f(x)=\frac{d}{dx}\p{\frac{\put{\{numerator\}}}{\ot{\{denominator\}}}}$. Find $f'(x)$<br>OR<br>Find $\frac{d}{dx}\p{\frac{\put{\{numerator\}}}{\ot{\{denominator\}}}}$`,
      specific: String.raw`$f(x)=\frac{\pu{4x^2+x}}{\o{3-x}}$. Find $f'(x)$`,
      rightColWidth: 50,
      steps: [
        {
          general: String.raw`Identify $\pu{f_1(x)}$ and $\o{f_2(x)}$:$$\begin{aligned}1.\ \pu{f_1(x)}&\t{ is the }\put{the numerator}\\[10pt]2.\ \o{f_2(x)}&\t{ is }\ot{the denominator}\end{aligned}$$`,
          specific: String.raw`$$\begin{aligned}\pu{f_1(x)}&=\pu{4x^2+x}\\[10pt]\o{f_2(x)}&=\o{3-x}\end{aligned}$$`,
        },
        {
          general: String.raw`Find $\btip{\g{f_1'(x)}}{\gt{the derivative of $f_1(x)$}}$ and $\btip{\b{f_2'(x)}}{\bt{the derivative of $f_2(x)$}}$`,
          specific: String.raw`$$\begin{aligned}\g{f_1'(x)}&=\frac{d}{dx}\p{\pu{4x^2+x}}\\[10pt]&=\frac{d}{dx}\p{4x^2}+\frac{d}{dx}\p{x}\\[10pt]&=\btip{4\cdot(2x)}{\frac{d}{dx}\p{\b{4}x^{\r{2}}}&=\b{4}\cdot\frac{d}{dx}\p{x^{\r{2}}}\\&=\b{4}\cdot\r{2}x^{\r{2}-1}}+\btip{1}{\frac{d}{dx}\p{x}=1}\\[10pt]&=\g{8x+1}\\[10pt]\b{f_2'(x)}&=\frac{d}{dx}\p{\o{3-x}}\\[10pt]&=\frac{d}{dx}\p{3}-\frac{d}{dx}\p{x}\\[10pt]&=\btip{0}{\ga{\t{the derivative of}\\ \t{a constant is 0}}}-\btip{1}{\frac{d}{dx}\p{x}=1}\\[10pt]&=\b{-1}\end{aligned}$$`,
        },
        {
          general: String.raw`Substitute $\btip{\pu{f_1(x)}}{\put{the numerator}}$, $\btip{\o{f_2(x)}}{\ot{the denominator}}$, $\btip{\g{f_1'(x)}}{\gt{the derivative of the numerator}}$, and $\btip{\b{f_2'(x)}}{\bt{the derivative of the denominator}}$ into the quotient rule equation:$$f'(x)=\frac{\g{f_1'(x)}\cdot\o{f_2(x)}-\pu{f_1(x)}\cdot\b{f_2'(x)}}{\p{\o{f_2(x)}}^2}$$`,
          specific: String.raw`$$\begin{aligned}f'(x)&=\frac{\g{f_1'(x)}\cdot\o{f_2(x)}-\pu{f_1(x)}\cdot\b{f_2'(x)}}{\p{\o{f_2(x)}}^2}\\[10pt]&=\frac{\g{(8x+1)}\cdot\o{(3-x)}-\pu{(4x^2+x)}\cdot\b{\p{-1}}}{\p{\o{3-x}}^2}\end{aligned}$$`,
        }
      ],
      examples: [
        // {
        //   specific: "$f(x)=\\b{3}\\g{\\sqrt{\\bk{x}}}$. Find $f'(x)$",
        //   steps: ["$$f(x)=\\b{3}x^{\\r{1/2}}$$","$$\\begin{aligned}f'(x)&=\\b{3}\\cdot\\frac{d}{dx}\\p{x^{\\r{1/2}}}\\\\[10pt]&=\\b{3}\\cdot\\p{\\r{\\frac{1}{2}}x^{\\r{1/2}-1}}\\\\[10pt]&=\\frac{3}{2}x^{-3/2}\\end{aligned}$$"],
        // },
        // {
        //   specific: "Find $\\displaystyle\\frac{d}{dx}\\left(x^{\\r{\\tiny\\frac{1}{2}}}\\right)$",
        //   steps: ["$$\\frac{d}{dx}\\left(x^{\\r{\\tiny\\frac{1}{2}}}\\right)=\\r{\\frac{1}{2}}x^{\\r{\\tiny\\frac{1}{2}}-1}$$"],
        // },
      ],
    },
    {
      name: "Generalized Power Rule Without Properties of Exponents",
      backgroundColor: "green",
      web: "LATER",
      book: "158-159",
      exam: "Might be on Test 1",
      intro: String.raw`In this section, we show how to calculate the derivative of <span class='purple'>a function</span> to <span class='red'>a power</span>. We do this with the Generalized Power Rule (also called the Chain Rule): $$\begin{flalign}&\frac{d}{dx}\p{\p{\put{\{a function\}}}^{\rt{\{a power\}}}}\\[10pt]&\quad=\rt{\{the power\}}\cdot\p{\put{\{the function\}}}^{\rt{\{the power\}}-1}\cdot\gt{\{the derivative of the function\}}\\[10pt]&\t{or, the abbreviated version,}\\[10pt]&\frac{d}{dx}\p{\p{\pu{g(x)}}^{\r{n}}}=\r{n}\cdot\p{\pu{g(x)}}^{\r{n}-1}\cdot\g{g'(x)}\end{flalign}$$`,
      general: String.raw`$f(x)=\p{\put{\{a function\}}}^{\rt{\{a power\}}}$. Find $f'(x)$<br>OR<br>Find $\d{\p{\put{\{a function\}}}^{\rt{\{a power\}}}}$`,
      specific: String.raw`$f(x)=\p{\pu{2x+1}}^{\r{6}}$. Find $f'(x)$`,
      rightColWidth: 50,
      steps: [
        {
          general: String.raw`Identify $\pu{g(x)}$ and $\r{n}$:$$\begin{aligned}1.\ \pu{g(x)}&\t{ is the }\put{the function}\t{ being raised to a power}\\[10pt]2.\ \r{n}&\t{ is }\rt{the power}\end{aligned}$$`,
          specific: String.raw`$$\begin{aligned}\pu{g(x)}&=\pu{2x+1}\\[10pt]\r{n}&=\r{6}\end{aligned}$$`,
        },
        {
          general: String.raw`Find $\btip{\g{g'(x)}}{\gt{the derivative of $g(x)$}}$`,
          specific: String.raw`$$\begin{aligned}\g{g'(x)}&=\d{2x+1}\\[10pt]&=\d{\pu{2x+1}}\\[10pt]&=\d{2x}+\d{1}\\[10pt]&=\btip{2}{\d{\b{2}x}&=\b{2}\cdot\d{x}\\[8pt]&=2(1)}-\btip{0}{\ga{\t{the derivative of}\\\t{a constant is 0}}\\}\\[10pt]&=2\end{aligned}$$`,
        },
        {
          general: String.raw`Plug into the generalized power rule:$$f'(x)=\r{n}\cdot\p{\pu{g(x)}}^{\r{n}-1}\cdot\g{g'(x)}$$`,
          specific: String.raw`$$\begin{aligned}f'(x)&=\r{n}\cdot\p{\pu{g(x)}}^{\r{n}-1}\cdot\g{g'(x)}\\[10pt]&=\r{6}\cdot\p{\pu{2x+1}}^{\r{6}-1}\cdot\g{\p{2}}\end{aligned}$$`,
        },
      ],
      examples: [
        // {
        //   specific: "$f(x)=\\b{3}\\g{\\sqrt{\\bk{x}}}$. Find $f'(x)$",
        //   steps: ["$$f(x)=\\b{3}x^{\\r{1/2}}$$","$$\\begin{aligned}f'(x)&=\\b{3}\\cdot\\frac{d}{dx}\\p{x^{\\r{1/2}}}\\\\[10pt]&=\\b{3}\\cdot\\p{\\r{\\frac{1}{2}}x^{\\r{1/2}-1}}\\\\[10pt]&=\\frac{3}{2}x^{-3/2}\\end{aligned}$$"],
        // },
        // {
        //   specific: "Find $\\displaystyle\\frac{d}{dx}\\left(x^{\\r{\\tiny\\frac{1}{2}}}\\right)$",
        //   steps: ["$$\\frac{d}{dx}\\left(x^{\\r{\\tiny\\frac{1}{2}}}\\right)=\\r{\\frac{1}{2}}x^{\\r{\\tiny\\frac{1}{2}}-1}$$"],
        // },
      ],
    },
    {
      name: "Generalized Power Rule With Properties of Exponents",
      backgroundColor: "green",
      web: "LATER",
      book: "158-159",
      exam: "Might be on Test 1",
      intro: String.raw`In this section, we show how to combine the Generalized Power Rule of the previous section with properties of exponents. The relevant properties of exponents are $$\begin{aligned}\g{\frac{\b{c}}{\sqrt{\pu{g(x)}}}}&=\b{c}\p{{\pu{g(x)}}}^{\g{-\tiny\frac{1}{2}}}\qquad&\g{\frac{\b{c}}{\pu{g(x)}}}&=\b{c}\p{{\pu{g(x)}}}^{\g{-1}}\qquad&\g{\sqrt{\pu{g(x)}}}&=\p{{\pu{g(x)}}}^{\tiny\g{\frac{1}{2}}}\\[20pt]\g{\frac{\b{c}}{\sqrt[\r{n}]{\pu{g(x)}}}}&=\p{{\pu{g(x)}}}^{\tiny\g{-\frac{1}{\r{n}}}}\qquad&\g{\frac{\b{c}}{{\pu{g(x)}}^{\r{n}}}}&=\b{c}\p{{\pu{g(x)}}}^{\g{-}\r{n}}\qquad&\g{\sqrt[\r{n}]{\pu{g(x)}}}&=\p{{\pu{g(x)}}}^{\tiny\g{\frac{1}{\r{n}}}}\end{aligned}$$Here are some examples to make the above properties a little clearer:$$\begin{aligned}\g{\frac{\b{1}}{\sqrt{\pu{x^2+1}}}}&=\b{1}\pu{\p{x^2+1}}^{\g{\tiny-\frac{1}{2}}}\qquad&\g{\frac{\b{3}}{{\pu{x^2+1}}}}&=\b{3}\p{{\pu{x^2+1}}}^{\g{-1}}\qquad&\g{\sqrt{\pu{x^2+1}}}&=\p{{\pu{x^2+1}}}^{\tiny\g{\frac{1}{2}}}\\[20pt]\g{\frac{\b{4}}{\sqrt[\r{3}]{\pu{x^2+1}}}}&=\b{4}\p{{\pu{x^2+1}}}^{\g{\tiny-\frac{1}{\r{3}}}}\qquad&\g{\frac{\b{2}}{\pu{\p{x^2+1}}^{\r{1/2}}}}&=\b{2}\p{{\pu{x^2+1}}}^{\g{-}\r{1/2}}\qquad&\g{\sqrt[\r{3}]{\pu{x^2+1}}}&=\p{{\pu{x^2+1}}}^{\tiny\g{\frac{1}{\r{3}}}}\end{aligned}$$To calculate the derivative of a square or cube root, a $\r{n}$th root, or <span class='blue'>a constant</span> divided by $x$ to <span class='red'>a power</span>, use the one of the properties of exponents to rewrite it in the form of $\b{c}\p{{\pu{g(x)}}}^{\r{n}}$ (<span class='blue'>a constant</span> times <span class='purple'>a function</span> to <span class='red'>a power</span>). Then we use can use the Generalized Power Rule and the Constant Multiple Rule to calculate the derivative`,
      general: String.raw`$f(x)=\p{\put{\{a function\}}}^{\rt{\{a power\}}}$. Find $f'(x)$<br>OR<br>Find $\d{\p{\put{\{a function\}}}^{\rt{\{a power\}}}}$`,
      specific: String.raw`$f(x)=\frac{\b{2}}{\p{\pu{2x+1}}^{\r{6}}}$. Find $f'(x)$`,
      rightColWidth: 50,
      steps: [
        {
          general: String.raw`Rewrite $f(x)$ in the form $\btip{\b{c}\pu{\p{g(x)}}^{\r{n}}}{\bt{a number}\t{ times }\put{a function}\t{ to }\rt{a power}}$  using one of these properties of exponents:$$\begin{aligned}\g{\frac{\b{c}}{\sqrt{\pu{g(x)}}}}&=\b{c}\p{{\pu{g(x)}}}^{\g{-\tiny\frac{1}{2}}}\qquad&\g{\frac{\b{c}}{\pu{g(x)}}}&=\b{c}\p{{\pu{g(x)}}}^{\g{-1}}\qquad&\g{\sqrt{\pu{g(x)}}}&=\p{{\pu{g(x)}}}^{\tiny\g{\frac{1}{2}}}\\[20pt]\g{\frac{\b{c}}{\sqrt[\r{n}]{\pu{g(x)}}}}&=\p{{\pu{g(x)}}}^{\tiny\g{-\frac{1}{\r{n}}}}\qquad&\g{\frac{\b{c}}{{\pu{g(x)}}^{\r{n}}}}&=\b{c}\p{{\pu{g(x)}}}^{\g{-}\r{n}}\qquad&\g{\sqrt[\r{n}]{\pu{g(x)}}}&=\p{{\pu{g(x)}}}^{\tiny\g{\frac{1}{\r{n}}}}\end{aligned}$$`,
          specific: String.raw`$$\begin{aligned}f(x)&=\b{2}\cdot\p{\pu{2x+1}}^{\r{6}}\end{aligned}$$`,
        },
        {
          general: String.raw`Use the Constant Multiple Rule and the Power Rule to find the derivative of $\btip{\b{c}\pu{\p{g(x)}}^{\r{n}}}{\bt{a number}\t{ times }\put{a function}\t{ to }\rt{a power}}$`,
          specific: String.raw`$$\begin{aligned}f'(x)&=\d{\b{2}\cdot\p{\pu{2x+1}}^{\r{6}}}\\[10pt]&=\b{2}\cdot\d{\p{\pu{2x+1}}^{\r{6}}}\\[10pt]&=\b{2}\cdot\p{\r{6}\cdot\p{\pu{2x+1}}^{\r{6}-1}}\cdot\d{\pu{2x+1}}\\[10pt]&=\b{2}\cdot\p{\r{6}\cdot\p{\pu{2x+1}}^{\r{6}-1}}\cdot2\end{aligned}$$`,
        }
      ],
      examples: [
        // {
        //   specific: "$f(x)=\\b{3}\\g{\\sqrt{\\bk{x}}}$. Find $f'(x)$",
        //   steps: ["$$f(x)=\\b{3}x^{\\r{1/2}}$$","$$\\begin{aligned}f'(x)&=\\b{3}\\cdot\\frac{d}{dx}\\p{x^{\\r{1/2}}}\\\\[10pt]&=\\b{3}\\cdot\\p{\\r{\\frac{1}{2}}x^{\\r{1/2}-1}}\\\\[10pt]&=\\frac{3}{2}x^{-3/2}\\end{aligned}$$"],
        // },
        // {
        //   specific: "Find $\\displaystyle\\frac{d}{dx}\\left(x^{\\r{\\tiny\\frac{1}{2}}}\\right)$",
        //   steps: ["$$\\frac{d}{dx}\\left(x^{\\r{\\tiny\\frac{1}{2}}}\\right)=\\r{\\frac{1}{2}}x^{\\r{\\tiny\\frac{1}{2}}-1}$$"],
        // },
      ],
    },
    {
      name: "Finding $f'(a)$",
      backgroundColor: "green",
      web: "LATER",
      book: "158-159",
      exam: "Might be on Test 1",
      intro: String.raw`Once you have found $f'(\lb{x})$, you can calculate $f'(\go{a})$ by plugging in $\go{a}$ for $\lb{x}$`,
      general: String.raw`$f(x)=\{some function\}$ Find $f'(\go{a})$`,
      specific: String.raw`$f(x)=x^2$. Find $f'(\go{2})$`,
      rightColWidth: 50,
      steps: [
        {
          general: String.raw`Find $f'(\lb{x})$`,
          specific: String.raw`$$\begin{aligned}f'(x)=2x\end{aligned}$$`,
        },
        {
          general: String.raw`Plug in $\go{a}$ for $\lb{x}$ in the $f'(\lb{x})$ equation to find $f'(\go{a})$`,
          specific: String.raw`$f'(\go{2})=2(\go{2})$`,
        }
      ],
      examples: [
        // {
        //   specific: "$f(x)=\\b{3}\\g{\\sqrt{\\bk{x}}}$. Find $f'(x)$",
        //   steps: ["$$f(x)=\\b{3}x^{\\r{1/2}}$$","$$\\begin{aligned}f'(x)&=\\b{3}\\cdot\\frac{d}{dx}\\p{x^{\\r{1/2}}}\\\\[10pt]&=\\b{3}\\cdot\\p{\\r{\\frac{1}{2}}x^{\\r{1/2}-1}}\\\\[10pt]&=\\frac{3}{2}x^{-3/2}\\end{aligned}$$"],
        // },
        // {
        //   specific: "Find $\\displaystyle\\frac{d}{dx}\\left(x^{\\r{\\tiny\\frac{1}{2}}}\\right)$",
        //   steps: ["$$\\frac{d}{dx}\\left(x^{\\r{\\tiny\\frac{1}{2}}}\\right)=\\r{\\frac{1}{2}}x^{\\r{\\tiny\\frac{1}{2}}-1}$$"],
        // },
      ],
    },
    {
      name: "Finding The Equation of the Tangent Line",
      backgroundColor: "green",
      web: "LATER",
      book: "158-159",
      exam: "Might be on Test 1",
      intro: String.raw`In this section, we will show to find the equation of the tangent (WHY WE CARE LATER) (INTRO LATER)`,
      general: String.raw`$f(x)=\{some function\}$ Find the equation of the line tangent to $f(x)$ at $x=\go{x_1}$`,
      specific: String.raw`$f(x)=2x^2$. Find the equation of the line tangent to $f(x)$ at $x=\go{1}$`,
      rightColWidth: 50,
      steps: [
        {
          general: String.raw`Find $\b{y_1}=f(\go{x_1})$`,
          specific: String.raw`$$\begin{aligned}\b{y_1}&=f(\go{1})=2\go{1}^2=\b{2}\end{aligned}$$`,
        },
        {
          general: String.raw`Find $m=f'(\go{x_1})$`,
          specific: String.raw`$$f'(x)=4x$$$$\begin{aligned}\pu{m}&=f'(\go{1})=4(\go{1})=\pu{4}\end{aligned}$$`,
        },
        {
          general: String.raw`Use point-slope form to find the equation of the tangent line:$$y-\b{y_1}=\pu{m}\p{x-\go{x_1}}$$`,
          specific: String.raw`The equation of the tangent line is $y-\b{2}=\pu{4}(x-\go{1})$`,
        },
      ],
      examples: [
        // {
        //   specific: "$f(x)=\\b{3}\\g{\\sqrt{\\bk{x}}}$. Find $f'(x)$",
        //   steps: ["$$f(x)=\\b{3}x^{\\r{1/2}}$$","$$\\begin{aligned}f'(x)&=\\b{3}\\cdot\\frac{d}{dx}\\p{x^{\\r{1/2}}}\\\\[10pt]&=\\b{3}\\cdot\\p{\\r{\\frac{1}{2}}x^{\\r{1/2}-1}}\\\\[10pt]&=\\frac{3}{2}x^{-3/2}\\end{aligned}$$"],
        // },
        // {
        //   specific: "Find $\\displaystyle\\frac{d}{dx}\\left(x^{\\r{\\tiny\\frac{1}{2}}}\\right)$",
        //   steps: ["$$\\frac{d}{dx}\\left(x^{\\r{\\tiny\\frac{1}{2}}}\\right)=\\r{\\frac{1}{2}}x^{\\r{\\tiny\\frac{1}{2}}-1}$$"],
        // },
      ],
    },
    {
      name: "Finding Where The Tangent Line is Horizontal",
      backgroundColor: "green",
      web: "LATER",
      book: "158-159",
      exam: "Might be on Test 1",
      intro: String.raw`(WHY WE CARE LATER) (INTRO LATER)`,
      general: String.raw`$f(x)=\{some function\}$ Find the $x$-values where the tangent line is horizontal`,
      specific: String.raw`$f(x)=2x^2$. Find where the line tangent to $f(x)$ is horizontal`,
      rightColWidth: 50,
      steps: [
        {
          general: String.raw`Find $f'(x)$`,
          specific: String.raw`$$f'(x)=4x$$`,
        },
        {
          general: String.raw`Solve $f'(x)=0$ for $x$`,
          specific: String.raw`$$\begin{aligned}4x&=0\\x&=0\end{aligned}$$`,
        },
      ],
      examples: [
        // {
        //   specific: "$f(x)=\\b{3}\\g{\\sqrt{\\bk{x}}}$. Find $f'(x)$",
        //   steps: ["$$f(x)=\\b{3}x^{\\r{1/2}}$$","$$\\begin{aligned}f'(x)&=\\b{3}\\cdot\\frac{d}{dx}\\p{x^{\\r{1/2}}}\\\\[10pt]&=\\b{3}\\cdot\\p{\\r{\\frac{1}{2}}x^{\\r{1/2}-1}}\\\\[10pt]&=\\frac{3}{2}x^{-3/2}\\end{aligned}$$"],
        // },
        // {
        //   specific: "Find $\\displaystyle\\frac{d}{dx}\\left(x^{\\r{\\tiny\\frac{1}{2}}}\\right)$",
        //   steps: ["$$\\frac{d}{dx}\\left(x^{\\r{\\tiny\\frac{1}{2}}}\\right)=\\r{\\frac{1}{2}}x^{\\r{\\tiny\\frac{1}{2}}-1}$$"],
        // },
      ],
    },
  ],
}
