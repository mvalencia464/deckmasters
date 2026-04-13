Based on the Lighthouse report for **deckmastersak.com**, there are several "low-hanging fruit" opportunities to improve the accessibility score from 90 toward 100. 

The primary issues involve **ARIA attributes** and **color contrast**, which are often simple code fixes.

### 1. High-Impact Technical Fixes (Failed Audits)
* [cite_start]**Fix Focusable Elements in Hidden Containers:** * **The Issue:** An input element (`input#menu-toggle`) is marked with `aria-hidden="true"` but remains focusable[cite: 2360, 2363].
    * **The Fix:** When an element is hidden from screen readers using `aria-hidden`, it should not be reachable via the keyboard. [cite_start]Either add `tabindex="-1"` to the input or use `display: none` when it is not in use[cite: 2366].
* [cite_start]**Remove Prohibited ARIA Attributes:** * **The Issue:** There are 30 instances where a `<div>` uses an `aria-label` (labeled "Project photos") without having a valid ARIA role[cite: 2373, 2378, 2494].
    * **The Fix:** `aria-label` should generally only be used on interactive elements (links, buttons) or elements with specific roles (like `role="region"`). [cite_start]Remove these labels or change the `div` to a more semantic element[cite: 2378].

### 2. User Experience & Design Improvements
* [cite_start]**Improve Color Contrast:** * **The Issue:** Several text elements fail the minimum contrast ratio of 4.5:1[cite: 2521].
    * [cite_start]**Specific Culprits:** * "CALL US" text (Ratio 2.33:1)[cite: 2526].
        * [cite_start]"GET MY FREE ESTIMATE" buttons (Ratio 3.3:1)[cite: 2537, 2541].
        * [cite_start]Various section headings and review attributions[cite: 2551, 2561, 2571].
    * [cite_start]**The Fix:** Darken the brand orange (#e85a07) and the neutral gray (#a8a29e) against their respective backgrounds to meet accessibility standards[cite: 2527, 2537].
* **Fix Accessible Name Mismatches:**
    * [cite_start]**The Issue:** The Google Review link has a visible label ("4.9 · 153 Google Reviews") that does not match its programmatic `aria-label`[cite: 2770, 2775].
    * [cite_start]**The Fix:** Ensure the `aria-label` includes the exact visible text to assist users using voice-control software[cite: 2776].

### 3. Media & Content
* **Add Video Captions:**
    * [cite_start]**The Issue:** The testimonial video (`erica-leman.mp4`) lacks a `<track>` element for captions[cite: 2813, 2816].
    * [cite_start]**The Fix:** Provide a `.vtt` caption file to ensure the content is accessible to deaf or hard-of-hearing users[cite: 2814].
* **Remove Redundant Alt Text:**
    * [cite_start]**The Issue:** The logo image has alt text ("DeckMasters") that duplicates the adjacent text[cite: 2759, 2765]. 
    * [cite_start]**The Fix:** Simplify the alt text or mark the image as decorative if the information is already provided by nearby text[cite: 2766].