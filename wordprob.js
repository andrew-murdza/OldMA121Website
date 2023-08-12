window.j = {
    startCollapsed: false,
    lessonNum: 8,
    lessonName: "Week of 10-3",
    intro: String.raw`In this lecture, we will discuss max and min word problems.<br>To solve a max/min word problem, we first convert it into a problem of maximizing/minimizing $f(x)$ on $(0,\infty)$<br>Then we use the steps from last lecture to find the max/min of $f(x)$ on $(0,\infty)$<br><br>We will consider three types of optimization problems and we will vote at the end of class which of these we want to have on the exam<br>These are the three situations<ol><li>Farmer building a fence by a river</li><li>Charging For Seats At a Baseball Game</li><li>Surface area of a box with no top</li></ol>`,//<br><br>We use the following steps to convert the word problem:
    //<ol><li>Determine $\btip{\t{the relevant variables}}{\t{the variables that the quantity we want to}\\\t{maximize/minimize depends on}}$</li><li>Write an equation for the quantity you want to maximize/minimize in terms of the relevant variables</li><li>Use information given in the problem to write equations that relate the relevant variables to each other</li><li>Solve the equations in step 3 to write all the relevant variables in terms of a single relevant variable</li></ol>`,
    sections: [
      {
        name: String.raw `Max/Min Word Problems: A Fence by a River`,
        backgroundColor: "green",
        web: "Hw 3: 1, 5-7, 9; Hw 4: 1-7, 11; Hw 5: 2, 5-7; PT 2: 1-6, 8; Hw 6: 4, 7, 9-10; PT 3: 8; Hw 9: 8, 10; PF: 4, 6, 10-12, 14-15",
        book: "148",
        exam: "Up to one question on test 2 and up to one question on the final",
        intro: String.raw `We will describe how to answer the following question:<br>A farmer wants to build a three-sided rectangular fence near a river, using $\yk{d}$ yards of fencing. Assume that the river runs straight and that John need not fence in the side next to the river. What are the $\yut{length}$ and the $\ot{width}$ of the fence which maximizes the enclosed area? A diagram for the problem, provided on the exam but not in WebAssign, is below:
        <br><iframe src="https://www.desmos.com/calculator/hbi9py1k7h?embed" width="500" height="500" style="border: 1px solid #ccc" frameborder=0></iframe><br>
        We solve this problem in two stages:<ol><li>Rewrite the word problem as maximizing a function $f(x)$</li><li>Use the steps from the previous lecture to maximize $f(x)$</li></ol>
        <br>
        In the first stage,
        <ol><li>Write the area in terms of $\ot{width}$ and $\yut{length}$</li><li>Use the $\btip{\ykt{amount of fence used}}{\t{given in the problem}}$ to write $\yut{length}$ in terms of $\ot{width}$.<li>Use the previous two steps to rewrite area in terms of only $\ot{width}$, i.e., $\t{area}=f(\ot{width})$</li></ol> 
        <br>
        In the second stage, we maximize $f(\ot{width})$ by
        <ol>
            <li>
                Finding the critical point
            </li>
            <li>
                Using $f''$ to verify that the critical point is a max
            </li>
            <li>
                Use the critical point to find the $\yut{length}$
            </li>
            <li>
                In WebAssign, you will have to plug the $\ot{width}$ and $\yut{length}$ into the area equation to get the maximum area.
            </li>
        </ol>
        `,
        general: String.raw `A farmer wants to build a three-sided rectangular fence near a river, using $\yk{d}$ yards of fencing. Assume that the river runs straight and that John need not fence in the side next to the river. What are the $\yut{length}$ and the $\ot{width}$ of the fence which maximizes the enclosed area?`,
        specific: String.raw `A farmer wants to build a three-sided rectangular fence near a river, using $\yk{300}$ yards of fencing. Assume that the river runs straight and that John need not fence in the side next to the river. What are the $\yut{length}$ and the $\ot{width}$ of the fence which maximizes the enclosed area?`,
        rightColWidth: 50,
        steps: [
          {
            general: String.raw`Determine the variables that the area depends on`,
            specific: String.raw`$\bb{\t{The relevant variables are }\o{x}\ (\ot{width})\t{ and }\yu{y}\ (\yut{length})}$<br>Note: You can call $\ot{width}$ and $\yut{length}$ any letter you want, you don't have to use $\o{x}$ and $\yu{y}$`,
          },
          {
            general: String.raw`Write an equation for the area in terms of $\ot{width}$ and $\yut{length}$`,
            specific: String.raw`$$\gb{A=\o{x}\cdot\yu{y}}$$`,
          },
          {
            general: String.raw`Use the amount of fence used to write an equation that relates $\ot{width}$ and $\yut{length}$`,
            specific: String.raw`$\bb{\t{Based on the below diagram, the amount of fence used is }2\o{x}+\yu{y}}$<br><iframe src="https://www.desmos.com/calculator/tkj3ktocc4?embed" width="500" height="500" style="border: 1px solid #ccc" frameborder=0></iframe><br>$\bb{\t{Since the farmer uses }\yk{300}\t{ yards of the fence,}}$$$\gb{2\o{x}+\yu{y}=\yk{300}}$$`,
          },
          {
            general: String.raw`Solve the equation from step 3 to solve for $\yut{length}$ in terms of $\ot{width}$<br><br>It is equally correct to solve for $\ot{width}$ in terms of $\yut{length}$ if you prefer that`,
            specific: String.raw`$$\yu{y}=\yk{300}-2\o{x}$$`,
          },
          {
            general: String.raw`Substitute the equation from step 4 for $\yut{length}$ in the area equation<br><br>If you solved for $\ot{width}$, then substitute for $\ot{width}$ instead`,
            specific: String.raw`$$\begin{aligned}\gb{A}&=\gb{\o{x}\cdot \yu{y}}\\[4pt]&=\gb{\o{x}\cdot(\yk{300}-2\o{x})}\\[4pt]\gb{f(\o{x})}&=\gb{\o{x}\cdot(\yk{300}-2\o{x})}\end{aligned}$$`,
          },
          {
            general: String.raw`Find $f'(\o{x})$<br>I recomend distributing the $\o{x}$ to avoid product rule<br>Using product rule is totally correct but it takes longer`,
            specific: String.raw`$$\a{\gb{f(\o{x})}&=\gb{\o{x}\cdot(\yk{300}-2\o{x})}\\[4pt]&=\yk{300}\o{x}-2\o{x}^2}$$$$\gb{\a{f'(\o{x})&=\yk{300}-4\o{x}}}$$`,
          },
          {
            general: String.raw`Solve $f'(\o{x})=0$ for $\o{x}$ to get the $\btip{\bt{critical point}}{\b{x\t{-value where }f'(x)=0}}$`,
            specific: String.raw`$$\a{\gb{\yk{300}-4\o{x}}&=\gb{0}\\[4pt]\bb{\yk{300}}&=\bb{4\o{x}}\\[7pt]\bb{\o{x}}&=\bb{\frac{\yk{300}}{4}}\\[7pt]\gb{\o{x}}&=\gb{\b{75}}}$$`,
          },
          {
            general: String.raw`Find $f''(x)$`,
            specific: String.raw`$\ga{\ob{f'(x)=\yk{300}-4\o{x}}\\[4pt]\gb{f''(x)=-4}}$`,
          },
          {
            general: String.raw`$\btip{\t{Determine whether }f''(x)\t{ is always $\gt{positive}$ or always $\rt{negative}$ on }(0,\infty)}{\t{one or the other will happen on this type of problem}}$<br>You should be able to tell whether $f''(x)$ is $\gt{positive}$ or $\rt{negative}$ without doing any math<br>Remember that in the interval $(0,\infty)$ $x$ will be positive.`,
            specific: String.raw`$\bb{f''(x)=-20<0\t{ on }(0,\infty)}$`,
          },
          {
            general: String.raw`Use $f''(x)$ to verify that the $\bt{critical point}$ gives the $\rt{maximum}$ area<ol><li>If $f''(x)$ is always $\gt{positive}$, then the $\bt{critical point}$ gives the $\gt{minimum}$ area</li><li>If $f''(x)$ is always $\rt{negative}$, then the $\bt{critical point}$ gives the $\rt{maximum}$ area<br><b>Note: make sure to mention that $f''(x)$ is always $\g{\textbf{positive}}$ or always $\r{\textbf{negative}}$ (whichever one applies). This will be worth points on the exam</b>`,
            specific: String.raw`$\gb{\t{Because }f''(x)\t{ is always $\rt{negative}$, a $\ot{width}$ of $\bt{75}$ gives the $\rt{maximum}$ area}}$`,
          },
          {
            general: String.raw`Find the $\yut{length}$ of the fence by plugging in the $\bt{critical point}$ for the $\ot{width}$ into the equation from step 5`,
            specific: String.raw`$$\a{\gb{\yu{y}}&=\bb{-20x+160}\\[4pt]&=\gb{\yk{300}-2(\b{75})}\\[4pt]&=\ob{150}}$$`,
          },
        ],
        examples: [
            {specific: String.raw `A farmer wants to build a three-sided rectangular fence near a river, using $\yk{40}$ yards of fencing. Assume that the river runs straight and that John need not fence in the side next to the river. What are the $\yut{length}$ and the $\ot{width}$ of the fence which maximizes the enclosed area?`,
            steps: [
              String.raw`$\bb{\t{The relevant variables are }\o{x}\ (\ot{width})\t{ and }\yu{y}\ (\yut{length})}$<br>Note: You can call $\ot{width}$ and $\yut{length}$ any letter you want, you don't have to use $\o{x}$ and $\yu{y}$`,
              String.raw`$$\gb{A=\o{x}\cdot\yu{y}}$$`,
              String.raw`$\bb{\t{Based on the below diagram, the amount of fence used is }2\o{x}+\yu{y}}$<br><iframe src="https://www.desmos.com/calculator/tkj3ktocc4?embed" width="500" height="500" style="border: 1px solid #ccc" frameborder=0></iframe><br>$\bb{\t{Since the farmer uses }\yk{40}\t{ yards of the fence,}}$$$\gb{2\o{x}+\yu{y}=\yk{40}}$$`,
              String.raw`$$\yu{y}=\yk{40}-2\o{x}$$`,
              String.raw`$$\begin{aligned}\gb{A}&=\gb{\o{x}\cdot \yu{y}}\\[4pt]&=\gb{\o{x}\cdot(\yk{40}-2\o{x})}\\[4pt]\gb{f(\o{x})}&=\gb{\o{x}\cdot(\yk{40}-2\o{x})}\end{aligned}$$`,
              String.raw`$$\a{\gb{f(\o{x})}&=\gb{\o{x}\cdot(\yk{40}-2\o{x})}\\[4pt]&=\yk{40}\o{x}-2\o{x}^2}$$$$\gb{\a{f'(\o{x})&=\yk{40}-4\o{x}}}$$`,
              String.raw`$$\a{\gb{\yk{40}-4\o{x}}&=\gb{0}\\[4pt]\bb{\yk{40}}&=\bb{4\o{x}}\\[7pt]\bb{\o{x}}&=\bb{\frac{\yk{40}}{4}}\\[7pt]\gb{\o{x}}&=\gb{\b{10}}}$$`,
              String.raw`$\ga{\ob{f'(x)=\yk{40}-4\o{x}}\\[4pt]\gb{f''(x)=-4}}$`,
              String.raw`$$\bb{f''(x)=-4\r{<0}\t{ on }(0,\infty)}$$`,
              String.raw`$\gb{\t{Because }f''(x)\t{ is always $\rt{negative}$, a $\ot{width}$ of $\bt{10}$ gives the $\rt{maximum}$ area}}$`,
              String.raw`$$\a{\gb{\yu{y}}&=\bb{\yk{40}-2\o{x}}\\[4pt]&=\gb{\yk{40}-2(\b{10})}\\[4pt]&=\ob{20}}$$`,
            ],
          },
        ],
      },
      {
        name: String.raw `Charging For Seats At a Baseball Game`,
        backgroundColor: "green",
        web: "Hw 3: 1, 5-7, 9; Hw 4: 1-7, 11; Hw 5: 2, 5-7; PT 2: 1-6, 8; Hw 6: 4, 7, 9-10; PT 3: 8; Hw 9: 8, 10; PF: 4, 6, 10-12, 14-15",
        book: "148",
        exam: "Up to one question on test 2 and up to one question on the final",
        intro: String.raw `We will describe how to answer the following question:<br>When a baseball park owner charges $\gt{\{an amount of money\}}$ for admission, there is an average attendance of $\rt{\{a number\}}$ people. For every $\lbt{\{a number\}}$ increase in the admission price, there is a loss of $\ykt{\{a number\}}$ customers from the average number. What admission price should be charged in order to maximize revenue?
        <br><br>
        We solve this problem in two stages:<ol><li>Rewrite the word problem as maximizing a function $f(x)$</li><li>Use the steps from the previous lecture to maximize $f(x)$</li></ol>
        <br>
        In the first stage,
        <ol><li>Write the profit in terms of $\ot{price}$ and $\yut{number of customers}$</li><li>Use the given numbers to write the $\yut{number of customers}$ in terms of price<li>Use the previous two steps to rewrite area in terms of only $\ot{width}$, i.e., $\t{profit}=f(\ot{price})$</li></ol> 
        <br>
        In the second stage, we maximize $f(\ot{price})$ by
        <ol>
            <li>
                Finding the critical point
            </li>
            <li>
                Using $f''$ to verify that the critical point is a max
            </li>
            <li>
                In WebAssign, you will have to plug the $\ot{price}$ into the profit equation to get the maximum revenue.
            </li>
        </ol>
        `,
        general: String.raw `When a baseball park owner charges $\gt{\{an amount of money\}}$ for admission, there is an average attendance of $\rt{\{a number\}}$ people. For every $\lbt{\{a number\}}$ increase in the admission price, there is a loss of $\ykt{\{a number\}}$ customers from the average number. What admission price should be charged in order to maximize revenue?`,
        specific: String.raw `When a baseball park owner charges $\g{\$3.00}$ for admission, there is an average attendance of $\r{100}$ people. For every $\lbt{\$0.10}$ increase in the admission price, there is a loss of $\ykt{2}$ customers from the average number. What admission price should be charged in order to maximize revenue?`,
        rightColWidth: 50,
        steps: [
          {
            general: String.raw`Determine the variables that the profit depends on`,
            specific: String.raw`$\bb{\t{The relevant variables are }\o{x}\ (\ot{profit})\t{ and }\yu{y}\ (\yut{number of customers})}$<br>Note: You can call $\ot{price}$ and $\yut{number of customers}$ any letter you want, you don't have to use $\o{x}$ and $\yu{y}$`,
          },
          {
            general: String.raw`Write an equation for the profit in terms of $\ot{price}$ and $\yut{number of customers}$`,
            specific: String.raw`$$\gb{A=\o{x}\cdot\yu{y}}$$`,
          },
          {
            general: String.raw`Use the following equation to relate $\ot{price}$ and $\yut{number of customers}$:$$\yu{y}=-\frac{\ykt{customer decrease}}{\lbt{price increase}}(\o{x}-\gt{starting price})+\rt{starting attendance}$$Simplify by distributing and combining like terms`,
            specific: String.raw`$$\a{\gb{\yu{y}}&=\gb{\frac{\ykt{2}}{\lbt{0.1}}(\o{x}-\gt{3})+\rt{100}}\\[7pt]&=\bb{-20(x-3)+100}\\[4pt]&=\bb{-20x+60+100}\\[4pt]&=\gb{-20x+160}}$$`,
          },
        //   {
        //     general: String.raw`Solve the equation from step 3 to solve for $\yut{number of customers}$ in terms of $\ot{price}$<br><br>It is equally correct to solve for $\ot{price}$ in terms of $\yut{number of customers}$ if you prefer that`,
        //     specific: String.raw`$$\yu{y}=-20x+160$$`,
        //   },
          {
            general: String.raw`Substitute the equation from step 4 for $\yut{number of customers}$ in the profit equation<br><br>If you solved for $\ot{price}$, then substitute for $\ot{price}$ instead`,
            specific: String.raw`$$\begin{aligned}\gb{A}&=\gb{\o{x}\cdot \yu{y}}\\[4pt]&=\gb{\o{x}\cdot(-20x+160)}\\[4pt]\gb{f(\o{x})}&=\gb{\o{x}\cdot(-20x+160)}\end{aligned}$$`,
          },
          {
            general: String.raw`Find $f'(\o{x})$<br>I recomend distributing the $\o{x}$ to avoid product rule<br>Using product rule is totally correct but it takes longer`,
            specific: String.raw`$$\a{\gb{f(\o{x})}&=\gb{\o{x}\cdot(-20x+160)}\\[4pt]&=-20\o{x}^2+160\o{x}}$$$$\gb{\a{f'(\o{x})&=-40\o{x}+160}}$$`,
          },
          {
            general: String.raw`Solve $f'(\o{x})=0$ for $\o{x}$ to get the $\btip{\bt{critical point}}{\b{x\t{-value where }f'(x)=0}}$`,
            specific: String.raw`$$\a{\gb{-40\o{x}+160}&=\gb{0}\\[4pt]\bb{-40\o{x}}&=\bb{-160}\\[7pt]\bb{\o{x}}&=\gb{\b{4}}}$$`,
          },
          {
            general: String.raw`Find $f''(x)$`,
            specific: String.raw`$\ga{\ob{-20x+160}\\[4pt]\gb{f''(x)=-20}}$`,
          },
          {
            general: String.raw`$\btip{\t{Determine whether }f''(x)\t{ is always $\t{positive}$ or always $\t{negative}$ on }(0,\infty)}{\t{one or the other will happen on this type of problem}}$<br>You should be able to tell whether $f''(x)$ is $\t{positive}$ or $\t{negative}$ without doing any math<br>Remember that in the interval $(0,\infty)$ $x$ will be positive.`,
            specific: String.raw`$\bb{f''(x)=-4<0\t{ on }(0,\infty)}$`,
          },
          {
            general: String.raw`Use $f''(x)$ to verify that the $\bt{critical point}$ gives the $\t{maximum}$ area<ol><li>If $f''(x)$ is always $\t{positive}$, then the $\bt{critical point}$ gives the $\t{minimum}$ area</li><li>If $f''(x)$ is always $\t{negative}$, then the $\bt{critical point}$ gives the $\t{maximum}$ area<br><b>Note: make sure to mention that $f''(x)$ is always positive or always negative (whichever one applies). This will be worth points on the exam</b>`,
            specific: String.raw`$\gb{\t{Because }f''(x)\t{ is always $\t{negative}$, a $\ot{price}$ of $\bt{4}$ gives the $\t{maximum}$ area}}$`,
          },
        ],
        examples: [
        //     {specific: String.raw `A farmer wants to build a three-sided rectangular fence near a river, using $\yk{40}$ yards of fencing. Assume that the river runs straight and that John need not fence in the side next to the river. What are the $\yut{number of customers}$ and the $\ot{price}$ of the fence which maximizes the enclosed profit?`,
        //     steps: [
        //       String.raw`$\bb{\t{The relevant variables are }\o{x}\ (\ot{price})\t{ and }\yu{y}\ (\yut{number of customers})}$<br>Note: You can call $\ot{price}$ and $\yut{number of customers}$ any letter you want, you don't have to use $\o{x}$ and $\yu{y}$`,
        //       String.raw`$$\gb{A=\o{x}\cdot\yu{y}}$$`,
        //       String.raw`$\bb{\t{Based on the below diagram, the amount of fence used is }2\o{x}+\yu{y}}$<br><iframe src="https://www.desmos.com/calculator/tkj3ktocc4?embed" width="500" height="500" style="border: 1px solid #ccc" frameborder=0></iframe><br>$\bb{\t{Since the farmer uses }\yk{40}\t{ yards of the fence,}}$$$\gb{2\o{x}+\yu{y}=\yk{40}}$$`,
        //       String.raw`$$\yu{y}=\yk{40}-2\o{x}$$`,
        //       String.raw`$$\begin{aligned}\gb{A}&=\gb{\o{x}\cdot \yu{y}}\\[4pt]&=\gb{\o{x}\cdot(\yk{40}-2\o{x})}\\[4pt]\gb{f(\o{x})}&=\gb{\o{x}\cdot(\yk{40}-2\o{x})}\end{aligned}$$`,
        //       String.raw`$$\a{\gb{f(\o{x})}&=\gb{\o{x}\cdot(\yk{40}-2\o{x})}\\[4pt]&=\yk{40}\o{x}-2\o{x}^2}$$$$\gb{\a{f'(\o{x})&=\yk{40}-4\o{x}}}$$`,
        //       String.raw`$$\a{\gb{\yk{40}-4\o{x}}&=\gb{0}\\[4pt]\bb{\yk{40}}&=\bb{4\o{x}}\\[7pt]\bb{\o{x}}&=\bb{\frac{\yk{40}}{4}}\\[7pt]\gb{\o{x}}&=\gb{\b{10}}}$$`,
        //       String.raw`$\ga{\ob{f'(x)=\yk{40}-4\o{x}}\\[4pt]\gb{f''(x)=-4}}$`,
        //       String.raw`$$\bb{f''(x)=-4\r{<0}\t{ on }(0,\infty)}$$`,
        //       String.raw`$\gb{\t{Because }f''(x)\t{ is always $\rt{negative}$, a $\ot{price}$ of $\bt{10}$ gives the $\rt{maximum}$ profit}}$`,
        //       String.raw`$$\a{\gb{\yu{y}}&=\bb{\yk{40}-2\o{x}}\\[4pt]&=\gb{\yk{40}-2(\b{10})}\\[4pt]&=\ob{20}}$$`,
        //     ],
        //   },
        ],
      },
      {
        name: String.raw `Surface surface area for a box`,
        backgroundColor: "green",
        web: "Hw 3: 1, 5-7, 9; Hw 4: 1-7, 11; Hw 5: 2, 5-7; PT 2: 1-6, 8; Hw 6: 4, 7, 9-10; PT 3: 8; Hw 9: 8, 10; PF: 4, 6, 10-12, 14-15",
        book: "148",
        exam: "Up to one question on test 2 and up to one question on the final",
        intro: String.raw `A rectangular box with no top is to contain $\ykt{a number}$ cubic inches of volume. Find the dimensions of the box that will minimize the surface surface area. The height (l) of the base is $\got{a number}$ the width (w).
        <br><br>
        We solve this problem in two stages:<ol><li>Rewrite the word problem as maximizing a function $f(x)$</li><li>Use the steps from the previous lecture to maximize $f(x)$</li></ol>
        <br>
        <br>
        In the first stage,
        <ol><li>Write the surface area in terms of $\ot{width}$, $\yut{height}$, and $\lbt{length}$</li><li>Use $\btip{\ykt{the volume}}{\t{given in the problem}}$ and $\btip{\got{the ratio of the length to width}}{\t{given in the problem}}$ to write $\yut{height}$ and $\lbt{length}$ in terms of $\ot{width}$.<li>Use the previous two steps to rewrite surface area in terms of only $\ot{width}$, i.e., $\t{surface area}=f(\ot{width})$</li></ol> 
        <br>
        In the second stage, we maximize $f(\ot{width})$ by
        <ol>
            <li>
                Finding the critical point
            </li>
            <li>
                Using $f''$ to verify that the critical point is a max
            </li>
            <li>
                Use the critical point to find the $\yut{height}$ and $\lbt{length}$
            </li>
        </ol>
        `,
        general: String.raw `A rectangular box with no top  is to contain $\ykt{a number}$ cubic inches of volume. Find the dimensions of the box that will minimize the surface surface area. The height (l) of the base is $\got{a number}$ times the width (w).`,
        specific: String.raw `A rectangular box with no top  is to contain $\ykt{2250}$ cubic inches of volume. Find the dimensions of the box that will minimize the surface surface area. The height (l) of the base is $\got{three}$ times the width (w).`,
        rightColWidth: 50,
        steps: [
            {
              general: String.raw`Determine the variables that the surface area depends on`,
              specific: String.raw`$\bb{\t{The relevant variables are }\o{w}\ (\ot{width})\t{ and }\yu{h}\ (\yut{height})\t{, and }\lb{l}\ (\lbt{length}) }$<br>Note: You can call $\ot{width}$, $\yut{height}$, and $\lbt{length}$ any letter you want, you don't have to use $\o{w}$, $\yu{h}$, and $\lb{l}$`,
            },
            {
              general: String.raw`Write an equation for the surface area in terms of $\ot{width}$ and $\yut{height}$`,
              specific: String.raw`$$\gb{A=2\o{w}\cdot\yu{h}+\o{w}\cdot\lb{l}+2\lb{l}\cdot\yu{h}}$$`,
            },
            {
              general: String.raw`Use the volume and $\btip{\got{the ratio of the length to width}}{\t{given in the problem}}$ to relate $\ot{width}$, $\yut{height}$, and $\lbt{length}$`,
              specific: String.raw`$\bb{\ga{\t{Since the }\lbt{length}\t{ is }\got{three }\t{times the }\ot{width},}}$<br>$$\lb{l}=\go{3}\o{w}$$$\bb{\t{Since the volume of the box is }\yk{2250},}$$$\a{\yk{2250}&=\lb{l}\o{w}\yu{h}}$$`,
            },
            {
              general: String.raw`Solve the volume equation from step 3 to solve for $\yut{height}$ in terms of $\ot{width}$<br><br>It is equally to solve for $\ot{width}$ or $\lbt{length}$ but the math will be much harder`,
              specific: String.raw`$$\a{\yk{2250}&=\lb{l}\o{w}\yu{h}\\[4pt]\yk{2250}&=(3\o{w})(\o{w})\yu{h}\\[4pt]\yk{2250}&=3\o{w}^2\yu{h}\\[7pt]\yu{h}&=\frac{750}{\o{w}^2}}$$`,
            },
            {
              general: String.raw`Substitute the equations from step 3 and step 4 for $\lbt{length}$ and $\yut{height}$ in the surface area equation and simplify`,
              specific: String.raw`$$\a{A&=2\o{w}\cdot\yu{h}+\o{w}\cdot\lb{l}+2\lb{l}\cdot\yu{h}\\[7pt]&=2\o{w}\cdot\frac{750}{\o{w}^2}+\o{w}\cdot(3\o{w})+2\cdot(3\o{w})\cdot \frac{750}{\o{w}^2}\\[10pt]&=3\o{w}^2+\frac{6000}{\o{w}}\\[10pt]f(\o{w})&=3\o{w}^2+\frac{6000}{\o{w}}}$$`,
            },
            {
              general: String.raw`Find $f'(\o{w})$`,
              specific: String.raw`$$\a{\bb{f(\o{w})}&=\bb{3\o{w}^2+6000\cdot\o{w}^{-1}}}$$$$\gb{\a{f'(\o{w})&=6\o{w}-6000\o{w}^{-2}}}$$`,
            },
            {
              general: String.raw`Solve $f'(\o{w})=0$ for $\o{w}$ to get the $\btip{\bt{critical point}}{\b{x\t{-value where }f'(x)=0}}$`,
              specific: String.raw`$$\a{\gb{6\o{w}-6000\o{w}^{-2}}&=\gb{0}\\[7pt]\bb{6\o{w}-\frac{6000}{\o{w}^{2}}}&=\bb{0}\\[10pt]\bb{6\o{w}(\o{w}^2)-\frac{6000}{\o{w}^2}(\o{w}^2)}&=\bb{0}\\[7pt]\bb{6\o{w}^3-6000}&=\bb{0}\\[4pt]\bb{6\o{w}^3}&=\bb{6000}\\[4pt]\bb{\o{w}^3}&=\bb{1000}\\[4pt]\gb{\o{w}}&=\gb{\b{10}}}$$`,
            },
            {
              general: String.raw`Find $f''(x)$`,
              specific: String.raw`$\ga{\ob{f'(\o{w})=6\o{w}-6000\o{w}^{-2}}\\[4pt]\gb{f''(x)=6+12000\o{w}^{-3}}}$`,
            },
            {
              general: String.raw`$\btip{\t{Determine whether }f''(x)\t{ is always $\gt{positive}$ or always $\rt{negative}$ on }(0,\infty)}{\t{one or the other will happen on this type of problem}}$<br>You should be able to tell whether $f''(x)$ is $\gt{positive}$ or $\rt{negative}$ without doing any math<br>Remember that in the interval $(0,\infty)$ $x$ will be positive.`,
              specific: String.raw`$\bb{f''(x)=6+12000\o{w}^{-3}\g{>0}\t{ on }(0,\infty)}$`,
            },
            {
              general: String.raw`Use $f''(x)$ to verify that the $\bt{critical point}$ gives the $\gt{minimum}$ area<ol><li>If $f''(x)$ is always $\gt{positive}$, then the $\bt{critical point}$ gives the $\gt{minimum}$ area</li><li>If $f''(x)$ is always $\rt{negative}$, then the $\bt{critical point}$ gives the $\rt{maximum}$ surface area<br><b>Note: make sure to mention that $f''(x)$ is always $\g{\textbf{positive}}$ or always $\r{\textbf{negative}}$ (whichever one applies). This will be worth points on the exam</b>`,
              specific: String.raw`$\gb{\t{Because }f''(x)\t{ is always $\gt{positive}$, a $\ot{width}$ of $\bt{10}$ gives the $\gt{minimum}$ area}}$`,
            },
            {
              general: String.raw`Find the $\yut{height}$ and $\lbt{length}$ of the fence by plugging in the $\bt{critical point}$ for the $\ot{width}$ into the equation from equations step 4 and step 5`,
              specific: String.raw`$$\a{\yu{h}&=\frac{750}{\o{w}^2}\\[10pt]&=\frac{750}{\b{10}^2}\\[10pt]&=7.5\\[7pt]\yu{l}&=3\o{w}\\[4pt]&=3(\b{10})\\[4pt]&=30}$$`,
            },
          ],
        examples: [
        //     {specific: String.raw `A farmer wants to build a three-sided rectangular fence near a river, using $\yk{40}$ yards of fencing. Assume that the river runs straight and that John need not fence in the side next to the river. What are the $\yut{number of customers}$ and the $\ot{price}$ of the fence which maximizes the enclosed profit?`,
        //     steps: [
        //       String.raw`$\bb{\t{The relevant variables are }\o{x}\ (\ot{price})\t{ and }\yu{y}\ (\yut{number of customers})}$<br>Note: You can call $\ot{price}$ and $\yut{number of customers}$ any letter you want, you don't have to use $\o{x}$ and $\yu{y}$`,
        //       String.raw`$$\gb{A=\o{x}\cdot\yu{y}}$$`,
        //       String.raw`$\bb{\t{Based on the below diagram, the amount of fence used is }2\o{x}+\yu{y}}$<br><iframe src="https://www.desmos.com/calculator/tkj3ktocc4?embed" width="500" height="500" style="border: 1px solid #ccc" frameborder=0></iframe><br>$\bb{\t{Since the farmer uses }\yk{40}\t{ yards of the fence,}}$$$\gb{2\o{x}+\yu{y}=\yk{40}}$$`,
        //       String.raw`$$\yu{y}=\yk{40}-2\o{x}$$`,
        //       String.raw`$$\begin{aligned}\gb{A}&=\gb{\o{x}\cdot \yu{y}}\\[4pt]&=\gb{\o{x}\cdot(\yk{40}-2\o{x})}\\[4pt]\gb{f(\o{x})}&=\gb{\o{x}\cdot(\yk{40}-2\o{x})}\end{aligned}$$`,
        //       String.raw`$$\a{\gb{f(\o{x})}&=\gb{\o{x}\cdot(\yk{40}-2\o{x})}\\[4pt]&=\yk{40}\o{x}-2\o{x}^2}$$$$\gb{\a{f'(\o{x})&=\yk{40}-4\o{x}}}$$`,
        //       String.raw`$$\a{\gb{\yk{40}-4\o{x}}&=\gb{0}\\[4pt]\bb{\yk{40}}&=\bb{4\o{x}}\\[7pt]\bb{\o{x}}&=\bb{\frac{\yk{40}}{4}}\\[7pt]\gb{\o{x}}&=\gb{\b{10}}}$$`,
        //       String.raw`$\ga{\ob{f'(x)=\yk{40}-4\o{x}}\\[4pt]\gb{f''(x)=-4}}$`,
        //       String.raw`$$\bb{f''(x)=-4\r{<0}\t{ on }(0,\infty)}$$`,
        //       String.raw`$\gb{\t{Because }f''(x)\t{ is always $\rt{negative}$, a $\ot{price}$ of $\bt{10}$ gives the $\rt{maximum}$ profit}}$`,
        //       String.raw`$$\a{\gb{\yu{y}}&=\bb{\yk{40}-2\o{x}}\\[4pt]&=\gb{\yk{40}-2(\b{10})}\\[4pt]&=\ob{20}}$$`,
        //     ],
        //   },
        ],
      }
    ],
  }