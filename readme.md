# Turkish Words Quiz App

## Overview

The Turkish Words Quiz App is a full-stack web application designed to help users learn Turkish vocabulary. It allows users to add Turkish-English word pairs, edit existing words, delete words, play pronunciations, and generate quizzes based on the added words.

## Quickstart

If you have Docker and Docker Compose installed, you can get the application up and running with a single command:

```bash
docker compose up
```

Then, open your browser and navigate to `http://localhost:3000` to start using the app.

## Features

- Add new Turkish-English word pairs
- Edit existing word pairs
- Delete word pairs
- Play pronunciations for both Turkish and English words
- Generate quizzes from the word list
- Responsive design for use on various devices

... [rest of the README remains the same] ...

## Usage

1. **Adding Words**: Use the form at the top of the page to add new Turkish-English word pairs.

2. **Editing Words**: In the word list, click the "Edit" button next to a word pair to modify it. Click "Save" to confirm changes or "Cancel" to discard them.

3. **Deleting Words**: Click the "Delete" button next to a word pair to remove it from the list. Confirm the action in the dialog that appears.

4. **Playing Pronunciations**: Click the speaker icon (🔊) next to any word to hear its pronunciation.

5. **Generating Quizzes**: Click the "Generate Quiz" button to create a quiz based on your word list. The English translations will be hidden in the quiz.

... [rest of the README remains the same] ...

## Development

The project is set up for easy development with Docker:

- The frontend uses React's development server with hot reloading.
- The backend uses nodemon to automatically restart on file changes.
- Local directories are mounted as volumes, so changes to your code will be reflected immediately without needing to rebuild Docker images.

## Notes

- This application uses Google Translate's Text-to-Speech API unofficially. For a production application, consider using a properly licensed TTS service.
- The current setup is optimized for development. For production, you would need to make appropriate changes, such as building the frontend for production and adjusting security settings.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).
