export class Instructions {
	dough_preparation: string[] = [];
	filling_preparation: string[] = [];
	forming_and_cooking_dumplings: string[] = [];
	serving: string[] = [];

	setInstructions(instructions: Instructions): this {
		this.dough_preparation = instructions.dough_preparation;
		this.filling_preparation = instructions.filling_preparation;
		this.forming_and_cooking_dumplings =
			instructions.forming_and_cooking_dumplings;
		this.serving = instructions.serving;
		return this;
	}
}
