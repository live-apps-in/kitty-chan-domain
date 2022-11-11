pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                sh docker build -t kitty-chan
            }
        }
        stage('Stop old container') {
            steps {
                sh docker container stop kitty-chan
            }
        }
        stage('Start New Container') {
            steps {
                sh docker run -p 5000:5000 -t kitty-chan -d kitty-chan 
            }
        }
    }
}