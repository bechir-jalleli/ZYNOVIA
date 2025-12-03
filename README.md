## Inoteqia Academy Website – Project Plan

This document describes the structure and roadmap to turn this Next.js project into the best possible website for **INOTEQIA Academy**.

### 1. Current Architecture

- **Framework**: Next.js (App Router) with TypeScript and Tailwind CSS.
- **Global layout**: `layout.tsx` wraps all pages with `Header`, `Footer`, `ScrollToTop`, dark-mode via `next-themes`, and brand typography (`DM Sans`).
- **Main routes**:
  - `/` – Home page composed of multiple sections: `Hero`, `NotreVisionPage`, `Project`, `Records`, `Review`, `Specialize`, `Pricing`, `Category`, `ContactForm`.
  - `/charts` – Demo of Recharts components (currently themed around clinical analytics).
- **Key components**:
  - `components/Home/Hero` and `components/Home/Vision/Hero` – two hero variants.
  - `components/Home/Vision/page` – very rich “vision” section (market trends, future jobs, competencies, opportunities, sources, FAQ).
  - `components/Charts/*` – reusable visualization components (donut, radar, line, bar, radial progress).
  - `components/Layout/Header` and `Footer` – navigation and footer data fetched from `/api/data`.

### 2. Target Site Structure (Information Architecture)

Create a clear structure with dedicated pages instead of one very long homepage:

- **Home (`/`)**

  - Short hero (who we are, for whom, main CTA “Prendre rendez-vous” + “Découvrir nos programmes”).
  - Compact “Pourquoi l’IA maintenant ?” block with 1–2 key stats.
  - Highlight cards for 3–4 flagship programs (Collège, Lycée, Stages vacances, Clubs scolaires).
  - Key numbers and 1–2 testimonials.
  - Clear CTA section leading to `/contact`.

- **Vision / Pédagogie (`/vision` or `/notre-vision`)**

  - Move content from `components/Home/Vision/page` here.
  - Sections:
    - Notre vision & “Pont INOTEQIA” (bridge between école, technologie, emploi, parents/entreprises).
    - Tendances du marché (macro stats + chart).
    - Métiers de demain (future jobs donut + parcours élève → professionnel).
    - Compétences clés (radar chart + soft skills vs hard skills).
    - Opportunités & débouchés (bar chart + testimony + trust indicators).
    - Sources détaillées & FAQ.

- **Programmes (`/programmes`)**

  - Group existing “program-like” sections (Projects, Categories, Specialize, Pricing, Records, Review) into one page:
    - Cards per programme (Collégiens, Lycéens, Prépa concours, Clubs, Vacances).
    - For each: objectifs, contenu, format, durée, prix, prérequis.
    - Comparison table for parents to pick the right programme.
    - “Exemples de projets” section using existing `project` images.

- **Parents & Orientation (`/parents`)**

  - Explain how INOTEQIA accompagne les familles:
    - Suivi (bilans, feedback, bulletins de progression).
    - Orientation (concours blancs, simulations d’oraux, dossiers).
    - Réassurance (chiffres clés, témoignages, chiffres `AnimatedCounter`).

- **Partenariats – Écoles & Entreprises (`/partenariats`)**

  - Offres pour établissements scolaires (clubs IA, ateliers, formations enseignants).
  - Offres pour entreprises (ateliers IA jeunesse, hackathons, sponsoring).
  - Dedicated B2B contact CTA.

- **Ressources / Blog (`/ressources`)**

  - Articles courts pour parents et éducateurs (future of work, IA pour les jeunes, etc.).
  - Reuse or extend references already present in `SourcesSection`.
  - Later: plug into a CMS or MDX-based content system.

- **Contact & Rendez-vous (`/contact`)**
  - Form with fields: nom du parent, email, téléphone, âge de l’élève, niveau, programme souhaité, créneau préféré, type de rendez-vous (en ligne / sur place).
  - Reassurance about délai de réponse et étapes post-rendez-vous.

### 3. Design & UX Guidelines

