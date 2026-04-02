## **Prompt 0: Planning**

You are a local SEO expert who specializes in site architecture for service businesses. Your task: help me plan the complete site structure for a local business website before we build it. This structure will be used to create all pages, navigation, and internal linking.

\=======================================================

BUSINESS INFORMATION — TELL ME ABOUT YOUR BUSINESS

\=======================================================

BUSINESS NAME: \[Your Business Name\]

INDUSTRY: \[Your Industry \- e.g., Plumbing, HVAC, Roofing, Law, Dental\]

CITY: \[Your City\]

STATE: \[Your State\]

STATE ABBREVIATION: \[XX\]

ZIP CODE: \[XXXXX\]

PHONE NUMBER: \[Your Phone\]

EMAIL: \[Your Email\]

PRIMARY GBP CATEGORY: \[Your main Google Business Profile category \- e.g., Plumber, HVAC Contractor, Roofing Contractor\]

SECONDARY GBP CATEGORIES (if any): \[List any secondary categories from your GBP\]

SERVICES YOU OFFER: \[List ALL services you want pages for \- be comprehensive\]

SERVICE AREAS: \[List all cities/neighborhoods you serve\]

\=======================================================

YOUR TASK

\=======================================================

Based on the information above, create a complete site architecture that includes:

1. URL STRUCTURE

- Define the homepage URL using format: /\[primary-category-slug\]-\[city-slug\]-\[state-abbrev\]

- Define all page URLs following the same pattern

2. SERVICE HIERARCHY

Organize the services into a logical hierarchy:

- Secondary Categories (from GBP secondary categories or logical groupings)

- Core Services (high-value services that deserve prominent homepage placement)

- Child Services (individual services that fall under categories or core services)

