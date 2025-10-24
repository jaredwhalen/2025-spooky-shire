<script>
	import { gameData } from "./gameData.js";

	let gameState = $state("start"); // 'start', 'playing', 'success', 'end'
	let currentLocationIndex = $state(0);
	let userInput = $state("");
	let showHint = $state(false);
	let showSuccess = $state(false);
	let errorMessage = $state("");

	const currentLocation = $derived(gameData.locations[currentLocationIndex]);
	const isLastLocation = $derived(
		currentLocationIndex === gameData.locations.length - 1,
	);

	function startGame() {
		gameState = "playing";
		currentLocationIndex = 0;
		userInput = "";
		showHint = false;
		showSuccess = false;
		errorMessage = "";
	}

	function normalizeAnswer(answer) {
		// Common words to remove for more flexible matching
		const commonWords = ['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by'];
		
		return answer
			.toLowerCase()
			.replace(/[^\w\s]/g, "") // Remove all special characters except letters, numbers, and spaces
			.replace(/\s+/g, " ") // Replace multiple spaces with single space
			.trim()
			.split(" ")
			.filter(word => word && !commonWords.includes(word)) // Remove common words
			.join(" ");
	}

	function checkAnswer() {
		if (!userInput.trim()) {
			errorMessage = "Please enter an answer!";
			return;
		}

		const userAnswer = normalizeAnswer(userInput);
		const isCorrect = [
			...currentLocation?.alternatives,
			currentLocation.answer,
		].some((alt) => normalizeAnswer(alt) === userAnswer);

		if (isCorrect) {
			showSuccess = true;
			errorMessage = "";
		} else {
			errorMessage =
				"That is not the answer you seek. Try again, brave adventurer!";
		}
	}

	function nextLocation() {
		scrollTo({
			top: 0,
			behavior: "smooth"
		});
		if (isLastLocation) {
			gameState = "end";
		} else {
			currentLocationIndex++;
			userInput = "";
			showHint = false;
			showSuccess = false;
			errorMessage = "";
		}
	}


	function handleKeyPress(event) {
		if (event.key === "Enter" && !showSuccess) {
			checkAnswer();
		}
	}
</script>

