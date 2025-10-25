export const gameData = {
	title: "Gavin & Pedro's Spooky Shire Scavenger Hunt",
	description: "It's a dangerous business going out your door. Luckily, this puzzle is (mostly) indoors. Start your quest at the inn where travelers meet.",

	locations: [
		{
			id: 1,
			question: "In the shadows of the Prancing Pony, what name does Aragorn go by before his true heritage is known?",
			answer: "Strider",
			alternatives: [],
			successMessage: "Well done! Gandalf would be proud of your wisdom!",
			hint: "From the warmth of the inn, descend into darkness. Find where fire and shadow meet, and the wizard makes his stand.",
			locationName: "The Prancing Pony"
		},
		{
			id: 2,
			question: "What command did Gandalf shout upon the bridge to bar the fiery foe?",
			answer: "you shall not pass",
			alternatives: ["You cannot pass", "shall not pass", "thou shalt not pass"],
			successMessage: "Well shouted, traveler! The Balrog retreats to the depths!",
			hint: "Victory in Moria! Now beware the webs ahead—something wicked crawls in the dark.",
			locationName: "Mines of Moria"
		},

		{
			id: 3,
			question: "In the blackness of Shelob’s lair, what gift of Galadriel does Frodo use to drive back the darkness?",
			answer: "Phial of Galadriel",
			alternatives: ["Light of Eärendil", "Light of Earendil", "Galadriel’s light", "the star-glass"],
			successMessage: "The darkness recoils before the Light of Eärendil!",
			hint: "You’ve escaped the webs of darkness—now follow the fires of hope. The beacons are lit! Gondor calls for aid!",
			locationName: "Shelob's Lair"
		},
		{
			id: 4,
			question: "When the mountains blaze with flame, who rides to Gondor’s aid upon hearing the call?",
			answer: "Rohan",
			alternatives: ["the riders of rohan", "the rohirrim", "the horse-lords"],
			successMessage: "The Riders of Rohan answer the call! Hope thunders across the plains toward Gondor!",
			hint: "The fires of war burn low. Seek the Dark Tower where the Eye keeps watch",
			locationName: "Gondor"
		},
		{
			id: 5,
			question: "What seeing-stone does Sauron use to influence those who gaze upon his tower?",
			answer: "Palantír",
			alternatives: ["palantir", "seeing-stone"],
			successMessage: "The stone’s hold is broken! The Eye’s whispers cannot sway you.",
			hint: "The fire cools and the shadows flee—return now to the peace of the Shire.",
			locationName: "Barad-dûr"
		},
		{
			id: 6,
			question: "Back in the Green Dragon Inn, who is that behind the bar who stole Sam's heart?",
			answer: "Rosie Cotton",
			alternatives: ["Rosie", "Rosie the barmaid"],
			successMessage: "Home at last! Rosie greets you with a smile, and all is well in the Shire once more.",
			hint: "",
			locationName: "The Shire"
		}

	],

	completionMessage: "You’ve walked the long road there and back again. Well done, adventurer! Claim your reward—there’s ale waiting at the bar."
};
