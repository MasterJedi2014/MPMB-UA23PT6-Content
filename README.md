# MPMB-UA23PT6-Content
This script adds the content from the "Unearthed Arcana 2023: Player's Handbook Playtest 6" article to the MPMB character sheet.

**Script Credit Note:**
A lot of the content of this script is either ripped directly from existing code or is an altered form of existing code. I have tried to diligently note when I copied code from elsewhere, but I probably missed some instances. A lack of note saying I ripped the code from elsewhere either means that I wrote that section of code entirely myself or that the code that was copied to use as a starting point was so heavily altered by me that almost nothing of the copied code exists.

**Detailed List of Script Content:**
- UA23PT6 Cleric & its subclasses
- UA23PT6 Paladin & its subclasses
- UA23PT6 Ranger & its subclasses
- UA23PT6 Rogue & its subclasses
- UA23PT6 spells
- CompanionList menu option for the UA23PT6 **Find Steed** spell
- CreatureList entries of the "Otherworldly Steed" creature for each spell level
- The "Otherworldly Steed" creature's "Otherworldly Slam" attack
- CompanionList menu option for the Beast Master Ranger's Primal Beasts
- CreatureList entries for each of the Beast Master Ranger's Primal Beasts
- The "Beast of the Sea" creature's "Binding Strike" attack
- Six Fighting Style Feats

This encompasses all of the content in this UA article that wasn't superseded or removed in later content.

This script will allow users to more easily playtest the upcoming revision to D&D 5E.

_**This script DOES NOT add the Bard class that appeared in this UA article because the Arcane, Divine, and Primal Spell Lists have been removed from playtesting & the Bard in this UA article heavily depends on those Spell Lists to function correctly.**_

Please find the UA22XC Bard script for a working UA Bard class and subclass; link here: https://github.com/MasterJedi2014/MPMB-UA22XC-Bard

**Script Patch Notes:**
- **2024-03-12:**
  - Fixed a bug preventing Primal Beasts from automatically updating their HP & AC.
- **2024-03-20:**
  - Fixed a bug wherein the Trickery Cleric's domain spell list was a duplicate of the Life Cleric's domain spell list instead of consisting of it's own list of domain spells.
  - Added "Additional Ranger Spells" optional class feature to the Ranger. (I finally found it in the "all_WotC_pub+UA.js" file)
  - Added support for the *UA22CS* spells.
  - Added URL attribute to the source section within the script.

**Known Bugs:**
- ~~The Primal Beasts do not automatically update their HP & AC as they should when the character's level changes.~~ **UPDATE 2024-03-12:** Primal Beasts should now automatically update their HP & AC.
- ~~The Trickery Cleric's domain spell list was incorrectly a copy of the Life Cleric's domain spell list.~~ **UPDATE 2024-03-20:** The Trickery Cleric's domain spell list is now accurate to the UA.
- No known bugs at this time. Will update when new ones are found (because I am sure there are others in this monster of a file).

**Script Content Source:** https://media.dndbeyond.com/compendium-images/ua/ph-playtest6/OJVW7QLuHjEFCCVs/UA-2023-PH-Playtest6.pdf

For instructions on how to add this script to the sheet, please see this page: https://www.flapkan.com/how-to/add-more-content

