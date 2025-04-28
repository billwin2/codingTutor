# codingTutor

codingTutor is an AI-assisted coding tool designed to help users improve their programming skills. It allows users to ask technical questions, debug code, and receive feedback on code quality and best practices through a simple web interface.

This project is currently under active development. Features and structure may change as the application evolves.

---

## Tech Stack

- **Frontend:** React, Vite, TypeScript, Tailwind CSS
- **Backend:** FastAPI (Python) with OpenAI integration
- **Containerization:** Docker and Docker Compose

---

## Getting Started (Docker)

### Prerequisites

- Docker Desktop must be installed and running

### Setup

1. In the `backend/` directory, create a `.env` file with the following content:
OPENAI_API_KEY=your-api-key-here
Replace `your-api-key-here` with your actual OpenAI API key.

2. From the root project directory, build and start the containers:


3. Once running, the application will be available at:

- Frontend: http://localhost:3000  
- Backend API docs: http://localhost:8000/docs

## Project Structure
codingTutor/
    backend/
        Dockerfile
        main.py
        requirements.txt
    frontend/
        Dockerfile
        src/
        public/
    dockero-compose.yml
    ReadME.md
    .gitignore


## Features

- Submit general coding questions
- Debug code snippets with AI assistance
- Review code for readability and best practices
- Containerized development environment using Docker Compose

## Planned Improvements

- Persistent chat or code history
- Syntax highlighting in AI responses
- User authentication (optional)
- Deployment to a public cloud platform
- UI enhancements

## Author

Created by [@billwin2](https://github.com/billwin2)

This project is part of an independent software development portfolio.



