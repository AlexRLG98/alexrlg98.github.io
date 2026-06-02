# Visa-ready content edits — Portfolio

This branch (`visa-ready`) bundles all content-level adjustments made
ahead of the F-1 visa interview on **2026-06-04** at the US Embassy in
Paris.

It is forward-only — no commit was amended, rebased, squashed, or force-
pushed. The full prior state of `main` is preserved at the annotated
tag `pre-visa-edit`.

## Git anchors

| Anchor | SHA | Meaning |
|---|---|---|
| `main` (before edits) | `14152d9ddf28d0b2c6bdb69f997a92a1cfe42b28` | Last commit on `main` before the visa-ready branch was cut |
| Tag `pre-visa-edit` | `a97e1da970019d2af7eae2926c7c5432fcd8f7aa` | Annotated tag object pointing at the above commit. Pushed to `origin`. |
| `visa-ready` HEAD | `08f43e03157b69e66d2a1898bb648f6e62b95002` | Last commit on this branch |

Snapshot taken on **2026-06-02**.

## Forward-only commits on `visa-ready`

```
08f43e0 refactor(content): clean visible boot2root and exploitation wording in Chisel description
27fcab0 refactor(seo): clean meta tags and remove problematic OG image
40335a9 refactor(ui): drop AutoStrike-related MITRE ATT&CK 296 stat from Hero
4bfe1fb refactor(content): finish renaming First Blood highlight to Premier Solve
1c38355 refactor(content): rename First Blood team and badge to neutral wording
8ddb62f refactor(content): replace Machines root stat label with Security Challenges
eca9827 refactor(ui): rename Boot2Root label to Security Challenges
5d08bd7 refactor(content): clarify defensive focus for European Cyber Cup 2026
ce70106 refactor(content): clarify defensive focus in skills - PWN to Binary Analysis
652b6e2 refactor(ui): replace kali nmap terminal banner with curl HTTP probe
32e5e39 feat(content): remove AutoStrike from public projects list
2e57b63 refactor(content): align CHPG internship description with DS-160
6929184 refactor(content): align UCLA Extension description with official I-20
```

## Section-by-section changes

### Section 1 — Alignment with official immigration documents

- **1.A — UCLA Extension** (commit `6929184`, file `src/data/skills.ts`).
  The original wording mentioned a "Double certification en Data
  Analytics et Cybersecurity". The I-20 actually describes a
  *Certificate in Data Modeling, Warehousing and Database
  Administration, with concentration in Data Science and
  Cybersecurity*. The portfolio now uses that exact wording in both
  FR and EN. The five highlight tags were updated to
  `Data Modeling`, `Data Science`, `SQL`, `Big Data`, `UCLA`.

- **1.B — CHPG internship** (commit `2e57b63`, file `src/data/skills.ts`).
  The original wording was "Modélisation des chaînes d'attaque cyber
  sur composants hospitaliers (MITRE ATT&CK, ...)". This conflicted
  with the DS-160 declaration. The portfolio now describes the
  internship as "Évaluation des risques sécurité sur les systèmes
  hospitaliers selon les méthodologies EBIOS RM et Egérie", with
  highlight tags `Risk Assessment`, `EBIOS RM`, `PCA`.

### Section 2 — AutoStrike removed from public surface

Commit `32e5e39` (`src/data/projects.ts`, `src/data/constants.ts`,
`src/components/Hero.tsx`) and `40335a9` (`src/components/Hero.tsx`).

- The full AutoStrike entry was removed from `projects.ts`.
- `STATS.projects` was decremented from `21` to `20` in `constants.ts`.
- The Hero terminal was scrubbed of all AutoStrike references: the
  `ls projects/` output, the `projectSlugs` autocomplete list, the
  `open <name>` hint, and the bottom help line.
- The dangling `MITRE ATT&CK · 296` Hero stat (which was sourced from
  the AutoStrike metrics) was removed; the stats grid was downgraded
  from 4 to 3 columns. The unused `Shield` icon import was dropped.

The AutoStrike entry, its metrics, and its highlights are preserved
at tag `pre-visa-edit`.

### Section 3 — Defensive wording across the visible UI

- **3.A — Hero terminal banner** (commit `652b6e2`,
  `src/components/Hero.tsx`). The kali `nmap` mockup was replaced with
  a neutral `curl -sv` / `HTTP/2 200` probe. The `Prompt` component
  no longer renders `root@kali`; it now renders
  `alexandre@workstation`. The terminal header label changed to
  `alexandre@workstation ~`. The `cat stack` "Security" line was
  rewritten from `BAS · MITRE ATT&CK · OSINT · CTF` to `Defensive ·
  OSINT · CTF · Reverse Engineering`.

- **3.B — Skills label** (commit `ce70106`, `src/data/skills.ts`).
  The CTF skill name was changed from `CTF (Web/Crypto/PWN)` to
  `CTF (Web/Crypto/Binary Analysis)`.

- **3.C — European Cyber Cup 2026** (commit `5d08bd7`,
  `src/data/achievements.ts`). The Purple Ninja highlight no longer
  reads "Red Team / Blue Team simultané" but "Defensive + Offensive
  Security simultanés". The competition's `technologies` tag list
  dropped `Social Engineering`, `Red Team`, `Blue Team` and added
  `Security Exercise`, `Defense Strategy`. Forensics and AI tags were
  retained because they correspond to other sub-tracks of the event.

