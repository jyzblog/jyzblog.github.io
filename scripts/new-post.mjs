import inquirer from 'inquirer';
import fs from 'fs';
import path from 'path';
import { EOL } from 'os';

async function createPost() {
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'bookTitle',
      message: 'Enter the book title:',
      validate: function (value) {
        if (value.length) {
          return true;
        }
        return 'Please enter the note title.';
      },
    },
    {
      type: 'input',
      name: 'author',
      message: 'Enter the author:',
      validate: function (value) {
        if (value.length) {
          return true;
        }
        return 'Please enter the author';
      },
    },
    {
      type: 'editor',
      name: 'content',
      message: 'Enter the content of the post (opens in your default editor):',
      waitUserInput: true,
      default:'',
      validate: function (text) {
        if (text.split(EOL).length < 2) {
          return 'Must be at least 2 lines.';
        }
        return true;
      },
    }
  ]);

  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const date = `${year}-${month}-${day}`;
  const filename = `${date}.md`;
  const filepath = path.join('blog', 'posts', filename);

  if (fs.existsSync(filepath)) {
    console.error(`Error: A post with the filename ${filename} already exists.`);
    return;
  }

  const postTitle = `Notes - ${answers.bookTitle}`;
  const description = `Excerpts from "${answers.bookTitle}" by ${answers.author}`;

  const frontmatter = `---
title: postTitle
description: description
date: ${date}
---

`;

  const content = frontmatter + answers.content;

  fs.writeFileSync(filepath, content);

  console.log(`Successfully created post at ${filepath}`);
}

createPost(); 