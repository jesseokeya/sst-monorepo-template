#!/usr/bin/env node

import inquirer from 'inquirer';
import chalk from 'chalk';
import { replaceInFile } from 'replace-in-file';

async function runReplace() {
	console.log(chalk.green.bold('\nWelcome to the Find-and-Replace CLI Tool!\n'));

	// Prompt the user for configuration values
	const answers = await inquirer.prompt([
		{
			type: 'input',
			name: 'files',
			message: chalk.blue('Enter the file path(s) (glob pattern) to search or Enter to use default:'),
			default: '**/*.{js,ts,json,css,md,yml,yaml}',
		},
		{
			type: 'input',
			name: 'from',
			message: chalk.blue('Enter the text or regex pattern to find or Enter to use default:'),
			default: 'sst-monorepo-template',
			validate: (input) => input.trim() !== '' || 'This field cannot be empty.',
		},
		{
			type: 'input',
			name: 'to',
			message: chalk.blue('Enter the replacement text or Project name separated by a dash:'),
		},
	]);

	// Create a RegExp from user input (with global flag)
	const options = {
		files: answers.files,
		from: new RegExp(answers.from, 'g'),
		to: answers.to,
		dot: true,
	};

	console.log(chalk.yellow('\nStarting replacement process...\n'));

	try {
		const results = await replaceInFile(options);
		console.log(chalk.green('\nReplacement completed successfully!\n'));
		results.forEach((result) => {
			console.log(chalk.gray(`File: ${result.file}`));
			console.log(chalk.gray(`Changed: ${result.hasChanged}\n`));
		});
	} catch (error) {
		console.error(chalk.red('\nAn error occurred during replacement:'), error);
	}
}

runReplace();