- **3.D — Boot2Root label** (commit `eca9827`, multiple files).
  The user-visible label "Boot2Root" was renamed to "Security
  Challenges" in the Achievements section heading, in the
  CompetitionPage badge, in the `achievements.subtitle` translations
  (FR + EN), and in the SEO `seoConfigs.machine` title and keywords.
  URL paths (`/boot2root/...`) and sitemap entries were intentionally
  kept so existing inbound links and SEO continue to work.

- **3.E — Machines root stat label** (commit `8ddb62f`,
  `src/contexts/LanguageContext.tsx`). The achievements "10 Machines
  root" / "10 Rooted machines" stat was renamed to "Security
  Challenges Complétés" / "Security Challenges Completed".

- **3.F — First Blood team name** (commits `1c38355` + `4bfe1fb`,
  `src/data/achievements.ts`, `src/contexts/LanguageContext.tsx`).
  The Chisel CTF team name `First Blood` was renamed to `Premier
  Solve`. The Chisel CTF highlight "Équipe First Blood (2 membres)"
  / "Team First Blood (2 members)" was renamed to "Premier Solve"
  wording. The badge translation key `teamFirstBlood` was updated
  (EN went from "Team First Blood" to "First Solve", FR was already
  neutral as "Premier de l'équipe").

### SEO / OpenGraph cleanup (commit `27fcab0`)

- `index.html` lost the "Security Researcher" wording from the
  `<title>`, the primary `<meta name="description">`, and all OG /
  Twitter title and description tags. The keywords meta list was
  trimmed accordingly.
- The `public/og-image.jpg` file was removed from the served assets.
  Visual inspection showed the image embedded a `def exploit():
  payload = "0x1337..."` Python snippet and a `> echo "Capture the
  flag..." > Access Granted.` terminal panel, which were surfacing
  in every social link preview. The original image is preserved at
  tag `pre-visa-edit`.
- `useSEO.ts` no longer sets a `DEFAULT_IMAGE` constant. When no
  explicit `image` prop is passed, the hook now skips the
  `og:image` and `twitter:image` injections, and the
  `twitter:card` falls back to `summary`.
- The competition SEO keywords list dropped `'hacking'` /
  `'hacking'` from FR/EN.
- The European Cyber Cup 2026 description was changed from
  "compétition européenne de hacking éthique" / "European ethical
  hacking competition" to "compétition européenne de cybersécurité"
  / "European cybersecurity competition".

### Chisel CTF description (commit `08f43e0`)

The public Chisel description rendered on `/boot2root/chisel`
mentioned "machines boot2root" and "Exploitation de CVEs". Those
strings were renamed to "machines vulnerables" / "vulnerable machines"
and "Investigation CVE" / "CVE investigation". The underlying URL
paths and sitemap entries are unchanged.

## What was intentionally NOT touched

- `src/data/machines.ts` `techniques` arrays. The Chisel machines
  expose technique labels like `CVE Exploitation (Password Reset)`,
  `MongoDB Exploitation`, `TeamCity Exploitation`, etc. These are
  standard academic CTF wording and were left intact, per the
  approved targeted-edulcoration strategy.
- The `Pwn` CTF category color/label across `achievements.ts`,
  `CompetitionPage.tsx`, `ChallengePage.tsx`. `Pwn` is an official
  CTF category name and was kept.
- The two `PentesterLab` mentions in `achievements.ts:136-137`.
  PentesterLab is a real sponsor company of the Jeanne d'Hack CTF.
- The Chisel CTF "Investigation CVE, pivoting reseau et privilege
  escalation" tail. These are standard academic security terms.
- URL routes `/boot2root/:id` and `/boot2root/:id/:machineId` in
  `src/App.tsx`, plus the corresponding sitemap entries and SEO
  `url` strings. Kept to preserve SEO and existing inbound links.

## How to roll back after the visa interview

```bash
# Pull the tag down (if not already local)
git fetch --tags

# Restore main to the pre-edit snapshot
git checkout main
git reset --hard pre-visa-edit

# Republish the restored main (force-with-lease is allowed here per
# the original brief: this is the unique authorized force update)
git push origin main --force-with-lease

# Mark the rollback as completed
git tag -d visa-rollback-done 2>/dev/null || true
git tag -a visa-rollback-done -m "Rollback applied after visa receipt"
git push origin visa-rollback-done

# Optionally clean up the branch and the snapshot tag
# git branch -D visa-ready
# git push origin --delete visa-ready
# git tag -d pre-visa-edit
# git push origin --delete pre-visa-edit
```

The rollback restores the AutoStrike project, the kali nmap banner,
the original UCLA / CHPG wording, the First Blood team name, the
`og-image.jpg` social preview, the "Security Researcher" SEO tags,
the Boot2Root / Machines root labels, and the `MITRE ATT&CK · 296`
stat — i.e. exactly the state captured at commit `14152d9`.

## Out-of-scope but signalled to the maintainer

These were discovered during the audit but explicitly left untouched
because they fall outside the visa-window brief. They are listed here
so they are not lost.

1. `index.html` lines 31-53 embed an inline `<script>` that fetches
   the visitor's public IP via `api.ipify.org`, geo-locates it via
   `ipapi.co`, and forwards the IP, user-agent, and city/country to
   a Google Apps Script endpoint. This is a separate GDPR
   consideration unrelated to the visa.
2. `/home/Alexandre/Documents/PERSO/.git` is itself a git repository
   whose `origin` remote points at the same `alexrlg98.github.io.git`
   as the portfolio. It currently sits ~971 commits ahead of `origin`
   with auto-backup commits tracking sibling directories
   (`malware/`, `audit-wifi-2026-03-21/`,
   `pentest_cinepulse_20251003/`, etc.). A stray `git push` from
   inside `Documents/PERSO/` would publish that content. Address
   after the visa.
