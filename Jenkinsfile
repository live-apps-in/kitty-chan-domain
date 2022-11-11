pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                sh 'sudo docker build -t kitty-chan .'
            }
        }
        stage('Stop old container') {
            steps {
                sh 'sudo docker container stop kitty-chan'
            }
        }
        stage('Start New Container') {
            steps {
                sh 'sudo docker run -p 5000:5000 -t kitty-chan -d kitty-chan'
            }
        }
    }
}