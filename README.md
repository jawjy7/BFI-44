# BFI-44 Profile Studio

BFI-44 Profile Studio is a web tool designed to simplify the preliminary
calculation process of the BFI-44 personality questionnaire.

## Public online version

The tool is available online and can be used directly in a web browser without
downloading any files:

[https://wo-x-six.vercel.app](https://wo-x-six.vercel.app)

The tool automates the mechanical steps that can be time-consuming and prone
to calculation errors, such as scoring items, calculating dimension scores,
computing averages and standard deviations, obtaining z-scores, assigning
levels, and creating a profile chart.

The psychological description and interpretation of the results remain fully
the responsibility of the user. The tool does not replace personal reasoning,
qualitative analysis, or critical evaluation.

## How to use the tool

1. Enter the basic information.
2. Complete the 44 questionnaire items.
3. Let the tool calculate the scores and related quantitative results.
4. Let the tool generate the profile chart.
5. Add your own description and interpretation for each dimension.
6. Add the possible **Approfondimenti e strumenti proposti**: additional
   information, observations, interviews, questionnaires, or tests that could
   help further investigate the profile.
7. If you use an AI-generated description, include your own critical evaluation
   of its adequacy and limitations.
8. Generate and export the final report as a PDF.

## Main principle

AI and automated tools may support the preliminary scoring and visualization
stages. The final description of the person must still be written, reviewed,
and evaluated by a human.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Checks

```bash
npm test
npm run build
```

## Deployment

The project can be deployed on Vercel, Netlify, or another hosting service
that supports Next.js. Once deployed, the public URL can be shared with other
users. The current public version is available at
[https://wo-x-six.vercel.app](https://wo-x-six.vercel.app).

The application does not require a database, backend, or AI API. Shared
reports use URL fragments, while local usage data is stored in the browser.
