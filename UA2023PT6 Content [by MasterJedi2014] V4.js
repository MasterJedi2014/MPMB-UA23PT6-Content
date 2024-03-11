/*	-INFORMATION-
	Subject:	Classes, Companion Template Options, Creatures, Subclasses, Spells, & Feats
	Effect:		This script adds the content from the 2023 Unearthed Arcana "Player's Handbook Playtest 6" article.
				This file has been made by MasterJedi2014, borrowing a lot of code from MPMB and those who have contributed to the sheet's existing material.
	Code by:	MasterJedi2014, using MorePurpleMoreBetter's code as reference
	Date:		2024-03-11 (sheet v13.1.0)
*/

var iFileName = "UA2023PT6 Content [by MasterJedi2014] V4.js";
RequiredSheetVersion("13.1.0");

SourceList["MJ:HB"] = {
	name : "MasterJedi2014's Homebrew",
	abbreviation : "MJ:HB",
	date : "2024/03/11",
};

SourceList["UA23PT6"] = {
	name : "Unearthed Arcana 2023: Player's Handbook Playtest 6",
	abbreviation : "UA23PT6",
	date : "2023/06/29",
};

/* 	Bard will not be added in this script because the Arcane, Divine, and Primal Spell Lists have been removed
	from playtesting & the Bard in this UA article depends on those Spell Lists to function correctly.
	Some of the code references spells that appear in later UA articles. These spells will be added to the sheet
	by the scripts for those UA articles.
*/

