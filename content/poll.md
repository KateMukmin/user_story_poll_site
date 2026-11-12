## Poll: Which user story format do you prefer?

We’re looking at how we write user stories, and since you’re the ones working with them every day, we want your input before anything is decided. Below are five common formats, all describing the same feature from our Drug Testing Collection Only epic, so you can compare them side by side.

Please take a few minutes to read through and vote below. The team’s overall preference will be taken into account as product and development leadership finalize the approach, so we’d love to hear from everyone.

**Feature:** In Facility Setup, the user creates a custom test panel using the Custom Panel pop-up.

---

### Option 1: Connextra (Role / Goal / Benefit)

**Story**

**As a** user setting up a Facility,  
**I want** to select Custom from the Test Panels dropdown and create a custom panel in the Custom Panel pop-up by entering a Panel Name (required), a Lab Panel Number (optional), one or more Substances Included (required), and Collection Instructions (optional),  
**so that** on Save the panel appears in the Test Panels dropdown and as a selected chip, aligned with the current UI.

**Acceptance Criteria (checklist)**

- The Test Panels dropdown includes a Custom option.
- Clicking Custom opens the Custom Panel pop-up.
- Panel Name is a required text field.
- Lab Panel Number is an optional text field.
- Substances Included is a required multi-select dropdown with: AMP / MAMP, MDMA / MDA, COC, THC, OPI, and 16 more.
- Collection Instructions is an optional free text field.
- The Save button is disabled until all required fields (Panel Name and Substances Included) are completed.
- On Save, the panel appears in the Test Panels dropdown and as a selected chip, aligned with the current UI.

---

### Option 2: Feature Injection (Benefit First)

**Story**

**In order to** have a custom panel appear in the Test Panels dropdown and as a selected chip, aligned with the current UI,  
**as a** user setting up a Facility,  
**I want** to select Custom from the Test Panels dropdown and create a panel in the Custom Panel pop-up by entering a Panel Name (required), a Lab Panel Number (optional), one or more Substances Included (required), and Collection Instructions (optional).

**Acceptance Criteria (outcome first, then inputs)**

*Outcomes*
- On Save, the panel appears in the Test Panels dropdown.
- On Save, the panel is shown as a selected chip, aligned with the current UI.

*Inputs*
- The Test Panels dropdown includes a Custom option that opens the Custom Panel pop-up.
- Panel Name (text, required).
- Lab Panel Number (text, optional).
- Substances Included (multi-select dropdown, required) with: AMP / MAMP, MDMA / MDA, COC, THC, OPI, and 16 more.
- Collection Instructions (free text, optional).
- The Save button is disabled until all required fields (Panel Name and Substances Included) are completed.

---

### Option 3: Job Story / Jobs to Be Done (Situation / Motivation / Outcome)

**Story**

**When** I select Custom from the Test Panels dropdown in Facility Setup,  
**I want to** enter a Panel Name (required), a Lab Panel Number (optional), one or more Substances Included (required), and Collection Instructions (optional) in the Custom Panel pop-up,  
**so I can** save the panel and see it in the Test Panels dropdown and as a selected chip, aligned with the current UI.

**Acceptance Criteria (When / Then)**

- **When** I open the Test Panels dropdown, **then** I see a Custom option.
- **When** I click Custom, **then** the Custom Panel pop-up opens.
- **When** the pop-up opens, **then** I see Panel Name (text, required), Lab Panel Number (text, optional), Substances Included (multi-select dropdown, required), and Collection Instructions (free text, optional).
- **When** I open Substances Included, **then** I can select one or more of: AMP / MAMP, MDMA / MDA, COC, THC, OPI, and 16 more.
- **When** Panel Name is empty or no Substances Included are selected, **then** the Save button is disabled.
- **When** I click Save, **then** the panel appears in the Test Panels dropdown and as a selected chip, aligned with the current UI.

---

### Option 4: Gherkin (Given / When / Then Scenario)

**Story**

**Feature:** Create a custom test panel in Facility Setup using the Custom Panel pop-up

**Acceptance Criteria (scenarios)**

**Scenario 1: Custom option opens the Custom Panel pop-up**  
**Given** I am in Facility Setup  
**When** I select Custom from the Test Panels dropdown  
**Then** the Custom Panel pop-up opens

**Scenario 2: Custom Panel pop-up fields**  
**Given** the Custom Panel pop-up is open  
**Then** I see Panel Name (text, required)  
**And** I see Lab Panel Number (text, optional)  
**And** I see Substances Included (multi-select dropdown, required)  
**And** I see Collection Instructions (free text, optional)  
**And** Substances Included lists: AMP / MAMP, MDMA / MDA, COC, THC, OPI, and 16 more

**Scenario 3: Save a custom panel**  
**Given** the Custom Panel pop-up is open  
**When** I enter a Panel Name, select one or more Substances Included, and click Save  
**Then** the panel appears in the Test Panels dropdown  
**And** it is shown as a selected chip, aligned with the current UI

**Scenario 4: Save is disabled when required fields are missing**  
**Given** the Custom Panel pop-up is open  
**When** Panel Name is empty or no Substances Included are selected  
**Then** the Save button is disabled

---

### Option 5: Shall Statement / IEEE 830 (System Requirement)

**Story**

- The system **shall** add a Custom option to the Test Panels dropdown in Facility Setup.
- On click, the system **shall** open the Custom Panel pop-up with the following fields:
  - Panel Name (text, required)
  - Lab Panel Number (text, optional)
  - Substances Included (multi-select dropdown, required)
  - Collection Instructions (free text, optional)
- Substances Included **shall** offer: AMP / MAMP, MDMA / MDA, COC, THC, OPI, and 16 more.
- The system **shall** disable the Save button until all required fields (Panel Name and Substances Included) are completed.
- On Save, the system **shall** add the panel to the Test Panels dropdown and display it as a selected chip, aligned with the current UI.

**Acceptance Criteria (verification)**

1. Verify that the Test Panels dropdown in Facility Setup contains a Custom option.
2. Verify that clicking Custom opens the Custom Panel pop-up.
3. Verify that the pop-up contains Panel Name (text, required), Lab Panel Number (text, optional), Substances Included (multi-select dropdown, required), and Collection Instructions (free text, optional).
4. Verify that Substances Included offers: AMP / MAMP, MDMA / MDA, COC, THC, OPI, and 16 more.
5. Verify that the Save button is disabled when Panel Name is empty or no Substances Included are selected.
6. Verify that on Save, the panel is added to the Test Panels dropdown and displayed as a selected chip, aligned with the current UI.
