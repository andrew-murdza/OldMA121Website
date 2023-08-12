window.MathJax = {
    loader: { load: ['[tex]/color'] },
    tex: {
      inlineMath: [['$', '$'], ['\\(', '\\)']],
      packages: { '[+]': ['bold-chars', 'color'] },
      macros: {
        recip: ['\\frac{1}{#1}', 1],
        h: ['\\frac{#1}{2}', 1],
        eps: '\\varepsilon',
        R: '\\mathbb{R}',
        a: ['\\left\\vert #1 \\right\\vert}', 1],
        p: ['\\left( #1 \\right)', 1],
        iff: '\\Longleftrightarrow',
        b: ['\\textcolor{bluee}{#1}', 1],
        bk: ['\\textcolor{black}{#1}', 1],
        r: ['\\textcolor{redd}{#1}', 1],
        pu: ['\\textcolor{purplee}{#1}', 1],
        go: ['\\textcolor{goldd}{#1}', 1],
        pk: ['\\textcolor{pinkk}{#1}', 1],
        lb: ['\\textcolor{lightbluee}{#1}', 1],
        g: ['\\textcolor{greenn}{#1}', 1],
        o: ['\\textcolor{orangee}{#1}', 1],
        w: ['\\textcolor{white}{#1}', 1],
        gb: ['\\bbox[10px, border: 6px solid LimeGreen]{#1}',1],
        ob: ['\\bbox[10px, border: 6px solid DarkOrange]{#1}',1],
        bb: ['\\bbox[10px, border: 6px solid CornflowerBlue]{#1}',1],
        t:['\\text{#1}',1],
        bkt: ['\\bk{\\text{#1}}', 1],
        wt: ['\\w{\\text{#1}}', 1],
        ot: ['\\o{\\text{#1}}', 1],
        gt: ['\\g{\\text{#1}}', 1],
        lbt: ['\\lb{\\text{#1}}', 1],
        put: ['\\pu{\\text{#1}}', 1],
        pkt: ['\\pk{\\text{#1}}', 1],
        got: ['\\go{\\text{#1}}', 1],
        bt: ['\\b{\\text{#1}}', 1],
        rt: ['\\r{\\text{#1}}', 1],
        ga:['\\begin{gather}#1\\end{gather}',1],
        d:['\\frac{d}{dx}\\p{#1}',1],
        frac: ['\\genfrac{} {} {2} {0} {#1}{#2}', 2],
        ttip: ['\\class{tip-top}{\\mathtip{#1}{\\begin{gather}#2\\end{gather}}}', 2],
        rtip: ['\\class{tip-right}{\\mathtip{\\left.#1\\right\\}}{\\begin{gather}#2\\end{gather}}}', 2],
        ltip: ['\\class{tip-left}{\\mathtip{#1}{\\begin{gather}#2\\end{gather}}}', 2],
        btip: ['\\class{tip-bot}{\\mathtip{\\underbrace{#1}}{\\ga{#2}}}', 2],
        btipa: ['\\class{tip-bot}{\\mathtip{\\underbrace{#1}}{\\begin{aligned}#2\\end{aligned}}}', 2],
        slope:['\\frac{\\pu{#4}- \\g{#2}}{\\lb{#3} - \\r{#1}}',4],
        sf:'\\slope{x_1}{y_1}{x_2}{y_2}'
      }
    },
    chtml: {
      scale: 1,                      // global scaling factor for all expressions
      minScale: .5,                  // smallest scaling factor to use
      mtextInheritFont: true,       // true to make mtext elements use surrounding font
      merrorInheritFont: false,      // true to make merror text use surrounding font
      mtextFont: '',                 // font to use for mtext, if not inheriting (empty means use MathJax fonts)
      merrorFont: 'serif',           // font to use for merror, if not inheriting (empty means use MathJax fonts)
      unknownFamily: 'serif',        // font to use for character that aren't in MathJax's fonts
      mathmlSpacing: false,          // true for MathML spacing rules, false for TeX rules
      skipAttributes: {},            // RFDa and other attributes NOT to copy to the output
      exFactor: .5,                  // default size of ex in em units
      displayAlign: 'left',          // default for indentalign when set to 'auto'
      displayIndent: '0',             // default for indentshift when set to 'auto'
      displayOverflow: 'linebreak',
  
      linebreaks: {                  // options for when overflow is linebreak
        inline: true,                   // true for browser-based breaking of inline equations
        width: '100%',                  // a fixed size or a percentage of the container width
        lineleading: 0,                // the default lineleading in em units
        LinebreakVisitor: null,         // The LinebreakVisitor to use
      },
    },
    startup: {
      ready() {
        const { MacroMap } = MathJax._.input.tex.SymbolMap;
        const { Configuration } = MathJax._.input.tex.Configuration;
        const BaseMethods = MathJax._.input.tex.base.BaseMethods.default;
  
        // new MacroMap('bold-chars', {
        //   '=': ['Macro', String.raw`\mathrel{\vcenter{\rlap{\Rule{2ex}{3px}{0px}}\raise9px{\Rule{2ex}{3px}{0px}}}}`],
        //   '-': ['Macro', String.raw`\mathrel{\vcenter{\Rule{20px}{2px}{0px}}}`],
        //   '+': ['Macro', String.raw`\mathrel{\vcenter{\rlap{\kern7px\Rule{2px}{9px}{7px}}\Rule{16px}{2px}{0px}}}`]
        // }, BaseMethods);
  
        Configuration.create('bold-chars', { handler: { character: ['bold-chars'] } });
  
        const { TooltipData } = MathJax._.output.common.Wrappers.maction;
        TooltipData.postDelay = 10;   // delay in milliseconds
  
        MathJax.startup.defaultReady();
  
        MathJax.tex2mml(String.raw`
              \definecolor{orangee}{RGB}{237, 125, 49}
              \definecolor{redd}{RGB}{232,9,0}
              \definecolor{bluee}{RGB}{0,77,255}
              \definecolor{purplee}{RGB}{152,102,255}
              \definecolor{goldd}{RGB}{204, 153, 0}
              \definecolor{pinkk}{RGB}{244, 136, 189}
              \definecolor{lightbluee}{RGB}{0, 176, 240}
              \definecolor{greenn}{RGB}{114, 221, 0}`);
      }
    }
  };
  
  (function () {
    var script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/mathjax@4.0.0-alpha.1/es5/tex-mml-chtml.js';
    script.async = true;
    document.head.appendChild(script);
  })();
  