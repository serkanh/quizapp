# Turkish Words Quiz App

## Overview

The Turkish Words Quiz App is a full-stack web application designed to help users learn Turkish vocabulary. It allows users to add Turkish-English word pairs, edit existing words, play pronunciations, and generate quizzes based on the added words.

## Quickstart

If you have Docker and Docker Compose installed, you can get the application up and running with a single command:

```bash
docker compose up
```

Then, open your browser and navigate to `http://localhost:3000` to start using the app.

## Features

- Add new Turkish-English word pairs
- Edit existing word pairs
- Play pronunciations for both Turkish and English words
- Generate quizzes from the word list
- Responsive design for use on various devices

## Technology Stack

- **Frontend**: React.js
- **Backend**: Node.js with Express.js
- **Database**: MongoDB
- **Containerization**: Docker

## Project Structure

```
turkish-words-quiz/
├── frontend/
│   ├── src/
│   │   ├── App.js
│   │   ├── AudioButton.js
│   │   └── index.js
│   ├── public/
│   │   └── index.html
│   ├── Dockerfile
│   └── package.json
├── backend/
│   ├── app.js
│   ├── Dockerfile
│   └── package.json
├── docker-compose.yml
└── README.md
```

## Component Details

### Frontend

#### App.js

The main React component that handles the user interface and state management. It includes:

- A form to add new words
- A list of existing words with edit functionality
- A quiz generation feature
- Integration with the AudioButton component for pronunciations

#### AudioButton.js

A reusable React component that handles playing audio pronunciations for words. It sends requests to the backend to fetch audio from Google Translate's Text-to-Speech API.

### Backend

#### app.js

The Express.js server that handles API requests. It includes routes for:

- Adding new words
- Fetching all words
- Updating existing words
- Generating quizzes
- Proxying audio requests to Google Translate's TTS API

### Docker Configuration

#### docker-compose.yml

Defines and configures the three services of the application:

1. Frontend
2. Backend
3. MongoDB

It sets up the necessary network connections, volume mounts for development, and environment variables.

#### Dockerfiles

Both the frontend and backend have their own Dockerfiles, which define how their respective images should be built.

## Setup and Installation

1. Ensure you have Docker and Docker Compose installed on your system.

2. Clone the repository:
   ```
   git clone https://github.com/yourusername/turkish-words-quiz.git
   cd turkish-words-quiz
   ```

3. Start the application:
   ```
   docker compose up
   ```

4. Access the application at `http://localhost:3000` in your web browser.

## Usage

1. **Adding Words**: Use the form at the top of the page to add new Turkish-English word pairs.

2. **Editing Words**: In the word list, click the "Edit" button next to a word pair to modify it. Click "Save" to confirm changes or "Cancel" to discard them.

3. **Playing Pronunciations**: Click the speaker icon (🔊) next to any word to hear its pronunciation.

4. **Generating Quizzes**: Click the "Generate Quiz" button to create a quiz based on your word list. The English translations will be hidden in the quiz.

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