<div class="game-container">
	{#if gameState === "start"}
		<div class="start-screen">
			<img src="banner.jpg" alt="The Quest of the Spooky Shire" />
			<div class="title-section">
				<h1 class="main-title">{gameData.title}</h1>
				<h2 class="subtitle">{gameData.subtitle}</h2>
				<p class="description">{gameData.description}</p>
			</div>

			<div class="start-actions">
				<button class="start-button" onclick={startGame}>
					Begin Your Quest
				</button>
			</div>
		</div>
	{:else if gameState === "playing"}
		<div class="game-screen">
			<div class="location-header">
				<h2 class="location-name">{currentLocation.locationName}</h2>
				<div class="progress">
					Location {currentLocationIndex + 1} of {gameData.locations
						.length}
				</div>
			</div>

			<div class="question-section">
				<h3 class="question">{currentLocation.question}</h3>

				{#if !showSuccess}
					<div class="input-section">
						<input
							type="text"
							bind:value={userInput}
							onkeypress={handleKeyPress}
							placeholder="Enter your answer..."
							class="answer-input"
						/>
						<button class="submit-button" onclick={checkAnswer}>
							Submit Answer
						</button>
					</div>

					{#if errorMessage}
						<div class="error-message">{errorMessage}</div>
					{/if}
				{:else}
					<div class="success-section">
						<div class="success-message">
							{currentLocation.successMessage}
						</div>
						<div class="hint-section">
							<h4>Your next clue:</h4>
							<p class="hint">{currentLocation.hint}</p>
						</div>
						<button class="next-button" onclick={nextLocation}>
							{isLastLocation
								? "Complete Quest"
								: "Next Location"}
						</button>
					</div>
				{/if}
			</div>
		</div>
	{:else if gameState === "end"}
		<div class="end-screen">
			<div class="completion-section">
				<h1 class="completion-title">Quest Complete!</h1>
				<div class="completion-message">
					{gameData.completionMessage}
				</div>
				
			</div>
		</div>
	{/if}
</div>

<style>

	:global(body) {
		margin: 0;
		padding: 0;
		overflow: hidden;
		background-color: #0a0a0a;
	}

	.game-container {
		min-height: 100dvh;
		background: linear-gradient(
			135deg,
			#000000 0%,
			#0a0a0a 25%,
			#1a1a1a 50%,
			#0a0a0a 75%,
			#000000 100%
		);
		color: #e0e0e0;
		font-family: "Cinzel", "Times New Roman", serif;
		padding: 20px;
		box-sizing: border-box;
		position: relative;
		overflow-x: hidden;
	}

	.game-container::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: 
			radial-gradient(circle at 50% 10%, rgba(255, 255, 200, 0.05) 0%, transparent 25%),
			radial-gradient(circle at 20% 80%, rgba(47, 79, 79, 0.08) 0%, transparent 40%),
			radial-gradient(circle at 80% 20%, rgba(70, 130, 180, 0.03) 0%, transparent 40%);
		pointer-events: none;
	}

	/* Start Screen Styles */
	.start-screen {
		text-align: center;
		padding: 40px 20px;
		max-width: 600px;
		margin: 0 auto;
	}

	.start-screen img {
		width: 100%;
		max-width: 600px;
		/* margin-bottom: 20px;  */
	}

	.main-title {
		font-size: 2.5rem;
		margin-bottom: 10px;
		background: linear-gradient(45deg, #8b4513, #a0522d, #cd853f, #a0522d, #8b4513);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.8);
		filter: drop-shadow(0 0 8px rgba(139, 69, 19, 0.3));
	}

	.subtitle {
		font-size: 1.5rem;
		color: #a0a0a0;
		margin-bottom: 20px;
		font-weight: normal;
		text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.7);
	}

	.description {
		font-size: 1.1rem;
		line-height: 1.6;
		margin-bottom: 40px;
		color: #c0c0c0;
		text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
	}

	.start-button {
		background: linear-gradient(45deg, #2f4f4f, #4682b4, #2f4f4f);
		color: #e0e0e0;
		border: 2px solid #4682b4;
		padding: 15px 30px;
		font-size: 1.2rem;
		font-family: inherit;
		border-radius: 8px;
		cursor: pointer;
		transition: all 0.3s ease;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1);
		text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
	}

	.start-button:hover {
		background: linear-gradient(45deg, #4682b4, #5f9ea0, #4682b4);
		transform: translateY(-2px);
		box-shadow: 0 6px 12px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2);
		filter: drop-shadow(0 0 6px rgba(70, 130, 180, 0.3));
	}

	/* Game Screen Styles */
	.game-screen {
		max-width: 600px;
		margin: 0 auto;
		padding: 20px;
	}

	.location-header {
		text-align: center;
		margin-bottom: 30px;
	}

	.location-name {
		font-size: 1.8rem;
		color: #8b4513;
		margin-bottom: 10px;
		text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
		filter: drop-shadow(0 0 6px rgba(139, 69, 19, 0.4));
	}

	.progress {
		font-size: 0.9rem;
		color: #a0a0a0;
		background: rgba(47, 79, 79, 0.2);
		border: 1px solid rgba(70, 130, 180, 0.4);
		padding: 5px 15px;
		border-radius: 20px;
		display: inline-block;
		text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7);
	}

	.question-section {
		background: rgba(10, 10, 10, 0.6);
		border: 1px solid rgba(47, 79, 79, 0.5);
		border-radius: 12px;
		padding: 25px;
		margin-bottom: 20px;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1);
		position: relative;
		text-align: center;
	}

	.question-section::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: linear-gradient(45deg, transparent 0%, rgba(47, 79, 79, 0.05) 50%, transparent 100%);
		border-radius: 12px;
		pointer-events: none;
	}

	.question {
		font-size: 1.3rem;
		margin-bottom: 25px;
		line-height: 1.5;
		color: #e0e0e0;
		text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.8);
		position: relative;
		z-index: 1;
	}

	.input-section {
		display: flex;
		flex-direction: column;
		gap: 15px;
	}

	.answer-input {
		padding: 12px 15px;
		font-size: 1.1rem;
		border: 2px solid #4682b4;
		border-radius: 8px;
		background: rgba(10, 10, 10, 0.7);
		color: #e0e0e0;
		font-family: inherit;
		text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
		box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.3);
	}

	.answer-input::placeholder {
		color: #a0a0a0;
		text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
	}

	.answer-input:focus {
		outline: none;
		border-color: #5f9ea0;
		box-shadow: 0 0 10px rgba(95, 158, 160, 0.3), inset 0 2px 4px rgba(0, 0, 0, 0.4);
		background: rgba(10, 10, 10, 0.8);
	}

	.submit-button {
		background: linear-gradient(45deg, #2f4f4f, #4682b4, #2f4f4f);
		color: #e0e0e0;
		border: 2px solid #4682b4;
		padding: 12px 25px;
		font-size: 1.1rem;
		font-family: inherit;
		border-radius: 8px;
		cursor: pointer;
		transition: all 0.3s ease;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1);
		text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
	}

	.submit-button:hover {
		background: linear-gradient(45deg, #4682b4, #5f9ea0, #4682b4);
		transform: translateY(-1px);
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2);
		filter: drop-shadow(0 0 6px rgba(70, 130, 180, 0.3));
	}

	.error-message {
		color: #b22222;
		text-align: center;
		font-style: italic;
		margin-top: 10px;
		text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
		filter: drop-shadow(0 0 4px rgba(178, 34, 34, 0.3));
	}

	.success-section {
		text-align: center;
	}

	.success-message {
		font-size: 1.2rem;
		color: #3cb371;
		margin-bottom: 20px;
		font-weight: bold;
		text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.8);
		filter: drop-shadow(0 0 6px rgba(60, 179, 113, 0.4));
	}

	.hint-section {
		background: rgba(25, 25, 112, 0.3);
		border: 1px solid rgba(70, 130, 180, 0.4);
		border-radius: 8px;
		padding: 15px;
		margin: 20px 0;
		box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1);
	}

	.hint-section h4 {
		color: #8a2be2;
		margin-bottom: 10px;
		text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
		filter: drop-shadow(0 0 4px rgba(138, 43, 226, 0.3));
	}

	.hint {
		font-style: italic;
		line-height: 1.5;
		color: #c0c0c0;
		text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7);
	}

	.next-button {
		background: linear-gradient(45deg, #2f4f4f, #4682b4, #2f4f4f);
		color: #e0e0e0;
		border: 2px solid #4682b4;
		padding: 12px 25px;
		font-size: 1.1rem;
		font-family: inherit;
		border-radius: 8px;
		cursor: pointer;
		transition: all 0.3s ease;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1);
		text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
	}

	.next-button:hover {
		background: linear-gradient(45deg, #4682b4, #5f9ea0, #4682b4);
		transform: translateY(-1px);
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2);
		filter: drop-shadow(0 0 6px rgba(70, 130, 180, 0.3));
	}

	/* End Screen Styles */
	.end-screen {
		text-align: center;
		padding: 40px 20px;
		max-width: 600px;
		margin: 0 auto;
	}

	.completion-title {
		font-size: 2.2rem;
		color: #8b4513;
		margin-bottom: 20px;
		text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.8);
		filter: drop-shadow(0 0 8px rgba(139, 69, 19, 0.5));
	}

	.completion-message {
		font-size: 1.1rem;
		line-height: 1.6;
		margin-bottom: 30px;
		color: #c0c0c0;
		text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7);
	}


	/* Mobile Responsive */
	@media (max-width: 768px) {
		.game-container {
			padding: 15px;
		}

		.main-title {
			font-size: 2rem;
		}

		.subtitle {
			font-size: 1.3rem;
		}

		.question {
			font-size: 1.2rem;
		}

		.input-section {
			gap: 12px;
		}

		.answer-input,
		.submit-button,
		.next-button {
			padding: 10px 15px;
			font-size: 1rem;
		}
	}
</style>
