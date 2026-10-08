import { readFileSync, existsSync, writeFileSync, mkdtempSync, copyFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { resolve, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { execFileSync } from 'node:child_process'
import { runInNewContext } from 'node:vm'
import ts from 'typescript'

// Content stays in app/data.ts; build with Node and a local TeX installation.
const root = fileURLToPath(new URL('../', import.meta.url))
const scope = { exports: {} }
runInNewContext(ts.transpile(readFileSync(join(root, 'app/data.ts'), 'utf8'), { module: ts.ModuleKind.CommonJS }), scope)
const { PERSONAL_INFO: person, SUMMARY, EXPERIENCE, PROJECTS, PUBLICATION, SKILLS, EDUCATION } = scope.exports
const tex = value => String(value).replace(/[–—]/g, '--').replace(/[‘’]/g, "'").replace(/[“”]/g, '"').replace(/[\\&%$#_{}~^]/g, char => ({ '\\': '\\textbackslash{}', '~': '\\textasciitilde{}', '^': '\\textasciicircum{}' }[char] ?? `\\${char}`))
const link = (url, label) => `\\href{${tex(url)}}{${tex(label)}}`
const role = entry => `\\textbf{${tex(entry.position)}} \\hfill ${tex(entry.period)} \\\\\n{\\small ${tex(entry.companies.map(company => company.name).join(' / '))}}`
const bullets = entries => `\\begin{itemize}\n${entries.map(entry => `\\item ${tex(entry)}`).join('\n')}\n\\end{itemize}`
const omni = EXPERIENCE[1]
const body = String.raw`\documentclass[10pt]{article}
\usepackage[letterpaper,top=0.4in,bottom=0.4in,left=0.5in,right=0.5in]{geometry}
\usepackage[T1]{fontenc}\usepackage[utf8]{inputenc}\usepackage{enumitem}\usepackage[hidelinks]{hyperref}\usepackage{titlesec}
\hypersetup{pdftitle={${tex(person.name)} - ${tex(person.title)}},pdfauthor={${tex(person.name)}}}
\raggedright\pagestyle{empty}\input{glyphtounicode}\pdfgentounicode=1
\titleformat{\section}{\bfseries\large}{}{0pt}{}[\vspace{1pt}\titlerule]
\titlespacing*{\section}{0pt}{8pt}{5pt}\setlist[itemize]{itemsep=1pt,leftmargin=12pt,topsep=4pt,parsep=0pt}
\begin{document}
\begin{center}{\LARGE\textbf{${tex(person.name)}}}\\[4pt]${link(`mailto:${person.email}`, person.email)} $|$ ${tex(person.location)} $|$ ${link(person.linkedin.url, 'LinkedIn')} $|$ ${link(person.github.url, 'GitHub')} $|$ ${link(person.website.url, person.website.display)}\end{center}
\vspace{-8pt}\section*{Summary}
${tex(SUMMARY)}
\section*{Experience}
${role(EXPERIENCE[0])}
${bullets(EXPERIENCE[0].description.map(entry => `${entry.short}. ${entry.full}`))}
${role(omni)}
${bullets([0, 1, 3, 6, 8, 9].map(index => `${omni.description[index].short}. ${omni.description[index].full}`))}
${role(EXPERIENCE[2])}
${bullets(EXPERIENCE[2].description.map(entry => entry.full))}
\section*{Open Source \& Projects}
${PROJECTS.slice(0, 4).map(project => `\\textbf{${link(project.url, project.title)}} -- ${tex(project.description.split('. ')[0] + '.')} \\\\[3pt]`).join('\n')}
\section*{Skills \& Certifications}
${Object.values(SKILLS).map(skill => `\\textbf{${tex(skill.label)}:} ${tex(skill.items.join(', '))} \\\\`).join('\n')}
\section*{Publication}
\textbf{${tex(PUBLICATION.title)}} -- ${tex(PUBLICATION.venue)} \\
${tex(PUBLICATION.description)} ${link(PUBLICATION.doiUrl, `DOI: ${PUBLICATION.doi}`)}
\section*{Education}
${EDUCATION.map(entry => `\\textbf{${tex(entry.institution)}} -- ${tex(entry.degree)} \\hfill ${tex(entry.period)}`).join('\n')}
\end{document}`
const temp = mkdtempSync(join(tmpdir(), 'portfolio-cv-'))
const compiler = process.env.PDFLATEX || (existsSync('/Library/TeX/texbin/pdflatex') ? '/Library/TeX/texbin/pdflatex' : 'pdflatex')
try { writeFileSync(join(temp, 'cv.tex'), body); execFileSync(compiler, ['-interaction=nonstopmode', '-halt-on-error', '-output-directory', temp, join(temp, 'cv.tex')], { cwd: root, stdio: 'pipe' }); copyFileSync(join(temp, 'cv.pdf'), resolve(root, 'public/cv.pdf')); console.log('Built public/cv.pdf from app/data.ts') } finally { rmSync(temp, { recursive: true, force: true }) }