// Add UA23PT6 Cleric class
ClassList.cleric_ua23pt6 = {
	name : "Cleric (UA:PT-vi)",
	regExpSearch : /(cleric|priest|clergy)/i,
	source : [["UA23PT6", 9], ["MJ:HB", 0]],
	primaryAbility : "Wisdom",
	prerequisite : "Charisma 13+",
	prereqeval : function(v) {
		return What('Wis') >= 13;
	},
	die : 8,
	improvements : [0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 5, 5],
	saves : ["Wis", "Cha"],
	skills : ["\n\n" + toUni("Cleric") + ": Choose two from History, Insight, Medicine, Persuasion, Religion", ""],
	armor : [
		[true, true, false, true],
		[true, true, false, true],
	],
	weapons : [
		[true, false, [""]],
		[true, false, [""]],
	],
	equipment : "Cleric starting equipment:" +
		"\n \u2022 Chain shirt," +
		"\n \u2022 Holy Symbol," +
		"\n \u2022 Mace," +
		"\n \u2022 Priest's Pack," +
		"\n \u2022 Shield," +
		"\n \u2022 and 7 gp;" +
		"\n\nAlternatively, choose 110 gp worth of starting equipment instead of the class' starting equipment.",
	subclasses : ["Divine Domain", []],
	attacks : [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,],
	abilitySave : 5,
	spellcastingFactor : 1,
	spellcastingKnown : {
		cantrips : [3, 3, 3, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
		spells : "list",
		prepared : true,
	},
	spellcastingList : {
		class : ["cleric", "cleric_ua23pt6"],
	},
	features : {
		"divine order ua23pt6" : {
			name : "Divine Order",
			source : [["UA23PT6", 11], ["MJ:HB", 0]],
			minlevel : 1,
			description : "\n   " + "Choose a Divine Order using the \"Choose Feature\" button above. The chosen option will appear in pg 3's Notes section.",
		},
		"spellcasting ua23pt6" : {
			name : "Spellcasting",
			source : [["UA23PT6", 11], ["MJ:HB", 0]],
			minlevel : 1,
			description : desc([
				"I can cast prepared cleric cantrips/spells, using Wisdom as my spellcasting ability.",
				"I can use a holy symbol as a spellcasting focus for my cleric spells.",
				"I can cast my prepared cleric spells as rituals if they have the ritual tag.",
			]),
			additional : levels.map(function (n, idx) {
				return [3, 3, 3, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5][idx] + " cantrips known";
			}),
		},
		"channel divinity ua23pt6" : {
			name : "Channel Divinity",
			source : [["UA23PT6", 11], ["MJ:HB", 0]],
			minlevel : 2,
			description : desc([
				"I can channel divine energy to cause an effect; the save for this is my cleric spell DC.",
				"Available effects are Divine Spark & Turn Undead; I gain additional effect options at higher levels in this class.",
				"I can use Channel Divinity 2 times at 2nd Level, 3 times at 6th Level, and 4 times at 18th Level.",
			]),
			additional : "; regain 1 per Short Rest",
			usages : [0, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4],
			recovery : "long rest",
		},
		"divine spark ua23pt6" : {
			name : "Channel Divinity: Divine Spark",
			source : [["UA23PT6", 11], ["MJ:HB", 0]],
			minlevel : 2,
			description : desc([
				"As a Magic action, I roll 1d8 + Wis modifier, targeting one creature I can see within 30 ft.",
				"I either restore Hit Points to the creature equal to that total or force the creature to make a Constitution saving throw.",
				"Creature takes radiant or necrotic damage, saves for half. Add an additional d8 at Cleric levels 7 (2d8), 13 (3d8), and 18 (4d8).",
			]),
			action : [
				["action", "Channel Divinity: Divine Spark"],
			],
		},
		"turn undead ua23pt6" : {
			name : "Channel Divinity: Turn Undead",
			source : [["UA23PT6", 11], ["MJ:HB", 0]],
			minlevel : 2,
			description : desc([
				"As a Magic action, all undead within 30 ft that can see/hear me must make a Wisdom save",
				"If an undead fails this save, it is Turned for 1 minute or until it takes any damage, I become Incapacitated, or I die",
				"Turned creatures gain the Frightened & Incapacitated conditions",
			]),
			action : [
				["action", "Channel Divinity: Turn Undead"],
			],
		},
		"subclassfeature3" : { //Ripped directly from ListClasses.js and then altered
			name : "Divine Domain",
			source : [["SRD", 16], ["P", 58]],
			minlevel : 3,
			description : desc('Choose a Domain related to your deity and put it in the "Class" field ')
		},
		"smite undead ua23pt6" : {
			name : "Smite Undead",
			source : [["UA23PT6", 12], ["MJ:HB", 0]],
			minlevel : 5,
			description : desc([
				"I can can cause my Turn Undead feature to smite undead, doing Wis modifier # of d8s.",
				"in Radiant damage to Undead that dail their saving throw against that use of Turn Undead;",
				"This Radiant damage doesn't end the turn effect.",
			]),
		},
		"blessed strikes ua23pt6" : {
			name : "Blessed Strikes",
			source : [["UA23PT6", 12], ["MJ:HB", 0]],
			minlevel : 7,
			description : "\n   " + "Choose a Blessed Strikes option using the \"Choose Feature\" button above. The chosen option will appear in pg 3's Notes section.",
		},
		"commune ua23pt6" : {
			name : "Commune",
			source : [["UA23PT6", 12], ["MJ:HB", 0]],
			minlevel : 9,
			description : desc([
				"I now always have the Commune spell prepared.",
			]),
			spellcastingBonus : {
				name : "Commune",
				spells : ["commune"],
				selection : ["commune"],
				times : 1,
			},
		},
		"divine intervention ua23pt6" : {
			name : "Divine Intervention",
			source : [["UA23PT6", 12], ["MJ:HB", 0]],
			minlevel : 10,
			description : desc([
				"Once per Long Rest, I can use a Magic action to cast a Cleric spell of 5th Level or lower",
				"with a non-Reaction casting time with expending a spell slot or needing material components.",
			]),
			usages : 1,
			recovery : "long rest",
		},
		"improved blessed strikes ua23pt6" : {
			name : "Improved Blessed Strikes",
			source : [["UA23PT6", 12], ["MJ:HB", 0]],
			minlevel : 14,
			description : desc([
				"The option I chose for Blessed Strikes at 7th Lvl grows more powerful",
			]),
		},
		"greater divine intervention ua23pt6" : {
			name : "Greater Divine Intervention",
			source : [["UA23PT6", 13], ["MJ:HB", 0]],
			minlevel : 20,
			description : desc([
				"I can cast the Wish spell when I use my Divine Intervention feature; doing so means I can not",
				"use my Divine Intervention feature until I finish 2d4 Long Rests. When casting Wish with this",
				"feature, I\'m immune to the stress caused by using Wish to do something other than casting a spell.",
			]),
			limfeaname : "Divine Inter. Wish; recharge 1 per 2d4",
			usages : 1,
			recovery : "long rest",
		},
	},
};

//// Add Cleric "Divine Order" choices
AddFeatureChoice(ClassList.cleric_ua23pt6.features["divine order ua23pt6"], true, "Divine Order: Protector", {
	name : "Divine Order: Protector",
	extraname : "Cleric 1",
	source : [["UA23PT6", 11], ["MJ:HB", 0]],
	description : "\n   " + "I gain Martial Weapons Proficiency & Heavy Armor training.",
	weaponProfs : [false, true],
	armorProfs : [
		[false, false, true, false],
	],
	prereqeval : function (v) { return classes.known.cleric_ua23pt6.level >= 1 ? true : "skip"; }
}, "1st-level cleric Divine Order choice");
AddFeatureChoice(ClassList.cleric_ua23pt6.features["divine order ua23pt6"], true, "Divine Order: Thaumaturge", {
	name : "Divine Order: Thaumaturge",
	extraname : "Cleric 1",
	source : [["UA23PT6", 11], ["MJ:HB", 0]],
	description : "\n   " + "I know 1 extra cantrip from the Cleric spell list & I add my Wis modifier to Intelligence (Religion) checks.",
	spellcastingBonus : [{
		name : "Cleric cantrip",
		spellcastingAbility : 5,
		"class" : ["cleric", "cleric_ua23pt6"],
		level : [0, 0],
		firstCol : "atwill",
		times : 1
	}],
	addMod : [
		{ type : "skill", field : "Religion", mod : "Wis", text : "I can add my Wisdom modifier to Intelligence (Religion) checks." },
	],
	prereqeval : function (v) { return classes.known.cleric_ua23pt6.level >= 1 ? true : "skip"; }
}, "1st-level cleric Divine Order choice");

//// Add Cleric "Blessed Strikes" choices
AddFeatureChoice(ClassList.cleric_ua23pt6.features["blessed strikes ua23pt6"], true, "Blessed Strikes: Divine Strike", {
	name : "Blessed Strikes: Divine Strike",
	extraname : "Cleric 7",
	source : [["UA23PT6", 12], ["MJ:HB", 0]],
	description : "\n   " + "Once per turn, when I hit a creature with a weapon attack, I can do extra Radiant/Necrotic damage; damage increases at 14th Lvl",
	additional : levels.map(function (n) {
		return n < 7 ? "" : "+" + (n < 14 ? 1 : 2) + "d8 Radiant/Necrotic damage (choice)";
	}),
	calcChanges : {
		atkAdd : [
			function (fields, v) {
				if (classes.known.cleric_ua23pt6 && classes.known.cleric_ua23pt6.level >= 7 && !v.isSpell) {
					fields.Description += (fields.Description ? '; ' : '') + 'Once per turn +' + (classes.known.cleric_ua23pt6.level < 14 ? 1 : 2) + 'd8 Radiant/Necrotic damage';
				}
			},
			"Once per turn, when I hit a creature with a weapon attack, I can do extra Radiant/Necrotic damage.",
		],
	},
	prereqeval : function (v) { return classes.known.cleric_ua23pt6.level >= 7 ? true : "skip"; }
}, "7th-level cleric Blessed Strike choice");
AddFeatureChoice(ClassList.cleric_ua23pt6.features["blessed strikes ua23pt6"], true, "Blessed Strikes: Potent Spellcasting", {
	name : "Blessed Strikes: Potent Spellcasting",
	extraname : "Cleric 7",
	source : [["UA23PT6", 12], ["MJ:HB", 0]],
	description : "\n   " + "I add my Wisdom modifier to the damage I deal with my cleric cantrips; At 14th Lvl, I can add 2x Wis Mod in Temp HP to myself or another creature",
	additional : levels.map(function (n) {
		return n < 14 ? "" : "+" + " 2x Wis Mod in Temp HP to myself or other creature within 60 ft";
	}),
	calcChanges : {
		atkCalc : [
			function (fields, v, output) {
				if (classes.known.cleric_ua23pt6 && classes.known.cleric_ua23pt6.level > 7 && v.thisWeapon[3] && v.thisWeapon[4].indexOf('cleric_ua23pt6') !== -1 && SpellsList[v.thisWeapon[3]].level === 0) {
					output.extraDmg += What('Wis Mod');
				};
			},
			"My cleric cantrips get my Wisdom modifier added to their damage.",
		],
		spellAdd : [
			function (spellKey, spellObj, spName) {
				if (spName.indexOf("cleric_ua23pt6") == -1 || !What("Wis Mod") || Number(What("Wis Mod")) <= 0 || spellObj.psionic || spellObj.level !== 0) return;
				return genericSpellDmgEdit(spellKey, spellObj, "\\w+\\.?", "Wis");
			},
			"My cleric cantrips get my Wisdom modifier added to their damage.",
		],
	},
	prereqeval : function (v) { return classes.known.cleric_ua23pt6.level >= 7 ? true : "skip"; }
}, "7th-level cleric Blessed Strike choice");

//// Add Cleric optional choices; Ripped directly from all_WotC_pub+UA.js and then altered
AddFeatureChoice(ClassList.cleric_ua23pt6.features["spellcasting ua23pt6"], true, "Access to Dunamancy Spells", {
	name : "Dunamancy Spells",
	extraname : "Optional Cleric 1",
	source : [["W", 186]],
	description : desc([
		"All dunamancy spells are added to the cleric spell list, each still pending DM's approval"
	]),
	calcChanges : {
		spellList : [
			function(spList, spName, spType) {
				// Stop this is not the class' spell list or if this is for a bonus spell entry
				if (spName !== "cleric_ua23pt6" || spType.indexOf("bonus") !== -1) return;
				spList.extraspells = spList.extraspells.concat(["sapping sting", "gift of alacrity", "magnify gravity", "fortune's favor", "immovable object", "wristpocket", "pulse wave", "gravity sinkhole", "temporal shunt", "gravity fissure", "tether essence", "dark star", "reality break", "ravenous void", "time ravage"]);
			},
			"This optional class feature expands the spell list of the cleric class with all dunamancy spells (spell level in brackets): Sapping Sting (cantrip), Gift of Alacrity (1), Magnify Gravity (1), Fortune's Favor (2), Immovable Object (2), Wristpocket (2), Pulse Wave (3), Gravity Sinkhole (4), Temporal Shunt (5), Gravity Fissure (6), Tether Essence (7), Dark Star (8), Reality Break (8),Ravenous Void (9), and Time Ravage (9)."
		]
	}
}, "Optional 1st-level cleric features");
AddFeatureChoice(ClassList.cleric_ua23pt6.features["spellcasting ua23pt6"], true, "Additional Cleric Spells", {
	name : "Additional Cleric Spells",
	extraname : "Optional Cleric 1",
	source : [["T", 30]],
	description : "",
	calcChanges : {
		spellList : [
			function(spList, spName, spType) {
				// Stop this is not the class' spell list or if this is for a bonus spell entry
				if (spName !== "cleric_ua23pt6" || spType.indexOf("bonus") !== -1) return;
				spList.extraspells = spList.extraspells.concat(["aura of vitality", "aura of life", "aura of purity", "sunbeam", "sunburst", "power word heal"]);
			},
			"This optional class feature expands the spell list of the cleric class with the following spells (spell level in brackets): Aura of Vitality (3), Aura of Life (4), Aura of Purity (4), Sunbeam (6), Sunburst (8), and Power Word Heal (9)."
		]
	}
}, "Optional 1st-level cleric features");
AddFeatureChoice(ClassList.cleric_ua23pt6.features["channel divinity ua23pt6"], true, "Harness Divine Power", {
	name : "Channel Divinity: Harness Divine Power",
	extraname : "Optional Cleric 2",
	source : [["T", 30]],
	description : desc([
		"As a bonus action, I can expend a use of my channel divinity to regain one used spell slot",
		"The level of this spell slot can be no more than half my Proficiency Bonus (rounded up)",
		"I can only do this so many times per long rest, even if I have uses of channel divinity left"
	]),
	action : [["bonus action", ""]],
	usages : levels.map(function(n) {
		return n < 3 ? "" : n < 6 ? 1 : n < 18 ? 2 : 3;
	}),
	recovery : "long rest"
}, "Optional 2nd-level cleric features");
AddFeatureChoice(ClassList.cleric_ua23pt6.features["turn undead ua23pt6"], true, "Cantrip Versatility", {
	name : "Cantrip Versatility",
	extraname : "Optional Cleric 4",
	source : [["T", 31]],
	description : " [ASI = Ability Score Improvement]\n   Whenever I gain an ASI from the cleric class, I can change one cleric cantrip for another",
	prereqeval : function (v) { return classes.known.cleric_ua23pt6.level >= 4 ? true : "skip"; }
}, "Optional 4th-level cleric features");

//// Add "UA 2019: Class Feature Variants" Cleric optional choices; Ripped directly from all_WotC_pub+UA.js and then altered
AddFeatureChoice(ClassList.cleric_ua23pt6.features["spellcasting ua23pt6"], true, "Cantrip Versatility (ua:cfv)", {
	name : "Cantrip Versatility",
	extraname : "Optional Cleric 1",
	source : [["UA:CFV", 3]],
	description : "\n   Whenever I gain a cleric level, I can replace a cleric cantrip I know with another"
}, "Optional 1st-level cleric features");
AddFeatureChoice(ClassList.cleric_ua23pt6.features["spellcasting ua23pt6"], true, "Expanded Spell List (ua:cfv)", {
	name : "Expanded Cleric Spell List",
	extraname : "Optional Cleric 1",
	source : [["UA:CFV", 3]],
	description : "",
	calcChanges : {
		spellList : [
			function(spList, spName, spType) {
				// Stop this is not the class' spell list or if this is for a bonus spell entry
				if (spName !== "cleric_ua23pt6" || spType.indexOf("bonus") !== -1) return;
				spList.extraspells = spList.extraspells.concat(["cause fear", "wrathful smite", "branding smite", "aura of vitality", "aura of life", "aura of purity", "skill empowerment", "wall of light", "power word heal"]);
			},
			"This alternative class feature enhancement expands the spell list of the cleric class with the following spells (spell level in brackets): Cause Fear (1), Wrathful Smite (1), Branding Smite (2), Aura of Vitality (3), Aura of Life (4), Aura of Purity (4), Skill Empowerment (5), Wall of Light (5), and Power Word Heal (9)."
		]
	}
}, "Optional 1st-level cleric features");
AddFeatureChoice(ClassList.cleric_ua23pt6.features["channel divinity ua23pt6"], true, "Harness Divine Power (ua:cfv)", {
	name : "Channel Divinity:\xA0Harness Divine Power",
	source : [["UA:CFV", 4]],
	description : "\n   As a bonus action, I can use my holy symbol and a prayer to regain 1 used level 1 spell slot",
	action : [["bonus action", ""]]
}, "Optional 2nd-level cleric features");

////// Add UA23PT6 Life Domain Cleric subclass
AddSubClass("cleric_ua23pt6", "life domain_ua23pt6", {
	regExpSearch : /^(?=.*(cleric|priest|clergy))(?=.*\b(life|living)\b).*$/i,
	subname : "Life Domain",
	source : [["UA23PT6", 13], ["MJ:HB", 0], ["SRD", 17], ["P", 60]],
	spellcastingExtra : ["aid", "aura of life", "bless", "cure wounds", "cure wounds ua23pt8", "death ward", "greater restoration", "lesser restoration", "mass healing word", "mass healing word ua23pt8", "revivify", "mass cure wounds", "mass cure wounds ua23pt8"],
	features : {
		"subclassfeature3" : { //Ripped directly from ListClasses.js and then altered
			name : "Disciple of Life",
			source : [["UA23PT6", 13], ["MJ:HB", 0], ["SRD", 17], ["P", 60]],
			minlevel : 3,
			description : desc([
				"Whenever a 1st-level or higher spell I cast restores HP to a creature, it heals more",
				"The creature regains an additional 2 + spell level (SL) worth of hit points",
				'Note that "X/SL" on the spell page means per spell slot level above the spell\'s normal level',
			]),
			calcChanges : {
				spellAdd : [
					// Includes Revivify and Raise Dead as they restore HP from 0 to 1, but omits Aid and Heroes' Feast as they increase max HP, not restore
					function (spellKey, spellObj, spName) {
						if (spellObj.psionic || !spellObj.level) return;
						switch (spellKey) {
							case "enervation" :
							case "life transference" :
							case "vampiric touch" :
								var useSpellDescr = getSpellShortDescription(spellKey, spellObj);
								var strAdd = " +" + (spellObj.level + 2) + "+1/SL";
								spellObj.description = useSpellDescr.replace(/(heals? (half|twice)( the damage dealt| that)?)( in HP)?/, "$1" + strAdd);
								return true;
							case "mass heal" :
								spellObj.description = spellObj.descriptionShorter.replace(/crea(tures)? in range.*cure[sd]/i, "crea in range, each then +11 HP, cured");
								return true;
							default :
								if (!genericSpellDmgEdit(spellKey, spellObj, "heal", (2 + spellObj.level))) return;
								if (spellObj.level < 9) genericSpellDmgEdit(spellKey, spellObj, "heal", "1/SL");
								spellObj.discipleOfLife = true; // for Blessed Healer and Supreme Healing,
								return true;
						}
					},
					"When I use a spell that restores hit points, it restores an additional 2 + the level of the spell slot (or spell slot equivalent) used to cast the spell.",
				],
			},
		},
		"subclassfeature3.1" : {
			name : "Channel Divinity: Preserve Life",
			source : [["UA23PT6", 13], ["MJ:HB", 0]],
			minlevel : 3,
			description : desc([
				"I can expend a number of Channel Divinity uses to cast an Abjuration spell",
				"without expending a spell slot. The number of Channel Divinity uses required",
				"equals the level of the spell being cast.",
			]),
			action : ["action", ""],
		},
		"subclassfeature6" : { //Ripped directly from ListClasses.js and then altered
			name : "Blessed Healer",
			source : [["UA23PT6", 13], ["MJ:HB", 0], ["SRD", 17], ["P", 60]],
			minlevel : 6,
			description : desc("When I restore HP to another with a spell, I regain 2 + the spell (slot) level in HP"),
			calcChanges : {
				spellAdd : [
					// note that several healing spells are skipped because they don't restore hp at casting (only later)
					function (spellKey, spellObj, spName) {
						var otherHealSpells = ["mass heal", "life transference", "power word heal", "power word heal ua23pt8", "resurrection", "true resurrection"];
						var noHealAtCast = ["aura of life", "aura of vitality", "goodberry", "healing elixir-uass", "healing spirit"];
						if (noHealAtCast.indexOf(spellKey) !== -1) return;
						if (spellObj.discipleOfLife || otherHealSpells.indexOf(spellKey) !== -1) {
							var useSpellDescr = getSpellShortDescription(spellKey, spellObj).replace(/spell(casting)? (ability )?mod(ifier)?/i, "spell mod");
							switch (spellKey) {
								case "heal" :
								case "life transference" :
								case "mass heal" :
									useSpellDescr = useSpellDescr.replace(" in range", "").replace(" I can see", "").replace("blindness, deafness", "blind, deaf");
									break;
								case "regenerate" :
									useSpellDescr = useSpellDescr.replace(" for the duration; restores lost body", "; regrow");
									break;
								case "resurrection" :
								case "true resurrection" :
									useSpellDescr = useSpellDescr.replace(" with", ", ").replace("century", "100y").replace("1000gp", "1k gp");
									break;
								case "raise dead" :
								case "revivify" :
									useSpellDescr = useSpellDescr.replace(/(Resurrects?|Restores?) (a )?crea(ture)?('s)? (body )?that (has )?died in( the)?/i, "Restore crea that died in");
									break;
							};
							var alwaysOthers = ["life transference", "raise dead", "revivify", "resurrection", "true resurrection"];
							var strPart = alwaysOthers.indexOf(spellKey) === -1 ? "; if other, I heal " : "; I heal ";
							var strAdd = spellObj.level < 9 ? strPart + (spellObj.level + 2) + (spellObj.noSpellUpcasting ? "" : "+1/SL") + " HP" : strPart + "11 HP";
							spellObj.description = useSpellDescr + strAdd;
							return true;
						}
					},
					"When I cast a spell that restores hit points to another creature than myself at the moment of casting, I also heal 2 + the level of the spell slot (or spell slot equivalent) hit points.",
				],
			},
		},
		"subclassfeature17" : { //Ripped directly from ListClasses.js
			name : "Supreme Healing",
			source : [["UA23PT6", 14], ["MJ:HB", 0], ["SRD", 17], ["P", 60]],
			minlevel : 17,
			description : desc("When I restore HP with a spell, I heal the maximum amount instead of rolling the dice"),
			calcChanges : {
				spellAdd : [
					function (spellKey, spellObj, spName) {
						if (!spellObj.discipleOfLife) return;
						return genericSpellDmgEdit(spellKey, spellObj, "heal", false, false, true, true);
					},
					"When I use a spell that restores hit points by rolling one or more dice to restore hit points with a spell, I instead use the highest number possible for each die.",
				],
			},
		},
	},
});

////// Add UA23PT6 Light Domain Cleric subclass
AddSubClass("cleric_ua23pt6", "light domain_ua23pt6", {
	regExpSearch : /^(?=.*(cleric|priest|clergy))(?=.*\b(light|sun)\b).*$/i,
	subname : "Light Domain",
	source : [["UA23PT6", 14], ["MJ:HB", 0], ["P", 61]],
	spellcastingExtra : ["arcane eye", "burning hands", "daylight", "faerie fire", "fireball", "flame strike", "moonbeam", "scrying", "see invisibility", "wall of fire"],
	features : {
		"subclassfeature3" : { //Ripped directly from all_WotC_pub+UA.js and then altered
			name : "Warding Flare",
			source : [["UA23PT6", 14], ["MJ:HB", 0], ["P", 61]],
			minlevel : 3,
			description : desc([
				"When a creature within 30 ft attacks a creature and I can see it, I can interpose divine light",
				"As a Reaction, I impose disadv. on the attacker's attack roll (unless it can't be blinded)",
			]),
			usages : "Wisdom modifier per ",
			usagescalc : "event.value = Math.max(1, What('Wis Mod'));",
			recovery : "long rest",
			action : ["reaction", ""],
		},
		"subclassfeature3.1" : { //Ripped directly from all_WotC_pub+UA.js and then altered
			name : "Channel Divinity: Radiance of the Dawn",
			source : [["UA23PT6", 14], ["MJ:HB", 0], ["P", 61]],
			minlevel : 3,
			description : "\n   " + "As a Magic action, in 30 ft, magical darkness is dispelled and hostiles must make a Con save" + "\n   " + "Each takes radiant damage, saves for half, and negates with total cover",
			additional : ["", "", "2d10 + 3 damage", "2d10 + 4 damage", "2d10 + 5 damage", "2d10 + 6 damage", "2d10 + 7 damage", "2d10 + 8 damage", "2d10 + 9 damage", "2d10 + 10 dmg", "2d10 + 11 dmg", "2d10 + 12 dmg", "2d10 + 13 dmg", "2d10 + 14 dmg", "2d10 + 15 dmg", "2d10 + 16 dmg", "2d10 + 17 dmg", "2d10 + 18 dmg", "2d10 + 19 dmg", "2d10 + 20 dmg"],
			action : ["action", ""],
		},
		"subclassfeature6" : {
			name : "Revealing Light",
			source : [["UA23PT6", 14], ["MJ:HB", 0]],
			minlevel : 6,
			description : desc([
				"Once per Long Rest, I can use a Bonus Action to cast \"See Invisibility\" without expending a spell slot.",
				"Allies within 10 ft of me also gain the benefit of the spell. I can end spell with a Bonus Action.",
				"While spell is active, I emite Bright Light in a 10 ft rad & Dim Light for another 10 ft.",
			]),
			action : ["bonus action", " (start/stop)"],
			usages : 1,
			recovery : "long rest",
		},
		"subclassfeature17" : { //Ripped directly from all_WotC_pub+UA.js and then altered
			name : "Corona of Light",
			source : [["UA23PT6", 14], ["MJ:HB", 0], ["P", 61]],
			minlevel : 17,
			description : "\n   " + "As a Magic action, I have an aura of 60 ft sunlight and 30 ft dim light for 1 min" + "\n   " + "Enemies in the sunlight have disadv. on saves vs. spells (inc. Radiance of the Dawn) that deal fire or radiant damage",
			action : ["action", " (start/stop)"],
		},
	},
});

////// Add UA23PT6 Trickery Domain Cleric subclass
AddSubClass("cleric_ua23pt6", "trickery domain_ua23pt6", {
	regExpSearch : /^(?=.*(cleric|priest|clergy))(?=.*(trickery|trickster)).*$/i,
	subname : "Trickery Domain",
	source : [["UA23PT6", 15], ["MJ:HB", 0], ["P", 63]],
	spellcastingExtra : ["aid", "aura of life", "bless", "cure wounds", "cure wounds ua23pt8", "death ward", "greater restoration", "lesser restoration", "mass healing word", "mass healing word ua23pt8", "revivify", "mass cure wounds", "mass cure wounds ua23pt8"],
	features : {
		"subclassfeature3" : { //Ripped directly from all_WotC_pub+UA.js and then altered
			name : "Blessing of the Trickster",
			source : [["UA23PT6", 15], ["MJ:HB", 0], ["P", 63]],
			minlevel : 3,
			description : "\n   " + "As an action, a willing creature I touch (including me) has adv. on Dex (Stealth) checks" + "\n   " + "This lasts for 1 hour or until I use it again",
			action : ["action", ""],
		},
		"subclassfeature3.1" : { //Ripped directly from all_WotC_pub+UA.js and then altered
			name : "Channel Divinity: Invoke Duplicity",
			source : [["UA23PT6", 15], ["MJ:HB", 0], ["P", 63]],
			minlevel : 3,
			description : desc([
				"As a free action, I create an illusory duplicate of myself within 30 ft of me for 1 min",
				"As a Bonus Action, I can move them 30 ft to a space I can see within 120 ft & can swap places with it",
				"I can cast spells as though I was in the duplicate's space, using my own senses",
				"I have advantage on attacks if the target is within 5 ft of a duplicate and me",
			]),
			action : ["bonus action", "Move Duplicate"],
		},
		"subclassfeature6" : {
			name : "Trickster's Magic",
			source : [["UA23PT6", 15], ["MJ:HB", 0]],
			minlevel : 6,
			description : desc([
				"I can cast an Illusion spell with an Action casting time using a Bonus Action instead.",
			]),
			usages : "Wisdom modifier per ",
			usagescalc : "event.value = Math.max(1, What('Wis Mod'));",
			recovery : "long rest",
		},
		"subclassfeature17" : {
			name : "Improved Duplicity",
			source : [["UA23PT6", 15], ["MJ:HB", 0], ["P", 63]],
			minlevel : 17,
			description : desc([
				"I can initially teleport up to a range of 120 ft instead of 30 ft.",
				"The duplicate can now move 60 ft per Bonus Action.",
				"Both myself and my allies have advantage on attacks if the target is within 5 ft of the duplicate.",
				"When illusion ends, myself or a creature of my choice regains HP equal to my Cleric lvl.",
			]),
		},
	},
});

////// Add UA23PT6 War Domain Cleric subclass
AddSubClass("cleric_ua23pt6", "war domain_ua23pt6", {
	regExpSearch : /^(?=.*(cleric|priest|clergy))(?=.*\b(war|fighting)\b).*$/i,
	subname : "War Domain",
	source : [["UA23PT6", 16], ["MJ:HB", 0], ["P", 63]],
	spellcastingExtra : ["crusader's mantle", "destructive wave", "divine favor", "freedom of movement", "hold monster", "magic weapon", "shield of faith", "spirit guardians", "spiritual weapon", "stoneskin"],
	features : {
		"subclassfeature3" : {
			name : "War Priest",
			source : [["UA23PT6", 16], ["MJ:HB", 0], ["P", 63]],
			minlevel : 3,
			description : desc([
				"When I use the Attack action, I can make a weapon attack as a bonus action",
				"I can use the Mastery property of one kind of Simple or Martial weapon I have Proficiency in.",
				"I can swap out the chosen weapon I can use the Mastery property of after a Long Rest",
			]),
			usages : "Wisdom modifier per ",
			usagescalc : "event.value = Math.max(1, What('Wis Mod'));",
			recovery : "long rest",
			action : ["bonus action", " (with Attack action)"],
		},
		"subclassfeature3.1" : {
			name : "Channel Divinity: Guided Strike",
			source : [["UA23PT6", 16], ["MJ:HB", 0], ["P", 63]],
			minlevel : 3,
			description : desc([
				"When myself or a creature within 30 ft misses an attack roll, I can use my Reaction to",
				"expend a use of my Channel Divinity to add a +10 bonus to the roll.",
			]),
			action : ["reaction", ""],
		},
		"subclassfeature6" : {
			name : "Channel Divinity: War God's Blessing",
			source : [["UA23PT6", 16], ["MJ:HB", 0], ["P", 63]],
			minlevel : 6,
			description : desc([
				"When I cast the \"Shield of Faith\" spell, the spell affects both myself & the creature it is cast on.",
				"Once per Long Rest, I can cast the \"Shield of Faith\" spell without expending a spell slot.",
			]),
			usages : 1,
			recovery : "long rest",
			action : ["action", ""],
		},
		"subclassfeature17" : {
			name : "Avatar of Battle",
			source : [["UA23PT6", 16], ["MJ:HB", 0], ["P", 63]],
			minlevel : 17,
			description : "\n   " + "I have resistance to Bludgeoning/Piercing/Slashing damage",
			dmgres : ["Bludgeoning", "Piercing", "Slashing"],
		},
	},
});

// Add UA23PT6 Paladin class
ClassList.paladin_ua23pt6 = {
	name : "Paladin (UA:PT-vi)",
	regExpSearch : /^((?=.*paladin)|((?=.*(exalted|sacred|holy))(?=.*(knight|fighter|warrior|warlord)))).*$/i,
	source : [["UA23PT6", 32], ["MJ:HB", 0]],
	primaryAbility : "Strength and Charisma",
	prerequisite : "Strength 13+ and Charisma 13+",
	prereqeval : function(v) {
		return What('Str') >= 13 && What('Cha') >= 13;
	},
	die : 10,
	improvements : [0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 5, 5],
	saves : ["Wis", "Cha"],
	skills : ["\n\n" + toUni("Paladin") + ": Choose two from Athletics, Insight, Intimidation, Medicine, Persuasion, Religion", ""],
	armor : [
		[true, true, true, true],
		[false, false, false, false],
	],
	weapons : [
		[true, true, [""]],
		[true, true, [""]],
	],
	equipment : "Paladin starting equipment:" +
		"\n \u2022 Chain mail," +
		"\n \u2022 Holy Symbol," +
		"\n \u2022 Javelin (6)," +
		"\n \u2022 Longsword," +
		"\n \u2022 Priest's Pack," +
		"\n \u2022 Shield," +
		"\n \u2022 and 9 gp;" +
		"\n\nAlternatively, choose 150 gp worth of starting equipment instead of the class' starting equipment.",
	subclasses : ["Sacred Oath", []],
	attacks : [1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
	abilitySave : 6,
	spellcastingFactor : 2,
	spellcastingKnown : {
		spells : "list",
		prepared : true
	},
	spellcastingList : {
		class : ["paladin", "paladin_ua23pt6"],
	},
	features : {
		"lay on hands ua23pt6" : { //Ripped directly from ListClasses.js and then altered
			name : "Lay on Hands",
			source : [["UA23PT6", 34], ["SRD", 31], ["P", 84], ["MJ:HB", 0]],
			minlevel : 1,
			description : desc([
				"As a Bonus Action, I can use points in my pool to heal a touched, living creature's hit points",
				"I can neutralize poisons/diseases instead at a cost of 5 points per affliction",
				"Note that diseases have been rolled into the Poisoned condition as of UA23PT6",
			]),
			usages : [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100],
			recovery : "long rest",
			action : [
				["bonus action", ""],
			],
		},
		"spellcasting ua23pt6" : { //Ripped directly from ListClasses.js and then altered
			name : "Spellcasting",
			source : [["UA23PT6", 34], ["SRD", 31], ["P", 84], ["MJ:HB", 0]],
			minlevel : 1,
			description : desc([
				"I can cast prepared paladin spells, using Charisma as my spellcasting ability",
				"I can use a holy symbol as a spellcasting focus for my paladin spells",
			]),
		},
		"weapon mastery ua23pt6" : { //Using Reaction Fields for this because there are too many possible weapons to choose from and I don't know how to code FeatureChoices to take that vast number of possible weapons into account.
			name : "Weapon Mastery",
			source : [["UA23PT6", 34], ["MJ:HB", 0]],
			minlevel : 1,
			description : desc([
				"I can use the Mastery property of two kinds of weapons of my choice with which I have proficiency.",
				"I can change what weapons I can use the Mastery property of after finishing a Long Rest.",
			]),
			action : [
				["reaction", "Wpn Mstry 1: [Wpn Name]"],
				["reaction", "Wpn Mstry 2: [Wpn Name]"],
			],
		},
		"paladins smite ua23pt6" : {
			name : "Paladin's Smite",
			source : [["UA23PT6", 34], ["MJ:HB", 0]],
			minlevel : 2,
			description : desc([
				"I always have certain smite spells ready. Once per Long Rest, I can cast one of them without using a spell slot.",
				"At 2nd Lvl, I gain access to: Divine Smite & Thunderous Smite; At 5th Lvl, I gain access to: Shining Smite;",
				"At 9th Lvl, I gain access to: Blinding Smite; At 13th Lvl, I gain access to: Staggering Smite;",
				"At 17th Lvl, I gain access to: Banishing Smite",
			]),
			spellcastingExtra : ["banishing smite ua23pt6", "blinding smite ua23pt6", "divine smite ua23pt6", "shining smite ua23pt6", "staggering smite ua23pt6", "thunderous smite ua23pt6"],
		},
		"fighting style ua23pt6" : { //Ripped directly from ListClasses.js and then altered
			name : "Fighting Style",
			source : [["UA23PT6", 34], ["SRD", 31], ["P", 84], ["MJ:HB", 0]],
			minlevel : 2,
			description : desc([
				"Choose a Fighting Style feat for the paladin using the \"Choose Feature\" button above.",
				"The chosen option will appear in pg 3's Notes section & in the list of feats",
			]),
		},
		"channel divinity ua23pt6" : {
			name : "Channel Divinity",
			source : [["UA23PT6", 35], ["MJ:HB", 0]],
			minlevel : 3,
			description : desc([
				"I can channel divine energy to cause an effect; the save for this is my paladin spell DC.",
				"Available effect is Divine Sense; I gain additional effect options at higher levels in this class.",
				"I can use Channel Divinity 2 times at 2nd Level & 3 times at Paladin Level 11 onward.",
			]),
			additional : "; regain 1 per Short Rest",
			usages : [0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
			recovery : "long rest",
		},
		"divine sense ua23pt6" : { //Ripped directly from ListClasses.js and then altered
			name : "Channel Divinity: Divine Sense",
			source : [["UA23PT6", 35], ["SRD", 30], ["P", 84], ["MJ:HB", 0]],
			minlevel : 3,
			description : desc([
				"As a Bonus Action, I sense celestials/fiends/undead/consecrated/desecrated within 60 ft",
				"For 10 minutes or until Incapacitated, I sense the location of any creature of those types & know its creature type"
			]),
			action : ["bonus action", ""],
		},
		"subclassfeature3" : { //Ripped directly from ListClasses.js and then altered
			name : "Sacred Oath",
			source : [["SRD", 16], ["P", 58]],
			minlevel : 3,
			description : desc('Choose a Sacred Oath you swear to and put it in the "Class" field '),
		},
		"faithful steed ua23pt6" : {
			name : "Faithful Steed",
			source : [["UA23PT6", 35], ["MJ:HB", 0]],
			minlevel : 5,
			description : desc([
				"I now always have the Find Steed (UA23PT6) spell prepared.",
			]),
			spellcastingBonus : {
				name : "Find Steed (UA23PT6)",
				spells : ["find steed ua23pt6"],
				selection : ["find steed ua23pt6"],
				times : 1,
			},
		},
		"aura of protection ua23pt6" : { //Ripped directly from ListClasses.js and then altered
			name : "Aura of Protection",
			source : [["UA23PT6", 35], ["SRD", 32], ["P", 85], ["MJ:HB", 0]],
			minlevel : 6,
			description : desc([
				"While I'm conscious and not Incapacitated, allies not behind Total Cover within range and I can add my Cha mod (min 1) to saves.",
				"A creature can benefit from only one Aura of Protection at a time, choosing which when entering the auras.",
				"Aura increases in size to a 30 ft radius at Paladin Level 18.",
			]),
			additional : ["", "", "", "", "", "10-foot aura", "10-foot aura", "10-foot aura", "10-foot aura", "10-foot aura", "10-foot aura", "10-foot aura", "10-foot aura", "10-foot aura", "10-foot aura", "10-foot aura", "10-foot aura", "30-foot aura", "30-foot aura", "30-foot aura"],
			addMod : { type : "save", field : "all", mod : "max(Cha|1)", text : "While I'm conscious I can add my Charisma modifier (min 1) to all my saving throws." },
		},
		"abjure foes ua23pt6" : {
			name : "Channel Divinity: Abjure Foes",
			source : [["UA23PT6", 12], ["MJ:HB", 0]],
			minlevel : 9,
			description : desc([
				"As a Magic action, in 30 ft, target Cha mod (min 1) number of creatures I can see within 60 ft",
				"Each must succeed Wis saving throw or have Dazed & Frightened conditions for 1 min or until it takes damage",
			]),
			action : ["action", ""],
		},
		"aura of courage ua23pt6" : { //Ripped directly from ListClasses.js and then altered
			name : "Aura of Courage",
			source : [["UA23PT6", 35], ["SRD", 32], ["P", 85], ["MJ:HB", 0]],
			minlevel : 10,
			description : desc([
				"While I'm conscious, allies within range of Aura of Protection and I can't be frightened",
				"Frightened allies that enter the aura are no longer affected by the condition while in the aura",
				"Aura increases in size to a 30 ft radius at Paladin Level 18.",
			]),
			additional : ["", "", "", "", "", "", "", "", "", "10-foot aura", "10-foot aura", "10-foot aura", "10-foot aura", "10-foot aura", "10-foot aura", "10-foot aura", "10-foot aura", "30-foot aura", "30-foot aura", "30-foot aura"],
			savetxt : { immune : ["frightened"] },
		},
		"radiant strikes ua23pt6" : { //Ripped directly from ListClasses.js and then altered
			name : "Radiant Strikes",
			source : [["UA23PT6", 35], ["SRD", 32], ["P", 85], ["MJ:HB", 0]],
			minlevel : 11,
			description : desc("Whenever I hit a creature with a melee weapon or unarmed strike, I do an extra 1d8 radiant damage"),
			calcChanges : {
				atkAdd : [
					function (fields, v) { //Not sure if I set the below function up correctly
						if (v.isMeleeWeapon||(v.isNaturalWeapon && v.isMeleeWeapon)) fields.Description += (fields.Description ? '; ' : '') + '+1d8 Radiant damage';
					},
					"With my melee weapon & unarmed strike attacks I deal an extra 1d8 radiant damage."
				]
			},
		},
		"restoring touch ua23pt6" : {
			name : "Restoring Touch",
			source : [["UA23PT6", 36], ["MJ:HB", 0]],
			minlevel : 14,
			description : desc([
				"My Lay on Hands Feature can now also remove the following conditions, using 5 points from my pool for each condition:",
				"Blinded, Charmed, Dazed, Deafened, Frightened, Paralyzed, or Stunned.",
				"The points used to remove a condition do not also restore Hit Points to the creature.",
			]),
		},
	},
};

//// Add Paladin "Fighting Style" choices
AddFeatureChoice(ClassList.paladin_ua23pt6.features["fighting style ua23pt6"], true, "Fighting Style: Defense", {
	name : "Fighting Style: Defense",
	extraname : "Paladin 2",
	source : [["UA23PT6", 34], ["MJ:HB", 0]],
	description : "\n   " + "I have chosen the Defense Fighting Style feat.",
	prereqeval : function (v) { return classes.known.paladin_ua23pt6.level >= 2 ? true : "skip"; },
	eval : function() { AddFeat("defense fighting style ua23pt6"); },
	removeeval : function() { RemoveFeat("defense fighting style ua23pt6"); }
}, "2nd-level paladin Fighting Style choice");
AddFeatureChoice(ClassList.paladin_ua23pt6.features["fighting style ua23pt6"], true, "Fighting Style: Dueling", {
	name : "Fighting Style: Dueling",
	extraname : "Paladin 2",
	source : [["UA23PT6", 34], ["MJ:HB", 0]],
	description : "\n   " + "I have chosen the Dueling Fighting Style feat.",
	prereqeval : function (v) { return classes.known.paladin_ua23pt6.level >= 2 ? true : "skip"; },
	eval : function() { AddFeat("dueling fighting style ua23pt6"); },
	removeeval : function() { RemoveFeat("dueling fighting style ua23pt6"); }
}, "2nd-level paladin Fighting Style choice");
AddFeatureChoice(ClassList.paladin_ua23pt6.features["fighting style ua23pt6"], true, "Fighting Style: Great Weapon Fighting", {
	name : "Fighting Style: Great Weapon Fighting",
	extraname : "Paladin 2",
	source : [["UA23PT6", 34], ["MJ:HB", 0]],
	description : "\n   " + "I have chosen the Great Weapon Fighting Style feat.",
	prereqeval : function (v) { return classes.known.paladin_ua23pt6.level >= 2 ? true : "skip"; },
	eval : function() { AddFeat("great weapon fighting style ua23pt6"); },
	removeeval : function() { RemoveFeat("great weapon fighting style ua23pt6"); }
}, "2nd-level paladin Fighting Style choice");
AddFeatureChoice(ClassList.paladin_ua23pt6.features["fighting style ua23pt6"], true, "Fighting Style: Protection", {
	name : "Fighting Style: Protection",
	extraname : "Paladin 2",
	source : [["UA23PT6", 34], ["MJ:HB", 0]],
	description : "\n   " + "I have chosen the Protection Fighting Style feat.",
	prereqeval : function (v) { return classes.known.paladin_ua23pt6.level >= 2 ? true : "skip"; },
	eval : function() { AddFeat("protection fighting style ua23pt6"); },
	removeeval : function() { RemoveFeat("protection fighting style ua23pt6"); }
}, "2nd-level paladin Fighting Style choice");

//// Add Paladin optional choices; Ripped directly from all_WotC_pub+UA.js and then altered
AddFeatureChoice(ClassList.paladin_ua23pt6.features["spellcasting ua23pt6"], true, "Access to Dunamancy Spells", {
	name : "Dunamancy Spells",
	extraname : "Optional Paladin 2",
	source : [["W", 186]],
	description : desc([
		"All dunamancy spells are added to the paladin spell list, each still pending DM's approval"
	]),
	calcChanges : {
		spellList : [
			function(spList, spName, spType) {
				// Stop this is not the class' spell list or if this is for a bonus spell entry
				if (spName !== "paladin_ua23pt6" || spType.indexOf("bonus") !== -1) return;
				spList.extraspells = spList.extraspells.concat(["gift of alacrity", "magnify gravity", "fortune's favor", "immovable object", "wristpocket", "pulse wave", "gravity sinkhole", "temporal shunt"]);
			},
			"This optional class feature expands the spell list of the paladin class with all dunamancy spells (spell level in brackets): Gift of Alacrity (1), Magnify Gravity (1), Fortune's Favor (2), Immovable Object (2), Wristpocket (2), Pulse Wave (3), Gravity Sinkhole (4), and Temporal Shunt (5)."
		]
	}
}, "Optional 2nd-level paladin features");
AddFeatureChoice(ClassList.paladin_ua23pt6.features["spellcasting ua23pt6"], true, "Additional Paladin Spells", {
	name : "Additional Paladin Spells",
	extraname : "Optional Paladin 2",
	source : [["T", 52]],
	description : "",
	calcChanges : {
		spellList : [
			function(spList, spName, spType) {
				// Stop this is not the class' spell list or if this is for a bonus spell entry
				if (spName !== "paladin_ua23pt6" || spType.indexOf("bonus") !== -1) return;
				spList.extraspells = spList.extraspells.concat(["gentle repose", "prayer of healing", "warding bond"]);
			},
			"This optional class feature expands the spell list of the paladin class with the following spells (spell level in brackets): Gentle Repose (2), Prayer of Healing (2), and Warding Bond (2)."
		]
	}
}, "Optional 2nd-level paladin features");
AddFeatureChoice(ClassList.paladin_ua23pt6.features["channel divinity ua23pt6"], true, "Harness Divine Power", {
	name : "Channel Divinity: Harness Divine Power",
	extraname : "Optional Paladin 3",
	source : [["T", 52]],
	description : desc([
		"As a bonus action, I can expend a use of my channel divinity to regain one used spell slot",
		"The level of this spell slot can be no more than half my Proficiency Bonus (rounded up)",
		"I can only do this so many times per long rest, even if I have uses of channel divinity left"
	]),
	action : [["bonus action", ""]],
	usages : levels.map(function(n) {
		return n < 3 ? "" : n < 11 ? 1 : 2;
	}),
	recovery : "long rest"
}, "Optional 3rd-level paladin features");
AddFeatureChoice(ClassList.paladin_ua23pt6.features["divine sense ua23pt6"], true, "Martial Versatility", {
	name : "Martial Versatility",
	extraname : "Optional Paladin 4",
	source : [["T", 53]],
	description : " [ASI = Ability Score Improvement]\n   Whenever I gain an ASI from the paladin class, I can change my paladin fighting style",
	prereqeval : function (v) { return classes.known.paladin_ua23pt6.level >= 4 ? true : "skip"; }
}, "Optional 4th-level paladin features");

////// Add UA23PT6 Oath of Devotion Paladin subclass
AddSubClass("paladin_ua23pt6", "oath of devotion_ua23pt6", {
	regExpSearch : /^(?=.*(devotion))((?=.*paladin)|((?=.*(exalted|sacred|holy))(?=.*(knight|fighter|warrior|warlord)))).*$/i,
	subname : "Oath of Devotion",
	source : [["UA23PT6", 36], ["SRD", 32], ["P", 86], ["MJ:HB", 0]],
	spellcastingExtra : ["aid", "beacon of hope", "commune", "dispel magic", "flame strike", "freedom of movement", "guardian of faith", "protection from evil and good", "shield of faith", "zone of truth"],
	toNotesPage : [{
		name : "Tenants of Devotion",
		note : [
			"Though the exact words and strictures of the Oath of Devotion vary, Paladins of this oath share these tenets:",
			" \u2022 Honesty. Don’t lie or cheat. Let your word be your promise.",
			" \u2022 Courage. Never fear to act, though caution is wise.",
			" \u2022 Compassion. Aid others, protect the weak, and punish those who threaten them. Show mercy to your foes, but temper it with wisdom.",
			" \u2022 Honor. Treat others with fairness, and let your honorable deeds be an example to them.",
			" \u2022 Duty. Be responsible for your actions and their consequences, protect those entrusted to your care, and obey those who have just authority over you.",
		],
		page3notes : true,
		popupName : "Tenants of Devotion",
		source : [["UA23PT6", 37], ["MJ:HB", 0]],
	}],
	features : {
		"subclassfeature3" : { //Ripped directly from ListClasses.js and then altered
			name : "Channel Divinity: Sacred Weapon",
			source : [["UA23PT6", 37], ["SRD", 33], ["P", 86], ["MJ:HB", 0]],
			minlevel : 3,
			description : desc([
				"As a Bonus Action, for 1 minute, I add my Cha modifier to hit for one weapon I'm holding",
				"It emits bright light in a 20-ft radius and equal dim light, & I can choose to deal Radiant dmg instead of normal dmg",
				"Effect ends if Incapacitated, not holding or carrying the weapon, or willingly end it with a Bonus Action",
			]),
			action : ["bonus action", ""],
			calcChanges : {
				atkCalc : [
					function (fields, v, output) {
						if (classes.known.paladin_ua23pt6 && classes.known.paladin_ua23pt6.level > 2 && !v.isSpell && (/^(?=.*sacred)(?=.*weapon).*$/i).test(v.WeaponTextName)) {
							output.extraHit += What('Cha Mod');
						};
					},
					"If I include the words 'Sacred Weapon' in the name of a weapon, it gets my Charisma modifier added to its To Hit."
				]
			},
		},
		"subclassfeature7" : { //Ripped directly from ListClasses.js and then altered
			name : "Aura of Devotion",
			source : [["UA23PT6", 37], ["SRD", 33], ["P", 86], ["MJ:HB", 0]],
			minlevel : 7,
			description : desc([
				"While I'm conscious, allies within range and I can't be charmed",
				"Aura increases in size to a 30 ft radius at Paladin Level 18.",
			]),
			additional : ["", "", "", "", "", "", "10-foot aura", "10-foot aura", "10-foot aura", "10-foot aura", "10-foot aura", "10-foot aura", "10-foot aura", "10-foot aura", "10-foot aura", "10-foot aura", "10-foot aura", "30-foot aura", "30-foot aura", "30-foot aura"],
			savetxt : { immune : ["charmed"] },
		},
		"subclassfeature15" : {
			name : "Blessed Healer",
			source : [["UA23PT6", 37], ["MJ:HB", 0]],
			minlevel : 15,
			description : desc([
				"When I cast any of my Paladin's Smite spells, allies within range and I have Half Cover (+2 AC)",
				"Effect ends at the start of my next turn",
			]),
		},
		"subclassfeature20" : { //Ripped directly from ListClasses.js and then altered
			name : "Holy Nimbus",
			source : [["UA23PT6", 37], ["SRD", 33], ["P", 86], ["MJ:HB", 0]],
			minlevel : 20,
			description : desc([
				"As an Bonus Action, I shine with a 30-ft radius bright light and equal dim light for 1 minute",
				"If an enemy starts its turn in the bright light, it takes Radiant damage equal to Prof Bonus + Cha mod",
				"For the duration, I have advantage on saves vs. spells cast by fiends and undead",
				"I can do this once per long rest, or by expending a 5th-level or higher spell slot (SS 5+)",
			]),
			recovery : "long rest",
			usages : 1,
			altResource : "SS 5+",
			action : ["bonus action", ""],
		},
	},
});

////// Add UA23PT6 Oath of Glory Paladin subclass
AddSubClass("paladin_ua23pt6", "oath of glory_ua23pt6", {
	regExpSearch : /^(?=.*(devotion))((?=.*paladin)|((?=.*(exalted|sacred|holy))(?=.*(knight|fighter|warrior|warlord)))).*$/i,
	subname : "Oath of Glory",
	source : [["UA23PT6", 37], ["T", 53], ["MOT", 29], ["MJ:HB", 0]],
	spellcastingExtra : ["guiding bolt", "heroism", "enhance ability", "magic weapon", "haste", "protection from energy", "compulsion", "freedom of movement", "commune", "flame strike"],
	toNotesPage : [{
		name : "Tenants of Glory",
		note : [
			"Though the exact words and strictures of the Oath of Glory vary, Paladins of this oath share these tenets:",
			" \u2022 Actions over Words. Strive to be known by glorious deeds, not words.",
			" \u2022 Challenges Are but Tests. Face hardships with courage, and encourage your allies to face them with you.",
			" \u2022 Hone the Body. Like raw stone, your body must be worked so its potential can be realized.",
			" \u2022 Discipline the Soul. You must marshal the discipline to overcome failings within yourself that threaten to dim the glory of you and your friends.",
		],
		page3notes : true,
		popupName : "Tenants of Glory",
		source : [["UA23PT6", 38], ["MJ:HB", 0]],
	}],
	features : {
		"subclassfeature3" : { //Ripped directly from all_WotC_pub+UA.js and then altered
			name : "Channel Divinity: Peerless Athlete",
			source : [["UA23PT6", 38], ["T", 54], ["MOT", 29], ["MJ:HB", 0]],
			minlevel : 3,
			description : desc([
				"As a bonus action, I can get adv. on Str (Athletics) \u0026 Dex (Acrobatics) checks for 1 hour",
				"In that time, I also add +10 ft to jumps, and double what I can carry, push, drag, \u0026 lift"
			]),
			action : [["bonus action", ""]],
		},
		"subclassfeature3.1" : { //Ripped directly from all_WotC_pub+UA.js and then altered
			name : "Channel Divinity: Inspiring Smite",
			source : [["UA23PT6", 38], ["T", 54], ["MOT", 29], ["MJ:HB", 0]],
			minlevel : 3,
			description : desc([
				"Immediately after dealing damage with any Paladin's Smite, I can grant temporary HP",
				"I distribute the temporary HP how I choose across creatures within 30 ft, including me"
			]),
			additional : levels.map(function (n) {
				return n < 3 ? "" : "2d8 + " + n + " temporary HP";
			}),
		},
		"subclassfeature7" : { //Ripped directly from all_WotC_pub+UA.js and then altered
			name : "Aura of Alacrity",
			source : [["UA23PT6", 38], ["T", 54], ["MOT", 29], ["MJ:HB", 0]],
			minlevel : 7,
			description : desc([
				"If I'm not incapacitated, allies and I starting their turn in range gain bonus speed for that turn.",
				"Aura increases in size to a 30 ft radius at Paladin Level 18.",
			]),
			speed : { walk : { spd : "+10", enc : "+10" } },
			additional : "+10 ft walking speed",
		},
		"subclassfeature15" : { //Ripped directly from all_WotC_pub+UA.js and then altered
			name : "Glorious Defense",
			source : [["UA23PT6", 38], ["T", 54], ["MOT", 29], ["MJ:HB", 0]],
			minlevel : 15,
			description : desc([
				"As a reaction when I or another in 10 ft is hit with an attack roll, I can grant bonus AC",
				"I must be able to see the attacker; I add my Cha mod (min 1) to the AC for that attack",
				"If it misses, I can do a weapon attack vs. the attacker, if in reach, as part of this reaction"
			]),
			usages : "Charisma modifier per ",
			usagescalc : "event.value = Math.max(1, What('Cha Mod'));",
			recovery : "long rest",
			action : [["reaction", ""]],
		},
		"subclassfeature20" : { //Ripped directly from all_WotC_pub+UA.js and then altered
			name : "Living Legend",
			source : [["UA23PT6", 38], ["T", 54], ["MOT", 29], ["MJ:HB", 0]],
			minlevel : 20,
			description : desc([
				"As a bonus action, I can empower myself with legends, gaining the following for 1 min:",
				" \u2022 My otherworldly presence grants me advantage on Charisma checks",
				" \u2022 Once on each of my turns when I miss with a weapon attack, I can have it hit instead",
				" \u2022 As a reaction when I fail a saving throw, I can reroll it, but must use the new roll",
				"I can do this once per long rest, or by expending a 5th-level or higher spell slot (SS 5+)",
			]),
			recovery : "long rest",
			usages : 1,
			altResource : "SS 5+",
			action : [["bonus action", ""]],
		},
	},
});

////// Add UA23PT6 Oath of the Ancients Paladin subclass
AddSubClass("paladin_ua23pt6", "oath of of the ancients_ua23pt6", {
	regExpSearch : /^(((?=.*(ancient|nature|natural|green|fey))((?=.*paladin)|((?=.*(exalted|sacred|holy))(?=.*(knight|fighter|warrior|warlord)))))|((?=.*(green|fey))(?=.*(knight|fighter|warrior|warlord)))).*$/i,
	subname : "Oath of the Ancients",
	source : [["UA23PT6", 38], ["SRD", 32], ["P", 86], ["MJ:HB", 0]],
	spellcastingExtra : ["ensnaring strike", "speak with animals", "moonbeam", "misty step", "plant growth", "protection from energy", "ice storm", "stoneskin", "commune with nature", "tree stride"],
	toNotesPage : [{
		name : "Tenants of the Ancients",
		note : [
			"Though the exact words and strictures of the Oath of Ancients vary, Paladins of this oath share these tenets:",
			" \u2022 Kindle the Light. Through your acts of mercy, kindness, and forgiveness, kindle the light of hope in the world, beating back despair.",
			" \u2022 Shelter the Light. Where life flourishes, stand against the forces that would render it barren.",
			" \u2022 Preserve Your Own Light. Delight in song, laughter, and art. If you allow the light to die in your own heart, you can’t preserve it in the world.",
			" \u2022 Be the Light. Be a glorious beacon for all who live in despair. Let the light of your joy and courage shine forth in all your deeds.",
		],
		page3notes : true,
		popupName : "Tenants of the Ancients",
		source : [["UA23PT6", 39], ["MJ:HB", 0]],
	}],
	features : {
		"subclassfeature3" : { //Ripped directly from all_WotC_pub+UA.js and then altered
			name : "Channel Divinity: Nature's Wrath",
			source : [["UA23PT6", 39], ["P", 87], ["MJ:HB", 0]],
			minlevel : 3,
			description : "\n   " + "As an action, creatures of my choice I can see within 15 ft must make a Str save" + "\n   " + "If it fails this save, it is Restrained for 1 min or until it succeeds on a save at the end of its turn",
			action : ["action", ""],
		},
		"subclassfeature7" : { //Ripped directly from all_WotC_pub+UA.js and then altered
			name : "Aura of Warding",
			source : [["UA23PT6", 39], ["P", 87], ["MJ:HB", 0]],
			minlevel : 7,
			description : desc([
				"Allies within range and I can't be have resistance to Necrotic, Psychic, and Radiant damage.",
				"Aura increases in size to a 30 ft radius at Paladin Level 18.",
			]),
			additional : ["", "", "", "", "", "", "10-foot aura", "10-foot aura", "10-foot aura", "10-foot aura", "10-foot aura", "10-foot aura", "10-foot aura", "10-foot aura", "10-foot aura", "10-foot aura", "10-foot aura", "30-foot aura", "30-foot aura", "30-foot aura"],
			dmgres : ["Necrotic", "Psychic", "Radiant"],
		},
		"subclassfeature15" : { //Ripped directly from all_WotC_pub+UA.js and then altered
			name : "Undying Sentinel",
			source : [["UA23PT6", 39], ["P", 87], ["MJ:HB", 0]],
			minlevel : 15,
			description : "\n   " + "If dropped to 0 hit points and not killed outright, I can choose to stay at 1 hit point, and I regain HP equal to 3x my Paladin Lvl" + "\n   " + "Additionally, I suffer no drawbacks of old age and can't be aged magically",
			additional : ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "Regain 45 HP", "Regain 48 HP", "Regain 51 HP", "Regain 54 HP", "Regain 57 HP", "Regain 60 HP"],
			recovery : "long rest",
			usages : 1,
		},
		"subclassfeature20" : { //Ripped directly from all_WotC_pub+UA.js and then altered
			name : "Elder Champion",
			source : [["UA23PT6", 39], ["P", 87], ["MJ:HB", 0]],
			minlevel : 20,
			description : desc([
				"As a Bonus Action, I imbue my Aura of Protection with primal power for 1 minute and gain benefits:",
				" \u2022 At the start of each of my turns, I regain 10 hit points",
				" \u2022 I can cast spells with a casting time of 1 action as a Bonus Action instead",
				" \u2022 Enemies within the aura have disadv. on saves vs. my spells and channel divinity",
				"I can do this once per long rest, or by expending a 5th-level or higher spell slot (SS 5+)",
			]),
			recovery : "long rest",
			usages : 1,
			altResource : "SS 5+",
			action : [["bonus action", ""]],
		},
	},
});

////// Add UA23PT6 Oath of Vengeance Paladin subclass
AddSubClass("paladin_ua23pt6", "oath of vengeance_ua23pt6", {
	regExpSearch : /^(((?=.*(vengeance|wrath))((?=.*paladin)|((?=.*(exalted|sacred|holy))(?=.*(knight|fighter|warrior|warlord)))))|((?=.*dark)(?=.*knight))|(?=.*avenger)).*$/i,
	subname : "Oath of Vengeance",
	source : [["UA23PT6", 39], ["P", 88], ["MJ:HB", 0]],
	spellcastingExtra : ["bane", "compelled duel", "hold person", "misty step", "haste", "protection from energy", "banishment", "dimension door", "hold monster", "scrying"],
	toNotesPage : [{
		name : "Tenants of Vengeance",
		note : [
			"Though the exact words and strictures of the Oath of Vengeance vary, Paladins of this oath share these tenets:",
			" \u2022 Fight the Greater Evil. Faced with a choice of fighting my sworn foes or combating a lesser evil, I choose the greater evil.",
			" \u2022 No Mercy for the Wicked. Ordinary foes might win my mercy, but my sworn enemies do not.",
			" \u2022 By Any Means Necessary. My qualms can’t get in the way of exterminating my foes.",
			" \u2022 Restitution. If my foes wreak ruin on the world, it is because I failed to stop them. I must help those harmed by my misdeeds.",
		],
		page3notes : true,
		popupName : "Tenants of Vengeance",
		source : [["UA23PT6", 40], ["MJ:HB", 0]],
	}],
	features : {
		"subclassfeature3" : { //Ripped directly from all_WotC_pub+UA.js and then altered
			name : "Channel Divinity: Vow of Enmity",
			source : [["UA23PT6", 40], ["P", 88], ["MJ:HB", 0]],
			minlevel : 3,
			description : desc([
				"As a Bonus Action, I utter a vow against a creature I can see within 30 ft.",
				"I get adv. on attacks against it for 1 minute or until it drops to 0 HP or falls Unconscious.",
				"If the creature drops to 0HP or falls Unconscious before vow ends, I can transfer the vow to a difference creature.",
				"This transfer can be done no more than once per turn.",
			]),
			action : ["bonus action", ""],
		},
		"subclassfeature7" : { //Ripped directly from all_WotC_pub+UA.js and then altered
			name : "Relentless Avenger",
			source : [["UA23PT6", 40], ["P", 88], ["MJ:HB", 0]],
			minlevel : 7,
			description : desc([
				"After I hit with an Opportunity Attack, I can reduce the creature Speed to 0.",
				"I can also move 1/2 my Speed in the same Reaction; this movement doesn't provoke Opportunity Attacks",
			]),
		},
		"subclassfeature15" : { //Ripped directly from all_WotC_pub+UA.js; UA text technically worded differently from 2014 text, but identical effect, so this gets the UA source
			name : "Soul of Vengeance",
			source : [["UA23PT6", 40], ["P", 88], ["MJ:HB", 0]],
			minlevel : 15,
			description : "\n   " + "When an enemy I have an active Vow of Enmity against makes an attack, I can react" + "\n   " + "As a reaction, I can make a melee weapon attack against it if it is within range",
			action : ["reaction", " (with Vow of Enmity)"],
		},
		"subclassfeature20" : { //Ripped directly from all_WotC_pub+UA.js and then altered
			name : "Avenging Angel",
			source : [["UA23PT6", 40], ["P", 88], ["MJ:HB", 0]],
			minlevel : 20,
			description : desc([
				"As an Bonus Action, I imbue my Aura of Protection with primal power for 10 minutes and gain benefits:",
				" \u2022 I gain a Fly Speed equal to my Speed and I can Hover",
				" \u2022 When an enemy creature first enters or starts its turn in the aura, it must make a Wis save",
				" \u2022 If failed, for 1 min or until it takes damage, it is frightened and attacks vs. it have adv.",
				"I can do this once per long rest, or by expending a 5th-level or higher spell slot (SS 5+)",
			]),
			recovery : "long rest",
			usages : 1,
			altResource : "SS 5+",
			action : ["bonus action", ""]
		},
	},
});

// Add UA23PT6 Ranger class
ClassList.ranger_ua23pt6 = {
	name : "Ranger (UA:PT-vi)",
	regExpSearch : /^((?=.*(ranger))|((?=.*(nature))(?=.*(knight|fighter|warrior|warlord)))).*$/i,
	source : [["UA23PT6", 41], ["MJ:HB", 0]],
	primaryAbility : "Dexterity and Wisdom",
	prerequisite : "Dexterity 13+ and Wisdom 13+",
	prereqeval : function(v) {
		return What('Dex') >= 13 && What('Wis') >= 13;
	},
	die : 10,
	improvements : [0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 5, 5],
	saves : ["Str", "Dex"],
	skills : ["\n\n" + toUni("Ranger") + ": Choose three from Animal Handling, Athletics, Insight, Investigation, Nature, Perception, Stealth, Survival", ": Choose one from Animal Handling, Athletics, Insight, Investigation, Nature, Perception, Stealth, Survival"],
	armor : [
		[true, true, false, true],
		[true, true, false, true],
	],
	weapons : [
		[true, true, [""]],
		[false, true, [""]],
	],
	equipment : "Ranger starting equipment:" +
		"\n \u2022 Studded Leather Armor," +
		"\n \u2022 Arrows (20)," +
		"\n \u2022 Druidic Focus (Sprig of Mistletoe)," +
		"\n \u2022 Explorer's Pack," +
		"\n \u2022 Longsword or Shortbow," +
		"\n \u2022 Quiver," +
		"\n \u2022 Scimitar," +
		"\n \u2022 Shortsword," +
		"\n \u2022 and 7 gp;" +
		"\n\nAlternatively, choose 150 gp worth of starting equipment instead of the class' starting equipment.",
	subclasses : ["Ranger Archetype", []],
	attacks : [1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
	abilitySave : 5,
	spellcastingFactor : 2,
	spellcastingKnown : {
		spells : "list",
		prepared : true
	},
	spellcastingList : {
		class : ["ranger", "ranger_ua23pt6"],
	},
	features : {
		"deft explorer ua23pt6" : { //Favored Terrain components ripped directly from ListClasses.js and then altered
			name : "Deft Explorer",
			source : [["UA23PT6", 42], ["SRD", 36], ["P", 91], ["MJ:HB", 0]],
			minlevel : 1,
			description : desc([
				"I gain Expertise in one of the skills I chose to be Proficient in when I chose the Ranger class.",
				"In addition, I choose two types of terrain using the \"Choose Feature\" button above.",
				"I have Adv. on Int (Nature) checks about the chosen terrains, and I have Adv. on Wis (Survival) checks to track creatures in them.",
				"I can replace one of the chosen terrain types after a Long Rest.",
			]),
			skillstxt : "Expertise in one of the skills I chose to be Proficient in when I chose the Ranger class.",
			extraname : "Favored Terrain",
			extrachoices : ["Arctic", "Coast", "Desert", "Forest", "Grassland", "Mountain", "Swamp", "Underdark"],
			extraTimes : levels.map(function (n) { return n < 9 ? 2 : 4; }),
			"arctic" : {
				name : "Arctic",
				source : [["UA23PT6", 42], ["SRD", 36], ["P", 91], ["MJ:HB", 0]],
				description : "",
			},
			"coast" : {
				name : "Coast",
				source : [["UA23PT6", 42], ["SRD", 36], ["P", 91], ["MJ:HB", 0]],
				description : "",
			},
			"desert" : {
				name : "Desert",
				source : [["UA23PT6", 42], ["SRD", 36], ["P", 91], ["MJ:HB", 0]],
				description : "",
			},
			"forest" : {
				name : "Forest",
				source : [["UA23PT6", 42], ["SRD", 36], ["P", 91], ["MJ:HB", 0]],
				description : "",
			},
			"grassland" : {
				name : "Grassland",
				source : [["UA23PT6", 42], ["SRD", 36], ["P", 91], ["MJ:HB", 0]],
				description : "",
			},
			"mountain" : {
				name : "Mountain",
				source : [["UA23PT6", 42], ["SRD", 36], ["P", 91], ["MJ:HB", 0]],
				description : "",
			},
			"swamp" : {
				name : "Swamp",
				source : [["UA23PT6", 42], ["SRD", 36], ["P", 91], ["MJ:HB", 0]],
				description : "",
			},
			"underdark" : {
				name : "Underdark",
				source : [["UA23PT6", 42], ["SRD", 36], ["P", 91], ["MJ:HB", 0]],
				description : "",
			},
		},
		"spellcasting ua23pt6" : { //Copied and altered from Paladin class in this script
			name : "Spellcasting",
			source : [["UA23PT6", 43], ["SRD", 31], ["P", 84], ["MJ:HB", 0]],
			minlevel : 1,
			description : desc([
				"I can cast prepared ranger spells, using Wisdom as my spellcasting ability",
				"I can use a Druidic Focus as a spellcasting focus for my ranger spells",
			]),
		},
		"weapon mastery ua23pt6" : { //Using Reaction Fields for this because there are too many possible weapons to choose from and I don't know how to code FeatureChoices to take that vast number of possible weapons into account.
			name : "Weapon Mastery",
			source : [["UA23PT6", 43], ["MJ:HB", 0]],
			minlevel : 1,
			description : desc([
				"I can use the Mastery property of two kinds of weapons of my choice with which I have proficiency.",
				"I can change what weapons I can use the Mastery property of after finishing a Long Rest.",
			]),
			action : [
				["reaction", "Wpn Mstry 1: [Wpn Name]"],
				["reaction", "Wpn Mstry 2: [Wpn Name]"],
			],
		},
		"favored enemy ua23pt6" : {
			name : "Favored Enemy",
			source : [["UA23PT6", 43], ["MJ:HB", 0]],
			minlevel : 2,
			description : desc([
				"I now always have the Hunter's Mark (UA23PT6) spell prepared.",
				"I can cast it Wis mod (min 1) times without using a spell slot per Long Rest.",
			]),
			spellcastingBonus : {
				name : "Hunter's Mark (UA23PT6)",
				spells : ["hunter's mark ua23pt6"],
				selection : ["hunter's mark ua23pt6"],
				times : 1,
			},
			usages : "Wisdom modifier per ",
			usagescalc : "event.value = Math.max(1, What('Wis Mod'));",
			recovery : "long rest",
			action : [["bonus action", " (Hunter's Mark)"]],
		},
		"fighting style ua23pt6" : { //Ripped directly from ListClasses.js and then altered
			name : "Fighting Style",
			source : [["UA23PT6", 43], ["SRD", 36], ["P", 91], ["MJ:HB", 0]],
			minlevel : 2,
			description : desc([
				"Choose a Fighting Style feat for the ranger using the \"Choose Feature\" button above.",
				"The chosen option will appear in pg 3's Notes section & in the list of feats",
			]),
		},
		"subclassfeature3" : { //Ripped directly from ListClasses.js
			name : "Ranger Archetype",
			source : [["SRD", 37], ["P", 92]],
			minlevel : 3,
			description : desc('Choose a Ranger Archetype you strive to emulate and put it in the "Class" field ')
		},
		"roving ua23pt6" : {
			name : "Roving",
			source : [["UA23PT6", 43], ["MJ:HB", 0]],
			minlevel : 6,
			description : desc([
				"My Speed increases by 10 feet when not wearing Heavy Armor.",
				"I also gain a Climb & Swim Speed equal to my Speed.",
			]),
			speed : {
				climb : { spd : "walk", enc : "walk" },
				swim : { spd : "walk", enc : "walk" },
				allModes : "+10",
			},
		},
		"conjure barrage ua23pt6" : {
			name : "Conjure Barrage",
			source : [["UA23PT6", 44], ["MJ:HB", 0]],
			minlevel : 9,
			description : desc([
				"I now always have the Conjure Barrage (UA23PT6) spell prepared.",
			]),
			spellcastingBonus : {
				name : "Conjure Barrage (UA23PT6)",
				spells : ["conjure barrage ua23pt6"],
				selection : ["conjure barrage ua23pt6"],
				times : 1,
			},
		},
		"tireless ua23pt6" : {
			name : "Tireless",
			source : [["UA23PT6", 44], ["MJ:HB", 0]],
			minlevel : 10,
			description : desc([
				"Wis mod (min 1) number of times per Long Rest, I can use an action to gain Temp HP equal to 1d8 + Wis mod (min 1).",
				"Taking a Short Rest decreases my Exhaustion level, if any, by 1.",
			]),
			usages : "Wisdom modifier per ",
			usagescalc : "event.value = Math.max(1, What('Wis Mod'));",
			recovery : "long rest",
			action : [["action", " (Add Temp HP)"]],
		},
		"natures veil ua23pt6" : {
			name : "Nature's Veil",
			source : [["UA23PT6", 44], ["MJ:HB", 0]],
			minlevel : 14,
			description : desc([
				"As a Bonus Action, I can make myself Invisible until the end of my next turn.",
				"I can do this a number times equal to my Wis mod (min 1).",
			]),
			usages : "Wisdom modifier per ",
			usagescalc : "event.value = Math.max(1, What('Wis Mod'));",
			recovery : "long rest",
			action : [["action", ""]],
		},
		"conjure volley ua23pt6" : {
			name : "Conjure Volley",
			source : [["UA23PT6", 44], ["MJ:HB", 0]],
			minlevel : 17,
			description : desc([
				"I now always have the Conjure Volley (UA23PT6) spell prepared.",
			]),
			spellcastingBonus : {
				name : "Conjure Volley (UA23PT6)",
				spells : ["conjure volley ua23pt6"],
				selection : ["conjure volley ua23pt6"],
				times : 1,
			},
		},
		"feral senses ua23pt6" : { //Ripped directly from ListClasses.js and then altered
			name : "Feral Senses",
			source : [["UA23PT6", 44], ["SRD", 37], ["P", 92], ["MJ:HB", 0]],
			minlevel : 18,
			description : desc([
				"I gain 30 ft Blindsight.",
			]),
			vision : [["Blindsight", 30]],
		},
		"foe slayer ua23pt6" : { //Ripped directly from ListClasses.js and then altered
			name : "Foe Slayer",
			source : [["UA23PT6", 44], ["SRD", 37], ["P", 92], ["MJ:HB", 0]],
			minlevel : 20,
			description : desc([
				"I can add my Wis mod to the attack and damage roll vs. the target of my Hunter's Mark",
			]),
		},
	},
};

//// Add Ranger "Fighting Style" choices
AddFeatureChoice(ClassList.ranger_ua23pt6.features["fighting style ua23pt6"], true, "Fighting Style: Archery", {
	name : "Fighting Style: Archery",
	extraname : "Ranger 2",
	source : [["UA23PT6", 43], ["MJ:HB", 0]],
	description : "\n   " + "I have chosen the Archery Fighting Style feat.",
	prereqeval : function (v) { return classes.known.ranger_ua23pt6.level >= 2 ? true : "skip"; },
	eval : function() { AddFeat("archery fighting style ua23pt6"); },
	removeeval : function() { RemoveFeat("archery fighting style ua23pt6"); }
}, "2nd-level ranger Fighting Style choice");
AddFeatureChoice(ClassList.ranger_ua23pt6.features["fighting style ua23pt6"], true, "Fighting Style: Defense", {
	name : "Fighting Style: Defense",
	extraname : "Ranger 2",
	source : [["UA23PT6", 43], ["MJ:HB", 0]],
	description : "\n   " + "I have chosen the Defense Fighting Style feat.",
	prereqeval : function (v) { return classes.known.ranger_ua23pt6.level >= 2 ? true : "skip"; },
	eval : function() { AddFeat("defense fighting style ua23pt6"); },
	removeeval : function() { RemoveFeat("defense fighting style ua23pt6"); }
}, "2nd-level ranger Fighting Style choice");
AddFeatureChoice(ClassList.ranger_ua23pt6.features["fighting style ua23pt6"], true, "Fighting Style: Dueling", {
	name : "Fighting Style: Dueling",
	extraname : "Ranger 2",
	source : [["UA23PT6", 43], ["MJ:HB", 0]],
	description : "\n   " + "I have chosen the Dueling Fighting Style feat.",
	prereqeval : function (v) { return classes.known.ranger_ua23pt6.level >= 2 ? true : "skip"; },
	eval : function() { AddFeat("dueling fighting style ua23pt6"); },
	removeeval : function() { RemoveFeat("dueling fighting style ua23pt6"); }
}, "2nd-level ranger Fighting Style choice");
AddFeatureChoice(ClassList.ranger_ua23pt6.features["fighting style ua23pt6"], true, "Fighting Style: Two-Weapon Fighting", {
	name : "Fighting Style: Two-Weapon Fighting",
	extraname : "Ranger 2",
	source : [["UA23PT6", 43], ["MJ:HB", 0]],
	description : "\n   " + "I have chosen the Two-Weapon Fighting Style feat.",
	prereqeval : function (v) { return classes.known.ranger_ua23pt6.level >= 2 ? true : "skip"; },
	eval : function() { AddFeat("two_weapon fighting style ua23pt6"); },
	removeeval : function() { RemoveFeat("two_weapon fighting style ua23pt6"); }
}, "2nd-level ranger Fighting Style choice");

//// Add Ranger optional choices
AddFeatureChoice(ClassList.ranger_ua23pt6.features["spellcasting ua23pt6"], true, "Access to Dunamancy Spells", {
	name : "Dunamancy Spells",
	extraname : "Optional Ranger 1",
	source : [["W", 186]],
	description : desc([
		"All dunamancy spells are added to the ranger spell list, each still pending DM's approval"
	]),
	calcChanges : {
		spellList : [
			function(spList, spName, spType) {
				// Stop this is not the class' spell list or if this is for a bonus spell entry
				if (spName !== "ranger_ua23pt6" || spType.indexOf("bonus") !== -1) return;
				spList.extraspells = spList.extraspells.concat(["gift of alacrity", "magnify gravity", "fortune's favor", "immovable object", "wristpocket", "pulse wave", "gravity sinkhole", "temporal shunt"]);
			},
			"This optional class feature expands the spell list of the ranger class with all dunamancy spells (spell level in brackets): Gift of Alacrity (1), Magnify Gravity (1), Fortune's Favor (2), Immovable Object (2), Wristpocket (2), Pulse Wave (3), Gravity Sinkhole (4), and Temporal Shunt (5)."
		]
	}
}, "Optional 1st-level ranger features");

////// Add UA23PT6 Beast Master Ranger subclass
AddSubClass("ranger_ua23pt6", "beast master_ua23pt6", {
	regExpSearch : /^(?=.*(beast))((?=.*(master))|((?=.*(nature|natural))(?=.*(knight|fighter|warrior|warlord)))).*$/i,
	subname : "Beast Master Ranger",
	source : [["UA23PT6", 45], ["P", 93], ["MJ:HB", 0]],
	features : {
		"subclassfeature3" : {
			name : "Ranger's Companion",
			source : [["UA23PT6", 45], ["MJ:HB", 0]],
			minlevel : 3,
			description : desc([
				"Choose a primal beast using the \"Companion Options\" button on the Companion Sheet.",
				"I have my choice of a \"Beast of the Land\", a \"Beast of the Sea\", or a \"Beast of the Sky\";",
				"After summoning, I can summon a different primal beast after a Long Rest.",
			]),
		},
		"subclassfeature7" : { //Ripped directly from all_WotC_pub+UA.js and then altered
			name : "Exceptional Training",
			source : [["UA23PT6", 46], ["P", 93], ["MJ:HB", 0]],
			minlevel : 7,
			description : desc([
				"My Primal Companion's attacks count can deal Force damage or its normal damage type.",
				"As a bonus action, I can command it to take the Dash/Disengage/Dodge/Help action on its turn.",
			]),
		},
		"subclassfeature11" : { //Ripped directly from all_WotC_pub+UA.js and then altered
			name : "Bestial Fury",
			source : [["UA23PT6", 46], ["P", 93], ["MJ:HB", 0]],
			minlevel : 11,
			description : desc([
				"When I command my Primal Companion to use the Attack action, it can attack twice on its turn.",
				"Additionally, Primal Companion deals extra Force damage to target of my Hunter's Mark spell;",
				"This second benefit occurs only the 1st time each turn the Primal Companion hits a creature.",
			]),
		},
		"subclassfeature15" : { //Ripped directly from all_WotC_pub+UA.js and then altered
			name : "Share Spells",
			source : [["UA23PT6", 46], ["P", 93], ["MJ:HB", 0]],
			minlevel : 15,
			description : desc([
				"When I cast a spell on myself, I can have it also affect my Primal Companion if it is within 30 ft.",
			]),
		},
	},
});

////// Add UA23PT6 Gloom Stalker Ranger subclass
AddSubClass("ranger_ua23pt6", "gloom stalker_ua23pt6", {
	regExpSearch : /^((?=.*(ranger))|((?=.*(nature))(?=.*(knight|fighter|warrior|warlord))))(?=.*gloom)(?=.*stalker).*$/i,
	subname : "Gloom Stalker Ranger",
	source : [["UA23PT6", 46], ["X", 42], ["MJ:HB", 0]],
	spellcastingExtra : ["disguise self", "rope trick", "fear", "greater invisibility", "seeming"],
	features : {
		"subclassfeature3" : { //Ripped directly from all_WotC_pub+UA.js and then altered
			name : "Dread Ambusher",
			source : [["UA23PT6", 46], ["X", 42], ["MJ:HB", 0]],
			minlevel : 3,
			description : desc([
				"I can add my Wisdom modifier to my initiative rolls, and I get +10 ft speed in the first turn of combat.",
				"Additionally, once per turn when I hit with a weapon, I can deal +1d8 Psychic damage to target;",
				"That target make Wis save or be Frightened until start of my next turn. I can do this Wis mod times per Long Rest.",
			]),
			addMod : { type : "skill", field : "Init", mod : "max(Wis|0)", text : "I can add my Wisdom modifier to my initiative rolls." }
		},
		"subclassfeature3.1" : { //Ripped directly from all_WotC_pub+UA.js and then altered
			name : "Umbral Sight",
			source : [["UA23PT6", 46], ["X", 42], ["MJ:HB", 0]],
			minlevel : 3,
			description : desc([
				"I gain 60 ft Darkvision, or add 60 ft to Darkvision if I already had it from any source.",
				"When I'm entirely in darkness, I have the Invisible condition to any creature that relies",
				"  on Darkvision to see me in that darkness.",
			]),
			vision : [["Darkvision", "fixed 60"], ["Darkvision", "+60"]]
		},
		"subclassfeature7" : { //Ripped directly from all_WotC_pub+UA.js and then altered
			name : "Iron Mind",
			source : [["UA23PT6", 46], ["X", 42], ["MJ:HB", 0]],
			minlevel : 7,
			description : "\n   " + "I gain proficiency with Wis saves, or if I'm already proficient, either Int or Cha saves",
			saves : ["Wis"]
		},
		"subclassfeature11" : {
			name : "Stalker's Flurry",
			source : [["UA23PT6", 47], ["MJ:HB", 0]],
			minlevel : 11,
			description : desc([
				"When I use the Frighten effect of my Dread Ambusher feature, I can do one of the following:",
				" \u2022 Sudden Strike. I can attack another creature within 5 ft of the original target that is within weapon range.",
				" \u2022 Mass Fear. Each creature within 10 ft of the target make Wis save or be Frightened until start of my next turn.",
			]),
		},
		"subclassfeature15" : { //Ripped directly from all_WotC_pub+UA.js and then altered
			name : "Shadowy Dodge",
			source : [["UA23PT6", 47], ["X", 42], ["MJ:HB", 0]],
			minlevel : 15,
			description : desc([
				"As a reaction when I'm attacked, I can impose disadv. on the attack roll.",
				"If the attack then misses, I can teleport up to 30 ft.",
			]),
			action : ["reaction", " (when attacked)"]
		},
	},
});

////// Add UA23PT6 Hunter Ranger subclass
AddSubClass("ranger_ua23pt6", "hunter_ua23pt6", {
	regExpSearch : /^(?=.*(hunter|huntress)).*$/i,
	subname : "Hunter Ranger",
	source : [["UA23PT6", 47], ["SRD", 37], ["P", 93], ["MJ:HB", 0]],
	features : {
		"subclassfeature3" : {
			name : "Hunter's Prey",
			source : [["UA23PT6", 47], ["SRD", 37], ["P", 93], ["MJ:HB", 0]],
			minlevel : 3,
			description : "\n   " + "Choose a Hunter's Prey option using the \"Choose Feature\" button above.",
			extraname : "Hunter's Prey",
			extrachoices : ["Hunter's Prey: Colossus Slayer", "Hunter's Prey: Horde Breaker", "Hunter's Prey: Retaliator"],
			extraTimes : levels.map(function (n) { return n < 11 ? 1 : 2; }),
			"hunter's prey: colossus slayer" : {
				name : "Hunter's Prey: Colossus Slayer",
				source : [["UA23PT6", 47], ["SRD", 37], ["P", 93], ["MJ:HB", 0]],
				description : desc("Once per turn, when hitting someone that is below max HP, I do an extra 1d8 damage"),
			},
			"hunter's prey: horde breaker" : {
				name : "Hunter's Prey: Horde Breaker",
				source : [["UA23PT6", 47], ["SRD", 37], ["P", 93], ["MJ:HB", 0]],
				description : desc("Once per turn, when I hit a creature, I can make an attack vs. another within 5 ft of it"),
			},
			"hunter's prey: retaliator" : {
				name : "Hunter's Prey: Retaliator",
				source : [["UA23PT6", 47], ["MJ:HB", 0]],
				description : desc("As a Reaction, when an enemy in 5 ft attacks me, I can attack it once"),
				action : ["reaction", ""],
			},
		},
		"subclasfeature3.1" : {
			name : "Hunter's Lore",
			source : [["UA23PT6", 47], ["MJ:HB", 0]],
			minlevel : 3,
			description : desc([
				"While a creature is marked by my Hunter's Mark, I know the following about it:",
				"Damage/condition immunities, damage resistances, and/or damage vulnerabilities.",
			]),
		},
		"subclassfeature7" : {
			name : "Defensive Tactics",
			source : [["UA23PT6", 47], ["MJ:HB", 0]],
			minlevel : 7,
			description : "\n   " + "Choose a Defensive Tactics option using the \"Choose Feature\" button above.",
			extraname : "Defensive Tactics",
			extrachoices : ["Defensive Tactics: Evasion", "Defensive Tactics: Hunter's Leap", "Defensive Tactics: Uncanny Dodge"],
			extraTimes : levels.map(function (n) { return n < 15 ? 1 : 2; }),
			"defensive tactics: evasion" : { //Description & savetxt attributes ripped directly from Monk 7 in ListClasses.js
				name : "Defensive Tactics: Evasion",
				source : [["UA23PT6", 47], ["MJ:HB", 0]],
				description : desc("My Dexterity saves vs. areas of effect negate damage on success and halve it on failure"),
				savetxt : { text : ["Dex save vs. area effects: fail \u2015 half dmg, success \u2015 no dmg"] },
			},
			"defensive tactics: hunter's leap" : {
				name : "Defensive Tactics: Hunter's Leap",
				source : [["UA23PT6", 47], ["MJ:HB", 0]],
				description : desc([
					"When a creature I can see comes within 5 ft, I can use a Reaction to move half my Speed",
					"  without provoking Opportunity Attacks",
				]),
				action : ["reaction", ""],
			},
			"defensive tactics: uncanny dodge" : { //Description & action attributes ripped directly from Rogue 5 in ListClasses.js
				name : "Defensive Tactics: Uncanny Dodge",
				source : [["UA23PT6", 47], ["MJ:HB", 0]],
				description : desc("As a Reaction, I can halve the damage of an attack from an attacker that I can see"),
				action : ["reaction", ""],
			},
		},
		"subclassfeature11" : {
			name : "Superior Hunter's Prey",
			source : [["UA23PT6", 47], ["MJ:HB", 0]],
			minlevel : 11,
			description : "\n   " + "Choose another Hunter's Prey option using the \"Choose Feature\" button above.",
		},
		"subclassfeature15" : {
			name : "Superior Hunter's Defense",
			source : [["UA23PT6", 47], ["MJ:HB", 0]],
			minlevel : 15,
			description : "\n   " + "Choose another Defensive Tactics option using the \"Choose Feature\" button above.",
		},
	},
});

// Add UA23PT6 Rogue class
ClassList.rogue_ua23pt6 = {
	name : "Rogue (UA:PT-vi)",
	regExpSearch : /(rogue)/i,
	source : [["UA23PT6", 48], ["MJ:HB", 0]],
	primaryAbility : "Dexterity",
	prerequisite : "Dexterity 13+",
	prereqeval : function(v) {
		return What('Dex') >= 13;
	},
	die : 8,
	improvements : [0, 0, 0, 1, 1, 1, 1, 2, 2, 3, 3, 4, 4, 4, 4, 5, 5, 5, 6, 6],
	saves : ["Dex", "Int"],
	skills : ["\n\n" + toUni("Rogue") + ": Choose four from Acrobatics, Athletics, Deception, Insight, Intimidation, Investigation, Perception, Persuasion, Sleight of Hand, Stealth", ": Choose one from Acrobatics, Athletics, Deception, Insight, Intimidation, Investigation, Perception, Persuasion, Sleight of Hand, Stealth"],
	armor : [
		[true, false, false, false],
		[true, false, false, false],
	],
	toolProfs : {
		primary : [["Thieves' tools", "Dex"]],
		secondary : [["Thieves' tools", "Dex"]],
	},
	weapons : [
		[true, true, ["Martial weapons with the Finesse property"]],
		[false, true, ["Martial weapons with the Finesse property"]],
	],
	equipment : "Rogue starting equipment:" +
		"\n \u2022 Leather Armor," +
		"\n \u2022 Arrows (20)," +
		"\n \u2022 Burglar's Pack," +
		"\n \u2022 Dagger (2)," +
		"\n \u2022 Quiver," +
		"\n \u2022 Shortbow," +
		"\n \u2022 Shortsword," +
		"\n \u2022 Thieves' tools," +
		"\n \u2022 and 18 gp;" +
		"\n\nAlternatively, choose 110 gp worth of starting equipment instead of the class' starting equipment.",
	subclasses : ["Roguish Archetype", []],
	attacks : [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	abilitySave : 2,
	features : {
		"expertise ua23pt6" : function() { //Ripped directly from ListClasses.js; left unaltered aside from adding UA source
			var a = {
				name : "Expertise",
				source : [["UA23PT6", 49], ["SRD", 39], ["P", 96]],
				minlevel : 1,
				description : desc("I gain expertise with two skills/thieves' tools I am proficient with; two more at 6th level"),
				skillstxt : "Expertise with any two skill proficiencies and/or thieves' tools, and two more at 6th level",
				additional : levels.map(function (n) {
					return "with " + (n < 6 ? 2 : 4) + " skills";
				}),
				extraname : "Expertise",
				extrachoices : ["Acrobatics", "Animal Handling", "Arcana", "Athletics", "Deception", "History", "Insight", "Intimidation", "Investigation", "Medicine", "Nature", "Perception", "Performance", "Persuasion", "Religion", "Sleight of Hand", "Stealth", "Survival", "Thieves' Tools"],
				extraTimes : levels.map(function (n) { return n < 6 ? 2 : 4; }),
				"thieves' tools" : {
					name : "Thieves' Tools Expertise", description : "",
					source : [["SRD", 39], ["P", 96]],
					prereqeval : function(v) {
						if ((/thieve.?s.*tools/i).test(What('Too Text')) && tDoc.getField("Too Prof").isBoxChecked(0)) {
							return tDoc.getField("Too Exp").isBoxChecked(0) ? "markButDisable" : true;
						} else {
							return CurrentProfs.tool["thieves' tools"] || (/thieve.?s.{1,3}tools/i).test(v.toolProfs.toString());
						}
					},
					eval : function () {
						if ((/thieve.?s.*tools/i).test(What('Too Text'))) {
							Checkbox('Too Exp', true);
						};
					},
					removeeval : function () {
						if ((/thieve.?s.*tools/i).test(What('Too Text'))) {
							Checkbox('Too Exp', false);
						};
					},
				},
			};
			for (var i = 0; i < a.extrachoices.length; i++) {
				var attr = a.extrachoices[i].toLowerCase();
				if (a[attr]) continue;
				a[attr] = {
					name : a.extrachoices[i] + " Expertise",
					description : "",
					source : a.source,
					skills : [[a.extrachoices[i], "only"]],
					prereqeval : function(v) {
						return v.skillProfsLC.indexOf(v.choice) === -1 ? false : v.skillExpertiseLC.indexOf(v.choice) === -1 ? true : "markButDisable";
					}
				};
			}
			return a;
		}(),
		"sneak attack ua23pt6" : { //Ripped directly from ListClasses.js; left unaltered aside from adding UA source
			name : "Sneak Attack",
			source : [["UA23PT6", 49], ["SRD", 39], ["P", 96]],
			minlevel : 1,
			description : desc([
				"Once per turn, I can add damage to a finesse/ranged weapon attack if I have advantage",
				"I don't need adv. if the target has a conscious enemy within 5 ft and I don't have disadv."
			]),
			additional : levels.map(function (n) {
				return Math.ceil(n / 2) + "d6";
			}),
			calcChanges : {
				atkAdd : [
					function (fields, v) {
						if (classes.known.rogue && classes.known.rogue.level && !v.isSpell && !v.isDC && (v.isRangedWeapon || (/\bfinesse\b/i).test(fields.Description))) {
							v.sneakAtk = Math.ceil(classes.known.rogue.level / 2);
							fields.Description += (fields.Description ? '; ' : '') + 'Sneak attack ' + v.sneakAtk + 'd6';
						};
					},
					"Once per turn, when I attack with a ranged or finesse weapon while I have advantage or an conscious ally is within 5 ft of the target, I can add my sneak attack damage to the attack.",
					700
				]
			}
		},
		"thieves cant ua23pt6" : { //Ripped directly from ListClasses.js; left unaltered aside from adding UA source
			name : "Thieves' Cant",
			source : [["UA23PT6", 50], ["SRD", 39], ["P", 96]],
			minlevel : 1,
			description : desc("I know the secret rogue language that I can use to convey messages inconspicuously"),
			languageProfs : ["Thieves' Cant"]
		},
		"weapon mastery ua23pt6" : { //Using Reaction Fields for this because there are too many possible weapons to choose from and I don't know how to code FeatureChoices to take that vast number of possible weapons into account.
			name : "Weapon Mastery",
			source : [["UA23PT6", 50], ["MJ:HB", 0]],
			minlevel : 1,
			description : desc([
				"I can use the Mastery property of two kinds of weapons of my choice with which I have proficiency.",
				"I can change what weapons I can use the Mastery property of after finishing a Long Rest.",
			]),
			action : [
				["reaction", "Wpn Mstry 1: [Wpn Name]"],
				["reaction", "Wpn Mstry 2: [Wpn Name]"],
			],
		},
		"cunning action ua23pt6" : { //Ripped directly from ListClasses.js; left unaltered aside from adding UA source
			name : "Cunning Action",
			source : [["UA23PT6", 50], ["SRD", 40], ["P", 96]],
			minlevel : 2,
			description : desc("I can use a Bonus Action to take the Dash, Disengage, or Hide action"),
			action : ["bonus action", ""]
		},
		"steady aim ua23pt6" : { //Description attribute ripped from all_WotC_pub+UA.js
			name : "Steady Aim",
			source : [["UA23PT6", 50], ["T", 62], ["MJ:HB", 0]],
			minlevel : 3,
			description : desc([
				"As a Bonus Action if I don't move during my turn, I can give myself Adv. on my next attack",
				"This attack roll has to be in the same turn and my speed is 0 until the end of the turn",
			]),
			action : ["bonus action", ""]
		},
		"subclassfeature3" : { //Ripped directly from ListClasses.js
			name : "Roguish Archetype",
			source : [["UA23PT6", 50], ["SRD", 40], ["P", 96], ["MJ:HB", 0]],
			minlevel : 3,
			description : desc('Choose a Roguish Archetype you strive to emulate and put it in the "Class" field ')
		},
		"cunning strike ua23pt6" : {
			name : "Cunning Strike",
			source : [["UA23PT6", 50], ["MJ:HB", 0]],
			minlevel : 5,
			description : desc([
				"When I deal Sneak Attack damage, I can add one of the following effects.",
				"Each effect has a die cost, which is the number of Sneak Attack damage dice I must forego to add the effect.",
				"Remove the die before rolling damage, and the effect occurs immediately after the damage is dealt.",
				" \u2022 Disarm (1d6). Target make a Dex save or it drops one item of my choice that it’s holding.",
				" \u2022 Poison (1d6). Target make a Con save or it gains the Poisoned condition for 1 min;",
				"  Target save at end of turn to end condition. I need a Poisoner's Kit on my person to use this one.",
				" \u2022 Trip (1d6). If target is Large or smaller, it makes a Dex save or gains the Prone condition.",
				" \u2022 Withdraw (1d6). Immediately after the attack, I move half my Speed without provoking Opportunity Attacks.",
			]),
		},
		"uncanny dodge ua23pt6" : { //Ripped directly from ListClasses.js; left unaltered aside from adding UA source
			name : "Uncanny Dodge",
			source : [["UA23PT6", 50], ["SRD", 40], ["P", 96]],
			minlevel : 5,
			description : desc("As a Reaction, I can halve the damage of an attack from an attacker that I can see"),
			action : ["reaction", ""]
		},
		"evasion ua23pt6" : { //Ripped directly from ListClasses.js; left unaltered aside from adding UA source
			name : "Evasion",
			source : [["UA23PT6", 50], ["SRD", 40], ["P", 96]],
			minlevel : 7,
			description : desc("My Dexterity saves vs. areas of effect negate damage on success and halve it on failure"),
			savetxt : { text : ["Dex save vs. area effects: fail \u2015 half dmg, success \u2015 no dmg"] }
		},
		"reliable talent ua23pt6" : { //Ripped directly from ListClasses.js; left unaltered aside from adding UA source
			name : "Reliable Talent",
			source : [["UA23PT6", 51], ["SRD", 40], ["P", 96]],
			minlevel : 7,
			description : desc("If I make an ability check where I add my Proficiency Bonus, rolls of 9 or lower are 10")
		},
		"improved cunning strike ua23pt6" : {
			name : "Improved Cunning Strike",
			source : [["UA23PT6", 51], ["MJ:HB", 0]],
			minlevel : 11,
			description : desc([
				"I can use up to two Cunning Strike effects when I deal Sneak Attack damage.",
				"I have to pay the die cost for each effect.",
			]),
		},
		"devious strikes ua23pt6" : {
			name : "Devious Strikes",
			source : [["UA23PT6", 51], ["MJ:HB", 0]],
			minlevel : 14,
			description : desc([
				"I gain the following new Cunning Strike effects:",
				" \u2022 Daze (2d6). Target make a Con save or it gains the Dazed condition until end of its next turn.",
				" \u2022 Knock Out (6d6). Target make a Con save or it gains the Unconscious condition for 1 min;",
				"  Target save at end of turn to end condition. Condition ends if target takes any damage.",
				" \u2022 Obscure (3d6). Target make a Dex save or it gains the Blinded condition until end of its next turn.",
			]),
		},
		"slippery mind ua23pt6" : { //Ripped directly from ListClasses.js and then altered
			name : "Slippery Mind",
			source : [["UA23PT6", 51], ["SRD", 40], ["P", 96], ["MJ:HB", 0]],
			minlevel : 15,
			description : desc("I am proficient with Wisdom and Charisma saving throws"),
			saves : ["Wis", "Cha"]
		},
		"elusive ua23pt6" : { //Ripped directly from ListClasses.js; left unaltered aside from adding UA source
			name : "Elusive",
			source : [["UA23PT6", 51], ["SRD", 40], ["P", 96]],
			minlevel : 18,
			description : desc("Attackers do not gain advantage on attacks vs. me, unless I am Incapacitated")
		},
		"stroke of luck ua23pt6" : { //Ripped directly from ListClasses.js and then altered
			name : "Stroke of Luck",
			source : [["UA23PT6", 51], ["SRD", 40], ["P", 97], ["MJ:HB", 0]],
			minlevel : 20,
			description : desc("I can turn a failed d20 Test into a natural 20"),
			recovery : "short rest",
			usages : 1
		},
	},
};

////// Add UA23PT6 Arcane Trickster Rogue subclass
AddSubClass("rogue_ua23pt6", "arcane trickster_ua23pt6", { //Ripped directly from all_WotC_pub+UA.js and then altered
	regExpSearch : /^(?=.*(trickster|rogue))(?=.*\b(eldritch|arcane|magic|mage)\b).*$/i,
	subname : "Arcane Trickster",
	source : [["UA23PT6", 51], ["P", 98], ["MJ:HB", 0]],
	abilitySaveAlt : 4,
	spellcastingFactor : 3,
	spellcastingList : {
		"class" : ["wizard", "wizard_ua23pt7"],
		level : [0, 4],
	},
	spellcastingTable : [
		[0, 0, 0, 0, 0, 0, 0, 0, 0], //lvl 0
		[0, 0, 0, 0, 0, 0, 0, 0, 0], //lvl 1
		[0, 0, 0, 0, 0, 0, 0, 0, 0], //lvl 2
		[2, 0, 0, 0, 0, 0, 0, 0, 0], //lvl 3
		[3, 0, 0, 0, 0, 0, 0, 0, 0], //lvl 4
		[3, 0, 0, 0, 0, 0, 0, 0, 0], //lvl 5
		[3, 0, 0, 0, 0, 0, 0, 0, 0], //lvl 6
		[4, 2, 0, 0, 0, 0, 0, 0, 0], //lvl 7
		[4, 2, 0, 0, 0, 0, 0, 0, 0], //lvl 8
		[4, 2, 0, 0, 0, 0, 0, 0, 0], //lvl 9
		[4, 3, 0, 0, 0, 0, 0, 0, 0], //lvl10
		[4, 3, 0, 0, 0, 0, 0, 0, 0], //lvl11
		[4, 3, 0, 0, 0, 0, 0, 0, 0], //lvl12
		[4, 3, 2, 0, 0, 0, 0, 0, 0], //lvl13
		[4, 3, 2, 0, 0, 0, 0, 0, 0], //lvl14
		[4, 3, 2, 0, 0, 0, 0, 0, 0], //lvl15
		[4, 3, 3, 0, 0, 0, 0, 0, 0], //lvl16
		[4, 3, 3, 0, 0, 0, 0, 0, 0], //lvl17
		[4, 3, 3, 0, 0, 0, 0, 0, 0], //lvl18
		[4, 3, 3, 1, 0, 0, 0, 0, 0], //lvl19
		[4, 3, 3, 1, 0, 0, 0, 0, 0], //lvl20
	],
	spellcastingKnown : {
		cantrips : [0, 0, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
		spells : "list",
		prepared : true,
	},
	features : {
		"subclassfeature3" : {
			name : "Spellcasting",
			source : [["UA23PT6", 52], ["P", 98], ["MJ:HB", 0]],
			minlevel : 3,
			description : "\n   " + "I can cast known/prepared Wizard cantrips/spells, using Intelligence as my spellcasting ability",
			additional : ["", "", "3 cantrips \u0026 3 spells prepared", "3 cantrips \u0026 4 spells prepared", "3 cantrips \u0026 4 spells prepared", "3 cantrips \u0026 4 spells prepared", "3 cantrips \u0026 6 spells prepared", "3 cantrips \u0026 6 spells prepared", "3 cantrips \u0026 6 spells prepared", "4 cantrips \u0026 7 spells prepared", "4 cantrips \u0026 7 spells prepared", "4 cantrips \u0026 7 spells prepared", "4 cantrips \u0026 9 spells prepared", "4 cantrips \u0026 9 spells prepared", "4 cantrips \u0026 9 spells prepared", "4 cantrips \u0026 10 spells prepared", "4 cantrips \u0026 10 spells prepared", "4 cantrips \u0026 10 spells prepared", "4 cantrips \u0026 11 spells prepared", "4 cantrips \u0026 11 spells prepared"],
			spellcastingBonus : [{
				name : "Mage Hand cantrip", // the Mage Hand cantrip gained at level 3
				spells : ["mage hand"],
				selection : ["mage hand"],
			}],
		},
		"subclassfeature3.1" : {
			name : "Mage Hand Legerdemain",
			source : [["UA23PT6", 52], ["P", 98]],
			minlevel : 3,
			description : desc([
				"As a bonus action, I can direct my Mage Hand",
				"With a Dex (Sleight of Hand) vs. Wis (Perception) checks, I can do so discreetly",
				"I can make it invisible and perform the following tasks:",
				" \u2022 Stow/retrieve an object the hand is holding in a container worn/carried by another",
				" \u2022 Use thieves' tools to pick locks and disarm traps at range",
			]),
			action : ["bonus action", ""],
			spellChanges : {
				"mage hand" : {
					description : "Invisible hand, carries 10 lb; 1 bns to control, use thieves' tools, or stow/retrieve obj; only 1 instance",
					changes : "My Mage Hand Legerdemain class feature expands my use of the Mage Hand cantrip and makes the spectral hand invisible."
				}
			}
		},
		"subclassfeature9" : {
			name : "Magical Ambush",
			source : [["UA23PT6", 52], ["P", 98], ["MJ:HB", 0]],
			minlevel : 9,
			description : "\n   " + "When I cast a spell while Invisible, the target(s) have Disadvantage against that spell"
		},
		"subclassfeature13" : {
			name : "Versatile Trickster",
			source : [["UA23PT6", 52], ["P", 98], ["MJ:HB", 0]],
			minlevel : 13,
			description : desc([
				"When I use the Disarm or Trip options of my Cunning Strike,",
				"I can also target that option at creature within 5 ft of Mage Hand.",
			]),
		},
		"subclassfeature17" : {
			name : "Spell Thief",
			source : [["UA23PT6", 52], ["P", 98]],
			minlevel : 17,
			description : "\n   " + "As a Reaction, after a spell is cast at me, I can try to negate and steal it" + "\n   " + "The caster makes a save against my spell DC with their spellcasting ability" + "\n   " + "On failure, the caster forgets how to cast that spell for eight hours" + "\n   " + "If I have a spell slot of a high enough level for it, I learn how to cast it during this time",
			action : ["reaction", ""],
			recovery : "long rest",
			usages : 1
		},
	},
});

////// Add UA23PT6 Assassin Rogue subclass
AddSubClass("rogue_ua23pt6", "assassin_ua23pt6", { //Ripped directly from all_WotC_pub+UA.js and then altered
	regExpSearch : /^(?=.*(trickster|rogue))(?=.*assassin).*$/i,
	subname : "Assassin",
	source : [["UA23PT6", 53], ["P", 97], ["MJ:HB", 0]],
	features : {
		"subclassfeature3" : {
			name : "Bonus Proficiencies",
			source : [["UA23PT6", 53], ["P", 97]],
			minlevel : 3,
			description : "\n   " + "I am proficient with Disguise Kits and Poisoner's Kits",
			toolProfs : ["Disguise kit", "Poisoner's kit"]
		},
		"subclassfeature3.1" : {
			name : "Assassinate",
			source : [["UA23PT6", 53], ["P", 97]],
			minlevel : 3,
			description : desc([
				"I have Adv. on attack rolls against creatures that have not taken a turn in combat yet.",
				"Any hit I score against such a creature takes extra damage equal to my Rogue level.",
				"I also have Adv. on Initiative rolls.",
			]),
		},
		"subclassfeature9" : {
			name : "Infiltration Expertise",
			source : [["UA23PT6", 53], ["MJ:HB", 0]],
			minlevel : 9,
			description : desc([
				"While in a disguise created using my Disguise Kit, I have Adv. on Cha (Deception) checks",
				"  while pretending to be someone else. I can also unerringly mimic another person's speech,",
				"  handwriting, or both if I have spent at least 1 hour studying each one.",
			]),
		},
		"subclassfeature13" : {
			name : "Envenom Weapons",
			source : [["UA23PT6", 53], ["MJ:HB", 0]],
			minlevel : 13,
			description : desc([
				"When I use the Poison option of my Cunning Strike, the target takes +2d6 Poison damage",
				"  when it fails the saving throw. This extra damage ignores resistance to Poison damage.",
			]),
		},
		"subclassfeature17" : {
			name : "Death Strike",
			source : [["UA23PT6", 54], ["P", 97], ["MJ:HB", 0]],
			minlevel : 17,
			description : "\n   " + "When I hit a creature that has not taken a turn in combat yet, it must make a Con save or take double damage",
			additional : "Save DC: 8 + Dex mod + Proficiency bonus",
		},
	},
});

////// Add UA23PT6 Swashbuckler Rogue subclass
AddSubClass("rogue_ua23pt6", "swashbuckler_ua23pt6", { //Ripped directly from all_WotC_pub+UA.js and then altered
	regExpSearch : /^(?=.*(trickster|rogue))(?=.*swashbuckl).*$/i,
	subname : "Swashbuckler",
	source : [["UA23PT6", 53], ["S", 135], ["X", 47], ["MJ:HB", 0]],
	features : {
		"subclassfeature3" : {
			name : "Fancy Footwork",
			source : [["UA23PT6", 53], ["S", 135], ["X", 47]],
			minlevel : 3,
			description : desc([
				"Enemies I make a melee attack against in my turn can't use Opportunity Attacks on me",
				"This lasts until the end of my current turn"
			])
		},
		"subclassfeature3.1" : {
			name : "Rakish Audacity",
			source : [["UA23PT6", 54], ["S", 136], ["X", 47]],
			minlevel : 3,
			description : desc([
				"I don't need Advantage to Sneak Attack if my target is the only one within 5 ft of me",
				"I still can't Sneak Attack if I have Disadv.; I add my Charisma modifier to Initiative rolls"
			]),
			addMod : { type : "skill", field : "Init", mod : "max(Cha|0)", text : "I can add my Charisma modifier to initiative rolls." }
		},
		"subclassfeature9" : {
			name : "Panache",
			source : [["UA23PT6", 54], ["MJ:HB", 0]],
			minlevel : 9,
			description : desc([
				"I gain the following new Cunning Strike effects:",
				" \u2022 Goad (1d6). Target make a Con save or until end of next turn, gain disadv. on attacks",
				"  and can't do opportunity attacks vs. not-me",
				" \u2022 Awe (3d6). Targets of my choice within 30 ft make a Wis save or gain the Charmed condition until end of my next turn.",
			]),
		},
		"subclassfeature13" : {
			name : "Dashing Strikes",
			source : [["UA23PT6", 54], ["MJ:HB", 0]],
			minlevel : 13,
			description : desc([
				"I gain the following new Cunning Strike effects:",
				" \u2022 Parrying Stance (2d6). I gain a 1d6 bonus to my AC until the start of my next turn.",
				" \u2022 Invigorate (2d6). Target of my choice within 30 ft +1d6 to attack rolls and saving throws until end of its next turn.",
			]),
		},
		"subclassfeature17" : {
			name : "Master Duelist",
			source : [["UA23PT6", 54], ["MJ:HB", 0]],
			minlevel : 17,
			description : "\n   " + "Immediately after using Sneak Attack, I can make another attack against same target if it is the only one within 5 ft of me.",
		},
	},
});

////// Add UA23PT6 Thief Rogue subclass
AddSubClass("rogue_ua23pt6", "thief_ua23pt6", { //Ripped directly from ListsClasses.js and then altered
	regExpSearch : /^(?=.*(trickster|rogue))(?=.*(thief)).*$/i,
	subname : "Thief",
	source : [["UA23PT6", 54], ["SRD", 41], ["P", 97], ["MJ:HB", 0]],
	features : {
		"subclassfeature3" : {
			name : "Fast Hands",
			source : [["UA23PT6", 54], ["SRD", 40], ["P", 97], ["MJ:HB", 0]],
			minlevel : 3,
			description : desc([
				"As a Bonus Action, I can do one of the following:",
				" \u2022 Make a Dexterity (Sleight of Hand) check to pick a pocket",
				" \u2022 Use my Thieves' Tools to disarm a trap or open a lock",
				" \u2022 Take the Use an Object action or the Magic action to use a magic item.",
			]),
			action : ["bonus action", ""],
		},
		"subclassfeature3.1" : {
			name : "Second-Story Work",
			source : [["UA23PT6", 54], ["SRD", 41], ["P", 97], ["MJ:HB", 0]],
			minlevel : 3,
			description : desc([
				"I climb at my normal speed; On my turn, I can move on a ceiling without an ability check if",
				"  there is minimum 1 handhold during the move; I fall if I end my turn on the ceiling without a handhold.",
				"My jump distance is determined by my Dexterity instead of my Strength.",
			]),
			speed : { climb : { spd : "walk", enc : "walk" } },
		},
		"subclassfeature9" : {
			name : "Supreme Sneak",
			source : [["UA23PT6", 54], ["MJ:HB", 0]],
			minlevel : 9,
			description : desc([
				"I gain the following new Cunning Strike effect:",
				" \u2022 Stealth Attack (1d6). If I have the Hide action's Invisible condition, this attack doesn't end that.",
				"  that condition on me if I end the turn behind Three-Quarters Cover or Total Cover.",
			]),
		},
		"subclassfeature13" : {
			name : "Use Magic Device",
			source : [["UA23PT6", 55], ["SRD", 41], ["P", 97]],
			minlevel : 13,
			description : desc([
				"I can attune to up to 4 magic items at once.",
				"When I use a magic item property that expends charges, roll 1d6; On a 6, I use the property without expending any charges.",
				"I can use any Spell Scroll, using Int as my Spellcasting Ability for the spell. If the spell is a cantrip or a 1st-lvl spell,",
				"  I can cast it reliably. If the scroll is of a higher level spell, I must succeed an Int (Arcana) check with a SC equal to",
				"  10 + the spell's level. On a successful check, I cast the spell, otherwise the scroll disintegrates.",
			]),
		},
		"subclassfeature17" : {
			name : "Thief's Reflexes",
			source : [["UA23PT6", 55], ["SRD", 41], ["P", 97], ["MJ:HB", 0]],
			minlevel : 17,
			description : desc([
				"I can take two turns on the first round of any combat",
				"The first turn is at my normal Initiative, and the second is at my Initiative - 10",
			]),
		},
	},
});

// Add UA23PT6 Spells
SpellsList["banishing smite ua23pt6"] = {
	name : "Banishing Smite (UA23PT6)",
	source : [["UA23PT6", 62], ["P", 216], ["MJ:HB", 0]],
	classes : ["paladin", "paladin_ua23pt6"],
	level : 5,
	school : "Conj",
	time : "1 bns",
	timeFull : "1 Bonus Action, which you take immediately after hitting a creature with a melee weapon or an Unarmed Strike",
	range : "S",
	components : "V",
	duration : "Conc, 1 m",
	save : "Cha",
	description : "Wea atk deals +5d10 Force dmg; if this brings target HP<51, I banish it until spell ends",
	descriptionFull : "As you hit the creature, your strike erupts with divine power. The target hit by the strike takes an extra 5d10 Force damage from the attack. If the attack reduces the target to 50 Hit Points or fewer, the target must succeed on a Charisma saving throw or be transported to a harmless demiplane for the duration." + "\n   " + "While in the demiplane, the target has the Incapacitated condition. When the spell ends on the target, it reappears in the space it left or in the nearest unoccupied space if that space is occupied.",
};
SpellsList["blinding smite ua23pt6"] = {
	name : "Blinding Smite (UA23PT6)",
	source : [["UA23PT6", 63], ["P", 219], ["MJ:HB", 0]],
	classes : ["paladin", "paladin_ua23pt6"],
	level : 3,
	school : "Evoc",
	time : "1 bns",
	timeFull : "1 Bonus Action, which you take immediately after hitting a creature with a melee weapon or an Unarmed Strike",
	range : "S",
	components : "V",
	duration : "1 m",
	save : "Con", //UA article doesn't specify which ability the save uses, so I'm defaulting to the 2014 version's save ability of Con.
	description : "Wea atk deals +3d8+1d8/SL Rad dmg; crea Blinded for 1 min, no 1st save; end of turn save to end",
	descriptionFull : "As you hit the target, your strike flares with light. The target hit by the strike takes an extra 3d8 Radiant damage from the attack, and the target has the Blinded condition until the spell ends. At the end of each of its turns, the Blinded target repeats the saving throw, ending the spell on itself on a success." + AtHigherLevels + "When you cast this spell using a spell slot of 4th level or higher, the extra damage increases by 1d8 for each slot level above 3rd.",
};
SpellsList["conjure barrage ua23pt6"] = { //Ripped directly from all_WotC_pub+UA.js and then altered
	name : "Conjure Barrage (UA23PT6)",
	source : [["UA23PT6", 63], ["P", 225], ["MJ:HB", 0]],
	classes : ["ranger", "ranger_ua23pt6"],
	level : 3,
	school : "Conj",
	time : "1 a",
	range : "S:60" + (typePF ? "-" : "") + "ft cone",
	rangeMetric : "S:18m cone",
	components : "V,S,M\u0192",
	compMaterial : "a melee or ranged weapon worth at least 1 CP",
	duration : "Instantaneous",
	save : "Dex",
	description : "Throw weapon or ammo; copies shot forward for 5d8 Force dmg; save halves)",
	descriptionFull : "You brandish the weapon used to cast the spell and conjure similar spectral weapons (or ammunition appropriate to the weapon) that shoot forward and then disappear. Each creature of your choice that you can see in a 60-foot cone must succeed on a Dexterity saving throw. A creature takes 5d8 Force damage on a failed save, or half as much damage on a successful one." + AtHigherLevels + "When you cast this spell using a spell slot of 4th level or higher, the damage increases by 1d8 for each slot level above 3rd.",
};
SpellsList["conjure volley ua23pt6"] = { //Ripped directly from all_WotC_pub+UA.js and then altered
	name : "Conjure Volley (UA23PT6)",
	source : [["UA23PT6", 63], ["P", 226], ["MJ:HB", 0]],
	classes : ["ranger", "ranger_ua23pt6"],
	level : 5,
	school : "Conj",
	time : "1 a",
	range : "150 ft",
	components : "V,S,M\u0192",
	compMaterial : "a melee or ranged weapon worth at least 1 CP",
	duration : "Instantaneous",
	save : "Dex",
	description : "Turn ammo/thrown wea into volley; 40-ft rad 20-ft high 8d8 Force dmg; save halves",
	descriptionFull : "You brandish the weapon used to cast the spell and choose a point within range. Hundreds of similar spectral weapons (or ammunition appropriate to the weapon) fall in a volley from above and then disappear. Each creature of your choice that you can see in a 40-foot-radius, 20- foot-high cylinder centered on that point must make a Dexterity saving throw. A creature takes 8d8 Force damage on a failed save, or half as much damage on a successful one."
};
SpellsList["divine smite ua23pt6"] = {
	name : "Blinding Smite (UA23PT6)",
	source : [["UA23PT6", 63], ["MJ:HB", 0]],
	classes : ["paladin", "paladin_ua23pt6"],
	level : 1,
	school : "Evoc",
	time : "1 bns",
	timeFull : "1 Bonus Action, which you take immediately after hitting a creature with a melee weapon or an Unarmed Strike",
	range : "S",
	components : "V",
	duration : "Instantaneous",
	description : "Wea atk deals +2d8+1d8/SL Rad dmg; Fiends and Undead take extra 1d8 Rad dmg",
	descriptionFull : "As you hit the target, your strike glows with divine power. The target takes an extra 2d8 Radiant damage from the attack. The damage increases by 1d8 if the target is a Fiend or an Undead." + AtHigherLevels + "When you cast this spell using a spell slot of 2nd level or higher, the damage increases by 1d8 for each slot level above 1st.",
};
SpellsList["elementalism ua23pt6"] = {
	name : "Elementalism (UA23PT6)",
	source : [["UA23PT6", 63], ["MJ:HB", 0]],
	classes : ["druid", "druid_ua23pt8", "ranger", "ranger_ua23pt6", "sorcerer", "sorcerer_ua23pt7", "warlock", "warlock_ua23pt7", "wizard", "wizard_ua23pt7"],
	level : 0,
	school : "Trans",
	time : "1 bns",
	range : "30 ft",
	components : "V,S",
	duration : "Instantaneous",
	description : "Create minor elemental trick; breeze; dust/sand; embers/smoke; water mist; sculpt element; see book",
	descriptionFull : "You exert control over the elements, creating one of the following effects within range:" + "\n   " + "Beckon Air. You create a breeze strong enough to ripple cloth, stir dust, rustle leaves, and close open doors and shutters, all in a 5-foot (1.5m) cube. Doors and shutters being held open by someone or something aren’t affected." + "\n   " + "Beckon Earth. You create a thin shroud of dust or sand that covers surfaces in a 5-foot-square (1.5m-square) area, or you cause a single word to appear in your handwriting in a patch of dirt or sand." + "\n   " + "Beckon Fire. You create a thin cloud of harmless embers and colored, scented smoke in a 5-foot (1.5m) cube. You choose the color and scent, and the embers can light candles, torches, or lamps in that area. The smoke’s scent lingers for 1 minute." + "\n   " + "Beckon Water. You create a spray of cool mist that lightly dampens creatures and objects in a 5-foot (1.5m) cube. Alternatively, you create 1 cup of clean water either in an open container or on a surface, and the water evaporates in 1 minute." + "\n   " + "Sculpt Element. You cause dirt, sand, fire, smoke, mist, or water that can fit in a 1-foot (0.3m) cube to assume a crude shape (such as that of a creature or an object) for 1 hour.",
};
SpellsList["find steed ua23pt6"] = {
	name : "Find Steed (UA23PT6)",
	source : [["UA23PT6", 64], ["SRD", 143], ["P", 240], ["MJ:HB", 0]],
	classes : ["paladin", "paladin_ua23pt6"],
	level : 2,
	school : "Conj",
	time : "1 a",
	range : "30 ft",
	components : "V,S",
	duration : "Instantaneous",
	description : "Gain the services of a steed; communicate with each other telepathically; share spells with it; see book",
	descriptionFull : "You gain the service of an otherworldly being, which manifests as a loyal steed in an unoccupied space of your choice within range. This creature uses the Otherworldly Steed stat block. If you already have a steed from this spell, your steed is replaced by the new one." + "\n   " + "The steed resembles a Large, rideable animal of your choice, such as a horse, a camel, a dire wolf, or an elk. Whenever you cast the spell, choose the steed’s creature type—Celestial, Fey, or Fiend—which determines certain traits in the stat block." + "\n   " + "Combat. The steed is an ally to you and your companions. In combat, it shares your initiative count, and it functions as a controlled mount while you ride it (as defined in the rules on mounted combat). If you have the Incapacitated condition, the steed takes its turn immediately after yours and acts independently, focusing on protecting you." + "\n   " + "Disappearance of the Steed. The steed disappears if it drops to 0 Hit Points, if you dismiss it as a Bonus Action, or if you die. When it disappears, it leaves behind anything it was wearing or carrying. If you cast this spell again, you decide whether you summon the steed that disappeared or a different one." + AtHigherLevels + "When you cast this spell using a Spell Slot of 3rd level or higher, use the higher level wherever the spell’s level appears in the stat block.",
};
SpellsList["hunter's mark ua23pt6"] = { //Ripped directly from ListsSpells.js and then altered
	name : "Hunter's Mark (UA23PT6)",
	source : [["UA23PT6", 64], ["P", 251], ["MJ:HB", 0]],
	classes : ["ranger", "ranger_ua23pt6"],
	level : 1,
	school : "Div",
	time : "1 bns",
	timeFull : "1 Bonus Action, which you take immediately after hitting a creature with a melee weapon or an Unarmed Strike",
	range : "90 ft",
	rangeMetric : "27 m",
	components : "V",
	duration : "Conc, 1 h",
	description : "1 crea +1d6 Force dmg from my weapon atks; adv. Wis (Perception/Survival) vs. target; SL3: 8h & 2d6 dmg; SL5: 24h & 3d6 dmg",
	descriptionFull : "You choose one creature you can see within range and magically mark it as your quarry. Until the spell ends, you deal an extra 1d6 Force damage to the target the first time you hit it with an attack roll on any turn. You also have Advantage on any Wisdom (Perception or Survival) check you make to find it. If the target drops to 0 Hit Points before this spell ends, you can use a Bonus Action to mark a new creature." + AtHigherLevels + "When you cast this spell using a spell slot of 3rd or 4th level, you can maintain your concentration on the spell for up to 8 hours, and the extra damage increases to 2d6. When you use a spell slot of 5th level or higher, you can maintain your concentration on the spell for up to 24 hours, and the extra damage increases to 3d6."
};
SpellsList["power word heal ua23pt6"] = { //Ripped directly from all_WotC_pub+UA.js and then altered
	name : "Power Word Heal (UA23PT6)",
	source : [["UA23PT6", 65], ["P", 266], ["MJ:HB", 0]],
	classes : ["bard", "cleric", "cleric_ua23pt6"],
	level : 9,
	school : "Ench",
	time : "1 a",
	range : "60 ft",
	components : "V",
	duration : "Instantaneous",
	description : "1 crea heals all HP and stops being Charmed, Dazed, Frightened, Paralyzed, Stunned; it can use rea to stand up",
	descriptionShorter : "1 crea heals all HP, not Charmed, Dazed, Frightened, Paralyzed, Stunned; rea to stand up",
	descriptionFull : "A wave of healing energy washes over a creature you can see within range. The target regains all its Hit Points. If the creature has the Charmed, Dazed, Frightened, Paralyzed, or Stunned condition, the condition ends. If the creature has the Prone condition, it can use its reaction to stand up."
};
SpellsList["power word kill ua23pt6"] = { //Ripped directly from ListsSpells.js and then altered
	name : "Power Word Kill (UA23PT6)",
	source : [["UA23PT6", 65], ["SRD", 170], ["P", 266]],
	classes : ["bard", "sorcerer", "sorcerer_ua23pt7", "warlock", "warlock_ua23pt7", "wizard", "wizard_ua23pt7"],
	level : 9,
	school : "Ench",
	time : "1 a",
	range : "60 ft",
	components : "V",
	duration : "Instantaneous",
	description : "1 creature with 100 current HP or less dies; otherwise it takes 12d12 Psychic dmg",
	descriptionFull : "You utter a word of power that can compel one creature you can see within range to die instantly. If the creature you choose has 100 Hit Points or fewer, it dies. Otherwise, the target takes 12d12 Psychic damage."
};
SpellsList["searing smite ua23pt6"] = { //Ripped directly from all_WotC_pub+UA.js and then altered
	name : "Searing Smite (UA23PT6)",
	source : [["UA23PT6", 65], ["P", 274], ["MJ:HB", 0]],
	classes : ["cleric", "cleric_ua23pt6", "paladin", "paladin_ua23pt6"],
	level : 1,
	school : "Evoc",
	time : "1 bns",
	range : "Self",
	components : "V",
	duration : "1 min",
	save : "Con",
	description : "Wea atk deals +1d6+1d6/SL Fire dmg and target ignites: start of turn save to end or 1d6 dmg",
	descriptionShorter : "Wea atk deals +1d6+1d6/SL Fire dmg \u0026 ignites: start of turn save to end or 1d6 dmg",
	descriptionFull : "As you hit the target, your strike flares with white-hot intensity, and the target takes an extra 1d6 Fire damage from the attack and ignites with magical fire. At the start of each of its turns until the spell ends, the target takes 1d6 Fire damage and then must make a Constitution saving throw. On a failed save, the spell continues. On a successful save, the spell ends." + AtHigherLevels + "When you cast this spell using a spell slot of 2nd level or higher, any damage dealt by the spell increases by 1d6 for each slot level above 1st.",
	dynamicDamageBonus : {
		extraDmgGroupsSameType : /(end or )((?:\+?\d+d?\d*)+)/i
	},
};
SpellsList["shining smite ua23pt6"] = {
	name : "Shining Smite (UA23PT6)",
	source : [["UA23PT6", 65], ["MJ:HB", 0]],
	classes : ["paladin", "paladin_ua23pt6"],
	level : 2,
	school : "Trans",
	time : "1 bns",
	timeFull : "1 Bonus Action, which you take immediately after hitting a creature with a melee weapon or an Unarmed Strike",
	range : "S",
	components : "V",
	duration : "Conc, 1 min",
	description : "Wea atk deals +2d6+1d8/SL Rad dmg; Ends Invisible cond; Adv. on atks agnst crea; crea emits light; see book",
	descriptionFull : "As you hit the creature, your strike flares with divine light. The target hit by the strike takes an extra 2d6 Radiant damage from the attack. If the target has the Invisible condition, that condition ends on it. In addition, until the spell ends, the target sheds bright light in a 5-foot (1.5m) radius, attack rolls against it have Advantage, and it can’t benefit from the Invisible condition." + AtHigherLevels + "When you cast this spell using a spell slot of 3rd level or higher, the extra damage increases by 1d6 for each slot level above 2nd.",
};
SpellsList["staggering smite ua23pt6"] = { //Ripped directly from all_WotC_pub+UA.js and then altered
	name : "Staggering Smite (UA23PT6)",
	source : [["UA23PT6", 65], ["P", 278], ["MJ:HB", 0]],
	classes : ["paladin", "paladin_ua23pt6"],
	level : 4,
	school : "Ench",
	time : "1 bns",
	timeFull : "1 Bonus Action, which you take immediately after hitting a creature with a melee weapon or an Unarmed Strike",
	range : "S",
	components : "V",
	duration : "Instantaneous",
	save : "Wis",
	description : "Wea atk deals +4d6+1d6/SL Psychic dmg and save or Stunned until end next turn",
	descriptionFull : "As you hit the creature, your strike pierces both body and mind. The target takes an extra 4d6 Psychic damage from the attack, and the target must succeed on a Wisdom saving throw or have the Stunned condition until the end of your next turn." + AtHigherLevels + "When you cast this spell using a spell slot of 5th level, the extra damage increases by 1d6.",
};
SpellsList["thunderous smite ua23pt6"] = {
	name : "Thunderous Smite (UA23PT6)",
	source : [["UA23PT6", 65], ["P", 282], ["MJ:HB", 0]],
	classes : ["paladin", "paladin_ua23pt6"],
	level : 1,
	school : "Evoc",
	time : "1 bns",
	timeFull : "1 Bonus Action, which you take immediately after hitting a creature with a melee weapon or an Unarmed Strike",
	range : "S",
	components : "V",
	duration : "Conc, 1 min",
	save : "Str",
	description : "Wea atk deals +2d6+1d6/SL Thunder dmg and save or 10 ft push and prone; audible in 300 ft",
	descriptionFull : "As you hit the target, your strike rings with thunder that is audible within 300 feet of you, and the target takes an extra 2d6 Thunder damage from the attack. Additionally, if the target is a creature, it must succeed on a Strength saving throw or be pushed 10 feet away from you and have the Prone condition." + AtHigherLevels + "When you cast this spell using a spell slot of 2nd level or higher, the damage increases by 1d6 for each slot level above 1st.",
};
SpellsList["vicious mockery ua23pt6"] = { //Ripped directly from ListsSpells.js and then altered
	name : "Vicious Mockery (UA23PT6)",
	source : [["UA23PT6", 66], ["SRD", 189], ["P", 285], ["MJ:HB", 0]],
	classes : ["bard"],
	level : 0,
	school : "Ench",
	time : "1 a",
	range : "60 ft",
	components : "V",
	duration : "Instantaneous",
	save : "Wis",
	description : "1 creature save or 1d6 Psychic dmg and Dis. on next attack roll; +1d6 at CL 5, 11, and 17",
	descriptionCantripDie : "1 creature save or `CD`d6 Psychic dmg and dis. on next attack roll",
	descriptionFull : "You unleash a string of insults laced with subtle enchantments at one creature you can see or hear within range. The target must succeed on a Wisdom saving throw or take 1d6 Psychic damage and have Disadvantage on the next attack roll it makes before the end of its next turn." + "\n   " + "This spell’s damage increases by 1d6 when you reach certain Bard levels: 5th level (2d6), 11th level (3d6), and 17th level (4d6)."
};
SpellsList["wrathful smite ua23pt6"] = { //Ripped directly from all_WotC_pub+UA.js and then altered
	name : "Wrathful Smite (UA23PT6)",
	source : [["UA23PT6", 66], ["P", 289], ["MJ:HB", 0]],
	classes : ["cleric", "cleric_ua23pt6", "paladin", "paladin_ua23pt6"],
	level : 1,
	school : "Necro",
	time : "1 bns",
	timeFull : "1 Bonus Action, which you take immediately after hitting a creature with a melee weapon or an Unarmed Strike",
	range : "S",
	components : "V",
	duration : "1 min",
	save : "Wis",
	description : "Wea atk deals +1d6 Necrotic dmg and save or Frightened; end of turn save to end",
	descriptionFull : "As you hit the creature, your strike channels divine wrath. The target takes an extra 1d6 Necrotic damage from the attack, and it must succeed on a Wisdom saving throw or have the Frightened condition until the spell ends. At the end of each of its turns, the Frightened target repeats the saving throw, ending the spell on itself on a success." + AtHigherLevels + "When you cast this spell using a spell slot of 2nd level or higher, the damage increases by 1d6 for each slot level above 1st.",
};

// Add UA23PT6 "Otherworldly Steed" companion template
CompanionList["otherworldly steed ua23pt6"] = {
	name : "Find Steed (UA23PT6)",
	nameMenu : "Otherworldly Steed (Find Steed UA23PT6 spell)",
	nameTooltop : "from the Find Steed (UA23PT6) Spell",
	nameOrigin : "2nd-Level conjuration spell",
	source : [["UA23PT6", 64], ["SRD", 143], ["P", 240], ["MJ:HB", 0]],
	includeCheck : function(sCrea, objCrea, iCreaCR) {
		return /^(?=.*otherworldly)(?=.*steed).*$/i.test(sCrea);
	},
	notes : [{
		name : "Spell Description",
		description : "You gain the service of an otherworldly being, which manifests as a loyal steed in an unoccupied space of your choice within range. This creature uses the Otherworldly Steed stat block. If you already have a steed from this spell, your steed is replaced by the new one." + "\n   " + "The steed resembles a Large, rideable animal of your choice, such as a horse, a camel, a dire wolf, or an elk. Whenever you cast the spell, choose the steed’s creature type—Celestial, Fey, or Fiend—which determines certain traits in the stat block.",
		joinString : "\n   "
	}, {
		name : "Combat",
		description : "The steed is an ally to you and your companions. In combat, it shares your initiative count, and it functions as a controlled mount while you ride it (as defined in the rules on mounted combat). If you have the Incapacitated condition, the steed takes its turn immediately after yours and acts independently, focusing on protecting you.",
		joinString : "\n   "
	}, {
		name : "Disappearance of the Steed",
		description : "The steed disappears if it drops to 0 Hit Points, if you dismiss it as a Bonus Action, or if you die. When it disappears, it leaves behind anything it was wearing or carrying. If you cast this spell again, you decide whether you summon the steed that disappeared or a different one.",
		joinString : "\n   "
	}, {
		name : "At Higher Levels",
		description : "When you cast this spell using a Spell Slot of 3rd level or higher, use the higher level wherever the spell’s level appears in the stat block." + "\n   " + "The steed's HP, AC, & Damage change depending on the level the Find Steed (UA23PT6) spell was cast at:" + "\n      " + "- HP total equals 5 + 10 per spell level; the Otherworldly Steed has a number of Hit Dice equal to the spell's level;" + "\n      " + "- AC total equals 10 + 1 per spell level (natural armor);" + "\n   " + "   - Damage equals 1d8 + the spellls level of Radiant (Celestial), Psychic (Fey), or Necrotic (Fiend) damage.",
		joinString : "\n   "
	}],
};

// Add UA23PT6 "Otherworldly Steed" creatures, one for each spell level
CreatureList["otherworldly steed ua23pt6 lvl 2"] = {
	name : "2nd-Lvl Otherworldly Steed (UA23PT6)",
	source : [["UA23PT6", 64], ["SRD", 143], ["P", 240], ["MJ:HB", 0]],
	regExpSearch : /^(?=.*otherworldly)(?=.*steed).*$/i,
	size : 2,
	type : ["Celestial", "Fey", "Fiend"],
	companion : ["mount", "mount_not_al", "otherworldly steed ua23pt6"],
	companionApply : "mount",
	alignment : "Neutral",
	ac : 12,
	hp : 25,
	hd : [2, 10],
	speed : "60 ft",
	proficiencyBonus : 2,
	proficiencyBonusLinked : true,
	challengeRating : "0",
	scores : [18, 12, 14, 6, 12, 8],
	attacksAction : 1,
	attacks : [{
		name : "Otherworldly Slam (UA23PT6)",
		ability : 6,
		damage : [1, 8, "Rad/Psy/Nec"],
		modifiers : ["", "2"],
		range : "Melee (5 ft)",
		description : "One Otherworldly Slam as an Attack action; Damage depends on Creature Type",
		abilitytodamage : false,
		useSpellMod : ["paladin", "paladin_ua23pt6"],
	}],
	languages : "Telepathy 1 mi (1.61km) (only between you and the steed)",
	features : [{
		name : "Life Bond",
		description : "When you regain Hit Points from a spell of 1st level or higher, the steed regains the same number of Hit Points if you’re within 5 feet of it.",
		joinString : "\n   ",
	}],
	actions : [{
		name : "Fey Step (Fey Only; Recharges after a Long Rest)",
		description : "As a bonus action, the steed, along with its rider, teleports to an unoccupied space of your choice up to 60 ft away from itself.",
		joinString : "\n   ",
	}, {
		name : "Fell Glare (Fiend Only; Recharges after a Long Rest)",
		description : "As a bonus action, the steed’s eyes gleam with fiendish light as it targets one creature it can perceive up to 60 ft away. The target must succeed on a Wisdom saving throw against your Spell Save DC or have the Frightened condition until the end of your next turn.",
		joinString : "\n   ",
	}, {
		name : "Healing Touch (Celestial Only; Recharges after a Long Rest)",
		description : "As a bonus action, the steed touches another creature and restores a number of Hit Points to it equal to 2d8 + the spell’s level.",
		joinString : "\n   ",
	}],
	header : "Mount",
};
CreatureList["otherworldly steed ua23pt6 lvl 3"] = {
	name : "3rd-Lvl Otherworldly Steed (UA23PT6)",
	source : [["UA23PT6", 64], ["SRD", 143], ["P", 240], ["MJ:HB", 0]],
	regExpSearch : /^(?=.*otherworldly)(?=.*steed).*$/i,
	size : 2,
	type : ["Celestial", "Fey", "Fiend"],
	companion : ["mount", "mount_not_al", "otherworldly steed ua23pt6"],
	companionApply : "mount",
	alignment : "Neutral",
	ac : 13,
	hp : 35,
	hd : [3, 10],
	speed : "60 ft",
	proficiencyBonus : 2,
	proficiencyBonusLinked : true,
	challengeRating : "0",
	scores : [18, 12, 14, 6, 12, 8],
	attacksAction : 1,
	attacks : [{
		name : "Otherworldly Slam (UA23PT6)",
		ability : 6,
		damage : [1, 8, "Rad/Psy/Nec"],
		modifiers : ["", "3"],
		range : "Melee (5 ft)",
		description : "One Otherworldly Slam as an Attack action; Damage depends on Creature Type",
		abilitytodamage : false,
		useSpellMod : ["paladin", "paladin_ua23pt6"],
	}],
	languages : "Telepathy 1 mi (1.61km) (only between you and the steed)",
	features : [{
		name : "Life Bond",
		description : "When you regain Hit Points from a spell of 1st level or higher, the steed regains the same number of Hit Points if you’re within 5 feet of it.",
		joinString : "\n   ",
	}],
	actions : [{
		name : "Fey Step (Fey Only; Recharges after a Long Rest)",
		description : "As a bonus action, the steed, along with its rider, teleports to an unoccupied space of your choice up to 60 ft away from itself.",
		joinString : "\n   ",
	}, {
		name : "Fell Glare (Fiend Only; Recharges after a Long Rest)",
		description : "As a bonus action, the steed’s eyes gleam with fiendish light as it targets one creature it can perceive up to 60 ft away. The target must succeed on a Wisdom saving throw against your Spell Save DC or have the Frightened condition until the end of your next turn.",
		joinString : "\n   ",
	}, {
		name : "Healing Touch (Celestial Only; Recharges after a Long Rest)",
		description : "As a bonus action, the steed touches another creature and restores a number of Hit Points to it equal to 2d8 + the spell’s level.",
		joinString : "\n   ",
	}],
	header : "Mount",
};
CreatureList["otherworldly steed ua23pt6 lvl 4"] = {
	name : "4th-Lvl Otherworldly Steed (UA23PT6)",
	source : [["UA23PT6", 64], ["SRD", 143], ["P", 240], ["MJ:HB", 0]],
	regExpSearch : /^(?=.*otherworldly)(?=.*steed).*$/i,
	size : 2,
	type : ["Celestial", "Fey", "Fiend"],
	companion : ["mount", "mount_not_al", "otherworldly steed ua23pt6"],
	companionApply : "mount",
	alignment : "Neutral",
	ac : 14,
	hp : 45,
	hd : [4, 10],
	speed : "60 ft, fly 60 ft",
	proficiencyBonus : 2,
	proficiencyBonusLinked : true,
	challengeRating : "0",
	scores : [18, 12, 14, 6, 12, 8],
	attacksAction : 1,
	attacks : [{
		name : "Otherworldly Slam (UA23PT6)",
		ability : 6,
		damage : [1, 8, "Rad/Psy/Nec"],
		modifiers : ["", "4"],
		range : "Melee (5 ft)",
		description : "One Otherworldly Slam as an Attack action; Damage depends on Creature Type",
		abilitytodamage : false,
		useSpellMod : ["paladin", "paladin_ua23pt6"],
	}],
	languages : "Telepathy 1 mi (1.61km) (only between you and the steed)",
	features : [{
		name : "Life Bond",
		description : "When you regain Hit Points from a spell of 1st level or higher, the steed regains the same number of Hit Points if you’re within 5 feet of it.",
		joinString : "\n   ",
	}],
	actions : [{
		name : "Fey Step (Fey Only; Recharges after a Long Rest)",
		description : "As a bonus action, the steed, along with its rider, teleports to an unoccupied space of your choice up to 60 ft away from itself.",
		joinString : "\n   ",
	}, {
		name : "Fell Glare (Fiend Only; Recharges after a Long Rest)",
		description : "As a bonus action, the steed’s eyes gleam with fiendish light as it targets one creature it can perceive up to 60 ft away. The target must succeed on a Wisdom saving throw against your Spell Save DC or have the Frightened condition until the end of your next turn.",
		joinString : "\n   ",
	}, {
		name : "Healing Touch (Celestial Only; Recharges after a Long Rest)",
		description : "As a bonus action, the steed touches another creature and restores a number of Hit Points to it equal to 2d8 + the spell’s level.",
		joinString : "\n   ",
	}],
	header : "Mount",
};
CreatureList["otherworldly steed ua23pt6 lvl 5"] = {
	name : "5th-Lvl Otherworldly Steed (UA23PT6)",
	source : [["UA23PT6", 64], ["SRD", 143], ["P", 240], ["MJ:HB", 0]],
	regExpSearch : /^(?=.*otherworldly)(?=.*steed).*$/i,
	size : 2,
	type : ["Celestial", "Fey", "Fiend"],
	companion : ["mount", "mount_not_al", "otherworldly steed ua23pt6"],
	companionApply : "mount",
	alignment : "Neutral",
	ac : 15,
	hp : 55,
	hd : [5, 10],
	speed : "60 ft, fly 60 ft",
	proficiencyBonus : 2,
	proficiencyBonusLinked : true,
	challengeRating : "0",
	scores : [18, 12, 14, 6, 12, 8],
	attacksAction : 1,
	attacks : [{
		name : "Otherworldly Slam (UA23PT6)",
		ability : 6,
		damage : [1, 8, "Rad/Psy/Nec"],
		modifiers : ["", "5"],
		range : "Melee (5 ft)",
		description : "One Otherworldly Slam as an Attack action; Damage depends on Creature Type",
		abilitytodamage : false,
		useSpellMod : ["paladin", "paladin_ua23pt6"],
	}],
	languages : "Telepathy 1 mi (1.61km) (only between you and the steed)",
	features : [{
		name : "Life Bond",
		description : "When you regain Hit Points from a spell of 1st level or higher, the steed regains the same number of Hit Points if you’re within 5 feet of it.",
		joinString : "\n   ",
	}],
	actions : [{
		name : "Fey Step (Fey Only; Recharges after a Long Rest)",
		description : "As a bonus action, the steed, along with its rider, teleports to an unoccupied space of your choice up to 60 ft away from itself.",
		joinString : "\n   ",
	}, {
		name : "Fell Glare (Fiend Only; Recharges after a Long Rest)",
		description : "As a bonus action, the steed’s eyes gleam with fiendish light as it targets one creature it can perceive up to 60 ft away. The target must succeed on a Wisdom saving throw against your Spell Save DC or have the Frightened condition until the end of your next turn.",
		joinString : "\n   ",
	}, {
		name : "Healing Touch (Celestial Only; Recharges after a Long Rest)",
		description : "As a bonus action, the steed touches another creature and restores a number of Hit Points to it equal to 2d8 + the spell’s level.",
		joinString : "\n   ",
	}],
	header : "Mount",
};
CreatureList["otherworldly steed ua23pt6 lvl 6"] = {
	name : "6th-Lvl Otherworldly Steed (UA23PT6)",
	source : [["UA23PT6", 64], ["SRD", 143], ["P", 240], ["MJ:HB", 0]],
	regExpSearch : /^(?=.*otherworldly)(?=.*steed).*$/i,
	size : 2,
	type : ["Celestial", "Fey", "Fiend"],
	companion : ["mount", "mount_not_al", "otherworldly steed ua23pt6"],
	companionApply : "mount",
	alignment : "Neutral",
	ac : 16,
	hp : 65,
	hd : [6, 10],
	speed : "60 ft, fly 60 ft",
	proficiencyBonus : 2,
	proficiencyBonusLinked : true,
	challengeRating : "0",
	scores : [18, 12, 14, 6, 12, 8],
	attacksAction : 1,
	attacks : [{
		name : "Otherworldly Slam (UA23PT6)",
		ability : 6,
		damage : [1, 8, "Rad/Psy/Nec"],
		modifiers : ["", "6"],
		range : "Melee (5 ft)",
		description : "One Otherworldly Slam as an Attack action; Damage depends on Creature Type",
		abilitytodamage : false,
		useSpellMod : ["paladin", "paladin_ua23pt6"],
	}],
	languages : "Telepathy 1 mi (1.61km) (only between you and the steed)",
	features : [{
		name : "Life Bond",
		description : "When you regain Hit Points from a spell of 1st level or higher, the steed regains the same number of Hit Points if you’re within 5 feet of it.",
		joinString : "\n   ",
	}],
	actions : [{
		name : "Fey Step (Fey Only; Recharges after a Long Rest)",
		description : "As a bonus action, the steed, along with its rider, teleports to an unoccupied space of your choice up to 60 ft away from itself.",
		joinString : "\n   ",
	}, {
		name : "Fell Glare (Fiend Only; Recharges after a Long Rest)",
		description : "As a bonus action, the steed’s eyes gleam with fiendish light as it targets one creature it can perceive up to 60 ft away. The target must succeed on a Wisdom saving throw against your Spell Save DC or have the Frightened condition until the end of your next turn.",
		joinString : "\n   ",
	}, {
		name : "Healing Touch (Celestial Only; Recharges after a Long Rest)",
		description : "As a bonus action, the steed touches another creature and restores a number of Hit Points to it equal to 2d8 + the spell’s level.",
		joinString : "\n   ",
	}],
	header : "Mount",
};
CreatureList["otherworldly steed ua23pt6 lvl 7"] = {
	name : "7th-Lvl Otherworldly Steed (UA23PT6)",
	source : [["UA23PT6", 64], ["SRD", 143], ["P", 240], ["MJ:HB", 0]],
	regExpSearch : /^(?=.*otherworldly)(?=.*steed).*$/i,
	size : 2,
	type : ["Celestial", "Fey", "Fiend"],
	companion : ["mount", "mount_not_al", "otherworldly steed ua23pt6"],
	companionApply : "mount",
	alignment : "Neutral",
	ac : 17,
	hp : 75,
	hd : [7, 10],
	speed : "60 ft, fly 60 ft",
	proficiencyBonus : 2,
	proficiencyBonusLinked : true,
	challengeRating : "0",
	scores : [18, 12, 14, 6, 12, 8],
	attacksAction : 1,
	attacks : [{
		name : "Otherworldly Slam (UA23PT6)",
		ability : 6,
		damage : [1, 8, "Rad/Psy/Nec"],
		modifiers : ["", "7"],
		range : "Melee (5 ft)",
		description : "One Otherworldly Slam as an Attack action; Damage depends on Creature Type",
		abilitytodamage : false,
		useSpellMod : ["paladin", "paladin_ua23pt6"],
	}],
	languages : "Telepathy 1 mi (1.61km) (only between you and the steed)",
	features : [{
		name : "Life Bond",
		description : "When you regain Hit Points from a spell of 1st level or higher, the steed regains the same number of Hit Points if you’re within 5 feet of it.",
		joinString : "\n   ",
	}],
	actions : [{
		name : "Fey Step (Fey Only; Recharges after a Long Rest)",
		description : "As a bonus action, the steed, along with its rider, teleports to an unoccupied space of your choice up to 60 ft away from itself.",
		joinString : "\n   ",
	}, {
		name : "Fell Glare (Fiend Only; Recharges after a Long Rest)",
		description : "As a bonus action, the steed’s eyes gleam with fiendish light as it targets one creature it can perceive up to 60 ft away. The target must succeed on a Wisdom saving throw against your Spell Save DC or have the Frightened condition until the end of your next turn.",
		joinString : "\n   ",
	}, {
		name : "Healing Touch (Celestial Only; Recharges after a Long Rest)",
		description : "As a bonus action, the steed touches another creature and restores a number of Hit Points to it equal to 2d8 + the spell’s level.",
		joinString : "\n   ",
	}],
	header : "Mount",
};
CreatureList["otherworldly steed ua23pt6 lvl 8"] = {
	name : "8th-Lvl Otherworldly Steed (UA23PT6)",
	source : [["UA23PT6", 64], ["SRD", 143], ["P", 240], ["MJ:HB", 0]],
	regExpSearch : /^(?=.*otherworldly)(?=.*steed).*$/i,
	size : 2,
	type : ["Celestial", "Fey", "Fiend"],
	companion : ["mount", "mount_not_al", "otherworldly steed ua23pt6"],
	companionApply : "mount",
	alignment : "Neutral",
	ac : 18,
	hp : 85,
	hd : [8, 10],
	speed : "60 ft, fly 60 ft",
	proficiencyBonus : 2,
	proficiencyBonusLinked : true,
	challengeRating : "0",
	scores : [18, 12, 14, 6, 12, 8],
	attacksAction : 1,
	attacks : [{
		name : "Otherworldly Slam (UA23PT6)",
		ability : 6,
		damage : [1, 8, "Rad/Psy/Nec"],
		modifiers : ["", "8"],
		range : "Melee (5 ft)",
		description : "One Otherworldly Slam as an Attack action; Damage depends on Creature Type",
		abilitytodamage : false,
		useSpellMod : ["paladin", "paladin_ua23pt6"],
	}],
	languages : "Telepathy 1 mi (1.61km) (only between you and the steed)",
	features : [{
		name : "Life Bond",
		description : "When you regain Hit Points from a spell of 1st level or higher, the steed regains the same number of Hit Points if you’re within 5 feet of it.",
		joinString : "\n   ",
	}],
	actions : [{
		name : "Fey Step (Fey Only; Recharges after a Long Rest)",
		description : "As a bonus action, the steed, along with its rider, teleports to an unoccupied space of your choice up to 60 ft away from itself.",
		joinString : "\n   ",
	}, {
		name : "Fell Glare (Fiend Only; Recharges after a Long Rest)",
		description : "As a bonus action, the steed’s eyes gleam with fiendish light as it targets one creature it can perceive up to 60 ft away. The target must succeed on a Wisdom saving throw against your Spell Save DC or have the Frightened condition until the end of your next turn.",
		joinString : "\n   ",
	}, {
		name : "Healing Touch (Celestial Only; Recharges after a Long Rest)",
		description : "As a bonus action, the steed touches another creature and restores a number of Hit Points to it equal to 2d8 + the spell’s level.",
		joinString : "\n   ",
	}],
	header : "Mount",
};
CreatureList["otherworldly steed ua23pt6 lvl 9"] = {
	name : "9th-Lvl Otherworldly Steed (UA23PT6)",
	source : [["UA23PT6", 64], ["SRD", 143], ["P", 240], ["MJ:HB", 0]],
	regExpSearch : /^(?=.*otherworldly)(?=.*steed).*$/i,
	size : 2,
	type : ["Celestial", "Fey", "Fiend"],
	companion : ["mount", "mount_not_al", "otherworldly steed ua23pt6"],
	companionApply : "mount",
	alignment : "Neutral",
	ac : 19,
	hp : 95,
	hd : [9, 10],
	speed : "60 ft, fly 60 ft",
	proficiencyBonus : 2,
	proficiencyBonusLinked : true,
	challengeRating : "0",
	scores : [18, 12, 14, 6, 12, 8],
	attacksAction : 1,
	attacks : [{
		name : "Otherworldly Slam (UA23PT6)",
		ability : 6,
		damage : [1, 8, "Rad/Psy/Nec"],
		modifiers : ["", "9"],
		range : "Melee (5 ft)",
		description : "One Otherworldly Slam as an Attack action; Damage depends on Creature Type",
		abilitytodamage : false,
		useSpellMod : ["paladin", "paladin_ua23pt6"],
	}],
	languages : "Telepathy 1 mi (1.61km) (only between you and the steed)",
	features : [{
		name : "Life Bond",
		description : "When you regain Hit Points from a spell of 1st level or higher, the steed regains the same number of Hit Points if you’re within 5 feet of it.",
		joinString : "\n   ",
	}],
	actions : [{
		name : "Fey Step (Fey Only; Recharges after a Long Rest)",
		description : "As a bonus action, the steed, along with its rider, teleports to an unoccupied space of your choice up to 60 ft away from itself.",
		joinString : "\n   ",
	}, {
		name : "Fell Glare (Fiend Only; Recharges after a Long Rest)",
		description : "As a bonus action, the steed’s eyes gleam with fiendish light as it targets one creature it can perceive up to 60 ft away. The target must succeed on a Wisdom saving throw against your Spell Save DC or have the Frightened condition until the end of your next turn.",
		joinString : "\n   ",
	}, {
		name : "Healing Touch (Celestial Only; Recharges after a Long Rest)",
		description : "As a bonus action, the steed touches another creature and restores a number of Hit Points to it equal to 2d8 + the spell’s level.",
		joinString : "\n   ",
	}],
	header : "Mount",
};

// Add UA23DP "Otherworldly Slam" weapon
WeaponsList["otherworldly slam (ua23pt6)"] = {
	name : "Otherworldly Slam (UA23PT6)",
	source : [["UA23PT6", 64], ["SRD", 143], ["P", 240], ["MJ:HB", 0]],
	regExpSearch : /^(?=.*otherworldly)(?=.*slam).*$/i,
	type : "Natural",
	ability : 6,
	abilitytodamage : false,
	damage : [1, 8, "Rad/Psy/Nec"],
	range : "Melee (5 ft)",
	description : "One Otherworldly Slam as an Attack action; Damage depends on Creature Type",
	list : "melee",
	useSpellMod : ["paladin", "paladin_ua23pt6"],
};

// Add UA23PT6 "Primal Companion" companion template
CompanionList["primal companion ua23pt6"] = {
	name : "Primal Companion (UA23PT6)",
	nameMenu : "Primal Companion (Beast Master UA23PT6)",
	nameTooltop : "companion for the Beast Master Ranger (UA23PT6)",
	nameOrigin : "3rd-Level subclass feature",
	source : [["UA23PT6", 45], ["MJ:HB", 0]],
	includeCheck : function(sCrea, objCrea, iCreaCR) {
		return /^(?=.*beast)(?=.*of)(?=.*the).*$/i.test(sCrea);
	},
	notes : [{
		name : "Subclass Feature Description",
		description : "You magically summon a primal beast, which draws strength from your bond with nature. The beast is friendly to you and your companions and obeys your commands. Choose its stat block—Beast of the Land, Beast of the Sea, or Beast of the Sky—which uses your Proficiency Bonus (PB) in several places. You also determine the kind of animal the beast is, choosing a kind appropriate for the stat block. Whatever kind you choose, the beast bears primal markings, indicating its supernatural origin.",
		joinString : "\n   "
	}, {
		name : "Combat",
		description : "In combat, the beast acts during your turn. It can move and use its Reaction on its own, but the only action it takes is the Dodge action, unless you take a Bonus Action on your turn to command it to take a different action. That action can be one in its stat block or some other action. You can also sacrifice one of your attacks when you take the Attack action to command the beast to take the Attack action. If you have the Incapacitated condition, the beast can take any action of its choice, not just Dodge.",
		joinString : "\n   "
	}, {
		name : "Death/Disappearance of the Beast",
		description : "If the beast has died within the last hour, you can you use your action to touch it and expend a spell slot of 1st level or higher. The beast returns to life after 1 minute with all its Hit Points." + "\n   " + "The beast vanishes if you die.",
		joinString : "\n   "
	}, {
		name : "Changing your chosen Primal Beast",
		description : "Whenever you finish a Long Rest, you can summon a different primal beast. The new beast appears in an unoccupied space within 5 feet of you, and you choose its stat block and appearance. If you already have a beast from this feature, it vanishes when the new beast appears.",
		joinString : "\n   "
	}],
};

// Add UA23PT6 "Primal Companion" creatures
CreatureList["beast of the land ua23pt6"] = {
	name : "Beast of the Land (UA23PT6)",
	source : [["UA23PT6", 45], ["MJ:HB", 0]],
	regExpSearch : /^(?=.*beast)(?=.*of)(?=.*the)(?=.*land).*$/i,
	size : 3,
	type : ["Beast"],
	companion : ["companion", "companion_not_al", "primal companion ua23pt6"],
	companionApply : "companion",
	alignment : "Unaligned",
	ac : 13,
	hp : 10,
	hd : [1, 8],
	hdLinked : ["ranger", "ranger_ua23pt6"],
	speed : "40 ft, climb 40 ft",
	proficiencyBonus : 2,
	proficiencyBonusLinked : true,
	challengeRating : "0",
	scores : [14, 14, 15, 8, 14, 11],
	attacksAction : 1,
	calcChanges : {
		extraAC : [{
			mod : 'Prof',
		}],
		hp : function (totalHD, HDobj, prefix) {
			if (!classes.known.ranger || !classes.known.ranger_ua23pt6) return;
			var rgrLvl = classes.known.ranger ? classes.known.ranger.level : classes.known.ranger_ua23pt6.level;
			HDobj.alt.push(5 + 5 * rgrLvl);
			HDobj.altStr.push(" = 5 as a base\n + " + "5 \xD7" + rgrLvl + " from its master's Ranger level");
		},
		setAltHp : true,
		hpForceRecalc : true,
	},
	attacks : [{
		name : "Maul",
		ability : 1,
		damage : [1, 8, "Slashing"],
		modifiers : ["", "Prof"],
		range : "Melee (5 ft)",
		description : "+1d6 damage if hits after moving 20 ft straight in same round, see Charge",
		tooltip : "If the beast moves at least 20 feet straight toward a target and then hits it with a maul attack on the same turn, the target takes an extra 1d6 slashing damage. If the target is a creature, it must succeed on a Strength saving throw against your spell save DC or be knocked prone.",
		useSpellMod : ["ranger", "ranger_ua23pt6"]
	}, {
		name : "Charge",
		ability : 1,
		damage : ["Str save", "", "Knocked prone"],
		range : "Melee (5 ft)",
		description : "Str save or knocked prone; Only if maul hits after moving 20 ft straight in same round",
		tooltip : "If the beast moves at least 20 feet straight toward a target and then hits it with a maul attack on the same turn, the target takes an extra 1d6 slashing damage. If the target is a creature, it must succeed on a Strength saving throw against your spell save DC or be knocked prone.",
		abilitytodamage : false,
		dc : true,
		useSpellMod : ["ranger", "ranger_ua23pt6"]
	}],
	languages : "understands the languages you speak",
	features : [{
		name : "Primal Bond",
		description : "You can add your Proficiency Bonus to any ability check or saving throw that the beast makes.",
		joinString : "\n   ",
	}],
	header : "Companion",
};
CreatureList["beast of the sea ua23pt6"] = {
	name : "Beast of the Sea (UA23PT6)",
	source : [["UA23PT6", 45], ["MJ:HB", 0]],
	regExpSearch : /^(?=.*beast)(?=.*of)(?=.*the)(?=.*sea).*$/i,
	size : 3,
	type : ["Beast"],
	companion : ["companion", "companion_not_al", "primal companion ua23pt6"],
	companionApply : "companion",
	alignment : "Unaligned",
	ac : 13,
	hp : 10,
	hd : [1, 8],
	hdLinked : ["ranger", "ranger_ua23pt6"],
	speed : "5 ft, swim 60 ft",
	proficiencyBonus : 2,
	proficiencyBonusLinked : true,
	challengeRating : "0",
	scores : [14, 14, 15, 8, 14, 11],
	attacksAction : 1,
	calcChanges : {
		extraAC : [{
			mod : 'Prof',
		}],
		hp : function (totalHD, HDobj, prefix) {
			if (!classes.known.ranger || !classes.known.ranger_ua23pt6) return;
			var rgrLvl = classes.known.ranger ? classes.known.ranger.level : classes.known.ranger_ua23pt6.level;
			HDobj.alt.push(5 + 5 * rgrLvl);
			HDobj.altStr.push(" = 5 as a base\n + " + "5 \xD7" + rgrLvl + " from its master's Ranger level");
		},
		setAltHp : true,
		hpForceRecalc : true,
	},
	attacks : [{
		name : "Binding Strike",
		ability : 1,
		damage : [1, 6, "Bludg/Slash"],
		modifiers : ["", "Prof"],
		range : "Melee (5 ft)",
		description : "Target has the Grappled condition (escape DC = my Spell Save DC)",
		useSpellMod : ["ranger", "ranger_ua23pt6"]
	}],
	languages : "understands the languages you speak",
	features : [{
		name : "Primal Bond",
		description : "You can add your Proficiency Bonus to any ability check or saving throw that the beast makes.",
		joinString : "\n   ",
	}, {
		name : "Amphibious",
		description : "The beast can breathe air and water.",
		joinString : "\n   ",
	}],
	header : "Companion",
};
CreatureList["beast of the sky ua23pt6"] = {
	name : "Beast of the Sky (UA23PT6)",
	source : [["UA23PT6", 45], ["MJ:HB", 0]],
	regExpSearch : /^(?=.*beast)(?=.*of)(?=.*the)(?=.*sky).*$/i,
	size : 4,
	type : ["Beast"],
	companion : ["companion", "companion_not_al", "primal companion ua23pt6"],
	companionApply : "companion",
	alignment : "Unaligned",
	ac : 13,
	hp : 8,
	hd : [1, 6],
	hdLinked : ["ranger", "ranger_ua23pt6"],
	speed : "10 ft, fly 60 ft",
	proficiencyBonus : 2,
	proficiencyBonusLinked : true,
	challengeRating : "0",
	scores : [6, 16, 13, 8, 14, 11],
	attacksAction : 1,
	calcChanges : {
		extraAC : [{
			mod : 'Prof',
		}],
		hp : function (totalHD, HDobj, prefix) {
			if (!classes.known.ranger || !classes.known.ranger_ua23pt6) return;
			var rgrLvl = classes.known.ranger ? classes.known.ranger.level : classes.known.ranger_ua23pt6.level;
			HDobj.alt.push(4 + 4 * rgrLvl);
			HDobj.altStr.push(" = 4 as a base\n + " + "4 \xD7" + rgrLvl + " from its master's Ranger level");
		},
		setAltHp : true,
		hpForceRecalc : true,
	},
	attacks : [{
		name : "Shred",
		ability : 2,
		damage : [1, 4, "Slashing"],
		modifiers : ["", "Prof"],
		range : "Melee (5 ft)",
		description : "",
		tooltip : "",
		useSpellMod : ["ranger", "ranger_ua23pt6"]
	}],
	languages : "understands the languages you speak",
	features : [{
		name : "Primal Bond",
		description : "You can add your Proficiency Bonus to any ability check or saving throw that the beast makes.",
		joinString : "\n   ",
	}, {
		name : "Flyby",
		description : "The beast doesn’t provoke Opportunity Attacks when it flies out of an enemy’s reach.",
		joinString : "\n   ",
	}],
	header : "Companion",
};

// Add UA23PT6 "Binding Strike" weapon
WeaponsList["binding strike (ua23pt6)"] = {
	name : "Binding Strike (UA23PT6)",
	source : [["UA23PT6", 45], ["MJ:HB", 0]],
	regExpSearch : /^(?=.*binding)(?=.*strike).*$/i,
	type : "Natural",
	ability : 1,
	abilitytodamage : true,
	damage : [1, 6, "Bludg/Slash"],
	range : "Melee (5 ft)",
	description : "Target has the Grappled condition (escape DC = my Spell Save DC)",
	list : "melee",
	useSpellMod : ["ranger", "ranger_ua23pt6"],
};

// Add UA23PT6 Feats
FeatsList["archery fighting style ua23pt6"] = {
	name : "Archery Fighting Style (UA23PT6)",
	source : [["UA23PT6", 67], ["P", 72], ["MJ:HB", 0]],
	allowDuplicates : false,
	prerequisite : "Fighting Style Feature",
	prereqeval : function(v) {
		return (/features["fighting style ua23pt6"]|features["fighting style ua23pt7"]|features["fighting style"]/i).test(classes.known);
	},
	description : desc("+2 bonus to attack rolls I make with ranged weapons"),
	calcChanges : {
		atkCalc : [
			function (fields, v, output) {
				if (v.isRangedWeapon && !v.isNaturalWeapon && !v.isDC) output.extraHit += 2;
			},
			"My ranged weapons get a +2 bonus on the To Hit."
		]
	},
};
FeatsList["defense fighting style ua23pt6"] = {
	name : "Defense Fighting Style (UA23PT6)",
	source : [["UA23PT6", 67], ["P", 72], ["MJ:HB", 0]],
	allowDuplicates : false,
	prerequisite : "Fighting Style Feature",
	prereqeval : function(v) {
		return (/features["fighting style ua23pt6"]|features["fighting style ua23pt7"]|features["fighting style"]/i).test(classes.known);
	},
	description : desc("+1 bonus to AC when I'm wearing armor"),
	extraAC : {
		name : "Defense Fighting Style", // necessary for features referring to fighting style properties directly
		mod : 1,
		text : "I gain a +1 bonus to AC while wearing armor.",
		stopeval : function (v) { return !v.wearingArmor; }
	},
};
FeatsList["dueling fighting style ua23pt6"] = {
	name : "Dueling Fighting Style (UA23PT6)",
	source : [["UA23PT6", 67], ["P", 72], ["MJ:HB", 0]],
	allowDuplicates : false,
	prerequisite : "Fighting Style Feature",
	prereqeval : function(v) {
		return (/features["fighting style ua23pt6"]|features["fighting style ua23pt7"]|features["fighting style"]/i).test(classes.known);
	},
	description : desc("+2 to damage rolls when wielding a melee weapon in one hand and no other weapons"),
	calcChanges : {
		atkCalc : [
			function (fields, v, output) {
				for (var i = 1; i <= FieldNumbers.actions; i++) {
					if ((/off.hand.attack/i).test(What('Bonus Action ' + i))) return;
				};
				if (v.isMeleeWeapon && !v.isNaturalWeapon && !(/((^|[^+-]\b)2|\btwo).?hand(ed)?s?\b/i).test(fields.Description)) output.extraDmg += 2;
			},
			"When I'm wielding a melee weapon in one hand and no weapon in my other hand, I do +2 damage with that melee weapon. This condition will always be false if the bonus action 'Off-hand Attack' exists."
		]
	},
};
FeatsList["great weapon fighting style ua23pt6"] = {
	name : "Great Weapon Fighting Style (UA23PT6)",
	source : [["UA23PT6", 67], ["P", 72], ["MJ:HB", 0]],
	allowDuplicates : false,
	prerequisite : "Fighting Style Feature",
	prereqeval : function(v) {
		return (/features["fighting style ua23pt6"]|features["fighting style ua23pt7"]|features["fighting style"]/i).test(classes.known);
	},
	description : desc("Reroll 1 or 2 on damage if wielding two-handed/versatile melee weapon in both hands"),
	calcChanges : {
		atkAdd : [
			function (fields, v) {
				if (v.isMeleeWeapon && (/(\bversatile|((^|[^+-]\b)2|\btwo).?hand(ed)?s?)\b/i).test(fields.Description)) {
					fields.Description += (fields.Description ? '; ' : '') + 'Re-roll 1 or 2 on damage die' + ((/versatile/i).test(fields.Description) ? ' when two-handed' : '');
				}
			},
			"While wielding a two-handed or versatile melee weapon in two hands, I can re-roll a 1 or 2 on any damage die once."
		]
	},
};
FeatsList["protection fighting style ua23pt6"] = {
	name : "Protection Fighting Style (UA23PT6)",
	source : [["UA23PT6", 67], ["P", 72], ["MJ:HB", 0]],
	allowDuplicates : false,
	prerequisite : "Fighting Style Feature",
	prereqeval : function(v) {
		return (/features["fighting style ua23pt6"]|features["fighting style ua23pt7"]|features["fighting style"]/i).test(classes.known);
	},
	description : desc([
		"As a reaction, I can give disadv. on an attack made vs. someone within 5 ft of me",
		"I need to be wielding a shield and be able to see the attacker to do this"
	]),
	action : ["reaction", ""],
};
FeatsList["two_weapon fighting style ua23pt6"] = {
	name : "Two-Weapon Fighting Style (UA23PT6)",
	source : [["UA23PT6", 67], ["P", 72], ["MJ:HB", 0]],
	allowDuplicates : false,
	prerequisite : "Fighting Style Feature",
	prereqeval : function(v) {
		return (/features["fighting style ua23pt6"]|features["fighting style ua23pt7"]|features["fighting style"]/i).test(classes.known);
	},
	description : desc("When I make the extra attack granted by the Light weapon property, I can add my ability modifier to the damage of the extra attack"),
};