- **Hero and sections**

  - Prefer the modern animated hero from `components/Home/Vision/Hero` as the base hero pattern.
  - Use one `h1` per page, then `h2` for main sections, `h3` for sub-sections.
  - Keep copy concise: 2–3 lines intros, then bullet points for clarity.

- **Brand and consistency**

  - Keep using the Tailwind theme defined in `globals.css` (`primary`, `secondary`, gradients).
  - Ensure all CTA labels are consistent (e.g. “Prendre rendez-vous”, “Découvrir nos programmes”).
  - Align the `/charts` page text to education/IA for youth instead of healthcare analytics.

- **Navigation**
  - Update `/api/data` to include new nav items:
    - Accueil, Programmes, Vision, Parents, Partenariats, Ressources, Contact.
  - Make audience-specific entries explicit (e.g. “Parents”, “Écoles & entreprises”).

### 4. Implementation Roadmap

**Step 1 – Create new routes**

- Add:
  - `src/app/vision/page.tsx`
  - `src/app/programmes/page.tsx`
  - `src/app/parents/page.tsx`
  - `src/app/partenariats/page.tsx`
  - `src/app/ressources/page.tsx`
  - `src/app/contact/page.tsx`
- Move most of the existing `NotreVisionPage` content from the home into `vision/page.tsx`, leaving on the home only a short “Vision” preview block with a “Découvrir notre vision” link.

**Step 2 – Refactor the homepage**

- Keep:
  - One hero (choose the Vision hero variant as base and simplify if needed).
  - 3–4 programme highlight cards with links to `/programmes`.
  - Short “Pourquoi l’IA maintenant ?” snippet with 1–2 stats.
  - A minimal social proof section (1 testimonial + 2–3 numbers).
  - Final CTA band pointing to `/contact`.

**Step 3 – Build the Programmes page**

- Reuse `Project`, `Category`, `Specialize`, `Pricing`, `Records`, `Review` components where appropriate.
- Organize programmes by age/niveau and standardize per-programme props:
  - `title`, `ageRange`, `level`, `format`, `duration`, `price`, `description`, `cta`.
- Add a comparison table component so parents can see differences in one view.

**Step 4 – Parents & Partenariats pages**

- For `/parents`:
  - Focus the copy on accompagnement, orientation, bénéfices concrets pour l’enfant.
  - Reuse `AnimatedCounter` stats from the Vision page for trust indicators.
- For `/partenariats`:
  - Define 2 sections: “Pour les établissements scolaires” and “Pour les entreprises”.
  - Add use cases, example interventions, and a contact CTA.

**Step 5 – Contact & backend integration**

- Implement a strong contact / booking form on `/contact`:
  - Client-side validation for required fields and email/phone format.
  - On submit, POST to an API route (e.g. `src/app/api/contact/route.ts`).
- Backend (MERN-style or Next API + MongoDB):
  - Persist leads in a `leads` collection (name, contact info, child details, programme, source).
  - Send notification email to `academy@inoteqia.com` (via a provider like SendGrid, Resend, etc.).

**Step 6 – Navigation & footer data**

- Update the `/api/data` handler so that:
  - `NavLinkData` includes the new pages.
  - `FooterLinkData` groups links logically (Programmes, Vision & pédagogie, Parents, Partenariats, Ressources, Contact).
- Ensure `Header` and `Footer` render the updated link lists correctly on desktop and mobile.

**Step 7 – SEO, performance, accessibility**

- Define per-page `metadata` (title, description, open graph) in each new route.
- Add structured data (JSON-LD) for:
  - An educational organization and local business in Tunis.
- Optimize images with proper `priority`, `sizes`, and `alt` text.
- Check keyboard navigation and ARIA attributes (forms, charts descriptions, accordions).

### 5. Next Steps for Development

- Implement Step 1 and Step 2 first (routing and homepage refactor) so the site structure is clear.
- Then fill in `/programmes`, `/vision`, and `/contact` with real content and forms.
- Finally, iterate on `/parents`, `/partenariats`, and `/ressources` as your content and partnerships grow.
