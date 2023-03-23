
pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                sh 'docker compose up'
            }
        }
        stage('Restart Container') {
            steps {
                sh 'docker-compose up -d'
            }
        }
    }
}