
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
                sh 'docker run -p 5000:5000 -d --name kitty-chan kitty-chan'
            }
        }
        stage('Notify GitHub') {
            githubStatus color: 'SUCCESS', context: 'jenkins/build'
        }
    }
}