
pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                sh 'docker build -t kitty-chan .'
            }
        }
        stage('Stop old container') {
            steps {
                sh 'docker rm kitty-chan --force'
            }
        }
        stage('Start New Container') {
            steps {
                sh 'docker run -p 5000:5000 -d --restart always --name kitty-chan kitty-chan'
            }
        }
    }
}