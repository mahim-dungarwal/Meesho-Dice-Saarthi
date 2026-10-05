# Meesho Saarthi — AI Commerce Manager

**A conversational companion for manufacturer onboarding and business growth.**

Meesho Saarthi (MEESHO सारथी) is a Meesho DICE challenge concept prototype that demonstrates how a WhatsApp-style assistant can guide manufacturers through onboarding, product discovery, pricing, business monitoring and returns management.

[Live prototype](https://meesho-sahayak.vercel.app/) · [GitHub repository](https://github.com/mahim-dungarwal/Meesho-Dice-Saarthi)

> **Demo status:** This is a browser-based concept, not a connected WhatsApp bot or official Meesho service. The inspected frontend uses scripted conversations, illustrative business data and a simulated onboarding flow. It does not demonstrate live seller-account verification, marketplace access or autonomous commerce actions.

## Frontend preview

![Meesho Saarthi welcome screen with six conversation options](docs/images/saarthi-frontend.jpg)

*The live prototype presents a mobile-width chat interface with Hindi/Hinglish messages, quick replies, typing indicators and contextual business cards.*

<details>
<summary>View the illustrative Business Pulse screen</summary>

![Saarthi Business Pulse card with illustrative metrics and recommended action](docs/images/saarthi-business-pulse.jpg)

</details>

## Contents

- [Project overview](#project-overview)
- [Core features](#core-features)
- [Demo walkthrough](#demo-walkthrough)
- [Demand and pricing logic](#demand-and-pricing-logic)
- [Architecture and technology](#architecture-and-technology)
- [Getting started](#getting-started)
- [Configuration and customisation](#configuration-and-customisation)
- [Data handling and verification](#data-handling-and-verification)
- [Deployment](#deployment)
- [Validation](#validation)
- [Known limitations](#known-limitations)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [Maintainers and licence](#maintainers-and-licence)

## Project overview

Manufacturers entering e-commerce face unfamiliar registration processes, product-selection decisions, pricing trade-offs and operational dashboards. Saarthi explores a conversational way to make these tasks easier to understand and act on, using a familiar chat format instead of requiring users to navigate several tools.

The wider Meesho DICE proposal supports manufacturers building a direct-to-consumer channel alongside their existing B2B business:

| Component | Proposed role | Relationship to this prototype |
| --- | --- | --- |
| **Saarthi** | Awareness, guided onboarding, first-listing support and ongoing commerce guidance through WhatsApp. | This repository's conversational frontend concept. |
| **MOR — Manufacturer Opportunity Report** | Help potential manufacturers explore product opportunity before seller onboarding. | A separate complementary prototype; no integration is demonstrated here. |
| **Project MEERA** | Provide wider fulfilment, demand-generation and operational support. | Programme context; warehouse operations are outside this frontend's scope. |

Saarthi's intended role spans five manufacturer journey stages: **Discover & Join**, **Get Ready to Sell**, **Get First Orders**, **Fulfil Orders & Handle Returns**, and **Improve & Grow**. The demo brings parts of these stages together through six conversation entry points.

## Core features

| Entry point | Demonstrated experience | Current implementation |
| --- | --- | --- |
| **Start Selling on Meesho** | Identify manufacturer/wholesaler/retailer status and existing offline/online business; present an onboarding checklist. | Scripted branching with a link to the local onboarding demo. |
| **Check Product Demand** | Show product opportunities, growth labels, competition and a recommended starting product. | Fixed illustrative category data. |
| **Find Right Selling Price** | Ask for manufacturing cost and display recommended price, estimated costs, contribution and margin. | Deterministic arithmetic using demo assumptions. |
| **Check My Business** | Display Business Pulse metrics, trend bars, product performance and recommended actions. | Fixed business and SKU fixtures. |
| **Reduce Returns / RTO** | Show a reason breakdown, affected products and suggested interventions. | Scripted diagnosis and illustrative impact estimates. |
| **Ask सारथी** | Accept a typed question and direct the user to a relevant flow. | Keyword-based routing and fallback replies; no demonstrated LLM call. |

The chat also includes message timestamps, typing animations, disabled older quick replies, automatic scrolling and **Menu → Restart Demo**.

## Demo walkthrough

### 1. Guided onboarding

1. Open the [prototype](https://meesho-sahayak.vercel.app/).
2. Choose **Start Selling on Meesho**.
3. Select **Manufacturer**, **Wholesaler** or **Retailer**.
4. Select **Mostly Offline / Distributors**, **Already sell online** or **Both**.
5. Read the onboarding checklist and choose **Continue securely**.

The separate `/secure-onboarding` page demonstrates four steps:

| Step | Fields shown |
| --- | --- |
| Mobile verification | Mobile number and OTP. |
| Business verification / eKYC | Business/legal name and PAN. |
| GST verification | GSTIN, with a skip option. |
| Bank verification | Account number and IFSC. |

**These are demonstration screens.** The inspected implementation advances through steps without verifying the values. Its completion screen links back to `/?onboarded=1`, which displays a welcome-back message and product-analysis options. That query parameter is a UI state trigger, not proof of onboarding or authentication.

Use empty fields or fictional placeholders when exploring; do not enter real KYC or bank details. The wording about encryption, verification, GST applicability and account completion illustrates an intended experience and is not evidence of a live verification service or eligibility policy.

### 2. Product demand

Choose **Check Product Demand**, then a supported category. Review illustrative product growth, competition and opportunity labels, and continue to **Calculate My Economics**.

### 3. Pricing

Choose **Find Right Selling Price**. Select ₹200, ₹250 or ₹300, or enter a numeric manufacturing cost manually. Review the Product Economics card and the **Start Pilot** demonstration.

### 4. Business monitoring and returns

Choose **Check My Business** to see Business Pulse. Continue to **See Product Performance**, **Fix RTO** or **Grow Orders**. The returns path displays a reason breakdown and suggested actions such as improving size charts or addressing delivery failures.

### 5. Typed messages and restart

Type a short question such as `check demand`, `pricing`, `business` or `rto`, then press Enter or the send button. Unrecognised messages return the main help options. Use **Menu → Restart Demo** to start again.

## Demand and pricing logic

### Demand coverage

| Category offered | Current demo coverage |
| --- | --- |
| Women Fashion | Cotton Kurtis, Co-ord Sets and Printed Sarees. |
| Home & Kitchen | Storage Organisers, Cotton Bedsheets and Non-stick Cookware. |
| Footwear | Women Ethnic Flats, Casual Sneakers and Kids Sandals. |
| Electronics, Beauty and Other | A fallback message and links to Women Fashion or pricing; no detailed demand fixture. |

Growth percentages and opportunity labels are illustrative constants, not live category research or sales forecasts.

### Illustrative product economics

For manufacturing cost `C`, the deployed frontend computes:

```text
Recommended price P = 50 × ceil(1.6 × C / 50) − 1
Estimated marketplace/logistics cost M = round(0.193 × P)
Estimated contribution = P − C − M
Estimated contribution margin = round(100 × contribution / P)
Displayed price band = [P − 50, P + 100]
```

For **₹250** manufacturing cost, the card shows **₹399** recommended price, **₹77** estimated marketplace/logistics cost, **₹72** contribution and **18%** contribution margin.

The 19.3% cost assumption is a demo heuristic, not a verified Meesho fee schedule. Contribution represents the displayed calculation, not a complete profit estimate: the model does not separately account for every packaging, return, advertising, tax or overhead cost.

The accompanying chat and pilot messages use a fixed ₹399 recommendation even when the card computes another price. The pilot message does not create a listing or start selling.

### Business and return data

The demo Business Pulse uses **124 orders**, **₹49,600 revenue**, **4.8% conversion**, **8% RTO/returns** and **12 live products**. These values are fictional fixtures, not a connected seller's results.

The return-reason breakdown is fixed at 36% size/expectation mismatch, 24% delivery failure, 18% quality mismatch, 12% address/customer unavailable and 10% other. The displayed potential reduction of 1.2–1.8 percentage points is illustrative and has not been validated. The interface combines RTO and returns under one label; a production implementation should define and track them separately.

## Architecture and technology

The deployed frontend demonstrates:

| Layer | Observed implementation |
| --- | --- |
| Application | Next.js with client-side navigation and React components. |
| Styling | Tailwind-style utility classes, theme tokens and responsive layouts. |
| Icons | Lucide icons. |
| Conversation | Scripted action-to-response routing and keyword matching. |
| State | React state and refs for messages, active replies, typing and response cancellation. |
| Business intelligence | Fixed fixtures plus a pricing calculation. |
| Hosting | Vercel. |

Quick replies select a predefined action. The conversation runner appends delayed messages or cards and activates the latest reply set. Typed messages route to the same actions through simple keyword rules. Restarting resets the conversation and cancels the previous response sequence.

The current inspected chat stores messages in memory, so refreshing starts a new conversation. No chat-history database or browser-storage persistence was observed in the inspected application logic.

**Documentation scope:** The live frontend and its publicly served application bundles were inspected. The supplied GitHub repository could not be read without authentication. Exact dependency versions, source-file layout, package scripts, environment variables, test configuration and licence must be checked against the repository before relying on them; they are not inferred from the MOR repository.

## Getting started

### Prerequisites

- Git and access to the repository.
- Node.js compatible with the repository's declared requirements.
- The package manager specified by its manifest and lockfile.

### Clone and inspect the project

```bash
git clone https://github.com/mahim-dungarwal/Meesho-Dice-Saarthi.git
cd Meesho-Dice-Saarthi
cat package.json
```

If GitHub requires authentication, use your authorised GitHub account or SSH setup. Do not put access tokens into commands or commit them to the repository.

Check `packageManager`, `engines` and `scripts` in `package.json`, then use the matching installation command:

| Repository configuration | Installation command |
| --- | --- |
| pnpm with `pnpm-lock.yaml` | `pnpm install --frozen-lockfile` |
| npm with `package-lock.json` | `npm ci` |
| Yarn | Use the declared Yarn version and its lockfile-preserving installation command. |

Run the manifest's development script using the same package manager. For example, **if a `dev` script is defined**, use `pnpm dev` or `npm run dev`, as appropriate. Open the local URL printed by the server.

Likewise, use the declared `build`, `start`, lint, type-check and test scripts where present. These script names and successful local execution have not been verified for this repository.

### Environment variables

Check the repository's `.env.example`, configuration and server/API code for required variables. The inspected client conversation does not call an LLM or WhatsApp service; do not assume OpenAI, WhatsApp, CRM or SMS credentials are required just because those integrations appear in the product vision.

## Configuration and customisation

After locating the corresponding source modules, common extension points are:

- Welcome message and demo persona; the current greeting uses **Rajesh**.
- Main quick replies, role/channel branches and keyword routing.
- Demand fixtures, category fallback responses and recommendation copy.
- Pricing assumptions and the hardcoded pilot/chat recommendation.
- Business metrics, SKU performance and return-reason fixtures.
- Chat colours, cards, spacing, wallpaper and animations.
- Onboarding field definitions, navigation and completion behaviour.

Preserve the distinction between illustrative figures and real data. Source paths are intentionally not listed because the repository tree was unavailable for verification.

## Data handling and verification

The intended design keeps sensitive KYC documents out of chat and hands users off to a suitable onboarding platform. The current link opens a page on the prototype's own domain; it is not a demonstrated production Meesho KYC integration.

The inspected onboarding frontend has no implemented OTP sending, PAN/GST/bank validation, field persistence or verification request. It advances a step counter and shows a completion state. Chat messages and demo choices also do not demonstrate seller authentication or account access.

A production release needs authenticated sessions, consent, authorised data access, secure platform handoffs, appropriate retention controls and real verification services. Do not treat the UI's verified badge or verification wording as proof that these exist.

## Deployment

The current demo is hosted at **[meesho-sahayak.vercel.app](https://meesho-sahayak.vercel.app/)**.

For a separate Vercel deployment:

1. Import the repository using an account with access.
2. Select the Next.js framework preset.
3. Set the root directory, Node.js version, package manager and build command from the repository configuration.
4. Add only environment variables required by the actual implementation.
5. Deploy and check `/`, `/secure-onboarding` and the return-to-chat experience.

Automatic deployments depend on the project's Git/Vercel configuration; that configuration has not been verified here.

## Validation

A useful manual review covers:

- All six welcome options and role/business-channel branches.
- Onboarding navigation, back/skip controls and return to chat.
- Supported demand fixtures and unsupported-category fallback.
- Pricing presets and manual costs, including consistency between cards and chat copy.
- Business Pulse, SKU performance, return diagnosis and recommendations.
- Typed-message routing and fallback behaviour.
- Disabled old reply sets and message input during bot responses.
- Restart while a response is pending.
- Small-screen layout, scrolling, keyboard interaction and readable cards.

Run any repository-defined automated checks before merging code changes. No claim is made here that local builds or tests passed; source access was unavailable.

## Known limitations

- **Scripted intelligence:** keyword matching and fixtures, rather than demonstrated LLM or live marketplace analysis.
- **Simulated onboarding:** no real OTP, seller registration or financial-account verification.
- **No autonomous actions:** pilot setup and recommendations do not create listings, change prices, send SMS or modify seller operations.
- **Placeholder controls:** call, back, emoji, attachment and camera buttons are visual controls without connected actions in the inspected chat; the empty-input microphone does not record audio.
- **Limited language handling:** Hindi/Hinglish copy does not imply comprehensive multilingual understanding; typed routing relies mainly on selected English/Hinglish keywords.
- **No durable conversation history:** the inspected chat state resets on refresh.
- **Limited demand coverage:** detailed fixtures for three categories only.
- **Illustrative economics and outcomes:** assumptions are not validated fees, forecasts or measured business improvements.

## Roadmap

Potential future work, not implemented in the inspected demo:

- Connect a real WhatsApp Business channel and multilingual assistance.
- Add secure authentication and authorised seller-platform integrations.
- Connect MOR, real onboarding handoffs and MEERA support workflows.
- Replace fixtures with authorised marketplace and seller data.
- Validate unit economics and separate RTO from post-delivery returns.
- Add safe action execution with clear user review for consequential changes.
- Implement persistent history, human escalation and operational monitoring.
- Add working catalogue/image support and voice input where appropriate.
- Build automated flow, pricing and accessibility tests.

## Contributing

Use [repository issues](https://github.com/mahim-dungarwal/Meesho-Dice-Saarthi/issues) for bugs and feature proposals, or submit a focused pull request if you have access.

1. Create a branch, such as `feat/improve-pricing-flow`.
2. Make the change and update relevant documentation.
3. Run the checks declared by the repository and applicable manual flows.
4. Describe the behaviour change, validation and remaining limitations.
5. Include screenshots for interface changes.

Do not commit credentials, real KYC data or actual seller/customer records. Keep prototype labels visible until integrations and claims are verified.

## Maintainers and licence

Repository owner: [@mahim-dungarwal](https://github.com/mahim-dungarwal).

Check the repository's `LICENSE` file for reuse terms. No licence was verified during this documentation pass, and this README does not grant redistribution permission.

Meesho and WhatsApp names are used to explain the competition concept and intended channel. This prototype is not evidence of official affiliation, platform certification or an active WhatsApp Business account.