- General Services (services that don't fit a category, link to homepage)

3. PAGE LIST

Provide a complete list of every page that needs to be created:

- Homepage

- Services page

- About page

- Contact page

- Secondary Category pages

- Core Service pages

- All Child Service pages

4. INTERNAL LINKING MAP

Define the linking relationships:

- What the homepage links to

- What each category/core service page links to (children)

- What each child page links back to (parent)

5. NAVIGATION STRUCTURE

- Main navigation items

- Footer links

- Any defined by the hierarchy

\=======================================================

OUTPUT FORMAT

\=======================================================

Provide the site architecture in this exact format so it can be copied into subsequent prompts:

---

SITE ARCHITECTURE FOR \[BUSINESS NAME\]

\=======================================================

BASIC INFORMATION

\=======================================================

BUSINESS NAME: \[Name\]

INDUSTRY: \[Industry\]

CITY: \[City\]

STATE: \[State\]

STATE ABBREVIATION: \[XX\]

ZIP CODE: \[XXXXX\]

PHONE NUMBER: \[Phone\]

EMAIL: \[Email\]

PRIMARY CATEGORY: \[Primary GBP Category\]

TARGET KEYWORD: \[Primary Category\] \[City\] \[State Abbrev\]

SERVICE AREAS: \[List all\]

TRUST SIGNALS: \[Suggest 4 relevant trust signals for this industry\]

LOCAL ISSUES: \[Suggest 4-5 local/regional issues relevant to this industry and location\]

\=======================================================

URL STRUCTURE

\=======================================================

HOMEPAGE: /\[url\]

MAIN PAGES:

- Services: /services

- About: /about

- Contact: /contact

SECONDARY CATEGORY PAGES:

CORE SERVICE PAGES:

\=======================================================

SERVICE HIERARCHY

\=======================================================

SECONDARY CATEGORY 1: [Category Name](http:///[url])

Category Page URL: /\[url\]

Child Services:

- [Service Name](http:///[url]) → /\[url\]

- [Service Name](http:///[url]) → /\[url\]

- [Service Name](http:///[url]) → /\[url\]

SECONDARY CATEGORY 2: [Category Name](http:///[url])

Category Page URL: /\[url\]

Child Services:

- [Service Name](http:///[url]) → /\[url\]

- [Service Name](http:///[url]) → /\[url\]

- [Service Name](http:///[url]) → /\[url\]

CORE SERVICE 1: [Service Name](http:///[url])

Core Service Page URL: /\[url\]

Child Services:

- [Service Name](http:///[url]) → /\[url\]

- [Service Name](http:///[url]) → /\[url\]

CORE SERVICE 2: [Service Name](http:///[url])

Core Service Page URL: /\[url\]

Child Services:

- [Service Name](http:///[url]) → /\[url\]

- [Service Name](http:///[url]) → /\[url\]

GENERAL SERVICES (link back to homepage):

- [Service Name](http:///[url]) → /\[url\]

- [Service Name](http:///[url]) → /\[url\]

- [Service Name](http:///[url]) → /\[url\]

\=======================================================

NAVIGATION STRUCTURE

\=======================================================

MAIN NAV:

- Home → \[homepage url\]

- Services → /services

- About Us → /about

- Contact → /contact

FOOTER LINKS:

- \[List\]

\=======================================================

INTERNAL LINKING MAP

\=======================================================

HOMEPAGE links to:

- \[List all pages homepage links to\]

SECONDARY CATEGORY 1 links to:

- \[List child pages\]

- Back to: Homepage

SECONDARY CATEGORY 2 links to:

- \[List child pages\]

- Back to: Homepage

CORE SERVICE 1 links to:

- \[List child pages\]

- Back to: Homepage

CORE SERVICE 2 links to:

- \[List child pages\]

- Back to: Homepage

CHILD PAGES link back to:

- Services under \[Category 1\] → link to \[Category 1 URL\]

- Services under \[Category 2\] → link to \[Category 2 URL\]

- Services under \[Core Service 1\] → link to \[Core Service 1 URL\]

- Services under \[Core Service 2\] → link to \[Core Service 2 URL\]

- General Services → link to Homepage

\=======================================================

PAGE COUNT SUMMARY

\=======================================================

- Homepage: 1

- Main Pages (Services, About, Contact): 3

- Secondary Category Pages: \[X\]

- Core Service Pages: \[X\]

- Child Service Pages: \[X\]

- TOTAL PAGES: \[X\]

---

Now analyze my business information and create the complete site architecture.

## **Prompt 1: Skeleton**

You are a senior web developer with 15+ years of experience building SEO-optimized local business websites. Your task: build the complete site structure and design system. This prompt is ONLY about architecture — we will add content in subsequent prompts.

\=======================================================

SITE ARCHITECTURE — PASTE FROM PROMPT 0

\=======================================================

\[PASTE YOUR COMPLETE SITE ARCHITECTURE FROM PROMPT 0 HERE\]

\=======================================================

DESIGN VARIABLES

\=======================================================

COLOR SCHEME:

- Primary: \#1E3A5F (dark blue)

- Accent: \#3B82F6 (bright blue)

- Background: \#FFFFFF (white)

- Text: \#1F2937 (dark gray)

(Adjust colors above to match your brand)

\=======================================================

IMPLEMENTATION INSTRUCTIONS

\=======================================================

1. Branding & Design

- Use BUSINESS NAME from site architecture

- Use COLOR SCHEME defined above

- Typography: Clean, trustworthy, appropriate for the industry

- Design feel: Professional but approachable local business — not corporate

2. Header

- Top bar: "Serving \[CITY\], \[STATE\] & Surrounding Areas" on left, \[PHONE NUMBER\] on right (click-to-call)

- Main header: Logo on left, navigation center, phone button on right styled as primary CTA

- Sticky header on scroll

3. Navigation

Use NAVIGATION STRUCTURE from site architecture:

- Simple and clean — no dropdowns

- All nav items link to defined URLs

4. Footer

- Phone number prominent (click-to-call)

- Address: \[CITY\], \[STATE\] \[ZIP CODE\]

- Email: \[EMAIL\]

- Service areas: List all SERVICE AREAS from architecture

- Quick links: Home, Services, About Us, Contact

- Social icons placeholder (Facebook, Google)

- © 2025 \[BUSINESS NAME\]

5. Mobile Elements

- Hamburger menu for navigation

- Floating "Call Now" button (bottom right, always visible)

- Click-to-call on all phone numbers

- Thumb-friendly button sizes

6. Page Creation

Create ALL pages listed in the site architecture:

- Homepage (URL from architecture)

- Main Pages (Services, About, Contact)

- All Secondary Category Pages

- All Core Service Pages

- All Child Service Pages listed under each category/core service

- All General Service Pages

7. Placeholder Content

Each page should display ONLY:

- The page title (e.g., "\[Service Name\] \[City\] \[State Abbrev\]")

- Text: "Content coming soon"

- The header and footer

Do NOT write actual content for any page. We will build that out in subsequent prompts.

8. Services Page Structure

On the /services page, display a complete list of links to ALL service pages, organized by category as defined in SERVICE HIERARCHY. This allows verification that all pages were created.

9. Scroll Behavior (Critical)

When navigating between pages, the browser must scroll to the top of the new page. Implement a ScrollToTop component that resets scroll position to (0, 0\) on every route change. Users must always land at the top of each page.

10. Technical Requirements

- Mobile-first responsive design

- Fast loading

- Clean semantic HTML5

- All navigation links working between pages

- Consistent header/footer across all pages

- EVERY page listed in the architecture must be created as an actual route

11. Verification

After creating the site, confirm:

- Total number of pages created matches PAGE COUNT SUMMARY from architecture

- All routes are accessible

- Navigation works correctly

- ScrollToTop is functioning

Generate the complete site structure with all pages created and navigation working. Do not add content beyond the placeholder text specified above.

Prompt 2: GBP Landing Page Content

You are an expert conversion copywriter who specializes in local service businesses. You understand that the homepage exists for ONE purpose: get the searcher to call or submit a form.

You write copy that speaks DIRECTLY to the searcher's problem and positions the business as the obvious choice — not through generic claims, but through specific proof and differentiators.

\=======================================================

SITE ARCHITECTURE — PASTE FROM PROMPT 0

\=======================================================

\[PASTE YOUR COMPLETE SITE ARCHITECTURE FROM PROMPT 0 HERE\]

\=======================================================

BUSINESS DIFFERENTIATORS — FILL IN

\=======================================================

Answer these questions with SPECIFIC, PROVABLE claims. No generic statements.

1. How many 5-star reviews do you have? \_\_\_

2. What's your average response time? \_\_\_

3. Do you offer free estimates? \_\_\_

4. Do you charge a trip fee? \_\_\_

5. Are you available 24/7 or after hours? \_\_\_

6. How long have you served this area? \_\_\_

7. Any guarantees you offer? (satisfaction, price match, warranty) \_\_\_

8. What licenses/certifications do you hold? \_\_\_

9. Are you locally owned? Family owned? \_\_\_

10. What makes you different from the 10 other companies they could call? \_\_\_

\=======================================================

GOAL COMPLETION FRAMEWORK

\=======================================================

Every section answers ONE question in the searcher's mind:

- Hero: "Can you solve my problem right now?"

- Why Choose Us: "Why should I pick YOU over everyone else?"

- Reviews: "Do other people trust you?"

- Services: "Do you handle what I specifically need?"

- FAQ: "What concerns should I have answered before calling?"

The searcher has a problem. They're scanning for PROOF you can fix it.

They don't care about your company history. They care about their problem.

\=======================================================

CONTENT TO GENERATE

\=======================================================

SECTION 1: HERO CONTENT

H1 Requirements:

- Include \[PRIMARY CATEGORY\] \+ \[CITY\] \+ \[STATE ABBREVIATION\]

- Speak to the outcome they want, not just the service

- 60-70 characters max

H1 Formula Options (pick best fit):

- "\[CITY\]'s Most Trusted \[PRIMARY CATEGORY\] | \[Key Differentiator\]"

- "\[PRIMARY CATEGORY\] in \[CITY\], \[STATE\] | \[Outcome They Want\]"

- "Need a \[PRIMARY CATEGORY\] in \[CITY\]? \[Promise\]"

Subheadline Requirements:

- Reinforce the H1 with a specific proof point or promise

- Address their immediate concern (speed, cost, trust)

- 15-20 words max

Subheadline Formula:

"\[Specific proof point\]. \[Promise\]. \[Call to action phrase\]."

Example:

H1: "Gary's Most Trusted Plumber | 500+ Five-Star Reviews"

Subheadline: "24/7 emergency service with 45-minute average response. Licensed, insured, and guaranteed. Call now."

Generate H1: \_\_\_

Generate Subheadline: \_\_\_

---

SECTION 2: WHY CHOOSE US (4 Differentiators)

These are the 4 reasons someone should call YOU instead of the next Google result.

Each needs:

- A specific, provable headline (not "Quality Service")

- 1-2 sentences explaining what it means for THEM

Requirements:

- Use numbers when possible (500+ reviews, 45-minute response, $0 trip fee)

- Focus on what THEY get, not what YOU do

- No generic claims like "experienced team" or "customer satisfaction"

GOOD Examples:

- "500+ Five-Star Reviews" → "Our customers rate us 4.9/5 stars across Google, Yelp, and Facebook. See why \[CITY\] homeowners trust us."

- "$0 Trip Charge" → "We never charge just to show up. You only pay when we do the work — and you'll know the price before we start."

- "45-Minute Average Response" → "When your \[problem\], you can't wait. We dispatch technicians from \[CITY\] so you're not waiting hours."

- "Satisfaction Guaranteed" → "Not happy? We'll make it right or you don't pay. No fine print, no hassle."

BAD Examples (never use):

- "Quality Service" — meaningless, everyone says this

- "Experienced Team" — vague, prove it instead

- "Licensed & Insured" — this is table stakes, not a differentiator (use in trust bar, not here)

- "Family Owned Since 2005" — they don't care about your history, they care about their problem

Generate 4 Differentiators:

Differentiator 1:

Headline: \_\_\_

Explanation (1-2 sentences): \_\_\_

Differentiator 2:

Headline: \_\_\_

Explanation (1-2 sentences): \_\_\_

Differentiator 3:

Headline: \_\_\_

Explanation (1-2 sentences): \_\_\_

Differentiator 4:

Headline: \_\_\_

Explanation (1-2 sentences): \_\_\_

---

SECTION 3: SECONDARY CATEGORY DESCRIPTIONS

For each SECONDARY CATEGORY in your architecture, write:

- 2-3 sentences describing the category

- Focus on problems you solve, not services you offer

- Include a natural mention of \[CITY\] or \[SERVICE AREA\]

Formula:

"\[Problem they're experiencing\]? \[How you solve it\]. \[Proof point or reassurance\]. \[Soft CTA\]."

Example for "Drain Service":

"Slow drains, backups, and sewer smells aren't just annoying — they're warning signs of bigger problems. Our Gary drain specialists use camera inspection to find the real issue and fix it right the first time. From simple clogs to main line repairs, we handle it all."

Generate for each secondary category:

---

SECTION 4: CORE SERVICE HIGHLIGHTS

For each CORE SERVICE in your architecture, write:

- 3-4 sentences that position this as a specialty

- Include specific details that show expertise

- Address common concerns (cost, time, disruption)

Formula:

"\[What the service is and why they need it\]. \[Why this is complex/important\]. \[How you handle it differently\]. \[Reassurance about process/cost/time\]."

Example for "Water Heater Replacement":

"Waking up to cold water? A failing water heater needs fast replacement before it floods your home. We stock the most popular models on our trucks for same-day installation. Our technicians will help you choose between traditional and tankless options based on your household size and budget — and we'll haul away your old unit at no extra charge."

Generate for each core service:

---

SECTION 5: ABOUT/CREDENTIALS PARAGRAPH

This is NOT a company history. This is a credibility statement.

Requirements:

- 3-4 sentences max

- Lead with what matters to THEM (local, responsive, qualified)

- Include specific credentials (licenses, certifications, years, team size)

- End with commitment/promise

Formula:

"\[Who you are in terms of local presence\]. \[Credentials that matter\]. \[What you're known for\]. \[Commitment to them\]."

Example:

"Gary Plumbing Pros is a locally owned team of licensed plumbers serving Gary and Northwest Indiana since 2015\. Our technicians are background-checked, drug-tested, and trained in the latest techniques. We've built our reputation on showing up when we say we will, charging what we quote, and leaving your home cleaner than we found it."

Generate About Paragraph: \_\_\_

---

SECTION 6: FAQ CONTENT (5-6 Questions)

Answer the questions they're thinking but not asking. Focus on:

- Cost concerns

- Timing/scheduling concerns

- Trust/legitimacy concerns

- Process questions

Requirements:

- Questions phrased as the CUSTOMER would ask them

- Answers are direct (answer first, then explain)

- Include specifics where possible

- Each answer 2-4 sentences

GOOD FAQ Examples:

- "How much does \[service\] cost?" → Direct range or "it depends" with factors explained

- "Do you charge to come out and look?" → Yes/no with explanation

- "How fast can you get here?" → Specific timeframe for normal vs emergency

- "Are your technicians background checked?" → Yes with details on your process

- "What if I'm not happy with the work?" → Your guarantee explained simply

BAD FAQ Examples (never use):

- "Why should I choose \[Company Name\]?" — too salesy, answers itself

- "What services do you offer?" — that's what the rest of the site is for

- Generic questions no one actually asks

Generate 5-6 FAQs:

Q1: \_\_\_

A1: \_\_\_

Q2: \_\_\_

A2: \_\_\_

Q3: \_\_\_

A3: \_\_\_

Q4: \_\_\_

A4: \_\_\_

Q5: \_\_\_

A5: \_\_\_

Q6 (optional): \_\_\_

A6: \_\_\_

---

SECTION 7: FINAL CTA CONTENT

A short, direct prompt to take action. Not a sales pitch.

Requirements:

- Headline: 5-8 words, action-oriented

- Subtext: 1 sentence addressing urgency or reassurance

- Phone number displayed prominently

Formula:

Headline: "\[Problem\]? \[Solution is one call away\]."

Subtext: "\[Reassurance about ease/speed/no obligation\]."

Example:

Headline: "Plumbing Emergency? We're On Our Way."

Subtext: "Available 24/7. Call now for immediate dispatch to Gary and all of Northwest Indiana."

Generate Final CTA:

Headline: \_\_\_

Subtext: \_\_\_

\=======================================================

OUTPUT FORMAT

\=======================================================

Once complete, organize all content under clear headings so it can be copied directly into Prompt 3:

HERO CONTENT:

H1: \[your H1\]

Subheadline: \[your subheadline\]

WHY CHOOSE US:

\[All 4 differentiators with headlines and explanations\]

SECONDARY CATEGORIES:

\[repeat for each\]

CORE SERVICES:

\[repeat for each\]

ABOUT PARAGRAPH:

\[your paragraph\]

FAQ:

\[All Q\&As\]

FINAL CTA:

Headline: \[your headline\]

Subtext: \[your subtext\]

\=======================================================

WHAT NOT TO WRITE

\=======================================================

- No "Welcome to \[Business Name\]" — waste of H1 space

- No company founding story in the hero area

- No "We pride ourselves on..." — show don't tell

- No generic differentiators (quality, experience, satisfaction)

- No industry jargon the homeowner won't understand

- No long paragraphs — every sentence must earn its place

- No "Contact us today for all your \[industry\] needs" — be specific

Generate all content following this framework.

## **Prompt 3: GBP Landing Page Build Out**

I found the original prompts. Now I understand what needs to happen. Looking at Zehl's homepage, here's what makes it crush goal completion:

Zehl's Goal Completion Formula:

Hero — Undefeated \+ Billions Won (immediate credibility, not years in business)

Why Hire Us — 4 concrete differentiators (Billions Won, \#1 Largest Recoveries, Undefeated, Contingency Fee)

Trust Badges — Social proof logos immediately

Lead Form — Right there, high on page

Video Testimonials — Real clients, massive wall of social proof

Then the "Do I have a case?" educational content

They lead with proof not promises. Let me rewrite Prompt 3 with this framework:

PROMPT 3: Homepage Implementation in Lovable (REVISED \- Goal Completion Focus)

You are a senior web developer implementing a homepage for a local service business website. The content has already been written — your job is to implement it with proper structure, design, and technical SEO elements that MAXIMIZE CONVERSIONS.

### \======================================================= SITE ARCHITECTURE — PASTE FROM PROMPT 0

\[PASTE YOUR COMPLETE SITE ARCHITECTURE FROM PROMPT 0 HERE\]

### \======================================================= PRE-WRITTEN CONTENT — PASTE FROM PROMPT 2

\[PASTE THE CONTENT FROM PROMPT 2 OUTPUT HERE\]

### \======================================================= CRITICAL: GOAL COMPLETION HIERARCHY

This page exists for ONE purpose: get the searcher to call or submit a form.

The section order below is MANDATORY and based on what converts:

- Social proof and credibility FIRST  
- Educational content LAST  
- Every section should answer: "Why should I choose THIS company?"

### \======================================================= SECTION ORDER (FOLLOW EXACTLY)

1. HERO SECTION (Above the Fold)

   - Professional hero background image (generate image of \[INDUSTRY\] professional at work)  
   - Dark overlay for text readability  
   - H1: Use pre-written H1 EXACTLY  
   - Subheadline: Use pre-written subheadline EXACTLY  
   - Primary CTA: Large "Call Now \[PHONE NUMBER\]" button (click-to-call)  
   - Secondary CTA: "Get Free Estimate" button  
   - Trust signals strip below CTAs: Licensed & Insured | 24/7 Emergency | Same-Day Service | \[Additional from architecture\]

2. WHY CHOOSE US (Immediately after hero)

   - Section heading: "Why \[CITY\] Homeowners Call Us First"  
   - 4 icon boxes in a row, each with:  
     - Icon  
     - Bold differentiator headline (from pre-written content)  
     - 1-2 sentence explanation  
   - These must be SPECIFIC differentiators, not generic claims  
   - Examples of GOOD: "500+ 5-Star Reviews", "Average 45-Minute Response", "$0 Trip Charge Guarantee"  
   - Examples of BAD: "Quality Service", "Experienced Team", "Customer Satisfaction"

3. GOOGLE REVIEWS EMBED

   - Section heading: "See What Our Customers Say"  
   - Placeholder div for Google Reviews embed with HTML comment:   
   - Style the container to look clean and match site design  
   - This section provides IMMEDIATE social proof high on the page

4. LEAD CAPTURE FORM

   - Section heading: "Get Your Free Estimate"  
   - Simple form: Name, Phone, Email, Service Needed (dropdown), Message  
   - Service dropdown populated from SERVICES in architecture  
   - Form should be visually prominent with contrasting background  
   - Include trust reassurance: "No obligation. Response within 1 hour during business hours."

5. SECONDARY CATEGORY CARDS

   - Section heading: Use pre-written H2 for this section  
   - Card layout for each SECONDARY CATEGORY from architecture  
   - Each card: Image, category name, brief description, "Learn More" link to category page  
   - Cards link to defined SECONDARY CATEGORY PAGES

6. CORE SERVICE HIGHLIGHTS

   - Section heading: Use pre-written H2 for this section  
   - Feature the CORE SERVICE PAGES from architecture  
   - Each with: Service name, 2-3 sentence description, "Learn More" link  
   - More prominent styling than secondary categories

7. SERVICE AREA SECTION

   - Section heading: "Proudly Serving \[CITY\] and \[STATE/REGION\]"  
   - Display SERVICE AREAS as linked text (if location pages exist) or plain text  
   - Brief paragraph about service coverage  
   - Keep this section compact — it's informational, not conversion-focused

8. ABOUT/CREDENTIALS SECTION

   - Section heading: "Your Local \[INDUSTRY\] Experts"  
   - Use pre-written about content  
   - Include space for team photo or owner photo  
   - Display any certifications, licenses, associations

9. FAQ SECTION

   - Section heading: "Common Questions"  
   - Use pre-written FAQ content  
   - Accordion style for clean presentation  
   - Include LocalBusiness FAQ schema markup

10. LOCATIONS WE SERVE (Compact, just above footer)

    - Small section, minimal styling  
    - Heading: "Locations We Serve"  
    - Link to /locations/ hub page  
    - List SERVICE AREAS as text or links  
    - This is NOT a prominent section — just navigation/SEO value

11. FINAL CTA SECTION

    - Contrasting background color  
    - Heading: "Ready to Get Started?"  
    - Phone number prominent: \[PHONE NUMBER\]  
    - "Call Now" and "Schedule Online" buttons  
    - Hours of operation if available

### \======================================================= TECHNICAL REQUIREMENTS

### SEO Meta Elements:

- ### Title: "\[TARGET KEYWORD\] | 24/7 Emergency Service | \[BUSINESS NAME\]"

- ### Meta description: "\[CITY\]'s most trusted \[PRIMARY CATEGORY\]. \[Key differentiator\]. Call \[PHONE\] for same-day service."

- ### H1: From pre-written content (use EXACTLY)

### Schema Markup:

- ### LocalBusiness schema with all NAP data

- ### Service schema for core services

- ### FAQ schema for FAQ section

### Mobile Optimization:

- ### Click-to-call on all phone numbers

- ### Form fields appropriately sized for mobile

- ### Sticky mobile CTA bar at bottom of screen

### Performance:

- ### Lazy load images below the fold

- ### Optimize hero image for fast loading

### \======================================================= VERIFICATION CHECKLIST

### Before completing, verify: □ Hero has professional background image with overlay □ "Why Choose Us" appears IMMEDIATELY after hero (not buried) □ Google Reviews embed placeholder is positioned BEFORE educational content □ Lead form is prominent and above the fold on desktop □ All phone numbers are click-to-call □ Secondary categories link to correct URLs from architecture □ Core services link to correct URLs from architecture □ "Locations We Serve" is compact and just above footer □ Mobile sticky CTA is implemented □ All schema markup is in place

### \======================================================= WHAT NOT TO DO

- Do NOT put "About Us" or company history high on the page  
- Do NOT lead with generic claims like "Quality Service Since 2005"  
- Do NOT bury the Google reviews or testimonials at the bottom  
- Do NOT make the service area section a major visual element  
- Do NOT use stock photo carousels — one strong hero image only  
- Do NOT add sections not specified above

Generate the homepage following this exact structure and hierarchy.

## **Prompt 4: Secondary Category Page Build Out**

You are a senior web developer and local SEO expert. Your task: create complete secondary category pages with content, proper structure, and internal linking. Secondary category pages link DOWN to child services and UP to the homepage.

\=======================================================

SITE ARCHITECTURE — PASTE FROM PROMPT 0

\=======================================================

\[PASTE YOUR COMPLETE SITE ARCHITECTURE FROM PROMPT 0 HERE\]

\=======================================================

IMPLEMENTATION INSTRUCTIONS

\=======================================================

Create a page for EACH Secondary Category listed in the SERVICE HIERARCHY section of the architecture.

FOR EACH SECONDARY CATEGORY PAGE:

1. SEO Meta Elements

- Title tag: "\[Category Name\] \[City\] \[State Abbrev\] | Fast, Reliable Service"

- Meta description: Compelling 150-160 characters targeting "\[Category Name\] \[City\]"

- H1: "\[Category Name\] in \[City\] \[State Abbrev\] — \[Benefit Phrase\]"

2. Hero Section

- MUST include a professional background IMAGE relevant to this category (generate appropriate image)

- Do NOT use a solid color background

- Dark overlay for text readability

- H1 displayed prominently

- Subheadline: 2-3 sentences speaking to user's problem related to this category, mentioning 24/7 and same-day service, including phone number

- "Call Now" and "Schedule Service" buttons

- Trust signals below CTAs

3. Content Structure (1,000-1,200 words per page)

OPENING PARAGRAPH (3-4 sentences):

- Focus on the USER's frustration related to this category

- Acknowledge what they've tried

- Tell them they're in the right place

- Create urgency

H2: What \[Category\] Problems Do You Have?

Write 150-200 words:

- Common problems customers experience

- Warning signs they need professional help

- Why DIY often fails

- Reference LOCAL ISSUES from architecture

H2: Our \[Category\] Services

Write 200-300 words that:

- Mentions EVERY child service listed under this category in the architecture

- Each service name must appear exactly as listed (these become links)

- Brief explanation of each service

- Written as flowing paragraphs, NOT bullet lists

H2: \[Category\] for \[City\] Homes/Businesses

Write 150-200 words:

- Specific issues in this area

- Reference SERVICE AREAS from architecture

- Why local expertise matters

H2: Why Choose Us for \[Category\]

Write 100-150 words:

- Reference TRUST SIGNALS from architecture

- Fast response, same-day service

- Upfront pricing

FINAL CTA:

- 2-3 sentences creating urgency

- Include phone number

HOMEPAGE LINK:

- Natural sentence linking back to homepage using one of the HOMEPAGE ANCHOR TEXT OPTIONS from architecture  
4. Internal Linking (Critical)

- Every child service name in content MUST be hyperlinked to its URL (from architecture)

- Include homepage link as written

- Links must be clean URLs — no anchor tags (\#)

5. Services Grid Section

After main content, add visual grid showing all child services under this category:

- Service name as heading

- 1-sentence description

- "Learn More →" link to service page

6. Schema Markup

Service schema as JSON-LD:

- @type: Service

- serviceType: \[Category Name\]

- provider: reference to LocalBusiness

- areaServed: \[CITY\], \[STATE\]

7. Scroll Behavior

- All links load destination pages at TOP

- No anchor links

8. Page Section Order

9. Hero (image, H1, subheadline, CTAs, trust signals)

10. Opening paragraph

11. H2: What Problems section

12. H2: Our Services section (with internal links)

13. H2: For \[City\] section

14. H2: Why Choose Us section

15. Services grid

16. Final CTA

17. Footer

\=======================================================

CONTENT GUIDELINES

\=======================================================

For Google:

- Category name \+ city in H1 and first paragraph

- Each child service mentioned by exact name

- Local references from architecture

For AI Systems:

- Sound like a local expert

- Natural, conversational language

- Genuinely helpful

Language:

- 5th grade reading level

- Short sentences

- Not salesy

Words to AVOID: embark, look no further, top-notch, comprehensive, delve, crucial, vital, seamless, cutting-edge, leverage, robust, game-changer, nestled, we understand, testament

\=======================================================

VERIFICATION

\=======================================================

After creating pages, confirm:

- Hero images displaying (not solid colors)

- All child service names are clickable links

- Links load pages at TOP

- Trust signals in hero

- Services grid displays

- Total secondary category pages created matches architecture

Generate all secondary category pages with content, design, and functionality as specified.

Prompt 5: Core Service Page Build Out

You are a senior web developer and local SEO expert. Your task: create complete core service pages with content, proper structure, and internal linking. Core service pages are high-value service hubs that link DOWN to related child services and UP to the homepage.

\=======================================================

SITE ARCHITECTURE — PASTE FROM PROMPT 0

\=======================================================

\[PASTE YOUR COMPLETE SITE ARCHITECTURE FROM PROMPT 0 HERE\]

\=======================================================

IMPLEMENTATION INSTRUCTIONS

\=======================================================

Create a page for EACH Core Service listed in the SERVICE HIERARCHY section of the architecture.

FOR EACH CORE SERVICE PAGE:

1. SEO Meta Elements

- Title tag: "\[Service Name\] \[City\] \[State Abbrev\] | Same-Day Service Available"

- Meta description: Compelling 150-160 characters emphasizing fast resolution

- H1: "\[Service Name\] in \[City\] \[State Abbrev\] — \[Urgency/Benefit Phrase\]"

2. Hero Section

- MUST include a professional background IMAGE relevant to this service (generate appropriate image)

- Do NOT use a solid color background

- Dark overlay for text readability

- H1 displayed prominently

- Subheadline: 2-3 sentences speaking to user's crisis/urgent situation, emphasizing speed, including phone number

- "Call Now" and "Schedule Service" buttons

- Trust signals below CTAs

3. Content Structure (1,000-1,200 words per page)

OPENING PARAGRAPH (3-4 sentences):

- Focus on the USER's urgent situation

- Acknowledge the disruption to their life

- Tell them how fast you can solve it

- This isn't a "wait and see" problem

H2: Signs You Need \[Service Name\]

Write 150-200 words:

- Warning signs that indicate need for this service

- What these signs mean

- Why waiting makes it worse/more expensive

- When repair vs replacement makes sense

H2: Our \[Service Name\] Options

Write 200-300 words that:

- Explains the main service process

- Mentions EVERY child service listed under this core service in the architecture

- Each service name must appear exactly as listed (these become links)

- Explains when someone would choose each option

- Written as flowing paragraphs, NOT bullet lists

H2: \[Service Name\] for \[City\] Homes/Businesses

Write 150-200 words:

- Why this service is relevant to this area

- Reference LOCAL ISSUES from architecture

- Reference SERVICE AREAS from architecture

- Local factors that affect this service

H2: What to Expect

Write 100-150 words:

- What happens when they call

- How you diagnose/assess

- Timeline from call to completion

- Upfront pricing

H2: Why Choose Us for \[Service Name\]

Write 100-150 words:

- Reference TRUST SIGNALS from architecture

- Same-day service emphasis

- Upfront pricing

- Confident and reassuring tone

FINAL CTA:

- 2-3 sentences creating urgency specific to this service

- Include phone number

- Emphasize speed

HOMEPAGE LINK:

- Natural sentence linking back to homepage using HOMEPAGE ANCHOR TEXT OPTIONS from architecture  
4. Internal Linking (Critical)

- Every child service name in content MUST be hyperlinked to its URL (from architecture)

- If architecture shows link to related Secondary Category, include that link

- Include homepage link as written

- Links must be clean URLs — no anchor tags (\#)

5. Related Services Grid

After main content, add visual grid showing child services under this core service:

- Service name as heading

- 1-sentence description

- "Learn More →" link to service page

6. Schema Markup

Service schema as JSON-LD:

- @type: Service

- serviceType: \[Service Name\]

- provider: reference to LocalBusiness

- areaServed: \[CITY\], \[STATE\]

7. Scroll Behavior

- All links load destination pages at TOP

- No anchor links

8. Page Section Order

9. Hero (image, H1, subheadline, CTAs, trust signals)

10. Opening paragraph

11. H2: Signs You Need section

12. H2: Our Options section (with internal links)

13. H2: For \[City\] section

14. H2: What to Expect section

15. H2: Why Choose Us section

16. Related services grid

17. Final CTA

18. Footer

\=======================================================

CONTENT GUIDELINES

\=======================================================

For Google:

- Service name \+ city in H1 and first paragraph

- Each child service mentioned by exact name

- Local references from architecture

For AI Systems:

- Sound like a local expert

- Natural, conversational language

- Genuinely helpful

Language:

- 5th grade reading level

- Short sentences

- Confident and reassuring, not salesy

Words to AVOID: embark, look no further, top-notch, comprehensive, delve, crucial, vital, seamless, cutting-edge, leverage, robust, game-changer, nestled, we understand, testament, state-of-the-art

\=======================================================

VERIFICATION

\=======================================================

After creating pages, confirm:

- Hero images displaying (not solid colors)

- All child service names are clickable links

- Links load pages at TOP

- Trust signals in hero

- Related services grid displays

- Total core service pages created matches architecture

Generate all core service pages with content, design, and functionality as specified.

## **Prompt 6: Service Page Build Out**

You are a senior web developer and local SEO expert. Your task: create the Services hub page and all child service pages. The Services page is a navigation hub. Child service pages link back UP to their parent page.

\=======================================================

SITE ARCHITECTURE — PASTE FROM PROMPT 0

\=======================================================

\[PASTE YOUR COMPLETE SITE ARCHITECTURE FROM PROMPT 0 HERE\]

\=======================================================

PART 1: SERVICES PAGE

\=======================================================

PAGE URL: /services

1. SEO Meta Elements

- Title tag: "\[INDUSTRY\] Services \[City\] \[State Abbrev\] | Complete Service List"

- Meta description: "Full list of \[INDUSTRY\] services in \[CITY\] \[STATE ABBREV\]. \[Mention 3-4 service types\]. Licensed professionals, same-day service."

- H1: "\[INDUSTRY\] Services in \[City\] \[State Abbrev\] — Full-Service \[PRIMARY CATEGORY\] for Every Job"

2. Hero Section

- Clean hero (solid color or subtle image acceptable here)

- H1 displayed prominently

- Subheadline: "Find the service you need or call us — we'll figure it out together."

- Phone number and "Call Now" button

- Trust signals below

3. Opening Paragraph

3-4 sentences:

- Acknowledge user is looking for specific service

- Assure them you handle everything

- Mention 24/7 and same-day service

- Include phone number

4. Service Sections

Create a section for each grouping in SERVICE HIERARCHY from architecture:

For each Secondary Category:

- H2: \[Category Name\] (linked to category page URL)

- Grid of cards for each child service under this category

- Each card: Service name, 1-sentence description, link to page

For each Core Service:

- H2: \[Service Name\] (linked to core service page URL)

- Grid of cards for each child service under this core service

- Each card: Service name, 1-sentence description, link to page

For General Services:

- H2: "General \[INDUSTRY\] Services"

- Grid of cards for each general service

- Each card: Service name, 1-sentence description, link to page

5. Final CTA

- "Not Sure What You Need?"

- "Call us at \[PHONE NUMBER\] — we'll diagnose the problem and recommend the right solution."

- Call Now button

\=======================================================

PART 2: CHILD SERVICE PAGES

\=======================================================

Create individual pages for EVERY child service listed in SERVICE HIERARCHY (under Secondary Categories, Core Services, and General Services).

FOR EACH CHILD SERVICE PAGE:

1. URL

Use the URL defined in the architecture for each service.

2. SEO Meta Elements

- Title tag: "\[Service Name\] \[City\] \[State Abbrev\] | Fast, Professional Service"

- Meta description: 150-160 characters describing this service

- H1: "\[Service Name\] in \[City\] \[State Abbrev\] — \[Benefit Phrase\]"

3. Hero Section

- MUST include professional background IMAGE relevant to this service (generate appropriate image)

- Do NOT use solid color background

- Dark overlay for readability

- H1 displayed prominently

- Subheadline: 1-2 sentences about when someone needs this service

- "Call Now" and "Schedule Service" buttons

- Trust signals below CTAs

4. Content Structure (600-800 words per page)

OPENING PARAGRAPH (3-4 sentences):

- Speak to user's specific problem

- Acknowledge their situation

- Tell them you can solve it quickly

H2: When You Need \[Service Name\]

Write 100-150 words:

- Signs/situations requiring this service

- Why not to wait

- Common causes

H2: Our \[Service Name\] Process

Write 100-150 words:

- How you perform this service

- What customer can expect

- Timeline

H2: \[Service Name\] Cost in \[City\]

Write 75-100 words:

- Factors affecting pricing

- Upfront quotes commitment

- No hidden fees

- Do NOT list specific prices

H2: Why Choose Us

Write 75-100 words:

- Trust signals

- Same-day service

- Satisfaction guaranteed

- Local expertise

FINAL CTA:

- 2-3 sentences driving action

- Phone number

PARENT PAGE LINK (Critical):

Natural sentence linking back to the PARENT page as defined in INTERNAL LINKING MAP:

- If under Secondary Category → link to that category page

- If under Core Service → link to that core service page

- If under General Services → link to homepage

5. Schema Markup

Service schema as JSON-LD:

- @type: Service

- serviceType: \[Service Name\]

- provider: reference to LocalBusiness

- areaServed: \[CITY\], \[STATE\]

6. Design Requirements

- Hero image required

- Match site design style

- Mobile responsive

- Click-to-call on phone numbers

7. Page Section Order

8. Hero (image, H1, subheadline, CTAs, trust signals)

9. Opening paragraph

10. H2: When You Need section

11. H2: Our Process section

12. H2: Cost section

13. H2: Why Choose Us section

14. Final CTA with parent link

15. Footer

\=======================================================

CONTENT GUIDELINES FOR ALL PAGES

\=======================================================

For Google:

- Service name \+ city in H1 and first paragraph

- Local references where natural

- Proper heading hierarchy

For AI Systems:

- Sound like local expert

- Natural language

- Genuinely helpful

Language:

- 5th grade reading level

- Short sentences

- Not salesy

Words to AVOID: embark, look no further, top-notch, comprehensive, delve, crucial, vital, seamless, cutting-edge, leverage, robust, game-changer, nestled, we understand, testament

\=======================================================

SCROLL BEHAVIOR

\=======================================================

All internal links must load destination pages at TOP. No anchor links.

\=======================================================

VERIFICATION

\=======================================================

After creating all pages, confirm:

- Services page displays all services organized by category

- All category/service headings link to their pages

- All service cards link to individual pages

- Every child page has:

- Hero image (not solid color)

- H1 with service name \+ city

- Link back to correct parent page

- Schema markup

- All links load pages at TOP

- Total pages created matches PAGE COUNT SUMMARY from architecture

Generate the Services page and all child service pages as specified.

## **Prompt 7: About and Contact Page Build Out**

You are a senior web developer and local SEO expert. Your task: create the About Us and Contact pages. The About page establishes E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness) with Google. The Contact page provides clear ways to reach the business.

\=======================================================

SITE ARCHITECTURE — PASTE FROM PROMPT 0

\=======================================================

\[PASTE YOUR COMPLETE SITE ARCHITECTURE FROM PROMPT 0 HERE\]

\=======================================================

PART 1: ABOUT PAGE

\=======================================================

PAGE URL: /about

PURPOSE:

The About page establishes credibility with both Google and users. It proves real people run this business. This is critical for E-E-A-T signals.

1. SEO Meta Elements

- Title tag: "About \[BUSINESS NAME\] | \[City\] \[State Abbrev\] \[PRIMARY CATEGORY\]"

- Meta description: "Meet the team at \[BUSINESS NAME\]. Locally owned \[INDUSTRY\] serving \[CITY\] and surrounding areas. Licensed, insured, and committed to quality service."

- H1: "About \[BUSINESS NAME\] — Your Local \[City\] \[PRIMARY CATEGORY\]"

2. Hero Section

- Clean hero (solid color or subtle image acceptable)

- H1 displayed prominently

- Subheadline: "Locally owned. Professionally trained. Here when you need us."

- Phone number and "Call Now" button

3. Content Sections

SECTION: Our Story

- Placeholder heading: "How \[BUSINESS NAME\] Got Started"

- Placeholder text: 

- This section should be 150-200 words when filled in

- Include space for 1-2 images

SECTION: Meet the Owner / Meet the Team

- Placeholder heading: "Meet \[Owner Name\]" or "Meet Our Team"

- Author bio box format:

- Placeholder for professional headshot

- Name and title

- Credentials and licenses held

- Years of experience

- Brief professional background (3-4 sentences)

- Placeholder text: 

- If multiple team members, create space for 2-3 bio boxes

SECTION: Video Introduction (Optional but Recommended)

- Placeholder: 

- Text: "Watch \[Owner Name\] introduce \[BUSINESS NAME\]"

SECTION: Our Service Area

- Heading: "Proudly Serving \[CITY\] and Surrounding Areas"

- List all SERVICE AREAS from architecture

- Brief paragraph about response times and coverage

SECTION: Credentials & Trust

- Heading: "Licensed, Insured, and Guaranteed"

- Display TRUST SIGNALS from architecture with icons

- Placeholders for:

- License numbers: 

- Insurance information: 

- Certifications: 

- Years in business: 

SECTION: Google Business Profile

- Heading: "Find Us on Google"

- Placeholder: 

SECTION: Connect With Us

- Heading: "Follow Us"

- Social media icon links (placeholders):

- Facebook: 

- Google Business Profile: 

- LinkedIn: 

- Instagram: 

- Note: 

4. Schema Markup

Add LocalBusiness schema (if not already on homepage) or Organization schema:

- @type: LocalBusiness or Organization

- name: \[BUSINESS NAME\]

- address: \[CITY\], \[STATE\] \[ZIP CODE\]

- telephone: \[PHONE NUMBER\]

- email: \[EMAIL\]

- areaServed: \[SERVICE AREAS\]

- founder or employee: (placeholder for owner info)

5. Design Requirements

- Professional, trustworthy appearance

- Space for real photos (not stock)

- Clean typography

- Mobile responsive

6. Page Section Order

7. Hero (H1, subheadline, phone)

8. Our Story

9. Meet the Owner/Team

10. Video Introduction placeholder

11. Service Area

12. Credentials & Trust

13. Google Business Profile embed

14. Social Media links

15. Footer

\=======================================================

PART 2: CONTACT PAGE

\=======================================================

PAGE URL: /contact

PURPOSE:

Make it easy for customers to reach you. Provide multiple contact methods. Reinforce trust.

1. SEO Meta Elements

- Title tag: "Contact \[BUSINESS NAME\] | \[City\] \[State Abbrev\] \[PRIMARY CATEGORY\]"

- Meta description: "Contact \[BUSINESS NAME\] for \[INDUSTRY\] service in \[CITY\]. Call \[PHONE NUMBER\] for same-day service. Licensed and insured."

- H1: "Contact \[BUSINESS NAME\]"

2. Hero Section

- Clean hero

- H1 displayed prominently

- Subheadline: "Ready to help. Call now or send us a message."

- Large phone number (click-to-call)

- Trust signals below

3. Content Layout (Two Column on Desktop)

LEFT COLUMN: Contact Information

Phone Section:

- Heading: "Call Us"

- \[PHONE NUMBER\] — large, click-to-call

- "Available 24/7 for emergencies" (or appropriate hours)

Email Section:

- Heading: "Email Us"

- \[EMAIL\] — clickable mailto link

- "We respond within 24 hours"

Address Section:

- Heading: "Our Location"

- \[CITY\], \[STATE\] \[ZIP CODE\]

- Note: 

Hours Section:

- Heading: "Hours"

- Placeholder:

RIGHT COLUMN: Contact Form

Form Fields:

- Name (required)

- Phone (required)

- Email (required)

- Service Needed (dropdown with options from SERVICE HIERARCHY — Secondary Categories, Core Services, and "Other/Not Sure")

- Message (textarea)

- Submit button: "Request Service" or "Send Message"

Form Note:

- "Prefer to talk? Call us at \[PHONE NUMBER\] for immediate assistance."  
4. Service Area Section

- Heading: "Areas We Serve"

- List all SERVICE AREAS from architecture

- Brief note: "Not sure if we serve your area? Call us — we'll let you know."

5. Map Section

- Heading: "Find Us"

- Google Maps embed placeholder: 

- If service-area business, can show general coverage area or city center

6. Trust Reinforcement

- Small section with TRUST SIGNALS from architecture

- "Licensed & Insured • Same-Day Service • Satisfaction Guaranteed"

7. Schema Markup

ContactPage schema or LocalBusiness with contact details:

- @type: ContactPage

- mainEntity: reference to LocalBusiness

- Include telephone, email, address

8. Design Requirements

- Phone number very prominent

- Form easy to use on mobile

- Clean, uncluttered layout

- Fast loading

9. Page Section Order

10. Hero (H1, subheadline, phone, trust signals)

11. Two-column layout (Contact Info | Form)

12. Service Areas

13. Map embed

14. Trust reinforcement

15. Footer

\=======================================================

FORM FUNCTIONALITY

\=======================================================

Contact form should:

- Validate required fields before submission

- Show success message after submission

- Placeholder for form submission handling: 

\=======================================================

SCROLL BEHAVIOR

\=======================================================

All internal links load destination pages at TOP.

\=======================================================

VERIFICATION

\=======================================================

After creating both pages, confirm:

About Page:

- All placeholder sections present

- Space for owner/team photos

- Social media links section

- GBP embed placeholder

- Schema markup in place

Contact Page:

- Phone number prominent and click-to-call

- Contact form functional

- Service dropdown includes services from architecture

- Map embed placeholder

- All contact methods displayed

Generate the About and Contact pages as specified.

## **Prompt 8: Technical SEO Implementation**

You are a senior web developer and technical SEO specialist. Your task: implement final technical SEO elements, verify everything is correctly set up, and ensure the site is ready for indexing.

### \======================================================= SITE ARCHITECTURE — PASTE FROM PROMPT 0

### \[PASTE YOUR COMPLETE SITE ARCHITECTURE FROM PROMPT 0 HERE\]

### \======================================================= PART 1: SITEMAP.XML

### Create a sitemap.xml file that includes ALL pages on the site.

### Structure:

- ### Use proper XML sitemap format

- ### Include lastmod date (use current date)

- ### Set priority levels:

  - ### Homepage: 1.0

  - ### Secondary Category pages: 0.8

  - ### Core Service pages: 0.8

  - ### Services page: 0.7

  - ### Child Service pages: 0.6

  - ### About page: 0.5

  - ### Contact page: 0.5

- ### Include changefreq: monthly for most pages, weekly for homepage

### Pages to include (from architecture):

- ### Homepage URL

- ### /services

- ### /about

- ### /contact

- ### All Secondary Category page URLs

- ### All Core Service page URLs

- ### All Child Service page URLs (under each category, core service, and general services)

### Verify total page count matches PAGE COUNT SUMMARY from architecture.

### \======================================================= PART 2: ROBOTS.TXT

### Create a robots.txt file that:

- ### Allows all search engines to crawl all pages

- ### Points to sitemap location

- ### Blocks any admin, backend, or system routes if they exist

### Format: User-agent: \* Allow: / Sitemap: https://\[yourdomain.com\]/sitemap.xml

### Block system/admin routes if applicable Disallow: /admin/ Disallow: /api/

### \======================================================= PART 3: SCHEMA VERIFICATION

### Review all pages and verify schema markup is correctly implemented:

### HOMEPAGE should have:

- ### LocalBusiness schema with:

  - ### @type: \[Appropriate type for PRIMARY CATEGORY\]

  - ### name: \[BUSINESS NAME\]

  - ### address (streetAddress, addressLocality, addressRegion, postalCode)

  - ### telephone: \[PHONE NUMBER\]

  - ### email: \[EMAIL\]

  - ### url: homepage URL

  - ### areaServed: \[SERVICE AREAS\]

  - ### priceRange: "$$"

  - ### openingHours (if defined)

  - ### sameAs: \[social media URLs when added\]

- ### Service schema for primary service

### SECONDARY CATEGORY PAGES should have:

- ### Service schema with:

  - ### @type: Service

  - ### serviceType: \[Category Name\]

  - ### provider: reference to LocalBusiness

  - ### areaServed: \[CITY\], \[STATE\]

  - ### description: brief service description

### CORE SERVICE PAGES should have:

- ### Service schema with:

  - ### @type: Service

  - ### serviceType: \[Service Name\]

  - ### provider: reference to LocalBusiness

  - ### areaServed: \[CITY\], \[STATE\]

  - ### description: brief service description

### CHILD SERVICE PAGES should have:

- ### Service schema with:

  - ### @type: Service

  - ### serviceType: \[Service Name\]

  - ### provider: reference to LocalBusiness

  - ### areaServed: \[CITY\], \[STATE\]

### ABOUT PAGE should have:

- ### LocalBusiness or Organization schema

- ### Person schema for owner/team members (when real info added)

### CONTACT PAGE should have:

- ### ContactPage schema or LocalBusiness with contact details

### Ensure all schema:

- ### Is valid JSON-LD format

- ### Is placed in the of each page

- ### Has consistent business information across all pages

- ### Uses the same @id reference for LocalBusiness throughout

### \======================================================= PART 4: META TAG VERIFICATION

### Verify every page has:

### Title Tags:

- ### Present and unique on each page

- ### Under 60 characters

- ### Includes primary keyword for that page

- ### Includes city/state where appropriate

- ### Format is consistent across site

### Meta Descriptions:

- ### Present and unique on each page

- ### Under 160 characters

- ### Compelling and includes call to action

- ### Includes primary keyword naturally

### H1 Tags:

- ### Every page has exactly ONE H1 tag

- ### H1 includes page's target keyword

- ### H1 matches the page's purpose

### Heading Hierarchy:

- ### Proper structure: H1 → H2 → H3 (no skipping levels)

- ### H2s used for main sections

- ### No pages with multiple H1s

### \======================================================= PART 5: INTERNAL LINK AUDIT

### Verify the linking structure matches INTERNAL LINKING MAP from architecture:

### HOMEPAGE links to:

- ### All Secondary Category pages (via H2 sections)

- ### All Core Service pages (via H2 sections)

- ### Services page (via "View All Services" link)

- ### About page (via navigation)

- ### Contact page (via navigation)

### SECONDARY CATEGORY PAGES link to:

- ### All child services listed under that category

- ### Homepage (via natural anchor text in content)

### CORE SERVICE PAGES link to:

- ### All child services listed under that core service

- ### Related secondary category if defined in architecture

- ### Homepage (via natural anchor text in content)

### CHILD SERVICE PAGES link to:

- ### Their parent page (category, core service, or homepage for general services)

- ### As defined in INTERNAL LINKING MAP

### SERVICES PAGE links to:

- ### All Secondary Category pages (via H2 headings)

- ### All Core Service pages (via H2 headings)

- ### All Child Service pages (via cards)

### ALL PAGES link to:

- ### Homepage (via logo and navigation)

- ### Services, About, Contact (via navigation)

### Verify:

- ### No broken internal links (404s)

- ### No orphan pages (pages with no internal links pointing to them)

- ### All links use clean URLs (no anchor tags \# unless intentional)

- ### All links load destination page at TOP (ScrollToTop working)

### \======================================================= PART 6: MOBILE OPTIMIZATION

### Verify on all pages:

### Click-to-Call:

- ### All phone numbers are clickable tel: links

- ### Phone numbers work on mobile devices

### Mobile Navigation:

- ### Hamburger menu functions correctly

- ### All menu items accessible

- ### Menu closes after selection

### Floating CTA:

- ### "Call Now" floating button visible on mobile

- ### Positioned bottom right

- ### Doesn't obstruct content

- ### Links to tel: number

### Touch Targets:

- ### All buttons minimum 44x44 pixels

- ### Adequate spacing between clickable elements

- ### Forms easy to use on mobile

### Responsive Design:

- ### No horizontal scroll on any page

- ### Text readable without zooming

- ### Images scale properly

- ### Layout adapts to screen sizes

### \======================================================= PART 7: PAGE SPEED ELEMENTS

### Verify/implement:

### Images:

- ### All images compressed/optimized

- ### Images use modern formats where possible (WebP)

- ### Images have width and height attributes

- ### Lazy loading on images below the fold

- ### Alt text on all images

### Code:

- ### CSS and JS minified

- ### No render-blocking resources where avoidable

- ### Clean, efficient code

### Performance:

- ### Target Lighthouse score of 80+ on mobile

- ### No excessive third-party scripts

### \======================================================= PART 8: 404 PAGE

### Create a custom 404 error page that:

### Design:

- ### Matches site design (header, footer, colors)

- ### Friendly, helpful message

- ### Not generic server error page

### Content:

- ### Heading: "Page Not Found" or "Oops\! That page doesn't exist."

- ### Brief message: "The page you're looking for may have moved or doesn't exist."

- ### Helpful options:

  - ### Link to Homepage

  - ### Link to Services page

  - ### Phone number with "Or call us directly"

- ### Search box (optional)

### Do not:

- ### Show technical error codes prominently

- ### Leave user stranded with no navigation

### \======================================================= PART 9: ADDITIONAL TECHNICAL ELEMENTS

### Canonical Tags:

- ### Every page has a self-referencing canonical tag

- ### Format: 

- ### Prevents duplicate content issues

### Favicon:

- ### Favicon present

- ### Shows in browser tab

- ### Placeholder if not provided: 

### Open Graph Tags (for social sharing):

- ### og:title

- ### og:description

- ### og:image (placeholder if needed)

- ### og:url

- ### og:type: website

### Language:

- ### on all pages 

### Viewport:

- ### 

### \======================================================= PART 10: FINAL VERIFICATION CHECKLIST

### Run through this checklist and confirm each item:

### Site Structure: \[ \] Total pages created matches PAGE COUNT SUMMARY from architecture \[ \] All pages accessible via navigation or internal links \[ \] No orphan pages \[ \] No broken links

### Technical SEO: \[ \] sitemap.xml created with all pages \[ \] robots.txt created and properly configured \[ \] Schema markup on all pages (valid JSON-LD) \[ \] Meta titles unique and under 60 characters \[ \] Meta descriptions unique and under 160 characters \[ \] One H1 per page \[ \] Proper heading hierarchy throughout

### Internal Linking: \[ \] Homepage links to category and core service pages \[ \] Category/core service pages link to child pages \[ \] Child pages link back to correct parent \[ \] All links load pages at TOP (no scroll issues) \[ \] No anchor tags (\#) in internal links unless intentional

### Mobile: \[ \] Click-to-call working on all phone numbers \[ \] Mobile navigation working \[ \] Floating "Call Now" button visible \[ \] No horizontal scroll \[ \] Touch targets adequate size

### Performance: \[ \] Images optimized \[ \] Lazy loading implemented \[ \] No major render-blocking issues

### Pages: \[ \] 404 page created and styled \[ \] Canonical tags on all pages \[ \] Open Graph tags on key pages

### Placeholders Documented: \[ \] GBP embed locations noted \[ \] Reviews widget location noted \[ \] Contact form handler noted \[ \] About page content placeholders noted

### \======================================================= OUTPUT

After completing all technical SEO tasks, provide:

1. Confirmation that sitemap.xml and robots.txt are created  
2. List of any schema errors found and fixed  
3. List of any broken links found and fixed  
4. List of any pages missing required elements  
5. Final page count verification  
6. Any recommendations for improvement

Generate all technical SEO elements and complete the verification checklist.

